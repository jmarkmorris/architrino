#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_READINESS = `${CERT_DIR}/one_leaf_proof_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ENDPOINT_BOX = `${CERT_DIR}/one_leaf_active_endpoint_interval_box_no_switch_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_SOURCE_LAYER = `${CERT_DIR}/one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_OBJECT = `${CERT_DIR}/fold_coordinate_endpoint_functional_target_endpoint_boundary_binding_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_TARGET = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FULL_BINDING = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_SOURCE = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_source_layer.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_MOTION_EVALUATION = `${CERT_DIR}/fold_coordinate_endpoint_functional_boundary_binding_motion_evaluation_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PRIMITIVE_DEPENDENCY = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_primitive_dependency_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PRIMITIVE_RULE_WITNESS = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REF_CARRIER_FULL_BINDING = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_ADMISSION = `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_endpoint_box_residual_function_pair_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `one_leaf_endpoint_box_residual_function_pair_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const ENDPOINT_PRIMITIVE_ORDER = [
  "endpoint_boundary_binding_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
  "endpoint_value_binding_map_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "witness_object_has_contract_link",
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

const ROW_PAIR_ORDER = [
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
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
  "source_endpoint_value_binding_map_carrier_unblocked",
  "receiver_endpoint_value_binding_map_carrier_unblocked",
  "combined_endpoint_value_binding_map_carrier_pair_unblocked",
  "combined_endpoint_evaluation_map_pair_constructed",
  "source_endpoint_interval_box_constructed",
  "receiver_endpoint_interval_box_constructed",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "source_endpoint_residual_interval_bound_constructed",
  "receiver_endpoint_residual_interval_bound_constructed",
  "endpoint_switch_exclusion_certified",
  "interval_active_endpoint_enclosure_present",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    readiness: DEFAULT_READINESS,
    endpointBox: DEFAULT_ENDPOINT_BOX,
    sourceLayer: DEFAULT_SOURCE_LAYER,
    targetObject: DEFAULT_TARGET_OBJECT,
    contractTarget: DEFAULT_CONTRACT_TARGET,
    fullBinding: DEFAULT_FULL_BINDING,
    valueSource: DEFAULT_VALUE_SOURCE,
    motionEvaluation: DEFAULT_MOTION_EVALUATION,
    primitiveDependency: DEFAULT_PRIMITIVE_DEPENDENCY,
    primitiveRuleWitness: DEFAULT_PRIMITIVE_RULE_WITNESS,
    refCarrierFullBinding: DEFAULT_REF_CARRIER_FULL_BINDING,
    valueMap: DEFAULT_VALUE_MAP,
    contractAdmission: DEFAULT_CONTRACT_ADMISSION,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--readiness") {
      args.readiness = argv[++index];
    } else if (arg === "--endpoint-box") {
      args.endpointBox = argv[++index];
    } else if (arg === "--source-layer") {
      args.sourceLayer = argv[++index];
    } else if (arg === "--target-object") {
      args.targetObject = argv[++index];
    } else if (arg === "--contract-target") {
      args.contractTarget = argv[++index];
    } else if (arg === "--full-binding") {
      args.fullBinding = argv[++index];
    } else if (arg === "--value-source") {
      args.valueSource = argv[++index];
    } else if (arg === "--motion-evaluation") {
      args.motionEvaluation = argv[++index];
    } else if (arg === "--primitive-dependency") {
      args.primitiveDependency = argv[++index];
    } else if (arg === "--primitive-rule-witness") {
      args.primitiveRuleWitness = argv[++index];
    } else if (arg === "--ref-carrier-full-binding") {
      args.refCarrierFullBinding = argv[++index];
    } else if (arg === "--value-map") {
      args.valueMap = argv[++index];
    } else if (arg === "--contract-admission") {
      args.contractAdmission = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-endpoint-box-residual-function-pair-certificate-attempt.mjs [options]

Options:
  --readiness PATH              One-leaf proof-data readiness classifier. Defaults to ${DEFAULT_READINESS}.
  --endpoint-box PATH           Endpoint interval-box/no-switch attempt. Defaults to ${DEFAULT_ENDPOINT_BOX}.
  --source-layer PATH           Residual function on box source-layer attempt. Defaults to ${DEFAULT_SOURCE_LAYER}.
  --target-object PATH          Target endpoint boundary-binding object attempt. Defaults to ${DEFAULT_TARGET_OBJECT}.
  --contract-target PATH        Full endpoint boundary-binding contract target. Defaults to ${DEFAULT_CONTRACT_TARGET}.
  --full-binding PATH           Full endpoint boundary-binding construction attempt. Defaults to ${DEFAULT_FULL_BINDING}.
  --value-source PATH           Endpoint value-binding source layer. Defaults to ${DEFAULT_VALUE_SOURCE}.
  --motion-evaluation PATH      Boundary-binding motion/evaluation attempt. Defaults to ${DEFAULT_MOTION_EVALUATION}.
  --primitive-dependency PATH   Primitive dependency certificate. Defaults to ${DEFAULT_PRIMITIVE_DEPENDENCY}.
  --primitive-rule-witness PATH Primitive rule/witness-record construction attempt. Defaults to ${DEFAULT_PRIMITIVE_RULE_WITNESS}.
  --ref-carrier-full-binding PATH Endpoint ref-carrier/full-binding construction attempt. Defaults to ${DEFAULT_REF_CARRIER_FULL_BINDING}.
  --value-map PATH              Endpoint value-binding map construction attempt. Defaults to ${DEFAULT_VALUE_MAP}.
  --contract-admission PATH     Binding contract/full-binding/carrier-admission construction attempt. Defaults to ${DEFAULT_CONTRACT_ADMISSION}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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
  const present = fs.existsSync(filePath);
  return {
    path: filePath,
    basename: path.basename(filePath),
    present,
    sha256: present ? sha256File(filePath) : null,
  };
}

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function indexById(rows, key = "id") {
  return new Map((rows ?? []).map((row) => [row[key], row]));
}

function rowById(rows, rowId, label) {
  const row = (rows ?? []).find((entry) => entry.row_id === rowId);
  if (!row) {
    throw new Error(`Missing ${label} row ${rowId}.`);
  }
  return row;
}

function endpointById(index, endpointId, label) {
  const endpoint = index.get(endpointId);
  if (!endpoint) {
    throw new Error(`Missing ${label} endpoint ${endpointId}.`);
  }
  return endpoint;
}

function bool(fields, key) {
  return fields?.[key] === true;
}

function firstMissing(fields, order) {
  return order.find((field) => fields?.[field] !== true) ?? null;
}

function missingFields(fields, order) {
  return order.filter((field) => fields?.[field] !== true);
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function endpointSummary(endpoint, indexes) {
  const target = endpointById(indexes.target, endpoint.id, "target-object");
  const contract = endpointById(indexes.contract, endpoint.id, "contract-target");
  const fullBinding = endpointById(indexes.fullBinding, endpoint.id, "full-binding");
  const valueSource = endpointById(indexes.valueSource, endpoint.id, "value-source");
  const motion = endpointById(indexes.motion, endpoint.id, "motion/evaluation");
  const primitiveRuleWitness = endpointById(indexes.primitiveRuleWitness, endpoint.id, "primitive rule/witness-record");
  const refCarrierFullBinding = endpointById(indexes.refCarrierFullBinding, endpoint.id, "ref-carrier/full-binding");
  const valueMap = endpointById(indexes.valueMap, endpoint.id, "value-map");
  const contractAdmission = endpointById(indexes.contractAdmission, endpoint.id, "contract-admission");
  const fields = contractAdmission.required_fields_present ?? {};
  return {
    endpoint_id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    row_uses: endpoint.row_uses ?? [],
    binding_symbol: endpoint.binding_symbol,
    witness_object_symbol:
      primitiveRuleWitness.witness_object_symbol ??
      refCarrierFullBinding.witness_object_symbol ??
      valueMap.witness_object_symbol ??
      contractAdmission.witness_object_symbol,
    domain_symbol:
      primitiveRuleWitness.domain_symbol ??
      refCarrierFullBinding.domain_symbol ??
      valueMap.domain_symbol ??
      contractAdmission.domain_symbol,
    chart_symbol:
      primitiveRuleWitness.chart_symbol ??
      refCarrierFullBinding.chart_symbol ??
      valueMap.chart_symbol ??
      contractAdmission.chart_symbol,
    basis_symbol:
      primitiveRuleWitness.basis_symbol ??
      refCarrierFullBinding.basis_symbol ??
      valueMap.basis_symbol ??
      contractAdmission.basis_symbol,
    target_endpoint_ref_value_count: endpoint.target_endpoint_ref_value_count,
    positive_prerequisites_present: endpoint.positive_prerequisites_present,
    positive_prerequisites_ready: endpoint.positive_prerequisites_ready === true,
    first_missing_primitive: firstMissing(fields, ENDPOINT_PRIMITIVE_ORDER),
    minimal_live_construction_target: {
      target_id: `binding_contract_satisfaction_target:${endpoint.id}`,
      blocking_fields: ["binding_contract_satisfied", "witness_object_has_contract_link"],
    },
    constructed_endpoint_artifact_ids: {
      target_endpoint_boundary_binding_object:
        target.target_endpoint_boundary_binding_object_id ?? target.source_target_endpoint_boundary_binding_object_id,
      full_endpoint_boundary_binding_contract_target:
        contract.full_endpoint_boundary_binding_contract_target_id ?? contract.source_contract_target_id,
      full_endpoint_boundary_binding_construction_attempt:
        fullBinding.full_endpoint_boundary_binding_construction_attempt_id ?? fullBinding.id,
      endpoint_value_binding_source:
        valueSource.endpoint_value_binding_source_id ?? valueSource.source_endpoint_value_binding_source_id,
      first_endpoint_boundary_binding_primitive:
        primitiveRuleWitness.first_endpoint_boundary_binding_primitive_id ??
        primitiveRuleWitness.source_first_endpoint_boundary_binding_primitive_id,
      primitive_binding_witness_record:
        primitiveRuleWitness.primitive_binding_witness_record_id ??
        primitiveRuleWitness.source_primitive_binding_witness_record_id,
      witness_object_endpoint_boundary_binding_ref:
        refCarrierFullBinding.witness_object_endpoint_boundary_binding_ref_id ??
        valueMap.witness_object_endpoint_boundary_binding_ref_id ??
        contractAdmission.witness_object_endpoint_boundary_binding_ref_id,
      endpoint_value_binding_map:
        valueMap.endpoint_value_binding_map_id ?? contractAdmission.source_endpoint_value_binding_map_id,
      binding_contract_full_binding_carrier_admission_attempt:
        contractAdmission.binding_contract_full_binding_carrier_admission_attempt_id,
    },
    endpoint_primitive_fields_present: ENDPOINT_PRIMITIVE_ORDER.reduce((result, key) => {
      result[key] = bool(fields, key);
      return result;
    }, {}),
    first_missing_endpoint_primitive_field: firstMissing(fields, ENDPOINT_PRIMITIVE_ORDER),
    missing_endpoint_primitive_fields: missingFields(fields, ENDPOINT_PRIMITIVE_ORDER),
    source_layers_present: {
      target_endpoint_boundary_binding_object_constructed:
        bool(target.required_fields_present, "target_endpoint_boundary_binding_object_constructed"),
      full_endpoint_boundary_binding_contract_target_declared:
        bool(contract.required_fields_present, "full_endpoint_boundary_binding_contract_target_declared"),
      full_endpoint_boundary_binding_construction_input_ready:
        bool(fullBinding.required_fields_present, "full_endpoint_boundary_binding_construction_input_ready"),
      endpoint_value_binding_source_layer_ready:
        bool(valueSource.required_fields_present, "endpoint_value_binding_source_layer_ready"),
      first_endpoint_boundary_binding_primitive_constructed:
        bool(primitiveRuleWitness.required_fields_present, "endpoint_boundary_binding_constructed"),
      witness_object_endpoint_boundary_binding_ref_constructed:
        bool(refCarrierFullBinding.required_fields_present, "witness_object_endpoint_boundary_binding_ref_constructed"),
      endpoint_value_binding_map_constructed:
        bool(valueMap.required_fields_present, "endpoint_value_binding_map_constructed"),
      binding_contract_satisfaction_test_applied:
        bool(contractAdmission.required_fields_present, "binding_contract_satisfaction_test_applied"),
      unified_boundary_motion_evaluation_ready: motion.unified_boundary_motion_evaluation_ready === true,
    },
    obstruction: contractAdmission.obstruction,
  };
}

function buildRowAttempt(readinessRow, inputs, indexes) {
  const rowId = readinessRow.row_id;
  const sourceLayerRow = rowById(
    inputs.sourceLayer.row_active_endpoint_residual_function_on_box_source_layer_attempts,
    rowId,
    "source-layer",
  );
  const endpointBoxRow = rowById(
    inputs.endpointBox.row_endpoint_interval_box_no_switch_attempts,
    rowId,
    "endpoint-box",
  );
  const primitiveRow = rowById(
    inputs.primitiveDependency.row_primitive_dependency_certificates,
    rowId,
    "primitive dependency",
  );
  const primitiveRuleWitnessRow = rowById(
    inputs.primitiveRuleWitness.row_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts,
    rowId,
    "primitive rule/witness-record",
  );
  const refCarrierFullBindingRow = rowById(
    inputs.refCarrierFullBinding.row_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts,
    rowId,
    "ref-carrier/full-binding",
  );
  const valueMapRow = rowById(
    inputs.valueMap.row_endpoint_value_binding_map_construction_attempts,
    rowId,
    "value-map",
  );
  const contractAdmissionRow = rowById(
    inputs.contractAdmission.row_binding_contract_full_binding_carrier_admission_attempts,
    rowId,
    "contract-admission",
  );
  const sourceEndpoint = endpointById(indexes.primitive, sourceLayerRow.source_variable, "primitive dependency");
  const receiverEndpoint = endpointById(indexes.primitive, sourceLayerRow.receiver_variable, "primitive dependency");
  const sourceContractEndpoint = endpointById(
    indexes.contractAdmission,
    sourceLayerRow.source_variable,
    "source contract-admission",
  );
  const receiverContractEndpoint = endpointById(
    indexes.contractAdmission,
    sourceLayerRow.receiver_variable,
    "receiver contract-admission",
  );
  const readinessFlags = readinessRow.ready_flags ?? {};
  const proofFields = {
    source_endpoint_boundary_binding_constructed:
      primitiveRuleWitnessRow.required_fields_present?.source_endpoint_boundary_binding_primitive_constructed === true,
    receiver_endpoint_boundary_binding_constructed:
      primitiveRuleWitnessRow.required_fields_present?.receiver_endpoint_boundary_binding_primitive_constructed === true,
    combined_boundary_binding_pair_constructed:
      primitiveRuleWitnessRow.required_fields_present?.combined_endpoint_boundary_binding_primitive_pair_constructed === true,
    source_witness_object_endpoint_boundary_binding_ref_constructed:
      refCarrierFullBindingRow.required_fields_present
        ?.source_witness_object_endpoint_boundary_binding_ref_constructed === true,
    receiver_witness_object_endpoint_boundary_binding_ref_constructed:
      refCarrierFullBindingRow.required_fields_present
        ?.receiver_witness_object_endpoint_boundary_binding_ref_constructed === true,
    combined_witness_object_endpoint_boundary_binding_ref_pair_constructed:
      refCarrierFullBindingRow.required_fields_present
        ?.combined_witness_object_endpoint_boundary_binding_ref_pair_constructed === true,
    source_endpoint_value_binding_map_constructed:
      valueMapRow.required_fields_present?.source_endpoint_value_binding_map_constructed === true,
    receiver_endpoint_value_binding_map_constructed:
      valueMapRow.required_fields_present?.receiver_endpoint_value_binding_map_constructed === true,
    combined_endpoint_value_binding_map_pair_constructed:
      valueMapRow.required_fields_present?.combined_endpoint_value_binding_map_pair_constructed === true,
    source_endpoint_value_bound_to_boundary_binding:
      contractAdmissionRow.required_fields_present?.source_endpoint_value_bound_to_boundary_binding === true,
    receiver_endpoint_value_bound_to_boundary_binding:
      contractAdmissionRow.required_fields_present?.receiver_endpoint_value_bound_to_boundary_binding === true,
    combined_endpoint_value_binding_pair_constructed:
      contractAdmissionRow.required_fields_present?.combined_endpoint_value_binding_pair_constructed === true,
    source_binding_contract_satisfied:
      contractAdmissionRow.required_fields_present?.source_binding_contract_satisfied === true,
    receiver_binding_contract_satisfied:
      contractAdmissionRow.required_fields_present?.receiver_binding_contract_satisfied === true,
    combined_binding_contract_pair_satisfied:
      contractAdmissionRow.required_fields_present?.combined_binding_contract_pair_satisfied === true,
    source_full_endpoint_boundary_binding_constructed:
      contractAdmissionRow.required_fields_present?.source_full_endpoint_boundary_binding_constructed === true,
    receiver_full_endpoint_boundary_binding_constructed:
      contractAdmissionRow.required_fields_present?.receiver_full_endpoint_boundary_binding_constructed === true,
    combined_full_endpoint_boundary_binding_pair_constructed:
      contractAdmissionRow.required_fields_present?.combined_full_endpoint_boundary_binding_pair_constructed === true,
    source_endpoint_boundary_binding_ref_carrier_unblocked:
      contractAdmissionRow.required_fields_present?.source_endpoint_boundary_binding_ref_carrier_unblocked === true,
    receiver_endpoint_boundary_binding_ref_carrier_unblocked:
      contractAdmissionRow.required_fields_present?.receiver_endpoint_boundary_binding_ref_carrier_unblocked === true,
    combined_endpoint_boundary_binding_ref_carrier_pair_unblocked:
      contractAdmissionRow.required_fields_present?.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked === true,
    source_endpoint_value_binding_map_carrier_unblocked:
      contractAdmissionRow.required_fields_present?.source_endpoint_value_binding_map_carrier_unblocked === true,
    receiver_endpoint_value_binding_map_carrier_unblocked:
      contractAdmissionRow.required_fields_present?.receiver_endpoint_value_binding_map_carrier_unblocked === true,
    combined_endpoint_value_binding_map_carrier_pair_unblocked:
      contractAdmissionRow.required_fields_present?.combined_endpoint_value_binding_map_carrier_pair_unblocked === true,
    combined_endpoint_evaluation_map_pair_constructed:
      contractAdmissionRow.required_fields_present?.combined_endpoint_evaluation_map_pair_constructed === true,
    source_endpoint_interval_box_constructed:
      endpointBoxRow.required_fields_present?.source_endpoint_interval_box_constructed === true,
    receiver_endpoint_interval_box_constructed:
      endpointBoxRow.required_fields_present?.receiver_endpoint_interval_box_constructed === true,
    source_endpoint_residual_function_on_box_constructed:
      sourceLayerRow.required_fields_present?.source_endpoint_residual_function_on_box_constructed === true,
    receiver_endpoint_residual_function_on_box_constructed:
      sourceLayerRow.required_fields_present?.receiver_endpoint_residual_function_on_box_constructed === true,
    source_endpoint_residual_interval_bound_constructed:
      sourceLayerRow.required_fields_present?.source_endpoint_residual_interval_bound_constructed === true,
    receiver_endpoint_residual_interval_bound_constructed:
      sourceLayerRow.required_fields_present?.receiver_endpoint_residual_interval_bound_constructed === true,
    endpoint_switch_exclusion_certified:
      sourceLayerRow.required_fields_present?.endpoint_switch_exclusion_certified === true,
    interval_active_endpoint_enclosure_present:
      sourceLayerRow.required_fields_present?.interval_active_endpoint_enclosure_present === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      sourceLayerRow.required_fields_present?.proof_interval_v1_v6_rerun_for_candidate_change === true,
    preledger_pass: readinessFlags.preledger_pass === true,
    row_consumed: readinessFlags.row_consumed === true,
    branch_chart_authorized: readinessFlags.branch_chart_authorized === true,
  };
  const rowMethods = [
    {
      method_id: "endpoint_value_maps_as_binding_contract_pair",
      required_fields: [
        "source_endpoint_boundary_binding_constructed",
        "receiver_endpoint_boundary_binding_constructed",
        "source_endpoint_value_binding_map_constructed",
        "receiver_endpoint_value_binding_map_constructed",
        "source_endpoint_value_bound_to_boundary_binding",
        "receiver_endpoint_value_bound_to_boundary_binding",
        "source_binding_contract_satisfied",
        "receiver_binding_contract_satisfied",
        "combined_binding_contract_pair_satisfied",
      ],
    },
    {
      method_id: "full_endpoint_boundary_bindings_as_interval_boxes",
      required_fields: [
        "combined_binding_contract_pair_satisfied",
        "source_full_endpoint_boundary_binding_constructed",
        "receiver_full_endpoint_boundary_binding_constructed",
        "combined_full_endpoint_boundary_binding_pair_constructed",
        "source_endpoint_boundary_binding_ref_carrier_unblocked",
        "receiver_endpoint_boundary_binding_ref_carrier_unblocked",
        "source_endpoint_value_binding_map_carrier_unblocked",
        "receiver_endpoint_value_binding_map_carrier_unblocked",
        "combined_endpoint_evaluation_map_pair_constructed",
        "source_endpoint_interval_box_constructed",
        "receiver_endpoint_interval_box_constructed",
      ],
    },
    {
      method_id: "residual_box_functions_as_pair_certificate",
      required_fields: [
        "source_endpoint_residual_function_on_box_constructed",
        "receiver_endpoint_residual_function_on_box_constructed",
        "source_endpoint_residual_interval_bound_constructed",
        "receiver_endpoint_residual_interval_bound_constructed",
        "endpoint_switch_exclusion_certified",
        "interval_active_endpoint_enclosure_present",
        "proof_interval_v1_v6_rerun_for_candidate_change",
        "preledger_pass",
        "row_consumed",
        "branch_chart_authorized",
      ],
    },
  ].map((method) => {
    const missing = method.required_fields.filter((field) => proofFields[field] !== true);
    return {
      ...method,
      missing_fields: missing,
      passed: missing.length === 0,
    };
  });
  const pairCertificateConstructed = rowMethods.every((method) => method.passed);
  return {
    row_id: rowId,
    cover_id: primitiveRow.cover_id,
    ledger: primitiveRow.ledger,
    source_interval: sourceLayerRow.source_interval,
    receiver_interval: sourceLayerRow.receiver_interval,
    failed_side: sourceLayerRow.failed_side,
    boundary_side: sourceLayerRow.boundary_side,
    candidate_lambda_interval: readinessRow.candidate_lambda_interval,
    source_variable: sourceLayerRow.source_variable,
    receiver_variable: sourceLayerRow.receiver_variable,
    source_minimal_live_construction_target_id: `binding_contract_satisfaction_target:${sourceLayerRow.source_variable}`,
    receiver_minimal_live_construction_target_id: `binding_contract_satisfaction_target:${sourceLayerRow.receiver_variable}`,
    source_first_missing_primitive: firstMissing(
      sourceContractEndpoint.required_fields_present,
      ENDPOINT_PRIMITIVE_ORDER,
    ),
    receiver_first_missing_primitive: firstMissing(
      receiverContractEndpoint.required_fields_present,
      ENDPOINT_PRIMITIVE_ORDER,
    ),
    positive_source_layers_present: {
      source_domain_chart_carrier_subfield_constructed:
        primitiveRow.required_fields_present?.source_domain_chart_carrier_subfield_constructed === true,
      receiver_domain_chart_carrier_subfield_constructed:
        primitiveRow.required_fields_present?.receiver_domain_chart_carrier_subfield_constructed === true,
      combined_domain_chart_carrier_subfield_pair_constructed:
        primitiveRow.required_fields_present?.combined_domain_chart_carrier_subfield_pair_constructed === true,
      source_endpoint_value_binding_source_equation_declared:
        sourceLayerRow.required_fields_present?.source_endpoint_value_binding_source_equation_declared === true,
      receiver_endpoint_value_binding_source_equation_declared:
        sourceLayerRow.required_fields_present?.receiver_endpoint_value_binding_source_equation_declared === true,
      proof_data_target_declared: readinessFlags.proof_data_target_declared === true,
      source_first_endpoint_boundary_binding_primitive_constructed:
        primitiveRuleWitnessRow.required_fields_present?.source_endpoint_boundary_binding_primitive_constructed === true,
      receiver_first_endpoint_boundary_binding_primitive_constructed:
        primitiveRuleWitnessRow.required_fields_present?.receiver_endpoint_boundary_binding_primitive_constructed === true,
      source_witness_object_endpoint_boundary_binding_ref_constructed:
        refCarrierFullBindingRow.required_fields_present
          ?.source_witness_object_endpoint_boundary_binding_ref_constructed === true,
      receiver_witness_object_endpoint_boundary_binding_ref_constructed:
        refCarrierFullBindingRow.required_fields_present
          ?.receiver_witness_object_endpoint_boundary_binding_ref_constructed === true,
      source_endpoint_value_binding_map_constructed:
        valueMapRow.required_fields_present?.source_endpoint_value_binding_map_constructed === true,
      receiver_endpoint_value_binding_map_constructed:
        valueMapRow.required_fields_present?.receiver_endpoint_value_binding_map_constructed === true,
      binding_contract_satisfaction_test_pair_applied:
        contractAdmissionRow.required_fields_present?.combined_binding_contract_satisfaction_test_pair_applied === true,
    },
    endpoint_box_residual_function_fields_present: proofFields,
    first_missing_pair_field: firstMissing(proofFields, ROW_PAIR_ORDER),
    missing_pair_fields: missingFields(proofFields, ROW_PAIR_ORDER),
    construction_method_results: rowMethods,
    endpoint_box_residual_function_pair_certificate_constructed: pairCertificateConstructed,
    preledger_pass: readinessFlags.preledger_pass === true,
    row_consumed: readinessFlags.row_consumed === true,
    branch_chart_authorized: readinessFlags.branch_chart_authorized === true,
    obstruction:
      "The row has source/receiver first endpoint-boundary-binding primitives, witness-object endpoint-boundary-binding refs, endpoint value-binding maps, and contract/full-binding tests. Binding contracts and witness-object contract links are still absent, so full endpoint boundary bindings, carrier admissions, endpoint interval boxes, residual functions on boxes, residual interval bounds, no-switch certificates, active-endpoint enclosures, replay, preledger pass, and row consumption do not follow.",
  };
}

function buildSummary(endpointAttempts, rowAttempts) {
  return {
    endpoint_variables: endpointAttempts.length,
    endpoint_positive_prerequisites_ready: countTrue(endpointAttempts, (row) => row.positive_prerequisites_ready),
    target_endpoint_boundary_binding_objects: countTrue(
      endpointAttempts,
      (row) => row.source_layers_present.target_endpoint_boundary_binding_object_constructed,
    ),
    full_endpoint_boundary_binding_contract_targets: countTrue(
      endpointAttempts,
      (row) => row.source_layers_present.full_endpoint_boundary_binding_contract_target_declared,
    ),
    full_endpoint_boundary_binding_construction_inputs: countTrue(
      endpointAttempts,
      (row) => row.source_layers_present.full_endpoint_boundary_binding_construction_input_ready,
    ),
    endpoint_value_binding_source_layers: countTrue(
      endpointAttempts,
      (row) => row.source_layers_present.endpoint_value_binding_source_layer_ready,
    ),
    endpoint_boundary_binding_primitives_constructed: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.endpoint_boundary_binding_constructed,
    ),
    witness_object_endpoint_boundary_binding_refs_constructed: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.witness_object_has_endpoint_boundary_binding_ref,
    ),
    endpoint_value_binding_maps_constructed: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.endpoint_value_binding_map_constructed,
    ),
    endpoint_values_bound_to_boundary_bindings: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.endpoint_value_bound_to_boundary_binding,
    ),
    binding_contracts_satisfied: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.binding_contract_satisfied,
    ),
    witness_object_contract_links_constructed: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.witness_object_has_contract_link,
    ),
    full_endpoint_boundary_bindings_constructed: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.full_endpoint_boundary_binding_constructed,
    ),
    endpoint_boundary_binding_ref_carriers_unblocked: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.endpoint_boundary_binding_ref_carrier_unblocked,
    ),
    endpoint_value_binding_map_carriers_unblocked: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.endpoint_value_binding_map_carrier_unblocked,
    ),
    endpoint_motion_rules_constructed: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.endpoint_motion_rule_constructed,
    ),
    endpoint_evaluation_maps_constructed: countTrue(
      endpointAttempts,
      (row) => row.endpoint_primitive_fields_present.endpoint_evaluation_map_constructed,
    ),
    screened_rows: rowAttempts.length,
    endpoint_boundary_binding_primitive_pair_rows: countTrue(
      rowAttempts,
      (row) =>
        row.endpoint_box_residual_function_fields_present.source_endpoint_boundary_binding_constructed &&
        row.endpoint_box_residual_function_fields_present.receiver_endpoint_boundary_binding_constructed,
    ),
    witness_object_endpoint_boundary_binding_ref_pair_rows: countTrue(
      rowAttempts,
      (row) =>
        row.endpoint_box_residual_function_fields_present
          .source_witness_object_endpoint_boundary_binding_ref_constructed &&
        row.endpoint_box_residual_function_fields_present
          .receiver_witness_object_endpoint_boundary_binding_ref_constructed,
    ),
    endpoint_value_binding_map_pair_rows: countTrue(
      rowAttempts,
      (row) =>
        row.endpoint_box_residual_function_fields_present.source_endpoint_value_binding_map_constructed &&
        row.endpoint_box_residual_function_fields_present.receiver_endpoint_value_binding_map_constructed,
    ),
    binding_contract_pair_rows: countTrue(
      rowAttempts,
      (row) => row.endpoint_box_residual_function_fields_present.combined_binding_contract_pair_satisfied,
    ),
    full_endpoint_boundary_binding_pair_rows: countTrue(
      rowAttempts,
      (row) =>
        row.endpoint_box_residual_function_fields_present.combined_full_endpoint_boundary_binding_pair_constructed,
    ),
    endpoint_carrier_admission_pair_rows: countTrue(
      rowAttempts,
      (row) =>
        row.endpoint_box_residual_function_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked &&
        row.endpoint_box_residual_function_fields_present.combined_endpoint_value_binding_map_carrier_pair_unblocked,
    ),
    endpoint_interval_box_pair_rows: countTrue(
      rowAttempts,
      (row) =>
        row.endpoint_box_residual_function_fields_present.source_endpoint_interval_box_constructed &&
        row.endpoint_box_residual_function_fields_present.receiver_endpoint_interval_box_constructed,
    ),
    residual_function_pair_rows: countTrue(
      rowAttempts,
      (row) =>
        row.endpoint_box_residual_function_fields_present.source_endpoint_residual_function_on_box_constructed &&
        row.endpoint_box_residual_function_fields_present.receiver_endpoint_residual_function_on_box_constructed,
    ),
    residual_interval_bound_pair_rows: countTrue(
      rowAttempts,
      (row) =>
        row.endpoint_box_residual_function_fields_present.source_endpoint_residual_interval_bound_constructed &&
        row.endpoint_box_residual_function_fields_present.receiver_endpoint_residual_interval_bound_constructed,
    ),
    pair_certificate_rows: countTrue(
      rowAttempts,
      (row) => row.endpoint_box_residual_function_pair_certificate_constructed,
    ),
    preledger_pass_rows: countTrue(rowAttempts, (row) => row.preledger_pass),
    row_consumption_count: countTrue(rowAttempts, (row) => row.row_consumed),
    branch_chart_authorized_rows: countTrue(rowAttempts, (row) => row.branch_chart_authorized),
    first_endpoint_primitive_blocker_counts: endpointAttempts.reduce((counts, row) => {
      const key = row.first_missing_endpoint_primitive_field ?? "none";
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {}),
    first_pair_blocker_counts: rowAttempts.reduce((counts, row) => {
      const key = row.first_missing_pair_field ?? "none";
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {}),
  };
}

function buildAttempt(paths, inputs) {
  const indexes = {
    primitive: indexById(inputs.primitiveDependency.endpoint_primitive_dependency_chains),
    target: indexById(inputs.targetObject.endpoint_target_boundary_binding_object_attempts),
    contract: indexById(inputs.contractTarget.endpoint_full_boundary_binding_contract_targets),
    fullBinding: indexById(inputs.fullBinding.endpoint_full_boundary_binding_construction_attempts),
    valueSource: indexById(inputs.valueSource.endpoint_value_binding_source_layers),
    motion: indexById(inputs.motionEvaluation.endpoint_boundary_binding_motion_evaluation_construction_attempts),
    primitiveRuleWitness: indexById(
      inputs.primitiveRuleWitness.endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts,
    ),
    refCarrierFullBinding: indexById(
      inputs.refCarrierFullBinding.endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts,
    ),
    valueMap: indexById(inputs.valueMap.endpoint_value_binding_map_construction_attempts),
    contractAdmission: indexById(
      inputs.contractAdmission.endpoint_binding_contract_full_binding_carrier_admission_attempts,
    ),
  };
  const endpointAttempts = (inputs.primitiveDependency.endpoint_primitive_dependency_chains ?? []).map((endpoint) =>
    endpointSummary(endpoint, indexes),
  );
  const rowAttempts = (inputs.readiness.row_readiness_classifications ?? []).map((row) =>
    buildRowAttempt(row, inputs, indexes),
  );
  const summary = buildSummary(endpointAttempts, rowAttempts);
  return {
    schema: "breather-higher-fold-one-leaf-endpoint-box-residual-function-pair-certificate-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status:
      "one_leaf_endpoint_box_residual_function_pair_certificate_attempt_fail_closed_binding_contract_full_binding_absent_no_row_consumption",
    claim_level:
      "priority-only endpoint-box/residual-function pair certificate attempt for the three regular source-cover one-leaf screened rows; no row consumption",
    no_promotion_rule: true,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    updates_live_ledger: false,
    preledger_pass: false,
    branch_chart_authorized: false,
    source_artifacts: {
      one_leaf_proof_data_readiness_classifier: artifactRecord(paths.readiness),
      endpoint_interval_box_no_switch_construction_attempt: artifactRecord(paths.endpointBox),
      residual_function_on_box_source_layer_attempt: artifactRecord(paths.sourceLayer),
      target_endpoint_boundary_binding_object_construction_attempt: artifactRecord(paths.targetObject),
      full_endpoint_boundary_binding_contract_target: artifactRecord(paths.contractTarget),
      full_endpoint_boundary_binding_construction_attempt: artifactRecord(paths.fullBinding),
      endpoint_value_binding_source_layer: artifactRecord(paths.valueSource),
      boundary_binding_motion_evaluation_construction_attempt: artifactRecord(paths.motionEvaluation),
      full_endpoint_boundary_binding_primitive_dependency_certificate: artifactRecord(paths.primitiveDependency),
      endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt: artifactRecord(
        paths.primitiveRuleWitness,
      ),
      endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt: artifactRecord(
        paths.refCarrierFullBinding,
      ),
      endpoint_value_binding_map_construction_attempt: artifactRecord(paths.valueMap),
      binding_contract_full_binding_carrier_admission_construction_attempt: artifactRecord(
        paths.contractAdmission,
      ),
    },
    certificate_attempt_rule:
      "An endpoint-box/residual-function pair certificate for a screened one-leaf row may use first endpoint-boundary-binding primitives, witness-object endpoint-boundary-binding refs, and endpoint value-binding maps as source layers, but it still requires binding-contract satisfaction, witness-object contract links, full endpoint boundary bindings, carrier admission, endpoint interval boxes, residual functions on boxes, residual interval bounds, no-switch certificates, active-endpoint enclosure, proof-interval replay, preledger pass, and row consumption before any row may be marked accepted.",
    endpoint_variable_attempts: endpointAttempts,
    row_pair_certificate_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      artifact_target: "binding_contract_satisfaction_target",
      continuation_class:
        "certificate-side blocker handoff; endpoint boxes and residual functions remain mechanical only after binding contracts, witness-object contract links, full endpoint boundary bindings, and carrier admissions are proof-grade",
      endpoint_targets: endpointAttempts.map((endpoint) => endpoint.minimal_live_construction_target?.target_id),
      fail_closed_stop_conditions: [
        "Do not promote first endpoint-boundary-binding primitives, witness-object endpoint-boundary-binding refs, or endpoint value-binding maps to binding-contract satisfaction.",
        "Do not construct endpoint interval boxes or residual functions on boxes without source and receiver binding contracts, witness-object contract links, full endpoint boundary bindings, and carrier admissions.",
        "Do not set preledger_pass, consume rows, update a live ledger, or authorize a branch chart without endpoint boxes, residual functions, interval bounds, no-switch, active-endpoint enclosure, boundary-opening proof, preservation fields, and v1-v6 replay.",
      ],
    },
    authorization_lock: {
      preledger_pass_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized_rows: 0,
      preledger_pass_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This attempt reduces the endpoint-box/residual-function pair handoff to four missing binding-contract satisfaction targets, with witness-object contract links, full endpoint boundary bindings, carrier admissions, endpoint boxes, residual functions, preledger rows, and branch-chart authorization still absent.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present ? "true" : "false"} | \`${artifact.sha256 ?? "missing"}\` |`,
    )
    .join("\n");
}

function summaryTable(summary) {
  const rows = [
    ["Endpoint variables", summary.endpoint_variables],
    ["Endpoint positive prerequisites ready", summary.endpoint_positive_prerequisites_ready],
    ["Target endpoint boundary-binding objects", summary.target_endpoint_boundary_binding_objects],
    ["Full endpoint boundary-binding contract targets", summary.full_endpoint_boundary_binding_contract_targets],
    ["Full endpoint boundary-binding construction inputs", summary.full_endpoint_boundary_binding_construction_inputs],
    ["Endpoint value-binding source layers", summary.endpoint_value_binding_source_layers],
    ["Endpoint boundary-binding primitives constructed", summary.endpoint_boundary_binding_primitives_constructed],
    [
      "Witness-object endpoint-boundary-binding refs constructed",
      summary.witness_object_endpoint_boundary_binding_refs_constructed,
    ],
    ["Endpoint value-binding maps constructed", summary.endpoint_value_binding_maps_constructed],
    ["Endpoint values bound to boundary bindings", summary.endpoint_values_bound_to_boundary_bindings],
    ["Binding contracts satisfied", summary.binding_contracts_satisfied],
    ["Witness-object contract links constructed", summary.witness_object_contract_links_constructed],
    ["Full endpoint boundary bindings constructed", summary.full_endpoint_boundary_bindings_constructed],
    ["Endpoint-boundary-binding ref carriers unblocked", summary.endpoint_boundary_binding_ref_carriers_unblocked],
    ["Endpoint value-map carriers unblocked", summary.endpoint_value_binding_map_carriers_unblocked],
    ["Endpoint motion rules constructed", summary.endpoint_motion_rules_constructed],
    ["Endpoint evaluation maps constructed", summary.endpoint_evaluation_maps_constructed],
    ["Screened rows", summary.screened_rows],
    ["Endpoint-boundary-binding primitive pair rows", summary.endpoint_boundary_binding_primitive_pair_rows],
    [
      "Witness-object endpoint-boundary-binding ref pair rows",
      summary.witness_object_endpoint_boundary_binding_ref_pair_rows,
    ],
    ["Endpoint value-binding map pair rows", summary.endpoint_value_binding_map_pair_rows],
    ["Binding-contract pair rows", summary.binding_contract_pair_rows],
    ["Full endpoint boundary-binding pair rows", summary.full_endpoint_boundary_binding_pair_rows],
    ["Endpoint carrier-admission pair rows", summary.endpoint_carrier_admission_pair_rows],
    ["Endpoint interval-box pair rows", summary.endpoint_interval_box_pair_rows],
    ["Residual-function pair rows", summary.residual_function_pair_rows],
    ["Residual interval-bound pair rows", summary.residual_interval_bound_pair_rows],
    ["Pair certificate rows", summary.pair_certificate_rows],
    ["preledger_pass rows", summary.preledger_pass_rows],
    ["Row consumption count", summary.row_consumption_count],
    ["Branch-chart authorized rows", summary.branch_chart_authorized_rows],
  ];
  return rows.map(([label, value]) => `| ${label} | ${value} |`).join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.endpoint_id}\` | \`${endpoint.role}\` | ${endpoint.positive_prerequisites_ready} | \`${endpoint.first_missing_endpoint_primitive_field}\` | \`${endpoint.minimal_live_construction_target?.target_id ?? "none"}\` |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.source_variable}\` | \`${row.receiver_variable}\` | \`${row.first_missing_pair_field}\` | ${row.endpoint_box_residual_function_pair_certificate_constructed} | ${row.preledger_pass} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# One-Leaf Endpoint-Box/Residual-Function Pair Certificate Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This artifact tests the next handoff from the one-leaf proof-data readiness
classifier: whether the three screened regular source-cover rows can receive
source/receiver endpoint interval boxes and residual functions on those boxes.

The attempt fail-closes before endpoint boxes. All four endpoint variables have
domain-chart carrier subfields, target endpoint boundary-binding objects, full
endpoint boundary-binding contract targets, construction inputs, endpoint
value-binding source layers, first endpoint-boundary-binding primitives,
witness-object endpoint-boundary-binding refs, and endpoint value-binding maps.
All four now first block at \`binding_contract_satisfied\`, with the symmetric
\`witness_object_has_contract_link\` blocker still absent. Therefore no full
endpoint boundary binding, carrier admission, endpoint interval-box pair,
residual-function pair, residual interval-bound pair, no-switch certificate,
active-endpoint enclosure, proof-interval replay, preledger pass, row
consumption, or branch-chart authorization is constructed.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Counts

| Measure | Value |
| --- | ---: |
${summaryTable(attempt.summary)}

## Endpoint Variables

| Endpoint variable | Role | Positive prerequisites ready | First missing proof field | Minimal live target |
| --- | --- | --- | --- | --- |
${endpointTable(attempt.endpoint_variable_attempts)}

## Row Pair Attempts

| Row | Source variable | Receiver variable | First pair blocker | Pair certificate | preledger_pass | Row consumed |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_pair_certificate_attempts)}

## Certificate-Side Handoff

Next artifact target: \`${attempt.next_certificate_handoff.artifact_target}\`.

Continuation class: ${attempt.next_certificate_handoff.continuation_class}.

Endpoint targets:

${attempt.next_certificate_handoff.endpoint_targets.map((target) => `- \`${target}\``).join("\n")}

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`branch_chart_authorized\`: false
- row consumption authorized: false

This artifact is a priority-only construction attempt. It proves no binding
contract, no full endpoint boundary binding, no endpoint box, no residual
function on a box, no preledger row, and no branch-chart authorization.
`;
  writeText(filePath, report);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    readiness: args.readiness,
    endpointBox: args.endpointBox,
    sourceLayer: args.sourceLayer,
    targetObject: args.targetObject,
    contractTarget: args.contractTarget,
    fullBinding: args.fullBinding,
    valueSource: args.valueSource,
    motionEvaluation: args.motionEvaluation,
    primitiveDependency: args.primitiveDependency,
    primitiveRuleWitness: args.primitiveRuleWitness,
    refCarrierFullBinding: args.refCarrierFullBinding,
    valueMap: args.valueMap,
    contractAdmission: args.contractAdmission,
  };
  const inputs = Object.fromEntries(
    Object.entries(paths).map(([name, filePath]) => [name, readJson(filePath)]),
  );
  Object.entries(inputs).forEach(([name, source]) => assertPacketId(source, name));
  const attempt = buildAttempt(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeReport(outReport, attempt);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

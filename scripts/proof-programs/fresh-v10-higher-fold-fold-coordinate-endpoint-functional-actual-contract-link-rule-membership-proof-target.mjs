#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_SOURCE_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_contract_link_membership_rule_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_WITNESS_OBJECT_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_actual_contract_link_rule_membership_proof_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_actual_contract_link_rule_membership_proof_target_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-contract-link-membership-rule-attempt-fail-closed-rule-and-membership-source-conditions-present-rule-and-membership-proofs-absent-no-row-consumption";

const WITNESS_OBJECT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-construction-attempt-fail-closed-witness-inputs-present-object-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-contract-link-rule-membership-proof-target-fail-closed-source-conditions-present-rule-proof-and-constructed-witness-object-identity-absent-no-row-consumption";

const RULE_SOURCE_CONDITION_FIELDS = [
  "actual_contract_link_rule_source_conditions_present",
  "membership_source_conditions_ready",
  "source_candidate_id_present",
  "contract_target_id_present",
  "endpoint_value_binding_map_id_present",
  "witness_object_endpoint_boundary_binding_ref_id_present",
  "source_witness_object_attempt_id_present",
  "first_endpoint_boundary_binding_primitive_id_present",
  "target_endpoint_value_binding_source_equations_present",
];

const RULE_PROOF_TARGET_FIELDS = [
  "actual_contract_link_introduction_rule_target_declared",
  "actual_contract_link_introduction_rule_premises_named",
  "actual_contract_link_introduction_rule_conclusion_named",
  "actual_contract_link_rule_available",
  "actual_contract_link_rule_derivation_present",
  "actual_contract_link_rule_soundness_proof_present",
  "actual_contract_link_rule_application_proof_present",
];

const CONSTRUCTED_WITNESS_OBJECT_SOURCE_FIELDS = [
  "witness_object_construction_input_ready",
  "witness_object_target_declared",
  "inherited_witness_object_endpoint_boundary_binding_ref_field_claim",
  "inherited_witness_object_endpoint_value_binding_map_field_claim",
  "same_source_witness_object_attempt_id_referenced",
  "witness_object_symbol_present",
  "binding_symbol_present",
];

const CONSTRUCTED_WITNESS_OBJECT_PROOF_FIELDS = [
  "constructed_witness_object_id_present",
  "endpoint_boundary_binding_witness_object_constructed",
  "constructed_witness_object_has_endpoint_boundary_binding_ref",
  "constructed_witness_object_has_endpoint_value_binding_map",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "endpoint_ref_and_value_map_same_witness_object_proven",
  "membership_source_not_id_adjacency_proven",
  "witness_object_membership_proof_present",
];

const DOWNSTREAM_OUTPUT_FIELDS = [
  "contract_target_satisfaction_proof_present",
  "target_ref_value_equations_proof_grade",
  "endpoint_boundary_binding_ref_compatibility_proof_present",
  "first_primitive_compatibility_proof_present",
  "carrier_admission_bridge_present",
  "motion_evaluation_bridge_present",
  "algebraic_certificate_bridge_present",
  "candidate_replay_bridge_present",
  "actual_contract_link_rule_obligations_satisfied",
  "witness_object_contract_link_constructed",
  "witness_object_has_contract_link",
  "binding_contract_satisfied",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
];

const ENDPOINT_FIELDS = [
  ...RULE_SOURCE_CONDITION_FIELDS,
  ...RULE_PROOF_TARGET_FIELDS,
  ...CONSTRUCTED_WITNESS_OBJECT_SOURCE_FIELDS,
  ...CONSTRUCTED_WITNESS_OBJECT_PROOF_FIELDS,
  ...DOWNSTREAM_OUTPUT_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_actual_contract_link_rule_source_conditions_present",
  "receiver_actual_contract_link_rule_source_conditions_present",
  "combined_actual_contract_link_rule_source_condition_pair_present",
  "source_rule_proof_target_ready",
  "receiver_rule_proof_target_ready",
  "combined_rule_proof_target_pair_ready",
  "source_actual_contract_link_rule_available",
  "receiver_actual_contract_link_rule_available",
  "combined_actual_contract_link_rule_pair_available",
  "source_constructed_witness_object_source_ready",
  "receiver_constructed_witness_object_source_ready",
  "combined_constructed_witness_object_source_pair_ready",
  "source_constructed_witness_object_id_present",
  "receiver_constructed_witness_object_id_present",
  "combined_constructed_witness_object_pair_present",
  "source_witness_object_membership_proof_present",
  "receiver_witness_object_membership_proof_present",
  "combined_witness_object_membership_proof_pair_present",
  "source_witness_object_contract_link_constructed",
  "receiver_witness_object_contract_link_constructed",
  "combined_witness_object_contract_link_pair_constructed",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "actual_contract_link_rule_source_condition_check",
    output_kind: "actual-contract-link-rule-source-condition",
    description:
      "Check whether the packet has the source-candidate IDs and target references needed to pose the actual contract-link rule proof target.",
    required_fields: RULE_SOURCE_CONDITION_FIELDS,
  },
  {
    method_id: "actual_contract_link_rule_proof_target_check",
    output_kind: "actual-contract-link-rule-proof-target",
    description:
      "Check whether a proof-grade actual contract-link introduction rule, derivation, soundness proof, and application proof are present.",
    required_fields: RULE_PROOF_TARGET_FIELDS,
  },
  {
    method_id: "constructed_witness_object_identity_source_check",
    output_kind: "constructed-witness-object-identity-source",
    description:
      "Check whether the source stack has enough witness-object input and inherited field claims to pose the same constructed-witness-object identity proof target.",
    required_fields: [
      ...CONSTRUCTED_WITNESS_OBJECT_SOURCE_FIELDS,
      "source_witness_object_attempt_id_present",
    ],
  },
  {
    method_id: "same_constructed_witness_object_membership_proof_check",
    output_kind: "same-constructed-witness-object-membership-proof",
    description:
      "Check whether a constructed witness object exists and proves co-membership of the endpoint-boundary-binding ref and endpoint value-binding map.",
    required_fields: CONSTRUCTED_WITNESS_OBJECT_PROOF_FIELDS,
  },
  {
    method_id: "actual_contract_link_construction_authorization_check",
    output_kind: "actual-witness-object-contract-link",
    description:
      "Check whether the rule proof, membership proof, remaining obligations, and downstream fields authorize actual contract-link construction.",
    required_fields: [
      "actual_contract_link_rule_available",
      "witness_object_membership_proof_present",
      ...DOWNSTREAM_OUTPUT_FIELDS,
    ],
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "actual_contract_link_introduction_rule",
    missing_field: "actual_contract_link_rule_available",
    required_evidence:
      "A proof-grade rule whose conclusion is an actual witness-object contract link from a source candidate plus all listed premises.",
  },
  {
    burden_id: "actual_contract_link_rule_derivation",
    missing_field: "actual_contract_link_rule_derivation_present",
    required_evidence:
      "A derivation or accepted construction theorem for the actual contract-link introduction rule.",
  },
  {
    burden_id: "actual_contract_link_rule_soundness",
    missing_field: "actual_contract_link_rule_soundness_proof_present",
    required_evidence:
      "A soundness proof that applying the rule cannot promote matched IDs or source equations into a constructed link without proof-grade premises.",
  },
  {
    burden_id: "constructed_witness_object_identity",
    missing_field: "same_constructed_witness_object_identity_proof_present",
    required_evidence:
      "A constructed same-packet witness object identity, not only a witness-object attempt id or symbol.",
  },
  {
    burden_id: "endpoint_boundary_binding_ref_membership",
    missing_field: "endpoint_boundary_binding_ref_member_of_witness_object_proven",
    required_evidence:
      "A field-membership proof that the endpoint-boundary-binding ref is a member of the constructed witness object.",
  },
  {
    burden_id: "endpoint_value_binding_map_membership",
    missing_field: "endpoint_value_binding_map_member_of_witness_object_proven",
    required_evidence:
      "A field-membership proof that the endpoint value-binding map is a member of the same constructed witness object.",
  },
  {
    burden_id: "co_membership_not_adjacency",
    missing_field: "membership_source_not_id_adjacency_proven",
    required_evidence:
      "A proof that co-membership follows from the constructed witness object rather than matching endpoint IDs, symbols, or source-candidate target references.",
  },
];

function parseArgs(argv) {
  const args = {
    sourcePacket: DEFAULT_SOURCE_PACKET,
    witnessObjectPacket: DEFAULT_WITNESS_OBJECT_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source-packet") {
      args.sourcePacket = argv[++index];
    } else if (arg === "--witness-object-packet") {
      args.witnessObjectPacket = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-actual-contract-link-rule-membership-proof-target.mjs [options]

Options:
  --source-packet PATH          Contract-link membership rule attempt packet JSON.
  --witness-object-packet PATH  Endpoint boundary-binding witness-object attempt packet JSON.
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

function assertSource(source, witnessObjectSource) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected source packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected source fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected source status: ${source.status}`);
  }
  if (witnessObjectSource.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected witness-object packet id: ${witnessObjectSource.packet_id}`);
  }
  if (witnessObjectSource.status !== WITNESS_OBJECT_STATUS) {
    throw new Error(`Unexpected witness-object status: ${witnessObjectSource.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger || source.row_closure) {
    throw new Error("Refusing rule/membership proof target from authorized or row-closed source packet.");
  }
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function falseFields(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function ruleSourceFields(endpoint) {
  const fields = endpoint.required_fields_present || {};
  return {
    actual_contract_link_rule_source_conditions_present:
      fields.actual_contract_link_rule_source_conditions_present === true,
    membership_source_conditions_ready:
      fields.membership_source_conditions_ready === true,
    source_candidate_id_present:
      fields.source_candidate_id_present === true,
    contract_target_id_present:
      fields.contract_target_id_present === true,
    endpoint_value_binding_map_id_present:
      fields.endpoint_value_binding_map_id_present === true,
    witness_object_endpoint_boundary_binding_ref_id_present:
      fields.witness_object_endpoint_boundary_binding_ref_id_present === true,
    source_witness_object_attempt_id_present:
      fields.source_witness_object_attempt_id_present === true,
    first_endpoint_boundary_binding_primitive_id_present:
      fields.first_endpoint_boundary_binding_primitive_id_present === true,
    target_endpoint_value_binding_source_equations_present:
      fields.target_endpoint_value_binding_source_equations_present === true,
  };
}

function ruleProofTargetFields() {
  return {
    actual_contract_link_introduction_rule_target_declared: true,
    actual_contract_link_introduction_rule_premises_named: true,
    actual_contract_link_introduction_rule_conclusion_named: true,
    actual_contract_link_rule_available: false,
    actual_contract_link_rule_derivation_present: false,
    actual_contract_link_rule_soundness_proof_present: false,
    actual_contract_link_rule_application_proof_present: false,
  };
}

function witnessObjectSourceFields(endpoint, witnessObjectEndpoint) {
  const sourceFields = endpoint.required_fields_present || {};
  const witnessFields = witnessObjectEndpoint.required_fields_present || {};
  return {
    witness_object_construction_input_ready:
      witnessFields.endpoint_boundary_binding_witness_object_construction_input_ready === true,
    witness_object_target_declared:
      witnessFields.endpoint_boundary_binding_witness_object_target_declared === true,
    inherited_witness_object_endpoint_boundary_binding_ref_field_claim:
      sourceFields.inherited_witness_object_endpoint_boundary_binding_ref_field_claim === true,
    inherited_witness_object_endpoint_value_binding_map_field_claim:
      sourceFields.inherited_witness_object_endpoint_value_binding_map_field_claim === true,
    same_source_witness_object_attempt_id_referenced:
      sourceFields.same_source_witness_object_attempt_id_referenced === true &&
      endpoint.source_witness_object_attempt_id === witnessObjectEndpoint.witness_object_attempt_id,
    witness_object_symbol_present:
      Boolean(endpoint.witness_object_symbol && witnessObjectEndpoint.witness_object_symbol),
    binding_symbol_present:
      Boolean(endpoint.binding_symbol && witnessObjectEndpoint.binding_symbol),
  };
}

function constructedWitnessObjectProofFields(witnessObjectEndpoint) {
  const witnessFields = witnessObjectEndpoint.required_fields_present || {};
  return {
    constructed_witness_object_id_present: false,
    endpoint_boundary_binding_witness_object_constructed:
      witnessFields.endpoint_boundary_binding_witness_object_constructed === true,
    constructed_witness_object_has_endpoint_boundary_binding_ref:
      witnessFields.witness_object_has_endpoint_boundary_binding_ref === true,
    constructed_witness_object_has_endpoint_value_binding_map:
      witnessFields.witness_object_has_endpoint_value_binding_map === true,
    same_constructed_witness_object_identity_proof_present: false,
    endpoint_boundary_binding_ref_member_of_witness_object_proven: false,
    endpoint_value_binding_map_member_of_witness_object_proven: false,
    endpoint_ref_and_value_map_same_witness_object_proven: false,
    membership_source_not_id_adjacency_proven: false,
    witness_object_membership_proof_present: false,
  };
}

function methodResult(method, fields, prefix) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    output_kind: method.output_kind,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `${prefix}_${field}`),
    passed: missingFields.length === 0,
  };
}

function missingBurdens(fields) {
  return PROOF_BURDENS
    .filter((burden) => fields[burden.missing_field] !== true)
    .map((burden) => ({
      ...burden,
      satisfied: false,
    }));
}

function buildEndpointTarget(endpoint, witnessObjectEndpoint) {
  const fields = {
    ...ruleSourceFields(endpoint),
    ...ruleProofTargetFields(),
    ...witnessObjectSourceFields(endpoint, witnessObjectEndpoint),
    ...constructedWitnessObjectProofFields(witnessObjectEndpoint),
    ...falseFields(DOWNSTREAM_OUTPUT_FIELDS),
  };
  const methodResults = CONSTRUCTION_METHODS.map((method) =>
    methodResult(method, fields, "actual_contract_link_rule_membership_proof_target_missing")
  );
  const missingProofBurdens = missingBurdens(fields);
  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    actual_contract_link_rule_membership_proof_target_id:
      `actual_contract_link_rule_membership_proof_target:${endpoint.id}`,
    source_contract_link_membership_rule_attempt_id:
      endpoint.contract_link_membership_rule_attempt_id,
    witness_object_attempt_id:
      witnessObjectEndpoint.witness_object_attempt_id,
    source_candidate_id: endpoint.source_candidate_id,
    source_contract_target_id: endpoint.source_contract_target_id,
    source_endpoint_value_binding_map_id: endpoint.source_endpoint_value_binding_map_id,
    witness_object_endpoint_boundary_binding_ref_id:
      endpoint.witness_object_endpoint_boundary_binding_ref_id,
    source_witness_object_attempt_id:
      endpoint.source_witness_object_attempt_id,
    source_first_endpoint_boundary_binding_primitive_id:
      endpoint.source_first_endpoint_boundary_binding_primitive_id,
    binding_symbol: endpoint.binding_symbol,
    witness_object_symbol: endpoint.witness_object_symbol,
    target_endpoint_ref_value_count:
      endpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equation_statuses:
      endpoint.target_endpoint_value_binding_source_equation_statuses,
    actual_contract_link_introduction_rule_target: {
      target_id: `actual_contract_link_introduction_rule_target:${endpoint.id}`,
      premise_fields: [
        "source_candidate_id",
        "source_contract_target_id",
        "source_endpoint_value_binding_map_id",
        "witness_object_endpoint_boundary_binding_ref_id",
        "source_witness_object_attempt_id",
        "source_first_endpoint_boundary_binding_primitive_id",
        "target_endpoint_value_binding_source_equations",
        "actual_contract_link_rule_derivation_present",
        "actual_contract_link_rule_soundness_proof_present",
        "actual_contract_link_rule_application_proof_present",
        "same_constructed_witness_object_identity_proof_present",
        "witness_object_membership_proof_present",
      ],
      conclusion_if_proven:
        "The source candidate may be promoted to an actual witness-object contract link only after all proof-grade premises are present.",
      soundness_limit:
        "This target is not an available rule and does not construct a witness-object contract link.",
    },
    constructed_witness_object_identity_target: {
      target_id: `constructed_witness_object_identity_target:${endpoint.id}`,
      witness_object_attempt_id: witnessObjectEndpoint.witness_object_attempt_id,
      endpoint_boundary_binding_ref_id:
        endpoint.witness_object_endpoint_boundary_binding_ref_id,
      endpoint_value_binding_map_id:
        endpoint.source_endpoint_value_binding_map_id,
      required_membership_fields: CONSTRUCTED_WITNESS_OBJECT_PROOF_FIELDS,
      soundness_limit:
        "A witness-object attempt id, witness-object symbol, inherited field claim, or source-candidate target reference is not a constructed witness-object identity proof.",
    },
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    actual_contract_link_rule_source_conditions_present:
      fields.actual_contract_link_rule_source_conditions_present,
    rule_proof_target_ready:
      fields.actual_contract_link_introduction_rule_target_declared &&
      fields.actual_contract_link_introduction_rule_premises_named &&
      fields.actual_contract_link_introduction_rule_conclusion_named,
    actual_contract_link_rule_available:
      fields.actual_contract_link_rule_available,
    constructed_witness_object_source_ready:
      fields.witness_object_construction_input_ready &&
      fields.witness_object_target_declared &&
      fields.inherited_witness_object_endpoint_boundary_binding_ref_field_claim &&
      fields.inherited_witness_object_endpoint_value_binding_map_field_claim,
    constructed_witness_object_id_present:
      fields.constructed_witness_object_id_present,
    witness_object_membership_proof_present:
      fields.witness_object_membership_proof_present,
    witness_object_contract_link_constructed:
      fields.witness_object_contract_link_constructed,
    row_consumption_authorized: false,
    failure_codes: [
      ...missingProofBurdens.map(
        (burden) => `actual_contract_link_rule_membership_proof_target_locked_${burden.missing_field}`
      ),
      "actual_contract_link_rule_membership_proof_target_locked_witness_object_contract_link_constructed",
      "actual_contract_link_rule_membership_proof_target_locked_row_consumption",
    ],
    obstruction:
      "The source conditions are present, but the packet has no available actual contract-link rule, no constructed witness-object identity, and no same constructed-witness-object membership proof.",
  };
}

function buildRowTarget(row, endpointById, witnessRowByRowId) {
  const sourceEndpoint = requireMapped(endpointById, row.source_variable, `source endpoint for ${row.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, row.receiver_variable, `receiver endpoint for ${row.row_id}`);
  const witnessRow = witnessRowByRowId.get(row.row_id);
  const fields = {
    row_locator_resolved:
      row.required_fields_present.row_locator_resolved === true ||
      witnessRow?.required_fields_present?.row_locator_resolved === true,
    source_actual_contract_link_rule_source_conditions_present:
      sourceEndpoint.actual_contract_link_rule_source_conditions_present === true,
    receiver_actual_contract_link_rule_source_conditions_present:
      receiverEndpoint.actual_contract_link_rule_source_conditions_present === true,
    combined_actual_contract_link_rule_source_condition_pair_present: false,
    source_rule_proof_target_ready:
      sourceEndpoint.rule_proof_target_ready === true,
    receiver_rule_proof_target_ready:
      receiverEndpoint.rule_proof_target_ready === true,
    combined_rule_proof_target_pair_ready: false,
    source_actual_contract_link_rule_available:
      sourceEndpoint.actual_contract_link_rule_available === true,
    receiver_actual_contract_link_rule_available:
      receiverEndpoint.actual_contract_link_rule_available === true,
    combined_actual_contract_link_rule_pair_available: false,
    source_constructed_witness_object_source_ready:
      sourceEndpoint.constructed_witness_object_source_ready === true,
    receiver_constructed_witness_object_source_ready:
      receiverEndpoint.constructed_witness_object_source_ready === true,
    combined_constructed_witness_object_source_pair_ready: false,
    source_constructed_witness_object_id_present:
      sourceEndpoint.constructed_witness_object_id_present === true,
    receiver_constructed_witness_object_id_present:
      receiverEndpoint.constructed_witness_object_id_present === true,
    combined_constructed_witness_object_pair_present: false,
    source_witness_object_membership_proof_present:
      sourceEndpoint.witness_object_membership_proof_present === true,
    receiver_witness_object_membership_proof_present:
      receiverEndpoint.witness_object_membership_proof_present === true,
    combined_witness_object_membership_proof_pair_present: false,
    source_witness_object_contract_link_constructed:
      sourceEndpoint.witness_object_contract_link_constructed === true,
    receiver_witness_object_contract_link_constructed:
      receiverEndpoint.witness_object_contract_link_constructed === true,
    combined_witness_object_contract_link_pair_constructed: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_actual_contract_link_rule_source_condition_pair_present =
    fields.source_actual_contract_link_rule_source_conditions_present &&
    fields.receiver_actual_contract_link_rule_source_conditions_present;
  fields.combined_rule_proof_target_pair_ready =
    fields.source_rule_proof_target_ready &&
    fields.receiver_rule_proof_target_ready;
  fields.combined_actual_contract_link_rule_pair_available =
    fields.source_actual_contract_link_rule_available &&
    fields.receiver_actual_contract_link_rule_available;
  fields.combined_constructed_witness_object_source_pair_ready =
    fields.source_constructed_witness_object_source_ready &&
    fields.receiver_constructed_witness_object_source_ready;
  fields.combined_constructed_witness_object_pair_present =
    fields.source_constructed_witness_object_id_present &&
    fields.receiver_constructed_witness_object_id_present;
  fields.combined_witness_object_membership_proof_pair_present =
    fields.source_witness_object_membership_proof_present &&
    fields.receiver_witness_object_membership_proof_present;
  fields.combined_witness_object_contract_link_pair_constructed =
    fields.source_witness_object_contract_link_constructed &&
    fields.receiver_witness_object_contract_link_constructed;
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
    source_actual_contract_link_rule_membership_proof_target_id:
      sourceEndpoint.actual_contract_link_rule_membership_proof_target_id,
    receiver_actual_contract_link_rule_membership_proof_target_id:
      receiverEndpoint.actual_contract_link_rule_membership_proof_target_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver rule and membership proof targets, but neither side has an available actual-link rule, constructed witness-object identity, membership proof, or contract link.",
  };
}

function rowIdMap(rows) {
  const map = new Map();
  for (const row of rows) {
    map.set(row.row_id, row);
  }
  return map;
}

function buildPacket(source, sourcePath, witnessObjectSource, witnessObjectPath) {
  assertSource(source, witnessObjectSource);
  const witnessObjectById = idMap(
    witnessObjectSource.endpoint_boundary_binding_witness_object_attempts,
    "witness-object endpoint attempt"
  );
  const endpointTargets = source.endpoint_contract_link_membership_rule_attempts.map((endpoint) =>
    buildEndpointTarget(endpoint, requireMapped(witnessObjectById, endpoint.id, `witness-object endpoint ${endpoint.id}`))
  );
  const endpointById = idMap(endpointTargets, "actual contract-link rule membership proof endpoint target");
  const witnessRowsById = rowIdMap(witnessObjectSource.row_endpoint_boundary_binding_witness_object_attempts);
  const rowTargets =
    source.row_contract_link_membership_rule_attempts.map((row) => buildRowTarget(row, endpointById, witnessRowsById));
  const endpointFieldCounts = fieldCounts(
    endpointTargets,
    ENDPOINT_FIELDS,
    (endpoint, field) => endpoint.required_fields_present[field]
  );
  const rowFieldCounts = fieldCounts(rowTargets, ROW_FIELDS, (row, field) => row.required_fields_present[field]);
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-actual-contract-link-rule-membership-proof-target-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Actual Contract-Link Rule And Membership Proof Target",
    claim_level:
      "priority-only fail-closed proof-target packet; 4 / 4 rule source-condition bundles, 4 / 4 rule proof targets, and 4 / 4 constructed-witness-object identity source bundles are present, but 0 / 4 actual contract-link rules are available, 0 / 4 constructed witness-object identities are present, 0 / 4 same constructed-witness-object membership proofs are present, and 0 rows are consumed",
    source_artifacts: {
      contract_link_membership_rule_attempt: artifactRecord(sourcePath),
      endpoint_boundary_binding_witness_object_construction_attempt:
        artifactRecord(witnessObjectPath),
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
      actual_contract_link_rule_source_conditions_present: true,
      actual_contract_link_rule_targets_declared: true,
      actual_contract_link_rules_available: false,
      constructed_witness_object_identity_sources_ready: true,
      constructed_witness_object_id_present: false,
      witness_object_membership_proofs_present: false,
      witness_object_contract_links_constructed: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    no_promotion_rule:
      "Rule source conditions, rule targets, witness-object input targets, inherited field claims, matching IDs, and matching symbols do not supply an available actual contract-link rule or a same constructed-witness-object membership proof.",
    construction_methods: CONSTRUCTION_METHODS,
    proof_burdens: PROOF_BURDENS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_actual_contract_link_rule_membership_proof_targets: endpointTargets,
    row_actual_contract_link_rule_membership_proof_targets: rowTargets,
    summary: {
      endpoint_functionals: endpointTargets.length,
      residual_consumer_rows: rowTargets.length,
      rule_source_condition_bundles_ready:
        endpointFieldCounts.actual_contract_link_rule_source_conditions_present,
      rule_proof_targets_declared:
        endpointFieldCounts.actual_contract_link_introduction_rule_target_declared,
      actual_contract_link_rules_available:
        endpointFieldCounts.actual_contract_link_rule_available,
      rule_derivations_present:
        endpointFieldCounts.actual_contract_link_rule_derivation_present,
      rule_soundness_proofs_present:
        endpointFieldCounts.actual_contract_link_rule_soundness_proof_present,
      rule_application_proofs_present:
        endpointFieldCounts.actual_contract_link_rule_application_proof_present,
      constructed_witness_object_source_bundles_ready:
        endpointTargets.filter((endpoint) => endpoint.constructed_witness_object_source_ready).length,
      constructed_witness_object_ids_present:
        endpointFieldCounts.constructed_witness_object_id_present,
      endpoint_boundary_binding_witness_objects_constructed:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_constructed,
      constructed_witness_object_identity_proofs_present:
        endpointFieldCounts.same_constructed_witness_object_identity_proof_present,
      endpoint_boundary_binding_ref_membership_proofs:
        endpointFieldCounts.endpoint_boundary_binding_ref_member_of_witness_object_proven,
      endpoint_value_binding_map_membership_proofs:
        endpointFieldCounts.endpoint_value_binding_map_member_of_witness_object_proven,
      co_membership_proofs:
        endpointFieldCounts.endpoint_ref_and_value_map_same_witness_object_proven,
      witness_object_membership_proofs_present:
        endpointFieldCounts.witness_object_membership_proof_present,
      witness_object_contract_links_constructed:
        endpointFieldCounts.witness_object_contract_link_constructed,
      binding_contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_binding_map_carriers_unblocked:
        endpointFieldCounts.endpoint_value_binding_map_carrier_unblocked,
      row_rule_source_condition_pairs_ready:
        rowFieldCounts.combined_actual_contract_link_rule_source_condition_pair_present,
      row_rule_proof_target_pairs_ready:
        rowFieldCounts.combined_rule_proof_target_pair_ready,
      row_actual_contract_link_rule_pairs_available:
        rowFieldCounts.combined_actual_contract_link_rule_pair_available,
      row_constructed_witness_object_source_pairs_ready:
        rowFieldCounts.combined_constructed_witness_object_source_pair_ready,
      row_constructed_witness_object_pairs_present:
        rowFieldCounts.combined_constructed_witness_object_pair_present,
      row_witness_object_membership_proof_pairs_present:
        rowFieldCounts.combined_witness_object_membership_proof_pair_present,
      row_witness_object_contract_link_pairs_constructed:
        rowFieldCounts.combined_witness_object_contract_link_pair_constructed,
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
      "Priority-only. This packet sharpens the next proof target above the source-condition layer. It records 4 / 4 actual-link rule source-condition bundles, 4 / 4 rule proof targets, and 4 / 4 constructed-witness-object identity source bundles, but it constructs 0 / 4 actual contract-link rules, 0 / 4 constructed witness-object identities, 0 / 4 same constructed-witness-object membership proofs, 0 / 4 actual witness-object contract links, and 0 consumed rows.",
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

function burdenTable(burdens) {
  return burdens
    .map((burden) => `| \`${burden.burden_id}\` | \`${burden.missing_field}\` | ${burden.required_evidence} |`)
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.actual_contract_link_rule_source_conditions_present} | ${endpoint.rule_proof_target_ready} | ${endpoint.actual_contract_link_rule_available} | ${endpoint.constructed_witness_object_source_ready} | ${endpoint.constructed_witness_object_id_present} | ${endpoint.witness_object_membership_proof_present} | ${endpoint.witness_object_contract_link_constructed} | ${endpoint.missing_proof_burden_count} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_actual_contract_link_rule_source_condition_pair_present} | ${row.required_fields_present.combined_rule_proof_target_pair_ready} | ${row.required_fields_present.combined_actual_contract_link_rule_pair_available} | ${row.required_fields_present.combined_constructed_witness_object_source_pair_ready} | ${row.required_fields_present.combined_constructed_witness_object_pair_present} | ${row.required_fields_present.combined_witness_object_membership_proof_pair_present} | ${row.required_fields_present.combined_witness_object_contract_link_pair_constructed} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Actual Contract-Link Rule And Membership Proof Target

## Verdict

Status: \`${packet.status}\`.

This priority-only packet sharpens the proof target above the source-condition
layer. It records ${summary.rule_source_condition_bundles_ready} / ${summary.endpoint_functionals}
actual-link rule source-condition bundles, declares ${summary.rule_proof_targets_declared} / ${summary.endpoint_functionals}
rule proof targets, and records ${summary.constructed_witness_object_source_bundles_ready} / ${summary.endpoint_functionals}
constructed-witness-object identity source bundles.

The packet remains fail-closed. It has ${summary.actual_contract_link_rules_available} / ${summary.endpoint_functionals}
actual contract-link rules available, ${summary.constructed_witness_object_ids_present} / ${summary.endpoint_functionals}
constructed witness-object identities, ${summary.witness_object_membership_proofs_present} / ${summary.endpoint_functionals}
same constructed-witness-object membership proofs, and
${summary.witness_object_contract_links_constructed} / ${summary.endpoint_functionals}
actual witness-object contract links. It consumes ${summary.row_consumption_count}
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## No-Promotion Rule

${packet.no_promotion_rule}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Construction Methods

| Method | Output kind | Required fields | Description |
| --- | --- | ---: | --- |
${methodTable(packet.construction_methods)}

## Endpoint Targets

| Endpoint | Role | Rule source | Rule target | Rule available | Witness source | Witness identity | Membership proof | Contract link | Missing burdens |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_actual_contract_link_rule_membership_proof_targets)}

## Row Targets

| Row | Failed side | Rule source pair | Rule target pair | Rule pair available | Witness source pair | Witness identity pair | Membership proof pair | Contract-link pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_actual_contract_link_rule_membership_proof_targets)}

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
  const source = readJson(args.sourcePacket);
  const witnessObjectSource = readJson(args.witnessObjectPacket);
  const packet = buildPacket(source, args.sourcePacket, witnessObjectSource, args.witnessObjectPacket);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

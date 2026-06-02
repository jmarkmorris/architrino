#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_RULE_MEMBERSHIP_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_actual_contract_link_rule_membership_proof_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NON_DOMAIN_CARRIER_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REF_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const RULE_MEMBERSHIP_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-contract-link-rule-membership-proof-target-fail-closed-source-conditions-present-rule-proof-and-constructed-witness-object-identity-absent-no-row-consumption";
const NON_DOMAIN_CARRIER_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption";
const REF_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt-fail-closed-domain-chart-ref-value-sources-present-non-domain-carriers-and-identity-proof-absent-no-row-consumption";

const SOURCE_FIELDS = [
  "domain_chart_carrier_subfield_constructed",
  "domain_chart_carrier_preserved_as_partial_source",
  "source_endpoint_boundary_binding_ref_constructed",
  "source_witness_object_has_endpoint_boundary_binding_ref",
  "source_endpoint_value_binding_map_constructed",
  "source_witness_object_has_endpoint_value_binding_map",
  "source_endpoint_value_bound_to_boundary_binding",
  "actual_contract_link_rule_source_conditions_present",
  "constructed_witness_object_source_ready",
  "non_domain_carrier_obstruction_present",
  "endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared",
  "endpoint_value_binding_map_non_domain_carrier_source_candidate_declared",
];

const CARRIER_COMPLETENESS_FIELDS = [
  "same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed",
  "same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed",
  "same_packet_witness_object_contract_link_carrier_field_constructed",
  "same_packet_witness_object_algebraic_certificate_refs_carrier_field_constructed",
  "same_packet_witness_object_motion_evaluation_refs_carrier_field_constructed",
  "same_packet_witness_object_artifact_topology_replay_refs_carrier_field_constructed",
  "all_carrier_fields_constructed",
];

const IDENTITY_PROOF_FIELDS = [
  "constructed_witness_object_id_present",
  "endpoint_boundary_binding_witness_object_constructed",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "endpoint_ref_and_value_map_same_witness_object_proven",
  "membership_source_not_id_adjacency_proven",
  "witness_object_membership_proof_present",
];

const DOWNSTREAM_LOCK_FIELDS = [
  "actual_contract_link_rule_available",
  "actual_contract_link_rule_derivation_present",
  "actual_contract_link_rule_soundness_proof_present",
  "actual_contract_link_rule_application_proof_present",
  "witness_object_contract_link_constructed",
  "witness_object_has_contract_link",
  "binding_contract_satisfied",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
  "residual_data_construction_ready",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_FIELDS,
  ...CARRIER_COMPLETENESS_FIELDS,
  ...IDENTITY_PROOF_FIELDS,
  ...DOWNSTREAM_LOCK_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_domain_chart_carrier_subfield_constructed",
  "receiver_domain_chart_carrier_subfield_constructed",
  "combined_domain_chart_carrier_subfield_pair_constructed",
  "source_ref_value_source_pair_ready",
  "receiver_ref_value_source_pair_ready",
  "combined_ref_value_source_pair_ready",
  "source_non_domain_carrier_obstruction_present",
  "receiver_non_domain_carrier_obstruction_present",
  "combined_non_domain_carrier_obstruction_pair_present",
  "source_all_carrier_fields_constructed",
  "receiver_all_carrier_fields_constructed",
  "combined_all_carrier_fields_constructed",
  "source_constructed_witness_object_identity_present",
  "receiver_constructed_witness_object_identity_present",
  "combined_constructed_witness_object_identity_pair_present",
  "source_witness_object_membership_proof_present",
  "receiver_witness_object_membership_proof_present",
  "combined_witness_object_membership_proof_pair_present",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "ref_value_source_pair_check",
    output_kind: "same-packet-witness-object-source-pair",
    description:
      "Check whether the endpoint has a domain-chart carrier subfield plus source endpoint-boundary-binding ref and endpoint value-binding map handles.",
    required_fields: SOURCE_FIELDS,
  },
  {
    method_id: "same_packet_carrier_completeness_check",
    output_kind: "carrier-complete-witness-object",
    description:
      "Check whether the ref, value-map, contract-link, algebraic, motion/evaluation, and artifact/topology/replay non-domain carrier fields are constructed in the same witness object.",
    required_fields: [
      "domain_chart_carrier_subfield_constructed",
      ...CARRIER_COMPLETENESS_FIELDS,
    ],
  },
  {
    method_id: "constructed_witness_object_identity_check",
    output_kind: "constructed-witness-object-identity",
    description:
      "Check whether carrier completeness supplies a constructed same-packet witness-object identity.",
    required_fields: [
      "all_carrier_fields_constructed",
      "constructed_witness_object_id_present",
      "endpoint_boundary_binding_witness_object_constructed",
      "same_constructed_witness_object_identity_proof_present",
    ],
  },
  {
    method_id: "same_witness_object_field_membership_check",
    output_kind: "same-constructed-witness-object-membership-proof",
    description:
      "Check whether the endpoint-boundary-binding ref and endpoint value-binding map are proved fields of the same constructed witness object.",
    required_fields: IDENTITY_PROOF_FIELDS,
  },
  {
    method_id: "actual_contract_link_authorization_guard",
    output_kind: "actual-contract-link-authorization",
    description:
      "Keep actual contract-link, binding contract, full binding, carrier admission, residual, row, and branch-chart outputs locked unless the constructed witness-object identity and membership proof exist.",
    required_fields: [
      "witness_object_membership_proof_present",
      ...DOWNSTREAM_LOCK_FIELDS,
    ],
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "same_packet_endpoint_boundary_binding_ref_carrier_field",
    missing_field: "same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed",
    required_evidence:
      "A non-domain carrier field inside the same witness object for the endpoint-boundary-binding ref, not only a source reference field from an earlier packet.",
  },
  {
    burden_id: "same_packet_endpoint_value_binding_map_carrier_field",
    missing_field: "same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed",
    required_evidence:
      "A non-domain carrier field inside the same witness object for the endpoint value-binding map, not only a source value map bound to the first primitive.",
  },
  {
    burden_id: "carrier_complete_witness_object",
    missing_field: "all_carrier_fields_constructed",
    required_evidence:
      "All seven witness-object carrier fields, including the six non-domain carrier families, constructed in one same-packet witness object.",
  },
  {
    burden_id: "constructed_witness_object_identity",
    missing_field: "same_constructed_witness_object_identity_proof_present",
    required_evidence:
      "A proof-grade same-packet witness-object identity attached to a constructed witness object id.",
  },
  {
    burden_id: "endpoint_boundary_binding_ref_membership",
    missing_field: "endpoint_boundary_binding_ref_member_of_witness_object_proven",
    required_evidence:
      "A membership proof that the endpoint-boundary-binding ref is a field of the constructed witness object.",
  },
  {
    burden_id: "endpoint_value_binding_map_membership",
    missing_field: "endpoint_value_binding_map_member_of_witness_object_proven",
    required_evidence:
      "A membership proof that the endpoint value-binding map is a field of the same constructed witness object.",
  },
  {
    burden_id: "co_membership_not_source_adjacency",
    missing_field: "membership_source_not_id_adjacency_proven",
    required_evidence:
      "A proof that ref/value co-membership follows from the constructed witness object, not from matching IDs, symbols, inherited field claims, or source-candidate adjacency.",
  },
];

function parseArgs(argv) {
  const args = {
    ruleMembershipTargetPacket: DEFAULT_RULE_MEMBERSHIP_TARGET_PACKET,
    nonDomainCarrierPacket: DEFAULT_NON_DOMAIN_CARRIER_PACKET,
    refPacket: DEFAULT_REF_PACKET,
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--rule-membership-target-packet") {
      args.ruleMembershipTargetPacket = argv[++index];
    } else if (arg === "--non-domain-carrier-packet") {
      args.nonDomainCarrierPacket = argv[++index];
    } else if (arg === "--ref-packet") {
      args.refPacket = argv[++index];
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt.mjs [options]

Options:
  --rule-membership-target-packet PATH  Actual contract-link rule/membership proof target JSON.
  --non-domain-carrier-packet PATH      Same-packet non-domain carrier obstruction packet JSON.
  --ref-packet PATH                     Endpoint-boundary-binding ref construction packet JSON.
  --value-map-packet PATH               Endpoint value-binding map construction packet JSON.
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

function assertPacket(packet, status, label) {
  if (packet.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${packet.packet_id}`);
  }
  if (packet.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${label} fold-coordinate packet id: ${packet.fold_coordinate_packet_id}`);
  }
  if (packet.status !== status) {
    throw new Error(`Unexpected ${label} status: ${packet.status}`);
  }
  if (packet.branch_chart_authorized || packet.preledger_pass || packet.updates_live_ledger || packet.row_closure) {
    throw new Error(`Refusing constructed witness-object identity attempt from authorized ${label}.`);
  }
}

function assertSources(sources) {
  assertPacket(sources.ruleMembershipTarget, RULE_MEMBERSHIP_TARGET_STATUS, "rule/membership target");
  assertPacket(sources.nonDomainCarrier, NON_DOMAIN_CARRIER_STATUS, "non-domain carrier packet");
  assertPacket(sources.ref, REF_STATUS, "endpoint-boundary-binding ref packet");
  assertPacket(sources.valueMap, VALUE_MAP_STATUS, "endpoint value-binding map packet");
  if (sources.nonDomainCarrier.summary?.endpoint_domain_chart_carriers !== 4) {
    throw new Error("Expected four domain-chart carriers in non-domain carrier packet.");
  }
  if (sources.nonDomainCarrier.summary?.endpoint_non_domain_carrier_slots !== 24) {
    throw new Error("Expected 24 non-domain carrier slots in non-domain carrier packet.");
  }
}

function assertSameEndpoint(endpoint, sourceEndpoint, label) {
  for (const field of ["id", "endpoint_functional_id", "role", "witness_object_symbol"]) {
    if (
      Object.hasOwn(endpoint, field) &&
      Object.hasOwn(sourceEndpoint, field) &&
      endpoint[field] !== sourceEndpoint[field]
    ) {
      throw new Error(`Endpoint mismatch for ${endpoint.id} against ${label}: ${field}`);
    }
  }
}

function assertSameRow(row, sourceRow, label) {
  for (const field of ["row_id", "source_variable", "receiver_variable", "failed_side", "boundary_side"]) {
    if (
      Object.hasOwn(row, field) &&
      Object.hasOwn(sourceRow, field) &&
      row[field] !== sourceRow[field]
    ) {
      throw new Error(`Row mismatch for ${row.row_id} against ${label}: ${field}`);
    }
  }
}

function carrierObstruction(endpoint, carrierField) {
  const obstruction = endpoint.non_domain_carrier_obstructions.find(
    (entry) => entry.carrier_field === carrierField
  );
  if (!obstruction) {
    throw new Error(`Missing non-domain carrier obstruction ${carrierField} for endpoint ${endpoint.id}`);
  }
  return obstruction;
}

function falseFields(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    output_kind: method.output_kind,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `same_packet_constructed_witness_object_identity_missing_${field}`
    ),
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

function endpointSources(endpoint, maps) {
  const targetEndpoint = requireMapped(
    maps.ruleMembershipTarget,
    endpoint.id,
    `rule/membership target endpoint ${endpoint.id}`
  );
  const refEndpoint = requireMapped(maps.ref, endpoint.id, `ref endpoint ${endpoint.id}`);
  const valueEndpoint = requireMapped(maps.valueMap, endpoint.id, `value-map endpoint ${endpoint.id}`);
  assertSameEndpoint(endpoint, targetEndpoint, "rule/membership target");
  assertSameEndpoint(endpoint, refEndpoint, "ref packet");
  assertSameEndpoint(endpoint, valueEndpoint, "value-map packet");
  return {
    targetEndpoint,
    refEndpoint,
    valueEndpoint,
  };
}

function buildEndpointAttempt(endpoint, sources) {
  const { targetEndpoint, refEndpoint, valueEndpoint } = sources;
  const refCarrier = carrierObstruction(endpoint, "endpoint_boundary_binding_ref");
  const valueCarrier = carrierObstruction(endpoint, "endpoint_value_binding_map");
  const contractCarrier = carrierObstruction(endpoint, "contract_link");
  const algebraicCarrier = carrierObstruction(endpoint, "algebraic_certificate_refs");
  const motionCarrier = carrierObstruction(endpoint, "motion_evaluation_refs");
  const replayCarrier = carrierObstruction(endpoint, "artifact_topology_replay_refs");
  const fields = {
    domain_chart_carrier_subfield_constructed:
      endpoint.required_fields_present?.domain_chart_carrier_subfield_constructed === true,
    domain_chart_carrier_preserved_as_partial_source:
      endpoint.required_fields_present?.witness_object_has_domain_chart === true,
    source_endpoint_boundary_binding_ref_constructed:
      refEndpoint.required_fields_present?.witness_object_endpoint_boundary_binding_ref_constructed === true,
    source_witness_object_has_endpoint_boundary_binding_ref:
      refEndpoint.required_fields_present?.witness_object_has_endpoint_boundary_binding_ref === true,
    source_endpoint_value_binding_map_constructed:
      valueEndpoint.required_fields_present?.endpoint_value_binding_map_constructed === true,
    source_witness_object_has_endpoint_value_binding_map:
      valueEndpoint.required_fields_present?.witness_object_has_endpoint_value_binding_map === true,
    source_endpoint_value_bound_to_boundary_binding:
      valueEndpoint.required_fields_present?.endpoint_value_bound_to_boundary_binding === true,
    actual_contract_link_rule_source_conditions_present:
      targetEndpoint.required_fields_present?.actual_contract_link_rule_source_conditions_present === true,
    constructed_witness_object_source_ready:
      targetEndpoint.constructed_witness_object_source_ready === true,
    non_domain_carrier_obstruction_present:
      endpoint.required_fields_present?.non_domain_carrier_obstruction_present === true,
    endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared:
      refCarrier.carrier_field_source_candidate_declared === true,
    endpoint_value_binding_map_non_domain_carrier_source_candidate_declared:
      valueCarrier.carrier_field_source_candidate_declared === true,
    same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed:
      refCarrier.carrier_field_constructed === true,
    same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed:
      valueCarrier.carrier_field_constructed === true,
    same_packet_witness_object_contract_link_carrier_field_constructed:
      contractCarrier.carrier_field_constructed === true,
    same_packet_witness_object_algebraic_certificate_refs_carrier_field_constructed:
      algebraicCarrier.carrier_field_constructed === true,
    same_packet_witness_object_motion_evaluation_refs_carrier_field_constructed:
      motionCarrier.carrier_field_constructed === true,
    same_packet_witness_object_artifact_topology_replay_refs_carrier_field_constructed:
      replayCarrier.carrier_field_constructed === true,
    all_carrier_fields_constructed:
      endpoint.required_fields_present?.all_carrier_fields_constructed === true,
    ...falseFields(IDENTITY_PROOF_FIELDS),
    ...falseFields(DOWNSTREAM_LOCK_FIELDS),
  };
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const missingProofBurdens = missingBurdens(fields);
  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    same_packet_constructed_witness_object_identity_attempt_id:
      `same_packet_constructed_witness_object_identity_attempt:${endpoint.id}`,
    source_actual_contract_link_rule_membership_proof_target_id:
      targetEndpoint.actual_contract_link_rule_membership_proof_target_id,
    source_non_domain_carrier_obstruction_id:
      endpoint.non_domain_carrier_obstruction_id,
    source_domain_chart_carrier_subfield_id:
      endpoint.domain_chart_carrier_subfield_id,
    source_ref_carrier_full_binding_construction_attempt_id:
      refEndpoint.ref_carrier_full_binding_construction_attempt_id,
    source_value_binding_map_construction_attempt_id:
      valueEndpoint.endpoint_value_binding_map_construction_attempt_id,
    witness_object_attempt_id:
      targetEndpoint.witness_object_attempt_id || endpoint.witness_object_attempt_id,
    witness_object_symbol:
      targetEndpoint.witness_object_symbol || endpoint.witness_object_symbol,
    endpoint_boundary_binding_ref_id:
      targetEndpoint.witness_object_endpoint_boundary_binding_ref_id ||
      refEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    endpoint_value_binding_map_id:
      targetEndpoint.source_endpoint_value_binding_map_id ||
      valueEndpoint.endpoint_value_binding_map_id,
    target_endpoint_ref_value_count:
      targetEndpoint.target_endpoint_ref_value_count,
    source_ref_field_status:
      "source-reference-field-constructed-not-same-packet-carrier-field",
    source_value_map_status:
      "source-value-map-constructed-not-same-packet-carrier-field",
    carrier_completeness_target: {
      target_id: `carrier_complete_witness_object_target:${endpoint.id}`,
      required_carrier_fields: [
        "domain_chart",
        "endpoint_boundary_binding_ref",
        "endpoint_value_binding_map",
        "contract_link",
        "algebraic_certificate_refs",
        "motion_evaluation_refs",
        "artifact_topology_replay_refs",
      ],
      constructed_carrier_fields: ["domain_chart"],
      missing_carrier_fields: endpoint.missing_carrier_fields,
      soundness_limit:
        "The domain_chart carrier and source ref/value handles are not a carrier-complete same-packet witness object.",
    },
    constructed_witness_object_identity_target: {
      target_id: `same_packet_constructed_witness_object_identity_target:${endpoint.id}`,
      witness_object_attempt_id:
        targetEndpoint.witness_object_attempt_id || endpoint.witness_object_attempt_id,
      endpoint_boundary_binding_ref_id:
        targetEndpoint.witness_object_endpoint_boundary_binding_ref_id ||
        refEndpoint.witness_object_endpoint_boundary_binding_ref_id,
      endpoint_value_binding_map_id:
        targetEndpoint.source_endpoint_value_binding_map_id ||
        valueEndpoint.endpoint_value_binding_map_id,
      required_membership_fields: IDENTITY_PROOF_FIELDS,
      soundness_limit:
        "A source ref field, source value map, witness-object symbol, and matching endpoint id do not prove same constructed-witness-object membership.",
    },
    non_domain_carrier_obstructions_used: [
      refCarrier,
      valueCarrier,
      contractCarrier,
      algebraicCarrier,
      motionCarrier,
      replayCarrier,
    ],
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    ref_value_source_pair_ready:
      fields.source_endpoint_boundary_binding_ref_constructed &&
      fields.source_endpoint_value_binding_map_constructed,
    all_carrier_fields_constructed: fields.all_carrier_fields_constructed,
    constructed_witness_object_id_present:
      fields.constructed_witness_object_id_present,
    same_constructed_witness_object_identity_proof_present:
      fields.same_constructed_witness_object_identity_proof_present,
    witness_object_membership_proof_present:
      fields.witness_object_membership_proof_present,
    witness_object_contract_link_constructed:
      fields.witness_object_contract_link_constructed,
    row_consumption_authorized: false,
    failure_codes: [
      ...missingProofBurdens.map(
        (burden) => `same_packet_constructed_witness_object_identity_locked_${burden.missing_field}`
      ),
      "same_packet_constructed_witness_object_identity_locked_witness_object_contract_link_constructed",
      "same_packet_constructed_witness_object_identity_locked_row_consumption",
    ],
    obstruction:
      "The endpoint has domain-chart, source ref, and source value-map handles, but the same-packet witness object lacks the non-domain carrier fields needed for constructed identity and ref/value co-membership proof.",
  };
}

function rowSources(row, maps) {
  const targetRow = requireMapped(maps.ruleMembershipTargetRows, row.row_id, `rule/membership target row ${row.row_id}`);
  const refRow = requireMapped(maps.refRows, row.row_id, `ref row ${row.row_id}`);
  const valueRow = requireMapped(maps.valueRows, row.row_id, `value-map row ${row.row_id}`);
  assertSameRow(row, targetRow, "rule/membership target");
  assertSameRow(row, refRow, "ref packet");
  assertSameRow(row, valueRow, "value-map packet");
  return { targetRow, refRow, valueRow };
}

function buildRowAttempt(row, endpointById, sources) {
  const sourceEndpoint = requireMapped(endpointById, row.source_variable, `source endpoint for ${row.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, row.receiver_variable, `receiver endpoint for ${row.row_id}`);
  const refFields = sources.refRow.required_fields_present || {};
  const valueFields = sources.valueRow.required_fields_present || {};
  const fields = {
    row_locator_resolved: sources.targetRow.required_fields_present?.row_locator_resolved === true,
    source_domain_chart_carrier_subfield_constructed:
      sourceEndpoint.required_fields_present.domain_chart_carrier_subfield_constructed === true,
    receiver_domain_chart_carrier_subfield_constructed:
      receiverEndpoint.required_fields_present.domain_chart_carrier_subfield_constructed === true,
    combined_domain_chart_carrier_subfield_pair_constructed: false,
    source_ref_value_source_pair_ready: sourceEndpoint.ref_value_source_pair_ready === true,
    receiver_ref_value_source_pair_ready: receiverEndpoint.ref_value_source_pair_ready === true,
    combined_ref_value_source_pair_ready: false,
    source_non_domain_carrier_obstruction_present:
      sourceEndpoint.required_fields_present.non_domain_carrier_obstruction_present === true,
    receiver_non_domain_carrier_obstruction_present:
      receiverEndpoint.required_fields_present.non_domain_carrier_obstruction_present === true,
    combined_non_domain_carrier_obstruction_pair_present: false,
    source_all_carrier_fields_constructed: false,
    receiver_all_carrier_fields_constructed: false,
    combined_all_carrier_fields_constructed: false,
    source_constructed_witness_object_identity_present: false,
    receiver_constructed_witness_object_identity_present: false,
    combined_constructed_witness_object_identity_pair_present: false,
    source_witness_object_membership_proof_present: false,
    receiver_witness_object_membership_proof_present: false,
    combined_witness_object_membership_proof_pair_present: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_domain_chart_carrier_subfield_pair_constructed =
    fields.source_domain_chart_carrier_subfield_constructed &&
    fields.receiver_domain_chart_carrier_subfield_constructed;
  fields.combined_ref_value_source_pair_ready =
    fields.source_ref_value_source_pair_ready && fields.receiver_ref_value_source_pair_ready;
  fields.combined_non_domain_carrier_obstruction_pair_present =
    fields.source_non_domain_carrier_obstruction_present &&
    fields.receiver_non_domain_carrier_obstruction_present;
  fields.combined_all_carrier_fields_constructed =
    fields.source_all_carrier_fields_constructed && fields.receiver_all_carrier_fields_constructed;
  fields.combined_constructed_witness_object_identity_pair_present =
    fields.source_constructed_witness_object_identity_present &&
    fields.receiver_constructed_witness_object_identity_present;
  fields.combined_witness_object_membership_proof_pair_present =
    fields.source_witness_object_membership_proof_present &&
    fields.receiver_witness_object_membership_proof_present;
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
    source_same_packet_constructed_witness_object_identity_attempt_id:
      sourceEndpoint.same_packet_constructed_witness_object_identity_attempt_id,
    receiver_same_packet_constructed_witness_object_identity_attempt_id:
      receiverEndpoint.same_packet_constructed_witness_object_identity_attempt_id,
    source_ref_row_fields_present: {
      row_witness_object_endpoint_boundary_binding_ref_pair_constructed:
        refFields.combined_witness_object_endpoint_boundary_binding_ref_pair_constructed === true,
      row_endpoint_boundary_binding_ref_carrier_pair_unblocked:
        refFields.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked === true,
    },
    source_value_row_fields_present: {
      row_endpoint_value_binding_map_pair_constructed:
        valueFields.combined_endpoint_value_binding_map_pair_constructed === true,
      row_endpoint_value_binding_pair_constructed:
        valueFields.combined_endpoint_value_binding_pair_constructed === true,
      row_binding_contract_pair_satisfied:
        valueFields.combined_binding_contract_pair_satisfied === true,
    },
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver ref/value source handles and domain-chart carriers, but neither side has a carrier-complete constructed witness-object identity or same-witness membership proof.",
  };
}

function fieldCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => [field, countTrue(rows, (row) => row.required_fields_present[field])])
  );
}

function buildPacket(sources, sourcePaths) {
  assertSources(sources);
  const maps = {
    ruleMembershipTarget: idMap(
      sources.ruleMembershipTarget.endpoint_actual_contract_link_rule_membership_proof_targets,
      "id",
      "rule/membership target endpoint"
    ),
    nonDomainCarrier: idMap(
      sources.nonDomainCarrier.endpoint_witness_object_non_domain_carrier_obstruction_packets,
      "id",
      "non-domain carrier endpoint"
    ),
    ref: idMap(
      sources.ref.endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts,
      "id",
      "ref endpoint"
    ),
    valueMap: idMap(
      sources.valueMap.endpoint_value_binding_map_construction_attempts,
      "id",
      "value-map endpoint"
    ),
    ruleMembershipTargetRows: idMap(
      sources.ruleMembershipTarget.row_actual_contract_link_rule_membership_proof_targets,
      "row_id",
      "rule/membership target row"
    ),
    nonDomainCarrierRows: idMap(
      sources.nonDomainCarrier.row_witness_object_non_domain_carrier_obstruction_packets,
      "row_id",
      "non-domain carrier row"
    ),
    refRows: idMap(
      sources.ref.row_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts,
      "row_id",
      "ref row"
    ),
    valueRows: idMap(
      sources.valueMap.row_endpoint_value_binding_map_construction_attempts,
      "row_id",
      "value-map row"
    ),
  };
  const endpointAttempts =
    sources.nonDomainCarrier.endpoint_witness_object_non_domain_carrier_obstruction_packets.map(
      (endpoint) => buildEndpointAttempt(endpoint, endpointSources(endpoint, maps))
    );
  const endpointById = idMap(
    endpointAttempts,
    "id",
    "same-packet constructed witness-object identity endpoint"
  );
  const rowAttempts =
    sources.nonDomainCarrier.row_witness_object_non_domain_carrier_obstruction_packets.map((row) =>
      buildRowAttempt(row, endpointById, rowSources(row, maps))
    );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Same-Packet Constructed Witness-Object Identity Attempt",
    claim_level:
      "priority-only fail-closed proof packet; domain-chart, endpoint-boundary-binding ref source, and endpoint value-map source handles are present, but same-packet non-domain carrier fields, constructed witness-object identity, and ref/value membership proof are absent",
    source_artifacts: {
      actual_contract_link_rule_membership_proof_target:
        artifactRecord(sourcePaths.ruleMembershipTarget),
      same_packet_non_domain_carrier_obstruction:
        artifactRecord(sourcePaths.nonDomainCarrier),
      endpoint_boundary_binding_ref_source_packet:
        artifactRecord(sourcePaths.ref),
      endpoint_value_binding_map_source_packet:
        artifactRecord(sourcePaths.valueMap),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    row_closure: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      source_ref_value_handles_present: true,
      domain_chart_carriers_present: true,
      non_domain_carrier_obstructions_present: true,
      all_carrier_fields_constructed: false,
      constructed_witness_object_id_present: false,
      same_constructed_witness_object_identity_proof_present: false,
      witness_object_membership_proofs_present: false,
      witness_object_contract_links_constructed: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    no_promotion_rule:
      "Source ref/value handles, domain-chart carriers, matching witness-object symbols, and endpoint IDs do not supply a constructed same-packet witness-object identity or ref/value co-membership proof.",
    construction_methods: CONSTRUCTION_METHODS,
    proof_burdens: PROOF_BURDENS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_same_packet_constructed_witness_object_identity_attempts:
      endpointAttempts,
    row_same_packet_constructed_witness_object_identity_attempts:
      rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      domain_chart_carrier_subfields_constructed:
        endpointFieldCounts.domain_chart_carrier_subfield_constructed,
      source_endpoint_boundary_binding_refs_constructed:
        endpointFieldCounts.source_endpoint_boundary_binding_ref_constructed,
      source_endpoint_value_binding_maps_constructed:
        endpointFieldCounts.source_endpoint_value_binding_map_constructed,
      non_domain_carrier_obstructions_present:
        endpointFieldCounts.non_domain_carrier_obstruction_present,
      same_packet_endpoint_boundary_binding_ref_carrier_fields_constructed:
        endpointFieldCounts.same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed,
      same_packet_endpoint_value_binding_map_carrier_fields_constructed:
        endpointFieldCounts.same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed,
      all_carrier_fields_constructed:
        endpointFieldCounts.all_carrier_fields_constructed,
      constructed_witness_object_ids_present:
        endpointFieldCounts.constructed_witness_object_id_present,
      endpoint_boundary_binding_witness_objects_constructed:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_constructed,
      same_constructed_witness_object_identity_proofs_present:
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
      row_ref_value_source_pairs_ready:
        rowFieldCounts.combined_ref_value_source_pair_ready,
      row_non_domain_carrier_obstruction_pairs_present:
        rowFieldCounts.combined_non_domain_carrier_obstruction_pair_present,
      row_all_carrier_field_pairs_constructed:
        rowFieldCounts.combined_all_carrier_fields_constructed,
      row_constructed_witness_object_identity_pairs_present:
        rowFieldCounts.combined_constructed_witness_object_identity_pair_present,
      row_witness_object_membership_proof_pairs_present:
        rowFieldCounts.combined_witness_object_membership_proof_pair_present,
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
      "Priority-only. This packet proves the recommended route is still blocked at same-packet witness-object identity: ref/value source handles and domain-chart carriers are present, but non-domain carrier fields, constructed witness-object identity, same-witness membership proof, actual contract links, and row consumption are absent.",
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.ref_value_source_pair_ready} | ${endpoint.required_fields_present.domain_chart_carrier_subfield_constructed} | ${endpoint.all_carrier_fields_constructed} | ${endpoint.constructed_witness_object_id_present} | ${endpoint.same_constructed_witness_object_identity_proof_present} | ${endpoint.witness_object_membership_proof_present} | ${endpoint.witness_object_contract_link_constructed} | ${endpoint.missing_proof_burden_count} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_ref_value_source_pair_ready} | ${row.required_fields_present.combined_domain_chart_carrier_subfield_pair_constructed} | ${row.required_fields_present.combined_non_domain_carrier_obstruction_pair_present} | ${row.required_fields_present.combined_all_carrier_fields_constructed} | ${row.required_fields_present.combined_constructed_witness_object_identity_pair_present} | ${row.required_fields_present.combined_witness_object_membership_proof_pair_present} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Same-Packet Constructed Witness-Object Identity Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet tests the recommended first route above the actual
contract-link rule/membership proof target: construct the same-packet witness
object identity before attempting the actual contract-link rule.

It records ${summary.domain_chart_carrier_subfields_constructed} / ${summary.endpoint_functionals}
domain-chart carrier subfields, ${summary.source_endpoint_boundary_binding_refs_constructed} / ${summary.endpoint_functionals}
source endpoint-boundary-binding refs, ${summary.source_endpoint_value_binding_maps_constructed} / ${summary.endpoint_functionals}
source endpoint value-binding maps, and ${summary.non_domain_carrier_obstructions_present} / ${summary.endpoint_functionals}
non-domain carrier obstruction records.

The packet remains fail-closed. It has ${summary.same_packet_endpoint_boundary_binding_ref_carrier_fields_constructed} / ${summary.endpoint_functionals}
same-packet endpoint-boundary-binding ref carrier fields, ${summary.same_packet_endpoint_value_binding_map_carrier_fields_constructed} / ${summary.endpoint_functionals}
same-packet endpoint value-binding map carrier fields, ${summary.all_carrier_fields_constructed} / ${summary.endpoint_functionals}
carrier-complete witness objects, ${summary.constructed_witness_object_ids_present} / ${summary.endpoint_functionals}
constructed witness-object identities, ${summary.witness_object_membership_proofs_present} / ${summary.endpoint_functionals}
same constructed-witness-object membership proofs, and ${summary.witness_object_contract_links_constructed} / ${summary.endpoint_functionals}
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

## Endpoint Attempts

| Endpoint | Role | Ref/value source | Domain chart | All carriers | Witness identity | Identity proof | Membership proof | Contract link | Missing burdens |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_same_packet_constructed_witness_object_identity_attempts)}

## Row Attempts

| Row | Failed side | Ref/value source pair | Domain-chart pair | Non-domain obstruction pair | All carrier pair | Identity pair | Membership proof pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_same_packet_constructed_witness_object_identity_attempts)}

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
  const sources = {
    ruleMembershipTarget: readJson(args.ruleMembershipTargetPacket),
    nonDomainCarrier: readJson(args.nonDomainCarrierPacket),
    ref: readJson(args.refPacket),
    valueMap: readJson(args.valueMapPacket),
  };
  const sourcePaths = {
    ruleMembershipTarget: args.ruleMembershipTargetPacket,
    nonDomainCarrier: args.nonDomainCarrierPacket,
    ref: args.refPacket,
    valueMap: args.valueMapPacket,
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

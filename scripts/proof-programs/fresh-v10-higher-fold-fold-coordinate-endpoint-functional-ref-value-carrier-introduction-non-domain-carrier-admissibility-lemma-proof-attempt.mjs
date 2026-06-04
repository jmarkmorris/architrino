#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_DEFINITION_LEMMA_STACK_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_definition_lemma_stack_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_SAME_PACKET_IDENTITY_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_ADMISSION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_non_domain_carrier_admissibility_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_non_domain_carrier_admissibility_lemma_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const DEFINITION_LEMMA_STACK_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-definition-lemma-stack-proof-attempt-fail-closed-definition-source-scopes-and-lemma-targets-present-definition-lemma-derivations-absent-no-primitive-rule-acceptance-no-row-consumption";
const SAME_PACKET_IDENTITY_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt-fail-closed-domain-chart-ref-value-sources-present-non-domain-carriers-and-identity-proof-absent-no-row-consumption";
const NON_DOMAIN_CARRIER_OBSTRUCTION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption";
const CARRIER_ADMISSION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-fail-closed-value-maps-inherited-contract-full-binding-carrier-admission-absent-no-row-consumption";
const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-non-domain-carrier-admissibility-lemma-proof-attempt-fail-closed-source-scopes-and-admission-routes-present-carrier-field-and-admissibility-proof-absent-no-row-consumption";

const ENDPOINT_FIELDS = [
  "definition_lemma_stack_input_present",
  "definition_source_scope_ready",
  "carrier_admission_route_selected",
  "route_only_carrier_admission_rejected",
  "route_only_carrier_admission_accepted",
  "direct_source_promotion_rejected",
  "carrier_admission_test_applied",
  "source_endpoint_boundary_binding_ref_constructed",
  "source_endpoint_value_binding_map_constructed",
  "non_domain_carrier_obstruction_present",
  "endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared",
  "endpoint_value_binding_map_non_domain_carrier_source_candidate_declared",
  "ref_candidate_carrier_field_constructed",
  "value_map_candidate_carrier_field_constructed",
  "constructed_witness_object_id_present",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "membership_source_not_id_adjacency_proven",
  "carrier_admission_definition_bridge_present",
  "carrier_admission_field_object_present",
  "non_domain_witness_object_field_membership_proof_present",
  "source_handle_non_promotion_guard_proven",
  "non_domain_carrier_admissibility_derivation_from_definitions_present",
  "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_admissibility_source_scope_ready",
  "receiver_admissibility_source_scope_ready",
  "combined_admissibility_source_scope_ready",
  "source_carrier_admission_field_object_present",
  "receiver_carrier_admission_field_object_present",
  "combined_carrier_admission_field_object_present",
  "source_non_domain_witness_object_field_membership_proof_present",
  "receiver_non_domain_witness_object_field_membership_proof_present",
  "combined_non_domain_witness_object_field_membership_proof_present",
  "source_admissibility_derivation_from_definitions_present",
  "receiver_admissibility_derivation_from_definitions_present",
  "combined_admissibility_derivation_from_definitions_present",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const PROOF_BURDENS = [
  {
    burden_id: "L_adm_ref_carrier_field",
    missing_field: "ref_candidate_carrier_field_constructed",
    required_evidence:
      "A same-packet non-domain carrier field for the endpoint-boundary-binding ref, not merely a source ref handle or matching endpoint id.",
  },
  {
    burden_id: "L_adm_value_map_carrier_field",
    missing_field: "value_map_candidate_carrier_field_constructed",
    required_evidence:
      "A same-packet non-domain carrier field for the endpoint value-binding map, not merely a source value map bound to the first primitive.",
  },
  {
    burden_id: "L_adm_carrier_admission_bridge",
    missing_field: "carrier_admission_definition_bridge_present",
    required_evidence:
      "A definition-level bridge from the selected carrier-admission route to the constructed ref/value carrier fields.",
  },
  {
    burden_id: "L_adm_membership_proof",
    missing_field: "non_domain_witness_object_field_membership_proof_present",
    required_evidence:
      "Membership proofs that the ref carrier field and value-map carrier field are fields of the same constructed witness object.",
  },
  {
    burden_id: "L_adm_source_non_promotion_guard",
    missing_field: "source_handle_non_promotion_guard_proven",
    required_evidence:
      "A proof that source handles are not promoted into carrier fields by id adjacency, inherited source status, or route selection alone.",
  },
  {
    burden_id: "L_adm_discharge",
    missing_field:
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
    required_evidence:
      "A definition-derived derivation that the constructed ref/value carrier fields are admissible non-domain witness-object fields.",
  },
];

const PROOF_ROUTES = [
  {
    route_id: "carrier_admission_route_as_admissibility_proof",
    status: "selected-but-blocked-not-proof",
    required_fields: [
      "carrier_admission_route_selected",
      "carrier_admission_test_applied",
      "carrier_admission_definition_bridge_present",
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
    ],
    limitation:
      "A selected carrier-admission test is not itself a proof that constructed non-domain carrier fields exist or are admissible.",
  },
  {
    route_id: "source_handles_as_carrier_fields",
    status: "rejected-source-only",
    required_fields: [
      "source_endpoint_boundary_binding_ref_constructed",
      "source_endpoint_value_binding_map_constructed",
      "ref_candidate_carrier_field_constructed",
      "value_map_candidate_carrier_field_constructed",
    ],
    limitation:
      "Source ref/value handles remain source handles until same-packet non-domain carrier fields are constructed.",
  },
  {
    route_id: "non_domain_obstruction_as_admissibility_proof",
    status: "rejected-obstruction-only",
    required_fields: [
      "non_domain_carrier_obstruction_present",
      "ref_candidate_carrier_field_constructed",
      "value_map_candidate_carrier_field_constructed",
    ],
    limitation:
      "The obstruction packet names missing carrier fields; it does not supply the fields or their admissibility proof.",
  },
  {
    route_id: "same_packet_identity_as_admissibility_proof",
    status: "blocked",
    required_fields: [
      "constructed_witness_object_id_present",
      "same_constructed_witness_object_identity_proof_present",
      "non_domain_witness_object_field_membership_proof_present",
    ],
    limitation:
      "The same-packet identity proof remains absent, so witness-object membership cannot discharge admissibility.",
  },
  {
    route_id: "derive_admissibility_from_existing_definitions",
    status: "blocked",
    required_fields: [
      "ref_candidate_carrier_field_constructed",
      "value_map_candidate_carrier_field_constructed",
      "carrier_admission_definition_bridge_present",
      "non_domain_witness_object_field_membership_proof_present",
      "source_handle_non_promotion_guard_proven",
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
    ],
    limitation:
      "No endpoint has the carrier fields, admission bridge, membership proof, non-promotion proof, and admissibility derivation together.",
  },
  {
    route_id: "definition_lemma_stack_after_admissibility",
    status: "blocked-downstream",
    required_fields: [
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
    ],
    limitation:
      "The definition-lemma stack remains downstream of the missing admissibility lemma and its membership-preservation follow-on.",
  },
];

function parseArgs(argv) {
  const args = {
    definitionLemmaStackPacket: DEFAULT_DEFINITION_LEMMA_STACK_PACKET,
    samePacketIdentityPacket: DEFAULT_SAME_PACKET_IDENTITY_PACKET,
    nonDomainCarrierObstructionPacket:
      DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET,
    carrierAdmissionPacket: DEFAULT_CARRIER_ADMISSION_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--definition-lemma-stack-packet") {
      args.definitionLemmaStackPacket = argv[++index];
    } else if (arg === "--proof-attempt-packet") {
      args.definitionLemmaStackPacket = argv[++index];
    } else if (arg === "--same-packet-identity-packet") {
      args.samePacketIdentityPacket = argv[++index];
    } else if (arg === "--non-domain-carrier-obstruction-packet") {
      args.nonDomainCarrierObstructionPacket = argv[++index];
    } else if (arg === "--carrier-admission-packet") {
      args.carrierAdmissionPacket = argv[++index];
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

function usage() {
  return [
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-non-domain-carrier-admissibility-lemma-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --definition-lemma-stack-packet <path>",
    "  --same-packet-identity-packet <path>",
    "  --non-domain-carrier-obstruction-packet <path>",
    "  --carrier-admission-packet <path>",
    "  --out-dir <path>",
    "  --pretty",
    "  --help",
  ].join("\n");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sha256File(filePath) {
  return crypto
    .createHash("sha256")
    .update(fs.readFileSync(filePath))
    .digest("hex");
}

function artifactRecord(filePath) {
  return {
    path: filePath,
    basename: path.basename(filePath),
    sha256: sha256File(filePath),
  };
}

function assertPacket(packet, status, label) {
  if (packet.status !== status) {
    throw new Error(`Unexpected ${label} status: ${packet.status}`);
  }
}

function idMap(items, key, label) {
  const map = new Map();
  for (const item of items) {
    const id = item[key];
    if (typeof id !== "string" || id.length === 0) {
      throw new Error(`Missing ${label} id`);
    }
    if (map.has(id)) {
      throw new Error(`Duplicate ${label} id: ${id}`);
    }
    map.set(id, item);
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

function countTrue(items, field) {
  return items.filter((item) => item.required_fields_present?.[field] === true)
    .length;
}

function fieldCounts(items, fields) {
  return Object.fromEntries(
    fields.map((field) => [field, countTrue(items, field)])
  );
}

function missing(fields, requiredFields) {
  return requiredFields.filter((field) => fields[field] !== true);
}

function routeAttempt(route, fields) {
  return {
    ...route,
    missing_fields: missing(fields, route.required_fields),
    passed: false,
  };
}

function missingBurdens(fields) {
  return PROOF_BURDENS.filter((burden) => fields[burden.missing_field] !== true)
    .map((burden) => ({ ...burden, satisfied: false }));
}

function proofGradeSourceStatus(identity) {
  return {
    source_ref_field_status: identity.source_ref_field_status,
    source_value_map_status: identity.source_value_map_status,
    carrier_completeness_target: identity.carrier_completeness_target,
    constructed_witness_object_identity_target:
      identity.constructed_witness_object_identity_target,
  };
}

function buildEndpointAudit({
  definitionEndpoint,
  identityEndpoint,
  obstructionEndpoint,
  carrierAdmissionEndpoint,
}) {
  const definitionFields = definitionEndpoint.required_fields_present ?? {};
  const identityFields = identityEndpoint.required_fields_present ?? {};
  const admissionFields = carrierAdmissionEndpoint.required_fields_present ?? {};

  const fields = {
    definition_lemma_stack_input_present: true,
    definition_source_scope_ready:
      definitionFields.definition_source_scope_ready === true,
    carrier_admission_route_selected:
      definitionFields.carrier_admission_route_selected === true,
    route_only_carrier_admission_rejected: true,
    route_only_carrier_admission_accepted: false,
    direct_source_promotion_rejected:
      definitionFields.direct_source_promotion_rejected === true,
    carrier_admission_test_applied:
      admissionFields.carrier_admission_test_applied === true,
    source_endpoint_boundary_binding_ref_constructed:
      identityFields.source_endpoint_boundary_binding_ref_constructed === true,
    source_endpoint_value_binding_map_constructed:
      identityFields.source_endpoint_value_binding_map_constructed === true,
    non_domain_carrier_obstruction_present:
      identityFields.non_domain_carrier_obstruction_present === true &&
      Boolean(obstructionEndpoint.non_domain_carrier_obstruction_id),
    endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared:
      identityFields
        .endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared ===
      true,
    endpoint_value_binding_map_non_domain_carrier_source_candidate_declared:
      identityFields
        .endpoint_value_binding_map_non_domain_carrier_source_candidate_declared ===
      true,
    ref_candidate_carrier_field_constructed:
      identityFields
        .same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed ===
      true,
    value_map_candidate_carrier_field_constructed:
      identityFields
        .same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed ===
      true,
    constructed_witness_object_id_present:
      identityFields.constructed_witness_object_id_present === true,
    same_constructed_witness_object_identity_proof_present:
      identityFields.same_constructed_witness_object_identity_proof_present ===
      true,
    endpoint_boundary_binding_ref_member_of_witness_object_proven:
      identityFields.endpoint_boundary_binding_ref_member_of_witness_object_proven ===
      true,
    endpoint_value_binding_map_member_of_witness_object_proven:
      identityFields.endpoint_value_binding_map_member_of_witness_object_proven ===
      true,
    membership_source_not_id_adjacency_proven:
      identityFields.membership_source_not_id_adjacency_proven === true,
    carrier_admission_definition_bridge_present: false,
    carrier_admission_field_object_present: false,
    non_domain_witness_object_field_membership_proof_present: false,
    source_handle_non_promotion_guard_proven:
      definitionFields.source_handle_non_promotion_derivation_from_definitions_present ===
      true,
    non_domain_carrier_admissibility_derivation_from_definitions_present:
      definitionFields
        .non_domain_carrier_admissibility_derivation_from_definitions_present ===
      true,
    non_domain_carrier_membership_preservation_derivation_from_definitions_present:
      definitionFields
        .non_domain_carrier_membership_preservation_derivation_from_definitions_present ===
      true,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.carrier_admission_field_object_present =
    fields.ref_candidate_carrier_field_constructed &&
    fields.value_map_candidate_carrier_field_constructed;
  fields.non_domain_witness_object_field_membership_proof_present =
    fields.endpoint_boundary_binding_ref_member_of_witness_object_proven &&
    fields.endpoint_value_binding_map_member_of_witness_object_proven &&
    fields.membership_source_not_id_adjacency_proven;

  const routeAttempts = PROOF_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: definitionEndpoint.id,
    endpoint_functional_id: definitionEndpoint.endpoint_functional_id,
    role: definitionEndpoint.role,
    non_domain_carrier_admissibility_lemma_proof_attempt_id:
      `non_domain_carrier_admissibility_lemma_proof_attempt:${definitionEndpoint.id}`,
    source_definition_lemma_stack_proof_attempt_id:
      definitionEndpoint.definition_lemma_stack_proof_attempt_id,
    source_same_packet_constructed_witness_object_identity_attempt_id:
      identityEndpoint.same_packet_constructed_witness_object_identity_attempt_id,
    source_non_domain_carrier_obstruction_id:
      obstructionEndpoint.non_domain_carrier_obstruction_id,
    source_binding_contract_full_binding_carrier_admission_attempt_id:
      carrierAdmissionEndpoint
        .binding_contract_full_binding_carrier_admission_attempt_id,
    proof_grade_source_status: proofGradeSourceStatus(identityEndpoint),
    route_attempts: routeAttempts,
    routes_passed: routeAttempts
      .filter((route) => route.passed)
      .map((route) => route.route_id),
    required_fields_present: fields,
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blocker:
      missingProofBurdens[0]?.missing_field ?? "none",
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has definition source scope, selected carrier-admission route, source ref/value handles, and non-domain carrier source candidates, but it lacks same-packet ref/value carrier fields, witness-object membership proofs, a carrier-admission definition bridge, and an admissibility derivation.",
  };
}

function admissibilitySourceScopeReady(fields) {
  return (
    fields.definition_source_scope_ready &&
    fields.carrier_admission_route_selected &&
    fields.direct_source_promotion_rejected &&
    fields.carrier_admission_test_applied &&
    fields.source_endpoint_boundary_binding_ref_constructed &&
    fields.source_endpoint_value_binding_map_constructed &&
    fields.non_domain_carrier_obstruction_present &&
    fields
      .endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared &&
    fields.endpoint_value_binding_map_non_domain_carrier_source_candidate_declared
  );
}

function buildRowAudit(row, endpointMap) {
  const source = requireMapped(
    endpointMap,
    row.source_variable,
    `source endpoint for ${row.row_id}`
  );
  const receiver = requireMapped(
    endpointMap,
    row.receiver_variable,
    `receiver endpoint for ${row.row_id}`
  );
  const sourceFields = source.required_fields_present;
  const receiverFields = receiver.required_fields_present;
  const fields = {
    row_locator_resolved: row.required_fields_present?.row_locator_resolved === true,
    source_admissibility_source_scope_ready:
      admissibilitySourceScopeReady(sourceFields),
    receiver_admissibility_source_scope_ready:
      admissibilitySourceScopeReady(receiverFields),
    combined_admissibility_source_scope_ready: false,
    source_carrier_admission_field_object_present:
      sourceFields.carrier_admission_field_object_present,
    receiver_carrier_admission_field_object_present:
      receiverFields.carrier_admission_field_object_present,
    combined_carrier_admission_field_object_present: false,
    source_non_domain_witness_object_field_membership_proof_present:
      sourceFields.non_domain_witness_object_field_membership_proof_present,
    receiver_non_domain_witness_object_field_membership_proof_present:
      receiverFields.non_domain_witness_object_field_membership_proof_present,
    combined_non_domain_witness_object_field_membership_proof_present: false,
    source_admissibility_derivation_from_definitions_present:
      sourceFields
        .non_domain_carrier_admissibility_derivation_from_definitions_present,
    receiver_admissibility_derivation_from_definitions_present:
      receiverFields
        .non_domain_carrier_admissibility_derivation_from_definitions_present,
    combined_admissibility_derivation_from_definitions_present: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_admissibility_source_scope_ready =
    fields.source_admissibility_source_scope_ready &&
    fields.receiver_admissibility_source_scope_ready;
  fields.combined_carrier_admission_field_object_present =
    fields.source_carrier_admission_field_object_present &&
    fields.receiver_carrier_admission_field_object_present;
  fields.combined_non_domain_witness_object_field_membership_proof_present =
    fields.source_non_domain_witness_object_field_membership_proof_present &&
    fields.receiver_non_domain_witness_object_field_membership_proof_present;
  fields.combined_admissibility_derivation_from_definitions_present =
    fields.source_admissibility_derivation_from_definitions_present &&
    fields.receiver_admissibility_derivation_from_definitions_present;

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
    source_non_domain_carrier_admissibility_lemma_proof_attempt_id:
      source.non_domain_carrier_admissibility_lemma_proof_attempt_id,
    receiver_non_domain_carrier_admissibility_lemma_proof_attempt_id:
      receiver.non_domain_carrier_admissibility_lemma_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver admissibility source scopes, but neither side supplies carrier field objects, same-witness membership proofs, or admissibility derivations.",
  };
}

function buildPacket({
  definitionLemmaStack,
  definitionLemmaStackPath,
  samePacketIdentity,
  samePacketIdentityPath,
  nonDomainCarrierObstruction,
  nonDomainCarrierObstructionPath,
  carrierAdmission,
  carrierAdmissionPath,
}) {
  assertPacket(
    definitionLemmaStack,
    DEFINITION_LEMMA_STACK_STATUS,
    "definition lemma stack"
  );
  assertPacket(
    samePacketIdentity,
    SAME_PACKET_IDENTITY_STATUS,
    "same packet identity"
  );
  assertPacket(
    nonDomainCarrierObstruction,
    NON_DOMAIN_CARRIER_OBSTRUCTION_STATUS,
    "non-domain carrier obstruction"
  );
  assertPacket(
    carrierAdmission,
    CARRIER_ADMISSION_STATUS,
    "carrier admission"
  );

  const definitionEndpoints =
    definitionLemmaStack
      .endpoint_ref_value_carrier_introduction_definition_lemma_stack_proof_attempts;
  const definitionRows =
    definitionLemmaStack
      .row_ref_value_carrier_introduction_definition_lemma_stack_proof_attempts;
  const identityMap = idMap(
    samePacketIdentity.endpoint_same_packet_constructed_witness_object_identity_attempts,
    "id",
    "same-packet identity endpoint"
  );
  const obstructionMap = idMap(
    nonDomainCarrierObstruction
      .endpoint_witness_object_non_domain_carrier_obstruction_packets,
    "id",
    "non-domain carrier obstruction endpoint"
  );
  const carrierAdmissionMap = idMap(
    carrierAdmission
      .endpoint_binding_contract_full_binding_carrier_admission_attempts,
    "id",
    "carrier-admission endpoint"
  );

  const endpointAudits = definitionEndpoints.map((definitionEndpoint) =>
    buildEndpointAudit({
      definitionEndpoint,
      identityEndpoint: requireMapped(
        identityMap,
        definitionEndpoint.id,
        "same-packet identity endpoint"
      ),
      obstructionEndpoint: requireMapped(
        obstructionMap,
        definitionEndpoint.id,
        "non-domain carrier obstruction endpoint"
      ),
      carrierAdmissionEndpoint: requireMapped(
        carrierAdmissionMap,
        definitionEndpoint.id,
        "carrier-admission endpoint"
      ),
    })
  );
  const endpointMap = idMap(
    endpointAudits,
    "id",
    "non-domain carrier admissibility lemma proof attempt endpoint"
  );
  const rowAudits = definitionRows.map((row) => buildRowAudit(row, endpointMap));
  const endpointFieldCounts = fieldCounts(endpointAudits, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAudits, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-non-domain-carrier-admissibility-lemma-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; source scopes and carrier-admission routes are present, but non-domain carrier field objects and admissibility proof evidence are absent",
    source_artifacts: [
      {
        label: "ref_value_carrier_introduction_definition_lemma_stack",
        ...artifactRecord(definitionLemmaStackPath),
      },
      {
        label: "same_packet_constructed_witness_object_identity_attempt",
        ...artifactRecord(samePacketIdentityPath),
      },
      {
        label:
          "same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet",
        ...artifactRecord(nonDomainCarrierObstructionPath),
      },
      {
        label: "binding_contract_full_binding_carrier_admission_attempt",
        ...artifactRecord(carrierAdmissionPath),
      },
    ],
    proof_attempt_target: {
      target_id:
        "ref-value-carrier-introduction-non-domain-carrier-admissibility-lemma-proof-attempt",
      selected_route: "derive_admissibility_from_existing_definitions",
      out_of_scope_route:
        "primitive_rule_acceptance_or_row_consumption_route",
      statement:
        "Attempt to prove `L_adm`: constructed ref/value carrier fields are admissible non-domain witness-object fields under the existing carrier-admission and non-promotion definitions.",
      accepted_as_first_blocker_discharge_if:
        "Every endpoint has same-packet ref/value carrier fields, a carrier-admission definition bridge, witness-object membership proofs, source-handle non-promotion proof, and a definition-derived admissibility derivation.",
      first_exact_blocker:
        "ref_candidate_carrier_field_constructed, value_map_candidate_carrier_field_constructed, carrier_admission_definition_bridge_present, non_domain_witness_object_field_membership_proof_present, source_handle_non_promotion_guard_proven, and non_domain_carrier_admissibility_derivation_from_definitions_present",
    },
    primitive_rule_policy:
      "Primitive acceptance, schema-family acceptance, derivation bundles, row consumption, and branch-chart authorization are out of scope for this admissibility proof attempt.",
    route_only_carrier_admission_policy:
      "The selected carrier-admission route and carrier-admission test application are source-scope facts only. They do not discharge `L_adm` unless the packet also supplies same-packet carrier fields, a definition bridge, membership proofs, a source-handle non-promotion proof, and an admissibility derivation.",
    proof_burdens: PROOF_BURDENS,
    proof_routes: PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_non_domain_carrier_admissibility_lemma_proof_attempts:
      endpointAudits,
    row_non_domain_carrier_admissibility_lemma_proof_attempts: rowAudits,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAudits.length,
      residual_consumer_rows: rowAudits.length,
      definition_lemma_stack_inputs_present:
        endpointFieldCounts.definition_lemma_stack_input_present,
      definition_source_scopes_ready:
        endpointFieldCounts.definition_source_scope_ready,
      carrier_admission_routes_selected:
        endpointFieldCounts.carrier_admission_route_selected,
      route_only_carrier_admission_routes_rejected:
        endpointFieldCounts.route_only_carrier_admission_rejected,
      route_only_carrier_admission_routes_accepted:
        endpointFieldCounts.route_only_carrier_admission_accepted,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      carrier_admission_tests_applied:
        endpointFieldCounts.carrier_admission_test_applied,
      source_endpoint_boundary_binding_refs_constructed:
        endpointFieldCounts.source_endpoint_boundary_binding_ref_constructed,
      source_endpoint_value_binding_maps_constructed:
        endpointFieldCounts.source_endpoint_value_binding_map_constructed,
      non_domain_carrier_obstructions_present:
        endpointFieldCounts.non_domain_carrier_obstruction_present,
      ref_non_domain_carrier_source_candidates_declared:
        endpointFieldCounts
          .endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared,
      value_map_non_domain_carrier_source_candidates_declared:
        endpointFieldCounts
          .endpoint_value_binding_map_non_domain_carrier_source_candidate_declared,
      ref_candidate_carrier_fields_constructed:
        endpointFieldCounts.ref_candidate_carrier_field_constructed,
      value_map_candidate_carrier_fields_constructed:
        endpointFieldCounts.value_map_candidate_carrier_field_constructed,
      constructed_witness_object_ids_present:
        endpointFieldCounts.constructed_witness_object_id_present,
      same_constructed_witness_object_identity_proofs_present:
        endpointFieldCounts
          .same_constructed_witness_object_identity_proof_present,
      endpoint_boundary_binding_ref_membership_proofs_present:
        endpointFieldCounts
          .endpoint_boundary_binding_ref_member_of_witness_object_proven,
      endpoint_value_binding_map_membership_proofs_present:
        endpointFieldCounts
          .endpoint_value_binding_map_member_of_witness_object_proven,
      membership_source_not_id_adjacency_proofs_present:
        endpointFieldCounts.membership_source_not_id_adjacency_proven,
      carrier_admission_definition_bridges_present:
        endpointFieldCounts.carrier_admission_definition_bridge_present,
      carrier_admission_field_objects_present:
        endpointFieldCounts.carrier_admission_field_object_present,
      non_domain_witness_object_field_membership_proofs_present:
        endpointFieldCounts
          .non_domain_witness_object_field_membership_proof_present,
      source_handle_non_promotion_guards_proven:
        endpointFieldCounts.source_handle_non_promotion_guard_proven,
      non_domain_carrier_admissibility_derivations_from_definitions_present:
        endpointFieldCounts
          .non_domain_carrier_admissibility_derivation_from_definitions_present,
      non_domain_carrier_membership_preservation_derivations_from_definitions_present:
        endpointFieldCounts
          .non_domain_carrier_membership_preservation_derivation_from_definitions_present,
      row_admissibility_source_scope_pairs_ready:
        rowFieldCounts.combined_admissibility_source_scope_ready,
      row_carrier_admission_field_object_pairs_present:
        rowFieldCounts.combined_carrier_admission_field_object_present,
      row_non_domain_witness_object_field_membership_proof_pairs_present:
        rowFieldCounts
          .combined_non_domain_witness_object_field_membership_proof_present,
      row_admissibility_derivation_pairs_present:
        rowFieldCounts.combined_admissibility_derivation_from_definitions_present,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint has same-packet ref/value carrier fields, carrier-admission definition bridge, witness-object membership proof, source-handle non-promotion proof, or admissibility derivation.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed non-domain carrier admissibility lemma proof attempt and does not promote to reader-facing corpus prose.",
  };
}

function sourceTable(sources) {
  return sources
    .map(
      (source) =>
        `| ${source.label} | ${source.basename} | ${source.sha256} |`
    )
    .join("\n");
}

function burdenTable(burdens) {
  return burdens
    .map(
      (burden) =>
        `| ${burden.burden_id} | ${burden.missing_field} | ${burden.required_evidence} |`
    )
    .join("\n");
}

function routeTable(routes) {
  return routes
    .map(
      (route) =>
        `| ${route.route_id} | ${route.status} | ${route.required_fields.join(", ")} | ${route.limitation} |`
    )
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map((endpoint) => {
      const fields = endpoint.required_fields_present;
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.definition_source_scope_ready} | ${fields.carrier_admission_route_selected} | ${fields.route_only_carrier_admission_rejected} | ${fields.source_endpoint_boundary_binding_ref_constructed} | ${fields.source_endpoint_value_binding_map_constructed} | ${fields.non_domain_carrier_obstruction_present} | ${fields.ref_candidate_carrier_field_constructed} | ${fields.value_map_candidate_carrier_field_constructed} | ${fields.carrier_admission_definition_bridge_present} | ${fields.non_domain_witness_object_field_membership_proof_present} | ${fields.source_handle_non_promotion_guard_proven} | ${fields.non_domain_carrier_admissibility_derivation_from_definitions_present} | ${endpoint.first_exact_blocker} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_admissibility_source_scope_ready} | ${fields.combined_carrier_admission_field_object_present} | ${fields.combined_non_domain_witness_object_field_membership_proof_present} | ${fields.combined_admissibility_derivation_from_definitions_present} | ${row.row_consumed} |`;
    })
    .join("\n");
}

function countTable(counts) {
  return Object.entries(counts)
    .map(([field, count]) => `| ${field} | ${count} |`)
    .join("\n");
}

function makeReport(packet) {
  const summary = packet.summary;
  return `# Ref/Value Carrier-Introduction Non-Domain Carrier Admissibility Lemma Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet attempts the ` + "`L_adm`" + ` lemma below the
ref/value carrier-introduction definition-lemma stack. It keeps primitive-rule
acceptance, schema-family acceptance, derivation bundles, row consumption, and
branch-chart authorization out of scope.

The proof attempt remains fail-closed. It records ${summary.definition_source_scopes_ready} / ${summary.endpoint_functionals}
definition source scopes, ${summary.carrier_admission_routes_selected} / ${summary.endpoint_functionals}
selected carrier-admission routes, ${summary.carrier_admission_tests_applied} / ${summary.endpoint_functionals}
carrier-admission tests applied, ${summary.source_endpoint_boundary_binding_refs_constructed} / ${summary.endpoint_functionals}
source endpoint-boundary-binding refs, ${summary.source_endpoint_value_binding_maps_constructed} / ${summary.endpoint_functionals}
source endpoint value-binding maps, ${summary.non_domain_carrier_obstructions_present} / ${summary.endpoint_functionals}
non-domain carrier obstructions, ${summary.ref_non_domain_carrier_source_candidates_declared} / ${summary.endpoint_functionals}
ref non-domain carrier source candidates, and ${summary.value_map_non_domain_carrier_source_candidates_declared} / ${summary.endpoint_functionals}
value-map non-domain carrier source candidates. It records ${summary.ref_candidate_carrier_fields_constructed} / ${summary.endpoint_functionals}
ref candidate carrier fields, ${summary.value_map_candidate_carrier_fields_constructed} / ${summary.endpoint_functionals}
value-map candidate carrier fields, ${summary.carrier_admission_definition_bridges_present} / ${summary.endpoint_functionals}
carrier-admission definition bridges, ${summary.non_domain_witness_object_field_membership_proofs_present} / ${summary.endpoint_functionals}
witness-object field membership proofs, ${summary.source_handle_non_promotion_guards_proven} / ${summary.endpoint_functionals}
source-handle non-promotion guards, and ${summary.non_domain_carrier_admissibility_derivations_from_definitions_present} / ${summary.endpoint_functionals}
definition-derived admissibility derivations. It consumes ${summary.row_consumption_count}
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Proof Attempt Target

${packet.proof_attempt_target.statement}

Accepted as blocker discharge if: ${packet.proof_attempt_target.accepted_as_first_blocker_discharge_if}

First exact blockers: ${packet.proof_attempt_target.first_exact_blocker}

## Primitive-Rule Policy

${packet.primitive_rule_policy}

## Route-Only Carrier Admission Policy

${packet.route_only_carrier_admission_policy}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.proof_routes)}

## Endpoint Audits

| Endpoint | Role | Definition scope | Admission route | Route-only rejected | Source ref | Source value map | Obstruction | Ref carrier field | Value carrier field | Admission bridge | Membership proof | Non-promotion guard | Admissibility derivation | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_non_domain_carrier_admissibility_lemma_proof_attempts)}

## Row Audits

| Row | Admissibility source scope pair | Carrier field-object pair | Membership-proof pair | Admissibility derivation pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_non_domain_carrier_admissibility_lemma_proof_attempts)}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.endpoint_field_counts)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.row_field_counts)}

## Capture Decision

${packet.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }

  const packet = buildPacket({
    definitionLemmaStack: readJson(args.definitionLemmaStackPacket),
    definitionLemmaStackPath: args.definitionLemmaStackPacket,
    samePacketIdentity: readJson(args.samePacketIdentityPacket),
    samePacketIdentityPath: args.samePacketIdentityPacket,
    nonDomainCarrierObstruction: readJson(
      args.nonDomainCarrierObstructionPacket
    ),
    nonDomainCarrierObstructionPath: args.nonDomainCarrierObstructionPacket,
    carrierAdmission: readJson(args.carrierAdmissionPacket),
    carrierAdmissionPath: args.carrierAdmissionPacket,
  });

  fs.mkdirSync(args.outDir, { recursive: true });
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  fs.writeFileSync(
    jsonPath,
    `${JSON.stringify(packet, null, args.pretty ? 2 : 2)}\n`
  );
  fs.writeFileSync(reportPath, makeReport(packet));

  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${reportPath}`);
  console.log(`Status: ${packet.status}`);
}

main();

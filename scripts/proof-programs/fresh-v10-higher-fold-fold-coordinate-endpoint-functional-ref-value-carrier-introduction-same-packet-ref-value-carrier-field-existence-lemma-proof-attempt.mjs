#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_L_ADM_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_non_domain_carrier_admissibility_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_SAME_PACKET_IDENTITY_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REF_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_FIELD_OBLIGATION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_obligation_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_FIELD_CONSTRUCTION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_same_packet_ref_value_carrier_field_existence_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_same_packet_ref_value_carrier_field_existence_lemma_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const L_ADM_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-non-domain-carrier-admissibility-lemma-proof-attempt-fail-closed-source-scopes-and-admission-routes-present-carrier-field-and-admissibility-proof-absent-no-row-consumption";
const SAME_PACKET_IDENTITY_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt-fail-closed-domain-chart-ref-value-sources-present-non-domain-carriers-and-identity-proof-absent-no-row-consumption";
const NON_DOMAIN_CARRIER_OBSTRUCTION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption";
const REF_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";
const CARRIER_FIELD_OBLIGATION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-obligation-attempt-fail-closed-witness-object-inputs-present-carrier-fields-absent-no-row-consumption";
const CARRIER_FIELD_CONSTRUCTION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-construction-attempt-fail-closed-carrier-field-source-candidates-present-carrier-fields-absent-no-row-consumption";
const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-same-packet-ref-value-carrier-field-existence-lemma-proof-attempt-fail-closed-source-ref-value-handles-and-non-domain-carrier-source-candidates-present-same-packet-ref-value-carrier-fields-absent-no-row-consumption";

const REF_CARRIER_FIELD = "endpoint_boundary_binding_ref";
const VALUE_MAP_CARRIER_FIELD = "endpoint_value_binding_map";

const ENDPOINT_FIELDS = [
  "l_adm_input_present",
  "carrier_field_existence_target_declared",
  "carrier_field_obligation_declared",
  "carrier_field_source_candidate_bundle_declared",
  "all_carrier_field_source_candidates_declared",
  "domain_chart_carrier_subfield_constructed",
  "source_endpoint_boundary_binding_ref_constructed",
  "source_endpoint_value_binding_map_constructed",
  "endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared",
  "endpoint_value_binding_map_non_domain_carrier_source_candidate_declared",
  "non_domain_carrier_obstruction_present",
  "ref_non_domain_carrier_field_obstruction_present",
  "value_map_non_domain_carrier_field_obstruction_present",
  "carrier_field_construction_attempted",
  "same_packet_ref_carrier_field_constructed",
  "same_packet_value_map_carrier_field_constructed",
  "ref_carrier_field_dependencies_present",
  "value_map_carrier_field_dependencies_present",
  "all_carrier_fields_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
  "witness_object_has_endpoint_value_binding_map",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "carrier_field_existence_lemma_present",
  "carrier_field_existence_soundness_proof_present",
  "endpoint_carrier_field_application_proof_present",
  "ref_candidate_carrier_field_constructed",
  "value_map_candidate_carrier_field_constructed",
  "carrier_admission_field_object_present",
  "non_domain_carrier_admissibility_derivation_from_definitions_present",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_carrier_field_source_scope_ready",
  "receiver_carrier_field_source_scope_ready",
  "combined_carrier_field_source_scope_ready",
  "source_same_packet_ref_carrier_field_constructed",
  "receiver_same_packet_ref_carrier_field_constructed",
  "combined_same_packet_ref_carrier_field_constructed",
  "source_same_packet_value_map_carrier_field_constructed",
  "receiver_same_packet_value_map_carrier_field_constructed",
  "combined_same_packet_value_map_carrier_field_constructed",
  "source_ref_carrier_field_dependencies_present",
  "receiver_ref_carrier_field_dependencies_present",
  "combined_ref_carrier_field_dependencies_present",
  "source_value_map_carrier_field_dependencies_present",
  "receiver_value_map_carrier_field_dependencies_present",
  "combined_value_map_carrier_field_dependencies_present",
  "source_carrier_field_existence_lemma_present",
  "receiver_carrier_field_existence_lemma_present",
  "combined_carrier_field_existence_lemma_pair_present",
  "source_endpoint_carrier_field_application_proof_present",
  "receiver_endpoint_carrier_field_application_proof_present",
  "combined_endpoint_carrier_field_application_proof_present",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const PROOF_BURDENS = [
  {
    burden_id: "F_ref_same_packet_carrier_field",
    missing_field: "same_packet_ref_carrier_field_constructed",
    required_evidence:
      "A constructed same-packet non-domain carrier field for the endpoint-boundary-binding ref.",
  },
  {
    burden_id: "F_val_same_packet_carrier_field",
    missing_field: "same_packet_value_map_carrier_field_constructed",
    required_evidence:
      "A constructed same-packet non-domain carrier field for the endpoint value-binding map.",
  },
  {
    burden_id: "F_ref_dependencies",
    missing_field: "ref_carrier_field_dependencies_present",
    required_evidence:
      "The full endpoint boundary binding, endpoint boundary binding, and witness-object endpoint-boundary-binding ref dependencies required by the ref carrier field.",
  },
  {
    burden_id: "F_val_dependencies",
    missing_field: "value_map_carrier_field_dependencies_present",
    required_evidence:
      "The endpoint boundary binding, endpoint value binding, and witness-object value-map dependencies required by the value-map carrier field.",
  },
  {
    burden_id: "F_complete_witness_object",
    missing_field: "all_carrier_fields_constructed",
    required_evidence:
      "All same-packet witness-object carrier fields, including the ref and value-map non-domain carrier fields.",
  },
  {
    burden_id: "F_existence_lemma",
    missing_field: "carrier_field_existence_lemma_present",
    required_evidence:
      "A lemma proving that the source candidates determine constructed carrier fields rather than only naming carrier-field obligations.",
  },
  {
    burden_id: "F_application_to_L_adm",
    missing_field: "endpoint_carrier_field_application_proof_present",
    required_evidence:
      "An endpoint-local application proof that the constructed carrier fields discharge the `ref_candidate_carrier_field_constructed` and `value_map_candidate_carrier_field_constructed` blockers in `L_adm`.",
  },
];

const PROOF_ROUTES = [
  {
    route_id: "source_handles_as_carrier_fields",
    status: "rejected-source-only",
    required_fields: [
      "source_endpoint_boundary_binding_ref_constructed",
      "source_endpoint_value_binding_map_constructed",
      "same_packet_ref_carrier_field_constructed",
      "same_packet_value_map_carrier_field_constructed",
    ],
    limitation:
      "Source ref/value handles do not become same-packet carrier fields by naming or endpoint id adjacency.",
  },
  {
    route_id: "carrier_source_candidates_as_carrier_fields",
    status: "rejected-candidate-only",
    required_fields: [
      "carrier_field_source_candidate_bundle_declared",
      "all_carrier_field_source_candidates_declared",
      "same_packet_ref_carrier_field_constructed",
      "same_packet_value_map_carrier_field_constructed",
    ],
    limitation:
      "A declared carrier-field source-candidate bundle records obligations but does not construct carrier fields.",
  },
  {
    route_id: "domain_chart_carrier_as_non_domain_carriers",
    status: "rejected-domain-chart-only",
    required_fields: [
      "domain_chart_carrier_subfield_constructed",
      "same_packet_ref_carrier_field_constructed",
      "same_packet_value_map_carrier_field_constructed",
    ],
    limitation:
      "The domain-chart carrier subfield is preserved, but it does not supply the two non-domain ref/value carrier fields.",
  },
  {
    route_id: "non_domain_obstruction_as_construction",
    status: "rejected-obstruction-only",
    required_fields: [
      "non_domain_carrier_obstruction_present",
      "ref_non_domain_carrier_field_obstruction_present",
      "value_map_non_domain_carrier_field_obstruction_present",
      "same_packet_ref_carrier_field_constructed",
      "same_packet_value_map_carrier_field_constructed",
    ],
    limitation:
      "The obstruction packet isolates missing dependencies; it is not evidence that the dependencies or fields exist.",
  },
  {
    route_id: "derive_same_packet_ref_value_carrier_fields_from_existing_fields",
    status: "blocked",
    required_fields: [
      "ref_carrier_field_dependencies_present",
      "value_map_carrier_field_dependencies_present",
      "same_packet_ref_carrier_field_constructed",
      "same_packet_value_map_carrier_field_constructed",
      "carrier_field_existence_lemma_present",
    ],
    limitation:
      "The existing endpoint fields do not satisfy the ref/value carrier-field dependency lists and no existence lemma is present.",
  },
  {
    route_id: "admissibility_after_carrier_fields",
    status: "blocked-downstream",
    required_fields: [
      "ref_candidate_carrier_field_constructed",
      "value_map_candidate_carrier_field_constructed",
      "carrier_admission_field_object_present",
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
    ],
    limitation:
      "`L_adm` remains downstream of constructed ref/value carrier fields and a separate admissibility derivation.",
  },
];

function parseArgs(argv) {
  const args = {
    lAdmPacket: DEFAULT_L_ADM_PACKET,
    samePacketIdentityPacket: DEFAULT_SAME_PACKET_IDENTITY_PACKET,
    nonDomainCarrierObstructionPacket:
      DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET,
    refPacket: DEFAULT_REF_PACKET,
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    carrierFieldObligationPacket: DEFAULT_CARRIER_FIELD_OBLIGATION_PACKET,
    carrierFieldConstructionPacket: DEFAULT_CARRIER_FIELD_CONSTRUCTION_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--l-adm-packet") {
      args.lAdmPacket = argv[++index];
    } else if (arg === "--same-packet-identity-packet") {
      args.samePacketIdentityPacket = argv[++index];
    } else if (arg === "--non-domain-carrier-obstruction-packet") {
      args.nonDomainCarrierObstructionPacket = argv[++index];
    } else if (arg === "--ref-packet") {
      args.refPacket = argv[++index];
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
    } else if (arg === "--carrier-field-obligation-packet") {
      args.carrierFieldObligationPacket = argv[++index];
    } else if (arg === "--carrier-field-construction-packet") {
      args.carrierFieldConstructionPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-same-packet-ref-value-carrier-field-existence-lemma-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --l-adm-packet <path>",
    "  --same-packet-identity-packet <path>",
    "  --non-domain-carrier-obstruction-packet <path>",
    "  --ref-packet <path>",
    "  --value-map-packet <path>",
    "  --carrier-field-obligation-packet <path>",
    "  --carrier-field-construction-packet <path>",
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

function findCarrierAttempt(endpoint, carrierField) {
  const attempt = endpoint.carrier_field_construction_attempts?.find(
    (candidate) => candidate.carrier_field === carrierField
  );
  if (!attempt) {
    throw new Error(`Missing carrier-field construction attempt: ${carrierField}`);
  }
  return attempt;
}

function findCarrierObstruction(endpoint, carrierField) {
  const obstruction = endpoint.non_domain_carrier_obstructions?.find(
    (candidate) => candidate.carrier_field === carrierField
  );
  if (!obstruction) {
    throw new Error(`Missing non-domain carrier obstruction: ${carrierField}`);
  }
  return obstruction;
}

function summarizeCarrierAttempt(attempt) {
  return {
    carrier_field: attempt.carrier_field,
    target_field: attempt.target_field,
    source_ref: attempt.source_ref,
    present_field: attempt.present_field,
    carrier_field_source_candidate_declared:
      attempt.carrier_field_source_candidate_declared === true,
    carrier_field_constructed: attempt.carrier_field_constructed === true,
    dependencies: attempt.dependencies ?? [],
    missing_dependencies: attempt.missing_dependencies ?? [],
    failure_codes: attempt.failure_codes ?? [],
    construction_status: attempt.construction_status,
  };
}

function summarizeCarrierObstruction(obstruction) {
  return {
    carrier_field: obstruction.carrier_field,
    target_field: obstruction.target_field,
    source_ref: obstruction.source_ref,
    present_field: obstruction.present_field,
    source_layer: obstruction.source_layer,
    carrier_field_source_candidate_declared:
      obstruction.carrier_field_source_candidate_declared === true,
    carrier_field_constructed: obstruction.carrier_field_constructed === true,
    source_signals: obstruction.source_signals,
    missing_dependencies: obstruction.missing_dependencies ?? [],
    failure_codes: obstruction.failure_codes ?? [],
    construction_status: obstruction.construction_status,
    obstruction: obstruction.obstruction,
  };
}

function dependenciesPresent(attempt, obstruction) {
  return (
    attempt.carrier_field_constructed === true &&
    obstruction.carrier_field_constructed === true &&
    (attempt.missing_dependencies ?? []).length === 0 &&
    (obstruction.missing_dependencies ?? []).length === 0
  );
}

function carrierFieldSourceScopeReady(fields) {
  return (
    fields.l_adm_input_present &&
    fields.carrier_field_existence_target_declared &&
    fields.carrier_field_obligation_declared &&
    fields.carrier_field_source_candidate_bundle_declared &&
    fields.all_carrier_field_source_candidates_declared &&
    fields.domain_chart_carrier_subfield_constructed &&
    fields.source_endpoint_boundary_binding_ref_constructed &&
    fields.source_endpoint_value_binding_map_constructed &&
    fields
      .endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared &&
    fields.endpoint_value_binding_map_non_domain_carrier_source_candidate_declared &&
    fields.non_domain_carrier_obstruction_present &&
    fields.ref_non_domain_carrier_field_obstruction_present &&
    fields.value_map_non_domain_carrier_field_obstruction_present &&
    fields.carrier_field_construction_attempted
  );
}

function buildEndpointAudit({
  lAdmEndpoint,
  identityEndpoint,
  obstructionEndpoint,
  obligationEndpoint,
  constructionEndpoint,
}) {
  const lAdmFields = lAdmEndpoint.required_fields_present ?? {};
  const identityFields = identityEndpoint.required_fields_present ?? {};
  const obstructionFields = obstructionEndpoint.required_fields_present ?? {};
  const obligationFields = obligationEndpoint.required_fields_present ?? {};
  const constructionFields = constructionEndpoint.required_fields_present ?? {};
  const refAttempt = findCarrierAttempt(constructionEndpoint, REF_CARRIER_FIELD);
  const valueMapAttempt = findCarrierAttempt(
    constructionEndpoint,
    VALUE_MAP_CARRIER_FIELD
  );
  const refObstruction = findCarrierObstruction(
    obstructionEndpoint,
    REF_CARRIER_FIELD
  );
  const valueMapObstruction = findCarrierObstruction(
    obstructionEndpoint,
    VALUE_MAP_CARRIER_FIELD
  );

  const samePacketRefCarrierFieldConstructed =
    identityFields
      .same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed ===
      true ||
    refAttempt.carrier_field_constructed === true ||
    refObstruction.carrier_field_constructed === true;
  const samePacketValueMapCarrierFieldConstructed =
    identityFields
      .same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed ===
      true ||
    valueMapAttempt.carrier_field_constructed === true ||
    valueMapObstruction.carrier_field_constructed === true;

  const fields = {
    l_adm_input_present: true,
    carrier_field_existence_target_declared: true,
    carrier_field_obligation_declared:
      obligationFields.same_packet_witness_object_carrier_field_obligation_declared ===
        true ||
      constructionFields
        .same_packet_witness_object_carrier_field_obligation_declared === true,
    carrier_field_source_candidate_bundle_declared:
      constructionFields.carrier_field_source_candidate_bundle_declared === true,
    all_carrier_field_source_candidates_declared:
      constructionFields.all_carrier_field_source_candidates_declared === true,
    domain_chart_carrier_subfield_constructed:
      identityFields.domain_chart_carrier_subfield_constructed === true ||
      obstructionFields.domain_chart_carrier_subfield_constructed === true,
    source_endpoint_boundary_binding_ref_constructed:
      lAdmFields.source_endpoint_boundary_binding_ref_constructed === true ||
      identityFields.source_endpoint_boundary_binding_ref_constructed === true,
    source_endpoint_value_binding_map_constructed:
      lAdmFields.source_endpoint_value_binding_map_constructed === true ||
      identityFields.source_endpoint_value_binding_map_constructed === true,
    endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared:
      lAdmFields
        .endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared ===
        true ||
      refAttempt.carrier_field_source_candidate_declared === true ||
      refObstruction.carrier_field_source_candidate_declared === true,
    endpoint_value_binding_map_non_domain_carrier_source_candidate_declared:
      lAdmFields
        .endpoint_value_binding_map_non_domain_carrier_source_candidate_declared ===
        true ||
      valueMapAttempt.carrier_field_source_candidate_declared === true ||
      valueMapObstruction.carrier_field_source_candidate_declared === true,
    non_domain_carrier_obstruction_present:
      lAdmFields.non_domain_carrier_obstruction_present === true &&
      obstructionFields.non_domain_carrier_obstruction_present === true,
    ref_non_domain_carrier_field_obstruction_present:
      refObstruction.construction_status === "obstructed-non-domain-carrier-absent",
    value_map_non_domain_carrier_field_obstruction_present:
      valueMapObstruction.construction_status ===
      "obstructed-non-domain-carrier-absent",
    carrier_field_construction_attempted:
      constructionFields.carrier_field_construction_attempted === true,
    same_packet_ref_carrier_field_constructed:
      samePacketRefCarrierFieldConstructed,
    same_packet_value_map_carrier_field_constructed:
      samePacketValueMapCarrierFieldConstructed,
    ref_carrier_field_dependencies_present: dependenciesPresent(
      refAttempt,
      refObstruction
    ),
    value_map_carrier_field_dependencies_present: dependenciesPresent(
      valueMapAttempt,
      valueMapObstruction
    ),
    all_carrier_fields_constructed:
      identityFields.all_carrier_fields_constructed === true ||
      constructionFields.all_carrier_fields_constructed === true ||
      obstructionFields.all_carrier_fields_constructed === true,
    witness_object_has_endpoint_boundary_binding_ref:
      constructionFields.witness_object_has_endpoint_boundary_binding_ref === true ||
      obstructionFields.witness_object_has_endpoint_boundary_binding_ref === true,
    witness_object_has_endpoint_value_binding_map:
      constructionFields.witness_object_has_endpoint_value_binding_map === true ||
      obstructionFields.witness_object_has_endpoint_value_binding_map === true,
    full_endpoint_boundary_binding_constructed:
      constructionFields.full_endpoint_boundary_binding_constructed === true ||
      obstructionFields.full_endpoint_boundary_binding_constructed === true,
    endpoint_boundary_binding_constructed:
      constructionFields.endpoint_boundary_binding_constructed === true ||
      obstructionFields.endpoint_boundary_binding_constructed === true,
    endpoint_value_bound_to_boundary_binding:
      constructionFields.endpoint_value_bound_to_boundary_binding === true ||
      obstructionFields.endpoint_value_bound_to_boundary_binding === true,
    carrier_field_existence_lemma_present: false,
    carrier_field_existence_soundness_proof_present: false,
    endpoint_carrier_field_application_proof_present: false,
    ref_candidate_carrier_field_constructed:
      samePacketRefCarrierFieldConstructed,
    value_map_candidate_carrier_field_constructed:
      samePacketValueMapCarrierFieldConstructed,
    carrier_admission_field_object_present:
      samePacketRefCarrierFieldConstructed &&
      samePacketValueMapCarrierFieldConstructed,
    non_domain_carrier_admissibility_derivation_from_definitions_present:
      lAdmFields
        .non_domain_carrier_admissibility_derivation_from_definitions_present ===
      true,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  const routeAttempts = PROOF_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: lAdmEndpoint.id,
    endpoint_functional_id: lAdmEndpoint.endpoint_functional_id,
    role: lAdmEndpoint.role,
    same_packet_ref_value_carrier_field_existence_lemma_proof_attempt_id:
      `same_packet_ref_value_carrier_field_existence_lemma_proof_attempt:${lAdmEndpoint.id}`,
    source_non_domain_carrier_admissibility_lemma_proof_attempt_id:
      lAdmEndpoint.non_domain_carrier_admissibility_lemma_proof_attempt_id,
    source_same_packet_constructed_witness_object_identity_attempt_id:
      identityEndpoint.same_packet_constructed_witness_object_identity_attempt_id,
    source_non_domain_carrier_obstruction_id:
      obstructionEndpoint.non_domain_carrier_obstruction_id,
    source_carrier_field_obligation_id:
      obligationEndpoint.carrier_field_obligation_id,
    source_carrier_field_construction_attempt_id:
      constructionEndpoint.carrier_field_construction_attempt_id,
    ref_carrier_field_construction_attempt:
      summarizeCarrierAttempt(refAttempt),
    value_map_carrier_field_construction_attempt:
      summarizeCarrierAttempt(valueMapAttempt),
    ref_carrier_field_obstruction:
      summarizeCarrierObstruction(refObstruction),
    value_map_carrier_field_obstruction:
      summarizeCarrierObstruction(valueMapObstruction),
    source_scope_ready: carrierFieldSourceScopeReady(fields),
    route_attempts: routeAttempts,
    routes_passed: routeAttempts
      .filter((route) => route.passed)
      .map((route) => route.route_id),
    required_fields_present: fields,
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 4)
      .map((burden) => burden.missing_field),
    first_exact_blocker:
      missingProofBurdens[0]?.missing_field ?? "none",
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has source ref/value handles, carrier-field obligations, source-candidate bundles, and non-domain carrier obstructions, but the same-packet endpoint-boundary-binding ref carrier field and endpoint value-binding map carrier field are not constructed.",
  };
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
    source_carrier_field_source_scope_ready:
      carrierFieldSourceScopeReady(sourceFields),
    receiver_carrier_field_source_scope_ready:
      carrierFieldSourceScopeReady(receiverFields),
    combined_carrier_field_source_scope_ready: false,
    source_same_packet_ref_carrier_field_constructed:
      sourceFields.same_packet_ref_carrier_field_constructed,
    receiver_same_packet_ref_carrier_field_constructed:
      receiverFields.same_packet_ref_carrier_field_constructed,
    combined_same_packet_ref_carrier_field_constructed: false,
    source_same_packet_value_map_carrier_field_constructed:
      sourceFields.same_packet_value_map_carrier_field_constructed,
    receiver_same_packet_value_map_carrier_field_constructed:
      receiverFields.same_packet_value_map_carrier_field_constructed,
    combined_same_packet_value_map_carrier_field_constructed: false,
    source_ref_carrier_field_dependencies_present:
      sourceFields.ref_carrier_field_dependencies_present,
    receiver_ref_carrier_field_dependencies_present:
      receiverFields.ref_carrier_field_dependencies_present,
    combined_ref_carrier_field_dependencies_present: false,
    source_value_map_carrier_field_dependencies_present:
      sourceFields.value_map_carrier_field_dependencies_present,
    receiver_value_map_carrier_field_dependencies_present:
      receiverFields.value_map_carrier_field_dependencies_present,
    combined_value_map_carrier_field_dependencies_present: false,
    source_carrier_field_existence_lemma_present:
      sourceFields.carrier_field_existence_lemma_present,
    receiver_carrier_field_existence_lemma_present:
      receiverFields.carrier_field_existence_lemma_present,
    combined_carrier_field_existence_lemma_pair_present: false,
    source_endpoint_carrier_field_application_proof_present:
      sourceFields.endpoint_carrier_field_application_proof_present,
    receiver_endpoint_carrier_field_application_proof_present:
      receiverFields.endpoint_carrier_field_application_proof_present,
    combined_endpoint_carrier_field_application_proof_present: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };

  fields.combined_carrier_field_source_scope_ready =
    fields.source_carrier_field_source_scope_ready &&
    fields.receiver_carrier_field_source_scope_ready;
  fields.combined_same_packet_ref_carrier_field_constructed =
    fields.source_same_packet_ref_carrier_field_constructed &&
    fields.receiver_same_packet_ref_carrier_field_constructed;
  fields.combined_same_packet_value_map_carrier_field_constructed =
    fields.source_same_packet_value_map_carrier_field_constructed &&
    fields.receiver_same_packet_value_map_carrier_field_constructed;
  fields.combined_ref_carrier_field_dependencies_present =
    fields.source_ref_carrier_field_dependencies_present &&
    fields.receiver_ref_carrier_field_dependencies_present;
  fields.combined_value_map_carrier_field_dependencies_present =
    fields.source_value_map_carrier_field_dependencies_present &&
    fields.receiver_value_map_carrier_field_dependencies_present;
  fields.combined_carrier_field_existence_lemma_pair_present =
    fields.source_carrier_field_existence_lemma_present &&
    fields.receiver_carrier_field_existence_lemma_present;
  fields.combined_endpoint_carrier_field_application_proof_present =
    fields.source_endpoint_carrier_field_application_proof_present &&
    fields.receiver_endpoint_carrier_field_application_proof_present;

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
    source_same_packet_ref_value_carrier_field_existence_lemma_proof_attempt_id:
      source.same_packet_ref_value_carrier_field_existence_lemma_proof_attempt_id,
    receiver_same_packet_ref_value_carrier_field_existence_lemma_proof_attempt_id:
      receiver.same_packet_ref_value_carrier_field_existence_lemma_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver carrier-field source scopes, but neither side supplies ref/value same-packet carrier fields, dependency closure, an existence lemma, or an endpoint application proof.",
  };
}

function buildPacket({
  lAdm,
  lAdmPath,
  samePacketIdentity,
  samePacketIdentityPath,
  nonDomainCarrierObstruction,
  nonDomainCarrierObstructionPath,
  refPacket,
  refPacketPath,
  valueMapPacket,
  valueMapPacketPath,
  carrierFieldObligation,
  carrierFieldObligationPath,
  carrierFieldConstruction,
  carrierFieldConstructionPath,
}) {
  assertPacket(lAdm, L_ADM_STATUS, "L_adm proof attempt");
  assertPacket(
    samePacketIdentity,
    SAME_PACKET_IDENTITY_STATUS,
    "same-packet identity"
  );
  assertPacket(
    nonDomainCarrierObstruction,
    NON_DOMAIN_CARRIER_OBSTRUCTION_STATUS,
    "non-domain carrier obstruction"
  );
  assertPacket(refPacket, REF_STATUS, "endpoint-boundary-binding ref carrier");
  assertPacket(valueMapPacket, VALUE_MAP_STATUS, "endpoint value-binding map");
  assertPacket(
    carrierFieldObligation,
    CARRIER_FIELD_OBLIGATION_STATUS,
    "carrier-field obligation"
  );
  assertPacket(
    carrierFieldConstruction,
    CARRIER_FIELD_CONSTRUCTION_STATUS,
    "carrier-field construction"
  );

  const lAdmEndpoints =
    lAdm.endpoint_non_domain_carrier_admissibility_lemma_proof_attempts;
  const lAdmRows = lAdm.row_non_domain_carrier_admissibility_lemma_proof_attempts;
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
  const obligationMap = idMap(
    carrierFieldObligation.endpoint_witness_object_carrier_field_obligation_attempts,
    "id",
    "carrier-field obligation endpoint"
  );
  const constructionMap = idMap(
    carrierFieldConstruction.endpoint_witness_object_carrier_field_construction_attempts,
    "id",
    "carrier-field construction endpoint"
  );

  const endpointAudits = lAdmEndpoints.map((lAdmEndpoint) =>
    buildEndpointAudit({
      lAdmEndpoint,
      identityEndpoint: requireMapped(
        identityMap,
        lAdmEndpoint.id,
        "same-packet identity endpoint"
      ),
      obstructionEndpoint: requireMapped(
        obstructionMap,
        lAdmEndpoint.id,
        "non-domain carrier obstruction endpoint"
      ),
      obligationEndpoint: requireMapped(
        obligationMap,
        lAdmEndpoint.id,
        "carrier-field obligation endpoint"
      ),
      constructionEndpoint: requireMapped(
        constructionMap,
        lAdmEndpoint.id,
        "carrier-field construction endpoint"
      ),
    })
  );
  const endpointMap = idMap(
    endpointAudits,
    "id",
    "same-packet ref/value carrier-field existence lemma endpoint"
  );
  const rowAudits = lAdmRows.map((row) => buildRowAudit(row, endpointMap));
  const endpointFieldCounts = fieldCounts(endpointAudits, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAudits, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-same-packet-ref-value-carrier-field-existence-lemma-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; source handles, carrier-field obligations, and carrier source candidates are present, but same-packet ref/value carrier fields and an existence lemma are absent",
    source_artifacts: [
      {
        label: "non_domain_carrier_admissibility_lemma_proof_attempt_L_adm",
        ...artifactRecord(lAdmPath),
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
        label: "endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt",
        ...artifactRecord(refPacketPath),
      },
      {
        label: "endpoint_value_binding_map_construction_attempt",
        ...artifactRecord(valueMapPacketPath),
      },
      {
        label: "same_packet_witness_object_carrier_field_obligation_attempt",
        ...artifactRecord(carrierFieldObligationPath),
      },
      {
        label: "same_packet_witness_object_carrier_field_construction_attempt",
        ...artifactRecord(carrierFieldConstructionPath),
      },
    ],
    proof_attempt_target: {
      target_id:
        "ref-value-carrier-introduction-same-packet-ref-value-carrier-field-existence-lemma-proof-attempt",
      selected_route:
        "derive_same_packet_ref_value_carrier_fields_from_existing_fields",
      out_of_scope_route:
        "non_domain_carrier_admissibility_derivation_or_row_consumption_route",
      statement:
        "Attempt to prove the same-packet ref/value carrier-field existence lemma needed before `L_adm`: the endpoint-boundary-binding ref and endpoint value-binding map source candidates determine constructed non-domain carrier fields inside the same witness object.",
      accepted_as_first_blocker_discharge_if:
        "Every endpoint has constructed same-packet ref/value carrier fields, satisfied carrier-field dependency lists, a carrier-field existence lemma, and an endpoint application proof back to the `L_adm` carrier-field blockers.",
      first_exact_blocker:
        "same_packet_ref_carrier_field_constructed, same_packet_value_map_carrier_field_constructed, ref_carrier_field_dependencies_present, and value_map_carrier_field_dependencies_present",
    },
    downstream_policy:
      "`L_adm`, witness-object membership, carrier-admission definition bridges, admissibility derivations, row consumption, and branch-chart authorization remain downstream of this carrier-field existence lemma proof attempt.",
    no_promotion_rule:
      "Source endpoint-boundary-binding refs, source endpoint value-binding maps, and non-domain carrier source candidates are source-scope evidence only. They are not promoted to same-packet ref/value carrier fields without constructed carrier-field objects, dependency closure, an existence lemma, and an endpoint application proof.",
    proof_burdens: PROOF_BURDENS,
    proof_routes: PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_same_packet_ref_value_carrier_field_existence_lemma_proof_attempts:
      endpointAudits,
    row_same_packet_ref_value_carrier_field_existence_lemma_proof_attempts:
      rowAudits,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAudits.length,
      residual_consumer_rows: rowAudits.length,
      l_adm_inputs_present: endpointFieldCounts.l_adm_input_present,
      carrier_field_existence_targets_declared:
        endpointFieldCounts.carrier_field_existence_target_declared,
      carrier_field_obligations_declared:
        endpointFieldCounts.carrier_field_obligation_declared,
      carrier_field_source_candidate_bundles_declared:
        endpointFieldCounts.carrier_field_source_candidate_bundle_declared,
      all_carrier_field_source_candidates_declared:
        endpointFieldCounts.all_carrier_field_source_candidates_declared,
      domain_chart_carrier_subfields_constructed:
        endpointFieldCounts.domain_chart_carrier_subfield_constructed,
      source_endpoint_boundary_binding_refs_constructed:
        endpointFieldCounts.source_endpoint_boundary_binding_ref_constructed,
      source_endpoint_value_binding_maps_constructed:
        endpointFieldCounts.source_endpoint_value_binding_map_constructed,
      ref_non_domain_carrier_source_candidates_declared:
        endpointFieldCounts
          .endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared,
      value_map_non_domain_carrier_source_candidates_declared:
        endpointFieldCounts
          .endpoint_value_binding_map_non_domain_carrier_source_candidate_declared,
      non_domain_carrier_obstructions_present:
        endpointFieldCounts.non_domain_carrier_obstruction_present,
      ref_non_domain_carrier_field_obstructions_present:
        endpointFieldCounts.ref_non_domain_carrier_field_obstruction_present,
      value_map_non_domain_carrier_field_obstructions_present:
        endpointFieldCounts
          .value_map_non_domain_carrier_field_obstruction_present,
      carrier_field_construction_attempts:
        endpointFieldCounts.carrier_field_construction_attempted,
      same_packet_ref_carrier_fields_constructed:
        endpointFieldCounts.same_packet_ref_carrier_field_constructed,
      same_packet_value_map_carrier_fields_constructed:
        endpointFieldCounts.same_packet_value_map_carrier_field_constructed,
      ref_carrier_field_dependencies_present:
        endpointFieldCounts.ref_carrier_field_dependencies_present,
      value_map_carrier_field_dependencies_present:
        endpointFieldCounts.value_map_carrier_field_dependencies_present,
      all_carrier_fields_constructed:
        endpointFieldCounts.all_carrier_fields_constructed,
      carrier_field_existence_lemmas_present:
        endpointFieldCounts.carrier_field_existence_lemma_present,
      carrier_field_existence_soundness_proofs_present:
        endpointFieldCounts.carrier_field_existence_soundness_proof_present,
      endpoint_carrier_field_application_proofs_present:
        endpointFieldCounts.endpoint_carrier_field_application_proof_present,
      ref_candidate_carrier_fields_constructed:
        endpointFieldCounts.ref_candidate_carrier_field_constructed,
      value_map_candidate_carrier_fields_constructed:
        endpointFieldCounts.value_map_candidate_carrier_field_constructed,
      carrier_admission_field_objects_present:
        endpointFieldCounts.carrier_admission_field_object_present,
      non_domain_carrier_admissibility_derivations_from_definitions_present:
        endpointFieldCounts
          .non_domain_carrier_admissibility_derivation_from_definitions_present,
      row_carrier_field_source_scope_pairs_ready:
        rowFieldCounts.combined_carrier_field_source_scope_ready,
      row_ref_carrier_field_pairs_constructed:
        rowFieldCounts.combined_same_packet_ref_carrier_field_constructed,
      row_value_map_carrier_field_pairs_constructed:
        rowFieldCounts.combined_same_packet_value_map_carrier_field_constructed,
      row_ref_dependency_pairs_present:
        rowFieldCounts.combined_ref_carrier_field_dependencies_present,
      row_value_map_dependency_pairs_present:
        rowFieldCounts.combined_value_map_carrier_field_dependencies_present,
      row_carrier_field_existence_lemma_pairs_present:
        rowFieldCounts.combined_carrier_field_existence_lemma_pair_present,
      row_endpoint_application_proof_pairs_present:
        rowFieldCounts.combined_endpoint_carrier_field_application_proof_present,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint has same-packet ref/value carrier fields, satisfied ref/value dependency lists, a carrier-field existence lemma, or endpoint application proof back to `L_adm`.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed same-packet ref/value carrier-field existence lemma proof attempt below `L_adm` and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${endpoint.source_scope_ready} | ${fields.source_endpoint_boundary_binding_ref_constructed} | ${fields.source_endpoint_value_binding_map_constructed} | ${fields.endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared} | ${fields.endpoint_value_binding_map_non_domain_carrier_source_candidate_declared} | ${fields.ref_non_domain_carrier_field_obstruction_present} | ${fields.value_map_non_domain_carrier_field_obstruction_present} | ${fields.same_packet_ref_carrier_field_constructed} | ${fields.same_packet_value_map_carrier_field_constructed} | ${fields.ref_carrier_field_dependencies_present} | ${fields.value_map_carrier_field_dependencies_present} | ${fields.carrier_field_existence_lemma_present} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_carrier_field_source_scope_ready} | ${fields.combined_same_packet_ref_carrier_field_constructed} | ${fields.combined_same_packet_value_map_carrier_field_constructed} | ${fields.combined_ref_carrier_field_dependencies_present} | ${fields.combined_value_map_carrier_field_dependencies_present} | ${fields.combined_carrier_field_existence_lemma_pair_present} | ${fields.combined_endpoint_carrier_field_application_proof_present} | ${row.row_consumed} |`;
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
  return `# Ref/Value Carrier-Introduction Same-Packet Ref/Value Carrier-Field Existence Lemma Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet attempts the same-packet ref/value carrier-field existence lemma
immediately below ` + "`L_adm`" + `. It tests whether existing source
endpoint-boundary-binding refs, endpoint value-binding maps, carrier-field
obligations, source-candidate bundles, and non-domain carrier obstructions can
construct the two first missing carrier fields required by ` + "`L_adm`" + `.

The proof attempt remains fail-closed. It records ${summary.l_adm_inputs_present} / ${summary.endpoint_functionals}
` + "`L_adm`" + ` inputs, ${summary.carrier_field_obligations_declared} / ${summary.endpoint_functionals}
carrier-field obligations, ${summary.carrier_field_source_candidate_bundles_declared} / ${summary.endpoint_functionals}
source-candidate bundles, ${summary.domain_chart_carrier_subfields_constructed} / ${summary.endpoint_functionals}
domain-chart carrier subfields, ${summary.source_endpoint_boundary_binding_refs_constructed} / ${summary.endpoint_functionals}
source endpoint-boundary-binding refs, ${summary.source_endpoint_value_binding_maps_constructed} / ${summary.endpoint_functionals}
source endpoint value-binding maps, ${summary.ref_non_domain_carrier_source_candidates_declared} / ${summary.endpoint_functionals}
ref non-domain carrier source candidates, ${summary.value_map_non_domain_carrier_source_candidates_declared} / ${summary.endpoint_functionals}
value-map non-domain carrier source candidates, and ${summary.non_domain_carrier_obstructions_present} / ${summary.endpoint_functionals}
non-domain carrier obstructions. It records ${summary.same_packet_ref_carrier_fields_constructed} / ${summary.endpoint_functionals}
same-packet ref carrier fields, ${summary.same_packet_value_map_carrier_fields_constructed} / ${summary.endpoint_functionals}
same-packet value-map carrier fields, ${summary.ref_carrier_field_dependencies_present} / ${summary.endpoint_functionals}
ref dependency closures, ${summary.value_map_carrier_field_dependencies_present} / ${summary.endpoint_functionals}
value-map dependency closures, ${summary.carrier_field_existence_lemmas_present} / ${summary.endpoint_functionals}
carrier-field existence lemmas, and ${summary.endpoint_carrier_field_application_proofs_present} / ${summary.endpoint_functionals}
endpoint application proofs. It consumes ${summary.row_consumption_count}
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Proof Attempt Target

${packet.proof_attempt_target.statement}

Accepted as blocker discharge if: ${packet.proof_attempt_target.accepted_as_first_blocker_discharge_if}

First exact blockers: ${packet.proof_attempt_target.first_exact_blocker}

## Downstream Policy

${packet.downstream_policy}

## No-Promotion Rule

${packet.no_promotion_rule}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.proof_routes)}

## Endpoint Audits

| Endpoint | Role | Source scope | Source ref | Source value map | Ref candidate | Value candidate | Ref obstruction | Value obstruction | Ref field | Value field | Ref deps | Value deps | Existence lemma | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_same_packet_ref_value_carrier_field_existence_lemma_proof_attempts)}

## Row Audits

| Row | Carrier-field source scope pair | Ref field pair | Value field pair | Ref dependency pair | Value dependency pair | Existence lemma pair | Application proof pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_same_packet_ref_value_carrier_field_existence_lemma_proof_attempts)}

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
    lAdm: readJson(args.lAdmPacket),
    lAdmPath: args.lAdmPacket,
    samePacketIdentity: readJson(args.samePacketIdentityPacket),
    samePacketIdentityPath: args.samePacketIdentityPacket,
    nonDomainCarrierObstruction: readJson(
      args.nonDomainCarrierObstructionPacket
    ),
    nonDomainCarrierObstructionPath: args.nonDomainCarrierObstructionPacket,
    refPacket: readJson(args.refPacket),
    refPacketPath: args.refPacket,
    valueMapPacket: readJson(args.valueMapPacket),
    valueMapPacketPath: args.valueMapPacket,
    carrierFieldObligation: readJson(args.carrierFieldObligationPacket),
    carrierFieldObligationPath: args.carrierFieldObligationPacket,
    carrierFieldConstruction: readJson(args.carrierFieldConstructionPacket),
    carrierFieldConstructionPath: args.carrierFieldConstructionPacket,
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

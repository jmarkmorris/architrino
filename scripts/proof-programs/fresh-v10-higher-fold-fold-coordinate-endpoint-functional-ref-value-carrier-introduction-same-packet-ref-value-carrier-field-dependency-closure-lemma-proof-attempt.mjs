#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_EXISTENCE_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_same_packet_ref_value_carrier_field_existence_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REF_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_FIELD_CONSTRUCTION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const EXISTENCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-same-packet-ref-value-carrier-field-existence-lemma-proof-attempt-fail-closed-source-ref-value-handles-and-non-domain-carrier-source-candidates-present-same-packet-ref-value-carrier-fields-absent-no-row-consumption";
const REF_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";
const CARRIER_FIELD_CONSTRUCTION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-construction-attempt-fail-closed-carrier-field-source-candidates-present-carrier-fields-absent-no-row-consumption";
const NON_DOMAIN_CARRIER_OBSTRUCTION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption";
const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-same-packet-ref-value-carrier-field-dependency-closure-lemma-proof-attempt-fail-closed-source-ref-value-handles-present-dependency-closures-absent-no-row-consumption";

const REF_CARRIER_FIELD = "endpoint_boundary_binding_ref";
const VALUE_MAP_CARRIER_FIELD = "endpoint_value_binding_map";

const ENDPOINT_FIELDS = [
  "existence_packet_input_present",
  "source_ref_packet_endpoint_boundary_binding_constructed",
  "source_ref_packet_witness_object_has_endpoint_boundary_binding_ref",
  "source_ref_packet_full_endpoint_boundary_binding_constructed",
  "source_value_packet_endpoint_value_binding_map_constructed",
  "source_value_packet_witness_object_has_endpoint_value_binding_map",
  "source_value_packet_endpoint_value_bound_to_boundary_binding",
  "source_carrier_field_source_candidates_declared",
  "same_packet_full_endpoint_boundary_binding_dependency_present",
  "same_packet_endpoint_boundary_binding_dependency_present",
  "same_packet_witness_object_ref_dependency_present",
  "same_packet_endpoint_value_bound_to_boundary_binding_dependency_present",
  "same_packet_witness_object_value_map_dependency_present",
  "same_packet_ref_carrier_field_dependencies_closed",
  "same_packet_value_map_carrier_field_dependencies_closed",
  "same_packet_ref_carrier_field_constructed",
  "same_packet_value_map_carrier_field_constructed",
  "source_level_ref_binding_not_promoted",
  "source_level_value_binding_not_promoted",
  "dependency_closure_lemma_present",
  "endpoint_dependency_application_proof_present",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_source_binding_evidence_present",
  "receiver_source_binding_evidence_present",
  "combined_source_binding_evidence_present",
  "source_same_packet_ref_dependency_closure_present",
  "receiver_same_packet_ref_dependency_closure_present",
  "combined_same_packet_ref_dependency_closure_present",
  "source_same_packet_value_map_dependency_closure_present",
  "receiver_same_packet_value_map_dependency_closure_present",
  "combined_same_packet_value_map_dependency_closure_present",
  "source_same_packet_ref_carrier_field_constructed",
  "receiver_same_packet_ref_carrier_field_constructed",
  "combined_same_packet_ref_carrier_field_constructed",
  "source_same_packet_value_map_carrier_field_constructed",
  "receiver_same_packet_value_map_carrier_field_constructed",
  "combined_same_packet_value_map_carrier_field_constructed",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const PROOF_BURDENS = [
  {
    burden_id: "D_ref_dependency_closure",
    missing_field: "same_packet_ref_carrier_field_dependencies_closed",
    required_evidence:
      "A same-packet closure of the ref carrier-field dependencies, including proof-grade endpoint boundary binding and witness-object ref evidence.",
  },
  {
    burden_id: "D_val_dependency_closure",
    missing_field: "same_packet_value_map_carrier_field_dependencies_closed",
    required_evidence:
      "A same-packet closure of the value-map carrier-field dependencies, including proof-grade endpoint value binding and witness-object value-map evidence.",
  },
  {
    burden_id: "D_ref_full_endpoint_boundary_binding",
    missing_field: "same_packet_full_endpoint_boundary_binding_dependency_present",
    required_evidence:
      "A same-packet full endpoint boundary binding dependency for the ref carrier field.",
  },
  {
    burden_id: "D_ref_endpoint_boundary_binding",
    missing_field: "same_packet_endpoint_boundary_binding_dependency_present",
    required_evidence:
      "A same-packet proof-grade endpoint boundary binding dependency for the ref and value-map carrier fields.",
  },
  {
    burden_id: "D_ref_witness_object_ref",
    missing_field: "same_packet_witness_object_ref_dependency_present",
    required_evidence:
      "A same-packet witness-object endpoint-boundary-binding ref field, not merely a source-layer witness-object ref from the ref packet.",
  },
  {
    burden_id: "D_val_endpoint_value_bound",
    missing_field:
      "same_packet_endpoint_value_bound_to_boundary_binding_dependency_present",
    required_evidence:
      "A same-packet proof-grade endpoint value bound to a constructed endpoint boundary binding.",
  },
  {
    burden_id: "D_val_witness_object_value_map",
    missing_field: "same_packet_witness_object_value_map_dependency_present",
    required_evidence:
      "A same-packet witness-object endpoint value-binding map field, not merely a source-layer value-map construction.",
  },
  {
    burden_id: "D_dependency_closure_lemma",
    missing_field: "dependency_closure_lemma_present",
    required_evidence:
      "A lemma proving that source-layer ref/value bindings lawfully discharge the same-packet carrier-field dependency lists.",
  },
];

const PROOF_ROUTES = [
  {
    route_id: "import_ref_packet_ref_as_same_packet_dependency",
    status: "rejected-source-layer",
    required_fields: [
      "source_ref_packet_endpoint_boundary_binding_constructed",
      "source_ref_packet_witness_object_has_endpoint_boundary_binding_ref",
      "same_packet_endpoint_boundary_binding_dependency_present",
      "same_packet_witness_object_ref_dependency_present",
    ],
    limitation:
      "The ref packet constructs a source-layer endpoint-boundary-binding ref, but the same-packet carrier-field construction and obstruction packets still lack the proof-grade dependency fields.",
  },
  {
    route_id: "import_value_packet_map_as_same_packet_dependency",
    status: "rejected-source-layer",
    required_fields: [
      "source_value_packet_endpoint_value_binding_map_constructed",
      "source_value_packet_endpoint_value_bound_to_boundary_binding",
      "same_packet_endpoint_value_bound_to_boundary_binding_dependency_present",
      "same_packet_witness_object_value_map_dependency_present",
    ],
    limitation:
      "The value-map packet constructs source-layer value bindings, but those bindings are not same-packet carrier-field dependency closure.",
  },
  {
    route_id: "close_ref_dependencies_from_same_packet_fields",
    status: "blocked",
    required_fields: [
      "same_packet_full_endpoint_boundary_binding_dependency_present",
      "same_packet_endpoint_boundary_binding_dependency_present",
      "same_packet_witness_object_ref_dependency_present",
      "same_packet_ref_carrier_field_dependencies_closed",
    ],
    limitation:
      "The same-packet dependency fields remain absent in the carrier-field construction and obstruction layers.",
  },
  {
    route_id: "close_value_map_dependencies_from_same_packet_fields",
    status: "blocked",
    required_fields: [
      "same_packet_endpoint_boundary_binding_dependency_present",
      "same_packet_endpoint_value_bound_to_boundary_binding_dependency_present",
      "same_packet_witness_object_value_map_dependency_present",
      "same_packet_value_map_carrier_field_dependencies_closed",
    ],
    limitation:
      "The same-packet value-map dependency fields remain absent in the carrier-field construction and obstruction layers.",
  },
  {
    route_id: "derive_carrier_fields_after_dependency_closure",
    status: "blocked-downstream",
    required_fields: [
      "same_packet_ref_carrier_field_dependencies_closed",
      "same_packet_value_map_carrier_field_dependencies_closed",
      "same_packet_ref_carrier_field_constructed",
      "same_packet_value_map_carrier_field_constructed",
      "dependency_closure_lemma_present",
    ],
    limitation:
      "Constructed ref/value carrier fields remain downstream of dependency closure and a separate existence/application proof.",
  },
];

function parseArgs(argv) {
  const args = {
    existencePacket: DEFAULT_EXISTENCE_PACKET,
    refPacket: DEFAULT_REF_PACKET,
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    carrierFieldConstructionPacket: DEFAULT_CARRIER_FIELD_CONSTRUCTION_PACKET,
    nonDomainCarrierObstructionPacket:
      DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--existence-packet") {
      args.existencePacket = argv[++index];
    } else if (arg === "--ref-packet") {
      args.refPacket = argv[++index];
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
    } else if (arg === "--carrier-field-construction-packet") {
      args.carrierFieldConstructionPacket = argv[++index];
    } else if (arg === "--non-domain-carrier-obstruction-packet") {
      args.nonDomainCarrierObstructionPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-same-packet-ref-value-carrier-field-dependency-closure-lemma-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --existence-packet <path>",
    "  --ref-packet <path>",
    "  --value-map-packet <path>",
    "  --carrier-field-construction-packet <path>",
    "  --non-domain-carrier-obstruction-packet <path>",
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

function sourceBindingEvidencePresent(fields) {
  return (
    fields.source_ref_packet_endpoint_boundary_binding_constructed &&
    fields.source_ref_packet_witness_object_has_endpoint_boundary_binding_ref &&
    fields.source_value_packet_endpoint_value_binding_map_constructed &&
    fields.source_value_packet_witness_object_has_endpoint_value_binding_map &&
    fields.source_value_packet_endpoint_value_bound_to_boundary_binding
  );
}

function buildEndpointAudit({
  existenceEndpoint,
  refEndpoint,
  valueMapEndpoint,
  constructionEndpoint,
  obstructionEndpoint,
}) {
  const existenceFields = existenceEndpoint.required_fields_present ?? {};
  const refFields = refEndpoint.required_fields_present ?? {};
  const valueMapFields = valueMapEndpoint.required_fields_present ?? {};
  const constructionFields = constructionEndpoint.required_fields_present ?? {};
  const obstructionFields = obstructionEndpoint.required_fields_present ?? {};
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

  const samePacketFullBinding =
    constructionFields.full_endpoint_boundary_binding_constructed === true &&
    obstructionFields.full_endpoint_boundary_binding_constructed === true;
  const samePacketEndpointBoundaryBinding =
    constructionFields.endpoint_boundary_binding_constructed === true &&
    obstructionFields.endpoint_boundary_binding_constructed === true;
  const samePacketWitnessObjectRef =
    constructionFields.witness_object_has_endpoint_boundary_binding_ref === true &&
    obstructionFields.witness_object_has_endpoint_boundary_binding_ref === true;
  const samePacketEndpointValueBound =
    constructionFields.endpoint_value_bound_to_boundary_binding === true &&
    obstructionFields.endpoint_value_bound_to_boundary_binding === true;
  const samePacketWitnessObjectValueMap =
    constructionFields.witness_object_has_endpoint_value_binding_map === true &&
    obstructionFields.witness_object_has_endpoint_value_binding_map === true;
  const refDependencyClosure =
    samePacketFullBinding &&
    samePacketEndpointBoundaryBinding &&
    samePacketWitnessObjectRef &&
    (refAttempt.missing_dependencies ?? []).length === 0 &&
    (refObstruction.missing_dependencies ?? []).length === 0;
  const valueMapDependencyClosure =
    samePacketEndpointBoundaryBinding &&
    samePacketEndpointValueBound &&
    samePacketWitnessObjectValueMap &&
    (valueMapAttempt.missing_dependencies ?? []).length === 0 &&
    (valueMapObstruction.missing_dependencies ?? []).length === 0;

  const fields = {
    existence_packet_input_present: true,
    source_ref_packet_endpoint_boundary_binding_constructed:
      refFields.endpoint_boundary_binding_constructed === true,
    source_ref_packet_witness_object_has_endpoint_boundary_binding_ref:
      refFields.witness_object_has_endpoint_boundary_binding_ref === true,
    source_ref_packet_full_endpoint_boundary_binding_constructed:
      refFields.full_endpoint_boundary_binding_constructed === true,
    source_value_packet_endpoint_value_binding_map_constructed:
      valueMapFields.endpoint_value_binding_map_constructed === true,
    source_value_packet_witness_object_has_endpoint_value_binding_map:
      valueMapFields.witness_object_has_endpoint_value_binding_map === true,
    source_value_packet_endpoint_value_bound_to_boundary_binding:
      valueMapFields.endpoint_value_bound_to_boundary_binding === true,
    source_carrier_field_source_candidates_declared:
      existenceFields
        .endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared ===
        true &&
      existenceFields
        .endpoint_value_binding_map_non_domain_carrier_source_candidate_declared ===
        true,
    same_packet_full_endpoint_boundary_binding_dependency_present:
      samePacketFullBinding,
    same_packet_endpoint_boundary_binding_dependency_present:
      samePacketEndpointBoundaryBinding,
    same_packet_witness_object_ref_dependency_present:
      samePacketWitnessObjectRef,
    same_packet_endpoint_value_bound_to_boundary_binding_dependency_present:
      samePacketEndpointValueBound,
    same_packet_witness_object_value_map_dependency_present:
      samePacketWitnessObjectValueMap,
    same_packet_ref_carrier_field_dependencies_closed:
      refDependencyClosure,
    same_packet_value_map_carrier_field_dependencies_closed:
      valueMapDependencyClosure,
    same_packet_ref_carrier_field_constructed:
      existenceFields.same_packet_ref_carrier_field_constructed === true,
    same_packet_value_map_carrier_field_constructed:
      existenceFields.same_packet_value_map_carrier_field_constructed === true,
    source_level_ref_binding_not_promoted:
      refFields.endpoint_boundary_binding_constructed === true &&
      refFields.witness_object_has_endpoint_boundary_binding_ref === true &&
      !samePacketEndpointBoundaryBinding &&
      !samePacketWitnessObjectRef,
    source_level_value_binding_not_promoted:
      valueMapFields.endpoint_value_binding_map_constructed === true &&
      valueMapFields.endpoint_value_bound_to_boundary_binding === true &&
      !samePacketEndpointValueBound &&
      !samePacketWitnessObjectValueMap,
    dependency_closure_lemma_present: false,
    endpoint_dependency_application_proof_present: false,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  const routeAttempts = PROOF_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: existenceEndpoint.id,
    endpoint_functional_id: existenceEndpoint.endpoint_functional_id,
    role: existenceEndpoint.role,
    same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt_id:
      `same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt:${existenceEndpoint.id}`,
    source_same_packet_ref_value_carrier_field_existence_lemma_proof_attempt_id:
      existenceEndpoint
        .same_packet_ref_value_carrier_field_existence_lemma_proof_attempt_id,
    source_ref_carrier_full_binding_construction_attempt_id:
      refEndpoint.ref_carrier_full_binding_construction_attempt_id,
    source_endpoint_value_binding_map_construction_attempt_id:
      valueMapEndpoint.endpoint_value_binding_map_construction_attempt_id,
    source_carrier_field_construction_attempt_id:
      constructionEndpoint.carrier_field_construction_attempt_id,
    source_non_domain_carrier_obstruction_id:
      obstructionEndpoint.non_domain_carrier_obstruction_id,
    source_ref_dependency_evidence: {
      source_endpoint_boundary_binding_constructed:
        fields.source_ref_packet_endpoint_boundary_binding_constructed,
      source_witness_object_ref_present:
        fields.source_ref_packet_witness_object_has_endpoint_boundary_binding_ref,
      source_full_endpoint_boundary_binding_constructed:
        fields.source_ref_packet_full_endpoint_boundary_binding_constructed,
      same_packet_full_endpoint_boundary_binding_dependency_present:
        fields.same_packet_full_endpoint_boundary_binding_dependency_present,
      same_packet_endpoint_boundary_binding_dependency_present:
        fields.same_packet_endpoint_boundary_binding_dependency_present,
      same_packet_witness_object_ref_dependency_present:
        fields.same_packet_witness_object_ref_dependency_present,
      ref_attempt_missing_dependencies:
        refAttempt.missing_dependencies ?? [],
      ref_obstruction_missing_dependencies:
        refObstruction.missing_dependencies ?? [],
    },
    source_value_map_dependency_evidence: {
      source_endpoint_value_binding_map_constructed:
        fields.source_value_packet_endpoint_value_binding_map_constructed,
      source_witness_object_value_map_present:
        fields.source_value_packet_witness_object_has_endpoint_value_binding_map,
      source_endpoint_value_bound_to_boundary_binding:
        fields.source_value_packet_endpoint_value_bound_to_boundary_binding,
      same_packet_endpoint_value_bound_to_boundary_binding_dependency_present:
        fields
          .same_packet_endpoint_value_bound_to_boundary_binding_dependency_present,
      same_packet_witness_object_value_map_dependency_present:
        fields.same_packet_witness_object_value_map_dependency_present,
      value_map_attempt_missing_dependencies:
        valueMapAttempt.missing_dependencies ?? [],
      value_map_obstruction_missing_dependencies:
        valueMapObstruction.missing_dependencies ?? [],
    },
    source_binding_evidence_present: sourceBindingEvidencePresent(fields),
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
      "Source-layer ref/value binding evidence is present, but the same-packet carrier-field construction and obstruction layers do not close the ref/value dependency lists.",
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
    source_source_binding_evidence_present:
      source.source_binding_evidence_present,
    receiver_source_binding_evidence_present:
      receiver.source_binding_evidence_present,
    combined_source_binding_evidence_present: false,
    source_same_packet_ref_dependency_closure_present:
      sourceFields.same_packet_ref_carrier_field_dependencies_closed,
    receiver_same_packet_ref_dependency_closure_present:
      receiverFields.same_packet_ref_carrier_field_dependencies_closed,
    combined_same_packet_ref_dependency_closure_present: false,
    source_same_packet_value_map_dependency_closure_present:
      sourceFields.same_packet_value_map_carrier_field_dependencies_closed,
    receiver_same_packet_value_map_dependency_closure_present:
      receiverFields.same_packet_value_map_carrier_field_dependencies_closed,
    combined_same_packet_value_map_dependency_closure_present: false,
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
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };

  fields.combined_source_binding_evidence_present =
    fields.source_source_binding_evidence_present &&
    fields.receiver_source_binding_evidence_present;
  fields.combined_same_packet_ref_dependency_closure_present =
    fields.source_same_packet_ref_dependency_closure_present &&
    fields.receiver_same_packet_ref_dependency_closure_present;
  fields.combined_same_packet_value_map_dependency_closure_present =
    fields.source_same_packet_value_map_dependency_closure_present &&
    fields.receiver_same_packet_value_map_dependency_closure_present;
  fields.combined_same_packet_ref_carrier_field_constructed =
    fields.source_same_packet_ref_carrier_field_constructed &&
    fields.receiver_same_packet_ref_carrier_field_constructed;
  fields.combined_same_packet_value_map_carrier_field_constructed =
    fields.source_same_packet_value_map_carrier_field_constructed &&
    fields.receiver_same_packet_value_map_carrier_field_constructed;

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
    source_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt_id:
      source
        .same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt_id,
    receiver_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt_id:
      receiver
        .same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver source-layer binding evidence, but neither side has same-packet ref/value dependency closure or constructed ref/value carrier fields.",
  };
}

function buildPacket({
  existence,
  existencePath,
  refPacket,
  refPacketPath,
  valueMapPacket,
  valueMapPacketPath,
  carrierFieldConstruction,
  carrierFieldConstructionPath,
  nonDomainCarrierObstruction,
  nonDomainCarrierObstructionPath,
}) {
  assertPacket(existence, EXISTENCE_STATUS, "carrier-field existence packet");
  assertPacket(refPacket, REF_STATUS, "endpoint-boundary-binding ref packet");
  assertPacket(valueMapPacket, VALUE_MAP_STATUS, "endpoint value-map packet");
  assertPacket(
    carrierFieldConstruction,
    CARRIER_FIELD_CONSTRUCTION_STATUS,
    "carrier-field construction packet"
  );
  assertPacket(
    nonDomainCarrierObstruction,
    NON_DOMAIN_CARRIER_OBSTRUCTION_STATUS,
    "non-domain carrier obstruction packet"
  );

  const existenceEndpoints =
    existence.endpoint_same_packet_ref_value_carrier_field_existence_lemma_proof_attempts;
  const existenceRows =
    existence.row_same_packet_ref_value_carrier_field_existence_lemma_proof_attempts;
  const refMap = idMap(
    refPacket.endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts,
    "id",
    "endpoint-boundary-binding ref endpoint"
  );
  const valueMap = idMap(
    valueMapPacket.endpoint_value_binding_map_construction_attempts,
    "id",
    "endpoint value-map endpoint"
  );
  const constructionMap = idMap(
    carrierFieldConstruction.endpoint_witness_object_carrier_field_construction_attempts,
    "id",
    "carrier-field construction endpoint"
  );
  const obstructionMap = idMap(
    nonDomainCarrierObstruction
      .endpoint_witness_object_non_domain_carrier_obstruction_packets,
    "id",
    "non-domain carrier obstruction endpoint"
  );

  const endpointAudits = existenceEndpoints.map((existenceEndpoint) =>
    buildEndpointAudit({
      existenceEndpoint,
      refEndpoint: requireMapped(
        refMap,
        existenceEndpoint.id,
        "endpoint-boundary-binding ref endpoint"
      ),
      valueMapEndpoint: requireMapped(
        valueMap,
        existenceEndpoint.id,
        "endpoint value-map endpoint"
      ),
      constructionEndpoint: requireMapped(
        constructionMap,
        existenceEndpoint.id,
        "carrier-field construction endpoint"
      ),
      obstructionEndpoint: requireMapped(
        obstructionMap,
        existenceEndpoint.id,
        "non-domain carrier obstruction endpoint"
      ),
    })
  );
  const endpointMap = idMap(
    endpointAudits,
    "id",
    "same-packet ref/value carrier-field dependency closure endpoint"
  );
  const rowAudits = existenceRows.map((row) => buildRowAudit(row, endpointMap));
  const endpointFieldCounts = fieldCounts(endpointAudits, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAudits, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-same-packet-ref-value-carrier-field-dependency-closure-lemma-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; source-layer ref/value bindings are present, but same-packet ref/value carrier-field dependency closure is absent",
    source_artifacts: [
      {
        label:
          "same_packet_ref_value_carrier_field_existence_lemma_proof_attempt",
        ...artifactRecord(existencePath),
      },
      {
        label: "endpoint_boundary_binding_ref_carrier_full_binding_packet",
        ...artifactRecord(refPacketPath),
      },
      {
        label: "endpoint_value_binding_map_construction_packet",
        ...artifactRecord(valueMapPacketPath),
      },
      {
        label: "same_packet_witness_object_carrier_field_construction_packet",
        ...artifactRecord(carrierFieldConstructionPath),
      },
      {
        label: "same_packet_non_domain_carrier_obstruction_packet",
        ...artifactRecord(nonDomainCarrierObstructionPath),
      },
    ],
    proof_attempt_target: {
      target_id:
        "ref-value-carrier-introduction-same-packet-ref-value-carrier-field-dependency-closure-lemma-proof-attempt",
      selected_route:
        "close_ref_value_dependencies_from_same_packet_carrier_field_layers",
      out_of_scope_route:
        "carrier_field_existence_lemma_or_non_domain_carrier_admissibility_route",
      statement:
        "Attempt to prove the dependency-closure lemma below the same-packet ref/value carrier-field existence route: source-layer endpoint-boundary-binding refs and endpoint value-binding maps may discharge the same-packet dependency lists required for the ref/value carrier fields.",
      accepted_as_blocker_discharge_if:
        "Every endpoint has same-packet ref and value-map dependency closure, a non-promotion lemma from source-layer evidence to same-packet dependencies, and no remaining missing dependency in the carrier-field construction and obstruction records.",
      first_exact_blocker:
        "same_packet_ref_carrier_field_dependencies_closed, same_packet_value_map_carrier_field_dependencies_closed, same_packet_full_endpoint_boundary_binding_dependency_present, and same_packet_endpoint_boundary_binding_dependency_present",
    },
    downstream_policy:
      "Carrier-field construction, the same-packet ref/value carrier-field existence lemma, `L_adm`, row consumption, and branch-chart authorization remain downstream of dependency closure.",
    no_promotion_rule:
      "Source-layer endpoint-boundary-binding refs, witness-object refs, endpoint value-binding maps, and source value bindings are not promoted to same-packet carrier-field dependencies unless the carrier-field construction and obstruction layers both expose the proof-grade dependency fields.",
    source_import_hazards: [
      {
        hazard_id: "source_ref_packet_ref_field_vs_same_packet_ref_dependency",
        source_positive_fields: [
          "source_ref_packet_endpoint_boundary_binding_constructed",
          "source_ref_packet_witness_object_has_endpoint_boundary_binding_ref",
        ],
        same_packet_required_fields: [
          "same_packet_endpoint_boundary_binding_dependency_present",
          "same_packet_witness_object_ref_dependency_present",
        ],
        resolution:
          "Count the source ref packet as source evidence only; do not count it as same-packet ref carrier-field dependency closure.",
      },
      {
        hazard_id:
          "source_value_packet_value_binding_vs_same_packet_value_dependency",
        source_positive_fields: [
          "source_value_packet_endpoint_value_binding_map_constructed",
          "source_value_packet_endpoint_value_bound_to_boundary_binding",
        ],
        same_packet_required_fields: [
          "same_packet_endpoint_value_bound_to_boundary_binding_dependency_present",
          "same_packet_witness_object_value_map_dependency_present",
        ],
        resolution:
          "Count the value-map packet as source evidence only; do not count it as same-packet value-map carrier-field dependency closure.",
      },
    ],
    proof_burdens: PROOF_BURDENS,
    proof_routes: PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempts:
      endpointAudits,
    row_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempts:
      rowAudits,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAudits.length,
      residual_consumer_rows: rowAudits.length,
      existence_packet_inputs_present:
        endpointFieldCounts.existence_packet_input_present,
      source_ref_packet_endpoint_boundary_bindings_constructed:
        endpointFieldCounts
          .source_ref_packet_endpoint_boundary_binding_constructed,
      source_ref_packet_witness_object_ref_fields_present:
        endpointFieldCounts
          .source_ref_packet_witness_object_has_endpoint_boundary_binding_ref,
      source_ref_packet_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts
          .source_ref_packet_full_endpoint_boundary_binding_constructed,
      source_value_packet_value_maps_constructed:
        endpointFieldCounts
          .source_value_packet_endpoint_value_binding_map_constructed,
      source_value_packet_witness_object_value_maps_present:
        endpointFieldCounts
          .source_value_packet_witness_object_has_endpoint_value_binding_map,
      source_value_packet_endpoint_values_bound_to_boundary_bindings:
        endpointFieldCounts
          .source_value_packet_endpoint_value_bound_to_boundary_binding,
      source_carrier_field_source_candidates_declared:
        endpointFieldCounts.source_carrier_field_source_candidates_declared,
      same_packet_full_endpoint_boundary_binding_dependencies_present:
        endpointFieldCounts
          .same_packet_full_endpoint_boundary_binding_dependency_present,
      same_packet_endpoint_boundary_binding_dependencies_present:
        endpointFieldCounts
          .same_packet_endpoint_boundary_binding_dependency_present,
      same_packet_witness_object_ref_dependencies_present:
        endpointFieldCounts.same_packet_witness_object_ref_dependency_present,
      same_packet_endpoint_value_bound_dependencies_present:
        endpointFieldCounts
          .same_packet_endpoint_value_bound_to_boundary_binding_dependency_present,
      same_packet_witness_object_value_map_dependencies_present:
        endpointFieldCounts
          .same_packet_witness_object_value_map_dependency_present,
      same_packet_ref_dependency_closures_present:
        endpointFieldCounts
          .same_packet_ref_carrier_field_dependencies_closed,
      same_packet_value_map_dependency_closures_present:
        endpointFieldCounts
          .same_packet_value_map_carrier_field_dependencies_closed,
      same_packet_ref_carrier_fields_constructed:
        endpointFieldCounts.same_packet_ref_carrier_field_constructed,
      same_packet_value_map_carrier_fields_constructed:
        endpointFieldCounts.same_packet_value_map_carrier_field_constructed,
      source_level_ref_binding_non_promotion_guards_present:
        endpointFieldCounts.source_level_ref_binding_not_promoted,
      source_level_value_binding_non_promotion_guards_present:
        endpointFieldCounts.source_level_value_binding_not_promoted,
      dependency_closure_lemmas_present:
        endpointFieldCounts.dependency_closure_lemma_present,
      endpoint_dependency_application_proofs_present:
        endpointFieldCounts.endpoint_dependency_application_proof_present,
      row_source_binding_evidence_pairs_ready:
        rowFieldCounts.combined_source_binding_evidence_present,
      row_ref_dependency_closure_pairs_present:
        rowFieldCounts.combined_same_packet_ref_dependency_closure_present,
      row_value_map_dependency_closure_pairs_present:
        rowFieldCounts
          .combined_same_packet_value_map_dependency_closure_present,
      row_ref_carrier_field_pairs_constructed:
        rowFieldCounts.combined_same_packet_ref_carrier_field_constructed,
      row_value_map_carrier_field_pairs_constructed:
        rowFieldCounts
          .combined_same_packet_value_map_carrier_field_constructed,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint has same-packet ref/value dependency closure, constructed ref/value carrier fields, or a dependency-closure lemma.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed same-packet ref/value carrier-field dependency-closure lemma proof attempt and does not promote to reader-facing corpus prose.",
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

function hazardTable(hazards) {
  return hazards
    .map(
      (hazard) =>
        `| ${hazard.hazard_id} | ${hazard.source_positive_fields.join(", ")} | ${hazard.same_packet_required_fields.join(", ")} | ${hazard.resolution} |`
    )
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map((endpoint) => {
      const fields = endpoint.required_fields_present;
      return `| ${endpoint.id} | ${endpoint.role} | ${endpoint.source_binding_evidence_present} | ${fields.source_ref_packet_endpoint_boundary_binding_constructed} | ${fields.source_value_packet_endpoint_value_binding_map_constructed} | ${fields.source_value_packet_endpoint_value_bound_to_boundary_binding} | ${fields.same_packet_full_endpoint_boundary_binding_dependency_present} | ${fields.same_packet_endpoint_boundary_binding_dependency_present} | ${fields.same_packet_witness_object_ref_dependency_present} | ${fields.same_packet_endpoint_value_bound_to_boundary_binding_dependency_present} | ${fields.same_packet_witness_object_value_map_dependency_present} | ${fields.same_packet_ref_carrier_field_dependencies_closed} | ${fields.same_packet_value_map_carrier_field_dependencies_closed} | ${fields.same_packet_ref_carrier_field_constructed} | ${fields.same_packet_value_map_carrier_field_constructed} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_source_binding_evidence_present} | ${fields.combined_same_packet_ref_dependency_closure_present} | ${fields.combined_same_packet_value_map_dependency_closure_present} | ${fields.combined_same_packet_ref_carrier_field_constructed} | ${fields.combined_same_packet_value_map_carrier_field_constructed} | ${row.row_consumed} |`;
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
  return `# Ref/Value Carrier-Introduction Same-Packet Ref/Value Carrier-Field Dependency-Closure Lemma Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet attempts the dependency-closure lemma immediately
below the same-packet ref/value carrier-field existence route. It tests whether
source-layer endpoint-boundary-binding refs, witness-object refs, endpoint
value-binding maps, and endpoint values bound to source boundary bindings can
lawfully discharge the same-packet ref/value carrier-field dependency lists.

The proof attempt remains fail-closed. It records ${summary.source_ref_packet_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals}
source ref-packet endpoint boundary bindings, ${summary.source_ref_packet_witness_object_ref_fields_present} / ${summary.endpoint_functionals}
source ref-packet witness-object ref fields, ${summary.source_value_packet_value_maps_constructed} / ${summary.endpoint_functionals}
source value-map packet value maps, ${summary.source_value_packet_witness_object_value_maps_present} / ${summary.endpoint_functionals}
source value-map packet witness-object value-map fields, and ${summary.source_value_packet_endpoint_values_bound_to_boundary_bindings} / ${summary.endpoint_functionals}
source value bindings. It records ${summary.same_packet_full_endpoint_boundary_binding_dependencies_present} / ${summary.endpoint_functionals}
same-packet full endpoint boundary-binding dependencies, ${summary.same_packet_endpoint_boundary_binding_dependencies_present} / ${summary.endpoint_functionals}
same-packet endpoint boundary-binding dependencies, ${summary.same_packet_witness_object_ref_dependencies_present} / ${summary.endpoint_functionals}
same-packet witness-object ref dependencies, ${summary.same_packet_endpoint_value_bound_dependencies_present} / ${summary.endpoint_functionals}
same-packet endpoint value-bound dependencies, ${summary.same_packet_witness_object_value_map_dependencies_present} / ${summary.endpoint_functionals}
same-packet witness-object value-map dependencies, ${summary.same_packet_ref_dependency_closures_present} / ${summary.endpoint_functionals}
ref dependency closures, ${summary.same_packet_value_map_dependency_closures_present} / ${summary.endpoint_functionals}
value-map dependency closures, ${summary.same_packet_ref_carrier_fields_constructed} / ${summary.endpoint_functionals}
same-packet ref carrier fields, and ${summary.same_packet_value_map_carrier_fields_constructed} / ${summary.endpoint_functionals}
same-packet value-map carrier fields. It consumes ${summary.row_consumption_count}
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Proof Attempt Target

${packet.proof_attempt_target.statement}

Accepted as blocker discharge if: ${packet.proof_attempt_target.accepted_as_blocker_discharge_if}

First exact blockers: ${packet.proof_attempt_target.first_exact_blocker}

## Downstream Policy

${packet.downstream_policy}

## No-Promotion Rule

${packet.no_promotion_rule}

## Source Import Hazards

| Hazard | Source-positive fields | Same-packet required fields | Resolution |
| --- | --- | --- | --- |
${hazardTable(packet.source_import_hazards)}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.proof_routes)}

## Endpoint Audits

| Endpoint | Role | Source binding evidence | Source ref binding | Source value map | Source value bound | Same-packet full binding dep | Same-packet endpoint binding dep | Same-packet ref dep | Same-packet value-bound dep | Same-packet value-map dep | Ref deps closed | Value deps closed | Ref field | Value field | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempts)}

## Row Audits

| Row | Source binding evidence pair | Ref dependency pair | Value-map dependency pair | Ref field pair | Value field pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempts)}

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
    existence: readJson(args.existencePacket),
    existencePath: args.existencePacket,
    refPacket: readJson(args.refPacket),
    refPacketPath: args.refPacket,
    valueMapPacket: readJson(args.valueMapPacket),
    valueMapPacketPath: args.valueMapPacket,
    carrierFieldConstruction: readJson(args.carrierFieldConstructionPacket),
    carrierFieldConstructionPath: args.carrierFieldConstructionPacket,
    nonDomainCarrierObstruction: readJson(
      args.nonDomainCarrierObstructionPacket
    ),
    nonDomainCarrierObstructionPath: args.nonDomainCarrierObstructionPacket,
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

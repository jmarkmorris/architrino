#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_DEPENDENCY_CLOSURE_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FULL_BINDING_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
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
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_constructive_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_constructive_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const DEPENDENCY_CLOSURE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-same-packet-ref-value-carrier-field-dependency-closure-lemma-proof-attempt-fail-closed-source-ref-value-handles-present-dependency-closures-absent-no-row-consumption";
const FULL_BINDING_STATUS =
  "priority-only-full-endpoint-boundary-binding-construction-attempt-fail-closed-contract-targets-present-full-binding-motion-evaluation-replay-blocked-no-row-consumption";
const REF_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";
const CARRIER_FIELD_CONSTRUCTION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-construction-attempt-fail-closed-carrier-field-source-candidates-present-carrier-fields-absent-no-row-consumption";
const NON_DOMAIN_CARRIER_OBSTRUCTION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption";
const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-constructive-same-packet-full-endpoint-boundary-binding-dependency-lemma-proof-attempt-fail-closed-full-binding-inputs-present-same-packet-full-binding-dependency-absent-no-row-consumption";

const ENDPOINT_FIELDS = [
  "dependency_closure_packet_input_present",
  "full_binding_construction_input_ready",
  "full_binding_packet_full_endpoint_boundary_binding_constructed",
  "full_binding_packet_endpoint_boundary_binding_constructed",
  "full_binding_packet_endpoint_value_bound_to_boundary_binding",
  "full_binding_packet_binding_contract_satisfied",
  "source_ref_packet_endpoint_boundary_binding_constructed",
  "source_ref_packet_witness_object_has_endpoint_boundary_binding_ref",
  "source_value_packet_endpoint_value_binding_map_constructed",
  "source_value_packet_endpoint_value_bound_to_boundary_binding",
  "carrier_field_layer_full_endpoint_boundary_binding_constructed",
  "carrier_field_layer_endpoint_boundary_binding_constructed",
  "carrier_field_layer_endpoint_value_bound_to_boundary_binding",
  "obstruction_layer_full_endpoint_boundary_binding_constructed",
  "obstruction_layer_endpoint_boundary_binding_constructed",
  "obstruction_layer_endpoint_value_bound_to_boundary_binding",
  "same_packet_full_endpoint_boundary_binding_dependency_present",
  "same_packet_endpoint_boundary_binding_dependency_present",
  "same_packet_endpoint_value_bound_to_boundary_binding_dependency_present",
  "same_packet_witness_object_ref_dependency_present",
  "same_packet_witness_object_value_map_dependency_present",
  "same_packet_ref_carrier_field_dependencies_closed",
  "same_packet_value_map_carrier_field_dependencies_closed",
  "full_binding_dependency_lemma_present",
  "endpoint_binding_dependency_lemma_present",
  "source_full_binding_input_not_promoted",
  "source_endpoint_binding_not_promoted",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_full_binding_input_ready",
  "receiver_full_binding_input_ready",
  "combined_full_binding_input_ready",
  "source_same_packet_full_binding_dependency_present",
  "receiver_same_packet_full_binding_dependency_present",
  "combined_same_packet_full_binding_dependency_present",
  "source_same_packet_endpoint_binding_dependency_present",
  "receiver_same_packet_endpoint_binding_dependency_present",
  "combined_same_packet_endpoint_binding_dependency_present",
  "source_same_packet_value_bound_dependency_present",
  "receiver_same_packet_value_bound_dependency_present",
  "combined_same_packet_value_bound_dependency_present",
  "source_ref_dependency_closure_present",
  "receiver_ref_dependency_closure_present",
  "combined_ref_dependency_closure_present",
  "source_value_map_dependency_closure_present",
  "receiver_value_map_dependency_closure_present",
  "combined_value_map_dependency_closure_present",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const PROOF_BURDENS = [
  {
    burden_id: "FB_full_endpoint_boundary_binding_dependency",
    missing_field: "same_packet_full_endpoint_boundary_binding_dependency_present",
    required_evidence:
      "A proof-grade full endpoint boundary binding exposed in the same-packet carrier-field dependency layer.",
  },
  {
    burden_id: "FB_endpoint_boundary_binding_dependency",
    missing_field: "same_packet_endpoint_boundary_binding_dependency_present",
    required_evidence:
      "A proof-grade endpoint boundary binding exposed in the same-packet carrier-field dependency layer.",
  },
  {
    burden_id: "FB_endpoint_value_bound_dependency",
    missing_field:
      "same_packet_endpoint_value_bound_to_boundary_binding_dependency_present",
    required_evidence:
      "A proof-grade endpoint value bound to a constructed endpoint boundary binding in the same-packet layer.",
  },
  {
    burden_id: "FB_ref_dependency_closure",
    missing_field: "same_packet_ref_carrier_field_dependencies_closed",
    required_evidence:
      "Ref carrier-field dependency closure after the full and endpoint boundary-binding dependencies are present.",
  },
  {
    burden_id: "FB_value_map_dependency_closure",
    missing_field: "same_packet_value_map_carrier_field_dependencies_closed",
    required_evidence:
      "Value-map carrier-field dependency closure after the endpoint binding and value-bound dependencies are present.",
  },
  {
    burden_id: "FB_dependency_lemma",
    missing_field: "full_binding_dependency_lemma_present",
    required_evidence:
      "A lemma proving that the full endpoint boundary-binding construction layer supplies same-packet dependency fields.",
  },
];

const PROOF_ROUTES = [
  {
    route_id: "contract_target_input_as_full_binding_dependency",
    status: "rejected-input-only",
    required_fields: [
      "full_binding_construction_input_ready",
      "same_packet_full_endpoint_boundary_binding_dependency_present",
    ],
    limitation:
      "Input-ready full binding contract targets are not proof-grade full endpoint boundary-binding dependencies.",
  },
  {
    route_id: "source_ref_and_value_bindings_as_endpoint_binding_dependency",
    status: "rejected-source-layer",
    required_fields: [
      "source_ref_packet_endpoint_boundary_binding_constructed",
      "source_value_packet_endpoint_value_bound_to_boundary_binding",
      "same_packet_endpoint_boundary_binding_dependency_present",
      "same_packet_endpoint_value_bound_to_boundary_binding_dependency_present",
    ],
    limitation:
      "Source-layer endpoint refs and value bindings are not same-packet endpoint boundary-binding dependencies.",
  },
  {
    route_id: "full_binding_packet_as_same_packet_dependency",
    status: "blocked",
    required_fields: [
      "full_binding_packet_full_endpoint_boundary_binding_constructed",
      "full_binding_packet_endpoint_boundary_binding_constructed",
      "full_binding_packet_endpoint_value_bound_to_boundary_binding",
      "same_packet_full_endpoint_boundary_binding_dependency_present",
      "same_packet_endpoint_boundary_binding_dependency_present",
    ],
    limitation:
      "The full-binding construction packet has inputs ready but constructs no full binding, endpoint binding, or value-bound field.",
  },
  {
    route_id: "carrier_field_layer_as_dependency_witness",
    status: "blocked",
    required_fields: [
      "carrier_field_layer_full_endpoint_boundary_binding_constructed",
      "carrier_field_layer_endpoint_boundary_binding_constructed",
      "obstruction_layer_full_endpoint_boundary_binding_constructed",
      "obstruction_layer_endpoint_boundary_binding_constructed",
      "same_packet_full_endpoint_boundary_binding_dependency_present",
    ],
    limitation:
      "The carrier-field construction and obstruction layers still record the same proof-grade binding fields as absent.",
  },
  {
    route_id: "dependency_closure_after_full_binding_dependency",
    status: "blocked-downstream",
    required_fields: [
      "same_packet_full_endpoint_boundary_binding_dependency_present",
      "same_packet_endpoint_boundary_binding_dependency_present",
      "same_packet_ref_carrier_field_dependencies_closed",
      "same_packet_value_map_carrier_field_dependencies_closed",
    ],
    limitation:
      "Ref/value dependency closure remains downstream of the proof-grade full and endpoint boundary-binding dependencies.",
  },
];

function parseArgs(argv) {
  const args = {
    dependencyClosurePacket: DEFAULT_DEPENDENCY_CLOSURE_PACKET,
    fullBindingPacket: DEFAULT_FULL_BINDING_PACKET,
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
    } else if (arg === "--dependency-closure-packet") {
      args.dependencyClosurePacket = argv[++index];
    } else if (arg === "--full-binding-packet") {
      args.fullBindingPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-constructive-same-packet-full-endpoint-boundary-binding-dependency-lemma-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --dependency-closure-packet <path>",
    "  --full-binding-packet <path>",
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

function buildEndpointAudit({
  dependencyEndpoint,
  fullBindingEndpoint,
  refEndpoint,
  valueMapEndpoint,
  constructionEndpoint,
  obstructionEndpoint,
}) {
  const dependencyFields = dependencyEndpoint.required_fields_present ?? {};
  const fullFields = fullBindingEndpoint.required_fields_present ?? {};
  const refFields = refEndpoint.required_fields_present ?? {};
  const valueMapFields = valueMapEndpoint.required_fields_present ?? {};
  const constructionFields = constructionEndpoint.required_fields_present ?? {};
  const obstructionFields = obstructionEndpoint.required_fields_present ?? {};

  const samePacketFullBinding =
    fullFields.full_endpoint_boundary_binding_constructed === true &&
    constructionFields.full_endpoint_boundary_binding_constructed === true &&
    obstructionFields.full_endpoint_boundary_binding_constructed === true;
  const samePacketEndpointBinding =
    fullFields.endpoint_boundary_binding_constructed === true &&
    constructionFields.endpoint_boundary_binding_constructed === true &&
    obstructionFields.endpoint_boundary_binding_constructed === true;
  const samePacketValueBound =
    fullFields.endpoint_value_bound_to_boundary_binding === true &&
    constructionFields.endpoint_value_bound_to_boundary_binding === true &&
    obstructionFields.endpoint_value_bound_to_boundary_binding === true;
  const samePacketWitnessObjectRef =
    constructionFields.witness_object_has_endpoint_boundary_binding_ref === true &&
    obstructionFields.witness_object_has_endpoint_boundary_binding_ref === true;
  const samePacketWitnessObjectValueMap =
    constructionFields.witness_object_has_endpoint_value_binding_map === true &&
    obstructionFields.witness_object_has_endpoint_value_binding_map === true;

  const fields = {
    dependency_closure_packet_input_present: true,
    full_binding_construction_input_ready:
      fullFields.full_endpoint_boundary_binding_construction_input_ready === true,
    full_binding_packet_full_endpoint_boundary_binding_constructed:
      fullFields.full_endpoint_boundary_binding_constructed === true,
    full_binding_packet_endpoint_boundary_binding_constructed:
      fullFields.endpoint_boundary_binding_constructed === true,
    full_binding_packet_endpoint_value_bound_to_boundary_binding:
      fullFields.endpoint_value_bound_to_boundary_binding === true,
    full_binding_packet_binding_contract_satisfied:
      fullFields.binding_contract_satisfied === true,
    source_ref_packet_endpoint_boundary_binding_constructed:
      refFields.endpoint_boundary_binding_constructed === true,
    source_ref_packet_witness_object_has_endpoint_boundary_binding_ref:
      refFields.witness_object_has_endpoint_boundary_binding_ref === true,
    source_value_packet_endpoint_value_binding_map_constructed:
      valueMapFields.endpoint_value_binding_map_constructed === true,
    source_value_packet_endpoint_value_bound_to_boundary_binding:
      valueMapFields.endpoint_value_bound_to_boundary_binding === true,
    carrier_field_layer_full_endpoint_boundary_binding_constructed:
      constructionFields.full_endpoint_boundary_binding_constructed === true,
    carrier_field_layer_endpoint_boundary_binding_constructed:
      constructionFields.endpoint_boundary_binding_constructed === true,
    carrier_field_layer_endpoint_value_bound_to_boundary_binding:
      constructionFields.endpoint_value_bound_to_boundary_binding === true,
    obstruction_layer_full_endpoint_boundary_binding_constructed:
      obstructionFields.full_endpoint_boundary_binding_constructed === true,
    obstruction_layer_endpoint_boundary_binding_constructed:
      obstructionFields.endpoint_boundary_binding_constructed === true,
    obstruction_layer_endpoint_value_bound_to_boundary_binding:
      obstructionFields.endpoint_value_bound_to_boundary_binding === true,
    same_packet_full_endpoint_boundary_binding_dependency_present:
      dependencyFields
        .same_packet_full_endpoint_boundary_binding_dependency_present === true ||
      samePacketFullBinding,
    same_packet_endpoint_boundary_binding_dependency_present:
      dependencyFields.same_packet_endpoint_boundary_binding_dependency_present ===
        true || samePacketEndpointBinding,
    same_packet_endpoint_value_bound_to_boundary_binding_dependency_present:
      dependencyFields
        .same_packet_endpoint_value_bound_to_boundary_binding_dependency_present ===
        true || samePacketValueBound,
    same_packet_witness_object_ref_dependency_present:
      dependencyFields.same_packet_witness_object_ref_dependency_present === true ||
      samePacketWitnessObjectRef,
    same_packet_witness_object_value_map_dependency_present:
      dependencyFields.same_packet_witness_object_value_map_dependency_present ===
        true || samePacketWitnessObjectValueMap,
    same_packet_ref_carrier_field_dependencies_closed:
      dependencyFields.same_packet_ref_carrier_field_dependencies_closed === true,
    same_packet_value_map_carrier_field_dependencies_closed:
      dependencyFields.same_packet_value_map_carrier_field_dependencies_closed ===
      true,
    full_binding_dependency_lemma_present: false,
    endpoint_binding_dependency_lemma_present: false,
    source_full_binding_input_not_promoted:
      fullFields.full_endpoint_boundary_binding_construction_input_ready === true &&
      fullFields.full_endpoint_boundary_binding_constructed !== true &&
      !samePacketFullBinding,
    source_endpoint_binding_not_promoted:
      refFields.endpoint_boundary_binding_constructed === true &&
      valueMapFields.endpoint_value_bound_to_boundary_binding === true &&
      !samePacketEndpointBinding &&
      !samePacketValueBound,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  const routeAttempts = PROOF_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: dependencyEndpoint.id,
    endpoint_functional_id: dependencyEndpoint.endpoint_functional_id,
    role: dependencyEndpoint.role,
    same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt_id:
      `same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt:${dependencyEndpoint.id}`,
    source_dependency_closure_lemma_proof_attempt_id:
      dependencyEndpoint
        .same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempt_id,
    source_full_binding_construction_attempt_id:
      fullBindingEndpoint.source_contract_target_id,
    source_ref_carrier_full_binding_construction_attempt_id:
      refEndpoint.ref_carrier_full_binding_construction_attempt_id,
    source_endpoint_value_binding_map_construction_attempt_id:
      valueMapEndpoint.endpoint_value_binding_map_construction_attempt_id,
    full_binding_dependency_evidence: {
      full_binding_construction_input_ready:
        fields.full_binding_construction_input_ready,
      full_binding_packet_full_endpoint_boundary_binding_constructed:
        fields.full_binding_packet_full_endpoint_boundary_binding_constructed,
      full_binding_packet_endpoint_boundary_binding_constructed:
        fields.full_binding_packet_endpoint_boundary_binding_constructed,
      full_binding_packet_endpoint_value_bound_to_boundary_binding:
        fields.full_binding_packet_endpoint_value_bound_to_boundary_binding,
      carrier_field_layer_full_endpoint_boundary_binding_constructed:
        fields.carrier_field_layer_full_endpoint_boundary_binding_constructed,
      obstruction_layer_full_endpoint_boundary_binding_constructed:
        fields.obstruction_layer_full_endpoint_boundary_binding_constructed,
      same_packet_full_endpoint_boundary_binding_dependency_present:
        fields.same_packet_full_endpoint_boundary_binding_dependency_present,
      same_packet_endpoint_boundary_binding_dependency_present:
        fields.same_packet_endpoint_boundary_binding_dependency_present,
    },
    source_binding_evidence: {
      source_ref_packet_endpoint_boundary_binding_constructed:
        fields.source_ref_packet_endpoint_boundary_binding_constructed,
      source_ref_packet_witness_object_has_endpoint_boundary_binding_ref:
        fields.source_ref_packet_witness_object_has_endpoint_boundary_binding_ref,
      source_value_packet_endpoint_value_binding_map_constructed:
        fields.source_value_packet_endpoint_value_binding_map_constructed,
      source_value_packet_endpoint_value_bound_to_boundary_binding:
        fields.source_value_packet_endpoint_value_bound_to_boundary_binding,
      source_endpoint_binding_not_promoted:
        fields.source_endpoint_binding_not_promoted,
    },
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
      "Full endpoint boundary-binding construction inputs are ready, but neither the full-binding packet nor the same-packet carrier-field layers expose proof-grade full endpoint boundary-binding dependencies.",
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
    source_full_binding_input_ready:
      sourceFields.full_binding_construction_input_ready,
    receiver_full_binding_input_ready:
      receiverFields.full_binding_construction_input_ready,
    combined_full_binding_input_ready: false,
    source_same_packet_full_binding_dependency_present:
      sourceFields.same_packet_full_endpoint_boundary_binding_dependency_present,
    receiver_same_packet_full_binding_dependency_present:
      receiverFields.same_packet_full_endpoint_boundary_binding_dependency_present,
    combined_same_packet_full_binding_dependency_present: false,
    source_same_packet_endpoint_binding_dependency_present:
      sourceFields.same_packet_endpoint_boundary_binding_dependency_present,
    receiver_same_packet_endpoint_binding_dependency_present:
      receiverFields.same_packet_endpoint_boundary_binding_dependency_present,
    combined_same_packet_endpoint_binding_dependency_present: false,
    source_same_packet_value_bound_dependency_present:
      sourceFields
        .same_packet_endpoint_value_bound_to_boundary_binding_dependency_present,
    receiver_same_packet_value_bound_dependency_present:
      receiverFields
        .same_packet_endpoint_value_bound_to_boundary_binding_dependency_present,
    combined_same_packet_value_bound_dependency_present: false,
    source_ref_dependency_closure_present:
      sourceFields.same_packet_ref_carrier_field_dependencies_closed,
    receiver_ref_dependency_closure_present:
      receiverFields.same_packet_ref_carrier_field_dependencies_closed,
    combined_ref_dependency_closure_present: false,
    source_value_map_dependency_closure_present:
      sourceFields.same_packet_value_map_carrier_field_dependencies_closed,
    receiver_value_map_dependency_closure_present:
      receiverFields.same_packet_value_map_carrier_field_dependencies_closed,
    combined_value_map_dependency_closure_present: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };

  fields.combined_full_binding_input_ready =
    fields.source_full_binding_input_ready &&
    fields.receiver_full_binding_input_ready;
  fields.combined_same_packet_full_binding_dependency_present =
    fields.source_same_packet_full_binding_dependency_present &&
    fields.receiver_same_packet_full_binding_dependency_present;
  fields.combined_same_packet_endpoint_binding_dependency_present =
    fields.source_same_packet_endpoint_binding_dependency_present &&
    fields.receiver_same_packet_endpoint_binding_dependency_present;
  fields.combined_same_packet_value_bound_dependency_present =
    fields.source_same_packet_value_bound_dependency_present &&
    fields.receiver_same_packet_value_bound_dependency_present;
  fields.combined_ref_dependency_closure_present =
    fields.source_ref_dependency_closure_present &&
    fields.receiver_ref_dependency_closure_present;
  fields.combined_value_map_dependency_closure_present =
    fields.source_value_map_dependency_closure_present &&
    fields.receiver_value_map_dependency_closure_present;

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
    source_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt_id:
      source.same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt_id,
    receiver_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt_id:
      receiver.same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver full-binding construction inputs, but no same-packet full-binding dependency pair, endpoint-binding dependency pair, or ref/value dependency closure pair.",
  };
}

function buildPacket({
  dependencyClosure,
  dependencyClosurePath,
  fullBinding,
  fullBindingPath,
  refPacket,
  refPacketPath,
  valueMapPacket,
  valueMapPacketPath,
  carrierFieldConstruction,
  carrierFieldConstructionPath,
  nonDomainCarrierObstruction,
  nonDomainCarrierObstructionPath,
}) {
  assertPacket(
    dependencyClosure,
    DEPENDENCY_CLOSURE_STATUS,
    "dependency closure packet"
  );
  assertPacket(fullBinding, FULL_BINDING_STATUS, "full binding packet");
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

  const dependencyEndpoints =
    dependencyClosure
      .endpoint_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempts;
  const dependencyRows =
    dependencyClosure
      .row_same_packet_ref_value_carrier_field_dependency_closure_lemma_proof_attempts;
  const fullBindingMap = idMap(
    fullBinding.endpoint_full_boundary_binding_construction_attempts,
    "id",
    "full endpoint boundary-binding construction endpoint"
  );
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

  const endpointAudits = dependencyEndpoints.map((dependencyEndpoint) =>
    buildEndpointAudit({
      dependencyEndpoint,
      fullBindingEndpoint: requireMapped(
        fullBindingMap,
        dependencyEndpoint.id,
        "full endpoint boundary-binding construction endpoint"
      ),
      refEndpoint: requireMapped(
        refMap,
        dependencyEndpoint.id,
        "endpoint-boundary-binding ref endpoint"
      ),
      valueMapEndpoint: requireMapped(
        valueMap,
        dependencyEndpoint.id,
        "endpoint value-map endpoint"
      ),
      constructionEndpoint: requireMapped(
        constructionMap,
        dependencyEndpoint.id,
        "carrier-field construction endpoint"
      ),
      obstructionEndpoint: requireMapped(
        obstructionMap,
        dependencyEndpoint.id,
        "non-domain carrier obstruction endpoint"
      ),
    })
  );
  const endpointMap = idMap(
    endpointAudits,
    "id",
    "same-packet full endpoint boundary-binding dependency endpoint"
  );
  const rowAudits = dependencyRows.map((row) => buildRowAudit(row, endpointMap));
  const endpointFieldCounts = fieldCounts(endpointAudits, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAudits, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-constructive-same-packet-full-endpoint-boundary-binding-dependency-lemma-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; full endpoint boundary-binding construction inputs are present, but same-packet full endpoint boundary-binding dependencies are absent",
    source_artifacts: [
      {
        label: "same_packet_ref_value_carrier_field_dependency_closure_packet",
        ...artifactRecord(dependencyClosurePath),
      },
      {
        label: "full_endpoint_boundary_binding_construction_attempt",
        ...artifactRecord(fullBindingPath),
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
      "ref-value-carrier-introduction-constructive-same-packet-full-endpoint-boundary-binding-dependency-lemma-proof-attempt",
      selected_route:
        "construct_same_packet_full_endpoint_boundary_binding_dependency_from_full_binding_layer",
      out_of_scope_route:
        "carrier_field_construction_or_L_adm_discharge_route",
      statement:
        "Attempt to prove that the full endpoint boundary-binding construction layer supplies the same-packet full endpoint boundary-binding and endpoint boundary-binding dependencies required by the ref/value carrier-field dependency-closure packet.",
      accepted_as_blocker_discharge_if:
        "Every endpoint has proof-grade same-packet full endpoint boundary-binding and endpoint boundary-binding dependency fields exposed in both the full-binding construction layer and the carrier-field dependency layer.",
      first_exact_blocker:
        "same_packet_full_endpoint_boundary_binding_dependency_present and same_packet_endpoint_boundary_binding_dependency_present",
    },
    downstream_policy:
      "Ref/value dependency closure, carrier-field construction, `L_adm`, row consumption, and branch-chart authorization remain downstream of proof-grade same-packet full and endpoint boundary-binding dependencies.",
    no_promotion_rule:
      "Full endpoint boundary-binding construction inputs, source endpoint-boundary-binding refs, and source endpoint value bindings are not promoted to same-packet dependency fields without constructed proof-grade full endpoint boundary bindings and endpoint boundary bindings in the same-packet carrier-field layers.",
    proof_burdens: PROOF_BURDENS,
    proof_routes: PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempts:
      endpointAudits,
    row_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempts:
      rowAudits,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAudits.length,
      residual_consumer_rows: rowAudits.length,
      dependency_closure_packet_inputs_present:
        endpointFieldCounts.dependency_closure_packet_input_present,
      full_binding_construction_inputs_ready:
        endpointFieldCounts.full_binding_construction_input_ready,
      full_binding_packet_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts
          .full_binding_packet_full_endpoint_boundary_binding_constructed,
      full_binding_packet_endpoint_boundary_bindings_constructed:
        endpointFieldCounts
          .full_binding_packet_endpoint_boundary_binding_constructed,
      full_binding_packet_endpoint_values_bound:
        endpointFieldCounts
          .full_binding_packet_endpoint_value_bound_to_boundary_binding,
      source_ref_packet_endpoint_boundary_bindings_constructed:
        endpointFieldCounts
          .source_ref_packet_endpoint_boundary_binding_constructed,
      source_value_packet_endpoint_values_bound:
        endpointFieldCounts
          .source_value_packet_endpoint_value_bound_to_boundary_binding,
      carrier_field_layer_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts
          .carrier_field_layer_full_endpoint_boundary_binding_constructed,
      carrier_field_layer_endpoint_boundary_bindings_constructed:
        endpointFieldCounts
          .carrier_field_layer_endpoint_boundary_binding_constructed,
      obstruction_layer_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts
          .obstruction_layer_full_endpoint_boundary_binding_constructed,
      same_packet_full_endpoint_boundary_binding_dependencies_present:
        endpointFieldCounts
          .same_packet_full_endpoint_boundary_binding_dependency_present,
      same_packet_endpoint_boundary_binding_dependencies_present:
        endpointFieldCounts.same_packet_endpoint_boundary_binding_dependency_present,
      same_packet_endpoint_value_bound_dependencies_present:
        endpointFieldCounts
          .same_packet_endpoint_value_bound_to_boundary_binding_dependency_present,
      same_packet_ref_dependency_closures_present:
        endpointFieldCounts
          .same_packet_ref_carrier_field_dependencies_closed,
      same_packet_value_map_dependency_closures_present:
        endpointFieldCounts
          .same_packet_value_map_carrier_field_dependencies_closed,
      full_binding_dependency_lemmas_present:
        endpointFieldCounts.full_binding_dependency_lemma_present,
      endpoint_binding_dependency_lemmas_present:
        endpointFieldCounts.endpoint_binding_dependency_lemma_present,
      source_full_binding_input_non_promotion_guards_present:
        endpointFieldCounts.source_full_binding_input_not_promoted,
      source_endpoint_binding_non_promotion_guards_present:
        endpointFieldCounts.source_endpoint_binding_not_promoted,
      row_full_binding_input_pairs_ready:
        rowFieldCounts.combined_full_binding_input_ready,
      row_full_binding_dependency_pairs_present:
        rowFieldCounts.combined_same_packet_full_binding_dependency_present,
      row_endpoint_binding_dependency_pairs_present:
        rowFieldCounts.combined_same_packet_endpoint_binding_dependency_present,
      row_value_bound_dependency_pairs_present:
        rowFieldCounts.combined_same_packet_value_bound_dependency_present,
      row_ref_dependency_closure_pairs_present:
        rowFieldCounts.combined_ref_dependency_closure_present,
      row_value_map_dependency_closure_pairs_present:
        rowFieldCounts.combined_value_map_dependency_closure_present,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint has proof-grade same-packet full endpoint boundary-binding dependency, endpoint boundary-binding dependency, or ref/value dependency closure.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed same-packet full endpoint boundary-binding dependency lemma proof attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.full_binding_construction_input_ready} | ${fields.full_binding_packet_full_endpoint_boundary_binding_constructed} | ${fields.full_binding_packet_endpoint_boundary_binding_constructed} | ${fields.source_ref_packet_endpoint_boundary_binding_constructed} | ${fields.source_value_packet_endpoint_value_bound_to_boundary_binding} | ${fields.same_packet_full_endpoint_boundary_binding_dependency_present} | ${fields.same_packet_endpoint_boundary_binding_dependency_present} | ${fields.same_packet_endpoint_value_bound_to_boundary_binding_dependency_present} | ${fields.same_packet_ref_carrier_field_dependencies_closed} | ${fields.same_packet_value_map_carrier_field_dependencies_closed} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_full_binding_input_ready} | ${fields.combined_same_packet_full_binding_dependency_present} | ${fields.combined_same_packet_endpoint_binding_dependency_present} | ${fields.combined_same_packet_value_bound_dependency_present} | ${fields.combined_ref_dependency_closure_present} | ${fields.combined_value_map_dependency_closure_present} | ${row.row_consumed} |`;
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
  return `# Ref/Value Carrier-Introduction Constructive Same-Packet Full Endpoint Boundary-Binding Dependency Lemma Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet attempts the full endpoint boundary-binding
dependency lemma immediately below the ref/value carrier-field dependency
closure packet. It tests whether the full endpoint boundary-binding
construction layer can supply the proof-grade same-packet full endpoint
boundary-binding and endpoint boundary-binding dependencies required before
the ref/value carrier fields can close.

The proof attempt remains fail-closed. It records ${summary.full_binding_construction_inputs_ready} / ${summary.endpoint_functionals}
full-binding construction inputs, ${summary.source_ref_packet_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals}
source ref-packet endpoint boundary bindings, and ${summary.source_value_packet_endpoint_values_bound} / ${summary.endpoint_functionals}
source value-bound records. It records ${summary.full_binding_packet_full_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals}
full endpoint boundary bindings in the full-binding packet, ${summary.full_binding_packet_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals}
endpoint boundary bindings in the full-binding packet, ${summary.same_packet_full_endpoint_boundary_binding_dependencies_present} / ${summary.endpoint_functionals}
same-packet full endpoint boundary-binding dependencies, ${summary.same_packet_endpoint_boundary_binding_dependencies_present} / ${summary.endpoint_functionals}
same-packet endpoint boundary-binding dependencies, ${summary.same_packet_endpoint_value_bound_dependencies_present} / ${summary.endpoint_functionals}
same-packet endpoint value-bound dependencies, ${summary.same_packet_ref_dependency_closures_present} / ${summary.endpoint_functionals}
ref dependency closures, and ${summary.same_packet_value_map_dependency_closures_present} / ${summary.endpoint_functionals}
value-map dependency closures. It consumes ${summary.row_consumption_count}
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

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.proof_routes)}

## Endpoint Audits

| Endpoint | Role | Full-binding input | Full binding | Endpoint binding | Source ref binding | Source value bound | Same-packet full dep | Same-packet endpoint dep | Same-packet value-bound dep | Ref deps closed | Value deps closed | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempts)}

## Row Audits

| Row | Full-binding input pair | Full-binding dep pair | Endpoint-binding dep pair | Value-bound dep pair | Ref deps pair | Value deps pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempts)}

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
    dependencyClosure: readJson(args.dependencyClosurePacket),
    dependencyClosurePath: args.dependencyClosurePacket,
    fullBinding: readJson(args.fullBindingPacket),
    fullBindingPath: args.fullBindingPacket,
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

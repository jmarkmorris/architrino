#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_CARRIER_PAIR_THEOREM_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_pair_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_RULE_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ROUTE_DECISION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_IDENTITY_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NON_DOMAIN_CARRIER_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REF_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PRIMITIVE_RULE_WITNESS_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_CARRIER_ADMISSION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_rule_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_rule_theorem_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const CARRIER_PAIR_THEOREM_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-pair-theorem-attempt-fail-closed-source-pairs-and-rule-targets-present-carrier-introduction-rules-derivations-soundness-application-proofs-and-same-packet-carrier-pair-absent-no-row-consumption";
const CARRIER_RULE_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-rule-target-fail-closed-ref-value-sources-and-carrier-candidates-present-carrier-introduction-rules-absent-no-row-consumption";
const ROUTE_DECISION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision-fail-closed-direct-source-promotion-rejected-carrier-admission-route-selected-no-row-consumption";
const IDENTITY_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt-fail-closed-domain-chart-ref-value-sources-present-non-domain-carriers-and-identity-proof-absent-no-row-consumption";
const NON_DOMAIN_CARRIER_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption";
const REF_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";
const PRIMITIVE_RULE_WITNESS_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-rule-witness-record-construction-attempt-partial-pass-first-primitives-constructed-ref-carriers-full-binding-row-closure-locked-no-row-consumption";
const BINDING_CARRIER_ADMISSION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-fail-closed-value-maps-inherited-contract-full-binding-carrier-admission-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-rule-theorem-attempt-fail-closed-source-pairs-and-rule-targets-present-rule-derivations-soundness-application-evidence-and-joint-carrier-pair-rule-absent-no-row-consumption";

const SOURCE_PREMISE_FIELDS = [
  "domain_chart_carrier_subfield_constructed",
  "ref_value_source_pair_ready",
  "source_endpoint_boundary_binding_ref_constructed",
  "source_witness_object_has_endpoint_boundary_binding_ref",
  "source_endpoint_value_binding_map_constructed",
  "source_witness_object_has_endpoint_value_binding_map",
  "endpoint_boundary_binding_ref_carrier_source_candidate_declared",
  "endpoint_value_binding_map_carrier_source_candidate_declared",
  "non_domain_carrier_obstruction_present",
  "direct_source_promotion_rejected",
];

const RULE_THEOREM_TARGET_FIELDS = [
  "carrier_rule_target_declared",
  "carrier_introduction_premises_named",
  "carrier_introduction_conclusion_named",
  "ref_carrier_rule_theorem_target_declared",
  "value_map_carrier_rule_theorem_target_declared",
  "ref_value_pair_rule_theorem_target_declared",
];

const RULE_THEOREM_PROOF_FIELDS = [
  "ref_carrier_rule_derivation_present",
  "value_map_carrier_rule_derivation_present",
  "ref_value_pair_rule_derivation_present",
  "carrier_rule_soundness_proof_present",
  "carrier_rule_application_proof_present",
];

const RULE_AVAILABILITY_FIELDS = [
  "ref_carrier_introduction_rule_available",
  "value_map_carrier_introduction_rule_available",
  "ref_value_carrier_pair_rule_available",
  "ref_carrier_rule_theorem_present",
  "value_map_carrier_rule_theorem_present",
  "ref_value_pair_rule_theorem_present",
  "carrier_introduction_rule_theorem_bundle_present",
];

const DOWNSTREAM_FIELDS = [
  "same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed",
  "same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed",
  "ref_value_carrier_fields_same_witness_object_proven",
  "ref_value_non_domain_carrier_pair_constructed",
  "all_carrier_fields_constructed",
  "constructed_witness_object_id_present",
  "same_constructed_witness_object_identity_proof_present",
  "witness_object_membership_proof_present",
  "carrier_pair_theorem_present",
  "independent_constructed_witness_object_membership_theorem_present",
  "cycle_breaker_available",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_PREMISE_FIELDS,
  "source_premise_set_ready",
  "carrier_admission_route_selected",
  "binding_contract_satisfied",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
  ...RULE_THEOREM_TARGET_FIELDS,
  "proof_grade_rule_theorem_target_declared",
  ...RULE_THEOREM_PROOF_FIELDS,
  ...RULE_AVAILABILITY_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_source_premise_set_ready",
  "receiver_source_premise_set_ready",
  "combined_source_premise_set_ready",
  "source_rule_theorem_target_ready",
  "receiver_rule_theorem_target_ready",
  "combined_rule_theorem_target_ready",
  "source_direct_source_promotion_rejected",
  "receiver_direct_source_promotion_rejected",
  "combined_direct_source_promotion_rejected",
  "source_rule_derivation_present",
  "receiver_rule_derivation_present",
  "combined_rule_derivation_present",
  "source_rule_soundness_proof_present",
  "receiver_rule_soundness_proof_present",
  "combined_rule_soundness_proof_present",
  "source_rule_application_proof_present",
  "receiver_rule_application_proof_present",
  "combined_rule_application_proof_present",
  "source_carrier_rules_available",
  "receiver_carrier_rules_available",
  "combined_carrier_rules_available",
  "source_ref_value_carrier_pair_constructed",
  "receiver_ref_value_carrier_pair_constructed",
  "combined_ref_value_carrier_pair_constructed",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const RULE_THEOREM_ROUTES = [
  {
    route_id: "rule_target_as_rule_theorem_route",
    status: "rejected-unsound-with-current-evidence",
    required_fields: [
      "proof_grade_rule_theorem_target_declared",
      ...RULE_THEOREM_PROOF_FIELDS,
      ...RULE_AVAILABILITY_FIELDS,
    ],
    limitation:
      "A declared carrier-introduction rule target names the theorem obligation but does not derive, prove sound, or apply the rule.",
  },
  {
    route_id: "source_premise_to_rule_derivation_route",
    status: "blocked",
    required_fields: [
      "source_premise_set_ready",
      "ref_carrier_rule_derivation_present",
      "value_map_carrier_rule_derivation_present",
      "ref_value_pair_rule_derivation_present",
    ],
    limitation:
      "The source premises are present, but no derivation turns those premises into the ref, value-map, or joint ref/value carrier-introduction rules.",
  },
  {
    route_id: "selected_carrier_admission_route",
    status: "selected-but-blocked-not-rule-theorem",
    required_fields: [
      "carrier_admission_route_selected",
      "binding_contract_satisfied",
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      "endpoint_value_binding_map_carrier_unblocked",
    ],
    limitation:
      "The selected carrier-admission route is recorded, but its own binding-contract, full-binding, and carrier-admission fields are absent and cannot substitute for an independent carrier-introduction rule theorem.",
  },
  {
    route_id: "carrier_rule_soundness_route",
    status: "blocked",
    required_fields: [
      "ref_carrier_rule_derivation_present",
      "value_map_carrier_rule_derivation_present",
      "ref_value_pair_rule_derivation_present",
      "carrier_rule_soundness_proof_present",
    ],
    limitation:
      "No soundness proof shows that the derived rules preserve same-packet non-domain carrier membership rather than source-handle adjacency.",
  },
  {
    route_id: "endpoint_application_route",
    status: "blocked",
    required_fields: [
      "carrier_rule_soundness_proof_present",
      "carrier_rule_application_proof_present",
    ],
    limitation:
      "No endpoint-level application proof verifies every premise of the carrier-introduction rule for the four endpoint functionals.",
  },
  {
    route_id: "rule_availability_route",
    status: "blocked",
    required_fields: [
      ...RULE_THEOREM_PROOF_FIELDS,
      "ref_carrier_introduction_rule_available",
      "value_map_carrier_introduction_rule_available",
      "ref_value_carrier_pair_rule_available",
    ],
    limitation:
      "The rule availability fields remain false because derivation, soundness, and endpoint application evidence are absent.",
  },
  {
    route_id: "downstream_carrier_pair_route",
    status: "blocked-downstream",
    required_fields: [
      "carrier_introduction_rule_theorem_bundle_present",
      "same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed",
      "same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed",
      "ref_value_carrier_fields_same_witness_object_proven",
      "ref_value_non_domain_carrier_pair_constructed",
    ],
    limitation:
      "Carrier fields, same-witness-object carrier proof, and the ref/value non-domain carrier pair are downstream of the rule theorem bundle.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "ref_carrier_rule_derivation",
    missing_field: "ref_carrier_rule_derivation_present",
    required_evidence:
      "A derivation of the endpoint-boundary-binding ref carrier-introduction rule from the endpoint-boundary-binding construction contract.",
  },
  {
    burden_id: "value_map_carrier_rule_derivation",
    missing_field: "value_map_carrier_rule_derivation_present",
    required_evidence:
      "A derivation of the endpoint value-binding map carrier-introduction rule from the endpoint value-binding map contract.",
  },
  {
    burden_id: "ref_value_pair_rule_derivation",
    missing_field: "ref_value_pair_rule_derivation_present",
    required_evidence:
      "A derivation of the joint ref/value carrier-pair rule that places both introduced carrier fields in one same-packet witness object.",
  },
  {
    burden_id: "carrier_rule_soundness",
    missing_field: "carrier_rule_soundness_proof_present",
    required_evidence:
      "A soundness proof that the carrier-introduction rules preserve non-domain carrier membership and do not promote source handles by adjacency.",
  },
  {
    burden_id: "carrier_rule_application",
    missing_field: "carrier_rule_application_proof_present",
    required_evidence:
      "Endpoint-by-endpoint application proof verifying every premise of the carrier-introduction rules.",
  },
  {
    burden_id: "endpoint_boundary_binding_ref_carrier_introduction_rule",
    missing_field: "ref_carrier_introduction_rule_available",
    required_evidence:
      "A proof-grade ref carrier-introduction rule available after derivation, soundness, and endpoint application are established.",
  },
  {
    burden_id: "endpoint_value_binding_map_carrier_introduction_rule",
    missing_field: "value_map_carrier_introduction_rule_available",
    required_evidence:
      "A proof-grade value-map carrier-introduction rule available after derivation, soundness, and endpoint application are established.",
  },
  {
    burden_id: "ref_value_carrier_pair_rule",
    missing_field: "ref_value_carrier_pair_rule_available",
    required_evidence:
      "A proof-grade joint rule proving the introduced ref carrier and value-map carrier occupy one same-packet witness object.",
  },
  {
    burden_id: "same_packet_ref_carrier_field",
    missing_field:
      "same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed",
    required_evidence:
      "A constructed non-domain carrier field for the endpoint-boundary-binding ref in the same witness object.",
  },
  {
    burden_id: "same_packet_value_map_carrier_field",
    missing_field:
      "same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed",
    required_evidence:
      "A constructed non-domain carrier field for the endpoint value-binding map in the same witness object.",
  },
  {
    burden_id: "ref_value_non_domain_carrier_pair",
    missing_field: "ref_value_non_domain_carrier_pair_constructed",
    required_evidence:
      "A constructed ref/value non-domain carrier pair with both fields proved to belong to one same-packet witness object.",
  },
];

function parseArgs(argv) {
  const args = {
    carrierPairTheoremPacket: DEFAULT_CARRIER_PAIR_THEOREM_PACKET,
    carrierRuleTargetPacket: DEFAULT_CARRIER_RULE_TARGET_PACKET,
    routeDecisionPacket: DEFAULT_ROUTE_DECISION_PACKET,
    identityPacket: DEFAULT_IDENTITY_PACKET,
    nonDomainCarrierPacket: DEFAULT_NON_DOMAIN_CARRIER_PACKET,
    refPacket: DEFAULT_REF_PACKET,
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    primitiveRuleWitnessPacket: DEFAULT_PRIMITIVE_RULE_WITNESS_PACKET,
    bindingCarrierAdmissionPacket: DEFAULT_BINDING_CARRIER_ADMISSION_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--carrier-pair-theorem-packet") {
      args.carrierPairTheoremPacket = argv[++index];
    } else if (arg === "--carrier-rule-target-packet") {
      args.carrierRuleTargetPacket = argv[++index];
    } else if (arg === "--route-decision-packet") {
      args.routeDecisionPacket = argv[++index];
    } else if (arg === "--identity-packet") {
      args.identityPacket = argv[++index];
    } else if (arg === "--non-domain-carrier-packet") {
      args.nonDomainCarrierPacket = argv[++index];
    } else if (arg === "--ref-packet") {
      args.refPacket = argv[++index];
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
    } else if (arg === "--primitive-rule-witness-packet") {
      args.primitiveRuleWitnessPacket = argv[++index];
    } else if (arg === "--binding-carrier-admission-packet") {
      args.bindingCarrierAdmissionPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-rule-theorem-attempt.mjs [options]",
    "",
    "Options:",
    "  --carrier-pair-theorem-packet <path>",
    "  --carrier-rule-target-packet <path>",
    "  --route-decision-packet <path>",
    "  --identity-packet <path>",
    "  --non-domain-carrier-packet <path>",
    "  --ref-packet <path>",
    "  --value-map-packet <path>",
    "  --primitive-rule-witness-packet <path>",
    "  --binding-carrier-admission-packet <path>",
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

function assertPacket(packet, expectedStatus, label) {
  if (packet.packet_id !== PACKET_ID) {
    throw new Error(`${label} packet id mismatch: ${packet.packet_id}`);
  }
  if (packet.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `${label} fold-coordinate packet id mismatch: ${packet.fold_coordinate_packet_id}`
    );
  }
  if (packet.status !== expectedStatus) {
    throw new Error(`${label} status mismatch: ${packet.status}`);
  }
  if (
    packet.branch_chart_authorized ||
    packet.preledger_pass ||
    packet.updates_live_ledger ||
    packet.row_closure
  ) {
    throw new Error(`Refusing rule-theorem attempt from authorized ${label}.`);
  }
}

function idMap(items, key, label) {
  if (!Array.isArray(items)) {
    throw new Error(`Missing ${label} items.`);
  }
  const map = new Map();
  for (const item of items) {
    const id = item[key];
    if (!id) {
      throw new Error(`Missing ${label} key ${key}.`);
    }
    if (map.has(id)) {
      throw new Error(`Duplicate ${label} key: ${id}`);
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

function req(item, field) {
  return item?.required_fields_present?.[field] === true;
}

function missing(fields, requiredFields) {
  return requiredFields.filter((field) => fields[field] !== true);
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

function assertSameEndpoint(endpoint, sourceEndpoint, label) {
  for (const field of ["id", "endpoint_functional_id", "role"]) {
    if (endpoint[field] !== sourceEndpoint[field]) {
      throw new Error(`Endpoint mismatch against ${label}: ${endpoint.id} ${field}`);
    }
  }
}

function carrierObstruction(endpoint, carrierField) {
  const obstruction = endpoint.non_domain_carrier_obstructions?.find(
    (entry) => entry.carrier_field === carrierField
  );
  if (!obstruction) {
    throw new Error(
      `Missing non-domain carrier obstruction ${carrierField} for ${endpoint.id}`
    );
  }
  return obstruction;
}

function routeAttempt(route, fields) {
  const missingFields = missing(fields, route.required_fields);
  return {
    ...route,
    missing_fields: missingFields,
    passed:
      route.status === "rejected-unsound-with-current-evidence"
        ? false
        : missingFields.length === 0,
  };
}

function missingBurdens(fields) {
  return PROOF_BURDENS.filter((burden) => fields[burden.missing_field] !== true)
    .map((burden) => ({ ...burden, satisfied: false }));
}

function buildEndpointAttempt({
  carrierPair,
  carrierTarget,
  routeDecision,
  identity,
  nonDomain,
  ref,
  valueMap,
}) {
  assertSameEndpoint(carrierTarget, carrierPair, "carrier-pair theorem");
  assertSameEndpoint(carrierTarget, routeDecision, "route decision");
  assertSameEndpoint(carrierTarget, identity, "same-packet identity");
  assertSameEndpoint(carrierTarget, nonDomain, "non-domain carrier");
  assertSameEndpoint(carrierTarget, ref, "endpoint-boundary-binding ref");
  assertSameEndpoint(carrierTarget, valueMap, "endpoint value-binding map");

  const refCarrier = carrierObstruction(nonDomain, "endpoint_boundary_binding_ref");
  const valueCarrier = carrierObstruction(nonDomain, "endpoint_value_binding_map");
  const carrierFields = carrierTarget.required_fields_present ?? {};
  const pairFields = carrierPair.required_fields_present ?? {};
  const routeFields = routeDecision.required_fields_present ?? {};

  const fields = {
    domain_chart_carrier_subfield_constructed:
      identity.required_fields_present?.domain_chart_carrier_subfield_constructed ===
        true ||
      nonDomain.required_fields_present?.domain_chart_carrier_subfield_constructed === true,
    ref_value_source_pair_ready:
      pairFields.ref_value_source_pair_ready === true ||
      carrierTarget.ref_value_source_pair_ready === true,
    source_endpoint_boundary_binding_ref_constructed:
      carrierFields.source_endpoint_boundary_binding_ref_constructed === true ||
      req(ref, "witness_object_endpoint_boundary_binding_ref_constructed"),
    source_witness_object_has_endpoint_boundary_binding_ref:
      carrierFields.source_witness_object_has_endpoint_boundary_binding_ref === true ||
      req(ref, "witness_object_has_endpoint_boundary_binding_ref"),
    source_endpoint_value_binding_map_constructed:
      carrierFields.source_endpoint_value_binding_map_constructed === true ||
      req(valueMap, "endpoint_value_binding_map_constructed"),
    source_witness_object_has_endpoint_value_binding_map:
      carrierFields.source_witness_object_has_endpoint_value_binding_map === true ||
      req(valueMap, "witness_object_has_endpoint_value_binding_map"),
    endpoint_boundary_binding_ref_carrier_source_candidate_declared:
      carrierFields.endpoint_boundary_binding_ref_carrier_source_candidate_declared === true ||
      refCarrier.carrier_field_source_candidate_declared === true,
    endpoint_value_binding_map_carrier_source_candidate_declared:
      carrierFields.endpoint_value_binding_map_carrier_source_candidate_declared === true ||
      valueCarrier.carrier_field_source_candidate_declared === true,
    non_domain_carrier_obstruction_present:
      carrierFields.non_domain_carrier_obstruction_present === true ||
      nonDomain.required_fields_present?.non_domain_carrier_obstruction_present === true,
    direct_source_promotion_rejected:
      routeFields.direct_source_promotion_rejected === true ||
      pairFields.direct_source_promotion_rejected === true,
    carrier_rule_target_declared:
      carrierFields.ref_carrier_introduction_rule_target_declared === true &&
      carrierFields.value_map_carrier_introduction_rule_target_declared === true &&
      carrierFields.ref_value_carrier_pair_rule_target_declared === true,
    carrier_introduction_premises_named:
      carrierFields.carrier_introduction_premises_named === true,
    carrier_introduction_conclusion_named:
      carrierFields.carrier_introduction_conclusion_named === true,
    carrier_admission_route_selected:
      routeFields.carrier_admission_route_selected === true,
    binding_contract_satisfied:
      routeFields.binding_contract_satisfied === true,
    full_endpoint_boundary_binding_constructed:
      routeFields.full_endpoint_boundary_binding_constructed === true,
    endpoint_boundary_binding_ref_carrier_unblocked:
      routeFields.endpoint_boundary_binding_ref_carrier_unblocked === true,
    endpoint_value_binding_map_carrier_unblocked:
      routeFields.endpoint_value_binding_map_carrier_unblocked === true,
    ref_carrier_rule_theorem_target_declared:
      carrierFields.ref_carrier_introduction_rule_target_declared === true,
    value_map_carrier_rule_theorem_target_declared:
      carrierFields.value_map_carrier_introduction_rule_target_declared === true,
    ref_value_pair_rule_theorem_target_declared:
      carrierFields.ref_value_carrier_pair_rule_target_declared === true,
    ref_carrier_rule_derivation_present:
      carrierFields.ref_carrier_rule_derivation_present === true &&
      pairFields.ref_carrier_rule_derivation_present === true,
    value_map_carrier_rule_derivation_present:
      carrierFields.value_map_carrier_rule_derivation_present === true &&
      pairFields.value_map_carrier_rule_derivation_present === true,
    ref_value_pair_rule_derivation_present: false,
    carrier_rule_soundness_proof_present:
      carrierFields.carrier_rule_soundness_proof_present === true &&
      pairFields.carrier_rule_soundness_proof_present === true,
    carrier_rule_application_proof_present:
      carrierFields.carrier_rule_application_proof_present === true &&
      pairFields.carrier_rule_application_proof_present === true,
    same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed:
      carrierFields
        .same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed ===
        true ||
      pairFields
        .same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed ===
        true,
    same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed:
      carrierFields
        .same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed ===
        true ||
      pairFields
        .same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed ===
        true,
    ref_value_carrier_fields_same_witness_object_proven:
      pairFields.ref_value_carrier_fields_same_witness_object_proven === true,
    ref_value_non_domain_carrier_pair_constructed:
      pairFields.ref_value_non_domain_carrier_pair_constructed === true,
    all_carrier_fields_constructed:
      pairFields.all_carrier_fields_constructed === true,
    constructed_witness_object_id_present:
      pairFields.constructed_witness_object_id_present === true,
    same_constructed_witness_object_identity_proof_present:
      pairFields.same_constructed_witness_object_identity_proof_present === true,
    witness_object_membership_proof_present:
      pairFields.witness_object_membership_proof_present === true,
    carrier_pair_theorem_present:
      pairFields.carrier_pair_theorem_present === true,
    independent_constructed_witness_object_membership_theorem_present:
      pairFields.independent_constructed_witness_object_membership_theorem_present ===
      true,
    cycle_breaker_available: pairFields.cycle_breaker_available === true,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.source_premise_set_ready = SOURCE_PREMISE_FIELDS.every(
    (field) => fields[field] === true
  );
  fields.proof_grade_rule_theorem_target_declared =
    RULE_THEOREM_TARGET_FIELDS.every((field) => fields[field] === true);
  fields.ref_carrier_introduction_rule_available =
    carrierFields.ref_carrier_introduction_rule_available === true &&
    pairFields.ref_carrier_introduction_rule_available === true &&
    fields.ref_carrier_rule_derivation_present &&
    fields.carrier_rule_soundness_proof_present &&
    fields.carrier_rule_application_proof_present;
  fields.value_map_carrier_introduction_rule_available =
    carrierFields.value_map_carrier_introduction_rule_available === true &&
    pairFields.value_map_carrier_introduction_rule_available === true &&
    fields.value_map_carrier_rule_derivation_present &&
    fields.carrier_rule_soundness_proof_present &&
    fields.carrier_rule_application_proof_present;
  fields.ref_value_carrier_pair_rule_available =
    carrierFields.ref_value_carrier_pair_rule_available === true &&
    pairFields.ref_value_carrier_pair_rule_available === true &&
    fields.ref_value_pair_rule_derivation_present &&
    fields.carrier_rule_soundness_proof_present &&
    fields.carrier_rule_application_proof_present;
  fields.ref_carrier_rule_theorem_present =
    fields.ref_carrier_rule_theorem_target_declared &&
    fields.ref_carrier_introduction_rule_available;
  fields.value_map_carrier_rule_theorem_present =
    fields.value_map_carrier_rule_theorem_target_declared &&
    fields.value_map_carrier_introduction_rule_available;
  fields.ref_value_pair_rule_theorem_present =
    fields.ref_value_pair_rule_theorem_target_declared &&
    fields.ref_value_carrier_pair_rule_available;
  fields.carrier_introduction_rule_theorem_bundle_present =
    fields.ref_carrier_rule_theorem_present &&
    fields.value_map_carrier_rule_theorem_present &&
    fields.ref_value_pair_rule_theorem_present;

  const routeAttempts = RULE_THEOREM_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);
  const firstExactBlocker = missingProofBurdens[0]?.missing_field ?? "none";

  return {
    id: carrierTarget.id,
    endpoint_functional_id: carrierTarget.endpoint_functional_id,
    role: carrierTarget.role,
    carrier_introduction_rule_theorem_attempt_id:
      `carrier_introduction_rule_theorem_attempt:${carrierTarget.id}`,
    source_attempt_ids: {
      ref_value_non_domain_carrier_pair_theorem_attempt:
        carrierPair.ref_value_non_domain_carrier_pair_theorem_attempt_id,
      ref_value_non_domain_carrier_rule_target:
        carrierTarget.ref_value_non_domain_carrier_rule_target_id,
      ref_value_carrier_introduction_route_decision:
        routeDecision.route_decision_id,
      same_packet_constructed_witness_object_identity:
        identity.same_packet_constructed_witness_object_identity_attempt_id,
      non_domain_carrier_obstruction: nonDomain.non_domain_carrier_obstruction_id,
      endpoint_boundary_binding_ref:
        ref.ref_carrier_full_binding_construction_attempt_id ||
        carrierTarget.source_ref_carrier_full_binding_construction_attempt_id,
      endpoint_value_binding_map:
        valueMap.endpoint_value_binding_map_construction_attempt_id ||
        carrierTarget.source_value_binding_map_construction_attempt_id,
    },
    theorem_target: {
      theorem_id: `carrier_introduction_rule_theorem:${carrierTarget.id}`,
      statement:
        "Derive, prove sound, and apply the endpoint-boundary-binding ref carrier-introduction rule, endpoint value-binding map carrier-introduction rule, and joint ref/value carrier-pair rule.",
      accepted_if:
        "The ref, value-map, and joint ref/value rule derivations are present, the carrier rule soundness proof is present, and the endpoint application proof verifies the rule premises for this endpoint.",
      no_promotion_guard:
        "Rule targets and source candidates do not make carrier-introduction rules available without derivation, soundness, and application proofs.",
    },
    route_attempts: routeAttempts,
    theorem_routes_passed:
      routeAttempts.filter((route) => route.passed).map((route) => route.route_id),
    required_fields_present: fields,
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blocker: firstExactBlocker,
    rule_theorem_bundle_present:
      fields.carrier_introduction_rule_theorem_bundle_present,
    ref_value_non_domain_carrier_pair_constructed:
      fields.ref_value_non_domain_carrier_pair_constructed,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has source premises and declared carrier-introduction rule targets, but no rule derivations, soundness proof, application proof, available rules, or downstream carrier fields.",
  };
}

function buildRowAttempt(row, endpointMap) {
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
    row_locator_resolved: req(row, "row_locator_resolved"),
    source_source_premise_set_ready: sourceFields.source_premise_set_ready,
    receiver_source_premise_set_ready: receiverFields.source_premise_set_ready,
    combined_source_premise_set_ready: false,
    source_rule_theorem_target_ready:
      sourceFields.proof_grade_rule_theorem_target_declared,
    receiver_rule_theorem_target_ready:
      receiverFields.proof_grade_rule_theorem_target_declared,
    combined_rule_theorem_target_ready: false,
    source_direct_source_promotion_rejected:
      sourceFields.direct_source_promotion_rejected,
    receiver_direct_source_promotion_rejected:
      receiverFields.direct_source_promotion_rejected,
    combined_direct_source_promotion_rejected: false,
    source_rule_derivation_present:
      sourceFields.ref_carrier_rule_derivation_present &&
      sourceFields.value_map_carrier_rule_derivation_present &&
      sourceFields.ref_value_pair_rule_derivation_present,
    receiver_rule_derivation_present:
      receiverFields.ref_carrier_rule_derivation_present &&
      receiverFields.value_map_carrier_rule_derivation_present &&
      receiverFields.ref_value_pair_rule_derivation_present,
    combined_rule_derivation_present: false,
    source_rule_soundness_proof_present:
      sourceFields.carrier_rule_soundness_proof_present,
    receiver_rule_soundness_proof_present:
      receiverFields.carrier_rule_soundness_proof_present,
    combined_rule_soundness_proof_present: false,
    source_rule_application_proof_present:
      sourceFields.carrier_rule_application_proof_present,
    receiver_rule_application_proof_present:
      receiverFields.carrier_rule_application_proof_present,
    combined_rule_application_proof_present: false,
    source_carrier_rules_available:
      sourceFields.carrier_introduction_rule_theorem_bundle_present,
    receiver_carrier_rules_available:
      receiverFields.carrier_introduction_rule_theorem_bundle_present,
    combined_carrier_rules_available: false,
    source_ref_value_carrier_pair_constructed:
      sourceFields.ref_value_non_domain_carrier_pair_constructed,
    receiver_ref_value_carrier_pair_constructed:
      receiverFields.ref_value_non_domain_carrier_pair_constructed,
    combined_ref_value_carrier_pair_constructed: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_source_premise_set_ready =
    fields.source_source_premise_set_ready &&
    fields.receiver_source_premise_set_ready;
  fields.combined_rule_theorem_target_ready =
    fields.source_rule_theorem_target_ready &&
    fields.receiver_rule_theorem_target_ready;
  fields.combined_direct_source_promotion_rejected =
    fields.source_direct_source_promotion_rejected &&
    fields.receiver_direct_source_promotion_rejected;
  fields.combined_rule_derivation_present =
    fields.source_rule_derivation_present &&
    fields.receiver_rule_derivation_present;
  fields.combined_rule_soundness_proof_present =
    fields.source_rule_soundness_proof_present &&
    fields.receiver_rule_soundness_proof_present;
  fields.combined_rule_application_proof_present =
    fields.source_rule_application_proof_present &&
    fields.receiver_rule_application_proof_present;
  fields.combined_carrier_rules_available =
    fields.source_carrier_rules_available &&
    fields.receiver_carrier_rules_available;
  fields.combined_ref_value_carrier_pair_constructed =
    fields.source_ref_value_carrier_pair_constructed &&
    fields.receiver_ref_value_carrier_pair_constructed;

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
    source_carrier_introduction_rule_theorem_attempt_id:
      source.carrier_introduction_rule_theorem_attempt_id,
    receiver_carrier_introduction_rule_theorem_attempt_id:
      receiver.carrier_introduction_rule_theorem_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver source premises and rule-theorem targets, but neither endpoint has rule derivations, soundness proof, application proof, available carrier rules, or constructed ref/value carrier-pair data.",
  };
}

function assertSources(sources) {
  assertPacket(
    sources.carrierPairTheorem,
    CARRIER_PAIR_THEOREM_STATUS,
    "carrier-pair theorem packet"
  );
  assertPacket(
    sources.carrierRuleTarget,
    CARRIER_RULE_TARGET_STATUS,
    "carrier rule target packet"
  );
  assertPacket(sources.routeDecision, ROUTE_DECISION_STATUS, "route decision");
  assertPacket(sources.identity, IDENTITY_STATUS, "identity packet");
  assertPacket(
    sources.nonDomainCarrier,
    NON_DOMAIN_CARRIER_STATUS,
    "non-domain carrier packet"
  );
  assertPacket(sources.ref, REF_STATUS, "ref packet");
  assertPacket(sources.valueMap, VALUE_MAP_STATUS, "value-map packet");
  assertPacket(
    sources.primitiveRuleWitness,
    PRIMITIVE_RULE_WITNESS_STATUS,
    "primitive rule/witness packet"
  );
  assertPacket(
    sources.bindingCarrierAdmission,
    BINDING_CARRIER_ADMISSION_STATUS,
    "binding/carrier-admission packet"
  );
}

function buildPacket(sources, sourcePaths) {
  assertSources(sources);
  const carrierPairById = idMap(
    sources.carrierPairTheorem
      .endpoint_ref_value_non_domain_carrier_pair_theorem_attempts,
    "id",
    "carrier-pair theorem endpoint"
  );
  const routeById = idMap(
    sources.routeDecision.endpoint_ref_value_carrier_introduction_route_decisions,
    "id",
    "route decision endpoint"
  );
  const identityById = idMap(
    sources.identity.endpoint_same_packet_constructed_witness_object_identity_attempts,
    "id",
    "identity endpoint"
  );
  const nonDomainById = idMap(
    sources.nonDomainCarrier
      .endpoint_witness_object_non_domain_carrier_obstruction_packets,
    "id",
    "non-domain carrier endpoint"
  );
  const refById = idMap(
    sources.ref.endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts,
    "id",
    "endpoint-boundary-binding ref endpoint"
  );
  const valueMapById = idMap(
    sources.valueMap.endpoint_value_binding_map_construction_attempts,
    "id",
    "endpoint value-binding map endpoint"
  );

  const endpointAttempts =
    sources.carrierRuleTarget.endpoint_ref_value_non_domain_carrier_rule_targets.map(
      (carrierTarget) =>
        buildEndpointAttempt({
          carrierTarget,
          carrierPair: requireMapped(
            carrierPairById,
            carrierTarget.id,
            `carrier-pair theorem endpoint ${carrierTarget.id}`
          ),
          routeDecision: requireMapped(
            routeById,
            carrierTarget.id,
            `route decision endpoint ${carrierTarget.id}`
          ),
          identity: requireMapped(
            identityById,
            carrierTarget.id,
            `identity endpoint ${carrierTarget.id}`
          ),
          nonDomain: requireMapped(
            nonDomainById,
            carrierTarget.id,
            `non-domain endpoint ${carrierTarget.id}`
          ),
          ref: requireMapped(
            refById,
            carrierTarget.id,
            `ref endpoint ${carrierTarget.id}`
          ),
          valueMap: requireMapped(
            valueMapById,
            carrierTarget.id,
            `value-map endpoint ${carrierTarget.id}`
          ),
        })
    );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "carrier-introduction rule theorem endpoint"
  );
  const rowAttempts =
    sources.carrierRuleTarget.row_ref_value_non_domain_carrier_rule_targets.map(
      (row) => buildRowAttempt(row, endpointMap)
    );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-rule-theorem-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed rule-theorem attempt; source premises and rule targets are present but rule derivations, soundness proof, endpoint application proof, and rule availability are absent",
    source_artifacts: [
      {
        label: "ref_value_non_domain_carrier_pair_theorem_attempt",
        ...artifactRecord(sourcePaths.carrierPairTheorem),
      },
      {
        label: "ref_value_non_domain_carrier_rule_target",
        ...artifactRecord(sourcePaths.carrierRuleTarget),
      },
      {
        label: "ref_value_carrier_introduction_route_decision",
        ...artifactRecord(sourcePaths.routeDecision),
      },
      {
        label: "same_packet_constructed_witness_object_identity_attempt",
        ...artifactRecord(sourcePaths.identity),
      },
      {
        label: "non_domain_carrier_obstruction_packet",
        ...artifactRecord(sourcePaths.nonDomainCarrier),
      },
      {
        label: "endpoint_boundary_binding_ref_carrier_full_binding",
        ...artifactRecord(sourcePaths.ref),
      },
      {
        label: "endpoint_value_binding_map",
        ...artifactRecord(sourcePaths.valueMap),
      },
      {
        label: "endpoint_boundary_binding_primitive_rule_witness_record",
        ...artifactRecord(sourcePaths.primitiveRuleWitness),
      },
      {
        label: "binding_contract_full_binding_carrier_admission_attempt",
        ...artifactRecord(sourcePaths.bindingCarrierAdmission),
      },
    ],
    theorem_target: {
      theorem_id: "ref-value-carrier-introduction-rule-theorem-target",
      statement:
        "For each endpoint functional, derive and prove sound the ref carrier-introduction rule, value-map carrier-introduction rule, and joint ref/value carrier-pair rule, then apply them endpoint-by-endpoint.",
      accepted_as_first_blocker_discharge_if:
        "Every endpoint has ref, value-map, and joint pair rule derivations, one carrier rule soundness proof, one endpoint application proof, and all three corresponding rule-availability fields true.",
      first_exact_blocker:
        "ref_carrier_rule_derivation_present, value_map_carrier_rule_derivation_present, and ref_value_pair_rule_derivation_present",
    },
    no_promotion_rule:
      "Declared carrier-introduction rule targets and source premises do not make carrier rules available without derivation, soundness, and endpoint application proofs.",
    proof_burdens: PROOF_BURDENS,
    theorem_routes: RULE_THEOREM_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_ref_value_carrier_introduction_rule_theorem_attempts:
      endpointAttempts,
    row_ref_value_carrier_introduction_rule_theorem_attempts: rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      source_premise_sets_ready: endpointFieldCounts.source_premise_set_ready,
      carrier_rule_targets_declared:
        endpointFieldCounts.carrier_rule_target_declared,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      carrier_admission_routes_selected:
        endpointFieldCounts.carrier_admission_route_selected,
      binding_contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_binding_map_carriers_unblocked:
        endpointFieldCounts.endpoint_value_binding_map_carrier_unblocked,
      ref_carrier_rule_theorem_targets_declared:
        endpointFieldCounts.ref_carrier_rule_theorem_target_declared,
      value_map_carrier_rule_theorem_targets_declared:
        endpointFieldCounts.value_map_carrier_rule_theorem_target_declared,
      ref_value_pair_rule_theorem_targets_declared:
        endpointFieldCounts.ref_value_pair_rule_theorem_target_declared,
      ref_carrier_rule_derivations_present:
        endpointFieldCounts.ref_carrier_rule_derivation_present,
      value_map_carrier_rule_derivations_present:
        endpointFieldCounts.value_map_carrier_rule_derivation_present,
      ref_value_pair_rule_derivations_present:
        endpointFieldCounts.ref_value_pair_rule_derivation_present,
      carrier_rule_soundness_proofs_present:
        endpointFieldCounts.carrier_rule_soundness_proof_present,
      carrier_rule_application_proofs_present:
        endpointFieldCounts.carrier_rule_application_proof_present,
      ref_carrier_rules_available:
        endpointFieldCounts.ref_carrier_introduction_rule_available,
      value_map_carrier_rules_available:
        endpointFieldCounts.value_map_carrier_introduction_rule_available,
      ref_value_pair_rules_available:
        endpointFieldCounts.ref_value_carrier_pair_rule_available,
      ref_carrier_rule_theorems_present:
        endpointFieldCounts.ref_carrier_rule_theorem_present,
      value_map_carrier_rule_theorems_present:
        endpointFieldCounts.value_map_carrier_rule_theorem_present,
      ref_value_pair_rule_theorems_present:
        endpointFieldCounts.ref_value_pair_rule_theorem_present,
      carrier_introduction_rule_theorem_bundles_present:
        endpointFieldCounts.carrier_introduction_rule_theorem_bundle_present,
      same_packet_ref_carrier_fields_constructed:
        endpointFieldCounts
          .same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed,
      same_packet_value_map_carrier_fields_constructed:
        endpointFieldCounts
          .same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed,
      ref_value_carrier_pair_same_witness_object_proofs:
        endpointFieldCounts.ref_value_carrier_fields_same_witness_object_proven,
      ref_value_non_domain_carrier_pairs_constructed:
        endpointFieldCounts.ref_value_non_domain_carrier_pair_constructed,
      carrier_pair_theorems_present:
        endpointFieldCounts.carrier_pair_theorem_present,
      independent_membership_theorems_present:
        endpointFieldCounts
          .independent_constructed_witness_object_membership_theorem_present,
      cycle_breakers_available: endpointFieldCounts.cycle_breaker_available,
      row_source_premise_sets_ready:
        rowFieldCounts.combined_source_premise_set_ready,
      row_rule_theorem_target_pairs_ready:
        rowFieldCounts.combined_rule_theorem_target_ready,
      row_direct_source_promotion_pairs_rejected:
        rowFieldCounts.combined_direct_source_promotion_rejected,
      row_rule_derivation_pairs_present:
        rowFieldCounts.combined_rule_derivation_present,
      row_rule_soundness_pairs_present:
        rowFieldCounts.combined_rule_soundness_proof_present,
      row_rule_application_pairs_present:
        rowFieldCounts.combined_rule_application_proof_present,
      row_carrier_rule_pairs_available:
        rowFieldCounts.combined_carrier_rules_available,
      row_ref_value_carrier_pair_constructed:
        rowFieldCounts.combined_ref_value_carrier_pair_constructed,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint has carrier rule derivations, soundness proof, application proof, available carrier-introduction rules, or constructed ref/value carrier-pair data.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed carrier-introduction rule theorem attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.source_premise_set_ready} | ${fields.proof_grade_rule_theorem_target_declared} | ${fields.ref_carrier_rule_derivation_present} | ${fields.value_map_carrier_rule_derivation_present} | ${fields.ref_value_pair_rule_derivation_present} | ${fields.carrier_rule_soundness_proof_present} | ${fields.carrier_rule_application_proof_present} | ${fields.carrier_introduction_rule_theorem_bundle_present} | ${fields.ref_value_non_domain_carrier_pair_constructed} | ${endpoint.first_exact_blocker} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_source_premise_set_ready} | ${fields.combined_rule_theorem_target_ready} | ${fields.combined_direct_source_promotion_rejected} | ${fields.combined_rule_derivation_present} | ${fields.combined_rule_soundness_proof_present} | ${fields.combined_rule_application_proof_present} | ${fields.combined_carrier_rules_available} | ${fields.combined_ref_value_carrier_pair_constructed} | ${row.row_consumed} |`;
    })
    .join("\n");
}

function countTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| ${field} | ${count} / ${total} |`)
    .join("\n");
}

function makeReport(packet) {
  const summary = packet.summary;
  return `# Ref/Value Carrier-Introduction Rule Theorem Attempt

## Verdict

Status: ${packet.status}

This priority-only packet lowers the ref/value non-domain carrier-pair theorem
blocker to the carrier-introduction rule-theorem layer. It asks whether the
current source premises and declared rule targets already supply derivations,
soundness, and endpoint application proofs for the ref carrier-introduction
rule, value-map carrier-introduction rule, and joint ref/value carrier-pair
rule.

The attempt remains fail-closed. It records ${summary.source_premise_sets_ready} / ${summary.endpoint_functionals}
source premise sets and ${summary.carrier_rule_targets_declared} / ${summary.endpoint_functionals}
carrier rule targets, with ${summary.direct_source_promotion_routes_rejected} / ${summary.endpoint_functionals}
direct source-promotion routes rejected. It records ${summary.ref_carrier_rule_derivations_present} / ${summary.endpoint_functionals}
ref carrier rule derivations, ${summary.value_map_carrier_rule_derivations_present} / ${summary.endpoint_functionals}
value-map carrier rule derivations, ${summary.ref_value_pair_rule_derivations_present} / ${summary.endpoint_functionals}
joint ref/value pair rule derivations, ${summary.carrier_rule_soundness_proofs_present} / ${summary.endpoint_functionals}
soundness proofs, ${summary.carrier_rule_application_proofs_present} / ${summary.endpoint_functionals}
endpoint application proofs, and ${summary.carrier_introduction_rule_theorem_bundles_present} / ${summary.endpoint_functionals}
complete rule-theorem bundles. It also records ${summary.carrier_admission_routes_selected} / ${summary.endpoint_functionals}
selected carrier-admission routes, but ${summary.binding_contracts_satisfied} / ${summary.endpoint_functionals}
binding contracts, ${summary.full_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals}
full endpoint boundary bindings, and ${summary.endpoint_boundary_binding_ref_carriers_unblocked} / ${summary.endpoint_functionals}
ref-carrier admissions, so that route cannot substitute for rule-theorem
evidence. It consumes ${summary.row_consumption_count} rows and authorizes no
branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Theorem Target

${packet.theorem_target.statement}

Accepted as blocker discharge if: ${packet.theorem_target.accepted_as_first_blocker_discharge_if}

First exact blocker: ${packet.theorem_target.first_exact_blocker}

## No-Promotion Rule

${packet.no_promotion_rule}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.theorem_routes)}

## Endpoint Attempts

| Endpoint | Role | Source premises | Rule target | Ref derivation | Value derivation | Pair derivation | Soundness | Application | Rule bundle | Carrier pair | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_ref_value_carrier_introduction_rule_theorem_attempts)}

## Row Attempts

| Row | Source premises | Rule target pair | Direct promotion rejected | Rule derivation pair | Soundness pair | Application pair | Carrier rules | Carrier pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_ref_value_carrier_introduction_rule_theorem_attempts)}

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
    console.log(usage());
    return;
  }
  const sources = {
    carrierPairTheorem: readJson(args.carrierPairTheoremPacket),
    carrierRuleTarget: readJson(args.carrierRuleTargetPacket),
    routeDecision: readJson(args.routeDecisionPacket),
    identity: readJson(args.identityPacket),
    nonDomainCarrier: readJson(args.nonDomainCarrierPacket),
    ref: readJson(args.refPacket),
    valueMap: readJson(args.valueMapPacket),
    primitiveRuleWitness: readJson(args.primitiveRuleWitnessPacket),
    bindingCarrierAdmission: readJson(args.bindingCarrierAdmissionPacket),
  };
  const sourcePaths = {
    carrierPairTheorem: args.carrierPairTheoremPacket,
    carrierRuleTarget: args.carrierRuleTargetPacket,
    routeDecision: args.routeDecisionPacket,
    identity: args.identityPacket,
    nonDomainCarrier: args.nonDomainCarrierPacket,
    ref: args.refPacket,
    valueMap: args.valueMapPacket,
    primitiveRuleWitness: args.primitiveRuleWitnessPacket,
    bindingCarrierAdmission: args.bindingCarrierAdmissionPacket,
  };
  const packet = buildPacket(sources, sourcePaths);

  fs.mkdirSync(args.outDir, { recursive: true });
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  fs.writeFileSync(
    jsonPath,
    `${JSON.stringify(packet, null, args.pretty ? 2 : 0)}\n`
  );
  fs.writeFileSync(reportPath, makeReport(packet));
  console.log(`wrote ${jsonPath}`);
  console.log(`sha256 ${sha256File(jsonPath)}`);
  console.log(`wrote ${reportPath}`);
  console.log(`sha256 ${sha256File(reportPath)}`);
  console.log(`status ${STATUS}`);
}

main();

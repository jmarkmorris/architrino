#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_INDEPENDENT_MEMBERSHIP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_constructed_witness_object_membership_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
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
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_pair_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_pair_theorem_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const INDEPENDENT_MEMBERSHIP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-constructed-witness-object-membership-theorem-attempt-fail-closed-source-pairs-present-carrier-complete-witness-object-identity-and-co-membership-proof-absent-no-cycle-breaker-no-row-consumption";
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

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-pair-theorem-attempt-fail-closed-source-pairs-and-rule-targets-present-carrier-introduction-rules-derivations-soundness-application-proofs-and-same-packet-carrier-pair-absent-no-row-consumption";

const SOURCE_READINESS_FIELDS = [
  "domain_chart_carrier_subfield_constructed",
  "ref_value_source_pair_ready",
  "source_endpoint_boundary_binding_ref_constructed",
  "source_witness_object_has_endpoint_boundary_binding_ref",
  "source_endpoint_value_binding_map_constructed",
  "source_witness_object_has_endpoint_value_binding_map",
  "endpoint_boundary_binding_ref_carrier_source_candidate_declared",
  "endpoint_value_binding_map_carrier_source_candidate_declared",
  "non_domain_carrier_obstruction_present",
  "carrier_rule_target_declared",
  "direct_source_promotion_rejected",
];

const RULE_TARGET_FIELDS = [
  "ref_carrier_introduction_rule_target_declared",
  "value_map_carrier_introduction_rule_target_declared",
  "ref_value_carrier_pair_rule_target_declared",
  "carrier_introduction_premises_named",
  "carrier_introduction_conclusion_named",
];

const RULE_PROOF_FIELDS = [
  "ref_carrier_introduction_rule_available",
  "value_map_carrier_introduction_rule_available",
  "ref_value_carrier_pair_rule_available",
  "ref_carrier_rule_derivation_present",
  "value_map_carrier_rule_derivation_present",
  "carrier_rule_soundness_proof_present",
  "carrier_rule_application_proof_present",
];

const CARRIER_PAIR_OUTPUT_FIELDS = [
  "same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed",
  "same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed",
  "ref_value_carrier_fields_same_witness_object_proven",
  "ref_value_non_domain_carrier_pair_constructed",
  "all_carrier_fields_constructed",
];

const DOWNSTREAM_GUARD_FIELDS = [
  "constructed_witness_object_id_present",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "endpoint_ref_and_value_map_same_witness_object_proven",
  "membership_source_not_id_adjacency_proven",
  "witness_object_membership_proof_present",
  "independent_constructed_witness_object_membership_theorem_present",
  "cycle_breaker_available",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const THEOREM_FIELDS = [
  ...SOURCE_READINESS_FIELDS,
  ...RULE_TARGET_FIELDS,
  "carrier_admission_route_selected",
  ...RULE_PROOF_FIELDS,
  ...CARRIER_PAIR_OUTPUT_FIELDS,
  "carrier_pair_theorem_derivation_present",
  "carrier_pair_theorem_soundness_proof_present",
  "carrier_pair_theorem_application_proof_present",
  "carrier_pair_theorem_present",
  ...DOWNSTREAM_GUARD_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_ref_value_source_pair_ready",
  "receiver_ref_value_source_pair_ready",
  "combined_ref_value_source_pair_ready",
  "source_carrier_pair_theorem_target_ready",
  "receiver_carrier_pair_theorem_target_ready",
  "combined_carrier_pair_theorem_target_ready",
  "source_direct_source_promotion_rejected",
  "receiver_direct_source_promotion_rejected",
  "combined_direct_source_promotion_rejected",
  "source_ref_value_carrier_pair_constructed",
  "receiver_ref_value_carrier_pair_constructed",
  "combined_ref_value_carrier_pair_constructed",
  "source_carrier_pair_theorem_present",
  "receiver_carrier_pair_theorem_present",
  "combined_carrier_pair_theorem_present",
  "source_cycle_breaker_available",
  "receiver_cycle_breaker_available",
  "combined_cycle_breaker_pair_available",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const THEOREM_ROUTES = [
  {
    route_id: "direct_source_handle_promotion_route",
    status: "rejected-unsound-with-current-evidence",
    required_fields: [
      ...SOURCE_READINESS_FIELDS,
      "carrier_rule_soundness_proof_present",
      "carrier_rule_application_proof_present",
      "ref_value_non_domain_carrier_pair_constructed",
    ],
    limitation:
      "Source endpoint-boundary-binding refs and endpoint value-binding maps remain source handles and source candidates; they cannot be promoted into carrier fields by adjacency, matching ids, or witness-object symbols.",
  },
  {
    route_id: "proof_grade_carrier_introduction_rule_route",
    status: "blocked",
    required_fields: [
      ...RULE_PROOF_FIELDS,
      "carrier_pair_theorem_derivation_present",
      "carrier_pair_theorem_soundness_proof_present",
      "carrier_pair_theorem_application_proof_present",
    ],
    limitation:
      "The source packets declare rule targets but contain no proof-grade carrier-introduction rules, derivations, soundness proof, application proof, or theorem-level derivation.",
  },
  {
    route_id: "same_packet_ref_value_carrier_pair_route",
    status: "blocked",
    required_fields: [
      ...CARRIER_PAIR_OUTPUT_FIELDS,
    ],
    limitation:
      "No same-packet ref carrier field, value-map carrier field, same-witness-object carrier proof, or constructed ref/value non-domain carrier pair is present.",
  },
  {
    route_id: "selected_carrier_admission_route",
    status: "selected-but-blocked",
    required_fields: [
      "carrier_admission_route_selected",
      "binding_contract_satisfied",
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      "endpoint_value_binding_map_carrier_unblocked",
    ],
    limitation:
      "The selected carrier-admission route remains useful as the downstream proof contract, but it is blocked and does not provide an independent carrier-pair theorem in this packet.",
  },
  {
    route_id: "constructed_identity_unlock_route",
    status: "blocked-downstream",
    required_fields: [
      "ref_value_non_domain_carrier_pair_constructed",
      "all_carrier_fields_constructed",
      "constructed_witness_object_id_present",
      "same_constructed_witness_object_identity_proof_present",
      "witness_object_membership_proof_present",
    ],
    limitation:
      "Constructed witness-object identity and membership remain locked until the same-packet ref/value carrier pair exists.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "endpoint_boundary_binding_ref_carrier_introduction_rule",
    missing_field: "ref_carrier_introduction_rule_available",
    required_evidence:
      "A proof-grade rule that promotes the endpoint-boundary-binding ref source handle into a same-packet non-domain witness-object carrier field.",
  },
  {
    burden_id: "endpoint_value_binding_map_carrier_introduction_rule",
    missing_field: "value_map_carrier_introduction_rule_available",
    required_evidence:
      "A proof-grade rule that promotes the endpoint value-binding map source handle into a same-packet non-domain witness-object carrier field.",
  },
  {
    burden_id: "ref_value_carrier_pair_rule",
    missing_field: "ref_value_carrier_pair_rule_available",
    required_evidence:
      "A joint rule proving that the ref carrier and value-map carrier occupy one same-packet witness object.",
  },
  {
    burden_id: "ref_carrier_rule_derivation",
    missing_field: "ref_carrier_rule_derivation_present",
    required_evidence:
      "A derivation of the ref carrier-introduction rule from the endpoint-boundary-binding construction contract.",
  },
  {
    burden_id: "value_map_carrier_rule_derivation",
    missing_field: "value_map_carrier_rule_derivation_present",
    required_evidence:
      "A derivation of the value-map carrier-introduction rule from the endpoint value-binding map contract.",
  },
  {
    burden_id: "carrier_rule_soundness",
    missing_field: "carrier_rule_soundness_proof_present",
    required_evidence:
      "A soundness proof that the rule preserves the same-packet witness-object carrier contract and does not promote source handles by adjacency.",
  },
  {
    burden_id: "carrier_rule_application",
    missing_field: "carrier_rule_application_proof_present",
    required_evidence:
      "Endpoint-by-endpoint application proof verifying every premise of the carrier-introduction rule.",
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
    burden_id: "same_witness_object_carrier_pair_proof",
    missing_field: "ref_value_carrier_fields_same_witness_object_proven",
    required_evidence:
      "A proof that the ref carrier field and value-map carrier field belong to one same-packet witness object.",
  },
  {
    burden_id: "ref_value_non_domain_carrier_pair",
    missing_field: "ref_value_non_domain_carrier_pair_constructed",
    required_evidence:
      "A constructed ref/value non-domain carrier pair with both fields proved to belong to one same-packet witness object.",
  },
  {
    burden_id: "carrier_pair_theorem_derivation",
    missing_field: "carrier_pair_theorem_derivation_present",
    required_evidence:
      "A derivation that the rule outputs imply `ref_value_non_domain_carrier_pair_constructed` for each endpoint.",
  },
  {
    burden_id: "carrier_pair_theorem_soundness",
    missing_field: "carrier_pair_theorem_soundness_proof_present",
    required_evidence:
      "A theorem-level soundness proof that the carrier pair is not inferred from source-handle adjacency.",
  },
  {
    burden_id: "carrier_pair_theorem_application",
    missing_field: "carrier_pair_theorem_application_proof_present",
    required_evidence:
      "Endpoint-level application proof for the carrier-pair theorem on all four endpoint functionals.",
  },
];

function parseArgs(argv) {
  const args = {
    independentMembershipPacket: DEFAULT_INDEPENDENT_MEMBERSHIP_PACKET,
    carrierRuleTargetPacket: DEFAULT_CARRIER_RULE_TARGET_PACKET,
    routeDecisionPacket: DEFAULT_ROUTE_DECISION_PACKET,
    identityPacket: DEFAULT_IDENTITY_PACKET,
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
    } else if (arg === "--independent-membership-packet") {
      args.independentMembershipPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-pair-theorem-attempt.mjs [options]",
    "",
    "Options:",
    "  --independent-membership-packet <path>",
    "  --carrier-rule-target-packet <path>",
    "  --route-decision-packet <path>",
    "  --identity-packet <path>",
    "  --non-domain-carrier-packet <path>",
    "  --ref-packet <path>",
    "  --value-map-packet <path>",
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
    throw new Error(`Refusing carrier-pair theorem attempt from authorized ${label}.`);
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
    passed: route.status === "not-taken" ? false : missingFields.length === 0,
  };
}

function missingBurdens(fields) {
  return PROOF_BURDENS.filter((burden) => fields[burden.missing_field] !== true)
    .map((burden) => ({ ...burden, satisfied: false }));
}

function buildEndpointAttempt({
  membership,
  carrierTarget,
  routeDecision,
  identity,
  nonDomain,
  ref,
  valueMap,
}) {
  assertSameEndpoint(carrierTarget, routeDecision, "route decision");
  assertSameEndpoint(carrierTarget, membership, "independent membership");
  assertSameEndpoint(carrierTarget, identity, "same-packet identity");
  assertSameEndpoint(carrierTarget, nonDomain, "non-domain carrier");
  assertSameEndpoint(carrierTarget, ref, "endpoint-boundary-binding ref");
  assertSameEndpoint(carrierTarget, valueMap, "endpoint value-binding map");

  const refCarrier = carrierObstruction(nonDomain, "endpoint_boundary_binding_ref");
  const valueCarrier = carrierObstruction(nonDomain, "endpoint_value_binding_map");
  const carrierFields = carrierTarget.required_fields_present ?? {};
  const routeFields = routeDecision.required_fields_present ?? {};
  const membershipFields = membership.required_fields_present ?? {};

  const fields = {
    domain_chart_carrier_subfield_constructed:
      identity.required_fields_present?.domain_chart_carrier_subfield_constructed ===
        true ||
      nonDomain.required_fields_present?.domain_chart_carrier_subfield_constructed === true,
    ref_value_source_pair_ready:
      membershipFields.ref_value_source_pair_ready === true ||
      identity.ref_value_source_pair_ready === true,
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
    carrier_rule_target_declared:
      carrierFields.ref_value_carrier_pair_rule_target_declared === true,
    direct_source_promotion_rejected:
      routeFields.direct_source_promotion_rejected === true,
    ref_carrier_introduction_rule_target_declared:
      carrierFields.ref_carrier_introduction_rule_target_declared === true,
    value_map_carrier_introduction_rule_target_declared:
      carrierFields.value_map_carrier_introduction_rule_target_declared === true,
    ref_value_carrier_pair_rule_target_declared:
      carrierFields.ref_value_carrier_pair_rule_target_declared === true,
    carrier_introduction_premises_named:
      carrierFields.carrier_introduction_premises_named === true,
    carrier_introduction_conclusion_named:
      carrierFields.carrier_introduction_conclusion_named === true,
    carrier_admission_route_selected:
      routeFields.carrier_admission_route_selected === true,
    ref_carrier_introduction_rule_available:
      carrierFields.ref_carrier_introduction_rule_available === true,
    value_map_carrier_introduction_rule_available:
      carrierFields.value_map_carrier_introduction_rule_available === true,
    ref_value_carrier_pair_rule_available:
      carrierFields.ref_value_carrier_pair_rule_available === true,
    ref_carrier_rule_derivation_present:
      carrierFields.ref_carrier_rule_derivation_present === true,
    value_map_carrier_rule_derivation_present:
      carrierFields.value_map_carrier_rule_derivation_present === true,
    carrier_rule_soundness_proof_present:
      carrierFields.carrier_rule_soundness_proof_present === true,
    carrier_rule_application_proof_present:
      carrierFields.carrier_rule_application_proof_present === true,
    same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed:
      carrierFields
        .same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed ===
        true || refCarrier.carrier_field_constructed === true,
    same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed:
      carrierFields
        .same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed ===
        true || valueCarrier.carrier_field_constructed === true,
    ref_value_carrier_fields_same_witness_object_proven: false,
    ref_value_non_domain_carrier_pair_constructed:
      carrierFields.ref_value_non_domain_carrier_pair_constructed === true,
    all_carrier_fields_constructed:
      carrierFields.all_carrier_fields_constructed === true ||
      identity.required_fields_present?.all_carrier_fields_constructed === true,
    carrier_pair_theorem_derivation_present: false,
    carrier_pair_theorem_soundness_proof_present: false,
    carrier_pair_theorem_application_proof_present: false,
    carrier_pair_theorem_present: false,
    constructed_witness_object_id_present:
      identity.required_fields_present?.constructed_witness_object_id_present === true,
    same_constructed_witness_object_identity_proof_present:
      identity.required_fields_present?.same_constructed_witness_object_identity_proof_present ===
      true,
    endpoint_boundary_binding_ref_member_of_witness_object_proven:
      identity.required_fields_present
        ?.endpoint_boundary_binding_ref_member_of_witness_object_proven === true,
    endpoint_value_binding_map_member_of_witness_object_proven:
      identity.required_fields_present
        ?.endpoint_value_binding_map_member_of_witness_object_proven === true,
    endpoint_ref_and_value_map_same_witness_object_proven:
      identity.required_fields_present
        ?.endpoint_ref_and_value_map_same_witness_object_proven === true,
    membership_source_not_id_adjacency_proven:
      identity.required_fields_present?.membership_source_not_id_adjacency_proven === true,
    witness_object_membership_proof_present:
      identity.required_fields_present?.witness_object_membership_proof_present === true,
    independent_constructed_witness_object_membership_theorem_present:
      membershipFields
        .independent_constructed_witness_object_membership_theorem_present === true,
    cycle_breaker_available: membershipFields.cycle_breaker_available === true,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.carrier_pair_theorem_present =
    [
      ...RULE_PROOF_FIELDS,
      ...CARRIER_PAIR_OUTPUT_FIELDS,
      "carrier_pair_theorem_derivation_present",
      "carrier_pair_theorem_soundness_proof_present",
      "carrier_pair_theorem_application_proof_present",
    ].every((field) => fields[field] === true);

  const routeAttempts = THEOREM_ROUTES.map((route) => routeAttempt(route, fields));
  const missingProofBurdens = missingBurdens(fields);
  const firstExactBlocker =
    missingProofBurdens[0]?.missing_field ?? "none";

  return {
    id: carrierTarget.id,
    endpoint_functional_id: carrierTarget.endpoint_functional_id,
    role: carrierTarget.role,
    ref_value_non_domain_carrier_pair_theorem_attempt_id:
      `ref_value_non_domain_carrier_pair_theorem_attempt:${carrierTarget.id}`,
    source_attempt_ids: {
      independent_constructed_witness_object_membership_theorem_attempt:
        membership.independent_constructed_witness_object_membership_theorem_attempt_id,
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
    witness_object_attempt_id:
      carrierTarget.witness_object_attempt_id || identity.witness_object_attempt_id,
    witness_object_symbol:
      carrierTarget.witness_object_symbol || identity.witness_object_symbol,
    endpoint_boundary_binding_ref_id:
      carrierTarget.endpoint_boundary_binding_ref_id ||
      identity.endpoint_boundary_binding_ref_id,
    endpoint_value_binding_map_id:
      carrierTarget.endpoint_value_binding_map_id ||
      identity.endpoint_value_binding_map_id,
    theorem_target: {
      theorem_id:
        `ref_value_non_domain_carrier_pair_theorem:${carrierTarget.id}`,
      statement:
        "The endpoint-boundary-binding ref and endpoint value-binding map are introduced as non-domain carrier fields in one same-packet witness object by proof-grade carrier-introduction rules, derivations, soundness proof, and endpoint application proof.",
      required_rule_fields: RULE_PROOF_FIELDS,
      required_output_fields: CARRIER_PAIR_OUTPUT_FIELDS,
      no_promotion_guard:
        "Source handles, carrier source candidates, rule targets, and selected route decisions do not construct carrier fields without proof-grade rule application.",
    },
    ref_carrier_source_candidate: {
      carrier_field: refCarrier.carrier_field,
      source_ref: refCarrier.source_ref,
      carrier_field_source_candidate_declared:
        refCarrier.carrier_field_source_candidate_declared,
      carrier_field_constructed: refCarrier.carrier_field_constructed,
      missing_dependencies: refCarrier.missing_dependencies,
    },
    value_map_carrier_source_candidate: {
      carrier_field: valueCarrier.carrier_field,
      source_ref: valueCarrier.source_ref,
      carrier_field_source_candidate_declared:
        valueCarrier.carrier_field_source_candidate_declared,
      carrier_field_constructed: valueCarrier.carrier_field_constructed,
      missing_dependencies: valueCarrier.missing_dependencies,
    },
    route_attempts: routeAttempts,
    theorem_routes_passed:
      routeAttempts.filter((route) => route.passed).map((route) => route.route_id),
    required_fields_present: fields,
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blocker: firstExactBlocker,
    carrier_pair_theorem_present: fields.carrier_pair_theorem_present,
    ref_value_non_domain_carrier_pair_constructed:
      fields.ref_value_non_domain_carrier_pair_constructed,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has ref/value source handles, source candidates, and declared carrier-pair rule targets, but no proof-grade carrier-introduction rules, derivations, soundness proof, application proof, or constructed carrier-pair outputs.",
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
  const fields = {
    row_locator_resolved: req(row, "row_locator_resolved"),
    source_ref_value_source_pair_ready: req(source, "ref_value_source_pair_ready"),
    receiver_ref_value_source_pair_ready: req(
      receiver,
      "ref_value_source_pair_ready"
    ),
    combined_ref_value_source_pair_ready: false,
    source_carrier_pair_theorem_target_ready: req(
      source,
      "ref_value_carrier_pair_rule_target_declared"
    ),
    receiver_carrier_pair_theorem_target_ready: req(
      receiver,
      "ref_value_carrier_pair_rule_target_declared"
    ),
    combined_carrier_pair_theorem_target_ready: false,
    source_direct_source_promotion_rejected: req(
      source,
      "direct_source_promotion_rejected"
    ),
    receiver_direct_source_promotion_rejected: req(
      receiver,
      "direct_source_promotion_rejected"
    ),
    combined_direct_source_promotion_rejected: false,
    source_ref_value_carrier_pair_constructed: req(
      source,
      "ref_value_non_domain_carrier_pair_constructed"
    ),
    receiver_ref_value_carrier_pair_constructed: req(
      receiver,
      "ref_value_non_domain_carrier_pair_constructed"
    ),
    combined_ref_value_carrier_pair_constructed: false,
    source_carrier_pair_theorem_present: req(
      source,
      "carrier_pair_theorem_present"
    ),
    receiver_carrier_pair_theorem_present: req(
      receiver,
      "carrier_pair_theorem_present"
    ),
    combined_carrier_pair_theorem_present: false,
    source_cycle_breaker_available: req(source, "cycle_breaker_available"),
    receiver_cycle_breaker_available: req(receiver, "cycle_breaker_available"),
    combined_cycle_breaker_pair_available: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_ref_value_source_pair_ready =
    fields.source_ref_value_source_pair_ready &&
    fields.receiver_ref_value_source_pair_ready;
  fields.combined_carrier_pair_theorem_target_ready =
    fields.source_carrier_pair_theorem_target_ready &&
    fields.receiver_carrier_pair_theorem_target_ready;
  fields.combined_direct_source_promotion_rejected =
    fields.source_direct_source_promotion_rejected &&
    fields.receiver_direct_source_promotion_rejected;
  fields.combined_ref_value_carrier_pair_constructed =
    fields.source_ref_value_carrier_pair_constructed &&
    fields.receiver_ref_value_carrier_pair_constructed;
  fields.combined_carrier_pair_theorem_present =
    fields.source_carrier_pair_theorem_present &&
    fields.receiver_carrier_pair_theorem_present;
  fields.combined_cycle_breaker_pair_available =
    fields.source_cycle_breaker_available &&
    fields.receiver_cycle_breaker_available;

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
    source_ref_value_non_domain_carrier_pair_theorem_attempt_id:
      source.ref_value_non_domain_carrier_pair_theorem_attempt_id,
    receiver_ref_value_non_domain_carrier_pair_theorem_attempt_id:
      receiver.ref_value_non_domain_carrier_pair_theorem_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver source-pair readiness and carrier-pair theorem targets, but neither endpoint has a constructed ref/value carrier pair, theorem, cycle breaker, or row-consumable data.",
  };
}

function fieldCounts(items, fields) {
  return Object.fromEntries(
    fields.map((field) => [field, countTrue(items, field)])
  );
}

function assertSources(sources) {
  assertPacket(
    sources.independentMembership,
    INDEPENDENT_MEMBERSHIP_STATUS,
    "independent membership packet"
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
}

function buildPacket(sources, sourcePaths) {
  assertSources(sources);
  const membershipById = idMap(
    sources.independentMembership
      .endpoint_independent_constructed_witness_object_membership_theorem_attempts,
    "id",
    "independent membership endpoint"
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
          membership: requireMapped(
            membershipById,
            carrierTarget.id,
            `membership endpoint ${carrierTarget.id}`
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
    "carrier-pair theorem endpoint"
  );
  const rowAttempts =
    sources.carrierRuleTarget.row_ref_value_non_domain_carrier_rule_targets.map(
      (row) => buildRowAttempt(row, endpointMap)
    );
  const endpointFieldCounts = fieldCounts(endpointAttempts, THEOREM_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-pair-theorem-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed theorem attempt; source candidates and rule targets are present but no proof-grade carrier-introduction rules, derivations, soundness proof, application proof, or ref/value carrier pair is present",
    source_artifacts: [
      {
        label: "independent_constructed_witness_object_membership_theorem_attempt",
        ...artifactRecord(sourcePaths.independentMembership),
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
    ],
    theorem_target: {
      theorem_id: "ref-value-non-domain-carrier-pair-theorem-target",
      statement:
        "For each endpoint functional, construct the endpoint-boundary-binding ref and endpoint value-binding map as non-domain carrier fields of one same-packet witness object using proof-grade carrier-introduction rules, derivations, soundness proof, and application proof.",
      accepted_as_first_blocker_discharge_if:
        "Every endpoint has the rule fields, carrier-pair output fields, theorem derivation, theorem soundness proof, and endpoint application proof; every residual row then has source/receiver carrier-pair theorem outputs.",
      first_exact_blocker:
        "ref_carrier_introduction_rule_available and value_map_carrier_introduction_rule_available, with joint blocker ref_value_carrier_pair_rule_available",
    },
    no_promotion_rule:
      "A ref/value source pair, source-candidate declaration, carrier-obstruction record, or carrier-pair rule target does not construct a non-domain carrier pair without proof-grade rule derivation, soundness, and endpoint application.",
    proof_burdens: PROOF_BURDENS,
    theorem_routes: THEOREM_ROUTES,
    endpoint_fields: THEOREM_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_ref_value_non_domain_carrier_pair_theorem_attempts:
      endpointAttempts,
    row_ref_value_non_domain_carrier_pair_theorem_attempts: rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      carrier_pair_theorem_targets_declared:
        endpointFieldCounts.ref_value_carrier_pair_rule_target_declared,
      ref_value_source_pairs_ready:
        endpointFieldCounts.ref_value_source_pair_ready,
      carrier_rule_targets_declared:
        endpointFieldCounts.carrier_rule_target_declared,
      non_domain_carrier_obstructions_present:
        endpointFieldCounts.non_domain_carrier_obstruction_present,
      ref_carrier_source_candidates_declared:
        endpointFieldCounts
          .endpoint_boundary_binding_ref_carrier_source_candidate_declared,
      value_map_carrier_source_candidates_declared:
        endpointFieldCounts
          .endpoint_value_binding_map_carrier_source_candidate_declared,
      ref_carrier_rule_targets_declared:
        endpointFieldCounts.ref_carrier_introduction_rule_target_declared,
      value_map_carrier_rule_targets_declared:
        endpointFieldCounts.value_map_carrier_introduction_rule_target_declared,
      ref_value_pair_rule_targets_declared:
        endpointFieldCounts.ref_value_carrier_pair_rule_target_declared,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      carrier_admission_routes_selected:
        endpointFieldCounts.carrier_admission_route_selected,
      ref_carrier_rules_available:
        endpointFieldCounts.ref_carrier_introduction_rule_available,
      value_map_carrier_rules_available:
        endpointFieldCounts.value_map_carrier_introduction_rule_available,
      ref_value_pair_rules_available:
        endpointFieldCounts.ref_value_carrier_pair_rule_available,
      ref_carrier_rule_derivations_present:
        endpointFieldCounts.ref_carrier_rule_derivation_present,
      value_map_carrier_rule_derivations_present:
        endpointFieldCounts.value_map_carrier_rule_derivation_present,
      carrier_rule_soundness_proofs_present:
        endpointFieldCounts.carrier_rule_soundness_proof_present,
      carrier_rule_application_proofs_present:
        endpointFieldCounts.carrier_rule_application_proof_present,
      same_packet_ref_carrier_fields_constructed:
        endpointFieldCounts
          .same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed,
      same_packet_value_map_carrier_fields_constructed:
        endpointFieldCounts
          .same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed,
      same_packet_endpoint_boundary_binding_ref_carrier_fields_constructed:
        endpointFieldCounts
          .same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed,
      same_packet_endpoint_value_binding_map_carrier_fields_constructed:
        endpointFieldCounts
          .same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed,
      ref_value_carrier_pair_same_witness_object_proofs:
        endpointFieldCounts.ref_value_carrier_fields_same_witness_object_proven,
      ref_value_non_domain_carrier_pairs_constructed:
        endpointFieldCounts.ref_value_non_domain_carrier_pair_constructed,
      all_carrier_fields_constructed:
        endpointFieldCounts.all_carrier_fields_constructed,
      constructed_witness_object_ids_present:
        endpointFieldCounts.constructed_witness_object_id_present,
      witness_object_membership_proofs_present:
        endpointFieldCounts.witness_object_membership_proof_present,
      carrier_pair_theorem_derivations_present:
        endpointFieldCounts.carrier_pair_theorem_derivation_present,
      carrier_pair_theorem_soundness_proofs_present:
        endpointFieldCounts.carrier_pair_theorem_soundness_proof_present,
      carrier_pair_theorem_application_proofs_present:
        endpointFieldCounts.carrier_pair_theorem_application_proof_present,
      carrier_pair_theorems_present:
        endpointFieldCounts.carrier_pair_theorem_present,
      independent_membership_theorems_present:
        endpointFieldCounts
          .independent_constructed_witness_object_membership_theorem_present,
      cycle_breakers_available: endpointFieldCounts.cycle_breaker_available,
      row_ref_value_source_pairs_ready:
        rowFieldCounts.combined_ref_value_source_pair_ready,
      row_carrier_pair_theorem_targets_ready:
        rowFieldCounts.combined_carrier_pair_theorem_target_ready,
      row_direct_source_promotion_pairs_rejected:
        rowFieldCounts.combined_direct_source_promotion_rejected,
      row_ref_value_non_domain_carrier_pairs_constructed:
        rowFieldCounts.combined_ref_value_carrier_pair_constructed,
      row_ref_value_carrier_pair_constructed:
        rowFieldCounts.combined_ref_value_carrier_pair_constructed,
      row_carrier_pair_theorem_pairs_present:
        rowFieldCounts.combined_carrier_pair_theorem_present,
      row_cycle_breaker_pairs_available:
        rowFieldCounts.combined_cycle_breaker_pair_available,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint has proof-grade carrier-introduction rules or a constructed ref/value non-domain carrier pair, so no residual row has row-consumable carrier-pair data.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed ref/value non-domain carrier-pair theorem attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.ref_value_source_pair_ready} | ${fields.ref_value_carrier_pair_rule_target_declared} | ${fields.ref_carrier_introduction_rule_available} | ${fields.value_map_carrier_introduction_rule_available} | ${fields.ref_value_carrier_pair_rule_available} | ${fields.carrier_rule_soundness_proof_present} | ${fields.carrier_rule_application_proof_present} | ${fields.ref_value_non_domain_carrier_pair_constructed} | ${fields.carrier_pair_theorem_present} | ${endpoint.first_exact_blocker} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_ref_value_source_pair_ready} | ${fields.combined_carrier_pair_theorem_target_ready} | ${fields.combined_direct_source_promotion_rejected} | ${fields.combined_ref_value_carrier_pair_constructed} | ${fields.combined_carrier_pair_theorem_present} | ${fields.combined_cycle_breaker_pair_available} | ${row.row_consumed} |`;
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
  return `# Ref/Value Non-Domain Carrier-Pair Theorem Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests the first exact blocker isolated by the
independent constructed witness-object membership theorem attempt:
\`ref_value_non_domain_carrier_pair_constructed\`. It asks whether the current
same-packet source data can be raised into a theorem constructing the
endpoint-boundary-binding ref and endpoint value-binding map as non-domain
carrier fields in one same-packet witness object.

The attempt remains fail-closed. It records ${summary.ref_value_source_pairs_ready} / ${summary.endpoint_functionals}
ref/value source pairs, ${summary.ref_carrier_source_candidates_declared} / ${summary.endpoint_functionals}
ref carrier source candidates, ${summary.value_map_carrier_source_candidates_declared} / ${summary.endpoint_functionals}
value-map carrier source candidates, and ${summary.ref_value_pair_rule_targets_declared} / ${summary.endpoint_functionals}
carrier-pair rule targets. It records ${summary.ref_carrier_rules_available} / ${summary.endpoint_functionals}
ref carrier rules, ${summary.value_map_carrier_rules_available} / ${summary.endpoint_functionals}
value-map carrier rules, ${summary.ref_value_pair_rules_available} / ${summary.endpoint_functionals}
joint carrier-pair rules, ${summary.carrier_rule_soundness_proofs_present} / ${summary.endpoint_functionals}
soundness proofs, ${summary.carrier_rule_application_proofs_present} / ${summary.endpoint_functionals}
application proofs, and ${summary.ref_value_non_domain_carrier_pairs_constructed} / ${summary.endpoint_functionals}
constructed carrier pairs. It consumes ${summary.row_consumption_count} rows and
authorizes no branch chart.

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

| Endpoint | Role | Source pair | Pair target | Ref rule | Value rule | Pair rule | Soundness | Application | Carrier pair | Theorem | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_ref_value_non_domain_carrier_pair_theorem_attempts)}

## Row Attempts

| Row | Source pair | Theorem target pair | Direct promotion rejected | Carrier pair | Theorem pair | Cycle-breaker pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_ref_value_non_domain_carrier_pair_theorem_attempts)}

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
    independentMembership: readJson(args.independentMembershipPacket),
    carrierRuleTarget: readJson(args.carrierRuleTargetPacket),
    routeDecision: readJson(args.routeDecisionPacket),
    identity: readJson(args.identityPacket),
    nonDomainCarrier: readJson(args.nonDomainCarrierPacket),
    ref: readJson(args.refPacket),
    valueMap: readJson(args.valueMapPacket),
  };
  const sourcePaths = {
    independentMembership: args.independentMembershipPacket,
    carrierRuleTarget: args.carrierRuleTargetPacket,
    routeDecision: args.routeDecisionPacket,
    identity: args.identityPacket,
    nonDomainCarrier: args.nonDomainCarrierPacket,
    ref: args.refPacket,
    valueMap: args.valueMapPacket,
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

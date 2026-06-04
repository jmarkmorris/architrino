#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_RULE_THEOREM_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_rule_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_RULE_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ROUTE_DECISION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FULL_BINDING_CONTRACT_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PRIMITIVE_RULE_WITNESS_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REF_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_CARRIER_ADMISSION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_rule_derivation_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_rule_derivation_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const RULE_THEOREM_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-rule-theorem-attempt-fail-closed-source-pairs-and-rule-targets-present-rule-derivations-soundness-application-evidence-and-joint-carrier-pair-rule-absent-no-row-consumption";
const CARRIER_RULE_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-rule-target-fail-closed-ref-value-sources-and-carrier-candidates-present-carrier-introduction-rules-absent-no-row-consumption";
const ROUTE_DECISION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision-fail-closed-direct-source-promotion-rejected-carrier-admission-route-selected-no-row-consumption";
const FULL_BINDING_CONTRACT_TARGET_STATUS =
  "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked";
const PRIMITIVE_RULE_WITNESS_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-rule-witness-record-construction-attempt-partial-pass-first-primitives-constructed-ref-carriers-full-binding-row-closure-locked-no-row-consumption";
const REF_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";
const BINDING_CARRIER_ADMISSION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-fail-closed-value-maps-inherited-contract-full-binding-carrier-admission-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-rule-derivation-attempt-fail-closed-ref-contract-value-map-contract-and-same-witness-rule-roots-present-derivations-soundness-application-absent-no-row-consumption";

const DERIVATION_ROOTS = [
  {
    root_id: "endpoint_boundary_binding_ref_contract_root",
    source_artifact: "endpoint_boundary_binding_ref_carrier_full_binding",
    source_fields: [
      "witness_object_endpoint_boundary_binding_ref_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
      "endpoint_boundary_binding_ref_targets_first_primitive",
      "endpoint_boundary_binding_ref_target_attachment_certified",
    ],
    intended_derivation:
      "ref_contract_to_ref_carrier_rule_derivation_present",
  },
  {
    root_id: "endpoint_value_binding_map_contract_root",
    source_artifact: "endpoint_value_binding_map",
    source_fields: [
      "endpoint_value_binding_map_constructed",
      "witness_object_has_endpoint_value_binding_map",
      "endpoint_value_bound_to_boundary_binding",
      "endpoint_value_binding_map_targets_first_primitive",
      "endpoint_value_binding_map_ref_values_certified",
    ],
    intended_derivation:
      "value_map_contract_to_value_map_carrier_rule_derivation_present",
  },
  {
    root_id: "joint_same_witness_carrier_pair_rule_root",
    source_artifact: "ref_value_non_domain_carrier_rule_target",
    source_fields: [
      "ref_value_carrier_pair_rule_target_declared",
      "same_packet_identity_target_present",
      "non_domain_carrier_obstruction_present",
      "direct_source_promotion_rejected",
    ],
    intended_derivation:
      "joint_same_witness_carrier_pair_rule_derivation_present",
  },
];

const DERIVATION_PREMISE_FIELDS = [
  "ref_contract_root_ready",
  "value_map_contract_root_ready",
  "joint_same_witness_carrier_pair_rule_root_ready",
  "full_binding_contract_target_declared",
  "primitive_construction_rule_applied",
  "primitive_binding_witness_record_constructed",
  "direct_source_promotion_rejected",
  "carrier_admission_route_selected",
  "source_derivation_premise_set_ready",
];

const DERIVATION_TARGET_FIELDS = [
  "ref_carrier_rule_derivation_target_declared",
  "value_map_carrier_rule_derivation_target_declared",
  "joint_same_witness_carrier_pair_rule_derivation_target_declared",
  "derivation_targets_declared",
];

const DERIVATION_EVIDENCE_FIELDS = [
  "ref_contract_to_ref_carrier_rule_derivation_present",
  "value_map_contract_to_value_map_carrier_rule_derivation_present",
  "joint_same_witness_carrier_pair_rule_derivation_present",
  "derivation_soundness_bridge_present",
  "source_handle_non_promotion_guard_proven",
  "ref_carrier_rule_derivation_present",
  "value_map_carrier_rule_derivation_present",
  "ref_value_pair_rule_derivation_present",
];

const DOWNSTREAM_FIELDS = [
  "carrier_rule_soundness_proof_present",
  "carrier_rule_application_proof_present",
  "ref_carrier_introduction_rule_available",
  "value_map_carrier_introduction_rule_available",
  "ref_value_carrier_pair_rule_available",
  "carrier_introduction_rule_theorem_bundle_present",
  "same_packet_ref_carrier_field_constructed",
  "same_packet_value_map_carrier_field_constructed",
  "ref_value_carrier_fields_same_witness_object_proven",
  "ref_value_non_domain_carrier_pair_constructed",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...DERIVATION_PREMISE_FIELDS,
  "binding_contract_satisfied",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
  ...DERIVATION_TARGET_FIELDS,
  ...DERIVATION_EVIDENCE_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_derivation_premise_set_ready",
  "receiver_derivation_premise_set_ready",
  "combined_derivation_premise_set_ready",
  "source_derivation_targets_declared",
  "receiver_derivation_targets_declared",
  "combined_derivation_targets_declared",
  "source_ref_contract_to_ref_carrier_rule_derivation_present",
  "receiver_ref_contract_to_ref_carrier_rule_derivation_present",
  "combined_ref_contract_to_ref_carrier_rule_derivation_present",
  "source_value_map_contract_to_value_map_carrier_rule_derivation_present",
  "receiver_value_map_contract_to_value_map_carrier_rule_derivation_present",
  "combined_value_map_contract_to_value_map_carrier_rule_derivation_present",
  "source_joint_same_witness_carrier_pair_rule_derivation_present",
  "receiver_joint_same_witness_carrier_pair_rule_derivation_present",
  "combined_joint_same_witness_carrier_pair_rule_derivation_present",
  "source_derivation_soundness_bridge_present",
  "receiver_derivation_soundness_bridge_present",
  "combined_derivation_soundness_bridge_present",
  "source_rule_derivation_present",
  "receiver_rule_derivation_present",
  "combined_rule_derivation_present",
  "source_rule_bundle_present",
  "receiver_rule_bundle_present",
  "combined_rule_bundle_present",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const DERIVATION_ROUTES = [
  {
    route_id: "rule_target_as_derivation_route",
    status: "rejected-target-only",
    required_fields: [
      "source_derivation_premise_set_ready",
      "derivation_targets_declared",
      ...DERIVATION_EVIDENCE_FIELDS,
    ],
    limitation:
      "Contract targets and rule targets name obligations; they do not derive carrier-introduction rules by themselves.",
  },
  {
    route_id: "ref_contract_to_ref_carrier_rule_derivation_route",
    status: "blocked",
    required_fields: [
      "ref_contract_root_ready",
      "ref_contract_to_ref_carrier_rule_derivation_present",
    ],
    limitation:
      "The witness-object endpoint-boundary-binding ref is present, but no derivation promotes that ref contract into a non-domain carrier-introduction rule.",
  },
  {
    route_id: "value_map_contract_to_value_map_carrier_rule_derivation_route",
    status: "blocked",
    required_fields: [
      "value_map_contract_root_ready",
      "value_map_contract_to_value_map_carrier_rule_derivation_present",
    ],
    limitation:
      "The endpoint value-binding map is present and bound to endpoint values, but no derivation promotes that value-map contract into a non-domain carrier-introduction rule.",
  },
  {
    route_id: "joint_same_witness_carrier_pair_rule_derivation_route",
    status: "blocked",
    required_fields: [
      "ref_contract_to_ref_carrier_rule_derivation_present",
      "value_map_contract_to_value_map_carrier_rule_derivation_present",
      "joint_same_witness_carrier_pair_rule_derivation_present",
    ],
    limitation:
      "No derivation proves that the ref carrier and value-map carrier introduced by the two rules occupy one same-packet witness object.",
  },
  {
    route_id: "soundness_after_derivation_route",
    status: "blocked",
    required_fields: [
      "ref_contract_to_ref_carrier_rule_derivation_present",
      "value_map_contract_to_value_map_carrier_rule_derivation_present",
      "joint_same_witness_carrier_pair_rule_derivation_present",
      "derivation_soundness_bridge_present",
    ],
    limitation:
      "No soundness bridge proves that the attempted derivations preserve non-domain carrier membership and do not promote source handles by adjacency.",
  },
  {
    route_id: "selected_carrier_admission_as_derivation_route",
    status: "selected-but-blocked-not-derivation",
    required_fields: [
      "carrier_admission_route_selected",
      "binding_contract_satisfied",
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      "endpoint_value_binding_map_carrier_unblocked",
    ],
    limitation:
      "The selected carrier-admission route is recorded, but it remains blocked and cannot substitute for a derivation of the carrier-introduction rules.",
  },
  {
    route_id: "endpoint_application_after_soundness_route",
    status: "blocked-downstream",
    required_fields: [
      "ref_carrier_rule_derivation_present",
      "value_map_carrier_rule_derivation_present",
      "ref_value_pair_rule_derivation_present",
      "carrier_rule_soundness_proof_present",
      "carrier_rule_application_proof_present",
      "carrier_introduction_rule_theorem_bundle_present",
    ],
    limitation:
      "Rule soundness, endpoint application, and available carrier rules are downstream of the missing derivations.",
  },
  {
    route_id: "downstream_carrier_pair_route",
    status: "blocked-downstream",
    required_fields: [
      "same_packet_ref_carrier_field_constructed",
      "same_packet_value_map_carrier_field_constructed",
      "ref_value_carrier_fields_same_witness_object_proven",
      "ref_value_non_domain_carrier_pair_constructed",
      "row_consumption_authorized",
      "branch_chart_authorized",
    ],
    limitation:
      "Constructed same-witness carrier-pair data and row consumption remain downstream of derived carrier-introduction rules and sound endpoint application.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "ref_contract_to_carrier_rule_derivation",
    missing_field: "ref_contract_to_ref_carrier_rule_derivation_present",
    required_evidence:
      "A proof-grade derivation from the endpoint-boundary-binding ref contract to the ref carrier-introduction rule.",
  },
  {
    burden_id: "value_map_contract_to_carrier_rule_derivation",
    missing_field:
      "value_map_contract_to_value_map_carrier_rule_derivation_present",
    required_evidence:
      "A proof-grade derivation from the endpoint value-binding map contract to the value-map carrier-introduction rule.",
  },
  {
    burden_id: "joint_same_witness_carrier_pair_derivation",
    missing_field: "joint_same_witness_carrier_pair_rule_derivation_present",
    required_evidence:
      "A proof-grade derivation that the two introduced carrier fields occupy one same-packet witness object.",
  },
  {
    burden_id: "derivation_soundness_bridge",
    missing_field: "derivation_soundness_bridge_present",
    required_evidence:
      "A soundness bridge showing that the derivations preserve non-domain carrier membership and reject source-handle promotion.",
  },
  {
    burden_id: "source_handle_non_promotion_guard",
    missing_field: "source_handle_non_promotion_guard_proven",
    required_evidence:
      "A proof, not only a route decision, that source handles and contract targets cannot be promoted to carrier rules without the derivation layer.",
  },
  {
    burden_id: "ref_carrier_rule_derivation",
    missing_field: "ref_carrier_rule_derivation_present",
    required_evidence:
      "The derived ref carrier-introduction rule marked present after the contract-to-rule derivation and soundness bridge exist.",
  },
  {
    burden_id: "value_map_carrier_rule_derivation",
    missing_field: "value_map_carrier_rule_derivation_present",
    required_evidence:
      "The derived value-map carrier-introduction rule marked present after the contract-to-rule derivation and soundness bridge exist.",
  },
  {
    burden_id: "ref_value_pair_rule_derivation",
    missing_field: "ref_value_pair_rule_derivation_present",
    required_evidence:
      "The derived joint ref/value carrier-pair rule marked present after the same-witness-object derivation and soundness bridge exist.",
  },
];

function parseArgs(argv) {
  const args = {
    ruleTheoremPacket: DEFAULT_RULE_THEOREM_PACKET,
    carrierRuleTargetPacket: DEFAULT_CARRIER_RULE_TARGET_PACKET,
    routeDecisionPacket: DEFAULT_ROUTE_DECISION_PACKET,
    fullBindingContractTargetPacket: DEFAULT_FULL_BINDING_CONTRACT_TARGET_PACKET,
    primitiveRuleWitnessPacket: DEFAULT_PRIMITIVE_RULE_WITNESS_PACKET,
    refPacket: DEFAULT_REF_PACKET,
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    bindingCarrierAdmissionPacket: DEFAULT_BINDING_CARRIER_ADMISSION_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--rule-theorem-packet") {
      args.ruleTheoremPacket = argv[++index];
    } else if (arg === "--carrier-rule-target-packet") {
      args.carrierRuleTargetPacket = argv[++index];
    } else if (arg === "--route-decision-packet") {
      args.routeDecisionPacket = argv[++index];
    } else if (arg === "--full-binding-contract-target-packet") {
      args.fullBindingContractTargetPacket = argv[++index];
    } else if (arg === "--primitive-rule-witness-packet") {
      args.primitiveRuleWitnessPacket = argv[++index];
    } else if (arg === "--ref-packet") {
      args.refPacket = argv[++index];
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-rule-derivation-attempt.mjs [options]",
    "",
    "Options:",
    "  --rule-theorem-packet <path>",
    "  --carrier-rule-target-packet <path>",
    "  --route-decision-packet <path>",
    "  --full-binding-contract-target-packet <path>",
    "  --primitive-rule-witness-packet <path>",
    "  --ref-packet <path>",
    "  --value-map-packet <path>",
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
    throw new Error(`Refusing derivation attempt from authorized ${label}.`);
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

function routeAttempt(route, fields) {
  const missingFields = missing(fields, route.required_fields);
  return {
    ...route,
    missing_fields: missingFields,
    passed: false,
  };
}

function missingBurdens(fields) {
  return PROOF_BURDENS.filter((burden) => fields[burden.missing_field] !== true)
    .map((burden) => ({ ...burden, satisfied: false }));
}

function buildEndpointAttempt({
  ruleTheorem,
  carrierTarget,
  routeDecision,
  contractTarget,
  primitive,
  ref,
  valueMap,
  bindingCarrierAdmission,
}) {
  assertSameEndpoint(carrierTarget, ruleTheorem, "rule theorem");
  assertSameEndpoint(carrierTarget, routeDecision, "route decision");
  assertSameEndpoint(carrierTarget, contractTarget, "full binding contract target");
  assertSameEndpoint(carrierTarget, primitive, "primitive rule/witness");
  assertSameEndpoint(carrierTarget, ref, "endpoint-boundary-binding ref");
  assertSameEndpoint(carrierTarget, valueMap, "endpoint value-binding map");
  assertSameEndpoint(
    carrierTarget,
    bindingCarrierAdmission,
    "binding/carrier-admission"
  );

  const theoremFields = ruleTheorem.required_fields_present ?? {};
  const carrierFields = carrierTarget.required_fields_present ?? {};
  const routeFields = routeDecision.required_fields_present ?? {};

  const fields = {
    ref_contract_root_ready:
      req(ref, "witness_object_endpoint_boundary_binding_ref_constructed") &&
      req(ref, "witness_object_has_endpoint_boundary_binding_ref") &&
      req(ref, "endpoint_boundary_binding_ref_targets_first_primitive") &&
      req(ref, "endpoint_boundary_binding_ref_target_attachment_certified"),
    value_map_contract_root_ready:
      req(valueMap, "endpoint_value_binding_map_constructed") &&
      req(valueMap, "witness_object_has_endpoint_value_binding_map") &&
      req(valueMap, "endpoint_value_bound_to_boundary_binding") &&
      req(valueMap, "endpoint_value_binding_map_targets_first_primitive") &&
      req(valueMap, "endpoint_value_binding_map_ref_values_certified"),
    joint_same_witness_carrier_pair_rule_root_ready:
      carrierFields.ref_value_carrier_pair_rule_target_declared === true &&
      carrierFields.same_packet_identity_target_present === true &&
      carrierFields.non_domain_carrier_obstruction_present === true &&
      (routeFields.direct_source_promotion_rejected === true ||
        theoremFields.direct_source_promotion_rejected === true),
    full_binding_contract_target_declared:
      req(contractTarget, "full_endpoint_boundary_binding_contract_target_declared") &&
      req(contractTarget, "binding_contract_target_declared"),
    primitive_construction_rule_applied:
      req(primitive, "primitive_construction_rule_applied"),
    primitive_binding_witness_record_constructed:
      req(primitive, "primitive_binding_witness_record_constructed"),
    direct_source_promotion_rejected:
      routeFields.direct_source_promotion_rejected === true ||
      theoremFields.direct_source_promotion_rejected === true,
    carrier_admission_route_selected:
      routeFields.carrier_admission_route_selected === true ||
      theoremFields.carrier_admission_route_selected === true,
    binding_contract_satisfied:
      req(bindingCarrierAdmission, "binding_contract_satisfied"),
    full_endpoint_boundary_binding_constructed:
      req(bindingCarrierAdmission, "full_endpoint_boundary_binding_constructed"),
    endpoint_boundary_binding_ref_carrier_unblocked:
      req(bindingCarrierAdmission, "endpoint_boundary_binding_ref_carrier_unblocked"),
    endpoint_value_binding_map_carrier_unblocked:
      req(bindingCarrierAdmission, "endpoint_value_binding_map_carrier_unblocked"),
    ref_carrier_rule_derivation_target_declared:
      carrierFields.ref_carrier_introduction_rule_target_declared === true &&
      theoremFields.ref_carrier_rule_theorem_target_declared === true,
    value_map_carrier_rule_derivation_target_declared:
      carrierFields.value_map_carrier_introduction_rule_target_declared === true &&
      theoremFields.value_map_carrier_rule_theorem_target_declared === true,
    joint_same_witness_carrier_pair_rule_derivation_target_declared:
      carrierFields.ref_value_carrier_pair_rule_target_declared === true &&
      theoremFields.ref_value_pair_rule_theorem_target_declared === true,
    ref_contract_to_ref_carrier_rule_derivation_present: false,
    value_map_contract_to_value_map_carrier_rule_derivation_present: false,
    joint_same_witness_carrier_pair_rule_derivation_present: false,
    derivation_soundness_bridge_present: false,
    source_handle_non_promotion_guard_proven: false,
    ref_carrier_rule_derivation_present: false,
    value_map_carrier_rule_derivation_present: false,
    ref_value_pair_rule_derivation_present: false,
    carrier_rule_soundness_proof_present: false,
    carrier_rule_application_proof_present: false,
    ref_carrier_introduction_rule_available: false,
    value_map_carrier_introduction_rule_available: false,
    ref_value_carrier_pair_rule_available: false,
    carrier_introduction_rule_theorem_bundle_present: false,
    same_packet_ref_carrier_field_constructed: false,
    same_packet_value_map_carrier_field_constructed: false,
    ref_value_carrier_fields_same_witness_object_proven: false,
    ref_value_non_domain_carrier_pair_constructed: false,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };
  fields.source_derivation_premise_set_ready =
    fields.ref_contract_root_ready &&
    fields.value_map_contract_root_ready &&
    fields.joint_same_witness_carrier_pair_rule_root_ready &&
    fields.full_binding_contract_target_declared &&
    fields.primitive_construction_rule_applied &&
    fields.primitive_binding_witness_record_constructed &&
    fields.direct_source_promotion_rejected &&
    fields.carrier_admission_route_selected;
  fields.derivation_targets_declared =
    fields.ref_carrier_rule_derivation_target_declared &&
    fields.value_map_carrier_rule_derivation_target_declared &&
    fields.joint_same_witness_carrier_pair_rule_derivation_target_declared;

  const routeAttempts = DERIVATION_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);
  const firstExactBlocker = missingProofBurdens[0]?.missing_field ?? "none";

  return {
    id: carrierTarget.id,
    endpoint_functional_id: carrierTarget.endpoint_functional_id,
    role: carrierTarget.role,
    carrier_introduction_rule_derivation_attempt_id:
      `carrier_introduction_rule_derivation_attempt:${carrierTarget.id}`,
    source_attempt_ids: {
      ref_value_carrier_introduction_rule_theorem_attempt:
        ruleTheorem.carrier_introduction_rule_theorem_attempt_id,
      ref_value_non_domain_carrier_rule_target:
        carrierTarget.ref_value_non_domain_carrier_rule_target_id,
      ref_value_carrier_introduction_route_decision:
        routeDecision.route_decision_id,
      full_endpoint_boundary_binding_contract_target:
        contractTarget.full_endpoint_boundary_binding_contract_target,
      primitive_rule_witness_record:
        primitive.primitive_rule_witness_record_construction_attempt_id,
      endpoint_boundary_binding_ref:
        ref.ref_carrier_full_binding_construction_attempt_id,
      endpoint_value_binding_map:
        valueMap.endpoint_value_binding_map_construction_attempt_id,
      binding_contract_full_binding_carrier_admission:
        bindingCarrierAdmission.binding_contract_full_binding_carrier_admission_attempt_id,
    },
    theorem_target: {
      theorem_id: `carrier_introduction_rule_derivation:${carrierTarget.id}`,
      statement:
        "Derive the endpoint-boundary-binding ref carrier-introduction rule, endpoint value-binding map carrier-introduction rule, and joint same-witness ref/value carrier-pair rule from the existing contracts.",
      accepted_if:
        "The ref contract-to-rule derivation, value-map contract-to-rule derivation, joint same-witness derivation, and derivation soundness bridge are all present for this endpoint.",
      no_promotion_guard:
        "Constructed refs, value maps, primitive witness records, and selected carrier-admission route decisions are derivation premises, not carrier-introduction rule derivations.",
    },
    route_attempts: routeAttempts,
    derivation_routes_passed:
      routeAttempts.filter((route) => route.passed).map((route) => route.route_id),
    required_fields_present: fields,
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blocker: firstExactBlocker,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has contract premises, primitive witness records, and derivation targets, but no contract-to-rule derivation, joint same-witness derivation, or derivation soundness bridge.",
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
    source_derivation_premise_set_ready:
      sourceFields.source_derivation_premise_set_ready,
    receiver_derivation_premise_set_ready:
      receiverFields.source_derivation_premise_set_ready,
    combined_derivation_premise_set_ready: false,
    source_derivation_targets_declared: sourceFields.derivation_targets_declared,
    receiver_derivation_targets_declared:
      receiverFields.derivation_targets_declared,
    combined_derivation_targets_declared: false,
    source_ref_contract_to_ref_carrier_rule_derivation_present:
      sourceFields.ref_contract_to_ref_carrier_rule_derivation_present,
    receiver_ref_contract_to_ref_carrier_rule_derivation_present:
      receiverFields.ref_contract_to_ref_carrier_rule_derivation_present,
    combined_ref_contract_to_ref_carrier_rule_derivation_present: false,
    source_value_map_contract_to_value_map_carrier_rule_derivation_present:
      sourceFields.value_map_contract_to_value_map_carrier_rule_derivation_present,
    receiver_value_map_contract_to_value_map_carrier_rule_derivation_present:
      receiverFields.value_map_contract_to_value_map_carrier_rule_derivation_present,
    combined_value_map_contract_to_value_map_carrier_rule_derivation_present:
      false,
    source_joint_same_witness_carrier_pair_rule_derivation_present:
      sourceFields.joint_same_witness_carrier_pair_rule_derivation_present,
    receiver_joint_same_witness_carrier_pair_rule_derivation_present:
      receiverFields.joint_same_witness_carrier_pair_rule_derivation_present,
    combined_joint_same_witness_carrier_pair_rule_derivation_present: false,
    source_derivation_soundness_bridge_present:
      sourceFields.derivation_soundness_bridge_present,
    receiver_derivation_soundness_bridge_present:
      receiverFields.derivation_soundness_bridge_present,
    combined_derivation_soundness_bridge_present: false,
    source_rule_derivation_present:
      sourceFields.ref_carrier_rule_derivation_present &&
      sourceFields.value_map_carrier_rule_derivation_present &&
      sourceFields.ref_value_pair_rule_derivation_present,
    receiver_rule_derivation_present:
      receiverFields.ref_carrier_rule_derivation_present &&
      receiverFields.value_map_carrier_rule_derivation_present &&
      receiverFields.ref_value_pair_rule_derivation_present,
    combined_rule_derivation_present: false,
    source_rule_bundle_present:
      sourceFields.carrier_introduction_rule_theorem_bundle_present,
    receiver_rule_bundle_present:
      receiverFields.carrier_introduction_rule_theorem_bundle_present,
    combined_rule_bundle_present: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_derivation_premise_set_ready =
    fields.source_derivation_premise_set_ready &&
    fields.receiver_derivation_premise_set_ready;
  fields.combined_derivation_targets_declared =
    fields.source_derivation_targets_declared &&
    fields.receiver_derivation_targets_declared;
  fields.combined_ref_contract_to_ref_carrier_rule_derivation_present =
    fields.source_ref_contract_to_ref_carrier_rule_derivation_present &&
    fields.receiver_ref_contract_to_ref_carrier_rule_derivation_present;
  fields.combined_value_map_contract_to_value_map_carrier_rule_derivation_present =
    fields.source_value_map_contract_to_value_map_carrier_rule_derivation_present &&
    fields.receiver_value_map_contract_to_value_map_carrier_rule_derivation_present;
  fields.combined_joint_same_witness_carrier_pair_rule_derivation_present =
    fields.source_joint_same_witness_carrier_pair_rule_derivation_present &&
    fields.receiver_joint_same_witness_carrier_pair_rule_derivation_present;
  fields.combined_derivation_soundness_bridge_present =
    fields.source_derivation_soundness_bridge_present &&
    fields.receiver_derivation_soundness_bridge_present;
  fields.combined_rule_derivation_present =
    fields.source_rule_derivation_present &&
    fields.receiver_rule_derivation_present;
  fields.combined_rule_bundle_present =
    fields.source_rule_bundle_present && fields.receiver_rule_bundle_present;

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
    source_carrier_introduction_rule_derivation_attempt_id:
      source.carrier_introduction_rule_derivation_attempt_id,
    receiver_carrier_introduction_rule_derivation_attempt_id:
      receiver.carrier_introduction_rule_derivation_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver derivation premises and derivation targets, but neither endpoint has the contract-to-rule derivations, same-witness derivation, or soundness bridge.",
  };
}

function assertSources(sources) {
  assertPacket(sources.ruleTheorem, RULE_THEOREM_STATUS, "rule theorem");
  assertPacket(
    sources.carrierRuleTarget,
    CARRIER_RULE_TARGET_STATUS,
    "carrier rule target"
  );
  assertPacket(sources.routeDecision, ROUTE_DECISION_STATUS, "route decision");
  assertPacket(
    sources.fullBindingContractTarget,
    FULL_BINDING_CONTRACT_TARGET_STATUS,
    "full binding contract target"
  );
  assertPacket(
    sources.primitiveRuleWitness,
    PRIMITIVE_RULE_WITNESS_STATUS,
    "primitive rule/witness"
  );
  assertPacket(sources.ref, REF_STATUS, "ref packet");
  assertPacket(sources.valueMap, VALUE_MAP_STATUS, "value-map packet");
  assertPacket(
    sources.bindingCarrierAdmission,
    BINDING_CARRIER_ADMISSION_STATUS,
    "binding/carrier-admission packet"
  );
}

function buildPacket(sources, sourcePaths) {
  assertSources(sources);
  const ruleTheoremById = idMap(
    sources.ruleTheorem
      .endpoint_ref_value_carrier_introduction_rule_theorem_attempts,
    "id",
    "rule theorem endpoint"
  );
  const routeById = idMap(
    sources.routeDecision.endpoint_ref_value_carrier_introduction_route_decisions,
    "id",
    "route decision endpoint"
  );
  const contractById = idMap(
    sources.fullBindingContractTarget.endpoint_full_boundary_binding_contract_targets,
    "id",
    "full binding contract target endpoint"
  );
  const primitiveById = idMap(
    sources.primitiveRuleWitness
      .endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts,
    "id",
    "primitive rule/witness endpoint"
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
  const bindingAdmissionById = idMap(
    sources.bindingCarrierAdmission
      .endpoint_binding_contract_full_binding_carrier_admission_attempts,
    "id",
    "binding/carrier-admission endpoint"
  );

  const endpointAttempts =
    sources.carrierRuleTarget.endpoint_ref_value_non_domain_carrier_rule_targets.map(
      (carrierTarget) =>
        buildEndpointAttempt({
          carrierTarget,
          ruleTheorem: requireMapped(
            ruleTheoremById,
            carrierTarget.id,
            `rule theorem endpoint ${carrierTarget.id}`
          ),
          routeDecision: requireMapped(
            routeById,
            carrierTarget.id,
            `route decision endpoint ${carrierTarget.id}`
          ),
          contractTarget: requireMapped(
            contractById,
            carrierTarget.id,
            `contract target endpoint ${carrierTarget.id}`
          ),
          primitive: requireMapped(
            primitiveById,
            carrierTarget.id,
            `primitive endpoint ${carrierTarget.id}`
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
          bindingCarrierAdmission: requireMapped(
            bindingAdmissionById,
            carrierTarget.id,
            `binding/admission endpoint ${carrierTarget.id}`
          ),
        })
    );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "carrier-introduction rule derivation endpoint"
  );
  const rowAttempts =
    sources.carrierRuleTarget.row_ref_value_non_domain_carrier_rule_targets.map(
      (row) => buildRowAttempt(row, endpointMap)
    );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-rule-derivation-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed derivation attempt; contract premises and derivation targets are present but contract-to-rule derivations and joint same-witness derivation are absent",
    source_artifacts: [
      {
        label: "ref_value_carrier_introduction_rule_theorem_attempt",
        ...artifactRecord(sourcePaths.ruleTheorem),
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
        label: "full_endpoint_boundary_binding_contract_target",
        ...artifactRecord(sourcePaths.fullBindingContractTarget),
      },
      {
        label: "endpoint_boundary_binding_primitive_rule_witness_record",
        ...artifactRecord(sourcePaths.primitiveRuleWitness),
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
        label: "binding_contract_full_binding_carrier_admission_attempt",
        ...artifactRecord(sourcePaths.bindingCarrierAdmission),
      },
    ],
    theorem_target: {
      theorem_id: "ref-value-carrier-introduction-rule-derivation-target",
      statement:
        "Derive the ref carrier-introduction rule, value-map carrier-introduction rule, and joint same-witness ref/value carrier-pair rule from the existing endpoint-boundary-binding and value-map contracts.",
      accepted_as_first_blocker_discharge_if:
        "Every endpoint has the ref contract-to-rule derivation, value-map contract-to-rule derivation, joint same-witness derivation, and derivation soundness bridge present.",
      first_exact_blocker:
        "ref_contract_to_ref_carrier_rule_derivation_present, value_map_contract_to_value_map_carrier_rule_derivation_present, and joint_same_witness_carrier_pair_rule_derivation_present",
    },
    no_promotion_rule:
      "Contract targets, constructed refs, value maps, primitive rule/witness records, and selected carrier-admission routes are premises for derivation attempts; they do not derive carrier-introduction rules without an explicit proof.",
    derivation_roots: DERIVATION_ROOTS,
    proof_burdens: PROOF_BURDENS,
    derivation_routes: DERIVATION_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_ref_value_carrier_introduction_rule_derivation_attempts:
      endpointAttempts,
    row_ref_value_carrier_introduction_rule_derivation_attempts: rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      derivation_premise_sets_ready:
        endpointFieldCounts.source_derivation_premise_set_ready,
      ref_contract_roots_ready: endpointFieldCounts.ref_contract_root_ready,
      value_map_contract_roots_ready:
        endpointFieldCounts.value_map_contract_root_ready,
      joint_same_witness_carrier_pair_rule_roots_ready:
        endpointFieldCounts.joint_same_witness_carrier_pair_rule_root_ready,
      full_binding_contract_targets_declared:
        endpointFieldCounts.full_binding_contract_target_declared,
      primitive_rule_witness_records_constructed:
        endpointFieldCounts.primitive_binding_witness_record_constructed,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      carrier_admission_routes_selected:
        endpointFieldCounts.carrier_admission_route_selected,
      binding_contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      ref_derivation_targets_declared:
        endpointFieldCounts.ref_carrier_rule_derivation_target_declared,
      value_map_derivation_targets_declared:
        endpointFieldCounts.value_map_carrier_rule_derivation_target_declared,
      joint_derivation_targets_declared:
        endpointFieldCounts
          .joint_same_witness_carrier_pair_rule_derivation_target_declared,
      ref_contract_to_ref_carrier_rule_derivations_present:
        endpointFieldCounts.ref_contract_to_ref_carrier_rule_derivation_present,
      value_map_contract_to_value_map_carrier_rule_derivations_present:
        endpointFieldCounts
          .value_map_contract_to_value_map_carrier_rule_derivation_present,
      joint_same_witness_carrier_pair_rule_derivations_present:
        endpointFieldCounts
          .joint_same_witness_carrier_pair_rule_derivation_present,
      carrier_rule_derivation_bundles_present:
        endpointAttempts.filter((attempt) => {
          const fields = attempt.required_fields_present;
          return (
            fields.ref_carrier_rule_derivation_present &&
            fields.value_map_carrier_rule_derivation_present &&
            fields.ref_value_pair_rule_derivation_present
          );
        }).length,
      derivation_soundness_bridges_present:
        endpointFieldCounts.derivation_soundness_bridge_present,
      source_handle_non_promotion_guards_proven:
        endpointFieldCounts.source_handle_non_promotion_guard_proven,
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
      carrier_introduction_rule_theorem_bundles_present:
        endpointFieldCounts.carrier_introduction_rule_theorem_bundle_present,
      ref_value_non_domain_carrier_pairs_constructed:
        endpointFieldCounts.ref_value_non_domain_carrier_pair_constructed,
      row_derivation_premise_sets_ready:
        rowFieldCounts.combined_derivation_premise_set_ready,
      row_derivation_target_pairs_declared:
        rowFieldCounts.combined_derivation_targets_declared,
      row_ref_contract_to_ref_carrier_rule_derivation_pairs_present:
        rowFieldCounts
          .combined_ref_contract_to_ref_carrier_rule_derivation_present,
      row_value_map_contract_to_value_map_carrier_rule_derivation_pairs_present:
        rowFieldCounts
          .combined_value_map_contract_to_value_map_carrier_rule_derivation_present,
      row_joint_same_witness_carrier_pair_rule_derivation_pairs_present:
        rowFieldCounts
          .combined_joint_same_witness_carrier_pair_rule_derivation_present,
      row_derivation_soundness_bridge_pairs_present:
        rowFieldCounts.combined_derivation_soundness_bridge_present,
      row_rule_derivation_pairs_present:
        rowFieldCounts.combined_rule_derivation_present,
      row_rule_bundle_pairs_present:
        rowFieldCounts.combined_rule_bundle_present,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint has contract-to-rule derivations, a joint same-witness derivation, a derivation soundness bridge, available carrier rules, or constructed carrier-pair data.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed carrier-introduction rule derivation attempt and does not promote to reader-facing corpus prose.",
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

function derivationRootTable(roots) {
  return roots
    .map(
      (root) =>
        `| ${root.root_id} | ${root.source_artifact} | ${root.source_fields.join(", ")} | ${root.intended_derivation} |`
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.source_derivation_premise_set_ready} | ${fields.derivation_targets_declared} | ${fields.ref_contract_to_ref_carrier_rule_derivation_present} | ${fields.value_map_contract_to_value_map_carrier_rule_derivation_present} | ${fields.joint_same_witness_carrier_pair_rule_derivation_present} | ${fields.derivation_soundness_bridge_present} | ${fields.ref_carrier_rule_derivation_present} | ${fields.value_map_carrier_rule_derivation_present} | ${fields.ref_value_pair_rule_derivation_present} | ${endpoint.first_exact_blocker} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_derivation_premise_set_ready} | ${fields.combined_derivation_targets_declared} | ${fields.combined_ref_contract_to_ref_carrier_rule_derivation_present} | ${fields.combined_value_map_contract_to_value_map_carrier_rule_derivation_present} | ${fields.combined_joint_same_witness_carrier_pair_rule_derivation_present} | ${fields.combined_derivation_soundness_bridge_present} | ${fields.combined_rule_derivation_present} | ${row.row_consumed} |`;
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
  return `# Ref/Value Carrier-Introduction Rule Derivation Attempt

## Verdict

Status: ${packet.status}

This priority-only packet lowers the carrier-introduction rule theorem blocker
to the derivation layer. It asks whether the existing endpoint-boundary-binding
ref contract, endpoint value-binding map contract, primitive rule/witness
record, and selected carrier-admission route already derive the three
carrier-introduction rules.

The attempt remains fail-closed. It records ${summary.derivation_premise_sets_ready} / ${summary.endpoint_functionals}
derivation premise sets, ${summary.ref_derivation_targets_declared} / ${summary.endpoint_functionals}
ref derivation targets, ${summary.value_map_derivation_targets_declared} / ${summary.endpoint_functionals}
value-map derivation targets, and ${summary.joint_derivation_targets_declared} / ${summary.endpoint_functionals}
joint same-witness derivation targets. It records ${summary.ref_contract_to_ref_carrier_rule_derivations_present} / ${summary.endpoint_functionals}
ref contract-to-ref-carrier rule derivations, ${summary.value_map_contract_to_value_map_carrier_rule_derivations_present} / ${summary.endpoint_functionals}
value-map contract-to-value-map-carrier rule derivations, ${summary.joint_same_witness_carrier_pair_rule_derivations_present} / ${summary.endpoint_functionals}
joint same-witness derivations, ${summary.derivation_soundness_bridges_present} / ${summary.endpoint_functionals}
derivation soundness bridges, and ${summary.carrier_introduction_rule_theorem_bundles_present} / ${summary.endpoint_functionals}
complete rule-theorem bundles. It consumes ${summary.row_consumption_count}
rows and authorizes no branch chart.

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

## Derivation Roots

| Root | Source artifact | Source fields | Intended derivation |
| --- | --- | --- | --- |
${derivationRootTable(packet.derivation_roots)}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.derivation_routes)}

## Endpoint Attempts

| Endpoint | Role | Premises | Targets | Ref derivation | Value derivation | Joint derivation | Soundness bridge | Ref rule derivation | Value rule derivation | Pair rule derivation | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_ref_value_carrier_introduction_rule_derivation_attempts)}

## Row Attempts

| Row | Premises | Targets | Ref derivation pair | Value derivation pair | Joint derivation pair | Soundness pair | Rule derivation pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_ref_value_carrier_introduction_rule_derivation_attempts)}

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
    ruleTheorem: readJson(args.ruleTheoremPacket),
    carrierRuleTarget: readJson(args.carrierRuleTargetPacket),
    routeDecision: readJson(args.routeDecisionPacket),
    fullBindingContractTarget: readJson(args.fullBindingContractTargetPacket),
    primitiveRuleWitness: readJson(args.primitiveRuleWitnessPacket),
    ref: readJson(args.refPacket),
    valueMap: readJson(args.valueMapPacket),
    bindingCarrierAdmission: readJson(args.bindingCarrierAdmissionPacket),
  };
  const sourcePaths = {
    ruleTheorem: args.ruleTheoremPacket,
    carrierRuleTarget: args.carrierRuleTargetPacket,
    routeDecision: args.routeDecisionPacket,
    fullBindingContractTarget: args.fullBindingContractTargetPacket,
    primitiveRuleWitness: args.primitiveRuleWitnessPacket,
    ref: args.refPacket,
    valueMap: args.valueMapPacket,
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

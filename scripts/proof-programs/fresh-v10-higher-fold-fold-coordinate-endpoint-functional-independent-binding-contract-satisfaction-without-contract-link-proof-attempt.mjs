#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_NO_CONTRACT_LINK_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPLETION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_full_binding_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DEPENDENCY_CYCLE_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_actual_link_membership_dependency_cycle_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ROUTE_DECISION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_LINK_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_witness_object_contract_link_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_binding_contract_satisfaction_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_binding_contract_satisfaction_without_contract_link_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const NO_CONTRACT_LINK_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-full-endpoint-boundary-binding-no-contract-link-premise-proof-attempt-fail-closed-selected-route-inputs-present-no-contract-link-premise-proof-absent-no-row-consumption";
const COMPLETION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-full-binding-completion-attempt-fail-closed-source-candidates-and-route-tests-present-actual-link-membership-binding-full-binding-carrier-admission-absent-no-row-consumption";
const DEPENDENCY_CYCLE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-link-membership-dependency-cycle-completion-attempt-fail-closed-cycle-detected-proof-grade-escape-routes-absent-no-row-consumption";
const BINDING_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-fail-closed-value-maps-inherited-contract-full-binding-carrier-admission-absent-no-row-consumption";
const ROUTE_DECISION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision-fail-closed-direct-source-promotion-rejected-carrier-admission-route-selected-no-row-consumption";
const CONTRACT_TARGET_STATUS =
  "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";
const CONTRACT_LINK_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-witness-object-contract-link-construction-attempt-fail-closed-contract-link-source-candidates-present-witness-object-contract-links-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-binding-contract-satisfaction-without-contract-link-proof-attempt-fail-closed-source-readiness-present-binding-contract-satisfaction-without-contract-link-absent-no-row-consumption";

const SOURCE_INPUT_FIELDS = [
  "no_contract_link_premise_packet_input_present",
  "allowed_no_contract_link_source_inputs_ready",
  "endpoint_value_binding_map_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "endpoint_value_binding_map_ref_values_certified",
  "binding_contract_target_ref_inherited",
  "binding_contract_target_declared",
  "binding_contract_satisfaction_test_applied",
  "selected_route_inputs_ready",
  "dependency_cycle_detected",
  "dependency_cycle_escape_route_declared",
  "direct_source_promotion_rejected",
  "witness_object_contract_link_source_candidate_recorded",
];

const INPUT_FIELDS = [
  ...SOURCE_INPUT_FIELDS,
  "binding_contract_without_contract_link_source_inputs_ready",
];

const LINK_DEPENDENCY_FIELDS = [
  "selected_route_requires_witness_object_contract_link",
  "ordinary_binding_contract_requires_witness_object_contract_link",
  "selected_route_requires_binding_contract_satisfaction",
  "actual_link_membership_theorem_named_as_completion_layer",
  "witness_object_contract_link_source_candidate_recorded_not_link",
  "witness_object_contract_link_constructed",
  "witness_object_has_contract_link",
  "binding_contract_satisfied",
  "selected_route_contract_link_dependency_eliminated",
];

const SOURCE_PROOF_BLOCKER_FIELDS = [
  "source_contract_target_satisfaction_proof_present",
  "source_target_ref_value_equations_proof_grade",
  "source_endpoint_boundary_binding_ref_compatibility_proof_present",
  "source_first_primitive_compatibility_proof_present",
];

const WITHOUT_CONTRACT_LINK_CONTRACT_FIELDS = [
  "independent_contract_target_satisfaction_without_contract_link_proof_present",
  "independent_target_ref_value_equations_without_contract_link_proof_grade",
  "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
  "independent_first_primitive_compatibility_without_contract_link_present",
  "independent_binding_contract_satisfaction_derivation_without_contract_link_present",
  "independent_binding_contract_satisfaction_soundness_without_contract_link_present",
  "independent_binding_contract_satisfaction_endpoint_application_without_contract_link_present",
  "independent_binding_contract_satisfaction_without_contract_link_present",
  "binding_contract_without_contract_link_route_available",
];

const DOWNSTREAM_FIELDS = [
  "independent_no_contract_link_premise_proof_present",
  "independent_full_binding_not_using_witness_object_contract_link_as_premise_proven",
  "independent_carrier_admission_bridge_present",
  "independent_no_contract_link_route_available",
  "independent_full_endpoint_boundary_binding_theorem_present",
  "full_binding_packet_full_endpoint_boundary_binding_constructed",
  "carrier_field_layer_full_endpoint_boundary_binding_constructed",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...INPUT_FIELDS,
  ...LINK_DEPENDENCY_FIELDS,
  ...SOURCE_PROOF_BLOCKER_FIELDS,
  ...WITHOUT_CONTRACT_LINK_CONTRACT_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_binding_contract_without_contract_link_source_inputs_ready",
  "receiver_binding_contract_without_contract_link_source_inputs_ready",
  "combined_binding_contract_without_contract_link_source_inputs_ready",
  "source_binding_contract_target_declared",
  "receiver_binding_contract_target_declared",
  "combined_binding_contract_target_pair_declared",
  "source_value_map_constructed",
  "receiver_value_map_constructed",
  "combined_value_map_pair_constructed",
  "source_binding_contract_satisfaction_test_applied",
  "receiver_binding_contract_satisfaction_test_applied",
  "combined_binding_contract_satisfaction_test_pair_applied",
  "source_selected_route_requires_contract_link",
  "receiver_selected_route_requires_contract_link",
  "combined_selected_route_contract_link_requirement_pair",
  "source_binding_contract_without_contract_link_satisfied",
  "receiver_binding_contract_without_contract_link_satisfied",
  "combined_binding_contract_without_contract_link_pair_satisfied",
  "source_contract_link_dependency_eliminated",
  "receiver_contract_link_dependency_eliminated",
  "combined_contract_link_dependency_eliminated",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CONTRACT_PROOF_ROUTES = [
  {
    route_id: "selected_route_binding_contract_without_contract_link",
    status: "blocked-cyclic-premise",
    required_fields: [
      "selected_route_inputs_ready",
      "selected_route_contract_link_dependency_eliminated",
      "independent_binding_contract_satisfaction_without_contract_link_present",
    ],
    limitation:
      "The selected route is input-ready, but its completion still requires `witness_object_has_contract_link`.",
  },
  {
    route_id: "binding_contract_target_as_satisfaction_proof",
    status: "rejected-target-only",
    required_fields: [
      "binding_contract_target_declared",
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
      "independent_binding_contract_satisfaction_without_contract_link_present",
    ],
    limitation:
      "A declared binding-contract target is an obligation, not proof of satisfaction without the link premise.",
  },
  {
    route_id: "endpoint_value_map_as_satisfaction_proof",
    status: "rejected-source-only",
    required_fields: [
      "endpoint_value_binding_map_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
      "independent_binding_contract_satisfaction_without_contract_link_present",
    ],
    limitation:
      "Constructed value maps and source equations are not proof-grade target satisfaction or binding-contract satisfaction.",
  },
  {
    route_id: "contract_link_source_candidate_as_without_contract_link_contract_proof",
    status: "rejected-source-candidate-only",
    required_fields: [
      "witness_object_contract_link_source_candidate_recorded",
      "witness_object_contract_link_constructed",
      "independent_binding_contract_satisfaction_without_contract_link_present",
    ],
    limitation:
      "A contract-link source candidate is neither an actual link nor a proof that the binding contract is satisfied without the link.",
  },
  {
    route_id: "no_contract_link_premise_packet_as_binding_contract_proof",
    status: "rejected-missing-burden-only",
    required_fields: [
      "allowed_no_contract_link_source_inputs_ready",
      "independent_no_contract_link_premise_proof_present",
      "independent_binding_contract_satisfaction_without_contract_link_present",
    ],
    limitation:
      "The no-contract-link premise packet names the binding-contract-without-contract-link burden, but that burden is false for all endpoints.",
  },
  {
    route_id: "contract_target_satisfaction_without_contract_link_derivation_route",
    status: "absent",
    required_fields: [
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
      "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
      "independent_first_primitive_compatibility_without_contract_link_present",
      "independent_binding_contract_satisfaction_derivation_without_contract_link_present",
      "independent_binding_contract_satisfaction_soundness_without_contract_link_present",
      "independent_binding_contract_satisfaction_endpoint_application_without_contract_link_present",
      "independent_binding_contract_satisfaction_without_contract_link_present",
    ],
    limitation:
      "No independent derivation, soundness proof, endpoint application proof, target-satisfaction proof, or compatibility proof is present.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "independent_binding_contract_satisfaction_without_contract_link",
    missing_field:
      "independent_binding_contract_satisfaction_without_contract_link_present",
    required_evidence:
      "A proof that the binding contract is satisfied without importing `witness_object_has_contract_link`.",
  },
  {
    burden_id: "binding_contract_satisfaction_derivation_without_contract_link",
    missing_field:
      "independent_binding_contract_satisfaction_derivation_without_contract_link_present",
    required_evidence:
      "A derivation from the endpoint value map, contract target, target ref/value equations, and compatibility data that avoids the link premise.",
  },
  {
    burden_id: "binding_contract_satisfaction_soundness_without_contract_link",
    missing_field:
      "independent_binding_contract_satisfaction_soundness_without_contract_link_present",
    required_evidence:
      "A soundness proof that target declarations, value-map sources, and source candidates are not promoted into satisfaction.",
  },
  {
    burden_id: "binding_contract_satisfaction_endpoint_application_without_contract_link",
    missing_field:
      "independent_binding_contract_satisfaction_endpoint_application_without_contract_link_present",
    required_evidence:
      "Endpoint-by-endpoint application proof for all four endpoint functionals.",
  },
  {
    burden_id: "contract_target_satisfaction_without_contract_link",
    missing_field:
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
    required_evidence:
      "A proof that the endpoint value-binding map satisfies the inherited binding-contract target without the link premise.",
  },
  {
    burden_id: "target_ref_value_equations_without_contract_link",
    missing_field: "independent_target_ref_value_equations_without_contract_link_proof_grade",
    required_evidence:
      "Proof-grade target ref/value equations rather than source-equation-only records.",
  },
  {
    burden_id: "endpoint_boundary_binding_ref_compatibility_without_contract_link",
    missing_field:
      "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
    required_evidence:
      "Compatibility proof tying the endpoint-boundary-binding ref to the target without using the contract link.",
  },
  {
    burden_id: "first_primitive_compatibility_without_contract_link",
    missing_field:
      "independent_first_primitive_compatibility_without_contract_link_present",
    required_evidence:
      "Compatibility proof tying the first endpoint boundary-binding primitive to the value map and target without using the contract link.",
  },
  {
    burden_id: "selected_route_contract_link_dependency_elimination",
    missing_field: "selected_route_contract_link_dependency_eliminated",
    required_evidence:
      "A proof or route revision showing that the selected route no longer lists `witness_object_has_contract_link` as a completion premise.",
  },
];

function parseArgs(argv) {
  const args = {
    noContractLinkPacket: DEFAULT_NO_CONTRACT_LINK_PACKET,
    completionPacket: DEFAULT_COMPLETION_PACKET,
    dependencyCyclePacket: DEFAULT_DEPENDENCY_CYCLE_PACKET,
    bindingPacket: DEFAULT_BINDING_PACKET,
    routeDecisionPacket: DEFAULT_ROUTE_DECISION_PACKET,
    contractTargetPacket: DEFAULT_CONTRACT_TARGET_PACKET,
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    contractLinkPacket: DEFAULT_CONTRACT_LINK_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--no-contract-link-packet") {
      args.noContractLinkPacket = argv[++index];
    } else if (arg === "--completion-packet") {
      args.completionPacket = argv[++index];
    } else if (arg === "--dependency-cycle-packet") {
      args.dependencyCyclePacket = argv[++index];
    } else if (arg === "--binding-packet") {
      args.bindingPacket = argv[++index];
    } else if (arg === "--route-decision-packet") {
      args.routeDecisionPacket = argv[++index];
    } else if (arg === "--contract-target-packet") {
      args.contractTargetPacket = argv[++index];
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
    } else if (arg === "--contract-link-packet") {
      args.contractLinkPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-binding-contract-satisfaction-without-contract-link-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --no-contract-link-packet <path>",
    "  --completion-packet <path>",
    "  --dependency-cycle-packet <path>",
    "  --binding-packet <path>",
    "  --route-decision-packet <path>",
    "  --contract-target-packet <path>",
    "  --value-map-packet <path>",
    "  --contract-link-packet <path>",
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
    throw new Error(`Refusing proof attempt from authorized ${label}.`);
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

function makeSourceArtifacts(paths) {
  return paths.map(({ label, filePath }) => ({
    label,
    path: filePath,
    basename: path.basename(filePath),
    sha256: sha256File(filePath),
  }));
}

function hasEscapeRoute(cycle, routeId) {
  return (cycle.escape_route_candidates ?? []).some(
    (route) => route.route_id === routeId
  );
}

function selectedRouteMissing(routeDecision) {
  return routeDecision.carrier_admission_route?.missing_completion_fields ?? [];
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

function buildEndpointAttempt({
  noContractLink,
  completion,
  cycle,
  binding,
  routeDecision,
  contractTarget,
  valueMap,
  contractLink,
}) {
  const noLinkFields = noContractLink.required_fields_present ?? {};
  const completionFields = completion.required_fields_present ?? {};
  const bindingFields = binding.required_fields_present ?? {};
  const routeFields = routeDecision.required_fields_present ?? {};
  const contractFields = contractTarget.required_fields_present ?? {};
  const valueFields = valueMap.required_fields_present ?? {};
  const linkFields = contractLink.required_fields_present ?? {};
  const routeMissing = selectedRouteMissing(routeDecision);

  const fields = {
    no_contract_link_premise_packet_input_present: true,
    allowed_no_contract_link_source_inputs_ready:
      noLinkFields.allowed_source_inputs_ready === true,
    endpoint_value_binding_map_constructed:
      valueFields.endpoint_value_binding_map_constructed === true &&
      bindingFields.endpoint_value_binding_map_constructed === true,
    endpoint_value_bound_to_boundary_binding:
      valueFields.endpoint_value_bound_to_boundary_binding === true &&
      bindingFields.endpoint_value_bound_to_boundary_binding === true,
    endpoint_value_binding_map_ref_values_certified:
      valueFields.endpoint_value_binding_map_ref_values_certified === true &&
      bindingFields.endpoint_value_binding_map_ref_values_certified === true,
    binding_contract_target_ref_inherited:
      bindingFields.binding_contract_target_ref_inherited === true &&
      completionFields.binding_contract_target_ref_inherited === true,
    binding_contract_target_declared:
      contractFields.binding_contract_target_declared === true,
    binding_contract_satisfaction_test_applied:
      bindingFields.binding_contract_satisfaction_test_applied === true &&
      completionFields.binding_contract_satisfaction_test_applied === true &&
      linkFields.binding_contract_satisfaction_test_applied === true,
    selected_route_inputs_ready:
      noLinkFields.selected_carrier_admission_route_inputs_ready === true &&
      completion.selected_route_input_ready === true &&
      routeDecision.carrier_admission_route?.inputs_ready === true,
    dependency_cycle_detected:
      noLinkFields.dependency_cycle_detected === true &&
      cycle.dependency_cycle_detected === true,
    dependency_cycle_escape_route_declared:
      noLinkFields.dependency_cycle_escape_route_declared === true &&
      hasEscapeRoute(cycle, "independent_full_endpoint_boundary_binding_theorem"),
    direct_source_promotion_rejected:
      noLinkFields.direct_source_promotion_rejected === true &&
      routeFields.direct_source_promotion_rejected === true,
    witness_object_contract_link_source_candidate_recorded:
      noLinkFields.witness_object_contract_link_source_candidate_recorded ===
        true &&
      linkFields.witness_object_contract_link_source_candidate_recorded === true,
    binding_contract_without_contract_link_source_inputs_ready: false,
    selected_route_requires_witness_object_contract_link:
      noLinkFields.selected_route_requires_witness_object_contract_link === true &&
      routeMissing.includes("witness_object_has_contract_link"),
    ordinary_binding_contract_requires_witness_object_contract_link:
      (binding.missing_contract_criteria ?? []).includes(
        "witness_object_has_contract_link"
      ),
    selected_route_requires_binding_contract_satisfaction:
      noLinkFields.selected_route_requires_binding_contract_satisfaction === true &&
      routeMissing.includes("binding_contract_satisfied"),
    actual_link_membership_theorem_named_as_completion_layer:
      noLinkFields.actual_link_membership_theorem_named_as_completion_layer ===
        true &&
      completion.first_missing_theorem_layer ===
        "actual-link-rule-plus-constructed-witness-object-membership",
    witness_object_contract_link_source_candidate_recorded_not_link:
      linkFields.witness_object_contract_link_source_candidate_recorded === true &&
      linkFields.witness_object_contract_link_constructed !== true,
    witness_object_contract_link_constructed:
      linkFields.witness_object_contract_link_constructed === true ||
      completionFields.witness_object_contract_link_constructed === true,
    witness_object_has_contract_link:
      linkFields.witness_object_has_contract_link === true ||
      bindingFields.witness_object_has_contract_link === true ||
      completionFields.witness_object_has_contract_link === true,
    binding_contract_satisfied:
      bindingFields.binding_contract_satisfied === true ||
      completionFields.binding_contract_satisfied === true ||
      contractFields.binding_contract_satisfied === true,
    selected_route_contract_link_dependency_eliminated:
      noLinkFields.selected_route_contract_link_dependency_eliminated === true,
    source_contract_target_satisfaction_proof_present:
      completionFields.contract_target_satisfaction_proof_present === true,
    source_target_ref_value_equations_proof_grade:
      completionFields.target_ref_value_equations_proof_grade === true,
    source_endpoint_boundary_binding_ref_compatibility_proof_present:
      completionFields.endpoint_boundary_binding_ref_compatibility_proof_present ===
      true,
    source_first_primitive_compatibility_proof_present:
      completionFields.first_primitive_compatibility_proof_present === true,
    independent_contract_target_satisfaction_without_contract_link_proof_present: false,
    independent_target_ref_value_equations_without_contract_link_proof_grade: false,
    independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present:
      false,
    independent_first_primitive_compatibility_without_contract_link_present: false,
    independent_binding_contract_satisfaction_derivation_without_contract_link_present:
      false,
    independent_binding_contract_satisfaction_soundness_without_contract_link_present:
      false,
    independent_binding_contract_satisfaction_endpoint_application_without_contract_link_present:
      false,
    independent_binding_contract_satisfaction_without_contract_link_present:
      false,
    binding_contract_without_contract_link_route_available: false,
    independent_no_contract_link_premise_proof_present:
      noLinkFields.independent_no_contract_link_premise_proof_present === true,
    independent_full_binding_not_using_witness_object_contract_link_as_premise_proven:
      noLinkFields
        .independent_full_binding_not_using_witness_object_contract_link_as_premise_proven ===
      true,
    independent_carrier_admission_bridge_present:
      noLinkFields.independent_carrier_admission_bridge_present === true,
    independent_no_contract_link_route_available:
      noLinkFields.independent_no_contract_link_route_available === true,
    independent_full_endpoint_boundary_binding_theorem_present:
      noLinkFields.independent_full_endpoint_boundary_binding_theorem_present ===
      true,
    full_binding_packet_full_endpoint_boundary_binding_constructed:
      noLinkFields.full_binding_packet_full_endpoint_boundary_binding_constructed ===
      true,
    carrier_field_layer_full_endpoint_boundary_binding_constructed:
      noLinkFields.carrier_field_layer_full_endpoint_boundary_binding_constructed ===
      true,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.binding_contract_without_contract_link_source_inputs_ready =
    SOURCE_INPUT_FIELDS.every((field) => fields[field] === true);
  fields.binding_contract_without_contract_link_route_available =
    fields.independent_binding_contract_satisfaction_without_contract_link_present &&
    fields.independent_binding_contract_satisfaction_derivation_without_contract_link_present &&
    fields.independent_binding_contract_satisfaction_soundness_without_contract_link_present &&
    fields
      .independent_binding_contract_satisfaction_endpoint_application_without_contract_link_present &&
    fields.independent_contract_target_satisfaction_without_contract_link_proof_present &&
    fields.independent_target_ref_value_equations_without_contract_link_proof_grade &&
    fields.independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present &&
    fields.independent_first_primitive_compatibility_without_contract_link_present &&
    fields.selected_route_contract_link_dependency_eliminated;

  const routeAttempts = CONTRACT_PROOF_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: noContractLink.id,
    endpoint_functional_id: noContractLink.endpoint_functional_id,
    role: noContractLink.role,
    independent_binding_contract_satisfaction_without_contract_link_proof_attempt_id:
      `independent_binding_contract_satisfaction_without_contract_link_proof_attempt:${noContractLink.id}`,
    source_attempt_ids: {
      no_contract_link_premise:
        noContractLink.no_contract_link_premise_proof_attempt_id,
      binding_full_binding_completion:
        completion.binding_full_binding_completion_attempt_id,
      actual_link_membership_dependency_cycle:
        cycle.actual_link_membership_dependency_cycle_completion_attempt_id,
      binding_contract_full_binding_carrier_admission:
        binding.binding_contract_full_binding_carrier_admission_attempt_id,
      route_decision: routeDecision.route_decision_id,
      full_endpoint_boundary_binding_contract_target:
        contractTarget.full_endpoint_boundary_binding_contract_target?.target_id,
      endpoint_value_binding_map:
        valueMap.endpoint_value_binding_map_construction_attempt_id,
      witness_object_contract_link:
        contractLink.witness_object_contract_link_construction_attempt_id,
    },
    contract_target: {
      target_id: `independent_binding_contract_satisfaction_without_contract_link:${noContractLink.id}`,
      statement:
        "Satisfy the endpoint binding contract without importing `witness_object_has_contract_link`.",
      accepted_if:
        "The endpoint supplies target-satisfaction proof, proof-grade target ref/value equations, endpoint-boundary-binding ref compatibility, first-primitive compatibility, derivation, soundness proof, endpoint application proof, and selected-route dependency elimination, all without the link premise.",
      prohibited_premises: [
        "witness_object_has_contract_link",
        "witness_object_contract_link_constructed",
        "actual contract-link rule application",
        "constructed witness-object membership proof",
        "proof-contract order revision",
        "row consumption",
        "branch-chart authorization",
      ],
    },
    required_fields_present: fields,
    contract_route_attempts: routeAttempts,
    contract_routes_passed: [],
    missing_without_contract_link_contract_obligations: missing(
      fields,
      WITHOUT_CONTRACT_LINK_CONTRACT_FIELDS
    ),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 6)
      .map((burden) => burden.missing_field),
    independent_binding_contract_satisfaction_without_contract_link_present:
      fields.independent_binding_contract_satisfaction_without_contract_link_present,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has value-map, contract-target, selected-route, dependency-cycle, and source-candidate inputs, but the ordinary binding contract still requires the witness-object contract link and no independent target-satisfaction proof, proof-grade equation proof, compatibility proof, derivation, soundness proof, endpoint application proof, or selected-route dependency elimination is present.",
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
    row_locator_resolved: row.required_fields_present?.row_locator_resolved === true,
    source_binding_contract_without_contract_link_source_inputs_ready:
      sourceFields.binding_contract_without_contract_link_source_inputs_ready,
    receiver_binding_contract_without_contract_link_source_inputs_ready:
      receiverFields.binding_contract_without_contract_link_source_inputs_ready,
    combined_binding_contract_without_contract_link_source_inputs_ready: false,
    source_binding_contract_target_declared:
      sourceFields.binding_contract_target_declared,
    receiver_binding_contract_target_declared:
      receiverFields.binding_contract_target_declared,
    combined_binding_contract_target_pair_declared: false,
    source_value_map_constructed:
      sourceFields.endpoint_value_binding_map_constructed,
    receiver_value_map_constructed:
      receiverFields.endpoint_value_binding_map_constructed,
    combined_value_map_pair_constructed: false,
    source_binding_contract_satisfaction_test_applied:
      sourceFields.binding_contract_satisfaction_test_applied,
    receiver_binding_contract_satisfaction_test_applied:
      receiverFields.binding_contract_satisfaction_test_applied,
    combined_binding_contract_satisfaction_test_pair_applied: false,
    source_selected_route_requires_contract_link:
      sourceFields.selected_route_requires_witness_object_contract_link,
    receiver_selected_route_requires_contract_link:
      receiverFields.selected_route_requires_witness_object_contract_link,
    combined_selected_route_contract_link_requirement_pair: false,
    source_binding_contract_without_contract_link_satisfied:
      sourceFields
        .independent_binding_contract_satisfaction_without_contract_link_present,
    receiver_binding_contract_without_contract_link_satisfied:
      receiverFields
        .independent_binding_contract_satisfaction_without_contract_link_present,
    combined_binding_contract_without_contract_link_pair_satisfied: false,
    source_contract_link_dependency_eliminated:
      sourceFields.selected_route_contract_link_dependency_eliminated,
    receiver_contract_link_dependency_eliminated:
      receiverFields.selected_route_contract_link_dependency_eliminated,
    combined_contract_link_dependency_eliminated: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_binding_contract_without_contract_link_source_inputs_ready =
    fields.source_binding_contract_without_contract_link_source_inputs_ready &&
    fields.receiver_binding_contract_without_contract_link_source_inputs_ready;
  fields.combined_binding_contract_target_pair_declared =
    fields.source_binding_contract_target_declared &&
    fields.receiver_binding_contract_target_declared;
  fields.combined_value_map_pair_constructed =
    fields.source_value_map_constructed && fields.receiver_value_map_constructed;
  fields.combined_binding_contract_satisfaction_test_pair_applied =
    fields.source_binding_contract_satisfaction_test_applied &&
    fields.receiver_binding_contract_satisfaction_test_applied;
  fields.combined_selected_route_contract_link_requirement_pair =
    fields.source_selected_route_requires_contract_link &&
    fields.receiver_selected_route_requires_contract_link;
  fields.combined_binding_contract_without_contract_link_pair_satisfied =
    fields.source_binding_contract_without_contract_link_satisfied &&
    fields.receiver_binding_contract_without_contract_link_satisfied;
  fields.combined_contract_link_dependency_eliminated =
    fields.source_contract_link_dependency_eliminated &&
    fields.receiver_contract_link_dependency_eliminated;

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_independent_binding_contract_satisfaction_without_contract_link_proof_attempt_id:
      source.independent_binding_contract_satisfaction_without_contract_link_proof_attempt_id,
    receiver_independent_binding_contract_satisfaction_without_contract_link_proof_attempt_id:
      receiver.independent_binding_contract_satisfaction_without_contract_link_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver value-map and contract-target input pairs, but no source/receiver binding-contract-satisfaction-without-contract-link proof pair or contract-link dependency-elimination pair.",
  };
}

function buildPacket(sources, sourcePaths) {
  assertPacket(
    sources.noContractLink,
    NO_CONTRACT_LINK_STATUS,
    "no-contract-link premise packet"
  );
  assertPacket(sources.completion, COMPLETION_STATUS, "completion packet");
  assertPacket(
    sources.dependencyCycle,
    DEPENDENCY_CYCLE_STATUS,
    "dependency-cycle packet"
  );
  assertPacket(sources.binding, BINDING_STATUS, "binding packet");
  assertPacket(
    sources.routeDecision,
    ROUTE_DECISION_STATUS,
    "route decision packet"
  );
  assertPacket(
    sources.contractTarget,
    CONTRACT_TARGET_STATUS,
    "contract target packet"
  );
  assertPacket(sources.valueMap, VALUE_MAP_STATUS, "value-map packet");
  assertPacket(
    sources.contractLink,
    CONTRACT_LINK_STATUS,
    "witness-object contract-link packet"
  );

  const completionById = idMap(
    sources.completion.endpoint_binding_full_binding_completion_attempts,
    "id",
    "binding/full-binding completion endpoint"
  );
  const cycleById = idMap(
    sources.dependencyCycle
      .endpoint_actual_link_membership_dependency_cycle_completion_attempts,
    "id",
    "actual-link/membership dependency-cycle endpoint"
  );
  const bindingById = idMap(
    sources.binding.endpoint_binding_contract_full_binding_carrier_admission_attempts,
    "id",
    "binding contract/full-binding/carrier-admission endpoint"
  );
  const routeDecisionById = idMap(
    sources.routeDecision.endpoint_ref_value_carrier_introduction_route_decisions,
    "id",
    "route decision endpoint"
  );
  const contractTargetById = idMap(
    sources.contractTarget.endpoint_full_boundary_binding_contract_targets,
    "id",
    "full endpoint boundary-binding contract target endpoint"
  );
  const valueMapById = idMap(
    sources.valueMap.endpoint_value_binding_map_construction_attempts,
    "id",
    "endpoint value-binding map endpoint"
  );
  const contractLinkById = idMap(
    sources.contractLink.endpoint_witness_object_contract_link_construction_attempts,
    "id",
    "witness-object contract-link endpoint"
  );

  const endpointAttempts =
    sources.noContractLink.endpoint_no_contract_link_premise_proof_attempts.map(
      (noContractLink) =>
        buildEndpointAttempt({
          noContractLink,
          completion: requireMapped(
            completionById,
            noContractLink.id,
            `completion endpoint ${noContractLink.id}`
          ),
          cycle: requireMapped(
            cycleById,
            noContractLink.id,
            `dependency-cycle endpoint ${noContractLink.id}`
          ),
          binding: requireMapped(
            bindingById,
            noContractLink.id,
            `binding endpoint ${noContractLink.id}`
          ),
          routeDecision: requireMapped(
            routeDecisionById,
            noContractLink.id,
            `route decision endpoint ${noContractLink.id}`
          ),
          contractTarget: requireMapped(
            contractTargetById,
            noContractLink.id,
            `contract target endpoint ${noContractLink.id}`
          ),
          valueMap: requireMapped(
            valueMapById,
            noContractLink.id,
            `value-map endpoint ${noContractLink.id}`
          ),
          contractLink: requireMapped(
            contractLinkById,
            noContractLink.id,
            `witness-object contract-link endpoint ${noContractLink.id}`
          ),
        })
    );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "independent binding contract without link endpoint"
  );
  const rowAttempts =
    sources.noContractLink.row_no_contract_link_premise_proof_attempts.map(
      (row) => buildRowAttempt(row, endpointMap)
    );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-independent-binding-contract-satisfaction-without-contract-link-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; endpoint value maps and binding-contract targets are present, but independent binding-contract satisfaction without the link premise is absent",
    source_artifacts: makeSourceArtifacts([
      {
        label: "independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt",
        filePath: sourcePaths.noContractLink,
      },
      {
        label: "binding_full_binding_completion_attempt",
        filePath: sourcePaths.completion,
      },
      {
        label: "actual_link_membership_dependency_cycle_completion_attempt",
        filePath: sourcePaths.dependencyCycle,
      },
      {
        label: "binding_contract_full_binding_carrier_admission_attempt",
        filePath: sourcePaths.binding,
      },
      {
        label: "ref_value_carrier_introduction_route_decision",
        filePath: sourcePaths.routeDecision,
      },
      {
        label: "full_endpoint_boundary_binding_contract_target",
        filePath: sourcePaths.contractTarget,
      },
      {
        label: "endpoint_value_binding_map_construction_attempt",
        filePath: sourcePaths.valueMap,
      },
      {
        label: "witness_object_contract_link_construction_attempt",
        filePath: sourcePaths.contractLink,
      },
    ]),
    contract_target: {
      target_id:
        "independent-binding-contract-satisfaction-without-contract-link-target",
      statement:
        "For each endpoint functional, satisfy the inherited binding contract without importing `witness_object_has_contract_link`.",
      accepted_if:
        "Each endpoint has target-satisfaction proof, proof-grade target ref/value equations, endpoint-boundary-binding ref compatibility, first-primitive compatibility, derivation, soundness proof, endpoint application proof, and selected-route dependency elimination, all without the link premise.",
      current_without_contract_link_binding_contracts_available:
        endpointFieldCounts
          .independent_binding_contract_satisfaction_without_contract_link_present,
    },
    no_promotion_rule:
      "Endpoint value maps, binding-contract targets, source equations, selected-route readiness, and contract-link source candidates are not promoted into binding-contract satisfaction without an independent proof.",
    proof_burdens: PROOF_BURDENS,
    contract_proof_routes: CONTRACT_PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_independent_binding_contract_satisfaction_without_contract_link_proof_attempts:
      endpointAttempts,
    row_independent_binding_contract_satisfaction_without_contract_link_proof_attempts:
      rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      no_contract_link_premise_inputs_present:
        endpointFieldCounts.no_contract_link_premise_packet_input_present,
      allowed_no_contract_link_source_inputs_ready:
        endpointFieldCounts.allowed_no_contract_link_source_inputs_ready,
      endpoint_value_binding_maps_constructed:
        endpointFieldCounts.endpoint_value_binding_map_constructed,
      endpoint_values_bound_to_boundary_binding:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      value_map_ref_values_certified:
        endpointFieldCounts.endpoint_value_binding_map_ref_values_certified,
      binding_contract_target_refs_inherited:
        endpointFieldCounts.binding_contract_target_ref_inherited,
      binding_contract_targets_declared:
        endpointFieldCounts.binding_contract_target_declared,
      binding_contract_satisfaction_tests_applied:
        endpointFieldCounts.binding_contract_satisfaction_test_applied,
      selected_route_inputs_ready:
        endpointFieldCounts.selected_route_inputs_ready,
      dependency_cycles_detected: endpointFieldCounts.dependency_cycle_detected,
      dependency_cycle_escape_routes_declared:
        endpointFieldCounts.dependency_cycle_escape_route_declared,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      contract_link_source_candidates_recorded:
        endpointFieldCounts.witness_object_contract_link_source_candidate_recorded,
      binding_contract_without_contract_link_source_inputs_ready:
        endpointFieldCounts.binding_contract_without_contract_link_source_inputs_ready,
      selected_routes_requiring_witness_object_contract_link:
        endpointFieldCounts.selected_route_requires_witness_object_contract_link,
      ordinary_binding_contracts_requiring_witness_object_contract_link:
        endpointFieldCounts
          .ordinary_binding_contract_requires_witness_object_contract_link,
      selected_route_contract_link_dependencies_eliminated:
        endpointFieldCounts.selected_route_contract_link_dependency_eliminated,
      witness_object_contract_links_constructed:
        endpointFieldCounts.witness_object_contract_link_constructed,
      witness_objects_with_contract_link:
        endpointFieldCounts.witness_object_has_contract_link,
      binding_contracts_satisfied: endpointFieldCounts.binding_contract_satisfied,
      source_contract_target_satisfaction_proofs_present:
        endpointFieldCounts.source_contract_target_satisfaction_proof_present,
      source_target_ref_value_equations_proof_grade:
        endpointFieldCounts.source_target_ref_value_equations_proof_grade,
      source_endpoint_boundary_binding_ref_compatibility_proofs_present:
        endpointFieldCounts
          .source_endpoint_boundary_binding_ref_compatibility_proof_present,
      source_first_primitive_compatibility_proofs_present:
        endpointFieldCounts.source_first_primitive_compatibility_proof_present,
      independent_contract_target_satisfaction_without_contract_link_proofs_present:
        endpointFieldCounts
          .independent_contract_target_satisfaction_without_contract_link_proof_present,
      independent_target_ref_value_equations_without_contract_link_proof_grade:
        endpointFieldCounts
          .independent_target_ref_value_equations_without_contract_link_proof_grade,
      independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present:
        endpointFieldCounts
          .independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present,
      independent_first_primitive_compatibility_without_contract_link_present:
        endpointFieldCounts
          .independent_first_primitive_compatibility_without_contract_link_present,
      independent_binding_contract_satisfaction_derivations_without_contract_link_present:
        endpointFieldCounts
          .independent_binding_contract_satisfaction_derivation_without_contract_link_present,
      independent_binding_contract_satisfaction_soundness_proofs_without_contract_link_present:
        endpointFieldCounts
          .independent_binding_contract_satisfaction_soundness_without_contract_link_present,
      independent_binding_contract_satisfaction_endpoint_application_proofs_without_contract_link_present:
        endpointFieldCounts
          .independent_binding_contract_satisfaction_endpoint_application_without_contract_link_present,
      independent_binding_contract_satisfaction_without_contract_link_present:
        endpointFieldCounts
          .independent_binding_contract_satisfaction_without_contract_link_present,
      binding_contract_without_contract_link_routes_available:
        endpointFieldCounts.binding_contract_without_contract_link_route_available,
      independent_no_contract_link_premise_proofs_present:
        endpointFieldCounts.independent_no_contract_link_premise_proof_present,
      independent_carrier_admission_bridges_present:
        endpointFieldCounts.independent_carrier_admission_bridge_present,
      independent_full_endpoint_boundary_binding_theorems_present:
        endpointFieldCounts.independent_full_endpoint_boundary_binding_theorem_present,
      row_binding_contract_without_contract_link_source_input_pairs_ready:
        rowFieldCounts
          .combined_binding_contract_without_contract_link_source_inputs_ready,
      row_binding_contract_target_pairs_declared:
        rowFieldCounts.combined_binding_contract_target_pair_declared,
      row_value_map_pairs_constructed:
        rowFieldCounts.combined_value_map_pair_constructed,
      row_binding_contract_satisfaction_test_pairs_applied:
        rowFieldCounts.combined_binding_contract_satisfaction_test_pair_applied,
      row_selected_route_contract_link_requirement_pairs:
        rowFieldCounts.combined_selected_route_contract_link_requirement_pair,
      row_binding_contract_without_contract_link_pairs_satisfied:
        rowFieldCounts.combined_binding_contract_without_contract_link_pair_satisfied,
      row_contract_link_dependency_pairs_eliminated:
        rowFieldCounts.combined_contract_link_dependency_eliminated,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint supplies binding-contract satisfaction without the link premise, target-satisfaction proof, proof-grade target ref/value equations, compatibility proofs, or selected-route dependency elimination.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed independent binding-contract-satisfaction-without-contract-link proof attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.binding_contract_without_contract_link_source_inputs_ready} | ${fields.selected_route_requires_witness_object_contract_link} | ${fields.ordinary_binding_contract_requires_witness_object_contract_link} | ${fields.selected_route_contract_link_dependency_eliminated} | ${fields.independent_contract_target_satisfaction_without_contract_link_proof_present} | ${fields.independent_binding_contract_satisfaction_without_contract_link_present} | ${fields.binding_contract_without_contract_link_route_available} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_binding_contract_without_contract_link_source_inputs_ready} | ${fields.combined_binding_contract_target_pair_declared} | ${fields.combined_value_map_pair_constructed} | ${fields.combined_binding_contract_satisfaction_test_pair_applied} | ${fields.combined_selected_route_contract_link_requirement_pair} | ${fields.combined_binding_contract_without_contract_link_pair_satisfied} | ${fields.combined_contract_link_dependency_eliminated} | ${row.row_consumed} |`;
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
  return `# Independent Binding Contract Satisfaction Without Contract Link Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests whether the endpoint binding contract can be
satisfied without importing \`witness_object_has_contract_link\`. It is a
proof-route audit for the exact blocker
\`independent_binding_contract_satisfaction_without_contract_link_present\`,
not a carrier-admission or theorem-construction packet.

The attempt remains fail-closed. It records ${summary.endpoint_value_binding_maps_constructed} / ${summary.endpoint_functionals}
endpoint value-binding maps, ${summary.binding_contract_targets_declared} / ${summary.endpoint_functionals}
binding-contract targets, ${summary.binding_contract_satisfaction_tests_applied} / ${summary.endpoint_functionals}
binding-contract satisfaction tests, ${summary.contract_link_source_candidates_recorded} / ${summary.endpoint_functionals}
contract-link source candidates, and ${summary.binding_contract_without_contract_link_source_inputs_ready} / ${summary.endpoint_functionals}
without-contract-link source-input sets. It also records ${summary.selected_routes_requiring_witness_object_contract_link} / ${summary.endpoint_functionals}
selected routes and ${summary.ordinary_binding_contracts_requiring_witness_object_contract_link} / ${summary.endpoint_functionals}
ordinary binding-contract tests still requiring \`witness_object_has_contract_link\`.

The inherited completion layer still records ${summary.source_contract_target_satisfaction_proofs_present} / ${summary.endpoint_functionals}
source target-satisfaction proofs, ${summary.source_target_ref_value_equations_proof_grade} / ${summary.endpoint_functionals}
source proof-grade target ref/value equation packages, ${summary.source_endpoint_boundary_binding_ref_compatibility_proofs_present} / ${summary.endpoint_functionals}
source endpoint-boundary-binding ref compatibility proofs, and ${summary.source_first_primitive_compatibility_proofs_present} / ${summary.endpoint_functionals}
source first-primitive compatibility proofs.

It records ${summary.independent_binding_contract_satisfaction_without_contract_link_present} / ${summary.endpoint_functionals}
binding-contract satisfaction proofs without the link premise, ${summary.independent_binding_contract_satisfaction_derivations_without_contract_link_present} / ${summary.endpoint_functionals}
derivations, ${summary.independent_binding_contract_satisfaction_soundness_proofs_without_contract_link_present} / ${summary.endpoint_functionals}
soundness proofs, ${summary.independent_binding_contract_satisfaction_endpoint_application_proofs_without_contract_link_present} / ${summary.endpoint_functionals}
endpoint application proofs, ${summary.independent_contract_target_satisfaction_without_contract_link_proofs_present} / ${summary.endpoint_functionals}
target-satisfaction proofs, ${summary.independent_target_ref_value_equations_without_contract_link_proof_grade} / ${summary.endpoint_functionals}
proof-grade target ref/value equation packages, ${summary.row_consumption_count}
consumed rows, and \`branch_chart_authorized=false\`.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Contract Target

${packet.contract_target.statement}

Accepted if: ${packet.contract_target.accepted_if}

## No-Promotion Rule

${packet.no_promotion_rule}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Contract Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.contract_proof_routes)}

## Endpoint Attempts

| Endpoint | Role | Inputs ready | Selected route needs link | Ordinary contract needs link | Dependency eliminated | Target satisfaction proof | Contract satisfied without link | Route available | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_independent_binding_contract_satisfaction_without_contract_link_proof_attempts)}

## Row Attempts

| Row | Input pair | Target pair | Value-map pair | Test pair | Link-requirement pair | Contract pair satisfied without link | Dependency pair eliminated | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_independent_binding_contract_satisfaction_without_contract_link_proof_attempts)}

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
    noContractLink: readJson(args.noContractLinkPacket),
    completion: readJson(args.completionPacket),
    dependencyCycle: readJson(args.dependencyCyclePacket),
    binding: readJson(args.bindingPacket),
    routeDecision: readJson(args.routeDecisionPacket),
    contractTarget: readJson(args.contractTargetPacket),
    valueMap: readJson(args.valueMapPacket),
    contractLink: readJson(args.contractLinkPacket),
  };
  const sourcePaths = {
    noContractLink: args.noContractLinkPacket,
    completion: args.completionPacket,
    dependencyCycle: args.dependencyCyclePacket,
    binding: args.bindingPacket,
    routeDecision: args.routeDecisionPacket,
    contractTarget: args.contractTargetPacket,
    valueMap: args.valueMapPacket,
    contractLink: args.contractLinkPacket,
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
}

main();

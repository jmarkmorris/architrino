#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_CONSTRUCTIVE_DEPENDENCY_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_constructive_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FULL_BINDING_CONSTRUCTION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_FIELD_CONSTRUCTION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
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
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_full_endpoint_boundary_binding_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_full_endpoint_boundary_binding_theorem_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const CONSTRUCTIVE_DEPENDENCY_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-constructive-same-packet-full-endpoint-boundary-binding-dependency-lemma-proof-attempt-fail-closed-full-binding-inputs-present-same-packet-full-binding-dependency-absent-no-row-consumption";
const FULL_BINDING_CONSTRUCTION_STATUS =
  "priority-only-full-endpoint-boundary-binding-construction-attempt-fail-closed-contract-targets-present-full-binding-motion-evaluation-replay-blocked-no-row-consumption";
const CARRIER_FIELD_CONSTRUCTION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-construction-attempt-fail-closed-carrier-field-source-candidates-present-carrier-fields-absent-no-row-consumption";
const NON_DOMAIN_CARRIER_OBSTRUCTION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption";
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

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-full-endpoint-boundary-binding-theorem-attempt-fail-closed-selected-route-inputs-present-independent-full-binding-theorem-absent-no-row-consumption";

const SELECTED_ROUTE_INPUT_FIELDS = [
  "carrier_admission_route_selected",
  "endpoint_value_binding_map_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_target_ref_inherited",
  "binding_contract_satisfaction_test_applied",
  "full_endpoint_boundary_binding_construction_test_applied",
  "carrier_admission_test_applied",
  "witness_object_contract_link_source_candidate_recorded",
  "actual_contract_link_rule_source_conditions_present",
  "membership_source_conditions_ready",
  "actual_contract_link_introduction_rule_target_declared",
  "constructed_witness_object_source_ready",
  "witness_object_target_declared",
];

const THEOREM_INPUT_FIELDS = [
  "dependency_cycle_escape_route_declared",
  "dependency_cycle_detected",
  "constructive_dependency_packet_input_present",
  "contract_target_layer_ready",
  "full_binding_construction_input_ready",
  "source_endpoint_boundary_binding_available",
  "source_endpoint_value_binding_map_available",
  "source_endpoint_value_bound_to_boundary_binding",
  "selected_carrier_admission_route_inputs_ready",
  "carrier_admission_route_selected",
  "direct_source_promotion_rejected",
  "proof_independence_guard_declared",
];

const INDEPENDENT_THEOREM_OBLIGATION_FIELDS = [
  "independent_full_endpoint_boundary_binding_constructed",
  "independent_binding_contract_satisfaction_proof_present",
  "independent_motion_evaluation_bridge_present",
  "independent_algebraic_certificate_bridge_present",
  "independent_candidate_replay_bridge_present",
  "independent_carrier_admission_bridge_present",
  "independent_endpoint_boundary_binding_ref_carrier_unblocked",
  "independent_endpoint_value_binding_map_carrier_unblocked",
  "independent_full_binding_not_using_witness_object_contract_link_as_premise_proven",
  "independent_full_endpoint_boundary_binding_theorem_derivation_present",
  "independent_full_endpoint_boundary_binding_theorem_soundness_proof_present",
  "independent_full_endpoint_boundary_binding_endpoint_application_proof_present",
  "independent_full_endpoint_boundary_binding_theorem_present",
];

const DOWNSTREAM_FIELDS = [
  "full_binding_packet_full_endpoint_boundary_binding_constructed",
  "carrier_field_layer_full_endpoint_boundary_binding_constructed",
  "obstruction_layer_full_endpoint_boundary_binding_constructed",
  "same_packet_full_endpoint_boundary_binding_dependency_present",
  "same_packet_endpoint_boundary_binding_dependency_present",
  "same_packet_endpoint_value_bound_dependency_present",
  "same_packet_witness_object_ref_dependency_present",
  "same_packet_witness_object_value_map_dependency_present",
  "same_packet_ref_carrier_field_dependencies_closed",
  "same_packet_value_map_carrier_field_dependencies_closed",
  "cycle_breaker_available",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...THEOREM_INPUT_FIELDS,
  ...INDEPENDENT_THEOREM_OBLIGATION_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_selected_route_inputs_ready",
  "receiver_selected_route_inputs_ready",
  "combined_selected_route_inputs_ready",
  "source_dependency_cycle_detected",
  "receiver_dependency_cycle_detected",
  "combined_dependency_cycle_pair_detected",
  "source_escape_route_declared",
  "receiver_escape_route_declared",
  "combined_escape_route_pair_declared",
  "source_independent_full_binding_theorem_present",
  "receiver_independent_full_binding_theorem_present",
  "combined_independent_full_binding_theorem_pair_present",
  "source_independent_full_binding_constructed",
  "receiver_independent_full_binding_constructed",
  "combined_independent_full_binding_pair_constructed",
  "source_carrier_admission_bridge_present",
  "receiver_carrier_admission_bridge_present",
  "combined_carrier_admission_bridge_pair_present",
  "source_full_binding_packet_full_binding_constructed",
  "receiver_full_binding_packet_full_binding_constructed",
  "combined_full_binding_packet_full_binding_pair_constructed",
  "source_carrier_field_layer_full_binding_constructed",
  "receiver_carrier_field_layer_full_binding_constructed",
  "combined_carrier_field_layer_full_binding_pair_constructed",
  "combined_cycle_breaker_pair_available",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const THEOREM_PROOF_ROUTES = [
  {
    route_id: "contract_target_as_independent_full_binding_theorem",
    status: "rejected-target-only",
    required_fields: [
      "contract_target_layer_ready",
      "independent_full_endpoint_boundary_binding_theorem_present",
    ],
    limitation:
      "Declared full endpoint boundary-binding contract targets are obligations, not a proof-grade independent theorem.",
  },
  {
    route_id: "full_binding_construction_input_as_independent_theorem",
    status: "rejected-input-only",
    required_fields: [
      "full_binding_construction_input_ready",
      "independent_full_endpoint_boundary_binding_constructed",
      "independent_full_endpoint_boundary_binding_theorem_present",
    ],
    limitation:
      "Input-ready full-binding construction data does not construct a full endpoint boundary binding or theorem.",
  },
  {
    route_id: "selected_carrier_admission_route_as_independent_theorem",
    status: "blocked-cyclic",
    required_fields: [
      "selected_carrier_admission_route_inputs_ready",
      "binding_contract_satisfied",
      "witness_object_has_contract_link",
      "full_binding_packet_full_endpoint_boundary_binding_constructed",
      "independent_full_binding_not_using_witness_object_contract_link_as_premise_proven",
    ],
    limitation:
      "The selected carrier-admission route remains cyclic because binding contract satisfaction still needs the witness-object contract link.",
  },
  {
    route_id: "dependency_cycle_escape_independent_full_binding_theorem",
    status: "absent",
    required_fields: [
      "dependency_cycle_escape_route_declared",
      "dependency_cycle_detected",
      "independent_full_endpoint_boundary_binding_theorem_derivation_present",
      "independent_full_endpoint_boundary_binding_theorem_soundness_proof_present",
      "independent_full_endpoint_boundary_binding_endpoint_application_proof_present",
      "independent_full_endpoint_boundary_binding_theorem_present",
    ],
    limitation:
      "The dependency-cycle packet declares the escape route, but no derivation, soundness proof, endpoint application proof, or theorem is present.",
  },
  {
    route_id: "carrier_field_layer_as_independent_theorem",
    status: "blocked",
    required_fields: [
      "carrier_field_layer_full_endpoint_boundary_binding_constructed",
      "obstruction_layer_full_endpoint_boundary_binding_constructed",
      "independent_carrier_admission_bridge_present",
      "independent_full_endpoint_boundary_binding_theorem_present",
    ],
    limitation:
      "Carrier-field and non-domain obstruction layers still lack proof-grade full endpoint boundary bindings and carrier-admission bridge fields.",
  },
  {
    route_id: "constructive_dependency_discharge_after_independent_theorem",
    status: "blocked-downstream",
    required_fields: [
      "independent_full_endpoint_boundary_binding_theorem_present",
      "full_binding_packet_full_endpoint_boundary_binding_constructed",
      "carrier_field_layer_full_endpoint_boundary_binding_constructed",
      "same_packet_full_endpoint_boundary_binding_dependency_present",
      "same_packet_endpoint_boundary_binding_dependency_present",
    ],
    limitation:
      "The constructive dependency lemma remains downstream of a completed independent theorem and same-packet dependency fields.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "independent_full_endpoint_boundary_binding_theorem",
    missing_field: "independent_full_endpoint_boundary_binding_theorem_present",
    required_evidence:
      "A proof-grade full endpoint boundary-binding theorem accepted as independent of the witness-object contract link premise.",
  },
  {
    burden_id: "independent_theorem_derivation",
    missing_field:
      "independent_full_endpoint_boundary_binding_theorem_derivation_present",
    required_evidence:
      "A derivation of the independent theorem from contract targets, endpoint values, motion/evaluation obligations, algebraic certificates, and replay obligations without using the witness-object contract link.",
  },
  {
    burden_id: "independent_theorem_soundness",
    missing_field:
      "independent_full_endpoint_boundary_binding_theorem_soundness_proof_present",
    required_evidence:
      "A soundness proof that source handles, input readiness, and carrier-admission route selection are not promoted into a theorem.",
  },
  {
    burden_id: "independent_theorem_endpoint_application",
    missing_field:
      "independent_full_endpoint_boundary_binding_endpoint_application_proof_present",
    required_evidence:
      "Endpoint-level application proof for each of the four endpoint functionals.",
  },
  {
    burden_id: "no_contract_link_premise",
    missing_field:
      "independent_full_binding_not_using_witness_object_contract_link_as_premise_proven",
    required_evidence:
      "A proof that the theorem route does not use `witness_object_has_contract_link` as a premise.",
  },
  {
    burden_id: "independent_carrier_admission_bridge",
    missing_field: "independent_carrier_admission_bridge_present",
    required_evidence:
      "A carrier-admission bridge supplied by the independent theorem route rather than by the cyclic selected route.",
  },
  {
    burden_id: "independent_motion_evaluation_bridge",
    missing_field: "independent_motion_evaluation_bridge_present",
    required_evidence:
      "Endpoint motion, endpoint evaluation, full endpoint evaluation, and global-domain evaluation bridge proof.",
  },
  {
    burden_id: "independent_algebraic_certificate_bridge",
    missing_field: "independent_algebraic_certificate_bridge_present",
    required_evidence:
      "Non-target endpoint zero, exact screen zero, and rank certificates tied to the independent theorem route.",
  },
  {
    burden_id: "independent_candidate_replay_bridge",
    missing_field: "independent_candidate_replay_bridge_present",
    required_evidence:
      "Candidate artifacts, topology recertification, and proof-interval v1-v6 replay attached to the theorem route.",
  },
  {
    burden_id: "full_binding_packet_full_binding_constructed",
    missing_field: "full_binding_packet_full_endpoint_boundary_binding_constructed",
    required_evidence:
      "A constructed full endpoint boundary binding in the full-binding construction packet.",
  },
  {
    burden_id: "carrier_field_layer_full_binding_constructed",
    missing_field: "carrier_field_layer_full_endpoint_boundary_binding_constructed",
    required_evidence:
      "A constructed full endpoint boundary binding in the same-packet carrier-field layer.",
  },
];

function parseArgs(argv) {
  const args = {
    constructiveDependencyPacket: DEFAULT_CONSTRUCTIVE_DEPENDENCY_PACKET,
    fullBindingConstructionPacket: DEFAULT_FULL_BINDING_CONSTRUCTION_PACKET,
    carrierFieldConstructionPacket: DEFAULT_CARRIER_FIELD_CONSTRUCTION_PACKET,
    nonDomainCarrierObstructionPacket:
      DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET,
    completionPacket: DEFAULT_COMPLETION_PACKET,
    dependencyCyclePacket: DEFAULT_DEPENDENCY_CYCLE_PACKET,
    bindingPacket: DEFAULT_BINDING_PACKET,
    routeDecisionPacket: DEFAULT_ROUTE_DECISION_PACKET,
    contractTargetPacket: DEFAULT_CONTRACT_TARGET_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--constructive-dependency-packet") {
      args.constructiveDependencyPacket = argv[++index];
    } else if (arg === "--full-binding-construction-packet") {
      args.fullBindingConstructionPacket = argv[++index];
    } else if (arg === "--carrier-field-construction-packet") {
      args.carrierFieldConstructionPacket = argv[++index];
    } else if (arg === "--non-domain-carrier-obstruction-packet") {
      args.nonDomainCarrierObstructionPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-full-endpoint-boundary-binding-theorem-attempt.mjs [options]",
    "",
    "Options:",
    "  --constructive-dependency-packet <path>",
    "  --full-binding-construction-packet <path>",
    "  --carrier-field-construction-packet <path>",
    "  --non-domain-carrier-obstruction-packet <path>",
    "  --completion-packet <path>",
    "  --dependency-cycle-packet <path>",
    "  --binding-packet <path>",
    "  --route-decision-packet <path>",
    "  --contract-target-packet <path>",
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
    throw new Error(`Refusing theorem attempt from authorized ${label}.`);
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

function allTrue(item, fields) {
  return fields.every((field) => req(item, field));
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
  constructive,
  fullConstruction,
  carrierConstruction,
  obstruction,
  completion,
  cycle,
  binding,
  routeDecision,
  contractTarget,
}) {
  const fullFields = fullConstruction.required_fields_present ?? {};
  const carrierFields = carrierConstruction.required_fields_present ?? {};
  const obstructionFields = obstruction.required_fields_present ?? {};
  const constructiveFields = constructive.required_fields_present ?? {};
  const routeFields = routeDecision.required_fields_present ?? {};
  const bindingFields = binding.required_fields_present ?? {};
  const completionFields = completion.required_fields_present ?? {};
  const contractFields = contractTarget.required_fields_present ?? {};

  const fields = {
    dependency_cycle_escape_route_declared: hasEscapeRoute(
      cycle,
      "independent_full_endpoint_boundary_binding_theorem"
    ),
    dependency_cycle_detected: cycle.dependency_cycle_detected === true,
    constructive_dependency_packet_input_present: true,
    contract_target_layer_ready:
      contractFields.full_endpoint_boundary_binding_contract_target_declared ===
        true &&
      contractFields.target_endpoint_boundary_binding_object_constructed === true,
    full_binding_construction_input_ready:
      fullFields.full_endpoint_boundary_binding_construction_input_ready === true,
    source_endpoint_boundary_binding_available:
      bindingFields.endpoint_boundary_binding_constructed === true ||
      constructiveFields.source_ref_packet_endpoint_boundary_binding_constructed ===
        true,
    source_endpoint_value_binding_map_available:
      routeFields.endpoint_value_binding_map_constructed === true ||
      bindingFields.endpoint_value_binding_map_constructed === true,
    source_endpoint_value_bound_to_boundary_binding:
      routeFields.endpoint_value_bound_to_boundary_binding === true ||
      bindingFields.endpoint_value_bound_to_boundary_binding === true ||
      constructiveFields
        .source_value_packet_endpoint_value_bound_to_boundary_binding === true,
    selected_carrier_admission_route_inputs_ready:
      allTrue(completion, SELECTED_ROUTE_INPUT_FIELDS) &&
      routeDecision.carrier_admission_route?.inputs_ready === true,
    carrier_admission_route_selected:
      completionFields.carrier_admission_route_selected === true &&
      routeFields.carrier_admission_route_selected === true,
    direct_source_promotion_rejected:
      routeFields.direct_source_promotion_rejected === true,
    proof_independence_guard_declared: true,
    independent_binding_contract_satisfaction_proof_present: false,
    independent_motion_evaluation_bridge_present:
      completionFields.motion_evaluation_bridge_present === true &&
      fullFields.endpoint_motion_rule_constructed === true &&
      fullFields.endpoint_evaluation_map_constructed === true &&
      fullFields.full_endpoint_evaluation_map_constructed === true,
    independent_algebraic_certificate_bridge_present:
      completionFields.algebraic_certificate_bridge_present === true &&
      fullFields.non_target_endpoint_zero_certified === true &&
      fullFields.exact_screen_zero_certified === true &&
      fullFields.rank_certified === true,
    independent_candidate_replay_bridge_present:
      completionFields.candidate_replay_bridge_present === true &&
      fullFields.candidate_artifacts_present === true &&
      fullFields.root_topology_recertified_for_candidate_change === true &&
      fullFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    independent_carrier_admission_bridge_present:
      completionFields.carrier_admission_bridge_present === true &&
      bindingFields.endpoint_boundary_binding_ref_carrier_unblocked === true &&
      bindingFields.endpoint_value_binding_map_carrier_unblocked === true,
    independent_endpoint_boundary_binding_ref_carrier_unblocked: false,
    independent_endpoint_value_binding_map_carrier_unblocked: false,
    independent_full_binding_not_using_witness_object_contract_link_as_premise_proven:
      false,
    independent_full_endpoint_boundary_binding_theorem_derivation_present:
      false,
    independent_full_endpoint_boundary_binding_theorem_soundness_proof_present:
      false,
    independent_full_endpoint_boundary_binding_endpoint_application_proof_present:
      false,
    full_binding_packet_full_endpoint_boundary_binding_constructed:
      fullFields.full_endpoint_boundary_binding_constructed === true,
    carrier_field_layer_full_endpoint_boundary_binding_constructed:
      carrierFields.full_endpoint_boundary_binding_constructed === true,
    obstruction_layer_full_endpoint_boundary_binding_constructed:
      obstructionFields.full_endpoint_boundary_binding_constructed === true,
    same_packet_full_endpoint_boundary_binding_dependency_present:
      constructiveFields
        .same_packet_full_endpoint_boundary_binding_dependency_present === true,
    same_packet_endpoint_boundary_binding_dependency_present:
      constructiveFields.same_packet_endpoint_boundary_binding_dependency_present ===
      true,
    same_packet_endpoint_value_bound_dependency_present:
      constructiveFields
        .same_packet_endpoint_value_bound_to_boundary_binding_dependency_present ===
      true,
    same_packet_witness_object_ref_dependency_present:
      constructiveFields.same_packet_witness_object_ref_dependency_present === true,
    same_packet_witness_object_value_map_dependency_present:
      constructiveFields.same_packet_witness_object_value_map_dependency_present ===
      true,
    same_packet_ref_carrier_field_dependencies_closed:
      constructiveFields.same_packet_ref_carrier_field_dependencies_closed === true,
    same_packet_value_map_carrier_field_dependencies_closed:
      constructiveFields.same_packet_value_map_carrier_field_dependencies_closed ===
      true,
    cycle_breaker_available: false,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };
  fields.independent_full_endpoint_boundary_binding_constructed =
    fields.full_binding_packet_full_endpoint_boundary_binding_constructed &&
    fields.independent_binding_contract_satisfaction_proof_present &&
    fields.independent_motion_evaluation_bridge_present &&
    fields.independent_algebraic_certificate_bridge_present &&
    fields.independent_candidate_replay_bridge_present &&
    fields.independent_full_binding_not_using_witness_object_contract_link_as_premise_proven;
  fields.independent_endpoint_boundary_binding_ref_carrier_unblocked =
    fields.independent_carrier_admission_bridge_present &&
    bindingFields.endpoint_boundary_binding_ref_carrier_unblocked === true;
  fields.independent_endpoint_value_binding_map_carrier_unblocked =
    fields.independent_carrier_admission_bridge_present &&
    bindingFields.endpoint_value_binding_map_carrier_unblocked === true;
  const theoremPrerequisites = INDEPENDENT_THEOREM_OBLIGATION_FIELDS.filter(
    (field) => field !== "independent_full_endpoint_boundary_binding_theorem_present"
  );
  fields.independent_full_endpoint_boundary_binding_theorem_present =
    missing(fields, theoremPrerequisites).length === 0;
  fields.cycle_breaker_available =
    fields.independent_full_endpoint_boundary_binding_theorem_present;

  const routeAttempts = THEOREM_PROOF_ROUTES.map((route) =>
    routeAttempt(route, {
      ...fields,
      binding_contract_satisfied: bindingFields.binding_contract_satisfied === true,
      witness_object_has_contract_link:
        bindingFields.witness_object_has_contract_link === true,
    })
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: cycle.id,
    endpoint_functional_id: cycle.endpoint_functional_id,
    role: cycle.role,
    independent_full_endpoint_boundary_binding_theorem_attempt_id:
      `independent_full_endpoint_boundary_binding_theorem_attempt:${cycle.id}`,
    source_attempt_ids: {
      constructive_dependency_lemma:
        constructive.same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt_id,
      full_endpoint_boundary_binding_construction:
        fullConstruction.source_contract_target_id,
      same_packet_carrier_field_construction:
        carrierConstruction.witness_object_carrier_field_construction_attempt_id,
      non_domain_carrier_obstruction:
        obstruction.witness_object_non_domain_carrier_obstruction_packet_id,
      binding_full_binding_completion:
        completion.binding_full_binding_completion_attempt_id,
      actual_link_membership_dependency_cycle:
        cycle.actual_link_membership_dependency_cycle_completion_attempt_id,
      binding_contract_full_binding_carrier_admission:
        binding.binding_contract_full_binding_carrier_admission_attempt_id,
      route_decision: routeDecision.route_decision_id,
      full_endpoint_boundary_binding_contract_target:
        contractTarget.full_endpoint_boundary_binding_contract_target?.target_id,
    },
    theorem_target: {
      theorem_id: `independent_full_endpoint_boundary_binding_theorem:${cycle.id}`,
      statement:
        "Construct a full endpoint boundary-binding theorem with carrier admission without using `witness_object_has_contract_link` as a premise.",
      accepted_as_cycle_breaker_if:
        "The endpoint supplies an independent full endpoint boundary binding, binding-contract satisfaction proof, motion/evaluation bridge, algebraic certificate bridge, candidate replay bridge, carrier-admission bridge, derivation, soundness proof, endpoint application proof, and no-contract-link premise proof.",
      accepted_as_constructive_dependency_discharge_if:
        "The independent theorem also exposes the full-binding-packet and carrier-field-layer full endpoint boundary-binding construction fields required by the constructive same-packet dependency lemma packet.",
      independence_exclusions: [
        "witness_object_has_contract_link",
        "actual_contract_link_rule_application",
        "constructed_witness_object_membership_theorem_as_premise",
        "proof_contract_order_revision",
        "row_consumption",
        "branch_chart_authorization",
      ],
    },
    required_fields_present: fields,
    theorem_route_attempts: routeAttempts,
    theorem_routes_passed: [],
    missing_independent_theorem_obligations: missing(
      fields,
      INDEPENDENT_THEOREM_OBLIGATION_FIELDS
    ),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 6)
      .map((burden) => burden.missing_field),
    independent_theorem_present:
      fields.independent_full_endpoint_boundary_binding_theorem_present,
    cycle_breaker_available: fields.cycle_breaker_available,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has selected-route inputs, contract targets, full-binding construction inputs, a dependency-cycle escape-route declaration, and source endpoint value data, but no independent full endpoint boundary-binding theorem, derivation, soundness proof, endpoint application proof, no-contract-link premise proof, bridge package, or carrier admission.",
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
    source_selected_route_inputs_ready:
      sourceFields.selected_carrier_admission_route_inputs_ready,
    receiver_selected_route_inputs_ready:
      receiverFields.selected_carrier_admission_route_inputs_ready,
    combined_selected_route_inputs_ready: false,
    source_dependency_cycle_detected: sourceFields.dependency_cycle_detected,
    receiver_dependency_cycle_detected: receiverFields.dependency_cycle_detected,
    combined_dependency_cycle_pair_detected: false,
    source_escape_route_declared:
      sourceFields.dependency_cycle_escape_route_declared,
    receiver_escape_route_declared:
      receiverFields.dependency_cycle_escape_route_declared,
    combined_escape_route_pair_declared: false,
    source_independent_full_binding_theorem_present:
      sourceFields.independent_full_endpoint_boundary_binding_theorem_present,
    receiver_independent_full_binding_theorem_present:
      receiverFields.independent_full_endpoint_boundary_binding_theorem_present,
    combined_independent_full_binding_theorem_pair_present: false,
    source_independent_full_binding_constructed:
      sourceFields.independent_full_endpoint_boundary_binding_constructed,
    receiver_independent_full_binding_constructed:
      receiverFields.independent_full_endpoint_boundary_binding_constructed,
    combined_independent_full_binding_pair_constructed: false,
    source_carrier_admission_bridge_present:
      sourceFields.independent_carrier_admission_bridge_present,
    receiver_carrier_admission_bridge_present:
      receiverFields.independent_carrier_admission_bridge_present,
    combined_carrier_admission_bridge_pair_present: false,
    source_full_binding_packet_full_binding_constructed:
      sourceFields.full_binding_packet_full_endpoint_boundary_binding_constructed,
    receiver_full_binding_packet_full_binding_constructed:
      receiverFields.full_binding_packet_full_endpoint_boundary_binding_constructed,
    combined_full_binding_packet_full_binding_pair_constructed: false,
    source_carrier_field_layer_full_binding_constructed:
      sourceFields.carrier_field_layer_full_endpoint_boundary_binding_constructed,
    receiver_carrier_field_layer_full_binding_constructed:
      receiverFields.carrier_field_layer_full_endpoint_boundary_binding_constructed,
    combined_carrier_field_layer_full_binding_pair_constructed: false,
    combined_cycle_breaker_pair_available: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_selected_route_inputs_ready =
    fields.source_selected_route_inputs_ready &&
    fields.receiver_selected_route_inputs_ready;
  fields.combined_dependency_cycle_pair_detected =
    fields.source_dependency_cycle_detected &&
    fields.receiver_dependency_cycle_detected;
  fields.combined_escape_route_pair_declared =
    fields.source_escape_route_declared && fields.receiver_escape_route_declared;
  fields.combined_independent_full_binding_theorem_pair_present =
    fields.source_independent_full_binding_theorem_present &&
    fields.receiver_independent_full_binding_theorem_present;
  fields.combined_independent_full_binding_pair_constructed =
    fields.source_independent_full_binding_constructed &&
    fields.receiver_independent_full_binding_constructed;
  fields.combined_carrier_admission_bridge_pair_present =
    fields.source_carrier_admission_bridge_present &&
    fields.receiver_carrier_admission_bridge_present;
  fields.combined_full_binding_packet_full_binding_pair_constructed =
    fields.source_full_binding_packet_full_binding_constructed &&
    fields.receiver_full_binding_packet_full_binding_constructed;
  fields.combined_carrier_field_layer_full_binding_pair_constructed =
    fields.source_carrier_field_layer_full_binding_constructed &&
    fields.receiver_carrier_field_layer_full_binding_constructed;
  fields.combined_cycle_breaker_pair_available =
    sourceFields.cycle_breaker_available && receiverFields.cycle_breaker_available;

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
    source_independent_full_endpoint_boundary_binding_theorem_attempt_id:
      source.independent_full_endpoint_boundary_binding_theorem_attempt_id,
    receiver_independent_full_endpoint_boundary_binding_theorem_attempt_id:
      receiver.independent_full_endpoint_boundary_binding_theorem_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has selected-route input pairs, dependency-cycle pairs, and escape-route declarations, but no independent full endpoint boundary-binding theorem pair or carrier-admission bridge pair.",
  };
}

function buildPacket(sources, sourcePaths) {
  assertPacket(
    sources.constructiveDependency,
    CONSTRUCTIVE_DEPENDENCY_STATUS,
    "constructive dependency packet"
  );
  assertPacket(
    sources.fullBindingConstruction,
    FULL_BINDING_CONSTRUCTION_STATUS,
    "full-binding construction packet"
  );
  assertPacket(
    sources.carrierFieldConstruction,
    CARRIER_FIELD_CONSTRUCTION_STATUS,
    "carrier-field construction packet"
  );
  assertPacket(
    sources.nonDomainCarrierObstruction,
    NON_DOMAIN_CARRIER_OBSTRUCTION_STATUS,
    "non-domain carrier obstruction packet"
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

  const constructiveById = idMap(
    sources.constructiveDependency
      .endpoint_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempts,
    "id",
    "constructive dependency endpoint"
  );
  const fullConstructionById = idMap(
    sources.fullBindingConstruction
      .endpoint_full_boundary_binding_construction_attempts,
    "id",
    "full-binding construction endpoint"
  );
  const carrierConstructionById = idMap(
    sources.carrierFieldConstruction
      .endpoint_witness_object_carrier_field_construction_attempts,
    "id",
    "carrier-field construction endpoint"
  );
  const obstructionById = idMap(
    sources.nonDomainCarrierObstruction
      .endpoint_witness_object_non_domain_carrier_obstruction_packets,
    "id",
    "non-domain carrier obstruction endpoint"
  );
  const completionById = idMap(
    sources.completion.endpoint_binding_full_binding_completion_attempts,
    "id",
    "binding/full-binding completion endpoint"
  );
  const bindingById = idMap(
    sources.binding.endpoint_binding_contract_full_binding_carrier_admission_attempts,
    "id",
    "binding contract/full-binding/carrier admission endpoint"
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

  const endpointAttempts =
    sources.dependencyCycle
      .endpoint_actual_link_membership_dependency_cycle_completion_attempts.map(
        (cycle) =>
          buildEndpointAttempt({
            cycle,
            constructive: requireMapped(
              constructiveById,
              cycle.id,
              `constructive dependency endpoint ${cycle.id}`
            ),
            fullConstruction: requireMapped(
              fullConstructionById,
              cycle.id,
              `full-binding construction endpoint ${cycle.id}`
            ),
            carrierConstruction: requireMapped(
              carrierConstructionById,
              cycle.id,
              `carrier-field construction endpoint ${cycle.id}`
            ),
            obstruction: requireMapped(
              obstructionById,
              cycle.id,
              `non-domain carrier obstruction endpoint ${cycle.id}`
            ),
            completion: requireMapped(
              completionById,
              cycle.id,
              `completion endpoint ${cycle.id}`
            ),
            binding: requireMapped(
              bindingById,
              cycle.id,
              `binding endpoint ${cycle.id}`
            ),
            routeDecision: requireMapped(
              routeDecisionById,
              cycle.id,
              `route decision endpoint ${cycle.id}`
            ),
            contractTarget: requireMapped(
              contractTargetById,
              cycle.id,
              `contract target endpoint ${cycle.id}`
            ),
          })
      );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "independent full endpoint boundary-binding theorem endpoint"
  );
  const rowAttempts =
    sources.dependencyCycle
      .row_actual_link_membership_dependency_cycle_completion_attempts.map(
        (row) => buildRowAttempt(row, endpointMap)
      );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-independent-full-endpoint-boundary-binding-theorem-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed theorem attempt; selected-route inputs and dependency-cycle escape-route declarations are present, but the independent full endpoint boundary-binding theorem is absent",
    source_artifacts: makeSourceArtifacts([
      {
        label: "constructive_same_packet_full_endpoint_boundary_binding_dependency_lemma_proof_attempt",
        filePath: sourcePaths.constructiveDependency,
      },
      {
        label: "full_endpoint_boundary_binding_construction_attempt",
        filePath: sourcePaths.fullBindingConstruction,
      },
      {
        label: "same_packet_witness_object_carrier_field_construction_attempt",
        filePath: sourcePaths.carrierFieldConstruction,
      },
      {
        label: "same_packet_non_domain_carrier_obstruction_packet",
        filePath: sourcePaths.nonDomainCarrierObstruction,
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
    ]),
    theorem_target: {
      theorem_id:
        "independent-full-endpoint-boundary-binding-theorem-target",
      statement:
        "For each endpoint functional, construct a proof-grade full endpoint boundary-binding theorem with carrier admission that does not use `witness_object_has_contract_link` as a premise.",
      accepted_as_cycle_breaker_if:
        "The theorem supplies derivation, soundness, endpoint application, no-contract-link premise proof, independent binding-contract satisfaction, motion/evaluation bridge, algebraic certificate bridge, candidate replay bridge, and carrier-admission bridge.",
      accepted_as_constructive_dependency_discharge_if:
        "The theorem also constructs the full-binding-packet and carrier-field-layer full endpoint boundary-binding fields named by the constructive same-packet dependency lemma packet.",
      current_theorems_available:
        endpointFieldCounts.independent_full_endpoint_boundary_binding_theorem_present,
    },
    no_promotion_rule:
      "Contract targets, full-binding construction inputs, selected carrier-admission route inputs, source endpoint refs, source endpoint values, and declared dependency-cycle escape routes are not promoted into an independent full endpoint boundary-binding theorem.",
    proof_burdens: PROOF_BURDENS,
    theorem_proof_routes: THEOREM_PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_independent_full_endpoint_boundary_binding_theorem_attempts:
      endpointAttempts,
    row_independent_full_endpoint_boundary_binding_theorem_attempts: rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      dependency_cycle_escape_routes_declared:
        endpointFieldCounts.dependency_cycle_escape_route_declared,
      dependency_cycles_detected: endpointFieldCounts.dependency_cycle_detected,
      constructive_dependency_inputs_present:
        endpointFieldCounts.constructive_dependency_packet_input_present,
      contract_target_layers_ready:
        endpointFieldCounts.contract_target_layer_ready,
      full_binding_construction_inputs_ready:
        endpointFieldCounts.full_binding_construction_input_ready,
      source_endpoint_boundary_bindings_available:
        endpointFieldCounts.source_endpoint_boundary_binding_available,
      source_endpoint_value_binding_maps_available:
        endpointFieldCounts.source_endpoint_value_binding_map_available,
      source_endpoint_values_bound_to_boundary_binding:
        endpointFieldCounts.source_endpoint_value_bound_to_boundary_binding,
      selected_carrier_admission_route_inputs_ready:
        endpointFieldCounts.selected_carrier_admission_route_inputs_ready,
      carrier_admission_routes_selected:
        endpointFieldCounts.carrier_admission_route_selected,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      independent_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.independent_full_endpoint_boundary_binding_constructed,
      independent_binding_contract_satisfaction_proofs_present:
        endpointFieldCounts.independent_binding_contract_satisfaction_proof_present,
      independent_motion_evaluation_bridges_present:
        endpointFieldCounts.independent_motion_evaluation_bridge_present,
      independent_algebraic_certificate_bridges_present:
        endpointFieldCounts.independent_algebraic_certificate_bridge_present,
      independent_candidate_replay_bridges_present:
        endpointFieldCounts.independent_candidate_replay_bridge_present,
      independent_carrier_admission_bridges_present:
        endpointFieldCounts.independent_carrier_admission_bridge_present,
      no_contract_link_premise_proofs_present:
        endpointFieldCounts
          .independent_full_binding_not_using_witness_object_contract_link_as_premise_proven,
      independent_theorem_derivations_present:
        endpointFieldCounts
          .independent_full_endpoint_boundary_binding_theorem_derivation_present,
      independent_theorem_soundness_proofs_present:
        endpointFieldCounts
          .independent_full_endpoint_boundary_binding_theorem_soundness_proof_present,
      independent_theorem_application_proofs_present:
        endpointFieldCounts
          .independent_full_endpoint_boundary_binding_endpoint_application_proof_present,
      independent_full_endpoint_boundary_binding_theorems_present:
        endpointFieldCounts.independent_full_endpoint_boundary_binding_theorem_present,
      full_binding_packet_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_binding_packet_full_endpoint_boundary_binding_constructed,
      carrier_field_layer_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.carrier_field_layer_full_endpoint_boundary_binding_constructed,
      obstruction_layer_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.obstruction_layer_full_endpoint_boundary_binding_constructed,
      same_packet_full_endpoint_boundary_binding_dependencies_present:
        endpointFieldCounts.same_packet_full_endpoint_boundary_binding_dependency_present,
      same_packet_endpoint_boundary_binding_dependencies_present:
        endpointFieldCounts.same_packet_endpoint_boundary_binding_dependency_present,
      same_packet_endpoint_value_bound_dependencies_present:
        endpointFieldCounts.same_packet_endpoint_value_bound_dependency_present,
      same_packet_witness_object_ref_dependencies_present:
        endpointFieldCounts.same_packet_witness_object_ref_dependency_present,
      same_packet_witness_object_value_map_dependencies_present:
        endpointFieldCounts.same_packet_witness_object_value_map_dependency_present,
      same_packet_ref_dependency_closures_present:
        endpointFieldCounts.same_packet_ref_carrier_field_dependencies_closed,
      same_packet_value_map_dependency_closures_present:
        endpointFieldCounts.same_packet_value_map_carrier_field_dependencies_closed,
      cycle_breakers_available: endpointFieldCounts.cycle_breaker_available,
      row_selected_route_input_pairs_ready:
        rowFieldCounts.combined_selected_route_inputs_ready,
      row_dependency_cycle_pairs_detected:
        rowFieldCounts.combined_dependency_cycle_pair_detected,
      row_escape_route_pairs_declared:
        rowFieldCounts.combined_escape_route_pair_declared,
      row_independent_theorem_pairs_present:
        rowFieldCounts.combined_independent_full_binding_theorem_pair_present,
      row_independent_full_binding_pairs_constructed:
        rowFieldCounts.combined_independent_full_binding_pair_constructed,
      row_carrier_admission_bridge_pairs_present:
        rowFieldCounts.combined_carrier_admission_bridge_pair_present,
      row_full_binding_packet_full_binding_pairs_constructed:
        rowFieldCounts.combined_full_binding_packet_full_binding_pair_constructed,
      row_carrier_field_layer_full_binding_pairs_constructed:
        rowFieldCounts.combined_carrier_field_layer_full_binding_pair_constructed,
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
        "No endpoint supplies the independent theorem, full-binding construction fields, carrier-admission bridge, or same-packet dependency fields required to unblock a row pair.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed independent full endpoint boundary-binding theorem attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.selected_carrier_admission_route_inputs_ready} | ${fields.dependency_cycle_detected} | ${fields.dependency_cycle_escape_route_declared} | ${fields.independent_full_endpoint_boundary_binding_theorem_present} | ${fields.independent_full_endpoint_boundary_binding_constructed} | ${fields.independent_carrier_admission_bridge_present} | ${fields.full_binding_packet_full_endpoint_boundary_binding_constructed} | ${fields.carrier_field_layer_full_endpoint_boundary_binding_constructed} | ${fields.same_packet_full_endpoint_boundary_binding_dependency_present} | ${fields.same_packet_ref_carrier_field_dependencies_closed} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_selected_route_inputs_ready} | ${fields.combined_dependency_cycle_pair_detected} | ${fields.combined_escape_route_pair_declared} | ${fields.combined_independent_full_binding_theorem_pair_present} | ${fields.combined_independent_full_binding_pair_constructed} | ${fields.combined_carrier_admission_bridge_pair_present} | ${fields.combined_cycle_breaker_pair_available} | ${row.row_consumed} |`;
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
  return `# Independent Full Endpoint Boundary-Binding Theorem Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests the dependency-cycle escape route named by the
actual-link/membership cycle packet: an independent full endpoint
boundary-binding theorem. It tests the first exact blockers named by the
constructive dependency lemma packet: full-binding-packet full endpoint
boundary-binding construction and carrier-field-layer full endpoint
boundary-binding construction.

The attempt remains fail-closed. It records ${summary.selected_carrier_admission_route_inputs_ready} / ${summary.endpoint_functionals}
selected carrier-admission route inputs, ${summary.contract_target_layers_ready} / ${summary.endpoint_functionals}
contract-target layers, ${summary.full_binding_construction_inputs_ready} / ${summary.endpoint_functionals}
full-binding construction inputs, ${summary.dependency_cycles_detected} / ${summary.endpoint_functionals}
dependency cycles, and ${summary.dependency_cycle_escape_routes_declared} / ${summary.endpoint_functionals}
independent full endpoint boundary-binding theorem escape-route declarations.
It constructs/proves ${summary.full_binding_packet_full_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals}
full endpoint boundary bindings in the full-binding packet and ${summary.carrier_field_layer_full_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals}
in the carrier-field construction layer, but same-packet full endpoint
boundary-binding dependencies, endpoint boundary-binding dependencies,
value-bound dependencies, witness-object dependencies, ref/value dependency
closures, row consumption, and branch-chart authorization remain absent.

The independent theorem itself is absent: ${summary.independent_full_endpoint_boundary_binding_theorems_present} / ${summary.endpoint_functionals}
theorems, ${summary.independent_theorem_derivations_present} / ${summary.endpoint_functionals}
derivations, ${summary.independent_theorem_soundness_proofs_present} / ${summary.endpoint_functionals}
soundness proofs, ${summary.independent_theorem_application_proofs_present} / ${summary.endpoint_functionals}
endpoint application proofs, ${summary.no_contract_link_premise_proofs_present} / ${summary.endpoint_functionals}
no-contract-link premise proofs, and ${summary.independent_carrier_admission_bridges_present} / ${summary.endpoint_functionals}
carrier-admission bridges. It consumes ${summary.row_consumption_count} rows
and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Theorem Target

${packet.theorem_target.statement}

Accepted as a cycle breaker if: ${packet.theorem_target.accepted_as_cycle_breaker_if}

Accepted as constructive dependency discharge if: ${packet.theorem_target.accepted_as_constructive_dependency_discharge_if}

## No-Promotion Rule

${packet.no_promotion_rule}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Proof Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.theorem_proof_routes)}

## Endpoint Attempts

| Endpoint | Role | Selected inputs | Cycle | Escape declared | Independent theorem | Independent full binding | Carrier bridge | Full-binding packet full binding | Carrier-field full binding | Same-packet full dependency | Ref closure | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_independent_full_endpoint_boundary_binding_theorem_attempts)}

## Row Attempts

| Row | Selected input pair | Cycle pair | Escape pair | Independent theorem pair | Independent full-binding pair | Carrier bridge pair | Cycle-breaker pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_independent_full_endpoint_boundary_binding_theorem_attempts)}

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
    constructiveDependency: readJson(args.constructiveDependencyPacket),
    fullBindingConstruction: readJson(args.fullBindingConstructionPacket),
    carrierFieldConstruction: readJson(args.carrierFieldConstructionPacket),
    nonDomainCarrierObstruction: readJson(args.nonDomainCarrierObstructionPacket),
    completion: readJson(args.completionPacket),
    dependencyCycle: readJson(args.dependencyCyclePacket),
    binding: readJson(args.bindingPacket),
    routeDecision: readJson(args.routeDecisionPacket),
    contractTarget: readJson(args.contractTargetPacket),
  };
  const sourcePaths = {
    constructiveDependency: args.constructiveDependencyPacket,
    fullBindingConstruction: args.fullBindingConstructionPacket,
    carrierFieldConstruction: args.carrierFieldConstructionPacket,
    nonDomainCarrierObstruction: args.nonDomainCarrierObstructionPacket,
    completion: args.completionPacket,
    dependencyCycle: args.dependencyCyclePacket,
    binding: args.bindingPacket,
    routeDecision: args.routeDecisionPacket,
    contractTarget: args.contractTargetPacket,
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

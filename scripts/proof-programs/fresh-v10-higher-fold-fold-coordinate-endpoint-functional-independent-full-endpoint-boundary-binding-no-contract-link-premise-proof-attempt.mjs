#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_INDEPENDENT_THEOREM_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_full_endpoint_boundary_binding_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
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
const DEFAULT_FULL_BINDING_CONSTRUCTION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_LINK_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_witness_object_contract_link_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const INDEPENDENT_THEOREM_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-full-endpoint-boundary-binding-theorem-attempt-fail-closed-selected-route-inputs-present-independent-full-binding-theorem-absent-no-row-consumption";
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
const FULL_BINDING_CONSTRUCTION_STATUS =
  "priority-only-full-endpoint-boundary-binding-construction-attempt-fail-closed-contract-targets-present-full-binding-motion-evaluation-replay-blocked-no-row-consumption";
const CONTRACT_LINK_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-witness-object-contract-link-construction-attempt-fail-closed-contract-link-source-candidates-present-witness-object-contract-links-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-full-endpoint-boundary-binding-no-contract-link-premise-proof-attempt-fail-closed-selected-route-inputs-present-no-contract-link-premise-proof-absent-no-row-consumption";

const INPUT_FIELDS = [
  "independent_theorem_packet_input_present",
  "selected_carrier_admission_route_inputs_ready",
  "contract_target_layer_ready",
  "full_binding_construction_input_ready",
  "dependency_cycle_detected",
  "dependency_cycle_escape_route_declared",
  "direct_source_promotion_rejected",
  "proof_independence_guard_declared",
  "route_decision_selected_route_inputs_ready",
  "contract_target_route_input_ready",
  "full_binding_construction_route_input_ready",
  "witness_object_contract_link_source_candidate_recorded",
  "allowed_source_inputs_ready",
];

const PROHIBITED_PREMISE_FIELDS = [
  "selected_route_requires_witness_object_contract_link",
  "selected_route_requires_binding_contract_satisfaction",
  "selected_route_requires_full_endpoint_boundary_binding",
  "selected_route_requires_carrier_admission_unblock",
  "actual_link_membership_theorem_named_as_completion_layer",
  "actual_contract_link_rule_application_proof_present",
  "same_constructed_witness_object_identity_proof_present",
  "witness_object_membership_proof_present",
  "witness_object_contract_link_constructed",
  "witness_object_has_contract_link",
  "binding_contract_satisfied",
  "selected_route_contract_link_dependency_eliminated",
];

const NO_CONTRACT_LINK_PREMISE_FIELDS = [
  "independent_no_contract_link_premise_proof_present",
  "independent_no_contract_link_premise_derivation_present",
  "independent_no_contract_link_premise_soundness_proof_present",
  "independent_no_contract_link_premise_endpoint_application_proof_present",
  "independent_full_binding_not_using_witness_object_contract_link_as_premise_proven",
  "independent_binding_contract_satisfaction_without_contract_link_present",
  "independent_carrier_admission_bridge_present",
  "independent_no_contract_link_route_available",
];

const DOWNSTREAM_FIELDS = [
  "independent_full_endpoint_boundary_binding_theorem_derivation_present",
  "independent_full_endpoint_boundary_binding_theorem_soundness_proof_present",
  "independent_full_endpoint_boundary_binding_endpoint_application_proof_present",
  "independent_full_endpoint_boundary_binding_theorem_present",
  "full_binding_packet_full_endpoint_boundary_binding_constructed",
  "carrier_field_layer_full_endpoint_boundary_binding_constructed",
  "same_packet_full_endpoint_boundary_binding_dependency_present",
  "same_packet_ref_carrier_field_dependencies_closed",
  "same_packet_value_map_carrier_field_dependencies_closed",
  "independent_theorem_derivation_unblocked",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...INPUT_FIELDS,
  ...PROHIBITED_PREMISE_FIELDS,
  ...NO_CONTRACT_LINK_PREMISE_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_allowed_source_inputs_ready",
  "receiver_allowed_source_inputs_ready",
  "combined_allowed_source_inputs_ready",
  "source_dependency_cycle_detected",
  "receiver_dependency_cycle_detected",
  "combined_dependency_cycle_pair_detected",
  "source_escape_route_declared",
  "receiver_escape_route_declared",
  "combined_escape_route_pair_declared",
  "source_selected_route_requires_contract_link",
  "receiver_selected_route_requires_contract_link",
  "combined_selected_route_contract_link_requirement_pair",
  "source_no_contract_link_premise_proof_present",
  "receiver_no_contract_link_premise_proof_present",
  "combined_no_contract_link_premise_proof_pair_present",
  "source_selected_route_contract_link_dependency_eliminated",
  "receiver_selected_route_contract_link_dependency_eliminated",
  "combined_selected_route_contract_link_dependency_eliminated",
  "source_independent_no_contract_link_route_available",
  "receiver_independent_no_contract_link_route_available",
  "combined_independent_no_contract_link_route_pair_available",
  "source_independent_theorem_derivation_unblocked",
  "receiver_independent_theorem_derivation_unblocked",
  "combined_independent_theorem_derivation_pair_unblocked",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const PREMISE_PROOF_ROUTES = [
  {
    route_id: "selected_carrier_admission_route_without_contract_link",
    status: "blocked-cyclic-premise",
    required_fields: [
      "selected_carrier_admission_route_inputs_ready",
      "selected_route_contract_link_dependency_eliminated",
      "independent_no_contract_link_premise_proof_present",
    ],
    limitation:
      "The selected carrier-admission route is input-ready, but its current completion fields still include `witness_object_has_contract_link`.",
  },
  {
    route_id: "contract_target_as_no_contract_link_premise_proof",
    status: "rejected-target-only",
    required_fields: [
      "contract_target_layer_ready",
      "independent_no_contract_link_premise_proof_present",
    ],
    limitation:
      "A declared full endpoint boundary-binding contract target is an obligation, not a proof that the route avoids the contract-link premise.",
  },
  {
    route_id: "full_binding_construction_input_as_no_contract_link_premise_proof",
    status: "rejected-input-only",
    required_fields: [
      "full_binding_construction_input_ready",
      "independent_no_contract_link_premise_proof_present",
    ],
    limitation:
      "Input-ready full-binding construction data does not prove premise independence.",
  },
  {
    route_id: "dependency_cycle_escape_declaration_as_no_contract_link_premise_proof",
    status: "rejected-declaration-only",
    required_fields: [
      "dependency_cycle_escape_route_declared",
      "dependency_cycle_detected",
      "independent_no_contract_link_premise_derivation_present",
    ],
    limitation:
      "The dependency-cycle packet declares the independent theorem as an escape route, but declaration is not a derivation.",
  },
  {
    route_id: "witness_object_contract_link_source_candidate_as_independence_proof",
    status: "rejected-source-candidate-only",
    required_fields: [
      "witness_object_contract_link_source_candidate_recorded",
      "selected_route_contract_link_dependency_eliminated",
    ],
    limitation:
      "A recorded contract-link source candidate is not an actual link and cannot prove that the selected route avoids the link premise.",
  },
  {
    route_id: "independent_theorem_attempt_burden_as_no_contract_link_premise_proof",
    status: "rejected-missing-burden-only",
    required_fields: [
      "proof_independence_guard_declared",
      "independent_full_binding_not_using_witness_object_contract_link_as_premise_proven",
    ],
    limitation:
      "The independent-theorem attempt names the no-contract-link premise burden, but the burden is still false for all endpoints.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "no_contract_link_premise_proof",
    missing_field: "independent_no_contract_link_premise_proof_present",
    required_evidence:
      "A proof that the independent full endpoint boundary-binding route does not use `witness_object_has_contract_link` as a premise.",
  },
  {
    burden_id: "no_contract_link_premise_derivation",
    missing_field: "independent_no_contract_link_premise_derivation_present",
    required_evidence:
      "A derivation of the no-contract-link premise from current contract targets, value maps, and proof-order data without importing an actual contract link.",
  },
  {
    burden_id: "no_contract_link_premise_soundness",
    missing_field: "independent_no_contract_link_premise_soundness_proof_present",
    required_evidence:
      "A soundness proof that selected-route readiness, contract targets, source candidates, and escape-route declarations are not promoted into premise independence.",
  },
  {
    burden_id: "no_contract_link_premise_endpoint_application",
    missing_field:
      "independent_no_contract_link_premise_endpoint_application_proof_present",
    required_evidence:
      "Endpoint-by-endpoint application proof for all four endpoint functionals.",
  },
  {
    burden_id: "selected_route_contract_link_dependency_elimination",
    missing_field: "selected_route_contract_link_dependency_eliminated",
    required_evidence:
      "A proof or revised route showing that the selected carrier-admission route no longer lists `witness_object_has_contract_link` as a completion premise.",
  },
  {
    burden_id: "independent_binding_contract_satisfaction_without_contract_link",
    missing_field:
      "independent_binding_contract_satisfaction_without_contract_link_present",
    required_evidence:
      "A binding-contract satisfaction proof that does not route through the witness-object contract link.",
  },
  {
    burden_id: "independent_carrier_admission_bridge",
    missing_field: "independent_carrier_admission_bridge_present",
    required_evidence:
      "A carrier-admission bridge supplied by the independent route rather than by the cyclic selected route.",
  },
];

function parseArgs(argv) {
  const args = {
    independentTheoremPacket: DEFAULT_INDEPENDENT_THEOREM_PACKET,
    completionPacket: DEFAULT_COMPLETION_PACKET,
    dependencyCyclePacket: DEFAULT_DEPENDENCY_CYCLE_PACKET,
    bindingPacket: DEFAULT_BINDING_PACKET,
    routeDecisionPacket: DEFAULT_ROUTE_DECISION_PACKET,
    contractTargetPacket: DEFAULT_CONTRACT_TARGET_PACKET,
    fullBindingConstructionPacket: DEFAULT_FULL_BINDING_CONSTRUCTION_PACKET,
    contractLinkPacket: DEFAULT_CONTRACT_LINK_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--independent-theorem-packet") {
      args.independentTheoremPacket = argv[++index];
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
    } else if (arg === "--full-binding-construction-packet") {
      args.fullBindingConstructionPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-full-endpoint-boundary-binding-no-contract-link-premise-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --independent-theorem-packet <path>",
    "  --completion-packet <path>",
    "  --dependency-cycle-packet <path>",
    "  --binding-packet <path>",
    "  --route-decision-packet <path>",
    "  --contract-target-packet <path>",
    "  --full-binding-construction-packet <path>",
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
    throw new Error(`Refusing premise proof attempt from authorized ${label}.`);
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

function selectedRouteMissing(routeDecision) {
  return routeDecision.carrier_admission_route?.missing_completion_fields ?? [];
}

function buildProhibitedPremiseHits({
  completion,
  routeDecision,
  contractLink,
  fields,
}) {
  const routeMissing = selectedRouteMissing(routeDecision);
  return [
    {
      premise: "witness_object_has_contract_link",
      observed_dependency: routeMissing.includes("witness_object_has_contract_link"),
      source: "route_decision.carrier_admission_route.missing_completion_fields",
      accepted_as_independent_premise: false,
    },
    {
      premise: "binding_contract_satisfied",
      observed_dependency: routeMissing.includes("binding_contract_satisfied"),
      source: "route_decision.carrier_admission_route.missing_completion_fields",
      accepted_as_independent_premise: false,
    },
    {
      premise: "full_endpoint_boundary_binding_constructed",
      observed_dependency: routeMissing.includes(
        "full_endpoint_boundary_binding_constructed"
      ),
      source: "route_decision.carrier_admission_route.missing_completion_fields",
      accepted_as_independent_premise: false,
    },
    {
      premise: "actual-link-rule-plus-constructed-witness-object-membership",
      observed_dependency:
        completion.first_missing_theorem_layer ===
        "actual-link-rule-plus-constructed-witness-object-membership",
      source: "binding_full_binding_completion_attempt.first_missing_theorem_layer",
      accepted_as_independent_premise: false,
    },
    {
      premise: "witness_object_contract_link_source_candidate",
      observed_dependency:
        contractLink.witness_object_contract_link_source_candidate_recorded ===
          true ||
        fields.witness_object_contract_link_source_candidate_recorded === true,
      source: "witness_object_contract_link_construction_attempt",
      accepted_as_independent_premise: false,
    },
  ];
}

function buildEndpointAttempt({
  theorem,
  completion,
  cycle,
  binding,
  routeDecision,
  contractTarget,
  fullConstruction,
  contractLink,
}) {
  const theoremFields = theorem.required_fields_present ?? {};
  const completionFields = completion.required_fields_present ?? {};
  const bindingFields = binding.required_fields_present ?? {};
  const routeFields = routeDecision.required_fields_present ?? {};
  const contractFields = contractTarget.required_fields_present ?? {};
  const fullFields = fullConstruction.required_fields_present ?? {};
  const linkFields = contractLink.required_fields_present ?? {};
  const routeMissing = selectedRouteMissing(routeDecision);

  const fields = {
    independent_theorem_packet_input_present: true,
    selected_carrier_admission_route_inputs_ready:
      theoremFields.selected_carrier_admission_route_inputs_ready === true &&
      completion.selected_route_input_ready === true,
    contract_target_layer_ready:
      theoremFields.contract_target_layer_ready === true &&
      contractFields.full_endpoint_boundary_binding_contract_target_declared ===
        true &&
      contractFields.target_endpoint_boundary_binding_object_constructed === true,
    full_binding_construction_input_ready:
      theoremFields.full_binding_construction_input_ready === true &&
      fullFields.full_endpoint_boundary_binding_construction_input_ready === true,
    dependency_cycle_detected:
      theoremFields.dependency_cycle_detected === true &&
      cycle.dependency_cycle_detected === true,
    dependency_cycle_escape_route_declared:
      theoremFields.dependency_cycle_escape_route_declared === true &&
      hasEscapeRoute(cycle, "independent_full_endpoint_boundary_binding_theorem"),
    direct_source_promotion_rejected:
      theoremFields.direct_source_promotion_rejected === true &&
      routeFields.direct_source_promotion_rejected === true &&
      req(cycle, "direct_source_promotion_rejected"),
    proof_independence_guard_declared:
      theoremFields.proof_independence_guard_declared === true,
    route_decision_selected_route_inputs_ready:
      routeDecision.carrier_admission_route?.inputs_ready === true &&
      routeFields.carrier_admission_route_selected === true,
    contract_target_route_input_ready:
      contractFields.full_endpoint_boundary_binding_contract_target_declared ===
      true,
    full_binding_construction_route_input_ready:
      fullFields.full_endpoint_boundary_binding_construction_input_ready === true,
    witness_object_contract_link_source_candidate_recorded:
      completionFields.witness_object_contract_link_source_candidate_recorded ===
        true ||
      linkFields.witness_object_contract_link_source_candidate_recorded === true,
    allowed_source_inputs_ready: false,
    selected_route_requires_witness_object_contract_link:
      routeMissing.includes("witness_object_has_contract_link"),
    selected_route_requires_binding_contract_satisfaction:
      routeMissing.includes("binding_contract_satisfied"),
    selected_route_requires_full_endpoint_boundary_binding:
      routeMissing.includes("full_endpoint_boundary_binding_constructed"),
    selected_route_requires_carrier_admission_unblock:
      routeMissing.includes("endpoint_boundary_binding_ref_carrier_unblocked") &&
      routeMissing.includes("endpoint_value_binding_map_carrier_unblocked"),
    actual_link_membership_theorem_named_as_completion_layer:
      completion.first_missing_theorem_layer ===
      "actual-link-rule-plus-constructed-witness-object-membership",
    actual_contract_link_rule_application_proof_present:
      completionFields.actual_contract_link_rule_application_proof_present === true,
    same_constructed_witness_object_identity_proof_present:
      completionFields.same_constructed_witness_object_identity_proof_present ===
      true,
    witness_object_membership_proof_present:
      completionFields.witness_object_membership_proof_present === true,
    witness_object_contract_link_constructed:
      completionFields.witness_object_contract_link_constructed === true ||
      linkFields.witness_object_contract_link_constructed === true,
    witness_object_has_contract_link:
      completionFields.witness_object_has_contract_link === true ||
      bindingFields.witness_object_has_contract_link === true ||
      linkFields.witness_object_has_contract_link === true,
    binding_contract_satisfied:
      completionFields.binding_contract_satisfied === true ||
      bindingFields.binding_contract_satisfied === true ||
      linkFields.binding_contract_satisfied === true,
    selected_route_contract_link_dependency_eliminated: false,
    independent_no_contract_link_premise_proof_present: false,
    independent_no_contract_link_premise_derivation_present: false,
    independent_no_contract_link_premise_soundness_proof_present: false,
    independent_no_contract_link_premise_endpoint_application_proof_present:
      false,
    independent_full_binding_not_using_witness_object_contract_link_as_premise_proven:
      false,
    independent_binding_contract_satisfaction_without_contract_link_present:
      false,
    independent_carrier_admission_bridge_present:
      theoremFields.independent_carrier_admission_bridge_present === true,
    independent_no_contract_link_route_available: false,
    independent_full_endpoint_boundary_binding_theorem_derivation_present:
      theoremFields
        .independent_full_endpoint_boundary_binding_theorem_derivation_present ===
      true,
    independent_full_endpoint_boundary_binding_theorem_soundness_proof_present:
      theoremFields
        .independent_full_endpoint_boundary_binding_theorem_soundness_proof_present ===
      true,
    independent_full_endpoint_boundary_binding_endpoint_application_proof_present:
      theoremFields
        .independent_full_endpoint_boundary_binding_endpoint_application_proof_present ===
      true,
    independent_full_endpoint_boundary_binding_theorem_present:
      theoremFields.independent_full_endpoint_boundary_binding_theorem_present ===
      true,
    full_binding_packet_full_endpoint_boundary_binding_constructed:
      theoremFields.full_binding_packet_full_endpoint_boundary_binding_constructed ===
      true,
    carrier_field_layer_full_endpoint_boundary_binding_constructed:
      theoremFields.carrier_field_layer_full_endpoint_boundary_binding_constructed ===
      true,
    same_packet_full_endpoint_boundary_binding_dependency_present:
      theoremFields.same_packet_full_endpoint_boundary_binding_dependency_present ===
      true,
    same_packet_ref_carrier_field_dependencies_closed:
      theoremFields.same_packet_ref_carrier_field_dependencies_closed === true,
    same_packet_value_map_carrier_field_dependencies_closed:
      theoremFields.same_packet_value_map_carrier_field_dependencies_closed === true,
    independent_theorem_derivation_unblocked: false,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.allowed_source_inputs_ready = missing(fields, INPUT_FIELDS).length === 1;
  fields.independent_no_contract_link_route_available =
    fields.selected_route_contract_link_dependency_eliminated &&
    fields.independent_no_contract_link_premise_proof_present &&
    fields.independent_no_contract_link_premise_derivation_present &&
    fields.independent_no_contract_link_premise_soundness_proof_present &&
    fields
      .independent_no_contract_link_premise_endpoint_application_proof_present;
  fields.independent_theorem_derivation_unblocked =
    fields.independent_no_contract_link_route_available &&
    fields.independent_full_endpoint_boundary_binding_theorem_derivation_present;

  const premiseRouteAttempts = PREMISE_PROOF_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: theorem.id,
    endpoint_functional_id: theorem.endpoint_functional_id,
    role: theorem.role,
    no_contract_link_premise_proof_attempt_id:
      `no_contract_link_premise_proof_attempt:${theorem.id}`,
    source_attempt_ids: {
      independent_full_endpoint_boundary_binding_theorem:
        theorem.independent_full_endpoint_boundary_binding_theorem_attempt_id,
      binding_full_binding_completion:
        completion.binding_full_binding_completion_attempt_id,
      actual_link_membership_dependency_cycle:
        cycle.actual_link_membership_dependency_cycle_completion_attempt_id,
      binding_contract_full_binding_carrier_admission:
        binding.binding_contract_full_binding_carrier_admission_attempt_id,
      route_decision: routeDecision.route_decision_id,
      full_endpoint_boundary_binding_contract_target:
        contractTarget.full_endpoint_boundary_binding_contract_target?.target_id,
      full_endpoint_boundary_binding_construction:
        fullConstruction.source_contract_target_id,
      witness_object_contract_link:
        contractLink.witness_object_contract_link_construction_attempt_id,
    },
    premise_target: {
      premise_id: `no_contract_link_premise:${theorem.id}`,
      statement:
        "Prove that the independent full endpoint boundary-binding route does not use `witness_object_has_contract_link` as a premise.",
      accepted_if:
        "The endpoint supplies a no-contract-link premise derivation, soundness proof, endpoint application proof, selected-route dependency elimination, binding-contract satisfaction without the link premise, and independent carrier-admission bridge.",
      allowed_source_inputs: [
        "selected carrier-admission route input readiness",
        "full endpoint boundary-binding contract target readiness",
        "full-binding construction input readiness",
        "dependency-cycle detection",
        "dependency-cycle escape-route declaration",
        "direct source-promotion rejection",
      ],
      prohibited_premises: [
        "witness_object_has_contract_link",
        "binding_contract_satisfied through the current selected route",
        "actual contract-link rule application",
        "same constructed-witness-object membership proof",
        "proof-contract order revision",
        "row consumption",
        "branch-chart authorization",
      ],
    },
    dependency_edge_inventory: cycle.cycle_edges ?? [],
    prohibited_premise_hits: buildProhibitedPremiseHits({
      completion,
      routeDecision,
      contractLink,
      fields,
    }),
    required_fields_present: fields,
    premise_route_attempts: premiseRouteAttempts,
    premise_routes_passed: [],
    missing_no_contract_link_premise_obligations: missing(
      fields,
      NO_CONTRACT_LINK_PREMISE_FIELDS
    ),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 5)
      .map((burden) => burden.missing_field),
    no_contract_link_premise_proven:
      fields.independent_full_binding_not_using_witness_object_contract_link_as_premise_proven,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has selected-route inputs, contract targets, full-binding construction inputs, dependency-cycle detection, and an escape-route declaration, but the selected route still lists `witness_object_has_contract_link` as a completion premise and no independent no-contract-link premise proof, derivation, soundness proof, endpoint application proof, dependency-elimination proof, or carrier-admission bridge is present.",
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
    source_allowed_source_inputs_ready: sourceFields.allowed_source_inputs_ready,
    receiver_allowed_source_inputs_ready:
      receiverFields.allowed_source_inputs_ready,
    combined_allowed_source_inputs_ready: false,
    source_dependency_cycle_detected: sourceFields.dependency_cycle_detected,
    receiver_dependency_cycle_detected: receiverFields.dependency_cycle_detected,
    combined_dependency_cycle_pair_detected: false,
    source_escape_route_declared:
      sourceFields.dependency_cycle_escape_route_declared,
    receiver_escape_route_declared:
      receiverFields.dependency_cycle_escape_route_declared,
    combined_escape_route_pair_declared: false,
    source_selected_route_requires_contract_link:
      sourceFields.selected_route_requires_witness_object_contract_link,
    receiver_selected_route_requires_contract_link:
      receiverFields.selected_route_requires_witness_object_contract_link,
    combined_selected_route_contract_link_requirement_pair: false,
    source_no_contract_link_premise_proof_present:
      sourceFields.independent_no_contract_link_premise_proof_present,
    receiver_no_contract_link_premise_proof_present:
      receiverFields.independent_no_contract_link_premise_proof_present,
    combined_no_contract_link_premise_proof_pair_present: false,
    source_selected_route_contract_link_dependency_eliminated:
      sourceFields.selected_route_contract_link_dependency_eliminated,
    receiver_selected_route_contract_link_dependency_eliminated:
      receiverFields.selected_route_contract_link_dependency_eliminated,
    combined_selected_route_contract_link_dependency_eliminated: false,
    source_independent_no_contract_link_route_available:
      sourceFields.independent_no_contract_link_route_available,
    receiver_independent_no_contract_link_route_available:
      receiverFields.independent_no_contract_link_route_available,
    combined_independent_no_contract_link_route_pair_available: false,
    source_independent_theorem_derivation_unblocked:
      sourceFields.independent_theorem_derivation_unblocked,
    receiver_independent_theorem_derivation_unblocked:
      receiverFields.independent_theorem_derivation_unblocked,
    combined_independent_theorem_derivation_pair_unblocked: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_allowed_source_inputs_ready =
    fields.source_allowed_source_inputs_ready &&
    fields.receiver_allowed_source_inputs_ready;
  fields.combined_dependency_cycle_pair_detected =
    fields.source_dependency_cycle_detected &&
    fields.receiver_dependency_cycle_detected;
  fields.combined_escape_route_pair_declared =
    fields.source_escape_route_declared && fields.receiver_escape_route_declared;
  fields.combined_selected_route_contract_link_requirement_pair =
    fields.source_selected_route_requires_contract_link &&
    fields.receiver_selected_route_requires_contract_link;
  fields.combined_no_contract_link_premise_proof_pair_present =
    fields.source_no_contract_link_premise_proof_present &&
    fields.receiver_no_contract_link_premise_proof_present;
  fields.combined_selected_route_contract_link_dependency_eliminated =
    fields.source_selected_route_contract_link_dependency_eliminated &&
    fields.receiver_selected_route_contract_link_dependency_eliminated;
  fields.combined_independent_no_contract_link_route_pair_available =
    fields.source_independent_no_contract_link_route_available &&
    fields.receiver_independent_no_contract_link_route_available;
  fields.combined_independent_theorem_derivation_pair_unblocked =
    fields.source_independent_theorem_derivation_unblocked &&
    fields.receiver_independent_theorem_derivation_unblocked;

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
    source_no_contract_link_premise_proof_attempt_id:
      source.no_contract_link_premise_proof_attempt_id,
    receiver_no_contract_link_premise_proof_attempt_id:
      receiver.no_contract_link_premise_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has allowed-source input pairs, dependency-cycle pairs, escape-route pairs, and selected-route contract-link requirement pairs, but no no-contract-link premise proof pair or selected-route dependency-elimination pair.",
  };
}

function buildPacket(sources, sourcePaths) {
  assertPacket(
    sources.independentTheorem,
    INDEPENDENT_THEOREM_STATUS,
    "independent theorem packet"
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
  assertPacket(
    sources.fullBindingConstruction,
    FULL_BINDING_CONSTRUCTION_STATUS,
    "full-binding construction packet"
  );
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
  const fullConstructionById = idMap(
    sources.fullBindingConstruction
      .endpoint_full_boundary_binding_construction_attempts,
    "id",
    "full endpoint boundary-binding construction endpoint"
  );
  const contractLinkById = idMap(
    sources.contractLink.endpoint_witness_object_contract_link_construction_attempts,
    "id",
    "witness-object contract-link endpoint"
  );

  const endpointAttempts =
    sources.independentTheorem
      .endpoint_independent_full_endpoint_boundary_binding_theorem_attempts.map(
        (theorem) =>
          buildEndpointAttempt({
            theorem,
            completion: requireMapped(
              completionById,
              theorem.id,
              `completion endpoint ${theorem.id}`
            ),
            cycle: requireMapped(
              cycleById,
              theorem.id,
              `dependency-cycle endpoint ${theorem.id}`
            ),
            binding: requireMapped(
              bindingById,
              theorem.id,
              `binding endpoint ${theorem.id}`
            ),
            routeDecision: requireMapped(
              routeDecisionById,
              theorem.id,
              `route decision endpoint ${theorem.id}`
            ),
            contractTarget: requireMapped(
              contractTargetById,
              theorem.id,
              `contract target endpoint ${theorem.id}`
            ),
            fullConstruction: requireMapped(
              fullConstructionById,
              theorem.id,
              `full-binding construction endpoint ${theorem.id}`
            ),
            contractLink: requireMapped(
              contractLinkById,
              theorem.id,
              `witness-object contract-link endpoint ${theorem.id}`
            ),
          })
      );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "no-contract-link premise endpoint"
  );
  const rowAttempts =
    sources.independentTheorem
      .row_independent_full_endpoint_boundary_binding_theorem_attempts.map(
        (row) => buildRowAttempt(row, endpointMap)
      );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-independent-full-endpoint-boundary-binding-no-contract-link-premise-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed premise proof attempt; selected-route inputs and dependency-cycle evidence are present, but the no-contract-link premise proof is absent",
    source_artifacts: makeSourceArtifacts([
      {
        label: "independent_full_endpoint_boundary_binding_theorem_attempt",
        filePath: sourcePaths.independentTheorem,
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
        label: "full_endpoint_boundary_binding_construction_attempt",
        filePath: sourcePaths.fullBindingConstruction,
      },
      {
        label: "witness_object_contract_link_construction_attempt",
        filePath: sourcePaths.contractLink,
      },
    ]),
    premise_target: {
      premise_id:
        "independent-full-endpoint-boundary-binding-no-contract-link-premise-target",
      statement:
        "For each endpoint functional, prove that the independent full endpoint boundary-binding route does not use `witness_object_has_contract_link` as a premise.",
      accepted_if:
        "Each endpoint has a no-contract-link premise derivation, soundness proof, endpoint application proof, selected-route contract-link dependency elimination, independent binding-contract satisfaction without the link, and independent carrier-admission bridge.",
      current_premise_proofs_available:
        endpointFieldCounts
          .independent_full_binding_not_using_witness_object_contract_link_as_premise_proven,
    },
    no_promotion_rule:
      "Selected-route inputs, contract targets, full-binding construction inputs, dependency-cycle declarations, and contract-link source candidates are not promoted into a proof that the route avoids `witness_object_has_contract_link`.",
    independence_exclusions: [
      "witness_object_has_contract_link",
      "binding_contract_satisfied through the current selected route",
      "actual contract-link rule application",
      "constructed witness-object membership theorem as a premise",
      "proof-contract order revision",
      "row consumption",
      "branch-chart authorization",
    ],
    proof_burdens: PROOF_BURDENS,
    premise_proof_routes: PREMISE_PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_no_contract_link_premise_proof_attempts: endpointAttempts,
    row_no_contract_link_premise_proof_attempts: rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      selected_carrier_admission_route_inputs_ready:
        endpointFieldCounts.selected_carrier_admission_route_inputs_ready,
      contract_target_layers_ready:
        endpointFieldCounts.contract_target_layer_ready,
      full_binding_construction_inputs_ready:
        endpointFieldCounts.full_binding_construction_input_ready,
      dependency_cycles_detected: endpointFieldCounts.dependency_cycle_detected,
      dependency_cycle_escape_routes_declared:
        endpointFieldCounts.dependency_cycle_escape_route_declared,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      proof_independence_guards_declared:
        endpointFieldCounts.proof_independence_guard_declared,
      route_decision_selected_route_inputs_ready:
        endpointFieldCounts.route_decision_selected_route_inputs_ready,
      witness_object_contract_link_source_candidates_recorded:
        endpointFieldCounts.witness_object_contract_link_source_candidate_recorded,
      allowed_source_inputs_ready: endpointFieldCounts.allowed_source_inputs_ready,
      selected_routes_requiring_witness_object_contract_link:
        endpointFieldCounts.selected_route_requires_witness_object_contract_link,
      selected_routes_requiring_binding_contract_satisfaction:
        endpointFieldCounts.selected_route_requires_binding_contract_satisfaction,
      selected_routes_requiring_full_endpoint_boundary_binding:
        endpointFieldCounts.selected_route_requires_full_endpoint_boundary_binding,
      actual_link_membership_completion_layers_named:
        endpointFieldCounts
          .actual_link_membership_theorem_named_as_completion_layer,
      witness_object_contract_links_constructed:
        endpointFieldCounts.witness_object_contract_link_constructed,
      witness_objects_with_contract_link:
        endpointFieldCounts.witness_object_has_contract_link,
      binding_contracts_satisfied: endpointFieldCounts.binding_contract_satisfied,
      selected_route_contract_link_dependencies_eliminated:
        endpointFieldCounts.selected_route_contract_link_dependency_eliminated,
      no_contract_link_premise_proofs_present:
        endpointFieldCounts.independent_no_contract_link_premise_proof_present,
      no_contract_link_premise_derivations_present:
        endpointFieldCounts.independent_no_contract_link_premise_derivation_present,
      no_contract_link_premise_soundness_proofs_present:
        endpointFieldCounts
          .independent_no_contract_link_premise_soundness_proof_present,
      no_contract_link_premise_endpoint_application_proofs_present:
        endpointFieldCounts
          .independent_no_contract_link_premise_endpoint_application_proof_present,
      no_contract_link_premise_proven:
        endpointFieldCounts
          .independent_full_binding_not_using_witness_object_contract_link_as_premise_proven,
      independent_binding_contract_satisfaction_without_contract_link_present:
        endpointFieldCounts
          .independent_binding_contract_satisfaction_without_contract_link_present,
      independent_carrier_admission_bridges_present:
        endpointFieldCounts.independent_carrier_admission_bridge_present,
      independent_no_contract_link_routes_available:
        endpointFieldCounts.independent_no_contract_link_route_available,
      independent_theorem_derivations_present:
        endpointFieldCounts
          .independent_full_endpoint_boundary_binding_theorem_derivation_present,
      independent_theorem_derivations_unblocked:
        endpointFieldCounts.independent_theorem_derivation_unblocked,
      independent_full_endpoint_boundary_binding_theorems_present:
        endpointFieldCounts.independent_full_endpoint_boundary_binding_theorem_present,
      full_binding_packet_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_binding_packet_full_endpoint_boundary_binding_constructed,
      carrier_field_layer_full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.carrier_field_layer_full_endpoint_boundary_binding_constructed,
      same_packet_full_endpoint_boundary_binding_dependencies_present:
        endpointFieldCounts.same_packet_full_endpoint_boundary_binding_dependency_present,
      same_packet_ref_dependency_closures_present:
        endpointFieldCounts.same_packet_ref_carrier_field_dependencies_closed,
      same_packet_value_map_dependency_closures_present:
        endpointFieldCounts.same_packet_value_map_carrier_field_dependencies_closed,
      row_allowed_source_input_pairs_ready:
        rowFieldCounts.combined_allowed_source_inputs_ready,
      row_dependency_cycle_pairs_detected:
        rowFieldCounts.combined_dependency_cycle_pair_detected,
      row_escape_route_pairs_declared:
        rowFieldCounts.combined_escape_route_pair_declared,
      row_selected_route_contract_link_requirement_pairs:
        rowFieldCounts.combined_selected_route_contract_link_requirement_pair,
      row_no_contract_link_premise_proof_pairs_present:
        rowFieldCounts.combined_no_contract_link_premise_proof_pair_present,
      row_selected_route_contract_link_dependency_pairs_eliminated:
        rowFieldCounts.combined_selected_route_contract_link_dependency_eliminated,
      row_independent_no_contract_link_route_pairs_available:
        rowFieldCounts.combined_independent_no_contract_link_route_pair_available,
      row_independent_theorem_derivation_pairs_unblocked:
        rowFieldCounts.combined_independent_theorem_derivation_pair_unblocked,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint supplies the no-contract-link premise proof, selected-route dependency elimination, independent binding-contract satisfaction without the link, or independent carrier-admission bridge required to unblock a row pair.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed no-contract-link premise proof attempt under the independent full endpoint boundary-binding theorem attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.allowed_source_inputs_ready} | ${fields.selected_route_requires_witness_object_contract_link} | ${fields.selected_route_contract_link_dependency_eliminated} | ${fields.independent_no_contract_link_premise_proof_present} | ${fields.independent_full_binding_not_using_witness_object_contract_link_as_premise_proven} | ${fields.independent_binding_contract_satisfaction_without_contract_link_present} | ${fields.independent_carrier_admission_bridge_present} | ${fields.independent_theorem_derivation_unblocked} | ${fields.independent_full_endpoint_boundary_binding_theorem_present} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_allowed_source_inputs_ready} | ${fields.combined_dependency_cycle_pair_detected} | ${fields.combined_escape_route_pair_declared} | ${fields.combined_selected_route_contract_link_requirement_pair} | ${fields.combined_no_contract_link_premise_proof_pair_present} | ${fields.combined_selected_route_contract_link_dependency_eliminated} | ${fields.combined_independent_theorem_derivation_pair_unblocked} | ${row.row_consumed} |`;
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
  return `# Independent Full Endpoint Boundary-Binding No-Contract-Link Premise Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests the no-contract-link premise required by the
independent full endpoint boundary-binding theorem attempt. It is a
premise-exclusion audit, not a theorem construction packet: selected-route
inputs, contract targets, full-binding construction inputs, dependency-cycle
evidence, and escape-route declarations are allowed inputs, but
\`witness_object_has_contract_link\`, actual contract-link rule application,
constructed witness-object membership, row consumption, branch-chart
authorization, and proof-contract order revision are excluded as premises.

The attempt remains fail-closed. It records ${summary.selected_carrier_admission_route_inputs_ready} / ${summary.endpoint_functionals}
selected carrier-admission route inputs, ${summary.contract_target_layers_ready} / ${summary.endpoint_functionals}
contract-target layers, ${summary.full_binding_construction_inputs_ready} / ${summary.endpoint_functionals}
full-binding construction inputs, ${summary.dependency_cycles_detected} / ${summary.endpoint_functionals}
dependency cycles, ${summary.dependency_cycle_escape_routes_declared} / ${summary.endpoint_functionals}
escape-route declarations, and ${summary.witness_object_contract_link_source_candidates_recorded} / ${summary.endpoint_functionals}
contract-link source candidates. It also records ${summary.selected_routes_requiring_witness_object_contract_link} / ${summary.endpoint_functionals}
selected routes still requiring \`witness_object_has_contract_link\`.

It records ${summary.no_contract_link_premise_proven} / ${summary.endpoint_functionals}
no-contract-link premises, ${summary.no_contract_link_premise_derivations_present} / ${summary.endpoint_functionals}
derivations, ${summary.no_contract_link_premise_soundness_proofs_present} / ${summary.endpoint_functionals}
soundness proofs, ${summary.no_contract_link_premise_endpoint_application_proofs_present} / ${summary.endpoint_functionals}
endpoint application proofs, ${summary.selected_route_contract_link_dependencies_eliminated} / ${summary.endpoint_functionals}
selected-route contract-link dependency eliminations, ${summary.independent_binding_contract_satisfaction_without_contract_link_present} / ${summary.endpoint_functionals}
binding-contract satisfaction proofs without the link premise, and ${summary.independent_carrier_admission_bridges_present} / ${summary.endpoint_functionals}
independent carrier-admission bridges. It consumes ${summary.row_consumption_count}
rows and records \`branch_chart_authorized=false\`.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Premise Target

${packet.premise_target.statement}

Accepted if: ${packet.premise_target.accepted_if}

## No-Promotion Rule

${packet.no_promotion_rule}

## Independence Exclusions

${packet.independence_exclusions.map((item) => `- ${item}`).join("\n")}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Premise Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.premise_proof_routes)}

## Endpoint Attempts

| Endpoint | Role | Allowed inputs | Selected route needs link | Dependency eliminated | Premise proof | Premise proven | Binding without link | Carrier bridge | Theorem derivation unblocked | Independent theorem | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_no_contract_link_premise_proof_attempts)}

## Row Attempts

| Row | Allowed input pair | Cycle pair | Escape pair | Selected route link requirement pair | Premise proof pair | Dependency eliminated pair | Theorem derivation pair unblocked | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_no_contract_link_premise_proof_attempts)}

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
    independentTheorem: readJson(args.independentTheoremPacket),
    completion: readJson(args.completionPacket),
    dependencyCycle: readJson(args.dependencyCyclePacket),
    binding: readJson(args.bindingPacket),
    routeDecision: readJson(args.routeDecisionPacket),
    contractTarget: readJson(args.contractTargetPacket),
    fullBindingConstruction: readJson(args.fullBindingConstructionPacket),
    contractLink: readJson(args.contractLinkPacket),
  };
  const sourcePaths = {
    independentTheorem: args.independentTheoremPacket,
    completion: args.completionPacket,
    dependencyCycle: args.dependencyCyclePacket,
    binding: args.bindingPacket,
    routeDecision: args.routeDecisionPacket,
    contractTarget: args.contractTargetPacket,
    fullBindingConstruction: args.fullBindingConstructionPacket,
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

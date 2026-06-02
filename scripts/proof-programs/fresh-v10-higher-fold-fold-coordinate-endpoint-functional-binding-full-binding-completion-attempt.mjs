#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_ROUTE_DECISION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_LINK_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_witness_object_contract_link_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ACTUAL_RULE_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_actual_contract_link_rule_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_MEMBERSHIP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_contract_link_membership_rule_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RULE_MEMBERSHIP_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_actual_contract_link_rule_membership_proof_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_binding_full_binding_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_binding_full_binding_completion_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ROUTE_DECISION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision-fail-closed-direct-source-promotion-rejected-carrier-admission-route-selected-no-row-consumption";
const BINDING_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-fail-closed-value-maps-inherited-contract-full-binding-carrier-admission-absent-no-row-consumption";
const CONTRACT_LINK_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-witness-object-contract-link-construction-attempt-fail-closed-contract-link-source-candidates-present-witness-object-contract-links-absent-no-row-consumption";
const ACTUAL_RULE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-contract-link-rule-attempt-fail-closed-source-candidates-present-rule-obligations-unsatisfied-witness-object-contract-links-absent-no-row-consumption";
const MEMBERSHIP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-contract-link-membership-rule-attempt-fail-closed-rule-and-membership-source-conditions-present-rule-and-membership-proofs-absent-no-row-consumption";
const RULE_MEMBERSHIP_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-contract-link-rule-membership-proof-target-fail-closed-source-conditions-present-rule-proof-and-constructed-witness-object-identity-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-full-binding-completion-attempt-fail-closed-source-candidates-and-route-tests-present-actual-link-membership-binding-full-binding-carrier-admission-absent-no-row-consumption";

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

const ACTUAL_LINK_MEMBERSHIP_THEOREM_FIELDS = [
  "actual_contract_link_rule_available",
  "actual_contract_link_rule_derivation_present",
  "actual_contract_link_rule_soundness_proof_present",
  "actual_contract_link_rule_application_proof_present",
  "constructed_witness_object_id_present",
  "endpoint_boundary_binding_witness_object_constructed",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "endpoint_ref_and_value_map_same_witness_object_proven",
  "membership_source_not_id_adjacency_proven",
  "witness_object_membership_proof_present",
  "contract_target_satisfaction_proof_present",
  "target_ref_value_equations_proof_grade",
  "endpoint_boundary_binding_ref_compatibility_proof_present",
  "first_primitive_compatibility_proof_present",
  "actual_contract_link_rule_obligations_satisfied",
];

const BINDING_COMPLETION_FIELDS = [
  "witness_object_contract_link_constructed",
  "witness_object_has_contract_link",
  "binding_contract_satisfied",
];

const FULL_BINDING_COMPLETION_FIELDS = [
  "full_endpoint_boundary_binding_constructed",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "motion_evaluation_bridge_present",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "algebraic_certificate_bridge_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "candidate_replay_bridge_present",
];

const CARRIER_ADMISSION_COMPLETION_FIELDS = [
  "carrier_admission_bridge_present",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
  "ref_value_non_domain_carrier_pair_constructed",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_selected_route_ready",
  "receiver_selected_route_ready",
  "combined_selected_route_pair_ready",
  "source_actual_link_membership_theorem_complete",
  "receiver_actual_link_membership_theorem_complete",
  "combined_actual_link_membership_theorem_pair_complete",
  "source_binding_contract_satisfied",
  "receiver_binding_contract_satisfied",
  "combined_binding_contract_pair_satisfied",
  "source_full_endpoint_boundary_binding_constructed",
  "receiver_full_endpoint_boundary_binding_constructed",
  "combined_full_endpoint_boundary_binding_pair_constructed",
  "source_endpoint_boundary_binding_ref_carrier_unblocked",
  "receiver_endpoint_boundary_binding_ref_carrier_unblocked",
  "combined_endpoint_boundary_binding_ref_carrier_pair_unblocked",
  "source_endpoint_value_binding_map_carrier_unblocked",
  "receiver_endpoint_value_binding_map_carrier_unblocked",
  "combined_endpoint_value_binding_map_carrier_pair_unblocked",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SELECTED_ROUTE_INPUT_FIELDS,
  ...ACTUAL_LINK_MEMBERSHIP_THEOREM_FIELDS,
  ...BINDING_COMPLETION_FIELDS,
  ...FULL_BINDING_COMPLETION_FIELDS,
  ...CARRIER_ADMISSION_COMPLETION_FIELDS,
  "residual_data_construction_ready",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const COMPLETION_METHODS = [
  {
    method_id: "selected_route_input_readiness",
    output_kind: "selected-route-input",
    description:
      "Check that the selected carrier-admission route has value maps, contract targets, test applications, contract-link source candidates, rule targets, and constructed-witness-object source bundles.",
    required_fields: SELECTED_ROUTE_INPUT_FIELDS,
  },
  {
    method_id: "actual_link_and_membership_theorem_check",
    output_kind: "actual-link-membership-theorem",
    description:
      "Require the actual contract-link rule, rule proof, constructed witness-object identity, field-membership proof, contract-target satisfaction proof, compatibility proofs, and bridge proofs.",
    required_fields: ACTUAL_LINK_MEMBERSHIP_THEOREM_FIELDS,
  },
  {
    method_id: "binding_contract_completion_check",
    output_kind: "binding-contract-completion",
    description:
      "Check whether the actual link and membership theorem complete the witness-object contract link and binding contract satisfaction.",
    required_fields: [
      "actual_contract_link_rule_obligations_satisfied",
      "witness_object_membership_proof_present",
      ...BINDING_COMPLETION_FIELDS,
    ],
  },
  {
    method_id: "full_endpoint_boundary_binding_completion_check",
    output_kind: "full-endpoint-boundary-binding-completion",
    description:
      "Check whether the satisfied binding contract supplies a full endpoint boundary binding with history, motion/evaluation, algebraic certificates, candidate artifacts, topology, and proof replay.",
    required_fields: [
      "binding_contract_satisfied",
      ...FULL_BINDING_COMPLETION_FIELDS,
    ],
  },
  {
    method_id: "carrier_admission_completion_check",
    output_kind: "carrier-admission-completion",
    description:
      "Check whether the full endpoint boundary binding admits the endpoint-boundary-binding ref carrier and endpoint value-map carrier.",
    required_fields: [
      "full_endpoint_boundary_binding_constructed",
      ...CARRIER_ADMISSION_COMPLETION_FIELDS,
    ],
  },
  {
    method_id: "row_and_branch_authorization_guard",
    output_kind: "row-and-branch-authorization",
    description:
      "Keep residual data, row consumption, and branch-chart authorization locked until both endpoint carriers exist for the row.",
    required_fields: [
      "endpoint_boundary_binding_ref_carrier_unblocked",
      "endpoint_value_binding_map_carrier_unblocked",
      "residual_data_construction_ready",
      "row_consumption_authorized",
      "branch_chart_authorized",
    ],
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "actual_contract_link_rule",
    missing_field: "actual_contract_link_rule_available",
    required_evidence:
      "A proof-grade rule whose conclusion is an actual witness-object contract link from the recorded source candidate plus all listed premises.",
  },
  {
    burden_id: "actual_contract_link_rule_derivation",
    missing_field: "actual_contract_link_rule_derivation_present",
    required_evidence:
      "A derivation of the actual contract-link rule from the endpoint value map, contract target, witness-object ref, first primitive, and target ref/value equations.",
  },
  {
    burden_id: "constructed_witness_object_identity",
    missing_field: "same_constructed_witness_object_identity_proof_present",
    required_evidence:
      "A constructed same-packet witness-object identity, not only a witness-object attempt id, matching symbol, or inherited field claim.",
  },
  {
    burden_id: "field_membership_proof",
    missing_field: "witness_object_membership_proof_present",
    required_evidence:
      "A proof that the endpoint-boundary-binding ref and endpoint value-binding map are fields of the same constructed witness object.",
  },
  {
    burden_id: "contract_target_satisfaction",
    missing_field: "contract_target_satisfaction_proof_present",
    required_evidence:
      "A proof that the endpoint value-binding map satisfies the inherited full endpoint boundary-binding contract target.",
  },
  {
    burden_id: "first_primitive_compatibility",
    missing_field: "first_primitive_compatibility_proof_present",
    required_evidence:
      "A compatibility proof tying the first endpoint boundary-binding primitive to the value map and contract target.",
  },
  {
    burden_id: "motion_evaluation_bridge",
    missing_field: "motion_evaluation_bridge_present",
    required_evidence:
      "A bridge from the binding contract into endpoint motion, endpoint evaluation, full endpoint evaluation, and global-domain evaluation maps.",
  },
  {
    burden_id: "algebraic_certificate_bridge",
    missing_field: "algebraic_certificate_bridge_present",
    required_evidence:
      "Non-target endpoint zero, exact screen zero, and rank certificates for the full endpoint boundary binding.",
  },
  {
    burden_id: "candidate_replay_bridge",
    missing_field: "candidate_replay_bridge_present",
    required_evidence:
      "Candidate artifacts, root topology recertification, and proof-interval v1-v6 replay for the candidate change.",
  },
  {
    burden_id: "carrier_admission_bridge",
    missing_field: "carrier_admission_bridge_present",
    required_evidence:
      "A bridge from the full endpoint boundary binding to admitted endpoint-boundary-binding ref and endpoint value-map carriers.",
  },
];

function parseArgs(argv) {
  const args = {
    routeDecisionPacket: DEFAULT_ROUTE_DECISION_PACKET,
    bindingPacket: DEFAULT_BINDING_PACKET,
    contractLinkPacket: DEFAULT_CONTRACT_LINK_PACKET,
    actualRulePacket: DEFAULT_ACTUAL_RULE_PACKET,
    membershipPacket: DEFAULT_MEMBERSHIP_PACKET,
    ruleMembershipTargetPacket: DEFAULT_RULE_MEMBERSHIP_TARGET_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--route-decision-packet") {
      args.routeDecisionPacket = argv[++index];
    } else if (arg === "--binding-packet") {
      args.bindingPacket = argv[++index];
    } else if (arg === "--contract-link-packet") {
      args.contractLinkPacket = argv[++index];
    } else if (arg === "--actual-rule-packet") {
      args.actualRulePacket = argv[++index];
    } else if (arg === "--membership-packet") {
      args.membershipPacket = argv[++index];
    } else if (arg === "--rule-membership-target-packet") {
      args.ruleMembershipTargetPacket = argv[++index];
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

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-binding-full-binding-completion-attempt.mjs [options]

Options:
  --route-decision-packet PATH           Ref/value carrier-introduction route decision JSON.
  --binding-packet PATH                  Binding/full-binding/carrier-admission attempt JSON.
  --contract-link-packet PATH            Witness-object contract-link construction attempt JSON.
  --actual-rule-packet PATH              Actual contract-link rule attempt JSON.
  --membership-packet PATH               Contract-link membership rule attempt JSON.
  --rule-membership-target-packet PATH   Actual contract-link rule/membership proof target JSON.
  --out-dir PATH                         Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                               Pretty-print JSON artifact.
  --help                                 Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function artifactRecord(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing source artifact: ${filePath}`);
  }
  return {
    path: filePath,
    basename: path.basename(filePath),
    present: true,
    sha256: sha256File(filePath),
  };
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function idMap(rows, key, label) {
  const map = new Map();
  if (!Array.isArray(rows)) {
    throw new Error(`Missing ${label} rows.`);
  }
  for (const row of rows) {
    const id = row[key];
    if (!id) {
      throw new Error(`Missing ${label} id field ${key}.`);
    }
    if (map.has(id)) {
      throw new Error(`Duplicate ${label} id: ${id}`);
    }
    map.set(id, row);
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

function assertPacket(packet, status, label) {
  if (packet.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${packet.packet_id}`);
  }
  if (packet.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${label} fold-coordinate packet id: ${packet.fold_coordinate_packet_id}`);
  }
  if (packet.status !== status) {
    throw new Error(`Unexpected ${label} status: ${packet.status}`);
  }
  if (packet.branch_chart_authorized || packet.preledger_pass || packet.updates_live_ledger || packet.row_closure) {
    throw new Error(`Refusing completion attempt from authorized ${label}.`);
  }
}

function assertSources(sources) {
  assertPacket(sources.routeDecision, ROUTE_DECISION_STATUS, "route decision");
  assertPacket(sources.binding, BINDING_STATUS, "binding/full-binding attempt");
  assertPacket(sources.contractLink, CONTRACT_LINK_STATUS, "contract-link attempt");
  assertPacket(sources.actualRule, ACTUAL_RULE_STATUS, "actual-link rule attempt");
  assertPacket(sources.membership, MEMBERSHIP_STATUS, "membership rule attempt");
  assertPacket(sources.ruleMembershipTarget, RULE_MEMBERSHIP_TARGET_STATUS, "rule/membership target");
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    output_kind: method.output_kind,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `binding_full_binding_completion_missing_${field}`),
    passed: missingFields.length === 0,
  };
}

function missingBurdens(fields) {
  return PROOF_BURDENS
    .filter((burden) => fields[burden.missing_field] !== true)
    .map((burden) => ({
      ...burden,
      satisfied: false,
    }));
}

function assertSameEndpoint(...endpoints) {
  const [first] = endpoints;
  for (const endpoint of endpoints.slice(1)) {
    for (const field of ["id", "endpoint_functional_id", "role"]) {
      if (
        Object.hasOwn(first, field) &&
        Object.hasOwn(endpoint, field) &&
        first[field] !== endpoint[field]
      ) {
        throw new Error(`Endpoint mismatch for ${first.id}: ${field}`);
      }
    }
  }
}

function bool(source, field) {
  return source?.required_fields_present?.[field] === true || source?.[field] === true;
}

function buildEndpointCompletion(endpointSources) {
  const { route, binding, contractLink, actualRule, membership, proofTarget } = endpointSources;
  assertSameEndpoint(route, binding, contractLink, actualRule, membership, proofTarget);
  const fields = {
    carrier_admission_route_selected: bool(route, "carrier_admission_route_selected"),
    endpoint_value_binding_map_constructed: bool(binding, "endpoint_value_binding_map_constructed"),
    endpoint_value_bound_to_boundary_binding: bool(binding, "endpoint_value_bound_to_boundary_binding"),
    binding_contract_target_ref_inherited: bool(binding, "binding_contract_target_ref_inherited"),
    binding_contract_satisfaction_test_applied: bool(binding, "binding_contract_satisfaction_test_applied"),
    full_endpoint_boundary_binding_construction_test_applied:
      bool(binding, "full_endpoint_boundary_binding_construction_test_applied"),
    carrier_admission_test_applied: bool(binding, "carrier_admission_test_applied"),
    witness_object_contract_link_source_candidate_recorded:
      bool(contractLink, "witness_object_contract_link_source_candidate_recorded"),
    actual_contract_link_rule_source_conditions_present:
      bool(proofTarget, "actual_contract_link_rule_source_conditions_present"),
    membership_source_conditions_ready: bool(proofTarget, "membership_source_conditions_ready"),
    actual_contract_link_introduction_rule_target_declared:
      bool(proofTarget, "actual_contract_link_introduction_rule_target_declared"),
    constructed_witness_object_source_ready: proofTarget.constructed_witness_object_source_ready === true,
    witness_object_target_declared: bool(proofTarget, "witness_object_target_declared"),
  };
  for (const field of ACTUAL_LINK_MEMBERSHIP_THEOREM_FIELDS) {
    fields[field] =
      bool(proofTarget, field) ||
      bool(membership, field) ||
      bool(actualRule, field) ||
      bool(contractLink, field);
  }
  for (const field of BINDING_COMPLETION_FIELDS) {
    fields[field] =
      bool(binding, field) ||
      bool(contractLink, field) ||
      bool(actualRule, field) ||
      bool(membership, field) ||
      bool(proofTarget, field);
  }
  for (const field of FULL_BINDING_COMPLETION_FIELDS) {
    fields[field] =
      bool(binding, field) ||
      bool(contractLink, field) ||
      bool(actualRule, field) ||
      bool(membership, field) ||
      bool(proofTarget, field);
  }
  for (const field of CARRIER_ADMISSION_COMPLETION_FIELDS) {
    fields[field] =
      bool(route, field) ||
      bool(binding, field) ||
      bool(contractLink, field) ||
      bool(actualRule, field) ||
      bool(membership, field) ||
      bool(proofTarget, field);
  }
  fields.residual_data_construction_ready = false;
  fields.row_consumption_authorized = false;
  fields.branch_chart_authorized = false;
  const methodResults = COMPLETION_METHODS.map((method) => methodResult(method, fields));
  const missingProofBurdens = missingBurdens(fields);
  const actualLinkMembershipTheoremComplete =
    ACTUAL_LINK_MEMBERSHIP_THEOREM_FIELDS.every((field) => fields[field] === true);
  return {
    id: route.id,
    endpoint_functional_id: route.endpoint_functional_id,
    role: route.role,
    binding_full_binding_completion_attempt_id:
      `binding_full_binding_completion_attempt:${route.id}`,
    source_route_decision_id: route.route_decision_id,
    source_binding_contract_full_binding_carrier_admission_attempt_id:
      binding.binding_contract_full_binding_carrier_admission_attempt_id,
    source_witness_object_contract_link_construction_attempt_id:
      contractLink.witness_object_contract_link_construction_attempt_id,
    source_actual_contract_link_rule_attempt_id:
      actualRule.actual_contract_link_rule_attempt_id,
    source_contract_link_membership_rule_attempt_id:
      membership.contract_link_membership_rule_attempt_id,
    source_actual_contract_link_rule_membership_proof_target_id:
      proofTarget.actual_contract_link_rule_membership_proof_target_id,
    selected_route: route.selected_route,
    endpoint_value_binding_map_id:
      route.endpoint_value_binding_map_id || binding.source_endpoint_value_binding_map_id,
    endpoint_boundary_binding_ref_id:
      route.endpoint_boundary_binding_ref_id || binding.witness_object_endpoint_boundary_binding_ref_id,
    source_contract_target_id: binding.source_contract_target_id || proofTarget.source_contract_target_id,
    witness_object_symbol:
      route.witness_object_symbol || binding.witness_object_symbol || proofTarget.witness_object_symbol,
    binding_symbol: binding.binding_symbol || proofTarget.binding_symbol,
    first_missing_theorem_layer: "actual-link-rule-plus-constructed-witness-object-membership",
    selected_route_input_ready:
      SELECTED_ROUTE_INPUT_FIELDS.every((field) => fields[field] === true),
    actual_link_membership_theorem_complete: actualLinkMembershipTheoremComplete,
    binding_contract_complete:
      BINDING_COMPLETION_FIELDS.every((field) => fields[field] === true),
    full_endpoint_boundary_binding_complete:
      FULL_BINDING_COMPLETION_FIELDS.every((field) => fields[field] === true),
    carrier_admission_complete:
      CARRIER_ADMISSION_COMPLETION_FIELDS.every((field) => fields[field] === true),
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    failure_codes: [
      ...missingProofBurdens.map(
        (burden) => `binding_full_binding_completion_locked_${burden.missing_field}`
      ),
      "binding_full_binding_completion_locked_row_consumption",
    ],
    obstruction:
      "The selected route has value maps, contract targets, contract-link source candidates, rule targets, and constructed-witness-object source bundles, but no actual-link rule, constructed witness-object identity, field-membership proof, contract-target satisfaction proof, full endpoint boundary binding, or carrier admission.",
  };
}

function assertSameRow(...rows) {
  const [first] = rows;
  for (const row of rows.slice(1)) {
    for (const field of ["row_id", "source_variable", "receiver_variable", "failed_side", "boundary_side"]) {
      if (
        Object.hasOwn(first, field) &&
        Object.hasOwn(row, field) &&
        first[field] !== row[field]
      ) {
        throw new Error(`Row mismatch for ${first.row_id}: ${field}`);
      }
    }
  }
}

function buildRowCompletion(rowSources, endpointById) {
  const { route, binding, contractLink, actualRule, membership, proofTarget } = rowSources;
  assertSameRow(route, binding, contractLink, actualRule, membership, proofTarget);
  const sourceEndpoint = requireMapped(endpointById, route.source_variable, `source endpoint for ${route.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, route.receiver_variable, `receiver endpoint for ${route.row_id}`);
  const fields = {
    row_locator_resolved: bool(route, "row_locator_resolved"),
    source_selected_route_ready: sourceEndpoint.selected_route_input_ready === true,
    receiver_selected_route_ready: receiverEndpoint.selected_route_input_ready === true,
    combined_selected_route_pair_ready: false,
    source_actual_link_membership_theorem_complete:
      sourceEndpoint.actual_link_membership_theorem_complete === true,
    receiver_actual_link_membership_theorem_complete:
      receiverEndpoint.actual_link_membership_theorem_complete === true,
    combined_actual_link_membership_theorem_pair_complete: false,
    source_binding_contract_satisfied:
      sourceEndpoint.required_fields_present.binding_contract_satisfied === true,
    receiver_binding_contract_satisfied:
      receiverEndpoint.required_fields_present.binding_contract_satisfied === true,
    combined_binding_contract_pair_satisfied: false,
    source_full_endpoint_boundary_binding_constructed:
      sourceEndpoint.required_fields_present.full_endpoint_boundary_binding_constructed === true,
    receiver_full_endpoint_boundary_binding_constructed:
      receiverEndpoint.required_fields_present.full_endpoint_boundary_binding_constructed === true,
    combined_full_endpoint_boundary_binding_pair_constructed: false,
    source_endpoint_boundary_binding_ref_carrier_unblocked:
      sourceEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    receiver_endpoint_boundary_binding_ref_carrier_unblocked:
      receiverEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    combined_endpoint_boundary_binding_ref_carrier_pair_unblocked: false,
    source_endpoint_value_binding_map_carrier_unblocked:
      sourceEndpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked === true,
    receiver_endpoint_value_binding_map_carrier_unblocked:
      receiverEndpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked === true,
    combined_endpoint_value_binding_map_carrier_pair_unblocked: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_selected_route_pair_ready =
    fields.source_selected_route_ready && fields.receiver_selected_route_ready;
  fields.combined_actual_link_membership_theorem_pair_complete =
    fields.source_actual_link_membership_theorem_complete &&
    fields.receiver_actual_link_membership_theorem_complete;
  fields.combined_binding_contract_pair_satisfied =
    fields.source_binding_contract_satisfied && fields.receiver_binding_contract_satisfied;
  fields.combined_full_endpoint_boundary_binding_pair_constructed =
    fields.source_full_endpoint_boundary_binding_constructed &&
    fields.receiver_full_endpoint_boundary_binding_constructed;
  fields.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked =
    fields.source_endpoint_boundary_binding_ref_carrier_unblocked &&
    fields.receiver_endpoint_boundary_binding_ref_carrier_unblocked;
  fields.combined_endpoint_value_binding_map_carrier_pair_unblocked =
    fields.source_endpoint_value_binding_map_carrier_unblocked &&
    fields.receiver_endpoint_value_binding_map_carrier_unblocked;
  return {
    row_id: route.row_id,
    cover_id: route.cover_id,
    ledger: route.ledger,
    source_interval: route.source_interval,
    receiver_interval: route.receiver_interval,
    failed_side: route.failed_side,
    boundary_side: route.boundary_side,
    source_variable: route.source_variable,
    receiver_variable: route.receiver_variable,
    binding_full_binding_completion_pair_id:
      `binding_full_binding_completion_pair:${route.row_id}`,
    source_selected_route: sourceEndpoint.selected_route,
    receiver_selected_route: receiverEndpoint.selected_route,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "Both endpoints have selected-route input readiness, but neither endpoint has the actual-link/membership theorem, binding contract satisfaction, full endpoint boundary binding, or carrier admission needed for residual data and row consumption.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function mapEndpointSources(sources) {
  return {
    route: idMap(sources.routeDecision.endpoint_ref_value_carrier_introduction_route_decisions, "id", "route endpoint"),
    binding: idMap(sources.binding.endpoint_binding_contract_full_binding_carrier_admission_attempts, "id", "binding endpoint"),
    contractLink: idMap(sources.contractLink.endpoint_witness_object_contract_link_construction_attempts, "id", "contract-link endpoint"),
    actualRule: idMap(sources.actualRule.endpoint_actual_contract_link_rule_attempts, "id", "actual-rule endpoint"),
    membership: idMap(sources.membership.endpoint_contract_link_membership_rule_attempts, "id", "membership endpoint"),
    proofTarget: idMap(sources.ruleMembershipTarget.endpoint_actual_contract_link_rule_membership_proof_targets, "id", "proof-target endpoint"),
  };
}

function endpointSourcesFor(id, maps) {
  return Object.fromEntries(
    Object.entries(maps).map(([label, map]) => [label, requireMapped(map, id, `${label} endpoint ${id}`)])
  );
}

function mapRowSources(sources) {
  return {
    route: idMap(sources.routeDecision.row_ref_value_carrier_introduction_route_decisions, "row_id", "route row"),
    binding: idMap(sources.binding.row_binding_contract_full_binding_carrier_admission_attempts, "row_id", "binding row"),
    contractLink: idMap(sources.contractLink.row_witness_object_contract_link_construction_attempts, "row_id", "contract-link row"),
    actualRule: idMap(sources.actualRule.row_actual_contract_link_rule_attempts, "row_id", "actual-rule row"),
    membership: idMap(sources.membership.row_contract_link_membership_rule_attempts, "row_id", "membership row"),
    proofTarget: idMap(sources.ruleMembershipTarget.row_actual_contract_link_rule_membership_proof_targets, "row_id", "proof-target row"),
  };
}

function rowSourcesFor(rowId, maps) {
  return Object.fromEntries(
    Object.entries(maps).map(([label, map]) => [label, requireMapped(map, rowId, `${label} row ${rowId}`)])
  );
}

function buildPacket(sources, sourcePaths) {
  assertSources(sources);
  const endpointMaps = mapEndpointSources(sources);
  const endpointCompletions =
    sources.routeDecision.endpoint_ref_value_carrier_introduction_route_decisions.map((routeEndpoint) =>
      buildEndpointCompletion(endpointSourcesFor(routeEndpoint.id, endpointMaps))
    );
  const endpointById = idMap(endpointCompletions, "id", "completion endpoint");
  const rowMaps = mapRowSources(sources);
  const rowCompletions =
    sources.routeDecision.row_ref_value_carrier_introduction_route_decisions.map((routeRow) =>
      buildRowCompletion(rowSourcesFor(routeRow.row_id, rowMaps), endpointById)
    );
  const endpointFieldCounts = fieldCounts(
    endpointCompletions,
    ENDPOINT_FIELDS,
    (endpoint, field) => endpoint.required_fields_present[field]
  );
  const rowFieldCounts = fieldCounts(rowCompletions, ROW_FIELDS, (row, field) => row.required_fields_present[field]);
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-binding-full-binding-completion-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Binding Contract And Full Endpoint Boundary-Binding Completion Attempt",
    claim_level:
      "priority-only fail-closed completion attempt; selected-route inputs, contract-link source candidates, actual-link rule targets, membership-source bundles, and constructed-witness-object source bundles are ready for 4 / 4 endpoint functionals, but actual-link rule, constructed witness-object identity, membership proof, binding contract satisfaction, full endpoint boundary binding, carrier admission, and row consumption remain absent",
    source_artifacts: {
      ref_value_carrier_introduction_route_decision: artifactRecord(sourcePaths.routeDecision),
      binding_contract_full_binding_carrier_admission_construction_attempt:
        artifactRecord(sourcePaths.binding),
      witness_object_contract_link_construction_attempt: artifactRecord(sourcePaths.contractLink),
      actual_contract_link_rule_attempt: artifactRecord(sourcePaths.actualRule),
      contract_link_membership_rule_attempt: artifactRecord(sourcePaths.membership),
      actual_contract_link_rule_membership_proof_target: artifactRecord(sourcePaths.ruleMembershipTarget),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    row_closure: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    construction_rule:
      "A binding contract may complete only after the selected route supplies an actual witness-object contract link whose rule, derivation, soundness, application proof, constructed witness-object identity, field-membership proof, contract-target satisfaction proof, compatibility proofs, motion/evaluation bridge, algebraic certificates, replay bridge, and carrier-admission bridge are present.",
    no_promotion_rule:
      "Selected-route tests, source candidates, rule targets, membership-source bundles, and constructed-witness-object source bundles are not binding contract satisfaction, full endpoint boundary binding, carrier admission, residual data, or row consumption.",
    first_missing_theorem_layer:
      "actual-link-rule-plus-constructed-witness-object-membership",
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    completion_methods: COMPLETION_METHODS,
    proof_burdens: PROOF_BURDENS,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    endpoint_binding_full_binding_completion_attempts: endpointCompletions,
    row_binding_full_binding_completion_attempts: rowCompletions,
    summary: {
      endpoint_functionals: endpointCompletions.length,
      residual_consumer_rows: rowCompletions.length,
      selected_route_inputs_ready:
        countTrue(endpointCompletions, (endpoint) => endpoint.selected_route_input_ready),
      contract_link_source_candidates_recorded:
        endpointFieldCounts.witness_object_contract_link_source_candidate_recorded,
      actual_link_rule_targets_declared:
        endpointFieldCounts.actual_contract_link_introduction_rule_target_declared,
      constructed_witness_object_source_bundles_ready:
        endpointFieldCounts.constructed_witness_object_source_ready,
      actual_contract_link_rules_available:
        endpointFieldCounts.actual_contract_link_rule_available,
      actual_contract_link_rule_derivations_present:
        endpointFieldCounts.actual_contract_link_rule_derivation_present,
      actual_contract_link_rule_soundness_proofs_present:
        endpointFieldCounts.actual_contract_link_rule_soundness_proof_present,
      actual_contract_link_rule_application_proofs_present:
        endpointFieldCounts.actual_contract_link_rule_application_proof_present,
      constructed_witness_object_identities:
        endpointFieldCounts.same_constructed_witness_object_identity_proof_present,
      witness_object_membership_proofs:
        endpointFieldCounts.witness_object_membership_proof_present,
      contract_target_satisfaction_proofs:
        endpointFieldCounts.contract_target_satisfaction_proof_present,
      target_ref_value_equations_proof_grade:
        endpointFieldCounts.target_ref_value_equations_proof_grade,
      motion_evaluation_bridges:
        endpointFieldCounts.motion_evaluation_bridge_present,
      algebraic_certificate_bridges:
        endpointFieldCounts.algebraic_certificate_bridge_present,
      candidate_replay_bridges:
        endpointFieldCounts.candidate_replay_bridge_present,
      witness_object_contract_links_constructed:
        endpointFieldCounts.witness_object_contract_link_constructed,
      binding_contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      carrier_admission_bridges:
        endpointFieldCounts.carrier_admission_bridge_present,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_binding_map_carriers_unblocked:
        endpointFieldCounts.endpoint_value_binding_map_carrier_unblocked,
      row_selected_route_pairs_ready:
        rowFieldCounts.combined_selected_route_pair_ready,
      row_actual_link_membership_theorem_pairs_complete:
        rowFieldCounts.combined_actual_link_membership_theorem_pair_complete,
      row_binding_contract_pairs_satisfied:
        rowFieldCounts.combined_binding_contract_pair_satisfied,
      row_full_endpoint_boundary_binding_pairs_constructed:
        rowFieldCounts.combined_full_endpoint_boundary_binding_pair_constructed,
      row_endpoint_boundary_binding_ref_carrier_pairs_unblocked:
        rowFieldCounts.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked,
      row_endpoint_value_binding_map_carrier_pairs_unblocked:
        rowFieldCounts.combined_endpoint_value_binding_map_carrier_pair_unblocked,
      row_residual_data_ready:
        rowFieldCounts.residual_data_construction_ready,
      row_consumption_count:
        rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      selected_route_inputs_ready:
        countTrue(endpointCompletions, (endpoint) => endpoint.selected_route_input_ready),
      first_missing_theorem_layer:
        "actual-link-rule-plus-constructed-witness-object-membership",
      binding_contracts_satisfied: endpointFieldCounts.binding_contract_satisfied,
      full_endpoint_boundary_bindings_constructed: endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_ref_carriers_unblocked: endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_binding_map_carriers_unblocked: endpointFieldCounts.endpoint_value_binding_map_carrier_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
      reason:
        "The selected route cannot complete before an actual-link rule, constructed witness-object identity, membership proof, contract-target satisfaction proof, motion/evaluation bridge, algebraic bridge, replay bridge, and carrier-admission bridge are supplied.",
    },
    capture_decision:
      "priority-only; the packet records a fail-closed selected-route completion attempt and a first missing theorem layer, not a reader-facing completed theorem.",
  };
}

function markdownTable(headers, rows) {
  const header = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`);
  return [header, sep, ...body].join("\n");
}

function buildReport(packet, jsonPath) {
  const sourceRows = Object.entries(packet.source_artifacts).map(([label, artifact]) => [
    label,
    artifact.basename,
    artifact.sha256,
  ]);
  const endpointRows = packet.endpoint_binding_full_binding_completion_attempts.map((endpoint) => [
    endpoint.id,
    String(endpoint.selected_route_input_ready),
    String(endpoint.required_fields_present.actual_contract_link_rule_available),
    String(endpoint.required_fields_present.same_constructed_witness_object_identity_proof_present),
    String(endpoint.required_fields_present.witness_object_membership_proof_present),
    String(endpoint.required_fields_present.binding_contract_satisfied),
    String(endpoint.required_fields_present.full_endpoint_boundary_binding_constructed),
    String(endpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked),
    String(endpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked),
  ]);
  const rowRows = packet.row_binding_full_binding_completion_attempts.map((row) => [
    row.row_id,
    String(row.required_fields_present.combined_selected_route_pair_ready),
    String(row.required_fields_present.combined_actual_link_membership_theorem_pair_complete),
    String(row.required_fields_present.combined_binding_contract_pair_satisfied),
    String(row.required_fields_present.combined_full_endpoint_boundary_binding_pair_constructed),
    String(row.required_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked),
    String(row.required_fields_present.combined_endpoint_value_binding_map_carrier_pair_unblocked),
    String(row.required_fields_present.row_consumed),
  ]);
  const burdenRows = packet.proof_burdens.map((burden) => [
    burden.burden_id,
    burden.missing_field,
    burden.required_evidence,
  ]);
  return `# Binding Contract And Full Endpoint Boundary-Binding Completion Attempt

Status: ${packet.status}

Claim level: ${packet.claim_level}

Output JSON: ${path.basename(jsonPath)}

## Source Artifacts

${markdownTable(["Source", "Artifact", "SHA-256"], sourceRows)}

## First Missing Theorem Layer

The selected route has the input layer ready: endpoint value maps, contract
targets, contract-link source candidates, actual-link rule targets,
membership-source bundles, constructed-witness-object source bundles, and
contract/full-binding/carrier-admission tests are present for 4 / 4 endpoint
functionals. The first missing theorem layer is
\`${packet.first_missing_theorem_layer}\`: no endpoint has an actual
contract-link rule, constructed witness-object identity, field-membership
proof, contract-target satisfaction proof, or compatibility bridge.

## Endpoint Completion Table

${markdownTable([
    "Endpoint",
    "Inputs",
    "Rule",
    "Identity",
    "Membership",
    "Contract",
    "Full binding",
    "Ref carrier",
    "Value-map carrier",
  ], endpointRows)}

## Row Completion Table

${markdownTable([
    "Row",
    "Inputs",
    "Actual-link pair",
    "Contract pair",
    "Full-binding pair",
    "Ref-carrier pair",
    "Value-map pair",
    "Consumed",
  ], rowRows)}

## Summary

- Endpoint functionals: ${packet.summary.endpoint_functionals}
- Residual consumer rows: ${packet.summary.residual_consumer_rows}
- Selected-route inputs ready: ${packet.summary.selected_route_inputs_ready}
- Contract-link source candidates recorded: ${packet.summary.contract_link_source_candidates_recorded}
- Actual-link rule targets declared: ${packet.summary.actual_link_rule_targets_declared}
- Constructed-witness-object source bundles ready: ${packet.summary.constructed_witness_object_source_bundles_ready}
- Actual contract-link rules available: ${packet.summary.actual_contract_link_rules_available}
- Constructed witness-object identities: ${packet.summary.constructed_witness_object_identities}
- Witness-object membership proofs: ${packet.summary.witness_object_membership_proofs}
- Binding contracts satisfied: ${packet.summary.binding_contracts_satisfied}
- Full endpoint boundary bindings constructed: ${packet.summary.full_endpoint_boundary_bindings_constructed}
- Carrier admission bridges: ${packet.summary.carrier_admission_bridges}
- Row consumption count: ${packet.summary.row_consumption_count}
- Branch chart authorized: ${packet.summary.branch_chart_authorized}

## Proof Burdens

${markdownTable(["Burden", "Missing field", "Required evidence"], burdenRows)}

## Capture Decision

${packet.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const sources = {
    routeDecision: readJson(args.routeDecisionPacket),
    binding: readJson(args.bindingPacket),
    contractLink: readJson(args.contractLinkPacket),
    actualRule: readJson(args.actualRulePacket),
    membership: readJson(args.membershipPacket),
    ruleMembershipTarget: readJson(args.ruleMembershipTargetPacket),
  };
  const packet = buildPacket(sources, {
    routeDecision: args.routeDecisionPacket,
    binding: args.bindingPacket,
    contractLink: args.contractLinkPacket,
    actualRule: args.actualRulePacket,
    membership: args.membershipPacket,
    ruleMembershipTarget: args.ruleMembershipTargetPacket,
  });
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, packet, args.pretty);
  writeText(reportPath, buildReport(packet, jsonPath));
  console.log(JSON.stringify({
    status: packet.status,
    json: jsonPath,
    json_sha256: sha256File(jsonPath),
    report: reportPath,
    report_sha256: sha256File(reportPath),
    summary: packet.summary,
  }, null, 2));
}

main();

#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_DEPENDENCY_CYCLE_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_actual_link_membership_dependency_cycle_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_IDENTITY_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_RULE_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ROUTE_DECISION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RULE_MEMBERSHIP_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_actual_contract_link_rule_membership_proof_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPLETION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_full_binding_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_constructed_witness_object_membership_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_constructed_witness_object_membership_theorem_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const DEPENDENCY_CYCLE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-link-membership-dependency-cycle-completion-attempt-fail-closed-cycle-detected-proof-grade-escape-routes-absent-no-row-consumption";
const IDENTITY_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt-fail-closed-domain-chart-ref-value-sources-present-non-domain-carriers-and-identity-proof-absent-no-row-consumption";
const CARRIER_RULE_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-rule-target-fail-closed-ref-value-sources-and-carrier-candidates-present-carrier-introduction-rules-absent-no-row-consumption";
const ROUTE_DECISION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision-fail-closed-direct-source-promotion-rejected-carrier-admission-route-selected-no-row-consumption";
const RULE_MEMBERSHIP_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-contract-link-rule-membership-proof-target-fail-closed-source-conditions-present-rule-proof-and-constructed-witness-object-identity-absent-no-row-consumption";
const COMPLETION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-full-binding-completion-attempt-fail-closed-source-candidates-and-route-tests-present-actual-link-membership-binding-full-binding-carrier-admission-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-constructed-witness-object-membership-theorem-attempt-fail-closed-source-pairs-present-carrier-complete-witness-object-identity-and-co-membership-proof-absent-no-cycle-breaker-no-row-consumption";

const THEOREM_INPUT_FIELDS = [
  "dependency_cycle_escape_route_declared",
  "dependency_cycle_detected",
  "ref_value_source_pair_ready",
  "carrier_rule_target_declared",
  "direct_source_promotion_rejected",
  "membership_source_conditions_ready",
  "constructed_witness_object_source_ready",
  "proof_independence_guard_declared",
];

const INDEPENDENT_THEOREM_OBLIGATION_FIELDS = [
  "ref_value_non_domain_carrier_pair_constructed",
  "all_carrier_fields_constructed",
  "constructed_witness_object_id_present",
  "endpoint_boundary_binding_witness_object_constructed",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "endpoint_ref_and_value_map_same_witness_object_proven",
  "membership_source_not_id_adjacency_proven",
  "witness_object_membership_proof_present",
  "independent_constructed_witness_object_membership_theorem_derivation_present",
  "independent_constructed_witness_object_membership_theorem_soundness_proof_present",
  "independent_constructed_witness_object_membership_theorem_application_proof_present",
  "independent_constructed_witness_object_membership_theorem_present",
];

const ENDPOINT_FIELDS = [
  ...THEOREM_INPUT_FIELDS,
  ...INDEPENDENT_THEOREM_OBLIGATION_FIELDS,
  "cycle_breaker_available",
  "actual_contract_link_rule_available",
  "witness_object_contract_link_constructed",
  "binding_contract_satisfied",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_ref_value_source_pair_ready",
  "receiver_ref_value_source_pair_ready",
  "combined_ref_value_source_pair_ready",
  "source_dependency_cycle_detected",
  "receiver_dependency_cycle_detected",
  "combined_dependency_cycle_pair_detected",
  "source_independent_membership_theorem_present",
  "receiver_independent_membership_theorem_present",
  "combined_independent_membership_theorem_pair_present",
  "source_cycle_breaker_available",
  "receiver_cycle_breaker_available",
  "combined_cycle_breaker_pair_available",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const THEOREM_PROOF_ROUTES = [
  {
    route_id: "source_handle_co_membership_route",
    status: "rejected-unsound-with-current-evidence",
    required_fields: [
      "ref_value_source_pair_ready",
      "membership_source_not_id_adjacency_proven",
      "endpoint_ref_and_value_map_same_witness_object_proven",
      "witness_object_membership_proof_present",
    ],
    limitation:
      "Source handles, matching endpoint ids, witness-object symbols, and inherited field claims do not prove co-membership in one constructed witness object.",
  },
  {
    route_id: "carrier_complete_witness_object_route",
    status: "blocked",
    required_fields: [
      "ref_value_non_domain_carrier_pair_constructed",
      "all_carrier_fields_constructed",
      "same_constructed_witness_object_identity_proof_present",
      "witness_object_membership_proof_present",
    ],
    limitation:
      "The ref/value non-domain carrier pair and carrier-complete witness object are absent.",
  },
  {
    route_id: "selected_carrier_admission_route",
    status: "blocked-not-independent",
    required_fields: [
      "binding_contract_satisfied",
      "witness_object_contract_link_constructed",
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      "endpoint_value_binding_map_carrier_unblocked",
    ],
    limitation:
      "The selected route depends on binding/full-binding/contract-link fields and therefore does not supply an independent membership theorem.",
  },
  {
    route_id: "proof_contract_order_revision_route",
    status: "not-taken",
    required_fields: ["proof_contract_order_revision_present"],
    limitation:
      "No proof-contract order revision is made by this priority-only packet.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "ref_value_non_domain_carrier_pair",
    missing_field: "ref_value_non_domain_carrier_pair_constructed",
    required_evidence:
      "Proof-grade ref and value-map non-domain carrier fields in one same-packet witness object.",
  },
  {
    burden_id: "carrier_complete_witness_object",
    missing_field: "all_carrier_fields_constructed",
    required_evidence:
      "All witness-object carrier fields constructed in the same packet, not only source handles.",
  },
  {
    burden_id: "constructed_witness_object_identity",
    missing_field: "same_constructed_witness_object_identity_proof_present",
    required_evidence:
      "A constructed same-packet witness-object identity proof attached to a constructed witness-object id.",
  },
  {
    burden_id: "endpoint_boundary_binding_ref_membership",
    missing_field: "endpoint_boundary_binding_ref_member_of_witness_object_proven",
    required_evidence:
      "A proof that the endpoint-boundary-binding ref is a field of the constructed witness object.",
  },
  {
    burden_id: "endpoint_value_binding_map_membership",
    missing_field: "endpoint_value_binding_map_member_of_witness_object_proven",
    required_evidence:
      "A proof that the endpoint value-binding map is a field of the same constructed witness object.",
  },
  {
    burden_id: "co_membership_not_source_adjacency",
    missing_field: "membership_source_not_id_adjacency_proven",
    required_evidence:
      "A proof that co-membership follows from the constructed witness object rather than matching ids, symbols, or source-candidate adjacency.",
  },
  {
    burden_id: "independent_theorem_derivation",
    missing_field:
      "independent_constructed_witness_object_membership_theorem_derivation_present",
    required_evidence:
      "A derivation of the membership theorem that does not use actual-link rule application, binding contract satisfaction, full endpoint boundary binding, or carrier admission as a premise.",
  },
  {
    burden_id: "independent_theorem_soundness",
    missing_field:
      "independent_constructed_witness_object_membership_theorem_soundness_proof_present",
    required_evidence:
      "A soundness proof that the theorem cannot promote source handles into witness-object fields by adjacency alone.",
  },
  {
    burden_id: "independent_theorem_application",
    missing_field:
      "independent_constructed_witness_object_membership_theorem_application_proof_present",
    required_evidence:
      "Endpoint-level application proof for the independent theorem on each of the four endpoint functionals.",
  },
];

function parseArgs(argv) {
  const args = {
    dependencyCyclePacket: DEFAULT_DEPENDENCY_CYCLE_PACKET,
    identityPacket: DEFAULT_IDENTITY_PACKET,
    carrierRuleTargetPacket: DEFAULT_CARRIER_RULE_TARGET_PACKET,
    routeDecisionPacket: DEFAULT_ROUTE_DECISION_PACKET,
    ruleMembershipTargetPacket: DEFAULT_RULE_MEMBERSHIP_TARGET_PACKET,
    completionPacket: DEFAULT_COMPLETION_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--dependency-cycle-packet") {
      args.dependencyCyclePacket = argv[++index];
    } else if (arg === "--identity-packet") {
      args.identityPacket = argv[++index];
    } else if (arg === "--carrier-rule-target-packet") {
      args.carrierRuleTargetPacket = argv[++index];
    } else if (arg === "--route-decision-packet") {
      args.routeDecisionPacket = argv[++index];
    } else if (arg === "--rule-membership-target-packet") {
      args.ruleMembershipTargetPacket = argv[++index];
    } else if (arg === "--completion-packet") {
      args.completionPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-constructed-witness-object-membership-theorem-attempt.mjs [options]",
    "",
    "Options:",
    "  --dependency-cycle-packet <path>",
    "  --identity-packet <path>",
    "  --carrier-rule-target-packet <path>",
    "  --route-decision-packet <path>",
    "  --rule-membership-target-packet <path>",
    "  --completion-packet <path>",
    "  --out-dir <path>",
    "  --pretty",
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

function missing(fields, requiredFields) {
  return requiredFields.filter((field) => fields[field] !== true);
}

function countTrue(items, field) {
  return items.filter((item) => item.required_fields_present?.[field] === true)
    .length;
}

function makeSourceArtifacts(paths) {
  return paths.map(({ label, filePath }) => ({
    label,
    path: filePath,
    sha256: sha256File(filePath),
  }));
}

function buildEndpointAttempt({
  dependency,
  identity,
  carrierTarget,
  routeDecision,
  ruleMembershipTarget,
}) {
  const acceptedEscapeRoutes =
    dependency.escape_route_candidates?.map((route) => route.route_id) ?? [];
  const targetMembershipFields =
    ruleMembershipTarget.constructed_witness_object_identity_target
      ?.required_membership_fields ?? [];
  const fields = {
    dependency_cycle_escape_route_declared:
      acceptedEscapeRoutes.includes(
        "independent_constructed_witness_object_membership_theorem"
      ) ||
      dependency.required_fields_present
        ?.independent_constructed_witness_object_membership_theorem_present ===
        false,
    dependency_cycle_detected: dependency.dependency_cycle_detected === true,
    ref_value_source_pair_ready: identity.ref_value_source_pair_ready === true,
    carrier_rule_target_declared: req(
      carrierTarget,
      "ref_value_carrier_pair_rule_target_declared"
    ),
    direct_source_promotion_rejected: req(
      routeDecision,
      "direct_source_promotion_rejected"
    ),
    membership_source_conditions_ready: req(
      ruleMembershipTarget,
      "membership_source_conditions_ready"
    ),
    constructed_witness_object_source_ready:
      ruleMembershipTarget.constructed_witness_object_source_ready === true ||
      req(ruleMembershipTarget, "witness_object_construction_input_ready"),
    proof_independence_guard_declared: true,
    ref_value_non_domain_carrier_pair_constructed: req(
      carrierTarget,
      "ref_value_non_domain_carrier_pair_constructed"
    ),
    all_carrier_fields_constructed:
      req(identity, "all_carrier_fields_constructed") ||
      req(carrierTarget, "all_carrier_fields_constructed"),
    constructed_witness_object_id_present:
      req(identity, "constructed_witness_object_id_present") ||
      req(ruleMembershipTarget, "constructed_witness_object_id_present"),
    endpoint_boundary_binding_witness_object_constructed:
      req(identity, "endpoint_boundary_binding_witness_object_constructed") ||
      req(
        ruleMembershipTarget,
        "endpoint_boundary_binding_witness_object_constructed"
      ),
    same_constructed_witness_object_identity_proof_present:
      req(identity, "same_constructed_witness_object_identity_proof_present") ||
      req(
        ruleMembershipTarget,
        "same_constructed_witness_object_identity_proof_present"
      ),
    endpoint_boundary_binding_ref_member_of_witness_object_proven:
      req(
        identity,
        "endpoint_boundary_binding_ref_member_of_witness_object_proven"
      ) ||
      req(
        ruleMembershipTarget,
        "endpoint_boundary_binding_ref_member_of_witness_object_proven"
      ),
    endpoint_value_binding_map_member_of_witness_object_proven:
      req(
        identity,
        "endpoint_value_binding_map_member_of_witness_object_proven"
      ) ||
      req(
        ruleMembershipTarget,
        "endpoint_value_binding_map_member_of_witness_object_proven"
      ),
    endpoint_ref_and_value_map_same_witness_object_proven:
      req(identity, "endpoint_ref_and_value_map_same_witness_object_proven") ||
      req(
        ruleMembershipTarget,
        "endpoint_ref_and_value_map_same_witness_object_proven"
      ),
    membership_source_not_id_adjacency_proven:
      req(identity, "membership_source_not_id_adjacency_proven") ||
      req(ruleMembershipTarget, "membership_source_not_id_adjacency_proven"),
    witness_object_membership_proof_present:
      req(identity, "witness_object_membership_proof_present") ||
      req(ruleMembershipTarget, "witness_object_membership_proof_present"),
    independent_constructed_witness_object_membership_theorem_derivation_present:
      false,
    independent_constructed_witness_object_membership_theorem_soundness_proof_present:
      false,
    independent_constructed_witness_object_membership_theorem_application_proof_present:
      false,
    independent_constructed_witness_object_membership_theorem_present: false,
    cycle_breaker_available: false,
    actual_contract_link_rule_available: req(
      ruleMembershipTarget,
      "actual_contract_link_rule_available"
    ),
    witness_object_contract_link_constructed:
      req(routeDecision, "witness_object_contract_link_constructed") ||
      req(ruleMembershipTarget, "witness_object_contract_link_constructed"),
    binding_contract_satisfied: req(
      routeDecision,
      "binding_contract_satisfied"
    ),
    full_endpoint_boundary_binding_constructed: req(
      routeDecision,
      "full_endpoint_boundary_binding_constructed"
    ),
    endpoint_boundary_binding_ref_carrier_unblocked: req(
      routeDecision,
      "endpoint_boundary_binding_ref_carrier_unblocked"
    ),
    endpoint_value_binding_map_carrier_unblocked: req(
      routeDecision,
      "endpoint_value_binding_map_carrier_unblocked"
    ),
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };
  fields.independent_constructed_witness_object_membership_theorem_present =
    missing(fields, INDEPENDENT_THEOREM_OBLIGATION_FIELDS.filter(
      (field) =>
        field !==
        "independent_constructed_witness_object_membership_theorem_present"
    )).length === 0;
  fields.cycle_breaker_available =
    fields.independent_constructed_witness_object_membership_theorem_present;

  const missingObligations = missing(
    fields,
    INDEPENDENT_THEOREM_OBLIGATION_FIELDS
  );
  const routeAttempts = THEOREM_PROOF_ROUTES.map((route) => ({
    ...route,
    missing_fields: missing(fields, route.required_fields),
    passed: route.status === "not-taken" ? false : missing(fields, route.required_fields).length === 0,
  }));

  return {
    id: dependency.id,
    endpoint_functional_id: dependency.endpoint_functional_id,
    role: dependency.role,
    independent_constructed_witness_object_membership_theorem_attempt_id:
      `independent_constructed_witness_object_membership_theorem_attempt:${dependency.id}`,
    source_attempt_ids: {
      dependency_cycle:
        dependency.actual_link_membership_dependency_cycle_completion_attempt_id,
      same_packet_constructed_witness_object_identity:
        identity.same_packet_constructed_witness_object_identity_attempt_id,
      ref_value_non_domain_carrier_rule_target:
        carrierTarget.ref_value_non_domain_carrier_rule_target_id,
      route_decision: routeDecision.route_decision_id,
      actual_contract_link_rule_membership_proof_target:
        ruleMembershipTarget.actual_contract_link_rule_membership_proof_target_id,
    },
    witness_object_attempt_id:
      identity.witness_object_attempt_id ||
      ruleMembershipTarget.witness_object_attempt_id,
    witness_object_symbol:
      identity.witness_object_symbol ||
      ruleMembershipTarget.witness_object_symbol,
    endpoint_boundary_binding_ref_id:
      identity.endpoint_boundary_binding_ref_id ||
      ruleMembershipTarget.witness_object_endpoint_boundary_binding_ref_id,
    endpoint_value_binding_map_id:
      identity.endpoint_value_binding_map_id ||
      ruleMembershipTarget.source_endpoint_value_binding_map_id,
    theorem_target: {
      theorem_id:
        `independent_constructed_witness_object_membership_theorem:${dependency.id}`,
      statement:
        "The endpoint-boundary-binding ref and endpoint value-binding map are fields of one same constructed witness object, independently of actual-link rule application, binding contract satisfaction, full endpoint boundary binding, carrier admission, row closure, and branch-chart authorization.",
      declared_required_membership_fields: targetMembershipFields,
      independence_exclusions: [
        "actual_contract_link_rule_application",
        "witness_object_contract_link",
        "binding_contract_satisfaction",
        "full_endpoint_boundary_binding",
        "carrier_admission",
        "row_consumption",
        "branch_chart_authorization",
      ],
    },
    required_fields_present: fields,
    theorem_route_attempts: routeAttempts,
    theorem_routes_passed: routeAttempts
      .filter((route) => route.passed)
      .map((route) => route.route_id),
    missing_independent_theorem_obligations: missingObligations,
    missing_proof_burdens: PROOF_BURDENS.filter((burden) =>
      missingObligations.includes(burden.missing_field)
    ).map((burden) => ({ ...burden, satisfied: false })),
    independent_theorem_present:
      fields.independent_constructed_witness_object_membership_theorem_present,
    cycle_breaker_available: fields.cycle_breaker_available,
    obstruction:
      "The endpoint has source ref/value handles and a declared independent membership theorem target, but it lacks a ref/value non-domain carrier pair, carrier-complete witness object, constructed witness-object identity, co-membership proof, non-adjacency proof, independent derivation, soundness proof, and endpoint application proof.",
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
    source_dependency_cycle_detected: req(source, "dependency_cycle_detected"),
    receiver_dependency_cycle_detected: req(
      receiver,
      "dependency_cycle_detected"
    ),
    combined_dependency_cycle_pair_detected: false,
    source_independent_membership_theorem_present: req(
      source,
      "independent_constructed_witness_object_membership_theorem_present"
    ),
    receiver_independent_membership_theorem_present: req(
      receiver,
      "independent_constructed_witness_object_membership_theorem_present"
    ),
    combined_independent_membership_theorem_pair_present: false,
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
  fields.combined_dependency_cycle_pair_detected =
    fields.source_dependency_cycle_detected &&
    fields.receiver_dependency_cycle_detected;
  fields.combined_independent_membership_theorem_pair_present =
    fields.source_independent_membership_theorem_present &&
    fields.receiver_independent_membership_theorem_present;
  fields.combined_cycle_breaker_pair_available =
    fields.source_cycle_breaker_available &&
    fields.receiver_cycle_breaker_available;

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_independent_membership_theorem_attempt_id:
      source.independent_constructed_witness_object_membership_theorem_attempt_id,
    receiver_independent_membership_theorem_attempt_id:
      receiver.independent_constructed_witness_object_membership_theorem_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "Both row endpoints inherit ref/value source readiness and the dependency-cycle escape target, but neither endpoint has an independent constructed witness-object membership theorem or cycle breaker.",
  };
}

function fieldCounts(items, fields) {
  return Object.fromEntries(
    fields.map((field) => [field, countTrue(items, field)])
  );
}

function countRows(rows, field) {
  return rows.filter((row) => row.required_fields_present?.[field] === true)
    .length;
}

function buildPacket(sources, sourcePaths) {
  assertPacket(
    sources.dependencyCycle,
    DEPENDENCY_CYCLE_STATUS,
    "dependency-cycle packet"
  );
  assertPacket(sources.identity, IDENTITY_STATUS, "identity packet");
  assertPacket(
    sources.carrierRuleTarget,
    CARRIER_RULE_TARGET_STATUS,
    "carrier rule target packet"
  );
  assertPacket(
    sources.routeDecision,
    ROUTE_DECISION_STATUS,
    "route decision packet"
  );
  assertPacket(
    sources.ruleMembershipTarget,
    RULE_MEMBERSHIP_TARGET_STATUS,
    "rule/membership target packet"
  );
  assertPacket(
    sources.completion,
    COMPLETION_STATUS,
    "binding/full-binding completion packet"
  );

  const identityById = idMap(
    sources.identity.endpoint_same_packet_constructed_witness_object_identity_attempts,
    "id",
    "identity endpoint"
  );
  const carrierTargetById = idMap(
    sources.carrierRuleTarget.endpoint_ref_value_non_domain_carrier_rule_targets,
    "id",
    "carrier rule target endpoint"
  );
  const routeDecisionById = idMap(
    sources.routeDecision.endpoint_ref_value_carrier_introduction_route_decisions,
    "id",
    "route decision endpoint"
  );
  const ruleMembershipTargetById = idMap(
    sources.ruleMembershipTarget.endpoint_actual_contract_link_rule_membership_proof_targets,
    "id",
    "rule/membership target endpoint"
  );

  const endpointAttempts =
    sources.dependencyCycle.endpoint_actual_link_membership_dependency_cycle_completion_attempts.map(
      (dependency) =>
        buildEndpointAttempt({
          dependency,
          identity: requireMapped(
            identityById,
            dependency.id,
            `identity endpoint ${dependency.id}`
          ),
          carrierTarget: requireMapped(
            carrierTargetById,
            dependency.id,
            `carrier target endpoint ${dependency.id}`
          ),
          routeDecision: requireMapped(
            routeDecisionById,
            dependency.id,
            `route decision endpoint ${dependency.id}`
          ),
          ruleMembershipTarget: requireMapped(
            ruleMembershipTargetById,
            dependency.id,
            `rule/membership target endpoint ${dependency.id}`
          ),
        })
    );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "independent membership theorem endpoint"
  );
  const rowAttempts =
    sources.dependencyCycle.row_actual_link_membership_dependency_cycle_completion_attempts.map(
      (row) => buildRowAttempt(row, endpointMap)
    );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-independent-constructed-witness-object-membership-theorem-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed theorem attempt; records that the independent constructed witness-object membership theorem escape route is declared but unsatisfied",
    source_artifacts: makeSourceArtifacts([
      {
        label: "actual_link_membership_dependency_cycle_completion_attempt",
        filePath: sourcePaths.dependencyCycle,
      },
      {
        label: "same_packet_constructed_witness_object_identity_attempt",
        filePath: sourcePaths.identity,
      },
      {
        label: "ref_value_non_domain_carrier_rule_target",
        filePath: sourcePaths.carrierRuleTarget,
      },
      {
        label: "ref_value_carrier_introduction_route_decision",
        filePath: sourcePaths.routeDecision,
      },
      {
        label: "actual_contract_link_rule_membership_proof_target",
        filePath: sourcePaths.ruleMembershipTarget,
      },
      {
        label: "binding_full_binding_completion_attempt",
        filePath: sourcePaths.completion,
      },
    ]),
    theorem_target: {
      theorem_id:
        "independent-constructed-witness-object-membership-theorem-target",
      statement:
        "For each endpoint functional, prove that the endpoint-boundary-binding ref and endpoint value-binding map are fields of one same constructed witness object without using actual-link rule application, binding contract satisfaction, full endpoint boundary binding, carrier admission, row closure, or branch-chart authorization.",
      accepted_as_cycle_breaker_if:
        "The theorem supplies a constructed witness-object identity, ref membership, value-map membership, co-membership, non-adjacency proof, derivation, soundness proof, and endpoint application proof.",
      current_theorems_available: endpointFieldCounts
        .independent_constructed_witness_object_membership_theorem_present,
    },
    proof_burdens: PROOF_BURDENS,
    theorem_proof_routes: THEOREM_PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_independent_constructed_witness_object_membership_theorem_attempts:
      endpointAttempts,
    row_independent_constructed_witness_object_membership_theorem_attempts:
      rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      dependency_cycle_escape_routes_declared:
        endpointFieldCounts.dependency_cycle_escape_route_declared,
      dependency_cycles_detected: endpointFieldCounts.dependency_cycle_detected,
      ref_value_source_pairs_ready: endpointFieldCounts.ref_value_source_pair_ready,
      carrier_rule_targets_declared: endpointFieldCounts.carrier_rule_target_declared,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      membership_source_condition_bundles_ready:
        endpointFieldCounts.membership_source_conditions_ready,
      constructed_witness_object_source_layers_ready:
        endpointFieldCounts.constructed_witness_object_source_ready,
      ref_value_non_domain_carrier_pairs_constructed:
        endpointFieldCounts.ref_value_non_domain_carrier_pair_constructed,
      all_carrier_fields_constructed:
        endpointFieldCounts.all_carrier_fields_constructed,
      constructed_witness_object_ids_present:
        endpointFieldCounts.constructed_witness_object_id_present,
      same_constructed_witness_object_identity_proofs_present:
        endpointFieldCounts.same_constructed_witness_object_identity_proof_present,
      endpoint_boundary_binding_ref_membership_proofs:
        endpointFieldCounts
          .endpoint_boundary_binding_ref_member_of_witness_object_proven,
      endpoint_value_binding_map_membership_proofs:
        endpointFieldCounts
          .endpoint_value_binding_map_member_of_witness_object_proven,
      co_membership_proofs:
        endpointFieldCounts.endpoint_ref_and_value_map_same_witness_object_proven,
      membership_source_not_id_adjacency_proofs:
        endpointFieldCounts.membership_source_not_id_adjacency_proven,
      witness_object_membership_proofs_present:
        endpointFieldCounts.witness_object_membership_proof_present,
      independent_theorem_derivations_present:
        endpointFieldCounts
          .independent_constructed_witness_object_membership_theorem_derivation_present,
      independent_theorem_soundness_proofs_present:
        endpointFieldCounts
          .independent_constructed_witness_object_membership_theorem_soundness_proof_present,
      independent_theorem_application_proofs_present:
        endpointFieldCounts
          .independent_constructed_witness_object_membership_theorem_application_proof_present,
      independent_membership_theorems_present:
        endpointFieldCounts
          .independent_constructed_witness_object_membership_theorem_present,
      cycle_breakers_available: endpointFieldCounts.cycle_breaker_available,
      row_ref_value_source_pairs_ready:
        rowFieldCounts.combined_ref_value_source_pair_ready,
      row_dependency_cycle_pairs_detected:
        rowFieldCounts.combined_dependency_cycle_pair_detected,
      row_independent_membership_theorem_pairs_present:
        rowFieldCounts.combined_independent_membership_theorem_pair_present,
      row_cycle_breaker_pairs_available:
        rowFieldCounts.combined_cycle_breaker_pair_available,
      rows_unblocked: countRows(rowAttempts, "row_unblocked"),
      row_consumption_count: countRows(rowAttempts, "row_consumed"),
      branch_chart_authorized: false,
    },
    no_promotion_rule:
      "An independent constructed witness-object membership theorem cannot be inferred from ref/value source handles, matching endpoint ids, witness-object symbols, inherited field claims, carrier rule targets, or selected carrier-admission routes.",
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint supplies the independent membership theorem, so no row pair has a cycle breaker.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed independent constructed witness-object membership theorem attempt and does not promote to reader-facing corpus prose.",
  };
}

function sourceTable(sources) {
  return sources
    .map(
      (source) =>
        `| ${source.label} | ${path.basename(source.path)} | ${source.sha256} |`
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.ref_value_source_pair_ready} | ${fields.carrier_rule_target_declared} | ${fields.ref_value_non_domain_carrier_pair_constructed} | ${fields.all_carrier_fields_constructed} | ${fields.same_constructed_witness_object_identity_proof_present} | ${fields.witness_object_membership_proof_present} | ${fields.independent_constructed_witness_object_membership_theorem_present} | ${fields.cycle_breaker_available} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_ref_value_source_pair_ready} | ${fields.combined_dependency_cycle_pair_detected} | ${fields.combined_independent_membership_theorem_pair_present} | ${fields.combined_cycle_breaker_pair_available} | ${row.row_consumed} |`;
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
  return `# Independent Constructed Witness-Object Membership Theorem Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests one recorded dependency-cycle escape route:
independent construction of the witness-object membership theorem. It requires
the endpoint-boundary-binding ref and endpoint value-binding map to be fields of
one same constructed witness object without using actual-link rule application,
binding contract satisfaction, full endpoint boundary binding, carrier
admission, row closure, or branch-chart authorization.

The attempt remains fail-closed. It records ${summary.ref_value_source_pairs_ready} / ${summary.endpoint_functionals}
ref/value source pairs and ${summary.carrier_rule_targets_declared} / ${summary.endpoint_functionals}
carrier rule targets, but ${summary.ref_value_non_domain_carrier_pairs_constructed} / ${summary.endpoint_functionals}
ref/value non-domain carrier pairs, ${summary.all_carrier_fields_constructed} / ${summary.endpoint_functionals}
carrier-complete witness objects, ${summary.same_constructed_witness_object_identity_proofs_present} / ${summary.endpoint_functionals}
constructed witness-object identity proofs, ${summary.witness_object_membership_proofs_present} / ${summary.endpoint_functionals}
membership proofs, and ${summary.independent_membership_theorems_present} / ${summary.endpoint_functionals}
independent membership theorems. It produces ${summary.cycle_breakers_available}
cycle breakers, consumes ${summary.row_consumption_count} rows, and authorizes
no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Theorem Target

${packet.theorem_target.statement}

Accepted as a cycle breaker if: ${packet.theorem_target.accepted_as_cycle_breaker_if}

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

| Endpoint | Role | Ref/value source | Carrier target | Carrier pair | All carriers | Identity proof | Membership proof | Independent theorem | Cycle breaker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_independent_constructed_witness_object_membership_theorem_attempts)}

## Row Attempts

| Row | Ref/value source pair | Dependency-cycle pair | Independent theorem pair | Cycle-breaker pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_independent_constructed_witness_object_membership_theorem_attempts)}

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
    dependencyCycle: readJson(args.dependencyCyclePacket),
    identity: readJson(args.identityPacket),
    carrierRuleTarget: readJson(args.carrierRuleTargetPacket),
    routeDecision: readJson(args.routeDecisionPacket),
    ruleMembershipTarget: readJson(args.ruleMembershipTargetPacket),
    completion: readJson(args.completionPacket),
  };
  const sourcePaths = {
    dependencyCycle: args.dependencyCyclePacket,
    identity: args.identityPacket,
    carrierRuleTarget: args.carrierRuleTargetPacket,
    routeDecision: args.routeDecisionPacket,
    ruleMembershipTarget: args.ruleMembershipTargetPacket,
    completion: args.completionPacket,
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

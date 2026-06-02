#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_COMPLETION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_full_binding_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RULE_MEMBERSHIP_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_actual_contract_link_rule_membership_proof_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_IDENTITY_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_RULE_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ROUTE_DECISION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_actual_link_membership_dependency_cycle_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_actual_link_membership_dependency_cycle_completion_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const COMPLETION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-full-binding-completion-attempt-fail-closed-source-candidates-and-route-tests-present-actual-link-membership-binding-full-binding-carrier-admission-absent-no-row-consumption";
const RULE_MEMBERSHIP_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-contract-link-rule-membership-proof-target-fail-closed-source-conditions-present-rule-proof-and-constructed-witness-object-identity-absent-no-row-consumption";
const IDENTITY_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt-fail-closed-domain-chart-ref-value-sources-present-non-domain-carriers-and-identity-proof-absent-no-row-consumption";
const CARRIER_RULE_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-rule-target-fail-closed-ref-value-sources-and-carrier-candidates-present-carrier-introduction-rules-absent-no-row-consumption";
const ROUTE_DECISION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision-fail-closed-direct-source-promotion-rejected-carrier-admission-route-selected-no-row-consumption";
const BINDING_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-fail-closed-value-maps-inherited-contract-full-binding-carrier-admission-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-link-membership-dependency-cycle-completion-attempt-fail-closed-cycle-detected-proof-grade-escape-routes-absent-no-row-consumption";

const ESCAPE_ROUTE_FIELDS = [
  "independent_actual_contract_link_rule_derivation_present",
  "independent_constructed_witness_object_membership_theorem_present",
  "independent_full_endpoint_boundary_binding_theorem_present",
  "proof_contract_order_revision_present",
];

function parseArgs(argv) {
  const args = {
    completionPacket: DEFAULT_COMPLETION_PACKET,
    ruleMembershipTargetPacket: DEFAULT_RULE_MEMBERSHIP_TARGET_PACKET,
    identityPacket: DEFAULT_IDENTITY_PACKET,
    carrierRuleTargetPacket: DEFAULT_CARRIER_RULE_TARGET_PACKET,
    routeDecisionPacket: DEFAULT_ROUTE_DECISION_PACKET,
    bindingPacket: DEFAULT_BINDING_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--completion-packet") {
      args.completionPacket = argv[++index];
    } else if (arg === "--rule-membership-target-packet") {
      args.ruleMembershipTargetPacket = argv[++index];
    } else if (arg === "--identity-packet") {
      args.identityPacket = argv[++index];
    } else if (arg === "--carrier-rule-target-packet") {
      args.carrierRuleTargetPacket = argv[++index];
    } else if (arg === "--route-decision-packet") {
      args.routeDecisionPacket = argv[++index];
    } else if (arg === "--binding-packet") {
      args.bindingPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-actual-link-membership-dependency-cycle-completion-attempt.mjs [options]",
    "",
    "Options:",
    "  --completion-packet <path>",
    "  --rule-membership-target-packet <path>",
    "  --identity-packet <path>",
    "  --carrier-rule-target-packet <path>",
    "  --route-decision-packet <path>",
    "  --binding-packet <path>",
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

function assertStatus(packet, expected, label) {
  if (packet.status !== expected) {
    throw new Error(`${label} status mismatch: ${packet.status}`);
  }
}

function byId(items) {
  return new Map(items.map((item) => [item.id, item]));
}

function rowById(items) {
  return new Map(items.map((item) => [item.row_id, item]));
}

function req(item, field) {
  return Boolean(item?.required_fields_present?.[field]);
}

function missing(item, fields) {
  return fields.filter((field) => !req(item, field));
}

function allTrue(item, fields) {
  return missing(item, fields).length === 0;
}

const SOURCE_LAYER_FIELDS = [
  "actual_contract_link_rule_source_conditions_present",
  "membership_source_conditions_ready",
  "actual_contract_link_introduction_rule_target_declared",
  "constructed_witness_object_source_ready",
  "witness_object_target_declared",
];

const ACTUAL_LINK_RULE_FIELDS = [
  "actual_contract_link_rule_available",
  "actual_contract_link_rule_derivation_present",
  "actual_contract_link_rule_soundness_proof_present",
  "actual_contract_link_rule_application_proof_present",
];

const MEMBERSHIP_PROOF_FIELDS = [
  "constructed_witness_object_id_present",
  "endpoint_boundary_binding_witness_object_constructed",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "endpoint_ref_and_value_map_same_witness_object_proven",
  "membership_source_not_id_adjacency_proven",
  "witness_object_membership_proof_present",
];

const DIRECT_CARRIER_RULE_FIELDS = [
  "ref_carrier_introduction_rule_available",
  "value_map_carrier_introduction_rule_available",
  "ref_value_carrier_pair_rule_available",
  "ref_carrier_rule_derivation_present",
  "value_map_carrier_rule_derivation_present",
  "carrier_rule_soundness_proof_present",
  "carrier_rule_application_proof_present",
  "ref_value_non_domain_carrier_pair_constructed",
];

const SELECTED_ROUTE_COMPLETION_FIELDS = [
  "binding_contract_satisfied",
  "witness_object_has_contract_link",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
];

function buildEndpointAttempt({
  completion,
  target,
  identity,
  carrierTarget,
  routeDecision,
  binding,
}) {
  const targetPremises =
    target?.actual_contract_link_introduction_rule_target?.premise_fields ?? [];
  const identityRequired =
    target?.constructed_witness_object_identity_target
      ?.required_membership_fields ?? [];
  const carrierTargetRequired =
    identity?.carrier_completeness_target?.required_carrier_fields ?? [];
  const carrierTargetMissing =
    identity?.carrier_completeness_target?.missing_carrier_fields ?? [];
  const selectedRouteMissing =
    routeDecision?.carrier_admission_route?.missing_completion_fields ?? [];

  const edgeActualLinkNeedsMembership =
    targetPremises.includes("same_constructed_witness_object_identity_proof_present") &&
    targetPremises.includes("witness_object_membership_proof_present");
  const edgeMembershipNeedsConstructedIdentity =
    identityRequired.includes("constructed_witness_object_id_present") &&
    identityRequired.includes("witness_object_membership_proof_present");
  const edgeIdentityNeedsCarrierCompleteness =
    carrierTargetRequired.includes("endpoint_boundary_binding_ref") &&
    carrierTargetRequired.includes("endpoint_value_binding_map") &&
    carrierTargetMissing.includes("endpoint_boundary_binding_ref") &&
    carrierTargetMissing.includes("endpoint_value_binding_map");
  const edgeDirectCarrierRouteRejected =
    req(routeDecision, "direct_source_promotion_rejected") &&
    routeDecision?.direct_source_promotion_route?.status ===
      "rejected-unsound-with-current-evidence";
  const edgeSelectedCarrierRouteNeedsBindingFullBinding =
    req(routeDecision, "carrier_admission_route_selected") &&
    selectedRouteMissing.includes("binding_contract_satisfied") &&
    selectedRouteMissing.includes("witness_object_has_contract_link") &&
    selectedRouteMissing.includes("full_endpoint_boundary_binding_constructed");
  const edgeBindingNeedsContractLink =
    req(binding, "binding_contract_satisfaction_test_applied") &&
    !req(binding, "binding_contract_satisfied") &&
    !req(binding, "witness_object_has_contract_link");
  const edgeContractLinkReturnsToActualLink =
    completion?.first_missing_theorem_layer ===
    "actual-link-rule-plus-constructed-witness-object-membership";

  const cycleEdges = [
    {
      edge_id: "actual_link_rule_application_requires_membership",
      from: "witness_object_contract_link_constructed",
      to: "witness_object_membership_proof_present",
      present: edgeActualLinkNeedsMembership,
      evidence:
        "The actual-link target names same constructed-witness-object identity and membership proof as premises.",
    },
    {
      edge_id: "membership_requires_constructed_witness_object_identity",
      from: "witness_object_membership_proof_present",
      to: "same_constructed_witness_object_identity_proof_present",
      present: edgeMembershipNeedsConstructedIdentity,
      evidence:
        "The membership target requires a constructed witness object plus ref/value field-membership proofs.",
    },
    {
      edge_id: "constructed_identity_requires_non_domain_carrier_fields",
      from: "same_constructed_witness_object_identity_proof_present",
      to: "ref_value_non_domain_carrier_pair_constructed",
      present: edgeIdentityNeedsCarrierCompleteness,
      evidence:
        "The identity attempt requires endpoint-boundary-binding ref and endpoint value-map carrier fields inside one witness object.",
    },
    {
      edge_id: "direct_ref_value_carrier_promotion_rejected",
      from: "ref_value_non_domain_carrier_pair_constructed",
      to: "carrier_admission_route_selected",
      present: edgeDirectCarrierRouteRejected,
      evidence:
        "Direct source-handle promotion is rejected as unsound under current evidence.",
    },
    {
      edge_id: "carrier_admission_requires_binding_and_full_binding",
      from: "carrier_admission_route_selected",
      to: "full_endpoint_boundary_binding_constructed",
      present: edgeSelectedCarrierRouteNeedsBindingFullBinding,
      evidence:
        "The selected carrier-admission route is blocked until binding contract, contract link, and full binding exist.",
    },
    {
      edge_id: "binding_contract_requires_contract_link",
      from: "binding_contract_satisfied",
      to: "witness_object_has_contract_link",
      present: edgeBindingNeedsContractLink,
      evidence:
        "The binding contract test is applied but cannot pass without the witness-object contract link.",
    },
    {
      edge_id: "contract_link_returns_to_actual_link_membership_theorem",
      from: "witness_object_has_contract_link",
      to: "actual-link-rule-plus-constructed-witness-object-membership",
      present: edgeContractLinkReturnsToActualLink,
      evidence:
        "The selected-route completion attempt names actual-link rule plus membership as the first missing theorem layer.",
    },
  ];

  const escapeFieldsPresent = {
    independent_actual_contract_link_rule_derivation_present:
      req(target, "actual_contract_link_rule_derivation_present") &&
      req(target, "actual_contract_link_rule_available"),
    independent_constructed_witness_object_membership_theorem_present:
      allTrue(identity, MEMBERSHIP_PROOF_FIELDS),
    independent_full_endpoint_boundary_binding_theorem_present:
      req(binding, "full_endpoint_boundary_binding_constructed") &&
      req(binding, "endpoint_boundary_binding_ref_carrier_unblocked") &&
      req(binding, "endpoint_value_binding_map_carrier_unblocked"),
    proof_contract_order_revision_present: false,
  };
  const cycleBreakerAvailable = Object.values(escapeFieldsPresent).some(Boolean);
  const dependencyCycleDetected =
    cycleEdges.every((edge) => edge.present) && !cycleBreakerAvailable;

  const sourceLayerReady = allTrue(completion, SOURCE_LAYER_FIELDS);
  const actualLinkRuleMissing = missing(target, ACTUAL_LINK_RULE_FIELDS);
  const membershipProofMissing = missing(identity, MEMBERSHIP_PROOF_FIELDS);
  const directCarrierRuleMissing = missing(carrierTarget, DIRECT_CARRIER_RULE_FIELDS);
  const selectedRouteMissingFields = missing(
    routeDecision,
    SELECTED_ROUTE_COMPLETION_FIELDS
  );

  return {
    id: completion.id,
    endpoint_functional_id: completion.endpoint_functional_id,
    role: completion.role,
    actual_link_membership_dependency_cycle_completion_attempt_id:
      `actual_link_membership_dependency_cycle_completion_attempt:${completion.id}`,
    source_packets: {
      binding_full_binding_completion_attempt_id:
        completion.binding_full_binding_completion_attempt_id,
      actual_contract_link_rule_membership_proof_target_id:
        target.actual_contract_link_rule_membership_proof_target_id,
      same_packet_constructed_witness_object_identity_attempt_id:
        identity.same_packet_constructed_witness_object_identity_attempt_id,
      ref_value_carrier_introduction_route_decision_id:
        `ref_value_carrier_introduction_route_decision:${completion.id}`,
      binding_contract_full_binding_carrier_admission_attempt_id:
        `binding_contract_full_binding_carrier_admission_attempt:${completion.id}`,
    },
    required_fields_present: {
      source_layer_ready: sourceLayerReady,
      actual_contract_link_rule_target_declared: req(
        target,
        "actual_contract_link_introduction_rule_target_declared"
      ),
      actual_contract_link_rule_available: req(
        target,
        "actual_contract_link_rule_available"
      ),
      actual_contract_link_rule_derivation_present: req(
        target,
        "actual_contract_link_rule_derivation_present"
      ),
      actual_contract_link_rule_soundness_proof_present: req(
        target,
        "actual_contract_link_rule_soundness_proof_present"
      ),
      actual_contract_link_rule_application_proof_present: req(
        target,
        "actual_contract_link_rule_application_proof_present"
      ),
      constructed_witness_object_source_ready: req(
        target,
        "witness_object_construction_input_ready"
      ),
      same_constructed_witness_object_identity_proof_present: req(
        identity,
        "same_constructed_witness_object_identity_proof_present"
      ),
      witness_object_membership_proof_present: req(
        identity,
        "witness_object_membership_proof_present"
      ),
      direct_source_promotion_rejected: req(
        routeDecision,
        "direct_source_promotion_rejected"
      ),
      carrier_admission_route_selected: req(
        routeDecision,
        "carrier_admission_route_selected"
      ),
      binding_contract_satisfied: req(binding, "binding_contract_satisfied"),
      witness_object_has_contract_link: req(
        binding,
        "witness_object_has_contract_link"
      ),
      full_endpoint_boundary_binding_constructed: req(
        binding,
        "full_endpoint_boundary_binding_constructed"
      ),
      endpoint_boundary_binding_ref_carrier_unblocked: req(
        binding,
        "endpoint_boundary_binding_ref_carrier_unblocked"
      ),
      endpoint_value_binding_map_carrier_unblocked: req(
        binding,
        "endpoint_value_binding_map_carrier_unblocked"
      ),
      dependency_cycle_detected: dependencyCycleDetected,
      ...escapeFieldsPresent,
      cycle_breaker_available: cycleBreakerAvailable,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    cycle_edges: cycleEdges,
    missing_fields_by_layer: {
      actual_contract_link_rule_layer: actualLinkRuleMissing,
      constructed_witness_object_membership_layer: membershipProofMissing,
      direct_ref_value_carrier_rule_layer: directCarrierRuleMissing,
      selected_carrier_admission_route_layer: selectedRouteMissingFields,
    },
    escape_route_candidates: [
      {
        route_id: "independent_actual_contract_link_rule_derivation",
        status: escapeFieldsPresent.independent_actual_contract_link_rule_derivation_present
          ? "available"
          : "absent",
        required_evidence:
          "A proof-grade actual contract-link introduction theorem with derivation, soundness proof, and endpoint-level application proof.",
        limitation:
          "It still cannot construct the link unless the membership premise is supplied by an independent theorem.",
      },
      {
        route_id: "independent_constructed_witness_object_membership_theorem",
        status:
          escapeFieldsPresent.independent_constructed_witness_object_membership_theorem_present
            ? "available"
            : "absent",
        required_evidence:
          "A constructed same-packet witness-object identity and ref/value field-membership proof that does not rely on carrier admission through the selected route.",
        limitation:
          "Current source handles, matching IDs, witness-object symbols, and domain-chart carrier subfields do not prove this.",
      },
      {
        route_id: "independent_full_endpoint_boundary_binding_theorem",
        status:
          escapeFieldsPresent.independent_full_endpoint_boundary_binding_theorem_present
            ? "available"
            : "absent",
        required_evidence:
          "A full endpoint boundary-binding theorem with carrier admission that does not use the witness-object contract link as a premise.",
        limitation:
          "This would bypass the current binding contract guard and is not supplied by current artifacts.",
      },
      {
        route_id: "proof_contract_order_revision",
        status: "not-taken",
        required_evidence:
          "An explicit operator/developer proof-contract decision changing the dependency order.",
        limitation:
          "No contract-order revision is made by this priority-only packet.",
      },
    ],
    dependency_cycle_detected: dependencyCycleDetected,
    cycle_breaker_available: cycleBreakerAvailable,
    obstruction: dependencyCycleDetected
      ? "The current proof order is cyclic: contract-link construction needs actual-link rule plus membership; membership needs constructed same-packet witness-object identity; identity needs ref/value non-domain carriers; direct ref/value promotion is rejected; selected carrier admission needs full binding and binding contract satisfaction; binding contract satisfaction needs the contract link."
      : "No complete dependency cycle was detected under the imported fields.",
  };
}

function buildRowAttempt(row, endpointMap) {
  const source = endpointMap.get(row.source_variable);
  const receiver = endpointMap.get(row.receiver_variable);
  const sourceCycle = Boolean(source?.dependency_cycle_detected);
  const receiverCycle = Boolean(receiver?.dependency_cycle_detected);
  const sourceBreaker = Boolean(source?.cycle_breaker_available);
  const receiverBreaker = Boolean(receiver?.cycle_breaker_available);

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    required_fields_present: {
      row_locator_resolved: req(row, "row_locator_resolved"),
      source_dependency_cycle_detected: sourceCycle,
      receiver_dependency_cycle_detected: receiverCycle,
      combined_dependency_cycle_pair_detected: sourceCycle && receiverCycle,
      source_cycle_breaker_available: sourceBreaker,
      receiver_cycle_breaker_available: receiverBreaker,
      combined_cycle_breaker_pair_available: sourceBreaker && receiverBreaker,
      source_actual_contract_link_rule_available: req(
        source,
        "actual_contract_link_rule_available"
      ),
      receiver_actual_contract_link_rule_available: req(
        receiver,
        "actual_contract_link_rule_available"
      ),
      source_witness_object_membership_proof_present: req(
        source,
        "witness_object_membership_proof_present"
      ),
      receiver_witness_object_membership_proof_present: req(
        receiver,
        "witness_object_membership_proof_present"
      ),
      source_binding_contract_satisfied: req(
        source,
        "binding_contract_satisfied"
      ),
      receiver_binding_contract_satisfied: req(
        receiver,
        "binding_contract_satisfied"
      ),
      residual_data_construction_ready: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    row_dependency_cycle_detected: sourceCycle && receiverCycle,
    row_cycle_breaker_available: sourceBreaker && receiverBreaker,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "Both row endpoints inherit the same actual-link/membership dependency cycle, and neither endpoint has a proof-grade cycle breaker.",
  };
}

function countTrue(items, field) {
  return items.filter((item) => req(item, field)).length;
}

function summarize(endpointAttempts, rowAttempts) {
  return {
    endpoint_functionals: endpointAttempts.length,
    residual_consumer_rows: rowAttempts.length,
    source_layers_ready: countTrue(endpointAttempts, "source_layer_ready"),
    actual_contract_link_rule_targets_declared: countTrue(
      endpointAttempts,
      "actual_contract_link_rule_target_declared"
    ),
    actual_contract_link_rules_available: countTrue(
      endpointAttempts,
      "actual_contract_link_rule_available"
    ),
    actual_contract_link_rule_derivations_present: countTrue(
      endpointAttempts,
      "actual_contract_link_rule_derivation_present"
    ),
    constructed_witness_object_source_layers_ready: countTrue(
      endpointAttempts,
      "constructed_witness_object_source_ready"
    ),
    same_constructed_witness_object_identity_proofs_present: countTrue(
      endpointAttempts,
      "same_constructed_witness_object_identity_proof_present"
    ),
    witness_object_membership_proofs_present: countTrue(
      endpointAttempts,
      "witness_object_membership_proof_present"
    ),
    direct_source_promotion_routes_rejected: countTrue(
      endpointAttempts,
      "direct_source_promotion_rejected"
    ),
    carrier_admission_routes_selected: countTrue(
      endpointAttempts,
      "carrier_admission_route_selected"
    ),
    binding_contracts_satisfied: countTrue(
      endpointAttempts,
      "binding_contract_satisfied"
    ),
    full_endpoint_boundary_bindings_constructed: countTrue(
      endpointAttempts,
      "full_endpoint_boundary_binding_constructed"
    ),
    endpoint_boundary_binding_ref_carriers_unblocked: countTrue(
      endpointAttempts,
      "endpoint_boundary_binding_ref_carrier_unblocked"
    ),
    endpoint_value_binding_map_carriers_unblocked: countTrue(
      endpointAttempts,
      "endpoint_value_binding_map_carrier_unblocked"
    ),
    dependency_cycles_detected: endpointAttempts.filter(
      (item) => item.dependency_cycle_detected
    ).length,
    cycle_breakers_available: endpointAttempts.filter(
      (item) => item.cycle_breaker_available
    ).length,
    row_dependency_cycle_pairs_detected: rowAttempts.filter(
      (item) => item.row_dependency_cycle_detected
    ).length,
    row_cycle_breaker_pairs_available: rowAttempts.filter(
      (item) => item.row_cycle_breaker_available
    ).length,
    row_consumption_count: rowAttempts.filter((item) => item.row_consumed)
      .length,
    branch_chart_authorized: false,
  };
}

function makeSourceArtifacts(paths) {
  return paths.map(({ label, filePath }) => ({
    label,
    path: filePath,
    sha256: sha256File(filePath),
  }));
}

function makeReport(packet) {
  const lines = [];
  lines.push("# Actual-Link And Membership Dependency-Cycle Completion Attempt");
  lines.push("");
  lines.push(`Status: ${packet.status}`);
  lines.push("");
  lines.push(
    "Claim level: priority-only fail-closed completion attempt; it detects the current proof-order dependency cycle for 4 / 4 endpoint functionals and records proof-grade escape routes, but supplies none of them."
  );
  lines.push("");
  lines.push(`Output JSON: ${OUTPUT_JSON}`);
  lines.push("");
  lines.push("## Source Artifacts");
  lines.push("");
  lines.push("| Source | Artifact | SHA-256 |");
  lines.push("| --- | --- | --- |");
  for (const source of packet.source_artifacts) {
    lines.push(`| ${source.label} | ${path.basename(source.path)} | ${source.sha256} |`);
  }
  lines.push("");
  lines.push("## Dependency Cycle");
  lines.push("");
  lines.push(
    "For each endpoint functional, the imported artifacts expose this ordinary graph dependency cycle:"
  );
  lines.push("");
  lines.push("| Edge | From | To | Present |");
  lines.push("| --- | --- | --- | --- |");
  const sample = packet.endpoint_actual_link_membership_dependency_cycle_completion_attempts[0];
  for (const edge of sample.cycle_edges) {
    lines.push(`| ${edge.edge_id} | ${edge.from} | ${edge.to} | ${edge.present} |`);
  }
  lines.push("");
  lines.push(
    "The cycle is fail-closed because all direct proof-grade escape routes are absent: no independent actual contract-link rule derivation, no independent constructed witness-object membership theorem, no independent full endpoint boundary-binding theorem, and no proof-contract order revision."
  );
  lines.push("");
  lines.push("## Endpoint Cycle Table");
  lines.push("");
  lines.push(
    "| Endpoint | Source layer | Rule | Identity | Membership | Direct route rejected | Selected route | Cycle | Escape |"
  );
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const endpoint of packet.endpoint_actual_link_membership_dependency_cycle_completion_attempts) {
    const fields = endpoint.required_fields_present;
    lines.push(
      `| ${endpoint.id} | ${fields.source_layer_ready} | ${fields.actual_contract_link_rule_available} | ${fields.same_constructed_witness_object_identity_proof_present} | ${fields.witness_object_membership_proof_present} | ${fields.direct_source_promotion_rejected} | ${fields.carrier_admission_route_selected} | ${fields.dependency_cycle_detected} | ${fields.cycle_breaker_available} |`
    );
  }
  lines.push("");
  lines.push("## Row Cycle Table");
  lines.push("");
  lines.push("| Row | Source cycle | Receiver cycle | Cycle pair | Escape pair | Consumed |");
  lines.push("| --- | --- | --- | --- | --- | --- |");
  for (const row of packet.row_actual_link_membership_dependency_cycle_completion_attempts) {
    const fields = row.required_fields_present;
    lines.push(
      `| ${row.row_id} | ${fields.source_dependency_cycle_detected} | ${fields.receiver_dependency_cycle_detected} | ${fields.combined_dependency_cycle_pair_detected} | ${fields.combined_cycle_breaker_pair_available} | ${row.row_consumed} |`
    );
  }
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  for (const [key, value] of Object.entries(packet.summary)) {
    lines.push(`- ${key.replaceAll("_", " ")}: ${value}`);
  }
  lines.push("");
  lines.push("## Proof-Grade Escape Routes");
  lines.push("");
  lines.push("| Route | Status | Required evidence | Limitation |");
  lines.push("| --- | --- | --- | --- |");
  for (const route of packet.escape_route_candidates) {
    lines.push(
      `| ${route.route_id} | ${route.status} | ${route.required_evidence} | ${route.limitation} |`
    );
  }
  lines.push("");
  lines.push("## Capture Decision");
  lines.push("");
  lines.push(
    "priority-only; the packet records a fail-closed dependency-cycle completion attempt and proof-grade escape-route inventory, not a reader-facing completed theorem."
  );
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }

  const completionPacket = readJson(args.completionPacket);
  const ruleMembershipTargetPacket = readJson(args.ruleMembershipTargetPacket);
  const identityPacket = readJson(args.identityPacket);
  const carrierRuleTargetPacket = readJson(args.carrierRuleTargetPacket);
  const routeDecisionPacket = readJson(args.routeDecisionPacket);
  const bindingPacket = readJson(args.bindingPacket);

  assertStatus(completionPacket, COMPLETION_STATUS, "completion packet");
  assertStatus(
    ruleMembershipTargetPacket,
    RULE_MEMBERSHIP_TARGET_STATUS,
    "rule/membership target packet"
  );
  assertStatus(identityPacket, IDENTITY_STATUS, "identity packet");
  assertStatus(
    carrierRuleTargetPacket,
    CARRIER_RULE_TARGET_STATUS,
    "carrier rule target packet"
  );
  assertStatus(routeDecisionPacket, ROUTE_DECISION_STATUS, "route decision packet");
  assertStatus(bindingPacket, BINDING_STATUS, "binding packet");

  const targetById = byId(
    ruleMembershipTargetPacket.endpoint_actual_contract_link_rule_membership_proof_targets
  );
  const identityById = byId(
    identityPacket.endpoint_same_packet_constructed_witness_object_identity_attempts
  );
  const carrierTargetById = byId(
    carrierRuleTargetPacket.endpoint_ref_value_non_domain_carrier_rule_targets
  );
  const routeDecisionById = byId(
    routeDecisionPacket.endpoint_ref_value_carrier_introduction_route_decisions
  );
  const bindingById = byId(
    bindingPacket.endpoint_binding_contract_full_binding_carrier_admission_attempts
  );

  const endpointAttempts =
    completionPacket.endpoint_binding_full_binding_completion_attempts.map(
      (completion) =>
        buildEndpointAttempt({
          completion,
          target: targetById.get(completion.id),
          identity: identityById.get(completion.id),
          carrierTarget: carrierTargetById.get(completion.id),
          routeDecision: routeDecisionById.get(completion.id),
          binding: bindingById.get(completion.id),
        })
    );

  const endpointMap = new Map(endpointAttempts.map((item) => [item.id, item]));
  const rowAttempts = completionPacket.row_binding_full_binding_completion_attempts.map(
    (row) => buildRowAttempt(row, endpointMap)
  );

  const packet = {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-actual-link-membership-dependency-cycle-completion-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed dependency-cycle completion attempt; detects current proof-order cycle and records absent proof-grade escape routes",
    source_artifacts: makeSourceArtifacts([
      {
        label: "binding_full_binding_completion_attempt",
        filePath: args.completionPacket,
      },
      {
        label: "actual_contract_link_rule_membership_proof_target",
        filePath: args.ruleMembershipTargetPacket,
      },
      {
        label: "same_packet_constructed_witness_object_identity_attempt",
        filePath: args.identityPacket,
      },
      {
        label: "ref_value_non_domain_carrier_rule_target",
        filePath: args.carrierRuleTargetPacket,
      },
      {
        label: "ref_value_carrier_introduction_route_decision",
        filePath: args.routeDecisionPacket,
      },
      {
        label: "binding_contract_full_binding_carrier_admission_attempt",
        filePath: args.bindingPacket,
      },
    ]),
    endpoint_actual_link_membership_dependency_cycle_completion_attempts:
      endpointAttempts,
    row_actual_link_membership_dependency_cycle_completion_attempts: rowAttempts,
    escape_route_fields: ESCAPE_ROUTE_FIELDS,
    escape_route_candidates: endpointAttempts[0].escape_route_candidates,
    summary: summarize(endpointAttempts, rowAttempts),
    theorem_target: {
      theorem_id:
        "actual-link-membership-dependency-cycle-escape-theorem-target",
      statement:
        "To construct an actual witness-object contract link under the current proof contract, the proof stack must supply at least one proof-grade escape route that breaks the dependency cycle between actual-link rule application, constructed witness-object membership, ref/value carrier admission, full endpoint boundary binding, binding contract satisfaction, and the contract link itself.",
      accepted_escape_routes: [
        "independent_actual_contract_link_rule_derivation",
        "independent_constructed_witness_object_membership_theorem",
        "independent_full_endpoint_boundary_binding_theorem",
        "proof_contract_order_revision",
      ],
      current_escape_routes_available: 0,
    },
    no_promotion_rule:
      "A detected dependency cycle is not a theorem completion. It does not construct an actual link, witness-object membership proof, binding contract, full endpoint boundary binding, carrier admission, row closure, or branch chart.",
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "Every residual row endpoint pair has the dependency cycle and no proof-grade escape route.",
    },
    capture_decision:
      "priority-only; records a dependency-cycle completion attempt and escape-route inventory, not a reader-facing theorem.",
  };

  fs.mkdirSync(args.outDir, { recursive: true });
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(packet, null, args.pretty ? 2 : 0) + "\n"
  );
  fs.writeFileSync(reportPath, makeReport(packet));

  console.log(`wrote ${jsonPath}`);
  console.log(`sha256 ${sha256File(jsonPath)}`);
  console.log(`wrote ${reportPath}`);
  console.log(`sha256 ${sha256File(reportPath)}`);
  console.log(`status ${STATUS}`);
}

main();

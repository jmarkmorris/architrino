#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_PARENT_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_source_equation_to_target_ref_value_interpretation_rule_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const PARENT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-source-equation-to-target-ref-value-interpretation-rule-without-contract-link-proof-attempt-fail-closed-bridge-source-scope-present-interpretation-rule-absent-no-definition-bridge-no-primitive-rule-acceptance-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-source-equation-to-target-ref-value-object-domain-definition-without-contract-link-proof-attempt-fail-closed-interpretation-rule-source-scope-present-target-ref-value-object-domain-definition-absent-no-semantic-bridge-no-interpretation-rule-no-primitive-rule-acceptance-no-row-consumption";

const SOURCE_SCOPE_FIELDS = [
  "parent_interpretation_rule_proof_attempt_input_present",
  "parent_interpretation_rule_source_scope_ready",
  "definition_source_data_preserved",
  "target_ref_value_source_payload_preserved",
  "target_endpoint_ref_value_source_equations_present",
  "source_equation_only_guard_present",
  "endpoint_value_map_only_guard_present",
  "endpoint_value_binding_map_ref_values_certified",
  "value_map_ref_value_payload_matches_target_object",
  "contract_link_premise_not_imported",
  "no_contract_link_independence_guard_declared",
  "witness_object_has_contract_link_excluded",
  "primitive_domain_definition_acceptance_not_used",
  "target_object_domain_definition_attempt_route_selected",
  "target_object_domain_definition_source_scope_ready",
];

const DOMAIN_DEFINITION_FIELDS = [
  "source_equation_handle_set_accepted_as_target_object_domain",
  "target_boundary_binding_object_accepted_as_target_object_domain",
  "endpoint_value_map_payload_accepted_as_target_object_domain",
  "payload_match_accepted_as_target_object_domain",
  "target_note_accepted_as_target_object_domain",
  "no_link_guard_accepted_as_target_object_domain",
  "primitive_domain_definition_acceptance_used",
  "target_ref_value_object_domain_membership_predicate_present",
  "target_ref_value_object_domain_constructor_present",
  "source_equation_handle_exclusion_rule_present",
  "endpoint_ref_value_sort_domain_rule_present",
  "target_boundary_binding_object_domain_membership_rule_present",
  "endpoint_value_map_binding_domain_membership_rule_present",
  "no_link_target_ref_value_object_domain_soundness_present",
  "target_ref_value_object_domain_endpoint_application_present",
  "target_ref_value_object_domain_definition_derivation_present",
  "target_ref_value_object_domain_defined",
];

const DOWNSTREAM_FIELDS = [
  "source_equation_syntax_to_target_ref_value_semantics_bridge_present",
  "source_equation_target_object_role_equivalence_present",
  "endpoint_ref_value_sort_preservation_rule_present",
  "source_equation_to_target_ref_value_interpretation_rule_soundness_present",
  "source_equation_to_target_ref_value_interpretation_rule_endpoint_application_present",
  "source_equation_to_target_ref_value_interpretation_rule_derivation_present",
  "source_equation_to_target_ref_value_interpretation_rule_present",
  "endpoint_value_map_to_target_object_identity_bridge_present",
  "source_equation_only_guard_lift_condition_present",
  "endpoint_value_map_certification_lift_condition_present",
  "no_link_definition_bridge_soundness_present",
  "definition_bridge_endpoint_application_present",
  "definition_bridge_derivation_from_definition_source_data_present",
  "target_ref_value_source_equation_promotion_definition_bridge_present",
  "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
  "independent_target_ref_value_equations_without_contract_link_proof_grade",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_SCOPE_FIELDS,
  ...DOMAIN_DEFINITION_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_domain_definition_source_scope_ready",
  "receiver_domain_definition_source_scope_ready",
  "combined_domain_definition_source_scope_ready",
  "source_target_ref_value_object_domain_defined",
  "receiver_target_ref_value_object_domain_defined",
  "combined_target_ref_value_object_domain_pair_present",
  "source_interpretation_rule_present",
  "receiver_interpretation_rule_present",
  "combined_interpretation_rule_pair_present",
  "source_definition_bridge_present",
  "receiver_definition_bridge_present",
  "combined_definition_bridge_pair_present",
  "source_promotion_rule_present",
  "receiver_promotion_rule_present",
  "combined_promotion_rule_pair_present",
  "source_ref_value_equations_proof_grade_without_contract_link",
  "receiver_ref_value_equations_proof_grade_without_contract_link",
  "combined_ref_value_equations_proof_grade_without_contract_link",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const DOMAIN_DEFINITION_ROUTES = [
  {
    route_id: "source_equation_handle_set_as_target_object_domain",
    status: "rejected-source-handle-only",
    required_fields: [
      "source_equation_only_guard_present",
      "source_equation_handle_set_accepted_as_target_object_domain",
    ],
    limitation:
      "Source-equation handles are source syntax; they are not the target ref/value object domain definition.",
  },
  {
    route_id: "target_boundary_binding_object_as_target_object_domain",
    status: "rejected-target-object-only",
    required_fields: [
      "target_ref_value_source_payload_preserved",
      "target_boundary_binding_object_accepted_as_target_object_domain",
    ],
    limitation:
      "The target boundary-binding object names a target object instance but does not define the object domain.",
  },
  {
    route_id: "endpoint_value_map_payload_as_target_object_domain",
    status: "rejected-value-map-only",
    required_fields: [
      "endpoint_value_map_only_guard_present",
      "endpoint_value_map_payload_accepted_as_target_object_domain",
    ],
    limitation:
      "Endpoint value-map payloads certify endpoint values; they do not define the target ref/value object domain.",
  },
  {
    route_id: "payload_match_as_target_object_domain",
    status: "rejected-payload-match-only",
    required_fields: [
      "value_map_ref_value_payload_matches_target_object",
      "payload_match_accepted_as_target_object_domain",
    ],
    limitation:
      "Payload matching records agreement between handles and values; it is not a domain membership criterion.",
  },
  {
    route_id: "target_note_as_target_object_domain",
    status: "rejected-target-note-only",
    required_fields: [
      "target_note_accepted_as_target_object_domain",
    ],
    limitation:
      "The target note records the obligation and cannot define the target object domain.",
  },
  {
    route_id: "no_link_guard_as_target_object_domain",
    status: "rejected-guard-only",
    required_fields: [
      "contract_link_premise_not_imported",
      "no_contract_link_independence_guard_declared",
      "no_link_guard_accepted_as_target_object_domain",
    ],
    limitation:
      "No-link guards exclude the contract-link premise but do not define a target ref/value object domain.",
  },
  {
    route_id: "primitive_domain_definition_acceptance",
    status: "rejected-decision-required",
    required_fields: [
      "primitive_domain_definition_acceptance_used",
      "target_ref_value_object_domain_defined",
    ],
    limitation:
      "Accepting the target ref/value object domain as primitive would be a separate theory decision and is not performed here.",
  },
  {
    route_id: "derive_target_object_domain_from_definition_source_data",
    status: "blocked",
    required_fields: [
      "target_object_domain_definition_source_scope_ready",
      "target_ref_value_object_domain_membership_predicate_present",
      "target_ref_value_object_domain_constructor_present",
      "source_equation_handle_exclusion_rule_present",
      "endpoint_ref_value_sort_domain_rule_present",
      "target_boundary_binding_object_domain_membership_rule_present",
      "endpoint_value_map_binding_domain_membership_rule_present",
      "no_link_target_ref_value_object_domain_soundness_present",
      "target_ref_value_object_domain_endpoint_application_present",
      "target_ref_value_object_domain_definition_derivation_present",
      "target_ref_value_object_domain_defined",
    ],
    limitation:
      "The source scope is present, but no membership predicate, constructor, source-handle exclusion rule, endpoint ref/value sort-domain rule, target-boundary-object membership rule, value-map membership rule, no-link soundness proof, endpoint application, or derivation is present.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "target_ref_value_object_domain_membership_predicate",
    missing_field: "target_ref_value_object_domain_membership_predicate_present",
    required_evidence:
      "A membership predicate that separates target ref/value equation objects from source-equation handles, target notes, payload matches, value-map certifications, and no-link guards.",
  },
  {
    burden_id: "target_ref_value_object_domain_constructor",
    missing_field: "target_ref_value_object_domain_constructor_present",
    required_evidence:
      "A constructor for target ref/value equation objects, including which inputs build a domain object and which inputs remain only source handles.",
  },
  {
    burden_id: "source_equation_handle_exclusion_rule",
    missing_field: "source_equation_handle_exclusion_rule_present",
    required_evidence:
      "A rule excluding bare source-equation handles from being treated as target ref/value object-domain definitions.",
  },
  {
    burden_id: "endpoint_ref_value_sort_domain_rule",
    missing_field: "endpoint_ref_value_sort_domain_rule_present",
    required_evidence:
      "A rule preserving endpoint ref/value sorts inside the target object-domain definition.",
  },
  {
    burden_id: "target_boundary_binding_object_domain_membership_rule",
    missing_field:
      "target_boundary_binding_object_domain_membership_rule_present",
    required_evidence:
      "A rule relating target boundary-binding objects to the target ref/value object domain.",
  },
  {
    burden_id: "endpoint_value_map_binding_domain_membership_rule",
    missing_field:
      "endpoint_value_map_binding_domain_membership_rule_present",
    required_evidence:
      "A rule relating endpoint value-map certifications to target ref/value object membership without treating certification as the domain definition.",
  },
  {
    burden_id: "no_link_target_ref_value_object_domain_soundness",
    missing_field: "no_link_target_ref_value_object_domain_soundness_present",
    required_evidence:
      "A soundness proof that the domain definition does not rename source equations, endpoint-value-map certifications, payload matches, target notes, or no-link guards as target objects.",
  },
  {
    burden_id: "target_ref_value_object_domain_endpoint_application",
    missing_field: "target_ref_value_object_domain_endpoint_application_present",
    required_evidence:
      "An endpoint-by-endpoint proof that all four endpoint functionals satisfy the domain-definition premises.",
  },
  {
    burden_id: "target_ref_value_object_domain_definition_derivation",
    missing_field: "target_ref_value_object_domain_definition_derivation_present",
    required_evidence:
      "A derivation of the target ref/value object domain definition from preserved definition source data.",
  },
  {
    burden_id: "target_ref_value_object_domain_definition",
    missing_field: "target_ref_value_object_domain_defined",
    required_evidence:
      "The target ref/value object domain definition itself, present only after the membership predicate, constructor, source-handle exclusion rule, endpoint ref/value sort-domain rule, membership rules, no-link soundness proof, endpoint application, and derivation are present.",
  },
];

function parseArgs(argv) {
  const args = {
    parentPacket: DEFAULT_PARENT_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--parent-packet") {
      args.parentPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-target-ref-value-source-equation-to-target-ref-value-object-domain-definition-without-contract-link-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --parent-packet <path>",
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

function assertParentPacket(packet) {
  if (packet.packet_id !== PACKET_ID) {
    throw new Error(`parent packet id mismatch: ${packet.packet_id}`);
  }
  if (packet.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `parent fold-coordinate packet id mismatch: ${packet.fold_coordinate_packet_id}`
    );
  }
  if (packet.status !== PARENT_STATUS) {
    throw new Error(`parent status mismatch: ${packet.status}`);
  }
  if (
    packet.branch_chart_authorized ||
    packet.preledger_pass ||
    packet.updates_live_ledger ||
    packet.row_closure
  ) {
    throw new Error("Refusing domain-definition attempt from authorized parent packet.");
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

function sourceArtifacts(parentPath, parent) {
  return [
    {
      label:
        "independent_target_ref_value_source_equation_to_target_ref_value_interpretation_rule_without_contract_link_proof_attempt",
      path: parentPath,
      basename: path.basename(parentPath),
      sha256: sha256File(parentPath),
    },
    ...(parent.source_artifacts ?? []).map((artifact) => ({
      ...artifact,
      inherited_from:
        "independent_target_ref_value_source_equation_to_target_ref_value_interpretation_rule_without_contract_link_proof_attempt",
    })),
  ];
}

function sourceEquationCount(definitionSourceData) {
  return (
    definitionSourceData.endpoint_value_binding_source_equations ?? []
  ).length;
}

function valueBindingCount(definitionSourceData) {
  return (definitionSourceData.value_bindings ?? []).length;
}

function buildEndpointAttempt(parentEndpoint) {
  const parentFields = parentEndpoint.required_fields_present ?? {};
  const payload = parentEndpoint.target_ref_value_source_payload ?? {};
  const definitionSourceData = parentEndpoint.definition_source_data ?? {};

  const fields = {
    parent_interpretation_rule_proof_attempt_input_present: true,
    parent_interpretation_rule_source_scope_ready:
      parentFields.interpretation_rule_source_scope_ready === true,
    definition_source_data_preserved:
      parentFields.definition_source_data_preserved === true,
    target_ref_value_source_payload_preserved:
      parentFields.target_ref_value_source_payload_preserved === true,
    target_endpoint_ref_value_source_equations_present:
      parentFields.target_endpoint_ref_value_source_equations_present === true &&
      sourceEquationCount(definitionSourceData) ===
        (payload.source_equation_count ?? 0),
    source_equation_only_guard_present:
      parentFields.source_equation_only_guard_present === true,
    endpoint_value_map_only_guard_present:
      parentFields.endpoint_value_map_only_guard_present === true,
    endpoint_value_binding_map_ref_values_certified:
      parentFields.endpoint_value_binding_map_ref_values_certified === true &&
      valueBindingCount(definitionSourceData) === (payload.value_binding_count ?? 0),
    value_map_ref_value_payload_matches_target_object:
      parentFields.value_map_ref_value_payload_matches_target_object === true,
    contract_link_premise_not_imported:
      parentFields.contract_link_premise_not_imported === true,
    no_contract_link_independence_guard_declared:
      parentFields.no_contract_link_independence_guard_declared === true,
    witness_object_has_contract_link_excluded:
      parentFields.witness_object_has_contract_link_excluded === true,
    primitive_domain_definition_acceptance_not_used: true,
    target_object_domain_definition_attempt_route_selected: true,
    target_object_domain_definition_source_scope_ready: false,
    source_equation_handle_set_accepted_as_target_object_domain: false,
    target_boundary_binding_object_accepted_as_target_object_domain: false,
    endpoint_value_map_payload_accepted_as_target_object_domain: false,
    payload_match_accepted_as_target_object_domain: false,
    target_note_accepted_as_target_object_domain: false,
    no_link_guard_accepted_as_target_object_domain: false,
    primitive_domain_definition_acceptance_used: false,
    target_ref_value_object_domain_membership_predicate_present: false,
    target_ref_value_object_domain_constructor_present: false,
    source_equation_handle_exclusion_rule_present: false,
    endpoint_ref_value_sort_domain_rule_present: false,
    target_boundary_binding_object_domain_membership_rule_present: false,
    endpoint_value_map_binding_domain_membership_rule_present: false,
    no_link_target_ref_value_object_domain_soundness_present: false,
    target_ref_value_object_domain_endpoint_application_present: false,
    target_ref_value_object_domain_definition_derivation_present: false,
    target_ref_value_object_domain_defined: false,
    source_equation_syntax_to_target_ref_value_semantics_bridge_present: false,
    source_equation_target_object_role_equivalence_present: false,
    endpoint_ref_value_sort_preservation_rule_present: false,
    source_equation_to_target_ref_value_interpretation_rule_soundness_present:
      false,
    source_equation_to_target_ref_value_interpretation_rule_endpoint_application_present:
      false,
    source_equation_to_target_ref_value_interpretation_rule_derivation_present:
      false,
    source_equation_to_target_ref_value_interpretation_rule_present: false,
    endpoint_value_map_to_target_object_identity_bridge_present: false,
    source_equation_only_guard_lift_condition_present: false,
    endpoint_value_map_certification_lift_condition_present: false,
    no_link_definition_bridge_soundness_present: false,
    definition_bridge_endpoint_application_present: false,
    definition_bridge_derivation_from_definition_source_data_present: false,
    target_ref_value_source_equation_promotion_definition_bridge_present: false,
    independent_target_ref_value_equation_promotion_rule_without_contract_link_present:
      false,
    independent_target_ref_value_equations_without_contract_link_proof_grade:
      false,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.target_object_domain_definition_source_scope_ready =
    SOURCE_SCOPE_FIELDS.filter(
      (field) => field !== "target_object_domain_definition_source_scope_ready"
    ).every((field) => fields[field] === true);

  const routeAttempts = DOMAIN_DEFINITION_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: parentEndpoint.id,
    endpoint_functional_id: parentEndpoint.endpoint_functional_id,
    role: parentEndpoint.role,
    independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempt_id:
      `independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempt:${parentEndpoint.id}`,
    parent_interpretation_rule_proof_attempt_id:
      parentEndpoint
        .independent_target_ref_value_source_equation_to_target_ref_value_interpretation_rule_without_contract_link_proof_attempt_id,
    source_attempt_ids: parentEndpoint.source_attempt_ids ?? {},
    target_object_domain_definition_target: {
      target_id: `source_equation_to_target_ref_value_object_domain_definition_without_contract_link:${parentEndpoint.id}`,
      statement:
        "Derive the target ref/value object domain definition without importing the contract-link premise.",
      accepted_if:
        "The endpoint has a membership predicate, constructor, source-handle exclusion rule, endpoint ref/value sort-domain rule, target-boundary-object membership rule, endpoint-value-map membership rule, no-link soundness proof, endpoint application proof, derivation, and target ref/value object domain definition.",
      prohibited_premises: [
        "source-equation handle set as domain definition",
        "target boundary-binding object as domain definition",
        "endpoint value-map payload as domain definition",
        "payload match as domain definition",
        "target note as domain definition",
        "no-link guard as domain definition",
        "primitive domain-definition acceptance",
        "witness_object_has_contract_link",
        "interpretation rule construction",
        "definition bridge construction",
        "promotion rule construction",
        "row consumption",
        "branch-chart authorization",
      ],
    },
    target_ref_value_source_payload: payload,
    definition_source_data: definitionSourceData,
    required_fields_present: fields,
    target_object_domain_definition_route_attempts: routeAttempts,
    target_object_domain_definition_routes_passed: [],
    missing_domain_definition_obligations: missing(
      fields,
      DOMAIN_DEFINITION_FIELDS
    ),
    missing_downstream_obligations: missing(fields, DOWNSTREAM_FIELDS),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 9)
      .map((burden) => burden.missing_field),
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint preserves interpretation-rule source scope data, source equations, target-object payloads, value-map bindings, and no-link guards, but no target ref/value object domain statement, membership criterion, membership rule, soundness proof, endpoint application, derivation, or domain definition is present.",
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
  const rowFields = row.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: rowFields.row_locator_resolved === true,
    source_domain_definition_source_scope_ready:
      sourceFields.target_object_domain_definition_source_scope_ready,
    receiver_domain_definition_source_scope_ready:
      receiverFields.target_object_domain_definition_source_scope_ready,
    combined_domain_definition_source_scope_ready: false,
    source_target_ref_value_object_domain_defined:
      sourceFields.target_ref_value_object_domain_defined,
    receiver_target_ref_value_object_domain_defined:
      receiverFields.target_ref_value_object_domain_defined,
    combined_target_ref_value_object_domain_pair_present: false,
    source_interpretation_rule_present:
      sourceFields.source_equation_to_target_ref_value_interpretation_rule_present,
    receiver_interpretation_rule_present:
      receiverFields.source_equation_to_target_ref_value_interpretation_rule_present,
    combined_interpretation_rule_pair_present: false,
    source_definition_bridge_present:
      sourceFields
        .target_ref_value_source_equation_promotion_definition_bridge_present,
    receiver_definition_bridge_present:
      receiverFields
        .target_ref_value_source_equation_promotion_definition_bridge_present,
    combined_definition_bridge_pair_present: false,
    source_promotion_rule_present:
      sourceFields
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_present,
    receiver_promotion_rule_present:
      receiverFields
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_present,
    combined_promotion_rule_pair_present: false,
    source_ref_value_equations_proof_grade_without_contract_link:
      sourceFields
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    receiver_ref_value_equations_proof_grade_without_contract_link:
      receiverFields
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    combined_ref_value_equations_proof_grade_without_contract_link: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };

  fields.combined_domain_definition_source_scope_ready =
    fields.row_locator_resolved &&
    fields.source_domain_definition_source_scope_ready &&
    fields.receiver_domain_definition_source_scope_ready;
  fields.combined_target_ref_value_object_domain_pair_present =
    fields.source_target_ref_value_object_domain_defined &&
    fields.receiver_target_ref_value_object_domain_defined;
  fields.combined_interpretation_rule_pair_present =
    fields.source_interpretation_rule_present &&
    fields.receiver_interpretation_rule_present;
  fields.combined_definition_bridge_pair_present =
    fields.source_definition_bridge_present &&
    fields.receiver_definition_bridge_present;
  fields.combined_promotion_rule_pair_present =
    fields.source_promotion_rule_present && fields.receiver_promotion_rule_present;
  fields.combined_ref_value_equations_proof_grade_without_contract_link =
    fields.source_ref_value_equations_proof_grade_without_contract_link &&
    fields.receiver_ref_value_equations_proof_grade_without_contract_link;

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_target_object_domain_definition_proof_attempt_id:
      source
        .independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempt_id,
    receiver_target_object_domain_definition_proof_attempt_id:
      receiver
        .independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver target-object domain-definition source scopes, but no source/receiver target ref/value object domain definitions, interpretation rules, definition bridges, promotion-rule pairs, or proof-grade ref/value equation pairs.",
  };
}

function buildPacket(parentPath, parent) {
  assertParentPacket(parent);

  const parentEndpoints =
    parent
      .endpoint_independent_target_ref_value_source_equation_to_target_ref_value_interpretation_rule_without_contract_link_proof_attempts ??
    [];
  const parentRows =
    parent
      .row_independent_target_ref_value_source_equation_to_target_ref_value_interpretation_rule_without_contract_link_proof_attempts ??
    [];
  const endpointAttempts = parentEndpoints.map(buildEndpointAttempt);
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "endpoint attempts"
  );
  const rowAttempts = parentRows.map((row) => buildRowAttempt(row, endpointMap));
  const endpointCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  const summary = {
    endpoint_functionals: endpointAttempts.length,
    residual_consumer_rows: rowAttempts.length,
    parent_inputs: endpointCounts
      .parent_interpretation_rule_proof_attempt_input_present,
    parent_interpretation_rule_source_scopes_ready:
      endpointCounts.parent_interpretation_rule_source_scope_ready,
    definition_source_data_preserved:
      endpointCounts.definition_source_data_preserved,
    target_ref_value_source_payloads_preserved:
      endpointCounts.target_ref_value_source_payload_preserved,
    target_ref_value_source_equation_sets:
      endpointCounts.target_endpoint_ref_value_source_equations_present,
    source_equation_only_guards: endpointCounts.source_equation_only_guard_present,
    endpoint_value_map_only_guards:
      endpointCounts.endpoint_value_map_only_guard_present,
    endpoint_value_binding_map_ref_values_certified:
      endpointCounts.endpoint_value_binding_map_ref_values_certified,
    payload_matches:
      endpointCounts.value_map_ref_value_payload_matches_target_object,
    contract_link_premise_not_imported:
      endpointCounts.contract_link_premise_not_imported,
    no_link_independence_guards_declared:
      endpointCounts.no_contract_link_independence_guard_declared,
    witness_object_has_contract_link_excluded:
      endpointCounts.witness_object_has_contract_link_excluded,
    primitive_domain_definition_acceptance_not_used:
      endpointCounts.primitive_domain_definition_acceptance_not_used,
    target_object_domain_definition_attempt_routes_selected:
      endpointCounts.target_object_domain_definition_attempt_route_selected,
    target_object_domain_definition_source_scopes_ready:
      endpointCounts.target_object_domain_definition_source_scope_ready,
    total_target_ref_value_source_equations: endpointAttempts.reduce(
      (sum, endpoint) =>
        sum + sourceEquationCount(endpoint.definition_source_data ?? {}),
      0
    ),
    total_value_map_bindings: endpointAttempts.reduce(
      (sum, endpoint) => sum + valueBindingCount(endpoint.definition_source_data ?? {}),
      0
    ),
    source_equation_handle_sets_accepted_as_target_object_domain:
      endpointCounts.source_equation_handle_set_accepted_as_target_object_domain,
    target_boundary_binding_objects_accepted_as_target_object_domain:
      endpointCounts.target_boundary_binding_object_accepted_as_target_object_domain,
    endpoint_value_map_payloads_accepted_as_target_object_domain:
      endpointCounts.endpoint_value_map_payload_accepted_as_target_object_domain,
    payload_matches_accepted_as_target_object_domain:
      endpointCounts.payload_match_accepted_as_target_object_domain,
    target_notes_accepted_as_target_object_domain:
      endpointCounts.target_note_accepted_as_target_object_domain,
    no_link_guards_accepted_as_target_object_domain:
      endpointCounts.no_link_guard_accepted_as_target_object_domain,
    primitive_domain_definition_acceptance_used:
      endpointCounts.primitive_domain_definition_acceptance_used,
    target_ref_value_object_domain_membership_predicates:
      endpointCounts.target_ref_value_object_domain_membership_predicate_present,
    target_ref_value_object_domain_constructors:
      endpointCounts.target_ref_value_object_domain_constructor_present,
    source_equation_handle_exclusion_rules:
      endpointCounts
        .source_equation_handle_exclusion_rule_present,
    endpoint_ref_value_sort_domain_rules:
      endpointCounts.endpoint_ref_value_sort_domain_rule_present,
    target_boundary_binding_object_domain_membership_rules:
      endpointCounts
        .target_boundary_binding_object_domain_membership_rule_present,
    endpoint_value_map_binding_domain_membership_rules:
      endpointCounts.endpoint_value_map_binding_domain_membership_rule_present,
    no_link_target_ref_value_object_domain_soundness_proofs:
      endpointCounts.no_link_target_ref_value_object_domain_soundness_present,
    target_ref_value_object_domain_endpoint_applications:
      endpointCounts.target_ref_value_object_domain_endpoint_application_present,
    target_ref_value_object_domain_derivations:
      endpointCounts.target_ref_value_object_domain_definition_derivation_present,
    target_ref_value_object_domains_defined:
      endpointCounts.target_ref_value_object_domain_defined,
    interpretation_rules_present:
      endpointCounts.source_equation_to_target_ref_value_interpretation_rule_present,
    definition_bridges_present:
      endpointCounts
        .target_ref_value_source_equation_promotion_definition_bridge_present,
    promotion_rules_present:
      endpointCounts
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_present,
    proof_grade_target_ref_value_packages:
      endpointCounts
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    row_domain_definition_source_scope_pairs:
      rowCounts.combined_domain_definition_source_scope_ready,
    row_domain_definition_pairs:
      rowCounts.combined_target_ref_value_object_domain_pair_present,
    row_interpretation_rule_pairs:
      rowCounts.combined_interpretation_rule_pair_present,
    row_definition_bridge_pairs: rowCounts.combined_definition_bridge_pair_present,
    row_promotion_rule_pairs: rowCounts.combined_promotion_rule_pair_present,
    row_ref_value_equation_pairs_proof_grade:
      rowCounts.combined_ref_value_equations_proof_grade_without_contract_link,
    rows_unblocked: rowCounts.row_unblocked,
    row_consumption_count: rowCounts.row_consumed,
    branch_chart_authorized: false,
  };

  return {
    schema:
      "architrino.proof_programs.fold_coordinate_endpoint_functional.independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempt.v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level: "priority-only-fail-closed-proof-attempt",
    source_artifacts: sourceArtifacts(parentPath, parent),
    target: {
      statement:
        "Derive the target ref/value object domain definition without importing the contract-link premise.",
      accepted_if:
        "Each endpoint has a target ref/value object domain statement, membership criterion, source-equation membership rule, target-boundary-object membership rule, endpoint-value-map membership rule, soundness proof, endpoint application proof, derivation, and domain definition.",
    },
    no_primitive_acceptance_rule:
      "Primitive domain-definition acceptance is not used; accepting the domain as primitive remains a separate theory decision.",
    no_promotion_rule:
      "Source-equation handles, target boundary-binding objects, endpoint-value-map payloads, payload matches, target notes, and no-link guards are not accepted as the target ref/value object domain definition.",
    proof_burdens: PROOF_BURDENS,
    target_object_domain_definition_routes: DOMAIN_DEFINITION_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempts:
      endpointAttempts,
    row_independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempts:
      rowAttempts,
    endpoint_field_counts: endpointCounts,
    row_field_counts: rowCounts,
    summary,
    authorization_lock: {
      preledger_pass: false,
      updates_live_ledger: false,
      emits_candidate_artifacts: false,
      emits_topology_recertification: false,
      emits_proof_interval_replay: false,
      row_closure: false,
      branch_chart_authorized: false,
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed target ref/value object domain-definition proof attempt and does not promote to reader-facing corpus prose.",
  };
}

function yesNo(value) {
  return value ? "true" : "false";
}

function renderCounts(counts, fields, total) {
  return fields
    .map((field) => `| ${field} | ${counts[field] ?? 0} / ${total} |`)
    .join("\n");
}

function renderSourceArtifacts(artifacts) {
  return artifacts
    .map(
      (artifact) =>
        `| ${artifact.label} | ${artifact.basename ?? path.basename(artifact.path)} | ${artifact.sha256} |`
    )
    .join("\n");
}

function renderEndpointRows(endpointAttempts) {
  return endpointAttempts
    .map((endpoint) => {
      const fields = endpoint.required_fields_present;
      return [
        `| ${endpoint.id}`,
        endpoint.role,
        yesNo(fields.target_object_domain_definition_source_scope_ready),
        sourceEquationCount(endpoint.definition_source_data ?? {}),
        valueBindingCount(endpoint.definition_source_data ?? {}),
        yesNo(fields.target_ref_value_object_domain_membership_predicate_present),
        yesNo(fields.target_ref_value_object_domain_constructor_present),
        yesNo(fields.source_equation_handle_exclusion_rule_present),
        yesNo(fields.endpoint_ref_value_sort_domain_rule_present),
        yesNo(fields.target_boundary_binding_object_domain_membership_rule_present),
        yesNo(fields.endpoint_value_map_binding_domain_membership_rule_present),
        yesNo(fields.no_link_target_ref_value_object_domain_soundness_present),
        yesNo(fields.target_ref_value_object_domain_endpoint_application_present),
        yesNo(fields.target_ref_value_object_domain_definition_derivation_present),
        yesNo(fields.target_ref_value_object_domain_defined),
        endpoint.first_exact_blockers.join(", "),
      ].join(" | ") + " |";
    })
    .join("\n");
}

function renderRowRows(rowAttempts) {
  return rowAttempts
    .map((row) => {
      const fields = row.required_fields_present;
      return [
        `| ${row.row_id}`,
        yesNo(fields.combined_domain_definition_source_scope_ready),
        yesNo(fields.combined_target_ref_value_object_domain_pair_present),
        yesNo(fields.combined_interpretation_rule_pair_present),
        yesNo(fields.combined_definition_bridge_pair_present),
        yesNo(fields.combined_promotion_rule_pair_present),
        yesNo(fields.combined_ref_value_equations_proof_grade_without_contract_link),
        yesNo(fields.row_consumed),
      ].join(" | ") + " |";
    })
    .join("\n");
}

function renderReport(packet) {
  const summary = packet.summary;
  const endpoints =
    packet
      .endpoint_independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempts;
  const rows =
    packet
      .row_independent_target_ref_value_source_equation_to_target_ref_value_object_domain_definition_without_contract_link_proof_attempts;

  return [
    "# Independent Target Ref/Value Object Domain Definition Without Contract Link Proof Attempt",
    "",
    "## Verdict",
    "",
    `Status: ${packet.status}`,
    "",
    "This priority-only packet tests the first exact blocker exposed by the",
    "source-equation to target ref/value interpretation-rule proof attempt:",
    "`target_ref_value_object_domain_defined`. It imports the parent",
    "interpretation-rule proof attempt, preserves source equations, target",
    "ref/value payloads, endpoint value-map bindings, interpretation-rule source",
    "scopes, and no-link guards, and tests whether those data supply the target",
    "ref/value object domain definition without importing the contract-link premise.",
    "",
    "The attempt remains fail-closed. It records " +
      `${summary.parent_inputs} / ${summary.endpoint_functionals}`,
    "parent interpretation-rule inputs, " +
      `${summary.parent_interpretation_rule_source_scopes_ready} / ${summary.endpoint_functionals}`,
    "parent interpretation-rule source scopes, " +
      `${summary.target_object_domain_definition_source_scopes_ready} / ${summary.endpoint_functionals}`,
    "target-object domain-definition source scopes, " +
      `${summary.total_target_ref_value_source_equations} / ${summary.total_target_ref_value_source_equations}`,
    "target ref/value source equations, and " +
      `${summary.total_value_map_bindings}`,
    "value-map bindings.",
    "",
    "It records " +
      `${summary.source_equation_handle_sets_accepted_as_target_object_domain} / ${summary.endpoint_functionals}`,
    "source-equation handle sets accepted as the target object domain, " +
      `${summary.target_boundary_binding_objects_accepted_as_target_object_domain} / ${summary.endpoint_functionals}`,
    "target boundary-binding objects accepted as the target object domain, " +
      `${summary.endpoint_value_map_payloads_accepted_as_target_object_domain} / ${summary.endpoint_functionals}`,
    "endpoint value-map payloads accepted as the target object domain, " +
      `${summary.payload_matches_accepted_as_target_object_domain} / ${summary.endpoint_functionals}`,
    "payload matches accepted as the target object domain, " +
      `${summary.no_link_guards_accepted_as_target_object_domain} / ${summary.endpoint_functionals}`,
    "no-link guards accepted as the target object domain, " +
      `${summary.primitive_domain_definition_acceptance_used} / ${summary.endpoint_functionals}`,
    "primitive-domain-definition acceptances, " +
      `${summary.target_ref_value_object_domain_membership_predicates} / ${summary.endpoint_functionals}`,
    "membership predicates, " +
      `${summary.target_ref_value_object_domain_constructors} / ${summary.endpoint_functionals}`,
    "constructors, " +
      `${summary.source_equation_handle_exclusion_rules} / ${summary.endpoint_functionals}`,
    "source-handle exclusion rules, " +
      `${summary.endpoint_ref_value_sort_domain_rules} / ${summary.endpoint_functionals}`,
    "endpoint ref/value sort-domain rules, " +
      `${summary.no_link_target_ref_value_object_domain_soundness_proofs} / ${summary.endpoint_functionals}`,
    "no-link soundness proofs, " +
      `${summary.target_ref_value_object_domain_endpoint_applications} / ${summary.endpoint_functionals}`,
    "endpoint applications, " +
      `${summary.target_ref_value_object_domain_derivations} / ${summary.endpoint_functionals}`,
    "derivations, " +
      `${summary.target_ref_value_object_domains_defined} / ${summary.endpoint_functionals}`,
    "target ref/value object domain definitions, " +
      `${summary.interpretation_rules_present} / ${summary.endpoint_functionals}`,
    "interpretation rules, " +
      `${summary.definition_bridges_present} / ${summary.endpoint_functionals}`,
    "definition bridges, " +
      `${summary.promotion_rules_present} / ${summary.endpoint_functionals}`,
    "promotion rules, " +
      `${summary.proof_grade_target_ref_value_packages} / ${summary.endpoint_functionals}`,
    "proof-grade target ref/value equation packages, " +
      `${summary.row_consumption_count}`,
    "consumed rows, and `branch_chart_authorized=false`.",
    "",
    "## Source Artifacts",
    "",
    "| Source | Artifact | SHA-256 |",
    "| --- | --- | --- |",
    renderSourceArtifacts(packet.source_artifacts),
    "",
    "## Target",
    "",
    "Derive the target ref/value object domain definition without importing the contract-link premise.",
    "",
    "Accepted if: Each endpoint has the membership predicate, constructor, source-handle exclusion rule, endpoint ref/value sort-domain rule, target-boundary-object membership rule, endpoint-value-map membership rule, no-link soundness proof, endpoint application proof, derivation, and target ref/value object domain definition.",
    "",
    "## No Primitive Acceptance",
    "",
    packet.no_primitive_acceptance_rule,
    "",
    "## No-Promotion Rule",
    "",
    packet.no_promotion_rule,
    "",
    "## Proof Burdens",
    "",
    "| Burden | Missing field | Required evidence |",
    "| --- | --- | --- |",
    ...packet.proof_burdens.map(
      (burden) =>
        `| ${burden.burden_id} | ${burden.missing_field} | ${burden.required_evidence} |`
    ),
    "",
    "## Tested Domain-Definition Routes",
    "",
    "| Route | Status | Required fields | Limitation |",
    "| --- | --- | --- | --- |",
    ...packet.target_object_domain_definition_routes.map(
      (route) =>
        `| ${route.route_id} | ${route.status} | ${route.required_fields.join(", ")} | ${route.limitation} |`
    ),
    "",
    "## Endpoint Attempts",
    "",
    "| Endpoint | Role | Source scope | Source equations | Value bindings | Membership predicate | Constructor | Source-handle exclusion | Sort-domain rule | Target-object membership | Value-map membership | No-link soundness | Endpoint application | Derivation | Domain defined | First blockers |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
    renderEndpointRows(endpoints),
    "",
    "## Row Attempts",
    "",
    "| Row | Domain source-scope pair | Domain definition pair | Interpretation-rule pair | Definition bridge pair | Promotion rule pair | Ref/value proof-grade pair | Consumed |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
    renderRowRows(rows),
    "",
    "## Endpoint Field Counts",
    "",
    "| Field | Count |",
    "| --- | ---: |",
    renderCounts(packet.endpoint_field_counts, packet.endpoint_fields, endpoints.length),
    "",
    "## Row Field Counts",
    "",
    "| Field | Count |",
    "| --- | ---: |",
    renderCounts(packet.row_field_counts, packet.row_fields, rows.length),
    "",
    "## Capture Decision",
    "",
    packet.capture_decision,
    "",
  ].join("\n");
}

function writePacket(packet, outDir, pretty) {
  fs.mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, OUTPUT_JSON);
  const reportPath = path.join(outDir, OUTPUT_REPORT);
  fs.writeFileSync(jsonPath, JSON.stringify(packet, null, pretty ? 2 : 0) + "\n");
  fs.writeFileSync(reportPath, renderReport(packet));
  return { jsonPath, reportPath };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }

  const parent = readJson(args.parentPacket);
  const packet = buildPacket(args.parentPacket, parent);
  const { jsonPath, reportPath } = writePacket(packet, args.outDir, args.pretty);
  console.log(JSON.stringify({ status: packet.status, jsonPath, reportPath }));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

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
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const PARENT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-definition-source-data-derivation-proof-attempt-fail-closed-definition-source-data-route-selected-source-inputs-present-rule-derivation-soundness-application-absent-no-primitive-rule-acceptance-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-source-equation-promotion-definition-bridge-without-contract-link-proof-attempt-fail-closed-source-equation-and-value-map-source-data-present-definition-bridge-absent-no-promotion-rule-no-row-consumption";

const SOURCE_SCOPE_FIELDS = [
  "parent_definition_source_data_derivation_proof_attempt_input_present",
  "parent_definition_source_data_route_selected",
  "parent_definition_bridge_source_scope_ready",
  "definition_source_data_preserved",
  "target_ref_value_source_payload_preserved",
  "target_endpoint_ref_value_source_equations_present",
  "target_endpoint_ref_value_source_equations_all_source_only",
  "value_map_source_equations_source_equation_only",
  "source_equation_only_guard_present",
  "endpoint_value_map_only_guard_present",
  "endpoint_value_binding_map_ref_values_certified",
  "value_map_ref_value_payload_matches_target_object",
  "contract_link_premise_not_imported",
  "no_contract_link_independence_guard_declared",
  "witness_object_has_contract_link_excluded",
  "primitive_rule_acceptance_not_used",
  "direct_source_renaming_rejected",
  "target_note_as_derivation_rejected",
  "bridge_attempt_route_selected",
  "bridge_source_scope_ready",
];

const BRIDGE_FIELDS = [
  "source_equation_only_payload_accepted_as_definition_bridge",
  "endpoint_value_map_certification_accepted_as_definition_bridge",
  "payload_match_accepted_as_definition_bridge",
  "no_link_guard_accepted_as_definition_bridge",
  "target_note_accepted_as_definition_bridge",
  "primitive_rule_acceptance_used",
  "source_equation_to_target_ref_value_interpretation_rule_present",
  "endpoint_value_map_to_target_object_identity_bridge_present",
  "source_equation_only_guard_lift_condition_present",
  "endpoint_value_map_certification_lift_condition_present",
  "no_link_definition_bridge_soundness_present",
  "definition_bridge_endpoint_application_present",
  "definition_bridge_derivation_from_definition_source_data_present",
  "target_ref_value_source_equation_promotion_definition_bridge_present",
];

const DOWNSTREAM_FIELDS = [
  "endpoint_value_map_certification_to_target_ref_value_equation_lemma_present",
  "source_equation_only_guard_discharge_lemma_present",
  "no_link_promotion_rule_soundness_lemma_present",
  "endpoint_application_derivation_schema_present",
  "promotion_rule_definition_source_data_derivation_present",
  "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
  "independent_target_ref_value_equation_derivation_without_contract_link_present",
  "independent_target_ref_value_equation_soundness_without_contract_link_present",
  "independent_target_ref_value_equation_endpoint_application_without_contract_link_present",
  "independent_target_ref_value_equations_without_contract_link_proof_grade",
  "independent_contract_target_satisfaction_without_contract_link_proof_present",
  "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
  "independent_first_primitive_compatibility_without_contract_link_present",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_SCOPE_FIELDS,
  ...BRIDGE_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_bridge_source_scope_ready",
  "receiver_bridge_source_scope_ready",
  "combined_bridge_source_scope_ready",
  "source_definition_bridge_present",
  "receiver_definition_bridge_present",
  "combined_definition_bridge_pair_present",
  "source_definition_bridge_derivation_present",
  "receiver_definition_bridge_derivation_present",
  "combined_definition_bridge_derivation_pair_present",
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

const BRIDGE_ROUTES = [
  {
    route_id: "source_equation_only_payload_as_definition_bridge",
    status: "rejected-source-equation-only",
    required_fields: [
      "source_equation_only_guard_present",
      "source_equation_only_payload_accepted_as_definition_bridge",
    ],
    limitation:
      "Source-equation-only payloads remain source data and are not a definition bridge.",
  },
  {
    route_id: "endpoint_value_map_certification_as_definition_bridge",
    status: "rejected-certification-only",
    required_fields: [
      "endpoint_value_map_only_guard_present",
      "endpoint_value_map_certification_accepted_as_definition_bridge",
    ],
    limitation:
      "Endpoint-value-map certification records attachment evidence, not a bridge from source equations to proof-grade target ref/value equations.",
  },
  {
    route_id: "payload_match_as_definition_bridge",
    status: "rejected-payload-match-only",
    required_fields: [
      "value_map_ref_value_payload_matches_target_object",
      "payload_match_accepted_as_definition_bridge",
    ],
    limitation:
      "Payload matching checks that the source equations and value bindings agree with the target object; it does not interpret the source equations as target ref/value equations.",
  },
  {
    route_id: "target_note_as_definition_bridge",
    status: "rejected-target-note-only",
    required_fields: [
      "target_note_as_derivation_rejected",
      "target_note_accepted_as_definition_bridge",
    ],
    limitation:
      "The target note records the obligation and cannot supply the bridge.",
  },
  {
    route_id: "no_link_guard_as_definition_bridge",
    status: "rejected-guard-only",
    required_fields: [
      "contract_link_premise_not_imported",
      "no_contract_link_independence_guard_declared",
      "no_link_guard_accepted_as_definition_bridge",
    ],
    limitation:
      "No-link guards exclude the contract-link premise; they do not prove source-equation promotion.",
  },
  {
    route_id: "primitive_rule_acceptance_as_definition_bridge",
    status: "rejected-decision-required",
    required_fields: [
      "primitive_rule_acceptance_used",
      "target_ref_value_source_equation_promotion_definition_bridge_present",
    ],
    limitation:
      "Accepting the bridge as primitive would be a separate theory decision and is not performed here.",
  },
  {
    route_id: "derive_definition_bridge_from_definition_source_data",
    status: "blocked",
    required_fields: [
      "bridge_source_scope_ready",
      "source_equation_to_target_ref_value_interpretation_rule_present",
      "endpoint_value_map_to_target_object_identity_bridge_present",
      "source_equation_only_guard_lift_condition_present",
      "endpoint_value_map_certification_lift_condition_present",
      "no_link_definition_bridge_soundness_present",
      "definition_bridge_endpoint_application_present",
      "definition_bridge_derivation_from_definition_source_data_present",
      "target_ref_value_source_equation_promotion_definition_bridge_present",
    ],
    limitation:
      "The source data are present, but no interpretation rule, identity bridge, guard-lift condition, no-link soundness proof, endpoint application, or derivation is present.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "source_equation_to_target_ref_value_interpretation_rule",
    missing_field:
      "source_equation_to_target_ref_value_interpretation_rule_present",
    required_evidence:
      "A definition-level rule explaining when a source-equation-only target ref/value payload may be interpreted as a target ref/value equation object.",
  },
  {
    burden_id: "endpoint_value_map_to_target_object_identity_bridge",
    missing_field: "endpoint_value_map_to_target_object_identity_bridge_present",
    required_evidence:
      "A bridge proving that the endpoint value-map binding and target boundary-binding object identify the same target ref/value object, not only matching handles.",
  },
  {
    burden_id: "source_equation_only_guard_lift_condition",
    missing_field: "source_equation_only_guard_lift_condition_present",
    required_evidence:
      "A condition that discharges the source-equation-only guard without bypassing or renaming it.",
  },
  {
    burden_id: "endpoint_value_map_certification_lift_condition",
    missing_field: "endpoint_value_map_certification_lift_condition_present",
    required_evidence:
      "A condition that explains how endpoint-value-map-only certification participates in the bridge without becoming a proof-grade equation by itself.",
  },
  {
    burden_id: "no_link_definition_bridge_soundness",
    missing_field: "no_link_definition_bridge_soundness_present",
    required_evidence:
      "A soundness proof that the bridge does not import `witness_object_has_contract_link` directly, through inherited source status, or through a contract-link route.",
  },
  {
    burden_id: "definition_bridge_endpoint_application",
    missing_field: "definition_bridge_endpoint_application_present",
    required_evidence:
      "An endpoint-by-endpoint proof that all four endpoint functionals satisfy the bridge premises.",
  },
  {
    burden_id: "definition_bridge_derivation_from_definition_source_data",
    missing_field:
      "definition_bridge_derivation_from_definition_source_data_present",
    required_evidence:
      "A complete derivation of the definition bridge from the preserved target object, endpoint value-map, source-equation, payload-match, and no-link source data.",
  },
  {
    burden_id:
      "target_ref_value_source_equation_promotion_definition_bridge",
    missing_field:
      "target_ref_value_source_equation_promotion_definition_bridge_present",
    required_evidence:
      "The bridge object itself, present only after the interpretation rule, identity bridge, guard-lift conditions, no-link soundness, endpoint application, and derivation are present.",
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-target-ref-value-source-equation-promotion-definition-bridge-without-contract-link-proof-attempt.mjs [options]",
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
    throw new Error("Refusing bridge attempt from authorized parent packet.");
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
        "independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt",
      path: parentPath,
      basename: path.basename(parentPath),
      sha256: sha256File(parentPath),
    },
    ...(parent.source_artifacts ?? []).map((artifact) => ({
      ...artifact,
      inherited_from:
        "independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt",
    })),
  ];
}

function payloadPreserved(payload, definitionSourceData) {
  const endpointRefsValues =
    definitionSourceData.target_endpoint_refs_values ?? [];
  const sourceEquations =
    definitionSourceData.endpoint_value_binding_source_equations ?? [];
  const valueBindings = definitionSourceData.value_bindings ?? [];
  return (
    endpointRefsValues.length ===
      (payload.target_object_endpoint_ref_value_count ?? 0) &&
    sourceEquations.length === (payload.source_equation_count ?? 0) &&
    valueBindings.length === (payload.value_binding_count ?? 0)
  );
}

function buildEndpointAttempt(parentEndpoint) {
  const parentFields = parentEndpoint.required_fields_present ?? {};
  const payload = parentEndpoint.target_ref_value_source_payload ?? {};
  const definitionSourceData = parentEndpoint.definition_source_data ?? {};
  const sourceEquations =
    definitionSourceData.endpoint_value_binding_source_equations ?? [];
  const valueBindings = definitionSourceData.value_bindings ?? [];
  const sourceEquationSourceOnly =
    sourceEquations.length > 0 &&
    sourceEquations.every(
      (equation) =>
        equation.proof_grade_binding_status === "source-equation-only"
    );
  const endpointValueMapOnly =
    definitionSourceData.proof_grade_statuses?.endpoint_value_map ===
    "endpoint-value-map-only";

  const fields = {
    parent_definition_source_data_derivation_proof_attempt_input_present: true,
    parent_definition_source_data_route_selected:
      parentFields.definition_source_data_derivation_route_selected === true,
    parent_definition_bridge_source_scope_ready:
      parentFields.definition_bridge_source_scope_ready === true,
    definition_source_data_preserved:
      payloadPreserved(payload, definitionSourceData),
    target_ref_value_source_payload_preserved:
      payload.target_endpoint_ref_value_count ===
        payload.target_object_endpoint_ref_value_count &&
      payload.source_equation_count === payload.value_binding_count,
    target_endpoint_ref_value_source_equations_present:
      parentFields.target_endpoint_ref_value_source_equations_present === true &&
      sourceEquations.length === (payload.source_equation_count ?? 0),
    target_endpoint_ref_value_source_equations_all_source_only:
      parentFields.target_endpoint_ref_value_source_equations_all_source_only ===
        true && sourceEquationSourceOnly,
    value_map_source_equations_source_equation_only:
      parentFields.value_map_source_equations_source_equation_only === true &&
      sourceEquationSourceOnly,
    source_equation_only_guard_present:
      parentFields.source_equation_only_guard_present === true,
    endpoint_value_map_only_guard_present:
      parentFields.endpoint_value_map_only_guard_present === true &&
      endpointValueMapOnly,
    endpoint_value_binding_map_ref_values_certified:
      parentFields.endpoint_value_binding_map_ref_values_certified === true &&
      valueBindings.length === (payload.value_binding_count ?? 0),
    value_map_ref_value_payload_matches_target_object:
      parentFields.value_map_ref_value_payload_matches_target_object === true,
    contract_link_premise_not_imported:
      parentFields.contract_link_premise_not_imported === true,
    no_contract_link_independence_guard_declared:
      parentFields.no_contract_link_independence_guard_declared === true,
    witness_object_has_contract_link_excluded:
      parentFields.witness_object_has_contract_link_excluded === true,
    primitive_rule_acceptance_not_used:
      parentFields.primitive_rule_acceptance_not_used === true,
    direct_source_renaming_rejected:
      parentFields.direct_source_renaming_rejected === true,
    target_note_as_derivation_rejected:
      parentFields.target_note_as_derivation_rejected === true,
    bridge_attempt_route_selected: true,
    bridge_source_scope_ready: false,
    source_equation_only_payload_accepted_as_definition_bridge: false,
    endpoint_value_map_certification_accepted_as_definition_bridge: false,
    payload_match_accepted_as_definition_bridge: false,
    no_link_guard_accepted_as_definition_bridge: false,
    target_note_accepted_as_definition_bridge: false,
    primitive_rule_acceptance_used: false,
    source_equation_to_target_ref_value_interpretation_rule_present: false,
    endpoint_value_map_to_target_object_identity_bridge_present: false,
    source_equation_only_guard_lift_condition_present: false,
    endpoint_value_map_certification_lift_condition_present: false,
    no_link_definition_bridge_soundness_present: false,
    definition_bridge_endpoint_application_present: false,
    definition_bridge_derivation_from_definition_source_data_present: false,
    target_ref_value_source_equation_promotion_definition_bridge_present: false,
    endpoint_value_map_certification_to_target_ref_value_equation_lemma_present:
      false,
    source_equation_only_guard_discharge_lemma_present: false,
    no_link_promotion_rule_soundness_lemma_present: false,
    endpoint_application_derivation_schema_present: false,
    promotion_rule_definition_source_data_derivation_present: false,
    independent_target_ref_value_equation_promotion_rule_without_contract_link_present:
      false,
    independent_target_ref_value_equation_derivation_without_contract_link_present:
      false,
    independent_target_ref_value_equation_soundness_without_contract_link_present:
      false,
    independent_target_ref_value_equation_endpoint_application_without_contract_link_present:
      false,
    independent_target_ref_value_equations_without_contract_link_proof_grade:
      false,
    independent_contract_target_satisfaction_without_contract_link_proof_present:
      false,
    independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present:
      false,
    independent_first_primitive_compatibility_without_contract_link_present:
      false,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.bridge_source_scope_ready = SOURCE_SCOPE_FIELDS.filter(
    (field) => field !== "bridge_source_scope_ready"
  ).every((field) => fields[field] === true);

  const bridgeRouteAttempts = BRIDGE_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: parentEndpoint.id,
    endpoint_functional_id: parentEndpoint.endpoint_functional_id,
    role: parentEndpoint.role,
    independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempt_id:
      `independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempt:${parentEndpoint.id}`,
    parent_derivation_proof_attempt_id:
      parentEndpoint
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    source_attempt_ids: parentEndpoint.source_attempt_ids ?? {},
    bridge_target: {
      target_id: `target_ref_value_source_equation_promotion_definition_bridge_without_contract_link:${parentEndpoint.id}`,
      statement:
        "Derive the definition bridge from preserved target ref/value source equations, endpoint value-map data, payload matches, and no-link guards.",
      accepted_if:
        "The endpoint has an interpretation rule, identity bridge, guard-lift conditions, no-link bridge soundness, endpoint application proof, derivation from definition source data, and the bridge object itself.",
      prohibited_premises: [
        "source-equation-only payload as bridge",
        "endpoint-value-map certification as bridge",
        "payload match as bridge",
        "target note as bridge",
        "no-link guard as bridge",
        "primitive rule acceptance",
        "witness_object_has_contract_link",
        "promotion rule construction",
        "row consumption",
        "branch-chart authorization",
      ],
    },
    target_ref_value_source_payload: payload,
    definition_source_data: definitionSourceData,
    required_fields_present: fields,
    bridge_route_attempts: bridgeRouteAttempts,
    bridge_routes_passed: [],
    missing_bridge_obligations: missing(fields, BRIDGE_FIELDS),
    missing_downstream_obligations: missing(fields, DOWNSTREAM_FIELDS),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 8)
      .map((burden) => burden.missing_field),
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint preserves the source-equation/value-map source data and no-link guards, but no definition bridge, bridge derivation, no-link bridge soundness proof, or endpoint application proof is present.",
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
    source_bridge_source_scope_ready: sourceFields.bridge_source_scope_ready,
    receiver_bridge_source_scope_ready: receiverFields.bridge_source_scope_ready,
    combined_bridge_source_scope_ready: false,
    source_definition_bridge_present:
      sourceFields
        .target_ref_value_source_equation_promotion_definition_bridge_present,
    receiver_definition_bridge_present:
      receiverFields
        .target_ref_value_source_equation_promotion_definition_bridge_present,
    combined_definition_bridge_pair_present: false,
    source_definition_bridge_derivation_present:
      sourceFields.definition_bridge_derivation_from_definition_source_data_present,
    receiver_definition_bridge_derivation_present:
      receiverFields
        .definition_bridge_derivation_from_definition_source_data_present,
    combined_definition_bridge_derivation_pair_present: false,
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

  fields.combined_bridge_source_scope_ready =
    fields.source_bridge_source_scope_ready &&
    fields.receiver_bridge_source_scope_ready;
  fields.combined_definition_bridge_pair_present =
    fields.source_definition_bridge_present &&
    fields.receiver_definition_bridge_present;
  fields.combined_definition_bridge_derivation_pair_present =
    fields.source_definition_bridge_derivation_present &&
    fields.receiver_definition_bridge_derivation_present;
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
    source_bridge_proof_attempt_id:
      source
        .independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempt_id,
    receiver_bridge_proof_attempt_id:
      receiver
        .independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver bridge source scopes, but no source/receiver definition bridge, bridge derivation, promotion-rule pair, or proof-grade ref/value equation pair.",
  };
}

function buildPacket(parent, parentPath) {
  assertParentPacket(parent);

  const endpointAttempts =
    parent.endpoint_independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempts.map(
      buildEndpointAttempt
    );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "definition bridge endpoint"
  );
  const rowAttempts =
    parent.row_independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempts.map(
      (row) => buildRowAttempt(row, endpointMap)
    );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);
  const totalSourceEquations = endpointAttempts.reduce(
    (sum, endpoint) =>
      sum + (endpoint.target_ref_value_source_payload.source_equation_count ?? 0),
    0
  );
  const totalValueBindings = endpointAttempts.reduce(
    (sum, endpoint) =>
      sum + (endpoint.target_ref_value_source_payload.value_binding_count ?? 0),
    0
  );
  const totalTargetObjectRefValues = endpointAttempts.reduce(
    (sum, endpoint) =>
      sum +
      (endpoint.target_ref_value_source_payload
        .target_object_endpoint_ref_value_count ?? 0),
    0
  );

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-independent-target-ref-value-source-equation-promotion-definition-bridge-without-contract-link-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; source-equation and endpoint-value-map source data are present, but the definition bridge is absent",
    source_artifacts: sourceArtifacts(parentPath, parent),
    target: {
      target_id:
        "independent-target-ref-value-source-equation-promotion-definition-bridge-without-contract-link-target",
      statement:
        "Derive the target ref/value source-equation promotion definition bridge without importing the contract-link premise.",
      accepted_if:
        "Each endpoint has the interpretation rule, endpoint value-map identity bridge, guard-lift conditions, no-link bridge soundness proof, endpoint application proof, derivation from definition source data, and bridge object.",
    },
    no_primitive_acceptance_rule:
      "Primitive-rule acceptance is not used. The packet tests only whether the bridge follows from preserved definition source data.",
    no_promotion_rule:
      "Source equations, endpoint-value-map certifications, payload matches, target notes, and no-link guards are not accepted as the definition bridge.",
    proof_burdens: PROOF_BURDENS,
    bridge_routes: BRIDGE_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempts:
      endpointAttempts,
    row_independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempts:
      rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      parent_inputs:
        endpointFieldCounts
          .parent_definition_source_data_derivation_proof_attempt_input_present,
      parent_definition_source_data_routes_selected:
        endpointFieldCounts.parent_definition_source_data_route_selected,
      parent_definition_bridge_source_scopes_ready:
        endpointFieldCounts.parent_definition_bridge_source_scope_ready,
      definition_source_data_preserved:
        endpointFieldCounts.definition_source_data_preserved,
      target_ref_value_source_payloads_preserved:
        endpointFieldCounts.target_ref_value_source_payload_preserved,
      target_ref_value_source_equation_sets:
        endpointFieldCounts.target_endpoint_ref_value_source_equations_present,
      source_equation_only_guards:
        endpointFieldCounts.source_equation_only_guard_present,
      target_ref_value_source_equation_source_only_guards:
        endpointFieldCounts
          .target_endpoint_ref_value_source_equations_all_source_only,
      value_map_source_equation_source_only_guards:
        endpointFieldCounts.value_map_source_equations_source_equation_only,
      endpoint_value_map_only_guards:
        endpointFieldCounts.endpoint_value_map_only_guard_present,
      endpoint_value_binding_map_ref_values_certified:
        endpointFieldCounts.endpoint_value_binding_map_ref_values_certified,
      payload_matches:
        endpointFieldCounts.value_map_ref_value_payload_matches_target_object,
      contract_link_premise_not_imported:
        endpointFieldCounts.contract_link_premise_not_imported,
      no_link_independence_guards_declared:
        endpointFieldCounts.no_contract_link_independence_guard_declared,
      witness_object_has_contract_link_excluded:
        endpointFieldCounts.witness_object_has_contract_link_excluded,
      primitive_rule_acceptance_not_used:
        endpointFieldCounts.primitive_rule_acceptance_not_used,
      bridge_attempt_routes_selected:
        endpointFieldCounts.bridge_attempt_route_selected,
      bridge_source_scopes_ready: endpointFieldCounts.bridge_source_scope_ready,
      total_target_object_ref_values: totalTargetObjectRefValues,
      total_target_ref_value_source_equations: totalSourceEquations,
      total_value_map_bindings: totalValueBindings,
      source_equation_only_payloads_accepted_as_definition_bridge:
        endpointFieldCounts
          .source_equation_only_payload_accepted_as_definition_bridge,
      endpoint_value_map_certifications_accepted_as_definition_bridge:
        endpointFieldCounts
          .endpoint_value_map_certification_accepted_as_definition_bridge,
      payload_matches_accepted_as_definition_bridge:
        endpointFieldCounts.payload_match_accepted_as_definition_bridge,
      no_link_guards_accepted_as_definition_bridge:
        endpointFieldCounts.no_link_guard_accepted_as_definition_bridge,
      target_notes_accepted_as_definition_bridge:
        endpointFieldCounts.target_note_accepted_as_definition_bridge,
      primitive_rule_acceptance_used:
        endpointFieldCounts.primitive_rule_acceptance_used,
      source_equation_to_target_ref_value_interpretation_rules:
        endpointFieldCounts
          .source_equation_to_target_ref_value_interpretation_rule_present,
      endpoint_value_map_to_target_object_identity_bridges:
        endpointFieldCounts.endpoint_value_map_to_target_object_identity_bridge_present,
      source_equation_only_guard_lift_conditions:
        endpointFieldCounts.source_equation_only_guard_lift_condition_present,
      endpoint_value_map_certification_lift_conditions:
        endpointFieldCounts
          .endpoint_value_map_certification_lift_condition_present,
      no_link_definition_bridge_soundness_proofs:
        endpointFieldCounts.no_link_definition_bridge_soundness_present,
      definition_bridge_endpoint_applications:
        endpointFieldCounts.definition_bridge_endpoint_application_present,
      definition_bridge_derivations_from_definition_source_data:
        endpointFieldCounts
          .definition_bridge_derivation_from_definition_source_data_present,
      definition_bridges_present:
        endpointFieldCounts
          .target_ref_value_source_equation_promotion_definition_bridge_present,
      certification_lemmas_present:
        endpointFieldCounts
          .endpoint_value_map_certification_to_target_ref_value_equation_lemma_present,
      guard_discharge_lemmas_present:
        endpointFieldCounts.source_equation_only_guard_discharge_lemma_present,
      no_link_promotion_rule_soundness_lemmas_present:
        endpointFieldCounts.no_link_promotion_rule_soundness_lemma_present,
      promotion_rules_present:
        endpointFieldCounts
          .independent_target_ref_value_equation_promotion_rule_without_contract_link_present,
      proof_grade_target_ref_value_packages:
        endpointFieldCounts
          .independent_target_ref_value_equations_without_contract_link_proof_grade,
      row_bridge_source_scope_pairs:
        rowFieldCounts.combined_bridge_source_scope_ready,
      row_definition_bridge_pairs:
        rowFieldCounts.combined_definition_bridge_pair_present,
      row_definition_bridge_derivation_pairs:
        rowFieldCounts.combined_definition_bridge_derivation_pair_present,
      row_promotion_rule_pairs:
        rowFieldCounts.combined_promotion_rule_pair_present,
      row_ref_value_equation_pairs_proof_grade:
        rowFieldCounts
          .combined_ref_value_equations_proof_grade_without_contract_link,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint supplies the definition bridge, bridge derivation, no-link bridge soundness proof, promotion rule, or proof-grade ref/value package.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed target-ref/value source-equation promotion definition-bridge proof attempt and does not promote to reader-facing corpus prose.",
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
      const payload = endpoint.target_ref_value_source_payload;
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.bridge_source_scope_ready} | ${fields.source_equation_only_guard_present} | ${fields.endpoint_value_map_only_guard_present} | ${payload.source_equation_count ?? 0} | ${payload.value_binding_count ?? 0} | ${fields.source_equation_to_target_ref_value_interpretation_rule_present} | ${fields.endpoint_value_map_to_target_object_identity_bridge_present} | ${fields.source_equation_only_guard_lift_condition_present} | ${fields.no_link_definition_bridge_soundness_present} | ${fields.definition_bridge_endpoint_application_present} | ${fields.definition_bridge_derivation_from_definition_source_data_present} | ${fields.target_ref_value_source_equation_promotion_definition_bridge_present} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_bridge_source_scope_ready} | ${fields.combined_definition_bridge_pair_present} | ${fields.combined_definition_bridge_derivation_pair_present} | ${fields.combined_promotion_rule_pair_present} | ${fields.combined_ref_value_equations_proof_grade_without_contract_link} | ${row.row_consumed} |`;
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
  return `# Independent Target Ref/Value Source Equation Promotion Definition Bridge Without Contract Link Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests the first exact blocker exposed by the
definition-source-data derivation attempt:
\`target_ref_value_source_equation_promotion_definition_bridge_present\`.
It imports the parent derivation packet, preserves the target ref/value source
payloads and endpoint value-map source data, and tests whether those data supply
the missing definition bridge without importing the contract-link premise.

The attempt remains fail-closed. It records ${summary.parent_inputs} / ${summary.endpoint_functionals}
parent derivation inputs, ${summary.parent_definition_source_data_routes_selected} / ${summary.endpoint_functionals}
parent definition-source-data routes selected, ${summary.definition_source_data_preserved} / ${summary.endpoint_functionals}
definition source-data bundles preserved, ${summary.target_ref_value_source_payloads_preserved} / ${summary.endpoint_functionals}
target ref/value source payloads preserved, ${summary.target_ref_value_source_equation_sets} / ${summary.endpoint_functionals}
source-equation sets, ${summary.source_equation_only_guards} / ${summary.endpoint_functionals}
source-equation-only guards, ${summary.endpoint_value_map_only_guards} / ${summary.endpoint_functionals}
endpoint-value-map-only guards, ${summary.endpoint_value_binding_map_ref_values_certified} / ${summary.endpoint_functionals}
endpoint-value-map ref/value certifications, ${summary.payload_matches} / ${summary.endpoint_functionals}
payload matches, ${summary.contract_link_premise_not_imported} / ${summary.endpoint_functionals}
contract-link premise non-import guards, ${summary.no_link_independence_guards_declared} / ${summary.endpoint_functionals}
no-link independence guards declared, ${summary.witness_object_has_contract_link_excluded} / ${summary.endpoint_functionals}
contract-link exclusions, ${summary.primitive_rule_acceptance_not_used} / ${summary.endpoint_functionals}
primitive-rule-acceptance rejections, and ${summary.bridge_source_scopes_ready} / ${summary.endpoint_functionals}
bridge source scopes. The source scope covers ${summary.total_target_ref_value_source_equations} / ${summary.total_target_object_ref_values}
target ref/value source equations and ${summary.total_value_map_bindings}
value-map bindings.

It records ${summary.source_equation_only_payloads_accepted_as_definition_bridge} / ${summary.endpoint_functionals}
source-equation-only payloads accepted as bridges, ${summary.endpoint_value_map_certifications_accepted_as_definition_bridge} / ${summary.endpoint_functionals}
endpoint-value-map certifications accepted as bridges, ${summary.payload_matches_accepted_as_definition_bridge} / ${summary.endpoint_functionals}
payload matches accepted as bridges, ${summary.no_link_guards_accepted_as_definition_bridge} / ${summary.endpoint_functionals}
no-link guards accepted as bridges, ${summary.primitive_rule_acceptance_used} / ${summary.endpoint_functionals}
primitive-rule acceptances, ${summary.source_equation_to_target_ref_value_interpretation_rules} / ${summary.endpoint_functionals}
interpretation rules, ${summary.endpoint_value_map_to_target_object_identity_bridges} / ${summary.endpoint_functionals}
identity bridges, ${summary.source_equation_only_guard_lift_conditions} / ${summary.endpoint_functionals}
source-equation-only guard-lift conditions, ${summary.no_link_definition_bridge_soundness_proofs} / ${summary.endpoint_functionals}
no-link bridge soundness proofs, ${summary.definition_bridge_endpoint_applications} / ${summary.endpoint_functionals}
endpoint applications, ${summary.definition_bridge_derivations_from_definition_source_data} / ${summary.endpoint_functionals}
bridge derivations, ${summary.definition_bridges_present} / ${summary.endpoint_functionals}
definition bridges, ${summary.promotion_rules_present} / ${summary.endpoint_functionals}
promotion rules, ${summary.proof_grade_target_ref_value_packages} / ${summary.endpoint_functionals}
proof-grade target ref/value equation packages, ${summary.row_consumption_count}
consumed rows, and \`branch_chart_authorized=false\`.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Target

${packet.target.statement}

Accepted if: ${packet.target.accepted_if}

## No Primitive Acceptance

${packet.no_primitive_acceptance_rule}

## No-Promotion Rule

${packet.no_promotion_rule}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Bridge Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.bridge_routes)}

## Endpoint Attempts

| Endpoint | Role | Bridge source scope | Source-equation guard | Value-map guard | Source equations | Value bindings | Interpretation rule | Identity bridge | Guard lift | No-link soundness | Endpoint application | Bridge derivation | Bridge present | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempts)}

## Row Attempts

| Row | Bridge source-scope pair | Definition bridge pair | Bridge derivation pair | Promotion rule pair | Ref/value proof-grade pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_independent_target_ref_value_source_equation_promotion_definition_bridge_without_contract_link_proof_attempts)}

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

  const parent = readJson(args.parentPacket);
  const packet = buildPacket(parent, args.parentPacket);

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

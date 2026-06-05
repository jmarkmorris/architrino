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
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_NOTE =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_target.md`;
const DEFAULT_REF_VALUE_SOURCE_PARENT =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_equations_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_BOUNDARY_OBJECT =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_target_endpoint_boundary_binding_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ENDPOINT_VALUE_MAP =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NO_CONTRACT_LINK_PREMISE =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_TARGET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPLETION_SOURCE_STATUS_GUARD =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_full_binding_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const PARENT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-proof-attempt-fail-closed-target-present-source-inputs-present-rule-derivation-soundness-application-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-definition-source-data-derivation-proof-attempt-fail-closed-definition-source-data-route-selected-source-inputs-present-rule-derivation-soundness-application-absent-no-primitive-rule-acceptance-no-row-consumption";

const SOURCE_FIELDS = [
  "parent_promotion_rule_proof_attempt_input_present",
  "candidate_promotion_rule_target_note_input_present",
  "candidate_promotion_rule_target_hash_matches",
  "parent_promotion_rule_target_source_inputs_ready",
  "target_ref_value_equations_without_contract_link_source_inputs_ready",
  "target_endpoint_ref_value_source_equations_present",
  "target_endpoint_ref_value_source_equations_all_source_only",
  "value_map_source_equations_source_equation_only",
  "endpoint_value_map_proof_grade_status_endpoint_value_map_only",
  "endpoint_value_binding_map_ref_values_certified",
  "source_equation_only_guard_present",
  "endpoint_value_map_only_guard_present",
  "value_map_ref_value_payload_matches_target_object",
  "contract_link_premise_not_imported",
  "no_contract_link_independence_guard_declared",
  "witness_object_has_contract_link_excluded",
  "primitive_rule_acceptance_not_used",
  "promotion_rule_target_source_inputs_ready",
  "definition_source_data_derivation_route_selected",
  "direct_source_renaming_rejected",
  "target_note_as_derivation_rejected",
  "definition_bridge_source_scope_ready",
];

const BRIDGE_LEMMA_FIELDS = [
  "target_ref_value_source_equation_promotion_definition_bridge_present",
  "endpoint_value_map_certification_to_target_ref_value_equation_lemma_present",
  "source_equation_only_guard_discharge_lemma_present",
  "no_link_promotion_rule_soundness_lemma_present",
  "endpoint_application_derivation_schema_present",
  "promotion_rule_definition_source_data_derivation_present",
];

const PROOF_FIELDS = [
  "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
  "independent_target_ref_value_equation_derivation_without_contract_link_present",
  "independent_target_ref_value_equation_soundness_without_contract_link_present",
  "independent_target_ref_value_equation_endpoint_application_without_contract_link_present",
  "independent_target_ref_value_equations_without_contract_link_proof_grade",
];

const DOWNSTREAM_LOCK_FIELDS = [
  "independent_contract_target_satisfaction_without_contract_link_proof_present",
  "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
  "independent_first_primitive_compatibility_without_contract_link_present",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_FIELDS,
  ...BRIDGE_LEMMA_FIELDS,
  ...PROOF_FIELDS,
  ...DOWNSTREAM_LOCK_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_derivation_source_scope_ready",
  "receiver_derivation_source_scope_ready",
  "combined_derivation_source_scope_ready",
  "source_definition_bridge_present",
  "receiver_definition_bridge_present",
  "combined_definition_bridge_pair_present",
  "source_certification_lemma_present",
  "receiver_certification_lemma_present",
  "combined_certification_lemma_pair_present",
  "source_guard_discharge_lemma_present",
  "receiver_guard_discharge_lemma_present",
  "combined_guard_discharge_lemma_pair_present",
  "source_soundness_lemma_present",
  "receiver_soundness_lemma_present",
  "combined_soundness_lemma_pair_present",
  "source_endpoint_application_schema_present",
  "receiver_endpoint_application_schema_present",
  "combined_endpoint_application_schema_pair_present",
  "source_definition_source_data_derivation_present",
  "receiver_definition_source_data_derivation_present",
  "combined_definition_source_data_derivation_pair_present",
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

const DERIVATION_ROUTES = [
  {
    route_id: "source_equation_only_payload_as_derivation",
    status: "rejected-source-equation-only",
    required_fields: [
      "source_equation_only_guard_present",
      "promotion_rule_definition_source_data_derivation_present",
    ],
    limitation:
      "Source-equation-only payloads are source facts, not derivations of a proof-grade promotion rule.",
  },
  {
    route_id: "endpoint_value_map_certification_as_definition_bridge",
    status: "rejected-certification-only",
    required_fields: [
      "endpoint_value_map_only_guard_present",
      "endpoint_value_map_certification_to_target_ref_value_equation_lemma_present",
    ],
    limitation:
      "Endpoint-value-map-only certification records attachment data but does not supply the definition bridge from source equations to proof-grade target ref/value equations.",
  },
  {
    route_id: "payload_match_as_guard_discharge",
    status: "rejected-payload-match-only",
    required_fields: [
      "value_map_ref_value_payload_matches_target_object",
      "source_equation_only_guard_discharge_lemma_present",
    ],
    limitation:
      "Payload matching confirms agreement of handles and values; it does not discharge the source-equation-only guard.",
  },
  {
    route_id: "no_link_guard_as_soundness_lemma",
    status: "rejected-guard-only",
    required_fields: [
      "contract_link_premise_not_imported",
      "no_contract_link_independence_guard_declared",
      "no_link_promotion_rule_soundness_lemma_present",
    ],
    limitation:
      "No-link guards exclude a premise but do not prove sound promotion from source equations to proof-grade equations.",
  },
  {
    route_id: "target_note_as_derivation",
    status: "rejected-target-note-only",
    required_fields: [
      "target_note_as_derivation_rejected",
      "promotion_rule_definition_source_data_derivation_present",
    ],
    limitation:
      "The target note records the obligation and cannot serve as the derivation.",
  },
  {
    route_id: "primitive_rule_acceptance_as_derivation",
    status: "rejected-decision-required",
    required_fields: [
      "primitive_rule_acceptance_not_used",
      "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
    ],
    limitation:
      "Primitive-rule acceptance would be a separate operator decision and is not used in this derivation attempt.",
  },
  {
    route_id: "derive_promotion_rule_from_definition_source_data_route",
    status: "blocked",
    required_fields: [
      "target_ref_value_source_equation_promotion_definition_bridge_present",
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
    ],
    limitation:
      "No definition bridge, certification lemma, guard-discharge lemma, soundness lemma, endpoint application schema, or derivation bundle is present.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "target_ref_value_source_equation_promotion_definition_bridge",
    missing_field:
      "target_ref_value_source_equation_promotion_definition_bridge_present",
    required_evidence:
      "A definition-level bridge proving when a source-equation-only target ref/value payload may be interpreted as a proof-grade target ref/value equation.",
  },
  {
    burden_id: "endpoint_value_map_certification_to_target_ref_value_equation_lemma",
    missing_field:
      "endpoint_value_map_certification_to_target_ref_value_equation_lemma_present",
    required_evidence:
      "A lemma connecting endpoint-value-map-only certification to the target ref/value equation object without renaming certification as proof.",
  },
  {
    burden_id: "source_equation_only_guard_discharge",
    missing_field: "source_equation_only_guard_discharge_lemma_present",
    required_evidence:
      "A lemma discharging the source-equation-only guard rather than bypassing it.",
  },
  {
    burden_id: "no_link_promotion_rule_soundness",
    missing_field: "no_link_promotion_rule_soundness_lemma_present",
    required_evidence:
      "A soundness lemma proving that the promotion rule does not import `witness_object_has_contract_link` directly or through inherited source status.",
  },
  {
    burden_id: "endpoint_application_derivation_schema",
    missing_field: "endpoint_application_derivation_schema_present",
    required_evidence:
      "An endpoint application schema that instantiates the definition bridge and lemmas for all four endpoint functionals.",
  },
  {
    burden_id: "promotion_rule_definition_source_data_derivation",
    missing_field: "promotion_rule_definition_source_data_derivation_present",
    required_evidence:
      "A complete derivation bundle from definition source data to the promotion rule.",
  },
  {
    burden_id: "proof_grade_target_ref_value_equations_without_contract_link",
    missing_field:
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    required_evidence:
      "Proof-grade target ref/value equation packages produced only after the bridge, lemmas, promotion rule, derivation, soundness proof, and endpoint application proof are present.",
  },
];

function parseArgs(argv) {
  const args = {
    parentPacket: DEFAULT_PARENT_PACKET,
    targetNote: DEFAULT_TARGET_NOTE,
    refValueSourceParent: DEFAULT_REF_VALUE_SOURCE_PARENT,
    targetBoundaryObject: DEFAULT_TARGET_BOUNDARY_OBJECT,
    endpointValueMap: DEFAULT_ENDPOINT_VALUE_MAP,
    noContractLinkPremise: DEFAULT_NO_CONTRACT_LINK_PREMISE,
    contractTarget: DEFAULT_CONTRACT_TARGET,
    completionSourceStatusGuard: DEFAULT_COMPLETION_SOURCE_STATUS_GUARD,
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
    } else if (arg === "--target-note") {
      args.targetNote = argv[++index];
    } else if (arg === "--ref-value-source-parent") {
      args.refValueSourceParent = argv[++index];
    } else if (arg === "--target-boundary-object") {
      args.targetBoundaryObject = argv[++index];
    } else if (arg === "--endpoint-value-map") {
      args.endpointValueMap = argv[++index];
    } else if (arg === "--no-contract-link-premise") {
      args.noContractLinkPremise = argv[++index];
    } else if (arg === "--contract-target") {
      args.contractTarget = argv[++index];
    } else if (arg === "--completion-source-status-guard") {
      args.completionSourceStatusGuard = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-definition-source-data-derivation-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --parent-packet <path>",
    "  --target-note <path>",
    "  --ref-value-source-parent <path>",
    "  --target-boundary-object <path>",
    "  --endpoint-value-map <path>",
    "  --no-contract-link-premise <path>",
    "  --contract-target <path>",
    "  --completion-source-status-guard <path>",
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
    throw new Error("Refusing derivation attempt from authorized parent packet.");
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

function makeSourceArtifacts(paths) {
  return paths.map(({ label, filePath }) => ({
    label,
    path: filePath,
    basename: path.basename(filePath),
    sha256: sha256File(filePath),
  }));
}

function uniqueNonEmpty(values) {
  return [...new Set(values.filter((value) => value !== undefined && value !== null))];
}

function buildDefinitionSourceData(parentEndpoint, sourceData) {
  const targetObject = requireMapped(
    sourceData.targetObjectMap,
    parentEndpoint.id,
    `target boundary object for ${parentEndpoint.id}`
  );
  const valueMap = requireMapped(
    sourceData.valueMapMap,
    parentEndpoint.id,
    `endpoint value map for ${parentEndpoint.id}`
  );
  const targetEndpointRefs =
    targetObject.target_boundary_binding_object?.target_endpoint_refs ??
    [];
  const sourceEquations =
    valueMap.target_endpoint_value_binding_source_equations ?? [];
  const valueBindings =
    valueMap.endpoint_value_binding_map?.value_bindings ?? [];

  return {
    parent_source_attempt_ids: parentEndpoint.source_attempt_ids ?? {},
    target_ref_value_source_payload:
      parentEndpoint.target_ref_value_source_payload ?? {},
    target_boundary_binding_object_id:
      targetObject.target_boundary_binding_object?.object_id ?? null,
    target_equation: targetObject.target_equation,
    target_action: targetObject.target_action,
    row_uses: targetObject.row_uses ?? [],
    target_endpoint_refs_values: targetEndpointRefs,
    endpoint_value_binding_source_equations: sourceEquations,
    value_bindings: valueBindings,
    proof_grade_statuses: {
      source_equations: sourceEquations.map(
        (equation) => equation.proof_grade_binding_status
      ),
      endpoint_value_map:
        valueMap.endpoint_value_binding_map?.proof_grade_binding_status ?? null,
    },
    ownership_component_ids: uniqueNonEmpty([
      ...targetEndpointRefs.map((ref) => ref.ownership_component_id),
      ...sourceEquations.map((equation) => equation.ownership_component_id),
      ...valueBindings.map((binding) => binding.ownership_component_id),
    ]),
  };
}

function buildEndpointAttempt(parentEndpoint, sourceData) {
  const parentFields = parentEndpoint.required_fields_present ?? {};
  const sourcePayload = parentEndpoint.target_ref_value_source_payload ?? {};
  const definitionSourceData = buildDefinitionSourceData(
    parentEndpoint,
    sourceData
  );

  const fields = {
    parent_promotion_rule_proof_attempt_input_present: true,
    candidate_promotion_rule_target_note_input_present:
      parentFields.candidate_promotion_rule_target_note_input_present === true,
    candidate_promotion_rule_target_hash_matches:
      parentFields.candidate_promotion_rule_target_hash_matches === true,
    parent_promotion_rule_target_source_inputs_ready:
      parentFields.promotion_rule_target_source_inputs_ready === true,
    target_ref_value_equations_without_contract_link_source_inputs_ready:
      parentFields
        .target_ref_value_equations_without_contract_link_source_inputs_ready ===
      true,
    target_endpoint_ref_value_source_equations_present:
      parentFields.target_endpoint_ref_value_source_equations_present === true,
    target_endpoint_ref_value_source_equations_all_source_only:
      parentFields.target_endpoint_ref_value_source_equations_all_source_only ===
      true,
    value_map_source_equations_source_equation_only:
      parentFields.value_map_source_equations_source_equation_only === true,
    endpoint_value_map_proof_grade_status_endpoint_value_map_only:
      parentFields.endpoint_value_map_proof_grade_status_endpoint_value_map_only ===
      true,
    endpoint_value_binding_map_ref_values_certified:
      parentFields.endpoint_value_binding_map_ref_values_certified === true,
    source_equation_only_guard_present:
      parentFields.target_endpoint_ref_value_source_equations_all_source_only ===
        true &&
      parentFields.value_map_source_equations_source_equation_only === true,
    endpoint_value_map_only_guard_present:
      parentFields.endpoint_value_map_proof_grade_status_endpoint_value_map_only ===
      true,
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
    promotion_rule_target_source_inputs_ready:
      parentFields.promotion_rule_target_source_inputs_ready === true,
    definition_source_data_derivation_route_selected: true,
    direct_source_renaming_rejected: true,
    target_note_as_derivation_rejected: true,
    definition_bridge_source_scope_ready: false,
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
      parentFields
        .independent_contract_target_satisfaction_without_contract_link_proof_present ===
      true,
    independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present:
      parentFields
        .independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present ===
      true,
    independent_first_primitive_compatibility_without_contract_link_present:
      parentFields
        .independent_first_primitive_compatibility_without_contract_link_present ===
      true,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.definition_bridge_source_scope_ready = SOURCE_FIELDS.filter(
    (field) => field !== "definition_bridge_source_scope_ready"
  ).every((field) => fields[field] === true);

  const routeAttempts = DERIVATION_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: parentEndpoint.id,
    endpoint_functional_id: parentEndpoint.endpoint_functional_id,
    role: parentEndpoint.role,
    independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt_id:
      `independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt:${parentEndpoint.id}`,
    source_attempt_ids: {
      promotion_rule_without_contract_link:
        parentEndpoint
          .independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt_id,
      ...parentEndpoint.source_attempt_ids,
    },
    target: {
      target_id: `independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation:${parentEndpoint.id}`,
      statement:
        "Derive the no-link promotion rule from definition source data, source-equation, endpoint-value-map, payload-match, and no-link guard data.",
      accepted_if:
        "The endpoint has a definition bridge, certification lemma, guard-discharge lemma, soundness lemma, endpoint application schema, and complete derivation bundle.",
      prohibited_premises: [
        "witness_object_has_contract_link",
        "primitive rule acceptance",
        "direct source-equation renaming",
        "target note as derivation",
        "compatibility proof promotion",
        "target-satisfaction proof promotion",
        "row consumption",
        "branch-chart authorization",
      ],
    },
    target_ref_value_source_payload: sourcePayload,
    definition_source_data: definitionSourceData,
    required_fields_present: fields,
    derivation_route_attempts: routeAttempts,
    derivation_routes_passed: [],
    missing_definition_bridge_obligations: missing(
      fields,
      BRIDGE_LEMMA_FIELDS
    ),
    missing_promotion_rule_obligations: missing(fields, PROOF_FIELDS),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 6)
      .map((burden) => burden.missing_field),
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has the source scope for a derivation attempt, but no definition bridge, certification lemma, guard-discharge lemma, soundness lemma, endpoint application schema, or derivation bundle is present.",
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
    source_derivation_source_scope_ready:
      sourceFields.definition_bridge_source_scope_ready,
    receiver_derivation_source_scope_ready:
      receiverFields.definition_bridge_source_scope_ready,
    combined_derivation_source_scope_ready: false,
    source_definition_bridge_present:
      sourceFields
        .target_ref_value_source_equation_promotion_definition_bridge_present,
    receiver_definition_bridge_present:
      receiverFields
        .target_ref_value_source_equation_promotion_definition_bridge_present,
    combined_definition_bridge_pair_present: false,
    source_certification_lemma_present:
      sourceFields
        .endpoint_value_map_certification_to_target_ref_value_equation_lemma_present,
    receiver_certification_lemma_present:
      receiverFields
        .endpoint_value_map_certification_to_target_ref_value_equation_lemma_present,
    combined_certification_lemma_pair_present: false,
    source_guard_discharge_lemma_present:
      sourceFields.source_equation_only_guard_discharge_lemma_present,
    receiver_guard_discharge_lemma_present:
      receiverFields.source_equation_only_guard_discharge_lemma_present,
    combined_guard_discharge_lemma_pair_present: false,
    source_soundness_lemma_present:
      sourceFields.no_link_promotion_rule_soundness_lemma_present,
    receiver_soundness_lemma_present:
      receiverFields.no_link_promotion_rule_soundness_lemma_present,
    combined_soundness_lemma_pair_present: false,
    source_endpoint_application_schema_present:
      sourceFields.endpoint_application_derivation_schema_present,
    receiver_endpoint_application_schema_present:
      receiverFields.endpoint_application_derivation_schema_present,
    combined_endpoint_application_schema_pair_present: false,
    source_definition_source_data_derivation_present:
      sourceFields.promotion_rule_definition_source_data_derivation_present,
    receiver_definition_source_data_derivation_present:
      receiverFields.promotion_rule_definition_source_data_derivation_present,
    combined_definition_source_data_derivation_pair_present: false,
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

  fields.combined_derivation_source_scope_ready =
    fields.source_derivation_source_scope_ready &&
    fields.receiver_derivation_source_scope_ready;
  fields.combined_definition_bridge_pair_present =
    fields.source_definition_bridge_present &&
    fields.receiver_definition_bridge_present;
  fields.combined_certification_lemma_pair_present =
    fields.source_certification_lemma_present &&
    fields.receiver_certification_lemma_present;
  fields.combined_guard_discharge_lemma_pair_present =
    fields.source_guard_discharge_lemma_present &&
    fields.receiver_guard_discharge_lemma_present;
  fields.combined_soundness_lemma_pair_present =
    fields.source_soundness_lemma_present && fields.receiver_soundness_lemma_present;
  fields.combined_endpoint_application_schema_pair_present =
    fields.source_endpoint_application_schema_present &&
    fields.receiver_endpoint_application_schema_present;
  fields.combined_definition_source_data_derivation_pair_present =
    fields.source_definition_source_data_derivation_present &&
    fields.receiver_definition_source_data_derivation_present;
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
    source_derivation_proof_attempt_id:
      source
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    receiver_derivation_proof_attempt_id:
      receiver
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver derivation source scopes, but no source/receiver definition bridge, lemma stack, derivation bundle, promotion rule pair, or proof-grade ref/value equation pair.",
  };
}

function buildPacket(parent, sourcePaths, sourceData) {
  assertParentPacket(parent);

  const endpointAttempts =
    parent.endpoint_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempts.map(
      (endpoint) => buildEndpointAttempt(endpoint, sourceData)
    );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "promotion-rule derivation endpoint"
  );
  const rowAttempts =
    parent.row_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempts.map(
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
      "breather-higher-fold-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-definition-source-data-derivation-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; derivation source scope is present, but the definition bridge and lemma stack needed to derive the promotion rule are absent",
    source_artifacts: makeSourceArtifacts([
      {
        label:
          "independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt",
        filePath: sourcePaths.parent,
      },
      {
        label:
          "independent_target_ref_value_equation_promotion_rule_without_contract_link_target",
        filePath: sourcePaths.targetNote,
      },
      {
        label:
          "independent_target_ref_value_equations_without_contract_link_proof_attempt",
        filePath: sourcePaths.refValueSourceParent,
      },
      {
        label: "target_endpoint_boundary_binding_object_construction_attempt",
        filePath: sourcePaths.targetBoundaryObject,
      },
      {
        label: "endpoint_value_binding_map_construction_attempt",
        filePath: sourcePaths.endpointValueMap,
      },
      {
        label:
          "independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt",
        filePath: sourcePaths.noContractLinkPremise,
      },
      {
        label: "full_endpoint_boundary_binding_contract_target",
        filePath: sourcePaths.contractTarget,
      },
      {
        label: "binding_full_binding_completion_attempt",
        filePath: sourcePaths.completionSourceStatusGuard,
      },
    ]),
    target: {
      target_id:
        "independent-target-ref-value-equation-promotion-rule-without-contract-link-definition-source-data-derivation-target",
      statement:
        "Derive the no-link target ref/value equation promotion rule from definition source data without primitive-rule acceptance.",
      accepted_if:
        "Each endpoint has the definition bridge, certification lemma, guard-discharge lemma, soundness lemma, endpoint application schema, derivation bundle, promotion rule, and proof-grade target ref/value package.",
    },
    no_primitive_acceptance_rule:
      "Primitive-rule acceptance is not used. The packet tests only whether definition source data derives the promotion rule.",
    no_promotion_rule:
      "Source-equation-only payloads, endpoint-value-map-only certifications, payload matches, target notes, and no-link guards are not promoted into a derived rule or proof-grade equation package without the bridge/lemma stack.",
    proof_burdens: PROOF_BURDENS,
    derivation_routes: DERIVATION_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempts:
      endpointAttempts,
    row_independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempts:
      rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      parent_inputs:
        endpointFieldCounts.parent_promotion_rule_proof_attempt_input_present,
      parent_source_inputs_ready:
        endpointFieldCounts.parent_promotion_rule_target_source_inputs_ready,
      candidate_target_note_inputs:
        endpointFieldCounts.candidate_promotion_rule_target_note_input_present,
      candidate_target_note_hash_matches:
        endpointFieldCounts.candidate_promotion_rule_target_hash_matches,
      target_ref_value_source_input_bundles:
        endpointFieldCounts
          .target_ref_value_equations_without_contract_link_source_inputs_ready,
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
      endpoint_value_map_status_endpoint_value_map_only:
        endpointFieldCounts
          .endpoint_value_map_proof_grade_status_endpoint_value_map_only,
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
      derivation_routes_selected:
        endpointFieldCounts.definition_source_data_derivation_route_selected,
      direct_source_renaming_rejected:
        endpointFieldCounts.direct_source_renaming_rejected,
      target_note_as_derivation_rejected:
        endpointFieldCounts.target_note_as_derivation_rejected,
      definition_bridge_source_scopes_ready:
        endpointFieldCounts.definition_bridge_source_scope_ready,
      total_target_object_ref_values: totalTargetObjectRefValues,
      total_target_ref_value_source_equations: totalSourceEquations,
      total_value_map_bindings: totalValueBindings,
      definition_bridges_present:
        endpointFieldCounts
          .target_ref_value_source_equation_promotion_definition_bridge_present,
      certification_lemmas_present:
        endpointFieldCounts
          .endpoint_value_map_certification_to_target_ref_value_equation_lemma_present,
      guard_discharge_lemmas_present:
        endpointFieldCounts.source_equation_only_guard_discharge_lemma_present,
      no_link_soundness_lemmas_present:
        endpointFieldCounts.no_link_promotion_rule_soundness_lemma_present,
      endpoint_application_derivation_schemas_present:
        endpointFieldCounts.endpoint_application_derivation_schema_present,
      derivation_bundles_present:
        endpointFieldCounts
          .promotion_rule_definition_source_data_derivation_present,
      promotion_rules_present:
        endpointFieldCounts
          .independent_target_ref_value_equation_promotion_rule_without_contract_link_present,
      derivations_present:
        endpointFieldCounts
          .independent_target_ref_value_equation_derivation_without_contract_link_present,
      soundness_proofs_present:
        endpointFieldCounts
          .independent_target_ref_value_equation_soundness_without_contract_link_present,
      endpoint_application_proofs_present:
        endpointFieldCounts
          .independent_target_ref_value_equation_endpoint_application_without_contract_link_present,
      proof_grade_target_ref_value_packages:
        endpointFieldCounts
          .independent_target_ref_value_equations_without_contract_link_proof_grade,
      row_derivation_source_scope_pairs:
        rowFieldCounts.combined_derivation_source_scope_ready,
      row_definition_bridge_pairs:
        rowFieldCounts.combined_definition_bridge_pair_present,
      row_certification_lemma_pairs:
        rowFieldCounts.combined_certification_lemma_pair_present,
      row_guard_discharge_lemma_pairs:
        rowFieldCounts.combined_guard_discharge_lemma_pair_present,
      row_soundness_lemma_pairs:
        rowFieldCounts.combined_soundness_lemma_pair_present,
      row_endpoint_application_schema_pairs:
        rowFieldCounts.combined_endpoint_application_schema_pair_present,
      row_derivation_bundle_pairs:
        rowFieldCounts.combined_definition_source_data_derivation_pair_present,
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
        "No endpoint supplies the definition bridge/lemma stack or derivation bundle needed to derive the promotion rule.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed independent target-ref/value-equation-promotion-rule definition-source-data-derivation proof attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.definition_bridge_source_scope_ready} | ${fields.primitive_rule_acceptance_not_used} | ${payload.source_equation_count ?? 0} | ${payload.value_binding_count ?? 0} | ${fields.target_ref_value_source_equation_promotion_definition_bridge_present} | ${fields.endpoint_value_map_certification_to_target_ref_value_equation_lemma_present} | ${fields.source_equation_only_guard_discharge_lemma_present} | ${fields.no_link_promotion_rule_soundness_lemma_present} | ${fields.endpoint_application_derivation_schema_present} | ${fields.promotion_rule_definition_source_data_derivation_present} | ${fields.independent_target_ref_value_equation_promotion_rule_without_contract_link_present} | ${fields.independent_target_ref_value_equations_without_contract_link_proof_grade} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_derivation_source_scope_ready} | ${fields.combined_definition_bridge_pair_present} | ${fields.combined_certification_lemma_pair_present} | ${fields.combined_guard_discharge_lemma_pair_present} | ${fields.combined_soundness_lemma_pair_present} | ${fields.combined_endpoint_application_schema_pair_present} | ${fields.combined_definition_source_data_derivation_pair_present} | ${fields.combined_promotion_rule_pair_present} | ${fields.combined_ref_value_equations_proof_grade_without_contract_link} | ${row.row_consumed} |`;
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
  return `# Independent Target Ref/Value Equation Promotion Rule Without Contract Link Definition Source Data Derivation Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests whether the no-link target ref/value equation
promotion rule can be derived from definition source data. It imports the
promotion-rule proof attempt and selects the definition-source-data-derivation
route. It is not a primitive-rule acceptance packet, and it does not promote
source equations, endpoint-value-map certifications, payload matches, target
notes, or no-link guards into proof-grade target ref/value equations.

The attempt remains fail-closed. It records ${summary.parent_inputs} / ${summary.endpoint_functionals}
parent proof-attempt inputs, ${summary.parent_source_inputs_ready} / ${summary.endpoint_functionals}
parent promotion-rule target source-input bundles, ${summary.candidate_target_note_inputs} / ${summary.endpoint_functionals}
target-note inputs, ${summary.candidate_target_note_hash_matches} / ${summary.endpoint_functionals}
target-note hash matches, ${summary.target_ref_value_source_input_bundles} / ${summary.endpoint_functionals}
target ref/value source-input bundles, ${summary.target_ref_value_source_equation_sets} / ${summary.endpoint_functionals}
source-equation sets, ${summary.source_equation_only_guards} / ${summary.endpoint_functionals}
source-equation-only guards, ${summary.endpoint_value_map_only_guards} / ${summary.endpoint_functionals}
endpoint-value-map-only guards, ${summary.endpoint_value_binding_map_ref_values_certified} / ${summary.endpoint_functionals}
endpoint-value-map ref/value certifications, ${summary.payload_matches} / ${summary.endpoint_functionals}
payload matches, ${summary.contract_link_premise_not_imported} / ${summary.endpoint_functionals}
contract-link premise non-import guards, ${summary.no_link_independence_guards_declared} / ${summary.endpoint_functionals}
no-link independence guards declared, ${summary.witness_object_has_contract_link_excluded} / ${summary.endpoint_functionals}
contract-link exclusions, ${summary.primitive_rule_acceptance_not_used} / ${summary.endpoint_functionals}
primitive-rule-acceptance rejections, and ${summary.definition_bridge_source_scopes_ready} / ${summary.endpoint_functionals}
definition-bridge source scopes. The source scope covers ${summary.total_target_ref_value_source_equations} / ${summary.total_target_object_ref_values}
target ref/value source equations and ${summary.total_value_map_bindings}
value-map bindings.

It records ${summary.definition_bridges_present} / ${summary.endpoint_functionals}
definition bridges, ${summary.certification_lemmas_present} / ${summary.endpoint_functionals}
certification lemmas, ${summary.guard_discharge_lemmas_present} / ${summary.endpoint_functionals}
source-equation-only guard-discharge lemmas, ${summary.no_link_soundness_lemmas_present} / ${summary.endpoint_functionals}
no-link soundness lemmas, ${summary.endpoint_application_derivation_schemas_present} / ${summary.endpoint_functionals}
endpoint application derivation schemata, ${summary.derivation_bundles_present} / ${summary.endpoint_functionals}
derivation bundles, ${summary.promotion_rules_present} / ${summary.endpoint_functionals}
promotion rules, ${summary.derivations_present} / ${summary.endpoint_functionals}
derivations, ${summary.soundness_proofs_present} / ${summary.endpoint_functionals}
soundness proofs, ${summary.endpoint_application_proofs_present} / ${summary.endpoint_functionals}
endpoint application proofs, ${summary.proof_grade_target_ref_value_packages} / ${summary.endpoint_functionals}
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

## Tested Derivation Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.derivation_routes)}

## Endpoint Attempts

| Endpoint | Role | Source scope ready | Primitive acceptance not used | Source equations | Value bindings | Definition bridge | Certification lemma | Guard-discharge lemma | No-link soundness lemma | Endpoint schema | Derivation bundle | Promotion rule | Proof-grade package | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempts)}

## Row Attempts

| Row | Source scope pair | Definition bridge pair | Certification lemma pair | Guard-discharge pair | Soundness lemma pair | Endpoint schema pair | Derivation bundle pair | Promotion rule pair | Ref/value proof-grade pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_independent_target_ref_value_equation_promotion_rule_without_contract_link_definition_source_data_derivation_proof_attempts)}

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
  const targetBoundaryObject = readJson(args.targetBoundaryObject);
  const endpointValueMap = readJson(args.endpointValueMap);
  const sourceData = {
    targetObjectMap: idMap(
      targetBoundaryObject.endpoint_target_boundary_binding_object_attempts,
      "id",
      "target boundary object endpoint"
    ),
    valueMapMap: idMap(
      endpointValueMap.endpoint_value_binding_map_construction_attempts,
      "id",
      "endpoint value map endpoint"
    ),
  };
  const packet = buildPacket(
    parent,
    {
      parent: args.parentPacket,
      targetNote: args.targetNote,
      refValueSourceParent: args.refValueSourceParent,
      targetBoundaryObject: args.targetBoundaryObject,
      endpointValueMap: args.endpointValueMap,
      noContractLinkPremise: args.noContractLinkPremise,
      contractTarget: args.contractTarget,
      completionSourceStatusGuard: args.completionSourceStatusGuard,
    },
    sourceData
  );

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

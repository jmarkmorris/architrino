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
  `${CERT_DIR}/target_ref_value_object_domain_membership_predicate_signature_declaration_definition_source_data_derivation_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_NOTE =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_target.md`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const TARGET_NOTE_HASH =
  "bacd0248b307f43980caa240df7efc141f1699f70adc0dbc73da1c8f7a8b7b20";

const PARENT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-declaration-without-contract-link-definition-source-data-derivation-proof-attempt-fail-closed-declaration-target-present-definition-source-data-route-selected-proof-grade-declarations-absent-proof-grade-signature-absent-no-primitive-declaration-acceptance-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-declaration-formation-rule-without-contract-link-definition-source-data-derivation-proof-attempt-fail-closed-formation-rule-target-present-definition-source-data-route-selected-proof-grade-formation-rule-absent-proof-grade-declarations-absent-no-primitive-declaration-acceptance-no-row-consumption";

const SOURCE_FIELDS = [
  "parent_declaration_proof_attempt_input_present",
  "formation_rule_target_note_input_present",
  "formation_rule_target_hash_matches",
  "formation_rule_target_obligations_stated",
  "parent_signature_declaration_source_scope_ready",
  "definition_source_data_preserved",
  "target_ref_value_source_payload_preserved",
  "target_note_convention_preserved",
  "source_equation_only_guard_present",
  "endpoint_value_map_only_guard_present",
  "endpoint_value_binding_map_ref_values_certified",
  "value_map_ref_value_payload_matches_target_object",
  "contract_link_premise_not_imported",
  "no_contract_link_independence_guard_declared",
  "primitive_signature_acceptance_not_used",
  "primitive_declaration_acceptance_not_used",
  "target_note_as_declaration_rejected",
  "direct_source_renaming_rejected",
  "formation_rule_route_selected",
  "formation_rule_source_scope_ready",
];

const FORMATION_RULE_FIELDS = [
  "membership_predicate_signature_declaration_formation_rule_present",
  "membership_predicate_signature_symbol_formation_rule_present",
  "membership_predicate_signature_domain_sort_formation_rule_present",
  "membership_predicate_signature_codomain_sort_formation_rule_present",
  "formation_rule_soundness_without_contract_link_present",
  "formation_rule_derivation_from_definition_source_data_present",
];

const DECLARATION_FIELDS = [
  "membership_predicate_signature_symbol_declared",
  "membership_predicate_signature_domain_sort_declared",
  "membership_predicate_signature_codomain_sort_declared",
];

const NON_ROUTE_FIELDS = [
  "target_note_accepted_as_formation_rule",
  "source_equation_handle_accepted_as_formation_rule",
  "endpoint_value_map_certification_accepted_as_formation_rule",
  "payload_match_accepted_as_formation_rule",
  "no_link_guard_accepted_as_formation_rule",
  "primitive_declaration_acceptance_used",
];

const DOWNSTREAM_FIELDS = [
  "target_ref_value_object_argument_sort_present",
  "source_equation_handle_non_argument_sort_present",
  "target_note_non_argument_sort_present",
  "payload_match_non_argument_sort_present",
  "endpoint_value_map_certification_non_argument_sort_present",
  "no_link_guard_non_argument_sort_present",
  "signature_no_contract_link_premise_absence_proven",
  "membership_predicate_signature_derivation_from_definition_source_data_present",
  "target_ref_value_object_domain_membership_predicate_signature_present",
  "target_ref_value_object_positive_membership_clause_present",
  "membership_predicate_soundness_present",
  "membership_predicate_endpoint_application_present",
  "membership_predicate_derivation_from_definition_source_data_present",
  "target_ref_value_object_domain_membership_predicate_present",
  "target_ref_value_object_domain_defined",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_FIELDS,
  ...FORMATION_RULE_FIELDS,
  ...DECLARATION_FIELDS,
  ...NON_ROUTE_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_formation_rule_source_scope_ready",
  "receiver_formation_rule_source_scope_ready",
  "combined_formation_rule_source_scope_ready",
  "source_signature_declaration_formation_rule_present",
  "receiver_signature_declaration_formation_rule_present",
  "combined_signature_declaration_formation_rule_pair_present",
  "source_signature_symbol_declared",
  "receiver_signature_symbol_declared",
  "combined_signature_symbol_pair_declared",
  "source_signature_domain_sort_declared",
  "receiver_signature_domain_sort_declared",
  "combined_signature_domain_sort_pair_declared",
  "source_signature_codomain_sort_declared",
  "receiver_signature_codomain_sort_declared",
  "combined_signature_codomain_sort_pair_declared",
  "source_membership_predicate_signature_present",
  "receiver_membership_predicate_signature_present",
  "combined_membership_predicate_signature_pair_present",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const FORMATION_RULE_ROUTES = [
  {
    route_id: "target_note_convention_as_formation_rule",
    status: "rejected-target-note-only",
    required_fields: [
      "formation_rule_target_obligations_stated",
      "target_note_accepted_as_formation_rule",
    ],
    limitation:
      "The target note states the desired formation rule but is not proof-grade rule evidence.",
  },
  {
    route_id: "source_equation_handle_as_formation_rule",
    status: "rejected-source-equation-only",
    required_fields: [
      "source_equation_only_guard_present",
      "source_equation_handle_accepted_as_formation_rule",
    ],
    limitation:
      "Source-equation handles are source syntax; they do not form predicate-symbol or sort declarations.",
  },
  {
    route_id: "endpoint_value_map_certification_as_formation_rule",
    status: "rejected-certification-only",
    required_fields: [
      "endpoint_value_map_only_guard_present",
      "endpoint_value_map_certification_accepted_as_formation_rule",
    ],
    limitation:
      "Endpoint value-map certification attaches values; it is not a declaration formation rule.",
  },
  {
    route_id: "payload_match_as_formation_rule",
    status: "rejected-payload-match-only",
    required_fields: [
      "value_map_ref_value_payload_matches_target_object",
      "payload_match_accepted_as_formation_rule",
    ],
    limitation:
      "Payload matching records agreement; it does not form a predicate signature.",
  },
  {
    route_id: "no_link_guard_as_formation_rule",
    status: "rejected-guard-only",
    required_fields: [
      "no_contract_link_independence_guard_declared",
      "no_link_guard_accepted_as_formation_rule",
    ],
    limitation:
      "A no-link guard excludes a premise but is not a symbol/sort formation rule.",
  },
  {
    route_id: "primitive_declaration_acceptance",
    status: "rejected-decision-required",
    required_fields: [
      "primitive_declaration_acceptance_used",
      ...DECLARATION_FIELDS,
    ],
    limitation:
      "Accepting the declarations as primitive would be a separate theory decision and is not used here.",
  },
  {
    route_id: "derive_formation_rule_from_definition_source_data",
    status: "blocked",
    required_fields: FORMATION_RULE_FIELDS,
    limitation:
      "The declaration parent and source scope are present, but no proof-grade formation rule or soundness/derivation proof is present.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "membership_predicate_signature_declaration_formation_rule",
    missing_field:
      "membership_predicate_signature_declaration_formation_rule_present",
    required_evidence:
      "A proof-grade local rule that converts eligible definition source data into the three declaration judgments.",
  },
  {
    burden_id: "membership_predicate_signature_symbol_formation_rule",
    missing_field:
      "membership_predicate_signature_symbol_formation_rule_present",
    required_evidence:
      "A proof-grade rule application that forms `is_target_ref_value_object_e` as the endpoint-local predicate symbol.",
  },
  {
    burden_id: "membership_predicate_signature_domain_sort_formation_rule",
    missing_field:
      "membership_predicate_signature_domain_sort_formation_rule_present",
    required_evidence:
      "A proof-grade rule application that forms `target_ref_value_object_argument_e` as the domain sort.",
  },
  {
    burden_id: "membership_predicate_signature_codomain_sort_formation_rule",
    missing_field:
      "membership_predicate_signature_codomain_sort_formation_rule_present",
    required_evidence:
      "A proof-grade rule application that forms `truth_value_judgment` as the codomain sort.",
  },
  {
    burden_id: "formation_rule_soundness_without_contract_link",
    missing_field: "formation_rule_soundness_without_contract_link_present",
    required_evidence:
      "A proof that the formation rule does not import `witness_object_has_contract_link`.",
  },
  {
    burden_id: "formation_rule_derivation_from_definition_source_data",
    missing_field:
      "formation_rule_derivation_from_definition_source_data_present",
    required_evidence:
      "A derivation of the formation rule from preserved definition source data, not from target-note convention.",
  },
  {
    burden_id: "membership_predicate_signature_symbol",
    missing_field: "membership_predicate_signature_symbol_declared",
    required_evidence:
      "A proof-grade declaration of `is_target_ref_value_object_e` as the endpoint-local predicate symbol.",
  },
  {
    burden_id: "membership_predicate_signature_domain_sort",
    missing_field: "membership_predicate_signature_domain_sort_declared",
    required_evidence:
      "A proof-grade declaration of `target_ref_value_object_argument_e` as the domain sort.",
  },
  {
    burden_id: "membership_predicate_signature_codomain_sort",
    missing_field: "membership_predicate_signature_codomain_sort_declared",
    required_evidence:
      "A proof-grade declaration of `truth_value_judgment` as the codomain sort.",
  },
  {
    burden_id: "target_ref_value_object_argument_sort",
    missing_field: "target_ref_value_object_argument_sort_present",
    required_evidence:
      "A downstream proof that target ref/value objects are legitimate predicate arguments.",
  },
  {
    burden_id: "signature_no_contract_link_premise_absence",
    missing_field: "signature_no_contract_link_premise_absence_proven",
    required_evidence:
      "A downstream proof that the signature does not import `witness_object_has_contract_link`.",
  },
  {
    burden_id: "membership_predicate_signature_derivation",
    missing_field:
      "membership_predicate_signature_derivation_from_definition_source_data_present",
    required_evidence:
      "A downstream derivation of the complete typed signature from preserved definition source data.",
  },
  {
    burden_id: "target_ref_value_object_domain_membership_predicate_signature",
    missing_field:
      "target_ref_value_object_domain_membership_predicate_signature_present",
    required_evidence:
      "The complete proof-grade target ref/value object-domain membership-predicate signature.",
  },
];

function parseArgs(argv) {
  const args = {
    parentPacket: DEFAULT_PARENT_PACKET,
    targetNote: DEFAULT_TARGET_NOTE,
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-declaration-formation-rule-without-contract-link-definition-source-data-derivation-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --parent-packet <path>",
    "  --target-note <path>",
    "  --out-dir <path>",
    "  --pretty",
    "  --help",
  ].join("\n");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
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
    throw new Error("Refusing formation-rule attempt from authorized parent packet.");
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

function sourceEquationCount(definitionSourceData) {
  return (
    definitionSourceData.endpoint_value_binding_source_equations ?? []
  ).length;
}

function valueBindingCount(definitionSourceData) {
  return (definitionSourceData.value_bindings ?? []).length;
}

function targetNoteInfo(targetNotePath) {
  const text = readText(targetNotePath);
  const sha256 = sha256File(targetNotePath);
  return {
    path: targetNotePath,
    basename: path.basename(targetNotePath),
    sha256,
    hash_matches_expected: sha256 === TARGET_NOTE_HASH,
    obligations_present:
      text.includes(
        "membership_predicate_signature_declaration_formation_rule_present"
      ) &&
      text.includes(
        "membership_predicate_signature_symbol_formation_rule_present"
      ) &&
      text.includes(
        "membership_predicate_signature_domain_sort_formation_rule_present"
      ) &&
      text.includes(
        "membership_predicate_signature_codomain_sort_formation_rule_present"
      ) &&
      text.includes("formation_rule_soundness_without_contract_link_present") &&
      text.includes(
        "formation_rule_derivation_from_definition_source_data_present"
      ),
  };
}

function sourceArtifacts(parentPath, targetNote, parent) {
  return [
    {
      label:
        "target_ref_value_object_domain_membership_predicate_signature_declaration_definition_source_data_derivation_proof_attempt",
      path: parentPath,
      basename: path.basename(parentPath),
      sha256: sha256File(parentPath),
    },
    {
      label:
        "target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_target",
      path: targetNote.path,
      basename: targetNote.basename,
      sha256: targetNote.sha256,
    },
    ...(parent.source_artifacts ?? []).map((artifact) => ({
      ...artifact,
      inherited_from:
        "target_ref_value_object_domain_membership_predicate_signature_declaration_definition_source_data_derivation_proof_attempt",
    })),
  ];
}

function buildEndpointAttempt(parentEndpoint, targetNote) {
  const parentFields = parentEndpoint.required_fields_present ?? {};
  const definitionSourceData = parentEndpoint.definition_source_data ?? {};
  const payload = parentEndpoint.target_ref_value_source_payload ?? {};

  const fields = {
    parent_declaration_proof_attempt_input_present: true,
    formation_rule_target_note_input_present: true,
    formation_rule_target_hash_matches: targetNote.hash_matches_expected,
    formation_rule_target_obligations_stated: targetNote.obligations_present,
    parent_signature_declaration_source_scope_ready:
      parentFields.signature_declaration_source_scope_ready === true,
    definition_source_data_preserved:
      parentFields.definition_source_data_preserved === true,
    target_ref_value_source_payload_preserved:
      parentFields.target_ref_value_source_payload_preserved === true,
    target_note_convention_preserved:
      parentFields.target_note_convention_preserved === true,
    source_equation_only_guard_present:
      parentFields.source_equation_only_guard_present === true,
    endpoint_value_map_only_guard_present:
      parentFields.endpoint_value_map_only_guard_present === true,
    endpoint_value_binding_map_ref_values_certified:
      parentFields.endpoint_value_binding_map_ref_values_certified === true &&
      valueBindingCount(definitionSourceData) ===
        (payload.value_binding_count ?? 0),
    value_map_ref_value_payload_matches_target_object:
      parentFields.value_map_ref_value_payload_matches_target_object === true,
    contract_link_premise_not_imported:
      parentFields.contract_link_premise_not_imported === true,
    no_contract_link_independence_guard_declared:
      parentFields.no_contract_link_independence_guard_declared === true,
    primitive_signature_acceptance_not_used:
      parentFields.primitive_signature_acceptance_not_used === true,
    primitive_declaration_acceptance_not_used:
      parentFields.primitive_declaration_acceptance_not_used === true,
    target_note_as_declaration_rejected:
      parentFields.target_note_as_declaration_rejected === true,
    direct_source_renaming_rejected:
      parentFields.direct_source_renaming_rejected === true,
    formation_rule_route_selected: true,
    formation_rule_source_scope_ready: false,
    membership_predicate_signature_declaration_formation_rule_present: false,
    membership_predicate_signature_symbol_formation_rule_present: false,
    membership_predicate_signature_domain_sort_formation_rule_present: false,
    membership_predicate_signature_codomain_sort_formation_rule_present: false,
    formation_rule_soundness_without_contract_link_present: false,
    formation_rule_derivation_from_definition_source_data_present: false,
    membership_predicate_signature_symbol_declared: false,
    membership_predicate_signature_domain_sort_declared: false,
    membership_predicate_signature_codomain_sort_declared: false,
    target_note_accepted_as_formation_rule: false,
    source_equation_handle_accepted_as_formation_rule: false,
    endpoint_value_map_certification_accepted_as_formation_rule: false,
    payload_match_accepted_as_formation_rule: false,
    no_link_guard_accepted_as_formation_rule: false,
    primitive_declaration_acceptance_used: false,
    target_ref_value_object_argument_sort_present: false,
    source_equation_handle_non_argument_sort_present: false,
    target_note_non_argument_sort_present: false,
    payload_match_non_argument_sort_present: false,
    endpoint_value_map_certification_non_argument_sort_present: false,
    no_link_guard_non_argument_sort_present: false,
    signature_no_contract_link_premise_absence_proven: false,
    membership_predicate_signature_derivation_from_definition_source_data_present:
      false,
    target_ref_value_object_domain_membership_predicate_signature_present:
      false,
    target_ref_value_object_positive_membership_clause_present: false,
    membership_predicate_soundness_present: false,
    membership_predicate_endpoint_application_present: false,
    membership_predicate_derivation_from_definition_source_data_present: false,
    target_ref_value_object_domain_membership_predicate_present: false,
    target_ref_value_object_domain_defined: false,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.formation_rule_source_scope_ready =
    SOURCE_FIELDS.filter((field) => field !== "formation_rule_source_scope_ready")
      .every((field) => fields[field] === true) &&
    sourceEquationCount(definitionSourceData) > 0;

  const routeAttempts = FORMATION_RULE_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: parentEndpoint.id,
    endpoint_functional_id: parentEndpoint.endpoint_functional_id,
    role: parentEndpoint.role,
    target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt_id:
      `target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt:${parentEndpoint.id}`,
    parent_declaration_proof_attempt_id:
      parentEndpoint
        .target_ref_value_object_domain_membership_predicate_signature_declaration_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    source_attempt_ids: parentEndpoint.source_attempt_ids ?? {},
    formation_rule_target_note: {
      basename: targetNote.basename,
      sha256: targetNote.sha256,
      hash_matches_expected: targetNote.hash_matches_expected,
      obligations_present: targetNote.obligations_present,
      proof_status:
        "formation-rule target only; not proof-grade formation-rule evidence",
    },
    formation_rule_target: {
      target_id: `form_target_ref_value_object_domain_membership_predicate_signature_declarations_without_contract_link:${parentEndpoint.id}`,
      statement:
        "Form the endpoint-local predicate symbol, domain sort, and codomain sort declarations from preserved definition source data without importing the contract-link premise.",
      accepted_if:
        "The endpoint has a proof-grade formation rule, rule soundness without the contract-link premise, rule derivation from definition source data, and resulting symbol/domain/codomain declarations.",
    },
    target_ref_value_source_payload: payload,
    definition_source_data: definitionSourceData,
    required_fields_present: fields,
    formation_rule_route_attempts: routeAttempts,
    formation_rule_routes_passed: [],
    missing_formation_rule_obligations: missing(fields, FORMATION_RULE_FIELDS),
    missing_declaration_obligations: missing(fields, DECLARATION_FIELDS),
    missing_downstream_obligations: missing(fields, DOWNSTREAM_FIELDS),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 8)
      .map((burden) => burden.missing_field),
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The declaration parent and source scope are present, but no proof-grade formation rule, rule soundness proof, or rule derivation is present.",
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
    source_formation_rule_source_scope_ready:
      sourceFields.formation_rule_source_scope_ready,
    receiver_formation_rule_source_scope_ready:
      receiverFields.formation_rule_source_scope_ready,
    combined_formation_rule_source_scope_ready: false,
    source_signature_declaration_formation_rule_present:
      sourceFields
        .membership_predicate_signature_declaration_formation_rule_present,
    receiver_signature_declaration_formation_rule_present:
      receiverFields
        .membership_predicate_signature_declaration_formation_rule_present,
    combined_signature_declaration_formation_rule_pair_present: false,
    source_signature_symbol_declared:
      sourceFields.membership_predicate_signature_symbol_declared,
    receiver_signature_symbol_declared:
      receiverFields.membership_predicate_signature_symbol_declared,
    combined_signature_symbol_pair_declared: false,
    source_signature_domain_sort_declared:
      sourceFields.membership_predicate_signature_domain_sort_declared,
    receiver_signature_domain_sort_declared:
      receiverFields.membership_predicate_signature_domain_sort_declared,
    combined_signature_domain_sort_pair_declared: false,
    source_signature_codomain_sort_declared:
      sourceFields.membership_predicate_signature_codomain_sort_declared,
    receiver_signature_codomain_sort_declared:
      receiverFields.membership_predicate_signature_codomain_sort_declared,
    combined_signature_codomain_sort_pair_declared: false,
    source_membership_predicate_signature_present:
      sourceFields.target_ref_value_object_domain_membership_predicate_signature_present,
    receiver_membership_predicate_signature_present:
      receiverFields.target_ref_value_object_domain_membership_predicate_signature_present,
    combined_membership_predicate_signature_pair_present: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };

  fields.combined_formation_rule_source_scope_ready =
    fields.row_locator_resolved &&
    fields.source_formation_rule_source_scope_ready &&
    fields.receiver_formation_rule_source_scope_ready;
  fields.combined_signature_declaration_formation_rule_pair_present =
    fields.source_signature_declaration_formation_rule_present &&
    fields.receiver_signature_declaration_formation_rule_present;
  fields.combined_signature_symbol_pair_declared =
    fields.source_signature_symbol_declared &&
    fields.receiver_signature_symbol_declared;
  fields.combined_signature_domain_sort_pair_declared =
    fields.source_signature_domain_sort_declared &&
    fields.receiver_signature_domain_sort_declared;
  fields.combined_signature_codomain_sort_pair_declared =
    fields.source_signature_codomain_sort_declared &&
    fields.receiver_signature_codomain_sort_declared;
  fields.combined_membership_predicate_signature_pair_present =
    fields.source_membership_predicate_signature_present &&
    fields.receiver_membership_predicate_signature_present;

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_formation_rule_proof_attempt_id:
      source
        .target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    receiver_formation_rule_proof_attempt_id:
      receiver
        .target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver formation-rule source scopes, but no paired proof-grade formation rules, declarations, or signatures.",
  };
}

function buildPacket(parentPath, targetNote, parent) {
  assertParentPacket(parent);

  const parentEndpoints =
    parent
      .endpoint_target_ref_value_object_domain_membership_predicate_signature_declaration_without_contract_link_definition_source_data_derivation_proof_attempts ??
    [];
  const parentRows =
    parent
      .row_target_ref_value_object_domain_membership_predicate_signature_declaration_without_contract_link_definition_source_data_derivation_proof_attempts ??
    [];
  const endpointAttempts = parentEndpoints.map((endpoint) =>
    buildEndpointAttempt(endpoint, targetNote)
  );
  const endpointMap = idMap(endpointAttempts, "id", "endpoint attempts");
  const rowAttempts = parentRows.map((row) => buildRowAttempt(row, endpointMap));
  const endpointCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  const summary = {
    endpoint_functionals: endpointAttempts.length,
    residual_consumer_rows: rowAttempts.length,
    parent_inputs:
      endpointCounts.parent_declaration_proof_attempt_input_present,
    formation_rule_target_note_inputs:
      endpointCounts.formation_rule_target_note_input_present,
    formation_rule_target_hash_matches:
      endpointCounts.formation_rule_target_hash_matches,
    formation_rule_target_obligations_stated:
      endpointCounts.formation_rule_target_obligations_stated,
    parent_signature_declaration_source_scopes_ready:
      endpointCounts.parent_signature_declaration_source_scope_ready,
    definition_source_data_preserved:
      endpointCounts.definition_source_data_preserved,
    target_ref_value_source_payloads_preserved:
      endpointCounts.target_ref_value_source_payload_preserved,
    target_note_conventions_preserved:
      endpointCounts.target_note_convention_preserved,
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
    primitive_signature_acceptance_not_used:
      endpointCounts.primitive_signature_acceptance_not_used,
    primitive_declaration_acceptance_not_used:
      endpointCounts.primitive_declaration_acceptance_not_used,
    formation_rule_routes_selected:
      endpointCounts.formation_rule_route_selected,
    formation_rule_source_scopes_ready:
      endpointCounts.formation_rule_source_scope_ready,
    total_target_ref_value_source_equations: endpointAttempts.reduce(
      (sum, endpoint) =>
        sum + sourceEquationCount(endpoint.definition_source_data ?? {}),
      0
    ),
    total_value_map_bindings: endpointAttempts.reduce(
      (sum, endpoint) =>
        sum + valueBindingCount(endpoint.definition_source_data ?? {}),
      0
    ),
    declaration_formation_rules:
      endpointCounts
        .membership_predicate_signature_declaration_formation_rule_present,
    symbol_formation_rules:
      endpointCounts.membership_predicate_signature_symbol_formation_rule_present,
    domain_sort_formation_rules:
      endpointCounts
        .membership_predicate_signature_domain_sort_formation_rule_present,
    codomain_sort_formation_rules:
      endpointCounts
        .membership_predicate_signature_codomain_sort_formation_rule_present,
    formation_rule_soundness_proofs:
      endpointCounts.formation_rule_soundness_without_contract_link_present,
    formation_rule_derivations:
      endpointCounts.formation_rule_derivation_from_definition_source_data_present,
    membership_predicate_signature_symbols:
      endpointCounts.membership_predicate_signature_symbol_declared,
    membership_predicate_signature_domain_sorts:
      endpointCounts.membership_predicate_signature_domain_sort_declared,
    membership_predicate_signature_codomain_sorts:
      endpointCounts.membership_predicate_signature_codomain_sort_declared,
    primitive_declaration_acceptance_used:
      endpointCounts.primitive_declaration_acceptance_used,
    target_ref_value_object_argument_sorts:
      endpointCounts.target_ref_value_object_argument_sort_present,
    signature_no_contract_link_premise_absence_proofs:
      endpointCounts.signature_no_contract_link_premise_absence_proven,
    membership_predicate_signature_derivations:
      endpointCounts
        .membership_predicate_signature_derivation_from_definition_source_data_present,
    target_ref_value_object_domain_membership_predicate_signatures:
      endpointCounts.target_ref_value_object_domain_membership_predicate_signature_present,
    row_formation_rule_source_scope_pairs:
      rowCounts.combined_formation_rule_source_scope_ready,
    row_formation_rule_pairs:
      rowCounts.combined_signature_declaration_formation_rule_pair_present,
    row_signature_symbol_pairs:
      rowCounts.combined_signature_symbol_pair_declared,
    row_signature_domain_sort_pairs:
      rowCounts.combined_signature_domain_sort_pair_declared,
    row_signature_codomain_sort_pairs:
      rowCounts.combined_signature_codomain_sort_pair_declared,
    row_membership_predicate_signature_pairs:
      rowCounts.combined_membership_predicate_signature_pair_present,
    rows_unblocked: rowCounts.row_unblocked,
    row_consumption_count: rowCounts.row_consumed,
    branch_chart_authorized: false,
  };

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-declaration-formation-rule-without-contract-link-definition-source-data-derivation-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; declaration parent and formation-rule target are present, but proof-grade formation rule, proof-grade declarations, and proof-grade signature are absent",
    source_artifacts: sourceArtifacts(parentPath, targetNote, parent),
    target_note: {
      path: targetNote.path,
      basename: targetNote.basename,
      sha256: targetNote.sha256,
      expected_sha256: TARGET_NOTE_HASH,
      hash_matches_expected: targetNote.hash_matches_expected,
      obligations_present: targetNote.obligations_present,
    },
    target: {
      target_id:
        "target-ref-value-object-domain-membership-predicate-signature-declaration-formation-rule-without-contract-link-target",
      statement:
        "Form proof-grade endpoint-local predicate-symbol, domain-sort, and codomain-sort declarations for the target ref/value object-domain membership-predicate signature without primitive declaration acceptance.",
      accepted_if:
        "Each endpoint has a proof-grade formation rule, soundness without the contract-link premise, derivation from definition source data, and resulting proof-grade symbol/domain/codomain declarations.",
    },
    no_primitive_acceptance_rule:
      "Primitive declaration acceptance and primitive signature acceptance are not used.",
    no_promotion_rule:
      "Target notes, source-equation handles, endpoint value-map certifications, payload matches, no-link guards, and source scope are not promoted into proof-grade formation rules or declarations.",
    proof_burdens: PROOF_BURDENS,
    formation_rule_routes: FORMATION_RULE_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_field_counts: endpointCounts,
    row_field_counts: rowCounts,
    summary,
    endpoint_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempts:
      endpointAttempts,
    row_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempts:
      rowAttempts,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    row_closure: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock:
      "No row consumption, live ledger update, branch chart, topology recertification, or proof-interval replay is authorized by this formation-rule proof attempt.",
    capture_decision:
      "Keep as priority-only proof-program sidecar. Do not promote to content/markdown/aaa until the formation rule and the remaining signature proof stack are discharged.",
  };
}

function list(values) {
  return values.join(", ");
}

function renderReport(packet) {
  const summary = packet.summary;
  const sourceRows = packet.source_artifacts
    .map(
      (artifact) =>
        `| ${artifact.label} | ${artifact.basename} | ${artifact.sha256} |`
    )
    .join("\n");
  const burdenRows = packet.proof_burdens
    .map(
      (burden) =>
        `| ${burden.burden_id} | ${burden.missing_field} | ${burden.required_evidence} |`
    )
    .join("\n");
  const routeRows = packet.formation_rule_routes
    .map(
      (route) =>
        `| ${route.route_id} | ${route.status} | ${list(route.required_fields)} | ${route.limitation} |`
    )
    .join("\n");
  const endpointRows =
    packet.endpoint_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempts
      .map((endpoint) => {
        const fields = endpoint.required_fields_present;
        return `| ${endpoint.id} | ${endpoint.role} | ${fields.formation_rule_source_scope_ready} | ${sourceEquationCount(endpoint.definition_source_data)} | ${valueBindingCount(endpoint.definition_source_data)} | ${fields.membership_predicate_signature_declaration_formation_rule_present} | ${fields.membership_predicate_signature_symbol_declared} | ${fields.membership_predicate_signature_domain_sort_declared} | ${fields.membership_predicate_signature_codomain_sort_declared} | ${fields.target_ref_value_object_domain_membership_predicate_signature_present} | ${list(endpoint.first_exact_blockers)} |`;
      })
      .join("\n");
  const rowRows =
    packet.row_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempts
      .map((row) => {
        const fields = row.required_fields_present;
        return `| ${row.row_id} | ${fields.combined_formation_rule_source_scope_ready} | ${fields.combined_signature_declaration_formation_rule_pair_present} | ${fields.combined_signature_symbol_pair_declared} | ${fields.combined_signature_domain_sort_pair_declared} | ${fields.combined_signature_codomain_sort_pair_declared} | ${fields.combined_membership_predicate_signature_pair_present} | ${fields.row_consumed} |`;
      })
      .join("\n");
  const endpointFieldRows = Object.entries(packet.endpoint_field_counts)
    .map(([field, count]) => `| ${field} | ${count} / ${summary.endpoint_functionals} |`)
    .join("\n");
  const rowFieldRows = Object.entries(packet.row_field_counts)
    .map(([field, count]) => `| ${field} | ${count} / ${summary.residual_consumer_rows} |`)
    .join("\n");

  return `# Target Ref/Value Object-Domain Membership-Predicate Signature Declaration Formation Rule Without Contract Link Definition Source Data Derivation Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests whether the proof-grade declaration blockers
can be discharged by a non-primitive formation rule for the packet-local
convention
\`is_target_ref_value_object_e : target_ref_value_object_argument_e -> truth_value_judgment\`.

The attempt remains fail-closed. It records ${summary.parent_inputs} / ${summary.endpoint_functionals}
parent declaration proof-attempt inputs, ${summary.formation_rule_target_note_inputs} / ${summary.endpoint_functionals}
formation-rule target-note inputs, ${summary.formation_rule_target_hash_matches} / ${summary.endpoint_functionals}
target-note hash matches, ${summary.formation_rule_target_obligations_stated} / ${summary.endpoint_functionals}
formation-rule obligations stated, ${summary.formation_rule_source_scopes_ready} / ${summary.endpoint_functionals}
formation-rule source scopes, ${summary.total_target_ref_value_source_equations} / ${summary.total_target_ref_value_source_equations}
target ref/value source equations, and ${summary.total_value_map_bindings}
value-map bindings.

It records ${summary.declaration_formation_rules} / ${summary.endpoint_functionals}
declaration formation rules, ${summary.symbol_formation_rules} / ${summary.endpoint_functionals}
symbol formation rules, ${summary.domain_sort_formation_rules} / ${summary.endpoint_functionals}
domain-sort formation rules, ${summary.codomain_sort_formation_rules} / ${summary.endpoint_functionals}
codomain-sort formation rules, ${summary.formation_rule_soundness_proofs} / ${summary.endpoint_functionals}
formation-rule soundness proofs, ${summary.formation_rule_derivations} / ${summary.endpoint_functionals}
formation-rule derivations, ${summary.membership_predicate_signature_symbols} / ${summary.endpoint_functionals}
proof-grade predicate-symbol declarations, ${summary.membership_predicate_signature_domain_sorts} / ${summary.endpoint_functionals}
domain-sort declarations, ${summary.membership_predicate_signature_codomain_sorts} / ${summary.endpoint_functionals}
codomain-sort declarations, ${summary.primitive_declaration_acceptance_used} / ${summary.endpoint_functionals}
primitive declaration acceptances, ${summary.target_ref_value_object_argument_sorts} / ${summary.endpoint_functionals}
argument-sort proofs, ${summary.signature_no_contract_link_premise_absence_proofs} / ${summary.endpoint_functionals}
no-contract-link premise absence proofs, ${summary.membership_predicate_signature_derivations} / ${summary.endpoint_functionals}
signature derivations, ${summary.target_ref_value_object_domain_membership_predicate_signatures} / ${summary.endpoint_functionals}
proof-grade signatures, ${summary.row_consumption_count}
consumed rows, and \`branch_chart_authorized=false\`.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceRows}

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
${burdenRows}

## Tested Formation-Rule Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeRows}

## Endpoint Attempts

| Endpoint | Role | Formation-rule source scope | Source equations | Value bindings | Formation rule | Symbol declared | Domain sort declared | Codomain sort declared | Signature | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointRows}

## Row Attempts

| Row | Formation-rule source-scope pair | Formation-rule pair | Symbol pair | Domain-sort pair | Codomain-sort pair | Signature pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowRows}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${endpointFieldRows}

## Row Field Counts

| Field | Count |
| --- | ---: |
${rowFieldRows}

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
  const targetNote = targetNoteInfo(args.targetNote);
  const packet = buildPacket(args.parentPacket, targetNote, parent);
  const outDir = args.outDir;
  fs.mkdirSync(outDir, { recursive: true });

  const jsonPath = path.join(outDir, OUTPUT_JSON);
  const reportPath = path.join(outDir, OUTPUT_REPORT);
  const json = args.pretty
    ? JSON.stringify(packet, null, 2)
    : JSON.stringify(packet);
  fs.writeFileSync(jsonPath, `${json}\n`);
  fs.writeFileSync(reportPath, renderReport(packet));

  console.log(JSON.stringify({ jsonPath, reportPath, status: packet.status }));
}

main();

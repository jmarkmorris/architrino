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
  `${CERT_DIR}/target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_NOTE =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_target.md`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `target_ref_value_object_domain_membership_predicate_signature_formation_constructor_basis_derivation_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `target_ref_value_object_domain_membership_predicate_signature_formation_constructor_basis_derivation_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const TARGET_NOTE_HASH =
  "ffa68fc915f16103d852c9241bf0c7d2b3c4cc4fffe5d29d1e19c7f2667b8e71";

const PARENT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-declaration-formation-rule-without-contract-link-definition-source-data-derivation-proof-attempt-fail-closed-formation-rule-target-present-definition-source-data-route-selected-proof-grade-formation-rule-absent-proof-grade-declarations-absent-no-primitive-declaration-acceptance-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-declaration-formation-constructor-basis-without-contract-link-definition-source-data-derivation-proof-attempt-fail-closed-constructor-basis-target-present-definition-source-data-route-selected-constructor-basis-absent-formation-rule-absent-proof-grade-declarations-absent-no-primitive-formation-rule-acceptance-no-row-consumption";

const SOURCE_FIELDS = [
  "parent_formation_rule_proof_attempt_input_present",
  "constructor_basis_target_note_input_present",
  "constructor_basis_target_hash_matches",
  "constructor_basis_target_obligations_stated",
  "parent_formation_rule_source_scope_ready",
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
  "constructor_basis_route_selected",
  "constructor_basis_source_scope_ready",
];

const CONSTRUCTOR_BASIS_FIELDS = [
  "predicate_symbol_constructor_basis_present",
  "argument_sort_constructor_basis_present",
  "judgment_codomain_constructor_basis_present",
  "endpoint_localization_rule_present",
  "constructor_basis_soundness_without_contract_link_present",
  "constructor_basis_derivation_from_definition_source_data_present",
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
  "target_note_accepted_as_constructor_basis",
  "source_equation_handle_accepted_as_constructor_basis",
  "endpoint_value_map_certification_accepted_as_constructor_basis",
  "payload_match_accepted_as_constructor_basis",
  "no_link_guard_accepted_as_constructor_basis",
  "primitive_formation_rule_acceptance_used",
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
  "target_ref_value_object_domain_constructor_present",
  "target_ref_value_object_domain_defined",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_FIELDS,
  ...CONSTRUCTOR_BASIS_FIELDS,
  ...FORMATION_RULE_FIELDS,
  ...DECLARATION_FIELDS,
  ...NON_ROUTE_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_constructor_basis_source_scope_ready",
  "receiver_constructor_basis_source_scope_ready",
  "combined_constructor_basis_source_scope_ready",
  "source_constructor_basis_present",
  "receiver_constructor_basis_present",
  "combined_constructor_basis_pair_present",
  "source_formation_rule_present",
  "receiver_formation_rule_present",
  "combined_formation_rule_pair_present",
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

const CONSTRUCTOR_BASIS_ROUTES = [
  {
    route_id: "target_note_convention_as_constructor_basis",
    status: "rejected-target-note-only",
    required_fields: [
      "constructor_basis_target_obligations_stated",
      "target_note_accepted_as_constructor_basis",
    ],
    limitation:
      "The target note names the constructor-basis obligations but does not construct the symbol or sorts.",
  },
  {
    route_id: "source_equation_handle_as_constructor_basis",
    status: "rejected-source-equation-only",
    required_fields: [
      "source_equation_only_guard_present",
      "source_equation_handle_accepted_as_constructor_basis",
    ],
    limitation:
      "Source-equation handles are source syntax, not constructors for predicate symbols or sorts.",
  },
  {
    route_id: "endpoint_value_map_certification_as_constructor_basis",
    status: "rejected-certification-only",
    required_fields: [
      "endpoint_value_map_only_guard_present",
      "endpoint_value_map_certification_accepted_as_constructor_basis",
    ],
    limitation:
      "Endpoint value-map certification attaches values; it does not construct a typed predicate signature.",
  },
  {
    route_id: "payload_match_as_constructor_basis",
    status: "rejected-payload-match-only",
    required_fields: [
      "value_map_ref_value_payload_matches_target_object",
      "payload_match_accepted_as_constructor_basis",
    ],
    limitation:
      "Payload matching records agreement; it does not construct a symbol, argument sort, or judgment codomain.",
  },
  {
    route_id: "no_link_guard_as_constructor_basis",
    status: "rejected-guard-only",
    required_fields: [
      "no_contract_link_independence_guard_declared",
      "no_link_guard_accepted_as_constructor_basis",
    ],
    limitation:
      "A no-link guard excludes a premise but is not constructor evidence.",
  },
  {
    route_id: "primitive_formation_rule_acceptance",
    status: "rejected-decision-required",
    required_fields: [
      "primitive_formation_rule_acceptance_used",
      ...FORMATION_RULE_FIELDS,
    ],
    limitation:
      "Accepting a formation rule as primitive would be a separate theory decision and is not used here.",
  },
  {
    route_id: "derive_constructor_basis_from_definition_source_data",
    status: "blocked",
    required_fields: CONSTRUCTOR_BASIS_FIELDS,
    limitation:
      "The source scope is present, but no proof-grade constructor basis, endpoint-localization rule, or soundness/derivation proof is present.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "predicate_symbol_constructor_basis",
    missing_field: "predicate_symbol_constructor_basis_present",
    required_evidence:
      "A proof-grade constructor for `is_target_ref_value_object_e` as an endpoint-local predicate symbol.",
  },
  {
    burden_id: "argument_sort_constructor_basis",
    missing_field: "argument_sort_constructor_basis_present",
    required_evidence:
      "A proof-grade constructor for `target_ref_value_object_argument_e` as the endpoint-local argument sort.",
  },
  {
    burden_id: "judgment_codomain_constructor_basis",
    missing_field: "judgment_codomain_constructor_basis_present",
    required_evidence:
      "A proof-grade constructor for `truth_value_judgment` as the judgment codomain.",
  },
  {
    burden_id: "endpoint_localization_rule",
    missing_field: "endpoint_localization_rule_present",
    required_evidence:
      "A proof that the constructed symbol and argument sort are localized to the endpoint functional.",
  },
  {
    burden_id: "constructor_basis_soundness_without_contract_link",
    missing_field: "constructor_basis_soundness_without_contract_link_present",
    required_evidence:
      "A proof that the constructor basis does not import `witness_object_has_contract_link`.",
  },
  {
    burden_id: "constructor_basis_derivation_from_definition_source_data",
    missing_field:
      "constructor_basis_derivation_from_definition_source_data_present",
    required_evidence:
      "A derivation of the constructor basis from preserved definition source data.",
  },
  {
    burden_id: "membership_predicate_signature_declaration_formation_rule",
    missing_field:
      "membership_predicate_signature_declaration_formation_rule_present",
    required_evidence:
      "A downstream proof-grade local formation rule derived from the constructor basis.",
  },
  {
    burden_id: "membership_predicate_signature_symbol",
    missing_field: "membership_predicate_signature_symbol_declared",
    required_evidence:
      "A downstream proof-grade declaration of `is_target_ref_value_object_e` as the endpoint-local predicate symbol.",
  },
  {
    burden_id: "membership_predicate_signature_domain_sort",
    missing_field: "membership_predicate_signature_domain_sort_declared",
    required_evidence:
      "A downstream proof-grade declaration of `target_ref_value_object_argument_e` as the domain sort.",
  },
  {
    burden_id: "membership_predicate_signature_codomain_sort",
    missing_field: "membership_predicate_signature_codomain_sort_declared",
    required_evidence:
      "A downstream proof-grade declaration of `truth_value_judgment` as the codomain sort.",
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-declaration-formation-constructor-basis-without-contract-link-definition-source-data-derivation-proof-attempt.mjs [options]",
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
    throw new Error("Refusing constructor-basis attempt from authorized parent packet.");
  }
}

function idMap(items, key, label) {
  if (!Array.isArray(items)) {
    throw new Error(`Missing ${label} items.`);
  }
  return new Map(
    items.map((item) => {
      if (!item[key]) {
        throw new Error(`Missing ${label} key ${key}.`);
      }
      return [item[key], item];
    })
  );
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
    obligations_present: CONSTRUCTOR_BASIS_FIELDS.every((field) =>
      text.includes(field)
    ),
  };
}

function sourceArtifacts(parentPath, targetNote, parent) {
  return [
    {
      label:
        "target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt",
      path: parentPath,
      basename: path.basename(parentPath),
      sha256: sha256File(parentPath),
    },
    {
      label:
        "target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_target",
      path: targetNote.path,
      basename: targetNote.basename,
      sha256: targetNote.sha256,
    },
    ...(parent.source_artifacts ?? []).map((artifact) => ({
      ...artifact,
      inherited_from:
        "target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt",
    })),
  ];
}

function buildEndpointAttempt(parentEndpoint, targetNote) {
  const parentFields = parentEndpoint.required_fields_present ?? {};
  const definitionSourceData = parentEndpoint.definition_source_data ?? {};
  const payload = parentEndpoint.target_ref_value_source_payload ?? {};

  const fields = {
    parent_formation_rule_proof_attempt_input_present: true,
    constructor_basis_target_note_input_present: true,
    constructor_basis_target_hash_matches: targetNote.hash_matches_expected,
    constructor_basis_target_obligations_stated: targetNote.obligations_present,
    parent_formation_rule_source_scope_ready:
      parentFields.formation_rule_source_scope_ready === true,
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
    formation_rule_route_selected:
      parentFields.formation_rule_route_selected === true,
    constructor_basis_route_selected: true,
    constructor_basis_source_scope_ready: false,
  };

  for (const field of [
    ...CONSTRUCTOR_BASIS_FIELDS,
    ...FORMATION_RULE_FIELDS,
    ...DECLARATION_FIELDS,
    ...NON_ROUTE_FIELDS,
    ...DOWNSTREAM_FIELDS,
  ]) {
    fields[field] = false;
  }

  fields.constructor_basis_source_scope_ready =
    SOURCE_FIELDS.filter((field) => field !== "constructor_basis_source_scope_ready")
      .every((field) => fields[field] === true) &&
    sourceEquationCount(definitionSourceData) > 0;

  const routeAttempts = CONSTRUCTOR_BASIS_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: parentEndpoint.id,
    endpoint_functional_id: parentEndpoint.endpoint_functional_id,
    role: parentEndpoint.role,
    target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempt_id:
      `target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempt:${parentEndpoint.id}`,
    parent_formation_rule_proof_attempt_id:
      parentEndpoint
        .target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    source_attempt_ids: parentEndpoint.source_attempt_ids ?? {},
    constructor_basis_target_note: {
      basename: targetNote.basename,
      sha256: targetNote.sha256,
      hash_matches_expected: targetNote.hash_matches_expected,
      obligations_present: targetNote.obligations_present,
      proof_status:
        "constructor-basis target only; not proof-grade constructor evidence",
    },
    constructor_basis_target: {
      target_id: `construct_target_ref_value_object_domain_membership_predicate_signature_basis_without_contract_link:${parentEndpoint.id}`,
      statement:
        "Construct endpoint-local predicate-symbol, argument-sort, and judgment-codomain bases from preserved definition source data without importing the contract-link premise.",
      accepted_if:
        "The endpoint has proof-grade constructor bases, endpoint localization, soundness without the contract-link premise, and derivation from definition source data.",
    },
    target_ref_value_source_payload: payload,
    definition_source_data: definitionSourceData,
    required_fields_present: fields,
    constructor_basis_route_attempts: routeAttempts,
    constructor_basis_routes_passed: [],
    missing_constructor_basis_obligations: missing(
      fields,
      CONSTRUCTOR_BASIS_FIELDS
    ),
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
      "The formation-rule source scope is present, but no proof-grade constructor basis, endpoint-localization rule, or constructor-basis soundness/derivation proof is present.",
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
    source_constructor_basis_source_scope_ready:
      sourceFields.constructor_basis_source_scope_ready,
    receiver_constructor_basis_source_scope_ready:
      receiverFields.constructor_basis_source_scope_ready,
    combined_constructor_basis_source_scope_ready: false,
    source_constructor_basis_present:
      sourceFields.predicate_symbol_constructor_basis_present &&
      sourceFields.argument_sort_constructor_basis_present &&
      sourceFields.judgment_codomain_constructor_basis_present,
    receiver_constructor_basis_present:
      receiverFields.predicate_symbol_constructor_basis_present &&
      receiverFields.argument_sort_constructor_basis_present &&
      receiverFields.judgment_codomain_constructor_basis_present,
    combined_constructor_basis_pair_present: false,
    source_formation_rule_present:
      sourceFields
        .membership_predicate_signature_declaration_formation_rule_present,
    receiver_formation_rule_present:
      receiverFields
        .membership_predicate_signature_declaration_formation_rule_present,
    combined_formation_rule_pair_present: false,
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

  fields.combined_constructor_basis_source_scope_ready =
    fields.row_locator_resolved &&
    fields.source_constructor_basis_source_scope_ready &&
    fields.receiver_constructor_basis_source_scope_ready;
  fields.combined_constructor_basis_pair_present =
    fields.source_constructor_basis_present &&
    fields.receiver_constructor_basis_present;
  fields.combined_formation_rule_pair_present =
    fields.source_formation_rule_present && fields.receiver_formation_rule_present;
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
    source_constructor_basis_proof_attempt_id:
      source
        .target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    receiver_constructor_basis_proof_attempt_id:
      receiver
        .target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver constructor-basis source scopes, but no paired constructor bases, formation rules, declarations, or signatures.",
  };
}

function buildPacket(parentPath, targetNote, parent) {
  assertParentPacket(parent);

  const parentEndpoints =
    parent
      .endpoint_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempts ??
    [];
  const parentRows =
    parent
      .row_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_rule_without_contract_link_definition_source_data_derivation_proof_attempts ??
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
      endpointCounts.parent_formation_rule_proof_attempt_input_present,
    constructor_basis_target_note_inputs:
      endpointCounts.constructor_basis_target_note_input_present,
    constructor_basis_target_hash_matches:
      endpointCounts.constructor_basis_target_hash_matches,
    constructor_basis_target_obligations_stated:
      endpointCounts.constructor_basis_target_obligations_stated,
    parent_formation_rule_source_scopes_ready:
      endpointCounts.parent_formation_rule_source_scope_ready,
    constructor_basis_source_scopes_ready:
      endpointCounts.constructor_basis_source_scope_ready,
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
    predicate_symbol_constructor_bases:
      endpointCounts.predicate_symbol_constructor_basis_present,
    argument_sort_constructor_bases:
      endpointCounts.argument_sort_constructor_basis_present,
    judgment_codomain_constructor_bases:
      endpointCounts.judgment_codomain_constructor_basis_present,
    endpoint_localization_rules: endpointCounts.endpoint_localization_rule_present,
    constructor_basis_soundness_proofs:
      endpointCounts.constructor_basis_soundness_without_contract_link_present,
    constructor_basis_derivations:
      endpointCounts
        .constructor_basis_derivation_from_definition_source_data_present,
    declaration_formation_rules:
      endpointCounts
        .membership_predicate_signature_declaration_formation_rule_present,
    membership_predicate_signature_symbols:
      endpointCounts.membership_predicate_signature_symbol_declared,
    membership_predicate_signature_domain_sorts:
      endpointCounts.membership_predicate_signature_domain_sort_declared,
    membership_predicate_signature_codomain_sorts:
      endpointCounts.membership_predicate_signature_codomain_sort_declared,
    primitive_formation_rule_acceptance_used:
      endpointCounts.primitive_formation_rule_acceptance_used,
    row_constructor_basis_source_scope_pairs:
      rowCounts.combined_constructor_basis_source_scope_ready,
    row_constructor_basis_pairs: rowCounts.combined_constructor_basis_pair_present,
    row_formation_rule_pairs: rowCounts.combined_formation_rule_pair_present,
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
      "breather-higher-fold-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-declaration-formation-constructor-basis-without-contract-link-definition-source-data-derivation-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; formation-rule parent and constructor-basis target are present, but proof-grade constructor bases, formation rules, declarations, and proof-grade signatures are absent",
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
        "target-ref-value-object-domain-membership-predicate-signature-declaration-formation-constructor-basis-without-contract-link-target",
      statement:
        "Construct endpoint-local predicate-symbol, argument-sort, and judgment-codomain bases from preserved definition source data without primitive formation-rule acceptance.",
      accepted_if:
        "Each endpoint has proof-grade constructor bases, endpoint localization, soundness without the contract-link premise, and derivation from definition source data.",
    },
    no_primitive_acceptance_rule:
      "Primitive formation-rule acceptance, primitive declaration acceptance, and primitive signature acceptance are not used.",
    no_promotion_rule:
      "Target notes, source-equation handles, endpoint value-map certifications, payload matches, no-link guards, and source scope are not promoted into proof-grade constructor bases, formation rules, or declarations.",
    proof_burdens: PROOF_BURDENS,
    constructor_basis_routes: CONSTRUCTOR_BASIS_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_field_counts: endpointCounts,
    row_field_counts: rowCounts,
    summary,
    endpoint_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempts:
      endpointAttempts,
    row_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempts:
      rowAttempts,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    row_closure: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock:
      "No row consumption, live ledger update, branch chart, topology recertification, or proof-interval replay is authorized by this constructor-basis proof attempt.",
    capture_decision:
      "Keep as priority-only proof-program sidecar. Do not promote to content/markdown/aaa until the constructor basis, formation rule, and remaining signature proof stack are discharged.",
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
  const routeRows = packet.constructor_basis_routes
    .map(
      (route) =>
        `| ${route.route_id} | ${route.status} | ${list(route.required_fields)} | ${route.limitation} |`
    )
    .join("\n");
  const endpointRows =
    packet.endpoint_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempts
      .map((endpoint) => {
        const fields = endpoint.required_fields_present;
        return `| ${endpoint.id} | ${endpoint.role} | ${fields.constructor_basis_source_scope_ready} | ${sourceEquationCount(endpoint.definition_source_data)} | ${valueBindingCount(endpoint.definition_source_data)} | ${fields.predicate_symbol_constructor_basis_present} | ${fields.argument_sort_constructor_basis_present} | ${fields.judgment_codomain_constructor_basis_present} | ${fields.membership_predicate_signature_declaration_formation_rule_present} | ${fields.membership_predicate_signature_symbol_declared} | ${fields.target_ref_value_object_domain_membership_predicate_signature_present} | ${list(endpoint.first_exact_blockers)} |`;
      })
      .join("\n");
  const rowRows =
    packet.row_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempts
      .map((row) => {
        const fields = row.required_fields_present;
        return `| ${row.row_id} | ${fields.combined_constructor_basis_source_scope_ready} | ${fields.combined_constructor_basis_pair_present} | ${fields.combined_formation_rule_pair_present} | ${fields.combined_signature_symbol_pair_declared} | ${fields.combined_signature_domain_sort_pair_declared} | ${fields.combined_signature_codomain_sort_pair_declared} | ${fields.combined_membership_predicate_signature_pair_present} | ${fields.row_consumed} |`;
      })
      .join("\n");
  const endpointFieldRows = Object.entries(packet.endpoint_field_counts)
    .map(([field, count]) => `| ${field} | ${count} / ${summary.endpoint_functionals} |`)
    .join("\n");
  const rowFieldRows = Object.entries(packet.row_field_counts)
    .map(([field, count]) => `| ${field} | ${count} / ${summary.residual_consumer_rows} |`)
    .join("\n");

  return `# Target Ref/Value Object-Domain Membership-Predicate Signature Declaration Formation Constructor Basis Without Contract Link Definition Source Data Derivation Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests whether preserved definition source data
contains a proof-grade constructor basis for the non-primitive formation rule
behind the packet-local convention
\`is_target_ref_value_object_e : target_ref_value_object_argument_e -> truth_value_judgment\`.

The attempt remains fail-closed. It records ${summary.parent_inputs} / ${summary.endpoint_functionals}
parent formation-rule proof-attempt inputs, ${summary.constructor_basis_target_note_inputs} / ${summary.endpoint_functionals}
constructor-basis target-note inputs, ${summary.constructor_basis_target_hash_matches} / ${summary.endpoint_functionals}
target-note hash matches, ${summary.constructor_basis_target_obligations_stated} / ${summary.endpoint_functionals}
constructor-basis obligations stated, ${summary.constructor_basis_source_scopes_ready} / ${summary.endpoint_functionals}
constructor-basis source scopes, ${summary.total_target_ref_value_source_equations} / ${summary.total_target_ref_value_source_equations}
target ref/value source equations, and ${summary.total_value_map_bindings}
value-map bindings.

It records ${summary.predicate_symbol_constructor_bases} / ${summary.endpoint_functionals}
predicate-symbol constructor bases, ${summary.argument_sort_constructor_bases} / ${summary.endpoint_functionals}
argument-sort constructor bases, ${summary.judgment_codomain_constructor_bases} / ${summary.endpoint_functionals}
judgment-codomain constructor bases, ${summary.endpoint_localization_rules} / ${summary.endpoint_functionals}
endpoint-localization rules, ${summary.constructor_basis_soundness_proofs} / ${summary.endpoint_functionals}
constructor-basis soundness proofs, ${summary.constructor_basis_derivations} / ${summary.endpoint_functionals}
constructor-basis derivations, ${summary.declaration_formation_rules} / ${summary.endpoint_functionals}
formation rules, ${summary.membership_predicate_signature_symbols} / ${summary.endpoint_functionals}
proof-grade predicate-symbol declarations, ${summary.membership_predicate_signature_domain_sorts} / ${summary.endpoint_functionals}
domain-sort declarations, ${summary.membership_predicate_signature_codomain_sorts} / ${summary.endpoint_functionals}
codomain-sort declarations, ${summary.primitive_formation_rule_acceptance_used} / ${summary.endpoint_functionals}
primitive formation-rule acceptances, ${summary.row_consumption_count}
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

## Tested Constructor-Basis Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeRows}

## Endpoint Attempts

| Endpoint | Role | Constructor-basis source scope | Source equations | Value bindings | Predicate-symbol constructor | Argument-sort constructor | Judgment-codomain constructor | Formation rule | Symbol declared | Signature | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointRows}

## Row Attempts

| Row | Constructor-basis source-scope pair | Constructor-basis pair | Formation-rule pair | Symbol pair | Domain-sort pair | Codomain-sort pair | Signature pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
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
  fs.mkdirSync(args.outDir, { recursive: true });

  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  const json = args.pretty
    ? JSON.stringify(packet, null, 2)
    : JSON.stringify(packet);
  fs.writeFileSync(jsonPath, `${json}\n`);
  fs.writeFileSync(reportPath, renderReport(packet));

  console.log(JSON.stringify({ jsonPath, reportPath, status: packet.status }));
}

main();

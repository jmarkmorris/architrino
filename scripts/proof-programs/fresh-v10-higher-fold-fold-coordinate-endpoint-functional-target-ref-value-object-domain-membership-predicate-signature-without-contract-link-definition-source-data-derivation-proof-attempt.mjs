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
  `${CERT_DIR}/fold_coordinate_endpoint_functional_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_NOTE =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_target.md`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const TARGET_NOTE_HASH =
  "4217bb3679edeb845f66da14ad67912aab9297093795797efddf67c6b1b389fe";

const PARENT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-source-equation-to-target-ref-value-object-domain-membership-predicate-signature-without-contract-link-proof-attempt-fail-closed-membership-predicate-source-scope-present-predicate-signature-absent-no-positive-membership-no-membership-predicate-no-domain-definition-no-primitive-signature-acceptance-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-without-contract-link-definition-source-data-derivation-proof-attempt-fail-closed-target-note-convention-present-definition-source-data-route-selected-proof-grade-signature-absent-no-primitive-signature-acceptance-no-row-consumption";

const SOURCE_FIELDS = [
  "parent_signature_proof_attempt_input_present",
  "candidate_signature_target_note_input_present",
  "candidate_signature_target_hash_matches",
  "target_note_candidate_symbol_sort_convention_stated",
  "parent_membership_predicate_signature_source_scope_ready",
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
  "primitive_signature_acceptance_not_used",
  "definition_source_data_derivation_route_selected",
  "target_note_as_signature_proof_rejected",
  "direct_source_renaming_rejected",
  "membership_predicate_signature_derivation_source_scope_ready",
];

const PROOF_GRADE_SIGNATURE_FIELDS = [
  "membership_predicate_signature_symbol_declared",
  "membership_predicate_signature_domain_sort_declared",
  "membership_predicate_signature_codomain_sort_declared",
  "target_ref_value_object_argument_sort_present",
  "source_equation_handle_non_argument_sort_present",
  "target_note_non_argument_sort_present",
  "payload_match_non_argument_sort_present",
  "endpoint_value_map_certification_non_argument_sort_present",
  "no_link_guard_non_argument_sort_present",
  "signature_no_contract_link_premise_absence_proven",
  "membership_predicate_signature_derivation_from_definition_source_data_present",
  "target_ref_value_object_domain_membership_predicate_signature_present",
];

const DOWNSTREAM_FIELDS = [
  "target_ref_value_object_positive_membership_clause_present",
  "source_equation_handle_nonmembership_clause_present",
  "target_note_nonmembership_clause_present",
  "payload_match_nonmembership_clause_present",
  "endpoint_value_map_certification_nonmembership_clause_present",
  "no_link_guard_nonmembership_clause_present",
  "membership_predicate_soundness_present",
  "membership_predicate_endpoint_application_present",
  "membership_predicate_derivation_from_definition_source_data_present",
  "target_ref_value_object_domain_membership_predicate_present",
  "target_ref_value_object_domain_constructor_present",
  "target_ref_value_object_domain_defined",
  "source_equation_to_target_ref_value_interpretation_rule_present",
  "target_ref_value_source_equation_promotion_definition_bridge_present",
  "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
  "independent_target_ref_value_equations_without_contract_link_proof_grade",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_FIELDS,
  ...PROOF_GRADE_SIGNATURE_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_membership_predicate_signature_derivation_source_scope_ready",
  "receiver_membership_predicate_signature_derivation_source_scope_ready",
  "combined_membership_predicate_signature_derivation_source_scope_ready",
  "source_membership_predicate_signature_present",
  "receiver_membership_predicate_signature_present",
  "combined_membership_predicate_signature_pair_present",
  "source_membership_predicate_present",
  "receiver_membership_predicate_present",
  "combined_membership_predicate_pair_present",
  "source_target_ref_value_object_domain_defined",
  "receiver_target_ref_value_object_domain_defined",
  "combined_target_ref_value_object_domain_pair_present",
  "source_ref_value_equations_proof_grade_without_contract_link",
  "receiver_ref_value_equations_proof_grade_without_contract_link",
  "combined_ref_value_equations_proof_grade_without_contract_link",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const DERIVATION_ROUTES = [
  {
    route_id: "target_note_convention_as_signature_proof",
    status: "rejected-target-note-only",
    required_fields: [
      "target_note_candidate_symbol_sort_convention_stated",
      "target_ref_value_object_domain_membership_predicate_signature_present",
    ],
    limitation:
      "The target note states a local convention; it does not prove the typed signature.",
  },
  {
    route_id: "source_equation_payload_as_signature_proof",
    status: "rejected-source-equation-only",
    required_fields: [
      "source_equation_only_guard_present",
      "source_equation_handle_non_argument_sort_present",
      "target_ref_value_object_domain_membership_predicate_signature_present",
    ],
    limitation:
      "Source-equation handles are source syntax and require a non-argument-sort exclusion proof before the signature can be accepted.",
  },
  {
    route_id: "endpoint_value_map_certification_as_signature_proof",
    status: "rejected-certification-only",
    required_fields: [
      "endpoint_value_map_only_guard_present",
      "endpoint_value_map_certification_non_argument_sort_present",
      "target_ref_value_object_domain_membership_predicate_signature_present",
    ],
    limitation:
      "Endpoint value-map certification attaches values; it is not an argument sort or a signature derivation.",
  },
  {
    route_id: "payload_match_as_signature_proof",
    status: "rejected-payload-match-only",
    required_fields: [
      "value_map_ref_value_payload_matches_target_object",
      "payload_match_non_argument_sort_present",
      "target_ref_value_object_domain_membership_predicate_signature_present",
    ],
    limitation:
      "Payload matching records agreement and still needs a non-argument-sort exclusion proof.",
  },
  {
    route_id: "no_link_guard_as_signature_proof",
    status: "rejected-guard-only",
    required_fields: [
      "no_contract_link_independence_guard_declared",
      "no_link_guard_non_argument_sort_present",
      "signature_no_contract_link_premise_absence_proven",
    ],
    limitation:
      "No-link guards exclude a prohibited premise but do not prove the signature or the premise absence proof.",
  },
  {
    route_id: "primitive_signature_acceptance",
    status: "rejected-decision-required",
    required_fields: [
      "primitive_signature_acceptance_not_used",
      "target_ref_value_object_domain_membership_predicate_signature_present",
    ],
    limitation:
      "Accepting the signature as primitive remains a separate theory decision and is not used here.",
  },
  {
    route_id: "derive_signature_from_definition_source_data",
    status: "blocked",
    required_fields: PROOF_GRADE_SIGNATURE_FIELDS,
    limitation:
      "The target note and source scope are present, but the proof-grade symbol declaration, sort declarations, argument-sort proof, non-argument-sort exclusions, no-link premise absence proof, derivation, and signature are absent.",
  },
];

const PROOF_BURDENS = [
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
      "A proof-grade declaration of `target_ref_value_object_argument_e` as the signature domain sort.",
  },
  {
    burden_id: "membership_predicate_signature_codomain_sort",
    missing_field: "membership_predicate_signature_codomain_sort_declared",
    required_evidence:
      "A proof-grade declaration of `truth_value_judgment` as the signature codomain sort.",
  },
  {
    burden_id: "target_ref_value_object_argument_sort",
    missing_field: "target_ref_value_object_argument_sort_present",
    required_evidence:
      "A rule identifying target ref/value boundary-binding objects as legitimate predicate arguments.",
  },
  {
    burden_id: "source_equation_handle_non_argument_sort",
    missing_field: "source_equation_handle_non_argument_sort_present",
    required_evidence:
      "A proof that source-equation handles are not arguments of the target membership predicate.",
  },
  {
    burden_id: "target_note_non_argument_sort",
    missing_field: "target_note_non_argument_sort_present",
    required_evidence:
      "A proof that target notes are not arguments of the target membership predicate.",
  },
  {
    burden_id: "payload_match_non_argument_sort",
    missing_field: "payload_match_non_argument_sort_present",
    required_evidence:
      "A proof that payload-match records are not arguments of the target membership predicate.",
  },
  {
    burden_id: "endpoint_value_map_certification_non_argument_sort",
    missing_field: "endpoint_value_map_certification_non_argument_sort_present",
    required_evidence:
      "A proof that endpoint value-map certifications are not arguments of the target membership predicate.",
  },
  {
    burden_id: "no_link_guard_non_argument_sort",
    missing_field: "no_link_guard_non_argument_sort_present",
    required_evidence:
      "A proof that no-link guards are not arguments of the target membership predicate.",
  },
  {
    burden_id: "signature_no_contract_link_premise_absence",
    missing_field: "signature_no_contract_link_premise_absence_proven",
    required_evidence:
      "A proof that the signature does not import `witness_object_has_contract_link`.",
  },
  {
    burden_id: "membership_predicate_signature_derivation",
    missing_field:
      "membership_predicate_signature_derivation_from_definition_source_data_present",
    required_evidence:
      "A derivation of the typed signature from preserved definition source data.",
  },
  {
    burden_id: "target_ref_value_object_domain_membership_predicate_signature",
    missing_field: "target_ref_value_object_domain_membership_predicate_signature_present",
    required_evidence:
      "The proof-grade target ref/value object-domain membership-predicate signature.",
  },
  {
    burden_id: "target_ref_value_object_positive_membership_clause",
    missing_field: "target_ref_value_object_positive_membership_clause_present",
    required_evidence:
      "A positive membership clause remains downstream of the typed signature.",
  },
  {
    burden_id: "target_ref_value_object_domain_membership_predicate",
    missing_field: "target_ref_value_object_domain_membership_predicate_present",
    required_evidence:
      "The full target ref/value object-domain membership predicate remains downstream of the signature.",
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-without-contract-link-definition-source-data-derivation-proof-attempt.mjs [options]",
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
    convention_present:
      text.includes("is_target_ref_value_object_e") &&
      text.includes("target_ref_value_object_argument_e") &&
      text.includes("truth_value_judgment"),
  };
}

function sourceArtifacts(parentPath, targetNote, parent) {
  return [
    {
      label:
        "target_ref_value_object_domain_membership_predicate_signature_without_contract_link_proof_attempt",
      path: parentPath,
      basename: path.basename(parentPath),
      sha256: sha256File(parentPath),
    },
    {
      label:
        "target_ref_value_object_domain_membership_predicate_signature_without_contract_link_target",
      path: targetNote.path,
      basename: targetNote.basename,
      sha256: targetNote.sha256,
    },
    ...(parent.source_artifacts ?? []).map((artifact) => ({
      ...artifact,
      inherited_from:
        "target_ref_value_object_domain_membership_predicate_signature_without_contract_link_proof_attempt",
    })),
  ];
}

function buildEndpointAttempt(parentEndpoint, targetNote) {
  const parentFields = parentEndpoint.required_fields_present ?? {};
  const definitionSourceData = parentEndpoint.definition_source_data ?? {};
  const payload = parentEndpoint.target_ref_value_source_payload ?? {};

  const fields = {
    parent_signature_proof_attempt_input_present: true,
    candidate_signature_target_note_input_present: true,
    candidate_signature_target_hash_matches: targetNote.hash_matches_expected,
    target_note_candidate_symbol_sort_convention_stated:
      targetNote.convention_present,
    parent_membership_predicate_signature_source_scope_ready:
      parentFields.membership_predicate_signature_source_scope_ready === true,
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
      valueBindingCount(definitionSourceData) ===
        (payload.value_binding_count ?? 0),
    value_map_ref_value_payload_matches_target_object:
      parentFields.value_map_ref_value_payload_matches_target_object === true,
    contract_link_premise_not_imported:
      parentFields.contract_link_premise_not_imported === true,
    no_contract_link_independence_guard_declared:
      parentFields.no_contract_link_independence_guard_declared === true,
    witness_object_has_contract_link_excluded:
      parentFields.witness_object_has_contract_link_excluded === true,
    primitive_signature_acceptance_not_used:
      parentFields.primitive_signature_acceptance_not_used === true,
    definition_source_data_derivation_route_selected: true,
    target_note_as_signature_proof_rejected: true,
    direct_source_renaming_rejected: true,
    membership_predicate_signature_derivation_source_scope_ready: false,
    membership_predicate_signature_symbol_declared: false,
    membership_predicate_signature_domain_sort_declared: false,
    membership_predicate_signature_codomain_sort_declared: false,
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
    source_equation_handle_nonmembership_clause_present: false,
    target_note_nonmembership_clause_present: false,
    payload_match_nonmembership_clause_present: false,
    endpoint_value_map_certification_nonmembership_clause_present: false,
    no_link_guard_nonmembership_clause_present: false,
    membership_predicate_soundness_present: false,
    membership_predicate_endpoint_application_present: false,
    membership_predicate_derivation_from_definition_source_data_present: false,
    target_ref_value_object_domain_membership_predicate_present: false,
    target_ref_value_object_domain_constructor_present: false,
    target_ref_value_object_domain_defined: false,
    source_equation_to_target_ref_value_interpretation_rule_present: false,
    target_ref_value_source_equation_promotion_definition_bridge_present: false,
    independent_target_ref_value_equation_promotion_rule_without_contract_link_present:
      false,
    independent_target_ref_value_equations_without_contract_link_proof_grade:
      false,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.membership_predicate_signature_derivation_source_scope_ready =
    SOURCE_FIELDS.filter(
      (field) =>
        field !== "membership_predicate_signature_derivation_source_scope_ready"
    ).every((field) => fields[field] === true);

  const routeAttempts = DERIVATION_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: parentEndpoint.id,
    endpoint_functional_id: parentEndpoint.endpoint_functional_id,
    role: parentEndpoint.role,
    target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempt_id:
      `target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempt:${parentEndpoint.id}`,
    parent_signature_proof_attempt_id:
      parentEndpoint
        .independent_target_ref_value_source_equation_to_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_proof_attempt_id,
    source_attempt_ids: parentEndpoint.source_attempt_ids ?? {},
    candidate_signature_target_note: {
      basename: targetNote.basename,
      sha256: targetNote.sha256,
      hash_matches_expected: targetNote.hash_matches_expected,
      convention: {
        predicate_symbol: "is_target_ref_value_object_e",
        domain_sort: "target_ref_value_object_argument_e",
        codomain_sort: "truth_value_judgment",
      },
      proof_status:
        "target-note convention only; not a proof-grade signature declaration",
    },
    derivation_target: {
      target_id: `derive_target_ref_value_object_domain_membership_predicate_signature_without_contract_link:${parentEndpoint.id}`,
      statement:
        "Derive the packet-local target ref/value object-domain membership-predicate signature from preserved definition source data without importing the contract-link premise.",
      accepted_if:
        "The endpoint has proof-grade symbol, domain-sort, and codomain-sort declarations; a target-object argument-sort proof; five non-argument-sort exclusion proofs; a no-contract-link premise absence proof; a derivation; and the typed signature.",
    },
    target_ref_value_source_payload: payload,
    definition_source_data: definitionSourceData,
    required_fields_present: fields,
    derivation_route_attempts: routeAttempts,
    derivation_routes_passed: [],
    missing_signature_derivation_obligations: missing(
      fields,
      PROOF_GRADE_SIGNATURE_FIELDS
    ),
    missing_downstream_obligations: missing(fields, DOWNSTREAM_FIELDS),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 12)
      .map((burden) => burden.missing_field),
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The target note and definition-source-data route are present, but no proof-grade symbol declaration, sort declaration, argument-sort proof, non-argument-sort exclusion, no-link premise absence proof, derivation, or signature is present.",
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
    source_membership_predicate_signature_derivation_source_scope_ready:
      sourceFields.membership_predicate_signature_derivation_source_scope_ready,
    receiver_membership_predicate_signature_derivation_source_scope_ready:
      receiverFields.membership_predicate_signature_derivation_source_scope_ready,
    combined_membership_predicate_signature_derivation_source_scope_ready:
      false,
    source_membership_predicate_signature_present:
      sourceFields.target_ref_value_object_domain_membership_predicate_signature_present,
    receiver_membership_predicate_signature_present:
      receiverFields.target_ref_value_object_domain_membership_predicate_signature_present,
    combined_membership_predicate_signature_pair_present: false,
    source_membership_predicate_present:
      sourceFields.target_ref_value_object_domain_membership_predicate_present,
    receiver_membership_predicate_present:
      receiverFields.target_ref_value_object_domain_membership_predicate_present,
    combined_membership_predicate_pair_present: false,
    source_target_ref_value_object_domain_defined:
      sourceFields.target_ref_value_object_domain_defined,
    receiver_target_ref_value_object_domain_defined:
      receiverFields.target_ref_value_object_domain_defined,
    combined_target_ref_value_object_domain_pair_present: false,
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

  fields.combined_membership_predicate_signature_derivation_source_scope_ready =
    fields.row_locator_resolved &&
    fields.source_membership_predicate_signature_derivation_source_scope_ready &&
    fields.receiver_membership_predicate_signature_derivation_source_scope_ready;
  fields.combined_membership_predicate_signature_pair_present =
    fields.source_membership_predicate_signature_present &&
    fields.receiver_membership_predicate_signature_present;
  fields.combined_membership_predicate_pair_present =
    fields.source_membership_predicate_present &&
    fields.receiver_membership_predicate_present;
  fields.combined_target_ref_value_object_domain_pair_present =
    fields.source_target_ref_value_object_domain_defined &&
    fields.receiver_target_ref_value_object_domain_defined;
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
    source_signature_derivation_proof_attempt_id:
      source
        .target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    receiver_signature_derivation_proof_attempt_id:
      receiver
        .target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver signature-derivation source scopes, but no source/receiver proof-grade signatures, membership predicates, object-domain definitions, or proof-grade ref/value equation pairs.",
  };
}

function buildPacket(parentPath, targetNote, parent) {
  assertParentPacket(parent);

  const parentEndpoints =
    parent
      .endpoint_independent_target_ref_value_source_equation_to_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_proof_attempts ??
    [];
  const parentRows =
    parent
      .row_independent_target_ref_value_source_equation_to_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_proof_attempts ??
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
    parent_inputs: endpointCounts.parent_signature_proof_attempt_input_present,
    candidate_signature_target_note_inputs:
      endpointCounts.candidate_signature_target_note_input_present,
    candidate_signature_target_hash_matches:
      endpointCounts.candidate_signature_target_hash_matches,
    candidate_symbol_sort_conventions_stated:
      endpointCounts.target_note_candidate_symbol_sort_convention_stated,
    parent_signature_source_scopes_ready:
      endpointCounts.parent_membership_predicate_signature_source_scope_ready,
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
    primitive_signature_acceptance_not_used:
      endpointCounts.primitive_signature_acceptance_not_used,
    definition_source_data_derivation_routes_selected:
      endpointCounts.definition_source_data_derivation_route_selected,
    target_note_as_signature_proof_rejected:
      endpointCounts.target_note_as_signature_proof_rejected,
    direct_source_renaming_rejected:
      endpointCounts.direct_source_renaming_rejected,
    membership_predicate_signature_derivation_source_scopes_ready:
      endpointCounts
        .membership_predicate_signature_derivation_source_scope_ready,
    total_target_ref_value_source_equations: endpointAttempts.reduce(
      (sum, endpoint) =>
        sum + sourceEquationCount(endpoint.definition_source_data ?? {}),
      0
    ),
    total_value_map_bindings: endpointAttempts.reduce(
      (sum, endpoint) => sum + valueBindingCount(endpoint.definition_source_data ?? {}),
      0
    ),
    membership_predicate_signature_symbols:
      endpointCounts.membership_predicate_signature_symbol_declared,
    membership_predicate_signature_domain_sorts:
      endpointCounts.membership_predicate_signature_domain_sort_declared,
    membership_predicate_signature_codomain_sorts:
      endpointCounts.membership_predicate_signature_codomain_sort_declared,
    target_ref_value_object_argument_sorts:
      endpointCounts.target_ref_value_object_argument_sort_present,
    source_equation_handle_non_argument_sorts:
      endpointCounts.source_equation_handle_non_argument_sort_present,
    target_note_non_argument_sorts:
      endpointCounts.target_note_non_argument_sort_present,
    payload_match_non_argument_sorts:
      endpointCounts.payload_match_non_argument_sort_present,
    endpoint_value_map_certification_non_argument_sorts:
      endpointCounts.endpoint_value_map_certification_non_argument_sort_present,
    no_link_guard_non_argument_sorts:
      endpointCounts.no_link_guard_non_argument_sort_present,
    signature_no_contract_link_premise_absence_proofs:
      endpointCounts.signature_no_contract_link_premise_absence_proven,
    membership_predicate_signature_derivations:
      endpointCounts
        .membership_predicate_signature_derivation_from_definition_source_data_present,
    target_ref_value_object_domain_membership_predicate_signatures:
      endpointCounts.target_ref_value_object_domain_membership_predicate_signature_present,
    target_ref_value_object_positive_membership_clauses:
      endpointCounts.target_ref_value_object_positive_membership_clause_present,
    target_ref_value_object_domain_membership_predicates:
      endpointCounts.target_ref_value_object_domain_membership_predicate_present,
    target_ref_value_object_domains_defined:
      endpointCounts.target_ref_value_object_domain_defined,
    proof_grade_target_ref_value_packages:
      endpointCounts
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    row_signature_derivation_source_scope_pairs:
      rowCounts
        .combined_membership_predicate_signature_derivation_source_scope_ready,
    row_membership_predicate_signature_pairs:
      rowCounts.combined_membership_predicate_signature_pair_present,
    row_membership_predicate_pairs:
      rowCounts.combined_membership_predicate_pair_present,
    row_domain_definition_pairs:
      rowCounts.combined_target_ref_value_object_domain_pair_present,
    row_ref_value_equation_pairs_proof_grade:
      rowCounts.combined_ref_value_equations_proof_grade_without_contract_link,
    rows_unblocked: rowCounts.row_unblocked,
    row_consumption_count: rowCounts.row_consumed,
    branch_chart_authorized: false,
  };

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-target-ref-value-object-domain-membership-predicate-signature-without-contract-link-definition-source-data-derivation-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; target-note convention and definition source scope are present, but the proof-grade signature stack is absent",
    source_artifacts: sourceArtifacts(parentPath, targetNote, parent),
    target_note: {
      path: targetNote.path,
      basename: targetNote.basename,
      sha256: targetNote.sha256,
      expected_sha256: TARGET_NOTE_HASH,
      hash_matches_expected: targetNote.hash_matches_expected,
      convention_present: targetNote.convention_present,
    },
    target: {
      target_id:
        "target-ref-value-object-domain-membership-predicate-signature-without-contract-link-definition-source-data-derivation-target",
      statement:
        "Derive the packet-local target ref/value object-domain membership-predicate signature from preserved definition source data without primitive signature acceptance.",
      accepted_if:
        "Each endpoint has a proof-grade predicate symbol, domain sort, codomain sort, target-object argument-sort rule, five non-argument-sort exclusion rules, no-contract-link premise absence proof, derivation, and typed signature.",
    },
    no_primitive_acceptance_rule:
      "Primitive signature acceptance is not used. The packet tests only whether definition source data derives the signature convention stated in the target note.",
    no_promotion_rule:
      "Target notes, source-equation handles, endpoint value-map certifications, payload matches, no-link guards, and source scope are not promoted into a proof-grade signature.",
    proof_burdens: PROOF_BURDENS,
    derivation_routes: DERIVATION_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_field_counts: endpointCounts,
    row_field_counts: rowCounts,
    summary,
    endpoint_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempts:
      endpointAttempts,
    row_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempts:
      rowAttempts,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    row_closure: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock:
      "No row consumption, live ledger update, branch chart, topology recertification, or proof-interval replay is authorized by this derivation proof attempt.",
    capture_decision:
      "Keep as priority-only proof-program sidecar. Do not promote to content/markdown/aaa until the signature is actually derived or primitive signature acceptance is explicitly selected after operator discussion.",
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
  const routeRows = packet.derivation_routes
    .map(
      (route) =>
        `| ${route.route_id} | ${route.status} | ${list(route.required_fields)} | ${route.limitation} |`
    )
    .join("\n");
  const endpointRows =
    packet.endpoint_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempts
      .map((endpoint) => {
        const fields = endpoint.required_fields_present;
        return `| ${endpoint.id} | ${endpoint.role} | ${fields.membership_predicate_signature_derivation_source_scope_ready} | ${sourceEquationCount(endpoint.definition_source_data)} | ${valueBindingCount(endpoint.definition_source_data)} | ${fields.membership_predicate_signature_symbol_declared} | ${fields.membership_predicate_signature_domain_sort_declared} | ${fields.membership_predicate_signature_codomain_sort_declared} | ${fields.target_ref_value_object_argument_sort_present} | ${fields.signature_no_contract_link_premise_absence_proven} | ${fields.membership_predicate_signature_derivation_from_definition_source_data_present} | ${fields.target_ref_value_object_domain_membership_predicate_signature_present} | ${list(endpoint.first_exact_blockers)} |`;
      })
      .join("\n");
  const rowRows =
    packet.row_target_ref_value_object_domain_membership_predicate_signature_without_contract_link_definition_source_data_derivation_proof_attempts
      .map((row) => {
        const fields = row.required_fields_present;
        return `| ${row.row_id} | ${fields.combined_membership_predicate_signature_derivation_source_scope_ready} | ${fields.combined_membership_predicate_signature_pair_present} | ${fields.combined_membership_predicate_pair_present} | ${fields.combined_target_ref_value_object_domain_pair_present} | ${fields.combined_ref_value_equations_proof_grade_without_contract_link} | ${fields.row_consumed} |`;
      })
      .join("\n");
  const endpointFieldRows = Object.entries(packet.endpoint_field_counts)
    .map(([field, count]) => `| ${field} | ${count} / ${summary.endpoint_functionals} |`)
    .join("\n");
  const rowFieldRows = Object.entries(packet.row_field_counts)
    .map(([field, count]) => `| ${field} | ${count} / ${summary.residual_consumer_rows} |`)
    .join("\n");

  return `# Target Ref/Value Object-Domain Membership-Predicate Signature Without Contract Link Definition Source Data Derivation Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests the definition-source-data route below the
target ref/value object-domain membership-predicate signature target note. It
imports the parent signature proof attempt and the target note convention
\`is_target_ref_value_object_e : target_ref_value_object_argument_e -> truth_value_judgment\`,
but it does not accept that convention as primitive proof evidence.

The attempt remains fail-closed. It records ${summary.parent_inputs} / ${summary.endpoint_functionals}
parent signature proof-attempt inputs, ${summary.candidate_signature_target_note_inputs} / ${summary.endpoint_functionals}
target-note inputs, ${summary.candidate_signature_target_hash_matches} / ${summary.endpoint_functionals}
target-note hash matches, ${summary.candidate_symbol_sort_conventions_stated} / ${summary.endpoint_functionals}
candidate symbol/sort conventions stated, ${summary.membership_predicate_signature_derivation_source_scopes_ready} / ${summary.endpoint_functionals}
signature-derivation source scopes, ${summary.total_target_ref_value_source_equations} / ${summary.total_target_ref_value_source_equations}
target ref/value source equations, and ${summary.total_value_map_bindings}
value-map bindings.

It records ${summary.membership_predicate_signature_symbols} / ${summary.endpoint_functionals}
proof-grade predicate symbols, ${summary.membership_predicate_signature_domain_sorts} / ${summary.endpoint_functionals}
domain sorts, ${summary.membership_predicate_signature_codomain_sorts} / ${summary.endpoint_functionals}
codomain sorts, ${summary.target_ref_value_object_argument_sorts} / ${summary.endpoint_functionals}
target-object argument-sort proofs, ${summary.source_equation_handle_non_argument_sorts} / ${summary.endpoint_functionals}
source-handle non-argument-sort proofs, ${summary.target_note_non_argument_sorts} / ${summary.endpoint_functionals}
target-note non-argument-sort proofs, ${summary.payload_match_non_argument_sorts} / ${summary.endpoint_functionals}
payload-match non-argument-sort proofs, ${summary.endpoint_value_map_certification_non_argument_sorts} / ${summary.endpoint_functionals}
endpoint-value-map-certification non-argument-sort proofs, ${summary.no_link_guard_non_argument_sorts} / ${summary.endpoint_functionals}
no-link-guard non-argument-sort proofs, ${summary.signature_no_contract_link_premise_absence_proofs} / ${summary.endpoint_functionals}
no-contract-link premise absence proofs, ${summary.membership_predicate_signature_derivations} / ${summary.endpoint_functionals}
signature derivations, ${summary.target_ref_value_object_domain_membership_predicate_signatures} / ${summary.endpoint_functionals}
proof-grade signatures, ${summary.target_ref_value_object_positive_membership_clauses} / ${summary.endpoint_functionals}
positive membership clauses, ${summary.target_ref_value_object_domain_membership_predicates} / ${summary.endpoint_functionals}
membership predicates, ${summary.row_consumption_count}
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

## Tested Derivation Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeRows}

## Endpoint Attempts

| Endpoint | Role | Source scope | Source equations | Value bindings | Predicate symbol | Domain sort | Codomain sort | Argument sort | No-link absence | Derivation | Signature | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointRows}

## Row Attempts

| Row | Derivation source-scope pair | Signature pair | Membership-predicate pair | Domain-definition pair | Ref/value proof-grade pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
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

function writeOutputs(packet, outDir, pretty) {
  fs.mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, OUTPUT_JSON);
  const reportPath = path.join(outDir, OUTPUT_REPORT);
  fs.writeFileSync(
    jsonPath,
    `${JSON.stringify(packet, null, pretty ? 2 : 0)}\n`
  );
  fs.writeFileSync(reportPath, renderReport(packet));
  return { jsonPath, reportPath };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  const targetNote = targetNoteInfo(args.targetNote);
  if (!targetNote.hash_matches_expected) {
    throw new Error(
      `target note hash mismatch: expected ${TARGET_NOTE_HASH}, got ${targetNote.sha256}`
    );
  }
  if (!targetNote.convention_present) {
    throw new Error("target note does not state the expected symbol/sort convention.");
  }
  const parent = readJson(args.parentPacket);
  const packet = buildPacket(args.parentPacket, targetNote, parent);
  const outputs = writeOutputs(packet, args.outDir, args.pretty);
  console.log(JSON.stringify({ status: packet.status, outputs }, null, 2));
}

main();

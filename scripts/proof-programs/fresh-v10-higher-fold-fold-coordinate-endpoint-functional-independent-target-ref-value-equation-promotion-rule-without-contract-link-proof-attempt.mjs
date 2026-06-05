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
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_equations_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_NOTE =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_target.md`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const PARENT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-equations-without-contract-link-proof-attempt-fail-closed-target-value-map-source-equations-present-proof-grade-target-ref-value-equations-absent-no-row-consumption";
const TARGET_NOTE_HASH =
  "60d4e68fa0be4de6603ed93e334882b083605616dd84421050c5caa88f61e69a";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-proof-attempt-fail-closed-target-present-source-inputs-present-rule-derivation-soundness-application-absent-no-row-consumption";

const SOURCE_FIELDS = [
  "parent_proof_attempt_input_present",
  "candidate_promotion_rule_target_note_input_present",
  "candidate_promotion_rule_target_hash_matches",
  "target_ref_value_equations_without_contract_link_source_inputs_ready",
  "target_endpoint_ref_value_source_equations_present",
  "target_endpoint_ref_value_source_equations_all_source_only",
  "value_map_source_equations_source_equation_only",
  "endpoint_value_map_proof_grade_status_endpoint_value_map_only",
  "endpoint_value_binding_map_ref_values_certified",
  "value_map_ref_value_payload_matches_target_object",
  "contract_link_premise_not_imported",
  "no_contract_link_independence_guard_declared",
  "candidate_rule_target_declared",
  "witness_object_has_contract_link_excluded",
  "primitive_rule_acceptance_not_used",
  "promotion_rule_target_source_inputs_ready",
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
  ...PROOF_FIELDS,
  ...DOWNSTREAM_LOCK_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_promotion_rule_target_source_inputs_ready",
  "receiver_promotion_rule_target_source_inputs_ready",
  "combined_promotion_rule_target_source_inputs_ready",
  "source_contract_link_premise_not_imported",
  "receiver_contract_link_premise_not_imported",
  "combined_contract_link_premise_not_imported",
  "source_promotion_rule_present",
  "receiver_promotion_rule_present",
  "combined_promotion_rule_pair_present",
  "source_derivation_present",
  "receiver_derivation_present",
  "combined_derivation_pair_present",
  "source_soundness_present",
  "receiver_soundness_present",
  "combined_soundness_pair_present",
  "source_endpoint_application_present",
  "receiver_endpoint_application_present",
  "combined_endpoint_application_pair_present",
  "source_ref_value_equations_proof_grade_without_contract_link",
  "receiver_ref_value_equations_proof_grade_without_contract_link",
  "combined_ref_value_equations_proof_grade_without_contract_link",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const PROMOTION_RULE_ROUTES = [
  {
    route_id: "candidate_target_note_as_present_promotion_rule",
    status: "rejected-target-note-only",
    required_fields: [
      "candidate_promotion_rule_target_note_input_present",
      "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
    ],
    limitation:
      "The target note states a rule target; it is not itself a proof-grade promotion rule.",
  },
  {
    route_id: "source_inputs_as_promotion_rule_derivation",
    status: "rejected-source-input-only",
    required_fields: [
      "promotion_rule_target_source_inputs_ready",
      "independent_target_ref_value_equation_derivation_without_contract_link_present",
    ],
    limitation:
      "Ready source inputs do not derive the promotion rule without a proof step.",
  },
  {
    route_id: "no_link_guards_as_soundness_proof",
    status: "rejected-guard-only",
    required_fields: [
      "contract_link_premise_not_imported",
      "no_contract_link_independence_guard_declared",
      "independent_target_ref_value_equation_soundness_without_contract_link_present",
    ],
    limitation:
      "Contract-link premise non-import guards and no-link independence guards declared are necessary guards, not soundness proofs.",
  },
  {
    route_id: "payload_match_as_endpoint_application",
    status: "rejected-payload-match-only",
    required_fields: [
      "value_map_ref_value_payload_matches_target_object",
      "independent_target_ref_value_equation_endpoint_application_without_contract_link_present",
    ],
    limitation:
      "Payload matching is not an endpoint application proof of the promotion rule.",
  },
  {
    route_id: "primitive_rule_acceptance",
    status: "rejected-decision-required",
    required_fields: [
      "primitive_rule_acceptance_not_used",
      "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
    ],
    limitation:
      "Accepting the promotion rule as a primitive rule would be an operator decision and is not used in this proof attempt.",
  },
  {
    route_id: "derivation_from_existing_source_data",
    status: "absent",
    required_fields: [
      "promotion_rule_target_source_inputs_ready",
      "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
      "independent_target_ref_value_equation_derivation_without_contract_link_present",
      "independent_target_ref_value_equation_soundness_without_contract_link_present",
      "independent_target_ref_value_equation_endpoint_application_without_contract_link_present",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    ],
    limitation:
      "No derivation from existing source data supplies the promotion rule, soundness proof, endpoint application proof, or proof-grade package.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "promotion_rule_statement_from_existing_source_data",
    missing_field:
      "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
    required_evidence:
      "A proof-grade rule statement derived from target objects, endpoint value maps, source-equation-only guards, endpoint-value-map-only guards, payload matches, and no-link guards.",
  },
  {
    burden_id: "promotion_rule_derivation_without_contract_link",
    missing_field:
      "independent_target_ref_value_equation_derivation_without_contract_link_present",
    required_evidence:
      "A derivation of the promotion rule that does not import `witness_object_has_contract_link` directly or through a selected route.",
  },
  {
    burden_id: "promotion_rule_soundness_without_contract_link",
    missing_field:
      "independent_target_ref_value_equation_soundness_without_contract_link_present",
    required_evidence:
      "A soundness proof that source equations and endpoint-value-map certifications are not renamed as proof-grade target ref/value equations.",
  },
  {
    burden_id: "promotion_rule_endpoint_application_without_contract_link",
    missing_field:
      "independent_target_ref_value_equation_endpoint_application_without_contract_link_present",
    required_evidence:
      "Endpoint-by-endpoint application proof for all four endpoint functionals.",
  },
  {
    burden_id: "proof_grade_target_ref_value_equations_without_contract_link",
    missing_field:
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    required_evidence:
      "A proof-grade target ref/value equation package produced only after the rule, derivation, soundness proof, and endpoint application proof are present.",
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-proof-attempt.mjs [options]",
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
    throw new Error("Refusing proof attempt from authorized parent packet.");
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

function buildEndpointAttempt(parentEndpoint, targetNoteHash) {
  const parentFields = parentEndpoint.required_fields_present ?? {};
  const sourcePayload = parentEndpoint.target_ref_value_source_payload ?? {};
  const targetHashMatches = targetNoteHash === TARGET_NOTE_HASH;

  const fields = {
    parent_proof_attempt_input_present: true,
    candidate_promotion_rule_target_note_input_present: true,
    candidate_promotion_rule_target_hash_matches: targetHashMatches,
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
    value_map_ref_value_payload_matches_target_object:
      parentFields.value_map_ref_value_payload_matches_target_object === true,
    contract_link_premise_not_imported:
      parentFields.contract_link_premise_not_imported === true,
    no_contract_link_independence_guard_declared:
      parentFields.no_contract_link_independence_guard_declared === true,
    candidate_rule_target_declared: targetHashMatches,
    witness_object_has_contract_link_excluded:
      parentFields.contract_link_premise_not_imported === true,
    primitive_rule_acceptance_not_used: true,
    promotion_rule_target_source_inputs_ready: false,
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

  fields.promotion_rule_target_source_inputs_ready = SOURCE_FIELDS.filter(
    (field) => field !== "promotion_rule_target_source_inputs_ready"
  ).every((field) => fields[field] === true);

  const routeAttempts = PROMOTION_RULE_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: parentEndpoint.id,
    endpoint_functional_id: parentEndpoint.endpoint_functional_id,
    role: parentEndpoint.role,
    independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt_id:
      `independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt:${parentEndpoint.id}`,
    source_attempt_ids: {
      independent_target_ref_value_equations_without_contract_link:
        parentEndpoint
          .independent_target_ref_value_equations_without_contract_link_proof_attempt_id,
      candidate_promotion_rule_target:
        "fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_target",
    },
    target: {
      target_id: `independent_target_ref_value_equation_promotion_rule_without_contract_link:${parentEndpoint.id}`,
      statement:
        "Derive the independent target ref/value equation promotion rule without importing `witness_object_has_contract_link`.",
      accepted_if:
        "The endpoint has a derived rule statement, no-link derivation, soundness proof, endpoint application proof, and proof-grade target ref/value equation package.",
      prohibited_premises: [
        "witness_object_has_contract_link",
        "witness_object_contract_link_constructed",
        "actual contract-link rule application",
        "primitive rule acceptance without operator decision",
        "compatibility proof promotion",
        "target-satisfaction proof promotion",
        "row consumption",
        "branch-chart authorization",
      ],
    },
    target_ref_value_source_payload: sourcePayload,
    required_fields_present: fields,
    promotion_rule_route_attempts: routeAttempts,
    promotion_rule_routes_passed: [],
    missing_promotion_rule_obligations: missing(fields, PROOF_FIELDS),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens.map(
      (burden) => burden.missing_field
    ),
    independent_target_ref_value_equation_promotion_rule_without_contract_link_present:
      fields
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_present,
    independent_target_ref_value_equations_without_contract_link_proof_grade:
      fields
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has the candidate target note and source-input bundle, but no derived promotion rule, derivation, soundness proof, endpoint application proof, or proof-grade target ref/value equation package.",
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
    source_promotion_rule_target_source_inputs_ready:
      sourceFields.promotion_rule_target_source_inputs_ready,
    receiver_promotion_rule_target_source_inputs_ready:
      receiverFields.promotion_rule_target_source_inputs_ready,
    combined_promotion_rule_target_source_inputs_ready: false,
    source_contract_link_premise_not_imported:
      sourceFields.contract_link_premise_not_imported,
    receiver_contract_link_premise_not_imported:
      receiverFields.contract_link_premise_not_imported,
    combined_contract_link_premise_not_imported: false,
    source_promotion_rule_present:
      sourceFields
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_present,
    receiver_promotion_rule_present:
      receiverFields
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_present,
    combined_promotion_rule_pair_present: false,
    source_derivation_present:
      sourceFields
        .independent_target_ref_value_equation_derivation_without_contract_link_present,
    receiver_derivation_present:
      receiverFields
        .independent_target_ref_value_equation_derivation_without_contract_link_present,
    combined_derivation_pair_present: false,
    source_soundness_present:
      sourceFields
        .independent_target_ref_value_equation_soundness_without_contract_link_present,
    receiver_soundness_present:
      receiverFields
        .independent_target_ref_value_equation_soundness_without_contract_link_present,
    combined_soundness_pair_present: false,
    source_endpoint_application_present:
      sourceFields
        .independent_target_ref_value_equation_endpoint_application_without_contract_link_present,
    receiver_endpoint_application_present:
      receiverFields
        .independent_target_ref_value_equation_endpoint_application_without_contract_link_present,
    combined_endpoint_application_pair_present: false,
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

  fields.combined_promotion_rule_target_source_inputs_ready =
    fields.source_promotion_rule_target_source_inputs_ready &&
    fields.receiver_promotion_rule_target_source_inputs_ready;
  fields.combined_contract_link_premise_not_imported =
    fields.source_contract_link_premise_not_imported &&
    fields.receiver_contract_link_premise_not_imported;
  fields.combined_promotion_rule_pair_present =
    fields.source_promotion_rule_present && fields.receiver_promotion_rule_present;
  fields.combined_derivation_pair_present =
    fields.source_derivation_present && fields.receiver_derivation_present;
  fields.combined_soundness_pair_present =
    fields.source_soundness_present && fields.receiver_soundness_present;
  fields.combined_endpoint_application_pair_present =
    fields.source_endpoint_application_present &&
    fields.receiver_endpoint_application_present;
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
    source_promotion_rule_proof_attempt_id:
      source
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt_id,
    receiver_promotion_rule_proof_attempt_id:
      receiver
        .independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver promotion-rule target inputs, but no source/receiver promotion-rule pair, derivation pair, soundness pair, endpoint application pair, or proof-grade ref/value equation pair.",
  };
}

function buildPacket(parent, sourcePaths) {
  assertParentPacket(parent);

  const targetNoteHash = sha256File(sourcePaths.targetNote);
  if (targetNoteHash !== TARGET_NOTE_HASH) {
    throw new Error(
      `target note hash mismatch: expected ${TARGET_NOTE_HASH}, got ${targetNoteHash}`
    );
  }

  const endpointAttempts =
    parent.endpoint_independent_target_ref_value_equations_without_contract_link_proof_attempts.map(
      (endpoint) => buildEndpointAttempt(endpoint, targetNoteHash)
    );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "independent target ref/value equation promotion-rule endpoint"
  );
  const rowAttempts =
    parent.row_independent_target_ref_value_equations_without_contract_link_proof_attempts.map(
      (row) => buildRowAttempt(row, endpointMap)
    );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);
  const totalTargetObjectRefValues = endpointAttempts.reduce(
    (sum, endpoint) =>
      sum +
      (endpoint.target_ref_value_source_payload
        .target_object_endpoint_ref_value_count ?? 0),
    0
  );
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

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; candidate promotion-rule target and source inputs are present, but no promotion rule, derivation, soundness proof, endpoint application proof, or proof-grade target ref/value package is present",
    source_artifacts: makeSourceArtifacts([
      {
        label:
          "independent_target_ref_value_equations_without_contract_link_proof_attempt",
        filePath: sourcePaths.parent,
      },
      {
        label:
          "independent_target_ref_value_equation_promotion_rule_without_contract_link_target",
        filePath: sourcePaths.targetNote,
      },
    ]),
    target: {
      target_id:
        "independent-target-ref-value-equation-promotion-rule-without-contract-link-proof-attempt-target",
      statement:
        "Derive the independent target ref/value equation promotion rule without importing `witness_object_has_contract_link`.",
      accepted_if:
        "Each endpoint has a derived promotion-rule statement, no-link derivation, soundness proof, endpoint application proof, and proof-grade target ref/value equation package.",
      target_note_hash: targetNoteHash,
    },
    no_primitive_acceptance_rule:
      "The candidate target note is an obligation record only. It is not a proof-grade promotion rule, and this attempt does not accept the rule as a primitive.",
    no_promotion_rule:
      "Target endpoint refs/values, source equations, endpoint-value-map certifications, payload matches, and no-link guards are not promoted into proof-grade target ref/value equations without a derived promotion rule, derivation, soundness proof, and endpoint application proof.",
    proof_burdens: PROOF_BURDENS,
    promotion_rule_routes: PROMOTION_RULE_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempts:
      endpointAttempts,
    row_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempts:
      rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      candidate_promotion_rule_target_note_inputs:
        endpointFieldCounts.candidate_promotion_rule_target_note_input_present,
      candidate_promotion_rule_target_hash_matches:
        endpointFieldCounts.candidate_promotion_rule_target_hash_matches,
      source_inputs_ready:
        endpointFieldCounts
          .target_ref_value_equations_without_contract_link_source_inputs_ready,
      source_equation_sets_present:
        endpointFieldCounts.target_endpoint_ref_value_source_equations_present,
      source_equation_only_guards:
        endpointFieldCounts.target_endpoint_ref_value_source_equations_all_source_only,
      value_map_source_equation_only_guards:
        endpointFieldCounts.value_map_source_equations_source_equation_only,
      endpoint_value_map_only_guards:
        endpointFieldCounts
          .endpoint_value_map_proof_grade_status_endpoint_value_map_only,
      value_map_ref_value_certifications:
        endpointFieldCounts.endpoint_value_binding_map_ref_values_certified,
      payload_matches:
        endpointFieldCounts.value_map_ref_value_payload_matches_target_object,
      contract_link_premise_not_imported:
        endpointFieldCounts.contract_link_premise_not_imported,
      no_link_independence_guards_declared:
        endpointFieldCounts.no_contract_link_independence_guard_declared,
      candidate_rule_targets_declared:
        endpointFieldCounts.candidate_rule_target_declared,
      primitive_rule_acceptance_not_used:
        endpointFieldCounts.primitive_rule_acceptance_not_used,
      promotion_rule_target_source_inputs_ready:
        endpointFieldCounts.promotion_rule_target_source_inputs_ready,
      total_target_object_ref_values: totalTargetObjectRefValues,
      total_target_ref_value_source_equations: totalSourceEquations,
      total_value_map_bindings: totalValueBindings,
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
      target_satisfaction_proofs:
        endpointFieldCounts
          .independent_contract_target_satisfaction_without_contract_link_proof_present,
      endpoint_boundary_binding_ref_compatibility_proofs:
        endpointFieldCounts
          .independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present,
      first_primitive_compatibility_proofs:
        endpointFieldCounts
          .independent_first_primitive_compatibility_without_contract_link_present,
      row_target_input_pairs_ready:
        rowFieldCounts.combined_promotion_rule_target_source_inputs_ready,
      row_contract_link_non_import_pairs:
        rowFieldCounts.combined_contract_link_premise_not_imported,
      row_promotion_rule_pairs_present:
        rowFieldCounts.combined_promotion_rule_pair_present,
      row_derivation_pairs_present:
        rowFieldCounts.combined_derivation_pair_present,
      row_soundness_pairs_present:
        rowFieldCounts.combined_soundness_pair_present,
      row_endpoint_application_pairs_present:
        rowFieldCounts.combined_endpoint_application_pair_present,
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
        "No endpoint supplies a derived promotion rule, derivation, soundness proof, endpoint application proof, or proof-grade target ref/value equation package.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed independent target-ref/value-equation-promotion-rule-without-contract-link proof attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.promotion_rule_target_source_inputs_ready} | ${fields.contract_link_premise_not_imported} | ${fields.primitive_rule_acceptance_not_used} | ${payload.source_equation_count ?? 0} | ${payload.value_binding_count ?? 0} | ${fields.value_map_ref_value_payload_matches_target_object} | ${fields.independent_target_ref_value_equation_promotion_rule_without_contract_link_present} | ${fields.independent_target_ref_value_equation_derivation_without_contract_link_present} | ${fields.independent_target_ref_value_equation_soundness_without_contract_link_present} | ${fields.independent_target_ref_value_equation_endpoint_application_without_contract_link_present} | ${fields.independent_target_ref_value_equations_without_contract_link_proof_grade} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_promotion_rule_target_source_inputs_ready} | ${fields.combined_contract_link_premise_not_imported} | ${fields.combined_promotion_rule_pair_present} | ${fields.combined_derivation_pair_present} | ${fields.combined_soundness_pair_present} | ${fields.combined_endpoint_application_pair_present} | ${fields.combined_ref_value_equations_proof_grade_without_contract_link} | ${row.row_consumed} |`;
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
  return `# Independent Target Ref/Value Equation Promotion Rule Without Contract Link Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests whether the candidate promotion-rule target can
be discharged by deriving a promotion rule from existing source data. It imports
the independent target ref/value equations without contract link proof attempt
and the promotion-rule target note. It is not a primitive-rule acceptance,
target-satisfaction, compatibility, binding-contract, row-consumption, or
branch-chart packet.

The attempt remains fail-closed. It records ${summary.candidate_promotion_rule_target_note_inputs} / ${summary.endpoint_functionals}
promotion-rule target-note inputs, ${summary.candidate_promotion_rule_target_hash_matches} / ${summary.endpoint_functionals}
target-note hash matches, ${summary.source_inputs_ready} / ${summary.endpoint_functionals}
target ref/value source-input bundles, ${summary.source_equation_sets_present} / ${summary.endpoint_functionals}
source-equation sets, ${summary.source_equation_only_guards} / ${summary.endpoint_functionals}
source-equation-only guards, ${summary.endpoint_value_map_only_guards} / ${summary.endpoint_functionals}
endpoint-value-map-only guards, ${summary.payload_matches} / ${summary.endpoint_functionals}
value-map payload matches, ${summary.contract_link_premise_not_imported} / ${summary.endpoint_functionals}
contract-link premise non-import guards, and ${summary.no_link_independence_guards_declared} / ${summary.endpoint_functionals}
no-link independence guards declared. The source bundle covers ${summary.total_target_ref_value_source_equations} / ${summary.total_target_object_ref_values}
target ref/value source equations and ${summary.total_value_map_bindings}
value-map bindings.

It records ${summary.promotion_rules_present} / ${summary.endpoint_functionals}
promotion rules, ${summary.derivations_present} / ${summary.endpoint_functionals}
derivations, ${summary.soundness_proofs_present} / ${summary.endpoint_functionals}
soundness proofs, ${summary.endpoint_application_proofs_present} / ${summary.endpoint_functionals}
endpoint application proofs, ${summary.proof_grade_target_ref_value_packages} / ${summary.endpoint_functionals}
proof-grade target ref/value equation packages, ${summary.target_satisfaction_proofs} / ${summary.endpoint_functionals}
target-satisfaction proofs, ${summary.endpoint_boundary_binding_ref_compatibility_proofs} / ${summary.endpoint_functionals}
endpoint-boundary-binding ref compatibility proofs, ${summary.first_primitive_compatibility_proofs} / ${summary.endpoint_functionals}
first-primitive compatibility proofs, ${summary.row_consumption_count} consumed rows, and
\`branch_chart_authorized=false\`.

Primitive-rule acceptance is explicitly not used: ${summary.primitive_rule_acceptance_not_used} / ${summary.endpoint_functionals}
endpoints keep \`primitive_rule_acceptance_not_used=true\`.

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

## Tested Promotion Rule Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.promotion_rule_routes)}

## Endpoint Attempts

| Endpoint | Role | Source inputs ready | Link not imported | Primitive acceptance not used | Source equations | Value bindings | Payload matches | Rule | Derivation | Soundness | Endpoint application | Proof-grade package | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempts)}

## Row Attempts

| Row | Target input pair | Link guard pair | Promotion rule pair | Derivation pair | Soundness pair | Endpoint application pair | Ref/value proof-grade pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempts)}

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
  const packet = buildPacket(parent, {
    parent: args.parentPacket,
    targetNote: args.targetNote,
  });

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

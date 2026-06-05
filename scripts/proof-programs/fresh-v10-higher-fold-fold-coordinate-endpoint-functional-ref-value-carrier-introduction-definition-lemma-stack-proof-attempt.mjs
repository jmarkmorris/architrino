#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_SCHEMA_LEMMA_PROOF_ATTEMPT_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_inference_schema_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_definition_lemma_stack_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_definition_lemma_stack_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SCHEMA_LEMMA_PROOF_ATTEMPT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-schema-lemma-proof-attempt-fail-closed-targets-and-source-scopes-present-proof-evidence-absent-no-row-consumption";
const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-definition-lemma-stack-proof-attempt-fail-closed-definition-source-scopes-and-lemma-targets-present-definition-lemma-derivations-absent-no-primitive-rule-acceptance-no-row-consumption";

const SOURCE_SCOPE_FIELDS = [
  "schema_lemma_proof_attempt_present",
  "definition_lemma_stack_target_present",
  "definition_route_selected",
  "primitive_rule_acceptance_rejected",
  "definition_source_scope_ready",
  "ref_contract_root_ready",
  "value_map_contract_root_ready",
  "joint_same_witness_carrier_pair_rule_root_ready",
  "direct_source_promotion_rejected",
  "carrier_admission_route_selected",
  "admissibility_lemma_target_declared",
  "membership_preservation_lemma_target_declared",
  "source_handle_non_promotion_lemma_target_declared",
  "same_witness_pairing_lemma_target_declared",
  "soundness_lemma_target_declared",
  "endpoint_instantiation_lemma_target_declared",
];

const DEFINITION_LEMMA_FIELDS = [
  "non_domain_carrier_admissibility_derivation_from_definitions_present",
  "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
  "source_handle_non_promotion_derivation_from_definitions_present",
  "ref_contract_to_carrier_lemma_derivation_from_definitions_present",
  "value_map_contract_to_carrier_lemma_derivation_from_definitions_present",
  "same_witness_carrier_pairing_derivation_from_definitions_present",
  "inference_schema_soundness_derivation_from_definitions_present",
  "endpoint_instantiation_derivation_from_definitions_present",
  "definition_lemma_stack_complete",
];

const DOWNSTREAM_FIELDS = [
  "primitive_rule_accepted",
  "schema_family_derivable_from_existing_definitions",
  "carrier_introduction_inference_rule_schema_present",
  "inference_rule_schema_bundle_present",
  "ref_contract_to_ref_carrier_rule_derivation_present",
  "value_map_contract_to_value_map_carrier_rule_derivation_present",
  "joint_same_witness_carrier_pair_rule_derivation_present",
  "derivation_bundle_present",
  "ref_value_non_domain_carrier_pair_constructed",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_SCOPE_FIELDS,
  ...DEFINITION_LEMMA_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_definition_source_scope_ready",
  "receiver_definition_source_scope_ready",
  "combined_definition_source_scope_ready",
  "source_definition_lemma_stack_complete",
  "receiver_definition_lemma_stack_complete",
  "combined_definition_lemma_stack_complete",
  "source_schema_family_derivable_from_existing_definitions",
  "receiver_schema_family_derivable_from_existing_definitions",
  "combined_schema_family_derivable_from_existing_definitions",
  "source_derivation_bundle_present",
  "receiver_derivation_bundle_present",
  "combined_derivation_bundle_present",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CANDIDATE_DEFINITION_LEMMA_STACK = [
  {
    lemma_id: "L_adm",
    target:
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
    premises: [
      "definition_source_scope_ready",
      "carrier_admission_route_selected",
      "direct_source_promotion_rejected",
    ],
    statement:
      "A constructed ref or value-map carrier field is admissible as a non-domain witness-object field only when the carrier-admission definition supplies the field object and the direct source handle remains non-promoting.",
  },
  {
    lemma_id: "L_pres",
    target:
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
    premises: [
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
      "carrier_admission_route_selected",
      "direct_source_promotion_rejected",
    ],
    statement:
      "Carrier introduction preserves non-domain carrier membership rather than converting source adjacency or matching endpoint ids into field membership.",
  },
  {
    lemma_id: "L_np",
    target: "source_handle_non_promotion_derivation_from_definitions_present",
    premises: [
      "direct_source_promotion_rejected",
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
    ],
    statement:
      "Endpoint-boundary-binding refs and endpoint value maps remain source handles until a proof-grade carrier field and membership derivation exist.",
  },
  {
    lemma_id: "L_ref",
    target:
      "ref_contract_to_carrier_lemma_derivation_from_definitions_present",
    premises: [
      "ref_contract_root_ready",
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
      "source_handle_non_promotion_derivation_from_definitions_present",
    ],
    statement:
      "A ready endpoint-boundary-binding ref contract root derives the ref carrier-introduction lemma only after admissibility, membership preservation, and source-handle non-promotion are proved.",
  },
  {
    lemma_id: "L_val",
    target:
      "value_map_contract_to_carrier_lemma_derivation_from_definitions_present",
    premises: [
      "value_map_contract_root_ready",
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
      "source_handle_non_promotion_derivation_from_definitions_present",
    ],
    statement:
      "A ready endpoint value-binding map contract root derives the value-map carrier-introduction lemma only after admissibility, membership preservation, and source-handle non-promotion are proved.",
  },
  {
    lemma_id: "L_pair",
    target:
      "same_witness_carrier_pairing_derivation_from_definitions_present",
    premises: [
      "joint_same_witness_carrier_pair_rule_root_ready",
      "ref_contract_to_carrier_lemma_derivation_from_definitions_present",
      "value_map_contract_to_carrier_lemma_derivation_from_definitions_present",
    ],
    statement:
      "The ref carrier and value-map carrier form one same-witness carrier pair only when the two carrier derivations land in the same constructed witness object.",
  },
  {
    lemma_id: "L_sound",
    target:
      "inference_schema_soundness_derivation_from_definitions_present",
    premises: [
      "ref_contract_to_carrier_lemma_derivation_from_definitions_present",
      "value_map_contract_to_carrier_lemma_derivation_from_definitions_present",
      "same_witness_carrier_pairing_derivation_from_definitions_present",
    ],
    statement:
      "The `S_ref`, `S_val`, and `S_pair` candidate schemata are sound only after the contract-to-carrier and same-witness pairing lemmas are proved from definitions.",
  },
  {
    lemma_id: "L_inst",
    target: "endpoint_instantiation_derivation_from_definitions_present",
    premises: [
      "definition_source_scope_ready",
      "inference_schema_soundness_derivation_from_definitions_present",
    ],
    statement:
      "Each of the four endpoint functionals instantiates the sound definition-derived lemma stack endpoint-by-endpoint.",
  },
];

const PROOF_BURDENS = [
  "L_ref",
  "L_val",
  "L_adm",
  "L_pres",
  "L_np",
  "L_pair",
  "L_sound",
  "L_inst",
].map((lemmaId) => {
  const lemma = CANDIDATE_DEFINITION_LEMMA_STACK.find(
    (candidate) => candidate.lemma_id === lemmaId
  );
  return {
    burden_id: lemma.lemma_id,
    missing_field: lemma.target,
    required_evidence: lemma.statement,
  };
});

PROOF_BURDENS.push({
  burden_id: "definition_lemma_stack_discharge",
  missing_field: "definition_lemma_stack_complete",
  required_evidence:
    "All admissibility, preservation, non-promotion, ref/value contract-to-carrier, same-witness pairing, soundness, and endpoint-instantiation derivations present together.",
});

const PROOF_ROUTES = [
  {
    route_id: "source_scope_as_definition_lemma_route",
    status: "rejected-source-only",
    required_fields: [
      "definition_source_scope_ready",
      "definition_lemma_stack_complete",
    ],
    limitation:
      "Ready definition source scope states the available premises; it is not proof of any definition lemma.",
  },
  {
    route_id: "carrier_admission_route_as_admissibility_proof",
    status: "selected-but-blocked-not-proof",
    required_fields: [
      "carrier_admission_route_selected",
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
    ],
    limitation:
      "The selected carrier-admission route is a route choice, not an admissibility or membership-preservation proof.",
  },
  {
    route_id: "non_promotion_policy_as_lemma_route",
    status: "rejected-policy-only",
    required_fields: [
      "direct_source_promotion_rejected",
      "source_handle_non_promotion_derivation_from_definitions_present",
    ],
    limitation:
      "The route decision rejects direct source-handle promotion, but a source-handle non-promotion lemma is still absent.",
  },
  {
    route_id: "same_witness_root_as_pairing_lemma_route",
    status: "rejected-root-only",
    required_fields: [
      "joint_same_witness_carrier_pair_rule_root_ready",
      "same_witness_carrier_pairing_derivation_from_definitions_present",
    ],
    limitation:
      "The joint same-witness carrier-pair rule root is a target root, not proof that two carrier fields occupy one constructed witness object.",
  },
  {
    route_id: "derive_definition_lemma_stack_from_existing_definitions_route",
    status: "blocked",
    required_fields: [
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
      "source_handle_non_promotion_derivation_from_definitions_present",
      "ref_contract_to_carrier_lemma_derivation_from_definitions_present",
      "value_map_contract_to_carrier_lemma_derivation_from_definitions_present",
      "same_witness_carrier_pairing_derivation_from_definitions_present",
      "inference_schema_soundness_derivation_from_definitions_present",
      "endpoint_instantiation_derivation_from_definitions_present",
    ],
    limitation:
      "No definition-derived lemma proof evidence is present in the current packet stack.",
  },
  {
    route_id: "schema_family_after_definition_lemma_stack_route",
    status: "blocked-downstream",
    required_fields: [
      "definition_lemma_stack_complete",
      "schema_family_derivable_from_existing_definitions",
      "derivation_bundle_present",
    ],
    limitation:
      "Schema-family derivability and derivation bundles remain downstream of the missing definition lemma stack.",
  },
];

function parseArgs(argv) {
  const args = {
    schemaLemmaProofAttemptPacket: DEFAULT_SCHEMA_LEMMA_PROOF_ATTEMPT_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema-lemma-proof-attempt-packet") {
      args.schemaLemmaProofAttemptPacket = argv[++index];
    } else if (arg === "--proof-attempt-packet") {
      args.schemaLemmaProofAttemptPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-definition-lemma-stack-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --schema-lemma-proof-attempt-packet <path>",
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

function artifactRecord(filePath) {
  return {
    path: filePath,
    basename: path.basename(filePath),
    sha256: sha256File(filePath),
  };
}

function assertPacket(packet, status, label) {
  if (packet.status !== status) {
    throw new Error(`Unexpected ${label} status: ${packet.status}`);
  }
}

function idMap(items, key, label) {
  const map = new Map();
  for (const item of items) {
    const id = item[key];
    if (typeof id !== "string" || id.length === 0) {
      throw new Error(`Missing ${label} id`);
    }
    if (map.has(id)) {
      throw new Error(`Duplicate ${label} id: ${id}`);
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

function buildEndpointAudit(endpoint) {
  const sourceFields = endpoint.required_fields_present ?? {};
  const fields = {
    schema_lemma_proof_attempt_present: true,
    definition_lemma_stack_target_present: true,
    definition_route_selected: true,
    primitive_rule_acceptance_rejected: true,
    definition_source_scope_ready:
      sourceFields.definition_source_scope_ready === true,
    ref_contract_root_ready: sourceFields.ref_contract_root_ready === true,
    value_map_contract_root_ready:
      sourceFields.value_map_contract_root_ready === true,
    joint_same_witness_carrier_pair_rule_root_ready:
      sourceFields.joint_same_witness_carrier_pair_rule_root_ready === true,
    direct_source_promotion_rejected:
      sourceFields.direct_source_promotion_rejected === true,
    carrier_admission_route_selected:
      sourceFields.carrier_admission_route_selected === true,
    admissibility_lemma_target_declared: true,
    membership_preservation_lemma_target_declared: true,
    source_handle_non_promotion_lemma_target_declared: true,
    same_witness_pairing_lemma_target_declared: true,
    soundness_lemma_target_declared: true,
    endpoint_instantiation_lemma_target_declared: true,
    non_domain_carrier_admissibility_derivation_from_definitions_present:
      sourceFields
        .non_domain_carrier_admissibility_derivation_from_definitions_present ===
      true,
    non_domain_carrier_membership_preservation_derivation_from_definitions_present:
      sourceFields
        .non_domain_carrier_membership_preservation_derivation_from_definitions_present ===
      true,
    source_handle_non_promotion_derivation_from_definitions_present:
      sourceFields.source_handle_non_promotion_derivation_from_definitions_present ===
      true,
    ref_contract_to_carrier_lemma_derivation_from_definitions_present:
      sourceFields
        .ref_contract_to_carrier_lemma_derivation_from_definitions_present ===
      true,
    value_map_contract_to_carrier_lemma_derivation_from_definitions_present:
      sourceFields
        .value_map_contract_to_carrier_lemma_derivation_from_definitions_present ===
      true,
    same_witness_carrier_pairing_derivation_from_definitions_present:
      sourceFields
        .same_witness_carrier_pairing_derivation_from_definitions_present ===
      true,
    inference_schema_soundness_derivation_from_definitions_present:
      sourceFields
        .inference_schema_soundness_derivation_from_definitions_present ===
      true,
    endpoint_instantiation_derivation_from_definitions_present:
      sourceFields
        .endpoint_instantiation_derivation_from_definitions_present === true,
    definition_lemma_stack_complete: false,
    primitive_rule_accepted: false,
    schema_family_derivable_from_existing_definitions:
      sourceFields.schema_family_derivable_from_existing_definitions === true,
    carrier_introduction_inference_rule_schema_present:
      sourceFields.carrier_introduction_inference_rule_schema_present === true,
    inference_rule_schema_bundle_present:
      sourceFields.inference_rule_schema_bundle_present === true,
    ref_contract_to_ref_carrier_rule_derivation_present:
      sourceFields.ref_contract_to_ref_carrier_rule_derivation_present === true,
    value_map_contract_to_value_map_carrier_rule_derivation_present:
      sourceFields
        .value_map_contract_to_value_map_carrier_rule_derivation_present ===
      true,
    joint_same_witness_carrier_pair_rule_derivation_present:
      sourceFields.joint_same_witness_carrier_pair_rule_derivation_present ===
      true,
    derivation_bundle_present: sourceFields.derivation_bundle_present === true,
    ref_value_non_domain_carrier_pair_constructed:
      sourceFields.ref_value_non_domain_carrier_pair_constructed === true,
    row_consumption_authorized:
      sourceFields.row_consumption_authorized === true,
    branch_chart_authorized: sourceFields.branch_chart_authorized === true,
  };

  fields.definition_lemma_stack_complete =
    fields.non_domain_carrier_admissibility_derivation_from_definitions_present &&
    fields
      .non_domain_carrier_membership_preservation_derivation_from_definitions_present &&
    fields.source_handle_non_promotion_derivation_from_definitions_present &&
    fields.ref_contract_to_carrier_lemma_derivation_from_definitions_present &&
    fields.value_map_contract_to_carrier_lemma_derivation_from_definitions_present &&
    fields.same_witness_carrier_pairing_derivation_from_definitions_present &&
    fields.inference_schema_soundness_derivation_from_definitions_present &&
    fields.endpoint_instantiation_derivation_from_definitions_present;

  const routeAttempts = PROOF_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    definition_lemma_stack_proof_attempt_id:
      `carrier_introduction_definition_lemma_stack_proof_attempt:${endpoint.id}`,
    source_schema_lemma_proof_attempt_id:
      endpoint.schema_lemma_proof_attempt_id,
    candidate_definition_lemma_stack: CANDIDATE_DEFINITION_LEMMA_STACK,
    route_attempts: routeAttempts,
    routes_passed: routeAttempts
      .filter((route) => route.passed)
      .map((route) => route.route_id),
    required_fields_present: fields,
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blocker:
      missingProofBurdens[0]?.missing_field ?? "none",
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "Definition source scope is ready, but no admissibility, membership-preservation, source-handle non-promotion, ref/value contract-to-carrier, same-witness pairing, soundness, or endpoint-instantiation derivation is present.",
  };
}

function buildRowAudit(row, endpointMap) {
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
    source_definition_source_scope_ready:
      sourceFields.definition_source_scope_ready,
    receiver_definition_source_scope_ready:
      receiverFields.definition_source_scope_ready,
    combined_definition_source_scope_ready: false,
    source_definition_lemma_stack_complete:
      sourceFields.definition_lemma_stack_complete,
    receiver_definition_lemma_stack_complete:
      receiverFields.definition_lemma_stack_complete,
    combined_definition_lemma_stack_complete: false,
    source_schema_family_derivable_from_existing_definitions:
      sourceFields.schema_family_derivable_from_existing_definitions,
    receiver_schema_family_derivable_from_existing_definitions:
      receiverFields.schema_family_derivable_from_existing_definitions,
    combined_schema_family_derivable_from_existing_definitions: false,
    source_derivation_bundle_present: sourceFields.derivation_bundle_present,
    receiver_derivation_bundle_present:
      receiverFields.derivation_bundle_present,
    combined_derivation_bundle_present: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_definition_source_scope_ready =
    fields.source_definition_source_scope_ready &&
    fields.receiver_definition_source_scope_ready;
  fields.combined_definition_lemma_stack_complete =
    fields.source_definition_lemma_stack_complete &&
    fields.receiver_definition_lemma_stack_complete;
  fields.combined_schema_family_derivable_from_existing_definitions =
    fields.source_schema_family_derivable_from_existing_definitions &&
    fields.receiver_schema_family_derivable_from_existing_definitions;
  fields.combined_derivation_bundle_present =
    fields.source_derivation_bundle_present &&
    fields.receiver_derivation_bundle_present;

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_definition_lemma_stack_proof_attempt_id:
      source.definition_lemma_stack_proof_attempt_id,
    receiver_definition_lemma_stack_proof_attempt_id:
      receiver.definition_lemma_stack_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver definition source scope, but neither endpoint completes the definition lemma stack or a downstream derivation bundle.",
  };
}

function buildPacket(schemaLemmaProofAttempt, schemaLemmaProofAttemptPath) {
  assertPacket(
    schemaLemmaProofAttempt,
    SCHEMA_LEMMA_PROOF_ATTEMPT_STATUS,
    "schema lemma proof attempt"
  );

  const endpointSource =
    schemaLemmaProofAttempt
      .endpoint_ref_value_carrier_introduction_inference_schema_lemma_proof_attempts;
  const rowSource =
    schemaLemmaProofAttempt
      .row_ref_value_carrier_introduction_inference_schema_lemma_proof_attempts;
  const endpointAudits = endpointSource.map(buildEndpointAudit);
  const endpointMap = idMap(
    endpointAudits,
    "id",
    "definition lemma stack proof attempt endpoint"
  );
  const rowAudits = rowSource.map((row) => buildRowAudit(row, endpointMap));
  const endpointFieldCounts = fieldCounts(endpointAudits, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAudits, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-definition-lemma-stack-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; definition source scopes are present but definition-derived lemma proofs are absent",
    source_artifacts: [
      {
        label:
          "ref_value_carrier_introduction_inference_schema_lemma_proof_attempt",
        ...artifactRecord(schemaLemmaProofAttemptPath),
      },
      ...schemaLemmaProofAttempt.source_artifacts.map((source) => ({
        label: source.label.startsWith("inherited_")
          ? source.label
          : `inherited_${source.label}`,
        path: source.path,
        basename: source.basename,
        sha256: source.sha256,
      })),
    ],
    candidate_definition_lemma_stack: CANDIDATE_DEFINITION_LEMMA_STACK,
    proof_attempt_target: {
      target_id:
        "ref-value-carrier-introduction-definition-lemma-stack-proof-attempt",
      selected_route: "derive_definition_lemma_stack_from_existing_definitions",
      out_of_scope_route: "primitive_rule_acceptance_route",
      statement:
        "Attempt to prove the definition-level lemma stack needed before `S_ref`, `S_val`, and `S_pair` can be derived from existing witness-object and carrier-admission definitions.",
      accepted_as_first_blocker_discharge_if:
        "Every endpoint has definition-derived admissibility, membership-preservation, source-handle non-promotion, ref contract-to-carrier, value-map contract-to-carrier, same-witness pairing, soundness, and endpoint-instantiation derivations.",
      first_exact_blocker:
        "ref_contract_to_carrier_lemma_derivation_from_definitions_present, value_map_contract_to_carrier_lemma_derivation_from_definitions_present, non_domain_carrier_admissibility_derivation_from_definitions_present, non_domain_carrier_membership_preservation_derivation_from_definitions_present, source_handle_non_promotion_derivation_from_definitions_present, and same_witness_carrier_pairing_derivation_from_definitions_present",
    },
    primitive_rule_policy:
      "Primitive acceptance of a carrier-introduction rule, schema, or carrier pair is out of scope for this proof attempt.",
    proof_burdens: PROOF_BURDENS,
    proof_routes: PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_ref_value_carrier_introduction_definition_lemma_stack_proof_attempts:
      endpointAudits,
    row_ref_value_carrier_introduction_definition_lemma_stack_proof_attempts:
      rowAudits,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAudits.length,
      residual_consumer_rows: rowAudits.length,
      schema_lemma_proof_attempts_present:
        endpointFieldCounts.schema_lemma_proof_attempt_present,
      definition_lemma_stack_targets_present:
        endpointFieldCounts.definition_lemma_stack_target_present,
      definition_routes_selected: endpointFieldCounts.definition_route_selected,
      primitive_rule_acceptance_routes_rejected:
        endpointFieldCounts.primitive_rule_acceptance_rejected,
      definition_source_scopes_ready:
        endpointFieldCounts.definition_source_scope_ready,
      ref_contract_roots_ready: endpointFieldCounts.ref_contract_root_ready,
      value_map_contract_roots_ready:
        endpointFieldCounts.value_map_contract_root_ready,
      joint_same_witness_carrier_pair_rule_roots_ready:
        endpointFieldCounts.joint_same_witness_carrier_pair_rule_root_ready,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      carrier_admission_routes_selected:
        endpointFieldCounts.carrier_admission_route_selected,
      non_domain_carrier_admissibility_derivations_from_definitions_present:
        endpointFieldCounts
          .non_domain_carrier_admissibility_derivation_from_definitions_present,
      non_domain_carrier_membership_preservation_derivations_from_definitions_present:
        endpointFieldCounts
          .non_domain_carrier_membership_preservation_derivation_from_definitions_present,
      source_handle_non_promotion_derivations_from_definitions_present:
        endpointFieldCounts
          .source_handle_non_promotion_derivation_from_definitions_present,
      ref_contract_to_carrier_lemma_derivations_from_definitions_present:
        endpointFieldCounts
          .ref_contract_to_carrier_lemma_derivation_from_definitions_present,
      value_map_contract_to_carrier_lemma_derivations_from_definitions_present:
        endpointFieldCounts
          .value_map_contract_to_carrier_lemma_derivation_from_definitions_present,
      same_witness_carrier_pairing_derivations_from_definitions_present:
        endpointFieldCounts
          .same_witness_carrier_pairing_derivation_from_definitions_present,
      inference_schema_soundness_derivations_from_definitions_present:
        endpointFieldCounts
          .inference_schema_soundness_derivation_from_definitions_present,
      endpoint_instantiation_derivations_from_definitions_present:
        endpointFieldCounts
          .endpoint_instantiation_derivation_from_definitions_present,
      definition_lemma_stacks_complete:
        endpointFieldCounts.definition_lemma_stack_complete,
      primitive_rules_accepted: endpointFieldCounts.primitive_rule_accepted,
      schema_families_derivable_from_existing_definitions:
        endpointFieldCounts.schema_family_derivable_from_existing_definitions,
      derivation_bundles_present:
        endpointFieldCounts.derivation_bundle_present,
      ref_value_non_domain_carrier_pairs_constructed:
        endpointFieldCounts.ref_value_non_domain_carrier_pair_constructed,
      row_definition_source_scope_pairs_ready:
        rowFieldCounts.combined_definition_source_scope_ready,
      row_definition_lemma_stack_pairs_complete:
        rowFieldCounts.combined_definition_lemma_stack_complete,
      row_schema_family_derivable_pairs:
        rowFieldCounts.combined_schema_family_derivable_from_existing_definitions,
      row_derivation_bundle_pairs_present:
        rowFieldCounts.combined_derivation_bundle_present,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint has the definition-derived admissibility, preservation, non-promotion, ref/value contract-to-carrier, same-witness pairing, soundness, or endpoint-instantiation lemma stack.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed carrier-introduction definition-lemma stack proof attempt and does not promote to reader-facing corpus prose.",
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

function lemmaTable(lemmas) {
  return lemmas
    .map(
      (lemma) =>
        `| ${lemma.lemma_id} | ${lemma.target} | ${lemma.premises.join(", ")} | ${lemma.statement} |`
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.definition_source_scope_ready} | ${fields.non_domain_carrier_admissibility_derivation_from_definitions_present} | ${fields.non_domain_carrier_membership_preservation_derivation_from_definitions_present} | ${fields.source_handle_non_promotion_derivation_from_definitions_present} | ${fields.ref_contract_to_carrier_lemma_derivation_from_definitions_present} | ${fields.value_map_contract_to_carrier_lemma_derivation_from_definitions_present} | ${fields.same_witness_carrier_pairing_derivation_from_definitions_present} | ${fields.inference_schema_soundness_derivation_from_definitions_present} | ${fields.endpoint_instantiation_derivation_from_definitions_present} | ${fields.definition_lemma_stack_complete} | ${endpoint.first_exact_blocker} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_definition_source_scope_ready} | ${fields.combined_definition_lemma_stack_complete} | ${fields.combined_schema_family_derivable_from_existing_definitions} | ${fields.combined_derivation_bundle_present} | ${row.row_consumed} |`;
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
  return `# Ref/Value Carrier-Introduction Definition-Lemma Stack Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet attempts the definition-level lemma stack beneath the
candidate ` + "`S_ref`" + `, ` + "`S_val`" + `, and ` + "`S_pair`" + `
carrier-introduction inference schemata. It keeps primitive-rule acceptance,
schema-family acceptance, derivation bundles, row consumption, and branch-chart
authorization out of scope.

The proof attempt remains fail-closed. It records ${summary.definition_source_scopes_ready} / ${summary.endpoint_functionals}
definition source scopes, ${summary.direct_source_promotion_routes_rejected} / ${summary.endpoint_functionals}
direct source-promotion rejections, and ${summary.carrier_admission_routes_selected} / ${summary.endpoint_functionals}
selected carrier-admission routes. It records ${summary.non_domain_carrier_admissibility_derivations_from_definitions_present} / ${summary.endpoint_functionals}
admissibility derivations, ${summary.non_domain_carrier_membership_preservation_derivations_from_definitions_present} / ${summary.endpoint_functionals}
membership-preservation derivations, ${summary.source_handle_non_promotion_derivations_from_definitions_present} / ${summary.endpoint_functionals}
source-handle non-promotion derivations, ${summary.ref_contract_to_carrier_lemma_derivations_from_definitions_present} / ${summary.endpoint_functionals}
ref contract-to-carrier lemma derivations, ${summary.value_map_contract_to_carrier_lemma_derivations_from_definitions_present} / ${summary.endpoint_functionals}
value-map contract-to-carrier lemma derivations, ${summary.same_witness_carrier_pairing_derivations_from_definitions_present} / ${summary.endpoint_functionals}
same-witness carrier-pairing derivations, ${summary.inference_schema_soundness_derivations_from_definitions_present} / ${summary.endpoint_functionals}
soundness derivations, and ${summary.endpoint_instantiation_derivations_from_definitions_present} / ${summary.endpoint_functionals}
endpoint-instantiation derivations. It consumes ${summary.row_consumption_count}
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Proof Attempt Target

${packet.proof_attempt_target.statement}

Accepted as blocker discharge if: ${packet.proof_attempt_target.accepted_as_first_blocker_discharge_if}

First exact blockers: ${packet.proof_attempt_target.first_exact_blocker}

## Primitive-Rule Policy

${packet.primitive_rule_policy}

## Candidate Definition Lemma Stack

| Lemma | Target field | Premises | Statement |
| --- | --- | --- | --- |
${lemmaTable(packet.candidate_definition_lemma_stack)}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.proof_routes)}

## Endpoint Audits

| Endpoint | Role | Definition scope | Admissibility | Preservation | Non-promotion | Ref lemma | Value lemma | Same-witness | Soundness | Instantiation | Stack complete | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_ref_value_carrier_introduction_definition_lemma_stack_proof_attempts)}

## Row Audits

| Row | Definition scope pair | Lemma stack pair | Schema derivable pair | Derivation bundle pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_ref_value_carrier_introduction_definition_lemma_stack_proof_attempts)}

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

  const schemaLemmaProofAttempt = readJson(args.schemaLemmaProofAttemptPacket);
  const packet = buildPacket(
    schemaLemmaProofAttempt,
    args.schemaLemmaProofAttemptPacket
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
  console.log(`status ${STATUS}`);
}

main();

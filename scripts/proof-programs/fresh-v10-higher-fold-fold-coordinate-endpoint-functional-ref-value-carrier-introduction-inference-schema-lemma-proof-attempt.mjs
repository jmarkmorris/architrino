#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_SCHEMA_AUDIT_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_inference_rule_schema_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_SCHEMA_LEMMA_TARGET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_inference_schema_lemma_target.md`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_inference_schema_lemma_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_inference_schema_lemma_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SCHEMA_AUDIT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-rule-schema-audit-fail-closed-contract-roots-and-derivation-targets-present-inference-schema-admissibility-preservation-and-same-witness-lemmas-absent-no-row-consumption";
const SCHEMA_LEMMA_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-schema-lemma-target-fail-closed-candidate-schema-family-stated-proof-burdens-separated-no-row-consumption";
const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-schema-lemma-proof-attempt-fail-closed-targets-and-source-scopes-present-proof-evidence-absent-no-row-consumption";

const CANDIDATE_SCHEMA_FAMILY = [
  {
    schema_id: "S_ref",
    source_target: "ref_contract_to_ref_carrier_introduction_schema",
    premises: [
      "ref_contract_root_ready",
      "carrier_admission_route_selected",
      "direct_source_promotion_rejected",
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
      "source_handle_non_promotion_derivation_from_definitions_present",
      "endpoint_instantiation_derivation_from_definitions_present",
    ],
    conclusion: "ref_contract_to_ref_carrier_rule_derivation_present",
    first_required_lemma:
      "ref_contract_to_carrier_lemma_derivation_from_definitions_present",
  },
  {
    schema_id: "S_val",
    source_target: "value_map_contract_to_value_map_carrier_introduction_schema",
    premises: [
      "value_map_contract_root_ready",
      "carrier_admission_route_selected",
      "direct_source_promotion_rejected",
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
      "source_handle_non_promotion_derivation_from_definitions_present",
      "endpoint_instantiation_derivation_from_definitions_present",
    ],
    conclusion: "value_map_contract_to_value_map_carrier_rule_derivation_present",
    first_required_lemma:
      "value_map_contract_to_carrier_lemma_derivation_from_definitions_present",
  },
  {
    schema_id: "S_pair",
    source_target: "joint_same_witness_carrier_pairing_schema",
    premises: [
      "joint_same_witness_carrier_pair_rule_root_ready",
      "ref_contract_to_ref_carrier_rule_derivation_present",
      "value_map_contract_to_value_map_carrier_rule_derivation_present",
      "same_witness_carrier_pairing_derivation_from_definitions_present",
      "inference_schema_soundness_derivation_from_definitions_present",
    ],
    conclusion: "joint_same_witness_carrier_pair_rule_derivation_present",
    first_required_lemma:
      "same_witness_carrier_pairing_derivation_from_definitions_present",
  },
];

const SOURCE_SCOPE_FIELDS = [
  "schema_lemma_target_present",
  "definition_route_selected",
  "primitive_rule_acceptance_rejected",
  "ref_contract_root_ready",
  "value_map_contract_root_ready",
  "joint_same_witness_carrier_pair_rule_root_ready",
  "source_derivation_premise_set_ready",
  "direct_source_promotion_rejected",
  "carrier_admission_route_selected",
  "derivation_targets_declared",
  "inference_schema_source_scope_ready",
  "definition_source_scope_ready",
];

const DEFINITION_DERIVATION_FIELDS = [
  "ref_contract_to_carrier_lemma_derivation_from_definitions_present",
  "value_map_contract_to_carrier_lemma_derivation_from_definitions_present",
  "same_witness_carrier_pairing_derivation_from_definitions_present",
  "non_domain_carrier_admissibility_derivation_from_definitions_present",
  "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
  "source_handle_non_promotion_derivation_from_definitions_present",
  "inference_schema_soundness_derivation_from_definitions_present",
  "endpoint_instantiation_derivation_from_definitions_present",
  "schema_family_derivable_from_existing_definitions",
];

const DOWNSTREAM_FIELDS = [
  "carrier_introduction_inference_rule_schema_present",
  "ref_contract_to_carrier_inference_schema_present",
  "value_map_contract_to_carrier_inference_schema_present",
  "joint_same_witness_pairing_schema_present",
  "inference_rule_schema_bundle_present",
  "ref_contract_to_ref_carrier_rule_derivation_present",
  "value_map_contract_to_value_map_carrier_rule_derivation_present",
  "joint_same_witness_carrier_pair_rule_derivation_present",
  "derivation_bundle_present",
  "ref_carrier_introduction_rule_available",
  "value_map_carrier_introduction_rule_available",
  "ref_value_non_domain_carrier_pair_constructed",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_SCOPE_FIELDS,
  ...DEFINITION_DERIVATION_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_definition_source_scope_ready",
  "receiver_definition_source_scope_ready",
  "combined_definition_source_scope_ready",
  "source_schema_family_derivable_from_existing_definitions",
  "receiver_schema_family_derivable_from_existing_definitions",
  "combined_schema_family_derivable_from_existing_definitions",
  "source_inference_rule_schema_bundle_present",
  "receiver_inference_rule_schema_bundle_present",
  "combined_inference_rule_schema_bundle_present",
  "source_derivation_bundle_present",
  "receiver_derivation_bundle_present",
  "combined_derivation_bundle_present",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const PROOF_BURDENS = [
  {
    burden_id: "ref_contract_to_carrier_lemma_derivation",
    missing_field:
      "ref_contract_to_carrier_lemma_derivation_from_definitions_present",
    required_evidence:
      "A proof from existing definitions that derives `S_ref` from a ready endpoint-boundary-binding ref contract root without promoting the source handle.",
  },
  {
    burden_id: "value_map_contract_to_carrier_lemma_derivation",
    missing_field:
      "value_map_contract_to_carrier_lemma_derivation_from_definitions_present",
    required_evidence:
      "A proof from existing definitions that derives `S_val` from a ready endpoint value-binding map contract root without promoting the source handle.",
  },
  {
    burden_id: "same_witness_carrier_pairing_lemma_derivation",
    missing_field:
      "same_witness_carrier_pairing_derivation_from_definitions_present",
    required_evidence:
      "A proof from existing definitions that the ref carrier and value-map carrier derivations land in one constructed witness object.",
  },
  {
    burden_id: "non_domain_carrier_admissibility_derivation",
    missing_field:
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
    required_evidence:
      "A proof that each introduced carrier is an admissible non-domain witness-object field.",
  },
  {
    burden_id: "non_domain_carrier_membership_preservation_derivation",
    missing_field:
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
    required_evidence:
      "A proof that carrier introduction preserves non-domain carrier membership rather than source adjacency.",
  },
  {
    burden_id: "source_handle_non_promotion_derivation",
    missing_field:
      "source_handle_non_promotion_derivation_from_definitions_present",
    required_evidence:
      "A proof excluding direct promotion of endpoint-boundary-binding refs or value maps into carrier fields.",
  },
  {
    burden_id: "inference_schema_soundness_derivation",
    missing_field:
      "inference_schema_soundness_derivation_from_definitions_present",
    required_evidence:
      "A soundness proof for `S_ref`, `S_val`, and `S_pair` under the existing proof contract.",
  },
  {
    burden_id: "endpoint_instantiation_derivation",
    missing_field:
      "endpoint_instantiation_derivation_from_definitions_present",
    required_evidence:
      "An endpoint-by-endpoint proof that all four endpoint functionals instantiate the schema premises.",
  },
  {
    burden_id: "definition_route_discharge",
    missing_field: "schema_family_derivable_from_existing_definitions",
    required_evidence:
      "All definition-derived lemma obligations, soundness, and endpoint instantiation present together.",
  },
];

const PROOF_ROUTES = [
  {
    route_id: "target_card_as_proof_route",
    status: "rejected-target-only",
    required_fields: [
      "schema_lemma_target_present",
      "schema_family_derivable_from_existing_definitions",
    ],
    limitation:
      "The target card states candidate schemata and obligations; it does not prove them.",
  },
  {
    route_id: "derive_schema_family_from_existing_definitions_route",
    status: "blocked",
    required_fields: [
      "definition_source_scope_ready",
      "ref_contract_to_carrier_lemma_derivation_from_definitions_present",
      "value_map_contract_to_carrier_lemma_derivation_from_definitions_present",
      "same_witness_carrier_pairing_derivation_from_definitions_present",
      "non_domain_carrier_admissibility_derivation_from_definitions_present",
      "non_domain_carrier_membership_preservation_derivation_from_definitions_present",
      "source_handle_non_promotion_derivation_from_definitions_present",
      "inference_schema_soundness_derivation_from_definitions_present",
      "endpoint_instantiation_derivation_from_definitions_present",
    ],
    limitation:
      "The derivation route is selected, but no definition-derived lemma proof is present.",
  },
  {
    route_id: "primitive_rule_acceptance_route",
    status: "out-of-scope-theory-decision",
    required_fields: [
      "primitive_rule_accepted",
      "carrier_introduction_inference_rule_schema_present",
    ],
    limitation:
      "Accepting `S_ref`, `S_val`, or `S_pair` as primitive would be a theory decision and is not performed by this proof attempt.",
  },
  {
    route_id: "schema_bundle_after_definition_lemmas_route",
    status: "blocked-downstream",
    required_fields: [
      "schema_family_derivable_from_existing_definitions",
      "inference_rule_schema_bundle_present",
      "derivation_bundle_present",
    ],
    limitation:
      "A schema bundle and derivation bundle remain downstream of the missing definition-derived lemmas.",
  },
  {
    route_id: "row_consumption_after_definition_route",
    status: "blocked-downstream",
    required_fields: [
      "derivation_bundle_present",
      "ref_value_non_domain_carrier_pair_constructed",
      "row_consumption_authorized",
      "branch_chart_authorized",
    ],
    limitation:
      "Rows cannot be consumed until the schema, derivations, carrier pair, and branch authorization all exist.",
  },
];

function parseArgs(argv) {
  const args = {
    schemaAuditPacket: DEFAULT_SCHEMA_AUDIT_PACKET,
    schemaLemmaTarget: DEFAULT_SCHEMA_LEMMA_TARGET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema-audit-packet") {
      args.schemaAuditPacket = argv[++index];
    } else if (arg === "--schema-lemma-target") {
      args.schemaLemmaTarget = argv[++index];
    } else if (arg === "--lemma-target") {
      args.schemaLemmaTarget = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-schema-lemma-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --schema-audit-packet <path>",
    "  --schema-lemma-target <path>",
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

function assertTarget(text) {
  if (!text.includes(`Status: ${SCHEMA_LEMMA_TARGET_STATUS}`)) {
    throw new Error("Schema lemma target status mismatch");
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
    schema_lemma_target_present: true,
    definition_route_selected: true,
    primitive_rule_acceptance_rejected: true,
    ref_contract_root_ready: sourceFields.ref_contract_root_ready === true,
    value_map_contract_root_ready:
      sourceFields.value_map_contract_root_ready === true,
    joint_same_witness_carrier_pair_rule_root_ready:
      sourceFields.joint_same_witness_carrier_pair_rule_root_ready === true,
    source_derivation_premise_set_ready:
      sourceFields.source_derivation_premise_set_ready === true,
    direct_source_promotion_rejected:
      sourceFields.direct_source_promotion_rejected === true,
    carrier_admission_route_selected:
      sourceFields.carrier_admission_route_selected === true,
    derivation_targets_declared:
      sourceFields.derivation_targets_declared === true,
    inference_schema_source_scope_ready:
      sourceFields.inference_schema_source_scope_ready === true,
    definition_source_scope_ready: false,
    ref_contract_to_carrier_lemma_derivation_from_definitions_present: false,
    value_map_contract_to_carrier_lemma_derivation_from_definitions_present:
      false,
    same_witness_carrier_pairing_derivation_from_definitions_present: false,
    non_domain_carrier_admissibility_derivation_from_definitions_present: false,
    non_domain_carrier_membership_preservation_derivation_from_definitions_present:
      false,
    source_handle_non_promotion_derivation_from_definitions_present: false,
    inference_schema_soundness_derivation_from_definitions_present: false,
    endpoint_instantiation_derivation_from_definitions_present: false,
    schema_family_derivable_from_existing_definitions: false,
    carrier_introduction_inference_rule_schema_present:
      sourceFields.carrier_introduction_inference_rule_schema_present === true,
    ref_contract_to_carrier_inference_schema_present:
      sourceFields.ref_contract_to_carrier_inference_schema_present === true,
    value_map_contract_to_carrier_inference_schema_present:
      sourceFields.value_map_contract_to_carrier_inference_schema_present ===
      true,
    joint_same_witness_pairing_schema_present:
      sourceFields.joint_same_witness_pairing_schema_present === true,
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
    ref_carrier_introduction_rule_available:
      sourceFields.ref_carrier_introduction_rule_available === true,
    value_map_carrier_introduction_rule_available:
      sourceFields.value_map_carrier_introduction_rule_available === true,
    ref_value_non_domain_carrier_pair_constructed:
      sourceFields.ref_value_non_domain_carrier_pair_constructed === true,
    row_consumption_authorized:
      sourceFields.row_consumption_authorized === true,
    branch_chart_authorized: sourceFields.branch_chart_authorized === true,
  };

  fields.definition_source_scope_ready =
    fields.schema_lemma_target_present &&
    fields.definition_route_selected &&
    fields.primitive_rule_acceptance_rejected &&
    fields.inference_schema_source_scope_ready &&
    fields.ref_contract_root_ready &&
    fields.value_map_contract_root_ready &&
    fields.joint_same_witness_carrier_pair_rule_root_ready &&
    fields.direct_source_promotion_rejected &&
    fields.carrier_admission_route_selected &&
    fields.derivation_targets_declared;
  fields.schema_family_derivable_from_existing_definitions =
    fields.ref_contract_to_carrier_lemma_derivation_from_definitions_present &&
    fields.value_map_contract_to_carrier_lemma_derivation_from_definitions_present &&
    fields.same_witness_carrier_pairing_derivation_from_definitions_present &&
    fields.non_domain_carrier_admissibility_derivation_from_definitions_present &&
    fields
      .non_domain_carrier_membership_preservation_derivation_from_definitions_present &&
    fields.source_handle_non_promotion_derivation_from_definitions_present &&
    fields.inference_schema_soundness_derivation_from_definitions_present &&
    fields.endpoint_instantiation_derivation_from_definitions_present;

  const routeAttempts = PROOF_ROUTES.map((route) =>
    routeAttempt(route, {
      ...fields,
      primitive_rule_accepted: false,
    })
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    schema_lemma_proof_attempt_id:
      `carrier_introduction_schema_lemma_proof_attempt:${endpoint.id}`,
    source_schema_audit_id:
      endpoint.carrier_introduction_inference_rule_schema_audit_id,
    candidate_schema_family: CANDIDATE_SCHEMA_FAMILY,
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
      "The derivation-from-definitions route is selected, but no definition-derived ref/value contract-to-carrier lemma, same-witness pairing lemma, admissibility lemma, preservation lemma, source-handle non-promotion lemma, soundness proof, or endpoint-instantiation proof is present.",
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
    source_schema_family_derivable_from_existing_definitions:
      sourceFields.schema_family_derivable_from_existing_definitions,
    receiver_schema_family_derivable_from_existing_definitions:
      receiverFields.schema_family_derivable_from_existing_definitions,
    combined_schema_family_derivable_from_existing_definitions: false,
    source_inference_rule_schema_bundle_present:
      sourceFields.inference_rule_schema_bundle_present,
    receiver_inference_rule_schema_bundle_present:
      receiverFields.inference_rule_schema_bundle_present,
    combined_inference_rule_schema_bundle_present: false,
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
  fields.combined_schema_family_derivable_from_existing_definitions =
    fields.source_schema_family_derivable_from_existing_definitions &&
    fields.receiver_schema_family_derivable_from_existing_definitions;
  fields.combined_inference_rule_schema_bundle_present =
    fields.source_inference_rule_schema_bundle_present &&
    fields.receiver_inference_rule_schema_bundle_present;
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
    source_schema_lemma_proof_attempt_id:
      source.schema_lemma_proof_attempt_id,
    receiver_schema_lemma_proof_attempt_id:
      receiver.schema_lemma_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver definition source scope, but neither endpoint derives the schema family or a derivation bundle from existing definitions.",
  };
}

function buildPacket(schemaAudit, schemaAuditPath, schemaLemmaTargetPath) {
  assertPacket(schemaAudit, SCHEMA_AUDIT_STATUS, "schema audit");
  assertTarget(readText(schemaLemmaTargetPath));

  const endpointAudits =
    schemaAudit
      .endpoint_ref_value_carrier_introduction_inference_rule_schema_audits.map(
        buildEndpointAudit
      );
  const endpointMap = idMap(
    endpointAudits,
    "id",
    "schema lemma proof attempt endpoint"
  );
  const rowAudits =
    schemaAudit
      .row_ref_value_carrier_introduction_inference_rule_schema_audits.map(
        (row) => buildRowAudit(row, endpointMap)
      );
  const endpointFieldCounts = fieldCounts(endpointAudits, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAudits, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-schema-lemma-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; the derivation-from-existing-definitions route is selected, but the definition-derived lemma stack is absent",
    source_artifacts: [
      {
        label: "ref_value_carrier_introduction_inference_rule_schema_audit",
        ...artifactRecord(schemaAuditPath),
      },
      {
        label: "ref_value_carrier_introduction_inference_schema_lemma_target",
        ...artifactRecord(schemaLemmaTargetPath),
      },
      ...schemaAudit.source_artifacts.map((source) => ({
        label: source.label.startsWith("inherited_")
          ? source.label
          : `inherited_${source.label}`,
        path: source.path,
        basename: source.basename,
        sha256: source.sha256,
      })),
    ],
    candidate_schema_family: CANDIDATE_SCHEMA_FAMILY,
    proof_attempt_target: {
      target_id:
        "ref-value-carrier-introduction-inference-schema-lemma-proof-attempt",
      selected_route: "derive_schema_family_from_existing_definitions",
      out_of_scope_route: "primitive_rule_acceptance_route",
      statement:
        "Attempt to derive `S_ref`, `S_val`, and `S_pair` from existing witness-object and carrier-admission definitions.",
      accepted_as_first_blocker_discharge_if:
        "Every endpoint has definition-derived ref and value-map contract-to-carrier lemma derivations, same-witness carrier-pairing lemma derivation, admissibility derivation, membership preservation derivation, source-handle non-promotion derivation, soundness proof, endpoint instantiation proof, and resulting schema family derivability.",
      first_exact_blocker:
        "ref_contract_to_carrier_lemma_derivation_from_definitions_present, value_map_contract_to_carrier_lemma_derivation_from_definitions_present, and same_witness_carrier_pairing_derivation_from_definitions_present",
    },
    primitive_rule_policy:
      "Primitive acceptance of `S_ref`, `S_val`, or `S_pair` is a theory decision and is not performed by this proof attempt.",
    proof_burdens: PROOF_BURDENS,
    proof_routes: PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_ref_value_carrier_introduction_inference_schema_lemma_proof_attempts:
      endpointAudits,
    row_ref_value_carrier_introduction_inference_schema_lemma_proof_attempts:
      rowAudits,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAudits.length,
      residual_consumer_rows: rowAudits.length,
      schema_lemma_targets_present:
        endpointFieldCounts.schema_lemma_target_present,
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
      ref_contract_to_carrier_lemma_derivations_from_definitions_present:
        endpointFieldCounts
          .ref_contract_to_carrier_lemma_derivation_from_definitions_present,
      value_map_contract_to_carrier_lemma_derivations_from_definitions_present:
        endpointFieldCounts
          .value_map_contract_to_carrier_lemma_derivation_from_definitions_present,
      same_witness_carrier_pairing_derivations_from_definitions_present:
        endpointFieldCounts
          .same_witness_carrier_pairing_derivation_from_definitions_present,
      non_domain_carrier_admissibility_derivations_from_definitions_present:
        endpointFieldCounts
          .non_domain_carrier_admissibility_derivation_from_definitions_present,
      non_domain_carrier_membership_preservation_derivations_from_definitions_present:
        endpointFieldCounts
          .non_domain_carrier_membership_preservation_derivation_from_definitions_present,
      source_handle_non_promotion_derivations_from_definitions_present:
        endpointFieldCounts
          .source_handle_non_promotion_derivation_from_definitions_present,
      inference_schema_soundness_derivations_from_definitions_present:
        endpointFieldCounts
          .inference_schema_soundness_derivation_from_definitions_present,
      endpoint_instantiation_derivations_from_definitions_present:
        endpointFieldCounts
          .endpoint_instantiation_derivation_from_definitions_present,
      schema_families_derivable_from_existing_definitions:
        endpointFieldCounts.schema_family_derivable_from_existing_definitions,
      inference_rule_schema_bundles_present:
        endpointFieldCounts.inference_rule_schema_bundle_present,
      derivation_bundles_present:
        endpointFieldCounts.derivation_bundle_present,
      ref_value_non_domain_carrier_pairs_constructed:
        endpointFieldCounts.ref_value_non_domain_carrier_pair_constructed,
      row_definition_source_scope_pairs_ready:
        rowFieldCounts.combined_definition_source_scope_ready,
      row_schema_family_derivable_pairs:
        rowFieldCounts.combined_schema_family_derivable_from_existing_definitions,
      row_inference_rule_schema_bundle_pairs_present:
        rowFieldCounts.combined_inference_rule_schema_bundle_present,
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
        "No endpoint has definition-derived schema lemmas, schema bundles, derivation bundles, available carrier rules, or constructed ref/value non-domain carrier pairs.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed carrier-introduction inference-schema lemma proof attempt and does not promote to reader-facing corpus prose.",
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

function schemaTable(schemata) {
  return schemata
    .map(
      (schema) =>
        `| ${schema.schema_id} | ${schema.source_target} | ${schema.premises.join(", ")} | ${schema.conclusion} | ${schema.first_required_lemma} |`
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.definition_source_scope_ready} | ${fields.ref_contract_to_carrier_lemma_derivation_from_definitions_present} | ${fields.value_map_contract_to_carrier_lemma_derivation_from_definitions_present} | ${fields.same_witness_carrier_pairing_derivation_from_definitions_present} | ${fields.non_domain_carrier_admissibility_derivation_from_definitions_present} | ${fields.non_domain_carrier_membership_preservation_derivation_from_definitions_present} | ${fields.source_handle_non_promotion_derivation_from_definitions_present} | ${fields.inference_schema_soundness_derivation_from_definitions_present} | ${fields.endpoint_instantiation_derivation_from_definitions_present} | ${fields.schema_family_derivable_from_existing_definitions} | ${endpoint.first_exact_blocker} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_definition_source_scope_ready} | ${fields.combined_schema_family_derivable_from_existing_definitions} | ${fields.combined_inference_rule_schema_bundle_present} | ${fields.combined_derivation_bundle_present} | ${row.row_consumed} |`;
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
  return `# Ref/Value Carrier-Introduction Inference-Schema Lemma Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet attempts the approved derivation-from-existing-definitions
route for the candidate ` + "`S_ref`" + `, ` + "`S_val`" + `, and ` + "`S_pair`" + `
carrier-introduction inference schemata. It does not accept those schemata as
primitive proof rules.

The proof attempt remains fail-closed. It records ${summary.definition_source_scopes_ready} / ${summary.endpoint_functionals}
definition source scopes and ${summary.primitive_rule_acceptance_routes_rejected} / ${summary.endpoint_functionals}
primitive-rule acceptance rejections. It records ${summary.ref_contract_to_carrier_lemma_derivations_from_definitions_present} / ${summary.endpoint_functionals}
ref contract-to-carrier lemma derivations, ${summary.value_map_contract_to_carrier_lemma_derivations_from_definitions_present} / ${summary.endpoint_functionals}
value-map contract-to-carrier lemma derivations, ${summary.same_witness_carrier_pairing_derivations_from_definitions_present} / ${summary.endpoint_functionals}
same-witness carrier-pairing derivations, ${summary.non_domain_carrier_admissibility_derivations_from_definitions_present} / ${summary.endpoint_functionals}
admissibility derivations, ${summary.non_domain_carrier_membership_preservation_derivations_from_definitions_present} / ${summary.endpoint_functionals}
membership-preservation derivations, ${summary.source_handle_non_promotion_derivations_from_definitions_present} / ${summary.endpoint_functionals}
source-handle non-promotion derivations, ${summary.inference_schema_soundness_derivations_from_definitions_present} / ${summary.endpoint_functionals}
schema soundness derivations, and ${summary.endpoint_instantiation_derivations_from_definitions_present} / ${summary.endpoint_functionals}
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

## Candidate Schema Family

| Schema | Source target | Premises | Conclusion | First required lemma |
| --- | --- | --- | --- | --- |
${schemaTable(packet.candidate_schema_family)}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.proof_routes)}

## Endpoint Audits

| Endpoint | Role | Definition scope | Ref lemma | Value lemma | Same-witness lemma | Admissibility | Preservation | Non-promotion | Soundness | Instantiation | Schema derivable | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_ref_value_carrier_introduction_inference_schema_lemma_proof_attempts)}

## Row Audits

| Row | Definition scope pair | Schema derivable pair | Schema bundle pair | Derivation bundle pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_ref_value_carrier_introduction_inference_schema_lemma_proof_attempts)}

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

  const schemaAudit = readJson(args.schemaAuditPacket);
  const packet = buildPacket(
    schemaAudit,
    args.schemaAuditPacket,
    args.schemaLemmaTarget
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

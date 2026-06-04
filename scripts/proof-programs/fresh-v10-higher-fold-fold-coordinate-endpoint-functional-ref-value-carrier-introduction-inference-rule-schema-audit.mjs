#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID =
  "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR =
  "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_DERIVATION_ATTEMPT_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_carrier_introduction_rule_derivation_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_inference_rule_schema_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_inference_rule_schema_audit_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const DERIVATION_ATTEMPT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-rule-derivation-attempt-fail-closed-ref-contract-value-map-contract-and-same-witness-rule-roots-present-derivations-soundness-application-absent-no-row-consumption";
const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-rule-schema-audit-fail-closed-contract-roots-and-derivation-targets-present-inference-schema-admissibility-preservation-and-same-witness-lemmas-absent-no-row-consumption";

const CANDIDATE_INFERENCE_RULE_SCHEMATA = [
  {
    schema_id: "ref_contract_to_ref_carrier_introduction_schema_candidate",
    status: "candidate-obligation-not-proved",
    premises: [
      "ref_contract_root_ready",
      "non_domain_carrier_admissibility_lemma_present",
      "non_domain_carrier_preservation_lemma_present",
      "source_handle_non_promotion_lemma_present",
    ],
    conclusion: "ref_contract_to_ref_carrier_rule_derivation_present",
    missing_rule_schema: "ref_contract_to_carrier_inference_schema_present",
  },
  {
    schema_id:
      "value_map_contract_to_value_map_carrier_introduction_schema_candidate",
    status: "candidate-obligation-not-proved",
    premises: [
      "value_map_contract_root_ready",
      "non_domain_carrier_admissibility_lemma_present",
      "non_domain_carrier_preservation_lemma_present",
      "source_handle_non_promotion_lemma_present",
    ],
    conclusion:
      "value_map_contract_to_value_map_carrier_rule_derivation_present",
    missing_rule_schema:
      "value_map_contract_to_carrier_inference_schema_present",
  },
  {
    schema_id: "joint_same_witness_carrier_pairing_schema_candidate",
    status: "candidate-obligation-not-proved",
    premises: [
      "joint_same_witness_carrier_pair_rule_root_ready",
      "ref_contract_to_ref_carrier_rule_derivation_present",
      "value_map_contract_to_value_map_carrier_rule_derivation_present",
      "same_witness_carrier_pairing_lemma_present",
    ],
    conclusion: "joint_same_witness_carrier_pair_rule_derivation_present",
    missing_rule_schema: "joint_same_witness_pairing_schema_present",
  },
];

const SOURCE_SCOPE_FIELDS = [
  "ref_contract_root_ready",
  "value_map_contract_root_ready",
  "joint_same_witness_carrier_pair_rule_root_ready",
  "source_derivation_premise_set_ready",
  "direct_source_promotion_rejected",
  "carrier_admission_route_selected",
  "derivation_targets_declared",
  "inference_schema_source_scope_ready",
];

const INFERENCE_TARGET_FIELDS = [
  "inference_rule_schema_target_declared",
  "ref_contract_carrier_lemma_target_declared",
  "value_map_carrier_lemma_target_declared",
  "joint_same_witness_lemma_target_declared",
  "non_promotion_soundness_lemma_target_declared",
  "endpoint_instantiation_lemma_target_declared",
  "missing_axiom_lemma_layer_identified",
];

const SCHEMA_AND_LEMMA_FIELDS = [
  "carrier_introduction_inference_rule_schema_present",
  "ref_contract_to_carrier_inference_schema_present",
  "value_map_contract_to_carrier_inference_schema_present",
  "joint_same_witness_pairing_schema_present",
  "ref_contract_to_ref_carrier_axiom_or_lemma_present",
  "value_map_contract_to_value_map_carrier_axiom_or_lemma_present",
  "joint_same_witness_carrier_pair_axiom_or_lemma_present",
  "non_domain_carrier_admissibility_lemma_present",
  "non_domain_carrier_preservation_lemma_present",
  "non_domain_carrier_membership_preservation_lemma_present",
  "same_witness_carrier_pairing_lemma_present",
  "source_handle_non_promotion_lemma_present",
  "carrier_rule_soundness_schema_present",
  "inference_rule_schema_soundness_proof_present",
  "endpoint_application_schema_present",
  "endpoint_instantiation_lemma_present",
  "inference_rule_schema_bundle_present",
];

const DERIVATION_FIELDS = [
  "ref_contract_to_ref_carrier_rule_derivation_present",
  "value_map_contract_to_value_map_carrier_rule_derivation_present",
  "joint_same_witness_carrier_pair_rule_derivation_present",
  "derivation_soundness_bridge_present",
  "carrier_rule_soundness_proof_present",
  "carrier_rule_application_proof_present",
  "ref_carrier_introduction_rule_available",
  "value_map_carrier_introduction_rule_available",
  "ref_value_carrier_pair_rule_available",
  "ref_value_non_domain_carrier_pair_constructed",
  "derivation_bundle_present",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_SCOPE_FIELDS,
  ...INFERENCE_TARGET_FIELDS,
  ...SCHEMA_AND_LEMMA_FIELDS,
  ...DERIVATION_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_inference_schema_source_scope_ready",
  "receiver_inference_schema_source_scope_ready",
  "combined_inference_schema_source_scope_ready",
  "source_inference_rule_schema_bundle_present",
  "receiver_inference_rule_schema_bundle_present",
  "combined_inference_rule_schema_bundle_present",
  "source_derivation_bundle_present",
  "receiver_derivation_bundle_present",
  "combined_derivation_bundle_present",
  "source_ref_contract_to_ref_carrier_rule_derivation_present",
  "receiver_ref_contract_to_ref_carrier_rule_derivation_present",
  "combined_ref_contract_to_ref_carrier_rule_derivation_present",
  "source_value_map_contract_to_value_map_carrier_rule_derivation_present",
  "receiver_value_map_contract_to_value_map_carrier_rule_derivation_present",
  "combined_value_map_contract_to_value_map_carrier_rule_derivation_present",
  "source_joint_same_witness_carrier_pair_rule_derivation_present",
  "receiver_joint_same_witness_carrier_pair_rule_derivation_present",
  "combined_joint_same_witness_carrier_pair_rule_derivation_present",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const INFERENCE_SCHEMA_ROUTES = [
  {
    route_id: "contract_roots_as_inference_schema_route",
    status: "rejected-root-only",
    required_fields: [
      "inference_schema_source_scope_ready",
      "ref_contract_to_carrier_inference_schema_present",
      "value_map_contract_to_carrier_inference_schema_present",
    ],
    limitation:
      "Ready contract roots are inputs to a rule schema; they are not the schema or lemma that licenses carrier introduction.",
  },
  {
    route_id: "derivation_targets_as_inference_schema_route",
    status: "rejected-target-only",
    required_fields: [
      "derivation_targets_declared",
      "joint_same_witness_pairing_schema_present",
      "same_witness_carrier_pairing_lemma_present",
    ],
    limitation:
      "Derivation targets name what must be proven; they do not provide the inference rule or same-witness pairing lemma.",
  },
  {
    route_id: "ref_contract_inference_schema_route",
    status: "blocked",
    required_fields: [
      "ref_contract_root_ready",
      "ref_contract_to_carrier_inference_schema_present",
      "non_domain_carrier_admissibility_lemma_present",
    ],
    limitation:
      "No explicit rule schema maps an endpoint-boundary-binding ref contract to a ref non-domain carrier rule.",
  },
  {
    route_id: "value_map_contract_inference_schema_route",
    status: "blocked",
    required_fields: [
      "value_map_contract_root_ready",
      "value_map_contract_to_carrier_inference_schema_present",
      "non_domain_carrier_preservation_lemma_present",
    ],
    limitation:
      "No explicit rule schema maps an endpoint value-binding map contract to a value-map non-domain carrier rule.",
  },
  {
    route_id: "same_witness_pairing_schema_route",
    status: "blocked",
    required_fields: [
      "joint_same_witness_carrier_pair_rule_root_ready",
      "joint_same_witness_pairing_schema_present",
      "same_witness_carrier_pairing_lemma_present",
    ],
    limitation:
      "No pairing schema proves that the introduced ref carrier and value-map carrier occupy one same-packet witness object.",
  },
  {
    route_id: "admissibility_preservation_lemma_route",
    status: "blocked",
    required_fields: [
      "non_domain_carrier_admissibility_lemma_present",
      "non_domain_carrier_preservation_lemma_present",
      "source_handle_non_promotion_lemma_present",
    ],
    limitation:
      "No lemma proves admissibility, preservation of non-domain carrier status, or source-handle non-promotion.",
  },
  {
    route_id: "schema_to_derivation_route",
    status: "blocked-downstream",
    required_fields: [
      "inference_rule_schema_bundle_present",
      "ref_contract_to_ref_carrier_rule_derivation_present",
      "value_map_contract_to_value_map_carrier_rule_derivation_present",
      "joint_same_witness_carrier_pair_rule_derivation_present",
    ],
    limitation:
      "The three derivations remain downstream of a complete inference-rule schema bundle.",
  },
  {
    route_id: "row_consumption_after_inference_schema_route",
    status: "blocked-downstream",
    required_fields: [
      "derivation_bundle_present",
      "ref_value_non_domain_carrier_pair_constructed",
      "row_consumption_authorized",
      "branch_chart_authorized",
    ],
    limitation:
      "Rows cannot be consumed until derivations, soundness, endpoint application, and carrier-pair construction exist.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "carrier_introduction_inference_rule_schema",
    missing_field: "carrier_introduction_inference_rule_schema_present",
    required_evidence:
      "A proof-grade inference-rule schema family that jointly licenses ref, value-map, and same-witness carrier-pair introduction.",
  },
  {
    burden_id: "ref_contract_to_carrier_inference_schema",
    missing_field: "ref_contract_to_carrier_inference_schema_present",
    required_evidence:
      "A proof-grade inference schema that turns an endpoint-boundary-binding ref contract root into the ref carrier-introduction rule derivation.",
  },
  {
    burden_id: "value_map_contract_to_carrier_inference_schema",
    missing_field: "value_map_contract_to_carrier_inference_schema_present",
    required_evidence:
      "A proof-grade inference schema that turns an endpoint value-binding map contract root into the value-map carrier-introduction rule derivation.",
  },
  {
    burden_id: "joint_same_witness_pairing_schema",
    missing_field: "joint_same_witness_pairing_schema_present",
    required_evidence:
      "A proof-grade pairing schema that derives the joint same-witness carrier-pair rule from the two carrier-rule derivations.",
  },
  {
    burden_id: "ref_contract_to_ref_carrier_axiom_or_lemma",
    missing_field: "ref_contract_to_ref_carrier_axiom_or_lemma_present",
    required_evidence:
      "A proof-grade axiom or lemma that specifically maps the endpoint-boundary-binding ref contract root to a ref carrier-introduction derivation.",
  },
  {
    burden_id: "value_map_contract_to_value_map_carrier_axiom_or_lemma",
    missing_field:
      "value_map_contract_to_value_map_carrier_axiom_or_lemma_present",
    required_evidence:
      "A proof-grade axiom or lemma that specifically maps the endpoint value-binding map contract root to a value-map carrier-introduction derivation.",
  },
  {
    burden_id: "joint_same_witness_carrier_pair_axiom_or_lemma",
    missing_field:
      "joint_same_witness_carrier_pair_axiom_or_lemma_present",
    required_evidence:
      "A proof-grade axiom or lemma that specifically maps the two carrier derivations into one same-witness carrier-pair derivation.",
  },
  {
    burden_id: "non_domain_carrier_admissibility_lemma",
    missing_field: "non_domain_carrier_admissibility_lemma_present",
    required_evidence:
      "A lemma proving that the non-domain carrier fields introduced by the schema are admissible witness-object fields.",
  },
  {
    burden_id: "non_domain_carrier_preservation_lemma",
    missing_field: "non_domain_carrier_membership_preservation_lemma_present",
    required_evidence:
      "A lemma proving that carrier introduction preserves non-domain carrier status rather than promoting source handles by adjacency.",
  },
  {
    burden_id: "same_witness_carrier_pairing_lemma",
    missing_field: "same_witness_carrier_pairing_lemma_present",
    required_evidence:
      "A lemma proving that the ref carrier and value-map carrier produced by the two schemata land in one same-packet witness object.",
  },
  {
    burden_id: "source_handle_non_promotion_lemma",
    missing_field: "source_handle_non_promotion_lemma_present",
    required_evidence:
      "A lemma excluding direct promotion of endpoint-boundary-binding refs or value maps into carrier fields without the inference schema.",
  },
  {
    burden_id: "inference_rule_schema_soundness",
    missing_field: "inference_rule_schema_soundness_proof_present",
    required_evidence:
      "A proof that the inference-rule schema family is sound for the endpoint carrier-introduction targets.",
  },
  {
    burden_id: "endpoint_instantiation_lemma",
    missing_field: "endpoint_instantiation_lemma_present",
    required_evidence:
      "A proof that each endpoint functional instantiates every premise of the carrier-introduction inference-rule schema.",
  },
  {
    burden_id: "carrier_rule_derivation_discharge",
    missing_field: "inference_rule_schema_bundle_present",
    required_evidence:
      "The schema, axiom/lemma layer, soundness proof, endpoint instantiation lemma, and derived carrier-rule fields marked present together.",
  },
];

function parseArgs(argv) {
  const args = {
    derivationAttemptPacket: DEFAULT_DERIVATION_ATTEMPT_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--derivation-attempt-packet") {
      args.derivationAttemptPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-rule-schema-audit.mjs [options]",
    "",
    "Options:",
    "  --derivation-attempt-packet <path>",
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

function requireMapped(map, id, label) {
  const value = map.get(id);
  if (!value) {
    throw new Error(`Missing ${label}: ${id}`);
  }
  return value;
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

function requiredField(item, field) {
  return item?.required_fields_present?.[field] === true;
}

function missing(fields, requiredFields) {
  return requiredFields.filter((field) => fields[field] !== true);
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

function routeAttempt(route, fields) {
  const missingFields = missing(fields, route.required_fields);
  return {
    ...route,
    missing_fields: missingFields,
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
    inference_schema_source_scope_ready: false,
    inference_rule_schema_target_declared: false,
    ref_contract_carrier_lemma_target_declared: false,
    value_map_carrier_lemma_target_declared: false,
    joint_same_witness_lemma_target_declared: false,
    non_promotion_soundness_lemma_target_declared: false,
    endpoint_instantiation_lemma_target_declared: false,
    missing_axiom_lemma_layer_identified: false,
    carrier_introduction_inference_rule_schema_present: false,
    ref_contract_to_carrier_inference_schema_present: false,
    value_map_contract_to_carrier_inference_schema_present: false,
    joint_same_witness_pairing_schema_present: false,
    ref_contract_to_ref_carrier_axiom_or_lemma_present: false,
    value_map_contract_to_value_map_carrier_axiom_or_lemma_present: false,
    joint_same_witness_carrier_pair_axiom_or_lemma_present: false,
    non_domain_carrier_admissibility_lemma_present: false,
    non_domain_carrier_preservation_lemma_present: false,
    non_domain_carrier_membership_preservation_lemma_present: false,
    same_witness_carrier_pairing_lemma_present: false,
    source_handle_non_promotion_lemma_present: false,
    carrier_rule_soundness_schema_present: false,
    inference_rule_schema_soundness_proof_present: false,
    endpoint_application_schema_present: false,
    endpoint_instantiation_lemma_present: false,
    inference_rule_schema_bundle_present: false,
    ref_contract_to_ref_carrier_rule_derivation_present:
      sourceFields.ref_contract_to_ref_carrier_rule_derivation_present === true,
    value_map_contract_to_value_map_carrier_rule_derivation_present:
      sourceFields
        .value_map_contract_to_value_map_carrier_rule_derivation_present ===
      true,
    joint_same_witness_carrier_pair_rule_derivation_present:
      sourceFields.joint_same_witness_carrier_pair_rule_derivation_present ===
      true,
    derivation_soundness_bridge_present:
      sourceFields.derivation_soundness_bridge_present === true,
    carrier_rule_soundness_proof_present:
      sourceFields.carrier_rule_soundness_proof_present === true,
    carrier_rule_application_proof_present:
      sourceFields.carrier_rule_application_proof_present === true,
    ref_carrier_introduction_rule_available:
      sourceFields.ref_carrier_introduction_rule_available === true,
    value_map_carrier_introduction_rule_available:
      sourceFields.value_map_carrier_introduction_rule_available === true,
    ref_value_carrier_pair_rule_available:
      sourceFields.ref_value_carrier_pair_rule_available === true,
    ref_value_non_domain_carrier_pair_constructed:
      sourceFields.ref_value_non_domain_carrier_pair_constructed === true,
    derivation_bundle_present: false,
    row_consumption_authorized:
      sourceFields.row_consumption_authorized === true,
    branch_chart_authorized: sourceFields.branch_chart_authorized === true,
  };

  fields.inference_schema_source_scope_ready =
    fields.ref_contract_root_ready &&
    fields.value_map_contract_root_ready &&
    fields.joint_same_witness_carrier_pair_rule_root_ready &&
    fields.source_derivation_premise_set_ready &&
    fields.direct_source_promotion_rejected &&
    fields.carrier_admission_route_selected &&
    fields.derivation_targets_declared;
  fields.inference_rule_schema_target_declared =
    fields.inference_schema_source_scope_ready;
  fields.ref_contract_carrier_lemma_target_declared =
    fields.ref_contract_root_ready && fields.derivation_targets_declared;
  fields.value_map_carrier_lemma_target_declared =
    fields.value_map_contract_root_ready && fields.derivation_targets_declared;
  fields.joint_same_witness_lemma_target_declared =
    fields.joint_same_witness_carrier_pair_rule_root_ready &&
    fields.derivation_targets_declared;
  fields.non_promotion_soundness_lemma_target_declared =
    fields.direct_source_promotion_rejected && fields.derivation_targets_declared;
  fields.endpoint_instantiation_lemma_target_declared =
    fields.inference_schema_source_scope_ready;
  fields.missing_axiom_lemma_layer_identified =
    fields.inference_rule_schema_target_declared &&
    !fields.carrier_introduction_inference_rule_schema_present;
  fields.inference_rule_schema_bundle_present =
    fields.carrier_introduction_inference_rule_schema_present &&
    fields.ref_contract_to_carrier_inference_schema_present &&
    fields.value_map_contract_to_carrier_inference_schema_present &&
    fields.joint_same_witness_pairing_schema_present &&
    fields.ref_contract_to_ref_carrier_axiom_or_lemma_present &&
    fields.value_map_contract_to_value_map_carrier_axiom_or_lemma_present &&
    fields.joint_same_witness_carrier_pair_axiom_or_lemma_present &&
    fields.non_domain_carrier_admissibility_lemma_present &&
    fields.non_domain_carrier_preservation_lemma_present &&
    fields.non_domain_carrier_membership_preservation_lemma_present &&
    fields.same_witness_carrier_pairing_lemma_present &&
    fields.source_handle_non_promotion_lemma_present &&
    fields.inference_rule_schema_soundness_proof_present &&
    fields.endpoint_instantiation_lemma_present;
  fields.derivation_bundle_present =
    fields.ref_contract_to_ref_carrier_rule_derivation_present &&
    fields.value_map_contract_to_value_map_carrier_rule_derivation_present &&
    fields.joint_same_witness_carrier_pair_rule_derivation_present &&
    fields.derivation_soundness_bridge_present &&
    fields.carrier_rule_soundness_proof_present &&
    fields.carrier_rule_application_proof_present;

  const routeAttempts = INFERENCE_SCHEMA_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    carrier_introduction_inference_rule_schema_audit_id:
      `carrier_introduction_inference_rule_schema_audit:${endpoint.id}`,
    source_derivation_attempt_id:
      endpoint.carrier_introduction_rule_derivation_attempt_id,
    candidate_inference_rule_schemata: CANDIDATE_INFERENCE_RULE_SCHEMATA,
    route_attempts: routeAttempts,
    inference_schema_routes_passed: routeAttempts
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
      "The endpoint has contract roots and derivation targets, but no inference-rule schema, admissibility lemma, preservation lemma, same-witness pairing lemma, or source-handle non-promotion lemma.",
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
    row_locator_resolved: requiredField(row, "row_locator_resolved"),
    source_inference_schema_source_scope_ready:
      sourceFields.inference_schema_source_scope_ready,
    receiver_inference_schema_source_scope_ready:
      receiverFields.inference_schema_source_scope_ready,
    combined_inference_schema_source_scope_ready: false,
    source_inference_rule_schema_bundle_present:
      sourceFields.inference_rule_schema_bundle_present,
    receiver_inference_rule_schema_bundle_present:
      receiverFields.inference_rule_schema_bundle_present,
    combined_inference_rule_schema_bundle_present: false,
    source_derivation_bundle_present: sourceFields.derivation_bundle_present,
    receiver_derivation_bundle_present:
      receiverFields.derivation_bundle_present,
    combined_derivation_bundle_present: false,
    source_ref_contract_to_ref_carrier_rule_derivation_present:
      sourceFields.ref_contract_to_ref_carrier_rule_derivation_present,
    receiver_ref_contract_to_ref_carrier_rule_derivation_present:
      receiverFields.ref_contract_to_ref_carrier_rule_derivation_present,
    combined_ref_contract_to_ref_carrier_rule_derivation_present: false,
    source_value_map_contract_to_value_map_carrier_rule_derivation_present:
      sourceFields.value_map_contract_to_value_map_carrier_rule_derivation_present,
    receiver_value_map_contract_to_value_map_carrier_rule_derivation_present:
      receiverFields
        .value_map_contract_to_value_map_carrier_rule_derivation_present,
    combined_value_map_contract_to_value_map_carrier_rule_derivation_present:
      false,
    source_joint_same_witness_carrier_pair_rule_derivation_present:
      sourceFields.joint_same_witness_carrier_pair_rule_derivation_present,
    receiver_joint_same_witness_carrier_pair_rule_derivation_present:
      receiverFields.joint_same_witness_carrier_pair_rule_derivation_present,
    combined_joint_same_witness_carrier_pair_rule_derivation_present: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_inference_schema_source_scope_ready =
    fields.source_inference_schema_source_scope_ready &&
    fields.receiver_inference_schema_source_scope_ready;
  fields.combined_inference_rule_schema_bundle_present =
    fields.source_inference_rule_schema_bundle_present &&
    fields.receiver_inference_rule_schema_bundle_present;
  fields.combined_derivation_bundle_present =
    fields.source_derivation_bundle_present &&
    fields.receiver_derivation_bundle_present;
  fields.combined_ref_contract_to_ref_carrier_rule_derivation_present =
    fields.source_ref_contract_to_ref_carrier_rule_derivation_present &&
    fields.receiver_ref_contract_to_ref_carrier_rule_derivation_present;
  fields.combined_value_map_contract_to_value_map_carrier_rule_derivation_present =
    fields.source_value_map_contract_to_value_map_carrier_rule_derivation_present &&
    fields.receiver_value_map_contract_to_value_map_carrier_rule_derivation_present;
  fields.combined_joint_same_witness_carrier_pair_rule_derivation_present =
    fields.source_joint_same_witness_carrier_pair_rule_derivation_present &&
    fields.receiver_joint_same_witness_carrier_pair_rule_derivation_present;

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
    source_carrier_introduction_inference_rule_schema_audit_id:
      source.carrier_introduction_inference_rule_schema_audit_id,
    receiver_carrier_introduction_inference_rule_schema_audit_id:
      receiver.carrier_introduction_inference_rule_schema_audit_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver inference-schema source scopes, but neither endpoint has an inference-rule schema bundle or derivation bundle.",
  };
}

function buildPacket(derivationAttempt, derivationAttemptPath) {
  assertPacket(
    derivationAttempt,
    DERIVATION_ATTEMPT_STATUS,
    "derivation attempt"
  );
  const endpointAudits =
    derivationAttempt
      .endpoint_ref_value_carrier_introduction_rule_derivation_attempts.map(
        buildEndpointAudit
      );
  const endpointMap = idMap(
    endpointAudits,
    "id",
    "carrier-introduction inference-rule schema endpoint"
  );
  const rowAudits =
    derivationAttempt
      .row_ref_value_carrier_introduction_rule_derivation_attempts.map((row) =>
        buildRowAudit(row, endpointMap)
      );
  const endpointFieldCounts = fieldCounts(endpointAudits, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAudits, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-rule-schema-audit-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed inference-rule schema audit; contract roots and derivation targets are present but no inference schema or lemmas are present",
    source_artifacts: [
      {
        label: "ref_value_carrier_introduction_rule_derivation_attempt",
        ...artifactRecord(derivationAttemptPath),
      },
      ...derivationAttempt.source_artifacts.map((source) => ({
        label: `inherited_${source.label}`,
        path: source.path,
        basename: source.basename,
        sha256: source.sha256,
      })),
    ],
    inherited_derivation_roots: derivationAttempt.derivation_roots,
    candidate_inference_rule_schemata: CANDIDATE_INFERENCE_RULE_SCHEMATA,
    audit_target: {
      target_id: "ref-value-carrier-introduction-inference-rule-schema-target",
      statement:
        "State and prove the inference-rule schemata and lemmas needed to derive ref, value-map, and joint same-witness carrier-introduction rules from the ready contract roots.",
      accepted_as_first_blocker_discharge_if:
        "Every endpoint has the ref contract-to-carrier inference schema, value-map contract-to-carrier inference schema, joint same-witness pairing schema, admissibility lemma, preservation lemma, source-handle non-promotion lemma, and resulting schema bundle present.",
      first_exact_blocker:
        "ref_contract_to_carrier_inference_schema_present, value_map_contract_to_carrier_inference_schema_present, and joint_same_witness_pairing_schema_present",
    },
    no_promotion_rule:
      "Contract roots, derivation targets, route decisions, and primitive witness records are source scope only; they do not imply an inference-rule schema or lemma.",
    proof_burdens: PROOF_BURDENS,
    inference_schema_routes: INFERENCE_SCHEMA_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_ref_value_carrier_introduction_inference_rule_schema_audits:
      endpointAudits,
    row_ref_value_carrier_introduction_inference_rule_schema_audits:
      rowAudits,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAudits.length,
      residual_consumer_rows: rowAudits.length,
      ref_contract_roots_ready: endpointFieldCounts.ref_contract_root_ready,
      value_map_contract_roots_ready:
        endpointFieldCounts.value_map_contract_root_ready,
      joint_same_witness_carrier_pair_rule_roots_ready:
        endpointFieldCounts.joint_same_witness_carrier_pair_rule_root_ready,
      inference_audit_premise_sets_ready:
        endpointFieldCounts.inference_schema_source_scope_ready,
      source_derivation_premise_sets_ready:
        endpointFieldCounts.source_derivation_premise_set_ready,
      direct_source_promotion_routes_rejected:
        endpointFieldCounts.direct_source_promotion_rejected,
      carrier_admission_routes_selected:
        endpointFieldCounts.carrier_admission_route_selected,
      derivation_target_triples_declared:
        endpointFieldCounts.derivation_targets_declared,
      inference_rule_schema_targets_declared:
        endpointFieldCounts.inference_rule_schema_target_declared,
      ref_contract_carrier_lemma_targets_declared:
        endpointFieldCounts.ref_contract_carrier_lemma_target_declared,
      value_map_carrier_lemma_targets_declared:
        endpointFieldCounts.value_map_carrier_lemma_target_declared,
      joint_same_witness_lemma_targets_declared:
        endpointFieldCounts.joint_same_witness_lemma_target_declared,
      non_promotion_soundness_lemma_targets_declared:
        endpointFieldCounts.non_promotion_soundness_lemma_target_declared,
      endpoint_instantiation_lemma_targets_declared:
        endpointFieldCounts.endpoint_instantiation_lemma_target_declared,
      missing_axiom_lemma_layers_identified:
        endpointFieldCounts.missing_axiom_lemma_layer_identified,
      inference_schema_source_scopes_ready:
        endpointFieldCounts.inference_schema_source_scope_ready,
      carrier_introduction_inference_rule_schemata_present:
        endpointFieldCounts.carrier_introduction_inference_rule_schema_present,
      ref_contract_to_carrier_inference_schemata_present:
        endpointFieldCounts.ref_contract_to_carrier_inference_schema_present,
      value_map_contract_to_carrier_inference_schemata_present:
        endpointFieldCounts
          .value_map_contract_to_carrier_inference_schema_present,
      joint_same_witness_pairing_schemata_present:
        endpointFieldCounts.joint_same_witness_pairing_schema_present,
      ref_contract_to_ref_carrier_axiom_or_lemmas_present:
        endpointFieldCounts.ref_contract_to_ref_carrier_axiom_or_lemma_present,
      value_map_contract_to_value_map_carrier_axiom_or_lemmas_present:
        endpointFieldCounts
          .value_map_contract_to_value_map_carrier_axiom_or_lemma_present,
      joint_same_witness_carrier_pair_axiom_or_lemmas_present:
        endpointFieldCounts
          .joint_same_witness_carrier_pair_axiom_or_lemma_present,
      non_domain_carrier_admissibility_lemmas_present:
        endpointFieldCounts.non_domain_carrier_admissibility_lemma_present,
      non_domain_carrier_preservation_lemmas_present:
        endpointFieldCounts.non_domain_carrier_preservation_lemma_present,
      non_domain_carrier_membership_preservation_lemmas_present:
        endpointFieldCounts
          .non_domain_carrier_membership_preservation_lemma_present,
      same_witness_carrier_pairing_lemmas_present:
        endpointFieldCounts.same_witness_carrier_pairing_lemma_present,
      source_handle_non_promotion_lemmas_present:
        endpointFieldCounts.source_handle_non_promotion_lemma_present,
      carrier_rule_soundness_schemata_present:
        endpointFieldCounts.carrier_rule_soundness_schema_present,
      inference_rule_schema_soundness_proofs_present:
        endpointFieldCounts.inference_rule_schema_soundness_proof_present,
      endpoint_application_schemata_present:
        endpointFieldCounts.endpoint_application_schema_present,
      endpoint_instantiation_lemmas_present:
        endpointFieldCounts.endpoint_instantiation_lemma_present,
      inference_rule_schema_bundles_present:
        endpointFieldCounts.inference_rule_schema_bundle_present,
      ref_contract_to_ref_carrier_rule_derivations_present:
        endpointFieldCounts.ref_contract_to_ref_carrier_rule_derivation_present,
      value_map_contract_to_value_map_carrier_rule_derivations_present:
        endpointFieldCounts
          .value_map_contract_to_value_map_carrier_rule_derivation_present,
      joint_same_witness_carrier_pair_rule_derivations_present:
        endpointFieldCounts
          .joint_same_witness_carrier_pair_rule_derivation_present,
      derivation_bundles_present:
        endpointFieldCounts.derivation_bundle_present,
      ref_carrier_rules_available:
        endpointFieldCounts.ref_carrier_introduction_rule_available,
      value_map_carrier_rules_available:
        endpointFieldCounts.value_map_carrier_introduction_rule_available,
      ref_value_pair_rules_available:
        endpointFieldCounts.ref_value_carrier_pair_rule_available,
      ref_value_non_domain_carrier_pairs_constructed:
        endpointFieldCounts.ref_value_non_domain_carrier_pair_constructed,
      row_inference_schema_source_scope_pairs_ready:
        rowFieldCounts.combined_inference_schema_source_scope_ready,
      row_inference_rule_schema_bundle_pairs_present:
        rowFieldCounts.combined_inference_rule_schema_bundle_present,
      row_derivation_bundle_pairs_present:
        rowFieldCounts.combined_derivation_bundle_present,
      row_ref_contract_to_ref_carrier_rule_derivation_pairs_present:
        rowFieldCounts
          .combined_ref_contract_to_ref_carrier_rule_derivation_present,
      row_value_map_contract_to_value_map_carrier_rule_derivation_pairs_present:
        rowFieldCounts
          .combined_value_map_contract_to_value_map_carrier_rule_derivation_present,
      row_joint_same_witness_carrier_pair_rule_derivation_pairs_present:
        rowFieldCounts
          .combined_joint_same_witness_carrier_pair_rule_derivation_present,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint has inference-rule schemata, admissibility/preservation lemmas, same-witness pairing lemmas, derivation bundles, available carrier rules, or constructed carrier pairs.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed carrier-introduction inference-rule schema audit and does not promote to reader-facing corpus prose.",
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
        `| ${schema.schema_id} | ${schema.status} | ${schema.premises.join(", ")} | ${schema.conclusion} | ${schema.missing_rule_schema} |`
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.inference_schema_source_scope_ready} | ${fields.ref_contract_to_carrier_inference_schema_present} | ${fields.value_map_contract_to_carrier_inference_schema_present} | ${fields.joint_same_witness_pairing_schema_present} | ${fields.non_domain_carrier_admissibility_lemma_present} | ${fields.non_domain_carrier_preservation_lemma_present} | ${fields.same_witness_carrier_pairing_lemma_present} | ${fields.inference_rule_schema_bundle_present} | ${fields.derivation_bundle_present} | ${endpoint.first_exact_blocker} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_inference_schema_source_scope_ready} | ${fields.combined_inference_rule_schema_bundle_present} | ${fields.combined_derivation_bundle_present} | ${fields.combined_ref_contract_to_ref_carrier_rule_derivation_present} | ${fields.combined_value_map_contract_to_value_map_carrier_rule_derivation_present} | ${fields.combined_joint_same_witness_carrier_pair_rule_derivation_present} | ${row.row_consumed} |`;
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
  return `# Ref/Value Carrier-Introduction Inference-Rule Schema Audit

## Verdict

Status: ${packet.status}

This priority-only packet lowers the carrier-introduction derivation blocker to
the inference-rule schema and lemma layer. It asks whether the ready
endpoint-boundary-binding ref contract root, endpoint value-binding map contract
root, and joint same-witness carrier-pair rule root already include a proof-grade
schema that derives the missing carrier-introduction rules.

The audit remains fail-closed. It records ${summary.inference_schema_source_scopes_ready} / ${summary.endpoint_functionals}
inference-schema source scopes, ${summary.ref_contract_roots_ready} / ${summary.endpoint_functionals}
ref contract roots, ${summary.value_map_contract_roots_ready} / ${summary.endpoint_functionals}
value-map contract roots, ${summary.joint_same_witness_carrier_pair_rule_roots_ready} / ${summary.endpoint_functionals}
joint same-witness carrier-pair rule roots, and ${summary.derivation_target_triples_declared} / ${summary.endpoint_functionals}
derivation target triples. It records ${summary.ref_contract_to_carrier_inference_schemata_present} / ${summary.endpoint_functionals}
ref contract-to-carrier inference schemata, ${summary.value_map_contract_to_carrier_inference_schemata_present} / ${summary.endpoint_functionals}
value-map contract-to-carrier inference schemata, ${summary.joint_same_witness_pairing_schemata_present} / ${summary.endpoint_functionals}
same-witness pairing schemata, ${summary.non_domain_carrier_admissibility_lemmas_present} / ${summary.endpoint_functionals}
admissibility lemmas, ${summary.non_domain_carrier_preservation_lemmas_present} / ${summary.endpoint_functionals}
preservation lemmas, ${summary.same_witness_carrier_pairing_lemmas_present} / ${summary.endpoint_functionals}
same-witness carrier-pairing lemmas, and ${summary.inference_rule_schema_bundles_present} / ${summary.endpoint_functionals}
complete inference-rule schema bundles. It consumes ${summary.row_consumption_count}
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Audit Target

${packet.audit_target.statement}

Accepted as blocker discharge if: ${packet.audit_target.accepted_as_first_blocker_discharge_if}

First exact blocker: ${packet.audit_target.first_exact_blocker}

## No-Promotion Rule

${packet.no_promotion_rule}

## Candidate Inference-Rule Schemata

| Schema | Status | Premises | Conclusion | Missing rule schema |
| --- | --- | --- | --- | --- |
${schemaTable(packet.candidate_inference_rule_schemata)}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.inference_schema_routes)}

## Endpoint Audits

| Endpoint | Role | Source scope | Ref schema | Value schema | Pairing schema | Admissibility | Preservation | Same-witness lemma | Schema bundle | Derivation bundle | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_ref_value_carrier_introduction_inference_rule_schema_audits)}

## Row Audits

| Row | Source scopes | Schema bundle pair | Derivation bundle pair | Ref derivation pair | Value derivation pair | Joint derivation pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_ref_value_carrier_introduction_inference_rule_schema_audits)}

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

  const derivationAttempt = readJson(args.derivationAttemptPacket);
  const packet = buildPacket(derivationAttempt, args.derivationAttemptPacket);

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

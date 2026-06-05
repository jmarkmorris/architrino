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
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_binding_contract_satisfaction_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPLETION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_full_binding_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PRIMITIVE_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REF_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const PARENT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-binding-contract-satisfaction-without-contract-link-proof-attempt-fail-closed-source-readiness-present-binding-contract-satisfaction-without-contract-link-absent-no-row-consumption";
const COMPLETION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-full-binding-completion-attempt-fail-closed-source-candidates-and-route-tests-present-actual-link-membership-binding-full-binding-carrier-admission-absent-no-row-consumption";
const CONTRACT_TARGET_STATUS =
  "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";
const PRIMITIVE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-rule-witness-record-construction-attempt-partial-pass-first-primitives-constructed-ref-carriers-full-binding-row-closure-locked-no-row-consumption";
const REF_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-contract-target-satisfaction-ref-value-compatibility-without-contract-link-proof-attempt-fail-closed-source-targets-value-maps-ref-fields-and-primitives-present-target-satisfaction-without-contract-link-absent-no-row-consumption";

const SOURCE_INPUT_FIELDS = [
  "parent_binding_contract_without_contract_link_packet_input_present",
  "parent_without_contract_link_source_inputs_ready",
  "binding_contract_target_declared",
  "target_endpoint_boundary_binding_object_constructed",
  "target_boundary_binding_object_has_domain_chart",
  "target_boundary_binding_object_has_basis_formula",
  "target_boundary_binding_object_has_boundary_action",
  "target_boundary_binding_object_has_signed_delta",
  "target_boundary_binding_object_has_endpoint_refs",
  "target_boundary_binding_object_has_endpoint_values",
  "target_action_exact_under_target_boundary_binding_object",
  "endpoint_value_binding_map_constructed",
  "endpoint_value_bound_to_boundary_binding_from_value_map",
  "endpoint_value_binding_map_ref_values_certified",
  "first_endpoint_boundary_binding_primitive_constructed",
  "primitive_binding_witness_record_constructed",
  "primitive_target_ref_value_attachment_certified",
  "witness_object_endpoint_boundary_binding_ref_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
  "endpoint_boundary_binding_ref_targets_first_primitive",
  "endpoint_boundary_binding_ref_target_attachment_certified",
  "contract_link_premise_not_imported",
];

const INPUT_FIELDS = [
  ...SOURCE_INPUT_FIELDS,
  "target_satisfaction_without_contract_link_source_inputs_ready",
];

const SOURCE_PROOF_BLOCKER_FIELDS = [
  "source_contract_target_satisfaction_proof_present",
  "source_target_ref_value_equations_proof_grade",
  "source_endpoint_boundary_binding_ref_compatibility_proof_present",
  "source_first_primitive_compatibility_proof_present",
];

const ROUTE_CONTEXT_FIELDS = [
  "selected_route_requires_witness_object_contract_link",
  "selected_route_contract_link_dependency_eliminated",
  "independent_binding_contract_satisfaction_without_contract_link_present",
];

const TARGET_SATISFACTION_FIELDS = [
  "independent_target_ref_value_equations_without_contract_link_proof_grade",
  "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
  "independent_first_primitive_compatibility_without_contract_link_present",
  "independent_contract_target_satisfaction_derivation_without_contract_link_present",
  "independent_contract_target_satisfaction_soundness_without_contract_link_present",
  "independent_contract_target_satisfaction_endpoint_application_without_contract_link_present",
  "independent_contract_target_satisfaction_without_contract_link_proof_present",
  "target_ref_value_compatibility_without_contract_link_foundation_ready",
  "contract_target_satisfaction_without_contract_link_route_available",
];

const DOWNSTREAM_FIELDS = [
  "independent_binding_contract_satisfaction_derivation_without_contract_link_present",
  "independent_binding_contract_satisfaction_without_contract_link_present",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...INPUT_FIELDS,
  ...SOURCE_PROOF_BLOCKER_FIELDS,
  ...ROUTE_CONTEXT_FIELDS,
  ...TARGET_SATISFACTION_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_target_satisfaction_without_contract_link_source_inputs_ready",
  "receiver_target_satisfaction_without_contract_link_source_inputs_ready",
  "combined_target_satisfaction_without_contract_link_source_inputs_ready",
  "source_contract_link_premise_not_imported",
  "receiver_contract_link_premise_not_imported",
  "combined_contract_link_premise_not_imported",
  "source_binding_contract_target_declared",
  "receiver_binding_contract_target_declared",
  "combined_binding_contract_target_pair_declared",
  "source_value_map_constructed",
  "receiver_value_map_constructed",
  "combined_value_map_pair_constructed",
  "source_ref_field_constructed",
  "receiver_ref_field_constructed",
  "combined_ref_field_pair_constructed",
  "source_first_primitive_constructed",
  "receiver_first_primitive_constructed",
  "combined_first_primitive_pair_constructed",
  "source_target_satisfaction_without_contract_link_proven",
  "receiver_target_satisfaction_without_contract_link_proven",
  "combined_target_satisfaction_without_contract_link_pair_proven",
  "source_ref_value_equations_proof_grade_without_contract_link",
  "receiver_ref_value_equations_proof_grade_without_contract_link",
  "combined_ref_value_equations_proof_grade_without_contract_link",
  "source_compatibility_proofs_without_contract_link",
  "receiver_compatibility_proofs_without_contract_link",
  "combined_compatibility_proofs_without_contract_link",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const TARGET_PROOF_ROUTES = [
  {
    route_id: "declared_target_as_target_satisfaction_proof",
    status: "rejected-target-only",
    required_fields: [
      "binding_contract_target_declared",
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
    ],
    limitation:
      "A declared target is an obligation, not proof that the target is satisfied without the link premise.",
  },
  {
    route_id: "value_map_source_equations_as_proof_grade_ref_value",
    status: "rejected-source-equation-only",
    required_fields: [
      "endpoint_value_binding_map_constructed",
      "endpoint_value_bound_to_boundary_binding_from_value_map",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
    ],
    limitation:
      "Endpoint value maps and source equations remain source-scope unless promoted by a proof-grade ref/value equation package.",
  },
  {
    route_id: "primitive_attachment_as_first_primitive_compatibility",
    status: "rejected-attachment-only",
    required_fields: [
      "primitive_target_ref_value_attachment_certified",
      "independent_first_primitive_compatibility_without_contract_link_present",
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
    ],
    limitation:
      "A certified primitive attachment is not a proof that the first primitive satisfies the binding-contract target without the link premise.",
  },
  {
    route_id: "ref_field_as_endpoint_boundary_binding_ref_compatibility",
    status: "rejected-reference-only",
    required_fields: [
      "witness_object_endpoint_boundary_binding_ref_constructed",
      "endpoint_boundary_binding_ref_target_attachment_certified",
      "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
    ],
    limitation:
      "A witness-object reference field is not proof-grade endpoint-boundary-binding ref compatibility for target satisfaction.",
  },
  {
    route_id: "parent_binding_contract_packet_as_target_satisfaction_proof",
    status: "rejected-burden-only",
    required_fields: [
      "parent_without_contract_link_source_inputs_ready",
      "independent_binding_contract_satisfaction_without_contract_link_present",
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
    ],
    limitation:
      "The parent packet names this sub-burden, but it records no target-satisfaction proof.",
  },
  {
    route_id: "contract_target_satisfaction_without_contract_link_derivation",
    status: "absent",
    required_fields: [
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
      "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
      "independent_first_primitive_compatibility_without_contract_link_present",
      "independent_contract_target_satisfaction_derivation_without_contract_link_present",
      "independent_contract_target_satisfaction_soundness_without_contract_link_present",
      "independent_contract_target_satisfaction_endpoint_application_without_contract_link_present",
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
    ],
    limitation:
      "No independent derivation, soundness proof, endpoint application proof, proof-grade ref/value package, or compatibility proof is present.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "contract_target_satisfaction_without_contract_link",
    missing_field:
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
    required_evidence:
      "A proof that the endpoint value-binding map satisfies the inherited binding-contract target without importing `witness_object_has_contract_link`.",
  },
  {
    burden_id: "target_ref_value_equations_without_contract_link",
    missing_field:
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    required_evidence:
      "Proof-grade target ref/value equations rather than source-equation-only value-map records.",
  },
  {
    burden_id: "endpoint_boundary_binding_ref_compatibility_without_contract_link",
    missing_field:
      "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
    required_evidence:
      "A proof tying the witness-object endpoint-boundary-binding ref to the inherited target without the link premise.",
  },
  {
    burden_id: "first_primitive_compatibility_without_contract_link",
    missing_field:
      "independent_first_primitive_compatibility_without_contract_link_present",
    required_evidence:
      "A proof tying the first endpoint boundary-binding primitive to the target and value map without the link premise.",
  },
  {
    burden_id: "contract_target_satisfaction_derivation_without_contract_link",
    missing_field:
      "independent_contract_target_satisfaction_derivation_without_contract_link_present",
    required_evidence:
      "A derivation from the target object, value map, reference field, first primitive, and no-promotion guards.",
  },
  {
    burden_id: "contract_target_satisfaction_soundness_without_contract_link",
    missing_field:
      "independent_contract_target_satisfaction_soundness_without_contract_link_present",
    required_evidence:
      "A soundness proof that target declarations, value maps, primitive attachments, and reference fields are not promoted to satisfaction.",
  },
  {
    burden_id: "contract_target_satisfaction_endpoint_application_without_contract_link",
    missing_field:
      "independent_contract_target_satisfaction_endpoint_application_without_contract_link_present",
    required_evidence:
      "Endpoint-by-endpoint application proof for all four endpoint functionals.",
  },
];

function parseArgs(argv) {
  const args = {
    parentPacket: DEFAULT_PARENT_PACKET,
    completionPacket: DEFAULT_COMPLETION_PACKET,
    contractTargetPacket: DEFAULT_CONTRACT_TARGET_PACKET,
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    primitivePacket: DEFAULT_PRIMITIVE_PACKET,
    refPacket: DEFAULT_REF_PACKET,
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
    } else if (arg === "--completion-packet") {
      args.completionPacket = argv[++index];
    } else if (arg === "--contract-target-packet") {
      args.contractTargetPacket = argv[++index];
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
    } else if (arg === "--primitive-packet") {
      args.primitivePacket = argv[++index];
    } else if (arg === "--ref-packet") {
      args.refPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-contract-target-satisfaction-ref-value-compatibility-without-contract-link-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --parent-packet <path>",
    "  --completion-packet <path>",
    "  --contract-target-packet <path>",
    "  --value-map-packet <path>",
    "  --primitive-packet <path>",
    "  --ref-packet <path>",
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

function assertPacket(packet, expectedStatus, label) {
  if (packet.packet_id !== PACKET_ID) {
    throw new Error(`${label} packet id mismatch: ${packet.packet_id}`);
  }
  if (packet.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `${label} fold-coordinate packet id mismatch: ${packet.fold_coordinate_packet_id}`
    );
  }
  if (packet.status !== expectedStatus) {
    throw new Error(`${label} status mismatch: ${packet.status}`);
  }
  if (
    packet.branch_chart_authorized ||
    packet.preledger_pass ||
    packet.updates_live_ledger ||
    packet.row_closure
  ) {
    throw new Error(`Refusing proof attempt from authorized ${label}.`);
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

function makeSourceArtifacts(paths) {
  return paths.map(({ label, filePath }) => ({
    label,
    path: filePath,
    basename: path.basename(filePath),
    sha256: sha256File(filePath),
  }));
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

function buildEndpointAttempt({
  parent,
  completion,
  contractTarget,
  valueMap,
  primitive,
  ref,
}) {
  const parentFields = parent.required_fields_present ?? {};
  const completionFields = completion.required_fields_present ?? {};
  const contractFields = contractTarget.required_fields_present ?? {};
  const valueFields = valueMap.required_fields_present ?? {};
  const primitiveFields = primitive.required_fields_present ?? {};
  const refFields = ref.required_fields_present ?? {};

  const fields = {
    parent_binding_contract_without_contract_link_packet_input_present: true,
    parent_without_contract_link_source_inputs_ready:
      parentFields.binding_contract_without_contract_link_source_inputs_ready ===
      true,
    binding_contract_target_declared:
      parentFields.binding_contract_target_declared === true &&
      contractFields.binding_contract_target_declared === true,
    target_endpoint_boundary_binding_object_constructed:
      contractFields.target_endpoint_boundary_binding_object_constructed === true,
    target_boundary_binding_object_has_domain_chart:
      contractFields.target_boundary_binding_object_has_domain_chart === true,
    target_boundary_binding_object_has_basis_formula:
      contractFields.target_boundary_binding_object_has_basis_formula === true,
    target_boundary_binding_object_has_boundary_action:
      contractFields.target_boundary_binding_object_has_boundary_action === true,
    target_boundary_binding_object_has_signed_delta:
      contractFields.target_boundary_binding_object_has_signed_delta === true,
    target_boundary_binding_object_has_endpoint_refs:
      contractFields.target_boundary_binding_object_has_endpoint_refs === true,
    target_boundary_binding_object_has_endpoint_values:
      contractFields.target_boundary_binding_object_has_endpoint_values === true,
    target_action_exact_under_target_boundary_binding_object:
      contractFields.target_action_exact_under_target_boundary_binding_object ===
      true,
    endpoint_value_binding_map_constructed:
      valueFields.endpoint_value_binding_map_constructed === true,
    endpoint_value_bound_to_boundary_binding_from_value_map:
      valueFields.endpoint_value_bound_to_boundary_binding === true,
    endpoint_value_binding_map_ref_values_certified:
      valueFields.endpoint_value_binding_map_ref_values_certified === true,
    first_endpoint_boundary_binding_primitive_constructed:
      primitiveFields.endpoint_boundary_binding_constructed === true,
    primitive_binding_witness_record_constructed:
      primitiveFields.primitive_binding_witness_record_constructed === true,
    primitive_target_ref_value_attachment_certified:
      primitiveFields.primitive_target_ref_value_attachment_certified === true,
    witness_object_endpoint_boundary_binding_ref_constructed:
      refFields.witness_object_endpoint_boundary_binding_ref_constructed === true,
    witness_object_has_endpoint_boundary_binding_ref:
      refFields.witness_object_has_endpoint_boundary_binding_ref === true,
    endpoint_boundary_binding_ref_targets_first_primitive:
      refFields.endpoint_boundary_binding_ref_targets_first_primitive === true,
    endpoint_boundary_binding_ref_target_attachment_certified:
      refFields.endpoint_boundary_binding_ref_target_attachment_certified ===
      true,
    contract_link_premise_not_imported:
      parentFields.witness_object_has_contract_link !== true &&
      parentFields.witness_object_contract_link_constructed !== true,
    target_satisfaction_without_contract_link_source_inputs_ready: false,
    source_contract_target_satisfaction_proof_present:
      completionFields.contract_target_satisfaction_proof_present === true,
    source_target_ref_value_equations_proof_grade:
      completionFields.target_ref_value_equations_proof_grade === true,
    source_endpoint_boundary_binding_ref_compatibility_proof_present:
      completionFields.endpoint_boundary_binding_ref_compatibility_proof_present ===
      true,
    source_first_primitive_compatibility_proof_present:
      completionFields.first_primitive_compatibility_proof_present === true,
    selected_route_requires_witness_object_contract_link:
      parentFields.selected_route_requires_witness_object_contract_link === true,
    selected_route_contract_link_dependency_eliminated:
      parentFields.selected_route_contract_link_dependency_eliminated === true,
    independent_binding_contract_satisfaction_without_contract_link_present:
      parentFields
        .independent_binding_contract_satisfaction_without_contract_link_present ===
      true,
    independent_target_ref_value_equations_without_contract_link_proof_grade:
      false,
    independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present:
      false,
    independent_first_primitive_compatibility_without_contract_link_present:
      false,
    independent_contract_target_satisfaction_derivation_without_contract_link_present:
      false,
    independent_contract_target_satisfaction_soundness_without_contract_link_present:
      false,
    independent_contract_target_satisfaction_endpoint_application_without_contract_link_present:
      false,
    independent_contract_target_satisfaction_without_contract_link_proof_present:
      false,
    target_ref_value_compatibility_without_contract_link_foundation_ready: false,
    contract_target_satisfaction_without_contract_link_route_available: false,
    independent_binding_contract_satisfaction_derivation_without_contract_link_present:
      false,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.target_satisfaction_without_contract_link_source_inputs_ready =
    SOURCE_INPUT_FIELDS.every((field) => fields[field] === true);
  fields.target_ref_value_compatibility_without_contract_link_foundation_ready =
    fields.independent_target_ref_value_equations_without_contract_link_proof_grade &&
    fields
      .independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present &&
    fields.independent_first_primitive_compatibility_without_contract_link_present;
  fields.contract_target_satisfaction_without_contract_link_route_available =
    fields.target_ref_value_compatibility_without_contract_link_foundation_ready &&
    fields.independent_contract_target_satisfaction_derivation_without_contract_link_present &&
    fields.independent_contract_target_satisfaction_soundness_without_contract_link_present &&
    fields
      .independent_contract_target_satisfaction_endpoint_application_without_contract_link_present &&
    fields.independent_contract_target_satisfaction_without_contract_link_proof_present;

  const routeAttempts = TARGET_PROOF_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: parent.id,
    endpoint_functional_id: parent.endpoint_functional_id,
    role: parent.role,
    independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt_id:
      `independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt:${parent.id}`,
    source_attempt_ids: {
      parent_binding_contract_satisfaction_without_contract_link:
        parent
          .independent_binding_contract_satisfaction_without_contract_link_proof_attempt_id,
      binding_full_binding_completion:
        completion.binding_full_binding_completion_attempt_id,
      full_endpoint_boundary_binding_contract_target:
        contractTarget.full_endpoint_boundary_binding_contract_target?.target_id,
      endpoint_value_binding_map:
        valueMap.endpoint_value_binding_map_construction_attempt_id,
      primitive_rule_witness_record:
        primitive.primitive_rule_witness_record_construction_attempt_id,
      endpoint_boundary_binding_ref:
        ref.ref_carrier_full_binding_construction_attempt_id,
    },
    target: {
      target_id: `independent_contract_target_satisfaction_without_contract_link:${parent.id}`,
      statement:
        "Prove that the endpoint value-binding map satisfies the inherited binding-contract target without importing `witness_object_has_contract_link`.",
      accepted_if:
        "The endpoint supplies proof-grade target ref/value equations, endpoint-boundary-binding ref compatibility, first-primitive compatibility, derivation, soundness proof, and endpoint application proof without the link premise.",
      prohibited_premises: [
        "witness_object_has_contract_link",
        "witness_object_contract_link_constructed",
        "actual contract-link rule application",
        "constructed witness-object membership proof",
        "row consumption",
        "branch-chart authorization",
      ],
    },
    required_fields_present: fields,
    target_proof_route_attempts: routeAttempts,
    target_proof_routes_passed: [],
    missing_target_satisfaction_obligations: missing(
      fields,
      TARGET_SATISFACTION_FIELDS
    ),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 6)
      .map((burden) => burden.missing_field),
    independent_contract_target_satisfaction_without_contract_link_proof_present:
      fields
        .independent_contract_target_satisfaction_without_contract_link_proof_present,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has target objects, value maps, first primitives, and witness-object endpoint-boundary-binding refs, but no proof-grade target ref/value equation package, compatibility proof, target-satisfaction derivation, soundness proof, endpoint application proof, or target-satisfaction proof without the link premise is present.",
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
    source_target_satisfaction_without_contract_link_source_inputs_ready:
      sourceFields.target_satisfaction_without_contract_link_source_inputs_ready,
    receiver_target_satisfaction_without_contract_link_source_inputs_ready:
      receiverFields.target_satisfaction_without_contract_link_source_inputs_ready,
    combined_target_satisfaction_without_contract_link_source_inputs_ready: false,
    source_contract_link_premise_not_imported:
      sourceFields.contract_link_premise_not_imported,
    receiver_contract_link_premise_not_imported:
      receiverFields.contract_link_premise_not_imported,
    combined_contract_link_premise_not_imported: false,
    source_binding_contract_target_declared:
      sourceFields.binding_contract_target_declared,
    receiver_binding_contract_target_declared:
      receiverFields.binding_contract_target_declared,
    combined_binding_contract_target_pair_declared: false,
    source_value_map_constructed:
      sourceFields.endpoint_value_binding_map_constructed,
    receiver_value_map_constructed:
      receiverFields.endpoint_value_binding_map_constructed,
    combined_value_map_pair_constructed: false,
    source_ref_field_constructed:
      sourceFields.witness_object_endpoint_boundary_binding_ref_constructed,
    receiver_ref_field_constructed:
      receiverFields.witness_object_endpoint_boundary_binding_ref_constructed,
    combined_ref_field_pair_constructed: false,
    source_first_primitive_constructed:
      sourceFields.first_endpoint_boundary_binding_primitive_constructed,
    receiver_first_primitive_constructed:
      receiverFields.first_endpoint_boundary_binding_primitive_constructed,
    combined_first_primitive_pair_constructed: false,
    source_target_satisfaction_without_contract_link_proven:
      sourceFields
        .independent_contract_target_satisfaction_without_contract_link_proof_present,
    receiver_target_satisfaction_without_contract_link_proven:
      receiverFields
        .independent_contract_target_satisfaction_without_contract_link_proof_present,
    combined_target_satisfaction_without_contract_link_pair_proven: false,
    source_ref_value_equations_proof_grade_without_contract_link:
      sourceFields
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    receiver_ref_value_equations_proof_grade_without_contract_link:
      receiverFields
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    combined_ref_value_equations_proof_grade_without_contract_link: false,
    source_compatibility_proofs_without_contract_link:
      sourceFields
        .independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present &&
      sourceFields.independent_first_primitive_compatibility_without_contract_link_present,
    receiver_compatibility_proofs_without_contract_link:
      receiverFields
        .independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present &&
      receiverFields
        .independent_first_primitive_compatibility_without_contract_link_present,
    combined_compatibility_proofs_without_contract_link: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_target_satisfaction_without_contract_link_source_inputs_ready =
    fields.source_target_satisfaction_without_contract_link_source_inputs_ready &&
    fields.receiver_target_satisfaction_without_contract_link_source_inputs_ready;
  fields.combined_contract_link_premise_not_imported =
    fields.source_contract_link_premise_not_imported &&
    fields.receiver_contract_link_premise_not_imported;
  fields.combined_binding_contract_target_pair_declared =
    fields.source_binding_contract_target_declared &&
    fields.receiver_binding_contract_target_declared;
  fields.combined_value_map_pair_constructed =
    fields.source_value_map_constructed && fields.receiver_value_map_constructed;
  fields.combined_ref_field_pair_constructed =
    fields.source_ref_field_constructed && fields.receiver_ref_field_constructed;
  fields.combined_first_primitive_pair_constructed =
    fields.source_first_primitive_constructed &&
    fields.receiver_first_primitive_constructed;
  fields.combined_target_satisfaction_without_contract_link_pair_proven =
    fields.source_target_satisfaction_without_contract_link_proven &&
    fields.receiver_target_satisfaction_without_contract_link_proven;
  fields.combined_ref_value_equations_proof_grade_without_contract_link =
    fields.source_ref_value_equations_proof_grade_without_contract_link &&
    fields.receiver_ref_value_equations_proof_grade_without_contract_link;
  fields.combined_compatibility_proofs_without_contract_link =
    fields.source_compatibility_proofs_without_contract_link &&
    fields.receiver_compatibility_proofs_without_contract_link;

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt_id:
      source
        .independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt_id,
    receiver_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt_id:
      receiver
        .independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver target, value-map, ref-field, and first-primitive input pairs, but no source/receiver target-satisfaction proof pair, proof-grade ref/value equation pair, or compatibility proof pair without the link premise.",
  };
}

function buildPacket(sources, sourcePaths) {
  assertPacket(
    sources.parent,
    PARENT_STATUS,
    "binding-contract-satisfaction-without-contract-link parent packet"
  );
  assertPacket(sources.completion, COMPLETION_STATUS, "completion packet");
  assertPacket(
    sources.contractTarget,
    CONTRACT_TARGET_STATUS,
    "contract target packet"
  );
  assertPacket(sources.valueMap, VALUE_MAP_STATUS, "value-map packet");
  assertPacket(sources.primitive, PRIMITIVE_STATUS, "primitive packet");
  assertPacket(sources.ref, REF_STATUS, "ref packet");

  const completionById = idMap(
    sources.completion.endpoint_binding_full_binding_completion_attempts,
    "id",
    "binding/full-binding completion endpoint"
  );
  const contractTargetById = idMap(
    sources.contractTarget.endpoint_full_boundary_binding_contract_targets,
    "id",
    "full endpoint boundary-binding contract target endpoint"
  );
  const valueMapById = idMap(
    sources.valueMap.endpoint_value_binding_map_construction_attempts,
    "id",
    "endpoint value-binding map endpoint"
  );
  const primitiveById = idMap(
    sources.primitive
      .endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts,
    "id",
    "primitive rule/witness endpoint"
  );
  const refById = idMap(
    sources.ref.endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts,
    "id",
    "endpoint boundary-binding ref endpoint"
  );

  const endpointAttempts =
    sources.parent
      .endpoint_independent_binding_contract_satisfaction_without_contract_link_proof_attempts.map(
        (parent) =>
          buildEndpointAttempt({
            parent,
            completion: requireMapped(
              completionById,
              parent.id,
              `completion endpoint ${parent.id}`
            ),
            contractTarget: requireMapped(
              contractTargetById,
              parent.id,
              `contract target endpoint ${parent.id}`
            ),
            valueMap: requireMapped(
              valueMapById,
              parent.id,
              `value-map endpoint ${parent.id}`
            ),
            primitive: requireMapped(
              primitiveById,
              parent.id,
              `primitive endpoint ${parent.id}`
            ),
            ref: requireMapped(refById, parent.id, `ref endpoint ${parent.id}`),
          })
      );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "independent contract target satisfaction ref-value compatibility endpoint"
  );
  const rowAttempts =
    sources.parent
      .row_independent_binding_contract_satisfaction_without_contract_link_proof_attempts.map(
        (row) => buildRowAttempt(row, endpointMap)
      );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-independent-contract-target-satisfaction-ref-value-compatibility-without-contract-link-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; target, value-map, first-primitive, and ref-field source layers are present, but target satisfaction without the contract link is absent",
    source_artifacts: makeSourceArtifacts([
      {
        label: "independent_binding_contract_satisfaction_without_contract_link_proof_attempt",
        filePath: sourcePaths.parent,
      },
      {
        label: "binding_full_binding_completion_attempt",
        filePath: sourcePaths.completion,
      },
      {
        label: "full_endpoint_boundary_binding_contract_target",
        filePath: sourcePaths.contractTarget,
      },
      {
        label: "endpoint_value_binding_map_construction_attempt",
        filePath: sourcePaths.valueMap,
      },
      {
        label: "endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt",
        filePath: sourcePaths.primitive,
      },
      {
        label: "endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt",
        filePath: sourcePaths.ref,
      },
    ]),
    target: {
      target_id:
        "independent-contract-target-satisfaction-ref-value-compatibility-without-contract-link-target",
      statement:
        "For each endpoint functional, prove that the endpoint value-binding map satisfies the inherited binding-contract target without importing `witness_object_has_contract_link`.",
      accepted_if:
        "Each endpoint has proof-grade target ref/value equations, endpoint-boundary-binding ref compatibility, first-primitive compatibility, derivation, soundness proof, and endpoint application proof without the link premise.",
      current_target_satisfaction_proofs_available:
        endpointFieldCounts
          .independent_contract_target_satisfaction_without_contract_link_proof_present,
    },
    no_promotion_rule:
      "Target declarations, value maps, source equations, primitive attachments, and witness-object reference fields are not promoted into target satisfaction without an independent proof.",
    proof_burdens: PROOF_BURDENS,
    target_proof_routes: TARGET_PROOF_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempts:
      endpointAttempts,
    row_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempts:
      rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      parent_without_contract_link_source_inputs_ready:
        endpointFieldCounts.parent_without_contract_link_source_inputs_ready,
      binding_contract_targets_declared:
        endpointFieldCounts.binding_contract_target_declared,
      target_objects_constructed:
        endpointFieldCounts.target_endpoint_boundary_binding_object_constructed,
      target_objects_with_refs:
        endpointFieldCounts.target_boundary_binding_object_has_endpoint_refs,
      target_objects_with_values:
        endpointFieldCounts.target_boundary_binding_object_has_endpoint_values,
      target_actions_exact:
        endpointFieldCounts
          .target_action_exact_under_target_boundary_binding_object,
      endpoint_value_binding_maps_constructed:
        endpointFieldCounts.endpoint_value_binding_map_constructed,
      endpoint_values_bound_by_value_map:
        endpointFieldCounts
          .endpoint_value_bound_to_boundary_binding_from_value_map,
      value_map_ref_values_certified:
        endpointFieldCounts.endpoint_value_binding_map_ref_values_certified,
      first_primitives_constructed:
        endpointFieldCounts.first_endpoint_boundary_binding_primitive_constructed,
      primitive_target_ref_value_attachments_certified:
        endpointFieldCounts.primitive_target_ref_value_attachment_certified,
      witness_object_endpoint_boundary_binding_refs_constructed:
        endpointFieldCounts
          .witness_object_endpoint_boundary_binding_ref_constructed,
      endpoint_boundary_binding_ref_target_attachments_certified:
        endpointFieldCounts
          .endpoint_boundary_binding_ref_target_attachment_certified,
      target_satisfaction_without_contract_link_source_inputs_ready:
        endpointFieldCounts
          .target_satisfaction_without_contract_link_source_inputs_ready,
      contract_link_premise_not_imported:
        endpointFieldCounts.contract_link_premise_not_imported,
      source_contract_target_satisfaction_proofs_present:
        endpointFieldCounts.source_contract_target_satisfaction_proof_present,
      source_target_ref_value_equations_proof_grade:
        endpointFieldCounts.source_target_ref_value_equations_proof_grade,
      source_endpoint_boundary_binding_ref_compatibility_proofs_present:
        endpointFieldCounts
          .source_endpoint_boundary_binding_ref_compatibility_proof_present,
      source_first_primitive_compatibility_proofs_present:
        endpointFieldCounts.source_first_primitive_compatibility_proof_present,
      independent_target_ref_value_equations_without_contract_link_proof_grade:
        endpointFieldCounts
          .independent_target_ref_value_equations_without_contract_link_proof_grade,
      independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present:
        endpointFieldCounts
          .independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present,
      independent_first_primitive_compatibility_without_contract_link_present:
        endpointFieldCounts
          .independent_first_primitive_compatibility_without_contract_link_present,
      independent_contract_target_satisfaction_derivations_without_contract_link_present:
        endpointFieldCounts
          .independent_contract_target_satisfaction_derivation_without_contract_link_present,
      independent_contract_target_satisfaction_soundness_proofs_without_contract_link_present:
        endpointFieldCounts
          .independent_contract_target_satisfaction_soundness_without_contract_link_present,
      independent_contract_target_satisfaction_endpoint_application_proofs_without_contract_link_present:
        endpointFieldCounts
          .independent_contract_target_satisfaction_endpoint_application_without_contract_link_present,
      independent_contract_target_satisfaction_without_contract_link_proofs_present:
        endpointFieldCounts
          .independent_contract_target_satisfaction_without_contract_link_proof_present,
      target_ref_value_compatibility_without_contract_link_foundation_ready:
        endpointFieldCounts
          .target_ref_value_compatibility_without_contract_link_foundation_ready,
      target_satisfaction_without_contract_link_routes_available:
        endpointFieldCounts
          .contract_target_satisfaction_without_contract_link_route_available,
      selected_route_contract_link_dependencies_eliminated:
        endpointFieldCounts.selected_route_contract_link_dependency_eliminated,
      independent_binding_contract_satisfaction_without_contract_link_present:
        endpointFieldCounts
          .independent_binding_contract_satisfaction_without_contract_link_present,
      row_target_satisfaction_source_input_pairs_ready:
        rowFieldCounts
          .combined_target_satisfaction_without_contract_link_source_inputs_ready,
      row_contract_link_premise_not_imported_pairs:
        rowFieldCounts.combined_contract_link_premise_not_imported,
      row_target_pairs_declared:
        rowFieldCounts.combined_binding_contract_target_pair_declared,
      row_value_map_pairs_constructed:
        rowFieldCounts.combined_value_map_pair_constructed,
      row_ref_field_pairs_constructed:
        rowFieldCounts.combined_ref_field_pair_constructed,
      row_first_primitive_pairs_constructed:
        rowFieldCounts.combined_first_primitive_pair_constructed,
      row_target_satisfaction_pairs_proven:
        rowFieldCounts
          .combined_target_satisfaction_without_contract_link_pair_proven,
      row_ref_value_equation_pairs_proof_grade:
        rowFieldCounts
          .combined_ref_value_equations_proof_grade_without_contract_link,
      row_compatibility_proof_pairs:
        rowFieldCounts.combined_compatibility_proofs_without_contract_link,
      rows_unblocked: rowFieldCounts.row_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      row_consumption_authorized: false,
      branch_chart_authorized: false,
      reason:
        "No endpoint supplies target-satisfaction proof, proof-grade target ref/value equations, endpoint-boundary-binding ref compatibility, first-primitive compatibility, derivation, soundness proof, or endpoint application proof without the link premise.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed independent contract-target-satisfaction-without-contract-link proof attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.target_satisfaction_without_contract_link_source_inputs_ready} | ${fields.contract_link_premise_not_imported} | ${fields.binding_contract_target_declared} | ${fields.endpoint_value_binding_map_constructed} | ${fields.witness_object_endpoint_boundary_binding_ref_constructed} | ${fields.first_endpoint_boundary_binding_primitive_constructed} | ${fields.independent_target_ref_value_equations_without_contract_link_proof_grade} | ${fields.independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present} | ${fields.independent_first_primitive_compatibility_without_contract_link_present} | ${fields.target_ref_value_compatibility_without_contract_link_foundation_ready} | ${fields.independent_contract_target_satisfaction_without_contract_link_proof_present} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_target_satisfaction_without_contract_link_source_inputs_ready} | ${fields.combined_contract_link_premise_not_imported} | ${fields.combined_binding_contract_target_pair_declared} | ${fields.combined_value_map_pair_constructed} | ${fields.combined_ref_field_pair_constructed} | ${fields.combined_first_primitive_pair_constructed} | ${fields.combined_target_satisfaction_without_contract_link_pair_proven} | ${fields.combined_ref_value_equations_proof_grade_without_contract_link} | ${fields.combined_compatibility_proofs_without_contract_link} | ${row.row_consumed} |`;
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
  return `# Independent Contract Target Satisfaction Ref-Value Compatibility Without Contract Link Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests whether the inherited binding-contract target
can be satisfied without importing \`witness_object_has_contract_link\`. It is
the direct subproof audit below
\`independent_binding_contract_satisfaction_without_contract_link_present\`,
not a binding-contract closure or theorem-construction packet.

The attempt remains fail-closed. It records ${summary.binding_contract_targets_declared} / ${summary.endpoint_functionals}
binding-contract targets, ${summary.target_objects_constructed} / ${summary.endpoint_functionals}
target endpoint-boundary-binding objects, ${summary.endpoint_value_binding_maps_constructed} / ${summary.endpoint_functionals}
endpoint value-binding maps, ${summary.first_primitives_constructed} / ${summary.endpoint_functionals}
first endpoint boundary-binding primitives, ${summary.witness_object_endpoint_boundary_binding_refs_constructed} / ${summary.endpoint_functionals}
witness-object endpoint-boundary-binding refs, and ${summary.target_satisfaction_without_contract_link_source_inputs_ready} / ${summary.endpoint_functionals}
target-satisfaction-without-contract-link source-input sets, with ${summary.contract_link_premise_not_imported} / ${summary.endpoint_functionals}
contract-link premise non-import guards.

The inherited completion layer still records ${summary.source_contract_target_satisfaction_proofs_present} / ${summary.endpoint_functionals}
source target-satisfaction proofs, ${summary.source_target_ref_value_equations_proof_grade} / ${summary.endpoint_functionals}
source proof-grade target ref/value equation packages, ${summary.source_endpoint_boundary_binding_ref_compatibility_proofs_present} / ${summary.endpoint_functionals}
source endpoint-boundary-binding ref compatibility proofs, and ${summary.source_first_primitive_compatibility_proofs_present} / ${summary.endpoint_functionals}
source first-primitive compatibility proofs.

It records ${summary.independent_contract_target_satisfaction_without_contract_link_proofs_present} / ${summary.endpoint_functionals}
target-satisfaction proofs without the link premise, ${summary.independent_target_ref_value_equations_without_contract_link_proof_grade} / ${summary.endpoint_functionals}
proof-grade target ref/value equation packages, ${summary.independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present} / ${summary.endpoint_functionals}
endpoint-boundary-binding ref compatibility proofs, ${summary.independent_first_primitive_compatibility_without_contract_link_present} / ${summary.endpoint_functionals}
first-primitive compatibility proofs, ${summary.independent_contract_target_satisfaction_derivations_without_contract_link_present} / ${summary.endpoint_functionals}
derivations, ${summary.independent_contract_target_satisfaction_soundness_proofs_without_contract_link_present} / ${summary.endpoint_functionals}
soundness proofs, ${summary.independent_contract_target_satisfaction_endpoint_application_proofs_without_contract_link_present} / ${summary.endpoint_functionals}
endpoint application proofs, ${summary.row_consumption_count} consumed rows,
and \`branch_chart_authorized=false\`.
It also records ${summary.target_ref_value_compatibility_without_contract_link_foundation_ready} / ${summary.endpoint_functionals}
target/ref-value/compatibility foundation-ready records.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
${sourceTable(packet.source_artifacts)}

## Target

${packet.target.statement}

Accepted if: ${packet.target.accepted_if}

## No-Promotion Rule

${packet.no_promotion_rule}

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
${burdenTable(packet.proof_burdens)}

## Tested Target Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.target_proof_routes)}

## Endpoint Attempts

| Endpoint | Role | Inputs ready | Link not imported | Target declared | Value map | Ref field | First primitive | Proof-grade ref/value | Ref compatibility | Primitive compatibility | Foundation ready | Target satisfied without link | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempts)}

## Row Attempts

| Row | Input pair | Link guard pair | Target pair | Value-map pair | Ref-field pair | First-primitive pair | Target pair proven | Ref/value proof-grade pair | Compatibility pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempts)}

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

  const sources = {
    parent: readJson(args.parentPacket),
    completion: readJson(args.completionPacket),
    contractTarget: readJson(args.contractTargetPacket),
    valueMap: readJson(args.valueMapPacket),
    primitive: readJson(args.primitivePacket),
    ref: readJson(args.refPacket),
  };
  const sourcePaths = {
    parent: args.parentPacket,
    completion: args.completionPacket,
    contractTarget: args.contractTargetPacket,
    valueMap: args.valueMapPacket,
    primitive: args.primitivePacket,
    ref: args.refPacket,
  };
  const packet = buildPacket(sources, sourcePaths);

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

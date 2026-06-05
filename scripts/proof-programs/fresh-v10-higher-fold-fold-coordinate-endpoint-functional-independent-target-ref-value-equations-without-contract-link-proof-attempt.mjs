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
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPLETION_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_full_binding_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_OBJECT_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_target_endpoint_boundary_binding_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NO_LINK_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_equations_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_independent_target_ref_value_equations_without_contract_link_proof_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const PARENT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-contract-target-satisfaction-ref-value-compatibility-without-contract-link-proof-attempt-fail-closed-source-targets-value-maps-ref-fields-and-primitives-present-target-satisfaction-without-contract-link-absent-no-row-consumption";
const COMPLETION_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-full-binding-completion-attempt-fail-closed-source-candidates-and-route-tests-present-actual-link-membership-binding-full-binding-carrier-admission-absent-no-row-consumption";
const TARGET_OBJECT_STATUS =
  "fold_coordinate_endpoint_functional_component_domain_target_endpoint_boundary_binding_object_construction_partial_pass_object_constructed_full_binding_blocked";
const CONTRACT_TARGET_STATUS =
  "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";
const NO_LINK_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-full-endpoint-boundary-binding-no-contract-link-premise-proof-attempt-fail-closed-selected-route-inputs-present-no-contract-link-premise-proof-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-equations-without-contract-link-proof-attempt-fail-closed-target-value-map-source-equations-present-proof-grade-target-ref-value-equations-absent-no-row-consumption";

const TARGET_REF_VALUE_SOURCE_FIELDS = [
  "parent_target_ref_value_compatibility_packet_input_present",
  "target_endpoint_boundary_binding_object_packet_input_present",
  "no_contract_link_premise_packet_input_present",
  "parent_target_satisfaction_without_contract_link_source_inputs_ready",
  "contract_link_premise_not_imported",
  "no_contract_link_independence_guard_declared",
  "binding_contract_target_declared",
  "target_endpoint_boundary_binding_object_constructed",
  "target_boundary_binding_object_has_endpoint_refs",
  "target_boundary_binding_object_has_endpoint_values",
  "target_action_exact_under_target_boundary_binding_object",
  "endpoint_value_binding_map_constructed",
  "endpoint_value_bound_to_boundary_binding_from_value_map",
  "endpoint_value_binding_map_ref_values_certified",
  "target_endpoint_ref_value_source_equations_present",
  "target_endpoint_ref_value_source_equation_count_matches_target",
  "target_endpoint_ref_value_source_equations_all_source_only",
  "value_map_source_equations_source_equation_only",
  "value_map_value_bindings_present",
  "value_map_value_binding_count_matches_source_equations",
  "value_map_ref_value_payload_matches_target_object",
  "endpoint_value_map_proof_grade_status_endpoint_value_map_only",
  "target_ref_value_equation_payload_assembled_without_contract_link",
];

const TARGET_REF_VALUE_PROOF_FIELDS = [
  "source_target_ref_value_equations_proof_grade",
  "target_ref_value_equations_without_contract_link_source_inputs_ready",
  "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
  "independent_target_ref_value_equation_derivation_without_contract_link_present",
  "independent_target_ref_value_equation_soundness_without_contract_link_present",
  "independent_target_ref_value_equation_endpoint_application_without_contract_link_present",
  "independent_target_ref_value_equations_without_contract_link_proof_grade",
];

const DOWNSTREAM_LOCK_FIELDS = [
  "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
  "independent_first_primitive_compatibility_without_contract_link_present",
  "independent_contract_target_satisfaction_without_contract_link_proof_present",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...TARGET_REF_VALUE_SOURCE_FIELDS,
  ...TARGET_REF_VALUE_PROOF_FIELDS,
  ...DOWNSTREAM_LOCK_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_target_ref_value_equations_without_contract_link_source_inputs_ready",
  "receiver_target_ref_value_equations_without_contract_link_source_inputs_ready",
  "combined_target_ref_value_equations_without_contract_link_source_inputs_ready",
  "source_contract_link_premise_not_imported",
  "receiver_contract_link_premise_not_imported",
  "combined_contract_link_premise_not_imported",
  "source_target_endpoint_ref_value_source_equations_present",
  "receiver_target_endpoint_ref_value_source_equations_present",
  "combined_target_endpoint_ref_value_source_equations_present",
  "source_value_map_ref_values_certified",
  "receiver_value_map_ref_values_certified",
  "combined_value_map_ref_values_certified",
  "source_ref_value_equations_proof_grade_without_contract_link",
  "receiver_ref_value_equations_proof_grade_without_contract_link",
  "combined_ref_value_equations_proof_grade_without_contract_link",
  "source_target_satisfaction_without_contract_link_proven",
  "receiver_target_satisfaction_without_contract_link_proven",
  "combined_target_satisfaction_without_contract_link_pair_proven",
  "source_compatibility_proofs_without_contract_link",
  "receiver_compatibility_proofs_without_contract_link",
  "combined_compatibility_proofs_without_contract_link",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const TARGET_REF_VALUE_ROUTES = [
  {
    route_id: "target_endpoint_values_as_proof_grade_ref_value_equations",
    status: "rejected-target-object-only",
    required_fields: [
      "target_boundary_binding_object_has_endpoint_refs",
      "target_boundary_binding_object_has_endpoint_values",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    ],
    limitation:
      "Target endpoint refs and values declare the obligation but do not prove that the value-map equations are proof-grade without the link premise.",
  },
  {
    route_id: "value_map_source_equations_as_proof_grade_ref_value_equations",
    status: "rejected-source-equation-only",
    required_fields: [
      "target_endpoint_ref_value_source_equations_present",
      "target_endpoint_ref_value_source_equations_all_source_only",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    ],
    limitation:
      "Source endpoint equations remain source-scope until a proof-grade promotion rule, derivation, and soundness proof are present.",
  },
  {
    route_id: "value_map_ref_value_certification_as_proof_grade_equations",
    status: "rejected-certification-only",
    required_fields: [
      "endpoint_value_binding_map_ref_values_certified",
      "endpoint_value_map_proof_grade_status_endpoint_value_map_only",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    ],
    limitation:
      "Value-map ref/value certification records attachment data but is explicitly only endpoint-value-map evidence, not proof-grade target ref/value equations.",
  },
  {
    route_id: "completion_packet_source_ref_value_status_as_independent_no_link_proof",
    status: "rejected-source-status-only",
    required_fields: [
      "source_target_ref_value_equations_proof_grade",
      "contract_link_premise_not_imported",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    ],
    limitation:
      "The inherited completion packet does not provide source proof-grade ref/value equations, and a source status would still need an independent no-link proof.",
  },
  {
    route_id: "target_ref_value_equation_promotion_derivation_without_contract_link",
    status: "absent",
    required_fields: [
      "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
      "independent_target_ref_value_equation_derivation_without_contract_link_present",
      "independent_target_ref_value_equation_soundness_without_contract_link_present",
      "independent_target_ref_value_equation_endpoint_application_without_contract_link_present",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    ],
    limitation:
      "No promotion rule, derivation, soundness proof, endpoint application proof, or proof-grade target ref/value equation package is present.",
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "proof_grade_target_ref_value_equations_without_contract_link",
    missing_field:
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    required_evidence:
      "A proof-grade package that upgrades the endpoint value-map source equations into target ref/value equations without importing `witness_object_has_contract_link`.",
  },
  {
    burden_id: "target_ref_value_equation_promotion_rule_without_contract_link",
    missing_field:
      "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
    required_evidence:
      "A rule stating exactly when target endpoint refs/values and endpoint value-map equations become proof-grade target ref/value equations without the link premise.",
  },
  {
    burden_id: "target_ref_value_equation_derivation_without_contract_link",
    missing_field:
      "independent_target_ref_value_equation_derivation_without_contract_link_present",
    required_evidence:
      "A derivation applying the promotion rule to each endpoint using only target objects, value maps, source equations, and no-link guards.",
  },
  {
    burden_id: "target_ref_value_equation_soundness_without_contract_link",
    missing_field:
      "independent_target_ref_value_equation_soundness_without_contract_link_present",
    required_evidence:
      "A soundness proof that source equations, endpoint-value-map certifications, and target declarations are not renamed as proof-grade equations without the promotion rule.",
  },
  {
    burden_id: "target_ref_value_equation_endpoint_application_without_contract_link",
    missing_field:
      "independent_target_ref_value_equation_endpoint_application_without_contract_link_present",
    required_evidence:
      "Endpoint-by-endpoint application proof for all four endpoint functionals without importing the link premise.",
  },
];

function parseArgs(argv) {
  const args = {
    parentPacket: DEFAULT_PARENT_PACKET,
    completionPacket: DEFAULT_COMPLETION_PACKET,
    targetObjectPacket: DEFAULT_TARGET_OBJECT_PACKET,
    contractTargetPacket: DEFAULT_CONTRACT_TARGET_PACKET,
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    noLinkPacket: DEFAULT_NO_LINK_PACKET,
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
    } else if (arg === "--target-object-packet") {
      args.targetObjectPacket = argv[++index];
    } else if (arg === "--contract-target-packet") {
      args.contractTargetPacket = argv[++index];
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
    } else if (arg === "--no-link-packet") {
      args.noLinkPacket = argv[++index];
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
    "Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-independent-target-ref-value-equations-without-contract-link-proof-attempt.mjs [options]",
    "",
    "Options:",
    "  --parent-packet <path>",
    "  --completion-packet <path>",
    "  --target-object-packet <path>",
    "  --contract-target-packet <path>",
    "  --value-map-packet <path>",
    "  --no-link-packet <path>",
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

function equationStatuses(valueMap) {
  return (valueMap.target_endpoint_value_binding_source_equations ?? []).map(
    (equation) => equation.proof_grade_binding_status
  );
}

function payloadKey(item) {
  return [
    item.row_id,
    item.role,
    item.endpoint_ref,
    item.endpoint_value?.display,
  ].join("|");
}

function payloadMatchesTargetObject(sourceEquations, targetRefs) {
  if (sourceEquations.length === 0 || sourceEquations.length !== targetRefs.length) {
    return false;
  }
  const targetKeys = new Set(targetRefs.map((targetRef) => payloadKey(targetRef)));
  return sourceEquations.every((equation) => targetKeys.has(payloadKey(equation)));
}

function buildEndpointAttempt({
  parent,
  completion,
  targetObject,
  contractTarget,
  valueMap,
  noLink,
}) {
  const parentFields = parent.required_fields_present ?? {};
  const completionFields = completion.required_fields_present ?? {};
  const targetObjectFields = targetObject.required_fields_present ?? {};
  const contractFields = contractTarget.required_fields_present ?? {};
  const valueFields = valueMap.required_fields_present ?? {};
  const noLinkFields = noLink.required_fields_present ?? {};
  const sourceEquations =
    valueMap.target_endpoint_value_binding_source_equations ?? [];
  const valueBindings = valueMap.endpoint_value_binding_map?.value_bindings ?? [];
  const sourceEquationStatuses = equationStatuses(valueMap);
  const targetRefs =
    targetObject.target_boundary_binding_object?.target_endpoint_refs ?? [];
  const targetEquationCount = valueMap.target_endpoint_ref_value_count ?? 0;
  const sourceEquationOnly =
    sourceEquations.length > 0 &&
    sourceEquationStatuses.every((status) => status === "source-equation-only");
  const refValuePayloadMatchesTargetObject = payloadMatchesTargetObject(
    sourceEquations,
    targetRefs
  );

  const fields = {
    parent_target_ref_value_compatibility_packet_input_present: true,
    target_endpoint_boundary_binding_object_packet_input_present: true,
    no_contract_link_premise_packet_input_present: true,
    parent_target_satisfaction_without_contract_link_source_inputs_ready:
      parentFields.target_satisfaction_without_contract_link_source_inputs_ready ===
      true,
    contract_link_premise_not_imported:
      parentFields.contract_link_premise_not_imported === true &&
      noLinkFields.witness_object_has_contract_link !== true,
    no_contract_link_independence_guard_declared:
      noLinkFields.proof_independence_guard_declared === true,
    binding_contract_target_declared:
      parentFields.binding_contract_target_declared === true &&
      contractFields.binding_contract_target_declared === true,
    target_endpoint_boundary_binding_object_constructed:
      parentFields.target_endpoint_boundary_binding_object_constructed === true &&
      contractFields.target_endpoint_boundary_binding_object_constructed === true &&
      targetObjectFields.target_endpoint_boundary_binding_object_constructed === true,
    target_boundary_binding_object_has_endpoint_refs:
      parentFields.target_boundary_binding_object_has_endpoint_refs === true &&
      contractFields.target_boundary_binding_object_has_endpoint_refs === true &&
      targetObjectFields.target_boundary_binding_object_has_endpoint_refs === true,
    target_boundary_binding_object_has_endpoint_values:
      parentFields.target_boundary_binding_object_has_endpoint_values === true &&
      contractFields.target_boundary_binding_object_has_endpoint_values === true &&
      targetObjectFields.target_boundary_binding_object_has_endpoint_values === true,
    target_action_exact_under_target_boundary_binding_object:
      parentFields.target_action_exact_under_target_boundary_binding_object ===
        true &&
      contractFields.target_action_exact_under_target_boundary_binding_object ===
        true &&
      targetObjectFields.target_action_exact_under_target_boundary_binding_object ===
        true,
    endpoint_value_binding_map_constructed:
      parentFields.endpoint_value_binding_map_constructed === true &&
      valueFields.endpoint_value_binding_map_constructed === true,
    endpoint_value_bound_to_boundary_binding_from_value_map:
      parentFields.endpoint_value_bound_to_boundary_binding_from_value_map ===
        true &&
      valueFields.endpoint_value_bound_to_boundary_binding === true,
    endpoint_value_binding_map_ref_values_certified:
      parentFields.endpoint_value_binding_map_ref_values_certified === true &&
      valueFields.endpoint_value_binding_map_ref_values_certified === true,
    target_endpoint_ref_value_source_equations_present:
      sourceEquations.length > 0,
    target_endpoint_ref_value_source_equation_count_matches_target:
      targetEquationCount > 0 && sourceEquations.length === targetEquationCount,
    target_endpoint_ref_value_source_equations_all_source_only:
      sourceEquationOnly,
    value_map_source_equations_source_equation_only: sourceEquationOnly,
    value_map_value_bindings_present: valueBindings.length > 0,
    value_map_value_binding_count_matches_source_equations:
      valueBindings.length > 0 && valueBindings.length === sourceEquations.length,
    value_map_ref_value_payload_matches_target_object:
      refValuePayloadMatchesTargetObject,
    endpoint_value_map_proof_grade_status_endpoint_value_map_only:
      valueMap.endpoint_value_binding_map?.proof_grade_binding_status ===
      "endpoint-value-map-only",
    target_ref_value_equation_payload_assembled_without_contract_link: false,
    source_target_ref_value_equations_proof_grade:
      completionFields.target_ref_value_equations_proof_grade === true ||
      parentFields.source_target_ref_value_equations_proof_grade === true,
    target_ref_value_equations_without_contract_link_source_inputs_ready: false,
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
    independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present:
      parentFields
        .independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present ===
      true,
    independent_first_primitive_compatibility_without_contract_link_present:
      parentFields
        .independent_first_primitive_compatibility_without_contract_link_present ===
      true,
    independent_contract_target_satisfaction_without_contract_link_proof_present:
      parentFields
        .independent_contract_target_satisfaction_without_contract_link_proof_present ===
      true,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
  };

  fields.target_ref_value_equation_payload_assembled_without_contract_link =
    TARGET_REF_VALUE_SOURCE_FIELDS.filter(
      (field) => field !== "target_ref_value_equation_payload_assembled_without_contract_link"
    ).every((field) => fields[field] === true);
  fields.target_ref_value_equations_without_contract_link_source_inputs_ready =
    TARGET_REF_VALUE_SOURCE_FIELDS.every((field) => fields[field] === true);

  const routeAttempts = TARGET_REF_VALUE_ROUTES.map((route) =>
    routeAttempt(route, fields)
  );
  const missingProofBurdens = missingBurdens(fields);

  return {
    id: parent.id,
    endpoint_functional_id: parent.endpoint_functional_id,
    role: parent.role,
    independent_target_ref_value_equations_without_contract_link_proof_attempt_id:
      `independent_target_ref_value_equations_without_contract_link_proof_attempt:${parent.id}`,
    source_attempt_ids: {
      parent_contract_target_satisfaction_ref_value_compatibility_without_contract_link:
        parent
          .independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt_id,
      binding_full_binding_completion:
        completion.binding_full_binding_completion_attempt_id,
      target_endpoint_boundary_binding_object:
        targetObject.target_boundary_binding_object?.object_id,
      full_endpoint_boundary_binding_contract_target:
        contractTarget.full_endpoint_boundary_binding_contract_target?.target_id,
      endpoint_value_binding_map:
        valueMap.endpoint_value_binding_map_construction_attempt_id,
      no_contract_link_premise:
        noLink.no_contract_link_premise_proof_attempt_id,
    },
    target: {
      target_id: `independent_target_ref_value_equations_without_contract_link:${parent.id}`,
      statement:
        "Promote the endpoint value-map source equations into proof-grade target ref/value equations without importing `witness_object_has_contract_link`.",
      accepted_if:
        "The endpoint supplies a promotion rule, endpoint derivation, soundness proof, endpoint application proof, and proof-grade target ref/value package without the link premise.",
      prohibited_premises: [
        "witness_object_has_contract_link",
        "witness_object_contract_link_constructed",
        "actual contract-link rule application",
        "compatibility proof promotion",
        "target-satisfaction proof promotion",
        "row consumption",
        "branch-chart authorization",
      ],
    },
    target_ref_value_source_payload: {
      target_endpoint_ref_value_count: targetEquationCount,
      target_object_endpoint_ref_value_count: targetRefs.length,
      source_equation_count: sourceEquations.length,
      value_binding_count: valueBindings.length,
      source_equation_statuses: sourceEquationStatuses,
      endpoint_refs: sourceEquations.map((equation) => equation.endpoint_ref),
      equation_kinds: sourceEquations.map((equation) => equation.equation_kind),
      value_map_binding_statuses: valueBindings.map(
        (binding) => binding.binding_status
      ),
    },
    required_fields_present: fields,
    target_ref_value_proof_route_attempts: routeAttempts,
    target_ref_value_proof_routes_passed: [],
    missing_target_ref_value_obligations: missing(
      fields,
      TARGET_REF_VALUE_PROOF_FIELDS
    ),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    first_exact_blockers: missingProofBurdens
      .slice(0, 5)
      .map((burden) => burden.missing_field),
    independent_target_ref_value_equations_without_contract_link_proof_grade:
      fields
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "The endpoint has target endpoint refs/values, endpoint value-map source equations, and value-map ref/value certification, but no no-link promotion rule, derivation, soundness proof, or proof-grade target ref/value equation package is present.",
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
    source_target_ref_value_equations_without_contract_link_source_inputs_ready:
      sourceFields
        .target_ref_value_equations_without_contract_link_source_inputs_ready,
    receiver_target_ref_value_equations_without_contract_link_source_inputs_ready:
      receiverFields
        .target_ref_value_equations_without_contract_link_source_inputs_ready,
    combined_target_ref_value_equations_without_contract_link_source_inputs_ready:
      false,
    source_contract_link_premise_not_imported:
      sourceFields.contract_link_premise_not_imported,
    receiver_contract_link_premise_not_imported:
      receiverFields.contract_link_premise_not_imported,
    combined_contract_link_premise_not_imported: false,
    source_target_endpoint_ref_value_source_equations_present:
      sourceFields.target_endpoint_ref_value_source_equations_present,
    receiver_target_endpoint_ref_value_source_equations_present:
      receiverFields.target_endpoint_ref_value_source_equations_present,
    combined_target_endpoint_ref_value_source_equations_present: false,
    source_value_map_ref_values_certified:
      sourceFields.endpoint_value_binding_map_ref_values_certified,
    receiver_value_map_ref_values_certified:
      receiverFields.endpoint_value_binding_map_ref_values_certified,
    combined_value_map_ref_values_certified: false,
    source_ref_value_equations_proof_grade_without_contract_link:
      sourceFields
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    receiver_ref_value_equations_proof_grade_without_contract_link:
      receiverFields
        .independent_target_ref_value_equations_without_contract_link_proof_grade,
    combined_ref_value_equations_proof_grade_without_contract_link: false,
    source_target_satisfaction_without_contract_link_proven:
      sourceFields
        .independent_contract_target_satisfaction_without_contract_link_proof_present,
    receiver_target_satisfaction_without_contract_link_proven:
      receiverFields
        .independent_contract_target_satisfaction_without_contract_link_proof_present,
    combined_target_satisfaction_without_contract_link_pair_proven: false,
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

  fields.combined_target_ref_value_equations_without_contract_link_source_inputs_ready =
    fields
      .source_target_ref_value_equations_without_contract_link_source_inputs_ready &&
    fields
      .receiver_target_ref_value_equations_without_contract_link_source_inputs_ready;
  fields.combined_contract_link_premise_not_imported =
    fields.source_contract_link_premise_not_imported &&
    fields.receiver_contract_link_premise_not_imported;
  fields.combined_target_endpoint_ref_value_source_equations_present =
    fields.source_target_endpoint_ref_value_source_equations_present &&
    fields.receiver_target_endpoint_ref_value_source_equations_present;
  fields.combined_value_map_ref_values_certified =
    fields.source_value_map_ref_values_certified &&
    fields.receiver_value_map_ref_values_certified;
  fields.combined_ref_value_equations_proof_grade_without_contract_link =
    fields.source_ref_value_equations_proof_grade_without_contract_link &&
    fields.receiver_ref_value_equations_proof_grade_without_contract_link;
  fields.combined_target_satisfaction_without_contract_link_pair_proven =
    fields.source_target_satisfaction_without_contract_link_proven &&
    fields.receiver_target_satisfaction_without_contract_link_proven;
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
    source_independent_target_ref_value_equations_without_contract_link_proof_attempt_id:
      source
        .independent_target_ref_value_equations_without_contract_link_proof_attempt_id,
    receiver_independent_target_ref_value_equations_without_contract_link_proof_attempt_id:
      receiver
        .independent_target_ref_value_equations_without_contract_link_proof_attempt_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver target ref/value source-input pairs and no-link guards, but no source/receiver proof-grade target ref/value equation pair, target-satisfaction pair, or compatibility pair without the link premise.",
  };
}

function buildPacket(sources, sourcePaths) {
  assertPacket(
    sources.parent,
    PARENT_STATUS,
    "target/ref-value/compatibility parent packet"
  );
  assertPacket(sources.completion, COMPLETION_STATUS, "completion packet");
  assertPacket(
    sources.targetObject,
    TARGET_OBJECT_STATUS,
    "target endpoint boundary-binding object packet"
  );
  assertPacket(
    sources.contractTarget,
    CONTRACT_TARGET_STATUS,
    "contract target packet"
  );
  assertPacket(sources.valueMap, VALUE_MAP_STATUS, "value-map packet");
  assertPacket(
    sources.noLink,
    NO_LINK_STATUS,
    "no-contract-link premise packet"
  );

  const completionById = idMap(
    sources.completion.endpoint_binding_full_binding_completion_attempts,
    "id",
    "binding/full-binding completion endpoint"
  );
  const targetObjectById = idMap(
    sources.targetObject.endpoint_target_boundary_binding_object_attempts,
    "id",
    "target endpoint boundary-binding object endpoint"
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
  const noLinkById = idMap(
    sources.noLink.endpoint_no_contract_link_premise_proof_attempts,
    "id",
    "no-contract-link premise endpoint"
  );

  const endpointAttempts =
    sources.parent
      .endpoint_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempts.map(
        (parent) =>
          buildEndpointAttempt({
            parent,
            completion: requireMapped(
              completionById,
              parent.id,
              `completion endpoint ${parent.id}`
            ),
            targetObject: requireMapped(
              targetObjectById,
              parent.id,
              `target object endpoint ${parent.id}`
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
            noLink: requireMapped(
              noLinkById,
              parent.id,
              `no-contract-link endpoint ${parent.id}`
            ),
          })
      );
  const endpointMap = idMap(
    endpointAttempts,
    "id",
    "independent target ref/value equation endpoint"
  );
  const rowAttempts =
    sources.parent
      .row_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempts.map(
        (row) => buildRowAttempt(row, endpointMap)
      );
  const endpointFieldCounts = fieldCounts(endpointAttempts, ENDPOINT_FIELDS);
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS);
  const totalTargetRefValueEquations = endpointAttempts.reduce(
    (sum, endpoint) =>
      sum + endpoint.target_ref_value_source_payload.source_equation_count,
    0
  );
  const totalValueMapBindings = endpointAttempts.reduce(
    (sum, endpoint) =>
      sum + endpoint.target_ref_value_source_payload.value_binding_count,
    0
  );
  const totalTargetObjectRefValues = endpointAttempts.reduce(
    (sum, endpoint) =>
      sum + endpoint.target_ref_value_source_payload.target_object_endpoint_ref_value_count,
    0
  );

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-independent-target-ref-value-equations-without-contract-link-proof-attempt-v1",
    status: STATUS,
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    claim_level:
      "priority-only fail-closed proof attempt; target endpoint refs/values and endpoint value-map source equations are present, but proof-grade target ref/value equations without the contract link are absent",
    source_artifacts: makeSourceArtifacts([
      {
        label: "independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt",
        filePath: sourcePaths.parent,
      },
      {
        label: "binding_full_binding_completion_attempt",
        filePath: sourcePaths.completion,
      },
      {
        label: "target_endpoint_boundary_binding_object_construction_attempt",
        filePath: sourcePaths.targetObject,
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
        label: "independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt",
        filePath: sourcePaths.noLink,
      },
    ]),
    target: {
      target_id:
        "independent-target-ref-value-equations-without-contract-link-target",
      statement:
        "For each endpoint functional, prove that endpoint value-map source equations are proof-grade target ref/value equations without importing `witness_object_has_contract_link`.",
      accepted_if:
        "Each endpoint has a no-link promotion rule, derivation, soundness proof, endpoint application proof, and proof-grade target ref/value equation package.",
      current_proof_grade_ref_value_packages:
        endpointFieldCounts
          .independent_target_ref_value_equations_without_contract_link_proof_grade,
    },
    no_promotion_rule:
      "Target endpoint refs/values, source equations, endpoint-value-map certifications, and parent-packet blockers are not promoted into proof-grade target ref/value equations without an independent promotion rule, derivation, soundness proof, and endpoint application proof.",
    proof_burdens: PROOF_BURDENS,
    target_ref_value_proof_routes: TARGET_REF_VALUE_ROUTES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_independent_target_ref_value_equations_without_contract_link_proof_attempts:
      endpointAttempts,
    row_independent_target_ref_value_equations_without_contract_link_proof_attempts:
      rowAttempts,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      target_endpoint_boundary_binding_object_packet_inputs:
        endpointFieldCounts
          .target_endpoint_boundary_binding_object_packet_input_present,
      no_contract_link_premise_packet_inputs:
        endpointFieldCounts.no_contract_link_premise_packet_input_present,
      parent_target_satisfaction_without_contract_link_source_inputs_ready:
        endpointFieldCounts
          .parent_target_satisfaction_without_contract_link_source_inputs_ready,
      contract_link_premise_not_imported:
        endpointFieldCounts.contract_link_premise_not_imported,
      no_contract_link_independence_guards_declared:
        endpointFieldCounts.no_contract_link_independence_guard_declared,
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
      endpoint_value_binding_map_ref_values_certified:
        endpointFieldCounts.endpoint_value_binding_map_ref_values_certified,
      target_endpoint_ref_value_source_equations_present:
        endpointFieldCounts.target_endpoint_ref_value_source_equations_present,
      total_target_object_ref_values: totalTargetObjectRefValues,
      total_target_ref_value_source_equations: totalTargetRefValueEquations,
      total_value_map_bindings: totalValueMapBindings,
      target_endpoint_ref_value_source_equation_count_matches_target:
        endpointFieldCounts
          .target_endpoint_ref_value_source_equation_count_matches_target,
      target_endpoint_ref_value_source_equations_all_source_only:
        endpointFieldCounts
          .target_endpoint_ref_value_source_equations_all_source_only,
      value_map_source_equations_source_equation_only:
        endpointFieldCounts.value_map_source_equations_source_equation_only,
      value_map_value_bindings_present:
        endpointFieldCounts.value_map_value_bindings_present,
      value_map_value_binding_count_matches_source_equations:
        endpointFieldCounts
          .value_map_value_binding_count_matches_source_equations,
      value_map_ref_value_payload_matches_target_object:
        endpointFieldCounts.value_map_ref_value_payload_matches_target_object,
      endpoint_value_map_status_endpoint_value_map_only:
        endpointFieldCounts
          .endpoint_value_map_proof_grade_status_endpoint_value_map_only,
      target_ref_value_equation_payloads_assembled_without_contract_link:
        endpointFieldCounts
          .target_ref_value_equation_payload_assembled_without_contract_link,
      source_target_ref_value_equations_proof_grade:
        endpointFieldCounts.source_target_ref_value_equations_proof_grade,
      target_ref_value_equations_without_contract_link_source_inputs_ready:
        endpointFieldCounts
          .target_ref_value_equations_without_contract_link_source_inputs_ready,
      target_ref_value_equation_promotion_rules_without_contract_link_present:
        endpointFieldCounts
          .independent_target_ref_value_equation_promotion_rule_without_contract_link_present,
      target_ref_value_equation_derivations_without_contract_link_present:
        endpointFieldCounts
          .independent_target_ref_value_equation_derivation_without_contract_link_present,
      target_ref_value_equation_soundness_without_contract_link_present:
        endpointFieldCounts
          .independent_target_ref_value_equation_soundness_without_contract_link_present,
      target_ref_value_equation_endpoint_applications_without_contract_link_present:
        endpointFieldCounts
          .independent_target_ref_value_equation_endpoint_application_without_contract_link_present,
      independent_target_ref_value_equations_without_contract_link_proof_grade:
        endpointFieldCounts
          .independent_target_ref_value_equations_without_contract_link_proof_grade,
      independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present:
        endpointFieldCounts
          .independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present,
      independent_first_primitive_compatibility_without_contract_link_present:
        endpointFieldCounts
          .independent_first_primitive_compatibility_without_contract_link_present,
      independent_contract_target_satisfaction_without_contract_link_proofs_present:
        endpointFieldCounts
          .independent_contract_target_satisfaction_without_contract_link_proof_present,
      row_target_ref_value_source_input_pairs_ready:
        rowFieldCounts
          .combined_target_ref_value_equations_without_contract_link_source_inputs_ready,
      row_contract_link_premise_not_imported_pairs:
        rowFieldCounts.combined_contract_link_premise_not_imported,
      row_source_equation_pairs_present:
        rowFieldCounts.combined_target_endpoint_ref_value_source_equations_present,
      row_value_map_ref_value_certification_pairs:
        rowFieldCounts.combined_value_map_ref_values_certified,
      row_ref_value_equation_pairs_proof_grade:
        rowFieldCounts
          .combined_ref_value_equations_proof_grade_without_contract_link,
      row_target_satisfaction_pairs_proven:
        rowFieldCounts
          .combined_target_satisfaction_without_contract_link_pair_proven,
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
        "No endpoint supplies proof-grade target ref/value equations without the link premise; compatibility, target satisfaction, rows, and branch charts remain locked.",
    },
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    branch_chart_authorized: false,
    capture_decision:
      "priority-only; records a fail-closed independent target-ref/value-equations-without-contract-link proof attempt and does not promote to reader-facing corpus prose.",
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
      return `| ${endpoint.id} | ${endpoint.role} | ${fields.target_ref_value_equations_without_contract_link_source_inputs_ready} | ${fields.contract_link_premise_not_imported} | ${fields.target_boundary_binding_object_has_endpoint_refs} | ${fields.target_boundary_binding_object_has_endpoint_values} | ${payload.source_equation_count} | ${payload.value_binding_count} | ${fields.target_endpoint_ref_value_source_equations_all_source_only} | ${fields.endpoint_value_map_proof_grade_status_endpoint_value_map_only} | ${fields.independent_target_ref_value_equations_without_contract_link_proof_grade} | ${fields.independent_contract_target_satisfaction_without_contract_link_proof_present} | ${endpoint.first_exact_blockers.join(", ")} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const fields = row.required_fields_present;
      return `| ${row.row_id} | ${fields.combined_target_ref_value_equations_without_contract_link_source_inputs_ready} | ${fields.combined_contract_link_premise_not_imported} | ${fields.combined_target_endpoint_ref_value_source_equations_present} | ${fields.combined_value_map_ref_values_certified} | ${fields.combined_ref_value_equations_proof_grade_without_contract_link} | ${fields.combined_target_satisfaction_without_contract_link_pair_proven} | ${fields.combined_compatibility_proofs_without_contract_link} | ${row.row_consumed} |`;
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
  return `# Independent Target Ref/Value Equations Without Contract Link Proof Attempt

## Verdict

Status: ${packet.status}

This priority-only packet tests whether endpoint value-map source equations can
be promoted into proof-grade target ref/value equations without importing
\`witness_object_has_contract_link\`. It is the direct subproof audit for
\`independent_target_ref_value_equations_without_contract_link_proof_grade\`
under the target/ref-value/compatibility packet, not a compatibility,
target-satisfaction, binding-contract, row-consumption, or theorem-construction
packet.

The attempt remains fail-closed. It records ${summary.binding_contract_targets_declared} / ${summary.endpoint_functionals}
binding-contract targets, ${summary.target_objects_constructed} / ${summary.endpoint_functionals}
target endpoint-boundary-binding objects, ${summary.target_objects_with_refs} / ${summary.endpoint_functionals}
target objects with endpoint refs, ${summary.target_objects_with_values} / ${summary.endpoint_functionals}
target objects with endpoint values, ${summary.endpoint_value_binding_maps_constructed} / ${summary.endpoint_functionals}
endpoint value-binding maps, ${summary.endpoint_values_bound_by_value_map} / ${summary.endpoint_functionals}
endpoint values bound by value maps, ${summary.endpoint_value_binding_map_ref_values_certified} / ${summary.endpoint_functionals}
value-map ref/value certifications, ${summary.target_endpoint_ref_value_source_equations_present} / ${summary.endpoint_functionals}
target endpoint ref/value source-equation sets, ${summary.total_target_ref_value_source_equations} / ${summary.total_target_object_ref_values}
individual target ref/value source equations matched by value-map bindings,
${summary.value_map_ref_value_payload_matches_target_object} / ${summary.endpoint_functionals}
endpoint payloads matching the target object, and ${summary.contract_link_premise_not_imported} / ${summary.endpoint_functionals}
contract-link premise non-import guards with ${summary.no_contract_link_independence_guards_declared} / ${summary.endpoint_functionals}
no-link independence guards declared.

The source equations remain source-scope. It records ${summary.target_endpoint_ref_value_source_equations_all_source_only} / ${summary.endpoint_functionals}
endpoint source-equation sets explicitly marked \`source-equation-only\`,
${summary.value_map_source_equations_source_equation_only} / ${summary.endpoint_functionals}
value-map source-equation sets retained as source equations,
${summary.endpoint_value_map_status_endpoint_value_map_only} / ${summary.endpoint_functionals}
endpoint value maps explicitly marked \`endpoint-value-map-only\`, and
${summary.source_target_ref_value_equations_proof_grade} / ${summary.endpoint_functionals}
inherited source proof-grade target ref/value equation packages.

It records ${summary.independent_target_ref_value_equations_without_contract_link_proof_grade} / ${summary.endpoint_functionals}
proof-grade target ref/value equation packages without the link premise,
${summary.target_ref_value_equation_promotion_rules_without_contract_link_present} / ${summary.endpoint_functionals}
promotion rules, ${summary.target_ref_value_equation_derivations_without_contract_link_present} / ${summary.endpoint_functionals}
derivations, ${summary.target_ref_value_equation_soundness_without_contract_link_present} / ${summary.endpoint_functionals}
soundness proofs, ${summary.target_ref_value_equation_endpoint_applications_without_contract_link_present} / ${summary.endpoint_functionals}
endpoint application proofs, ${summary.independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present} / ${summary.endpoint_functionals}
endpoint-boundary-binding ref compatibility proofs, ${summary.independent_first_primitive_compatibility_without_contract_link_present} / ${summary.endpoint_functionals}
first-primitive compatibility proofs, ${summary.independent_contract_target_satisfaction_without_contract_link_proofs_present} / ${summary.endpoint_functionals}
target-satisfaction proofs, ${summary.row_consumption_count} consumed rows, and
\`branch_chart_authorized=false\`.

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

## Tested Target Ref/Value Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
${routeTable(packet.target_ref_value_proof_routes)}

## Endpoint Attempts

| Endpoint | Role | Inputs ready | Link not imported | Target refs | Target values | Source equations | Value bindings | Source-only equations | Value-map-only status | Proof-grade ref/value | Target satisfied | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${endpointTable(packet.endpoint_independent_target_ref_value_equations_without_contract_link_proof_attempts)}

## Row Attempts

| Row | Input pair | Link guard pair | Source-equation pair | Value-map cert pair | Ref/value proof-grade pair | Target pair proven | Compatibility pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_independent_target_ref_value_equations_without_contract_link_proof_attempts)}

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
    targetObject: readJson(args.targetObjectPacket),
    contractTarget: readJson(args.contractTargetPacket),
    valueMap: readJson(args.valueMapPacket),
    noLink: readJson(args.noLinkPacket),
  };
  const sourcePaths = {
    parent: args.parentPacket,
    completion: args.completionPacket,
    targetObject: args.targetObjectPacket,
    contractTarget: args.contractTargetPacket,
    valueMap: args.valueMapPacket,
    noLink: args.noLinkPacket,
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

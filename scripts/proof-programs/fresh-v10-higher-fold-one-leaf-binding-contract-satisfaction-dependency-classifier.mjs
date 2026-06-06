#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PAIR_ATTEMPT = `${CERT_DIR}/one_leaf_endpoint_box_residual_function_pair_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT_ADMISSION = `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DEPENDENCY_CYCLE = `${CERT_DIR}/fold_coordinate_endpoint_functional_actual_link_membership_dependency_cycle_completion_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NO_CONTRACT_LINK = `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_CONTRACT_NO_LINK = `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_binding_contract_satisfaction_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_COMPATIBILITY = `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_REF_VALUE = `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_equations_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PROMOTION_RULE = `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONSTRUCTOR_BASIS = `${CERT_DIR}/target_ref_value_object_domain_membership_predicate_signature_formation_constructor_basis_derivation_proof_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PROMOTION_RULE_TARGET = `${CERT_DIR}/fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_target.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_binding_contract_satisfaction_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `one_leaf_binding_contract_satisfaction_dependency_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const ENDPOINT_ORDER = [
  "fc_sigma_source_lower",
  "fc_rho_receiver_lower",
  "fc_sigma_source_upper",
  "fc_rho_receiver_upper",
];

const ENDPOINT_LAYER_FIELDS = [
  {
    layer_id: "endpoint_box_pair_attempt",
    source_key: "pairAttempt",
    fields: [
      "endpoint_boundary_binding_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
      "endpoint_value_binding_map_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
      "witness_object_has_contract_link",
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      "endpoint_value_binding_map_carrier_unblocked",
    ],
  },
  {
    layer_id: "binding_contract_full_binding_carrier_admission",
    source_key: "contractAdmission",
    fields: [
      "binding_contract_satisfaction_test_applied",
      "binding_contract_satisfied",
      "witness_object_has_contract_link",
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      "endpoint_value_binding_map_carrier_unblocked",
    ],
  },
  {
    layer_id: "actual_link_membership_dependency_cycle",
    source_key: "dependencyCycle",
    fields: [
      "dependency_cycle_detected",
      "cycle_breaker_available",
      "actual_contract_link_rule_available",
      "same_constructed_witness_object_identity_proof_present",
      "witness_object_membership_proof_present",
      "binding_contract_satisfied",
      "witness_object_has_contract_link",
    ],
  },
  {
    layer_id: "no_contract_link_premise",
    source_key: "noContractLink",
    fields: [
      "allowed_source_inputs_ready",
      "selected_route_requires_witness_object_contract_link",
      "selected_route_requires_binding_contract_satisfaction",
      "independent_no_contract_link_premise_proof_present",
      "independent_no_contract_link_premise_derivation_present",
      "independent_no_contract_link_premise_soundness_proof_present",
      "independent_no_contract_link_premise_endpoint_application_proof_present",
      "selected_route_contract_link_dependency_eliminated",
      "independent_binding_contract_satisfaction_without_contract_link_present",
      "independent_carrier_admission_bridge_present",
    ],
  },
  {
    layer_id: "binding_contract_satisfaction_without_contract_link",
    source_key: "bindingContractNoLink",
    fields: [
      "binding_contract_without_contract_link_source_inputs_ready",
      "selected_route_requires_witness_object_contract_link",
      "ordinary_binding_contract_requires_witness_object_contract_link",
      "source_contract_target_satisfaction_proof_present",
      "source_target_ref_value_equations_proof_grade",
      "source_endpoint_boundary_binding_ref_compatibility_proof_present",
      "source_first_primitive_compatibility_proof_present",
      "independent_binding_contract_satisfaction_without_contract_link_present",
      "selected_route_contract_link_dependency_eliminated",
    ],
  },
  {
    layer_id: "contract_target_satisfaction_ref_value_compatibility",
    source_key: "targetCompatibility",
    fields: [
      "target_satisfaction_without_contract_link_source_inputs_ready",
      "contract_link_premise_not_imported",
      "binding_contract_target_declared",
      "target_object_constructed",
      "endpoint_value_binding_map_constructed",
      "first_primitive_constructed",
      "witness_object_endpoint_boundary_binding_ref_constructed",
      "independent_contract_target_satisfaction_without_contract_link_proof_present",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
      "independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present",
      "independent_first_primitive_compatibility_without_contract_link_present",
    ],
  },
  {
    layer_id: "target_ref_value_equations_without_contract_link",
    source_key: "targetRefValue",
    fields: [
      "target_ref_value_equations_without_contract_link_source_inputs_ready",
      "target_endpoint_ref_value_source_equations_present",
      "target_endpoint_ref_value_source_equations_all_source_only",
      "endpoint_value_map_status_endpoint_value_map_only",
      "target_ref_value_equation_payloads_assembled_without_contract_link",
      "target_ref_value_equation_promotion_rules_without_contract_link_present",
      "target_ref_value_equation_derivations_without_contract_link_present",
      "target_ref_value_equation_soundness_without_contract_link_present",
      "target_ref_value_equation_endpoint_applications_without_contract_link_present",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    ],
  },
  {
    layer_id: "target_ref_value_equation_promotion_rule_derivation",
    source_key: "promotionRule",
    fields: [
      "promotion_rule_target_source_inputs_ready",
      "candidate_rule_target_declared",
      "witness_object_has_contract_link_excluded",
      "primitive_rule_acceptance_not_used",
      "independent_target_ref_value_equation_promotion_rule_without_contract_link_present",
      "independent_target_ref_value_equation_derivation_without_contract_link_present",
      "independent_target_ref_value_equation_soundness_without_contract_link_present",
      "independent_target_ref_value_equation_endpoint_application_without_contract_link_present",
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    ],
  },
  {
    layer_id: "signature_declaration_formation_constructor_basis_route_collision",
    source_key: "constructorBasis",
    fields: [
      "constructor_basis_source_scope_ready",
      "predicate_symbol_constructor_basis_present",
      "argument_sort_constructor_basis_present",
      "judgment_codomain_constructor_basis_present",
      "endpoint_localization_rule_present",
      "constructor_basis_soundness_without_contract_link_present",
      "constructor_basis_derivation_from_definition_source_data_present",
      "membership_predicate_signature_declaration_formation_rule_present",
      "target_ref_value_object_domain_defined",
    ],
  },
];

const ROW_LAYER_FIELDS = [
  {
    layer_id: "binding_contract_satisfaction_without_contract_link",
    source_key: "bindingContractNoLink",
    fields: [
      "combined_binding_contract_without_contract_link_source_inputs_ready",
      "combined_binding_contract_target_pair_declared",
      "combined_value_map_pair_constructed",
      "combined_binding_contract_satisfaction_test_pair_applied",
      "combined_selected_route_contract_link_requirement_pair",
      "combined_binding_contract_without_contract_link_pair_satisfied",
      "combined_contract_link_dependency_eliminated",
    ],
  },
  {
    layer_id: "contract_target_satisfaction_ref_value_compatibility",
    source_key: "targetCompatibility",
    fields: [
      "combined_target_satisfaction_without_contract_link_source_inputs_ready",
      "combined_contract_link_premise_not_imported",
      "combined_binding_contract_target_pair_declared",
      "combined_value_map_pair_constructed",
      "combined_ref_field_pair_constructed",
      "combined_first_primitive_pair_constructed",
      "combined_target_satisfaction_without_contract_link_pair_proven",
      "combined_ref_value_equations_proof_grade_without_contract_link",
      "combined_compatibility_proofs_without_contract_link",
    ],
  },
  {
    layer_id: "target_ref_value_equations_without_contract_link",
    source_key: "targetRefValue",
    fields: [
      "combined_target_ref_value_equations_without_contract_link_source_inputs_ready",
      "combined_contract_link_premise_not_imported",
      "combined_target_endpoint_ref_value_source_equations_present",
      "combined_value_map_ref_values_certified",
      "combined_ref_value_equations_proof_grade_without_contract_link",
      "combined_target_satisfaction_without_contract_link_pair_proven",
      "combined_compatibility_proofs_without_contract_link",
    ],
  },
  {
    layer_id: "target_ref_value_equation_promotion_rule_derivation",
    source_key: "promotionRule",
    fields: [
      "combined_promotion_rule_target_source_inputs_ready",
      "combined_contract_link_premise_not_imported",
      "combined_promotion_rule_pair_present",
      "combined_derivation_pair_present",
      "combined_soundness_pair_present",
      "combined_endpoint_application_pair_present",
      "combined_ref_value_equations_proof_grade_without_contract_link",
    ],
  },
  {
    layer_id: "signature_declaration_formation_constructor_basis_route_collision",
    source_key: "constructorBasis",
    fields: [
      "combined_constructor_basis_source_scope_ready",
      "source_constructor_basis_present",
      "receiver_constructor_basis_present",
      "combined_constructor_basis_pair_present",
      "source_formation_rule_present",
      "receiver_formation_rule_present",
      "combined_formation_rule_pair_present",
      "combined_membership_predicate_signature_pair_present",
      "row_unblocked",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    pairAttempt: DEFAULT_PAIR_ATTEMPT,
    contractAdmission: DEFAULT_CONTRACT_ADMISSION,
    dependencyCycle: DEFAULT_DEPENDENCY_CYCLE,
    noContractLink: DEFAULT_NO_CONTRACT_LINK,
    bindingContractNoLink: DEFAULT_BINDING_CONTRACT_NO_LINK,
    targetCompatibility: DEFAULT_TARGET_COMPATIBILITY,
    targetRefValue: DEFAULT_TARGET_REF_VALUE,
    promotionRule: DEFAULT_PROMOTION_RULE,
    constructorBasis: DEFAULT_CONSTRUCTOR_BASIS,
    promotionRuleTarget: DEFAULT_PROMOTION_RULE_TARGET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--pair-attempt") {
      args.pairAttempt = argv[++index];
    } else if (arg === "--contract-admission") {
      args.contractAdmission = argv[++index];
    } else if (arg === "--dependency-cycle") {
      args.dependencyCycle = argv[++index];
    } else if (arg === "--no-contract-link") {
      args.noContractLink = argv[++index];
    } else if (arg === "--binding-contract-no-link") {
      args.bindingContractNoLink = argv[++index];
    } else if (arg === "--target-compatibility") {
      args.targetCompatibility = argv[++index];
    } else if (arg === "--target-ref-value") {
      args.targetRefValue = argv[++index];
    } else if (arg === "--promotion-rule") {
      args.promotionRule = argv[++index];
    } else if (arg === "--constructor-basis") {
      args.constructorBasis = argv[++index];
    } else if (arg === "--promotion-rule-target") {
      args.promotionRuleTarget = argv[++index];
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

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-binding-contract-satisfaction-dependency-classifier.mjs [options]

Options:
  --pair-attempt PATH             One-leaf endpoint-box/residual-function pair attempt.
  --contract-admission PATH       Binding contract/full-binding/carrier-admission attempt.
  --dependency-cycle PATH         Actual-link/membership dependency-cycle completion attempt.
  --no-contract-link PATH         No-contract-link premise proof attempt.
  --binding-contract-no-link PATH Binding-contract satisfaction without contract link proof attempt.
  --target-compatibility PATH     Contract-target/ref-value compatibility proof attempt.
  --target-ref-value PATH         Target ref/value equations without contract link proof attempt.
  --promotion-rule PATH           Target ref/value equation promotion-rule proof attempt.
  --constructor-basis PATH        Terminal constructor-basis derivation proof attempt.
  --promotion-rule-target PATH    Target note for the promotion-rule proof attempt.
  --out-dir PATH                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                       Pretty-print JSON artifact.
  --help                         Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function artifactRecord(filePath) {
  const present = fs.existsSync(filePath);
  return {
    path: filePath,
    basename: path.basename(filePath),
    present,
    sha256: present ? sha256File(filePath) : null,
  };
}

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function indexById(rows) {
  return new Map((rows ?? []).map((row) => [row.id ?? row.endpoint_id, row]));
}

function indexByRowId(rows) {
  return new Map((rows ?? []).map((row) => [row.row_id, row]));
}

function getRequired(row) {
  return row?.required_fields_present ?? row?.endpoint_primitive_fields_present ?? {};
}

function firstMissing(fields, order) {
  return order.find((field) => fields[field] !== true) ?? null;
}

function layerResult(layer, row) {
  const fields = getRequired(row);
  const firstMissingField = firstMissing(fields, layer.fields);
  return {
    layer_id: layer.layer_id,
    first_missing_field: firstMissingField,
    passed: firstMissingField === null,
    fields_present: layer.fields.reduce((result, field) => {
      result[field] = fields[field] === true;
      return result;
    }, {}),
    obstruction: row?.obstruction ?? null,
  };
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function countSummary(summary, key) {
  return summary?.[key] ?? 0;
}

function endpointSource(inputs, indexes, sourceKey, endpointId) {
  if (sourceKey === "pairAttempt") {
    return indexes.pairAttempt.get(endpointId);
  }
  return indexes[sourceKey].get(endpointId);
}

function buildEndpointDependency(endpointId, inputs, indexes) {
  const pairEndpoint = indexes.pairAttempt.get(endpointId);
  const layers = ENDPOINT_LAYER_FIELDS.map((layer) =>
    layerResult(layer, endpointSource(inputs, indexes, layer.source_key, endpointId)),
  );
  const firstOpenLayer =
    layers.find((layer) => layer.passed === false && layer.layer_id !== "endpoint_box_pair_attempt") ??
    layers.find((layer) => layer.passed === false) ??
    null;
  const promotionLayer = layers.find((layer) => layer.layer_id === "target_ref_value_equation_promotion_rule_derivation");
  const constructorBasisLayer = layers.find(
    (layer) => layer.layer_id === "signature_declaration_formation_constructor_basis_route_collision",
  );
  return {
    endpoint_id: endpointId,
    endpoint_functional_id: pairEndpoint?.endpoint_functional_id ?? endpointId,
    role: pairEndpoint?.role ?? null,
    row_uses: pairEndpoint?.row_uses ?? [],
    layer_results: layers,
    first_open_dependency_layer: firstOpenLayer?.layer_id ?? null,
    first_open_dependency_field: firstOpenLayer?.first_missing_field ?? null,
    lowest_recorded_blocker_layer: constructorBasisLayer?.layer_id ?? promotionLayer?.layer_id ?? null,
    lowest_recorded_blocker_field:
      constructorBasisLayer?.first_missing_field ?? promotionLayer?.first_missing_field ?? null,
    route_status:
      constructorBasisLayer?.first_missing_field === "predicate_symbol_constructor_basis_present"
        ? "route_collides_with_constructor_basis_derivation_blocker_without_new_evidence"
        : promotionLayer?.first_missing_field ===
            "independent_target_ref_value_equation_promotion_rule_without_contract_link_present"
          ? "blocked_at_promotion_rule_derivation_without_accepting_primitive_rule"
        : "blocked_before_or_after_promotion_rule_layer",
  };
}

function rowSource(indexes, sourceKey, rowId) {
  return indexes[sourceKey].get(rowId);
}

function buildRowDependency(row, indexes) {
  const rowId = row.row_id;
  const layers = ROW_LAYER_FIELDS.map((layer) => layerResult(layer, rowSource(indexes, layer.source_key, rowId)));
  const firstOpenLayer = layers.find((layer) => layer.passed === false) ?? null;
  const promotionLayer = layers.find((layer) => layer.layer_id === "target_ref_value_equation_promotion_rule_derivation");
  const constructorBasisLayer = layers.find(
    (layer) => layer.layer_id === "signature_declaration_formation_constructor_basis_route_collision",
  );
  return {
    row_id: rowId,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    layer_results: layers,
    first_open_dependency_layer: firstOpenLayer?.layer_id ?? null,
    first_open_dependency_field: firstOpenLayer?.first_missing_field ?? null,
    lowest_recorded_blocker_layer: constructorBasisLayer?.layer_id ?? promotionLayer?.layer_id ?? null,
    lowest_recorded_blocker_field:
      constructorBasisLayer?.first_missing_field ?? promotionLayer?.first_missing_field ?? null,
    binding_contract_satisfaction_dependency_classified: true,
    binding_contract_satisfied: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
}

function buildSummary(inputs, endpointDependencies, rowDependencies) {
  return {
    endpoint_variables: endpointDependencies.length,
    screened_rows: rowDependencies.length,
    endpoint_value_binding_maps_constructed: countSummary(
      inputs.bindingContractNoLink.summary,
      "endpoint_value_binding_maps_constructed",
    ),
    endpoint_values_bound_to_boundary_binding: countSummary(
      inputs.bindingContractNoLink.summary,
      "endpoint_values_bound_to_boundary_binding",
    ),
    binding_contract_satisfaction_tests_applied: countSummary(
      inputs.bindingContractNoLink.summary,
      "binding_contract_satisfaction_tests_applied",
    ),
    selected_routes_requiring_witness_object_contract_link: countSummary(
      inputs.bindingContractNoLink.summary,
      "selected_routes_requiring_witness_object_contract_link",
    ),
    ordinary_binding_contracts_requiring_witness_object_contract_link: countSummary(
      inputs.bindingContractNoLink.summary,
      "ordinary_binding_contracts_requiring_witness_object_contract_link",
    ),
    dependency_cycles_detected: countSummary(inputs.dependencyCycle.summary, "dependency_cycles_detected"),
    cycle_breakers_available: countSummary(inputs.dependencyCycle.summary, "cycle_breakers_available"),
    no_contract_link_premise_proofs_present: countSummary(
      inputs.noContractLink.summary,
      "no_contract_link_premise_proofs_present",
    ),
    independent_binding_contract_satisfaction_without_contract_link_present: countSummary(
      inputs.bindingContractNoLink.summary,
      "independent_binding_contract_satisfaction_without_contract_link_present",
    ),
    independent_contract_target_satisfaction_without_contract_link_proofs_present: countSummary(
      inputs.targetCompatibility.summary,
      "independent_contract_target_satisfaction_without_contract_link_proofs_present",
    ),
    independent_target_ref_value_equations_without_contract_link_proof_grade: countSummary(
      inputs.targetRefValue.summary,
      "independent_target_ref_value_equations_without_contract_link_proof_grade",
    ),
    promotion_rule_target_source_inputs_ready: countSummary(
      inputs.promotionRule.summary,
      "promotion_rule_target_source_inputs_ready",
    ),
    total_target_ref_value_source_equations: countSummary(
      inputs.promotionRule.summary,
      "total_target_ref_value_source_equations",
    ),
    total_value_map_bindings: countSummary(inputs.promotionRule.summary, "total_value_map_bindings"),
    promotion_rules_present: countSummary(inputs.promotionRule.summary, "promotion_rules_present"),
    derivations_present: countSummary(inputs.promotionRule.summary, "derivations_present"),
    soundness_proofs_present: countSummary(inputs.promotionRule.summary, "soundness_proofs_present"),
    endpoint_application_proofs_present: countSummary(
      inputs.promotionRule.summary,
      "endpoint_application_proofs_present",
    ),
    proof_grade_target_ref_value_packages: countSummary(
      inputs.promotionRule.summary,
      "proof_grade_target_ref_value_packages",
    ),
    row_promotion_rule_pairs_present: countSummary(inputs.promotionRule.summary, "row_promotion_rule_pairs_present"),
    row_ref_value_equation_pairs_proof_grade: countSummary(
      inputs.promotionRule.summary,
      "row_ref_value_equation_pairs_proof_grade",
    ),
    constructor_basis_source_scopes_ready: countSummary(
      inputs.constructorBasis.summary,
      "constructor_basis_source_scopes_ready",
    ),
    predicate_symbol_constructor_bases: countSummary(
      inputs.constructorBasis.summary,
      "predicate_symbol_constructor_bases",
    ),
    argument_sort_constructor_bases: countSummary(inputs.constructorBasis.summary, "argument_sort_constructor_bases"),
    judgment_codomain_constructor_bases: countSummary(
      inputs.constructorBasis.summary,
      "judgment_codomain_constructor_bases",
    ),
    endpoint_localization_rules: countSummary(inputs.constructorBasis.summary, "endpoint_localization_rules"),
    constructor_basis_soundness_proofs: countSummary(
      inputs.constructorBasis.summary,
      "constructor_basis_soundness_proofs",
    ),
    constructor_basis_derivations: countSummary(inputs.constructorBasis.summary, "constructor_basis_derivations"),
    row_constructor_basis_source_scope_pairs: countSummary(
      inputs.constructorBasis.summary,
      "row_constructor_basis_source_scope_pairs",
    ),
    row_constructor_basis_pairs: countSummary(inputs.constructorBasis.summary, "row_constructor_basis_pairs"),
    binding_contracts_satisfied: countSummary(inputs.bindingContractNoLink.summary, "binding_contracts_satisfied"),
    witness_object_contract_links_constructed: countSummary(
      inputs.bindingContractNoLink.summary,
      "witness_object_contract_links_constructed",
    ),
    rows_unblocked: countSummary(inputs.bindingContractNoLink.summary, "rows_unblocked"),
    row_consumption_count: 0,
    branch_chart_authorized_rows: 0,
    endpoint_lowest_blocker_counts: endpointDependencies.reduce((counts, row) => {
      const key = row.lowest_recorded_blocker_field ?? "none";
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {}),
    row_lowest_blocker_counts: rowDependencies.reduce((counts, row) => {
      const key = row.lowest_recorded_blocker_field ?? "none";
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {}),
  };
}

function buildClassifier(paths, inputs) {
  const indexes = {
    pairAttempt: indexById(inputs.pairAttempt.endpoint_variable_attempts),
    contractAdmission: indexById(inputs.contractAdmission.endpoint_binding_contract_full_binding_carrier_admission_attempts),
    dependencyCycle: indexById(inputs.dependencyCycle.endpoint_actual_link_membership_dependency_cycle_completion_attempts),
    noContractLink: indexById(inputs.noContractLink.endpoint_no_contract_link_premise_proof_attempts),
    bindingContractNoLink: indexById(
      inputs.bindingContractNoLink.endpoint_independent_binding_contract_satisfaction_without_contract_link_proof_attempts,
    ),
    targetCompatibility: indexById(
      inputs.targetCompatibility
        .endpoint_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempts,
    ),
    targetRefValue: indexById(
      inputs.targetRefValue.endpoint_independent_target_ref_value_equations_without_contract_link_proof_attempts,
    ),
    promotionRule: indexById(
      inputs.promotionRule
        .endpoint_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempts,
    ),
    constructorBasis: indexById(
      inputs.constructorBasis
        .endpoint_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempts,
    ),
    bindingContractNoLinkRows: indexByRowId(
      inputs.bindingContractNoLink.row_independent_binding_contract_satisfaction_without_contract_link_proof_attempts,
    ),
    targetCompatibilityRows: indexByRowId(
      inputs.targetCompatibility
        .row_independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempts,
    ),
    targetRefValueRows: indexByRowId(
      inputs.targetRefValue.row_independent_target_ref_value_equations_without_contract_link_proof_attempts,
    ),
    promotionRuleRows: indexByRowId(
      inputs.promotionRule.row_independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempts,
    ),
    constructorBasisRows: indexByRowId(
      inputs.constructorBasis
        .row_target_ref_value_object_domain_membership_predicate_signature_declaration_formation_constructor_basis_without_contract_link_definition_source_data_derivation_proof_attempts,
    ),
  };

  const rowIndexes = {
    bindingContractNoLink: indexes.bindingContractNoLinkRows,
    targetCompatibility: indexes.targetCompatibilityRows,
    targetRefValue: indexes.targetRefValueRows,
    promotionRule: indexes.promotionRuleRows,
    constructorBasis: indexes.constructorBasisRows,
  };

  const endpointDependencies = ENDPOINT_ORDER.map((endpointId) => buildEndpointDependency(endpointId, inputs, indexes));
  const rowDependencies = (inputs.pairAttempt.row_pair_certificate_attempts ?? []).map((row) =>
    buildRowDependency(row, rowIndexes),
  );
  const summary = buildSummary(inputs, endpointDependencies, rowDependencies);
  return {
    schema: "breather-higher-fold-one-leaf-binding-contract-satisfaction-dependency-classifier-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status:
      "one_leaf_binding_contract_satisfaction_dependency_classifier_fail_closed_constructor_basis_route_collision_no_row_consumption",
    claim_level:
      "priority-only dependency classifier for the one-leaf binding-contract blocker; no promotion rule, no primitive acceptance, no row consumption",
    no_promotion_rule: true,
    no_primitive_acceptance_rule: true,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    updates_live_ledger: false,
    preledger_pass: false,
    branch_chart_authorized: false,
    source_artifacts: {
      one_leaf_endpoint_box_residual_function_pair_certificate_attempt: artifactRecord(paths.pairAttempt),
      binding_contract_full_binding_carrier_admission_construction_attempt: artifactRecord(paths.contractAdmission),
      actual_link_membership_dependency_cycle_completion_attempt: artifactRecord(paths.dependencyCycle),
      independent_full_endpoint_boundary_binding_no_contract_link_premise_proof_attempt: artifactRecord(
        paths.noContractLink,
      ),
      independent_binding_contract_satisfaction_without_contract_link_proof_attempt: artifactRecord(
        paths.bindingContractNoLink,
      ),
      independent_contract_target_satisfaction_ref_value_compatibility_without_contract_link_proof_attempt:
        artifactRecord(paths.targetCompatibility),
      independent_target_ref_value_equations_without_contract_link_proof_attempt: artifactRecord(
        paths.targetRefValue,
      ),
      independent_target_ref_value_equation_promotion_rule_without_contract_link_proof_attempt: artifactRecord(
        paths.promotionRule,
      ),
      target_ref_value_object_domain_membership_predicate_signature_formation_constructor_basis_derivation_proof_attempt:
        artifactRecord(paths.constructorBasis),
      independent_target_ref_value_equation_promotion_rule_without_contract_link_target: artifactRecord(
        paths.promotionRuleTarget,
      ),
    },
    dependency_classifier_rule:
      "A one-leaf binding-contract satisfaction dependency can be classified as mechanically open only if the no-contract-link route supplies proof-grade target ref/value equations, compatibility proofs, contract-target satisfaction, binding-contract satisfaction, carrier-admission data, and a non-primitive constructor basis for the terminal target ref/value object-domain membership predicate. Current same-packet artifacts supply source equations, value-map bindings, and constructor-basis source scopes only.",
    endpoint_binding_contract_dependency_chains: endpointDependencies,
    row_binding_contract_dependency_chains: rowDependencies,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "predicate_symbol_constructor_basis_present / constructor_basis_derivation_from_definition_source_data_present",
      continuation_class:
        "mechanical derivation route collides with the stopped constructor-basis route; do not continue without new proof-grade constructor-basis evidence or an explicit pivot to a different non-rule-blocked certificate lane",
      fail_closed_stop_conditions: [
        "Do not promote source equations or endpoint value-map bindings into proof-grade target ref/value equation packages.",
        "Do not accept an independent target ref/value equation promotion rule as primitive inside this classifier.",
        "Do not use the target ref/value object-domain constructor-basis route unless new proof-grade constructor-basis evidence appears.",
        "Do not set binding_contract_satisfied, witness_object_has_contract_link, preledger_pass, row_consumed, updates_live_ledger, or branch_chart_authorized from this dependency classification.",
      ],
    },
    authorization_lock: {
      binding_contracts_satisfied: 0,
      witness_object_contract_links_constructed: 0,
      preledger_pass_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized_rows: 0,
      preledger_pass_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This classifier proves no binding contract. It sharpens the one-leaf endpoint-box route to the terminal constructor-basis route collision, while explicitly refusing primitive-rule acceptance, constructor-basis acceptance by renaming, and row consumption.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present ? "true" : "false"} | \`${artifact.sha256 ?? "missing"}\` |`,
    )
    .join("\n");
}

function summaryTable(summary) {
  return [
    ["Endpoint variables", summary.endpoint_variables],
    ["Screened rows", summary.screened_rows],
    ["Endpoint value-binding maps constructed", summary.endpoint_value_binding_maps_constructed],
    ["Endpoint values bound to boundary binding", summary.endpoint_values_bound_to_boundary_binding],
    ["Binding-contract tests applied", summary.binding_contract_satisfaction_tests_applied],
    ["Selected routes requiring witness-object contract link", summary.selected_routes_requiring_witness_object_contract_link],
    ["Dependency cycles detected", summary.dependency_cycles_detected],
    ["Cycle breakers available", summary.cycle_breakers_available],
    ["No-contract-link premise proofs present", summary.no_contract_link_premise_proofs_present],
    [
      "Independent binding-contract satisfaction without contract link",
      summary.independent_binding_contract_satisfaction_without_contract_link_present,
    ],
    [
      "Independent contract-target satisfaction proofs",
      summary.independent_contract_target_satisfaction_without_contract_link_proofs_present,
    ],
    [
      "Independent target ref/value equations proof grade",
      summary.independent_target_ref_value_equations_without_contract_link_proof_grade,
    ],
    ["Promotion-rule target source inputs ready", summary.promotion_rule_target_source_inputs_ready],
    ["Target ref/value source equations", summary.total_target_ref_value_source_equations],
    ["Value-map bindings", summary.total_value_map_bindings],
    ["Promotion rules present", summary.promotion_rules_present],
    ["Derivations present", summary.derivations_present],
    ["Soundness proofs present", summary.soundness_proofs_present],
    ["Endpoint application proofs present", summary.endpoint_application_proofs_present],
    ["Proof-grade target ref/value packages", summary.proof_grade_target_ref_value_packages],
    ["Constructor-basis source scopes ready", summary.constructor_basis_source_scopes_ready],
    ["Predicate-symbol constructor bases", summary.predicate_symbol_constructor_bases],
    ["Argument-sort constructor bases", summary.argument_sort_constructor_bases],
    ["Judgment-codomain constructor bases", summary.judgment_codomain_constructor_bases],
    ["Endpoint-localization rules", summary.endpoint_localization_rules],
    ["Constructor-basis soundness proofs", summary.constructor_basis_soundness_proofs],
    ["Constructor-basis derivations", summary.constructor_basis_derivations],
    ["Row constructor-basis source-scope pairs", summary.row_constructor_basis_source_scope_pairs],
    ["Row constructor-basis pairs", summary.row_constructor_basis_pairs],
    ["Binding contracts satisfied", summary.binding_contracts_satisfied],
    ["Witness-object contract links constructed", summary.witness_object_contract_links_constructed],
    ["Rows unblocked", summary.rows_unblocked],
    ["Row consumption count", summary.row_consumption_count],
    ["Branch-chart authorized rows", summary.branch_chart_authorized_rows],
  ]
    .map(([label, value]) => `| ${label} | ${value} |`)
    .join("\n");
}

function endpointTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.endpoint_id}\` | \`${row.role}\` | \`${row.first_open_dependency_layer}\` | \`${row.first_open_dependency_field}\` | \`${row.lowest_recorded_blocker_layer}\` | \`${row.lowest_recorded_blocker_field}\` |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.source_variable}\` | \`${row.receiver_variable}\` | \`${row.first_open_dependency_layer}\` | \`${row.first_open_dependency_field}\` | \`${row.lowest_recorded_blocker_field}\` | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, classifier) {
  const report = `# One-Leaf Binding-Contract Satisfaction Dependency Classifier

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier starts from the endpoint-box/residual-function pair attempt,
where first endpoint-boundary-binding primitives, witness-object
endpoint-boundary-binding refs, endpoint value-binding maps, and endpoint
values bound to boundary bindings are already present. It descends through the
current same-packet dependency-cycle and no-contract-link proof attempts.

The result is fail-closed. Binding-contract tests and no-link source inputs are
ready, and the promotion-rule target source inputs contain 6 target ref/value
source equations and 6 value-map bindings. The terminal constructor-basis
artifact also preserves 4 / 4 constructor-basis source scopes and 3 / 3 row
constructor-basis source-scope pairs. However, it still has 0 / 4
predicate-symbol constructor bases, argument-sort constructor bases,
judgment-codomain constructor bases, endpoint-localization rules,
constructor-basis soundness proofs, constructor-basis derivations,
promotion rules, derivations, soundness proofs, endpoint application proofs,
proof-grade target ref/value packages, binding contracts, or witness-object
contract links. Therefore no full endpoint boundary binding, carrier
admission, endpoint interval-box pair, residual-function pair, preledger pass,
row consumption, live-ledger update, or branch-chart authorization follows.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Counts

| Measure | Value |
| --- | ---: |
${summaryTable(classifier.summary)}

## Endpoint Dependency Chains

| Endpoint variable | Role | First open layer | First open field | Lowest recorded blocker layer | Lowest recorded blocker |
| --- | --- | --- | --- | --- | --- |
${endpointTable(classifier.endpoint_binding_contract_dependency_chains)}

## Row Dependency Chains

| Row | Source variable | Receiver variable | First open layer | First open field | Lowest recorded blocker | Row consumed |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(classifier.row_binding_contract_dependency_chains)}

## Certificate-Side Handoff

Next artifact target: \`${classifier.next_certificate_handoff.artifact_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`binding_contract_satisfied\`: false
- \`witness_object_has_contract_link\`: false
- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`branch_chart_authorized\`: false
- row consumption authorized: false

This artifact is a priority-only dependency classifier. It proves no binding
contract, no contract link, no endpoint box, no residual function on a box, no
preledger row, and no branch-chart authorization.
`;
  writeText(filePath, report);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    pairAttempt: args.pairAttempt,
    contractAdmission: args.contractAdmission,
    dependencyCycle: args.dependencyCycle,
    noContractLink: args.noContractLink,
    bindingContractNoLink: args.bindingContractNoLink,
    targetCompatibility: args.targetCompatibility,
    targetRefValue: args.targetRefValue,
    promotionRule: args.promotionRule,
    constructorBasis: args.constructorBasis,
    promotionRuleTarget: args.promotionRuleTarget,
  };
  const jsonPaths = Object.fromEntries(
    Object.entries(paths).filter(([name]) => name !== "promotionRuleTarget"),
  );
  const inputs = Object.fromEntries(
    Object.entries(jsonPaths).map(([name, filePath]) => [name, readJson(filePath)]),
  );
  Object.entries(inputs).forEach(([name, source]) => assertPacketId(source, name));
  const classifier = buildClassifier(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, classifier, args.pretty);
  writeReport(outReport, classifier);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

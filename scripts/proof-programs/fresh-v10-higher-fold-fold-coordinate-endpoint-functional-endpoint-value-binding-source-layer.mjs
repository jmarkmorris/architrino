#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_TARGET_OBJECT_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_target_endpoint_boundary_binding_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONTRACT_TARGET = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_endpoint_value_binding_source_layer.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_endpoint_value_binding_source_layer_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const PROOF_GRADE_ENDPOINT_FIELDS = [
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const ENDPOINT_FIELDS = [
  "target_endpoint_boundary_binding_object_constructed",
  "target_boundary_binding_object_has_domain_chart",
  "target_boundary_binding_object_has_basis_formula",
  "target_boundary_binding_object_has_boundary_action",
  "target_boundary_binding_object_has_signed_delta",
  "target_boundary_binding_object_has_endpoint_refs",
  "target_boundary_binding_object_has_endpoint_values",
  "target_action_exact_under_target_boundary_binding_object",
  "full_endpoint_boundary_binding_contract_target_declared",
  "full_endpoint_boundary_binding_symbol_declared",
  "endpoint_value_binding_target_declared",
  "binding_contract_target_declared",
  "non_target_zero_target_declared",
  "exact_screen_zero_target_declared",
  "rank_target_declared",
  "history_update_target_declared",
  "endpoint_motion_target_declared",
  "endpoint_evaluation_target_declared",
  "candidate_artifact_replay_target_declared",
  "full_endpoint_boundary_binding_construction_input_ready",
  "target_endpoint_ref_value_pairs_present",
  "endpoint_value_binding_source_equation_declared",
  "endpoint_value_binding_source_layer_ready",
  ...PROOF_GRADE_ENDPOINT_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_target_endpoint_boundary_binding_object_constructed",
  "receiver_target_endpoint_boundary_binding_object_constructed",
  "combined_target_boundary_binding_object_pair_constructed",
  "source_full_boundary_binding_contract_target_declared",
  "receiver_full_boundary_binding_contract_target_declared",
  "combined_full_boundary_binding_contract_target_pair_declared",
  "source_endpoint_value_binding_source_equation_declared",
  "receiver_endpoint_value_binding_source_equation_declared",
  "combined_endpoint_value_binding_source_pair_declared",
  "row_endpoint_value_binding_source_pair_ready",
  "full_boundary_binding_pair_construction_input_ready",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_endpoint_evaluation_map_pair_constructed",
  "same_packet_history_update_formula_present",
  "proof_grade_boundary_opening_certified",
  "residual_data_construction_ready",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const SOURCE_LAYER_METHODS = [
  {
    method_id: "target_refs_values_as_value_binding_source_layer",
    description:
      "Declare source-layer endpoint value-binding equations from the target endpoint refs, exact rational endpoint values, and full binding symbol.",
    required_fields: [
      "target_endpoint_boundary_binding_object_constructed",
      "target_boundary_binding_object_has_endpoint_refs",
      "target_boundary_binding_object_has_endpoint_values",
      "full_endpoint_boundary_binding_symbol_declared",
      "endpoint_value_binding_target_declared",
      "target_endpoint_ref_value_pairs_present",
      "endpoint_value_binding_source_equation_declared",
    ],
  },
  {
    method_id: "value_binding_source_layer_as_endpoint_value_binding",
    description:
      "Test whether declared source equations are already bound to a constructed proof-grade endpoint boundary binding.",
    required_fields: [
    "endpoint_value_binding_source_equation_declared",
    "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
    ],
  },
  {
    method_id: "value_binding_source_layer_as_binding_contract",
    description:
      "Test whether declared source equations already satisfy the full binding contract and closure certificates.",
    required_fields: [
      "endpoint_value_binding_source_equation_declared",
      "binding_contract_satisfied",
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    targetObjectAttempt: DEFAULT_TARGET_OBJECT_ATTEMPT,
    contractTarget: DEFAULT_CONTRACT_TARGET,
    constructionAttempt: DEFAULT_CONSTRUCTION_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--target-object-attempt") {
      args.targetObjectAttempt = argv[++index];
    } else if (arg === "--contract-target") {
      args.contractTarget = argv[++index];
    } else if (arg === "--construction-attempt") {
      args.constructionAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-endpoint-value-binding-source-layer.mjs [options]

Options:
  --target-object-attempt PATH Target endpoint boundary-binding object attempt JSON. Defaults to ${DEFAULT_TARGET_OBJECT_ATTEMPT}.
  --contract-target PATH       Full endpoint boundary-binding contract target JSON. Defaults to ${DEFAULT_CONTRACT_TARGET}.
  --construction-attempt PATH  Full endpoint boundary-binding construction attempt JSON. Defaults to ${DEFAULT_CONSTRUCTION_ATTEMPT}.
  --out-dir PATH               Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                     Pretty-print JSON artifact.
  --help                       Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, (_key, entry) => entry, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function artifactRecord(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing source artifact: ${filePath}`);
  }
  return {
    path: filePath,
    basename: path.basename(filePath),
    present: true,
    sha256: sha256File(filePath),
  };
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function idMap(rows, label) {
  const map = new Map();
  for (const row of rows) {
    if (map.has(row.id)) {
      throw new Error(`Duplicate ${label} id: ${row.id}`);
    }
    map.set(row.id, row);
  }
  return map;
}

function rowMap(rows, label) {
  const map = new Map();
  for (const row of rows) {
    if (map.has(row.row_id)) {
      throw new Error(`Duplicate ${label} row id: ${row.row_id}`);
    }
    map.set(row.row_id, row);
  }
  return map;
}

function requireEndpoint(map, id, label) {
  const value = map.get(id);
  if (!value) {
    throw new Error(`Missing ${label} endpoint: ${id}`);
  }
  return value;
}

function assertSourceHeader(source, label) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${label} fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing source-layer packet from authorized ${label}.`);
  }
}

function assertInputs(targetObject, contractTarget, constructionAttempt) {
  assertSourceHeader(targetObject, "target object");
  assertSourceHeader(contractTarget, "contract target");
  assertSourceHeader(constructionAttempt, "construction attempt");
  if (
    targetObject.status !==
    "fold_coordinate_endpoint_functional_component_domain_target_endpoint_boundary_binding_object_construction_partial_pass_object_constructed_full_binding_blocked"
  ) {
    throw new Error(`Unexpected target object status: ${targetObject.status}`);
  }
  if (
    contractTarget.status !==
    "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked"
  ) {
    throw new Error(`Unexpected contract target status: ${contractTarget.status}`);
  }
  if (
    constructionAttempt.status !==
    "priority-only-full-endpoint-boundary-binding-construction-attempt-fail-closed-contract-targets-present-full-binding-motion-evaluation-replay-blocked-no-row-consumption"
  ) {
    throw new Error(`Unexpected construction attempt status: ${constructionAttempt.status}`);
  }
}

function targetRefs(endpoint) {
  return endpoint.target_boundary_binding_object?.target_endpoint_refs ?? [];
}

function refsHaveValues(refs) {
  return refs.length > 0 && refs.every((ref) => ref.endpoint_value_present === true);
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_endpoint_value_binding_source_layer_${field}`),
    passed: missingFields.length === 0,
  };
}

function valueBindingEquation(bindingSymbol, ref) {
  return {
    row_id: ref.row_id,
    role: ref.role,
    endpoint_ref: ref.endpoint_ref,
    endpoint_value: ref.endpoint_value,
    ownership_component_id: ref.ownership_component_id,
    equation:
      `${bindingSymbol}[${ref.row_id}:${ref.endpoint_ref}] = ${ref.endpoint_value.display}`,
    equation_kind: "endpoint_value_binding_source_equation",
    proof_grade_binding_status: "source-equation-only",
  };
}

function endpointFields(targetEndpoint, contractEndpoint, constructionEndpoint) {
  const targetSourceFields = targetEndpoint.required_fields_present;
  const contractFields = contractEndpoint.required_fields_present;
  const constructionFields = constructionEndpoint.required_fields_present;
  const refs = targetRefs(targetEndpoint);
  const refValuesReady = refsHaveValues(refs);
  const sourceEquationReady =
    targetSourceFields.target_endpoint_boundary_binding_object_constructed === true &&
    targetSourceFields.target_boundary_binding_object_has_endpoint_refs === true &&
    targetSourceFields.target_boundary_binding_object_has_endpoint_values === true &&
    contractFields.full_endpoint_boundary_binding_symbol_declared === true &&
    contractFields.endpoint_value_binding_target_declared === true &&
    refValuesReady;
  return {
    target_endpoint_boundary_binding_object_constructed:
      targetSourceFields.target_endpoint_boundary_binding_object_constructed === true,
    target_boundary_binding_object_has_domain_chart:
      targetSourceFields.target_boundary_binding_object_has_domain_chart === true,
    target_boundary_binding_object_has_basis_formula:
      targetSourceFields.target_boundary_binding_object_has_basis_formula === true,
    target_boundary_binding_object_has_boundary_action:
      targetSourceFields.target_boundary_binding_object_has_boundary_action === true,
    target_boundary_binding_object_has_signed_delta:
      targetSourceFields.target_boundary_binding_object_has_signed_delta === true,
    target_boundary_binding_object_has_endpoint_refs:
      targetSourceFields.target_boundary_binding_object_has_endpoint_refs === true,
    target_boundary_binding_object_has_endpoint_values:
      targetSourceFields.target_boundary_binding_object_has_endpoint_values === true,
    target_action_exact_under_target_boundary_binding_object:
      targetSourceFields.target_action_exact_under_target_boundary_binding_object === true,
    full_endpoint_boundary_binding_contract_target_declared:
      contractFields.full_endpoint_boundary_binding_contract_target_declared === true,
    full_endpoint_boundary_binding_symbol_declared:
      contractFields.full_endpoint_boundary_binding_symbol_declared === true,
    endpoint_value_binding_target_declared:
      contractFields.endpoint_value_binding_target_declared === true,
    binding_contract_target_declared:
      contractFields.binding_contract_target_declared === true,
    non_target_zero_target_declared:
      contractFields.non_target_zero_target_declared === true,
    exact_screen_zero_target_declared:
      contractFields.exact_screen_zero_target_declared === true,
    rank_target_declared:
      contractFields.rank_target_declared === true,
    history_update_target_declared:
      contractFields.history_update_target_declared === true,
    endpoint_motion_target_declared:
      contractFields.endpoint_motion_target_declared === true,
    endpoint_evaluation_target_declared:
      contractFields.endpoint_evaluation_target_declared === true,
    candidate_artifact_replay_target_declared:
      contractFields.candidate_artifact_replay_target_declared === true,
    full_endpoint_boundary_binding_construction_input_ready:
      constructionFields.full_endpoint_boundary_binding_construction_input_ready === true,
    target_endpoint_ref_value_pairs_present: refValuesReady,
    endpoint_value_binding_source_equation_declared: sourceEquationReady,
    endpoint_value_binding_source_layer_ready: sourceEquationReady,
    full_endpoint_boundary_binding_constructed: false,
    endpoint_boundary_binding_constructed: false,
    endpoint_value_bound_to_boundary_binding: false,
    binding_contract_satisfied: false,
    same_packet_history_update_formula_present: false,
    endpoint_motion_rule_constructed: false,
    endpoint_evaluation_map_constructed: false,
    full_endpoint_evaluation_map_constructed: false,
    global_domain_evaluation_map_constructed: false,
    non_target_endpoint_zero_certified: false,
    exact_screen_zero_certified: false,
    rank_certified: false,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
  };
}

function buildEndpointSourceLayer(targetEndpoint, contractEndpoint, constructionEndpoint) {
  const fields = endpointFields(targetEndpoint, contractEndpoint, constructionEndpoint);
  const bindingSymbol = contractEndpoint.full_endpoint_boundary_binding_contract_target.binding_symbol;
  const equations = targetRefs(targetEndpoint).map((ref) => valueBindingEquation(bindingSymbol, ref));
  const methodResults = SOURCE_LAYER_METHODS.map((method) => methodResult(method, fields));
  return {
    id: targetEndpoint.id,
    endpoint_functional_id: targetEndpoint.endpoint_functional_id,
    role: targetEndpoint.role,
    value_binding_source_id: `endpoint_value_binding_source:${targetEndpoint.id}`,
    source_target_object_id: targetEndpoint.target_boundary_binding_object.object_id,
    source_contract_target_id: contractEndpoint.full_endpoint_boundary_binding_contract_target.target_id,
    source_construction_attempt_endpoint_id: constructionEndpoint.id,
    binding_symbol: bindingSymbol,
    domain_symbol: targetEndpoint.domain_symbol,
    chart_symbol: targetEndpoint.chart_symbol,
    basis_symbol: targetEndpoint.basis_symbol,
    target_equation: targetEndpoint.target_equation,
    target_action: targetEndpoint.target_action,
    target_sign: targetEndpoint.target_sign,
    target_endpoint_ref_value_count: equations.length,
    target_endpoint_value_binding_source_equations: equations,
    required_fields_present: fields,
    source_layer_method_results: methodResults,
    source_layer_methods_passed: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    proof_grade_endpoint_value_binding_constructed: false,
    missing_proof_grade_fields: PROOF_GRADE_ENDPOINT_FIELDS,
    failure_codes: PROOF_GRADE_ENDPOINT_FIELDS.map(
      (field) => `endpoint_value_binding_source_layer_retains_blocker_${field}`
    ),
    obstruction:
      "Endpoint refs and exact rational endpoint values now define source-layer value-binding equations, but no constructed endpoint boundary binding exists for those equations to bind to.",
  };
}

function requireRow(map, rowId, label) {
  const value = map.get(rowId);
  if (!value) {
    throw new Error(`Missing ${label} row: ${rowId}`);
  }
  return value;
}

function buildRowSourceLayer(row, constructionRow, endpointLayers) {
  const endpointById = idMap(endpointLayers, "endpoint value-binding source layer");
  const sourceEndpoint = requireEndpoint(endpointById, row.source_variable, "source value-binding source layer");
  const receiverEndpoint = requireEndpoint(endpointById, row.receiver_variable, "receiver value-binding source layer");
  const rowFields = row.required_fields_present;
  const constructionRowFields = constructionRow.required_fields_present;
  const constructionPairReady =
    constructionRowFields.full_boundary_binding_pair_construction_input_ready === true;
  const sourceReady =
    sourceEndpoint.required_fields_present.endpoint_value_binding_source_equation_declared === true;
  const receiverReady =
    receiverEndpoint.required_fields_present.endpoint_value_binding_source_equation_declared === true;
  const pairReady =
    rowFields.combined_full_boundary_binding_contract_target_pair_declared === true &&
    constructionPairReady &&
    sourceReady &&
    receiverReady;
  const fields = {
    row_locator_resolved: rowFields.row_locator_resolved === true,
    source_target_endpoint_boundary_binding_object_constructed:
      rowFields.source_target_endpoint_boundary_binding_object_constructed === true,
    receiver_target_endpoint_boundary_binding_object_constructed:
      rowFields.receiver_target_endpoint_boundary_binding_object_constructed === true,
    combined_target_boundary_binding_object_pair_constructed:
      rowFields.combined_target_boundary_binding_object_pair_constructed === true,
    source_full_boundary_binding_contract_target_declared:
      rowFields.source_full_boundary_binding_contract_target_declared === true,
    receiver_full_boundary_binding_contract_target_declared:
      rowFields.receiver_full_boundary_binding_contract_target_declared === true,
    combined_full_boundary_binding_contract_target_pair_declared:
      rowFields.combined_full_boundary_binding_contract_target_pair_declared === true,
    source_endpoint_value_binding_source_equation_declared: sourceReady,
    receiver_endpoint_value_binding_source_equation_declared: receiverReady,
    combined_endpoint_value_binding_source_pair_declared: sourceReady && receiverReady,
    row_endpoint_value_binding_source_pair_ready: pairReady,
    full_boundary_binding_pair_construction_input_ready: constructionPairReady,
    source_endpoint_boundary_binding_constructed: false,
    receiver_endpoint_boundary_binding_constructed: false,
    combined_boundary_binding_pair_constructed: false,
    source_endpoint_value_bound_to_boundary_binding: false,
    receiver_endpoint_value_bound_to_boundary_binding: false,
    combined_binding_contract_pair_satisfied: false,
    source_endpoint_motion_rule_constructed: false,
    receiver_endpoint_motion_rule_constructed: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    same_packet_history_update_formula_present: false,
    proof_grade_boundary_opening_certified: false,
    residual_data_construction_ready: false,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  return {
    row_id: row.row_id,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_value_binding_source_id: sourceEndpoint.value_binding_source_id,
    receiver_value_binding_source_id: receiverEndpoint.value_binding_source_id,
    source_boundary_ref: row.source_boundary_ref,
    receiver_boundary_ref: row.receiver_boundary_ref,
    source_boundary_value: row.source_boundary_value,
    receiver_boundary_value: row.receiver_boundary_value,
    required_fields_present: fields,
    row_endpoint_value_binding_source_pair_ready: pairReady,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver endpoint value-binding source equations, but no source/receiver proof-grade endpoint boundary bindings, value bindings, contract pair, motion/evaluation pair, residual data, replay, or row consumption.",
  };
}

function buildPacket(targetObject, contractTarget, constructionAttempt, sourcePaths) {
  assertInputs(targetObject, contractTarget, constructionAttempt);
  const contractById = idMap(contractTarget.endpoint_full_boundary_binding_contract_targets, "contract target");
  const constructionById = idMap(
    constructionAttempt.endpoint_full_boundary_binding_construction_attempts,
    "construction attempt"
  );
  const constructionRowById = rowMap(
    constructionAttempt.row_full_boundary_binding_construction_attempts,
    "construction attempt"
  );
  const endpointLayers = targetObject.endpoint_target_boundary_binding_object_attempts.map((targetEndpoint) =>
    buildEndpointSourceLayer(
      targetEndpoint,
      requireEndpoint(contractById, targetEndpoint.id, "contract target"),
      requireEndpoint(constructionById, targetEndpoint.id, "construction attempt")
    )
  );
  const rowLayers = contractTarget.row_full_boundary_binding_contract_targets.map((row) =>
    buildRowSourceLayer(row, requireRow(constructionRowById, row.row_id, "construction attempt"), endpointLayers)
  );
  const endpointFieldCounts = Object.fromEntries(
    ENDPOINT_FIELDS.map((field) => [
      field,
      countTrue(endpointLayers, (endpoint) => endpoint.required_fields_present[field]),
    ])
  );
  const rowFieldCounts = Object.fromEntries(
    ROW_FIELDS.map((field) => [field, countTrue(rowLayers, (row) => row.required_fields_present[field])])
  );
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-endpoint-value-binding-source-layer-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-source-layer-fail-closed-source-equations-present-proof-grade-boundary-bindings-absent-no-row-consumption",
    theorem_target: "Endpoint Value-Binding Source Layer",
    claim_level:
      "priority-only endpoint value-binding source layer; target endpoint refs and exact rational endpoint values declare source equations, but no endpoint value is bound to a proof-grade endpoint boundary binding and no row is consumed",
    source_artifacts: {
      target_endpoint_boundary_binding_object_construction_attempt: artifactRecord(sourcePaths.targetObjectAttempt),
      full_endpoint_boundary_binding_contract_target: artifactRecord(sourcePaths.contractTarget),
      full_endpoint_boundary_binding_construction_attempt: artifactRecord(sourcePaths.constructionAttempt),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      endpoint_value_binding_source_layer_ready: true,
      endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    source_layer_rule:
      "An endpoint value-binding source equation records the exact rational endpoint value that a future proof-grade endpoint boundary binding must bind. It is source data only until an endpoint boundary binding is constructed and the endpoint value is bound to that binding in the same packet.",
    no_promotion_rule:
      "Endpoint refs, rational endpoint values, and binding symbols cannot be promoted into endpoint value bindings by declaration. This packet may declare source equations but must fail closure until the proof-grade binding object exists.",
    source_layer_methods: SOURCE_LAYER_METHODS,
    proof_grade_endpoint_fields: PROOF_GRADE_ENDPOINT_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_value_binding_source_layers: endpointLayers,
    row_endpoint_value_binding_source_layers: rowLayers,
    summary: {
      endpoint_functionals: endpointLayers.length,
      rows: rowLayers.length,
      target_endpoint_boundary_binding_objects:
        endpointFieldCounts.target_endpoint_boundary_binding_object_constructed,
      endpoint_ref_value_source_functionals:
        endpointFieldCounts.target_endpoint_ref_value_pairs_present,
      endpoint_value_binding_source_equation_functionals:
        endpointFieldCounts.endpoint_value_binding_source_equation_declared,
      endpoint_value_binding_source_layer_ready_functionals:
        endpointFieldCounts.endpoint_value_binding_source_layer_ready,
      endpoint_boundary_binding_functionals:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      full_endpoint_boundary_binding_functionals:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_value_bound_to_boundary_binding_functionals:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contract_satisfied_functionals:
        endpointFieldCounts.binding_contract_satisfied,
      same_packet_history_update_formula_functionals:
        endpointFieldCounts.same_packet_history_update_formula_present,
      endpoint_motion_rule_functionals:
        endpointFieldCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_map_functionals:
        endpointFieldCounts.endpoint_evaluation_map_constructed,
      full_endpoint_evaluation_map_functionals:
        endpointFieldCounts.full_endpoint_evaluation_map_constructed,
      global_domain_evaluation_map_functionals:
        endpointFieldCounts.global_domain_evaluation_map_constructed,
      non_target_zero_certificate_functionals:
        endpointFieldCounts.non_target_endpoint_zero_certified,
      exact_screen_zero_certificate_functionals:
        endpointFieldCounts.exact_screen_zero_certified,
      rank_certificate_functionals:
        endpointFieldCounts.rank_certified,
      candidate_artifact_functionals:
        endpointFieldCounts.candidate_artifacts_present,
      topology_recertification_functionals:
        endpointFieldCounts.root_topology_recertified_for_candidate_change,
      proof_interval_replay_functionals:
        endpointFieldCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      row_value_binding_source_pairs:
        rowFieldCounts.combined_endpoint_value_binding_source_pair_declared,
      row_value_binding_source_pair_ready:
        rowFieldCounts.row_endpoint_value_binding_source_pair_ready,
      row_boundary_binding_pairs:
        rowFieldCounts.combined_boundary_binding_pair_constructed,
      row_endpoint_value_binding_pairs:
        rowFieldCounts.combined_binding_contract_pair_satisfied,
      row_endpoint_evaluation_map_pairs:
        rowFieldCounts.combined_endpoint_evaluation_map_pair_constructed,
      proof_grade_boundary_opening_rows:
        rowFieldCounts.proof_grade_boundary_opening_certified,
      row_residual_data_ready:
        rowFieldCounts.residual_data_construction_ready,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    capture_decision:
      "Priority-only. This packet declares endpoint value-binding source equations for 4 / 4 endpoint functionals and 3 / 3 row source/receiver pairs from target endpoint refs and exact rational endpoint values, but constructs 0 / 4 proof-grade endpoint boundary bindings, 0 / 4 endpoint values bound to endpoint boundary bindings, 0 / 4 satisfied binding contracts, 0 motion/evaluation maps, 0 replay fields, 0 preledger passes, 0 live-ledger updates, 0 branch-chart authorizations, and 0 consumed rows.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([label, artifact]) =>
        `| \`${label}\` | \`${artifact.basename}\` | ${artifact.present} | \`${artifact.sha256}\` |`
    )
    .join("\n");
}

function methodTable(methods) {
  return methods
    .map((method) => `| \`${method.method_id}\` | ${method.required_fields.length} | ${method.description} |`)
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.target_endpoint_ref_value_count} | ${endpoint.required_fields_present.endpoint_value_binding_source_equation_declared} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding} | ${endpoint.required_fields_present.binding_contract_satisfied} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.row_endpoint_value_binding_source_pair_ready} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_binding_contract_pair_satisfied} | ${row.row_consumed} |`
    )
    .join("\n");
}

function countTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function buildReport(packet) {
  const summary = packet.summary;
  return `# Higher-Fold Endpoint-Functional Endpoint Value-Binding Source Layer

## Verdict

Status: \`${packet.status}\`.

This priority-only packet declares source-layer endpoint value-binding
equations from the target endpoint refs, exact rational endpoint values, and
full endpoint boundary-binding symbols. It does not bind those values to
proof-grade endpoint boundary bindings.

The packet records ${summary.endpoint_value_binding_source_equation_functionals} /
${summary.endpoint_functionals} endpoint value-binding source-equation layers
and ${summary.row_value_binding_source_pair_ready} / ${summary.rows} row
source/receiver value-binding source pairs. It keeps
0 / ${summary.endpoint_functionals} proof-grade endpoint boundary bindings,
0 / ${summary.endpoint_functionals} endpoint values bound to endpoint boundary
bindings, 0 / ${summary.endpoint_functionals} satisfied binding contracts,
0 / ${summary.endpoint_functionals} endpoint motion rules,
0 / ${summary.endpoint_functionals} endpoint evaluation maps,
0 / ${summary.endpoint_functionals} full endpoint evaluation maps,
0 / ${summary.endpoint_functionals} non-target zero certificates,
0 / ${summary.endpoint_functionals} exact $B\\xi=0$ certificates,
0 / ${summary.endpoint_functionals} rank certificates,
0 / ${summary.endpoint_functionals} candidate artifacts,
0 / ${summary.endpoint_functionals} topology recertifications,
0 / ${summary.endpoint_functionals} proof-interval replays, and 0 consumed
rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## Source-Layer Rule

${packet.source_layer_rule}

${packet.no_promotion_rule}

## Source-Layer Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(packet.source_layer_methods)}

## Endpoint Source Layers

| Endpoint | Role | Ref/value equations | Source equations | Full binding | Value bound | Contract satisfied |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_value_binding_source_layers)}

## Row Source Layers

| Row | Failed side | Value-binding source pair | Boundary-binding pair | Contract pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: |
${rowTable(packet.row_endpoint_value_binding_source_layers)}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.row_field_counts, summary.rows)}

## Capture Decision

${packet.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const targetObject = readJson(args.targetObjectAttempt);
  const contractTarget = readJson(args.contractTarget);
  const constructionAttempt = readJson(args.constructionAttempt);
  const sourcePaths = {
    targetObjectAttempt: args.targetObjectAttempt,
    contractTarget: args.contractTarget,
    constructionAttempt: args.constructionAttempt,
  };
  const packet = buildPacket(targetObject, contractTarget, constructionAttempt, sourcePaths);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

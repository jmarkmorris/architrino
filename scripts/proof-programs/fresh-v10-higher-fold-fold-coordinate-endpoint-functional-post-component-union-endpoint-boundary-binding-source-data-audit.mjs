#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ENDPOINT_SOURCE_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_source_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_NO_GO = `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_no_go.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_HISTORY_CONTRACT = `${CERT_DIR}/fold_coordinate_history_realization_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_HISTORY_THEOREM_ATTEMPT = `${CERT_DIR}/fold_coordinate_history_realization_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DOMAIN_EVALUATION_CONTRACT = `${CERT_DIR}/fold_coordinate_endpoint_functional_domain_evaluation_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_union_chart_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_POST_COMPONENT_UNION_LAYER = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_SOURCE_DATA_AUDIT_FIELDS = [
  "source_audit_imported",
  "binding_no_go_imported",
  "history_realization_contract_imported",
  "history_realization_theorem_attempt_imported",
  "domain_evaluation_contract_imported",
  "component_union_chart_certificate_imported",
  "post_component_union_layer_imported",
  "basis_symbol_declared",
  "endpoint_boundary_action_declared",
  "boundary_delta_sign_consistent",
  "target_endpoint_ref_declared",
  "target_endpoint_value_present",
  "component_union_domain_constructed",
  "target_endpoint_evaluation_locator_constructed",
  "target_action_exact_under_component_locator",
  "opposite_endpoint_zero_under_component_locator",
  "evaluation_map_symbol_declared",
  "endpoint_evaluation_rule_declared",
  "endpoint_boundary_binding_source_data_ready",
  "endpoint_boundary_binding_constructed",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "binding_contract_satisfied",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const ROW_SOURCE_DATA_AUDIT_FIELDS = [
  "row_locator_resolved",
  "source_boundary_ref_declared",
  "receiver_boundary_ref_declared",
  "source_boundary_value_present",
  "receiver_boundary_value_present",
  "source_boundary_delta_contract_defined",
  "receiver_boundary_delta_contract_defined",
  "source_component_union_chart_constructed",
  "receiver_component_union_chart_constructed",
  "combined_component_union_chart_pair_constructed",
  "source_endpoint_boundary_binding_source_data_ready",
  "receiver_endpoint_boundary_binding_source_data_ready",
  "row_boundary_binding_source_data_ready",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_boundary_binding_pair_constructed",
  "proof_grade_boundary_opening_certified",
  "same_packet_history_update_formula_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_BLOCKER_FIELDS = [
  "endpoint_boundary_binding_constructed",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "binding_contract_satisfied",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

function parseArgs(argv) {
  const args = {
    endpointSourceAudit: DEFAULT_ENDPOINT_SOURCE_AUDIT,
    bindingNoGo: DEFAULT_BINDING_NO_GO,
    historyContract: DEFAULT_HISTORY_CONTRACT,
    historyTheoremAttempt: DEFAULT_HISTORY_THEOREM_ATTEMPT,
    domainEvaluationContract: DEFAULT_DOMAIN_EVALUATION_CONTRACT,
    componentUnionChartCertificate: DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE,
    postComponentUnionLayer: DEFAULT_POST_COMPONENT_UNION_LAYER,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--endpoint-source-audit") {
      args.endpointSourceAudit = argv[++index];
    } else if (arg === "--binding-no-go") {
      args.bindingNoGo = argv[++index];
    } else if (arg === "--history-contract") {
      args.historyContract = argv[++index];
    } else if (arg === "--history-theorem-attempt") {
      args.historyTheoremAttempt = argv[++index];
    } else if (arg === "--domain-evaluation-contract") {
      args.domainEvaluationContract = argv[++index];
    } else if (arg === "--component-union-chart-certificate") {
      args.componentUnionChartCertificate = argv[++index];
    } else if (arg === "--post-component-union-layer") {
      args.postComponentUnionLayer = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-post-component-union-endpoint-boundary-binding-source-data-audit.mjs [options]

Options:
  --endpoint-source-audit PATH               Endpoint-functional source audit JSON. Defaults to ${DEFAULT_ENDPOINT_SOURCE_AUDIT}.
  --binding-no-go PATH                       Endpoint-functional binding no-go JSON. Defaults to ${DEFAULT_BINDING_NO_GO}.
  --history-contract PATH                    Fold-coordinate history-realization contract JSON. Defaults to ${DEFAULT_HISTORY_CONTRACT}.
  --history-theorem-attempt PATH             Fold-coordinate history-realization theorem attempt JSON. Defaults to ${DEFAULT_HISTORY_THEOREM_ATTEMPT}.
  --domain-evaluation-contract PATH          Endpoint-functional domain/evaluation contract JSON. Defaults to ${DEFAULT_DOMAIN_EVALUATION_CONTRACT}.
  --component-union-chart-certificate PATH   Component-union chart certificate JSON. Defaults to ${DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE}.
  --post-component-union-layer PATH          Post-component-union endpoint-motion full evaluation-map layer attempt JSON. Defaults to ${DEFAULT_POST_COMPONENT_UNION_LAYER}.
  --out-dir PATH                             Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                   Pretty-print JSON artifact.
  --help                                     Show this help.`);
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

function byId(rows, key = "id") {
  return new Map((rows ?? []).map((row) => [row[key], row]));
}

function byRowId(rows) {
  return new Map((rows ?? []).map((row) => [row.row_id, row]));
}

function countFields(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function assertSamePacketSource(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id && source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${name} fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing to build source-data audit from authorized or live-updating ${name}.`);
  }
}

function assertInputs(inputs) {
  assertSamePacketSource(inputs.endpointSourceAudit, "endpoint source audit");
  assertSamePacketSource(inputs.bindingNoGo, "binding no-go");
  assertSamePacketSource(inputs.historyContract, "history contract");
  assertSamePacketSource(inputs.historyTheoremAttempt, "history theorem attempt");
  assertSamePacketSource(inputs.domainEvaluationContract, "domain/evaluation contract");
  assertSamePacketSource(inputs.componentUnionChartCertificate, "component-union chart certificate");
  assertSamePacketSource(inputs.postComponentUnionLayer, "post-component-union layer attempt");
  if (inputs.endpointSourceAudit.status !== "fold_coordinate_endpoint_functional_source_audit_fail_closed") {
    throw new Error(`Unexpected endpoint-source status: ${inputs.endpointSourceAudit.status}`);
  }
  if (inputs.bindingNoGo.status !== "fold_coordinate_endpoint_functional_binding_contract_no_go_fail_closed") {
    throw new Error(`Unexpected binding-no-go status: ${inputs.bindingNoGo.status}`);
  }
  if (inputs.historyContract.status !== "fold_coordinate_history_realization_contract_defined_realization_absent") {
    throw new Error(`Unexpected history-contract status: ${inputs.historyContract.status}`);
  }
  if (inputs.historyTheoremAttempt.status !== "fold_coordinate_history_realization_theorem_attempt_fail_closed") {
    throw new Error(`Unexpected history-theorem-attempt status: ${inputs.historyTheoremAttempt.status}`);
  }
  if (
    inputs.domainEvaluationContract.status !==
    "fold_coordinate_endpoint_functional_domain_evaluation_map_contract_defined_domain_evaluation_map_absent"
  ) {
    throw new Error(`Unexpected domain/evaluation contract status: ${inputs.domainEvaluationContract.status}`);
  }
  if (
    inputs.componentUnionChartCertificate.status !==
    "fold_coordinate_endpoint_functional_component_union_chart_certificate_partial_pass_replay_blocked"
  ) {
    throw new Error(`Unexpected component-union chart status: ${inputs.componentUnionChartCertificate.status}`);
  }
  if (
    inputs.postComponentUnionLayer.status !==
    "fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt_fail_closed"
  ) {
    throw new Error(`Unexpected post-component-union layer status: ${inputs.postComponentUnionLayer.status}`);
  }
  if (!Array.isArray(inputs.endpointSourceAudit.variable_sources) || inputs.endpointSourceAudit.variable_sources.length !== 4) {
    throw new Error("Expected exactly 4 endpoint source variables.");
  }
  if (!Array.isArray(inputs.endpointSourceAudit.row_sources) || inputs.endpointSourceAudit.row_sources.length !== 3) {
    throw new Error("Expected exactly 3 endpoint source rows.");
  }
}

function anyTrue(...values) {
  return values.some((value) => value === true);
}

function buildEndpointSourceDataAudit(variableSource, context) {
  const bindingNoGo = context.bindingNoGoById.get(variableSource.id);
  const historyVariable = context.historyVariableById.get(variableSource.id);
  const theoremVariable = context.theoremVariableById.get(variableSource.id);
  const domainContract = context.domainContractById.get(variableSource.id);
  const componentUnion = context.componentUnionById.get(variableSource.id);
  const postLayer = context.postLayerById.get(variableSource.id);
  const sourceFields = variableSource.required_fields_present ?? {};
  const bindingFields = bindingNoGo?.required_fields_present ?? {};
  const theoremFields = theoremVariable?.required_fields_present ?? {};
  const domainFields = domainContract?.required_fields_present ?? {};
  const domainDeclarationFields = domainContract?.contract_declaration_fields_present ?? {};
  const componentFields = componentUnion?.required_fields_present ?? {};
  const postFields = postLayer?.required_fields_present ?? {};
  const fields = {
    source_audit_imported: true,
    binding_no_go_imported: Boolean(bindingNoGo),
    history_realization_contract_imported: Boolean(historyVariable),
    history_realization_theorem_attempt_imported: Boolean(theoremVariable),
    domain_evaluation_contract_imported: Boolean(domainContract),
    component_union_chart_certificate_imported: Boolean(componentUnion),
    post_component_union_layer_imported: Boolean(postLayer),
    basis_symbol_declared: sourceFields.basis_symbol_declared === true,
    endpoint_boundary_action_declared: sourceFields.endpoint_boundary_action_declared === true,
    boundary_delta_sign_consistent: sourceFields.boundary_delta_sign_consistent === true,
    target_endpoint_ref_declared: sourceFields.target_endpoint_ref_declared === true,
    target_endpoint_value_present: sourceFields.target_endpoint_value_present === true,
    component_union_domain_constructed: anyTrue(
      componentFields.component_union_domain_constructed,
      postFields.component_union_domain_constructed
    ),
    target_endpoint_evaluation_locator_constructed: anyTrue(
      componentFields.target_endpoint_evaluation_locator_constructed,
      postFields.target_endpoint_evaluation_locator_constructed
    ),
    target_action_exact_under_component_locator: anyTrue(
      componentFields.target_action_exact_under_component_locator,
      postFields.target_action_exact_under_component_locator
    ),
    opposite_endpoint_zero_under_component_locator: anyTrue(
      componentFields.opposite_endpoint_zero_under_component_locator,
      postFields.opposite_endpoint_zero_under_component_locator
    ),
    evaluation_map_symbol_declared: anyTrue(
      componentFields.evaluation_map_symbol_declared,
      postFields.evaluation_map_symbol_declared,
      domainDeclarationFields.evaluation_map_symbol_declared
    ),
    endpoint_evaluation_rule_declared: anyTrue(
      postFields.endpoint_evaluation_rule_declared,
      domainDeclarationFields.endpoint_evaluation_rule_declared
    ),
    endpoint_boundary_binding_source_data_ready: false,
    endpoint_boundary_binding_constructed: anyTrue(
      sourceFields.endpoint_boundary_binding_present,
      bindingFields.endpoint_boundary_binding_present,
      domainFields.endpoint_boundary_binding_present,
      postFields.endpoint_boundary_binding_constructed
    ),
    same_packet_history_update_formula_present: anyTrue(
      sourceFields.same_packet_history_update_formula_present,
      theoremFields.same_packet_history_update_formula_present,
      domainFields.same_packet_history_update_formula_present,
      postFields.same_packet_history_update_formula_present
    ),
    endpoint_motion_rule_constructed: anyTrue(
      sourceFields.endpoint_motion_rule_present,
      theoremFields.endpoint_motion_rule_present,
      domainFields.endpoint_motion_rule_present,
      postFields.endpoint_motion_rule_constructed
    ),
    endpoint_evaluation_rule_constructed: postFields.endpoint_evaluation_rule_constructed === true,
    endpoint_evaluation_map_constructed: anyTrue(
      domainFields.domain_evaluation_map_constructed,
      postFields.endpoint_evaluation_map_constructed
    ),
    full_endpoint_evaluation_map_constructed: postFields.full_endpoint_evaluation_map_constructed === true,
    global_domain_evaluation_map_constructed: anyTrue(
      componentFields.full_global_domain_evaluation_map_constructed,
      postLayer?.inherited_global_attempt_fields?.global_domain_evaluation_map_constructed
    ),
    non_target_endpoint_zero_certified: anyTrue(
      sourceFields.non_target_endpoint_functionals_zero_certified,
      bindingFields.non_target_endpoint_functionals_zero_certified,
      domainFields.non_target_endpoint_functionals_zero_certified,
      postFields.non_target_endpoint_zero_certified
    ),
    exact_screen_zero_certified: anyTrue(
      sourceFields.exact_screen_zero_certified,
      bindingFields.exact_screen_zero_certified,
      theoremFields.exact_screen_zero_certified,
      domainFields.exact_screen_zero_certified,
      postFields.exact_screen_zero_certified
    ),
    rank_certified: anyTrue(
      sourceFields.rank_certified,
      bindingFields.rank_certified,
      theoremFields.rank_certified,
      domainFields.rank_certified,
      postFields.rank_certified
    ),
    binding_contract_satisfied: bindingNoGo?.binding_contract_satisfied === true || domainContract?.realization_supplied === true,
    candidate_artifacts_present: anyTrue(postFields.candidate_artifacts_present),
    root_topology_recertified_for_candidate_change: anyTrue(postFields.root_topology_recertified_for_candidate_change),
    proof_interval_v1_v6_rerun_for_candidate_change: anyTrue(
      postFields.proof_interval_v1_v6_rerun_for_candidate_change
    ),
  };
  fields.endpoint_boundary_binding_source_data_ready = [
    fields.source_audit_imported,
    fields.binding_no_go_imported,
    fields.component_union_chart_certificate_imported,
    fields.post_component_union_layer_imported,
    fields.basis_symbol_declared,
    fields.endpoint_boundary_action_declared,
    fields.boundary_delta_sign_consistent,
    fields.target_endpoint_ref_declared,
    fields.target_endpoint_value_present,
    fields.component_union_domain_constructed,
    fields.target_endpoint_evaluation_locator_constructed,
    fields.target_action_exact_under_component_locator,
    fields.opposite_endpoint_zero_under_component_locator,
    fields.evaluation_map_symbol_declared,
    fields.endpoint_evaluation_rule_declared,
  ].every(Boolean);

  return {
    id: variableSource.id,
    role: variableSource.role,
    source_symbol: variableSource.source_symbol,
    basis_symbol: variableSource.basis_symbol,
    endpoint_functional_id: componentUnion?.endpoint_functional_id ?? bindingNoGo?.endpoint_functional_id ?? null,
    row_uses: variableSource.row_uses,
    boundary_actions: variableSource.boundary_actions,
    boundary_delta_signs: variableSource.boundary_delta_signs,
    target_equation: componentUnion?.target_equation ?? domainContract?.target_equation ?? null,
    target_action: componentUnion?.target_action ?? domainContract?.target_action ?? null,
    target_sign: componentUnion?.target_sign ?? domainContract?.target_sign ?? null,
    domain_symbol: componentUnion?.domain_symbol ?? domainContract?.endpoint_functional_domain_contract?.domain_symbol ?? null,
    chart_symbol: componentUnion?.chart_symbol ?? domainContract?.endpoint_functional_domain_contract?.chart_symbol ?? null,
    evaluation_map_symbol:
      componentUnion?.evaluation_map_symbol ?? domainContract?.evaluation_map_contract?.evaluation_map_symbol ?? null,
    support_interval_ids: componentUnion?.support_interval_ids ?? [],
    target_endpoint_refs: variableSource.target_endpoint_refs,
    required_endpoint_functionals: variableSource.required_endpoint_functionals,
    missing_binding_fields: bindingNoGo?.missing_binding_fields ?? domainContract?.missing_realization_fields ?? [],
    required_fields_present: fields,
    endpoint_boundary_binding_source_data_ready: fields.endpoint_boundary_binding_source_data_ready,
    binding_contract_satisfied: fields.binding_contract_satisfied,
    construction_blocker_fields: CONSTRUCTION_BLOCKER_FIELDS.filter((field) => fields[field] !== true),
    obstruction:
      "The endpoint has a declared boundary action, signed target, target endpoint value, component-union domain, target locator, evaluation-map symbol, and declared endpoint evaluation rule. These source data are ready for a boundary-binding construction attempt, but the packet still supplies no endpoint boundary binding, same-packet history update formula, endpoint motion rule, endpoint evaluation map, exact $B\\xi=0$, rank certificate, candidate artifacts, topology recertification, or proof-interval replay.",
  };
}

function buildRowSourceDataAudit(rowSource, context, endpointById) {
  const historyRow = context.historyRowById.get(rowSource.row_id);
  const theoremRow = context.theoremRowById.get(rowSource.row_id);
  const domainRow = context.domainRowById.get(rowSource.row_id);
  const componentUnionRow = context.componentUnionRowById.get(rowSource.row_id);
  const postRow = context.postRowById.get(rowSource.row_id);
  const rowFields = rowSource.required_fields_present ?? {};
  const theoremFields = theoremRow?.required_fields_present ?? {};
  const domainFields = domainRow?.required_fields_present ?? {};
  const componentUnionFields = componentUnionRow?.required_fields_present ?? {};
  const postFields = postRow?.required_fields_present ?? {};
  const sourceVariable =
    historyRow?.source_boundary_delta?.variable ??
    domainRow?.source_endpoint_contract_id ??
    componentUnionRow?.source_endpoint_contract_id ??
    postRow?.source_endpoint_contract_id;
  const receiverVariable =
    historyRow?.receiver_boundary_delta?.variable ??
    domainRow?.receiver_endpoint_contract_id ??
    componentUnionRow?.receiver_endpoint_contract_id ??
    postRow?.receiver_endpoint_contract_id;
  const sourceEndpoint = endpointById.get(sourceVariable);
  const receiverEndpoint = endpointById.get(receiverVariable);
  const fields = {
    row_locator_resolved: anyTrue(
      rowFields.one_leaf_row_present,
      domainFields.row_locator_resolved,
      componentUnionFields.row_locator_resolved,
      postFields.row_locator_resolved
    ),
    source_boundary_ref_declared: rowFields.source_boundary_ref_declared === true,
    receiver_boundary_ref_declared: rowFields.receiver_boundary_ref_declared === true,
    source_boundary_value_present: rowFields.source_boundary_value_present === true,
    receiver_boundary_value_present: rowFields.receiver_boundary_value_present === true,
    source_boundary_delta_contract_defined: Boolean(historyRow?.source_boundary_delta?.contract),
    receiver_boundary_delta_contract_defined: Boolean(historyRow?.receiver_boundary_delta?.contract),
    source_component_union_chart_constructed: anyTrue(
      componentUnionFields.source_component_union_chart_constructed,
      postFields.source_component_union_chart_constructed
    ),
    receiver_component_union_chart_constructed: anyTrue(
      componentUnionFields.receiver_component_union_chart_constructed,
      postFields.receiver_component_union_chart_constructed
    ),
    combined_component_union_chart_pair_constructed: anyTrue(
      componentUnionFields.combined_component_union_chart_pair_constructed,
      postFields.combined_component_union_chart_pair_constructed
    ),
    source_endpoint_boundary_binding_source_data_ready:
      sourceEndpoint?.required_fields_present.endpoint_boundary_binding_source_data_ready === true,
    receiver_endpoint_boundary_binding_source_data_ready:
      receiverEndpoint?.required_fields_present.endpoint_boundary_binding_source_data_ready === true,
    row_boundary_binding_source_data_ready: false,
    source_endpoint_motion_rule_constructed: postFields.source_endpoint_motion_rule_constructed === true,
    receiver_endpoint_motion_rule_constructed: postFields.receiver_endpoint_motion_rule_constructed === true,
    combined_boundary_binding_pair_constructed: false,
    proof_grade_boundary_opening_certified: anyTrue(
      theoremFields.strict_combined_boundary_opening_proof_grade,
      domainFields.proof_grade_boundary_opening_certified,
      postFields.proof_grade_boundary_opening_certified
    ),
    same_packet_history_update_formula_present: anyTrue(
      theoremFields.same_packet_candidate_change_data_present,
      domainFields.same_packet_history_update_formula_present,
      postFields.same_packet_history_update_formula_present
    ),
    candidate_artifacts_present: postFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      postFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      postFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.row_boundary_binding_source_data_ready = [
    fields.row_locator_resolved,
    fields.source_boundary_ref_declared,
    fields.receiver_boundary_ref_declared,
    fields.source_boundary_value_present,
    fields.receiver_boundary_value_present,
    fields.source_boundary_delta_contract_defined,
    fields.receiver_boundary_delta_contract_defined,
    fields.source_component_union_chart_constructed,
    fields.receiver_component_union_chart_constructed,
    fields.combined_component_union_chart_pair_constructed,
    fields.source_endpoint_boundary_binding_source_data_ready,
    fields.receiver_endpoint_boundary_binding_source_data_ready,
  ].every(Boolean);
  fields.combined_boundary_binding_pair_constructed =
    fields.source_endpoint_motion_rule_constructed &&
    fields.receiver_endpoint_motion_rule_constructed &&
    fields.proof_grade_boundary_opening_certified;

  return {
    row_id: rowSource.row_id,
    source_interval: rowSource.source_interval,
    receiver_interval: rowSource.receiver_interval,
    failed_side: rowSource.failed_side,
    boundary_side: rowSource.boundary_side,
    source_variable: sourceVariable,
    receiver_variable: receiverVariable,
    source_boundary_ref: rowSource.source_boundary_ref,
    receiver_boundary_ref: rowSource.receiver_boundary_ref,
    source_boundary_value: rowSource.source_boundary_value,
    receiver_boundary_value: rowSource.receiver_boundary_value,
    required_fields_present: fields,
    row_boundary_binding_source_data_ready: fields.row_boundary_binding_source_data_ready,
    row_ready: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver boundary refs and values, signed source/receiver boundary-delta contracts, and a component-union chart pair. It has no source/receiver endpoint motion rules, no boundary-binding pair, no proof-grade boundary-opening replay, and no row consumption.",
  };
}

function buildAudit(inputs, sources) {
  assertInputs(inputs);
  const context = {
    bindingNoGoById: byId(inputs.bindingNoGo.endpoint_binding_attempts),
    historyVariableById: byId(inputs.historyContract.realization_variables),
    theoremVariableById: byId(inputs.historyTheoremAttempt.variable_attempts),
    domainContractById: byId(inputs.domainEvaluationContract.endpoint_domain_evaluation_contracts),
    componentUnionById: byId(inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates),
    postLayerById: byId(inputs.postComponentUnionLayer.endpoint_motion_evaluation_layer_attempts),
    historyRowById: byRowId(inputs.historyContract.rows),
    theoremRowById: byRowId(inputs.historyTheoremAttempt.row_attempts),
    domainRowById: byRowId(inputs.domainEvaluationContract.row_domain_evaluation_contracts),
    componentUnionRowById: byRowId(inputs.componentUnionChartCertificate.row_component_union_chart_certificates),
    postRowById: byRowId(inputs.postComponentUnionLayer.row_motion_evaluation_layer_attempts),
  };
  const endpointAudits = inputs.endpointSourceAudit.variable_sources.map((variableSource) =>
    buildEndpointSourceDataAudit(variableSource, context)
  );
  const endpointById = byId(endpointAudits);
  const rowAudits = inputs.endpointSourceAudit.row_sources.map((rowSource) =>
    buildRowSourceDataAudit(rowSource, context, endpointById)
  );
  const endpointCounts = countFields(endpointAudits, ENDPOINT_SOURCE_DATA_AUDIT_FIELDS);
  const rowCounts = countFields(rowAudits, ROW_SOURCE_DATA_AUDIT_FIELDS);
  const endpointTotal = endpointAudits.length;
  const rowTotal = rowAudits.length;
  const sourceDataPresent =
    endpointCounts.endpoint_boundary_binding_source_data_ready === endpointTotal &&
    rowCounts.row_boundary_binding_source_data_ready === rowTotal;
  const bindingAbsent =
    endpointCounts.endpoint_boundary_binding_constructed === 0 &&
    endpointCounts.endpoint_motion_rule_constructed === 0 &&
    endpointCounts.endpoint_evaluation_map_constructed === 0 &&
    rowCounts.combined_boundary_binding_pair_constructed === 0 &&
    rowCounts.proof_grade_boundary_opening_certified === 0;
  const status =
    sourceDataPresent && bindingAbsent
      ? "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit_source_data_present_binding_absent"
      : "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit_fail_closed";

  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-post-component-union-endpoint-boundary-binding-source-data-audit-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status,
    theorem_target:
      "Fold-Coordinate Endpoint-Functional Post-Component-Union Endpoint Boundary Binding Source-Data Audit",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only post-component-union source-data audit; endpoint locator and evaluation-rule source data are present, while endpoint boundary bindings, endpoint motion rules, and full endpoint evaluation maps are absent",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      endpointSourceAudit: artifactRecord(sources.endpointSourceAudit),
      bindingNoGo: artifactRecord(sources.bindingNoGo),
      historyContract: artifactRecord(sources.historyContract),
      historyTheoremAttempt: artifactRecord(sources.historyTheoremAttempt),
      domainEvaluationContract: artifactRecord(sources.domainEvaluationContract),
      componentUnionChartCertificate: artifactRecord(sources.componentUnionChartCertificate),
      postComponentUnionLayer: artifactRecord(sources.postComponentUnionLayer),
    },
    endpoint_boundary_binding_source_data_rule:
      "A post-component-union source-data audit may certify only the declared boundary action, signed endpoint target, row-local endpoint values, component-union domain, target locator, evaluation-map symbol, and declared endpoint evaluation rule. It does not construct the endpoint boundary binding or the endpoint motion rule.",
    no_promotion_rule:
      "Do not promote endpoint refs, endpoint values, component-union target locators, or declared evaluation-map symbols into endpoint boundary bindings, same-packet history update formulas, endpoint motion rules, endpoint evaluation maps, exact $B\\xi=0$, rank certificates, candidate artifacts, replay, row consumption, or branch authorization.",
    endpoint_boundary_binding_source_data_audits: endpointAudits,
    row_boundary_binding_source_data_audits: rowAudits,
    summary: {
      endpoint_functionals: endpointTotal,
      rows: rowTotal,
      source_audits_imported: endpointCounts.source_audit_imported,
      binding_no_go_imported: endpointCounts.binding_no_go_imported,
      history_realization_contracts_imported: endpointCounts.history_realization_contract_imported,
      history_realization_theorem_attempts_imported:
        endpointCounts.history_realization_theorem_attempt_imported,
      domain_evaluation_contracts_imported: endpointCounts.domain_evaluation_contract_imported,
      component_union_chart_certificates_imported: endpointCounts.component_union_chart_certificate_imported,
      post_component_union_layers_imported: endpointCounts.post_component_union_layer_imported,
      basis_symbols_declared: endpointCounts.basis_symbol_declared,
      endpoint_boundary_actions_declared: endpointCounts.endpoint_boundary_action_declared,
      boundary_delta_sign_consistent_variables: endpointCounts.boundary_delta_sign_consistent,
      target_endpoint_refs_declared: endpointCounts.target_endpoint_ref_declared,
      target_endpoint_values_present: endpointCounts.target_endpoint_value_present,
      component_union_domains_constructed: endpointCounts.component_union_domain_constructed,
      target_endpoint_evaluation_locators_constructed:
        endpointCounts.target_endpoint_evaluation_locator_constructed,
      target_action_locators_exact: endpointCounts.target_action_exact_under_component_locator,
      opposite_endpoint_zero_locators_exact:
        endpointCounts.opposite_endpoint_zero_under_component_locator,
      evaluation_map_symbols_declared: endpointCounts.evaluation_map_symbol_declared,
      endpoint_evaluation_rules_declared: endpointCounts.endpoint_evaluation_rule_declared,
      endpoint_boundary_binding_source_data_ready:
        endpointCounts.endpoint_boundary_binding_source_data_ready,
      endpoint_boundary_bindings_constructed: endpointCounts.endpoint_boundary_binding_constructed,
      same_packet_history_update_formulas_present:
        endpointCounts.same_packet_history_update_formula_present,
      endpoint_motion_rules_constructed: endpointCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_rules_constructed: endpointCounts.endpoint_evaluation_rule_constructed,
      endpoint_evaluation_maps_constructed: endpointCounts.endpoint_evaluation_map_constructed,
      full_endpoint_evaluation_maps_constructed:
        endpointCounts.full_endpoint_evaluation_map_constructed,
      global_domain_evaluation_maps_constructed:
        endpointCounts.global_domain_evaluation_map_constructed,
      non_target_zero_certificates: endpointCounts.non_target_endpoint_zero_certified,
      exact_screen_zero_certificates: endpointCounts.exact_screen_zero_certified,
      rank_certificates: endpointCounts.rank_certified,
      binding_contracts_satisfied: endpointCounts.binding_contract_satisfied,
      candidate_artifacts_present: endpointCounts.candidate_artifacts_present,
      topology_recertifications: endpointCounts.root_topology_recertified_for_candidate_change,
      proof_interval_v1_v6_replays: endpointCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      rows_with_boundary_refs_and_values:
        rowAudits.filter(
          (row) =>
            row.required_fields_present.source_boundary_ref_declared &&
            row.required_fields_present.receiver_boundary_ref_declared &&
            row.required_fields_present.source_boundary_value_present &&
            row.required_fields_present.receiver_boundary_value_present
        ).length,
      rows_with_signed_boundary_delta_contracts:
        rowAudits.filter(
          (row) =>
            row.required_fields_present.source_boundary_delta_contract_defined &&
            row.required_fields_present.receiver_boundary_delta_contract_defined
        ).length,
      rows_with_component_union_chart_pairs:
        rowCounts.combined_component_union_chart_pair_constructed,
      rows_with_boundary_binding_source_data_ready:
        rowCounts.row_boundary_binding_source_data_ready,
      rows_with_boundary_binding_pairs: rowCounts.combined_boundary_binding_pair_constructed,
      proof_grade_boundary_opening_rows: rowCounts.proof_grade_boundary_opening_certified,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      endpoint_required_fields_certified_counts: endpointCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function artifactTable(artifacts) {
  return Object.entries(artifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present} | \`${artifact.sha256}\` |`
    )
    .join("\n");
}

function endpointTable(audits) {
  return audits
    .map(
      (audit) =>
        `| \`${audit.id}\` | ${audit.required_fields_present.endpoint_boundary_action_declared} | ${audit.required_fields_present.target_endpoint_value_present} | ${audit.required_fields_present.component_union_domain_constructed} | ${audit.required_fields_present.target_endpoint_evaluation_locator_constructed} | ${audit.required_fields_present.endpoint_evaluation_rule_declared} | ${audit.endpoint_boundary_binding_source_data_ready} | ${audit.required_fields_present.endpoint_boundary_binding_constructed} | ${audit.required_fields_present.endpoint_motion_rule_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.required_fields_present.source_boundary_ref_declared} | ${row.required_fields_present.receiver_boundary_ref_declared} | ${row.required_fields_present.source_boundary_value_present} | ${row.required_fields_present.receiver_boundary_value_present} | ${row.required_fields_present.combined_component_union_chart_pair_constructed} | ${row.row_boundary_binding_source_data_ready} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.row_consumed} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function buildReport(audit) {
  const endpointTotal = audit.endpoint_boundary_binding_source_data_audits.length;
  const rowTotal = audit.row_boundary_binding_source_data_audits.length;
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Post-Component-Union Endpoint Boundary Binding Source-Data Audit

## Verdict

Status: \`${audit.status}\`.

This priority-only packet imports the endpoint-functional source audit, binding
no-go, component-union chart certificate, and post-component-union
endpoint-motion full evaluation-map layer attempt. It verifies
${audit.summary.endpoint_boundary_binding_source_data_ready} / ${endpointTotal}
endpoint boundary action/source-data rows: target endpoint refs and values,
component-union domains, target endpoint locators, evaluation-map symbols, and
declared endpoint evaluation rules.

The audit records the construction boundary explicitly. It has
${audit.summary.endpoint_boundary_bindings_constructed} / ${endpointTotal}
endpoint boundary bindings, ${audit.summary.same_packet_history_update_formulas_present} / ${endpointTotal}
same-packet history update formulas, ${audit.summary.endpoint_motion_rules_constructed} / ${endpointTotal}
endpoint motion rules, ${audit.summary.endpoint_evaluation_maps_constructed} / ${endpointTotal}
endpoint evaluation maps, ${audit.summary.full_endpoint_evaluation_maps_constructed} / ${endpointTotal}
full endpoint evaluation maps, ${audit.summary.non_target_zero_certificates} / ${endpointTotal}
non-target zero certificates, ${audit.summary.exact_screen_zero_certificates} / ${endpointTotal}
exact $B\\xi=0$ certificates, ${audit.summary.rank_certificates} / ${endpointTotal}
rank certificates, ${audit.summary.candidate_artifacts_present} / ${endpointTotal}
candidate artifact sets, ${audit.summary.topology_recertifications} / ${endpointTotal}
topology recertifications, and ${audit.summary.proof_interval_v1_v6_replays} / ${endpointTotal}
proof-interval v1-v6 replays. It consumes ${audit.summary.row_consumption_count}
rows, keeps \`preledger_pass=false\`, keeps \`updates_live_ledger=false\`, and
leaves \`branch_chart_authorized=false\`.

## Source Artifacts And Authorization Locks

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${artifactTable(audit.source_artifacts)}

| Lock | Value |
| --- | ---: |
| \`branch_chart_authorized\` | ${audit.authorization_lock.branch_chart_authorized} |
| \`preledger_pass\` | ${audit.authorization_lock.preledger_pass} |
| \`updates_live_ledger\` | ${audit.authorization_lock.updates_live_ledger} |
| \`row_consumption_count\` | ${audit.authorization_lock.row_consumption_count} |

## Source-Data Rule

${audit.endpoint_boundary_binding_source_data_rule}

## No-Promotion Rule

${audit.no_promotion_rule}

## Endpoint Source-Data Audits

| Endpoint variable | Boundary action | Endpoint value | Component domain | Target locator | Eval rule declared | Source data ready | Binding constructed | Motion rule |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(audit.endpoint_boundary_binding_source_data_audits)}

## Row Source-Data Audits

| Row | Source ref | Receiver ref | Source value | Receiver value | Chart pair | Source data ready | Binding pair | Row consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(audit.row_boundary_binding_source_data_audits)}

## Endpoint Field Audit

| Field | Certified count |
| --- | ---: |
${fieldTable(audit.summary.endpoint_required_fields_certified_counts, ENDPOINT_SOURCE_DATA_AUDIT_FIELDS, endpointTotal)}

## Row Field Audit

| Field | Certified count |
| --- | ---: |
${fieldTable(audit.summary.row_required_fields_certified_counts, ROW_SOURCE_DATA_AUDIT_FIELDS, rowTotal)}

## Closure Burden

The next proof object is not another locator audit. It must construct endpoint
boundary bindings and same-packet endpoint motion rules. A pass must set, for
all four endpoint functionals, \`endpoint_boundary_binding_constructed=true\`,
\`same_packet_history_update_formula_present=true\`, and
\`endpoint_motion_rule_constructed=true\` while preserving the component-union
chart, no-double-counting rule, formula-to-chart binding, and target locator.

A full endpoint-functional evaluation-map packet must additionally construct
endpoint evaluation rules and maps, bind endpoint values to those maps, certify
the target action under the constructed endpoint evaluation map, enumerate and
zero non-target endpoint actions, certify exact $B\\xi=0$, certify rank, emit
candidate artifacts, recertify root topology, and replay proof intervals v1-v6.

## Capture Decision

Priority-only. This audit closes the immediate question of whether the
post-component-union packets contain the source data needed to start a boundary
binding construction attempt. They do: ${audit.summary.endpoint_boundary_binding_source_data_ready} / ${endpointTotal}
endpoint source-data audits and ${audit.summary.rows_with_boundary_binding_source_data_ready} / ${rowTotal}
row-local source-data audits pass. They do not contain endpoint boundary
bindings, endpoint motion rules, or full endpoint evaluation maps. The
endpoint-functional route can now move to a boundary-binding construction
attempt; no candidate artifacts, topology recertification, replay, row
consumption, or branch-chart construction is authorized by this audit.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const sources = {
    endpointSourceAudit: args.endpointSourceAudit,
    bindingNoGo: args.bindingNoGo,
    historyContract: args.historyContract,
    historyTheoremAttempt: args.historyTheoremAttempt,
    domainEvaluationContract: args.domainEvaluationContract,
    componentUnionChartCertificate: args.componentUnionChartCertificate,
    postComponentUnionLayer: args.postComponentUnionLayer,
  };
  const inputs = {
    endpointSourceAudit: readJson(args.endpointSourceAudit),
    bindingNoGo: readJson(args.bindingNoGo),
    historyContract: readJson(args.historyContract),
    historyTheoremAttempt: readJson(args.historyTheoremAttempt),
    domainEvaluationContract: readJson(args.domainEvaluationContract),
    componentUnionChartCertificate: readJson(args.componentUnionChartCertificate),
    postComponentUnionLayer: readJson(args.postComponentUnionLayer),
  };
  const audit = buildAudit(inputs, sources);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, audit, args.pretty);
  writeText(outReport, buildReport(audit));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

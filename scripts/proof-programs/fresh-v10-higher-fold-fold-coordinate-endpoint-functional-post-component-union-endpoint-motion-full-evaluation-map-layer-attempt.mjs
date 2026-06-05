#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DOMAIN_EVALUATION_CONTRACT = `${CERT_DIR}/fold_coordinate_endpoint_functional_domain_evaluation_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_GLOBAL_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_global_domain_evaluation_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REPLAY_READINESS_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_candidate_artifact_replay_readiness_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_union_chart_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_EVALUATION_LAYER_FIELDS = [
  "component_union_chart_certificate_imported",
  "component_union_domain_constructed",
  "component_union_coordinate_rule_constructed",
  "component_union_no_double_counting_rule_constructed",
  "component_formula_bound_to_chart",
  "target_endpoint_evaluation_locator_constructed",
  "target_action_exact_under_component_locator",
  "opposite_endpoint_zero_under_component_locator",
  "evaluation_map_symbol_declared",
  "endpoint_evaluation_rule_declared",
  "endpoint_boundary_binding_constructed",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_rule_constructed",
  "endpoint_value_bound_to_evaluation_map",
  "endpoint_evaluation_map_constructed",
  "target_action_exact_under_endpoint_evaluation_map",
  "non_target_endpoint_actions_enumerated",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "full_endpoint_evaluation_map_constructed",
];

const ROW_EVALUATION_LAYER_FIELDS = [
  "row_locator_resolved",
  "source_component_union_chart_constructed",
  "receiver_component_union_chart_constructed",
  "combined_component_union_chart_pair_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "source_endpoint_evaluation_map_constructed",
  "receiver_endpoint_evaluation_map_constructed",
  "combined_endpoint_evaluation_map_pair_constructed",
  "screen_positive_candidate_change_row",
  "signed_boundary_delta_contract_defined",
  "proof_grade_boundary_opening_certified",
  "same_packet_history_update_formula_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const EVALUATION_LAYER_PROMOTION_METHODS = [
  {
    id: "component_locator_as_endpoint_motion_rule",
    description:
      "Try to promote the exact component endpoint locator into a same-packet endpoint motion rule.",
    required_fields: [
      "component_union_chart_certificate_imported",
      "component_union_domain_constructed",
      "target_endpoint_evaluation_locator_constructed",
      "endpoint_boundary_binding_constructed",
      "same_packet_history_update_formula_present",
      "endpoint_motion_rule_constructed",
    ],
  },
  {
    id: "evaluation_map_symbol_as_evaluation_map",
    description:
      "Try to promote the declared evaluation-map symbol into a constructed endpoint evaluation map.",
    required_fields: [
      "evaluation_map_symbol_declared",
      "endpoint_evaluation_rule_declared",
      "endpoint_evaluation_rule_constructed",
      "endpoint_value_bound_to_evaluation_map",
      "endpoint_evaluation_map_constructed",
    ],
  },
  {
    id: "local_target_action_as_full_evaluation_map",
    description:
      "Try to promote the local target action identity into a full endpoint-functional evaluation map.",
    required_fields: [
      "target_action_exact_under_component_locator",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "target_action_exact_under_endpoint_evaluation_map",
      "non_target_endpoint_actions_enumerated",
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
    ],
  },
  {
    id: "row_chart_pair_as_proof_grade_boundary_opening",
    description:
      "Try to consume one-leaf rows from the source/receiver component-union chart pairs.",
    required_fields: [
      "endpoint_evaluation_map_constructed",
      "same_packet_history_update_formula_present",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
      "full_endpoint_evaluation_map_constructed",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    domainEvaluationContract: DEFAULT_DOMAIN_EVALUATION_CONTRACT,
    globalAttempt: DEFAULT_GLOBAL_ATTEMPT,
    replayReadinessAudit: DEFAULT_REPLAY_READINESS_AUDIT,
    componentUnionChartCertificate: DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--domain-evaluation-contract") {
      args.domainEvaluationContract = argv[++index];
    } else if (arg === "--global-attempt") {
      args.globalAttempt = argv[++index];
    } else if (arg === "--replay-readiness-audit") {
      args.replayReadinessAudit = argv[++index];
    } else if (arg === "--component-union-chart-certificate") {
      args.componentUnionChartCertificate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-post-component-union-endpoint-motion-full-evaluation-map-layer-attempt.mjs [options]

Options:
  --domain-evaluation-contract PATH          Endpoint-functional domain/evaluation contract JSON. Defaults to ${DEFAULT_DOMAIN_EVALUATION_CONTRACT}.
  --global-attempt PATH                      Global domain/evaluation-map construction attempt JSON. Defaults to ${DEFAULT_GLOBAL_ATTEMPT}.
  --replay-readiness-audit PATH              Candidate artifact replay-readiness audit JSON. Defaults to ${DEFAULT_REPLAY_READINESS_AUDIT}.
  --component-union-chart-certificate PATH   Component-union chart certificate JSON. Defaults to ${DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE}.
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

function countFields(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function assertSamePacketSource(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${name} fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing to build evaluation-map attempt from authorized or live-updating ${name}.`);
  }
}

function assertInputs(inputs) {
  assertSamePacketSource(inputs.domainEvaluationContract, "domain/evaluation contract");
  assertSamePacketSource(inputs.globalAttempt, "global domain/evaluation attempt");
  assertSamePacketSource(inputs.replayReadinessAudit, "replay-readiness audit");
  assertSamePacketSource(inputs.componentUnionChartCertificate, "component-union chart certificate");
  if (
    inputs.domainEvaluationContract.status !==
    "fold_coordinate_endpoint_functional_domain_evaluation_map_contract_defined_domain_evaluation_map_absent"
  ) {
    throw new Error(`Unexpected domain/evaluation contract status: ${inputs.domainEvaluationContract.status}`);
  }
  if (
    inputs.globalAttempt.status !==
    "fold_coordinate_endpoint_functional_global_domain_evaluation_map_construction_attempt_fail_closed"
  ) {
    throw new Error(`Unexpected global attempt status: ${inputs.globalAttempt.status}`);
  }
  if (
    inputs.replayReadinessAudit.status !==
    "fold_coordinate_endpoint_functional_candidate_artifact_replay_readiness_audit_fail_closed"
  ) {
    throw new Error(`Unexpected replay-readiness status: ${inputs.replayReadinessAudit.status}`);
  }
  if (
    inputs.componentUnionChartCertificate.status !==
    "fold_coordinate_endpoint_functional_component_union_chart_certificate_partial_pass_replay_blocked"
  ) {
    throw new Error(`Unexpected component-union chart status: ${inputs.componentUnionChartCertificate.status}`);
  }
  if (
    !Array.isArray(inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates) ||
    inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates.length !== 4
  ) {
    throw new Error("Expected exactly 4 endpoint component-union chart certificates.");
  }
  if (
    !Array.isArray(inputs.componentUnionChartCertificate.row_component_union_chart_certificates) ||
    inputs.componentUnionChartCertificate.row_component_union_chart_certificates.length !== 3
  ) {
    throw new Error("Expected exactly 3 row component-union chart certificates.");
  }
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_endpoint_layer_${field}`),
    passed: missingFields.length === 0,
  };
}

function endpointObstructionCodes(fields) {
  const codes = [];
  if (!fields.endpoint_boundary_binding_constructed) {
    codes.push("endpoint_boundary_binding_absent");
  }
  if (!fields.same_packet_history_update_formula_present) {
    codes.push("same_packet_history_update_formula_absent");
  }
  if (!fields.endpoint_motion_rule_constructed) {
    codes.push("endpoint_motion_rule_absent");
  }
  if (!fields.endpoint_evaluation_rule_constructed) {
    codes.push("endpoint_evaluation_rule_absent");
  }
  if (!fields.endpoint_evaluation_map_constructed) {
    codes.push("endpoint_evaluation_map_absent");
  }
  if (!fields.non_target_endpoint_zero_certified) {
    codes.push("non_target_endpoint_zero_certificate_absent");
  }
  if (!fields.exact_screen_zero_certified) {
    codes.push("exact_screen_zero_certificate_absent");
  }
  if (!fields.rank_certified) {
    codes.push("rank_certificate_absent");
  }
  if (!fields.proof_interval_v1_v6_rerun_for_candidate_change) {
    codes.push("proof_interval_v1_v6_replay_absent");
  }
  return codes;
}

function buildEndpointAttempt(chartCertificate, contractById, globalById, replayById) {
  const chartFields = chartCertificate.required_fields_present ?? {};
  const contract = contractById.get(chartCertificate.id);
  const globalAttempt = globalById.get(chartCertificate.id);
  const replayAttempt = replayById.get(chartCertificate.id);
  const globalFields = globalAttempt?.required_fields_present ?? {};
  const replayFields = replayAttempt?.required_fields_present ?? {};
  const evaluationRuleDeclared =
    typeof contract?.evaluation_map_contract?.endpoint_evaluation_rule === "string" &&
    contract.evaluation_map_contract.endpoint_evaluation_rule.length > 0;
  const fields = {
    component_union_chart_certificate_imported: chartCertificate.partial_chart_certificate_passed === true,
    component_union_domain_constructed: chartFields.component_union_domain_constructed === true,
    component_union_coordinate_rule_constructed: chartFields.component_union_coordinate_rule_constructed === true,
    component_union_no_double_counting_rule_constructed:
      chartFields.component_union_no_double_counting_rule_constructed === true,
    component_formula_bound_to_chart: chartFields.component_formula_bound_to_chart === true,
    target_endpoint_evaluation_locator_constructed:
      chartFields.target_endpoint_evaluation_locator_constructed === true,
    target_action_exact_under_component_locator:
      chartFields.target_action_exact_under_component_locator === true,
    opposite_endpoint_zero_under_component_locator:
      chartFields.opposite_endpoint_zero_under_component_locator === true,
    evaluation_map_symbol_declared: chartFields.evaluation_map_symbol_declared === true,
    endpoint_evaluation_rule_declared: evaluationRuleDeclared,
    endpoint_boundary_binding_constructed: globalFields.endpoint_boundary_binding_constructed === true,
    same_packet_history_update_formula_present:
      globalFields.same_packet_history_update_formula_present === true ||
      replayFields.same_packet_history_update_formula_present === true,
    endpoint_motion_rule_constructed: globalFields.endpoint_motion_rule_constructed === true,
    endpoint_evaluation_rule_constructed: false,
    endpoint_value_bound_to_evaluation_map: globalFields.endpoint_value_bound_to_evaluation_map === true,
    endpoint_evaluation_map_constructed: globalFields.endpoint_evaluation_map_constructed === true,
    target_action_exact_under_endpoint_evaluation_map:
      globalFields.target_action_exact_under_global_evaluation_map === true,
    non_target_endpoint_actions_enumerated: globalFields.non_target_endpoint_actions_enumerated === true,
    non_target_endpoint_zero_certified:
      globalFields.non_target_endpoint_zero_certified === true ||
      replayFields.non_target_endpoint_zero_certified === true,
    exact_screen_zero_certified:
      globalFields.exact_screen_zero_certified === true || replayFields.exact_screen_zero_certified === true,
    rank_certified: globalFields.rank_certified === true || replayFields.rank_certified === true,
    candidate_artifacts_present:
      globalFields.candidate_artifacts_present === true || replayFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      globalFields.root_topology_recertified_for_candidate_change === true ||
      replayFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      globalFields.proof_interval_v1_v6_rerun_for_candidate_change === true ||
      replayFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    full_endpoint_evaluation_map_constructed:
      chartFields.full_global_domain_evaluation_map_constructed === true ||
      globalFields.global_domain_evaluation_map_constructed === true,
  };
  const methodResults = EVALUATION_LAYER_PROMOTION_METHODS.map((method) => methodResult(method, fields));
  return {
    id: chartCertificate.id,
    endpoint_functional_id: chartCertificate.endpoint_functional_id,
    role: chartCertificate.role,
    basis_symbol: chartCertificate.basis_symbol,
    source_symbol: chartCertificate.source_symbol,
    row_uses: chartCertificate.row_uses,
    target_equation: chartCertificate.target_equation,
    target_action: chartCertificate.target_action,
    target_sign: chartCertificate.target_sign,
    domain_symbol: chartCertificate.domain_symbol,
    chart_symbol: chartCertificate.chart_symbol,
    evaluation_map_symbol: chartCertificate.evaluation_map_symbol,
    support_interval_ids: chartCertificate.support_interval_ids,
    support_union_kind: chartCertificate.support_union_kind,
    required_fields_present: fields,
    inherited_component_union_chart_fields: chartFields,
    inherited_global_attempt_fields: globalFields,
    inherited_replay_readiness_fields: replayFields,
    method_results: methodResults,
    promotion_methods_passed: methodResults.filter((result) => result.passed).map((result) => result.method_id),
    endpoint_motion_rule_constructed: fields.endpoint_motion_rule_constructed,
    endpoint_evaluation_map_constructed: fields.endpoint_evaluation_map_constructed,
    full_endpoint_evaluation_map_constructed: fields.full_endpoint_evaluation_map_constructed,
    obstruction_codes: endpointObstructionCodes(fields),
    obstruction:
      "The component-union chart and exact target locator are certified, but the packet still does not construct the endpoint boundary binding, same-packet history update, endpoint motion rule, endpoint evaluation rule, endpoint evaluation map, non-target zero certificate, exact $B\\xi=0$, rank certificate, or replay needed to promote the locator into a full endpoint-functional evaluation map.",
  };
}

function buildRowAttempt(rowChartCertificate, endpointById) {
  const source = endpointById.get(rowChartCertificate.source_endpoint_contract_id);
  const receiver = endpointById.get(rowChartCertificate.receiver_endpoint_contract_id);
  const chartFields = rowChartCertificate.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: chartFields.row_locator_resolved === true,
    source_component_union_chart_constructed: chartFields.source_component_union_chart_constructed === true,
    receiver_component_union_chart_constructed: chartFields.receiver_component_union_chart_constructed === true,
    combined_component_union_chart_pair_constructed:
      chartFields.combined_component_union_chart_pair_constructed === true,
    source_endpoint_motion_rule_constructed: source?.endpoint_motion_rule_constructed === true,
    receiver_endpoint_motion_rule_constructed: receiver?.endpoint_motion_rule_constructed === true,
    source_endpoint_evaluation_map_constructed: source?.endpoint_evaluation_map_constructed === true,
    receiver_endpoint_evaluation_map_constructed: receiver?.endpoint_evaluation_map_constructed === true,
    combined_endpoint_evaluation_map_pair_constructed:
      source?.endpoint_evaluation_map_constructed === true && receiver?.endpoint_evaluation_map_constructed === true,
    screen_positive_candidate_change_row: chartFields.screen_positive_candidate_change_row === true,
    signed_boundary_delta_contract_defined: chartFields.signed_boundary_delta_contract_defined === true,
    proof_grade_boundary_opening_certified: false,
    same_packet_history_update_formula_present: chartFields.same_packet_history_update_formula_present === true,
    candidate_artifacts_present: chartFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      chartFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      chartFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.proof_grade_boundary_opening_certified =
    fields.source_endpoint_motion_rule_constructed &&
    fields.receiver_endpoint_motion_rule_constructed &&
    fields.combined_endpoint_evaluation_map_pair_constructed &&
    fields.screen_positive_candidate_change_row &&
    fields.signed_boundary_delta_contract_defined &&
    fields.same_packet_history_update_formula_present &&
    fields.candidate_artifacts_present &&
    fields.root_topology_recertified_for_candidate_change &&
    fields.proof_interval_v1_v6_rerun_for_candidate_change;
  return {
    row_id: rowChartCertificate.row_id,
    source_interval: rowChartCertificate.source_interval,
    receiver_interval: rowChartCertificate.receiver_interval,
    failed_side: rowChartCertificate.failed_side,
    boundary_side: rowChartCertificate.boundary_side,
    source_endpoint_contract_id: rowChartCertificate.source_endpoint_contract_id,
    receiver_endpoint_contract_id: rowChartCertificate.receiver_endpoint_contract_id,
    required_fields_present: fields,
    chart_pair_constructed: fields.combined_component_union_chart_pair_constructed,
    endpoint_evaluation_pair_constructed: fields.combined_endpoint_evaluation_map_pair_constructed,
    row_ready: ROW_EVALUATION_LAYER_FIELDS.every((field) => fields[field] === true),
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver component-union chart pairs, but it has no source/receiver endpoint motion rules, no source/receiver endpoint evaluation maps, no same-packet candidate artifacts, and no v1-v6 replay, so the row remains unconsumed.",
  };
}

function failureCodeCounts(endpointAttempts) {
  const counts = new Map();
  for (const attempt of endpointAttempts) {
    for (const result of attempt.method_results) {
      for (const code of result.failure_codes) {
        counts.set(code, (counts.get(code) ?? 0) + 1);
      }
    }
  }
  return Object.fromEntries([...counts.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function buildAttempt(inputs, sources) {
  assertInputs(inputs);
  const contractById = byId(inputs.domainEvaluationContract.endpoint_domain_evaluation_contracts);
  const globalById = byId(inputs.globalAttempt.endpoint_global_domain_evaluation_attempts);
  const replayById = byId(inputs.replayReadinessAudit.endpoint_readiness_attempts);
  const endpointAttempts =
    inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates.map((chartCertificate) =>
      buildEndpointAttempt(chartCertificate, contractById, globalById, replayById)
    );
  const endpointById = byId(endpointAttempts);
  const rowAttempts = inputs.componentUnionChartCertificate.row_component_union_chart_certificates.map(
    (rowChartCertificate) => buildRowAttempt(rowChartCertificate, endpointById)
  );
  const endpointCounts = countFields(endpointAttempts, ENDPOINT_EVALUATION_LAYER_FIELDS);
  const rowCounts = countFields(rowAttempts, ROW_EVALUATION_LAYER_FIELDS);
  const methodCounts = Object.fromEntries(
    EVALUATION_LAYER_PROMOTION_METHODS.map((method) => [
      method.id,
      endpointAttempts.filter((attempt) =>
        attempt.method_results.some((result) => result.method_id === method.id && result.passed)
      ).length,
    ])
  );
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-post-component-union-endpoint-motion-full-evaluation-map-layer-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt_fail_closed",
    theorem_target:
      "Fold-Coordinate Endpoint-Functional Post-Component-Union Endpoint-Motion Full Evaluation-Map Layer Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only endpoint motion/evaluation-map layer attempt; component-union charts and locators are certified, but no same-packet endpoint motion rules or full endpoint-functional evaluation maps are constructed and no rows are consumed",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      domainEvaluationContract: artifactRecord(sources.domainEvaluationContract),
      globalAttempt: artifactRecord(sources.globalAttempt),
      replayReadinessAudit: artifactRecord(sources.replayReadinessAudit),
      componentUnionChartCertificate: artifactRecord(sources.componentUnionChartCertificate),
    },
    endpoint_motion_full_evaluation_map_layer_rule:
      "The component-union chart supplies a tagged support domain and target endpoint locator only. A full endpoint-functional evaluation map is present only when the same packet constructs the endpoint boundary binding, same-packet history update, endpoint motion rule, endpoint evaluation rule, endpoint value binding, non-target zero certificate, exact $B\\xi=0$, rank certificate, candidate artifacts, topology recertification, and proof-interval v1-v6 replay.",
    no_promotion_rule:
      "Do not promote `$E_j(\\Psi_j)=\\pm 1$` under a component locator into endpoint motion or a full evaluation map. The locator is a local endpoint identity; endpoint motion is a same-packet history-realization statement.",
    promotion_methods: EVALUATION_LAYER_PROMOTION_METHODS,
    endpoint_motion_evaluation_layer_attempts: endpointAttempts,
    row_motion_evaluation_layer_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      component_union_chart_certificates_imported:
        endpointCounts.component_union_chart_certificate_imported,
      component_union_domains_constructed: endpointCounts.component_union_domain_constructed,
      component_union_coordinate_rules_constructed:
        endpointCounts.component_union_coordinate_rule_constructed,
      component_union_no_double_counting_rules_constructed:
        endpointCounts.component_union_no_double_counting_rule_constructed,
      component_formula_chart_bindings: endpointCounts.component_formula_bound_to_chart,
      target_endpoint_evaluation_locators_constructed:
        endpointCounts.target_endpoint_evaluation_locator_constructed,
      target_action_locators_exact: endpointCounts.target_action_exact_under_component_locator,
      opposite_endpoint_zero_locators_exact:
        endpointCounts.opposite_endpoint_zero_under_component_locator,
      evaluation_map_symbols_declared: endpointCounts.evaluation_map_symbol_declared,
      endpoint_evaluation_rules_declared: endpointCounts.endpoint_evaluation_rule_declared,
      endpoint_boundary_bindings_constructed:
        endpointCounts.endpoint_boundary_binding_constructed,
      same_packet_history_update_formulas_present:
        endpointCounts.same_packet_history_update_formula_present,
      endpoint_motion_rules_constructed: endpointCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_rules_constructed:
        endpointCounts.endpoint_evaluation_rule_constructed,
      endpoint_evaluation_maps_constructed:
        endpointCounts.endpoint_evaluation_map_constructed,
      target_actions_exact_under_endpoint_evaluation_map:
        endpointCounts.target_action_exact_under_endpoint_evaluation_map,
      non_target_endpoint_actions_enumerated:
        endpointCounts.non_target_endpoint_actions_enumerated,
      non_target_zero_certificates: endpointCounts.non_target_endpoint_zero_certified,
      exact_screen_zero_certificates: endpointCounts.exact_screen_zero_certified,
      rank_certificates: endpointCounts.rank_certified,
      candidate_artifacts_present: endpointCounts.candidate_artifacts_present,
      topology_recertifications:
        endpointCounts.root_topology_recertified_for_candidate_change,
      proof_interval_v1_v6_replays:
        endpointCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      full_endpoint_evaluation_maps_constructed:
        endpointCounts.full_endpoint_evaluation_map_constructed,
      rows_with_component_union_chart_pairs:
        rowCounts.combined_component_union_chart_pair_constructed,
      rows_with_endpoint_evaluation_map_pairs:
        rowCounts.combined_endpoint_evaluation_map_pair_constructed,
      proof_grade_boundary_opening_rows: rowCounts.proof_grade_boundary_opening_certified,
      row_ready_count: rowAttempts.filter((row) => row.row_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      endpoint_layer_failure_code_counts: failureCodeCounts(endpointAttempts),
      endpoint_required_fields_certified_counts: endpointCounts,
      row_required_fields_certified_counts: rowCounts,
      endpoint_promotion_method_pass_counts: methodCounts,
    },
  };
}

function endpointTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.id}\` | \`${attempt.support_interval_ids.join(", ")}\` | ${attempt.required_fields_present.component_union_no_double_counting_rule_constructed} | ${attempt.required_fields_present.target_endpoint_evaluation_locator_constructed} | ${attempt.endpoint_motion_rule_constructed} | ${attempt.endpoint_evaluation_map_constructed} | ${attempt.full_endpoint_evaluation_map_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.chart_pair_constructed} | ${row.required_fields_present.source_endpoint_motion_rule_constructed} | ${row.required_fields_present.receiver_endpoint_motion_rule_constructed} | ${row.endpoint_evaluation_pair_constructed} | ${row.row_ready} | ${row.row_consumed} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function artifactTable(artifacts) {
  return Object.entries(artifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present} | \`${artifact.sha256}\` |`
    )
    .join("\n");
}

function obstructionTable(attempts) {
  return attempts
    .map((attempt) => `| \`${attempt.id}\` | \`${attempt.obstruction_codes.join("`, `")}\` |`)
    .join("\n");
}

function buildReport(certificate) {
  const endpointTotal = certificate.endpoint_motion_evaluation_layer_attempts.length;
  const rowTotal = certificate.row_motion_evaluation_layer_attempts.length;
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Evaluation-Map Layer Attempt

## Verdict

Status: \`${certificate.status}\`.

This priority-only packet imports the support-only component-union chart
certificate and tests the next promotion layer. It preserves the certified chart
facts: ${certificate.summary.component_union_domains_constructed} / ${endpointTotal}
component-union domains, ${certificate.summary.component_union_coordinate_rules_constructed} / ${endpointTotal}
coordinate rules, ${certificate.summary.component_union_no_double_counting_rules_constructed} / ${endpointTotal}
component-union no-double-counting rules, and ${certificate.summary.target_endpoint_evaluation_locators_constructed} / ${endpointTotal}
target endpoint evaluation locators. It also records
${certificate.summary.evaluation_map_symbols_declared} / ${endpointTotal} declared
evaluation-map symbols and ${certificate.summary.endpoint_evaluation_rules_declared} / ${endpointTotal}
declared endpoint evaluation rules.

The promotion still fail-closes. It constructs
${certificate.summary.endpoint_motion_rules_constructed} / ${endpointTotal}
endpoint motion rules, ${certificate.summary.endpoint_evaluation_maps_constructed} / ${endpointTotal}
full endpoint evaluation maps,
${certificate.summary.non_target_zero_certificates} / ${endpointTotal}
non-target zero certificates, ${certificate.summary.exact_screen_zero_certificates} / ${endpointTotal}
exact $B\\xi=0$ certificates, ${certificate.summary.rank_certificates} / ${endpointTotal}
rank certificates, ${certificate.summary.candidate_artifacts_present} candidate
artifacts, ${certificate.summary.topology_recertifications} topology
recertifications, and ${certificate.summary.proof_interval_v1_v6_replays}
proof-interval v1-v6 replays. It consumes ${certificate.summary.row_consumption_count}
rows and leaves \`branch_chart_authorized=false\`.

## Source Artifacts And Authorization Locks

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${artifactTable(certificate.source_artifacts)}

| Lock | Value |
| --- | ---: |
| \`branch_chart_authorized\` | ${certificate.authorization_lock.branch_chart_authorized} |
| \`preledger_pass\` | ${certificate.authorization_lock.preledger_pass} |
| \`updates_live_ledger\` | ${certificate.authorization_lock.updates_live_ledger} |
| \`row_consumption_count\` | ${certificate.authorization_lock.row_consumption_count} |

## Endpoint-Motion / Evaluation-Map Rule

${certificate.endpoint_motion_full_evaluation_map_layer_rule}

## No-Promotion Rule

${certificate.no_promotion_rule}

## Endpoint Summary

| Endpoint variable | Support | No double counting | Target locator | Endpoint motion | Evaluation map | Full endpoint map |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${endpointTable(certificate.endpoint_motion_evaluation_layer_attempts)}

## Row Summary

| Row | Chart pair | Source endpoint motion | Receiver endpoint motion | Evaluation-map pair | Row ready | Row consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(certificate.row_motion_evaluation_layer_attempts)}

## Endpoint Field Counts

| Field | Certified count |
| --- | ---: |
${fieldTable(certificate.summary.endpoint_required_fields_certified_counts, ENDPOINT_EVALUATION_LAYER_FIELDS, endpointTotal)}

## Row Field Counts

| Field | Certified count |
| --- | ---: |
${fieldTable(certificate.summary.row_required_fields_certified_counts, ROW_EVALUATION_LAYER_FIELDS, rowTotal)}

## Collision Audit

This packet uses \`full_endpoint_evaluation_map_constructed\` for the new
post-component-union layer. It does not set or reuse
\`global_domain_evaluation_map_constructed\`, does not emit candidate artifacts,
does not perform topology recertification, does not perform proof-interval
replay, and does not authorize row consumption or branch-chart construction.

## Closure Burden

The missing closure fields are endpoint boundary binding, same-packet history
update, endpoint motion rule, endpoint evaluation rule, endpoint value binding,
non-target endpoint action enumeration and zero certification, exact $B\\xi=0$,
rank certification, candidate artifact generation, topology recertification,
and proof-interval v1-v6 replay.

## Obstruction Codes

| Endpoint variable | Obstruction codes |
| --- | --- |
${obstructionTable(certificate.endpoint_motion_evaluation_layer_attempts)}

## Capture Decision

Priority-only. This packet closes the immediate promotion question after the
component-union chart certificate: a chart locator and local
$E_j(\\Psi_j)=\\pm 1$ identity are still not endpoint motion and are still not a
full endpoint-functional evaluation map. The next proof object remains an
actual same-packet endpoint motion/evaluation-map realization, including
endpoint boundary binding, same-packet history update, endpoint motion rule,
endpoint evaluation rule, non-target zero certificates, exact $B\\xi=0$, rank,
candidate artifacts, topology recertification, and proof-interval v1-v6 replay.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const sources = {
    domainEvaluationContract: args.domainEvaluationContract,
    globalAttempt: args.globalAttempt,
    replayReadinessAudit: args.replayReadinessAudit,
    componentUnionChartCertificate: args.componentUnionChartCertificate,
  };
  const inputs = {
    domainEvaluationContract: readJson(args.domainEvaluationContract),
    globalAttempt: readJson(args.globalAttempt),
    replayReadinessAudit: readJson(args.replayReadinessAudit),
    componentUnionChartCertificate: readJson(args.componentUnionChartCertificate),
  };
  const attempt = buildAttempt(inputs, sources);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeText(outReport, buildReport(attempt));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

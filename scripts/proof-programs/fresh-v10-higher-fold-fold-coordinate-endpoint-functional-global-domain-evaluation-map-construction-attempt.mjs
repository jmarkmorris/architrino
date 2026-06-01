#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_EXPLICIT_PSI_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_explicit_psi_formula_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DOMAIN_EVALUATION_CONTRACT = `${CERT_DIR}/fold_coordinate_endpoint_functional_domain_evaluation_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_global_domain_evaluation_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_global_domain_evaluation_map_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const GLOBAL_DOMAIN_EVALUATION_FIELDS = [
  "local_formula_candidate_available",
  "local_derivative_formula_available",
  "local_support_components_available",
  "component_endpoint_identities_exact",
  "component_union_domain_symbol_declared",
  "component_supports_disjoint_or_single_component",
  "component_union_no_double_counting_rule_constructed",
  "global_domain_chart_constructed",
  "global_domain_coordinate_rule_constructed",
  "global_basis_vector_bound_to_domain",
  "global_gluing_rule_constructed",
  "global_periodicity_rule_constructed",
  "endpoint_boundary_binding_constructed",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "endpoint_value_bound_to_evaluation_map",
  "target_action_exact_under_global_evaluation_map",
  "non_target_endpoint_actions_enumerated",
  "non_target_endpoint_zero_certified",
  "same_packet_x_update_basis_constructed",
  "same_packet_xdot_update_basis_constructed",
  "mesh_update_rule_constructed",
  "source_monotonicity_rule_constructed",
  "receiver_monotonicity_rule_constructed",
  "same_packet_history_update_formula_present",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "global_domain_evaluation_map_constructed",
];

const ROW_GLOBAL_DOMAIN_EVALUATION_FIELDS = [
  "row_locator_resolved",
  "source_formula_candidate_available",
  "receiver_formula_candidate_available",
  "source_local_target_action_exact",
  "receiver_local_target_action_exact",
  "source_global_domain_evaluation_map_constructed",
  "receiver_global_domain_evaluation_map_constructed",
  "combined_global_domain_evaluation_pair_constructed",
  "source_non_target_zero_certified",
  "receiver_non_target_zero_certified",
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

const GLOBAL_PROMOTION_METHODS = [
  {
    id: "local_formula_family_as_global_domain_chart",
    description:
      "Try to read the component-local formula family as the endpoint-functional global domain chart.",
    required_fields: [
      "local_formula_candidate_available",
      "local_derivative_formula_available",
      "local_support_components_available",
      "component_endpoint_identities_exact",
      "component_union_domain_symbol_declared",
      "global_domain_chart_constructed",
      "global_domain_coordinate_rule_constructed",
      "global_basis_vector_bound_to_domain",
    ],
  },
  {
    id: "component_union_as_global_coordinate_rule",
    description:
      "Try to promote the component support union into a same-packet coordinate rule without double counting.",
    required_fields: [
      "component_union_domain_symbol_declared",
      "component_supports_disjoint_or_single_component",
      "component_union_no_double_counting_rule_constructed",
      "global_domain_chart_constructed",
      "global_domain_coordinate_rule_constructed",
      "global_gluing_rule_constructed",
      "global_periodicity_rule_constructed",
    ],
  },
  {
    id: "local_target_identity_as_endpoint_evaluation_map",
    description:
      "Try to promote the exact local endpoint identity into a global endpoint evaluation map.",
    required_fields: [
      "component_endpoint_identities_exact",
      "endpoint_boundary_binding_constructed",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "endpoint_value_bound_to_evaluation_map",
      "target_action_exact_under_global_evaluation_map",
      "global_domain_evaluation_map_constructed",
    ],
  },
  {
    id: "component_extension_as_same_packet_history_update",
    description:
      "Try to treat the component formulas as a same-packet history update with mesh, gluing, and monotonicity rules.",
    required_fields: [
      "same_packet_x_update_basis_constructed",
      "same_packet_xdot_update_basis_constructed",
      "mesh_update_rule_constructed",
      "endpoint_motion_rule_constructed",
      "source_monotonicity_rule_constructed",
      "receiver_monotonicity_rule_constructed",
      "global_gluing_rule_constructed",
      "global_periodicity_rule_constructed",
      "same_packet_history_update_formula_present",
    ],
  },
  {
    id: "global_domain_evaluation_map_as_row_consumption",
    description:
      "Try to consume fold-coordinate rows from the promoted global domain/evaluation maps.",
    required_fields: [
      "global_domain_evaluation_map_constructed",
      "non_target_endpoint_actions_enumerated",
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    explicitPsiAttempt: DEFAULT_EXPLICIT_PSI_ATTEMPT,
    domainEvaluationContract: DEFAULT_DOMAIN_EVALUATION_CONTRACT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--explicit-psi-attempt") {
      args.explicitPsiAttempt = argv[++index];
    } else if (arg === "--domain-evaluation-contract") {
      args.domainEvaluationContract = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-global-domain-evaluation-map-construction-attempt.mjs [options]

Options:
  --explicit-psi-attempt PATH        Explicit Psi formula attempt JSON. Defaults to ${DEFAULT_EXPLICIT_PSI_ATTEMPT}.
  --domain-evaluation-contract PATH  Endpoint-functional domain/evaluation-map contract JSON. Defaults to ${DEFAULT_DOMAIN_EVALUATION_CONTRACT}.
  --out-dir PATH                     Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                           Pretty-print JSON artifact.
  --help                             Show this help.`);
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

function byId(rows, idField = "id") {
  return new Map((rows ?? []).map((row) => [row[idField], row]));
}

function countFields(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function assertInputs(inputs) {
  const explicitPsiAttempt = inputs.explicitPsiAttempt;
  const contract = inputs.domainEvaluationContract;
  if (explicitPsiAttempt.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected explicit-Psi packet id: ${explicitPsiAttempt.packet_id}`);
  }
  if (explicitPsiAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected explicit-Psi fold-coordinate packet id: ${explicitPsiAttempt.fold_coordinate_packet_id}`);
  }
  if (explicitPsiAttempt.status !== "fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_fail_closed") {
    throw new Error(`Unexpected explicit-Psi status: ${explicitPsiAttempt.status}`);
  }
  if (contract.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected contract packet id: ${contract.packet_id}`);
  }
  if (contract.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected contract fold-coordinate packet id: ${contract.fold_coordinate_packet_id}`);
  }
  if (
    contract.status !==
    "fold_coordinate_endpoint_functional_domain_evaluation_map_contract_defined_domain_evaluation_map_absent"
  ) {
    throw new Error(`Unexpected contract status: ${contract.status}`);
  }
  if (
    explicitPsiAttempt.branch_chart_authorized ||
    explicitPsiAttempt.preledger_pass ||
    explicitPsiAttempt.updates_live_ledger ||
    contract.branch_chart_authorized ||
    contract.preledger_pass ||
    contract.updates_live_ledger
  ) {
    throw new Error("Refusing to build global domain/evaluation attempt from an authorized or live-updating source.");
  }
  if (
    !Array.isArray(explicitPsiAttempt.endpoint_explicit_psi_formula_attempts) ||
    explicitPsiAttempt.endpoint_explicit_psi_formula_attempts.length !== 4
  ) {
    throw new Error("Expected exactly 4 endpoint explicit Psi formula attempts.");
  }
  if (
    !Array.isArray(explicitPsiAttempt.row_explicit_psi_formula_attempts) ||
    explicitPsiAttempt.row_explicit_psi_formula_attempts.length !== 3
  ) {
    throw new Error("Expected exactly 3 row explicit Psi formula attempts.");
  }
  if (
    !Array.isArray(contract.endpoint_domain_evaluation_contracts) ||
    contract.endpoint_domain_evaluation_contracts.length !== 4
  ) {
    throw new Error("Expected exactly 4 endpoint domain/evaluation contracts.");
  }
}

function supportComponentsExact(endpointAttempt) {
  return (
    endpointAttempt.support_components.length > 0 &&
    endpointAttempt.support_components.every(
      (component) => component.local_endpoint_identities?.local_identity_exact === true
    )
  );
}

function supportTopology(endpointAttempt) {
  const supportIds = endpointAttempt.support_interval_ids ?? [];
  const uniqueSupportIds = [...new Set(supportIds)];
  return {
    support_interval_ids: supportIds,
    unique_support_interval_ids: uniqueSupportIds,
    support_component_count: endpointAttempt.support_components.length,
    support_union_kind: uniqueSupportIds.length === 1 ? "single_component" : "disjoint_component_union",
    component_supports_disjoint_or_single_component: uniqueSupportIds.length === supportIds.length,
  };
}

function buildRequiredFields(endpointAttempt) {
  const formulaFields = endpointAttempt.formula_fields_present ?? {};
  const proofFields = endpointAttempt.required_fields_present ?? {};
  const topology = supportTopology(endpointAttempt);
  const localEndpointIdentitiesExact = supportComponentsExact(endpointAttempt);
  return {
    local_formula_candidate_available: formulaFields.explicit_psi_formula_declared === true,
    local_derivative_formula_available: formulaFields.explicit_psi_derivative_formula_declared === true,
    local_support_components_available: formulaFields.explicit_psi_support_declared === true,
    component_endpoint_identities_exact: localEndpointIdentitiesExact,
    component_union_domain_symbol_declared:
      typeof endpointAttempt.domain_symbol === "string" && endpointAttempt.domain_symbol.length > 0,
    component_supports_disjoint_or_single_component: topology.component_supports_disjoint_or_single_component,
    component_union_no_double_counting_rule_constructed: false,
    global_domain_chart_constructed: proofFields.domain_chart_declared === true,
    global_domain_coordinate_rule_constructed: proofFields.domain_coordinate_rule_declared === true,
    global_basis_vector_bound_to_domain: proofFields.basis_vector_bound_to_domain === true,
    global_gluing_rule_constructed: proofFields.c1_gluing_rule_present === true,
    global_periodicity_rule_constructed: proofFields.periodic_extension_rule_present === true,
    endpoint_boundary_binding_constructed: proofFields.endpoint_boundary_binding_present === true,
    endpoint_motion_rule_constructed: proofFields.endpoint_motion_rule_present === true,
    endpoint_evaluation_map_constructed:
      proofFields.evaluation_map_declared === true && proofFields.endpoint_evaluation_rule_declared === true,
    endpoint_value_bound_to_evaluation_map: proofFields.endpoint_value_bound_to_evaluation_map === true,
    target_action_exact_under_global_evaluation_map:
      proofFields.domain_evaluation_map_constructed === true && localEndpointIdentitiesExact,
    non_target_endpoint_actions_enumerated: false,
    non_target_endpoint_zero_certified: proofFields.non_target_endpoint_functionals_zero_certified === true,
    same_packet_x_update_basis_constructed: proofFields.x_update_basis_present === true,
    same_packet_xdot_update_basis_constructed: proofFields.xdot_update_basis_present === true,
    mesh_update_rule_constructed: proofFields.mesh_update_rule_present === true,
    source_monotonicity_rule_constructed: proofFields.source_monotonicity_rule_present === true,
    receiver_monotonicity_rule_constructed: proofFields.receiver_monotonicity_rule_present === true,
    same_packet_history_update_formula_present: proofFields.same_packet_history_update_formula_present === true,
    exact_screen_zero_certified: proofFields.exact_screen_zero_certified === true,
    rank_certified: proofFields.rank_certified === true,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
    global_domain_evaluation_map_constructed: proofFields.domain_evaluation_map_constructed === true,
  };
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  const passed = missingFields.length === 0;
  return {
    method_id: method.id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_global_${field}`),
    passed,
  };
}

function obstructionCodes(fields, topology) {
  const codes = [];
  if (topology.support_union_kind === "disjoint_component_union" && !fields.component_union_no_double_counting_rule_constructed) {
    codes.push("disjoint_component_union_without_no_double_counting_rule");
  }
  if (!fields.global_domain_chart_constructed) {
    codes.push("global_domain_chart_absent");
  }
  if (!fields.global_domain_coordinate_rule_constructed) {
    codes.push("global_domain_coordinate_rule_absent");
  }
  if (!fields.global_gluing_rule_constructed) {
    codes.push("global_gluing_rule_absent");
  }
  if (!fields.global_periodicity_rule_constructed) {
    codes.push("global_periodicity_rule_absent");
  }
  if (!fields.endpoint_motion_rule_constructed) {
    codes.push("endpoint_motion_rule_absent");
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

function buildEndpointAttempt(endpointAttempt) {
  const topology = supportTopology(endpointAttempt);
  const fields = buildRequiredFields(endpointAttempt);
  const methodResults = GLOBAL_PROMOTION_METHODS.map((method) => methodResult(method, fields));
  return {
    id: endpointAttempt.id,
    endpoint_functional_id: endpointAttempt.endpoint_functional_id,
    role: endpointAttempt.role,
    basis_symbol: endpointAttempt.basis_symbol,
    source_symbol: endpointAttempt.source_symbol,
    row_uses: endpointAttempt.row_uses,
    target_equation: endpointAttempt.target_equation,
    target_action: endpointAttempt.target_action,
    target_sign: endpointAttempt.target_sign,
    domain_symbol: endpointAttempt.domain_symbol,
    chart_symbol: endpointAttempt.chart_symbol,
    evaluation_map_symbol: endpointAttempt.evaluation_map_symbol,
    support_topology: topology,
    support_components: endpointAttempt.support_components,
    required_fields_present: fields,
    method_results: methodResults,
    promotion_methods_passed: methodResults.filter((result) => result.passed).map((result) => result.method_id),
    local_formula_candidate_available: fields.local_formula_candidate_available,
    component_endpoint_identities_exact: fields.component_endpoint_identities_exact,
    global_domain_chart_constructed: fields.global_domain_chart_constructed,
    global_domain_evaluation_map_constructed: fields.global_domain_evaluation_map_constructed,
    global_construction_supplied: false,
    obstruction_codes: obstructionCodes(fields, topology),
    obstruction:
      "The endpoint-local cubic formula is present and its component endpoint identity is exact, but no global same-packet domain chart, coordinate rule, gluing/periodicity rule, endpoint motion/evaluation map, non-target zero certificate, exact $B\\xi=0$, rank certificate, topology recertification, or proof-interval v1-v6 replay is constructed.",
  };
}

function buildRowAttempt(rowAttempt, endpointAttemptById) {
  const source = endpointAttemptById.get(rowAttempt.source_endpoint_contract_id);
  const receiver = endpointAttemptById.get(rowAttempt.receiver_endpoint_contract_id);
  const sourceFields = source?.required_fields_present ?? {};
  const receiverFields = receiver?.required_fields_present ?? {};
  const previousFields = rowAttempt.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: previousFields.row_locator_resolved === true,
    source_formula_candidate_available: sourceFields.local_formula_candidate_available === true,
    receiver_formula_candidate_available: receiverFields.local_formula_candidate_available === true,
    source_local_target_action_exact: sourceFields.component_endpoint_identities_exact === true,
    receiver_local_target_action_exact: receiverFields.component_endpoint_identities_exact === true,
    source_global_domain_evaluation_map_constructed: sourceFields.global_domain_evaluation_map_constructed === true,
    receiver_global_domain_evaluation_map_constructed: receiverFields.global_domain_evaluation_map_constructed === true,
    combined_global_domain_evaluation_pair_constructed:
      sourceFields.global_domain_evaluation_map_constructed === true &&
      receiverFields.global_domain_evaluation_map_constructed === true,
    source_non_target_zero_certified: sourceFields.non_target_endpoint_zero_certified === true,
    receiver_non_target_zero_certified: receiverFields.non_target_endpoint_zero_certified === true,
    screen_positive_candidate_change_row: previousFields.screen_positive_candidate_change_row === true,
    signed_boundary_delta_contract_defined: previousFields.signed_boundary_delta_contract_defined === true,
    proof_grade_boundary_opening_certified: false,
    same_packet_history_update_formula_present: previousFields.same_packet_history_update_formula_present === true,
    candidate_artifacts_present: previousFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      previousFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      previousFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.proof_grade_boundary_opening_certified =
    fields.source_global_domain_evaluation_map_constructed &&
    fields.receiver_global_domain_evaluation_map_constructed &&
    fields.combined_global_domain_evaluation_pair_constructed &&
    fields.source_non_target_zero_certified &&
    fields.receiver_non_target_zero_certified &&
    fields.screen_positive_candidate_change_row &&
    fields.signed_boundary_delta_contract_defined &&
    fields.same_packet_history_update_formula_present &&
    fields.candidate_artifacts_present &&
    fields.root_topology_recertified_for_candidate_change &&
    fields.proof_interval_v1_v6_rerun_for_candidate_change;
  return {
    row_id: rowAttempt.row_id,
    source_interval: rowAttempt.source_interval,
    receiver_interval: rowAttempt.receiver_interval,
    failed_side: rowAttempt.failed_side,
    boundary_side: rowAttempt.boundary_side,
    source_endpoint_contract_id: rowAttempt.source_endpoint_contract_id,
    receiver_endpoint_contract_id: rowAttempt.receiver_endpoint_contract_id,
    source_support_topology: source?.support_topology ?? null,
    receiver_support_topology: receiver?.support_topology ?? null,
    required_fields_present: fields,
    local_formula_candidate_pair_available:
      fields.source_formula_candidate_available && fields.receiver_formula_candidate_available,
    local_target_action_pair_exact: fields.source_local_target_action_exact && fields.receiver_local_target_action_exact,
    global_domain_evaluation_pair_constructed: fields.combined_global_domain_evaluation_pair_constructed,
    row_ready: ROW_GLOBAL_DOMAIN_EVALUATION_FIELDS.every((field) => fields[field] === true),
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has a source/receiver pair of local Psi formula candidates with exact local endpoint actions, but no source/receiver global domain/evaluation pair, non-target zero certificate, or same-packet replay exists.",
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
  const endpointAttempts = inputs.explicitPsiAttempt.endpoint_explicit_psi_formula_attempts.map(buildEndpointAttempt);
  const endpointAttemptById = byId(endpointAttempts);
  const rowAttempts = inputs.explicitPsiAttempt.row_explicit_psi_formula_attempts.map((rowAttempt) =>
    buildRowAttempt(rowAttempt, endpointAttemptById)
  );
  const endpointCounts = countFields(endpointAttempts, GLOBAL_DOMAIN_EVALUATION_FIELDS);
  const rowCounts = countFields(rowAttempts, ROW_GLOBAL_DOMAIN_EVALUATION_FIELDS);
  const methodCounts = Object.fromEntries(
    GLOBAL_PROMOTION_METHODS.map((method) => [
      method.id,
      endpointAttempts.filter((attempt) =>
        attempt.method_results.some((result) => result.method_id === method.id && result.passed)
      ).length,
    ])
  );
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-global-domain-evaluation-map-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_global_domain_evaluation_map_construction_attempt_fail_closed",
    theorem_target: "Fold-Coordinate Endpoint-Functional Global Domain/Evaluation-Map Construction Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only global domain/evaluation-map construction attempt; local Psi formulas are available but no proof-grade same-packet global endpoint-functional maps are constructed and no rows are consumed",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      explicitPsiAttempt: artifactRecord(sources.explicitPsiAttempt),
      domainEvaluationContract: artifactRecord(sources.domainEvaluationContract),
    },
    global_domain_evaluation_rule:
      "Here global means a single same-packet construction over all support components for the relevant `fc_*` variable, not a universal time-space object. A component-local Psi formula promotes only if the same packet constructs a global endpoint-functional domain chart, coordinate rule, basis-domain binding, gluing and periodicity rules, endpoint boundary binding, endpoint motion rule, endpoint evaluation map, non-target zero certificate, exact $B\\xi=0$, rank, topology recertification, and proof-interval v1-v6 replay.",
    no_promotion_rule:
      "Do not promote a local $E_j(\\Psi_j)=\\pm 1$ endpoint identity into a global same-packet domain/evaluation map until all global domain/evaluation-map fields and replay gates are constructed in the same packet.",
    component_union_rule:
      "A disjoint component union is only a support list until the packet constructs a global coordinate rule and a no-double-counting rule for the endpoint-functional domain.",
    promotion_methods: GLOBAL_PROMOTION_METHODS,
    endpoint_global_domain_evaluation_attempts: endpointAttempts,
    row_global_domain_evaluation_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      local_formula_candidates_available: endpointCounts.local_formula_candidate_available,
      local_derivative_formulas_available: endpointCounts.local_derivative_formula_available,
      local_support_components_available: endpointCounts.local_support_components_available,
      component_endpoint_identities_exact: endpointCounts.component_endpoint_identities_exact,
      component_union_domain_symbols_declared: endpointCounts.component_union_domain_symbol_declared,
      disjoint_or_single_supports: endpointCounts.component_supports_disjoint_or_single_component,
      no_double_counting_rules_constructed: endpointCounts.component_union_no_double_counting_rule_constructed,
      global_domain_charts_constructed: endpointCounts.global_domain_chart_constructed,
      global_domain_coordinate_rules_constructed: endpointCounts.global_domain_coordinate_rule_constructed,
      global_gluing_rules_constructed: endpointCounts.global_gluing_rule_constructed,
      global_periodicity_rules_constructed: endpointCounts.global_periodicity_rule_constructed,
      endpoint_motion_rules_constructed: endpointCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_maps_constructed: endpointCounts.endpoint_evaluation_map_constructed,
      target_actions_exact_under_global_evaluation_map:
        endpointCounts.target_action_exact_under_global_evaluation_map,
      non_target_endpoint_actions_enumerated: endpointCounts.non_target_endpoint_actions_enumerated,
      non_target_zero_certificates: endpointCounts.non_target_endpoint_zero_certified,
      same_packet_history_update_formulas_present: endpointCounts.same_packet_history_update_formula_present,
      exact_screen_zero_certificates: endpointCounts.exact_screen_zero_certified,
      rank_certificates: endpointCounts.rank_certified,
      candidate_artifacts_present: endpointCounts.candidate_artifacts_present,
      topology_recertifications: endpointCounts.root_topology_recertified_for_candidate_change,
      proof_interval_v1_v6_replays: endpointCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      global_domain_evaluation_maps_constructed: endpointCounts.global_domain_evaluation_map_constructed,
      promotion_methods_passed_total: endpointAttempts.reduce(
        (sum, attempt) => sum + attempt.promotion_methods_passed.length,
        0
      ),
      rows_with_local_formula_candidate_pairs: rowAttempts.filter((row) => row.local_formula_candidate_pair_available)
        .length,
      rows_with_local_target_action_pairs_exact: rowAttempts.filter((row) => row.local_target_action_pair_exact).length,
      rows_with_global_domain_evaluation_pairs: rowCounts.combined_global_domain_evaluation_pair_constructed,
      proof_grade_boundary_opening_rows: rowCounts.proof_grade_boundary_opening_certified,
      row_ready_count: rowAttempts.filter((row) => row.row_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      global_promotion_failure_code_counts: failureCodeCounts(endpointAttempts),
      endpoint_required_fields_certified_counts: endpointCounts,
      row_required_fields_certified_counts: rowCounts,
      global_promotion_method_pass_counts: methodCounts,
    },
  };
}

function endpointTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.id}\` | \`${attempt.support_topology.support_interval_ids.join(", ")}\` | \`${attempt.support_topology.support_union_kind}\` | ${attempt.local_formula_candidate_available} | ${attempt.component_endpoint_identities_exact} | ${attempt.global_domain_chart_constructed} | ${attempt.global_domain_evaluation_map_constructed} |`
    )
    .join("\n");
}

function obstructionTable(attempts) {
  return attempts
    .map((attempt) => `| \`${attempt.id}\` | \`${attempt.obstruction_codes.join("`, `")}\` |`)
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.local_formula_candidate_pair_available} | ${row.local_target_action_pair_exact} | ${row.global_domain_evaluation_pair_constructed} | ${row.required_fields_present.screen_positive_candidate_change_row} | ${row.required_fields_present.signed_boundary_delta_contract_defined} | ${row.row_ready} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function methodTable(counts, total) {
  return GLOBAL_PROMOTION_METHODS.map((method) => `| \`${method.id}\` | ${counts[method.id]} / ${total} |`).join("\n");
}

function buildReport(attempt) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Global Domain/Evaluation-Map Construction Attempt

## Verdict

The packet tests whether the four endpoint-local cubic $\\Psi_j$ formula
candidates can be promoted into global same-packet endpoint-functional
domain/evaluation maps. The local side remains exact: 4 / 4 formula candidates
are available and 4 / 4 component endpoint identities are exact. The global
promotion still fail-closes: 0 / 4 global domain charts, 0 / 4 global coordinate
rules, 0 / 4 endpoint evaluation maps, 0 / 4 non-target zero certificates, and
0 / 3 row-ready global domain/evaluation pairs are constructed.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals | ${attempt.summary.endpoint_functionals} |
| Local $\\Psi_j$ formula candidates available | ${attempt.summary.local_formula_candidates_available} |
| Component endpoint identities exact | ${attempt.summary.component_endpoint_identities_exact} |
| Domain symbols declared | ${attempt.summary.component_union_domain_symbols_declared} |
| No-double-counting rules constructed | ${attempt.summary.no_double_counting_rules_constructed} |
| Global domain charts constructed | ${attempt.summary.global_domain_charts_constructed} |
| Global coordinate rules constructed | ${attempt.summary.global_domain_coordinate_rules_constructed} |
| Global gluing rules constructed | ${attempt.summary.global_gluing_rules_constructed} |
| Global periodicity rules constructed | ${attempt.summary.global_periodicity_rules_constructed} |
| Endpoint evaluation maps constructed | ${attempt.summary.endpoint_evaluation_maps_constructed} |
| Non-target zero certificates | ${attempt.summary.non_target_zero_certificates} |
| Exact $B\\xi=0$ certificates | ${attempt.summary.exact_screen_zero_certificates} |
| Rank certificates | ${attempt.summary.rank_certificates} |
| Proof-interval v1-v6 replays | ${attempt.summary.proof_interval_v1_v6_replays} |
| Promotion method passes | ${attempt.summary.promotion_methods_passed_total} |
| Rows with local formula-candidate pairs | ${attempt.summary.rows_with_local_formula_candidate_pairs} |
| Rows with global domain/evaluation pairs | ${attempt.summary.rows_with_global_domain_evaluation_pairs} |
| Row-ready count | ${attempt.summary.row_ready_count} |
| Row consumption count | ${attempt.summary.row_consumption_count} |

## Promotion Rule

${attempt.global_domain_evaluation_rule}

${attempt.no_promotion_rule}

${attempt.component_union_rule}

## Endpoint Attempts

| Variable | Support intervals | Support kind | Local formula | Local identity exact | Global domain chart | Global domain/evaluation map |
| --- | --- | --- | --- | --- | --- | --- |
${endpointTable(attempt.endpoint_global_domain_evaluation_attempts)}

## Endpoint Obstructions

| Variable | Obstruction codes |
| --- | --- |
${obstructionTable(attempt.endpoint_global_domain_evaluation_attempts)}

## Method Audit

| Method | Endpoint passes |
| --- | ---: |
${methodTable(attempt.summary.global_promotion_method_pass_counts, attempt.summary.endpoint_functionals)}

## Endpoint Field Audit

| Field | Endpoint count |
| --- | ---: |
${fieldTable(attempt.summary.endpoint_required_fields_certified_counts, GLOBAL_DOMAIN_EVALUATION_FIELDS, attempt.summary.endpoint_functionals)}

## Row Attempts

| Row | Local formula pair | Local target pair exact | Global domain/evaluation pair | Screen positive | Signed delta contract | Ready |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_global_domain_evaluation_attempts)}

## Row Field Audit

| Field | Row count |
| --- | ---: |
${fieldTable(attempt.summary.row_required_fields_certified_counts, ROW_GLOBAL_DOMAIN_EVALUATION_FIELDS, attempt.summary.rows)}

## Closure Burden

The local formula problem is no longer the active blocker. The active blocker is
global evaluation semantics: the packet still needs a domain chart and
coordinate rule for each \`fc_*\` endpoint functional, a no-double-counting rule
for disjoint component unions, gluing and periodicity rules that explain how the
nonzero endpoint value is represented as endpoint motion rather than an
unbound jump, an endpoint evaluation map, non-target zero certificates, exact
$B\\xi=0$ and rank certificates, topology recertification, and proof-interval
v1-v6 replay.

## Capture Decision

Priority-only global domain/evaluation-map construction attempt. This packet is useful because it
moves the fail-closed point from "maybe no explicit $\\Psi_j$ formula exists" to
"explicit local formulas exist, but global same-packet endpoint-functional
domain/evaluation maps are still absent." It is not ready for authored AAA prose
because it is a failed construction packet rather than a branch certificate.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    explicitPsiAttempt: readJson(args.explicitPsiAttempt),
    domainEvaluationContract: readJson(args.domainEvaluationContract),
  };
  const sources = {
    explicitPsiAttempt: args.explicitPsiAttempt,
    domainEvaluationContract: args.domainEvaluationContract,
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

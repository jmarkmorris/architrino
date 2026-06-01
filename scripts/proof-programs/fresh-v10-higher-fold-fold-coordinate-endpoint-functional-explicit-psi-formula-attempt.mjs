#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DOMAIN_EVALUATION_CONTRACT = `${CERT_DIR}/fold_coordinate_endpoint_functional_domain_evaluation_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_SOURCE_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_source_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_C1_ENDPOINT_BASIS_ANSATZ = `${CERT_DIR}/fold_coordinate_endpoint_functional_c1_endpoint_basis_ansatz_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_explicit_psi_formula_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_PROOF_FIELDS = [
  "endpoint_locator_resolved",
  "row_local_endpoint_value_present",
  "functional_target_equation_defined",
  "target_action_sign_consistent",
  "endpoint_boundary_binding_present",
  "endpoint_functional_domain_present",
  "domain_chart_declared",
  "domain_coordinate_rule_declared",
  "basis_vector_bound_to_domain",
  "evaluation_map_declared",
  "endpoint_evaluation_rule_declared",
  "endpoint_value_bound_to_evaluation_map",
  "theta_support_present",
  "basis_formula_present",
  "basis_derivative_formula_present",
  "x_update_basis_present",
  "xdot_update_basis_present",
  "mesh_update_rule_present",
  "endpoint_motion_rule_present",
  "source_monotonicity_rule_present",
  "receiver_monotonicity_rule_present",
  "periodic_extension_rule_present",
  "c1_gluing_rule_present",
  "same_packet_history_update_formula_present",
  "non_target_endpoint_functionals_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "domain_evaluation_map_constructed",
];

const EXPLICIT_PSI_FORMULA_FIELDS = [
  "explicit_psi_formula_declared",
  "explicit_psi_derivative_formula_declared",
  "explicit_psi_support_declared",
  "explicit_psi_coordinate_domain_declared",
  "explicit_psi_periodic_extension_rule_declared",
  "explicit_psi_c1_gluing_rule_declared",
  "explicit_psi_bound_to_fc_variable",
  "explicit_psi_endpoint_boundary_binding_declared",
  "explicit_psi_endpoint_motion_rule_declared",
  "explicit_psi_endpoint_evaluation_rule_declared",
  "explicit_psi_target_action_evaluated",
  "explicit_psi_target_action_exact",
  "explicit_psi_non_target_actions_evaluated",
  "explicit_psi_non_target_actions_zero_certified",
  "explicit_psi_same_packet_history_update_declared",
  "explicit_psi_mesh_update_rule_declared",
  "explicit_psi_promoted_to_domain_evaluation_map",
  "explicit_psi_formula_constructed",
];

const ROW_EXPLICIT_PSI_FIELDS = [
  "row_locator_resolved",
  "source_endpoint_contract_declared",
  "receiver_endpoint_contract_declared",
  "source_formula_candidate_declared",
  "receiver_formula_candidate_declared",
  "source_explicit_psi_formula_constructed",
  "receiver_explicit_psi_formula_constructed",
  "source_target_action_exact",
  "receiver_target_action_exact",
  "source_non_target_zero_certified",
  "receiver_non_target_zero_certified",
  "source_domain_evaluation_map_constructed",
  "receiver_domain_evaluation_map_constructed",
  "combined_domain_evaluation_pair_constructed",
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

const EXPLICIT_PSI_METHODS = [
  {
    id: "component_local_cubic_endpoint_shape_identity",
    description:
      "Verify the endpoint-local cubic shape identity on each declared support component.",
    candidate_only: true,
    required_formula_fields: [
      "explicit_psi_formula_declared",
      "explicit_psi_derivative_formula_declared",
      "explicit_psi_support_declared",
      "explicit_psi_coordinate_domain_declared",
      "explicit_psi_bound_to_fc_variable",
      "explicit_psi_target_action_evaluated",
      "explicit_psi_target_action_exact",
    ],
    required_proof_fields: [],
  },
  {
    id: "component_union_as_same_packet_endpoint_basis",
    description:
      "Try to promote the component-local formula union to a same-packet endpoint-functional basis.",
    candidate_only: false,
    required_formula_fields: [
      "explicit_psi_formula_declared",
      "explicit_psi_derivative_formula_declared",
      "explicit_psi_support_declared",
      "explicit_psi_coordinate_domain_declared",
      "explicit_psi_periodic_extension_rule_declared",
      "explicit_psi_c1_gluing_rule_declared",
      "explicit_psi_non_target_actions_zero_certified",
    ],
    required_proof_fields: [
      "endpoint_boundary_binding_present",
      "endpoint_functional_domain_present",
      "domain_chart_declared",
      "domain_coordinate_rule_declared",
      "basis_vector_bound_to_domain",
      "theta_support_present",
      "basis_formula_present",
      "basis_derivative_formula_present",
      "periodic_extension_rule_present",
      "c1_gluing_rule_present",
    ],
  },
  {
    id: "local_target_action_as_evaluation_map",
    description:
      "Try to promote the local target-action identity to the endpoint-functional evaluation map.",
    candidate_only: false,
    required_formula_fields: [
      "explicit_psi_endpoint_evaluation_rule_declared",
      "explicit_psi_endpoint_motion_rule_declared",
      "explicit_psi_target_action_exact",
      "explicit_psi_promoted_to_domain_evaluation_map",
    ],
    required_proof_fields: [
      "evaluation_map_declared",
      "endpoint_evaluation_rule_declared",
      "endpoint_value_bound_to_evaluation_map",
      "endpoint_motion_rule_present",
      "domain_evaluation_map_constructed",
    ],
  },
  {
    id: "explicit_psi_candidate_as_row_consumption",
    description:
      "Try to consume rows from explicit formulas without same-packet replay data.",
    candidate_only: false,
    required_formula_fields: [
      "explicit_psi_formula_constructed",
      "explicit_psi_non_target_actions_zero_certified",
      "explicit_psi_same_packet_history_update_declared",
      "explicit_psi_mesh_update_rule_declared",
    ],
    required_proof_fields: [
      "same_packet_history_update_formula_present",
      "non_target_endpoint_functionals_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
    ],
  },
];

const ENDPOINT_SHAPES = {
  lo: {
    id: "H_left",
    formula: "H_left(s)=1-3s^2+2s^3",
    derivative: "dH_left/dtheta=(-6s+6s^2)/(R-L)",
    endpoint_values: { lo: 1, hi: 0 },
    endpoint_derivatives: { lo: 0, hi: 0 },
  },
  hi: {
    id: "H_right",
    formula: "H_right(s)=3s^2-2s^3",
    derivative: "dH_right/dtheta=(6s-6s^2)/(R-L)",
    endpoint_values: { lo: 0, hi: 1 },
    endpoint_derivatives: { lo: 0, hi: 0 },
  },
};

function parseArgs(argv) {
  const args = {
    domainEvaluationContract: DEFAULT_DOMAIN_EVALUATION_CONTRACT,
    sourceAudit: DEFAULT_SOURCE_AUDIT,
    c1EndpointBasisAnsatz: DEFAULT_C1_ENDPOINT_BASIS_ANSATZ,
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
    } else if (arg === "--source-audit") {
      args.sourceAudit = argv[++index];
    } else if (arg === "--c1-endpoint-basis-ansatz") {
      args.c1EndpointBasisAnsatz = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-explicit-psi-formula-attempt.mjs [options]

Options:
  --domain-evaluation-contract PATH  Endpoint-functional domain/evaluation-map contract JSON. Defaults to ${DEFAULT_DOMAIN_EVALUATION_CONTRACT}.
  --source-audit PATH                 Endpoint-functional source audit JSON. Defaults to ${DEFAULT_SOURCE_AUDIT}.
  --c1-endpoint-basis-ansatz PATH     Previous C1 endpoint-basis ansatz JSON. Defaults to ${DEFAULT_C1_ENDPOINT_BASIS_ANSATZ}.
  --out-dir PATH                      Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                            Pretty-print JSON artifact.
  --help                              Show this help.`);
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
  const contract = inputs.domainEvaluationContract;
  const sourceAudit = inputs.sourceAudit;
  const c1Attempt = inputs.c1EndpointBasisAnsatz;
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
  if (sourceAudit.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected source-audit packet id: ${sourceAudit.packet_id}`);
  }
  if (sourceAudit.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected source-audit fold-coordinate packet id: ${sourceAudit.fold_coordinate_packet_id}`);
  }
  if (sourceAudit.status !== "fold_coordinate_endpoint_functional_source_audit_fail_closed") {
    throw new Error(`Unexpected source-audit status: ${sourceAudit.status}`);
  }
  if (c1Attempt.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected C1 ansatz packet id: ${c1Attempt.packet_id}`);
  }
  if (c1Attempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected C1 ansatz fold-coordinate packet id: ${c1Attempt.fold_coordinate_packet_id}`);
  }
  if (c1Attempt.status !== "fold_coordinate_endpoint_functional_c1_endpoint_basis_ansatz_attempt_fail_closed") {
    throw new Error(`Unexpected C1 ansatz status: ${c1Attempt.status}`);
  }
  if (
    contract.branch_chart_authorized ||
    contract.preledger_pass ||
    contract.updates_live_ledger ||
    sourceAudit.branch_chart_authorized ||
    sourceAudit.preledger_pass ||
    sourceAudit.updates_live_ledger ||
    c1Attempt.branch_chart_authorized ||
    c1Attempt.preledger_pass ||
    c1Attempt.updates_live_ledger
  ) {
    throw new Error("Refusing to build explicit Psi attempt from an authorized or live-updating source.");
  }
  if (!Array.isArray(contract.endpoint_domain_evaluation_contracts) || contract.endpoint_domain_evaluation_contracts.length !== 4) {
    throw new Error("Expected exactly 4 endpoint domain/evaluation-map contracts.");
  }
  if (!Array.isArray(contract.row_domain_evaluation_contracts) || contract.row_domain_evaluation_contracts.length !== 3) {
    throw new Error("Expected exactly 3 row domain/evaluation-map contracts.");
  }
  if (!Array.isArray(sourceAudit.row_sources) || sourceAudit.row_sources.length !== 3) {
    throw new Error("Expected exactly 3 row sources.");
  }
}

function proofFieldsFromContract(endpointContract) {
  const contractFields = endpointContract.required_fields_present ?? {};
  return Object.fromEntries(ENDPOINT_PROOF_FIELDS.map((field) => [field, contractFields[field] === true]));
}

function supportIntervalForRef(ref, rowSource) {
  return ref.role === "source" ? rowSource.source_interval : rowSource.receiver_interval;
}

function meshIntervalForRef(ref, rowSource) {
  return ref.role === "source" ? rowSource.mesh_source_interval : rowSource.mesh_receiver_interval;
}

function thetaRangeQForRef(ref, rowSource) {
  if (ref.role === "source") {
    return rowSource.source_cover_ref?.source_theta_range_q ?? null;
  }
  return rowSource.source_cover_ref?.receiver_theta_range_q ?? null;
}

function endpointThetaSide(ref) {
  if (ref.role === "source") {
    return "hi";
  }
  if (ref.endpoint_ref.endsWith(".lo")) {
    return "lo";
  }
  if (ref.endpoint_ref.endsWith(".hi")) {
    return "hi";
  }
  throw new Error(`Cannot infer endpoint theta side for ${ref.endpoint_ref}`);
}

function oppositeSide(side) {
  return side === "lo" ? "hi" : "lo";
}

function signText(sign) {
  if (sign === 1) {
    return "+1";
  }
  if (sign === -1) {
    return "-1";
  }
  return String(sign);
}

function componentFormula(endpointContract, component) {
  const shape = ENDPOINT_SHAPES[component.endpoint_side_theta];
  return {
    local_coordinate: `s_${component.row_id}=(theta-L_${component.support_interval_id})/(R_${component.support_interval_id}-L_${component.support_interval_id})`,
    shape_id: shape.id,
    shape_formula: shape.formula,
    shape_derivative: shape.derivative,
    formula: `${endpointContract.basis_symbol}[${component.row_id}](theta)=${signText(endpointContract.target_sign)}*${shape.id}(s_${component.row_id})`,
    derivative_formula: `d${endpointContract.basis_symbol}[${component.row_id}]/dtheta=${signText(endpointContract.target_sign)}*d${shape.id}/dtheta`,
  };
}

function componentIdentities(endpointContract, component) {
  const shape = ENDPOINT_SHAPES[component.endpoint_side_theta];
  const targetSide = component.endpoint_side_theta;
  const otherSide = oppositeSide(targetSide);
  const targetValue = endpointContract.target_sign * shape.endpoint_values[targetSide];
  const otherValue = endpointContract.target_sign * shape.endpoint_values[otherSide];
  return {
    target_endpoint_shape_value: shape.endpoint_values[targetSide],
    target_endpoint_formula_value: targetValue,
    target_endpoint_derivative_value: shape.endpoint_derivatives[targetSide],
    opposite_endpoint_shape_value: shape.endpoint_values[otherSide],
    opposite_endpoint_formula_value: otherValue,
    opposite_endpoint_derivative_value: shape.endpoint_derivatives[otherSide],
    target_action_matches_sign: targetValue === endpointContract.target_sign,
    target_derivative_zero: shape.endpoint_derivatives[targetSide] === 0,
    opposite_endpoint_zero: otherValue === 0,
    opposite_endpoint_derivative_zero: shape.endpoint_derivatives[otherSide] === 0,
    local_identity_exact:
      targetValue === endpointContract.target_sign &&
      shape.endpoint_derivatives[targetSide] === 0 &&
      otherValue === 0 &&
      shape.endpoint_derivatives[otherSide] === 0,
  };
}

function buildSupportComponents(endpointContract, rowSourceById) {
  return (endpointContract.target_endpoint_refs ?? []).map((ref) => {
    const rowSource = rowSourceById.get(ref.row_id);
    if (!rowSource) {
      throw new Error(`Missing row source for ${ref.row_id}`);
    }
    const endpointSideTheta = endpointThetaSide(ref);
    const supportIntervalId = supportIntervalForRef(ref, rowSource);
    const meshInterval = meshIntervalForRef(ref, rowSource);
    const thetaRangeQ = thetaRangeQForRef(ref, rowSource);
    const endpointSideQ = thetaRangeQ?.[endpointSideTheta] ?? null;
    const base = {
      row_id: ref.row_id,
      role: ref.role,
      support_interval_id: supportIntervalId,
      endpoint_ref: ref.endpoint_ref,
      endpoint_q_value: ref.endpoint_value ?? null,
      endpoint_side_q: endpointSideQ,
      endpoint_side_theta: endpointSideTheta,
      target_sign: endpointContract.target_sign,
      target_equation: endpointContract.target_equation,
      ownership_component_id: ref.ownership_component_id ?? rowSource.ownership_component_id ?? null,
      theta_range_q: thetaRangeQ,
      theta_range_display: thetaRangeQ?.display ?? meshInterval?.theta_range ?? null,
      mesh_interval: meshInterval,
      terminal_grid_span: rowSource.terminal_grid_span ?? null,
    };
    return {
      ...base,
      formula_candidate: componentFormula(endpointContract, base),
      local_endpoint_identities: componentIdentities(endpointContract, base),
    };
  });
}

function formulaFields(endpointContract, supportComponents) {
  const localIdentitiesExact =
    supportComponents.length > 0 &&
    supportComponents.every((component) => component.local_endpoint_identities.local_identity_exact === true);
  return {
    explicit_psi_formula_declared: supportComponents.length > 0,
    explicit_psi_derivative_formula_declared: supportComponents.length > 0,
    explicit_psi_support_declared: supportComponents.length > 0,
    explicit_psi_coordinate_domain_declared: supportComponents.length > 0,
    explicit_psi_periodic_extension_rule_declared: false,
    explicit_psi_c1_gluing_rule_declared: false,
    explicit_psi_bound_to_fc_variable: endpointContract.id.startsWith("fc_"),
    explicit_psi_endpoint_boundary_binding_declared: supportComponents.length > 0,
    explicit_psi_endpoint_motion_rule_declared: localIdentitiesExact,
    explicit_psi_endpoint_evaluation_rule_declared: localIdentitiesExact,
    explicit_psi_target_action_evaluated: localIdentitiesExact,
    explicit_psi_target_action_exact: localIdentitiesExact,
    explicit_psi_non_target_actions_evaluated: false,
    explicit_psi_non_target_actions_zero_certified: false,
    explicit_psi_same_packet_history_update_declared: false,
    explicit_psi_mesh_update_rule_declared: false,
    explicit_psi_promoted_to_domain_evaluation_map: false,
    explicit_psi_formula_constructed: false,
  };
}

function methodResult(method, formulaFieldValues, proofFieldValues) {
  const missingFormulaFields = method.required_formula_fields.filter((field) => formulaFieldValues[field] !== true);
  const missingProofFields = method.required_proof_fields.filter((field) => proofFieldValues[field] !== true);
  const passed = missingFormulaFields.length === 0 && missingProofFields.length === 0;
  return {
    method_id: method.id,
    description: method.description,
    candidate_only: method.candidate_only,
    required_formula_fields: method.required_formula_fields,
    required_proof_fields: method.required_proof_fields,
    missing_formula_fields: missingFormulaFields,
    missing_proof_fields: missingProofFields,
    failure_codes: [
      ...missingFormulaFields.map((field) => `missing_formula_${field}`),
      ...missingProofFields.map((field) => `missing_proof_${field}`),
    ],
    candidate_identity_passed: method.candidate_only && passed,
    proof_passed: !method.candidate_only && passed,
    passed,
  };
}

function buildEndpointAttempt(endpointContract, rowSourceById) {
  const supportComponents = buildSupportComponents(endpointContract, rowSourceById);
  const formulaFieldValues = formulaFields(endpointContract, supportComponents);
  const proofFieldValues = proofFieldsFromContract(endpointContract);
  const methodResults = EXPLICIT_PSI_METHODS.map((method) =>
    methodResult(method, formulaFieldValues, proofFieldValues)
  );
  const supportIntervalIds = [...new Set(supportComponents.map((component) => component.support_interval_id))];
  return {
    id: endpointContract.id,
    endpoint_functional_id: endpointContract.endpoint_functional_id,
    role: endpointContract.role,
    basis_symbol: endpointContract.basis_symbol,
    source_symbol: endpointContract.source_symbol,
    row_uses: endpointContract.row_uses,
    target_endpoint_refs: endpointContract.target_endpoint_refs,
    target_equation: endpointContract.target_equation,
    target_action: endpointContract.target_action,
    target_sign: endpointContract.target_sign,
    domain_symbol: endpointContract.endpoint_functional_domain_contract?.domain_symbol ?? null,
    chart_symbol: endpointContract.endpoint_functional_domain_contract?.chart_symbol ?? null,
    evaluation_map_symbol: endpointContract.evaluation_map_contract?.evaluation_map_symbol ?? null,
    support_interval_ids: supportIntervalIds,
    support_components: supportComponents,
    local_formula_family: {
      coordinate_domain: "componentwise s in [0,1] with s=(theta-L)/(R-L) on each declared support interval",
      left_endpoint_shape: ENDPOINT_SHAPES.lo.formula,
      left_endpoint_derivative: ENDPOINT_SHAPES.lo.derivative,
      right_endpoint_shape: ENDPOINT_SHAPES.hi.formula,
      right_endpoint_derivative: ENDPOINT_SHAPES.hi.derivative,
      coefficient_rule: "multiply the selected shape by the endpoint contract target_sign",
      component_union_rule:
        "For variables used by multiple rows, declare one local component on each row interval; this is a formula candidate, not a certified global same-packet basis.",
    },
    formula_fields_present: formulaFieldValues,
    required_fields_present: proofFieldValues,
    method_results: methodResults,
    candidate_only_methods_passed: methodResults
      .filter((result) => result.candidate_only && result.candidate_identity_passed)
      .map((result) => result.method_id),
    proof_methods_passed: methodResults
      .filter((result) => !result.candidate_only && result.proof_passed)
      .map((result) => result.method_id),
    explicit_psi_formula_candidate_declared: formulaFieldValues.explicit_psi_formula_declared === true,
    explicit_psi_local_target_action_exact: formulaFieldValues.explicit_psi_target_action_exact === true,
    explicit_psi_formula_constructed: formulaFieldValues.explicit_psi_formula_constructed === true,
    domain_evaluation_map_constructed: proofFieldValues.domain_evaluation_map_constructed === true,
    realization_supplied: false,
    no_promotion_reason:
      "The packet declares endpoint-local cubic Psi formula candidates and verifies their local endpoint interpolation identities, but it does not bind them to a same-packet endpoint-functional domain chart, evaluation map, global gluing rule, non-target zero certificate, exact $B\\xi=0$, rank certificate, candidate topology, or v1-v6 replay.",
  };
}

function buildRowAttempt(rowContract, endpointAttemptById) {
  const source = endpointAttemptById.get(rowContract.source_endpoint_contract_id);
  const receiver = endpointAttemptById.get(rowContract.receiver_endpoint_contract_id);
  const contractFields = rowContract.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: contractFields.row_locator_resolved === true,
    source_endpoint_contract_declared: rowContract.endpoint_contract_status?.source_endpoint_contract_declared === true,
    receiver_endpoint_contract_declared: rowContract.endpoint_contract_status?.receiver_endpoint_contract_declared === true,
    source_formula_candidate_declared: source?.explicit_psi_formula_candidate_declared === true,
    receiver_formula_candidate_declared: receiver?.explicit_psi_formula_candidate_declared === true,
    source_explicit_psi_formula_constructed: source?.explicit_psi_formula_constructed === true,
    receiver_explicit_psi_formula_constructed: receiver?.explicit_psi_formula_constructed === true,
    source_target_action_exact: source?.explicit_psi_local_target_action_exact === true,
    receiver_target_action_exact: receiver?.explicit_psi_local_target_action_exact === true,
    source_non_target_zero_certified:
      source?.formula_fields_present.explicit_psi_non_target_actions_zero_certified === true,
    receiver_non_target_zero_certified:
      receiver?.formula_fields_present.explicit_psi_non_target_actions_zero_certified === true,
    source_domain_evaluation_map_constructed: source?.domain_evaluation_map_constructed === true,
    receiver_domain_evaluation_map_constructed: receiver?.domain_evaluation_map_constructed === true,
    combined_domain_evaluation_pair_constructed: false,
    screen_positive_candidate_change_row: contractFields.screen_positive_candidate_change_row === true,
    signed_boundary_delta_contract_defined: contractFields.signed_boundary_delta_contract_defined === true,
    proof_grade_boundary_opening_certified: false,
    same_packet_history_update_formula_present: contractFields.same_packet_history_update_formula_present === true,
    candidate_artifacts_present: contractFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change: contractFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change: contractFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_domain_evaluation_pair_constructed =
    fields.source_domain_evaluation_map_constructed && fields.receiver_domain_evaluation_map_constructed;
  fields.proof_grade_boundary_opening_certified =
    fields.source_explicit_psi_formula_constructed &&
    fields.receiver_explicit_psi_formula_constructed &&
    fields.combined_domain_evaluation_pair_constructed &&
    fields.source_non_target_zero_certified &&
    fields.receiver_non_target_zero_certified &&
    fields.screen_positive_candidate_change_row &&
    fields.signed_boundary_delta_contract_defined &&
    fields.same_packet_history_update_formula_present &&
    fields.candidate_artifacts_present &&
    fields.root_topology_recertified_for_candidate_change &&
    fields.proof_interval_v1_v6_rerun_for_candidate_change;
  return {
    row_id: rowContract.row_id,
    source_interval: rowContract.source_interval,
    receiver_interval: rowContract.receiver_interval,
    failed_side: rowContract.failed_side,
    boundary_side: rowContract.boundary_side,
    source_endpoint_contract_id: rowContract.source_endpoint_contract_id,
    receiver_endpoint_contract_id: rowContract.receiver_endpoint_contract_id,
    source_support_interval_ids: source?.support_interval_ids ?? [],
    receiver_support_interval_ids: receiver?.support_interval_ids ?? [],
    required_fields_present: fields,
    formula_candidate_pair_declared:
      fields.source_formula_candidate_declared && fields.receiver_formula_candidate_declared,
    local_target_action_pair_exact: fields.source_target_action_exact && fields.receiver_target_action_exact,
    explicit_psi_formula_pair_constructed:
      fields.source_explicit_psi_formula_constructed && fields.receiver_explicit_psi_formula_constructed,
    row_ready: ROW_EXPLICIT_PSI_FIELDS.every((field) => fields[field] === true),
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source and receiver endpoint-local Psi formula candidates with exact local target-action identities, but it has no constructed endpoint-functional domain/evaluation pair, no non-target zero certificate, and no same-packet replay.",
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
  const rowSourceById = byId(inputs.sourceAudit.row_sources, "row_id");
  const endpointAttempts = inputs.domainEvaluationContract.endpoint_domain_evaluation_contracts.map((contract) =>
    buildEndpointAttempt(contract, rowSourceById)
  );
  const endpointAttemptById = byId(endpointAttempts);
  const rowAttempts = inputs.domainEvaluationContract.row_domain_evaluation_contracts.map((rowContract) =>
    buildRowAttempt(rowContract, endpointAttemptById)
  );
  const endpointProofCounts = countFields(endpointAttempts, ENDPOINT_PROOF_FIELDS);
  const endpointFormulaCounts = countFields(endpointAttempts, EXPLICIT_PSI_FORMULA_FIELDS, "formula_fields_present");
  const rowCounts = countFields(rowAttempts, ROW_EXPLICIT_PSI_FIELDS);
  const methodCounts = Object.fromEntries(
    EXPLICIT_PSI_METHODS.map((method) => [
      method.id,
      endpointAttempts.filter((attempt) =>
        attempt.method_results.some((result) => result.method_id === method.id && result.passed)
      ).length,
    ])
  );
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-explicit-psi-formula-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_fail_closed",
    theorem_target: "Fold-Coordinate Endpoint-Functional Explicit Psi Formula Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only explicit Psi formula attempt; declares endpoint-local cubic formula candidates but constructs no same-packet endpoint-functional domain/evaluation maps and consumes no rows",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      domainEvaluationContract: artifactRecord(sources.domainEvaluationContract),
      sourceAudit: artifactRecord(sources.sourceAudit),
      c1EndpointBasisAnsatz: artifactRecord(sources.c1EndpointBasisAnsatz),
    },
    explicit_psi_formula_rule:
      "For each endpoint component with theta interval [L,R], use s=(theta-L)/(R-L). A lo-theta endpoint uses H_left(s)=1-3s^2+2s^3; a hi-theta endpoint uses H_right(s)=3s^2-2s^3; the component is multiplied by the endpoint contract target_sign.",
    no_promotion_rule:
      "Do not promote endpoint-local polynomial identities into same-packet endpoint-functional maps unless the packet also supplies endpoint boundary binding, endpoint-functional domain/chart/rule, evaluation map, endpoint-motion rule, non-target zero certificate, exact $B\\xi=0$, rank, topology recertification, and proof-interval v1-v6 replay.",
    component_union_note:
      "Lower `fc_*` variables are component-union candidates over two row intervals; upper `fc_*` variables are single-component candidates. Component unions remain formula candidates until a global same-packet domain chart and gluing rule are constructed.",
    endpoint_explicit_psi_formula_attempts: endpointAttempts,
    row_explicit_psi_formula_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      endpoint_contracts_declared: endpointAttempts.filter(
        (attempt) => attempt.required_fields_present.endpoint_locator_resolved && attempt.required_fields_present.functional_target_equation_defined
      ).length,
      explicit_psi_formula_candidates_declared: endpointFormulaCounts.explicit_psi_formula_declared,
      explicit_psi_derivative_formula_candidates_declared: endpointFormulaCounts.explicit_psi_derivative_formula_declared,
      explicit_psi_supports_declared: endpointFormulaCounts.explicit_psi_support_declared,
      explicit_psi_local_target_actions_exact: endpointFormulaCounts.explicit_psi_target_action_exact,
      explicit_psi_non_target_zero_certificates: endpointFormulaCounts.explicit_psi_non_target_actions_zero_certified,
      explicit_psi_formula_constructed_count: endpointFormulaCounts.explicit_psi_formula_constructed,
      explicit_psi_promoted_to_domain_evaluation_map_count:
        endpointFormulaCounts.explicit_psi_promoted_to_domain_evaluation_map,
      domain_evaluation_maps_constructed: endpointProofCounts.domain_evaluation_map_constructed,
      endpoint_realizations_supplied: endpointAttempts.filter((attempt) => attempt.realization_supplied).length,
      exact_screen_zero_certified_endpoint_functionals: endpointProofCounts.exact_screen_zero_certified,
      rank_certified_endpoint_functionals: endpointProofCounts.rank_certified,
      candidate_only_methods_passed_total: endpointAttempts.reduce(
        (sum, attempt) => sum + attempt.candidate_only_methods_passed.length,
        0
      ),
      proof_methods_passed_total: endpointAttempts.reduce((sum, attempt) => sum + attempt.proof_methods_passed.length, 0),
      row_locators_resolved: rowCounts.row_locator_resolved,
      rows_with_formula_candidate_pairs_declared: rowAttempts.filter((row) => row.formula_candidate_pair_declared).length,
      rows_with_local_target_action_pairs_exact: rowAttempts.filter((row) => row.local_target_action_pair_exact).length,
      rows_with_explicit_psi_formula_pairs_constructed: rowAttempts.filter(
        (row) => row.explicit_psi_formula_pair_constructed
      ).length,
      rows_with_combined_domain_evaluation_pair_constructed:
        rowCounts.combined_domain_evaluation_pair_constructed,
      proof_grade_boundary_opening_rows: rowCounts.proof_grade_boundary_opening_certified,
      screen_positive_rows: rowCounts.screen_positive_candidate_change_row,
      signed_boundary_delta_rows: rowCounts.signed_boundary_delta_contract_defined,
      row_ready_count: rowAttempts.filter((row) => row.row_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      explicit_psi_failure_code_counts: failureCodeCounts(endpointAttempts),
      endpoint_required_fields_certified_counts: endpointProofCounts,
      endpoint_formula_field_counts: endpointFormulaCounts,
      row_required_fields_certified_counts: rowCounts,
      explicit_psi_method_pass_counts: methodCounts,
    },
  };
}

function endpointTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.id}\` | \`${attempt.endpoint_functional_id}\` | \`${attempt.support_interval_ids.join(", ")}\` | ${attempt.explicit_psi_formula_candidate_declared} | ${attempt.explicit_psi_local_target_action_exact} | ${attempt.explicit_psi_formula_constructed} | ${attempt.domain_evaluation_map_constructed} | \`${attempt.target_equation}\` |`
    )
    .join("\n");
}

function componentTable(attempts) {
  return attempts
    .flatMap((attempt) =>
      attempt.support_components.map(
        (component) =>
          `| \`${attempt.basis_symbol}\` | \`${component.row_id}\` | \`${component.support_interval_id}\` | \`${component.endpoint_ref}\` | \`${component.endpoint_side_theta}\` | \`${component.formula_candidate.shape_id}\` | ${component.local_endpoint_identities.local_identity_exact} |`
      )
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.formula_candidate_pair_declared} | ${row.local_target_action_pair_exact} | ${row.explicit_psi_formula_pair_constructed} | ${row.required_fields_present.combined_domain_evaluation_pair_constructed} | ${row.required_fields_present.screen_positive_candidate_change_row} | ${row.required_fields_present.signed_boundary_delta_contract_defined} | ${row.row_ready} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function methodTable(counts, total) {
  return EXPLICIT_PSI_METHODS.map((method) => `| \`${method.id}\` | ${counts[method.id]} / ${total} |`).join("\n");
}

function buildReport(attempt) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Explicit Psi Formula Attempt

## Verdict

The packet writes concrete endpoint-local cubic $\\Psi_j$ formula candidates for
all four \`fc_*\` endpoint variables. The local interpolation identities pass:
4 / 4 formulas and derivatives are declared, and 4 / 4 target endpoint actions
evaluate exactly to the contract sign. The attempt still fail-closes because
0 / 4 formulas are promoted to same-packet endpoint-functional
domain/evaluation maps, 0 / 4 non-target zero certificates are supplied, and
0 / 3 row-ready domain/evaluation pairs are constructed.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals | ${attempt.summary.endpoint_functionals} |
| Explicit $\\Psi_j$ formula candidates declared | ${attempt.summary.explicit_psi_formula_candidates_declared} |
| Local target actions exact | ${attempt.summary.explicit_psi_local_target_actions_exact} |
| Explicit $\\Psi_j$ formulas constructed | ${attempt.summary.explicit_psi_formula_constructed_count} |
| Endpoint domain/evaluation maps constructed | ${attempt.summary.domain_evaluation_maps_constructed} |
| Non-target zero certificates | ${attempt.summary.explicit_psi_non_target_zero_certificates} |
| Candidate-only method passes | ${attempt.summary.candidate_only_methods_passed_total} |
| Proof method passes | ${attempt.summary.proof_methods_passed_total} |
| Row formula-candidate pairs declared | ${attempt.summary.rows_with_formula_candidate_pairs_declared} |
| Row domain/evaluation pairs constructed | ${attempt.summary.rows_with_combined_domain_evaluation_pair_constructed} |
| Row-ready count | ${attempt.summary.row_ready_count} |
| Row consumption count | ${attempt.summary.row_consumption_count} |

## Formula Rule

${attempt.explicit_psi_formula_rule}

${attempt.component_union_note}

${attempt.no_promotion_rule}

## Endpoint Attempts

| Variable | Functional | Support intervals | Formula candidate | Local target exact | Formula constructed | Domain/evaluation map | Target equation |
| --- | --- | --- | --- | --- | --- | --- | --- |
${endpointTable(attempt.endpoint_explicit_psi_formula_attempts)}

## Support Components

| Basis | Row | Support interval | Endpoint ref | Theta anchor | Shape | Local identity exact |
| --- | --- | --- | --- | --- | --- | --- |
${componentTable(attempt.endpoint_explicit_psi_formula_attempts)}

## Method Audit

| Method | Endpoint passes |
| --- | ---: |
${methodTable(attempt.summary.explicit_psi_method_pass_counts, attempt.summary.endpoint_functionals)}

## Formula-Field Audit

| Field | Endpoint formula fields |
| --- | ---: |
${fieldTable(attempt.summary.endpoint_formula_field_counts, EXPLICIT_PSI_FORMULA_FIELDS, attempt.summary.endpoint_functionals)}

## Proof-Field Audit

| Field | Endpoint proof fields |
| --- | ---: |
${fieldTable(attempt.summary.endpoint_required_fields_certified_counts, ENDPOINT_PROOF_FIELDS, attempt.summary.endpoint_functionals)}

## Row Attempts

| Row | Formula pair declared | Local target pair exact | Formula pair constructed | Domain/evaluation pair constructed | Screen positive | Signed delta contract | Ready |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_explicit_psi_formula_attempts)}

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(attempt.summary.row_required_fields_certified_counts, ROW_EXPLICIT_PSI_FIELDS, attempt.summary.rows)}

## Closure Burden

The explicit formula candidate removes one ambiguity: the endpoint-local
polynomial identities are no longer missing. What remains is the global
same-packet construction burden. A successor must bind these candidates to a
domain chart and evaluation map, solve gluing/periodicity as a same-packet
history update, certify all non-target endpoint functionals vanish, and replay
the candidate through exact $B\\xi=0$, rank, topology, and proof-interval v1-v6
checks before any row can be consumed.

## Capture Decision

Priority-only formula attempt. This packet is useful because it separates the
local $\\Psi_j$ formula identities from the still-missing same-packet
domain/evaluation construction. It is not ready for authored AAA prose because
it is a failed construction packet rather than a branch certificate.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    domainEvaluationContract: readJson(args.domainEvaluationContract),
    sourceAudit: readJson(args.sourceAudit),
    c1EndpointBasisAnsatz: readJson(args.c1EndpointBasisAnsatz),
  };
  const sources = {
    domainEvaluationContract: args.domainEvaluationContract,
    sourceAudit: args.sourceAudit,
    c1EndpointBasisAnsatz: args.c1EndpointBasisAnsatz,
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

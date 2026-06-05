#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_source_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BASIS_ATTEMPT = `${CERT_DIR}/fold_coordinate_finite_realization_basis_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_CONTRACT = `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_no_go.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_HISTORY_CONTRACT = `${CERT_DIR}/fold_coordinate_history_realization_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_HISTORY_THEOREM_ATTEMPT = `${CERT_DIR}/fold_coordinate_history_realization_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FOLD_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`;
const DEFAULT_FOLD_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_domain_evaluation_map_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_domain_evaluation_map_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const DOMAIN_EVALUATION_FIELDS = [
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
  "same_packet_history_update_formula_present",
  "non_target_endpoint_functionals_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "domain_evaluation_map_constructed",
];

const ROW_DOMAIN_EVALUATION_FIELDS = [
  "row_locator_resolved",
  "source_domain_evaluation_map_constructed",
  "receiver_domain_evaluation_map_constructed",
  "combined_domain_evaluation_pair_constructed",
  "screen_positive_candidate_change_row",
  "proof_grade_boundary_opening_certified",
  "same_packet_history_update_formula_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const DOMAIN_EVALUATION_METHODS = [
  {
    id: "row_local_endpoint_ref_as_domain_chart",
    description:
      "Try to promote row-local endpoint refs and q-values into an endpoint-functional domain chart.",
    required_fields: [
      "endpoint_locator_resolved",
      "row_local_endpoint_value_present",
      "endpoint_functional_domain_present",
      "domain_chart_declared",
      "domain_coordinate_rule_declared",
      "basis_vector_bound_to_domain",
    ],
  },
  {
    id: "target_equation_as_evaluation_map",
    description:
      "Try to promote the target equation E_j(Psi_j)=+/-1 into the endpoint evaluation map.",
    required_fields: [
      "functional_target_equation_defined",
      "target_action_sign_consistent",
      "endpoint_boundary_binding_present",
      "endpoint_functional_domain_present",
      "evaluation_map_declared",
      "endpoint_evaluation_rule_declared",
      "endpoint_value_bound_to_evaluation_map",
      "non_target_endpoint_functionals_zero_certified",
    ],
  },
  {
    id: "basis_formula_as_endpoint_motion_map",
    description:
      "Try to build the evaluation map from an explicit same-packet basis formula and endpoint-motion rule.",
    required_fields: [
      "theta_support_present",
      "basis_formula_present",
      "basis_derivative_formula_present",
      "x_update_basis_present",
      "xdot_update_basis_present",
      "mesh_update_rule_present",
      "endpoint_motion_rule_present",
      "source_monotonicity_rule_present",
      "receiver_monotonicity_rule_present",
      "same_packet_history_update_formula_present",
    ],
  },
  {
    id: "binding_contract_import_as_domain_evaluation_map",
    description:
      "Try to import an already-certified endpoint binding contract as the domain/evaluation-map certificate.",
    required_fields: [
      "endpoint_boundary_binding_present",
      "endpoint_functional_domain_present",
      "domain_chart_declared",
      "evaluation_map_declared",
      "endpoint_value_bound_to_evaluation_map",
    ],
  },
  {
    id: "exact_screen_rank_as_chart_certificate",
    description:
      "Try to certify the endpoint domain/evaluation map from exact screen-zero and rank data.",
    required_fields: [
      "exact_screen_zero_certified",
      "rank_certified",
      "domain_chart_declared",
      "evaluation_map_declared",
      "endpoint_motion_rule_present",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    sourceAudit: DEFAULT_SOURCE_AUDIT,
    constructionAttempt: DEFAULT_CONSTRUCTION_ATTEMPT,
    basisAttempt: DEFAULT_BASIS_ATTEMPT,
    bindingContract: DEFAULT_BINDING_CONTRACT,
    historyContract: DEFAULT_HISTORY_CONTRACT,
    historyTheoremAttempt: DEFAULT_HISTORY_THEOREM_ATTEMPT,
    foldInput: DEFAULT_FOLD_INPUT,
    foldResult: DEFAULT_FOLD_RESULT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source-audit") {
      args.sourceAudit = argv[++index];
    } else if (arg === "--construction-attempt") {
      args.constructionAttempt = argv[++index];
    } else if (arg === "--basis-attempt") {
      args.basisAttempt = argv[++index];
    } else if (arg === "--binding-contract") {
      args.bindingContract = argv[++index];
    } else if (arg === "--history-contract") {
      args.historyContract = argv[++index];
    } else if (arg === "--history-theorem-attempt") {
      args.historyTheoremAttempt = argv[++index];
    } else if (arg === "--fold-input") {
      args.foldInput = argv[++index];
    } else if (arg === "--fold-result") {
      args.foldResult = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-domain-evaluation-map-attempt.mjs [options]

Options:
  --source-audit PATH              Endpoint-functional source audit JSON. Defaults to ${DEFAULT_SOURCE_AUDIT}.
  --construction-attempt PATH      Endpoint-functional construction attempt JSON. Defaults to ${DEFAULT_CONSTRUCTION_ATTEMPT}.
  --basis-attempt PATH             Finite-realization basis attempt JSON. Defaults to ${DEFAULT_BASIS_ATTEMPT}.
  --binding-contract PATH          Endpoint-functional binding no-go JSON. Defaults to ${DEFAULT_BINDING_CONTRACT}.
  --history-contract PATH          History-realization contract JSON. Defaults to ${DEFAULT_HISTORY_CONTRACT}.
  --history-theorem-attempt PATH   History-realization theorem-attempt JSON. Defaults to ${DEFAULT_HISTORY_THEOREM_ATTEMPT}.
  --fold-input PATH                Fold-coordinate collocation input JSON. Defaults to ${DEFAULT_FOLD_INPUT}.
  --fold-result PATH               Fold-coordinate collocation result JSON. Defaults to ${DEFAULT_FOLD_RESULT}.
  --out-dir PATH                   Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                         Pretty-print JSON artifact.
  --help                           Show this help.`);
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

function hasObjectField(record, field) {
  return record?.[field] !== undefined && record[field] !== null;
}

function hasAnyObjectField(record, fields) {
  return fields.some((field) => hasObjectField(record, field));
}

function boolFrom(...values) {
  return values.some((value) => value === true);
}

function assertCommonProofInput(input, label) {
  if (input.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${input.packet_id}`);
  }
  if (input.branch_chart_authorized === true || input.preledger_pass === true || input.updates_live_ledger === true) {
    throw new Error(`Refusing to build domain/evaluation-map attempt from an authorized or live-updating ${label}.`);
  }
}

function assertInputs(inputs) {
  assertCommonProofInput(inputs.sourceAudit, "source audit");
  assertCommonProofInput(inputs.constructionAttempt, "construction attempt");
  assertCommonProofInput(inputs.basisAttempt, "basis attempt");
  assertCommonProofInput(inputs.bindingContract, "binding contract");
  assertCommonProofInput(inputs.historyContract, "history contract");
  assertCommonProofInput(inputs.historyTheoremAttempt, "history theorem attempt");
  if (inputs.sourceAudit.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected source-audit fold-coordinate packet id: ${inputs.sourceAudit.fold_coordinate_packet_id}`);
  }
  if (inputs.constructionAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `Unexpected construction-attempt fold-coordinate packet id: ${inputs.constructionAttempt.fold_coordinate_packet_id}`
    );
  }
  if (inputs.basisAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected basis-attempt fold-coordinate packet id: ${inputs.basisAttempt.fold_coordinate_packet_id}`);
  }
  if (inputs.bindingContract.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected binding-contract fold-coordinate packet id: ${inputs.bindingContract.fold_coordinate_packet_id}`);
  }
  if (inputs.historyContract.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected history-contract fold-coordinate packet id: ${inputs.historyContract.fold_coordinate_packet_id}`);
  }
  if (inputs.historyTheoremAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `Unexpected history-theorem-attempt fold-coordinate packet id: ${inputs.historyTheoremAttempt.fold_coordinate_packet_id}`
    );
  }
  if (inputs.foldInput.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate input packet id: ${inputs.foldInput.packet_id}`);
  }
  if (inputs.foldResult.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate result packet id: ${inputs.foldResult.packet_id}`);
  }
  if (inputs.sourceAudit.status !== "fold_coordinate_endpoint_functional_source_audit_fail_closed") {
    throw new Error(`Unexpected source-audit status: ${inputs.sourceAudit.status}`);
  }
  if (inputs.constructionAttempt.status !== "fold_coordinate_endpoint_functional_construction_attempt_fail_closed") {
    throw new Error(`Unexpected construction-attempt status: ${inputs.constructionAttempt.status}`);
  }
  if (inputs.basisAttempt.status !== "fold_coordinate_finite_realization_basis_attempt_fail_closed") {
    throw new Error(`Unexpected basis-attempt status: ${inputs.basisAttempt.status}`);
  }
  if (inputs.bindingContract.status !== "fold_coordinate_endpoint_functional_binding_contract_no_go_fail_closed") {
    throw new Error(`Unexpected binding-contract status: ${inputs.bindingContract.status}`);
  }
  if (inputs.historyContract.status !== "fold_coordinate_history_realization_contract_defined_realization_absent") {
    throw new Error(`Unexpected history-contract status: ${inputs.historyContract.status}`);
  }
  if (inputs.historyTheoremAttempt.status !== "fold_coordinate_history_realization_theorem_attempt_fail_closed") {
    throw new Error(`Unexpected history-theorem-attempt status: ${inputs.historyTheoremAttempt.status}`);
  }
  if (inputs.foldResult.branch_chart_authorized === true || inputs.foldResult.preledger_pass === true) {
    throw new Error("Refusing to use an authorized or passed fold-coordinate result.");
  }
  if (!Array.isArray(inputs.bindingContract.endpoint_binding_attempts) || inputs.bindingContract.endpoint_binding_attempts.length !== 4) {
    throw new Error("Expected exactly 4 endpoint binding attempts.");
  }
  if (!Array.isArray(inputs.bindingContract.row_binding_attempts) || inputs.bindingContract.row_binding_attempts.length !== 3) {
    throw new Error("Expected exactly 3 row binding attempts.");
  }
}

function failureCodeForField(field) {
  return `missing_${field}`;
}

function evaluateDomainEvaluationMethods(fields) {
  return DOMAIN_EVALUATION_METHODS.map((method) => {
    const missingFields = method.required_fields.filter((field) => fields[field] !== true);
    return {
      method_id: method.id,
      description: method.description,
      required_fields: method.required_fields,
      missing_fields: missingFields,
      failure_codes: missingFields.map(failureCodeForField),
      passed: missingFields.length === 0,
    };
  });
}

function countFailureCodes(endpointAttempts) {
  const counts = {};
  for (const attempt of endpointAttempts) {
    for (const result of attempt.method_results) {
      for (const code of result.failure_codes) {
        counts[code] = (counts[code] ?? 0) + 1;
      }
    }
  }
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

function requiredEndpointFunctionals(...records) {
  for (const record of records) {
    if (Array.isArray(record?.required_endpoint_functionals) && record.required_endpoint_functionals.length > 0) {
      return record.required_endpoint_functionals;
    }
  }
  return [];
}

function fieldInventory(sourceVariable, constructionAttempt, basisVariable, bindingAttempt, historyVariable, theoremVariable) {
  return [
    {
      source: "source_audit",
      declares_domain_chart: hasAnyObjectField(sourceVariable, [
        "endpoint_functional_domain_chart",
        "domain_chart",
        "endpoint_domain_chart",
      ]),
      declares_evaluation_map: hasAnyObjectField(sourceVariable, ["endpoint_evaluation_map", "evaluation_map"]),
      declares_endpoint_motion_rule: hasObjectField(sourceVariable, "endpoint_motion_rule"),
    },
    {
      source: "construction_attempt",
      declares_domain_chart: hasAnyObjectField(constructionAttempt, [
        "endpoint_functional_domain_chart",
        "domain_chart",
        "endpoint_domain_chart",
      ]),
      declares_evaluation_map: hasAnyObjectField(constructionAttempt, ["endpoint_evaluation_map", "evaluation_map"]),
      declares_endpoint_motion_rule: hasObjectField(constructionAttempt, "endpoint_motion_rule"),
    },
    {
      source: "finite_realization_basis_attempt",
      declares_domain_chart: hasAnyObjectField(basisVariable, [
        "endpoint_functional_domain_chart",
        "domain_chart",
        "endpoint_domain_chart",
      ]),
      declares_evaluation_map: hasAnyObjectField(basisVariable, ["endpoint_evaluation_map", "evaluation_map"]),
      declares_endpoint_motion_rule: hasObjectField(basisVariable, "endpoint_motion_rule"),
    },
    {
      source: "binding_contract_no_go",
      declares_domain_chart: hasAnyObjectField(bindingAttempt, [
        "endpoint_functional_domain_chart",
        "domain_chart",
        "endpoint_domain_chart",
      ]),
      declares_evaluation_map: hasAnyObjectField(bindingAttempt, ["endpoint_evaluation_map", "evaluation_map"]),
      declares_endpoint_motion_rule: hasObjectField(bindingAttempt, "endpoint_motion_rule"),
    },
    {
      source: "history_realization_contract",
      declares_domain_chart: hasAnyObjectField(historyVariable, [
        "endpoint_functional_domain_chart",
        "domain_chart",
        "endpoint_domain_chart",
      ]),
      declares_evaluation_map: hasAnyObjectField(historyVariable, ["endpoint_evaluation_map", "evaluation_map"]),
      declares_endpoint_motion_rule: hasObjectField(historyVariable, "endpoint_motion_rule"),
    },
    {
      source: "history_realization_theorem_attempt",
      declares_domain_chart: hasAnyObjectField(theoremVariable, [
        "endpoint_functional_domain_chart",
        "domain_chart",
        "endpoint_domain_chart",
      ]),
      declares_evaluation_map: hasAnyObjectField(theoremVariable, ["endpoint_evaluation_map", "evaluation_map"]),
      declares_endpoint_motion_rule: hasObjectField(theoremVariable, "endpoint_motion_rule"),
    },
  ];
}

function buildEndpointDomainEvaluationAttempt(
  bindingAttempt,
  sourceVariable,
  constructionAttempt,
  basisVariable,
  historyVariable,
  theoremVariable,
  foldInputVariable,
  foldResult
) {
  const bindingFields = bindingAttempt.required_fields_present ?? {};
  const sourceFields = sourceVariable?.required_fields_present ?? {};
  const constructionFields = constructionAttempt?.required_fields_present ?? {};
  const basisFields = basisVariable?.required_fields_present ?? {};
  const theoremFields = theoremVariable?.required_fields_present ?? {};
  const requiredFunctionals = requiredEndpointFunctionals(
    bindingAttempt,
    constructionAttempt,
    sourceVariable,
    basisVariable
  );
  const domainChartDeclared = hasAnyObjectField(sourceVariable, [
    "endpoint_functional_domain_chart",
    "domain_chart",
    "endpoint_domain_chart",
  ]) ||
    hasAnyObjectField(constructionAttempt, ["endpoint_functional_domain_chart", "domain_chart", "endpoint_domain_chart"]) ||
    hasAnyObjectField(basisVariable, ["endpoint_functional_domain_chart", "domain_chart", "endpoint_domain_chart"]) ||
    hasAnyObjectField(bindingAttempt, ["endpoint_functional_domain_chart", "domain_chart", "endpoint_domain_chart"]) ||
    hasAnyObjectField(historyVariable, ["endpoint_functional_domain_chart", "domain_chart", "endpoint_domain_chart"]) ||
    hasAnyObjectField(theoremVariable, ["endpoint_functional_domain_chart", "domain_chart", "endpoint_domain_chart"]);
  const evaluationMapDeclared = hasAnyObjectField(sourceVariable, ["endpoint_evaluation_map", "evaluation_map"]) ||
    hasAnyObjectField(constructionAttempt, ["endpoint_evaluation_map", "evaluation_map"]) ||
    hasAnyObjectField(basisVariable, ["endpoint_evaluation_map", "evaluation_map"]) ||
    hasAnyObjectField(bindingAttempt, ["endpoint_evaluation_map", "evaluation_map"]) ||
    hasAnyObjectField(historyVariable, ["endpoint_evaluation_map", "evaluation_map"]) ||
    hasAnyObjectField(theoremVariable, ["endpoint_evaluation_map", "evaluation_map"]);
  const endpointEvaluationRuleDeclared = hasAnyObjectField(sourceVariable, [
    "endpoint_evaluation_rule",
    "endpoint_functional_evaluation_rule",
  ]) ||
    hasAnyObjectField(constructionAttempt, ["endpoint_evaluation_rule", "endpoint_functional_evaluation_rule"]) ||
    hasAnyObjectField(basisVariable, ["endpoint_evaluation_rule", "endpoint_functional_evaluation_rule"]) ||
    hasAnyObjectField(bindingAttempt, ["endpoint_evaluation_rule", "endpoint_functional_evaluation_rule"]) ||
    hasAnyObjectField(historyVariable, ["endpoint_evaluation_rule", "endpoint_functional_evaluation_rule"]) ||
    hasAnyObjectField(theoremVariable, ["endpoint_evaluation_rule", "endpoint_functional_evaluation_rule"]);
  const fields = {
    endpoint_locator_resolved: boolFrom(
      bindingFields.endpoint_locator_resolved,
      constructionFields.endpoint_locator_resolved,
      sourceFields.target_endpoint_ref_declared
    ),
    row_local_endpoint_value_present: boolFrom(
      bindingFields.row_local_endpoint_value_present,
      constructionFields.endpoint_value_present,
      sourceFields.target_endpoint_value_present
    ),
    functional_target_equation_defined:
      boolFrom(bindingFields.functional_target_equation_defined, constructionFields.functional_target_equation_defined) ||
      requiredFunctionals.every((functional) => typeof functional.target_equation === "string"),
    target_action_sign_consistent: boolFrom(
      bindingFields.target_action_sign_consistent,
      constructionFields.target_action_sign_consistent,
      sourceFields.boundary_delta_sign_consistent
    ),
    endpoint_boundary_binding_present: boolFrom(
      bindingFields.endpoint_boundary_binding_present,
      constructionFields.endpoint_boundary_binding_present,
      sourceFields.endpoint_boundary_binding_present,
      basisFields.endpoint_boundary_binding_present
    ),
    endpoint_functional_domain_present: boolFrom(
      bindingFields.endpoint_functional_domain_present,
      constructionFields.endpoint_functional_domain_present,
      sourceFields.endpoint_functional_domain_present,
      hasObjectField(sourceVariable, "endpoint_functional_domain"),
      hasObjectField(constructionAttempt, "endpoint_functional_domain"),
      hasObjectField(basisVariable, "endpoint_functional_domain"),
      hasObjectField(bindingAttempt, "endpoint_functional_domain")
    ),
    domain_chart_declared: domainChartDeclared,
    domain_coordinate_rule_declared: hasAnyObjectField(sourceVariable, [
      "domain_coordinate_rule",
      "endpoint_domain_coordinate_rule",
      "perturbation_coordinate_rule",
    ]) ||
      hasAnyObjectField(constructionAttempt, [
        "domain_coordinate_rule",
        "endpoint_domain_coordinate_rule",
        "perturbation_coordinate_rule",
      ]) ||
      hasAnyObjectField(basisVariable, [
        "domain_coordinate_rule",
        "endpoint_domain_coordinate_rule",
        "perturbation_coordinate_rule",
      ]) ||
      hasAnyObjectField(bindingAttempt, [
        "domain_coordinate_rule",
        "endpoint_domain_coordinate_rule",
        "perturbation_coordinate_rule",
      ]),
    basis_vector_bound_to_domain: false,
    evaluation_map_declared: evaluationMapDeclared,
    endpoint_evaluation_rule_declared: endpointEvaluationRuleDeclared,
    endpoint_value_bound_to_evaluation_map: false,
    theta_support_present: boolFrom(
      bindingFields.theta_support_present,
      constructionFields.theta_support_present,
      sourceFields.theta_support_present,
      basisFields.theta_support_present,
      theoremFields.theta_support_present,
      historyVariable?.present_realization_fields?.includes("theta_support")
    ),
    basis_formula_present: boolFrom(
      bindingFields.basis_formula_present,
      constructionFields.basis_formula_present,
      sourceFields.basis_formula_present,
      basisFields.basis_formula_present
    ),
    basis_derivative_formula_present: boolFrom(
      bindingFields.basis_derivative_formula_present,
      constructionFields.basis_derivative_formula_present,
      sourceFields.basis_derivative_formula_present,
      basisFields.basis_derivative_formula_present
    ),
    x_update_basis_present: boolFrom(
      bindingFields.x_update_basis_present,
      constructionFields.x_update_basis_present,
      sourceFields.x_update_basis_present,
      basisFields.x_update_basis_present,
      theoremFields.x_update_basis_present,
      historyVariable?.present_realization_fields?.includes("x_update_basis")
    ),
    xdot_update_basis_present: boolFrom(
      bindingFields.xdot_update_basis_present,
      constructionFields.xdot_update_basis_present,
      sourceFields.xdot_update_basis_present,
      basisFields.xdot_update_basis_present,
      theoremFields.xdot_update_basis_present,
      historyVariable?.present_realization_fields?.includes("xdot_update_basis")
    ),
    mesh_update_rule_present: boolFrom(
      bindingFields.mesh_update_rule_present,
      constructionFields.mesh_update_rule_present,
      sourceFields.mesh_update_rule_present,
      basisFields.mesh_update_rule_present,
      theoremFields.mesh_update_rule_present,
      historyVariable?.present_realization_fields?.includes("mesh_update_rule")
    ),
    endpoint_motion_rule_present: boolFrom(
      bindingFields.endpoint_motion_rule_present,
      constructionFields.endpoint_motion_rule_present,
      sourceFields.endpoint_motion_rule_present,
      basisFields.endpoint_motion_rule_present,
      theoremFields.endpoint_motion_rule_present,
      historyVariable?.present_realization_fields?.includes("endpoint_motion_rule")
    ),
    source_monotonicity_rule_present: boolFrom(
      bindingFields.source_monotonicity_rule_present,
      constructionFields.source_monotonicity_rule_present,
      sourceFields.source_monotonicity_rule_present,
      basisFields.source_monotonicity_rule_present,
      theoremFields.source_monotonicity_rule_present,
      historyVariable?.present_realization_fields?.includes("source_monotonicity_rule")
    ),
    receiver_monotonicity_rule_present: boolFrom(
      bindingFields.receiver_monotonicity_rule_present,
      constructionFields.receiver_monotonicity_rule_present,
      sourceFields.receiver_monotonicity_rule_present,
      basisFields.receiver_monotonicity_rule_present,
      theoremFields.receiver_monotonicity_rule_present,
      historyVariable?.present_realization_fields?.includes("receiver_monotonicity_rule")
    ),
    same_packet_history_update_formula_present: boolFrom(
      theoremFields.same_packet_history_update_formula_present,
      historyVariable?.present_realization_fields?.includes("same_packet_history_update_formula")
    ),
    non_target_endpoint_functionals_zero_certified: boolFrom(
      bindingFields.non_target_endpoint_functionals_zero_certified,
      constructionFields.non_target_endpoint_functionals_zero_certified,
      sourceFields.non_target_endpoint_functionals_zero_certified,
      basisFields.no_unintended_boundary_motion_certified
    ),
    exact_screen_zero_certified: boolFrom(
      bindingFields.exact_screen_zero_certified,
      constructionFields.exact_screen_zero_certified,
      sourceFields.exact_screen_zero_certified,
      basisFields.exact_screen_zero_certified,
      theoremFields.exact_screen_zero_certified,
      foldResult.B_xi_residual_certified_zero
    ),
    rank_certified: boolFrom(
      bindingFields.rank_certified,
      constructionFields.rank_certified,
      sourceFields.rank_certified,
      basisFields.rank_certified,
      theoremFields.rank_certified,
      foldResult.rank_B_certified
    ),
    domain_evaluation_map_constructed: false,
  };
  fields.basis_vector_bound_to_domain =
    fields.endpoint_functional_domain_present &&
    fields.domain_chart_declared &&
    fields.domain_coordinate_rule_declared &&
    fields.theta_support_present &&
    fields.basis_formula_present;
  fields.endpoint_value_bound_to_evaluation_map =
    fields.row_local_endpoint_value_present &&
    fields.endpoint_boundary_binding_present &&
    fields.endpoint_functional_domain_present &&
    fields.evaluation_map_declared &&
    fields.endpoint_evaluation_rule_declared;
  fields.domain_evaluation_map_constructed = DOMAIN_EVALUATION_FIELDS.every(
    (field) => field === "domain_evaluation_map_constructed" || fields[field] === true
  );
  const methodResults = evaluateDomainEvaluationMethods(fields);
  return {
    id: bindingAttempt.id,
    endpoint_functional_id: bindingAttempt.endpoint_functional_id,
    role: bindingAttempt.role,
    basis_symbol: bindingAttempt.basis_symbol,
    source_symbol: bindingAttempt.source_symbol,
    fold_input_variable: foldInputVariable
      ? {
          id: foldInputVariable.id,
          collocation_role: foldInputVariable.collocation_role,
          bounded_screen_range: foldInputVariable.bounded_screen_range,
        }
      : null,
    target_endpoint_refs: bindingAttempt.target_endpoint_refs,
    target_endpoint_values: bindingAttempt.target_endpoint_values,
    required_endpoint_functionals: requiredFunctionals,
    candidate_field_inventory: fieldInventory(
      sourceVariable,
      constructionAttempt,
      basisVariable,
      bindingAttempt,
      historyVariable,
      theoremVariable
    ),
    rejected_promotions: [
      "A row-local endpoint ref is a target locator, not a domain chart.",
      "A row-local endpoint q-value is a scalar boundary value, not an evaluation map.",
      "A target equation E_j(Psi_j)=+/-1 states a desired action, not the rule defining E_j.",
      "A bounded fold-coordinate screen variable is not a basis formula on a perturbation domain.",
      "A tolerance-level B_xi residual is not exact B_xi=0 or rank certification.",
    ],
    method_results: methodResults,
    required_fields_present: fields,
    missing_domain_evaluation_fields: DOMAIN_EVALUATION_FIELDS.filter(
      (field) => field !== "domain_evaluation_map_constructed" && fields[field] !== true
    ),
    domain_evaluation_map_constructed: fields.domain_evaluation_map_constructed,
    no_go_reason:
      fields.domain_evaluation_map_constructed
        ? null
        : "The current artifacts provide endpoint locators, row-local endpoint values, target equations, and screen coefficients, but no explicit endpoint-functional domain chart or evaluation map that says how a basis perturbation moves and evaluates the same-packet endpoint.",
  };
}

function buildRowDomainEvaluationAttempt(row, domainEvaluationById) {
  const sourceAttempt = domainEvaluationById.get(row.source_binding_id);
  const receiverAttempt = domainEvaluationById.get(row.receiver_binding_id);
  const rowFields = row.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: rowFields.row_locator_resolved === true,
    source_domain_evaluation_map_constructed: sourceAttempt?.domain_evaluation_map_constructed === true,
    receiver_domain_evaluation_map_constructed: receiverAttempt?.domain_evaluation_map_constructed === true,
    combined_domain_evaluation_pair_constructed: false,
    screen_positive_candidate_change_row: rowFields.screen_positive_candidate_change_row === true,
    proof_grade_boundary_opening_certified: false,
    same_packet_history_update_formula_present: rowFields.same_packet_history_update_formula_present === true,
    candidate_artifacts_present: rowFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change: rowFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change: rowFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_domain_evaluation_pair_constructed =
    fields.source_domain_evaluation_map_constructed && fields.receiver_domain_evaluation_map_constructed;
  fields.proof_grade_boundary_opening_certified =
    fields.combined_domain_evaluation_pair_constructed &&
    fields.same_packet_history_update_formula_present &&
    fields.root_topology_recertified_for_candidate_change &&
    fields.proof_interval_v1_v6_rerun_for_candidate_change;
  return {
    row_id: row.row_id,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_domain_evaluation_id: row.source_binding_id,
    receiver_domain_evaluation_id: row.receiver_binding_id,
    source_boundary_value: row.source_boundary_value,
    receiver_boundary_value: row.receiver_boundary_value,
    required_fields_present: fields,
    row_domain_evaluation_map_ready: ROW_DOMAIN_EVALUATION_FIELDS.every((field) => fields[field] === true),
    obstruction:
      "The row has source and receiver endpoint values, but the source/receiver domain/evaluation maps are not constructed and no proof-grade boundary-opening replay exists.",
  };
}

function buildDomainEvaluationMapAttempt(inputs, sources) {
  assertInputs(inputs);
  const sourceById = byId(inputs.sourceAudit.variable_sources);
  const constructionById = byId(inputs.constructionAttempt.endpoint_functional_attempts);
  const basisById = byId(inputs.basisAttempt.basis_attempts);
  const historyById = byId(inputs.historyContract.realization_variables);
  const theoremById = byId(inputs.historyTheoremAttempt.variable_attempts);
  const foldInputById = byId(inputs.foldInput.variables);
  const endpointAttempts = inputs.bindingContract.endpoint_binding_attempts.map((bindingAttempt) =>
    buildEndpointDomainEvaluationAttempt(
      bindingAttempt,
      sourceById.get(bindingAttempt.id),
      constructionById.get(bindingAttempt.id),
      basisById.get(bindingAttempt.id),
      historyById.get(bindingAttempt.id),
      theoremById.get(bindingAttempt.id),
      foldInputById.get(bindingAttempt.id),
      inputs.foldResult
    )
  );
  const domainEvaluationById = byId(endpointAttempts);
  const rowAttempts = inputs.bindingContract.row_binding_attempts.map((row) =>
    buildRowDomainEvaluationAttempt(row, domainEvaluationById)
  );
  const endpointCounts = countFields(endpointAttempts, DOMAIN_EVALUATION_FIELDS);
  const rowCounts = countFields(rowAttempts, ROW_DOMAIN_EVALUATION_FIELDS);
  const failureCodeCounts = countFailureCodes(endpointAttempts);
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-domain-evaluation-map-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_domain_evaluation_map_attempt_fail_closed",
    theorem_target: "Fold-Coordinate Endpoint-Functional Domain/Evaluation-Map Attempt",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only domain/evaluation-map attempt; endpoint locators and row-local endpoint values are present but no endpoint-functional domain chart or evaluation map is present",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      sourceAudit: artifactRecord(sources.sourceAudit),
      constructionAttempt: artifactRecord(sources.constructionAttempt),
      basisAttempt: artifactRecord(sources.basisAttempt),
      bindingContract: artifactRecord(sources.bindingContract),
      historyContract: artifactRecord(sources.historyContract),
      historyTheoremAttempt: artifactRecord(sources.historyTheoremAttempt),
      foldInput: artifactRecord(sources.foldInput),
      foldResult: artifactRecord(sources.foldResult),
    },
    domain_evaluation_rule:
      "A fold-coordinate endpoint functional E_j requires an explicit endpoint-functional domain chart, a coordinate/evaluation rule for the perturbation basis, an endpoint-boundary binding, and a map from the basis perturbation to same-packet endpoint motion; target endpoint q-values and equations are admissible only as locator data until those objects are present.",
    no_go_lemma:
      "Endpoint locations and target equations do not determine endpoint-functional domains. Without a domain chart and evaluation map, E_j(Psi_j)=+/-1 remains a desired boundary action, not a constructed linear functional on a same-packet perturbation space.",
    rejection_rule:
      "Do not promote endpoint refs, scalar endpoint q-values, screen coefficients, target equations, or tolerance-level B_xi residuals into endpoint-functional domain/evaluation-map data.",
    domain_evaluation_methods: DOMAIN_EVALUATION_METHODS,
    fold_coordinate_screen_guard: {
      input_variables: inputs.foldInput.variables?.length ?? 0,
      scanner_status: inputs.foldResult.status,
      B_xi_residual_verified_zero_with_tolerance: inputs.foldResult.B_xi_residual_verified_zero_with_tolerance,
      B_xi_residual_certified_zero: inputs.foldResult.B_xi_residual_certified_zero,
      rank_B_certified: inputs.foldResult.rank_B_certified,
      witness: inputs.foldResult.witness,
      structural_rows: inputs.foldResult.structural_rows,
      one_leaf_screen_level_success: inputs.foldResult.one_leaf_screen_level_success,
      one_leaf_min_boundary_opening_margin: inputs.foldResult.one_leaf_min_boundary_opening_margin,
    },
    endpoint_domain_evaluation_attempts: endpointAttempts,
    row_domain_evaluation_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      endpoint_locators_resolved: endpointCounts.endpoint_locator_resolved,
      row_local_endpoint_values_present: endpointCounts.row_local_endpoint_value_present,
      functional_target_equations_defined: endpointCounts.functional_target_equation_defined,
      target_action_sign_consistent: endpointCounts.target_action_sign_consistent,
      endpoint_boundary_bindings_present: endpointCounts.endpoint_boundary_binding_present,
      endpoint_functional_domains_present: endpointCounts.endpoint_functional_domain_present,
      domain_charts_declared: endpointCounts.domain_chart_declared,
      domain_coordinate_rules_declared: endpointCounts.domain_coordinate_rule_declared,
      basis_vectors_bound_to_domain: endpointCounts.basis_vector_bound_to_domain,
      evaluation_maps_declared: endpointCounts.evaluation_map_declared,
      endpoint_evaluation_rules_declared: endpointCounts.endpoint_evaluation_rule_declared,
      endpoint_values_bound_to_evaluation_map: endpointCounts.endpoint_value_bound_to_evaluation_map,
      theta_supports_present: endpointCounts.theta_support_present,
      basis_formulas_present: endpointCounts.basis_formula_present,
      basis_derivative_formulas_present: endpointCounts.basis_derivative_formula_present,
      x_update_bases_present: endpointCounts.x_update_basis_present,
      xdot_update_bases_present: endpointCounts.xdot_update_basis_present,
      mesh_update_rules_present: endpointCounts.mesh_update_rule_present,
      endpoint_motion_rules_present: endpointCounts.endpoint_motion_rule_present,
      source_monotonicity_rules_present: endpointCounts.source_monotonicity_rule_present,
      receiver_monotonicity_rules_present: endpointCounts.receiver_monotonicity_rule_present,
      same_packet_history_update_formulas_present: endpointCounts.same_packet_history_update_formula_present,
      non_target_endpoint_functionals_zero_certified:
        endpointCounts.non_target_endpoint_functionals_zero_certified,
      exact_screen_zero_certified_endpoint_functionals: endpointCounts.exact_screen_zero_certified,
      rank_certified_endpoint_functionals: endpointCounts.rank_certified,
      domain_evaluation_maps_constructed: endpointCounts.domain_evaluation_map_constructed,
      row_locators_resolved: rowCounts.row_locator_resolved,
      rows_with_source_domain_evaluation_map_constructed:
        rowCounts.source_domain_evaluation_map_constructed,
      rows_with_receiver_domain_evaluation_map_constructed:
        rowCounts.receiver_domain_evaluation_map_constructed,
      rows_with_combined_domain_evaluation_pair_constructed:
        rowCounts.combined_domain_evaluation_pair_constructed,
      proof_grade_boundary_opening_rows: rowCounts.proof_grade_boundary_opening_certified,
      row_domain_evaluation_map_ready: rowAttempts.filter((row) => row.row_domain_evaluation_map_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      domain_evaluation_methods_tested: DOMAIN_EVALUATION_METHODS.length,
      domain_evaluation_method_evaluations: endpointAttempts.reduce(
        (sum, attempt) => sum + attempt.method_results.length,
        0
      ),
      domain_evaluation_failure_code_counts: failureCodeCounts,
      endpoint_required_fields_certified_counts: endpointCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function methodTable(methods) {
  return methods
    .map((method) => `| \`${method.id}\` | ${method.required_fields.length} | ${method.description} |`)
    .join("\n");
}

function failureCodeTable(counts) {
  const entries = Object.entries(counts);
  if (entries.length === 0) {
    return "| none | 0 |";
  }
  return entries.map(([code, count]) => `| \`${code}\` | ${count} |`).join("\n");
}

function endpointAttemptTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.id}\` | \`${attempt.endpoint_functional_id}\` | ${attempt.required_fields_present.endpoint_locator_resolved} | ${attempt.required_fields_present.row_local_endpoint_value_present} | ${attempt.required_fields_present.domain_chart_declared} | ${attempt.required_fields_present.evaluation_map_declared} | ${attempt.required_fields_present.endpoint_motion_rule_present} | ${attempt.required_fields_present.exact_screen_zero_certified} | ${attempt.domain_evaluation_map_constructed} |`
    )
    .join("\n");
}

function rowAttemptTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.required_fields_present.row_locator_resolved} | ${row.required_fields_present.source_domain_evaluation_map_constructed} | ${row.required_fields_present.receiver_domain_evaluation_map_constructed} | ${row.required_fields_present.proof_grade_boundary_opening_certified} | ${row.row_domain_evaluation_map_ready} |`
    )
    .join("\n");
}

function buildReport(attempt) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Domain/Evaluation-Map Attempt

## Verdict

The endpoint-functional domain/evaluation-map attempt fail-closes. The current
proof-program data locate all four \`fc_*\` endpoint targets and their row-local
endpoint values, but no artifact supplies an explicit endpoint-functional
domain chart or evaluation map.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals checked | ${attempt.summary.endpoint_functionals} |
| Endpoint locators resolved | ${attempt.summary.endpoint_locators_resolved} |
| Row-local endpoint values present | ${attempt.summary.row_local_endpoint_values_present} |
| Functional target equations defined | ${attempt.summary.functional_target_equations_defined} |
| Endpoint boundary bindings present | ${attempt.summary.endpoint_boundary_bindings_present} |
| Endpoint-functional domains present | ${attempt.summary.endpoint_functional_domains_present} |
| Domain charts declared | ${attempt.summary.domain_charts_declared} |
| Domain coordinate rules declared | ${attempt.summary.domain_coordinate_rules_declared} |
| Evaluation maps declared | ${attempt.summary.evaluation_maps_declared} |
| Endpoint evaluation rules declared | ${attempt.summary.endpoint_evaluation_rules_declared} |
| Endpoint values bound to evaluation map | ${attempt.summary.endpoint_values_bound_to_evaluation_map} |
| Endpoint motion rules present | ${attempt.summary.endpoint_motion_rules_present} |
| Exact $B\\xi=0$ endpoint certificates | ${attempt.summary.exact_screen_zero_certified_endpoint_functionals} |
| Rank certificates | ${attempt.summary.rank_certified_endpoint_functionals} |
| Domain/evaluation maps constructed | ${attempt.summary.domain_evaluation_maps_constructed} |
| Rows ready for domain/evaluation-map consumption | ${attempt.summary.row_domain_evaluation_map_ready} |
| Method evaluations | ${attempt.summary.domain_evaluation_method_evaluations} |
| Row consumption count | ${attempt.summary.row_consumption_count} |

## No-Go Lemma

${attempt.no_go_lemma}

The row-local endpoint q-values remain valid locator data. They do not define
the perturbation space, the chart on that space, or the rule by which $E_j$
evaluates $\\Psi_j$.

## Domain/Evaluation Rule

${attempt.domain_evaluation_rule}

## Methods Tested

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(attempt.domain_evaluation_methods)}

## Failure Codes

| Failure code | Count |
| --- | ---: |
${failureCodeTable(attempt.summary.domain_evaluation_failure_code_counts)}

## Endpoint Domain/Evaluation Attempts

| Variable | Functional | Locator | Endpoint value | Domain chart | Evaluation map | Endpoint motion | Exact $B\\xi=0$ | Constructed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${endpointAttemptTable(attempt.endpoint_domain_evaluation_attempts)}

## Endpoint-Field Audit

| Field | Endpoint functionals certified |
| --- | ---: |
${fieldTable(
  attempt.summary.endpoint_required_fields_certified_counts,
  DOMAIN_EVALUATION_FIELDS,
  attempt.summary.endpoint_functionals
)}

## Row Domain/Evaluation Attempts

| Row | Locator | Source map | Receiver map | Proof-grade opening | Ready |
| --- | --- | --- | --- | --- | --- |
${rowAttemptTable(attempt.row_domain_evaluation_attempts)}

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(
  attempt.summary.row_required_fields_certified_counts,
  ROW_DOMAIN_EVALUATION_FIELDS,
  attempt.summary.rows
)}

## Closure Burden

The next mathematical object must supply the missing domain and evaluation
layer itself: an endpoint-functional domain chart, domain coordinate rule,
endpoint-boundary binding, evaluation map, endpoint evaluation rule, basis
formula, derivative formula, same-packet history update, mesh and endpoint
motion rules, monotonicity preservation, exact $B\\xi=0$, rank certification,
candidate artifacts, topology recertification, and v1-v6 replay. Without those
fields, no endpoint-functional basis, row consumption, preledger pass, or
branch chart is authorized.

## Capture Decision

Priority-only theorem attempt. This packet confirms that the current blocker is
not another endpoint locator audit: the missing object is the explicit
endpoint-functional domain/evaluation-map construction. It is not ready for
authored AAA prose because it records a fail-closed obstruction rather than a
completed proof.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    sourceAudit: readJson(args.sourceAudit),
    constructionAttempt: readJson(args.constructionAttempt),
    basisAttempt: readJson(args.basisAttempt),
    bindingContract: readJson(args.bindingContract),
    historyContract: readJson(args.historyContract),
    historyTheoremAttempt: readJson(args.historyTheoremAttempt),
    foldInput: readJson(args.foldInput),
    foldResult: readJson(args.foldResult),
  };
  const sources = {
    sourceAudit: args.sourceAudit,
    constructionAttempt: args.constructionAttempt,
    basisAttempt: args.basisAttempt,
    bindingContract: args.bindingContract,
    historyContract: args.historyContract,
    historyTheoremAttempt: args.historyTheoremAttempt,
    foldInput: args.foldInput,
    foldResult: args.foldResult,
  };
  const attempt = buildDomainEvaluationMapAttempt(inputs, sources);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeText(outReport, buildReport(attempt));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

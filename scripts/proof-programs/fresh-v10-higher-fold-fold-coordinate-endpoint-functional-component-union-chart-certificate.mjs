#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_EXPLICIT_PSI_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_explicit_psi_formula_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DOMAIN_EVALUATION_CONTRACT = `${CERT_DIR}/fold_coordinate_endpoint_functional_domain_evaluation_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_GLOBAL_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_global_domain_evaluation_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REPLAY_READINESS_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_candidate_artifact_replay_readiness_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_component_union_chart_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_component_union_chart_certificate_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_COMPONENT_UNION_FIELDS = [
  "local_formula_candidate_available",
  "local_derivative_formula_available",
  "local_support_components_available",
  "component_endpoint_identities_exact",
  "endpoint_functional_domain_symbol_declared",
  "chart_symbol_declared",
  "evaluation_map_symbol_declared",
  "component_theta_intervals_rational",
  "component_theta_intervals_ordered",
  "component_theta_intervals_pairwise_disjoint",
  "component_union_domain_constructed",
  "component_union_coordinate_rule_constructed",
  "component_union_no_double_counting_rule_constructed",
  "component_formula_bound_to_chart",
  "target_endpoint_evaluation_locator_constructed",
  "target_action_exact_under_component_locator",
  "opposite_endpoint_zero_under_component_locator",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "same_packet_history_update_formula_present",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "full_global_domain_evaluation_map_constructed",
];

const ROW_COMPONENT_UNION_FIELDS = [
  "row_locator_resolved",
  "source_component_union_chart_constructed",
  "receiver_component_union_chart_constructed",
  "combined_component_union_chart_pair_constructed",
  "source_target_locator_exact",
  "receiver_target_locator_exact",
  "source_endpoint_evaluation_map_constructed",
  "receiver_endpoint_evaluation_map_constructed",
  "combined_global_domain_evaluation_pair_constructed",
  "screen_positive_candidate_change_row",
  "signed_boundary_delta_contract_defined",
  "same_packet_history_update_formula_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    explicitPsiAttempt: DEFAULT_EXPLICIT_PSI_ATTEMPT,
    domainEvaluationContract: DEFAULT_DOMAIN_EVALUATION_CONTRACT,
    globalAttempt: DEFAULT_GLOBAL_ATTEMPT,
    replayReadinessAudit: DEFAULT_REPLAY_READINESS_AUDIT,
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
    } else if (arg === "--global-attempt") {
      args.globalAttempt = argv[++index];
    } else if (arg === "--replay-readiness-audit") {
      args.replayReadinessAudit = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-component-union-chart-certificate.mjs [options]

Options:
  --explicit-psi-attempt PATH        Explicit Psi formula attempt JSON. Defaults to ${DEFAULT_EXPLICIT_PSI_ATTEMPT}.
  --domain-evaluation-contract PATH  Endpoint-functional domain/evaluation contract JSON. Defaults to ${DEFAULT_DOMAIN_EVALUATION_CONTRACT}.
  --global-attempt PATH              Global domain/evaluation-map construction attempt JSON. Defaults to ${DEFAULT_GLOBAL_ATTEMPT}.
  --replay-readiness-audit PATH      Candidate artifact replay-readiness audit JSON. Defaults to ${DEFAULT_REPLAY_READINESS_AUDIT}.
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

function assertSamePacketSource(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${name} fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing to build chart certificate from authorized or live-updating ${name}.`);
  }
}

function assertInputs(inputs) {
  assertSamePacketSource(inputs.explicitPsiAttempt, "explicit Psi attempt");
  assertSamePacketSource(inputs.domainEvaluationContract, "domain/evaluation contract");
  assertSamePacketSource(inputs.globalAttempt, "global domain/evaluation attempt");
  assertSamePacketSource(inputs.replayReadinessAudit, "replay-readiness audit");
  if (inputs.explicitPsiAttempt.status !== "fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_fail_closed") {
    throw new Error(`Unexpected explicit-Psi status: ${inputs.explicitPsiAttempt.status}`);
  }
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
  if (!Array.isArray(inputs.explicitPsiAttempt.endpoint_explicit_psi_formula_attempts)) {
    throw new Error("Explicit Psi attempt is missing endpoint attempts.");
  }
  if (!Array.isArray(inputs.explicitPsiAttempt.row_explicit_psi_formula_attempts)) {
    throw new Error("Explicit Psi attempt is missing row attempts.");
  }
}

function qToFraction(value) {
  if (!value || typeof value.num !== "string" || typeof value.den !== "string") {
    return null;
  }
  return {
    num: BigInt(value.num),
    den: BigInt(value.den),
  };
}

function compareFractions(left, right) {
  if (!left || !right) {
    return null;
  }
  const diff = left.num * right.den - right.num * left.den;
  return diff < 0n ? -1 : diff > 0n ? 1 : 0;
}

function intervalRecord(component) {
  const lo = qToFraction(component.theta_range_q?.lo);
  const hi = qToFraction(component.theta_range_q?.hi);
  return {
    row_id: component.row_id,
    support_interval_id: component.support_interval_id,
    endpoint_ref: component.endpoint_ref,
    endpoint_side_theta: component.endpoint_side_theta,
    theta_range_q: component.theta_range_q,
    theta_range_display: component.theta_range_display,
    terminal_grid_span: component.terminal_grid_span,
    rational_range_present: Boolean(lo && hi),
    ordered: compareFractions(lo, hi) === -1,
    lo,
    hi,
  };
}

function intervalsPairwiseDisjoint(intervals) {
  const sorted = [...intervals].sort((left, right) => compareFractions(left.lo, right.lo) ?? 0);
  for (let index = 1; index < sorted.length; index += 1) {
    if (compareFractions(sorted[index - 1].hi, sorted[index].lo) !== -1) {
      return false;
    }
  }
  return true;
}

function endpointIdentitiesExact(endpointAttempt) {
  return (
    endpointAttempt.support_components.length > 0 &&
    endpointAttempt.support_components.every(
      (component) => component.local_endpoint_identities?.local_identity_exact === true
    )
  );
}

function oppositeEndpointZerosExact(endpointAttempt) {
  return (
    endpointAttempt.support_components.length > 0 &&
    endpointAttempt.support_components.every(
      (component) =>
        component.local_endpoint_identities?.opposite_endpoint_zero === true &&
        component.local_endpoint_identities?.opposite_endpoint_derivative_zero === true
    )
  );
}

function localTargetActionsExact(endpointAttempt) {
  return (
    endpointAttempt.support_components.length > 0 &&
    endpointAttempt.support_components.every(
      (component) =>
        component.local_endpoint_identities?.target_action_matches_sign === true &&
        component.local_endpoint_identities?.target_derivative_zero === true
    )
  );
}

function countFields(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function byId(rows, key = "id") {
  return new Map((rows ?? []).map((row) => [row[key], row]));
}

function buildEndpointCertificate(endpointAttempt, contractById, globalById, replayById) {
  const contract = contractById.get(endpointAttempt.id);
  const globalAttempt = globalById.get(endpointAttempt.id);
  const replayAttempt = replayById.get(endpointAttempt.id);
  const formulaFields = endpointAttempt.formula_fields_present ?? {};
  const intervals = endpointAttempt.support_components.map(intervalRecord);
  const allIntervalsRational = intervals.every((interval) => interval.rational_range_present);
  const allIntervalsOrdered = intervals.every((interval) => interval.ordered);
  const pairwiseDisjoint = allIntervalsRational && allIntervalsOrdered && intervalsPairwiseDisjoint(intervals);
  const componentEndpointIdentitiesExact = endpointIdentitiesExact(endpointAttempt);
  const targetActionsExact = localTargetActionsExact(endpointAttempt);
  const oppositeZerosExact = oppositeEndpointZerosExact(endpointAttempt);
  const domainSymbolDeclared =
    typeof endpointAttempt.domain_symbol === "string" &&
    endpointAttempt.domain_symbol.length > 0 &&
    contract?.endpoint_functional_domain_contract?.domain_symbol === endpointAttempt.domain_symbol;
  const chartSymbolDeclared =
    typeof endpointAttempt.chart_symbol === "string" &&
    endpointAttempt.chart_symbol.length > 0 &&
    contract?.endpoint_functional_domain_contract?.chart_symbol === endpointAttempt.chart_symbol;
  const evaluationMapSymbolDeclared =
    typeof endpointAttempt.evaluation_map_symbol === "string" &&
    endpointAttempt.evaluation_map_symbol.length > 0 &&
    contract?.evaluation_map_contract?.evaluation_map_symbol === endpointAttempt.evaluation_map_symbol;
  const fields = {
    local_formula_candidate_available: formulaFields.explicit_psi_formula_declared === true,
    local_derivative_formula_available: formulaFields.explicit_psi_derivative_formula_declared === true,
    local_support_components_available: formulaFields.explicit_psi_support_declared === true,
    component_endpoint_identities_exact: componentEndpointIdentitiesExact,
    endpoint_functional_domain_symbol_declared: domainSymbolDeclared,
    chart_symbol_declared: chartSymbolDeclared,
    evaluation_map_symbol_declared: evaluationMapSymbolDeclared,
    component_theta_intervals_rational: allIntervalsRational,
    component_theta_intervals_ordered: allIntervalsOrdered,
    component_theta_intervals_pairwise_disjoint: pairwiseDisjoint,
    component_union_domain_constructed: false,
    component_union_coordinate_rule_constructed: false,
    component_union_no_double_counting_rule_constructed: false,
    component_formula_bound_to_chart: false,
    target_endpoint_evaluation_locator_constructed: false,
    target_action_exact_under_component_locator: targetActionsExact,
    opposite_endpoint_zero_under_component_locator: oppositeZerosExact,
    endpoint_motion_rule_constructed: false,
    endpoint_evaluation_map_constructed: false,
    non_target_endpoint_zero_certified: false,
    same_packet_history_update_formula_present: false,
    exact_screen_zero_certified: false,
    rank_certified: false,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
    full_global_domain_evaluation_map_constructed: false,
  };
  fields.component_union_domain_constructed =
    fields.local_support_components_available &&
    fields.endpoint_functional_domain_symbol_declared &&
    fields.component_theta_intervals_rational &&
    fields.component_theta_intervals_ordered &&
    fields.component_theta_intervals_pairwise_disjoint;
  fields.component_union_coordinate_rule_constructed =
    fields.component_union_domain_constructed && formulaFields.explicit_psi_coordinate_domain_declared === true;
  fields.component_union_no_double_counting_rule_constructed =
    fields.component_union_domain_constructed && fields.component_union_coordinate_rule_constructed;
  fields.component_formula_bound_to_chart =
    fields.component_union_coordinate_rule_constructed &&
    fields.local_formula_candidate_available &&
    fields.local_derivative_formula_available;
  fields.target_endpoint_evaluation_locator_constructed =
    fields.component_formula_bound_to_chart &&
    fields.component_endpoint_identities_exact &&
    fields.target_action_exact_under_component_locator;
  const blockingFields = [
    "endpoint_motion_rule_constructed",
    "endpoint_evaluation_map_constructed",
    "non_target_endpoint_zero_certified",
    "same_packet_history_update_formula_present",
    "exact_screen_zero_certified",
    "rank_certified",
    "candidate_artifacts_present",
    "root_topology_recertified_for_candidate_change",
    "proof_interval_v1_v6_rerun_for_candidate_change",
    "full_global_domain_evaluation_map_constructed",
  ];
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
    support_interval_ids: endpointAttempt.support_interval_ids,
    support_union_kind: intervals.length === 1 ? "single_component" : "disjoint_component_union",
    component_union_chart: {
      domain: `${endpointAttempt.domain_symbol}=disjoint_union(${intervals
        .map((interval) => interval.support_interval_id)
        .join(",")})`,
      coordinate_rule: "On each component [L,R], use s=(theta-L)/(R-L) with the component tag retained.",
      no_double_counting_rule:
        "The component tag and pairwise-disjoint rational theta intervals make each support point belong to exactly one component of this endpoint-functional chart.",
      basis_binding_rule:
        "The local cubic component formula is bound to the chart as a formal endpoint-functional locator; this is not yet a same-packet history update.",
    },
    support_components: endpointAttempt.support_components.map((component, index) => ({
      row_id: component.row_id,
      support_interval_id: component.support_interval_id,
      endpoint_ref: component.endpoint_ref,
      endpoint_side_theta: component.endpoint_side_theta,
      theta_range_q: component.theta_range_q,
      theta_range_display: component.theta_range_display,
      terminal_grid_span: component.terminal_grid_span,
      formula_candidate: component.formula_candidate,
      local_endpoint_identities: component.local_endpoint_identities,
      component_tag: `${endpointAttempt.id}:component:${index}`,
    })),
    rational_interval_checks: intervals.map((interval) => ({
      row_id: interval.row_id,
      support_interval_id: interval.support_interval_id,
      rational_range_present: interval.rational_range_present,
      ordered: interval.ordered,
    })),
    inherited_global_attempt_required_fields: globalAttempt?.required_fields_present ?? null,
    inherited_replay_readiness_fields: replayAttempt?.required_fields_present ?? null,
    required_fields_present: fields,
    partial_chart_certificate_passed: [
      "component_union_domain_constructed",
      "component_union_coordinate_rule_constructed",
      "component_union_no_double_counting_rule_constructed",
      "component_formula_bound_to_chart",
      "target_endpoint_evaluation_locator_constructed",
    ].every((field) => fields[field] === true),
    full_global_domain_evaluation_map_constructed: false,
    blocking_fields: blockingFields.filter((field) => fields[field] !== true),
    obstruction:
      "The component-union chart, coordinate rule, no-double-counting rule, and target endpoint evaluation locator are certified. A full same-packet endpoint-functional domain/evaluation map is still blocked by absent endpoint motion, global gluing/periodicity, non-target zero certificates, exact $B\\xi=0$, rank, candidate artifacts, topology recertification, and v1-v6 replay.",
  };
}

function buildRowCertificate(rowAttempt, endpointById) {
  const source = endpointById.get(rowAttempt.source_endpoint_contract_id);
  const receiver = endpointById.get(rowAttempt.receiver_endpoint_contract_id);
  const previousFields = rowAttempt.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: previousFields.row_locator_resolved === true,
    source_component_union_chart_constructed: source?.partial_chart_certificate_passed === true,
    receiver_component_union_chart_constructed: receiver?.partial_chart_certificate_passed === true,
    combined_component_union_chart_pair_constructed: false,
    source_target_locator_exact: source?.required_fields_present.target_endpoint_evaluation_locator_constructed === true,
    receiver_target_locator_exact: receiver?.required_fields_present.target_endpoint_evaluation_locator_constructed === true,
    source_endpoint_evaluation_map_constructed: false,
    receiver_endpoint_evaluation_map_constructed: false,
    combined_global_domain_evaluation_pair_constructed: false,
    screen_positive_candidate_change_row: previousFields.screen_positive_candidate_change_row === true,
    signed_boundary_delta_contract_defined: previousFields.signed_boundary_delta_contract_defined === true,
    same_packet_history_update_formula_present: false,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_component_union_chart_pair_constructed =
    fields.source_component_union_chart_constructed && fields.receiver_component_union_chart_constructed;
  return {
    row_id: rowAttempt.row_id,
    source_interval: rowAttempt.source_interval,
    receiver_interval: rowAttempt.receiver_interval,
    failed_side: rowAttempt.failed_side,
    boundary_side: rowAttempt.boundary_side,
    source_endpoint_contract_id: rowAttempt.source_endpoint_contract_id,
    receiver_endpoint_contract_id: rowAttempt.receiver_endpoint_contract_id,
    required_fields_present: fields,
    partial_chart_pair_passed: fields.combined_component_union_chart_pair_constructed,
    full_global_domain_evaluation_pair_constructed: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row now has source and receiver component-union chart locators, but no source/receiver endpoint motion or full domain/evaluation pair is constructed, so no proof-grade boundary opening or row consumption follows.",
  };
}

function buildCertificate(inputs, sources) {
  assertInputs(inputs);
  const contractById = byId(inputs.domainEvaluationContract.endpoint_domain_evaluation_contracts);
  const globalById = byId(inputs.globalAttempt.endpoint_global_domain_evaluation_attempts);
  const replayById = byId(inputs.replayReadinessAudit.endpoint_readiness_attempts);
  const endpointCertificates = inputs.explicitPsiAttempt.endpoint_explicit_psi_formula_attempts.map((endpointAttempt) =>
    buildEndpointCertificate(endpointAttempt, contractById, globalById, replayById)
  );
  const endpointById = byId(endpointCertificates);
  const rowCertificates = inputs.explicitPsiAttempt.row_explicit_psi_formula_attempts.map((rowAttempt) =>
    buildRowCertificate(rowAttempt, endpointById)
  );
  const endpointCounts = countFields(endpointCertificates, ENDPOINT_COMPONENT_UNION_FIELDS);
  const rowCounts = countFields(rowCertificates, ROW_COMPONENT_UNION_FIELDS);
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-component-union-chart-certificate-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_component_union_chart_certificate_partial_pass_replay_blocked",
    theorem_target: "Fold-Coordinate Endpoint-Functional Component-Union Chart Certificate",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only partial certificate; component-union charts and no-double-counting are certified, but endpoint motion, full evaluation maps, candidate artifacts, and replay remain absent",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      explicitPsiAttempt: artifactRecord(sources.explicitPsiAttempt),
      domainEvaluationContract: artifactRecord(sources.domainEvaluationContract),
      globalAttempt: artifactRecord(sources.globalAttempt),
      replayReadinessAudit: artifactRecord(sources.replayReadinessAudit),
    },
    component_union_chart_rule:
      "For each `fc_*` endpoint functional, construct the endpoint-functional chart as a tagged disjoint union of the support components already carrying local $\\Psi_j$ formulas. Each component uses the local coordinate $s=(\\theta-L)/(R-L)$ and retains its component tag, so no support point is counted twice.",
    no_promotion_rule:
      "This certificate promotes only the component-union chart, coordinate rule, no-double-counting rule, formal formula-to-chart binding, and target endpoint evaluation locator. It does not promote the locator into endpoint motion, a full domain/evaluation map, exact $B\\xi=0$, rank, candidate artifacts, topology, replay, row consumption, or branch-chart authorization.",
    endpoint_component_union_chart_certificates: endpointCertificates,
    row_component_union_chart_certificates: rowCertificates,
    summary: {
      endpoint_functionals: endpointCertificates.length,
      rows: rowCertificates.length,
      component_union_domains_constructed: endpointCounts.component_union_domain_constructed,
      component_union_coordinate_rules_constructed: endpointCounts.component_union_coordinate_rule_constructed,
      component_union_no_double_counting_rules_constructed:
        endpointCounts.component_union_no_double_counting_rule_constructed,
      component_formula_chart_bindings: endpointCounts.component_formula_bound_to_chart,
      target_endpoint_evaluation_locators_constructed:
        endpointCounts.target_endpoint_evaluation_locator_constructed,
      target_action_locators_exact: endpointCounts.target_action_exact_under_component_locator,
      opposite_endpoint_zero_locators_exact: endpointCounts.opposite_endpoint_zero_under_component_locator,
      endpoint_motion_rules_constructed: endpointCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_maps_constructed: endpointCounts.endpoint_evaluation_map_constructed,
      non_target_zero_certificates: endpointCounts.non_target_endpoint_zero_certified,
      exact_screen_zero_certificates: endpointCounts.exact_screen_zero_certified,
      rank_certificates: endpointCounts.rank_certified,
      candidate_artifacts_present: endpointCounts.candidate_artifacts_present,
      topology_recertifications: endpointCounts.root_topology_recertified_for_candidate_change,
      proof_interval_v1_v6_replays: endpointCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      full_global_domain_evaluation_maps_constructed:
        endpointCounts.full_global_domain_evaluation_map_constructed,
      rows_with_component_union_chart_pairs:
        rowCounts.combined_component_union_chart_pair_constructed,
      rows_with_full_global_domain_evaluation_pairs:
        rowCounts.combined_global_domain_evaluation_pair_constructed,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      endpoint_required_fields_certified_counts: endpointCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function endpointTable(certificates) {
  return certificates
    .map(
      (certificate) =>
        `| \`${certificate.id}\` | \`${certificate.support_interval_ids.join(", ")}\` | \`${certificate.support_union_kind}\` | ${certificate.required_fields_present.component_theta_intervals_pairwise_disjoint} | ${certificate.required_fields_present.component_union_no_double_counting_rule_constructed} | ${certificate.required_fields_present.target_endpoint_evaluation_locator_constructed} | ${certificate.required_fields_present.endpoint_evaluation_map_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.required_fields_present.source_component_union_chart_constructed} | ${row.required_fields_present.receiver_component_union_chart_constructed} | ${row.required_fields_present.combined_component_union_chart_pair_constructed} | ${row.required_fields_present.combined_global_domain_evaluation_pair_constructed} | ${row.row_consumed} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function buildReport(certificate) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Component-Union Chart Certificate

## Verdict

This packet certifies the first constructive subpiece of the endpoint-functional
route. For 4 / 4 \`fc_*\` endpoint functionals, the support components form
rational ordered disjoint unions, the component-union coordinate rules are
constructed, no-double-counting is certified, and the local cubic $\\Psi_j$
formulas are bound to the formal component-union charts as endpoint evaluation
locators. The packet still constructs 0 / 4 endpoint motion rules, 0 / 4 full
endpoint evaluation maps, 0 / 4 non-target zero certificates, 0 / 4 exact
$B\\xi=0$ or rank certificates, 0 / 5 candidate artifacts, and 0 / 3 consumable
rows.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals | ${certificate.summary.endpoint_functionals} |
| Component-union domains constructed | ${certificate.summary.component_union_domains_constructed} |
| Component-union coordinate rules constructed | ${certificate.summary.component_union_coordinate_rules_constructed} |
| No-double-counting rules constructed | ${certificate.summary.component_union_no_double_counting_rules_constructed} |
| Formula-to-chart bindings | ${certificate.summary.component_formula_chart_bindings} |
| Target endpoint evaluation locators | ${certificate.summary.target_endpoint_evaluation_locators_constructed} |
| Endpoint motion rules constructed | ${certificate.summary.endpoint_motion_rules_constructed} |
| Full endpoint evaluation maps constructed | ${certificate.summary.endpoint_evaluation_maps_constructed} |
| Non-target zero certificates | ${certificate.summary.non_target_zero_certificates} |
| Exact $B\\xi=0$ certificates | ${certificate.summary.exact_screen_zero_certificates} |
| Rank certificates | ${certificate.summary.rank_certificates} |
| Candidate artifacts present | ${certificate.summary.candidate_artifacts_present} |
| Proof-interval v1-v6 replays | ${certificate.summary.proof_interval_v1_v6_replays} |
| Rows with component-union chart pairs | ${certificate.summary.rows_with_component_union_chart_pairs} |
| Rows with full global domain/evaluation pairs | ${certificate.summary.rows_with_full_global_domain_evaluation_pairs} |
| Row consumption count | ${certificate.summary.row_consumption_count} |

## Certified Rule

${certificate.component_union_chart_rule}

${certificate.no_promotion_rule}

## Endpoint Certificates

| Endpoint variable | Support intervals | Support kind | Pairwise disjoint | No double counting | Target locator | Full evaluation map |
| --- | --- | --- | --- | --- | --- | --- |
${endpointTable(certificate.endpoint_component_union_chart_certificates)}

## Endpoint Field Audit

| Field | Endpoint count |
| --- | ---: |
${fieldTable(certificate.summary.endpoint_required_fields_certified_counts, ENDPOINT_COMPONENT_UNION_FIELDS, certificate.summary.endpoint_functionals)}

## Row Certificates

| Row | Source chart | Receiver chart | Chart pair | Full domain/evaluation pair | Row consumed |
| --- | --- | --- | --- | --- | --- |
${rowTable(certificate.row_component_union_chart_certificates)}

## Row Field Audit

| Field | Row count |
| --- | ---: |
${fieldTable(certificate.summary.row_required_fields_certified_counts, ROW_COMPONENT_UNION_FIELDS, certificate.summary.rows)}

## Closure Burden

The chart/no-double-counting obstruction is closed for the declared
component-union support of the four \`fc_*\` endpoint functionals. The active
blocker has moved one step downstream: the route now needs same-packet endpoint
motion and full endpoint-functional evaluation maps that turn these locators
into history-update data, plus non-target zero certificates, exact $B\\xi=0$,
rank, candidate artifacts, topology recertification, and proof-interval v1-v6
replay.

## Capture Decision

Priority-only partial certificate. This packet is a concrete mathematical
advance inside the proof-program lane because it certifies the finite
component-union chart and no-double-counting subproblem. It is not ready for
authored AAA prose because it remains a local certificate fragment rather than
a branch certificate or completed theorem.
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
    globalAttempt: readJson(args.globalAttempt),
    replayReadinessAudit: readJson(args.replayReadinessAudit),
  };
  const sources = {
    explicitPsiAttempt: args.explicitPsiAttempt,
    domainEvaluationContract: args.domainEvaluationContract,
    globalAttempt: args.globalAttempt,
    replayReadinessAudit: args.replayReadinessAudit,
  };
  const certificate = buildCertificate(inputs, sources);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, certificate, args.pretty);
  writeText(outReport, buildReport(certificate));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

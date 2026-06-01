#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_BASIS_ATTEMPT = `${CERT_DIR}/fold_coordinate_finite_realization_basis_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ONE_LEAF = `${CERT_DIR}/one_leaf_candidate_change_boundary_data.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_PHI = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_PRELEDGER_INPUT = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_SOURCE_COVER_ATLAS = `${CERT_DIR}/source_cover_defect_atlas.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OWNERSHIP_AUDIT = `${CERT_DIR}/source_cover_boundary_ownership_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_source_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_source_audit_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const VARIABLE_SOURCE_FIELDS = [
  "screen_variable_present",
  "basis_symbol_declared",
  "endpoint_boundary_action_declared",
  "boundary_delta_sign_consistent",
  "row_uses_covered",
  "target_endpoint_ref_declared",
  "target_endpoint_value_present",
  "endpoint_boundary_binding_present",
  "endpoint_functional_domain_present",
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
  "non_target_endpoint_functionals_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "endpoint_source_ready",
];

const ROW_SOURCE_FIELDS = [
  "one_leaf_row_present",
  "screen_row_resolved",
  "mesh_receiver_interval_resolved",
  "mesh_source_interval_resolved",
  "source_cover_atlas_row_resolved",
  "ownership_audit_row_resolved",
  "ownership_component_resolved",
  "source_boundary_ref_declared",
  "receiver_boundary_ref_declared",
  "source_boundary_value_present",
  "receiver_boundary_value_present",
  "terminal_grid_span_present",
  "endpoint_ownership_no_double_counting_certified",
  "endpoint_functionals_certified",
  "row_consumed",
  "branch_chart_authorized",
];

const EXPECTED_ACTION_SIGNS = {
  lower_source_inner_boundary: -1,
  raise_receiver_lower_boundary: 1,
  raise_source_inner_boundary: 1,
  lower_receiver_upper_boundary: -1,
};

function parseArgs(argv) {
  const args = {
    basisAttempt: DEFAULT_BASIS_ATTEMPT,
    oneLeaf: DEFAULT_ONE_LEAF,
    phi: DEFAULT_PHI,
    mesh: DEFAULT_MESH,
    preledgerInput: DEFAULT_PRELEDGER_INPUT,
    sourceCoverAtlas: DEFAULT_SOURCE_COVER_ATLAS,
    ownershipAudit: DEFAULT_OWNERSHIP_AUDIT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--basis-attempt") {
      args.basisAttempt = argv[++index];
    } else if (arg === "--one-leaf") {
      args.oneLeaf = argv[++index];
    } else if (arg === "--phi") {
      args.phi = argv[++index];
    } else if (arg === "--mesh") {
      args.mesh = argv[++index];
    } else if (arg === "--preledger-input") {
      args.preledgerInput = argv[++index];
    } else if (arg === "--source-cover-atlas") {
      args.sourceCoverAtlas = argv[++index];
    } else if (arg === "--ownership-audit") {
      args.ownershipAudit = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-source-audit.mjs [options]

Options:
  --basis-attempt PATH       Finite-realization basis attempt JSON. Defaults to ${DEFAULT_BASIS_ATTEMPT}.
  --one-leaf PATH            One-leaf candidate-change boundary data JSON. Defaults to ${DEFAULT_ONE_LEAF}.
  --phi PATH                 Diagnostic higher-fold phi_cyc JSON. Defaults to ${DEFAULT_PHI}.
  --mesh PATH                Diagnostic higher-fold mesh JSON. Defaults to ${DEFAULT_MESH}.
  --preledger-input PATH     Diagnostic higher-fold preledger input screen JSON. Defaults to ${DEFAULT_PRELEDGER_INPUT}.
  --source-cover-atlas PATH  Source-cover defect atlas JSON. Defaults to ${DEFAULT_SOURCE_COVER_ATLAS}.
  --ownership-audit PATH     Source-cover boundary ownership audit JSON. Defaults to ${DEFAULT_OWNERSHIP_AUDIT}.
  --out-dir PATH             Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                   Pretty-print JSON artifact.
  --help                     Show this help.`);
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

function byId(rows, idField = "row_id") {
  return new Map((rows ?? []).map((row) => [row[idField], row]));
}

function hasObjectField(record, field) {
  return record?.[field] !== undefined && record[field] !== null;
}

function resolvePath(record, ref) {
  if (!record || typeof ref !== "string") {
    return undefined;
  }
  return ref.split(".").reduce((current, key) => current?.[key], record);
}

function countFields(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function assertCommonInput(input, label) {
  if (input.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${input.packet_id}`);
  }
  if (input.branch_chart_authorized === true || input.preledger_pass === true || input.updates_live_ledger === true) {
    throw new Error(`Refusing to audit an authorized or live-updating ${label}.`);
  }
}

function assertInputs(inputs) {
  assertCommonInput(inputs.basisAttempt, "basis attempt");
  assertCommonInput(inputs.oneLeaf, "one-leaf boundary-data artifact");
  assertCommonInput(inputs.phi, "phi_cyc artifact");
  assertCommonInput(inputs.mesh, "mesh artifact");
  assertCommonInput(inputs.preledgerInput, "preledger input screen");
  assertCommonInput(inputs.sourceCoverAtlas, "source-cover atlas");
  assertCommonInput(inputs.ownershipAudit, "ownership audit");
  if (inputs.basisAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate packet id: ${inputs.basisAttempt.fold_coordinate_packet_id}`);
  }
  if (inputs.basisAttempt.status !== "fold_coordinate_finite_realization_basis_attempt_fail_closed") {
    throw new Error(`Unexpected basis attempt status: ${inputs.basisAttempt.status}`);
  }
  if (inputs.oneLeaf.status !== "one_leaf_candidate_change_boundary_data_fail_closed") {
    throw new Error(`Unexpected one-leaf boundary-data status: ${inputs.oneLeaf.status}`);
  }
  if (inputs.preledgerInput.status !== "higher_fold_preledger_input_screen_not_interval_certificate") {
    throw new Error(`Unexpected preledger input screen status: ${inputs.preledgerInput.status}`);
  }
  if (!Array.isArray(inputs.basisAttempt.basis_attempts) || inputs.basisAttempt.basis_attempts.length !== 4) {
    throw new Error("Expected exactly 4 basis attempts.");
  }
  if (!Array.isArray(inputs.oneLeaf.rows) || inputs.oneLeaf.rows.length !== 3) {
    throw new Error("Expected exactly 3 one-leaf boundary-data rows.");
  }
}

function actionRole(action) {
  if (typeof action !== "string") {
    return null;
  }
  if (action.includes("source")) {
    return "source";
  }
  if (action.includes("receiver")) {
    return "receiver";
  }
  return null;
}

function boundaryRefForRole(row, role) {
  return role === "source" ? row?.source_boundary_ref : row?.receiver_boundary_ref;
}

function boundaryValueForRole(row, role) {
  const ref = boundaryRefForRole(row, role);
  const refValue = resolvePath(row, ref);
  if (refValue !== undefined && refValue !== null) {
    return refValue;
  }
  if (role === "source") {
    return row?.current_source_boundary_q ?? row?.source_boundary_q ?? null;
  }
  if (role === "receiver") {
    return row?.current_receiver_boundary_q ?? row?.receiver_boundary_q ?? null;
  }
  return null;
}

function expectedSignForAction(action) {
  return EXPECTED_ACTION_SIGNS[action] ?? null;
}

function signsConsistent(actions, signs) {
  if (!Array.isArray(actions) || !Array.isArray(signs) || actions.length !== signs.length) {
    return false;
  }
  return actions.every((action, index) => expectedSignForAction(action) === signs[index]);
}

function rowBoundaryBurden(atlasRow, side) {
  if (side === "lower") {
    return atlasRow?.lower_boundary_burden ?? null;
  }
  if (side === "upper") {
    return atlasRow?.upper_boundary_burden ?? null;
  }
  return null;
}

function buildComponentMap(ownershipAudit) {
  const componentMap = new Map();
  for (const row of ownershipAudit.rows ?? []) {
    for (const component of row.components ?? []) {
      componentMap.set(component.component_id, component);
    }
  }
  return componentMap;
}

function buildRowSources(row, maps) {
  const screenRow = maps.screenRows.get(row.row_id);
  const meshReceiver = maps.meshIntervals.get(row.receiver_interval);
  const meshSource = maps.meshIntervals.get(row.source_interval);
  const atlasRow = maps.atlasRows.get(row.row_id);
  const ownershipRow = maps.ownershipRows.get(row.row_id);
  const ownershipComponent = maps.ownershipComponents.get(row.ownership_component_id);
  const fields = {
    one_leaf_row_present: true,
    screen_row_resolved: screenRow !== undefined,
    mesh_receiver_interval_resolved: meshReceiver !== undefined,
    mesh_source_interval_resolved: meshSource !== undefined,
    source_cover_atlas_row_resolved: atlasRow !== undefined,
    ownership_audit_row_resolved: ownershipRow !== undefined,
    ownership_component_resolved: ownershipComponent !== undefined,
    source_boundary_ref_declared: typeof row.source_boundary_ref === "string" && row.source_boundary_ref.length > 0,
    receiver_boundary_ref_declared: typeof row.receiver_boundary_ref === "string" && row.receiver_boundary_ref.length > 0,
    source_boundary_value_present: boundaryValueForRole(row, "source") !== null && boundaryValueForRole(row, "source") !== undefined,
    receiver_boundary_value_present:
      boundaryValueForRole(row, "receiver") !== null && boundaryValueForRole(row, "receiver") !== undefined,
    terminal_grid_span_present: hasObjectField(row, "terminal_grid_span"),
    endpoint_ownership_no_double_counting_certified:
      ownershipRow?.required_fields_present?.endpoint_ownership_no_double_counting === true,
    endpoint_functionals_certified: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    terminal_grid_span: row.terminal_grid_span,
    ownership_component_id: row.ownership_component_id,
    source_boundary_ref: row.source_boundary_ref,
    receiver_boundary_ref: row.receiver_boundary_ref,
    source_boundary_value: boundaryValueForRole(row, "source") ?? null,
    receiver_boundary_value: boundaryValueForRole(row, "receiver") ?? null,
    screen_row_ref: screenRow
      ? {
          receiver_theta_range: screenRow.receiver_theta_range,
          source_theta_range: screenRow.source_theta_range,
          receiver_range: screenRow.receiver_range,
          source_range: screenRow.source_range,
          screen_status: screenRow.screen_status,
          certificate_status: screenRow.certificate_status,
        }
      : null,
    mesh_receiver_interval: meshReceiver ?? null,
    mesh_source_interval: meshSource ?? null,
    source_cover_ref: atlasRow
      ? {
          missing_terminal_leaf_count: atlasRow.missing_terminal_leaf_count,
          boundary_burden: rowBoundaryBurden(atlasRow, row.boundary_side),
          source_theta_range_q: atlasRow.source_theta_range_q,
          receiver_theta_range_q: atlasRow.receiver_theta_range_q,
        }
      : null,
    ownership_component_ref: ownershipComponent
      ? {
          kind: ownershipComponent.kind,
          terminal_grid_span: ownershipComponent.terminal_grid_span,
          terminal_leaf_count: ownershipComponent.terminal_leaf_count,
          receiver_theta_range_q: ownershipComponent.receiver_theta_range_q,
          coverage_defect_q: ownershipComponent.coverage_defect_q,
          classification: ownershipComponent.classification,
          ownership_certified: ownershipComponent.ownership_certified === true,
        }
      : null,
    required_fields_present: fields,
    endpoint_source_row_ready: ROW_SOURCE_FIELDS.every((field) => fields[field] === true),
    obstruction:
      "The row-local interval ids, boundary refs, source/receiver boundary values, terminal span, and ownership component resolve, but endpoint functionals, no-double-counting ownership, and row consumption are absent.",
  };
}

function buildVariableSource(basis, rowSources) {
  const role = actionRole(basis.boundary_actions?.[0]);
  const usedRows = rowSources.filter((row) => (basis.row_uses ?? []).includes(row.row_id));
  const targetEndpointRefs = usedRows.map((row) => ({
    row_id: row.row_id,
    role,
    endpoint_ref: role === "source" ? row.source_boundary_ref : row.receiver_boundary_ref,
    endpoint_value:
      role === "source" ? row.source_boundary_value ?? null : row.receiver_boundary_value ?? null,
    endpoint_value_present:
      role === "source"
        ? row.required_fields_present.source_boundary_value_present
        : row.required_fields_present.receiver_boundary_value_present,
    ownership_component_id: row.ownership_component_id,
  }));
  const basisFields = basis.required_fields_present ?? {};
  const fields = {
    screen_variable_present: basisFields.screen_variable_present === true,
    basis_symbol_declared: basisFields.basis_symbol_declared === true,
    endpoint_boundary_action_declared: basisFields.endpoint_boundary_action_declared === true,
    boundary_delta_sign_consistent: signsConsistent(basis.boundary_actions, basis.boundary_delta_signs),
    row_uses_covered: (basis.row_uses ?? []).length > 0 && usedRows.length === (basis.row_uses ?? []).length,
    target_endpoint_ref_declared:
      targetEndpointRefs.length > 0 && targetEndpointRefs.every((entry) => typeof entry.endpoint_ref === "string"),
    target_endpoint_value_present:
      targetEndpointRefs.length > 0 && targetEndpointRefs.every((entry) => entry.endpoint_value_present === true),
    endpoint_boundary_binding_present: basisFields.endpoint_boundary_binding_present === true,
    endpoint_functional_domain_present: hasObjectField(basis, "endpoint_functional_domain"),
    theta_support_present: basisFields.theta_support_present === true,
    basis_formula_present: basisFields.basis_formula_present === true,
    basis_derivative_formula_present: basisFields.basis_derivative_formula_present === true,
    x_update_basis_present: basisFields.x_update_basis_present === true,
    xdot_update_basis_present: basisFields.xdot_update_basis_present === true,
    mesh_update_rule_present: basisFields.mesh_update_rule_present === true,
    endpoint_motion_rule_present: basisFields.endpoint_motion_rule_present === true,
    source_monotonicity_rule_present: basisFields.source_monotonicity_rule_present === true,
    receiver_monotonicity_rule_present: basisFields.receiver_monotonicity_rule_present === true,
    periodic_extension_rule_present: basisFields.periodic_extension_rule_present === true,
    c1_gluing_rule_present: basisFields.c1_gluing_rule_present === true,
    non_target_endpoint_functionals_zero_certified:
      basisFields.no_unintended_boundary_motion_certified === true,
    exact_screen_zero_certified: basisFields.exact_screen_zero_certified === true,
    rank_certified: basisFields.rank_certified === true,
    endpoint_source_ready: false,
  };
  fields.endpoint_source_ready = VARIABLE_SOURCE_FIELDS.every(
    (field) => field === "endpoint_source_ready" || fields[field] === true
  );
  return {
    id: basis.id,
    source_symbol: basis.source_symbol,
    basis_symbol: basis.basis_symbol,
    role,
    row_uses: basis.row_uses,
    boundary_actions: basis.boundary_actions,
    boundary_delta_signs: basis.boundary_delta_signs,
    target_endpoint_refs: targetEndpointRefs,
    required_endpoint_functionals: basis.required_endpoint_functionals,
    required_fields_present: fields,
    missing_endpoint_source_fields: VARIABLE_SOURCE_FIELDS.filter(
      (field) => field !== "endpoint_source_ready" && fields[field] !== true
    ),
    endpoint_source_ready: fields.endpoint_source_ready,
    obstruction:
      fields.endpoint_source_ready
        ? null
        : "The variable has row-local endpoint refs and values, but no exact endpoint-functional domain, endpoint binding, theta support, formula, derivative, mesh rule, endpoint motion rule, monotonicity rule, exact screen-zero certificate, or rank certificate.",
  };
}

function sourceArtifactSummary(records, inputs) {
  return {
    seed_phi_present: records.phi.present,
    seed_mesh_present: records.mesh.present,
    seed_preledger_input_present: records.preledgerInput.present,
    seed_phi_samples: Array.isArray(inputs.phi.samples) ? inputs.phi.samples.length : 0,
    seed_phi_intervals: Array.isArray(inputs.phi.higher_fold_itinerary?.intervals)
      ? inputs.phi.higher_fold_itinerary.intervals.length
      : 0,
    mesh_preledger_intervals: Array.isArray(inputs.mesh.preledger_intervals)
      ? inputs.mesh.preledger_intervals.length
      : 0,
    preledger_input_rows: Array.isArray(inputs.preledgerInput.rows) ? inputs.preledgerInput.rows.length : 0,
    source_cover_atlas_rows: Array.isArray(inputs.sourceCoverAtlas.rows)
      ? inputs.sourceCoverAtlas.rows.length
      : 0,
    ownership_audit_rows: Array.isArray(inputs.ownershipAudit.rows) ? inputs.ownershipAudit.rows.length : 0,
    ownership_audit_boundary_components:
      inputs.ownershipAudit.summary?.boundary_component_count ?? null,
    seed_artifacts_are_diagnostic_only: true,
  };
}

function buildAudit(inputs, sources) {
  assertInputs(inputs);
  const records = {
    basisAttempt: artifactRecord(sources.basisAttempt),
    oneLeaf: artifactRecord(sources.oneLeaf),
    phi: artifactRecord(sources.phi),
    mesh: artifactRecord(sources.mesh),
    preledgerInput: artifactRecord(sources.preledgerInput),
    sourceCoverAtlas: artifactRecord(sources.sourceCoverAtlas),
    ownershipAudit: artifactRecord(sources.ownershipAudit),
  };
  const maps = {
    screenRows: byId(inputs.preledgerInput.rows),
    meshIntervals: byId(inputs.mesh.preledger_intervals, "interval_id"),
    atlasRows: byId(inputs.sourceCoverAtlas.rows),
    ownershipRows: byId(inputs.ownershipAudit.rows),
    ownershipComponents: buildComponentMap(inputs.ownershipAudit),
  };
  const rowSources = inputs.oneLeaf.rows.map((row) => buildRowSources(row, maps));
  const variableSources = inputs.basisAttempt.basis_attempts.map((basis) =>
    buildVariableSource(basis, rowSources)
  );
  const variableCounts = countFields(variableSources, VARIABLE_SOURCE_FIELDS);
  const rowCounts = countFields(rowSources, ROW_SOURCE_FIELDS);
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-source-audit-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    candidate_run_id: inputs.basisAttempt.candidate_run_id,
    artifact_stem: inputs.basisAttempt.artifact_stem,
    status: "fold_coordinate_endpoint_functional_source_audit_fail_closed",
    theorem_target: "Fold-Coordinate Endpoint-Functional Source Audit",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only endpoint-functional source audit; row-local endpoint refs and values are present but global exact endpoint functionals are absent",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: records,
    source_artifact_summary: sourceArtifactSummary(records, inputs),
    endpoint_source_rule:
      "A row-local boundary ref becomes usable for a fold-coordinate basis only after the basis variable has an exact endpoint-functional domain, an endpoint boundary binding, exact endpoint value data, theta support, basis and derivative formulas, X and Xdot update bases, mesh and endpoint motion rules, source/receiver monotonicity rules, non-target endpoint-functional zero certification, exact B_xi=0 certification, and rank certification.",
    rejection_rule:
      "Diagnostic theta samples, interval ids, source/receiver range samples, terminal receiver-grid spans, and ownership component ids locate the row-local endpoint target; they do not define a global exact endpoint functional for any fc_* basis variable.",
    seed_artifact_note:
      "The phi_cyc, mesh, and causal_preledger_input_screen artifacts are the diagnostic shifted-separator seed for the higher-fold packet. They support lookup of theta ranges and sampled rows, but they are not fold-coordinate candidate history artifacts.",
    row_sources: rowSources,
    variable_sources: variableSources,
    summary: {
      variables: variableSources.length,
      rows: rowSources.length,
      seed_phi_present: records.phi.present,
      seed_mesh_present: records.mesh.present,
      seed_preledger_input_present: records.preledgerInput.present,
      screen_variables_present: variableCounts.screen_variable_present,
      basis_symbols_declared: variableCounts.basis_symbol_declared,
      endpoint_boundary_actions_declared: variableCounts.endpoint_boundary_action_declared,
      boundary_delta_sign_consistent_variables: variableCounts.boundary_delta_sign_consistent,
      variables_with_row_uses_covered: variableCounts.row_uses_covered,
      variables_with_target_endpoint_refs_declared: variableCounts.target_endpoint_ref_declared,
      variables_with_target_endpoint_values_present: variableCounts.target_endpoint_value_present,
      endpoint_boundary_bindings_present: variableCounts.endpoint_boundary_binding_present,
      endpoint_functional_domains_present: variableCounts.endpoint_functional_domain_present,
      theta_supports_present: variableCounts.theta_support_present,
      basis_formulas_present: variableCounts.basis_formula_present,
      basis_derivative_formulas_present: variableCounts.basis_derivative_formula_present,
      x_update_bases_present: variableCounts.x_update_basis_present,
      xdot_update_bases_present: variableCounts.xdot_update_basis_present,
      mesh_update_rules_present: variableCounts.mesh_update_rule_present,
      endpoint_motion_rules_present: variableCounts.endpoint_motion_rule_present,
      source_monotonicity_rules_present: variableCounts.source_monotonicity_rule_present,
      receiver_monotonicity_rules_present: variableCounts.receiver_monotonicity_rule_present,
      non_target_endpoint_functionals_zero_certified:
        variableCounts.non_target_endpoint_functionals_zero_certified,
      exact_screen_zero_certified_variables: variableCounts.exact_screen_zero_certified,
      rank_certified_variables: variableCounts.rank_certified,
      endpoint_source_ready_variables: variableCounts.endpoint_source_ready,
      row_local_source_interval_refs: rowSources.filter((row) => typeof row.source_interval === "string").length,
      row_local_receiver_interval_refs: rowSources.filter((row) => typeof row.receiver_interval === "string").length,
      row_local_source_boundary_refs_declared: rowCounts.source_boundary_ref_declared,
      row_local_receiver_boundary_refs_declared: rowCounts.receiver_boundary_ref_declared,
      row_local_source_boundary_values_present: rowCounts.source_boundary_value_present,
      row_local_receiver_boundary_values_present: rowCounts.receiver_boundary_value_present,
      rows_located_in_preledger_input: rowCounts.screen_row_resolved,
      rows_with_mesh_receiver_interval: rowCounts.mesh_receiver_interval_resolved,
      rows_with_mesh_source_interval: rowCounts.mesh_source_interval_resolved,
      rows_located_in_source_cover_atlas: rowCounts.source_cover_atlas_row_resolved,
      rows_located_in_ownership_audit: rowCounts.ownership_audit_row_resolved,
      ownership_components_resolved: rowCounts.ownership_component_resolved,
      endpoint_ownership_no_double_counting_certified_rows:
        rowCounts.endpoint_ownership_no_double_counting_certified,
      endpoint_functionals_certified_rows: rowCounts.endpoint_functionals_certified,
      endpoint_source_ready_rows: rowSources.filter((row) => row.endpoint_source_row_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      variable_required_fields_certified_counts: variableCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function variableTable(variableSources) {
  return variableSources
    .map(
      (variable) =>
        `| \`${variable.id}\` | \`${variable.role}\` | ${variable.required_fields_present.target_endpoint_ref_declared} | ${variable.required_fields_present.target_endpoint_value_present} | ${variable.required_fields_present.endpoint_boundary_binding_present} | ${variable.required_fields_present.endpoint_functional_domain_present} | ${variable.required_fields_present.theta_support_present} | ${variable.endpoint_source_ready} |`
    )
    .join("\n");
}

function rowTable(rowSources) {
  return rowSources
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.source_interval}\` | \`${row.receiver_interval}\` | ${row.required_fields_present.source_boundary_ref_declared} | ${row.required_fields_present.receiver_boundary_ref_declared} | ${row.required_fields_present.source_boundary_value_present} | ${row.required_fields_present.receiver_boundary_value_present} | ${row.required_fields_present.ownership_component_resolved} | ${row.required_fields_present.endpoint_ownership_no_double_counting_certified} |`
    )
    .join("\n");
}

function sourceArtifactTable(records) {
  return Object.entries(records)
    .map(([name, record]) => `| \`${name}\` | \`${record.basename}\` | ${record.present} |`)
    .join("\n");
}

function buildReport(audit) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Source Audit

## Verdict

The endpoint-functional source audit fail-closes. The existing higher-fold seed,
mesh, preledger input screen, one-leaf boundary-data rows, source-cover atlas,
and boundary-ownership audit are sufficient to locate the row-local endpoint
targets for the three one-leaf rows. They are not sufficient to define global
exact endpoint functionals for the four \`fc_*\` basis variables.

| Quantity | Value |
| --- | ---: |
| Variables audited | ${audit.summary.variables} |
| Rows audited | ${audit.summary.rows} |
| Seed \`phi_cyc\` present | ${audit.summary.seed_phi_present} |
| Seed \`mesh\` present | ${audit.summary.seed_mesh_present} |
| Seed preledger input present | ${audit.summary.seed_preledger_input_present} |
| Target endpoint refs declared | ${audit.summary.variables_with_target_endpoint_refs_declared} / ${audit.summary.variables} |
| Target endpoint values present | ${audit.summary.variables_with_target_endpoint_values_present} / ${audit.summary.variables} |
| Endpoint boundary bindings present | ${audit.summary.endpoint_boundary_bindings_present} / ${audit.summary.variables} |
| Endpoint-functional domains present | ${audit.summary.endpoint_functional_domains_present} / ${audit.summary.variables} |
| Theta supports present | ${audit.summary.theta_supports_present} / ${audit.summary.variables} |
| Basis formulas present | ${audit.summary.basis_formulas_present} / ${audit.summary.variables} |
| Endpoint-source-ready variables | ${audit.summary.endpoint_source_ready_variables} / ${audit.summary.variables} |
| Endpoint-source-ready rows | ${audit.summary.endpoint_source_ready_rows} / ${audit.summary.rows} |
| Row consumption count | ${audit.summary.row_consumption_count} |

## Source Rule

A row-local boundary ref becomes usable for a fold-coordinate basis only after
the basis variable has an exact endpoint-functional domain, an endpoint boundary
binding, exact endpoint value data, theta support, basis and derivative
formulas, $X$ and $\\dot X$ update bases, mesh and endpoint motion rules,
source/receiver monotonicity rules, non-target endpoint-functional zero
certification, exact $B\\xi=0$ certification, and rank certification.

The present data satisfy the locator and row-local endpoint-value side of that
rule. They do not satisfy the functional binding, domain, support, formula,
or certification side.

## Source Artifacts

| Artifact | File | Present |
| --- | --- | --- |
${sourceArtifactTable(audit.source_artifacts)}

## Variable Audit

| Variable | Role | Endpoint ref | Endpoint value | Endpoint binding | Functional domain | Theta support | Ready |
| --- | --- | --- | --- | --- | --- | --- | --- |
${variableTable(audit.variable_sources)}

## Variable-Field Audit

| Field | Variables certified |
| --- | ---: |
${fieldTable(
  audit.summary.variable_required_fields_certified_counts,
  VARIABLE_SOURCE_FIELDS,
  audit.summary.variables
)}

## Row-Local Source Audit

| Row | Source interval | Receiver interval | Source ref | Receiver ref | Source value | Receiver value | Ownership component | No double counting |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(audit.row_sources)}

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(audit.summary.row_required_fields_certified_counts, ROW_SOURCE_FIELDS, audit.summary.rows)}

## Closure Burden

The next proof object is not another locator audit. It is the exact endpoint
functional data for
$\\Psi_{\\mathrm{fc\\_sigma\\_source\\_lower}}$,
$\\Psi_{\\mathrm{fc\\_rho\\_receiver\\_lower}}$,
$\\Psi_{\\mathrm{fc\\_sigma\\_source\\_upper}}$, and
$\\Psi_{\\mathrm{fc\\_rho\\_receiver\\_upper}}$: endpoint-functional domains,
endpoint boundary bindings, theta supports, formulas, derivative formulas,
$X$ and $\\dot X$ update bases, mesh and endpoint rules, source/receiver
monotonicity, non-target endpoint-functional zero certification, exact
$B\\xi=0$, and rank certification.

## Capture Decision

Priority-only source audit. This packet records that existing artifacts contain
row-local endpoint locators and endpoint values, but not the global exact
endpoint functionals needed to promote the fold-coordinate screen into a
same-packet finite basis or candidate history.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    basisAttempt: readJson(args.basisAttempt),
    oneLeaf: readJson(args.oneLeaf),
    phi: readJson(args.phi),
    mesh: readJson(args.mesh),
    preledgerInput: readJson(args.preledgerInput),
    sourceCoverAtlas: readJson(args.sourceCoverAtlas),
    ownershipAudit: readJson(args.ownershipAudit),
  };
  const audit = buildAudit(inputs, {
    basisAttempt: args.basisAttempt,
    oneLeaf: args.oneLeaf,
    phi: args.phi,
    mesh: args.mesh,
    preledgerInput: args.preledgerInput,
    sourceCoverAtlas: args.sourceCoverAtlas,
    ownershipAudit: args.ownershipAudit,
  });
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, audit, args.pretty);
  writeText(outReport, buildReport(audit));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

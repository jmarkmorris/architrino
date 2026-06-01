#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_TARGET_OBJECT_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_target_endpoint_boundary_binding_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const FULL_BINDING_REQUIRED_FIELDS = [
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "full_endpoint_evaluation_map_constructed",
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
  ...FULL_BINDING_REQUIRED_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_target_endpoint_boundary_binding_object_constructed",
  "receiver_target_endpoint_boundary_binding_object_constructed",
  "combined_target_boundary_binding_object_pair_constructed",
  "source_full_boundary_binding_contract_target_declared",
  "receiver_full_boundary_binding_contract_target_declared",
  "combined_full_boundary_binding_contract_target_pair_declared",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_endpoint_evaluation_map_pair_constructed",
  "proof_grade_boundary_opening_certified",
  "residual_data_construction_ready",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    targetObjectAttempt: DEFAULT_TARGET_OBJECT_ATTEMPT,
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-full-endpoint-boundary-binding-contract-target.mjs [options]

Options:
  --target-object-attempt PATH  Target endpoint boundary-binding object attempt JSON. Defaults to ${DEFAULT_TARGET_OBJECT_ATTEMPT}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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

function requireEndpoint(map, id, label) {
  const value = map.get(id);
  if (!value) {
    throw new Error(`Missing ${label} endpoint: ${id}`);
  }
  return value;
}

function assertInput(source) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected target object packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected target object fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (
    source.status !==
    "fold_coordinate_endpoint_functional_component_domain_target_endpoint_boundary_binding_object_construction_partial_pass_object_constructed_full_binding_blocked"
  ) {
    throw new Error(`Unexpected target object status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error("Refusing contract target construction from authorized source packet.");
  }
}

function targetRefsHaveValues(endpoint) {
  const refs = endpoint.target_boundary_binding_object?.target_endpoint_refs ?? [];
  return refs.length > 0 && refs.every((ref) => ref.endpoint_value_present === true);
}

function contractTarget(endpoint) {
  const bindingSymbol = `BB_${endpoint.id}`;
  return {
    target_id: `full_endpoint_boundary_binding_contract_target:${endpoint.id}`,
    target_kind: "full_endpoint_boundary_binding_contract_target",
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    binding_symbol: bindingSymbol,
    source_target_object_id: endpoint.target_boundary_binding_object.object_id,
    domain_symbol: endpoint.domain_symbol,
    chart_symbol: endpoint.chart_symbol,
    basis_symbol: endpoint.basis_symbol,
    target_action_equation: endpoint.target_equation,
    endpoint_value_binding_condition:
      `${bindingSymbol} must bind each target endpoint ref/value to a proof-grade endpoint boundary binding for ${endpoint.endpoint_functional_id}.`,
    binding_contract_condition:
      `${bindingSymbol} must satisfy target action, endpoint value binding, non-target zero, exact $B\\xi=0$, rank, history update, endpoint motion, endpoint evaluation, candidate artifact, topology, and proof-interval replay obligations on the same packet.`,
    non_target_zero_condition:
      `All non-target one-leaf endpoint functionals must vanish on ${endpoint.basis_symbol} or be carried by an explicit no-double-counting certificate.`,
    exact_screen_zero_condition:
      "The screen-level $B\\xi=0$ evidence must be replaced by an exact same-packet certificate.",
    rank_condition:
      "The fold-coordinate basis must carry a rank certificate separating target endpoint actions from forbidden non-target actions.",
    replay_condition:
      "Candidate artifacts, topology recertification, and proof-interval v1-v6 replay must be produced by this same packet before row consumption.",
  };
}

function endpointFields(endpoint) {
  const sourceFields = endpoint.required_fields_present;
  const objectReady = sourceFields.target_endpoint_boundary_binding_object_constructed === true;
  const targetRefsReady = objectReady && targetRefsHaveValues(endpoint);
  return {
    target_endpoint_boundary_binding_object_constructed: objectReady,
    target_boundary_binding_object_has_domain_chart:
      sourceFields.target_boundary_binding_object_has_domain_chart === true,
    target_boundary_binding_object_has_basis_formula:
      sourceFields.target_boundary_binding_object_has_basis_formula === true,
    target_boundary_binding_object_has_boundary_action:
      sourceFields.target_boundary_binding_object_has_boundary_action === true,
    target_boundary_binding_object_has_signed_delta:
      sourceFields.target_boundary_binding_object_has_signed_delta === true,
    target_boundary_binding_object_has_endpoint_refs:
      sourceFields.target_boundary_binding_object_has_endpoint_refs === true,
    target_boundary_binding_object_has_endpoint_values:
      sourceFields.target_boundary_binding_object_has_endpoint_values === true && targetRefsReady,
    target_action_exact_under_target_boundary_binding_object:
      sourceFields.target_action_exact_under_target_boundary_binding_object === true,
    full_endpoint_boundary_binding_contract_target_declared: objectReady,
    full_endpoint_boundary_binding_symbol_declared: objectReady,
    endpoint_value_binding_target_declared: objectReady && targetRefsReady,
    binding_contract_target_declared: objectReady,
    non_target_zero_target_declared: objectReady,
    exact_screen_zero_target_declared: objectReady,
    rank_target_declared: objectReady,
    history_update_target_declared: objectReady,
    endpoint_motion_target_declared: objectReady,
    endpoint_evaluation_target_declared: objectReady,
    candidate_artifact_replay_target_declared: objectReady,
    endpoint_boundary_binding_constructed: false,
    endpoint_value_bound_to_boundary_binding: false,
    binding_contract_satisfied: false,
    same_packet_history_update_formula_present: false,
    endpoint_motion_rule_constructed: false,
    endpoint_evaluation_map_constructed: false,
    full_endpoint_evaluation_map_constructed: false,
    non_target_endpoint_zero_certified: false,
    exact_screen_zero_certified: false,
    rank_certified: false,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
  };
}

function buildEndpointTarget(endpoint) {
  const fields = endpointFields(endpoint);
  const missingFields = FULL_BINDING_REQUIRED_FIELDS.filter((field) => fields[field] !== true);
  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    basis_symbol: endpoint.basis_symbol,
    source_symbol: endpoint.source_symbol,
    row_uses: endpoint.row_uses,
    target_equation: endpoint.target_equation,
    target_action: endpoint.target_action,
    target_sign: endpoint.target_sign,
    domain_symbol: endpoint.domain_symbol,
    chart_symbol: endpoint.chart_symbol,
    evaluation_map_symbol: endpoint.evaluation_map_symbol,
    support_interval_ids: endpoint.support_interval_ids,
    support_union_kind: endpoint.support_union_kind,
    source_target_boundary_binding_object_id: endpoint.target_boundary_binding_object.object_id,
    full_endpoint_boundary_binding_contract_target: contractTarget(endpoint),
    required_fields_present: fields,
    contract_target_declared: fields.full_endpoint_boundary_binding_contract_target_declared,
    full_binding_required_fields: FULL_BINDING_REQUIRED_FIELDS,
    missing_full_binding_fields: missingFields,
    full_binding_supplied: missingFields.length === 0,
    failure_codes: missingFields.map((field) => `full_endpoint_boundary_binding_contract_target_missing_${field}`),
    obstruction:
      "The full endpoint boundary-binding contract target is declared from the target object, but the full endpoint boundary binding, value binding, contract satisfaction, motion/evaluation, non-target zero, exact screen zero, rank, artifact, topology, and replay fields are not supplied.",
  };
}

function buildRowTarget(row, endpointTargets) {
  const endpointById = idMap(endpointTargets, "full endpoint boundary-binding contract target");
  const sourceEndpoint = requireEndpoint(endpointById, row.source_variable, "source contract target");
  const receiverEndpoint = requireEndpoint(endpointById, row.receiver_variable, "receiver contract target");
  const rowFields = row.required_fields_present;
  const fields = {
    row_locator_resolved: rowFields.row_locator_resolved === true,
    source_target_endpoint_boundary_binding_object_constructed:
      rowFields.source_target_endpoint_boundary_binding_object_constructed === true,
    receiver_target_endpoint_boundary_binding_object_constructed:
      rowFields.receiver_target_endpoint_boundary_binding_object_constructed === true,
    combined_target_boundary_binding_object_pair_constructed:
      rowFields.combined_target_boundary_binding_object_pair_constructed === true,
    source_full_boundary_binding_contract_target_declared: sourceEndpoint.contract_target_declared,
    receiver_full_boundary_binding_contract_target_declared: receiverEndpoint.contract_target_declared,
    combined_full_boundary_binding_contract_target_pair_declared:
      sourceEndpoint.contract_target_declared && receiverEndpoint.contract_target_declared,
    source_endpoint_boundary_binding_constructed: false,
    receiver_endpoint_boundary_binding_constructed: false,
    combined_boundary_binding_pair_constructed: false,
    source_endpoint_value_bound_to_boundary_binding: false,
    receiver_endpoint_value_bound_to_boundary_binding: false,
    combined_binding_contract_pair_satisfied: false,
    source_endpoint_motion_rule_constructed: false,
    receiver_endpoint_motion_rule_constructed: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    proof_grade_boundary_opening_certified: false,
    residual_data_construction_ready: false,
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
    source_full_boundary_binding_contract_target_id:
      sourceEndpoint.full_endpoint_boundary_binding_contract_target.target_id,
    receiver_full_boundary_binding_contract_target_id:
      receiverEndpoint.full_endpoint_boundary_binding_contract_target.target_id,
    source_boundary_ref: row.source_boundary_ref,
    receiver_boundary_ref: row.receiver_boundary_ref,
    source_boundary_value: row.source_boundary_value,
    receiver_boundary_value: row.receiver_boundary_value,
    required_fields_present: fields,
    combined_full_boundary_binding_contract_target_pair_declared:
      fields.combined_full_boundary_binding_contract_target_pair_declared,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row now has source/receiver full boundary-binding contract targets, but no source/receiver full endpoint boundary bindings, value bindings, motion/evaluation pair, residual data, replay, or row consumption.",
  };
}

function buildAttempt(source, sourcePath) {
  assertInput(source);
  const endpointTargets = source.endpoint_target_boundary_binding_object_attempts.map(buildEndpointTarget);
  const rowTargets = source.row_target_boundary_binding_object_attempts.map((row) =>
    buildRowTarget(row, endpointTargets)
  );
  const endpointFieldCounts = Object.fromEntries(
    ENDPOINT_FIELDS.map((field) => [
      field,
      countTrue(endpointTargets, (endpoint) => endpoint.required_fields_present[field]),
    ])
  );
  const rowFieldCounts = Object.fromEntries(
    ROW_FIELDS.map((field) => [field, countTrue(rowTargets, (row) => row.required_fields_present[field])])
  );
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-full-endpoint-boundary-binding-contract-target-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked",
    theorem_target: "Full Endpoint Boundary-Binding Contract Target",
    claim_level:
      "priority-only full endpoint boundary-binding contract target; obligation matrix declared, but no full endpoint boundary binding, endpoint value binding, binding contract, motion/evaluation map, replay, row consumption, or branch-chart authorization is certified",
    source_artifacts: {
      target_endpoint_boundary_binding_object_construction_attempt: artifactRecord(sourcePath),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      full_endpoint_boundary_binding_contract_target_declared: true,
      endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    contract_target_rule:
      "A full endpoint boundary-binding contract target is the obligation matrix required to promote a target endpoint boundary-binding object into a proof-grade endpoint boundary binding. It names the binding symbol and required same-packet value binding, contract satisfaction, non-target zero, exact $B\\xi=0$, rank, history update, endpoint motion, endpoint evaluation, candidate artifact, topology, and proof-interval replay fields.",
    no_promotion_rule:
      "The contract target is not a binding. Target endpoint refs, endpoint values, boundary actions, and target objects remain source data until the full endpoint boundary binding and every listed proof field is supplied in the same packet.",
    full_binding_required_fields: FULL_BINDING_REQUIRED_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_full_boundary_binding_contract_targets: endpointTargets,
    row_full_boundary_binding_contract_targets: rowTargets,
    summary: {
      endpoint_functionals: endpointTargets.length,
      rows: rowTargets.length,
      target_endpoint_boundary_binding_object_functionals:
        endpointFieldCounts.target_endpoint_boundary_binding_object_constructed,
      full_endpoint_boundary_binding_contract_targets:
        endpointFieldCounts.full_endpoint_boundary_binding_contract_target_declared,
      full_endpoint_boundary_binding_symbols:
        endpointFieldCounts.full_endpoint_boundary_binding_symbol_declared,
      endpoint_value_binding_targets:
        endpointFieldCounts.endpoint_value_binding_target_declared,
      binding_contract_targets:
        endpointFieldCounts.binding_contract_target_declared,
      non_target_zero_targets:
        endpointFieldCounts.non_target_zero_target_declared,
      exact_screen_zero_targets:
        endpointFieldCounts.exact_screen_zero_target_declared,
      rank_targets: endpointFieldCounts.rank_target_declared,
      history_update_targets:
        endpointFieldCounts.history_update_target_declared,
      endpoint_motion_targets:
        endpointFieldCounts.endpoint_motion_target_declared,
      endpoint_evaluation_targets:
        endpointFieldCounts.endpoint_evaluation_target_declared,
      candidate_artifact_replay_targets:
        endpointFieldCounts.candidate_artifact_replay_target_declared,
      endpoint_boundary_binding_functionals:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
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
      non_target_zero_certificate_functionals:
        endpointFieldCounts.non_target_endpoint_zero_certified,
      exact_screen_zero_certificate_functionals:
        endpointFieldCounts.exact_screen_zero_certified,
      rank_certificate_functionals: endpointFieldCounts.rank_certified,
      candidate_artifact_functionals:
        endpointFieldCounts.candidate_artifacts_present,
      topology_recertification_functionals:
        endpointFieldCounts.root_topology_recertified_for_candidate_change,
      proof_interval_replay_functionals:
        endpointFieldCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      row_contract_target_pairs:
        rowFieldCounts.combined_full_boundary_binding_contract_target_pair_declared,
      row_boundary_binding_pairs:
        rowFieldCounts.combined_boundary_binding_pair_constructed,
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
      "Priority-only. This packet declares 4 / 4 full endpoint boundary-binding contract targets and 3 / 3 source/receiver row contract-target pairs. It does not construct full endpoint boundary bindings, endpoint value bindings, satisfied binding contracts, same-packet history updates, endpoint motion/evaluation maps, non-target zero certificates, exact $B\\xi=0$, rank certificates, candidate artifacts, topology recertifications, proof-interval replays, preledger pass, live-ledger update, branch-chart authorization, or consumed rows.",
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

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.target_endpoint_boundary_binding_object_constructed} | ${endpoint.contract_target_declared} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding} | ${endpoint.required_fields_present.binding_contract_satisfied} | ${endpoint.required_fields_present.endpoint_motion_rule_constructed} | ${endpoint.required_fields_present.endpoint_evaluation_map_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_full_boundary_binding_contract_target_pair_declared} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_evaluation_map_pair_constructed} | ${row.row_consumed} |`
    )
    .join("\n");
}

function countTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function buildReport(attempt) {
  const summary = attempt.summary;
  return `# Higher-Fold Endpoint-Functional Full Endpoint Boundary-Binding Contract Target

## Verdict

Status: \`${attempt.status}\`.

This priority-only packet freezes the full endpoint boundary-binding contract
that the target endpoint boundary-binding object still lacks. It declares the
binding target, value-binding target, binding-contract target, non-target-zero
target, exact $B\\xi=0$ target, rank target, history-update target, endpoint
motion/evaluation target, and replay target for each fold-coordinate endpoint
functional. It does not construct those fields.

The packet declares ${summary.full_endpoint_boundary_binding_contract_targets} /
${summary.endpoint_functionals} full endpoint boundary-binding contract targets
and ${summary.row_contract_target_pairs} / ${summary.rows} row contract-target
pairs. It keeps 0 / ${summary.endpoint_functionals} full endpoint boundary
bindings, 0 / ${summary.endpoint_functionals} endpoint value bindings,
0 / ${summary.endpoint_functionals} satisfied binding contracts,
0 / ${summary.endpoint_functionals} endpoint motion rules,
0 / ${summary.endpoint_functionals} endpoint evaluation maps,
0 / ${summary.endpoint_functionals} non-target zero certificates,
0 / ${summary.endpoint_functionals} exact $B\\xi=0$ certificates,
0 / ${summary.endpoint_functionals} rank certificates,
0 / ${summary.endpoint_functionals} candidate artifacts,
0 / ${summary.endpoint_functionals} topology recertifications,
0 / ${summary.endpoint_functionals} proof-interval replays, and 0 consumed rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(attempt.source_artifacts)}

## Contract Target Rule

${attempt.contract_target_rule}

${attempt.no_promotion_rule}

## Endpoint Contract Targets

| Endpoint | Role | Target object | Contract target | Full binding | Value binding | Contract satisfied | Motion rule | Evaluation map |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(attempt.endpoint_full_boundary_binding_contract_targets)}

## Row Contract Targets

| Row | Failed side | Contract-target pair | Boundary-binding pair | Evaluation-map pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_full_boundary_binding_contract_targets)}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${countTable(attempt.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(attempt.row_field_counts, summary.rows)}

## Capture Decision

${attempt.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const source = readJson(args.targetObjectAttempt);
  const attempt = buildAttempt(source, args.targetObjectAttempt);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, attempt, args.pretty);
  writeText(outputReportPath, buildReport(attempt));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

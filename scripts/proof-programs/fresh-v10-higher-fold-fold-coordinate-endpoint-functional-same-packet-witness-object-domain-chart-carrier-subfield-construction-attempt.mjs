#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CARRIER_FIELD_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPONENT_DOMAIN_SUBCERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_union_domain_binding_subcertificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON = `fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_domain_chart_carrier_subfield_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_domain_chart_carrier_subfield_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-construction-attempt-fail-closed-carrier-field-source-candidates-present-carrier-fields-absent-no-row-consumption";
const COMPONENT_DOMAIN_STATUS =
  "fold_coordinate_endpoint_functional_component_union_domain_binding_subcertificate_partial_pass_boundary_binding_motion_evaluation_blocked";
const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-domain-chart-carrier-subfield-construction-attempt-partial-pass-fail-closed-domain-chart-carriers-present-other-carrier-fields-absent-no-row-consumption";

const CARRIER_FIELDS = [
  "domain_chart",
  "endpoint_boundary_binding_ref",
  "endpoint_value_binding_map",
  "contract_link",
  "algebraic_certificate_refs",
  "motion_evaluation_refs",
  "artifact_topology_replay_refs",
];

const REQUIRED_COMPONENT_DOMAIN_FIELDS = [
  "component_domain_binding_subcertificate_constructed",
  "component_domain_subcertificate_ready",
  "endpoint_functional_domain_present",
  "domain_chart_declared",
  "domain_coordinate_rule_declared",
  "basis_vector_bound_to_domain",
  "theta_support_present",
  "basis_formula_present",
  "basis_derivative_formula_present",
  "component_union_domain_constructed",
  "component_union_coordinate_rule_constructed",
  "component_union_no_double_counting_rule_constructed",
  "component_formula_bound_to_chart",
  "component_endpoint_identities_exact",
];

const ENDPOINT_FALSE_FIELDS = [
  "endpoint_boundary_binding_witness_object_constructed",
  "endpoint_boundary_binding_witness_constructed",
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
  "witness_object_has_endpoint_boundary_binding_ref",
  "witness_object_has_endpoint_value_binding_map",
  "witness_object_has_contract_link",
  "witness_object_has_algebraic_certificate_refs",
  "witness_object_has_motion_evaluation_refs",
  "witness_object_has_artifact_topology_replay_refs",
  "all_carrier_fields_constructed",
];

const ROW_FIELDS = [
  "combined_witness_object_carrier_field_obligation_pair_declared",
  "source_domain_chart_carrier_subfield_constructed",
  "receiver_domain_chart_carrier_subfield_constructed",
  "combined_domain_chart_carrier_subfield_pair_constructed",
  "source_all_carrier_fields_constructed",
  "receiver_all_carrier_fields_constructed",
  "combined_all_carrier_fields_constructed",
  "combined_endpoint_boundary_binding_witness_object_pair_constructed",
  "combined_boundary_binding_pair_constructed",
  "combined_binding_contract_pair_satisfied",
  "combined_endpoint_evaluation_map_pair_constructed",
  "source_endpoint_residual_formula_present",
  "receiver_endpoint_residual_formula_present",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "residual_function_on_box_source_layer_ready",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    carrierFieldConstructionAttempt: DEFAULT_CARRIER_FIELD_CONSTRUCTION_ATTEMPT,
    componentDomainSubcertificate: DEFAULT_COMPONENT_DOMAIN_SUBCERTIFICATE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--carrier-field-construction-attempt") {
      args.carrierFieldConstructionAttempt = argv[++index];
    } else if (arg === "--component-domain-subcertificate") {
      args.componentDomainSubcertificate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-same-packet-witness-object-domain-chart-carrier-subfield-construction-attempt.mjs [options]

Options:
  --carrier-field-construction-attempt PATH  Carrier-field construction attempt JSON.
  --component-domain-subcertificate PATH     Component-domain subcertificate JSON.
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

function idMap(rows, key, label) {
  const map = new Map();
  for (const row of rows) {
    const id = row[key];
    if (!id) {
      throw new Error(`Missing ${label} id field ${key}`);
    }
    if (map.has(id)) {
      throw new Error(`Duplicate ${label} id: ${id}`);
    }
    map.set(id, row);
  }
  return map;
}

function requireMapped(map, id, label) {
  const value = map.get(id);
  if (!value) {
    throw new Error(`Missing ${label}: ${id}`);
  }
  return value;
}

function assertInput(source, componentDomain) {
  if (source.packet_id !== PACKET_ID || componentDomain.packet_id !== PACKET_ID) {
    throw new Error("Unexpected packet id in source inputs.");
  }
  if (
    source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID ||
    componentDomain.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID
  ) {
    throw new Error("Unexpected fold-coordinate packet id in source inputs.");
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected carrier-field construction status: ${source.status}`);
  }
  if (componentDomain.status !== COMPONENT_DOMAIN_STATUS) {
    throw new Error(`Unexpected component-domain status: ${componentDomain.status}`);
  }
  if (
    source.branch_chart_authorized ||
    source.preledger_pass ||
    source.updates_live_ledger ||
    componentDomain.branch_chart_authorized ||
    componentDomain.preledger_pass ||
    componentDomain.updates_live_ledger
  ) {
    throw new Error("Refusing domain-chart carrier construction from authorized source inputs.");
  }
}

function assertEndpointCompatibility(carrierEndpoint, componentEndpoint) {
  const domainChartAttempt = carrierEndpoint.carrier_field_construction_attempts.find(
    (attempt) => attempt.carrier_field === "domain_chart"
  );
  if (!domainChartAttempt) {
    throw new Error(`Missing domain_chart carrier attempt for ${carrierEndpoint.id}`);
  }
  if (domainChartAttempt.source_ref !== componentEndpoint.domain_symbol) {
    throw new Error(`Domain-chart source ref mismatch for ${carrierEndpoint.id}`);
  }
  if (domainChartAttempt.carrier_field_source_candidate_declared !== true) {
    throw new Error(`Domain-chart source candidate absent for ${carrierEndpoint.id}`);
  }
  const pairs = [
    ["id", "id"],
    ["endpoint_functional_id", "endpoint_functional_id"],
    ["role", "role"],
    ["domain_symbol", "domain_symbol"],
    ["chart_symbol", "chart_symbol"],
    ["basis_symbol", "basis_symbol"],
  ];
  for (const [left, right] of pairs) {
    if (carrierEndpoint[left] !== componentEndpoint[right]) {
      throw new Error(`Endpoint compatibility mismatch for ${carrierEndpoint.id}: ${left}/${right}`);
    }
  }
  const fields = componentEndpoint.required_fields_present || {};
  for (const field of REQUIRED_COMPONENT_DOMAIN_FIELDS) {
    if (fields[field] !== true) {
      throw new Error(`Missing component-domain field ${field} for endpoint ${carrierEndpoint.id}`);
    }
  }
}

function assertRowCompatibility(carrierRow, componentRow) {
  const pairs = [
    ["row_id", "row_id"],
    ["source_variable", "source_variable"],
    ["receiver_variable", "receiver_variable"],
    ["failed_side", "failed_side"],
    ["boundary_side", "boundary_side"],
  ];
  for (const [left, right] of pairs) {
    if (carrierRow[left] !== componentRow[right]) {
      throw new Error(`Row compatibility mismatch for ${carrierRow.row_id}: ${left}/${right}`);
    }
  }
  const fields = componentRow.required_fields_present || {};
  if (
    fields.source_component_domain_subcertificate_constructed !== true ||
    fields.receiver_component_domain_subcertificate_constructed !== true ||
    fields.combined_component_domain_pair_constructed !== true
  ) {
    throw new Error(`Missing component-domain row pair for ${carrierRow.row_id}`);
  }
}

function buildCarrierFieldAttempts(endpoint) {
  return endpoint.carrier_field_construction_attempts.map((attempt) => {
    if (attempt.carrier_field !== "domain_chart") {
      return {
        ...attempt,
        carrier_field_constructed: false,
        construction_status: "blocked-after-domain-chart-carrier-subfield",
      };
    }
    return {
      ...attempt,
      carrier_field_constructed: true,
      construction_status: "constructed-from-component-domain-subcertificate",
      missing_dependencies: [],
      failure_codes: [],
    };
  });
}

function buildEndpointAttempt(carrierEndpoint, componentEndpoint) {
  assertEndpointCompatibility(carrierEndpoint, componentEndpoint);
  const fields = {
    ...carrierEndpoint.required_fields_present,
    domain_chart_carrier_subfield_constructed: true,
    witness_object_has_domain_chart: true,
  };
  for (const field of ENDPOINT_FALSE_FIELDS) {
    fields[field] = false;
  }
  const carrierFieldAttempts = buildCarrierFieldAttempts(carrierEndpoint);
  return {
    id: carrierEndpoint.id,
    endpoint_functional_id: carrierEndpoint.endpoint_functional_id,
    role: carrierEndpoint.role,
    domain_chart_carrier_subfield_id: `domain_chart_carrier_subfield:${carrierEndpoint.id}`,
    carrier_field_construction_attempt_id: carrierEndpoint.carrier_field_construction_attempt_id,
    carrier_field_obligation_id: carrierEndpoint.carrier_field_obligation_id,
    witness_object_attempt_id: carrierEndpoint.witness_object_attempt_id,
    domain_symbol: carrierEndpoint.domain_symbol,
    chart_symbol: carrierEndpoint.chart_symbol,
    basis_symbol: carrierEndpoint.basis_symbol,
    witness_object_symbol: carrierEndpoint.witness_object_symbol,
    component_domain_subcertificate_ready: componentEndpoint.component_domain_subcertificate_ready === true,
    domain_chart_carrier_payload: {
      domain_symbol: componentEndpoint.domain_symbol,
      chart_symbol: componentEndpoint.chart_symbol,
      basis_symbol: componentEndpoint.basis_symbol,
      evaluation_map_symbol: componentEndpoint.evaluation_map_symbol,
      support_interval_ids: componentEndpoint.support_interval_ids,
      support_union_kind: componentEndpoint.support_union_kind,
      component_union_chart: componentEndpoint.component_union_chart,
      support_components: componentEndpoint.support_components,
      target_endpoint_refs: componentEndpoint.target_endpoint_refs,
    },
    carrier_field_construction_attempts: carrierFieldAttempts,
    carrier_field_source_candidate_count: carrierEndpoint.carrier_field_source_candidate_count,
    carrier_field_constructed_count: 1,
    required_fields_present: fields,
    domain_chart_carrier_subfield_constructed: true,
    all_carrier_fields_constructed: false,
    endpoint_boundary_binding_witness_object_constructed: false,
    missing_carrier_fields: CARRIER_FIELDS.filter((field) => field !== "domain_chart"),
    obstruction:
      "The domain-chart carrier subfield is constructed from the component-domain subcertificate, but the witness object still lacks endpoint boundary-binding, value-binding, contract, certificate, motion/evaluation, artifact, topology, and replay carriers.",
  };
}

function rowFields(sourceEndpoint, receiverEndpoint) {
  return {
    combined_witness_object_carrier_field_obligation_pair_declared: true,
    source_domain_chart_carrier_subfield_constructed:
      sourceEndpoint.domain_chart_carrier_subfield_constructed === true,
    receiver_domain_chart_carrier_subfield_constructed:
      receiverEndpoint.domain_chart_carrier_subfield_constructed === true,
    combined_domain_chart_carrier_subfield_pair_constructed:
      sourceEndpoint.domain_chart_carrier_subfield_constructed === true &&
      receiverEndpoint.domain_chart_carrier_subfield_constructed === true,
    source_all_carrier_fields_constructed: false,
    receiver_all_carrier_fields_constructed: false,
    combined_all_carrier_fields_constructed: false,
    combined_endpoint_boundary_binding_witness_object_pair_constructed: false,
    combined_boundary_binding_pair_constructed: false,
    combined_binding_contract_pair_satisfied: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    source_endpoint_residual_formula_present: false,
    receiver_endpoint_residual_formula_present: false,
    source_endpoint_residual_function_on_box_constructed: false,
    receiver_endpoint_residual_function_on_box_constructed: false,
    residual_function_on_box_source_layer_ready: false,
    preledger_pass: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
}

function buildRowAttempt(carrierRow, componentRow, endpointById) {
  assertRowCompatibility(carrierRow, componentRow);
  const sourceEndpoint = requireMapped(
    endpointById,
    carrierRow.source_variable,
    `source domain-chart carrier subfield for ${carrierRow.row_id}`
  );
  const receiverEndpoint = requireMapped(
    endpointById,
    carrierRow.receiver_variable,
    `receiver domain-chart carrier subfield for ${carrierRow.row_id}`
  );
  const fields = rowFields(sourceEndpoint, receiverEndpoint);
  return {
    row_id: carrierRow.row_id,
    cover_id: carrierRow.cover_id,
    ledger: carrierRow.ledger,
    source_interval: carrierRow.source_interval,
    receiver_interval: carrierRow.receiver_interval,
    failed_side: carrierRow.failed_side,
    boundary_side: carrierRow.boundary_side,
    source_variable: carrierRow.source_variable,
    receiver_variable: carrierRow.receiver_variable,
    source_domain_chart_carrier_subfield_id: sourceEndpoint.domain_chart_carrier_subfield_id,
    receiver_domain_chart_carrier_subfield_id: receiverEndpoint.domain_chart_carrier_subfield_id,
    source_carrier_field_constructed_count: sourceEndpoint.carrier_field_constructed_count,
    receiver_carrier_field_constructed_count: receiverEndpoint.carrier_field_constructed_count,
    candidate_lambda_interval: carrierRow.candidate_lambda_interval,
    sampled_endpoint_data: carrierRow.sampled_endpoint_data,
    sampled_boundary_values: carrierRow.sampled_boundary_values,
    residual_consumer_targets: carrierRow.residual_consumer_targets,
    required_fields_present: fields,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source and receiver domain-chart carrier subfields, but it still lacks complete carrier pairs, boundary-binding pairs, residual functions on boxes, preledger pass, and row consumption.",
  };
}

function buildPacket(source, sourcePath, componentDomain, componentDomainPath) {
  assertInput(source, componentDomain);
  const componentEndpointById = idMap(
    componentDomain.endpoint_component_union_domain_binding_subcertificates,
    "id",
    "component-domain endpoint"
  );
  const endpointAttempts = source.endpoint_witness_object_carrier_field_construction_attempts.map(
    (endpoint) => buildEndpointAttempt(endpoint, requireMapped(componentEndpointById, endpoint.id, "component endpoint"))
  );
  const endpointById = idMap(endpointAttempts, "id", "domain-chart carrier endpoint");
  const componentRowById = idMap(
    componentDomain.row_component_union_domain_binding_subcertificates,
    "row_id",
    "component-domain row"
  );
  const rowAttempts = source.row_witness_object_carrier_field_construction_attempts.map((row) =>
    buildRowAttempt(row, requireMapped(componentRowById, row.row_id, "component-domain row"), endpointById)
  );
  const endpointFieldCounts = {
    domain_chart_carrier_subfield_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.domain_chart_carrier_subfield_constructed
    ),
    witness_object_has_domain_chart: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.witness_object_has_domain_chart
    ),
    all_carrier_fields_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.all_carrier_fields_constructed
    ),
    endpoint_boundary_binding_witness_object_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_boundary_binding_witness_object_constructed
    ),
    endpoint_boundary_binding_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_boundary_binding_constructed
    ),
    endpoint_value_bound_to_boundary_binding: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding
    ),
    binding_contract_satisfied: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.binding_contract_satisfied
    ),
    endpoint_motion_rule_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_motion_rule_constructed
    ),
    endpoint_evaluation_map_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_evaluation_map_constructed
    ),
  };
  const rowFieldCounts = Object.fromEntries(
    ROW_FIELDS.map((field) => [field, countTrue(rowAttempts, (row) => row.required_fields_present[field])])
  );
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-domain-chart-carrier-subfield-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Same-Packet Endpoint Boundary-Binding Witness-Object Domain-Chart Carrier Subfield Construction Attempt",
    claim_level:
      "priority-only partial-positive domain-chart carrier subfield construction; domain-chart carriers are present, but all other carrier fields and row consumers remain absent",
    source_artifacts: {
      carrier_field_construction_attempt: artifactRecord(sourcePath),
      component_domain_subcertificate: artifactRecord(componentDomainPath),
      inherited_source_artifacts: source.source_artifacts,
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      domain_chart_carrier_subfield_constructed: true,
      all_carrier_fields_constructed: false,
      endpoint_boundary_binding_witness_object_constructed: false,
      endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      residual_function_on_box_source_layer_ready: false,
      preledger_pass: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    domain_chart_carrier_rule:
      "The component-domain subcertificate may construct only the domain-chart carrier subfield: domain symbol, chart symbol, coordinate rule, support union, basis binding, and endpoint-local component formulas. It does not construct endpoint boundary-binding references, endpoint value-binding maps, binding-contract links, algebraic certificate references, motion/evaluation references, artifact/topology/replay references, a complete witness object, or row-consumable residual data.",
    no_promotion_rule:
      "A domain-chart carrier subfield does not authorize candidate artifacts, topology recertification, proof-interval replay, preledger pass, live-ledger update, branch-chart authorization, or row consumption.",
    carrier_fields: CARRIER_FIELDS,
    endpoint_witness_object_domain_chart_carrier_subfield_construction_attempts: endpointAttempts,
    row_witness_object_domain_chart_carrier_subfield_construction_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      endpoint_domain_chart_carrier_subfields_constructed:
        endpointFieldCounts.domain_chart_carrier_subfield_constructed,
      endpoint_domain_chart_carriers: endpointFieldCounts.witness_object_has_domain_chart,
      endpoint_carrier_fields_constructed: endpointAttempts.reduce(
        (sum, endpoint) => sum + endpoint.carrier_field_constructed_count,
        0
      ),
      endpoint_carrier_field_slots: endpointAttempts.length * CARRIER_FIELDS.length,
      endpoint_remaining_carrier_field_slots:
        endpointAttempts.length * (CARRIER_FIELDS.length - 1),
      endpoint_all_carrier_fields_constructed:
        endpointFieldCounts.all_carrier_fields_constructed,
      endpoint_witness_object_carriers:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_constructed,
      proof_grade_endpoint_boundary_bindings:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      endpoint_value_bindings:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contracts_satisfied: endpointFieldCounts.binding_contract_satisfied,
      endpoint_motion_rules: endpointFieldCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_maps: endpointFieldCounts.endpoint_evaluation_map_constructed,
      row_domain_chart_carrier_pairs:
        rowFieldCounts.combined_domain_chart_carrier_subfield_pair_constructed,
      row_carrier_complete_pairs:
        rowFieldCounts.combined_all_carrier_fields_constructed,
      row_residual_function_source_layer_ready:
        rowFieldCounts.residual_function_on_box_source_layer_ready,
      preledger_pass_rows: rowFieldCounts.preledger_pass,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    capture_decision:
      "Priority-only. This packet constructs the domain-chart carrier subfield from the component-domain subcertificate, but constructs no complete same-packet witness objects and consumes no rows.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .filter(([_label, artifact]) => artifact?.basename && artifact?.sha256)
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.witness_object_has_domain_chart} | ${endpoint.carrier_field_constructed_count} | ${endpoint.required_fields_present.all_carrier_fields_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_witness_object_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_domain_chart_carrier_subfield_pair_constructed} | ${row.required_fields_present.combined_all_carrier_fields_constructed} | ${row.required_fields_present.residual_function_on_box_source_layer_ready} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Same-Packet Endpoint Boundary-Binding Witness-Object Domain-Chart Carrier Subfield Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet constructs the narrow domain-chart carrier subfield
from the already-positive component-domain subcertificate. It records ${summary.endpoint_domain_chart_carrier_subfields_constructed} / ${summary.endpoint_functionals} endpoint domain-chart carrier subfields and ${summary.row_domain_chart_carrier_pairs} / ${summary.residual_consumer_rows} row source/receiver domain-chart carrier pairs.

The packet keeps ${summary.endpoint_carrier_fields_constructed} / ${summary.endpoint_carrier_field_slots} endpoint carrier fields constructed
overall: the only constructed carrier field is \`domain_chart\`. It leaves
${summary.endpoint_remaining_carrier_field_slots} non-domain carrier fields,
${summary.endpoint_functionals} complete witness-object carriers,
${summary.endpoint_functionals} proof-grade endpoint boundary bindings,
${summary.endpoint_functionals} endpoint value bindings,
${summary.endpoint_functionals} binding contracts,
${summary.endpoint_functionals} endpoint motion rules,
${summary.endpoint_functionals} endpoint evaluation maps, and
${summary.residual_consumer_rows} row residual-function source layers absent.
It consumes 0 rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## Domain-Chart Carrier Rule

${packet.domain_chart_carrier_rule}

${packet.no_promotion_rule}

## Endpoint Domain-Chart Carrier Subfields

| Endpoint | Role | Domain-chart carrier | Carrier fields constructed | All carrier fields | Witness object |
| --- | --- | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_witness_object_domain_chart_carrier_subfield_construction_attempts)}

## Row Consumer Attempts

| Row | Failed side | Domain-chart carrier pair | Carrier-complete pair | Residual source ready | Consumed |
| --- | --- | ---: | ---: | ---: | ---: |
${rowTable(packet.row_witness_object_domain_chart_carrier_subfield_construction_attempts)}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.row_field_counts, summary.residual_consumer_rows)}

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
  const source = readJson(args.carrierFieldConstructionAttempt);
  const componentDomain = readJson(args.componentDomainSubcertificate);
  const packet = buildPacket(
    source,
    args.carrierFieldConstructionAttempt,
    componentDomain,
    args.componentDomainSubcertificate
  );
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

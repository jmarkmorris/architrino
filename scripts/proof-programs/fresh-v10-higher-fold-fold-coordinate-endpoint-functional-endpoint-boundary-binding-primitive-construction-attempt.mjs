#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_PRIMITIVE_DEPENDENCY_CERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_primitive_dependency_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON = `fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-full-endpoint-boundary-binding-primitive-dependency-certificate-fail-closed-first-primitive-endpoint-boundary-binding-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-construction-attempt-fail-closed-prerequisite-payload-ready-proof-grade-primitive-rule-and-witness-record-absent-no-row-consumption";

const POSITIVE_INPUT_FIELDS = [
  "primitive_construction_target_declared",
  "primitive_dependency_chain_ready",
  "domain_chart_carrier_subfield_constructed",
  "target_endpoint_boundary_binding_object_constructed",
  "full_endpoint_boundary_binding_contract_target_declared",
  "full_endpoint_boundary_binding_construction_input_ready",
  "target_endpoint_ref_value_pairs_present",
  "endpoint_value_binding_source_equation_declared",
  "endpoint_value_binding_source_layer_ready",
  "endpoint_boundary_binding_witness_input_ready",
  "endpoint_boundary_binding_witness_object_construction_input_ready",
  "non_domain_carrier_obstruction_present",
];

const PROOF_GRADE_PRIMITIVE_CRITERIA = [
  "primitive_construction_rule_applied",
  "primitive_binding_witness_record_constructed",
  "primitive_domain_chart_attachment_certified",
  "primitive_target_ref_value_attachment_certified",
  "endpoint_boundary_binding_constructed",
  "full_endpoint_boundary_binding_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
];

const DOWNSTREAM_FIELDS = [
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "endpoint_boundary_binding_witness_constructed",
  "endpoint_boundary_binding_witness_object_constructed",
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
  ...POSITIVE_INPUT_FIELDS,
  "primitive_payload_target_ready",
  ...PROOF_GRADE_PRIMITIVE_CRITERIA,
  "endpoint_boundary_binding_ref_carrier_unblocked",
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_primitive_payload_target_ready",
  "receiver_primitive_payload_target_ready",
  "combined_primitive_payload_target_pair_ready",
  "source_endpoint_boundary_binding_primitive_constructed",
  "receiver_endpoint_boundary_binding_primitive_constructed",
  "combined_endpoint_boundary_binding_primitive_pair_constructed",
  "source_endpoint_boundary_binding_ref_carrier_unblocked",
  "receiver_endpoint_boundary_binding_ref_carrier_unblocked",
  "combined_endpoint_boundary_binding_ref_carrier_pair_unblocked",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "combined_endpoint_evaluation_map_pair_constructed",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "dependency_target_as_primitive_payload_target",
    description:
      "Assemble the dependency certificate's minimal live construction target as a primitive payload target from the domain-chart carrier, target object, contract target, value-source equations, and witness-input layer.",
    required_fields: POSITIVE_INPUT_FIELDS,
    output_kind: "payload-target-only",
  },
  {
    method_id: "primitive_payload_target_as_proof_grade_endpoint_boundary_binding",
    description:
      "Test whether the payload target also supplies the proof-grade endpoint boundary-binding primitive itself.",
    required_fields: [
      "primitive_payload_target_ready",
      "primitive_construction_rule_applied",
      "primitive_binding_witness_record_constructed",
      "primitive_domain_chart_attachment_certified",
      "primitive_target_ref_value_attachment_certified",
      "endpoint_boundary_binding_constructed",
      "full_endpoint_boundary_binding_constructed",
    ],
    output_kind: "proof-grade-primitive",
  },
  {
    method_id: "proof_grade_primitive_as_endpoint_boundary_binding_ref_carrier",
    description:
      "Test whether the constructed primitive admits the first non-domain endpoint-boundary-binding reference carrier in the witness object.",
    required_fields: [
      "endpoint_boundary_binding_constructed",
      "full_endpoint_boundary_binding_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
      "endpoint_boundary_binding_ref_carrier_unblocked",
    ],
    output_kind: "carrier-admission",
  },
];

function parseArgs(argv) {
  const args = {
    primitiveDependencyCertificate: DEFAULT_PRIMITIVE_DEPENDENCY_CERTIFICATE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--primitive-dependency-certificate") {
      args.primitiveDependencyCertificate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-construction-attempt.mjs [options]

Options:
  --primitive-dependency-certificate PATH  Full endpoint boundary-binding primitive dependency certificate JSON.
  --out-dir PATH                           Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                 Pretty-print JSON artifact.
  --help                                   Show this help.`);
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

function idMap(rows, label) {
  const map = new Map();
  for (const row of rows) {
    if (!row.id) {
      throw new Error(`Missing ${label} id.`);
    }
    if (map.has(row.id)) {
      throw new Error(`Duplicate ${label} id: ${row.id}`);
    }
    map.set(row.id, row);
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

function assertSource(source) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected primitive dependency packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected primitive dependency fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected primitive dependency status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger || source.row_closure) {
    throw new Error("Refusing primitive construction attempt from authorized or row-closed source packet.");
  }
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    output_kind: method.output_kind,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_endpoint_boundary_binding_primitive_${field}`),
    passed: missingFields.length === 0,
  };
}

function firstCarrierDependency(chain) {
  const carrier = chain.carrier_dependency_rows.find((row) => row.carrier_field === "endpoint_boundary_binding_ref");
  if (!carrier) {
    throw new Error(`Missing endpoint_boundary_binding_ref carrier dependency for ${chain.id}.`);
  }
  return carrier;
}

function endpointFields(chain) {
  const positives = chain.positive_prerequisites_present || {};
  const primitive = chain.primitive_fields_present || {};
  const firstCarrier = firstCarrierDependency(chain);
  const fields = {
    primitive_construction_target_declared: chain.minimal_live_construction_target?.primitive === "endpoint_boundary_binding_constructed",
    primitive_dependency_chain_ready: chain.positive_prerequisites_ready === true,
    domain_chart_carrier_subfield_constructed:
      positives.domain_chart_carrier_subfield_constructed === true,
    target_endpoint_boundary_binding_object_constructed:
      positives.target_endpoint_boundary_binding_object_constructed === true,
    full_endpoint_boundary_binding_contract_target_declared:
      positives.full_endpoint_boundary_binding_contract_target_declared === true,
    full_endpoint_boundary_binding_construction_input_ready:
      positives.full_endpoint_boundary_binding_construction_input_ready === true,
    target_endpoint_ref_value_pairs_present:
      positives.target_endpoint_ref_value_pairs_present === true && chain.target_endpoint_ref_value_count > 0,
    endpoint_value_binding_source_equation_declared:
      positives.endpoint_value_binding_source_equation_declared === true,
    endpoint_value_binding_source_layer_ready:
      positives.endpoint_value_binding_source_layer_ready === true,
    endpoint_boundary_binding_witness_input_ready:
      positives.endpoint_boundary_binding_witness_input_ready === true,
    endpoint_boundary_binding_witness_object_construction_input_ready:
      positives.endpoint_boundary_binding_witness_object_construction_input_ready === true,
    non_domain_carrier_obstruction_present:
      positives.non_domain_carrier_obstruction_present === true,
    primitive_construction_rule_applied: false,
    primitive_binding_witness_record_constructed: false,
    primitive_domain_chart_attachment_certified: false,
    primitive_target_ref_value_attachment_certified: false,
    endpoint_boundary_binding_constructed:
      primitive.endpoint_boundary_binding_constructed === true,
    full_endpoint_boundary_binding_constructed:
      primitive.full_endpoint_boundary_binding_constructed === true,
    witness_object_has_endpoint_boundary_binding_ref:
      firstCarrier.missing_direct_fields.includes("witness_object_has_endpoint_boundary_binding_ref") === false &&
      firstCarrier.carrier_unblocked === true,
    endpoint_boundary_binding_ref_carrier_unblocked:
      chain.first_non_domain_carrier_unblocked === true,
  };
  fields.primitive_payload_target_ready = POSITIVE_INPUT_FIELDS.every((field) => fields[field] === true);
  for (const field of DOWNSTREAM_FIELDS) {
    fields[field] = primitive[field] === true;
  }
  return fields;
}

function buildEndpointAttempt(chain) {
  const fields = endpointFields(chain);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const missingCriteria = PROOF_GRADE_PRIMITIVE_CRITERIA.filter((field) => fields[field] !== true);
  const payloadTargetReady = fields.primitive_payload_target_ready === true;
  const proofGradePrimitiveConstructed = missingCriteria.length === 0;
  return {
    id: chain.id,
    endpoint_functional_id: chain.endpoint_functional_id,
    role: chain.role,
    primitive_construction_attempt_id: `endpoint_boundary_binding_primitive_construction_attempt:${chain.id}`,
    primitive_payload_target_id: chain.minimal_live_construction_target.target_id,
    source_target_endpoint_boundary_binding_object_id: chain.target_endpoint_boundary_binding_object_id,
    source_contract_target_id: chain.full_endpoint_boundary_binding_contract_target_id,
    source_endpoint_value_binding_source_id: chain.endpoint_value_binding_source_id,
    source_witness_attempt_id: chain.endpoint_boundary_binding_witness_attempt_id,
    source_witness_object_attempt_id: chain.endpoint_boundary_binding_witness_object_attempt_id,
    domain_chart_carrier_subfield_id: chain.domain_chart_carrier_subfield_id,
    binding_symbol: chain.binding_symbol,
    witness_object_symbol: chain.witness_object_symbol,
    domain_symbol: chain.domain_symbol,
    chart_symbol: chain.chart_symbol,
    basis_symbol: chain.basis_symbol,
    target_endpoint_ref_value_count: chain.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations:
      chain.minimal_live_construction_target.target_endpoint_value_binding_source_equations,
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    primitive_payload_target_ready: payloadTargetReady,
    proof_grade_endpoint_boundary_binding_primitive_constructed: proofGradePrimitiveConstructed,
    first_missing_proof_grade_criterion: proofGradePrimitiveConstructed ? null : missingCriteria[0],
    missing_proof_grade_criteria: missingCriteria,
    first_non_domain_carrier_target: chain.first_non_domain_carrier_target,
    first_non_domain_carrier_unblocked: fields.endpoint_boundary_binding_ref_carrier_unblocked,
    downstream_fields_missing: DOWNSTREAM_FIELDS.filter((field) => fields[field] !== true),
    failure_codes: missingCriteria.map(
      (field) => `endpoint_boundary_binding_primitive_construction_retains_blocker_${field}`
    ),
    obstruction:
      "The primitive payload target is ready, but no same-packet construction rule is applied to produce a proof-grade endpoint boundary-binding primitive, no primitive binding witness record certifies the domain-chart attachment and target ref/value attachment, and the witness object still lacks the endpoint-boundary-binding reference carrier.",
  };
}

function buildRowAttempt(row, endpointById) {
  const sourceEndpoint = requireMapped(endpointById, row.source_variable, `source endpoint for ${row.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, row.receiver_variable, `receiver endpoint for ${row.row_id}`);
  const fields = {
    row_locator_resolved: row.required_fields_present.row_locator_resolved === true,
    source_primitive_payload_target_ready: sourceEndpoint.primitive_payload_target_ready === true,
    receiver_primitive_payload_target_ready: receiverEndpoint.primitive_payload_target_ready === true,
    combined_primitive_payload_target_pair_ready:
      sourceEndpoint.primitive_payload_target_ready === true &&
      receiverEndpoint.primitive_payload_target_ready === true,
    source_endpoint_boundary_binding_primitive_constructed:
      sourceEndpoint.proof_grade_endpoint_boundary_binding_primitive_constructed === true,
    receiver_endpoint_boundary_binding_primitive_constructed:
      receiverEndpoint.proof_grade_endpoint_boundary_binding_primitive_constructed === true,
    combined_endpoint_boundary_binding_primitive_pair_constructed: false,
    source_endpoint_boundary_binding_ref_carrier_unblocked:
      sourceEndpoint.first_non_domain_carrier_unblocked === true,
    receiver_endpoint_boundary_binding_ref_carrier_unblocked:
      receiverEndpoint.first_non_domain_carrier_unblocked === true,
    combined_endpoint_boundary_binding_ref_carrier_pair_unblocked: false,
    source_endpoint_value_bound_to_boundary_binding:
      sourceEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    receiver_endpoint_value_bound_to_boundary_binding:
      receiverEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    combined_binding_contract_pair_satisfied: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_primitive_payload_target_id: sourceEndpoint.primitive_payload_target_id,
    receiver_primitive_payload_target_id: receiverEndpoint.primitive_payload_target_id,
    source_first_missing_proof_grade_criterion:
      sourceEndpoint.first_missing_proof_grade_criterion,
    receiver_first_missing_proof_grade_criterion:
      receiverEndpoint.first_missing_proof_grade_criterion,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver primitive payload targets, but neither side has a proof-grade endpoint boundary-binding primitive or endpoint-boundary-binding reference carrier. No value-binding pair, contract pair, motion/evaluation pair, residual data, replay, row consumption, or branch-chart authorization follows.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function buildPacket(source, sourcePath) {
  assertSource(source);
  const endpointAttempts = source.endpoint_primitive_dependency_chains.map(buildEndpointAttempt);
  const endpointById = idMap(endpointAttempts, "endpoint boundary-binding primitive construction attempt");
  const rowAttempts = source.row_primitive_dependency_certificates.map((row) => buildRowAttempt(row, endpointById));
  const endpointFieldCounts = fieldCounts(
    endpointAttempts,
    ENDPOINT_FIELDS,
    (endpoint, field) => endpoint.required_fields_present[field]
  );
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS, (row, field) => row.required_fields_present[field]);
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Endpoint Boundary-Binding Primitive Construction Attempt",
    claim_level:
      "priority-only construction attempt; primitive payload targets are ready, but the applied construction rule, primitive binding witness record, carrier attachment certificate, target ref/value attachment certificate, and endpoint-boundary-binding reference carrier are absent",
    source_artifacts: {
      primitive_dependency_certificate: artifactRecord(sourcePath),
      inherited_source_artifacts: source.source_artifacts,
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    row_closure: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      primitive_payload_targets_ready: true,
      proof_grade_endpoint_boundary_binding_primitive_constructed: false,
      endpoint_boundary_binding_ref_carriers_unblocked: false,
      endpoint_value_bindings_constructed: false,
      binding_contracts_satisfied: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    primitive_payload_rule:
      "The dependency certificate's minimal live construction target may be assembled as a primitive payload target. A payload target records the domain-chart carrier, target object, binding symbol, and target endpoint ref/value source equations. It is not a proof-grade endpoint boundary-binding primitive.",
    proof_grade_primitive_criterion:
      "A proof-grade endpoint boundary-binding primitive requires an applied same-packet construction rule, a distinct primitive binding witness record, a certified attachment to the domain-chart carrier subfield, a certified attachment to all target endpoint refs/values, the constructed endpoint boundary binding/full endpoint boundary binding fields, and the witness-object endpoint-boundary-binding reference carrier.",
    no_promotion_rule:
      "Target endpoint boundary-binding objects, contract targets, value-source equations, witness inputs, carrier source candidates, and domain-chart carriers remain prerequisites. This packet may not rename any of them as endpoint boundary bindings without the proof-grade primitive criterion passing.",
    construction_methods: CONSTRUCTION_METHODS,
    positive_input_fields: POSITIVE_INPUT_FIELDS,
    proof_grade_primitive_criteria: PROOF_GRADE_PRIMITIVE_CRITERIA,
    downstream_fields: DOWNSTREAM_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_boundary_binding_primitive_construction_attempts: endpointAttempts,
    row_endpoint_boundary_binding_primitive_construction_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      primitive_construction_targets_declared:
        endpointFieldCounts.primitive_construction_target_declared,
      primitive_dependency_chains_ready:
        endpointFieldCounts.primitive_dependency_chain_ready,
      primitive_payload_targets_ready:
        endpointFieldCounts.primitive_payload_target_ready,
      primitive_construction_rules_applied:
        endpointFieldCounts.primitive_construction_rule_applied,
      primitive_binding_witness_records_constructed:
        endpointFieldCounts.primitive_binding_witness_record_constructed,
      primitive_domain_chart_attachments_certified:
        endpointFieldCounts.primitive_domain_chart_attachment_certified,
      primitive_target_ref_value_attachments_certified:
        endpointFieldCounts.primitive_target_ref_value_attachment_certified,
      endpoint_boundary_binding_primitives_constructed:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_bindings_constructed:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      row_primitive_payload_target_pairs_ready:
        rowFieldCounts.combined_primitive_payload_target_pair_ready,
      row_endpoint_boundary_binding_primitive_pairs_constructed:
        rowFieldCounts.combined_endpoint_boundary_binding_primitive_pair_constructed,
      row_endpoint_boundary_binding_ref_carrier_pairs_unblocked:
        rowFieldCounts.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked,
      row_residual_data_ready:
        rowFieldCounts.residual_data_construction_ready,
      rows_unblocked:
        rowFieldCounts.row_unblocked,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    capture_decision:
      "Priority-only. This packet constructs 4 / 4 primitive payload targets but 0 / 4 proof-grade endpoint boundary-binding primitives, 0 / 4 endpoint-boundary-binding reference carriers, and 0 / 3 row-consumable primitive pairs. The next closure packet must supply an applied same-packet primitive construction rule plus a primitive binding witness record that certifies the domain-chart attachment and target ref/value attachment.",
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

function methodTable(methods) {
  return methods
    .map(
      (method) =>
        `| \`${method.method_id}\` | \`${method.output_kind}\` | ${method.required_fields.length} | ${method.description} |`
    )
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.primitive_payload_target_ready} | \`${endpoint.first_missing_proof_grade_criterion}\` | ${endpoint.proof_grade_endpoint_boundary_binding_primitive_constructed} | ${endpoint.first_non_domain_carrier_unblocked} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_primitive_payload_target_pair_ready} | ${row.required_fields_present.combined_endpoint_boundary_binding_primitive_pair_constructed} | ${row.required_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Endpoint Boundary-Binding Primitive Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet attempts the first endpoint boundary-binding
primitive after the primitive dependency certificate. It constructs
${summary.primitive_payload_targets_ready} / ${summary.endpoint_functionals}
primitive payload targets from the domain-chart carriers, target endpoint
boundary-binding objects, contract targets, value-source equations, and
witness-input layers. It constructs 0 /
${summary.endpoint_functionals} proof-grade endpoint boundary-binding
primitives, unblocks 0 /
${summary.endpoint_functionals} endpoint-boundary-binding reference carriers,
and consumes 0 rows.

The construction fails closed at the proof-grade primitive criterion. The
missing first criterion is \`primitive_construction_rule_applied\` for every
endpoint. The source stack supplies target data, not an applied same-packet
construction rule, primitive binding witness record, certified domain-chart
attachment, certified target ref/value attachment, or witness-object
endpoint-boundary-binding reference carrier.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## Primitive Payload Rule

${packet.primitive_payload_rule}

## Proof-Grade Primitive Criterion

${packet.proof_grade_primitive_criterion}

${packet.no_promotion_rule}

## Construction Methods

| Method | Output kind | Required fields | Description |
| --- | --- | ---: | --- |
${methodTable(packet.construction_methods)}

## Endpoint Construction Attempts

| Endpoint | Role | Payload target ready | First missing criterion | Primitive constructed | First carrier unblocked |
| --- | --- | ---: | --- | ---: | ---: |
${endpointTable(packet.endpoint_boundary_binding_primitive_construction_attempts)}

## Row Construction Attempts

| Row | Failed side | Payload pair ready | Primitive pair | Ref-carrier pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: |
${rowTable(packet.row_endpoint_boundary_binding_primitive_construction_attempts)}

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
  const source = readJson(args.primitiveDependencyCertificate);
  const packet = buildPacket(source, args.primitiveDependencyCertificate);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

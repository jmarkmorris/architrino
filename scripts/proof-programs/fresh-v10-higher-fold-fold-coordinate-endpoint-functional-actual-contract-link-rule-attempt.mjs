#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_SOURCE_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_witness_object_contract_link_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_actual_contract_link_rule_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_actual_contract_link_rule_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-witness-object-contract-link-construction-attempt-fail-closed-contract-link-source-candidates-present-witness-object-contract-links-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-contract-link-rule-attempt-fail-closed-source-candidates-present-rule-obligations-unsatisfied-witness-object-contract-links-absent-no-row-consumption";

const SOURCE_CANDIDATE_INTEGRITY_FIELDS = [
  "witness_object_contract_link_input_ready",
  "witness_object_contract_link_source_candidate_declared",
  "witness_object_contract_link_source_candidate_targets_contract_target",
  "witness_object_contract_link_source_candidate_targets_endpoint_value_binding_map",
  "witness_object_contract_link_source_candidate_targets_endpoint_boundary_binding_ref",
  "witness_object_contract_link_source_candidate_targets_witness_object_attempt",
  "witness_object_contract_link_source_candidate_value_equations_attached",
  "witness_object_contract_link_source_candidate_recorded",
];

const SOURCE_CANDIDATE_ID_FIELDS = [
  "source_candidate_id_present",
  "contract_target_id_present",
  "endpoint_value_binding_map_id_present",
  "witness_object_endpoint_boundary_binding_ref_id_present",
  "source_witness_object_attempt_id_present",
  "first_endpoint_boundary_binding_primitive_id_present",
  "target_endpoint_value_binding_source_equations_present",
];

const ACTUAL_RULE_OBLIGATION_FIELDS = [
  "actual_contract_link_rule_available",
  "witness_object_membership_proof_present",
  "contract_target_satisfaction_proof_present",
  "target_ref_value_equations_proof_grade",
  "endpoint_boundary_binding_ref_compatibility_proof_present",
  "first_primitive_compatibility_proof_present",
  "carrier_admission_bridge_present",
  "motion_evaluation_bridge_present",
  "algebraic_certificate_bridge_present",
  "candidate_replay_bridge_present",
];

const ACTUAL_RULE_OUTPUT_FIELDS = [
  "actual_contract_link_rule_attempt_applied",
  "actual_contract_link_rule_obligations_satisfied",
  "witness_object_contract_link_constructed",
  "witness_object_has_contract_link",
  "binding_contract_satisfied",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_CANDIDATE_INTEGRITY_FIELDS,
  ...SOURCE_CANDIDATE_ID_FIELDS,
  ...ACTUAL_RULE_OBLIGATION_FIELDS,
  ...ACTUAL_RULE_OUTPUT_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_witness_object_contract_link_source_candidate_recorded",
  "receiver_witness_object_contract_link_source_candidate_recorded",
  "combined_witness_object_contract_link_source_candidate_pair_recorded",
  "source_actual_contract_link_rule_attempt_applied",
  "receiver_actual_contract_link_rule_attempt_applied",
  "combined_actual_contract_link_rule_attempt_pair_applied",
  "source_actual_contract_link_rule_obligations_satisfied",
  "receiver_actual_contract_link_rule_obligations_satisfied",
  "combined_actual_contract_link_rule_obligations_satisfied",
  "source_witness_object_contract_link_constructed",
  "receiver_witness_object_contract_link_constructed",
  "combined_witness_object_contract_link_pair_constructed",
  "source_witness_object_has_contract_link",
  "receiver_witness_object_has_contract_link",
  "combined_witness_object_contract_link_pair_attached",
  "source_binding_contract_satisfied",
  "receiver_binding_contract_satisfied",
  "combined_binding_contract_pair_satisfied",
  "source_full_endpoint_boundary_binding_constructed",
  "receiver_full_endpoint_boundary_binding_constructed",
  "combined_full_endpoint_boundary_binding_pair_constructed",
  "source_endpoint_boundary_binding_ref_carrier_unblocked",
  "receiver_endpoint_boundary_binding_ref_carrier_unblocked",
  "combined_endpoint_boundary_binding_ref_carrier_pair_unblocked",
  "source_endpoint_value_binding_map_carrier_unblocked",
  "receiver_endpoint_value_binding_map_carrier_unblocked",
  "combined_endpoint_value_binding_map_carrier_pair_unblocked",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const RULE_OBLIGATIONS = [
  {
    obligation_id: "actual_contract_link_rule_available",
    description:
      "A declared proof rule must state when a witness object, contract target, endpoint value-binding map, endpoint-boundary-binding ref, first primitive, and target ref/value equations assemble into an actual witness-object contract link.",
    source_evidence: "absent",
  },
  {
    obligation_id: "witness_object_membership_proof_present",
    description:
      "The candidate must prove that the endpoint-boundary-binding ref and endpoint value-binding map are fields of the same constructed witness object rather than only adjacent referenced IDs.",
    source_evidence: "ids-only",
  },
  {
    obligation_id: "contract_target_satisfaction_proof_present",
    description:
      "The candidate must prove satisfaction of the inherited full endpoint boundary-binding contract target.",
    source_evidence: "contract-test-applied-contract-not-satisfied",
  },
  {
    obligation_id: "target_ref_value_equations_proof_grade",
    description:
      "Every target ref/value equation must be promoted beyond source-equation-only status into proof-grade contract-link evidence.",
    source_evidence: "source-equation-only",
  },
  {
    obligation_id: "endpoint_boundary_binding_ref_compatibility_proof_present",
    description:
      "The endpoint-boundary-binding ref must be certified compatible with the target endpoint boundary-binding object on the domain-chart carrier.",
    source_evidence: "ref-carrier-locked",
  },
  {
    obligation_id: "first_primitive_compatibility_proof_present",
    description:
      "The first endpoint boundary-binding primitive must be certified compatible with the value map and contract target.",
    source_evidence: "primitive-id-only",
  },
  {
    obligation_id: "carrier_admission_bridge_present",
    description:
      "The packet must bridge the actual link into endpoint-boundary-binding reference carrier and endpoint value-map carrier admission.",
    source_evidence: "carrier-admission-absent",
  },
  {
    obligation_id: "motion_evaluation_bridge_present",
    description:
      "The packet must connect the link to endpoint motion/evaluation maps, including full endpoint and global domain evaluation maps.",
    source_evidence: "motion-evaluation-absent",
  },
  {
    obligation_id: "algebraic_certificate_bridge_present",
    description:
      "The packet must supply non-target zero, exact screen zero, and rank certificates needed by full endpoint boundary binding.",
    source_evidence: "algebraic-certificates-absent",
  },
  {
    obligation_id: "candidate_replay_bridge_present",
    description:
      "The packet must supply candidate artifacts, topology recertification, and proof-interval replay before row consumption.",
    source_evidence: "replay-absent",
  },
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "source_candidate_integrity_check",
    output_kind: "source-candidate-integrity",
    description:
      "Check that the predecessor supplied a complete witness-object contract-link source candidate with all required ID attachments and target ref/value equations.",
    required_fields: [
      ...SOURCE_CANDIDATE_INTEGRITY_FIELDS,
      ...SOURCE_CANDIDATE_ID_FIELDS,
    ],
  },
  {
    method_id: "actual_contract_link_rule_obligation_check",
    output_kind: "actual-contract-link-rule",
    description:
      "Check whether the source candidate is supported by a proof-grade rule and every obligation needed to promote it into an actual witness-object contract link.",
    required_fields: [
      "actual_contract_link_rule_attempt_applied",
      ...ACTUAL_RULE_OBLIGATION_FIELDS,
      "actual_contract_link_rule_obligations_satisfied",
    ],
  },
  {
    method_id: "actual_contract_link_construction_check",
    output_kind: "witness-object-contract-link",
    description:
      "Check whether all actual-rule obligations construct and attach the witness-object contract link.",
    required_fields: [
      "actual_contract_link_rule_obligations_satisfied",
      "witness_object_contract_link_constructed",
      "witness_object_has_contract_link",
    ],
  },
  {
    method_id: "downstream_contract_and_carrier_admission_check",
    output_kind: "full-endpoint-boundary-binding",
    description:
      "Check whether the actual link unlocks binding contract satisfaction, full endpoint boundary binding, and both carrier admissions.",
    required_fields: [
      "witness_object_contract_link_constructed",
      "witness_object_has_contract_link",
      "binding_contract_satisfied",
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      "endpoint_value_binding_map_carrier_unblocked",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    sourcePacket: DEFAULT_SOURCE_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source-packet") {
      args.sourcePacket = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-actual-contract-link-rule-attempt.mjs [options]

Options:
  --source-packet PATH  Witness-object contract-link source-candidate packet JSON.
  --out-dir PATH        Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty              Pretty-print JSON artifact.
  --help                Show this help.`);
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
    throw new Error(`Unexpected source packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected source status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger || source.row_closure) {
    throw new Error("Refusing actual contract-link rule attempt from authorized or row-closed source packet.");
  }
}

function equationStatuses(endpoint) {
  const equations =
    endpoint.witness_object_contract_link_source_candidate?.target_endpoint_value_binding_source_equations ||
    endpoint.target_endpoint_value_binding_source_equations ||
    [];
  return equations.map((equation) => equation.proof_grade_binding_status || "missing-status");
}

function sourceFields(sourceEndpoint) {
  const inherited = sourceEndpoint.required_fields_present || {};
  const candidate = sourceEndpoint.witness_object_contract_link_source_candidate;
  const fields = {};
  for (const field of SOURCE_CANDIDATE_INTEGRITY_FIELDS) {
    fields[field] = inherited[field] === true;
  }
  fields.source_candidate_id_present = Boolean(candidate?.source_candidate_id);
  fields.contract_target_id_present = Boolean(candidate?.contract_target_id);
  fields.endpoint_value_binding_map_id_present = Boolean(candidate?.endpoint_value_binding_map_id);
  fields.witness_object_endpoint_boundary_binding_ref_id_present =
    Boolean(candidate?.witness_object_endpoint_boundary_binding_ref_id);
  fields.source_witness_object_attempt_id_present =
    Boolean(candidate?.source_witness_object_attempt_id);
  fields.first_endpoint_boundary_binding_primitive_id_present =
    Boolean(candidate?.first_endpoint_boundary_binding_primitive_id);
  fields.target_endpoint_value_binding_source_equations_present =
    Array.isArray(candidate?.target_endpoint_value_binding_source_equations) &&
    candidate.target_endpoint_value_binding_source_equations.length > 0;
  return fields;
}

function actualRuleFields(sourceEndpoint) {
  const fields = {};
  fields.actual_contract_link_rule_attempt_applied =
    sourceEndpoint.witness_object_contract_link_source_candidate_recorded === true;
  for (const field of ACTUAL_RULE_OBLIGATION_FIELDS) {
    fields[field] = false;
  }
  fields.actual_contract_link_rule_obligations_satisfied = false;
  fields.witness_object_contract_link_constructed = false;
  fields.witness_object_has_contract_link = false;
  fields.binding_contract_satisfied = false;
  fields.full_endpoint_boundary_binding_constructed = false;
  fields.endpoint_boundary_binding_ref_carrier_unblocked = false;
  fields.endpoint_value_binding_map_carrier_unblocked = false;
  return fields;
}

function methodResult(method, fields, prefix) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    output_kind: method.output_kind,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `${prefix}_${field}`),
    passed: missingFields.length === 0,
  };
}

function missingObligations(fields, statuses) {
  return RULE_OBLIGATIONS
    .filter((obligation) => fields[obligation.obligation_id] !== true)
    .map((obligation) => ({
      ...obligation,
      satisfied: false,
      observed_equation_statuses:
        obligation.obligation_id === "target_ref_value_equations_proof_grade"
          ? statuses
          : undefined,
    }));
}

function buildEndpointAttempt(sourceEndpoint) {
  const fields = {
    ...sourceFields(sourceEndpoint),
    ...actualRuleFields(sourceEndpoint),
  };
  const statuses = equationStatuses(sourceEndpoint);
  const methodResults = CONSTRUCTION_METHODS.map((method) =>
    methodResult(method, fields, "actual_contract_link_rule_missing")
  );
  const missing = missingObligations(fields, statuses);
  return {
    id: sourceEndpoint.id,
    endpoint_functional_id: sourceEndpoint.endpoint_functional_id,
    role: sourceEndpoint.role,
    actual_contract_link_rule_attempt_id:
      `actual_contract_link_rule_attempt:${sourceEndpoint.id}`,
    source_witness_object_contract_link_construction_attempt_id:
      sourceEndpoint.witness_object_contract_link_construction_attempt_id,
    source_candidate_id:
      sourceEndpoint.witness_object_contract_link_source_candidate?.source_candidate_id || null,
    source_contract_target_id: sourceEndpoint.source_contract_target_id,
    source_endpoint_value_binding_map_id: sourceEndpoint.source_endpoint_value_binding_map_id,
    witness_object_endpoint_boundary_binding_ref_id:
      sourceEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    source_witness_object_attempt_id: sourceEndpoint.source_witness_object_attempt_id,
    source_first_endpoint_boundary_binding_primitive_id:
      sourceEndpoint.source_first_endpoint_boundary_binding_primitive_id,
    binding_symbol: sourceEndpoint.binding_symbol,
    witness_object_symbol: sourceEndpoint.witness_object_symbol,
    target_endpoint_ref_value_count: sourceEndpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equation_statuses: statuses,
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    missing_actual_contract_link_obligations: missing,
    missing_actual_contract_link_obligation_count: missing.length,
    actual_contract_link_rule_attempt_applied:
      fields.actual_contract_link_rule_attempt_applied,
    actual_contract_link_rule_obligations_satisfied:
      fields.actual_contract_link_rule_obligations_satisfied,
    witness_object_contract_link: null,
    witness_object_contract_link_constructed:
      fields.witness_object_contract_link_constructed,
    witness_object_has_contract_link:
      fields.witness_object_has_contract_link,
    binding_contract_satisfied: fields.binding_contract_satisfied,
    full_endpoint_boundary_binding_constructed:
      fields.full_endpoint_boundary_binding_constructed,
    endpoint_boundary_binding_ref_carrier_unblocked:
      fields.endpoint_boundary_binding_ref_carrier_unblocked,
    endpoint_value_binding_map_carrier_unblocked:
      fields.endpoint_value_binding_map_carrier_unblocked,
    failure_codes: [
      ...missing.map((obligation) => `actual_contract_link_rule_locked_${obligation.obligation_id}`),
      "actual_contract_link_rule_locked_witness_object_contract_link_constructed",
      "actual_contract_link_rule_locked_witness_object_has_contract_link",
      "actual_contract_link_rule_locked_binding_contract_satisfied",
      "actual_contract_link_rule_locked_full_endpoint_boundary_binding_constructed",
      "actual_contract_link_rule_locked_endpoint_boundary_binding_ref_carrier_unblocked",
      "actual_contract_link_rule_locked_endpoint_value_binding_map_carrier_unblocked",
    ],
    obstruction:
      "The predecessor supplies a complete source candidate, but the actual contract-link rule and all proof-grade obligations needed to promote that candidate into a witness-object contract link remain absent.",
  };
}

function buildRowAttempt(row, endpointById) {
  const sourceEndpoint = requireMapped(endpointById, row.source_variable, `source endpoint for ${row.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, row.receiver_variable, `receiver endpoint for ${row.row_id}`);
  const fields = {
    row_locator_resolved: row.required_fields_present.row_locator_resolved === true,
    source_witness_object_contract_link_source_candidate_recorded:
      sourceEndpoint.required_fields_present.witness_object_contract_link_source_candidate_recorded === true,
    receiver_witness_object_contract_link_source_candidate_recorded:
      receiverEndpoint.required_fields_present.witness_object_contract_link_source_candidate_recorded === true,
    combined_witness_object_contract_link_source_candidate_pair_recorded: false,
    source_actual_contract_link_rule_attempt_applied:
      sourceEndpoint.actual_contract_link_rule_attempt_applied === true,
    receiver_actual_contract_link_rule_attempt_applied:
      receiverEndpoint.actual_contract_link_rule_attempt_applied === true,
    combined_actual_contract_link_rule_attempt_pair_applied: false,
    source_actual_contract_link_rule_obligations_satisfied:
      sourceEndpoint.actual_contract_link_rule_obligations_satisfied === true,
    receiver_actual_contract_link_rule_obligations_satisfied:
      receiverEndpoint.actual_contract_link_rule_obligations_satisfied === true,
    combined_actual_contract_link_rule_obligations_satisfied: false,
    source_witness_object_contract_link_constructed:
      sourceEndpoint.witness_object_contract_link_constructed === true,
    receiver_witness_object_contract_link_constructed:
      receiverEndpoint.witness_object_contract_link_constructed === true,
    combined_witness_object_contract_link_pair_constructed: false,
    source_witness_object_has_contract_link:
      sourceEndpoint.witness_object_has_contract_link === true,
    receiver_witness_object_has_contract_link:
      receiverEndpoint.witness_object_has_contract_link === true,
    combined_witness_object_contract_link_pair_attached: false,
    source_binding_contract_satisfied:
      sourceEndpoint.binding_contract_satisfied === true,
    receiver_binding_contract_satisfied:
      receiverEndpoint.binding_contract_satisfied === true,
    combined_binding_contract_pair_satisfied: false,
    source_full_endpoint_boundary_binding_constructed:
      sourceEndpoint.full_endpoint_boundary_binding_constructed === true,
    receiver_full_endpoint_boundary_binding_constructed:
      receiverEndpoint.full_endpoint_boundary_binding_constructed === true,
    combined_full_endpoint_boundary_binding_pair_constructed: false,
    source_endpoint_boundary_binding_ref_carrier_unblocked:
      sourceEndpoint.endpoint_boundary_binding_ref_carrier_unblocked === true,
    receiver_endpoint_boundary_binding_ref_carrier_unblocked:
      receiverEndpoint.endpoint_boundary_binding_ref_carrier_unblocked === true,
    combined_endpoint_boundary_binding_ref_carrier_pair_unblocked: false,
    source_endpoint_value_binding_map_carrier_unblocked:
      sourceEndpoint.endpoint_value_binding_map_carrier_unblocked === true,
    receiver_endpoint_value_binding_map_carrier_unblocked:
      receiverEndpoint.endpoint_value_binding_map_carrier_unblocked === true,
    combined_endpoint_value_binding_map_carrier_pair_unblocked: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_witness_object_contract_link_source_candidate_pair_recorded =
    fields.source_witness_object_contract_link_source_candidate_recorded &&
    fields.receiver_witness_object_contract_link_source_candidate_recorded;
  fields.combined_actual_contract_link_rule_attempt_pair_applied =
    fields.source_actual_contract_link_rule_attempt_applied &&
    fields.receiver_actual_contract_link_rule_attempt_applied;
  fields.combined_actual_contract_link_rule_obligations_satisfied =
    fields.source_actual_contract_link_rule_obligations_satisfied &&
    fields.receiver_actual_contract_link_rule_obligations_satisfied;
  fields.combined_witness_object_contract_link_pair_constructed =
    fields.source_witness_object_contract_link_constructed &&
    fields.receiver_witness_object_contract_link_constructed;
  fields.combined_witness_object_contract_link_pair_attached =
    fields.source_witness_object_has_contract_link &&
    fields.receiver_witness_object_has_contract_link;
  fields.combined_binding_contract_pair_satisfied =
    fields.source_binding_contract_satisfied &&
    fields.receiver_binding_contract_satisfied;
  fields.combined_full_endpoint_boundary_binding_pair_constructed =
    fields.source_full_endpoint_boundary_binding_constructed &&
    fields.receiver_full_endpoint_boundary_binding_constructed;
  fields.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked =
    fields.source_endpoint_boundary_binding_ref_carrier_unblocked &&
    fields.receiver_endpoint_boundary_binding_ref_carrier_unblocked;
  fields.combined_endpoint_value_binding_map_carrier_pair_unblocked =
    fields.source_endpoint_value_binding_map_carrier_unblocked &&
    fields.receiver_endpoint_value_binding_map_carrier_unblocked;
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
    source_actual_contract_link_rule_attempt_id:
      sourceEndpoint.actual_contract_link_rule_attempt_id,
    receiver_actual_contract_link_rule_attempt_id:
      receiverEndpoint.actual_contract_link_rule_attempt_id,
    source_candidate_id: sourceEndpoint.source_candidate_id,
    receiver_candidate_id: receiverEndpoint.source_candidate_id,
    source_witness_object_contract_link_id: null,
    receiver_witness_object_contract_link_id: null,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver source-candidate records and actual-rule attempts, but both actual contract-link rule obligations fail and no source/receiver witness-object contract-link pair is constructed.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function buildPacket(source, sourcePath) {
  assertSource(source);
  const endpointAttempts =
    source.endpoint_witness_object_contract_link_construction_attempts.map(buildEndpointAttempt);
  const endpointById = idMap(endpointAttempts, "actual contract-link rule endpoint attempt");
  const rowAttempts =
    source.row_witness_object_contract_link_construction_attempts.map((row) => buildRowAttempt(row, endpointById));
  const endpointFieldCounts = fieldCounts(
    endpointAttempts,
    ENDPOINT_FIELDS,
    (endpoint, field) => endpoint.required_fields_present[field]
  );
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS, (row, field) => row.required_fields_present[field]);
  const missingObligationTotal = endpointAttempts.reduce(
    (sum, endpoint) => sum + endpoint.missing_actual_contract_link_obligation_count,
    0
  );
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-actual-contract-link-rule-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Actual Witness-Object Contract-Link Rule Attempt",
    claim_level:
      "priority-only fail-closed rule attempt; 4 / 4 source candidates pass integrity checks and 4 / 4 actual-link rule attempts are applied, but all proof-grade actual-link obligations remain unsatisfied and no witness-object contract links, binding contracts, full endpoint boundary bindings, carrier admissions, residual-ready rows, branch charts, or row consumption are produced",
    source_artifacts: {
      witness_object_contract_link_source_candidate_construction_attempt:
        artifactRecord(sourcePath),
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
      source_candidates_integrity_checked: true,
      actual_contract_link_rule_obligations_satisfied: false,
      witness_object_contract_links_constructed: false,
      binding_contracts_satisfied: false,
      full_endpoint_boundary_bindings_constructed: false,
      endpoint_boundary_binding_ref_carriers_unblocked: false,
      endpoint_value_binding_map_carriers_unblocked: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    attempted_rule:
      "A source candidate can be promoted to an actual witness-object contract link only if a proof rule is present and every listed obligation proves witness-object membership, contract-target satisfaction, proof-grade target ref/value equations, endpoint-ref and first-primitive compatibility, carrier admission, motion/evaluation, algebraic certificates, and candidate replay.",
    no_promotion_rule:
      "Source-candidate integrity and actual-rule attempt application do not construct a witness-object contract link. The packet stays fail-closed unless every actual-rule obligation is satisfied in proof-grade form.",
    construction_methods: CONSTRUCTION_METHODS,
    source_candidate_integrity_fields: SOURCE_CANDIDATE_INTEGRITY_FIELDS,
    source_candidate_id_fields: SOURCE_CANDIDATE_ID_FIELDS,
    actual_rule_obligation_fields: ACTUAL_RULE_OBLIGATION_FIELDS,
    actual_rule_output_fields: ACTUAL_RULE_OUTPUT_FIELDS,
    rule_obligations: RULE_OBLIGATIONS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_actual_contract_link_rule_attempts: endpointAttempts,
    row_actual_contract_link_rule_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      source_candidates_inherited:
        endpointFieldCounts.witness_object_contract_link_source_candidate_recorded,
      source_candidates_integrity_ready:
        endpointFieldCounts.witness_object_contract_link_source_candidate_recorded,
      actual_contract_link_rule_attempts_applied:
        endpointFieldCounts.actual_contract_link_rule_attempt_applied,
      actual_contract_link_rule_obligations_per_endpoint:
        ACTUAL_RULE_OBLIGATION_FIELDS.length,
      actual_contract_link_rule_obligations_total:
        endpointAttempts.length * ACTUAL_RULE_OBLIGATION_FIELDS.length,
      actual_contract_link_rule_obligations_satisfied:
        endpointFieldCounts.actual_contract_link_rule_obligations_satisfied,
      actual_contract_link_rule_missing_obligation_count:
        missingObligationTotal,
      witness_object_contract_links_constructed:
        endpointFieldCounts.witness_object_contract_link_constructed,
      witness_object_contract_links_attached:
        endpointFieldCounts.witness_object_has_contract_link,
      binding_contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_binding_map_carriers_unblocked:
        endpointFieldCounts.endpoint_value_binding_map_carrier_unblocked,
      row_source_candidate_pairs_inherited:
        rowFieldCounts.combined_witness_object_contract_link_source_candidate_pair_recorded,
      row_actual_contract_link_rule_attempt_pairs_applied:
        rowFieldCounts.combined_actual_contract_link_rule_attempt_pair_applied,
      row_actual_contract_link_rule_obligation_pairs_satisfied:
        rowFieldCounts.combined_actual_contract_link_rule_obligations_satisfied,
      row_witness_object_contract_link_pairs_constructed:
        rowFieldCounts.combined_witness_object_contract_link_pair_constructed,
      row_witness_object_contract_link_pairs_attached:
        rowFieldCounts.combined_witness_object_contract_link_pair_attached,
      row_binding_contract_pairs_satisfied:
        rowFieldCounts.combined_binding_contract_pair_satisfied,
      row_full_endpoint_boundary_binding_pairs_constructed:
        rowFieldCounts.combined_full_endpoint_boundary_binding_pair_constructed,
      row_endpoint_boundary_binding_ref_carrier_pairs_unblocked:
        rowFieldCounts.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked,
      row_endpoint_value_binding_map_carrier_pairs_unblocked:
        rowFieldCounts.combined_endpoint_value_binding_map_carrier_pair_unblocked,
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
      "Priority-only. This packet attempts the actual witness-object contract-link rule above the recorded source candidates. It records that 4 / 4 source candidates pass integrity checks and 4 / 4 actual-rule attempts are applied, but 40 proof-grade actual-link obligations remain missing, so it constructs 0 / 4 actual witness-object contract links, satisfies 0 / 4 binding contracts, constructs 0 / 4 full endpoint boundary bindings, admits 0 / 4 reference carriers, admits 0 / 4 value-map carriers, prepares 0 residual-data rows, authorizes no branch chart, and consumes 0 rows.",
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

function obligationTable(obligations) {
  return obligations
    .map(
      (obligation) =>
        `| \`${obligation.obligation_id}\` | \`${obligation.source_evidence}\` | ${obligation.description} |`
    )
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.witness_object_contract_link_source_candidate_recorded} | ${endpoint.actual_contract_link_rule_attempt_applied} | ${endpoint.actual_contract_link_rule_obligations_satisfied} | ${endpoint.missing_actual_contract_link_obligation_count} | ${endpoint.witness_object_contract_link_constructed} | ${endpoint.witness_object_has_contract_link} | ${endpoint.binding_contract_satisfied} | ${endpoint.full_endpoint_boundary_binding_constructed} | ${endpoint.endpoint_boundary_binding_ref_carrier_unblocked} | ${endpoint.endpoint_value_binding_map_carrier_unblocked} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_witness_object_contract_link_source_candidate_pair_recorded} | ${row.required_fields_present.combined_actual_contract_link_rule_attempt_pair_applied} | ${row.required_fields_present.combined_actual_contract_link_rule_obligations_satisfied} | ${row.required_fields_present.combined_witness_object_contract_link_pair_constructed} | ${row.required_fields_present.combined_binding_contract_pair_satisfied} | ${row.required_fields_present.combined_full_endpoint_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Actual Contract-Link Rule Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet attempts the actual witness-object contract-link
rule above the source-candidate packet. It imports ${summary.source_candidates_inherited} / ${summary.endpoint_functionals}
source candidates and applies ${summary.actual_contract_link_rule_attempts_applied} / ${summary.endpoint_functionals}
actual-rule attempts, but the proof-grade obligations needed to promote those
source candidates into actual witness-object contract links are not satisfied.

The packet remains fail-closed. It satisfies ${summary.actual_contract_link_rule_obligations_satisfied} / ${summary.endpoint_functionals}
actual-rule obligation sets, leaves ${summary.actual_contract_link_rule_missing_obligation_count}
endpoint-level actual-link obligations missing, constructs
${summary.witness_object_contract_links_constructed} / ${summary.endpoint_functionals} witness-object contract links,
satisfies ${summary.binding_contracts_satisfied} / ${summary.endpoint_functionals} binding contracts, constructs
${summary.full_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals} full endpoint boundary bindings,
admits ${summary.endpoint_boundary_binding_ref_carriers_unblocked} / ${summary.endpoint_functionals}
endpoint-boundary-binding reference carriers, admits
${summary.endpoint_value_binding_map_carriers_unblocked} / ${summary.endpoint_functionals} endpoint value-map carriers,
and consumes ${summary.row_consumption_count} rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## Attempted Rule

${packet.attempted_rule}

${packet.no_promotion_rule}

## Actual-Link Rule Obligations

| Obligation | Source evidence | Description |
| --- | --- | --- |
${obligationTable(packet.rule_obligations)}

## Construction Methods

| Method | Output kind | Required fields | Description |
| --- | --- | ---: | --- |
${methodTable(packet.construction_methods)}

## Endpoint Rule Attempts

| Endpoint | Role | Source candidate | Rule attempt | Obligations satisfied | Missing obligations | Link constructed | Link attached | Contract | Full binding | Ref carrier | Value-map carrier |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_actual_contract_link_rule_attempts)}

## Row Rule Attempts

| Row | Failed side | Source-candidate pair | Rule-attempt pair | Obligation pair | Contract-link pair | Contract pair | Full-binding pair | Ref-carrier pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_actual_contract_link_rule_attempts)}

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
  const source = readJson(args.sourcePacket);
  const packet = buildPacket(source, args.sourcePacket);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

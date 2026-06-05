#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_SOURCE_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_actual_contract_link_rule_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_contract_link_membership_rule_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_contract_link_membership_rule_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-actual-contract-link-rule-attempt-fail-closed-source-candidates-present-rule-obligations-unsatisfied-witness-object-contract-links-absent-no-row-consumption";

const INHERITED_SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-witness-object-contract-link-construction-attempt-fail-closed-contract-link-source-candidates-present-witness-object-contract-links-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-contract-link-membership-rule-attempt-fail-closed-rule-and-membership-source-conditions-present-rule-and-membership-proofs-absent-no-row-consumption";

const CONDITIONAL_RULE_DECLARATION_FIELDS = [
  "actual_contract_link_rule_attempt_inherited",
  "actual_contract_link_conditional_rule_declaration_attempted",
  "actual_contract_link_rule_source_conditions_present",
  "actual_contract_link_rule_requires_witness_object_membership_proof",
  "actual_contract_link_rule_requires_contract_target_satisfaction_proof",
  "actual_contract_link_rule_requires_target_ref_value_equations_proof_grade",
  "actual_contract_link_rule_preserves_fail_closed_outputs",
];

const MEMBERSHIP_SOURCE_CONDITION_FIELDS = [
  "source_candidate_id_present",
  "contract_target_id_present",
  "endpoint_value_binding_map_id_present",
  "witness_object_endpoint_boundary_binding_ref_id_present",
  "source_witness_object_attempt_id_present",
  "first_endpoint_boundary_binding_primitive_id_present",
  "target_endpoint_value_binding_source_equations_present",
  "source_candidate_targets_endpoint_value_binding_map",
  "source_candidate_targets_endpoint_boundary_binding_ref",
  "source_candidate_targets_witness_object_attempt",
  "source_candidate_targets_contract_target",
  "inherited_witness_object_endpoint_boundary_binding_ref_field_claim",
  "inherited_witness_object_endpoint_value_binding_map_field_claim",
  "same_source_witness_object_attempt_id_referenced",
  "witness_object_symbol_present",
  "binding_symbol_present",
];

const WITNESS_OBJECT_MEMBERSHIP_PROOF_FIELDS = [
  "witness_object_membership_proof_present",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "endpoint_ref_and_value_map_same_witness_object_proven",
  "membership_source_not_id_adjacency_proven",
];

const REMAINING_ACTUAL_RULE_OBLIGATION_FIELDS = [
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

const ACTUAL_RULE_OBLIGATION_FIELDS = [
  "actual_contract_link_rule_available",
  ...REMAINING_ACTUAL_RULE_OBLIGATION_FIELDS,
];

const ACTUAL_RULE_OUTPUT_FIELDS = [
  "actual_contract_link_rule_obligations_satisfied",
  "witness_object_contract_link_constructed",
  "witness_object_has_contract_link",
  "binding_contract_satisfied",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
];

const ENDPOINT_FIELDS = [
  ...CONDITIONAL_RULE_DECLARATION_FIELDS,
  ...MEMBERSHIP_SOURCE_CONDITION_FIELDS,
  "membership_source_conditions_ready",
  "actual_contract_link_rule_available",
  ...WITNESS_OBJECT_MEMBERSHIP_PROOF_FIELDS,
  ...REMAINING_ACTUAL_RULE_OBLIGATION_FIELDS.filter(
    (field) => !WITNESS_OBJECT_MEMBERSHIP_PROOF_FIELDS.includes(field)
  ),
  ...ACTUAL_RULE_OUTPUT_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_actual_contract_link_rule_source_conditions_present",
  "receiver_actual_contract_link_rule_source_conditions_present",
  "combined_actual_contract_link_rule_source_condition_pair_present",
  "source_membership_source_conditions_ready",
  "receiver_membership_source_conditions_ready",
  "combined_membership_source_condition_pair_ready",
  "source_witness_object_membership_proof_present",
  "receiver_witness_object_membership_proof_present",
  "combined_witness_object_membership_proof_pair_present",
  "source_actual_contract_link_rule_obligations_satisfied",
  "receiver_actual_contract_link_rule_obligations_satisfied",
  "combined_actual_contract_link_rule_obligations_satisfied",
  "source_witness_object_contract_link_constructed",
  "receiver_witness_object_contract_link_constructed",
  "combined_witness_object_contract_link_pair_constructed",
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
      "Supply a proof-grade rule whose conclusion is an actual witness-object contract link when every listed premise is present.",
    source_evidence: "source-conditions-only-rule-not-declared",
  },
  {
    obligation_id: "witness_object_membership_proof_present",
    description:
      "Prove that the endpoint-boundary-binding ref and endpoint value-binding map are fields of the same constructed witness object rather than only adjacent referenced IDs or inherited field claims.",
    source_evidence: "membership-source-conditions-only",
  },
  {
    obligation_id: "contract_target_satisfaction_proof_present",
    description:
      "Prove satisfaction of the inherited full endpoint boundary-binding contract target.",
    source_evidence: "contract-test-applied-contract-not-satisfied",
  },
  {
    obligation_id: "target_ref_value_equations_proof_grade",
    description:
      "Promote every target ref/value equation beyond source-equation-only status into proof-grade contract-link evidence.",
    source_evidence: "source-equation-only",
  },
  {
    obligation_id: "endpoint_boundary_binding_ref_compatibility_proof_present",
    description:
      "Certify the endpoint-boundary-binding ref as compatible with the target endpoint boundary-binding object on the domain-chart carrier.",
    source_evidence: "ref-carrier-locked",
  },
  {
    obligation_id: "first_primitive_compatibility_proof_present",
    description:
      "Certify the first endpoint boundary-binding primitive as compatible with the value map and contract target.",
    source_evidence: "primitive-id-only",
  },
  {
    obligation_id: "carrier_admission_bridge_present",
    description:
      "Bridge the actual link into endpoint-boundary-binding reference carrier and endpoint value-map carrier admission.",
    source_evidence: "carrier-admission-absent",
  },
  {
    obligation_id: "motion_evaluation_bridge_present",
    description:
      "Connect the link to endpoint motion/evaluation maps, including full endpoint and global domain evaluation maps.",
    source_evidence: "motion-evaluation-absent",
  },
  {
    obligation_id: "algebraic_certificate_bridge_present",
    description:
      "Supply non-target zero, exact screen zero, and rank certificates needed by full endpoint boundary binding.",
    source_evidence: "algebraic-certificates-absent",
  },
  {
    obligation_id: "candidate_replay_bridge_present",
    description:
      "Supply candidate artifacts, topology recertification, and proof-interval replay before row consumption.",
    source_evidence: "replay-absent",
  },
];

const MEMBERSHIP_PROOF_BURDENS = [
  {
    burden_id: "same_constructed_witness_object_identity",
    required_evidence:
      "A proof-grade identity certificate that the endpoint-boundary-binding ref and endpoint value-binding map are attached to one constructed witness object, not merely to matching endpoint IDs.",
  },
  {
    burden_id: "endpoint_boundary_binding_ref_membership",
    required_evidence:
      "A field-membership proof for the endpoint-boundary-binding ref inside the constructed witness object.",
  },
  {
    burden_id: "endpoint_value_binding_map_membership",
    required_evidence:
      "A field-membership proof for the endpoint value-binding map inside the constructed witness object.",
  },
  {
    burden_id: "membership_not_id_adjacency",
    required_evidence:
      "A check that same-ID adjacency, inherited field claims, and source-candidate target references are not promoted into membership proof without a constructed witness-object certificate.",
  },
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "conditional_actual_contract_link_rule_declaration_attempt",
    output_kind: "conditional-actual-contract-link-rule-source-condition",
    description:
      "Record the source conditions for a conditional actual contract-link introduction rule without treating that source-condition record as a declared proof rule.",
    required_fields: CONDITIONAL_RULE_DECLARATION_FIELDS,
  },
  {
    method_id: "membership_source_condition_bundle_check",
    output_kind: "membership-source-condition-bundle",
    description:
      "Check whether the source candidate carries the IDs, target references, inherited field claims, and same source witness-object attempt needed to pose the membership proof burden.",
    required_fields: [
      ...MEMBERSHIP_SOURCE_CONDITION_FIELDS,
      "membership_source_conditions_ready",
    ],
  },
  {
    method_id: "witness_object_membership_proof_check",
    output_kind: "witness-object-membership-proof",
    description:
      "Check whether the packet proves same constructed-witness-object membership for the endpoint-boundary-binding ref and endpoint value-binding map.",
    required_fields: WITNESS_OBJECT_MEMBERSHIP_PROOF_FIELDS,
  },
  {
    method_id: "actual_contract_link_obligation_check",
    output_kind: "actual-contract-link",
    description:
      "Check whether an available actual-link rule and every actual-link obligation construct a witness-object contract link.",
    required_fields: [
      ...ACTUAL_RULE_OBLIGATION_FIELDS,
      "actual_contract_link_rule_obligations_satisfied",
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-contract-link-membership-rule-attempt.mjs [options]

Options:
  --source-packet PATH  Actual contract-link rule attempt packet JSON.
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

function assertSource(source, inheritedSource) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected source packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected source status: ${source.status}`);
  }
  if (inheritedSource.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected inherited source packet id: ${inheritedSource.packet_id}`);
  }
  if (inheritedSource.status !== INHERITED_SOURCE_STATUS) {
    throw new Error(`Unexpected inherited source status: ${inheritedSource.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger || source.row_closure) {
    throw new Error("Refusing membership-rule attempt from authorized or row-closed source packet.");
  }
}

function inheritedSourcePath(source) {
  const filePath =
    source.source_artifacts?.witness_object_contract_link_source_candidate_construction_attempt?.path;
  if (!filePath) {
    throw new Error("Missing inherited witness-object contract-link source-candidate path.");
  }
  return filePath;
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function equationStatuses(endpoint, inheritedEndpoint) {
  return (
    inheritedEndpoint?.target_endpoint_value_binding_source_equations ||
    endpoint.target_endpoint_value_binding_source_equations ||
    []
  ).map((equation) => equation.proof_grade_binding_status || "missing-status");
}

function candidateValue(actualEndpoint, inheritedEndpoint, field) {
  const candidate = inheritedEndpoint?.witness_object_contract_link_source_candidate || {};
  const directByField = {
    source_candidate_id: actualEndpoint.source_candidate_id,
    contract_target_id: actualEndpoint.source_contract_target_id,
    endpoint_value_binding_map_id: actualEndpoint.source_endpoint_value_binding_map_id,
    witness_object_endpoint_boundary_binding_ref_id:
      actualEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    source_witness_object_attempt_id: actualEndpoint.source_witness_object_attempt_id,
    first_endpoint_boundary_binding_primitive_id:
      actualEndpoint.source_first_endpoint_boundary_binding_primitive_id,
  };
  return directByField[field] || candidate[field] || null;
}

function conditionalRuleFields(actualEndpoint) {
  return {
    actual_contract_link_rule_attempt_inherited:
      actualEndpoint.actual_contract_link_rule_attempt_applied === true,
    actual_contract_link_conditional_rule_declaration_attempted: true,
    actual_contract_link_rule_source_conditions_present: true,
    actual_contract_link_rule_available: false,
    actual_contract_link_rule_requires_witness_object_membership_proof: true,
    actual_contract_link_rule_requires_contract_target_satisfaction_proof: true,
    actual_contract_link_rule_requires_target_ref_value_equations_proof_grade: true,
    actual_contract_link_rule_preserves_fail_closed_outputs: true,
  };
}

function membershipSourceConditionFields(actualEndpoint, inheritedEndpoint) {
  const actualFields = actualEndpoint.required_fields_present || {};
  const inheritedFields = inheritedEndpoint?.required_fields_present || {};
  const candidate = inheritedEndpoint?.witness_object_contract_link_source_candidate || {};
  const sourceWitnessObjectAttemptId = candidateValue(
    actualEndpoint,
    inheritedEndpoint,
    "source_witness_object_attempt_id"
  );
  return {
    source_candidate_id_present:
      Boolean(candidateValue(actualEndpoint, inheritedEndpoint, "source_candidate_id")),
    contract_target_id_present:
      Boolean(candidateValue(actualEndpoint, inheritedEndpoint, "contract_target_id")),
    endpoint_value_binding_map_id_present:
      Boolean(candidateValue(actualEndpoint, inheritedEndpoint, "endpoint_value_binding_map_id")),
    witness_object_endpoint_boundary_binding_ref_id_present:
      Boolean(candidateValue(actualEndpoint, inheritedEndpoint, "witness_object_endpoint_boundary_binding_ref_id")),
    source_witness_object_attempt_id_present:
      Boolean(sourceWitnessObjectAttemptId),
    first_endpoint_boundary_binding_primitive_id_present:
      Boolean(candidateValue(actualEndpoint, inheritedEndpoint, "first_endpoint_boundary_binding_primitive_id")),
    target_endpoint_value_binding_source_equations_present:
      Array.isArray(candidate.target_endpoint_value_binding_source_equations) &&
      candidate.target_endpoint_value_binding_source_equations.length > 0,
    source_candidate_targets_endpoint_value_binding_map:
      actualFields.witness_object_contract_link_source_candidate_targets_endpoint_value_binding_map === true,
    source_candidate_targets_endpoint_boundary_binding_ref:
      actualFields.witness_object_contract_link_source_candidate_targets_endpoint_boundary_binding_ref === true,
    source_candidate_targets_witness_object_attempt:
      actualFields.witness_object_contract_link_source_candidate_targets_witness_object_attempt === true,
    source_candidate_targets_contract_target:
      actualFields.witness_object_contract_link_source_candidate_targets_contract_target === true,
    inherited_witness_object_endpoint_boundary_binding_ref_field_claim:
      inheritedFields.witness_object_has_endpoint_boundary_binding_ref === true,
    inherited_witness_object_endpoint_value_binding_map_field_claim:
      inheritedFields.witness_object_has_endpoint_value_binding_map === true,
    same_source_witness_object_attempt_id_referenced:
      Boolean(sourceWitnessObjectAttemptId) &&
      sourceWitnessObjectAttemptId === candidate.source_witness_object_attempt_id,
    witness_object_symbol_present:
      Boolean(actualEndpoint.witness_object_symbol || candidate.witness_object_symbol),
    binding_symbol_present:
      Boolean(actualEndpoint.binding_symbol || candidate.binding_symbol),
  };
}

function membershipProofFields() {
  return Object.fromEntries(
    WITNESS_OBJECT_MEMBERSHIP_PROOF_FIELDS.map((field) => [field, false])
  );
}

function remainingObligationFields() {
  return Object.fromEntries(
    REMAINING_ACTUAL_RULE_OBLIGATION_FIELDS
      .filter((field) => !WITNESS_OBJECT_MEMBERSHIP_PROOF_FIELDS.includes(field))
      .map((field) => [field, false])
  );
}

function outputFields() {
  return Object.fromEntries(ACTUAL_RULE_OUTPUT_FIELDS.map((field) => [field, false]));
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

function obligationStatuses(fields, statuses) {
  return RULE_OBLIGATIONS.map((obligation) => ({
    ...obligation,
    satisfied: fields[obligation.obligation_id] === true,
    observed_equation_statuses:
      obligation.obligation_id === "target_ref_value_equations_proof_grade"
        ? statuses
        : undefined,
  }));
}

function buildEndpointAttempt(actualEndpoint, inheritedEndpoint) {
  const sourceConditionFields = membershipSourceConditionFields(actualEndpoint, inheritedEndpoint);
  const membershipSourceConditionsReady =
    MEMBERSHIP_SOURCE_CONDITION_FIELDS.every((field) => sourceConditionFields[field] === true);
  const fields = {
    ...conditionalRuleFields(actualEndpoint),
    ...sourceConditionFields,
    membership_source_conditions_ready: membershipSourceConditionsReady,
    ...membershipProofFields(),
    ...remainingObligationFields(),
    ...outputFields(),
  };
  const statuses = equationStatuses(actualEndpoint, inheritedEndpoint);
  const methodResults = CONSTRUCTION_METHODS.map((method) =>
    methodResult(method, fields, "contract_link_membership_rule_missing")
  );
  const obligationStatusRows = obligationStatuses(fields, statuses);
  const missingObligations = obligationStatusRows.filter((obligation) => !obligation.satisfied);
  const sourceCandidateId = candidateValue(actualEndpoint, inheritedEndpoint, "source_candidate_id");
  const contractTargetId = candidateValue(actualEndpoint, inheritedEndpoint, "contract_target_id");
  const endpointValueBindingMapId = candidateValue(
    actualEndpoint,
    inheritedEndpoint,
    "endpoint_value_binding_map_id"
  );
  const witnessObjectEndpointBoundaryBindingRefId = candidateValue(
    actualEndpoint,
    inheritedEndpoint,
    "witness_object_endpoint_boundary_binding_ref_id"
  );
  const sourceWitnessObjectAttemptId = candidateValue(
    actualEndpoint,
    inheritedEndpoint,
    "source_witness_object_attempt_id"
  );
  const firstPrimitiveId = candidateValue(
    actualEndpoint,
    inheritedEndpoint,
    "first_endpoint_boundary_binding_primitive_id"
  );
  return {
    id: actualEndpoint.id,
    endpoint_functional_id: actualEndpoint.endpoint_functional_id,
    role: actualEndpoint.role,
    contract_link_membership_rule_attempt_id:
      `contract_link_membership_rule_attempt:${actualEndpoint.id}`,
    source_actual_contract_link_rule_attempt_id:
      actualEndpoint.actual_contract_link_rule_attempt_id,
    source_witness_object_contract_link_construction_attempt_id:
      actualEndpoint.source_witness_object_contract_link_construction_attempt_id,
    source_candidate_id: sourceCandidateId,
    source_contract_target_id: contractTargetId,
    source_endpoint_value_binding_map_id: endpointValueBindingMapId,
    witness_object_endpoint_boundary_binding_ref_id:
      witnessObjectEndpointBoundaryBindingRefId,
    source_witness_object_attempt_id: sourceWitnessObjectAttemptId,
    source_first_endpoint_boundary_binding_primitive_id: firstPrimitiveId,
    binding_symbol:
      actualEndpoint.binding_symbol ||
      inheritedEndpoint?.witness_object_contract_link_source_candidate?.binding_symbol ||
      null,
    witness_object_symbol:
      actualEndpoint.witness_object_symbol ||
      inheritedEndpoint?.witness_object_contract_link_source_candidate?.witness_object_symbol ||
      null,
    target_endpoint_ref_value_count:
      actualEndpoint.target_endpoint_ref_value_count ||
      inheritedEndpoint?.target_endpoint_ref_value_count ||
      0,
    target_endpoint_value_binding_source_equation_statuses: statuses,
    conditional_actual_contract_link_rule: {
      rule_id: `conditional_actual_contract_link_rule:${actualEndpoint.id}`,
      premise_ids: {
        source_witness_object_attempt_id: sourceWitnessObjectAttemptId,
        contract_target_id: contractTargetId,
        endpoint_value_binding_map_id: endpointValueBindingMapId,
        witness_object_endpoint_boundary_binding_ref_id:
          witnessObjectEndpointBoundaryBindingRefId,
        first_endpoint_boundary_binding_primitive_id: firstPrimitiveId,
        source_candidate_id: sourceCandidateId,
      },
      premises_required: ACTUAL_RULE_OBLIGATION_FIELDS,
      conclusion_if_all_premises_proven:
        "Construct and attach the witness-object contract link, then test binding contract satisfaction, full endpoint boundary binding, carrier admission, residual readiness, and row consumption.",
      soundness_limit:
        "This rule declaration does not construct an actual witness-object contract link unless every listed proof-grade premise is true.",
    },
    membership_source_condition_bundle: {
      condition_fields: MEMBERSHIP_SOURCE_CONDITION_FIELDS,
      ready: membershipSourceConditionsReady,
      inherited_field_claims_are_not_membership_proofs: true,
      source_candidate_references_are_not_membership_proofs: true,
    },
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    actual_contract_link_obligation_statuses: obligationStatusRows,
    missing_actual_contract_link_obligations: missingObligations,
    missing_actual_contract_link_obligation_count: missingObligations.length,
    membership_proof_burdens: MEMBERSHIP_PROOF_BURDENS,
    actual_contract_link_rule_available:
      fields.actual_contract_link_rule_available,
    membership_source_conditions_ready: fields.membership_source_conditions_ready,
    witness_object_membership_proof_present:
      fields.witness_object_membership_proof_present,
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
      ...missingObligations.map(
        (obligation) => `contract_link_membership_rule_locked_${obligation.obligation_id}`
      ),
      "contract_link_membership_rule_locked_witness_object_contract_link_constructed",
      "contract_link_membership_rule_locked_witness_object_has_contract_link",
      "contract_link_membership_rule_locked_binding_contract_satisfied",
      "contract_link_membership_rule_locked_full_endpoint_boundary_binding_constructed",
      "contract_link_membership_rule_locked_endpoint_boundary_binding_ref_carrier_unblocked",
      "contract_link_membership_rule_locked_endpoint_value_binding_map_carrier_unblocked",
    ],
    obstruction:
      "The actual-link rule source conditions and membership source conditions are present, but no available actual contract-link rule or proof-grade same constructed-witness-object membership certificate is supplied, so the actual witness-object contract link remains absent.",
  };
}

function buildRowAttempt(row, endpointById) {
  const sourceEndpoint = requireMapped(endpointById, row.source_variable, `source endpoint for ${row.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, row.receiver_variable, `receiver endpoint for ${row.row_id}`);
  const fields = {
    row_locator_resolved: row.required_fields_present.row_locator_resolved === true,
    source_actual_contract_link_rule_source_conditions_present:
      sourceEndpoint.required_fields_present.actual_contract_link_rule_source_conditions_present === true,
    receiver_actual_contract_link_rule_source_conditions_present:
      receiverEndpoint.required_fields_present.actual_contract_link_rule_source_conditions_present === true,
    combined_actual_contract_link_rule_source_condition_pair_present: false,
    source_membership_source_conditions_ready:
      sourceEndpoint.membership_source_conditions_ready === true,
    receiver_membership_source_conditions_ready:
      receiverEndpoint.membership_source_conditions_ready === true,
    combined_membership_source_condition_pair_ready: false,
    source_witness_object_membership_proof_present:
      sourceEndpoint.witness_object_membership_proof_present === true,
    receiver_witness_object_membership_proof_present:
      receiverEndpoint.witness_object_membership_proof_present === true,
    combined_witness_object_membership_proof_pair_present: false,
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
  fields.combined_actual_contract_link_rule_source_condition_pair_present =
    fields.source_actual_contract_link_rule_source_conditions_present &&
    fields.receiver_actual_contract_link_rule_source_conditions_present;
  fields.combined_membership_source_condition_pair_ready =
    fields.source_membership_source_conditions_ready &&
    fields.receiver_membership_source_conditions_ready;
  fields.combined_witness_object_membership_proof_pair_present =
    fields.source_witness_object_membership_proof_present &&
    fields.receiver_witness_object_membership_proof_present;
  fields.combined_actual_contract_link_rule_obligations_satisfied =
    fields.source_actual_contract_link_rule_obligations_satisfied &&
    fields.receiver_actual_contract_link_rule_obligations_satisfied;
  fields.combined_witness_object_contract_link_pair_constructed =
    fields.source_witness_object_contract_link_constructed &&
    fields.receiver_witness_object_contract_link_constructed;
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
    source_contract_link_membership_rule_attempt_id:
      sourceEndpoint.contract_link_membership_rule_attempt_id,
    receiver_contract_link_membership_rule_attempt_id:
      receiverEndpoint.contract_link_membership_rule_attempt_id,
    source_candidate_id: sourceEndpoint.source_candidate_id,
    receiver_candidate_id: receiverEndpoint.source_candidate_id,
    source_witness_object_contract_link_id: null,
    receiver_witness_object_contract_link_id: null,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has conditional actual-link rules and source/receiver membership source-condition bundles, but both witness-object membership proofs are absent and no source/receiver witness-object contract-link pair is constructed.",
  };
}

function buildPacket(source, sourcePath, inheritedSource, inheritedSourcePathValue) {
  assertSource(source, inheritedSource);
  const inheritedEndpointById = idMap(
    inheritedSource.endpoint_witness_object_contract_link_construction_attempts,
    "inherited witness-object contract-link endpoint attempt"
  );
  const endpointAttempts = source.endpoint_actual_contract_link_rule_attempts.map((endpoint) =>
    buildEndpointAttempt(endpoint, requireMapped(inheritedEndpointById, endpoint.id, `inherited endpoint ${endpoint.id}`))
  );
  const endpointById = idMap(endpointAttempts, "contract-link membership-rule endpoint attempt");
  const rowAttempts =
    source.row_actual_contract_link_rule_attempts.map((row) => buildRowAttempt(row, endpointById));
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
      "breather-higher-fold-fold-coordinate-endpoint-functional-contract-link-membership-rule-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Contract-Link Membership Rule Attempt",
    claim_level:
      "priority-only fail-closed conditional rule attempt; 4 / 4 actual-link rule source-condition bundles and 4 / 4 membership source-condition bundles are ready, but 0 / 4 actual contract-link rules are available and 0 / 4 proof-grade witness-object membership proofs are constructed, so no actual witness-object contract links, binding contracts, full endpoint boundary bindings, carrier admissions, residual-ready rows, branch charts, or row consumption are produced",
    source_artifacts: {
      actual_contract_link_rule_attempt: artifactRecord(sourcePath),
      witness_object_contract_link_source_candidate_construction_attempt:
        artifactRecord(inheritedSourcePathValue),
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
      conditional_actual_contract_link_rule_source_conditions_present: true,
      actual_contract_link_rules_available: false,
      membership_source_conditions_ready: true,
      witness_object_membership_proofs_constructed: false,
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
    conditional_actual_contract_link_rule_source_condition:
      "A future actual contract-link rule would have the following source conditions: a source candidate supplies the witness-object attempt, contract target, endpoint value-binding map, endpoint-boundary-binding ref, first primitive, and target ref/value equations. This packet records those source conditions but does not declare a proof-grade rule whose conclusion is an actual witness-object contract link.",
    no_promotion_rule:
      "The conditional rule source-condition bundle and membership source-condition bundle are not an available actual contract-link rule and not a witness-object membership proof. Inherited field claims and matching IDs do not construct or attach a witness-object contract link.",
    construction_methods: CONSTRUCTION_METHODS,
    conditional_rule_declaration_fields: CONDITIONAL_RULE_DECLARATION_FIELDS,
    membership_source_condition_fields: MEMBERSHIP_SOURCE_CONDITION_FIELDS,
    witness_object_membership_proof_fields: WITNESS_OBJECT_MEMBERSHIP_PROOF_FIELDS,
    actual_rule_obligation_fields: ACTUAL_RULE_OBLIGATION_FIELDS,
    actual_rule_output_fields: ACTUAL_RULE_OUTPUT_FIELDS,
    rule_obligations: RULE_OBLIGATIONS,
    membership_proof_burdens: MEMBERSHIP_PROOF_BURDENS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_contract_link_membership_rule_attempts: endpointAttempts,
    row_contract_link_membership_rule_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      actual_contract_link_rule_attempts_inherited:
        endpointFieldCounts.actual_contract_link_rule_attempt_inherited,
      conditional_actual_contract_link_rule_declaration_attempts:
        endpointFieldCounts.actual_contract_link_conditional_rule_declaration_attempted,
      actual_contract_link_rule_source_conditions_present:
        endpointFieldCounts.actual_contract_link_rule_source_conditions_present,
      actual_contract_link_rules_available:
        endpointFieldCounts.actual_contract_link_rule_available,
      membership_source_condition_bundles_ready:
        endpointFieldCounts.membership_source_conditions_ready,
      witness_object_membership_proofs_present:
        endpointFieldCounts.witness_object_membership_proof_present,
      actual_contract_link_rule_obligations_per_endpoint:
        ACTUAL_RULE_OBLIGATION_FIELDS.length,
      actual_contract_link_rule_obligations_satisfied:
        endpointFieldCounts.actual_contract_link_rule_obligations_satisfied,
      actual_contract_link_rule_obligations_remaining_per_endpoint:
        ACTUAL_RULE_OBLIGATION_FIELDS.length,
      actual_contract_link_rule_obligations_remaining_total:
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
      row_actual_contract_link_rule_source_condition_pairs_present:
        rowFieldCounts.combined_actual_contract_link_rule_source_condition_pair_present,
      row_membership_source_condition_pairs_ready:
        rowFieldCounts.combined_membership_source_condition_pair_ready,
      row_witness_object_membership_proof_pairs_present:
        rowFieldCounts.combined_witness_object_membership_proof_pair_present,
      row_actual_contract_link_rule_obligation_pairs_satisfied:
        rowFieldCounts.combined_actual_contract_link_rule_obligations_satisfied,
      row_witness_object_contract_link_pairs_constructed:
        rowFieldCounts.combined_witness_object_contract_link_pair_constructed,
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
      "Priority-only. This packet records 4 / 4 actual-link rule source-condition bundles and verifies 4 / 4 membership source-condition bundles, but it does not declare an available actual contract-link proof rule and does not construct witness-object membership proofs. It constructs 0 / 4 actual witness-object contract links, 0 / 4 binding contracts, 0 / 4 full endpoint boundary bindings, 0 / 4 reference-carrier admissions, 0 / 4 value-map-carrier admissions, 0 residual-data rows, no branch chart, and 0 row consumption remain.",
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

function burdenTable(burdens) {
  return burdens
    .map((burden) => `| \`${burden.burden_id}\` | ${burden.required_evidence} |`)
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.actual_contract_link_rule_available} | ${endpoint.membership_source_conditions_ready} | ${endpoint.witness_object_membership_proof_present} | ${endpoint.missing_actual_contract_link_obligation_count} | ${endpoint.witness_object_contract_link_constructed} | ${endpoint.witness_object_has_contract_link} | ${endpoint.binding_contract_satisfied} | ${endpoint.full_endpoint_boundary_binding_constructed} | ${endpoint.endpoint_boundary_binding_ref_carrier_unblocked} | ${endpoint.endpoint_value_binding_map_carrier_unblocked} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_actual_contract_link_rule_source_condition_pair_present} | ${row.required_fields_present.combined_membership_source_condition_pair_ready} | ${row.required_fields_present.combined_witness_object_membership_proof_pair_present} | ${row.required_fields_present.combined_actual_contract_link_rule_obligations_satisfied} | ${row.required_fields_present.combined_witness_object_contract_link_pair_constructed} | ${row.required_fields_present.combined_binding_contract_pair_satisfied} | ${row.required_fields_present.combined_full_endpoint_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Contract-Link Membership Rule Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet separates the actual contract-link rule source-condition
record from the first instance-level proof burden. It imports ${summary.actual_contract_link_rule_attempts_inherited} / ${summary.endpoint_functionals}
actual-rule attempts, records ${summary.actual_contract_link_rule_source_conditions_present} / ${summary.endpoint_functionals}
conditional rule source-condition bundles, leaves ${summary.actual_contract_link_rules_available} / ${summary.endpoint_functionals}
actual contract-link rules available, and verifies ${summary.membership_source_condition_bundles_ready} / ${summary.endpoint_functionals}
membership source-condition bundles.

The packet remains fail-closed because it constructs
${summary.witness_object_membership_proofs_present} / ${summary.endpoint_functionals}
proof-grade witness-object membership proofs. The remaining actual-link
obligation count is ${summary.actual_contract_link_rule_obligations_remaining_total}
endpoint-level obligations after the rule source-condition bundle is recorded.
It constructs ${summary.witness_object_contract_links_constructed} / ${summary.endpoint_functionals}
witness-object contract links, satisfies ${summary.binding_contracts_satisfied} / ${summary.endpoint_functionals}
binding contracts, constructs ${summary.full_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals}
full endpoint boundary bindings, admits
${summary.endpoint_boundary_binding_ref_carriers_unblocked} / ${summary.endpoint_functionals}
endpoint-boundary-binding reference carriers, admits
${summary.endpoint_value_binding_map_carriers_unblocked} / ${summary.endpoint_functionals}
endpoint value-map carriers, and consumes ${summary.row_consumption_count}
rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## Conditional Rule Source Condition

${packet.conditional_actual_contract_link_rule_source_condition}

${packet.no_promotion_rule}

## Actual-Link Rule Obligations

| Obligation | Source evidence | Description |
| --- | --- | --- |
${obligationTable(packet.rule_obligations)}

## Membership Proof Burdens

| Burden | Required evidence |
| --- | --- |
${burdenTable(packet.membership_proof_burdens)}

## Construction Methods

| Method | Output kind | Required fields | Description |
| --- | --- | ---: | --- |
${methodTable(packet.construction_methods)}

## Endpoint Membership Rule Attempts

| Endpoint | Role | Rule available | Membership source bundle | Membership proof | Missing obligations | Link constructed | Link attached | Contract | Full binding | Ref carrier | Value-map carrier |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_contract_link_membership_rule_attempts)}

## Row Membership Rule Attempts

| Row | Failed side | Rule source-condition pair | Membership source-condition pair | Membership-proof pair | Obligation pair | Contract-link pair | Contract pair | Full-binding pair | Ref-carrier pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_contract_link_membership_rule_attempts)}

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
  const inheritedPath = inheritedSourcePath(source);
  const inheritedSource = readJson(inheritedPath);
  const packet = buildPacket(source, args.sourcePacket, inheritedSource, inheritedPath);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

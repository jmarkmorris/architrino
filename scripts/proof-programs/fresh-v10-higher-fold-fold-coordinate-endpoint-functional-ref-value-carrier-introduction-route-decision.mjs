#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_RULE_TARGET_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BINDING_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const RULE_TARGET_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-rule-target-fail-closed-ref-value-sources-and-carrier-candidates-present-carrier-introduction-rules-absent-no-row-consumption";
const BINDING_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-fail-closed-value-maps-inherited-contract-full-binding-carrier-admission-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision-fail-closed-direct-source-promotion-rejected-carrier-admission-route-selected-no-row-consumption";

const DIRECT_SOURCE_PREMISE_FIELDS = [
  "source_endpoint_boundary_binding_ref_constructed",
  "source_endpoint_value_binding_map_constructed",
  "endpoint_boundary_binding_ref_carrier_source_candidate_declared",
  "endpoint_value_binding_map_carrier_source_candidate_declared",
  "ref_carrier_introduction_rule_target_declared",
  "value_map_carrier_introduction_rule_target_declared",
  "ref_value_carrier_pair_rule_target_declared",
  "carrier_introduction_premises_named",
  "carrier_introduction_conclusion_named",
];

const DIRECT_SOURCE_SOUNDNESS_FIELDS = [
  "ref_carrier_introduction_rule_available",
  "value_map_carrier_introduction_rule_available",
  "ref_value_carrier_pair_rule_available",
  "ref_carrier_rule_derivation_present",
  "value_map_carrier_rule_derivation_present",
  "carrier_rule_soundness_proof_present",
  "carrier_rule_application_proof_present",
];

const DIRECT_SOURCE_OUTPUT_FIELDS = [
  "same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed",
  "same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed",
  "ref_value_non_domain_carrier_pair_constructed",
  "all_carrier_fields_constructed",
  "constructed_witness_object_id_present",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "endpoint_ref_and_value_map_same_witness_object_proven",
  "witness_object_membership_proof_present",
];

const CARRIER_ADMISSION_INPUT_FIELDS = [
  "endpoint_value_binding_map_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_target_ref_inherited",
  "binding_contract_satisfaction_test_applied",
  "full_endpoint_boundary_binding_construction_test_applied",
  "carrier_admission_test_applied",
];

const CARRIER_ADMISSION_COMPLETION_FIELDS = [
  "binding_contract_satisfied",
  "witness_object_has_contract_link",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
];

const LOCKED_DOWNSTREAM_FIELDS = [
  "direct_source_promotion_rejected",
  "carrier_admission_route_selected",
  "carrier_admission_route_ready",
  "residual_data_construction_ready",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...DIRECT_SOURCE_PREMISE_FIELDS,
  ...DIRECT_SOURCE_SOUNDNESS_FIELDS,
  ...DIRECT_SOURCE_OUTPUT_FIELDS,
  ...CARRIER_ADMISSION_INPUT_FIELDS,
  ...CARRIER_ADMISSION_COMPLETION_FIELDS,
  ...LOCKED_DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_direct_source_premise_ready",
  "receiver_direct_source_premise_ready",
  "combined_direct_source_premise_pair_ready",
  "source_direct_source_promotion_rejected",
  "receiver_direct_source_promotion_rejected",
  "combined_direct_source_promotion_pair_rejected",
  "source_carrier_admission_route_selected",
  "receiver_carrier_admission_route_selected",
  "combined_carrier_admission_route_pair_selected",
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
  "combined_ref_value_non_domain_carrier_pair_constructed",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const ROUTE_METHODS = [
  {
    method_id: "direct_source_promotion_premise_check",
    output_kind: "direct-source-route-input",
    description:
      "Check that the ref/value source handles, source candidates, and direct carrier-introduction rule targets are declared.",
    required_fields: DIRECT_SOURCE_PREMISE_FIELDS,
  },
  {
    method_id: "direct_source_promotion_soundness_check",
    output_kind: "direct-source-route-soundness",
    description:
      "Require proof-grade carrier-introduction rules, derivations, soundness, and application proof before source handles can become same-packet carrier fields.",
    required_fields: DIRECT_SOURCE_SOUNDNESS_FIELDS,
  },
  {
    method_id: "direct_source_promotion_output_check",
    output_kind: "direct-source-route-output",
    description:
      "Reject direct promotion unless it actually constructs same-packet ref/value non-domain carrier fields, identity, and membership proof.",
    required_fields: DIRECT_SOURCE_OUTPUT_FIELDS,
  },
  {
    method_id: "carrier_admission_route_input_check",
    output_kind: "carrier-admission-route-input",
    description:
      "Check that the binding-contract, full-binding, and carrier-admission tests have been applied from the endpoint value-binding map route.",
    required_fields: CARRIER_ADMISSION_INPUT_FIELDS,
  },
  {
    method_id: "carrier_admission_route_completion_check",
    output_kind: "carrier-admission-route-completion",
    description:
      "Require binding contract satisfaction, witness-object contract link, full endpoint boundary binding, and both carrier admissions before row data can be consumed.",
    required_fields: CARRIER_ADMISSION_COMPLETION_FIELDS,
  },
  {
    method_id: "row_and_branch_authorization_guard",
    output_kind: "row-and-branch-authorization",
    description:
      "Keep residual construction, row consumption, and branch-chart authorization false until the selected carrier-admission route is complete.",
    required_fields: [
      "carrier_admission_route_ready",
      "residual_data_construction_ready",
      "row_consumption_authorized",
      "branch_chart_authorized",
    ],
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "direct_source_promotion_rule_soundness",
    missing_field: "carrier_rule_soundness_proof_present",
    required_evidence:
      "A proof that direct promotion of source endpoint-boundary-binding refs and endpoint value-binding maps preserves the same-packet witness-object carrier contract.",
  },
  {
    burden_id: "direct_source_promotion_application",
    missing_field: "carrier_rule_application_proof_present",
    required_evidence:
      "Endpoint-by-endpoint application proof for any direct source-handle carrier-introduction rule.",
  },
  {
    burden_id: "binding_contract_satisfaction",
    missing_field: "binding_contract_satisfied",
    required_evidence:
      "A satisfaction proof for the inherited full endpoint boundary-binding contract target.",
  },
  {
    burden_id: "witness_object_contract_link",
    missing_field: "witness_object_has_contract_link",
    required_evidence:
      "An actual witness-object contract link tying the endpoint value-binding map to the full binding contract.",
  },
  {
    burden_id: "full_endpoint_boundary_binding",
    missing_field: "full_endpoint_boundary_binding_constructed",
    required_evidence:
      "A proof-grade full endpoint boundary binding, not only a source value map or first primitive binding.",
  },
  {
    burden_id: "endpoint_boundary_binding_ref_carrier_admission",
    missing_field: "endpoint_boundary_binding_ref_carrier_unblocked",
    required_evidence:
      "Carrier admission for the endpoint-boundary-binding reference after the full endpoint boundary binding exists.",
  },
  {
    burden_id: "endpoint_value_binding_map_carrier_admission",
    missing_field: "endpoint_value_binding_map_carrier_unblocked",
    required_evidence:
      "Carrier admission for the endpoint value-binding map after the full endpoint boundary binding exists.",
  },
  {
    burden_id: "same_packet_ref_value_carrier_pair",
    missing_field: "ref_value_non_domain_carrier_pair_constructed",
    required_evidence:
      "A same-packet non-domain carrier pair for the endpoint-boundary-binding ref and endpoint value-binding map.",
  },
  {
    burden_id: "constructed_witness_object_identity",
    missing_field: "same_constructed_witness_object_identity_proof_present",
    required_evidence:
      "Constructed witness-object identity and membership proof after the carrier fields exist.",
  },
];

function parseArgs(argv) {
  const args = {
    ruleTargetPacket: DEFAULT_RULE_TARGET_PACKET,
    bindingPacket: DEFAULT_BINDING_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--rule-target-packet") {
      args.ruleTargetPacket = argv[++index];
    } else if (arg === "--binding-packet") {
      args.bindingPacket = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision.mjs [options]

Options:
  --rule-target-packet PATH  Ref/value non-domain carrier rule target packet JSON.
  --binding-packet PATH      Binding contract/full-binding/carrier-admission attempt packet JSON.
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
  if (!Array.isArray(rows)) {
    throw new Error(`Missing ${label} rows.`);
  }
  for (const row of rows) {
    const id = row[key];
    if (!id) {
      throw new Error(`Missing ${label} id field ${key}.`);
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

function assertPacket(packet, status, label) {
  if (packet.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${packet.packet_id}`);
  }
  if (packet.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${label} fold-coordinate packet id: ${packet.fold_coordinate_packet_id}`);
  }
  if (packet.status !== status) {
    throw new Error(`Unexpected ${label} status: ${packet.status}`);
  }
  if (packet.branch_chart_authorized || packet.preledger_pass || packet.updates_live_ledger || packet.row_closure) {
    throw new Error(`Refusing route decision from authorized ${label}.`);
  }
}

function assertSources(ruleTarget, binding) {
  assertPacket(ruleTarget, RULE_TARGET_STATUS, "ref/value carrier rule target");
  assertPacket(binding, BINDING_STATUS, "binding/full-binding/carrier-admission packet");
  if (ruleTarget.summary?.endpoint_functionals !== 4 || binding.summary?.endpoint_functionals !== 4) {
    throw new Error("Expected four endpoint functionals in both source packets.");
  }
  if (ruleTarget.summary?.residual_consumer_rows !== 3 || binding.summary?.residual_consumer_rows !== 3) {
    throw new Error("Expected three residual consumer rows in both source packets.");
  }
}

function assertSameEndpoint(ruleEndpoint, bindingEndpoint) {
  for (const field of ["id", "endpoint_functional_id", "role", "witness_object_symbol"]) {
    if (
      Object.hasOwn(ruleEndpoint, field) &&
      Object.hasOwn(bindingEndpoint, field) &&
      ruleEndpoint[field] !== bindingEndpoint[field]
    ) {
      throw new Error(`Endpoint mismatch for ${ruleEndpoint.id}: ${field}`);
    }
  }
}

function assertSameRow(ruleRow, bindingRow) {
  for (const field of ["row_id", "source_variable", "receiver_variable", "failed_side", "boundary_side"]) {
    if (
      Object.hasOwn(ruleRow, field) &&
      Object.hasOwn(bindingRow, field) &&
      ruleRow[field] !== bindingRow[field]
    ) {
      throw new Error(`Row mismatch for ${ruleRow.row_id}: ${field}`);
    }
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
    failure_codes: missingFields.map((field) => `route_decision_missing_${field}`),
    passed: missingFields.length === 0,
  };
}

function missingBurdens(fields) {
  return PROOF_BURDENS
    .filter((burden) => fields[burden.missing_field] !== true)
    .map((burden) => ({
      ...burden,
      satisfied: false,
    }));
}

function buildEndpointRouteDecision(ruleEndpoint, bindingEndpoint) {
  assertSameEndpoint(ruleEndpoint, bindingEndpoint);
  const ruleFields = ruleEndpoint.required_fields_present || {};
  const bindingFields = bindingEndpoint.required_fields_present || {};
  const fields = {};
  for (const field of DIRECT_SOURCE_PREMISE_FIELDS) {
    fields[field] = ruleFields[field] === true;
  }
  for (const field of DIRECT_SOURCE_SOUNDNESS_FIELDS) {
    fields[field] = ruleFields[field] === true;
  }
  for (const field of DIRECT_SOURCE_OUTPUT_FIELDS) {
    fields[field] = ruleFields[field] === true;
  }
  for (const field of CARRIER_ADMISSION_INPUT_FIELDS) {
    fields[field] = bindingFields[field] === true;
  }
  for (const field of CARRIER_ADMISSION_COMPLETION_FIELDS) {
    fields[field] = bindingFields[field] === true;
  }
  const directPremisesReady = DIRECT_SOURCE_PREMISE_FIELDS.every((field) => fields[field] === true);
  const directSoundnessReady = DIRECT_SOURCE_SOUNDNESS_FIELDS.every((field) => fields[field] === true);
  const directOutputsReady = DIRECT_SOURCE_OUTPUT_FIELDS.every((field) => fields[field] === true);
  const carrierAdmissionInputsReady =
    CARRIER_ADMISSION_INPUT_FIELDS.every((field) => fields[field] === true);
  const carrierAdmissionRouteReady =
    carrierAdmissionInputsReady &&
    CARRIER_ADMISSION_COMPLETION_FIELDS.every((field) => fields[field] === true);
  fields.direct_source_promotion_rejected = directPremisesReady && (!directSoundnessReady || !directOutputsReady);
  fields.carrier_admission_route_selected = fields.direct_source_promotion_rejected && carrierAdmissionInputsReady;
  fields.carrier_admission_route_ready = carrierAdmissionRouteReady;
  fields.residual_data_construction_ready = false;
  fields.row_consumption_authorized = false;
  fields.branch_chart_authorized = false;
  const methodResults = ROUTE_METHODS.map((method) => methodResult(method, fields));
  const missingProofBurdens = missingBurdens(fields);
  return {
    id: ruleEndpoint.id,
    endpoint_functional_id: ruleEndpoint.endpoint_functional_id,
    role: ruleEndpoint.role,
    route_decision_id: `ref_value_carrier_introduction_route_decision:${ruleEndpoint.id}`,
    source_ref_value_non_domain_carrier_rule_target_id:
      ruleEndpoint.ref_value_non_domain_carrier_rule_target_id,
    source_binding_contract_full_binding_carrier_admission_attempt_id:
      bindingEndpoint.binding_contract_full_binding_carrier_admission_attempt_id,
    endpoint_boundary_binding_ref_id:
      ruleEndpoint.endpoint_boundary_binding_ref_id || bindingEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    endpoint_value_binding_map_id:
      ruleEndpoint.endpoint_value_binding_map_id || bindingEndpoint.source_endpoint_value_binding_map_id,
    source_contract_target_id: bindingEndpoint.source_contract_target_id,
    witness_object_symbol: ruleEndpoint.witness_object_symbol || bindingEndpoint.witness_object_symbol,
    direct_source_promotion_route: {
      route_id: `direct_source_promotion_route:${ruleEndpoint.id}`,
      status: "rejected-unsound-with-current-evidence",
      premises_ready: directPremisesReady,
      proof_grade_soundness_ready: directSoundnessReady,
      outputs_ready: directOutputsReady,
      rejection:
        "Source refs and value maps are source handles and source candidates only. No rule, derivation, soundness proof, application proof, or constructed same-packet carrier pair is present.",
    },
    carrier_admission_route: {
      route_id: `binding_full_binding_carrier_admission_route:${ruleEndpoint.id}`,
      status: carrierAdmissionRouteReady ? "selected-ready" : "selected-but-blocked",
      inputs_ready: carrierAdmissionInputsReady,
      completion_ready: carrierAdmissionRouteReady,
      missing_completion_fields:
        CARRIER_ADMISSION_COMPLETION_FIELDS.filter((field) => fields[field] !== true),
      selection_reason:
        "This route preserves the existing binding contract and carrier-admission guard instead of promoting source handles directly into witness-object carrier fields.",
    },
    selected_route: "binding-contract-full-binding-carrier-admission-route",
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    direct_source_premise_ready: directPremisesReady,
    direct_source_promotion_rejected: fields.direct_source_promotion_rejected,
    carrier_admission_route_selected: fields.carrier_admission_route_selected,
    carrier_admission_route_ready: fields.carrier_admission_route_ready,
    ref_value_non_domain_carrier_pair_constructed:
      fields.ref_value_non_domain_carrier_pair_constructed,
    same_constructed_witness_object_identity_proof_present:
      fields.same_constructed_witness_object_identity_proof_present,
    row_consumption_authorized: false,
    branch_chart_authorized: false,
    obstruction:
      "Direct source-handle promotion is rejected because no carrier-introduction rule, soundness proof, or application proof is available. The selected binding/full-binding/carrier-admission route is blocked by missing binding contract satisfaction, witness-object contract link, full endpoint boundary binding, and carrier admissions.",
  };
}

function buildRowRouteDecision(ruleRow, bindingRow, endpointById) {
  assertSameRow(ruleRow, bindingRow);
  const sourceEndpoint = requireMapped(endpointById, ruleRow.source_variable, `source endpoint for ${ruleRow.row_id}`);
  const receiverEndpoint = requireMapped(
    endpointById,
    ruleRow.receiver_variable,
    `receiver endpoint for ${ruleRow.row_id}`
  );
  const fields = {
    row_locator_resolved: ruleRow.required_fields_present?.row_locator_resolved === true,
    source_direct_source_premise_ready: sourceEndpoint.direct_source_premise_ready === true,
    receiver_direct_source_premise_ready: receiverEndpoint.direct_source_premise_ready === true,
    combined_direct_source_premise_pair_ready: false,
    source_direct_source_promotion_rejected: sourceEndpoint.direct_source_promotion_rejected === true,
    receiver_direct_source_promotion_rejected: receiverEndpoint.direct_source_promotion_rejected === true,
    combined_direct_source_promotion_pair_rejected: false,
    source_carrier_admission_route_selected: sourceEndpoint.carrier_admission_route_selected === true,
    receiver_carrier_admission_route_selected: receiverEndpoint.carrier_admission_route_selected === true,
    combined_carrier_admission_route_pair_selected: false,
    source_binding_contract_satisfied:
      sourceEndpoint.required_fields_present.binding_contract_satisfied === true,
    receiver_binding_contract_satisfied:
      receiverEndpoint.required_fields_present.binding_contract_satisfied === true,
    combined_binding_contract_pair_satisfied: false,
    source_full_endpoint_boundary_binding_constructed:
      sourceEndpoint.required_fields_present.full_endpoint_boundary_binding_constructed === true,
    receiver_full_endpoint_boundary_binding_constructed:
      receiverEndpoint.required_fields_present.full_endpoint_boundary_binding_constructed === true,
    combined_full_endpoint_boundary_binding_pair_constructed: false,
    source_endpoint_boundary_binding_ref_carrier_unblocked:
      sourceEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    receiver_endpoint_boundary_binding_ref_carrier_unblocked:
      receiverEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    combined_endpoint_boundary_binding_ref_carrier_pair_unblocked: false,
    source_endpoint_value_binding_map_carrier_unblocked:
      sourceEndpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked === true,
    receiver_endpoint_value_binding_map_carrier_unblocked:
      receiverEndpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked === true,
    combined_endpoint_value_binding_map_carrier_pair_unblocked: false,
    combined_ref_value_non_domain_carrier_pair_constructed: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_direct_source_premise_pair_ready =
    fields.source_direct_source_premise_ready && fields.receiver_direct_source_premise_ready;
  fields.combined_direct_source_promotion_pair_rejected =
    fields.source_direct_source_promotion_rejected && fields.receiver_direct_source_promotion_rejected;
  fields.combined_carrier_admission_route_pair_selected =
    fields.source_carrier_admission_route_selected && fields.receiver_carrier_admission_route_selected;
  fields.combined_binding_contract_pair_satisfied =
    fields.source_binding_contract_satisfied && fields.receiver_binding_contract_satisfied;
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
    row_id: ruleRow.row_id,
    cover_id: ruleRow.cover_id,
    ledger: ruleRow.ledger,
    source_interval: ruleRow.source_interval,
    receiver_interval: ruleRow.receiver_interval,
    failed_side: ruleRow.failed_side,
    boundary_side: ruleRow.boundary_side,
    source_variable: ruleRow.source_variable,
    receiver_variable: ruleRow.receiver_variable,
    route_decision_pair_id: `ref_value_carrier_introduction_route_decision_pair:${ruleRow.row_id}`,
    source_selected_route: sourceEndpoint.selected_route,
    receiver_selected_route: receiverEndpoint.selected_route,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row rejects direct source-handle promotion on both endpoints and selects the carrier-admission route on both endpoints, but binding contract satisfaction, full endpoint boundary bindings, carrier admissions, residual data, row consumption, and branch-chart authorization remain absent.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function buildPacket(sources, sourcePaths) {
  assertSources(sources.ruleTarget, sources.binding);
  const bindingById = idMap(
    sources.binding.endpoint_binding_contract_full_binding_carrier_admission_attempts,
    "id",
    "binding endpoint"
  );
  const endpointDecisions =
    sources.ruleTarget.endpoint_ref_value_non_domain_carrier_rule_targets.map((ruleEndpoint) =>
      buildEndpointRouteDecision(
        ruleEndpoint,
        requireMapped(bindingById, ruleEndpoint.id, `binding endpoint ${ruleEndpoint.id}`)
      )
    );
  const endpointById = idMap(endpointDecisions, "id", "route decision endpoint");
  const bindingRowsById = idMap(
    sources.binding.row_binding_contract_full_binding_carrier_admission_attempts,
    "row_id",
    "binding row"
  );
  const rowDecisions =
    sources.ruleTarget.row_ref_value_non_domain_carrier_rule_targets.map((ruleRow) =>
      buildRowRouteDecision(
        ruleRow,
        requireMapped(bindingRowsById, ruleRow.row_id, `binding row ${ruleRow.row_id}`),
        endpointById
      )
    );
  const endpointFieldCounts = fieldCounts(
    endpointDecisions,
    ENDPOINT_FIELDS,
    (endpoint, field) => endpoint.required_fields_present[field]
  );
  const rowFieldCounts = fieldCounts(rowDecisions, ROW_FIELDS, (row, field) => row.required_fields_present[field]);
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Ref/Value Carrier-Introduction Route Decision",
    claim_level:
      "priority-only fail-closed route decision; direct source-handle promotion is rejected for 4 / 4 endpoint functionals because carrier-introduction rules, derivations, soundness, application proof, and same-packet carrier outputs are absent; the binding/full-binding/carrier-admission route is selected but blocked",
    source_artifacts: {
      ref_value_non_domain_carrier_rule_target: artifactRecord(sourcePaths.ruleTarget),
      binding_contract_full_binding_carrier_admission_construction_attempt:
        artifactRecord(sourcePaths.binding),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    row_closure: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    route_decision: {
      direct_source_promotion_route: {
        status: "rejected-priority-only",
        blocker_fields: DIRECT_SOURCE_SOUNDNESS_FIELDS,
        reason:
          "The current packet contains source handles, source candidates, and rule targets only. Direct promotion would require a new proof-grade rule with derivation, soundness, and application proof.",
      },
      selected_route: "binding-contract-full-binding-carrier-admission-route",
      selected_route_status: "selected-but-blocked",
      selected_route_reason:
        "The only route compatible with the existing proof contract is to satisfy the binding contract, construct the full endpoint boundary binding, then admit the endpoint-boundary-binding ref and endpoint value-binding map as carriers.",
      no_row_consumption_guard:
        "No row may consume ref/value carrier data until the selected route constructs both endpoint carriers for the row.",
    },
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    route_methods: ROUTE_METHODS,
    proof_burdens: PROOF_BURDENS,
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    endpoint_ref_value_carrier_introduction_route_decisions: endpointDecisions,
    row_ref_value_carrier_introduction_route_decisions: rowDecisions,
    summary: {
      endpoint_functionals: endpointDecisions.length,
      residual_consumer_rows: rowDecisions.length,
      direct_source_premise_sets_ready:
        countTrue(endpointDecisions, (endpoint) => endpoint.direct_source_premise_ready),
      direct_source_promotion_routes_rejected:
        countTrue(endpointDecisions, (endpoint) => endpoint.direct_source_promotion_rejected),
      carrier_admission_routes_selected:
        countTrue(endpointDecisions, (endpoint) => endpoint.carrier_admission_route_selected),
      binding_contract_satisfaction_tests_applied:
        endpointFieldCounts.binding_contract_satisfaction_test_applied,
      binding_contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      full_endpoint_boundary_binding_construction_tests_applied:
        endpointFieldCounts.full_endpoint_boundary_binding_construction_test_applied,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      carrier_admission_tests_applied:
        endpointFieldCounts.carrier_admission_test_applied,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_binding_map_carriers_unblocked:
        endpointFieldCounts.endpoint_value_binding_map_carrier_unblocked,
      ref_value_non_domain_carrier_pairs_constructed:
        endpointFieldCounts.ref_value_non_domain_carrier_pair_constructed,
      constructed_witness_object_identities:
        endpointFieldCounts.same_constructed_witness_object_identity_proof_present,
      row_direct_source_premise_pairs_ready:
        rowFieldCounts.combined_direct_source_premise_pair_ready,
      row_route_decision_pairs_selected:
        rowFieldCounts.combined_carrier_admission_route_pair_selected,
      row_binding_contract_pairs_satisfied:
        rowFieldCounts.combined_binding_contract_pair_satisfied,
      row_full_endpoint_boundary_binding_pairs_constructed:
        rowFieldCounts.combined_full_endpoint_boundary_binding_pair_constructed,
      row_carrier_admission_pairs_unblocked:
        rowFieldCounts.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked,
      row_value_map_carrier_admission_pairs_unblocked:
        rowFieldCounts.combined_endpoint_value_binding_map_carrier_pair_unblocked,
      row_consumption_count: rowFieldCounts.row_consumed,
      branch_chart_authorized: false,
    },
    authorization_lock: {
      branch_chart_authorized: false,
      row_consumption_count: rowFieldCounts.row_consumed,
      reason:
        "Direct source-handle promotion is rejected and the selected carrier-admission route has not supplied contract satisfaction, full endpoint boundary binding, or carrier admission.",
    },
    capture_decision:
      "priority-only; the packet records a fail-closed proof-route decision and should not be promoted to reader-facing corpus prose until the selected carrier-admission route supplies a constructive theorem step.",
  };
}

function markdownTable(headers, rows) {
  const header = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`);
  return [header, sep, ...body].join("\n");
}

function buildReport(packet, jsonPath) {
  const sourceRows = Object.entries(packet.source_artifacts).map(([label, artifact]) => [
    label,
    artifact.basename,
    artifact.sha256,
  ]);
  const endpointRows = packet.endpoint_ref_value_carrier_introduction_route_decisions.map((endpoint) => [
    endpoint.id,
    endpoint.direct_source_promotion_route.status,
    endpoint.carrier_admission_route.status,
    String(endpoint.required_fields_present.binding_contract_satisfied),
    String(endpoint.required_fields_present.full_endpoint_boundary_binding_constructed),
    String(endpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked),
    String(endpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked),
  ]);
  const rowRows = packet.row_ref_value_carrier_introduction_route_decisions.map((row) => [
    row.row_id,
    String(row.required_fields_present.combined_direct_source_promotion_pair_rejected),
    String(row.required_fields_present.combined_carrier_admission_route_pair_selected),
    String(row.required_fields_present.combined_binding_contract_pair_satisfied),
    String(row.required_fields_present.combined_full_endpoint_boundary_binding_pair_constructed),
    String(row.required_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked),
    String(row.required_fields_present.row_consumed),
  ]);
  const burdenRows = packet.proof_burdens.map((burden) => [
    burden.burden_id,
    burden.missing_field,
    burden.required_evidence,
  ]);
  return `# Ref/Value Carrier-Introduction Route Decision

Status: ${packet.status}

Claim level: ${packet.claim_level}

Output JSON: ${path.basename(jsonPath)}

## Source Artifacts

${markdownTable(["Source", "Artifact", "SHA-256"], sourceRows)}

## Route Decision

Direct source-handle promotion is rejected for the current packet. The source
endpoint-boundary-binding refs and endpoint value-binding maps are available as
source handles and source candidates, but no carrier-introduction rule,
derivation, soundness proof, application proof, or same-packet carrier output
is present. The selected route is the binding-contract, full endpoint
boundary-binding, and carrier-admission route; it is selected but still blocked.

## Endpoint Route Table

${markdownTable([
    "Endpoint",
    "Direct source route",
    "Selected route",
    "Contract satisfied",
    "Full binding",
    "Ref carrier",
    "Value-map carrier",
  ], endpointRows)}

## Row Route Table

${markdownTable([
    "Row",
    "Direct pair rejected",
    "Admission pair selected",
    "Contract pair",
    "Full-binding pair",
    "Ref-carrier pair",
    "Consumed",
  ], rowRows)}

## Summary

- Endpoint functionals: ${packet.summary.endpoint_functionals}
- Residual consumer rows: ${packet.summary.residual_consumer_rows}
- Direct source premise sets ready: ${packet.summary.direct_source_premise_sets_ready}
- Direct source-promotion routes rejected: ${packet.summary.direct_source_promotion_routes_rejected}
- Carrier-admission routes selected: ${packet.summary.carrier_admission_routes_selected}
- Binding contracts satisfied: ${packet.summary.binding_contracts_satisfied}
- Full endpoint boundary bindings constructed: ${packet.summary.full_endpoint_boundary_bindings_constructed}
- Ref/value non-domain carrier pairs constructed: ${packet.summary.ref_value_non_domain_carrier_pairs_constructed}
- Row consumption count: ${packet.summary.row_consumption_count}
- Branch chart authorized: ${packet.summary.branch_chart_authorized}

## Proof Burdens

${markdownTable(["Burden", "Missing field", "Required evidence"], burdenRows)}

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
  const sources = {
    ruleTarget: readJson(args.ruleTargetPacket),
    binding: readJson(args.bindingPacket),
  };
  const packet = buildPacket(sources, {
    ruleTarget: args.ruleTargetPacket,
    binding: args.bindingPacket,
  });
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, packet, args.pretty);
  writeText(reportPath, buildReport(packet, jsonPath));
  console.log(JSON.stringify({
    status: packet.status,
    json: jsonPath,
    json_sha256: sha256File(jsonPath),
    report: reportPath,
    report_sha256: sha256File(reportPath),
    summary: packet.summary,
  }, null, 2));
}

main();

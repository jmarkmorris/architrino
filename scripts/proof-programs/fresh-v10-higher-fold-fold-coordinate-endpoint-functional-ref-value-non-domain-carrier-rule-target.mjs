#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_IDENTITY_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_NON_DOMAIN_CARRIER_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_REF_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const IDENTITY_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt-fail-closed-domain-chart-ref-value-sources-present-non-domain-carriers-and-identity-proof-absent-no-row-consumption";
const NON_DOMAIN_CARRIER_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption";
const REF_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";
const VALUE_MAP_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-rule-target-fail-closed-ref-value-sources-and-carrier-candidates-present-carrier-introduction-rules-absent-no-row-consumption";

const SOURCE_PREMISE_FIELDS = [
  "domain_chart_carrier_subfield_constructed",
  "source_endpoint_boundary_binding_ref_constructed",
  "source_witness_object_has_endpoint_boundary_binding_ref",
  "endpoint_boundary_binding_ref_targets_first_primitive",
  "endpoint_boundary_binding_ref_target_attachment_certified",
  "source_endpoint_value_binding_map_constructed",
  "source_witness_object_has_endpoint_value_binding_map",
  "endpoint_value_bound_to_boundary_binding",
  "endpoint_value_binding_map_targets_first_primitive",
  "endpoint_value_binding_map_ref_values_certified",
  "endpoint_boundary_binding_ref_carrier_source_candidate_declared",
  "endpoint_value_binding_map_carrier_source_candidate_declared",
  "non_domain_carrier_obstruction_present",
  "same_packet_identity_target_present",
];

const RULE_TARGET_FIELDS = [
  "ref_carrier_introduction_rule_target_declared",
  "value_map_carrier_introduction_rule_target_declared",
  "ref_value_carrier_pair_rule_target_declared",
  "carrier_introduction_premises_named",
  "carrier_introduction_conclusion_named",
];

const RULE_AVAILABILITY_FIELDS = [
  "ref_carrier_introduction_rule_available",
  "value_map_carrier_introduction_rule_available",
  "ref_value_carrier_pair_rule_available",
  "ref_carrier_rule_derivation_present",
  "value_map_carrier_rule_derivation_present",
  "carrier_rule_soundness_proof_present",
  "carrier_rule_application_proof_present",
];

const CARRIER_OUTPUT_FIELDS = [
  "same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed",
  "same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed",
  "ref_value_non_domain_carrier_pair_constructed",
  "all_carrier_fields_constructed",
];

const IDENTITY_OUTPUT_FIELDS = [
  "constructed_witness_object_id_present",
  "same_constructed_witness_object_identity_proof_present",
  "endpoint_boundary_binding_ref_member_of_witness_object_proven",
  "endpoint_value_binding_map_member_of_witness_object_proven",
  "endpoint_ref_and_value_map_same_witness_object_proven",
  "witness_object_membership_proof_present",
];

const DOWNSTREAM_OUTPUT_FIELDS = [
  "actual_contract_link_rule_available",
  "witness_object_contract_link_constructed",
  "binding_contract_satisfied",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
  "row_consumption_authorized",
  "branch_chart_authorized",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_PREMISE_FIELDS,
  ...RULE_TARGET_FIELDS,
  ...RULE_AVAILABILITY_FIELDS,
  ...CARRIER_OUTPUT_FIELDS,
  ...IDENTITY_OUTPUT_FIELDS,
  ...DOWNSTREAM_OUTPUT_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_ref_value_source_premise_ready",
  "receiver_ref_value_source_premise_ready",
  "combined_ref_value_source_premise_ready",
  "source_carrier_rule_target_declared",
  "receiver_carrier_rule_target_declared",
  "combined_carrier_rule_target_pair_declared",
  "source_non_domain_carrier_obstruction_present",
  "receiver_non_domain_carrier_obstruction_present",
  "combined_non_domain_carrier_obstruction_pair_present",
  "source_ref_value_carrier_pair_constructed",
  "receiver_ref_value_carrier_pair_constructed",
  "combined_ref_value_carrier_pair_constructed",
  "source_same_packet_identity_proof_present",
  "receiver_same_packet_identity_proof_present",
  "combined_same_packet_identity_proof_pair_present",
  "source_witness_object_membership_proof_present",
  "receiver_witness_object_membership_proof_present",
  "combined_witness_object_membership_proof_pair_present",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "ref_value_carrier_source_premise_check",
    output_kind: "ref-value-carrier-source-premises",
    description:
      "Check whether the endpoint has the domain-chart carrier subfield, source endpoint-boundary-binding ref, source endpoint value-binding map, and carrier source candidates.",
    required_fields: SOURCE_PREMISE_FIELDS,
  },
  {
    method_id: "carrier_introduction_rule_target_check",
    output_kind: "carrier-introduction-rule-target",
    description:
      "Declare the rule target that would introduce the ref/value source handles as non-domain carrier fields in one same-packet witness object.",
    required_fields: RULE_TARGET_FIELDS,
  },
  {
    method_id: "carrier_introduction_rule_availability_check",
    output_kind: "carrier-introduction-rule-availability",
    description:
      "Require proof-grade carrier-introduction rules, derivations, soundness, and application proof before any source handle becomes a carrier field.",
    required_fields: RULE_AVAILABILITY_FIELDS,
  },
  {
    method_id: "ref_value_non_domain_carrier_construction_check",
    output_kind: "ref-value-non-domain-carrier-pair",
    description:
      "Check whether the ref and value-map non-domain carrier fields are constructed as one same-packet carrier pair.",
    required_fields: [
      "ref_value_carrier_pair_rule_available",
      "carrier_rule_soundness_proof_present",
      "carrier_rule_application_proof_present",
      ...CARRIER_OUTPUT_FIELDS,
    ],
  },
  {
    method_id: "constructed_identity_unlock_check",
    output_kind: "constructed-witness-object-identity-unlock",
    description:
      "Keep constructed witness-object identity, membership, contract, full binding, row, and branch outputs locked until the carrier pair is proof-grade.",
    required_fields: [
      "ref_value_non_domain_carrier_pair_constructed",
      "all_carrier_fields_constructed",
      ...IDENTITY_OUTPUT_FIELDS,
      ...DOWNSTREAM_OUTPUT_FIELDS,
    ],
  },
];

const PROOF_BURDENS = [
  {
    burden_id: "endpoint_boundary_binding_ref_carrier_introduction_rule",
    missing_field: "ref_carrier_introduction_rule_available",
    required_evidence:
      "A proof-grade rule that promotes the endpoint-boundary-binding ref source handle into a same-packet non-domain witness-object carrier field.",
  },
  {
    burden_id: "endpoint_value_binding_map_carrier_introduction_rule",
    missing_field: "value_map_carrier_introduction_rule_available",
    required_evidence:
      "A proof-grade rule that promotes the endpoint value-binding map source handle into a same-packet non-domain witness-object carrier field.",
  },
  {
    burden_id: "ref_value_carrier_pair_rule",
    missing_field: "ref_value_carrier_pair_rule_available",
    required_evidence:
      "A joint rule that places the ref and value-map carrier fields in one same-packet witness object.",
  },
  {
    burden_id: "carrier_introduction_rule_derivation",
    missing_field: "ref_carrier_rule_derivation_present",
    required_evidence:
      "A derivation for the ref carrier-introduction rule from the existing endpoint-boundary-binding construction contract.",
  },
  {
    burden_id: "value_map_carrier_rule_derivation",
    missing_field: "value_map_carrier_rule_derivation_present",
    required_evidence:
      "A derivation for the value-map carrier-introduction rule from the endpoint value-binding map contract.",
  },
  {
    burden_id: "carrier_introduction_rule_soundness",
    missing_field: "carrier_rule_soundness_proof_present",
    required_evidence:
      "A soundness proof that the rule preserves the same-packet witness-object carrier contract.",
  },
  {
    burden_id: "carrier_introduction_rule_application",
    missing_field: "carrier_rule_application_proof_present",
    required_evidence:
      "An application proof for each endpoint that verifies every premise of the carrier-introduction rule.",
  },
  {
    burden_id: "ref_value_non_domain_carrier_pair",
    missing_field: "ref_value_non_domain_carrier_pair_constructed",
    required_evidence:
      "Constructed ref and value-map non-domain carrier fields that are proved to belong to one same-packet witness object.",
  },
  {
    burden_id: "constructed_witness_object_identity_unlock",
    missing_field: "same_constructed_witness_object_identity_proof_present",
    required_evidence:
      "A constructed same-packet witness-object identity and membership proof after the carrier pair exists.",
  },
];

function parseArgs(argv) {
  const args = {
    identityPacket: DEFAULT_IDENTITY_PACKET,
    nonDomainCarrierPacket: DEFAULT_NON_DOMAIN_CARRIER_PACKET,
    refPacket: DEFAULT_REF_PACKET,
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--identity-packet") {
      args.identityPacket = argv[++index];
    } else if (arg === "--non-domain-carrier-packet") {
      args.nonDomainCarrierPacket = argv[++index];
    } else if (arg === "--ref-packet") {
      args.refPacket = argv[++index];
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-rule-target.mjs [options]

Options:
  --identity-packet PATH            Same-packet constructed witness-object identity attempt JSON.
  --non-domain-carrier-packet PATH  Same-packet non-domain carrier obstruction packet JSON.
  --ref-packet PATH                 Endpoint-boundary-binding ref construction packet JSON.
  --value-map-packet PATH           Endpoint value-binding map construction packet JSON.
  --out-dir PATH                    Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                          Pretty-print JSON artifact.
  --help                            Show this help.`);
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

function falseFields(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function trueFields(fields) {
  return Object.fromEntries(fields.map((field) => [field, true]));
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
    throw new Error(`Refusing ref/value carrier rule target from authorized ${label}.`);
  }
}

function assertSources(sources) {
  assertPacket(sources.identity, IDENTITY_STATUS, "same-packet identity attempt");
  assertPacket(sources.nonDomainCarrier, NON_DOMAIN_CARRIER_STATUS, "non-domain carrier packet");
  assertPacket(sources.ref, REF_STATUS, "endpoint-boundary-binding ref packet");
  assertPacket(sources.valueMap, VALUE_MAP_STATUS, "endpoint value-binding map packet");
  if (sources.identity.summary?.endpoint_functionals !== 4) {
    throw new Error("Expected four endpoint identity attempts.");
  }
  if (sources.nonDomainCarrier.summary?.endpoint_non_domain_carrier_slots !== 24) {
    throw new Error("Expected 24 non-domain carrier slots in non-domain carrier packet.");
  }
}

function assertSameEndpoint(endpoint, sourceEndpoint, label) {
  for (const field of ["id", "endpoint_functional_id", "role", "witness_object_symbol"]) {
    if (
      Object.hasOwn(endpoint, field) &&
      Object.hasOwn(sourceEndpoint, field) &&
      endpoint[field] !== sourceEndpoint[field]
    ) {
      throw new Error(`Endpoint mismatch for ${endpoint.id} against ${label}: ${field}`);
    }
  }
}

function assertSameRow(row, sourceRow, label) {
  for (const field of ["row_id", "source_variable", "receiver_variable", "failed_side", "boundary_side"]) {
    if (
      Object.hasOwn(row, field) &&
      Object.hasOwn(sourceRow, field) &&
      row[field] !== sourceRow[field]
    ) {
      throw new Error(`Row mismatch for ${row.row_id} against ${label}: ${field}`);
    }
  }
}

function carrierObstruction(endpoint, carrierField) {
  const obstruction = endpoint.non_domain_carrier_obstructions.find(
    (entry) => entry.carrier_field === carrierField
  );
  if (!obstruction) {
    throw new Error(`Missing non-domain carrier obstruction ${carrierField} for endpoint ${endpoint.id}`);
  }
  return obstruction;
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    output_kind: method.output_kind,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `ref_value_non_domain_carrier_rule_target_missing_${field}`
    ),
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

function endpointSources(identityEndpoint, maps) {
  const nonDomainEndpoint = requireMapped(
    maps.nonDomain,
    identityEndpoint.id,
    `non-domain carrier endpoint ${identityEndpoint.id}`
  );
  const refEndpoint = requireMapped(maps.ref, identityEndpoint.id, `ref endpoint ${identityEndpoint.id}`);
  const valueEndpoint = requireMapped(maps.valueMap, identityEndpoint.id, `value-map endpoint ${identityEndpoint.id}`);
  assertSameEndpoint(identityEndpoint, nonDomainEndpoint, "non-domain carrier packet");
  assertSameEndpoint(identityEndpoint, refEndpoint, "ref packet");
  assertSameEndpoint(identityEndpoint, valueEndpoint, "value-map packet");
  return {
    nonDomainEndpoint,
    refEndpoint,
    valueEndpoint,
  };
}

function buildEndpointRuleTarget(identityEndpoint, sources) {
  const { nonDomainEndpoint, refEndpoint, valueEndpoint } = sources;
  const refCarrier = carrierObstruction(nonDomainEndpoint, "endpoint_boundary_binding_ref");
  const valueCarrier = carrierObstruction(nonDomainEndpoint, "endpoint_value_binding_map");
  const fields = {
    domain_chart_carrier_subfield_constructed:
      identityEndpoint.required_fields_present?.domain_chart_carrier_subfield_constructed === true,
    source_endpoint_boundary_binding_ref_constructed:
      refEndpoint.required_fields_present?.witness_object_endpoint_boundary_binding_ref_constructed === true,
    source_witness_object_has_endpoint_boundary_binding_ref:
      refEndpoint.required_fields_present?.witness_object_has_endpoint_boundary_binding_ref === true,
    endpoint_boundary_binding_ref_targets_first_primitive:
      refEndpoint.required_fields_present?.endpoint_boundary_binding_ref_targets_first_primitive === true,
    endpoint_boundary_binding_ref_target_attachment_certified:
      refEndpoint.required_fields_present?.endpoint_boundary_binding_ref_target_attachment_certified === true,
    source_endpoint_value_binding_map_constructed:
      valueEndpoint.required_fields_present?.endpoint_value_binding_map_constructed === true,
    source_witness_object_has_endpoint_value_binding_map:
      valueEndpoint.required_fields_present?.witness_object_has_endpoint_value_binding_map === true,
    endpoint_value_bound_to_boundary_binding:
      valueEndpoint.required_fields_present?.endpoint_value_bound_to_boundary_binding === true,
    endpoint_value_binding_map_targets_first_primitive:
      valueEndpoint.required_fields_present?.endpoint_value_binding_map_targets_first_primitive === true,
    endpoint_value_binding_map_ref_values_certified:
      valueEndpoint.required_fields_present?.endpoint_value_binding_map_ref_values_certified === true,
    endpoint_boundary_binding_ref_carrier_source_candidate_declared:
      refCarrier.carrier_field_source_candidate_declared === true ||
      identityEndpoint.required_fields_present?.endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared === true,
    endpoint_value_binding_map_carrier_source_candidate_declared:
      valueCarrier.carrier_field_source_candidate_declared === true ||
      identityEndpoint.required_fields_present?.endpoint_value_binding_map_non_domain_carrier_source_candidate_declared === true,
    non_domain_carrier_obstruction_present:
      identityEndpoint.required_fields_present?.non_domain_carrier_obstruction_present === true,
    same_packet_identity_target_present:
      Boolean(identityEndpoint.constructed_witness_object_identity_target),
    ...trueFields(RULE_TARGET_FIELDS),
    ...falseFields(RULE_AVAILABILITY_FIELDS),
    same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed:
      refCarrier.carrier_field_constructed === true,
    same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed:
      valueCarrier.carrier_field_constructed === true,
    ref_value_non_domain_carrier_pair_constructed: false,
    all_carrier_fields_constructed:
      identityEndpoint.required_fields_present?.all_carrier_fields_constructed === true,
    ...falseFields(IDENTITY_OUTPUT_FIELDS),
    ...falseFields(DOWNSTREAM_OUTPUT_FIELDS),
  };
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const missingProofBurdens = missingBurdens(fields);
  return {
    id: identityEndpoint.id,
    endpoint_functional_id: identityEndpoint.endpoint_functional_id,
    role: identityEndpoint.role,
    ref_value_non_domain_carrier_rule_target_id:
      `ref_value_non_domain_carrier_rule_target:${identityEndpoint.id}`,
    source_same_packet_constructed_witness_object_identity_attempt_id:
      identityEndpoint.same_packet_constructed_witness_object_identity_attempt_id,
    source_non_domain_carrier_obstruction_id:
      nonDomainEndpoint.non_domain_carrier_obstruction_id,
    source_ref_carrier_full_binding_construction_attempt_id:
      refEndpoint.ref_carrier_full_binding_construction_attempt_id,
    source_value_binding_map_construction_attempt_id:
      valueEndpoint.endpoint_value_binding_map_construction_attempt_id,
    witness_object_attempt_id:
      identityEndpoint.witness_object_attempt_id || nonDomainEndpoint.witness_object_attempt_id,
    witness_object_symbol:
      identityEndpoint.witness_object_symbol || nonDomainEndpoint.witness_object_symbol,
    endpoint_boundary_binding_ref_id:
      identityEndpoint.endpoint_boundary_binding_ref_id ||
      refEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    endpoint_value_binding_map_id:
      identityEndpoint.endpoint_value_binding_map_id ||
      valueEndpoint.endpoint_value_binding_map_id,
    target_endpoint_ref_value_count:
      identityEndpoint.target_endpoint_ref_value_count,
    source_ref_field_status:
      "source-reference-field-constructed-not-same-packet-carrier-field",
    source_value_map_status:
      "source-value-map-constructed-not-same-packet-carrier-field",
    carrier_introduction_rule_target: {
      target_id: `same_packet_ref_value_carrier_introduction_rule_target:${identityEndpoint.id}`,
      premise_fields: SOURCE_PREMISE_FIELDS,
      conclusion_fields: [
        "same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed",
        "same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed",
        "ref_value_non_domain_carrier_pair_constructed",
      ],
      no_promotion_rule:
        "Source endpoint-boundary-binding refs and endpoint value-binding maps remain source handles until a proof-grade same-packet non-domain carrier-introduction rule, derivation, soundness proof, and application proof are supplied.",
    },
    carrier_source_candidates_used: [
      {
        carrier_field: refCarrier.carrier_field,
        source_ref: refCarrier.source_ref,
        carrier_field_source_candidate_declared: refCarrier.carrier_field_source_candidate_declared,
        carrier_field_constructed: refCarrier.carrier_field_constructed,
        missing_dependencies: refCarrier.missing_dependencies,
      },
      {
        carrier_field: valueCarrier.carrier_field,
        source_ref: valueCarrier.source_ref,
        carrier_field_source_candidate_declared: valueCarrier.carrier_field_source_candidate_declared,
        carrier_field_constructed: valueCarrier.carrier_field_constructed,
        missing_dependencies: valueCarrier.missing_dependencies,
      },
    ],
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    missing_proof_burdens: missingProofBurdens,
    missing_proof_burden_count: missingProofBurdens.length,
    ref_value_source_premise_ready:
      SOURCE_PREMISE_FIELDS.every((field) => fields[field] === true),
    carrier_rule_target_declared:
      RULE_TARGET_FIELDS.every((field) => fields[field] === true),
    carrier_introduction_rules_available:
      RULE_AVAILABILITY_FIELDS.every((field) => fields[field] === true),
    ref_value_non_domain_carrier_pair_constructed:
      fields.ref_value_non_domain_carrier_pair_constructed,
    all_carrier_fields_constructed:
      fields.all_carrier_fields_constructed,
    same_constructed_witness_object_identity_proof_present:
      fields.same_constructed_witness_object_identity_proof_present,
    witness_object_membership_proof_present:
      fields.witness_object_membership_proof_present,
    row_consumption_authorized: false,
    failure_codes: [
      ...missingProofBurdens.map(
        (burden) => `ref_value_non_domain_carrier_rule_target_locked_${burden.missing_field}`
      ),
      "ref_value_non_domain_carrier_rule_target_locked_same_packet_identity",
      "ref_value_non_domain_carrier_rule_target_locked_row_consumption",
    ],
    obstruction:
      "Ref/value source handles and carrier source candidates exist, but no carrier-introduction rule, derivation, soundness proof, or application proof promotes them into same-packet non-domain witness-object carrier fields.",
  };
}

function rowSources(row, maps) {
  const nonDomainRow = requireMapped(maps.nonDomainRows, row.row_id, `non-domain carrier row ${row.row_id}`);
  const refRow = requireMapped(maps.refRows, row.row_id, `ref row ${row.row_id}`);
  const valueRow = requireMapped(maps.valueRows, row.row_id, `value-map row ${row.row_id}`);
  assertSameRow(row, nonDomainRow, "non-domain carrier packet");
  assertSameRow(row, refRow, "ref packet");
  assertSameRow(row, valueRow, "value-map packet");
  return { nonDomainRow, refRow, valueRow };
}

function buildRowRuleTarget(row, endpointById, sources) {
  const sourceEndpoint = requireMapped(endpointById, row.source_variable, `source endpoint for ${row.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, row.receiver_variable, `receiver endpoint for ${row.row_id}`);
  const fields = {
    row_locator_resolved: row.required_fields_present?.row_locator_resolved === true,
    source_ref_value_source_premise_ready: sourceEndpoint.ref_value_source_premise_ready === true,
    receiver_ref_value_source_premise_ready: receiverEndpoint.ref_value_source_premise_ready === true,
    combined_ref_value_source_premise_ready:
      sourceEndpoint.ref_value_source_premise_ready === true &&
      receiverEndpoint.ref_value_source_premise_ready === true,
    source_carrier_rule_target_declared: sourceEndpoint.carrier_rule_target_declared === true,
    receiver_carrier_rule_target_declared: receiverEndpoint.carrier_rule_target_declared === true,
    combined_carrier_rule_target_pair_declared:
      sourceEndpoint.carrier_rule_target_declared === true &&
      receiverEndpoint.carrier_rule_target_declared === true,
    source_non_domain_carrier_obstruction_present:
      sourceEndpoint.required_fields_present.non_domain_carrier_obstruction_present === true,
    receiver_non_domain_carrier_obstruction_present:
      receiverEndpoint.required_fields_present.non_domain_carrier_obstruction_present === true,
    combined_non_domain_carrier_obstruction_pair_present:
      sources.nonDomainRow.required_fields_present?.combined_non_domain_carrier_obstruction_present === true,
    source_ref_value_carrier_pair_constructed: false,
    receiver_ref_value_carrier_pair_constructed: false,
    combined_ref_value_carrier_pair_constructed: false,
    source_same_packet_identity_proof_present: false,
    receiver_same_packet_identity_proof_present: false,
    combined_same_packet_identity_proof_pair_present: false,
    source_witness_object_membership_proof_present: false,
    receiver_witness_object_membership_proof_present: false,
    combined_witness_object_membership_proof_pair_present: false,
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
    source_ref_value_non_domain_carrier_rule_target_id:
      sourceEndpoint.ref_value_non_domain_carrier_rule_target_id,
    receiver_ref_value_non_domain_carrier_rule_target_id:
      receiverEndpoint.ref_value_non_domain_carrier_rule_target_id,
    source_ref_row_fields_present: sources.refRow.required_fields_present,
    source_value_row_fields_present: sources.valueRow.required_fields_present,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver ref/value source premises and rule targets, but neither side has an available carrier-introduction rule or constructed ref/value non-domain carrier pair.",
  };
}

function fieldCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => [
      field,
      countTrue(rows, (row) => row.required_fields_present?.[field]),
    ])
  );
}

function buildPacket(args) {
  const sourceArtifacts = {
    same_packet_constructed_witness_object_identity_attempt: artifactRecord(args.identityPacket),
    non_domain_carrier_obstruction_packet: artifactRecord(args.nonDomainCarrierPacket),
    endpoint_boundary_binding_ref_packet: artifactRecord(args.refPacket),
    endpoint_value_binding_map_packet: artifactRecord(args.valueMapPacket),
  };
  const sources = {
    identity: readJson(args.identityPacket),
    nonDomainCarrier: readJson(args.nonDomainCarrierPacket),
    ref: readJson(args.refPacket),
    valueMap: readJson(args.valueMapPacket),
  };
  assertSources(sources);

  const maps = {
    nonDomain: idMap(
      sources.nonDomainCarrier.endpoint_witness_object_non_domain_carrier_obstruction_packets,
      "id",
      "non-domain carrier endpoints"
    ),
    ref: idMap(
      sources.ref.endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts,
      "id",
      "ref endpoints"
    ),
    valueMap: idMap(
      sources.valueMap.endpoint_value_binding_map_construction_attempts,
      "id",
      "value-map endpoints"
    ),
    nonDomainRows: idMap(
      sources.nonDomainCarrier.row_witness_object_non_domain_carrier_obstruction_packets,
      "row_id",
      "non-domain carrier rows"
    ),
    refRows: idMap(
      sources.ref.row_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts,
      "row_id",
      "ref rows"
    ),
    valueRows: idMap(
      sources.valueMap.row_endpoint_value_binding_map_construction_attempts,
      "row_id",
      "value-map rows"
    ),
  };

  const endpoints =
    sources.identity.endpoint_same_packet_constructed_witness_object_identity_attempts.map((endpoint) =>
      buildEndpointRuleTarget(endpoint, endpointSources(endpoint, maps))
    );
  const endpointById = idMap(endpoints, "id", "ref/value rule target endpoints");
  const rows =
    sources.identity.row_same_packet_constructed_witness_object_identity_attempts.map((row) =>
      buildRowRuleTarget(row, endpointById, rowSources(row, maps))
    );

  const summary = {
    endpoint_functionals: endpoints.length,
    residual_consumer_rows: rows.length,
    source_endpoint_boundary_binding_refs_constructed:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.source_endpoint_boundary_binding_ref_constructed),
    source_endpoint_value_binding_maps_constructed:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.source_endpoint_value_binding_map_constructed),
    endpoint_boundary_binding_ref_carrier_source_candidates_declared:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_source_candidate_declared),
    endpoint_value_binding_map_carrier_source_candidates_declared:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.endpoint_value_binding_map_carrier_source_candidate_declared),
    ref_carrier_rule_targets_declared:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.ref_carrier_introduction_rule_target_declared),
    value_map_carrier_rule_targets_declared:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.value_map_carrier_introduction_rule_target_declared),
    ref_value_pair_rule_targets_declared:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.ref_value_carrier_pair_rule_target_declared),
    ref_carrier_rules_available:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.ref_carrier_introduction_rule_available),
    value_map_carrier_rules_available:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.value_map_carrier_introduction_rule_available),
    ref_value_pair_rules_available:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.ref_value_carrier_pair_rule_available),
    ref_carrier_rule_derivations_present:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.ref_carrier_rule_derivation_present),
    value_map_carrier_rule_derivations_present:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.value_map_carrier_rule_derivation_present),
    carrier_rule_soundness_proofs_present:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.carrier_rule_soundness_proof_present),
    carrier_rule_application_proofs_present:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.carrier_rule_application_proof_present),
    same_packet_endpoint_boundary_binding_ref_carrier_fields_constructed:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed),
    same_packet_endpoint_value_binding_map_carrier_fields_constructed:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed),
    ref_value_non_domain_carrier_pairs_constructed:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.ref_value_non_domain_carrier_pair_constructed),
    all_carrier_fields_constructed:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.all_carrier_fields_constructed),
    constructed_witness_object_ids_present:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.constructed_witness_object_id_present),
    same_constructed_witness_object_identity_proofs_present:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.same_constructed_witness_object_identity_proof_present),
    witness_object_membership_proofs_present:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.witness_object_membership_proof_present),
    witness_object_contract_links_constructed:
      countTrue(endpoints, (endpoint) => endpoint.required_fields_present.witness_object_contract_link_constructed),
    row_ref_value_source_premises_ready:
      countTrue(rows, (row) => row.required_fields_present.combined_ref_value_source_premise_ready),
    row_carrier_rule_target_pairs_ready:
      countTrue(rows, (row) => row.required_fields_present.combined_carrier_rule_target_pair_declared),
    row_ref_value_carrier_pairs_constructed:
      countTrue(rows, (row) => row.required_fields_present.combined_ref_value_carrier_pair_constructed),
    rows_unblocked:
      countTrue(rows, (row) => row.required_fields_present.row_unblocked),
    row_consumption_count:
      countTrue(rows, (row) => row.row_consumed),
    branch_chart_authorized: false,
  };

  return {
    schema: "fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-rule-target/v0",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    claim_level:
      "priority-only fail-closed rule-target packet; source handles and source candidates are present, but carrier-introduction rules and constructed carrier fields are absent",
    theorem_target:
      "For each endpoint functional, derive and apply proof-grade rules that promote the endpoint-boundary-binding ref and endpoint value-binding map source handles into non-domain carrier fields of one same-packet witness object.",
    source_artifacts: sourceArtifacts,
    no_promotion_rule:
      "Endpoint-boundary-binding ref and endpoint value-binding map source handles, even with source-candidate declarations, do not count as same-packet non-domain witness-object carrier fields without explicit carrier-introduction rules, rule derivations, a soundness proof, and endpoint-level application proofs.",
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    construction_methods: CONSTRUCTION_METHODS,
    proof_burdens: PROOF_BURDENS,
    endpoint_ref_value_non_domain_carrier_rule_targets: endpoints,
    row_ref_value_non_domain_carrier_rule_targets: rows,
    endpoint_field_counts: fieldCounts(endpoints, ENDPOINT_FIELDS),
    row_field_counts: fieldCounts(rows, ROW_FIELDS),
    summary,
    authorization_lock: {
      reason:
        "No row may be consumed until the ref/value non-domain carrier pair, all carrier fields, constructed witness-object identity, and same-witness membership proof exist.",
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "priority-only: the packet resolves the next blocker as carrier-introduction rule absence, not ref/value source absence; defer corpus promotion until a proof-grade rule and same-packet carrier construction exist.",
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    preledger_pass: false,
    branch_chart_authorized: false,
    updates_live_ledger: false,
  };
}

function mdTable(headers, rows) {
  const header = `| ${headers.join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`);
  return [header, divider, ...body].join("\n");
}

function yesNo(value) {
  return value ? "yes" : "no";
}

function generateReport(packet, jsonPath, jsonHash) {
  const summary = packet.summary;
  const sourceRows = Object.entries(packet.source_artifacts).map(([key, artifact]) => [
    key,
    artifact.basename,
    artifact.sha256,
  ]);
  const methodRows = packet.construction_methods.map((method) => [
    method.method_id,
    method.output_kind,
    packet.endpoint_ref_value_non_domain_carrier_rule_targets[0].construction_method_results.find(
      (result) => result.method_id === method.method_id
    )?.passed ? "pass" : "fail",
  ]);
  const endpointRows = packet.endpoint_ref_value_non_domain_carrier_rule_targets.map((endpoint) => [
    endpoint.id,
    endpoint.role,
    yesNo(endpoint.required_fields_present.source_endpoint_boundary_binding_ref_constructed),
    yesNo(endpoint.required_fields_present.source_endpoint_value_binding_map_constructed),
    yesNo(endpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_source_candidate_declared),
    yesNo(endpoint.required_fields_present.endpoint_value_binding_map_carrier_source_candidate_declared),
    yesNo(endpoint.carrier_rule_target_declared),
    yesNo(endpoint.carrier_introduction_rules_available),
    yesNo(endpoint.ref_value_non_domain_carrier_pair_constructed),
    yesNo(endpoint.same_constructed_witness_object_identity_proof_present),
  ]);
  const rowRows = packet.row_ref_value_non_domain_carrier_rule_targets.map((row) => [
    row.row_id,
    row.source_variable,
    row.receiver_variable,
    yesNo(row.required_fields_present.combined_ref_value_source_premise_ready),
    yesNo(row.required_fields_present.combined_carrier_rule_target_pair_declared),
    yesNo(row.required_fields_present.combined_ref_value_carrier_pair_constructed),
    yesNo(row.row_consumed),
  ]);
  const burdenRows = packet.proof_burdens.map((burden) => [
    burden.burden_id,
    burden.missing_field,
    burden.required_evidence,
  ]);
  return `# Fold-Coordinate Endpoint Functional Ref/Value Non-Domain Carrier Rule Target

Status: \`${packet.status}\`

Claim level: ${packet.claim_level}

Output JSON: \`${path.basename(jsonPath)}\`

Output JSON SHA-256: \`${jsonHash}\`

## Source Artifacts

${mdTable(["source", "artifact", "sha256"], sourceRows)}

## No-Promotion Rule

${packet.no_promotion_rule}

The packet therefore records a narrow fail-closed result: all four endpoint
functionals have ref/value source premises and declared carrier source
candidates, but zero carrier-introduction rules, zero derivations, zero
soundness/application proofs, zero ref/value carrier pairs, zero constructed
witness-object identities, and zero row consumptions.

## Summary

- endpoint functionals: ${summary.endpoint_functionals}
- residual consumer rows: ${summary.residual_consumer_rows}
- source endpoint-boundary-binding refs constructed: ${summary.source_endpoint_boundary_binding_refs_constructed}
- source endpoint value-binding maps constructed: ${summary.source_endpoint_value_binding_maps_constructed}
- ref carrier source candidates declared: ${summary.endpoint_boundary_binding_ref_carrier_source_candidates_declared}
- value-map carrier source candidates declared: ${summary.endpoint_value_binding_map_carrier_source_candidates_declared}
- ref carrier rule targets declared: ${summary.ref_carrier_rule_targets_declared}
- value-map carrier rule targets declared: ${summary.value_map_carrier_rule_targets_declared}
- ref/value pair rule targets declared: ${summary.ref_value_pair_rule_targets_declared}
- ref carrier rules available: ${summary.ref_carrier_rules_available}
- value-map carrier rules available: ${summary.value_map_carrier_rules_available}
- ref/value pair rules available: ${summary.ref_value_pair_rules_available}
- carrier rule soundness proofs present: ${summary.carrier_rule_soundness_proofs_present}
- carrier rule application proofs present: ${summary.carrier_rule_application_proofs_present}
- ref/value non-domain carrier pairs constructed: ${summary.ref_value_non_domain_carrier_pairs_constructed}
- row ref/value source premises ready: ${summary.row_ref_value_source_premises_ready}
- row carrier rule target pairs ready: ${summary.row_carrier_rule_target_pairs_ready}
- row ref/value carrier pairs constructed: ${summary.row_ref_value_carrier_pairs_constructed}
- row consumption count: ${summary.row_consumption_count}
- branch chart authorized: ${summary.branch_chart_authorized}

## Method Results

${mdTable(["method", "output", "endpoint result"], methodRows)}

## Endpoint Results

${mdTable(
  [
    "endpoint",
    "role",
    "ref source",
    "value source",
    "ref candidate",
    "value candidate",
    "rule target",
    "rules available",
    "carrier pair",
    "identity proof",
  ],
  endpointRows
)}

## Row Results

${mdTable(
  [
    "row",
    "source",
    "receiver",
    "source premises",
    "rule targets",
    "carrier pair",
    "consumed",
  ],
  rowRows
)}

## Missing Proof Burdens

${mdTable(["burden", "missing field", "required evidence"], burdenRows)}

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
  const packet = buildPacket(args);
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, packet, args.pretty);
  const jsonHash = sha256File(jsonPath);
  writeText(reportPath, generateReport(packet, jsonPath, jsonHash));
  console.log(JSON.stringify({
    status: packet.status,
    json: jsonPath,
    report: reportPath,
    summary: packet.summary,
  }, null, 2));
}

main();

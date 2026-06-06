#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OBLIGATION_CLASSIFIER = `${CERT_DIR}/higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONSTANTS_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ASSEMBLY_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_certificate_assembly_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_materialization_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SEPARATOR_AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier_fail_closed_interval_fields_complete_accepted_constants_artifact_absent_no_source_packet_acceptance_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const CONSTANTS_CONFORMANCE_STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";
const ASSEMBLY_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_certificate_assembly_dependency_classifier_fail_closed_child_refs_complete_atlas_bridge_impulse_acceptance_parent_consumption_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_materialization_attempt_fail_closed_exact_interval_fields_materialized_accepted_interval_certified_status_absent_no_source_packet_acceptance_no_row_consumption";

const CANDIDATE_ARTIFACT_REF =
  "candidate_live_same_packet_higher_fold_constants_artifact:fresh-v10-higher-fold-12-root-rebuild-v0";
const ACCEPTED_ARTIFACT_BLOCKER = "accepted_same_packet_higher_fold_constants_artifact_absent";
const ACCEPTED_STATUS_BLOCKER = "accepted_interval_certified_constants_status_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

const SEPARATOR_FIELDS = [
  "candidate_higher_fold_constants_artifact_present",
  "candidate_interval_fields_complete",
  "candidate_interval_field_shape_verified",
  "accepted_higher_fold_constants_artifact_present",
  "accepted_interval_certified_constants_status_present",
  "accepted_constants_conformance",
  "accepted_higher_fold_layer_atlas_ref_present",
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "parent_complement_consumption_ref_present",
  "higher_fold_separator_layer_certificate_present",
];

const ROW_FIELDS = [
  "candidate_higher_fold_constants_artifact_ref_present",
  "candidate_interval_fields_complete",
  "candidate_row_exact_fields_materialized",
  "accepted_higher_fold_constants_artifact_present",
  "accepted_interval_certified_constants_status_present",
  "accepted_constants_conformance",
  "accepted_higher_fold_layer_atlas_ref_present",
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "parent_complement_consumption_ref_present",
  "higher_fold_separator_layer_certificate_present",
  "row_consumed",
];

function parseArgs(argv) {
  const args = {
    separatorAggregate: DEFAULT_SEPARATOR_AGGREGATE,
    obligationClassifier: DEFAULT_OBLIGATION_CLASSIFIER,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    constantsConformance: DEFAULT_CONSTANTS_CONFORMANCE,
    assemblyDependency: DEFAULT_ASSEMBLY_DEPENDENCY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--separator-aggregate") {
      args.separatorAggregate = argv[++index];
    } else if (arg === "--obligation-classifier") {
      args.obligationClassifier = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
    } else if (arg === "--constants-conformance") {
      args.constantsConformance = argv[++index];
    } else if (arg === "--assembly-dependency") {
      args.assemblyDependency = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-artifact-materialization-attempt.mjs [options]

Options:
  --separator-aggregate PATH      Same-packet separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
  --obligation-classifier PATH    Higher-fold constants artifact field obligation classifier. Defaults to ${DEFAULT_OBLIGATION_CLASSIFIER}.
  --impulse-acceptance PATH       Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --constants-conformance PATH    Accepted constants conformance classifier. Defaults to ${DEFAULT_CONSTANTS_CONFORMANCE}.
  --assembly-dependency PATH      Separator certificate assembly dependency classifier. Defaults to ${DEFAULT_ASSEMBLY_DEPENDENCY}.
  --out-dir PATH                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                        Pretty-print JSON artifact.
  --help                          Show this help.`);
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

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function assertStatus(source, name, expected) {
  if (source.status !== expected) {
    throw new Error(`Unexpected ${name} status: ${source.status}`);
  }
}

function assertFailClosed(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if (source.branch_chart_authorized !== false) {
    throw new Error(`${name} does not preserve branch-chart lock.`);
  }
}

function assertExactInterval(value, label) {
  if (!Array.isArray(value) || value.length !== 2 || value[0] !== value[1]) {
    throw new Error(`${label} is not an exact degenerate interval.`);
  }
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function mapBy(array, getter, name) {
  const map = new Map();
  for (const entry of array ?? []) {
    const key = getter(entry);
    if (key == null) {
      continue;
    }
    if (map.has(key)) {
      throw new Error(`Duplicate ${name} key: ${key}`);
    }
    map.set(key, entry);
  }
  return map;
}

function requireMapEntry(map, key, name) {
  if (!map.has(key)) {
    throw new Error(`Missing ${name}: ${key}`);
  }
  return map.get(key);
}

function presenceCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => row[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function validateInputs(inputs) {
  for (const [name, source] of Object.entries(inputs)) {
    assertPacketId(source, name);
    assertFailClosed(source, name);
  }
  assertStatus(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);
  assertStatus(inputs.obligationClassifier, "obligationClassifier", OBLIGATION_STATUS);
  assertStatus(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertStatus(inputs.constantsConformance, "constantsConformance", CONSTANTS_CONFORMANCE_STATUS);
  assertStatus(inputs.assemblyDependency, "assemblyDependency", ASSEMBLY_DEPENDENCY_STATUS);
  if (inputs.separatorAggregate.summary?.separator_aggregate_certificates !== 12) {
    throw new Error("Separator aggregate input no longer has 12 separator aggregate certificates.");
  }
  if (inputs.separatorAggregate.summary?.fold_layer_rows !== 112) {
    throw new Error("Separator aggregate input no longer has 112 fold-layer rows.");
  }
  if (inputs.obligationClassifier.summary?.separators_with_accepted_constants_artifact !== 0) {
    throw new Error("Obligation classifier unexpectedly has accepted constants artifacts.");
  }
  if (inputs.obligationClassifier.summary?.separators_with_accepted_constants_artifact_status !== 0) {
    throw new Error("Obligation classifier unexpectedly has accepted constants statuses.");
  }
  if (inputs.impulseAcceptance.summary?.separators_with_source_packet_acceptance_rule !== 0) {
    throw new Error("Impulse acceptance input unexpectedly has source-packet acceptance rules.");
  }
  if (inputs.impulseAcceptance.summary?.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets !== 0) {
    throw new Error("Impulse acceptance input unexpectedly has accepted source packets.");
  }
  if (inputs.constantsConformance.summary?.separators_with_accepted_constants_conformance !== 0) {
    throw new Error("Constants conformance input unexpectedly accepts constants.");
  }
  if (inputs.assemblyDependency.summary?.rows_with_accepted_higher_fold_layer_atlas_ref !== 0) {
    throw new Error("Assembly dependency unexpectedly has accepted atlas refs.");
  }
  if (inputs.assemblyDependency.summary?.rows_with_parent_complement_consumption_ref !== 0) {
    throw new Error("Assembly dependency unexpectedly has parent complement consumption refs.");
  }
  if (inputs.assemblyDependency.summary?.rows_with_higher_fold_separator_layer_certificate !== 0) {
    throw new Error("Assembly dependency unexpectedly has separator certificates.");
  }
}

function buildCandidateSeparatorConstants(inputs) {
  const obligationBySeparator = mapBy(
    inputs.obligationClassifier.separator_constants_artifact_obligation_profiles,
    (entry) => entry.separator_event,
    "obligation separator",
  );
  const assemblyBySeparator = mapBy(
    inputs.assemblyDependency.separator_assembly_dependency_profiles,
    (entry) => entry.separator_event,
    "assembly separator",
  );

  return [...inputs.separatorAggregate.separator_aggregate_certificates]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((aggregate) => {
      const obligation = requireMapEntry(obligationBySeparator, aggregate.separator_event, "obligation separator");
      const assembly = requireMapEntry(assemblyBySeparator, aggregate.separator_event, "assembly separator");
      assertExactInterval(aggregate.C_Sigma_interval_exact, `${aggregate.separator_event} C_Sigma`);
      assertExactInterval(
        aggregate.A_Sigma_eta_epsilon_c_interval_exact,
        `${aggregate.separator_event} A_Sigma_eta_epsilon_c`,
      );
      assertExactInterval(
        aggregate.I_fold_eta_epsilon_c_Sigma_interval_exact,
        `${aggregate.separator_event} I_fold_eta_epsilon_c_Sigma`,
      );
      assertExactInterval(aggregate.L_r_sum_interval_exact, `${aggregate.separator_event} L_r_sum`);
      assertExactInterval(
        aggregate.normal_form_ceiling_lower_witness_interval_exact,
        `${aggregate.separator_event} normal_form_ceiling_lower_witness`,
      );
      assertExactInterval(
        aggregate.normal_form_ceiling_minus_row_impulse_sum_interval_exact,
        `${aggregate.separator_event} normal_form_ceiling_minus_row_impulse_sum`,
      );
      const candidateIntervalFieldsComplete =
        obligation.separator_aggregate_fields_present === true &&
        aggregate.separator_aggregate_C_Sigma_present === true &&
        aggregate.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
        aggregate.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true;
      return {
        candidate_artifact_ref: `${CANDIDATE_ARTIFACT_REF}:${aggregate.separator_event}`,
        separator_event: aggregate.separator_event,
        fold_interval: aggregate.fold_interval,
        row_count: aggregate.row_count,
        row_ids: aggregate.row_ids,
        selected_route_candidate: aggregate.selected_route_candidate,
        aggregate_certificate_rule: aggregate.aggregate_certificate_rule,
        eta_exact: aggregate.eta_exact,
        eta_sqrt_lower_exact: aggregate.eta_sqrt_lower_exact,
        eta_sqrt_lower_square_le_eta: aggregate.eta_sqrt_lower_square_le_eta === true,
        eta_inv_sqrt_upper_exact: aggregate.eta_inv_sqrt_upper_exact,
        eta_inv_sqrt_upper_square_ge_eta_inverse:
          aggregate.eta_inv_sqrt_upper_square_ge_eta_inverse === true,
        L_r_sum_interval_exact: aggregate.L_r_sum_interval_exact,
        L_r_sum_decimal_display: aggregate.L_r_sum_decimal,
        C_Sigma_interval_exact: aggregate.C_Sigma_interval_exact,
        C_Sigma_decimal_display: aggregate.C_Sigma_decimal,
        A_Sigma_eta_epsilon_c_interval_exact: aggregate.A_Sigma_eta_epsilon_c_interval_exact,
        A_Sigma_eta_epsilon_c_decimal_display: aggregate.A_Sigma_eta_epsilon_c_decimal,
        I_fold_eta_epsilon_c_Sigma_interval_exact: aggregate.I_fold_eta_epsilon_c_Sigma_interval_exact,
        I_fold_eta_epsilon_c_Sigma_decimal_display: aggregate.I_fold_eta_epsilon_c_Sigma_decimal,
        normal_form_ceiling_lower_witness_interval_exact:
          aggregate.normal_form_ceiling_lower_witness_interval_exact,
        normal_form_ceiling_lower_witness_decimal_display:
          aggregate.normal_form_ceiling_lower_witness_decimal,
        normal_form_ceiling_minus_row_impulse_sum_interval_exact:
          aggregate.normal_form_ceiling_minus_row_impulse_sum_interval_exact,
        normal_form_ceiling_minus_row_impulse_sum_decimal_display:
          aggregate.normal_form_ceiling_minus_row_impulse_sum_decimal,
        row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma:
          aggregate.row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma === true,
        candidate_higher_fold_constants_artifact_present: true,
        candidate_interval_fields_complete: candidateIntervalFieldsComplete,
        candidate_interval_field_shape_verified: true,
        accepted_higher_fold_constants_artifact_present: false,
        accepted_interval_certified_constants_status_present: false,
        accepted_constants_conformance: false,
        accepted_higher_fold_layer_atlas_ref_present:
          assembly.accepted_higher_fold_layer_atlas_ref_present === true,
        source_packet_acceptance_rule_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        parent_row_association_anchor_present: assembly.parent_row_association_anchor_present === true,
        parent_complement_consumption_ref_present: assembly.parent_complement_consumption_ref_present === true,
        higher_fold_separator_layer_certificate_present: false,
        first_constants_artifact_blocker: ACCEPTED_ARTIFACT_BLOCKER,
        first_constants_status_blocker: ACCEPTED_STATUS_BLOCKER,
        first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        first_accepted_atlas_ref_blocker: ATLAS_REF_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
        first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildCandidateRowAssociations(inputs, separatorConstants) {
  const constantsBySeparator = mapBy(separatorConstants, (entry) => entry.separator_event, "candidate constants");
  const obligationByRow = mapBy(
    inputs.obligationClassifier.row_constants_artifact_obligation_profiles,
    (entry) => entry.row_id,
    "obligation row",
  );
  const assemblyByRow = mapBy(
    inputs.assemblyDependency.row_assembly_dependency_profiles,
    (entry) => entry.row_id,
    "assembly row",
  );

  return [...inputs.separatorAggregate.row_aggregate_certificates]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const constants = requireMapEntry(constantsBySeparator, row.separator_event, "candidate constants");
      const obligation = requireMapEntry(obligationByRow, row.row_id, "obligation row");
      const assembly = requireMapEntry(assemblyByRow, row.row_id, "assembly row");
      assertExactInterval(row.M_delta_interval_exact, `${row.row_id} M_delta`);
      assertExactInterval(row.delta_eta_sup_norm_exact, `${row.row_id} delta_eta_sup_norm`);
      assertExactInterval(row.Gamma_interval_exact, `${row.row_id} Gamma`);
      assertExactInterval(row.row_bound_constant_exact, `${row.row_id} row_bound_constant`);
      assertExactInterval(row.A_B_eta_epsilon_c_interval_exact, `${row.row_id} A_B_eta_epsilon_c`);
      assertExactInterval(row.I_fold_eta_epsilon_c_B_interval_exact, `${row.row_id} I_fold_eta_epsilon_c_B`);
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        receiver_interval: row.receiver_interval,
        source_interval: row.source_interval,
        candidate_higher_fold_constants_artifact_ref: constants.candidate_artifact_ref,
        candidate_higher_fold_constants_artifact_ref_present: true,
        candidate_interval_fields_complete:
          obligation.separator_aggregate_fields_present === true && constants.candidate_interval_fields_complete === true,
        candidate_row_exact_fields_materialized: true,
        candidate_E_B: row.candidate_E_B,
        candidate_S_B_t: row.candidate_S_B_t,
        candidate_L_r_B: row.candidate_L_r_B,
        candidate_L_s_B: row.candidate_L_s_B,
        M_delta_interval_exact: row.M_delta_interval_exact,
        delta_eta_sup_norm_interval_exact: row.delta_eta_sup_norm_exact,
        Gamma_interval_exact: row.Gamma_interval_exact,
        packet_g_exact: row.packet_g_exact,
        row_bound_constant_exact: row.row_bound_constant_exact,
        A_B_eta_epsilon_c_interval_exact: row.A_B_eta_epsilon_c_interval_exact,
        I_fold_eta_epsilon_c_B_interval_exact: row.I_fold_eta_epsilon_c_B_interval_exact,
        acceleration_enclosure_formula: row.acceleration_enclosure_formula,
        impulse_enclosure_formula: row.impulse_enclosure_formula,
        exact_fields_authoritative: true,
        decimal_fields_display_only: true,
        accepted_higher_fold_constants_artifact_present: false,
        accepted_interval_certified_constants_status_present: false,
        accepted_constants_conformance: false,
        accepted_higher_fold_layer_atlas_ref_present:
          assembly.accepted_higher_fold_layer_atlas_ref_present === true,
        source_packet_acceptance_rule_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        parent_row_association_anchor_present: assembly.parent_row_association_anchor_present === true,
        parent_complement_consumption_ref_present: assembly.parent_complement_consumption_ref_present === true,
        higher_fold_separator_layer_certificate_present: false,
        first_constants_artifact_blocker: ACCEPTED_ARTIFACT_BLOCKER,
        first_constants_status_blocker: ACCEPTED_STATUS_BLOCKER,
        first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        first_accepted_atlas_ref_blocker: ATLAS_REF_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
        first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const separatorConstants = buildCandidateSeparatorConstants(inputs);
  const rowAssociations = buildCandidateRowAssociations(inputs, separatorConstants);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowAssociations, (row) => row.separator_event));
  const summary = {
    candidate_higher_fold_constants_artifacts: 1,
    candidate_separator_constants: separatorConstants.length,
    candidate_row_constant_associations: rowAssociations.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_candidate_higher_fold_constants_artifact: countTrue(
      separatorConstants,
      (entry) => entry.candidate_higher_fold_constants_artifact_present,
    ),
    separators_with_candidate_interval_fields_complete: countTrue(
      separatorConstants,
      (entry) => entry.candidate_interval_fields_complete,
    ),
    separators_with_candidate_interval_field_shape_verified: countTrue(
      separatorConstants,
      (entry) => entry.candidate_interval_field_shape_verified,
    ),
    rows_with_candidate_higher_fold_constants_artifact_ref: countTrue(
      rowAssociations,
      (row) => row.candidate_higher_fold_constants_artifact_ref_present,
    ),
    rows_with_candidate_interval_fields_complete: countTrue(
      rowAssociations,
      (row) => row.candidate_interval_fields_complete,
    ),
    rows_with_candidate_row_exact_fields_materialized: countTrue(
      rowAssociations,
      (row) => row.candidate_row_exact_fields_materialized,
    ),
    separators_with_accepted_higher_fold_constants_artifact: countTrue(
      separatorConstants,
      (entry) => entry.accepted_higher_fold_constants_artifact_present,
    ),
    separators_with_accepted_interval_certified_constants_status: countTrue(
      separatorConstants,
      (entry) => entry.accepted_interval_certified_constants_status_present,
    ),
    separators_with_accepted_constants_conformance: countTrue(
      separatorConstants,
      (entry) => entry.accepted_constants_conformance,
    ),
    rows_with_accepted_constants_conformance: countTrue(rowAssociations, (row) => row.accepted_constants_conformance),
    rows_with_accepted_higher_fold_layer_atlas_ref: countTrue(
      rowAssociations,
      (row) => row.accepted_higher_fold_layer_atlas_ref_present,
    ),
    separators_with_source_packet_acceptance_rule: countTrue(
      separatorConstants,
      (entry) => entry.source_packet_acceptance_rule_present,
    ),
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: countTrue(
      separatorConstants,
      (entry) => entry.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
    ),
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: countTrue(
      rowAssociations,
      (row) => row.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
    ),
    rows_with_parent_complement_consumption_ref: countTrue(
      rowAssociations,
      (row) => row.parent_complement_consumption_ref_present,
    ),
    rows_with_higher_fold_separator_layer_certificate: countTrue(
      rowAssociations,
      (row) => row.higher_fold_separator_layer_certificate_present,
    ),
    separator_field_presence_counts: presenceCounts(separatorConstants, SEPARATOR_FIELDS),
    row_field_presence_counts: presenceCounts(rowAssociations, ROW_FIELDS),
    first_constants_artifact_blocker: ACCEPTED_ARTIFACT_BLOCKER,
    first_constants_status_blocker: ACCEPTED_STATUS_BLOCKER,
    first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_accepted_atlas_ref_blocker: ATLAS_REF_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  const invariant =
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    summary.separators_with_candidate_higher_fold_constants_artifact === 12 &&
    summary.separators_with_candidate_interval_fields_complete === 12 &&
    summary.separators_with_candidate_interval_field_shape_verified === 12 &&
    summary.rows_with_candidate_higher_fold_constants_artifact_ref === 112 &&
    summary.rows_with_candidate_interval_fields_complete === 112 &&
    summary.rows_with_candidate_row_exact_fields_materialized === 112 &&
    summary.separators_with_accepted_higher_fold_constants_artifact === 0 &&
    summary.separators_with_accepted_interval_certified_constants_status === 0 &&
    summary.separators_with_accepted_constants_conformance === 0 &&
    summary.rows_with_accepted_higher_fold_layer_atlas_ref === 0 &&
    summary.separators_with_source_packet_acceptance_rule === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.rows_with_parent_complement_consumption_ref === 0 &&
    summary.rows_with_higher_fold_separator_layer_certificate === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Fail-closed candidate higher-fold constants artifact invariant failed.");
  }

  return {
    schema: "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-artifact-materialization-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only candidate/live higher-fold constants artifact materialization attempt; packages live same-packet separator and row exact interval fields into a candidate constants artifact while accepted interval-certified status, source-packet acceptance, row consumption, preledger pass, live-ledger update, and branch-chart authorization remain absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
      higher_fold_constants_artifact_field_obligation_classifier: artifactRecord(paths.obligationClassifier),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(paths.impulseAcceptance),
      same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier: artifactRecord(
        paths.constantsConformance,
      ),
      higher_fold_layer_separator_certificate_assembly_dependency_classifier: artifactRecord(
        paths.assemblyDependency,
      ),
    },
    candidate_higher_fold_constants_artifact: {
      artifact_ref: CANDIDATE_ARTIFACT_REF,
      packet_id: PACKET_ID,
      separator_family: "Sigma_hf_01_through_Sigma_hf_12",
      fold_layer_rows: rowAssociations.length,
      construction_source: "same_packet_separator_aggregate_certificate_attempt",
      status: "candidate_live_only_not_accepted",
      accepted_higher_fold_constants_artifact_present: false,
      accepted_interval_certified_constants_status_present: false,
      accepted_constants_conformance: false,
      source_packet_acceptance_rule_present: false,
      candidate_separator_constants_ref: "candidate_separator_constants",
      candidate_row_constant_associations_ref: "candidate_row_constant_associations",
    },
    candidate_separator_constants: separatorConstants,
    candidate_row_constant_associations: rowAssociations,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "accepted interval-certified status for the candidate/live same-packet higher-fold constants artifact, or an explicit fixed-parameter aggregate source-packet acceptance rule",
      continuation_class:
        "mechanical if the next artifact supplies an accepted interval-certified constants status for this candidate/live artifact; otherwise source-packet acceptance remains decision-blocked",
      decision_boundary:
        "this materialization attempt creates only a candidate/live constants artifact and does not mark accepted constants conformance or source-packet acceptance",
      fail_closed_stop_conditions: [
        "Do not treat the candidate/live constants artifact as an accepted same-packet higher-fold constants artifact.",
        "Do not treat candidate/live separator constants as accepted same_packet_fold_impulse_or_direct_quadrature_bound source packets.",
        "Do not construct accepted atlas refs, parent_complement_consumption_ref, or higher_fold_separator_layer_certificate from this candidate/live artifact.",
        "Do not consume rows, set preledger_pass, update the live ledger, or authorize a branch chart.",
      ],
    },
    authorization_lock: {
      preledger_pass_rows: 0,
      accepted_fold_layer_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized_rows: 0,
      preledger_pass_authorized: false,
      accepted_fold_layer_rows_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This materialization attempt produces a candidate/live same-packet higher-fold constants artifact from exact separator aggregate and row interval fields, but accepted interval-certified status and all downstream consuming fields remain absent.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present ? "true" : "false"} | \`${artifact.sha256 ?? "missing"}\` |`,
    )
    .join("\n");
}

function countTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count} |`)
    .join("\n");
}

function fieldPresenceTable(counts) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(separators) {
  return separators
    .map(
      (separator) =>
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | \`${separator.C_Sigma_interval_exact[0]}\` | \`${separator.A_Sigma_eta_epsilon_c_interval_exact[0]}\` | \`${separator.I_fold_eta_epsilon_c_Sigma_interval_exact[0]}\` | ${separator.candidate_higher_fold_constants_artifact_present} | ${separator.accepted_higher_fold_constants_artifact_present} | ${separator.accepted_interval_certified_constants_status_present} |`,
    )
    .join("\n");
}

function reportMarkdown(attempt) {
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Artifact Materialization Attempt

Packet: \`${attempt.packet_id}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This materialization attempt packages the live separator aggregate constants and
row exact interval fields into a candidate/live same-packet higher-fold
constants artifact.

Constructed candidate side:

- ${attempt.summary.candidate_higher_fold_constants_artifacts} candidate
  constants artifact for \`fresh-v10-higher-fold-12-root-rebuild-v0\`;
- ${attempt.summary.separators_with_candidate_higher_fold_constants_artifact}
  / ${attempt.summary.candidate_separator_constants} separator constants
  entries;
- ${attempt.summary.rows_with_candidate_higher_fold_constants_artifact_ref}
  / ${attempt.summary.candidate_row_constant_associations} row associations;
- ${attempt.summary.rows_with_candidate_row_exact_fields_materialized}
  / ${attempt.summary.candidate_row_constant_associations} row associations
  with exact row-level fields materialized;
- ${attempt.summary.separators_with_candidate_interval_field_shape_verified}
  / ${attempt.summary.candidate_separator_constants} separator entries with
  exact degenerate interval fields for \`C_Sigma\`,
  \`A_Sigma_eta_epsilon_c\`, and \`I_fold_eta_epsilon_c_Sigma\`.

Still absent:

- ${attempt.summary.separators_with_accepted_higher_fold_constants_artifact}
  / ${attempt.summary.candidate_separator_constants} accepted higher-fold
  constants artifacts;
- ${attempt.summary.separators_with_accepted_interval_certified_constants_status}
  / ${attempt.summary.candidate_separator_constants} accepted
  interval-certified constants statuses;
- ${attempt.summary.separators_with_source_packet_acceptance_rule}
  / ${attempt.summary.candidate_separator_constants} source-packet acceptance
  rules;
- ${attempt.summary.rows_with_parent_complement_consumption_ref}
  / ${attempt.summary.candidate_row_constant_associations}
  parent complement consumption refs;
- ${attempt.summary.rows_with_higher_fold_separator_layer_certificate}
  / ${attempt.summary.candidate_row_constant_associations}
  separator certificates.

The first constants-artifact blocker is
\`${attempt.summary.first_constants_artifact_blocker}\`; the first constants
status blocker is \`${attempt.summary.first_constants_status_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Candidate Separator Constants

| Separator | Fold interval | Rows | C_Sigma | A_Sigma_eta_epsilon_c | I_fold_eta_epsilon_c_Sigma | Candidate artifact | Accepted artifact | Accepted status |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
${separatorTable(attempt.candidate_separator_constants)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.separator_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_field_presence_counts)}

## Certificate-Side Handoff

Next artifact target: \`${attempt.next_certificate_handoff.artifact_target}\`.

Continuation class: ${attempt.next_certificate_handoff.continuation_class}.

Decision boundary: ${attempt.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is priority-only and proves no accepted
\`same_packet_fold_impulse_or_direct_quadrature_bound\`,
\`parent_complement_consumption_ref\`,
\`higher_fold_separator_layer_certificate\`, row consumption, live-ledger
update, or branch-chart authorization.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    separatorAggregate: args.separatorAggregate,
    obligationClassifier: args.obligationClassifier,
    impulseAcceptance: args.impulseAcceptance,
    constantsConformance: args.constantsConformance,
    assemblyDependency: args.assemblyDependency,
  };
  const inputs = {
    separatorAggregate: readJson(paths.separatorAggregate),
    obligationClassifier: readJson(paths.obligationClassifier),
    impulseAcceptance: readJson(paths.impulseAcceptance),
    constantsConformance: readJson(paths.constantsConformance),
    assemblyDependency: readJson(paths.assemblyDependency),
  };
  const attempt = buildAttempt(paths, inputs);
  const outputJson = path.join(args.outDir, OUTPUT_JSON);
  const outputReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJson, attempt, args.pretty);
  writeText(outputReport, reportMarkdown(attempt));
  console.log(JSON.stringify({ status: attempt.status, output_json: outputJson, output_report: outputReport }, null, 2));
}

main();

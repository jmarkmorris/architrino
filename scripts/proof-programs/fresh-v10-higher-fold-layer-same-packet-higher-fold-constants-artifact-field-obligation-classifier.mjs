#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_MOLLIFIER_COUPLING = `${CERT_DIR}/higher_fold_layer_same_packet_mollifier_coupling_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROW_ENCLOSURE = `${CERT_DIR}/higher_fold_layer_same_packet_row_enclosure_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONSTANTS_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ASSEMBLY_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_certificate_assembly_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const MOLLIFIER_COUPLING_STATUS =
  "higher_fold_layer_same_packet_mollifier_coupling_certificate_attempt_fail_closed_M_delta_Gamma_certified_coverage_enclosures_absent_no_row_consumption";
const ROW_ENCLOSURE_STATUS =
  "higher_fold_layer_same_packet_row_enclosure_certificate_attempt_fail_closed_M_delta_Gamma_coverage_row_enclosures_certified_separator_aggregates_absent_no_row_consumption";
const SEPARATOR_AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const CONSTANTS_CONFORMANCE_STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";
const ASSEMBLY_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_certificate_assembly_dependency_classifier_fail_closed_child_refs_complete_atlas_bridge_impulse_acceptance_parent_consumption_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier_fail_closed_interval_fields_complete_accepted_constants_artifact_absent_no_source_packet_acceptance_no_row_consumption";

const ACCEPTED_CONSTANTS_ARTIFACT_BLOCKER = "accepted_same_packet_higher_fold_constants_artifact_absent";
const ACCEPTED_CONSTANTS_STATUS_BLOCKER = "accepted_interval_certified_constants_status_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const SOURCE_PACKET_BLOCKER = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

const SEPARATOR_FIELDS = [
  "live_packet_identity_present",
  "higher_fold_separator_family_present",
  "mollifier_route_declared",
  "M_delta_interval_certified",
  "Gamma_g_coupling_certified",
  "row_projection_source_slice_coverage_certified",
  "dual_mollified_row_integrand_interval_enclosure_present",
  "row_impulse_enclosures_present",
  "separator_aggregate_fields_present",
  "accepted_constants_artifact_present",
  "accepted_constants_artifact_status_present",
  "accepted_constants_conformance",
  "accepted_higher_fold_layer_atlas_ref_present",
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "parent_complement_consumption_ref_present",
  "higher_fold_separator_layer_certificate",
];

const ROW_FIELDS = [
  "live_packet_identity_present",
  "higher_fold_row_family_present",
  "mollifier_route_declared",
  "M_delta_interval_certified",
  "Gamma_g_coupling_certified",
  "row_projection_source_slice_coverage_certified",
  "dual_mollified_row_integrand_interval_enclosure_present",
  "row_impulse_enclosure_present",
  "separator_aggregate_fields_present",
  "accepted_constants_artifact_present",
  "accepted_constants_conformance",
  "accepted_higher_fold_layer_atlas_ref_present",
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "parent_complement_consumption_ref_present",
  "higher_fold_separator_layer_certificate",
  "row_consumed",
];

function parseArgs(argv) {
  const args = {
    mollifierCoupling: DEFAULT_MOLLIFIER_COUPLING,
    rowEnclosure: DEFAULT_ROW_ENCLOSURE,
    separatorAggregate: DEFAULT_SEPARATOR_AGGREGATE,
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
    } else if (arg === "--mollifier-coupling") {
      args.mollifierCoupling = argv[++index];
    } else if (arg === "--row-enclosure") {
      args.rowEnclosure = argv[++index];
    } else if (arg === "--separator-aggregate") {
      args.separatorAggregate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-higher-fold-constants-artifact-field-obligation-classifier.mjs [options]

Options:
  --mollifier-coupling PATH       Mollifier coupling certificate attempt. Defaults to ${DEFAULT_MOLLIFIER_COUPLING}.
  --row-enclosure PATH            Row enclosure certificate attempt. Defaults to ${DEFAULT_ROW_ENCLOSURE}.
  --separator-aggregate PATH      Separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
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
  assertStatus(inputs.mollifierCoupling, "mollifierCoupling", MOLLIFIER_COUPLING_STATUS);
  assertStatus(inputs.rowEnclosure, "rowEnclosure", ROW_ENCLOSURE_STATUS);
  assertStatus(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);
  assertStatus(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertStatus(inputs.constantsConformance, "constantsConformance", CONSTANTS_CONFORMANCE_STATUS);
  assertStatus(inputs.assemblyDependency, "assemblyDependency", ASSEMBLY_DEPENDENCY_STATUS);
  if (inputs.mollifierCoupling.summary?.rows_with_M_delta_interval_certified !== 112) {
    throw new Error("Mollifier coupling input no longer has 112 M_delta rows.");
  }
  if (inputs.rowEnclosure.summary?.rows_with_row_impulse_enclosure !== 112) {
    throw new Error("Row enclosure input no longer has 112 row impulse enclosures.");
  }
  if (inputs.separatorAggregate.summary?.separators_with_separator_aggregate_C_Sigma !== 12) {
    throw new Error("Separator aggregate input no longer has 12 C_Sigma fields.");
  }
  if (inputs.constantsConformance.summary?.separators_with_accepted_constants_conformance !== 0) {
    throw new Error("Constants conformance input unexpectedly accepts constants.");
  }
  if (inputs.assemblyDependency.summary?.rows_with_accepted_higher_fold_layer_atlas_ref !== 0) {
    throw new Error("Assembly dependency input unexpectedly accepts atlas refs.");
  }
  if (inputs.assemblyDependency.summary?.rows_with_parent_complement_consumption_ref !== 0) {
    throw new Error("Assembly dependency input unexpectedly contains parent complement consumption refs.");
  }
  if (inputs.assemblyDependency.summary?.rows_with_higher_fold_separator_layer_certificate !== 0) {
    throw new Error("Assembly dependency input unexpectedly contains separator-layer certificates.");
  }
}

function buildSeparatorProfiles(inputs) {
  const rowEnclosureBySeparator = mapBy(
    inputs.rowEnclosure.separator_row_enclosure_certificates,
    (entry) => entry.separator_event,
    "row enclosure separator",
  );
  const couplingBySeparator = mapBy(
    inputs.mollifierCoupling.separator_mollifier_coupling_certificates,
    (entry) => entry.separator_event,
    "mollifier coupling separator",
  );
  const conformanceBySeparator = mapBy(
    inputs.constantsConformance.separator_conformance_profiles,
    (entry) => entry.separator_event,
    "constants conformance separator",
  );
  const assemblyBySeparator = mapBy(
    inputs.assemblyDependency.separator_assembly_dependency_profiles,
    (entry) => entry.separator_event,
    "assembly dependency separator",
  );

  return [...inputs.separatorAggregate.separator_aggregate_certificates]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((aggregate) => {
      const rowEnclosure = requireMapEntry(
        rowEnclosureBySeparator,
        aggregate.separator_event,
        "row enclosure separator",
      );
      const coupling = requireMapEntry(couplingBySeparator, aggregate.separator_event, "mollifier coupling separator");
      const conformance = requireMapEntry(
        conformanceBySeparator,
        aggregate.separator_event,
        "constants conformance separator",
      );
      const assembly = requireMapEntry(
        assemblyBySeparator,
        aggregate.separator_event,
        "assembly dependency separator",
      );
      return {
        separator_event: aggregate.separator_event,
        fold_interval: aggregate.fold_interval,
        row_count: aggregate.row_count,
        row_ids: aggregate.row_ids,
        live_packet_identity_present: true,
        higher_fold_separator_family_present: true,
        selected_route_candidate: aggregate.selected_route_candidate,
        aggregate_certificate_rule: aggregate.aggregate_certificate_rule,
        mollifier_route_declared: coupling.mollifier_route_declared === true,
        M_delta_interval_certified: coupling.M_delta_interval_certified === true,
        delta_eta_sup_norm_interval_certified: coupling.delta_eta_sup_norm_interval_certified === true,
        Gamma_g_coupling_certified: coupling.Gamma_g_coupling_certified === true,
        row_projection_source_slice_coverage_certified:
          rowEnclosure.accepted_row_projection_source_slice_coverage_certificates === aggregate.row_count,
        dual_mollified_row_integrand_interval_enclosure_present:
          rowEnclosure.dual_mollified_row_integrand_interval_enclosures === aggregate.row_count,
        row_impulse_enclosures_present: rowEnclosure.row_impulse_enclosures === aggregate.row_count,
        row_tube_eta_sqrt_scaling_certified: aggregate.row_tube_eta_sqrt_scaling_certified_rows > 0,
        direct_quadrature_I_fold_B_present: aggregate.direct_quadrature_I_fold_B_rows > 0,
        separator_aggregate_fields_present:
          aggregate.separator_aggregate_C_Sigma_present === true &&
          aggregate.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
          aggregate.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
        accepted_constants_artifact_present: conformance.accepted_constants_artifact_present === true,
        accepted_constants_artifact_status_present: false,
        accepted_constants_conformance: conformance.accepted_constants_conformance === true,
        accepted_higher_fold_layer_atlas_ref_present:
          assembly.accepted_higher_fold_layer_atlas_ref_present === true,
        source_packet_acceptance_rule_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        parent_row_association_anchor_present: assembly.parent_row_association_anchor_present === true,
        parent_complement_consumption_ref_present: assembly.parent_complement_consumption_ref_present === true,
        higher_fold_separator_layer_certificate: false,
        first_constants_artifact_blocker: ACCEPTED_CONSTANTS_ARTIFACT_BLOCKER,
        first_constants_status_blocker: ACCEPTED_CONSTANTS_STATUS_BLOCKER,
        first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowProfiles(inputs) {
  const aggregateByRow = mapBy(inputs.separatorAggregate.row_aggregate_certificates, (entry) => entry.row_id, "aggregate row");
  const rowEnclosureByRow = mapBy(inputs.rowEnclosure.row_enclosure_certificates, (entry) => entry.row_id, "row enclosure");
  const couplingByRow = mapBy(inputs.mollifierCoupling.row_mollifier_coupling_certificates, (entry) => entry.row_id, "coupling row");
  const conformanceByRow = mapBy(inputs.constantsConformance.row_conformance_profiles, (entry) => entry.row_id, "conformance row");
  const assemblyByRow = mapBy(inputs.assemblyDependency.row_assembly_dependency_profiles, (entry) => entry.row_id, "assembly row");

  return [...inputs.separatorAggregate.row_aggregate_certificates]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((aggregate) => {
      const rowEnclosure = requireMapEntry(rowEnclosureByRow, aggregate.row_id, "row enclosure");
      const coupling = requireMapEntry(couplingByRow, aggregate.row_id, "coupling row");
      const conformance = requireMapEntry(conformanceByRow, aggregate.row_id, "conformance row");
      const assembly = requireMapEntry(assemblyByRow, aggregate.row_id, "assembly row");
      return {
        row_id: aggregate.row_id,
        ledger: aggregate.ledger,
        status: aggregate.status,
        failure_code: aggregate.failure_code,
        separator_event: aggregate.separator_event,
        fold_interval: aggregate.fold_interval,
        receiver_interval: aggregate.receiver_interval,
        source_interval: aggregate.source_interval,
        live_packet_identity_present: true,
        higher_fold_row_family_present: true,
        selected_route_candidate: aggregate.selected_route_candidate,
        mollifier_route_declared: coupling.mollifier_route_declared === true,
        M_delta_interval_certified: coupling.M_delta_interval_certified === true,
        delta_eta_sup_norm_interval_certified: coupling.delta_eta_sup_norm_interval_certified === true,
        Gamma_g_coupling_certified: coupling.Gamma_g_coupling_certified === true,
        row_projection_source_slice_coverage_certified:
          rowEnclosure.accepted_row_projection_source_slice_coverage_certificate === true,
        dual_mollified_row_integrand_interval_enclosure_present:
          rowEnclosure.dual_mollified_row_integrand_interval_enclosure === true,
        row_impulse_enclosure_present: rowEnclosure.row_impulse_enclosure === true,
        row_tube_eta_sqrt_scaling_certified: aggregate.row_tube_eta_sqrt_scaling_certified === true,
        direct_quadrature_I_fold_B_present: aggregate.direct_quadrature_I_fold_B_present === true,
        separator_aggregate_fields_present:
          aggregate.separator_aggregate_C_Sigma_present === true &&
          aggregate.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
          aggregate.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
        accepted_constants_artifact_present: conformance.accepted_constants_artifact_present === true,
        accepted_constants_conformance: conformance.accepted_constants_conformance === true,
        accepted_higher_fold_layer_atlas_ref_present:
          assembly.accepted_higher_fold_layer_atlas_ref_present === true,
        source_packet_acceptance_rule_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        parent_row_association_anchor_present: assembly.parent_row_association_anchor_present === true,
        parent_complement_consumption_ref_present: assembly.parent_complement_consumption_ref_present === true,
        higher_fold_separator_layer_certificate: false,
        first_constants_artifact_blocker: ACCEPTED_CONSTANTS_ARTIFACT_BLOCKER,
        first_constants_status_blocker: ACCEPTED_CONSTANTS_STATUS_BLOCKER,
        first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs);
  const separators = buildSeparatorProfiles(inputs);
  const rows = buildRowProfiles(inputs);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rows, (row) => row.separator_event));
  const summary = {
    separator_constants_artifact_obligation_profiles: separators.length,
    fold_layer_rows: rows.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_live_packet_identity: countTrue(separators, (entry) => entry.live_packet_identity_present),
    separators_with_higher_fold_separator_family: countTrue(
      separators,
      (entry) => entry.higher_fold_separator_family_present,
    ),
    separators_with_mollifier_route_declared: countTrue(separators, (entry) => entry.mollifier_route_declared),
    separators_with_M_delta_interval_certified: countTrue(separators, (entry) => entry.M_delta_interval_certified),
    separators_with_Gamma_g_coupling_certified: countTrue(
      separators,
      (entry) => entry.Gamma_g_coupling_certified,
    ),
    separators_with_row_projection_source_slice_coverage_certified: countTrue(
      separators,
      (entry) => entry.row_projection_source_slice_coverage_certified,
    ),
    separators_with_dual_mollified_row_integrand_interval_enclosure: countTrue(
      separators,
      (entry) => entry.dual_mollified_row_integrand_interval_enclosure_present,
    ),
    separators_with_row_impulse_enclosures: countTrue(separators, (entry) => entry.row_impulse_enclosures_present),
    separators_with_separator_aggregate_fields: countTrue(
      separators,
      (entry) => entry.separator_aggregate_fields_present,
    ),
    rows_with_live_packet_identity: countTrue(rows, (row) => row.live_packet_identity_present),
    rows_with_M_delta_interval_certified: countTrue(rows, (row) => row.M_delta_interval_certified),
    rows_with_Gamma_g_coupling_certified: countTrue(rows, (row) => row.Gamma_g_coupling_certified),
    rows_with_row_projection_source_slice_coverage_certified: countTrue(
      rows,
      (row) => row.row_projection_source_slice_coverage_certified,
    ),
    rows_with_dual_mollified_row_integrand_interval_enclosure: countTrue(
      rows,
      (row) => row.dual_mollified_row_integrand_interval_enclosure_present,
    ),
    rows_with_row_impulse_enclosure: countTrue(rows, (row) => row.row_impulse_enclosure_present),
    rows_with_separator_aggregate_fields: countTrue(rows, (row) => row.separator_aggregate_fields_present),
    separators_with_accepted_constants_artifact: countTrue(
      separators,
      (entry) => entry.accepted_constants_artifact_present,
    ),
    separators_with_accepted_constants_artifact_status: countTrue(
      separators,
      (entry) => entry.accepted_constants_artifact_status_present,
    ),
    separators_with_accepted_constants_conformance: countTrue(
      separators,
      (entry) => entry.accepted_constants_conformance,
    ),
    rows_with_accepted_constants_conformance: countTrue(rows, (row) => row.accepted_constants_conformance),
    separators_with_accepted_higher_fold_layer_atlas_ref: countTrue(
      separators,
      (entry) => entry.accepted_higher_fold_layer_atlas_ref_present,
    ),
    rows_with_accepted_higher_fold_layer_atlas_ref: countTrue(
      rows,
      (row) => row.accepted_higher_fold_layer_atlas_ref_present,
    ),
    separators_with_source_packet_acceptance_rule: countTrue(
      separators,
      (entry) => entry.source_packet_acceptance_rule_present,
    ),
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: countTrue(
      separators,
      (entry) => entry.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
    ),
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: countTrue(
      rows,
      (row) => row.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
    ),
    separators_with_parent_complement_consumption_ref: countTrue(
      separators,
      (entry) => entry.parent_complement_consumption_ref_present,
    ),
    rows_with_parent_complement_consumption_ref: countTrue(
      rows,
      (row) => row.parent_complement_consumption_ref_present,
    ),
    rows_with_higher_fold_separator_layer_certificate: countTrue(rows, (row) => row.higher_fold_separator_layer_certificate),
    separator_field_presence_counts: presenceCounts(separators, SEPARATOR_FIELDS),
    row_field_presence_counts: presenceCounts(rows, ROW_FIELDS),
    first_constants_artifact_blocker: ACCEPTED_CONSTANTS_ARTIFACT_BLOCKER,
    first_constants_status_blocker: ACCEPTED_CONSTANTS_STATUS_BLOCKER,
    first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  const invariant =
    summary.separator_constants_artifact_obligation_profiles === 12 &&
    summary.fold_layer_rows === 112 &&
    summary.separators_with_live_packet_identity === 12 &&
    summary.separators_with_M_delta_interval_certified === 12 &&
    summary.separators_with_Gamma_g_coupling_certified === 12 &&
    summary.separators_with_row_projection_source_slice_coverage_certified === 12 &&
    summary.separators_with_dual_mollified_row_integrand_interval_enclosure === 12 &&
    summary.separators_with_row_impulse_enclosures === 12 &&
    summary.separators_with_separator_aggregate_fields === 12 &&
    summary.rows_with_row_impulse_enclosure === 112 &&
    summary.rows_with_separator_aggregate_fields === 112 &&
    summary.separators_with_accepted_constants_artifact === 0 &&
    summary.separators_with_accepted_constants_artifact_status === 0 &&
    summary.separators_with_accepted_constants_conformance === 0 &&
    summary.rows_with_accepted_higher_fold_layer_atlas_ref === 0 &&
    summary.separators_with_source_packet_acceptance_rule === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.rows_with_parent_complement_consumption_ref === 0 &&
    summary.rows_with_higher_fold_separator_layer_certificate === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Fail-closed higher-fold constants artifact obligation invariant failed.");
  }

  return {
    schema: "breather-higher-fold-layer-same-packet-higher-fold-constants-artifact-field-obligation-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only higher-fold constants artifact field obligation classifier; shows live same-packet interval fields are complete for the fixed-parameter aggregate route but accepted constants artifact/status and source-packet acceptance remain absent, with no row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_mollifier_coupling_certificate_attempt: artifactRecord(paths.mollifierCoupling),
      same_packet_row_enclosure_certificate_attempt: artifactRecord(paths.rowEnclosure),
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(paths.impulseAcceptance),
      same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier: artifactRecord(
        paths.constantsConformance,
      ),
      higher_fold_layer_separator_certificate_assembly_dependency_classifier: artifactRecord(
        paths.assemblyDependency,
      ),
    },
    obligation_rule: {
      name: "higher_fold_accepted_constants_artifact_field_obligations_after_interval_fields_complete",
      present_interval_fields: [
        "live_packet_identity",
        "higher_fold_separator_family",
        "mollifier_route_declared",
        "M_delta_interval_certified",
        "Gamma_g_coupling_certified",
        "row_projection_source_slice_coverage_certified",
        "dual_mollified_row_integrand_interval_enclosure",
        "row_impulse_enclosure",
        "separator_aggregate_fields",
        "parent_row_association_anchor",
      ],
      absent_acceptance_fields: [
        "accepted_same_packet_higher_fold_constants_artifact",
        "accepted_interval_certified_constants_status",
        "accepted_higher_fold_layer_atlas_ref",
        "source_packet_acceptance_rule",
        "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
        "parent_complement_consumption_ref",
      ],
      first_constants_artifact_blocker: ACCEPTED_CONSTANTS_ARTIFACT_BLOCKER,
      first_constants_status_blocker: ACCEPTED_CONSTANTS_STATUS_BLOCKER,
      first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    },
    separator_constants_artifact_obligation_profiles: separators,
    row_constants_artifact_obligation_profiles: rows,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "accepted same-packet higher-fold constants artifact with accepted interval-certified status for fresh-v10-higher-fold-12-root-rebuild-v0 and Sigma_hf_01 through Sigma_hf_12, or an explicit source-packet acceptance rule",
      continuation_class:
        "mechanical if the next artifact supplies an accepted constants artifact/status; otherwise source-packet acceptance remains a decision-blocked route",
      decision_boundary:
        "this classifier does not declare the completed interval fields accepted constants and does not introduce source-packet acceptance",
      fail_closed_stop_conditions: [
        "Do not treat complete interval fields as an accepted same-packet higher-fold constants artifact.",
        "Do not treat accepted row coverage, row enclosures, or separator aggregates as accepted same_packet_fold_impulse_or_direct_quadrature_bound source packets.",
        "Do not construct parent_complement_consumption_ref or higher_fold_separator_layer_certificate from this obligation classifier.",
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
      "Priority-only. This classifier proves only that the live higher-fold interval-field side is complete enough to target an accepted constants artifact, while that accepted artifact/status and source-packet acceptance remain absent.",
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
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | ${separator.M_delta_interval_certified} | ${separator.Gamma_g_coupling_certified} | ${separator.row_impulse_enclosures_present} | ${separator.separator_aggregate_fields_present} | ${separator.accepted_constants_artifact_present} | ${separator.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet} |`,
    )
    .join("\n");
}

function reportMarkdown(classifier) {
  return `# Higher-Fold Layer Same-Packet Higher-Fold Constants Artifact Field Obligation Classifier

Packet: \`${classifier.packet_id}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier separates the live interval fields that are already present
from the accepted constants artifact fields that remain absent.

Present for the live higher-fold packet:

- ${classifier.summary.separators_with_M_delta_interval_certified}
  / ${classifier.summary.separator_constants_artifact_obligation_profiles}
  separator profiles have certified \`M_delta\`;
- ${classifier.summary.separators_with_Gamma_g_coupling_certified}
  / ${classifier.summary.separator_constants_artifact_obligation_profiles}
  separator profiles have certified \`Gamma=g=1\`;
- ${classifier.summary.rows_with_row_projection_source_slice_coverage_certified}
  / ${classifier.summary.fold_layer_rows} rows have accepted row
  projection/source-slice coverage;
- ${classifier.summary.rows_with_dual_mollified_row_integrand_interval_enclosure}
  / ${classifier.summary.fold_layer_rows} rows have dual-mollified row
  integrand interval enclosures;
- ${classifier.summary.rows_with_row_impulse_enclosure}
  / ${classifier.summary.fold_layer_rows} rows have row impulse enclosures;
- ${classifier.summary.separators_with_separator_aggregate_fields}
  / ${classifier.summary.separator_constants_artifact_obligation_profiles}
  separator profiles have aggregate fields.

Still absent:

- ${classifier.summary.separators_with_accepted_constants_artifact}
  / ${classifier.summary.separator_constants_artifact_obligation_profiles}
  accepted higher-fold constants artifacts;
- ${classifier.summary.separators_with_accepted_constants_artifact_status}
  / ${classifier.summary.separator_constants_artifact_obligation_profiles}
  accepted interval-certified constants statuses;
- ${classifier.summary.rows_with_accepted_higher_fold_layer_atlas_ref}
  / ${classifier.summary.fold_layer_rows}
  accepted higher-fold layer atlas refs;
- ${classifier.summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets}
  / ${classifier.summary.separator_constants_artifact_obligation_profiles}
  accepted impulse/direct-quadrature source packets.
- ${classifier.summary.rows_with_parent_complement_consumption_ref}
  / ${classifier.summary.fold_layer_rows}
  parent complement consumption refs.

The first constants-artifact blocker is
\`${classifier.summary.first_constants_artifact_blocker}\`. The source-packet
blocker remains \`${classifier.summary.first_source_packet_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Separator Obligations

| Separator | Fold interval | Rows | M_delta | Gamma/g | Row impulse enclosures | Aggregates | Accepted constants artifact | Accepted source packet |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
${separatorTable(classifier.separator_constants_artifact_obligation_profiles)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.separator_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.row_field_presence_counts)}

## Certificate-Side Handoff

Next artifact target: \`${classifier.next_certificate_handoff.artifact_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Decision boundary: ${classifier.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

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
    mollifierCoupling: args.mollifierCoupling,
    rowEnclosure: args.rowEnclosure,
    separatorAggregate: args.separatorAggregate,
    impulseAcceptance: args.impulseAcceptance,
    constantsConformance: args.constantsConformance,
    assemblyDependency: args.assemblyDependency,
  };
  const inputs = {
    mollifierCoupling: readJson(paths.mollifierCoupling),
    rowEnclosure: readJson(paths.rowEnclosure),
    separatorAggregate: readJson(paths.separatorAggregate),
    impulseAcceptance: readJson(paths.impulseAcceptance),
    constantsConformance: readJson(paths.constantsConformance),
    assemblyDependency: readJson(paths.assemblyDependency),
  };
  const classifier = buildClassifier(paths, inputs);
  const outputJson = path.join(args.outDir, OUTPUT_JSON);
  const outputReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJson, classifier, args.pretty);
  writeText(outputReport, reportMarkdown(classifier));
  console.log(JSON.stringify({ status: classifier.status, output_json: outputJson, output_report: outputReport }, null, 2));
}

main();

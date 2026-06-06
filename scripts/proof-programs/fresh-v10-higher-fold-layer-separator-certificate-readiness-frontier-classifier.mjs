#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_EXIT_FLOOR_DERIVATION = `${CERT_DIR}/higher_fold_layer_exit_floor_interval_width_proof_grade_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ATLAS_SOURCE_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_accepted_atlas_ref_source_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ATLAS_MATERIALIZATION = `${CERT_DIR}/higher_fold_layer_atlas_ref_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ATLAS_OBLIGATION = `${CERT_DIR}/higher_fold_layer_accepted_atlas_ref_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PRELEDGER_ROW_FAMILY = `${CERT_DIR}/preledger_row_family_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_separator_certificate_readiness_frontier_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_separator_certificate_readiness_frontier_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const EXIT_FLOOR_DERIVATION_STATUS =
  "higher_fold_layer_exit_floor_interval_width_proof_grade_derivation_attempt_fail_closed_all_child_refs_constructed_separator_blocked_no_row_consumption";
const ATLAS_SOURCE_CERTIFICATE_STATUS =
  "higher_fold_layer_accepted_atlas_ref_source_certificate_attempt_fail_closed_atlas_source_certificates_constructed_accepted_refs_absent_no_row_consumption";
const SEPARATOR_AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const IMPULSE_ACCEPTANCE_DEPENDENCY_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const ATLAS_MATERIALIZATION_STATUS =
  "higher_fold_layer_atlas_ref_source_candidate_classifier_fail_closed_candidate_refs_only_no_alpha_exit_parity_impulse_or_consumption_no_row_consumption";
const ATLAS_OBLIGATION_STATUS =
  "higher_fold_layer_accepted_atlas_ref_obligation_classifier_fail_closed_candidate_source_complete_separator_layer_certificate_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const PRELEDGER_ROW_FAMILY_STATUS = "preledger_row_family_classifier_fail_closed_no_row_consumption";
const STATUS =
  "higher_fold_layer_separator_certificate_readiness_frontier_classifier_fail_closed_child_refs_complete_aggregate_present_atlas_impulse_parent_locks_absent_no_row_consumption";

const EXPECTED_ROWS_BY_SEPARATOR = {
  Sigma_hf_01: 11,
  Sigma_hf_02: 11,
  Sigma_hf_03: 7,
  Sigma_hf_04: 9,
  Sigma_hf_05: 9,
  Sigma_hf_06: 9,
  Sigma_hf_07: 11,
  Sigma_hf_08: 11,
  Sigma_hf_09: 7,
  Sigma_hf_10: 9,
  Sigma_hf_11: 9,
  Sigma_hf_12: 9,
};
const CHILD_FIELDS = ["alpha_floor", "exit_floor", "fold_layer_parity_record"];
const FRONTIER_LOCK_FIELDS = [
  "higher_fold_layer_atlas_ref",
  "alpha_floor",
  "exit_floor",
  "fold_layer_parity_record",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "parent_complement_consumption_ref",
  "higher_fold_separator_layer_certificate",
  "accepted_fold_layer_row",
  "row_consumed",
];
const ATLAS_DERIVATION_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const IMPULSE_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

function parseArgs(argv) {
  const args = {
    exitFloorDerivation: DEFAULT_EXIT_FLOOR_DERIVATION,
    atlasSourceCertificate: DEFAULT_ATLAS_SOURCE_CERTIFICATE,
    separatorAggregate: DEFAULT_SEPARATOR_AGGREGATE,
    impulseAcceptanceDependency: DEFAULT_IMPULSE_ACCEPTANCE_DEPENDENCY,
    atlasMaterialization: DEFAULT_ATLAS_MATERIALIZATION,
    atlasObligation: DEFAULT_ATLAS_OBLIGATION,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    preledgerRowFamily: DEFAULT_PRELEDGER_ROW_FAMILY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--exit-floor-derivation") {
      args.exitFloorDerivation = argv[++index];
    } else if (arg === "--atlas-source-certificate") {
      args.atlasSourceCertificate = argv[++index];
    } else if (arg === "--separator-aggregate") {
      args.separatorAggregate = argv[++index];
    } else if (arg === "--impulse-acceptance-dependency") {
      args.impulseAcceptanceDependency = argv[++index];
    } else if (arg === "--atlas-materialization") {
      args.atlasMaterialization = argv[++index];
    } else if (arg === "--atlas-obligation") {
      args.atlasObligation = argv[++index];
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
    } else if (arg === "--preledger-row-family") {
      args.preledgerRowFamily = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-separator-certificate-readiness-frontier-classifier.mjs [options]

Options:
  --exit-floor-derivation PATH          Exit-floor proof-grade derivation attempt. Defaults to ${DEFAULT_EXIT_FLOOR_DERIVATION}.
  --atlas-source-certificate PATH       Accepted atlas-ref source-certificate attempt. Defaults to ${DEFAULT_ATLAS_SOURCE_CERTIFICATE}.
  --separator-aggregate PATH            Separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
  --impulse-acceptance-dependency PATH  Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE_DEPENDENCY}.
  --atlas-materialization PATH          Atlas-ref materialization attempt. Defaults to ${DEFAULT_ATLAS_MATERIALIZATION}.
  --atlas-obligation PATH               Accepted atlas-ref obligation classifier. Defaults to ${DEFAULT_ATLAS_OBLIGATION}.
  --proof-field-dependency PATH         Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --preledger-row-family PATH           Preledger row-family classifier. Defaults to ${DEFAULT_PRELEDGER_ROW_FAMILY}.
  --out-dir PATH                        Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                              Pretty-print JSON artifact.
  --help                                Show this help.`);
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

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
}

function sortedObjectByKey(object, compareFn = undefined) {
  return Object.fromEntries(Object.entries(object).sort(([left], [right]) => compareFn?.(left, right) ?? left.localeCompare(right)));
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
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

function validateRowsBySeparator(counts) {
  for (const [separator, expected] of Object.entries(EXPECTED_ROWS_BY_SEPARATOR)) {
    if (counts[separator] !== expected) {
      throw new Error(`Unexpected ${separator} row count: ${counts[separator]} !== ${expected}`);
    }
  }
}

function validateInputs(inputs) {
  for (const [name, source] of Object.entries(inputs)) {
    assertPacketId(source, name);
    if (source.preledger_pass !== false || source.updates_live_ledger !== false || source.branch_chart_authorized !== false) {
      throw new Error(`Refusing to use ${name} because it authorizes preledger/live-ledger/branch-chart state.`);
    }
  }
  assertStatus(inputs.exitFloorDerivation, "exitFloorDerivation", EXIT_FLOOR_DERIVATION_STATUS);
  assertStatus(inputs.atlasSourceCertificate, "atlasSourceCertificate", ATLAS_SOURCE_CERTIFICATE_STATUS);
  assertStatus(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);
  assertStatus(inputs.impulseAcceptanceDependency, "impulseAcceptanceDependency", IMPULSE_ACCEPTANCE_DEPENDENCY_STATUS);
  assertStatus(inputs.atlasMaterialization, "atlasMaterialization", ATLAS_MATERIALIZATION_STATUS);
  assertStatus(inputs.atlasObligation, "atlasObligation", ATLAS_OBLIGATION_STATUS);
  assertStatus(inputs.proofFieldDependency, "proofFieldDependency", PROOF_FIELD_DEPENDENCY_STATUS);
  assertStatus(inputs.preledgerRowFamily, "preledgerRowFamily", PRELEDGER_ROW_FAMILY_STATUS);
  const familySummary = inputs.preledgerRowFamily.summary;
  if (
    familySummary?.split_required_base_rows !== 162 ||
    familySummary?.regular_source_cover_parent_complement_rows !== 42 ||
    familySummary?.periodic_endpoint_complement_rows !== 8 ||
    familySummary?.higher_fold_layer_rows !== 112
  ) {
    throw new Error("Preledger row-family counts no longer match 162 = 42 + 8 + 112.");
  }
}

function childRefsComplete(entry) {
  return CHILD_FIELDS.every((field) => entry?.proof_grade_child_fields_present_after_exit_floor_derivation?.[field] === true);
}

function buildSeparatorFrontier(inputs) {
  const exitBySeparator = mapBy(
    inputs.exitFloorDerivation.separator_exit_floor_derivation_attempts,
    (entry) => entry.separator_event,
    "exit-floor derivation separator",
  );
  const atlasBySeparator = mapBy(
    inputs.atlasSourceCertificate.separator_atlas_source_certificate_attempts,
    (entry) => entry.separator_event,
    "atlas source certificate separator",
  );
  const aggregateBySeparator = mapBy(
    inputs.separatorAggregate.separator_aggregate_certificates,
    (entry) => entry.separator_event,
    "separator aggregate certificate",
  );
  const impulseBySeparator = mapBy(
    inputs.impulseAcceptanceDependency.separator_acceptance_dependency_profiles,
    (entry) => entry.separator_event,
    "impulse acceptance dependency separator",
  );
  const dependencyBySeparator = mapBy(
    inputs.proofFieldDependency.separator_dependency_profiles,
    (entry) => entry.separator_event,
    "separator proof-field dependency profile",
  );

  return Object.keys(EXPECTED_ROWS_BY_SEPARATOR)
    .sort((left, right) => separatorSortKey(left) - separatorSortKey(right))
    .map((separatorEvent) => {
      const exitEntry = requireMapEntry(exitBySeparator, separatorEvent, "exit-floor derivation separator");
      const atlasEntry = requireMapEntry(atlasBySeparator, separatorEvent, "atlas source certificate separator");
      const aggregateEntry = requireMapEntry(aggregateBySeparator, separatorEvent, "separator aggregate certificate");
      const impulseEntry = requireMapEntry(impulseBySeparator, separatorEvent, "impulse acceptance dependency separator");
      const dependencyEntry = requireMapEntry(dependencyBySeparator, separatorEvent, "separator proof-field dependency profile");
      const parentDependency = dependencyEntry.proof_field_dependencies?.parent_complement_consumption_ref;
      const childComplete = childRefsComplete(exitEntry);
      const aggregatePresent =
        aggregateEntry.separator_aggregate_C_Sigma_present === true &&
        aggregateEntry.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
        aggregateEntry.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true;
      return {
        separator_event: separatorEvent,
        fold_interval: exitEntry.fold_interval,
        row_count: exitEntry.row_count,
        row_ids: exitEntry.row_ids,
        child_proof_grade_refs_complete: childComplete,
        atlas_source_certificate_present: atlasEntry.atlas_source_certificate_constructed === true,
        accepted_higher_fold_layer_atlas_ref_present: false,
        separator_aggregate_C_Sigma_present: aggregateEntry.separator_aggregate_C_Sigma_present === true,
        separator_aggregate_A_Sigma_eta_epsilon_c_present:
          aggregateEntry.separator_aggregate_A_Sigma_eta_epsilon_c_present === true,
        separator_aggregate_I_fold_eta_epsilon_c_Sigma_present:
          aggregateEntry.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true,
        separator_aggregate_fields_complete: aggregatePresent,
        source_packet_acceptance_rule_present: impulseEntry.source_packet_acceptance_rule_present === true,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet:
          impulseEntry.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet === true,
        parent_row_association_anchor_present: parentDependency?.candidate_source_anchor_present === true,
        parent_complement_consumption_ref_present: false,
        higher_fold_separator_layer_certificate_present: false,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
        frontier_blockers: [
          ATLAS_DERIVATION_BLOCKER,
          IMPULSE_ACCEPTANCE_BLOCKER,
          PARENT_CONSUMPTION_BLOCKER,
          SEPARATOR_CERTIFICATE_BLOCKER,
        ],
      };
    });
}

function buildRowFrontier(inputs, separatorFrontier) {
  const frontierBySeparator = mapBy(separatorFrontier, (entry) => entry.separator_event, "separator frontier");
  const exitByRow = mapBy(
    inputs.exitFloorDerivation.row_exit_floor_derivation_attempts,
    (entry) => entry.row_id,
    "exit-floor derivation row",
  );
  const atlasByRow = mapBy(
    inputs.atlasSourceCertificate.row_atlas_source_certificate_attempts,
    (entry) => entry.row_id,
    "atlas source certificate row",
  );
  const aggregateByRow = mapBy(
    inputs.separatorAggregate.row_aggregate_certificates,
    (entry) => entry.row_id,
    "separator aggregate row",
  );
  const impulseByRow = mapBy(
    inputs.impulseAcceptanceDependency.row_acceptance_dependency_profiles,
    (entry) => entry.row_id,
    "impulse acceptance dependency row",
  );

  return [...inputs.exitFloorDerivation.row_exit_floor_derivation_attempts]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const frontier = requireMapEntry(frontierBySeparator, row.separator_event, "separator frontier");
      const exitRow = requireMapEntry(exitByRow, row.row_id, "exit-floor derivation row");
      const atlasRow = requireMapEntry(atlasByRow, row.row_id, "atlas source certificate row");
      const aggregateRow = requireMapEntry(aggregateByRow, row.row_id, "separator aggregate row");
      const impulseRow = requireMapEntry(impulseByRow, row.row_id, "impulse acceptance dependency row");
      const childComplete = CHILD_FIELDS.every(
        (field) => exitRow.child_proof_grade_refs_constructed_after_exit_floor_derivation?.[field] === true,
      );
      const aggregateComplete =
        aggregateRow.separator_aggregate_C_Sigma_present === true &&
        aggregateRow.separator_aggregate_A_Sigma_eta_epsilon_c_present === true &&
        aggregateRow.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present === true;
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        child_proof_grade_refs_complete: childComplete,
        atlas_source_certificate_present: atlasRow.proof_grade_atlas_source_certificate_present === true,
        accepted_higher_fold_layer_atlas_ref_present: false,
        separator_aggregate_fields_complete: aggregateComplete,
        source_packet_acceptance_rule_present: impulseRow.source_packet_acceptance_rule_present === true,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet:
          impulseRow.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet === true,
        parent_row_association_anchor_present: frontier.parent_row_association_anchor_present,
        parent_complement_consumption_ref_present: false,
        row_lock_fields_present_after_frontier_classification: {
          higher_fold_layer_atlas_ref: false,
          alpha_floor: true,
          exit_floor: true,
          fold_layer_parity_record: true,
          same_packet_fold_impulse_or_direct_quadrature_bound: false,
          parent_complement_consumption_ref: false,
          higher_fold_separator_layer_certificate: false,
          accepted_fold_layer_row: false,
          row_consumed: false,
        },
        frontier_blockers: frontier.frontier_blockers,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function fieldPresenceCounts(rows, getter, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => getter(row)[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs);
  const separatorFrontier = buildSeparatorFrontier(inputs);
  const rowFrontier = buildRowFrontier(inputs, separatorFrontier);
  const rowsBySeparatorCount = sortedObjectByKey(countBy(rowFrontier, (row) => row.separator_event), (left, right) => {
    return separatorSortKey(left) - separatorSortKey(right);
  });
  validateRowsBySeparator(rowsBySeparatorCount);

  const childPresence = fieldPresenceCounts(
    rowFrontier,
    (row) => ({
      alpha_floor: row.row_lock_fields_present_after_frontier_classification.alpha_floor,
      exit_floor: row.row_lock_fields_present_after_frontier_classification.exit_floor,
      fold_layer_parity_record: row.row_lock_fields_present_after_frontier_classification.fold_layer_parity_record,
    }),
    CHILD_FIELDS,
  );
  const rowLockPresence = fieldPresenceCounts(
    rowFrontier,
    (row) => row.row_lock_fields_present_after_frontier_classification,
    FRONTIER_LOCK_FIELDS,
  );

  const summary = {
    separator_frontier_profiles: separatorFrontier.length,
    fold_layer_rows: rowFrontier.length,
    rows_by_separator_count: rowsBySeparatorCount,
    preledger_split_required_base_rows: inputs.preledgerRowFamily.summary.split_required_base_rows,
    regular_source_cover_parent_complement_rows: inputs.preledgerRowFamily.summary.regular_source_cover_parent_complement_rows,
    periodic_endpoint_complement_rows: inputs.preledgerRowFamily.summary.periodic_endpoint_complement_rows,
    higher_fold_layer_rows: inputs.preledgerRowFamily.summary.higher_fold_layer_rows,
    rows_with_child_proof_grade_refs_complete: countTrue(rowFrontier, (row) => row.child_proof_grade_refs_complete),
    child_proof_grade_ref_obligations_remaining:
      inputs.exitFloorDerivation.summary.child_proof_grade_ref_obligations_remaining_after_exit_floor_derivation,
    child_proof_grade_ref_presence_counts_after_frontier_classification: childPresence,
    separator_profiles_with_atlas_source_certificate: countTrue(
      separatorFrontier,
      (entry) => entry.atlas_source_certificate_present,
    ),
    rows_with_atlas_source_certificate: countTrue(rowFrontier, (row) => row.atlas_source_certificate_present),
    rows_with_accepted_higher_fold_layer_atlas_ref: 0,
    separators_with_separator_aggregate_C_Sigma: countTrue(
      separatorFrontier,
      (entry) => entry.separator_aggregate_C_Sigma_present,
    ),
    separators_with_separator_aggregate_A_Sigma_eta_epsilon_c: countTrue(
      separatorFrontier,
      (entry) => entry.separator_aggregate_A_Sigma_eta_epsilon_c_present,
    ),
    separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma: countTrue(
      separatorFrontier,
      (entry) => entry.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present,
    ),
    rows_with_separator_aggregate_fields_complete: countTrue(rowFrontier, (row) => row.separator_aggregate_fields_complete),
    separators_with_source_packet_acceptance_rule: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    rows_with_same_packet_fold_impulse_or_direct_quadrature_bound: 0,
    separator_profiles_with_parent_row_association_anchor: countTrue(
      separatorFrontier,
      (entry) => entry.parent_row_association_anchor_present,
    ),
    rows_with_parent_row_association_anchor: countTrue(rowFrontier, (row) => row.parent_row_association_anchor_present),
    rows_with_parent_complement_consumption_ref: 0,
    rows_with_higher_fold_separator_layer_certificate: 0,
    row_lock_field_presence_counts_after_frontier_classification: rowLockPresence,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_atlas_ref_blocker: ATLAS_DERIVATION_BLOCKER,
    first_source_packet_blocker: IMPULSE_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };

  const invariant =
    summary.separator_frontier_profiles === 12 &&
    summary.fold_layer_rows === 112 &&
    summary.preledger_split_required_base_rows === 162 &&
    summary.regular_source_cover_parent_complement_rows === 42 &&
    summary.periodic_endpoint_complement_rows === 8 &&
    summary.higher_fold_layer_rows === 112 &&
    summary.rows_with_child_proof_grade_refs_complete === 112 &&
    summary.child_proof_grade_ref_obligations_remaining === 0 &&
    summary.separator_profiles_with_atlas_source_certificate === 12 &&
    summary.rows_with_atlas_source_certificate === 112 &&
    summary.rows_with_accepted_higher_fold_layer_atlas_ref === 0 &&
    summary.separators_with_separator_aggregate_C_Sigma === 12 &&
    summary.separators_with_separator_aggregate_A_Sigma_eta_epsilon_c === 12 &&
    summary.separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma === 12 &&
    summary.separators_with_source_packet_acceptance_rule === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.rows_with_parent_row_association_anchor === 112 &&
    summary.rows_with_parent_complement_consumption_ref === 0 &&
    summary.rows_with_higher_fold_separator_layer_certificate === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Fail-closed separator frontier invariant failed.");
  }

  return {
    schema: "breather-higher-fold-layer-separator-certificate-readiness-frontier-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only separator-certificate readiness frontier classifier; consolidates complete child proof-grade refs, accepted-atlas source certificates, and separator aggregate fields while keeping accepted atlas refs, impulse/direct-quadrature source-packet acceptance, parent-complement consumption refs, separator certificates, row consumption, preledger pass, live-ledger update, and branch-chart authorization locked",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_exit_floor_interval_width_proof_grade_derivation_attempt: artifactRecord(paths.exitFloorDerivation),
      higher_fold_layer_accepted_atlas_ref_source_certificate_attempt: artifactRecord(paths.atlasSourceCertificate),
      higher_fold_layer_same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
      higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(
        paths.impulseAcceptanceDependency,
      ),
      higher_fold_layer_atlas_ref_materialization_attempt: artifactRecord(paths.atlasMaterialization),
      higher_fold_layer_accepted_atlas_ref_obligation_classifier: artifactRecord(paths.atlasObligation),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      preledger_row_family_classifier: artifactRecord(paths.preledgerRowFamily),
    },
    classifier_rule:
      "A separator profile is readiness-frontier classified when all three child proof-grade refs are present for its rows, the accepted-atlas source certificate is present, fixed-parameter separator aggregate fields are present, and parent row-association anchors are present. The classifier does not promote source certificates or aggregate fields into accepted atlas refs, accepted impulse/direct-quadrature source packets, parent_complement_consumption_ref, higher_fold_separator_layer_certificate, accepted fold-layer rows, row consumption, preledger_pass, live-ledger updates, or branch-chart authorization.",
    separator_frontier_profiles: separatorFrontier,
    row_frontier_profiles: rowFrontier,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "accepted higher_fold_layer_atlas_ref derivation, source-packet acceptance evidence for same_packet_fold_impulse_or_direct_quadrature_bound, and parent-complement consumption authorization before higher_fold_separator_layer_certificate assembly",
      continuation_class:
        "mechanical for further classifiers or source-certificate handoffs; blocked for row consumption and separator-certificate construction until accepted atlas refs, impulse/direct-quadrature source-packet acceptance, and parent-complement consumption refs are proof-grade",
      fail_closed_stop_conditions: [
        "Do not introduce or assume fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule.",
        "Do not promote separator aggregate fields into accepted same_packet_fold_impulse_or_direct_quadrature_bound source packets.",
        "Do not construct parent_complement_consumption_ref before certificate/row-consumption authority exists.",
        "Do not construct higher_fold_separator_layer_certificate from this readiness frontier.",
        "Do not consume rows, update the live ledger, or authorize a branch chart.",
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
      "Priority-only. This artifact sharpens the separator-certificate frontier after child-field closure and atlas source certification, but proves no accepted atlas ref, accepted impulse/direct-quadrature source packet, parent-complement consumption ref, separator certificate, row consumption, live-ledger update, or branch-chart authorization.",
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

function fieldTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(entries) {
  return entries
    .map(
      (entry) =>
        `| \`${entry.separator_event}\` | \`${entry.fold_interval}\` | ${entry.row_count} | ${entry.child_proof_grade_refs_complete} | ${entry.atlas_source_certificate_present} | ${entry.separator_aggregate_fields_complete} | ${entry.parent_row_association_anchor_present} | ${entry.accepted_higher_fold_layer_atlas_ref_present} | ${entry.source_packet_acceptance_rule_present} | ${entry.parent_complement_consumption_ref_present} | ${entry.higher_fold_separator_layer_certificate_present} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | ${row.child_proof_grade_refs_complete} | ${row.atlas_source_certificate_present} | ${row.separator_aggregate_fields_complete} | ${row.parent_row_association_anchor_present} | ${row.accepted_higher_fold_layer_atlas_ref_present} | ${row.source_packet_acceptance_rule_present} | ${row.parent_complement_consumption_ref_present} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, classifier) {
  const report = `# Higher-Fold Layer Separator-Certificate Readiness Frontier Classifier

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier consolidates the current separator-certificate frontier after
the child-field proof-grade refs and the atlas source-certificate layer have
been constructed.

The readiness side is now concrete:

- ${classifier.summary.rows_with_child_proof_grade_refs_complete}
  / ${classifier.summary.fold_layer_rows} row associations have all three
  child-field \`proof_grade_ref\` fields;
- ${classifier.summary.rows_with_atlas_source_certificate}
  / ${classifier.summary.fold_layer_rows} row associations carry an accepted
  atlas-ref source certificate;
- ${classifier.summary.separators_with_separator_aggregate_C_Sigma}
  / ${classifier.summary.separator_frontier_profiles} separator profiles carry
  \`C_Sigma\`;
- ${classifier.summary.separators_with_separator_aggregate_A_Sigma_eta_epsilon_c}
  / ${classifier.summary.separator_frontier_profiles} separator profiles carry
  \`A_Sigma_eta_epsilon_c\`;
- ${classifier.summary.separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma}
  / ${classifier.summary.separator_frontier_profiles} separator profiles carry
  \`I_fold_eta_epsilon_c_Sigma\`;
- ${classifier.summary.rows_with_parent_row_association_anchor}
  / ${classifier.summary.fold_layer_rows} row associations have parent
  row-association anchors.

The locks remain closed: accepted atlas refs, source-packet acceptance rules,
accepted impulse/direct-quadrature source packets, parent-complement
consumption refs, separator certificates, row consumption, live-ledger updates,
and branch-chart authorization all remain 0.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Separator Frontier Profiles

| Separator | Fold interval | Rows | Child refs | Atlas source cert | Aggregates | Parent anchor | Accepted atlas | Acceptance rule | Parent consumption | Separator cert |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
${separatorTable(classifier.separator_frontier_profiles)}

## Child Proof-Grade Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(classifier.summary.child_proof_grade_ref_presence_counts_after_frontier_classification)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(classifier.summary.row_lock_field_presence_counts_after_frontier_classification)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Row Frontier Profiles

| Row | Separator | Child refs | Atlas source cert | Aggregates | Parent anchor | Accepted atlas | Acceptance rule | Parent consumption | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(classifier.row_frontier_profiles)}

## Certificate-Side Handoff

Next artifact target: \`${classifier.next_certificate_handoff.artifact_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is a priority-only separator-certificate readiness frontier
classifier. It proves no accepted \`higher_fold_layer_atlas_ref\`, accepted
\`same_packet_fold_impulse_or_direct_quadrature_bound\` source packet,
\`parent_complement_consumption_ref\`,
\`higher_fold_separator_layer_certificate\`, row consumption, live-ledger
update, or branch-chart authorization.
`;
  writeText(filePath, report);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    exitFloorDerivation: args.exitFloorDerivation,
    atlasSourceCertificate: args.atlasSourceCertificate,
    separatorAggregate: args.separatorAggregate,
    impulseAcceptanceDependency: args.impulseAcceptanceDependency,
    atlasMaterialization: args.atlasMaterialization,
    atlasObligation: args.atlasObligation,
    proofFieldDependency: args.proofFieldDependency,
    preledgerRowFamily: args.preledgerRowFamily,
  };
  const inputs = {
    exitFloorDerivation: readJson(paths.exitFloorDerivation),
    atlasSourceCertificate: readJson(paths.atlasSourceCertificate),
    separatorAggregate: readJson(paths.separatorAggregate),
    impulseAcceptanceDependency: readJson(paths.impulseAcceptanceDependency),
    atlasMaterialization: readJson(paths.atlasMaterialization),
    atlasObligation: readJson(paths.atlasObligation),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    preledgerRowFamily: readJson(paths.preledgerRowFamily),
  };
  const classifier = buildClassifier(paths, inputs);
  const outputJson = path.join(args.outDir, OUTPUT_JSON);
  const outputReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJson, classifier, args.pretty);
  writeReport(outputReport, classifier);
  console.log(`wrote ${outputJson}`);
  console.log(`wrote ${outputReport}`);
}

main();

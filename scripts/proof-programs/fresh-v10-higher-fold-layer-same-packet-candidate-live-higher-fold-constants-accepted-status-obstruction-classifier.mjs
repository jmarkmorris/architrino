#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONSISTENCY = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_consistency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_MATERIALIZATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OBLIGATION_CLASSIFIER = `${CERT_DIR}/higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONSTANTS_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ASSEMBLY_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_certificate_assembly_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_obstruction_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_obstruction_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const CONSISTENCY_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_consistency_classifier_fail_closed_candidate_exact_interval_consistency_verified_accepted_interval_certified_status_absent_no_source_packet_acceptance_no_row_consumption";
const MATERIALIZATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_materialization_attempt_fail_closed_exact_interval_fields_materialized_accepted_interval_certified_status_absent_no_source_packet_acceptance_no_row_consumption";
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
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_obstruction_classifier_fail_closed_candidate_consistent_accepted_status_absent_acceptance_obligations_classified_no_row_consumption";

const ACCEPTED_ARTIFACT_BLOCKER = "accepted_same_packet_higher_fold_constants_artifact_absent";
const ACCEPTED_STATUS_BLOCKER = "accepted_interval_certified_constants_status_absent";
const CONTRACT_PACKET_BLOCKER = "existing_constants_contract_packet_identity_mismatch";
const CONTRACT_SEPARATOR_BLOCKER = "existing_constants_contract_separator_family_mismatch";
const ATLAS_BRIDGE_BLOCKER = "accepted_atlas_ref_source_certificate_to_accepted_field_derivation_bridge_absent";
const ACCEPTED_ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ACCEPTED_SOURCE_PACKET_BLOCKER = "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

const CONSISTENCY_SOURCE_HASH_KEYS = [
  ["candidate_live_higher_fold_constants_artifact_materialization_attempt", "materialization"],
  ["same_packet_separator_aggregate_certificate_attempt", "separatorAggregate"],
  ["higher_fold_constants_artifact_field_obligation_classifier", "obligationClassifier"],
  ["same_packet_impulse_bound_source_packet_acceptance_dependency_classifier", "impulseAcceptance"],
  ["same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier", "constantsConformance"],
  ["higher_fold_layer_separator_certificate_assembly_dependency_classifier", "assemblyDependency"],
];

const ACCEPTED_STATUS_FIELDS = [
  "accepted_higher_fold_constants_artifact_present",
  "accepted_interval_certified_constants_status_present",
  "accepted_constants_conformance",
  "source_packet_acceptance_rule_present",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "accepted_higher_fold_layer_atlas_ref_present",
  "parent_complement_consumption_ref_present",
  "higher_fold_separator_layer_certificate_present",
];

function parseArgs(argv) {
  const args = {
    consistency: DEFAULT_CONSISTENCY,
    materialization: DEFAULT_MATERIALIZATION,
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
    } else if (arg === "--consistency") {
      args.consistency = argv[++index];
    } else if (arg === "--materialization") {
      args.materialization = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-status-obstruction-classifier.mjs [options]

Options:
  --consistency PATH              Candidate-live constants artifact consistency classifier. Defaults to ${DEFAULT_CONSISTENCY}.
  --materialization PATH          Candidate-live constants artifact materialization attempt. Defaults to ${DEFAULT_MATERIALIZATION}.
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

function allTrue(value) {
  return Object.values(value).every(Boolean);
}

function presenceCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => row[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function countFalseFields(row, fields) {
  return fields.filter((field) => row[field] === false).length;
}

function assertConsistencySourceHashLocks(paths, consistency) {
  return CONSISTENCY_SOURCE_HASH_KEYS.map(([sourceArtifactKey, pathKey]) => {
    const consistencyRecord = consistency.source_artifacts?.[sourceArtifactKey];
    const currentHash = sha256File(paths[pathKey]);
    const hashMatches = consistencyRecord?.sha256 === currentHash;
    if (!hashMatches) {
      throw new Error(`Source hash mismatch for ${sourceArtifactKey}.`);
    }
    return {
      source_artifact: sourceArtifactKey,
      consistency_basename: consistencyRecord.basename,
      current_basename: path.basename(paths[pathKey]),
      consistency_sha256: consistencyRecord.sha256,
      current_sha256: currentHash,
      hash_matches: true,
    };
  });
}

function validateInputs(inputs) {
  for (const [name, source] of Object.entries(inputs)) {
    assertPacketId(source, name);
    assertFailClosed(source, name);
  }
  assertStatus(inputs.consistency, "consistency", CONSISTENCY_STATUS);
  assertStatus(inputs.materialization, "materialization", MATERIALIZATION_STATUS);
  assertStatus(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);
  assertStatus(inputs.obligationClassifier, "obligationClassifier", OBLIGATION_STATUS);
  assertStatus(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertStatus(inputs.constantsConformance, "constantsConformance", CONSTANTS_CONFORMANCE_STATUS);
  assertStatus(inputs.assemblyDependency, "assemblyDependency", ASSEMBLY_DEPENDENCY_STATUS);
  if (inputs.consistency.summary?.source_hash_checks_passed !== 5) {
    throw new Error("Consistency input no longer preserves 5 / 5 materialization source-hash locks.");
  }
  if (inputs.consistency.summary?.candidate_exact_consistent_separator_constants !== 12) {
    throw new Error("Consistency input no longer has 12 exact-consistent separator constants.");
  }
  if (inputs.consistency.summary?.candidate_exact_arithmetic_consistent_separator_constants !== 12) {
    throw new Error("Consistency input no longer has 12 exact-arithmetic separator constants.");
  }
  if (inputs.consistency.summary?.candidate_exact_consistent_rows !== 112) {
    throw new Error("Consistency input no longer has 112 exact-consistent rows.");
  }
  if (inputs.consistency.summary?.candidate_exact_arithmetic_consistent_rows !== 112) {
    throw new Error("Consistency input no longer has 112 exact-arithmetic rows.");
  }
  if (inputs.consistency.summary?.separators_with_accepted_interval_certified_constants_status !== 0) {
    throw new Error("Consistency input unexpectedly has accepted interval-certified constants statuses.");
  }
  if (inputs.materialization.summary?.candidate_higher_fold_constants_artifacts !== 1) {
    throw new Error("Materialization input no longer has one candidate/live constants artifact.");
  }
  if (inputs.materialization.summary?.candidate_separator_constants !== 12) {
    throw new Error("Materialization input no longer has 12 candidate separator constants.");
  }
  if (inputs.materialization.summary?.candidate_row_constant_associations !== 112) {
    throw new Error("Materialization input no longer has 112 candidate row associations.");
  }
  if (inputs.obligationClassifier.summary?.separators_with_accepted_constants_artifact_status !== 0) {
    throw new Error("Obligation classifier unexpectedly has accepted constants statuses.");
  }
  if (inputs.constantsConformance.summary?.first_conformance_blocker !== CONTRACT_PACKET_BLOCKER) {
    throw new Error("Constants conformance input no longer blocks at the expected packet mismatch.");
  }
  if (inputs.impulseAcceptance.summary?.separators_with_source_packet_acceptance_rule !== 0) {
    throw new Error("Impulse acceptance input unexpectedly contains source-packet acceptance rules.");
  }
  if (inputs.assemblyDependency.summary?.rows_with_higher_fold_separator_layer_certificate !== 0) {
    throw new Error("Assembly dependency input unexpectedly has separator certificates.");
  }
}

function buildSeparatorObstructions(inputs) {
  const materializationBySeparator = mapBy(
    inputs.materialization.candidate_separator_constants,
    (entry) => entry.separator_event,
    "materialization separator",
  );
  const consistencyBySeparator = mapBy(
    inputs.consistency.separator_consistency_classification,
    (entry) => entry.separator_event,
    "consistency separator",
  );
  const obligationBySeparator = mapBy(
    inputs.obligationClassifier.separator_constants_artifact_obligation_profiles,
    (entry) => entry.separator_event,
    "obligation separator",
  );
  const conformanceBySeparator = mapBy(
    inputs.constantsConformance.separator_conformance_profiles,
    (entry) => entry.separator_event,
    "conformance separator",
  );
  const impulseBySeparator = mapBy(
    inputs.impulseAcceptance.separator_acceptance_dependency_profiles,
    (entry) => entry.separator_event,
    "impulse acceptance separator",
  );
  const assemblyBySeparator = mapBy(
    inputs.assemblyDependency.separator_assembly_dependency_profiles,
    (entry) => entry.separator_event,
    "assembly dependency separator",
  );

  return [...inputs.consistency.separator_consistency_classification]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((consistency) => {
      const materialization = requireMapEntry(
        materializationBySeparator,
        consistency.separator_event,
        "materialization separator",
      );
      const obligation = requireMapEntry(obligationBySeparator, consistency.separator_event, "obligation separator");
      const conformance = requireMapEntry(conformanceBySeparator, consistency.separator_event, "conformance separator");
      const impulse = requireMapEntry(impulseBySeparator, consistency.separator_event, "impulse acceptance separator");
      const assembly = requireMapEntry(assemblyBySeparator, consistency.separator_event, "assembly dependency separator");
      const candidate_status_preconditions = {
        candidate_artifact_materialized: materialization.candidate_higher_fold_constants_artifact_present === true,
        candidate_interval_fields_complete: materialization.candidate_interval_fields_complete === true,
        candidate_interval_field_shape_verified: materialization.candidate_interval_field_shape_verified === true,
        exact_field_consistency_verified: consistency.candidate_exact_consistency_pass === true,
        exact_arithmetic_consistency_verified: consistency.exact_arithmetic_consistency_pass === true,
        live_interval_field_obligations_complete:
          obligation.live_packet_identity_present === true &&
          obligation.higher_fold_separator_family_present === true &&
          obligation.mollifier_route_declared === true &&
          obligation.M_delta_interval_certified === true &&
          obligation.delta_eta_sup_norm_interval_certified === true &&
          obligation.Gamma_g_coupling_certified === true &&
          obligation.row_projection_source_slice_coverage_certified === true &&
          obligation.dual_mollified_row_integrand_interval_enclosure_present === true &&
          obligation.row_impulse_enclosures_present === true &&
          obligation.separator_aggregate_fields_present === true,
        separator_aggregate_fields_present: conformance.separator_aggregate_fields_present === true,
        row_enclosures_present: conformance.row_enclosures_present === true,
        child_proof_grade_refs_complete: assembly.child_proof_grade_refs_complete === true,
        parent_row_association_anchor_present: assembly.parent_row_association_anchor_present === true,
      };
      const accepted_status_obligations = {
        accepted_higher_fold_constants_artifact_present: false,
        accepted_interval_certified_constants_status_present: false,
        accepted_constants_conformance: false,
        source_packet_acceptance_rule_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        accepted_higher_fold_layer_atlas_ref_present: false,
        parent_complement_consumption_ref_present: false,
        higher_fold_separator_layer_certificate_present: false,
      };
      const candidate_status_preconditions_complete = allTrue(candidate_status_preconditions);
      const accepted_status_obligations_satisfied = allTrue(accepted_status_obligations);
      return {
        separator_event: consistency.separator_event,
        fold_interval: consistency.fold_interval,
        row_count: consistency.row_count,
        candidate_artifact_ref: consistency.candidate_artifact_ref,
        candidate_status_preconditions,
        candidate_status_preconditions_complete,
        ...accepted_status_obligations,
        accepted_status_obligations_satisfied,
        unmet_accepted_status_obligation_count: countFalseFields(accepted_status_obligations, ACCEPTED_STATUS_FIELDS),
        first_status_obstruction: ACCEPTED_STATUS_BLOCKER,
        constants_artifact_blocker: ACCEPTED_ARTIFACT_BLOCKER,
        first_conformance_blocker: conformance.first_conformance_blocker,
        constants_contract_blockers: [CONTRACT_PACKET_BLOCKER, CONTRACT_SEPARATOR_BLOCKER],
        first_accepted_atlas_ref_blocker: assembly.first_accepted_atlas_ref_blocker,
        first_source_packet_blocker: impulse.first_source_packet_blocker,
        accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
        parent_complement_consumption_ref_blocker: assembly.parent_complement_consumption_ref_blocker,
        first_separator_certificate_blocker: assembly.first_separator_certificate_blocker,
        obstruction_layers: {
          accepted_status_layer: [ACCEPTED_STATUS_BLOCKER, ACCEPTED_ARTIFACT_BLOCKER],
          constants_conformance_layer: [CONTRACT_PACKET_BLOCKER, CONTRACT_SEPARATOR_BLOCKER],
          source_packet_acceptance_layer: [SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER, ACCEPTED_SOURCE_PACKET_BLOCKER],
          separator_assembly_layer: [
            ATLAS_BRIDGE_BLOCKER,
            ACCEPTED_ATLAS_REF_BLOCKER,
            PARENT_CONSUMPTION_BLOCKER,
            SEPARATOR_CERTIFICATE_BLOCKER,
          ],
        },
        classification:
          candidate_status_preconditions_complete && !accepted_status_obligations_satisfied
            ? "candidate_exact_consistent_accepted_status_obstructed"
            : "candidate_status_precondition_or_obligation_unexpected",
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowObstructions(inputs) {
  const materializationByRow = mapBy(
    inputs.materialization.candidate_row_constant_associations,
    (entry) => entry.row_id,
    "materialization row",
  );
  const consistencyByRow = mapBy(inputs.consistency.row_consistency_classification, (entry) => entry.row_id, "consistency row");
  const obligationByRow = mapBy(
    inputs.obligationClassifier.row_constants_artifact_obligation_profiles,
    (entry) => entry.row_id,
    "obligation row",
  );
  const conformanceByRow = mapBy(
    inputs.constantsConformance.row_conformance_profiles,
    (entry) => entry.row_id,
    "conformance row",
  );
  const impulseByRow = mapBy(
    inputs.impulseAcceptance.row_acceptance_dependency_profiles,
    (entry) => entry.row_id,
    "impulse acceptance row",
  );
  const assemblyByRow = mapBy(
    inputs.assemblyDependency.row_assembly_dependency_profiles,
    (entry) => entry.row_id,
    "assembly dependency row",
  );

  return [...inputs.consistency.row_consistency_classification]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((consistency) => {
      const materialization = requireMapEntry(materializationByRow, consistency.row_id, "materialization row");
      const obligation = requireMapEntry(obligationByRow, consistency.row_id, "obligation row");
      const conformance = requireMapEntry(conformanceByRow, consistency.row_id, "conformance row");
      const impulse = requireMapEntry(impulseByRow, consistency.row_id, "impulse acceptance row");
      const assembly = requireMapEntry(assemblyByRow, consistency.row_id, "assembly dependency row");
      const candidate_status_preconditions = {
        candidate_artifact_ref_present: materialization.candidate_higher_fold_constants_artifact_ref_present === true,
        candidate_interval_fields_complete: materialization.candidate_interval_fields_complete === true,
        candidate_row_exact_fields_materialized: materialization.candidate_row_exact_fields_materialized === true,
        exact_fields_authoritative: materialization.exact_fields_authoritative === true,
        exact_field_consistency_verified: consistency.candidate_exact_consistency_pass === true,
        exact_arithmetic_consistency_verified: consistency.exact_arithmetic_consistency_pass === true,
        live_interval_field_obligations_complete:
          obligation.live_packet_identity_present === true &&
          obligation.higher_fold_row_family_present === true &&
          obligation.mollifier_route_declared === true &&
          obligation.M_delta_interval_certified === true &&
          obligation.delta_eta_sup_norm_interval_certified === true &&
          obligation.Gamma_g_coupling_certified === true &&
          obligation.row_projection_source_slice_coverage_certified === true &&
          obligation.dual_mollified_row_integrand_interval_enclosure_present === true &&
          obligation.row_impulse_enclosure_present === true &&
          obligation.separator_aggregate_fields_present === true,
        separator_aggregate_fields_present: conformance.separator_aggregate_fields_present === true,
        row_enclosure_present: conformance.row_enclosure_present === true,
        child_proof_grade_refs_complete: assembly.child_proof_grade_refs_complete === true,
        parent_row_association_anchor_present: assembly.parent_row_association_anchor_present === true,
      };
      const accepted_status_obligations = {
        accepted_higher_fold_constants_artifact_present: false,
        accepted_interval_certified_constants_status_present: false,
        accepted_constants_conformance: false,
        source_packet_acceptance_rule_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        accepted_higher_fold_layer_atlas_ref_present: false,
        parent_complement_consumption_ref_present: false,
        higher_fold_separator_layer_certificate_present: false,
      };
      const candidate_status_preconditions_complete = allTrue(candidate_status_preconditions);
      const accepted_status_obligations_satisfied = allTrue(accepted_status_obligations);
      return {
        row_id: consistency.row_id,
        ledger: consistency.ledger,
        status: materialization.status,
        failure_code: materialization.failure_code,
        separator_event: consistency.separator_event,
        fold_interval: consistency.fold_interval,
        receiver_interval: consistency.receiver_interval,
        source_interval: consistency.source_interval,
        candidate_higher_fold_constants_artifact_ref: consistency.candidate_higher_fold_constants_artifact_ref,
        candidate_status_preconditions,
        candidate_status_preconditions_complete,
        ...accepted_status_obligations,
        accepted_status_obligations_satisfied,
        unmet_accepted_status_obligation_count: countFalseFields(accepted_status_obligations, ACCEPTED_STATUS_FIELDS),
        first_status_obstruction: ACCEPTED_STATUS_BLOCKER,
        constants_artifact_blocker: ACCEPTED_ARTIFACT_BLOCKER,
        first_conformance_blocker: conformance.first_conformance_blocker,
        first_accepted_atlas_ref_blocker: assembly.first_accepted_atlas_ref_blocker,
        first_source_packet_blocker: impulse.first_source_packet_blocker,
        accepted_source_packet_blocker: ACCEPTED_SOURCE_PACKET_BLOCKER,
        parent_complement_consumption_ref_blocker: assembly.parent_complement_consumption_ref_blocker,
        first_separator_certificate_blocker: assembly.first_separator_certificate_blocker,
        classification:
          candidate_status_preconditions_complete && !accepted_status_obligations_satisfied
            ? "candidate_row_exact_consistent_accepted_status_obstructed"
            : "candidate_row_status_precondition_or_obligation_unexpected",
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
  const consistencySourceHashChecks = assertConsistencySourceHashLocks(paths, inputs.consistency);
  const separatorObstructions = buildSeparatorObstructions(inputs);
  const rowObstructions = buildRowObstructions(inputs);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowObstructions, (row) => row.separator_event));
  const completeRowsBySeparator = sortedObjectBySeparator(
    countBy(
      rowObstructions.filter((row) => row.candidate_status_preconditions_complete),
      (row) => row.separator_event,
    ),
  );
  const obstructedRowsBySeparator = sortedObjectBySeparator(
    countBy(
      rowObstructions.filter((row) => row.classification === "candidate_row_exact_consistent_accepted_status_obstructed"),
      (row) => row.separator_event,
    ),
  );
  const summary = {
    consistency_source_hash_checks: consistencySourceHashChecks.length,
    consistency_source_hash_checks_passed: countTrue(consistencySourceHashChecks, (entry) => entry.hash_matches),
    materialization_source_hash_checks_retained: inputs.consistency.summary.source_hash_checks,
    materialization_source_hash_checks_retained_passed: inputs.consistency.summary.source_hash_checks_passed,
    candidate_higher_fold_constants_artifacts: inputs.materialization.summary.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorObstructions.length,
    candidate_row_constant_associations: rowObstructions.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_candidate_status_preconditions_complete: countTrue(
      separatorObstructions,
      (entry) => entry.candidate_status_preconditions_complete,
    ),
    rows_with_candidate_status_preconditions_complete: countTrue(
      rowObstructions,
      (entry) => entry.candidate_status_preconditions_complete,
    ),
    candidate_exact_consistent_separator_constants: inputs.consistency.summary.candidate_exact_consistent_separator_constants,
    candidate_exact_arithmetic_consistent_separator_constants:
      inputs.consistency.summary.candidate_exact_arithmetic_consistent_separator_constants,
    candidate_exact_consistent_rows: inputs.consistency.summary.candidate_exact_consistent_rows,
    candidate_exact_arithmetic_consistent_rows: inputs.consistency.summary.candidate_exact_arithmetic_consistent_rows,
    separators_with_accepted_higher_fold_constants_artifact: 0,
    separators_with_accepted_interval_certified_constants_status: 0,
    rows_with_accepted_interval_certified_constants_status: 0,
    separators_with_accepted_constants_conformance: 0,
    rows_with_accepted_constants_conformance: 0,
    separators_with_source_packet_acceptance_rule: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: 0,
    rows_with_accepted_higher_fold_layer_atlas_ref: 0,
    rows_with_parent_complement_consumption_ref: 0,
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    separator_accepted_status_presence_counts: presenceCounts(separatorObstructions, ACCEPTED_STATUS_FIELDS),
    row_accepted_status_presence_counts: presenceCounts(rowObstructions, ACCEPTED_STATUS_FIELDS),
    rows_with_complete_preconditions_by_separator: completeRowsBySeparator,
    obstructed_rows_by_separator: obstructedRowsBySeparator,
    unmet_separator_accepted_status_obligations: separatorObstructions.reduce(
      (sum, row) => sum + row.unmet_accepted_status_obligation_count,
      0,
    ),
    unmet_row_accepted_status_obligations: rowObstructions.reduce(
      (sum, row) => sum + row.unmet_accepted_status_obligation_count,
      0,
    ),
    first_status_obstruction: ACCEPTED_STATUS_BLOCKER,
    first_constants_artifact_blocker: ACCEPTED_ARTIFACT_BLOCKER,
    first_conformance_blocker: CONTRACT_PACKET_BLOCKER,
    first_accepted_atlas_ref_blocker: ACCEPTED_ATLAS_REF_BLOCKER,
    first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };
  const invariant =
    summary.consistency_source_hash_checks_passed === 6 &&
    summary.materialization_source_hash_checks_retained_passed === 5 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    summary.separators_with_candidate_status_preconditions_complete === 12 &&
    summary.rows_with_candidate_status_preconditions_complete === 112 &&
    summary.candidate_exact_consistent_separator_constants === 12 &&
    summary.candidate_exact_arithmetic_consistent_separator_constants === 12 &&
    summary.candidate_exact_consistent_rows === 112 &&
    summary.candidate_exact_arithmetic_consistent_rows === 112 &&
    summary.separators_with_accepted_interval_certified_constants_status === 0 &&
    summary.rows_with_accepted_interval_certified_constants_status === 0 &&
    summary.separators_with_source_packet_acceptance_rule === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.rows_with_parent_complement_consumption_ref === 0 &&
    summary.rows_with_higher_fold_separator_layer_certificate === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Accepted-status obstruction classifier invariant failed.");
  }

  return {
    schema:
      "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-status-obstruction-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only accepted-status obstruction classifier; proves that candidate/live exact interval consistency is complete but accepted interval-certified constants status, source-packet acceptance, row consumption, preledger pass, live-ledger update, and branch-chart authorization remain absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      candidate_live_higher_fold_constants_artifact_consistency_classifier: artifactRecord(paths.consistency),
      candidate_live_higher_fold_constants_artifact_materialization_attempt: artifactRecord(paths.materialization),
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
    consistency_source_hash_checks: consistencySourceHashChecks,
    accepted_status_obstruction_rule: {
      name: "candidate_live_higher_fold_constants_accepted_interval_certified_status_obstruction",
      necessary_candidate_side_verified: true,
      sufficient_accepted_status_side_verified: false,
      candidate_exact_consistency_is_not_acceptance: true,
      accepted_interval_certified_constants_status_required: true,
      accepted_interval_certified_constants_status_present: false,
      accepted_status_primitive_decision_made: false,
      source_packet_acceptance_rule_decision_made: false,
      first_status_obstruction: ACCEPTED_STATUS_BLOCKER,
      first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    },
    obstruction_layers: {
      accepted_status_layer: [ACCEPTED_STATUS_BLOCKER, ACCEPTED_ARTIFACT_BLOCKER],
      constants_conformance_layer: [CONTRACT_PACKET_BLOCKER, CONTRACT_SEPARATOR_BLOCKER],
      source_packet_acceptance_layer: [SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER, ACCEPTED_SOURCE_PACKET_BLOCKER],
      separator_assembly_layer: [
        ATLAS_BRIDGE_BLOCKER,
        ACCEPTED_ATLAS_REF_BLOCKER,
        PARENT_CONSUMPTION_BLOCKER,
        SEPARATOR_CERTIFICATE_BLOCKER,
      ],
    },
    separator_accepted_status_obstruction_profiles: separatorObstructions,
    row_accepted_status_obstruction_profiles: rowObstructions,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "proof-grade accepted interval-certified constants status derivation for the candidate/live artifact, or an explicit source-packet acceptance rule for the same-packet fixed-parameter aggregate",
      continuation_class:
        "not mechanically consumable from current data; mechanical only after accepted-status derivation evidence or an explicit source-packet acceptance rule is supplied",
      decision_boundary:
        "this classifier treats candidate exact interval consistency as necessary evidence only; it does not mark the candidate/live constants artifact accepted and does not introduce primitive acceptance",
      fail_closed_stop_conditions: [
        "Do not promote candidate exact consistency into accepted interval-certified constants status.",
        "Do not infer accepted constants conformance from the seed-packet constants contract.",
        "Do not treat the candidate/live constants artifact as an accepted same_packet_fold_impulse_or_direct_quadrature_bound source packet.",
        "Do not construct accepted atlas refs, parent_complement_consumption_ref, or higher_fold_separator_layer_certificate from this obstruction classifier.",
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
      "Priority-only. This classifier sharpens the live blocker from candidate exact consistency to missing accepted interval-certified constants status plus unchanged source-packet, atlas-ref, parent-consumption, and separator-certificate obligations. It proves no accepted source packet, row consumption, live-ledger update, or branch-chart authorization.",
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

function hashTable(checks) {
  return checks
    .map(
      (check) =>
        `| \`${check.source_artifact}\` | \`${check.consistency_basename}\` | \`${check.current_basename}\` | ${check.hash_matches} |`,
    )
    .join("\n");
}

function countTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count} |`)
    .join("\n");
}

function presenceTable(counts) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function layerTable(layers) {
  return Object.entries(layers)
    .map(([layer, blockers]) => `| \`${layer}\` | ${blockers.map((blocker) => `\`${blocker}\``).join(", ")} |`)
    .join("\n");
}

function separatorTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.row_count} | ${row.candidate_status_preconditions_complete} | ${row.accepted_interval_certified_constants_status_present} | ${row.source_packet_acceptance_rule_present} | ${row.higher_fold_separator_layer_certificate_present} | \`${row.classification}\` |`,
    )
    .join("\n");
}

function rowSummaryTable(classifier) {
  return Object.entries(classifier.summary.rows_by_separator_count)
    .map(([separator, count]) => {
      const complete = classifier.summary.rows_with_complete_preconditions_by_separator[separator] ?? 0;
      const obstructed = classifier.summary.obstructed_rows_by_separator[separator] ?? 0;
      return `| \`${separator}\` | ${count} | ${complete} | ${obstructed} |`;
    })
    .join("\n");
}

function reportMarkdown(classifier) {
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Accepted-Status Obstruction Classifier

Packet: \`${classifier.packet_id}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier starts from the candidate/live higher-fold constants artifact
consistency classifier and separates necessary candidate evidence from accepted
status evidence.

Verified candidate side:

- ${classifier.summary.consistency_source_hash_checks_passed}
  / ${classifier.summary.consistency_source_hash_checks} current consistency
  source-hash locks;
- ${classifier.summary.materialization_source_hash_checks_retained_passed}
  / ${classifier.summary.materialization_source_hash_checks_retained}
  retained materialization source-hash locks;
- ${classifier.summary.candidate_exact_consistent_separator_constants}
  / ${classifier.summary.candidate_separator_constants} separator constants
  exact-field consistency classifications;
- ${classifier.summary.candidate_exact_arithmetic_consistent_separator_constants}
  / ${classifier.summary.candidate_separator_constants} separator constants
  exact-arithmetic consistency classifications;
- ${classifier.summary.candidate_exact_consistent_rows}
  / ${classifier.summary.candidate_row_constant_associations} row exact-field
  consistency classifications;
- ${classifier.summary.candidate_exact_arithmetic_consistent_rows}
  / ${classifier.summary.candidate_row_constant_associations} row
  exact-arithmetic consistency classifications;
- ${classifier.summary.separators_with_candidate_status_preconditions_complete}
  / ${classifier.summary.candidate_separator_constants} separator
  accepted-status precondition profiles complete;
- ${classifier.summary.rows_with_candidate_status_preconditions_complete}
  / ${classifier.summary.candidate_row_constant_associations} row
  accepted-status precondition profiles complete.

Still absent:

- ${classifier.summary.separators_with_accepted_higher_fold_constants_artifact}
  / ${classifier.summary.candidate_separator_constants} accepted higher-fold
  constants artifacts;
- ${classifier.summary.separators_with_accepted_interval_certified_constants_status}
  / ${classifier.summary.candidate_separator_constants} accepted
  interval-certified constants statuses;
- ${classifier.summary.separators_with_accepted_constants_conformance}
  / ${classifier.summary.candidate_separator_constants} accepted constants
  conformance profiles;
- ${classifier.summary.separators_with_source_packet_acceptance_rule}
  / ${classifier.summary.candidate_separator_constants} source-packet
  acceptance rules;
- ${classifier.summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets}
  / ${classifier.summary.candidate_separator_constants} accepted
  impulse/direct-quadrature source packets;
- ${classifier.summary.rows_with_parent_complement_consumption_ref}
  / ${classifier.summary.candidate_row_constant_associations}
  parent complement consumption refs;
- ${classifier.summary.rows_with_higher_fold_separator_layer_certificate}
  / ${classifier.summary.candidate_row_constant_associations}
  separator certificates.

The first accepted-status obstruction is
\`${classifier.summary.first_status_obstruction}\`. The first source-packet
blocker remains \`${classifier.summary.first_source_packet_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Consistency Source-Hash Locks

| Source artifact | Consistency file | Current file | Hash matches |
| --- | --- | --- | --- |
${hashTable(classifier.consistency_source_hash_checks)}

## Obstruction Layers

| Layer | Blockers |
| --- | --- |
${layerTable(classifier.obstruction_layers)}

## Separator Accepted-Status Obstruction Profiles

| Separator | Fold interval | Rows | Preconditions complete | Accepted status | Source-packet rule | Separator certificate | Classification |
| --- | --- | ---: | --- | --- | --- | --- | --- |
${separatorTable(classifier.separator_accepted_status_obstruction_profiles)}

## Row Obstruction Summary

| Separator | Rows | Complete preconditions | Obstructed rows |
| --- | ---: | ---: | ---: |
${rowSummaryTable(classifier)}

## Accepted-Status Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(classifier.summary.separator_accepted_status_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(classifier.summary.row_accepted_status_presence_counts)}

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
    consistency: args.consistency,
    materialization: args.materialization,
    separatorAggregate: args.separatorAggregate,
    obligationClassifier: args.obligationClassifier,
    impulseAcceptance: args.impulseAcceptance,
    constantsConformance: args.constantsConformance,
    assemblyDependency: args.assemblyDependency,
  };
  const inputs = {
    consistency: readJson(paths.consistency),
    materialization: readJson(paths.materialization),
    separatorAggregate: readJson(paths.separatorAggregate),
    obligationClassifier: readJson(paths.obligationClassifier),
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

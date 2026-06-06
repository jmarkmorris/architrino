#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_DATA = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SOURCE_REF_MANIFEST = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_source_ref_manifest.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_DERIVATION_ATTEMPT = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CHILD_DIAGNOSTIC = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_separator_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_alpha_exit_parity_child_field_source_data_proof_grade_ref_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_alpha_exit_parity_child_field_source_data_proof_grade_ref_obligation_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SOURCE_DATA_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";
const SOURCE_REF_MANIFEST_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_ref_manifest_fail_closed_candidate_source_refs_and_parity_delta_candidates_materialized_proof_grade_refs_absent_no_row_consumption";
const DERIVATION_ATTEMPT_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt_fail_closed_candidate_child_sources_present_derivation_refs_and_delta_fields_absent_no_row_consumption";
const CHILD_DIAGNOSTIC_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic_fail_closed_candidate_child_sources_present_proof_grade_child_derivations_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const SEPARATOR_CERTIFICATE_STATUS =
  "higher_fold_layer_separator_certificate_attempt_fail_closed_candidate_source_complete_diagnostic_impulse_constants_rejected_no_accepted_atlas_ref_no_row_consumption";
const STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_data_proof_grade_ref_obligation_classifier_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";

const CHILD_FIELDS = ["alpha_floor", "exit_floor", "fold_layer_parity_record"];
const PARITY_DELTA_FIELDS = ["delta_root_count", "delta_signed_degree", "local_even_jump", "parity_status"];
const LOCK_FIELDS = [
  "alpha_floor",
  "exit_floor",
  "fold_layer_parity_record",
  "higher_fold_separator_layer_certificate",
  "accepted_fold_layer_row",
  "row_consumed",
];

const SOURCE_DATA_NOT_PROOF_GRADE_BLOCKER = "child_field_source_ref_handle_not_proof_grade_ref";
const CANDIDATE_PARITY_DELTA_BLOCKER = "candidate_parity_delta_record_not_proof_grade_ref";
const PROOF_GRADE_PARITY_DELTA_BLOCKER = "proof_grade_fold_layer_parity_record_delta_fields_absent";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

function parseArgs(argv) {
  const args = {
    sourceData: DEFAULT_SOURCE_DATA,
    sourceRefManifest: DEFAULT_SOURCE_REF_MANIFEST,
    derivationAttempt: DEFAULT_DERIVATION_ATTEMPT,
    childDiagnostic: DEFAULT_CHILD_DIAGNOSTIC,
    rootTube: DEFAULT_ROOT_TUBE,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    separatorCertificate: DEFAULT_SEPARATOR_CERTIFICATE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source-data") {
      args.sourceData = argv[++index];
    } else if (arg === "--source-ref-manifest") {
      args.sourceRefManifest = argv[++index];
    } else if (arg === "--derivation-attempt") {
      args.derivationAttempt = argv[++index];
    } else if (arg === "--child-diagnostic") {
      args.childDiagnostic = argv[++index];
    } else if (arg === "--root-tube") {
      args.rootTube = argv[++index];
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
    } else if (arg === "--separator-certificate") {
      args.separatorCertificate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-alpha-exit-parity-child-field-source-data-proof-grade-ref-obligation-classifier.mjs [options]

Options:
  --source-data PATH             Child-field derivation source-data proof attempt. Defaults to ${DEFAULT_SOURCE_DATA}.
  --source-ref-manifest PATH     Child-field source-ref manifest. Defaults to ${DEFAULT_SOURCE_REF_MANIFEST}.
  --derivation-attempt PATH      Child-field derivation attempt. Defaults to ${DEFAULT_DERIVATION_ATTEMPT}.
  --child-diagnostic PATH        Child-field interval diagnostic. Defaults to ${DEFAULT_CHILD_DIAGNOSTIC}.
  --root-tube PATH               Root-tube interval certificate. Defaults to ${DEFAULT_ROOT_TUBE}.
  --proof-field-dependency PATH  Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --separator-certificate PATH   Separator certificate attempt. Defaults to ${DEFAULT_SEPARATOR_CERTIFICATE}.
  --out-dir PATH                 Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                       Pretty-print JSON artifact.
  --help                         Show this help.`);
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

function assertFailClosed(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if ("branch_chart_authorized" in source && source.branch_chart_authorized !== false) {
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

function falseFieldMap(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function presenceCounts(rows, fields, getter) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => getter(row, field));
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function bySeparator(array, name) {
  const map = new Map();
  for (const entry of array ?? []) {
    if (map.has(entry.separator_event)) {
      throw new Error(`Duplicate ${name} separator: ${entry.separator_event}`);
    }
    map.set(entry.separator_event, entry);
  }
  return map;
}

function requireSeparator(map, separator, name) {
  if (!map.has(separator)) {
    throw new Error(`Missing ${name} for ${separator}`);
  }
  return map.get(separator);
}

function validateInputs(inputs) {
  assertPacketId(inputs.sourceData, "sourceData");
  assertPacketId(inputs.sourceRefManifest, "sourceRefManifest");
  assertPacketId(inputs.derivationAttempt, "derivationAttempt");
  assertPacketId(inputs.childDiagnostic, "childDiagnostic");
  assertPacketId(inputs.rootTube, "rootTube");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertPacketId(inputs.separatorCertificate, "separatorCertificate");
  assertFailClosed(inputs.sourceData, "sourceData");
  assertFailClosed(inputs.sourceRefManifest, "sourceRefManifest");
  assertFailClosed(inputs.derivationAttempt, "derivationAttempt");
  assertFailClosed(inputs.childDiagnostic, "childDiagnostic");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.separatorCertificate, "separatorCertificate");

  const expectedStatuses = [
    [inputs.sourceData.status, SOURCE_DATA_STATUS, "sourceData"],
    [inputs.sourceRefManifest.status, SOURCE_REF_MANIFEST_STATUS, "sourceRefManifest"],
    [inputs.derivationAttempt.status, DERIVATION_ATTEMPT_STATUS, "derivationAttempt"],
    [inputs.childDiagnostic.status, CHILD_DIAGNOSTIC_STATUS, "childDiagnostic"],
    [inputs.proofFieldDependency.status, PROOF_FIELD_DEPENDENCY_STATUS, "proofFieldDependency"],
    [inputs.separatorCertificate.status, SEPARATOR_CERTIFICATE_STATUS, "separatorCertificate"],
  ];
  for (const [actual, expected, name] of expectedStatuses) {
    if (actual !== expected) {
      throw new Error(`${name} is not at the expected fail-closed status.`);
    }
  }
  if (inputs.rootTube.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube interval source is not certified as one root per separator.");
  }
  if (inputs.sourceData.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in source-data proof attempt.");
  }
  if (inputs.sourceData.summary?.rows_with_derivation_source_data_complete !== 112) {
    throw new Error("Expected complete derivation source data for all 112 rows.");
  }
  if (inputs.separatorCertificate.summary?.rows_with_higher_fold_separator_layer_certificate !== 0) {
    throw new Error("Separator certificate attempt already reports separator-layer certificates.");
  }
}

function childObligation(field, sourceData, dependency) {
  return {
    field,
    source_data_complete: sourceData.source_data_record_present === true,
    source_ref: sourceData.source_ref,
    candidate_source_anchor_present: dependency.candidate_source_anchor_present === true,
    proof_grade_ref_present: false,
    proof_grade_ref: null,
    proof_grade_ref_missing: true,
    proof_grade_derivation_present: dependency.proof_grade_present === true,
    proof_grade_derivation_blocker: dependency.first_missing_dependency,
    source_data_not_proof_grade_blocker: SOURCE_DATA_NOT_PROOF_GRADE_BLOCKER,
  };
}

function buildSeparatorProfiles(inputs) {
  const dependencyBySeparator = bySeparator(inputs.proofFieldDependency.separator_dependency_profiles, "proof dependency");
  return [...inputs.sourceData.separator_derivation_source_data_packets]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((packet) => {
      const dependency = requireSeparator(dependencyBySeparator, packet.separator_event, "proof dependency");
      const paritySourceData = packet.fold_layer_parity_record_derivation_source_data;
      return {
        separator_event: packet.separator_event,
        fold_interval: packet.fold_interval,
        atlas_candidate_id: packet.atlas_candidate_id,
        row_count: packet.row_count,
        row_ids: packet.row_ids,
        derivation_source_data_complete: packet.derivation_source_data_complete === true,
        child_proof_grade_ref_obligations: {
          alpha_floor: childObligation(
            "alpha_floor",
            packet.alpha_floor_derivation_source_data,
            dependency.proof_field_dependencies.alpha_floor,
          ),
          exit_floor: childObligation(
            "exit_floor",
            packet.exit_floor_derivation_source_data,
            dependency.proof_field_dependencies.exit_floor,
          ),
          fold_layer_parity_record: childObligation(
            "fold_layer_parity_record",
            paritySourceData,
            dependency.proof_field_dependencies.fold_layer_parity_record,
          ),
        },
        candidate_parity_delta_record_present: paritySourceData.candidate_delta_fields_present === true,
        proof_grade_parity_delta_field_obligations: Object.fromEntries(
          PARITY_DELTA_FIELDS.map((field) => [
            field,
            {
              candidate_field_present: paritySourceData.candidate_parity_delta_record[field] != null,
              proof_grade_field_present: false,
              first_missing_dependency: PROOF_GRADE_PARITY_DELTA_BLOCKER,
              candidate_not_proof_grade_blocker: CANDIDATE_PARITY_DELTA_BLOCKER,
            },
          ]),
        ),
        higher_fold_separator_layer_certificate_present: false,
        separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowProfiles(inputs, separatorProfiles) {
  const bySeparatorProfile = new Map(separatorProfiles.map((profile) => [profile.separator_event, profile]));
  return [...inputs.sourceData.row_derivation_source_data_packets]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const profile = bySeparatorProfile.get(row.separator_event);
      if (!profile) {
        throw new Error(`Missing separator obligation profile for ${row.row_id}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        derivation_source_data_complete: row.derivation_source_data_complete === true,
        child_proof_grade_ref_obligations: profile.child_proof_grade_ref_obligations,
        child_proof_grade_ref_obligations_complete: false,
        candidate_parity_delta_record_present: row.candidate_fold_layer_parity_record_delta_fields_present === true,
        proof_grade_parity_delta_field_obligations: profile.proof_grade_parity_delta_field_obligations,
        proof_grade_parity_delta_fields_complete: false,
        proof_grade_child_fields_present_after_obligation_classifier: falseFieldMap(CHILD_FIELDS),
        row_lock_fields_present_after_obligation_classifier: falseFieldMap(LOCK_FIELDS),
        source_data_not_proof_grade_blocker: SOURCE_DATA_NOT_PROOF_GRADE_BLOCKER,
        candidate_parity_delta_blocker: CANDIDATE_PARITY_DELTA_BLOCKER,
        atlas_ref_blocker: ATLAS_REF_BLOCKER,
        source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
        separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function fieldObligationCounts(rows, field) {
  const sourceDataComplete = countTrue(
    rows,
    (row) => row.child_proof_grade_ref_obligations[field].source_data_complete,
  );
  const proofGradePresent = countTrue(
    rows,
    (row) => row.child_proof_grade_ref_obligations[field].proof_grade_ref_present,
  );
  return {
    source_data_complete: sourceDataComplete,
    proof_grade_ref_present: proofGradePresent,
    proof_grade_ref_missing: rows.length - proofGradePresent,
  };
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs);
  const separatorProfiles = buildSeparatorProfiles(inputs);
  const rowProfiles = buildRowProfiles(inputs, separatorProfiles);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));

  const summary = {
    separator_profiles: separatorProfiles.length,
    fold_layer_rows: rowProfiles.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_derivation_source_data_complete: countTrue(rowProfiles, (row) => row.derivation_source_data_complete),
    child_proof_grade_ref_obligations_total: rowProfiles.length * CHILD_FIELDS.length,
    child_field_obligation_counts: Object.fromEntries(CHILD_FIELDS.map((field) => [field, fieldObligationCounts(rowProfiles, field)])),
    candidate_parity_delta_records: countTrue(
      separatorProfiles,
      (profile) => profile.candidate_parity_delta_record_present,
    ),
    row_candidate_parity_delta_associations: countTrue(
      rowProfiles,
      (row) => row.candidate_parity_delta_record_present,
    ),
    proof_grade_parity_delta_field_obligations_total: rowProfiles.length * PARITY_DELTA_FIELDS.length,
    proof_grade_parity_delta_field_obligation_counts: presenceCounts(
      rowProfiles,
      PARITY_DELTA_FIELDS,
      (row, field) => row.proof_grade_parity_delta_field_obligations[field].proof_grade_field_present,
    ),
    rows_with_complete_proof_grade_parity_delta_fields: countTrue(
      rowProfiles,
      (row) => row.proof_grade_parity_delta_fields_complete,
    ),
    proof_grade_child_field_presence_counts_after_obligation_classifier: presenceCounts(
      rowProfiles,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_child_fields_present_after_obligation_classifier[field],
    ),
    row_lock_field_presence_counts_after_obligation_classifier: presenceCounts(
      rowProfiles,
      LOCK_FIELDS,
      (row, field) => row.row_lock_fields_present_after_obligation_classifier[field],
    ),
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_source_data_not_proof_grade_blocker: SOURCE_DATA_NOT_PROOF_GRADE_BLOCKER,
    candidate_parity_delta_blocker: CANDIDATE_PARITY_DELTA_BLOCKER,
    proof_grade_parity_delta_blocker: PROOF_GRADE_PARITY_DELTA_BLOCKER,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };

  return {
    schema: "breather-higher-fold-layer-alpha-exit-parity-child-field-source-data-proof-grade-ref-obligation-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only obligation classifier for proof-grade child-field refs below complete derivation source data; counts missing proof_grade_ref and proof-grade parity delta obligations while preserving all row-consumption and ledger authorization locks",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt: artifactRecord(
        paths.sourceData,
      ),
      higher_fold_layer_alpha_exit_parity_child_field_source_ref_manifest: artifactRecord(paths.sourceRefManifest),
      higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt: artifactRecord(paths.derivationAttempt),
      higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic: artifactRecord(paths.childDiagnostic),
      fresh_v10_higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTube),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      higher_fold_layer_separator_certificate_attempt: artifactRecord(paths.separatorCertificate),
    },
    classifier_rule:
      "Complete derivation source data creates an obligation to supply proof_grade_ref fields; it does not satisfy that obligation. Candidate parity delta records create obligations to supply proof-grade parity delta fields; they do not satisfy those obligations. This classifier only counts obligations and keeps all certificate, row, preledger, live-ledger, and branch-chart locks closed.",
    separator_obligation_profiles: separatorProfiles,
    row_obligation_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "All 112 rows have complete derivation source data, but the packet still has 336 missing child proof_grade_ref obligations and 448 missing proof-grade parity delta field obligations.",
      mechanical_child_field_targets: [
        "supply proof-grade alpha_floor refs for the 112 complete alpha_floor source-data records",
        "supply proof-grade exit_floor refs for the 112 complete exit_floor source-data records",
        "supply proof-grade fold_layer_parity_record refs and proof-grade parity delta fields for the 112 complete parity source-data records",
      ],
      parallel_blocker:
        "accepted atlas-ref, impulse/direct-quadrature, parent-complement consumption, and separator-certificate fields remain separately absent",
      fail_closed_stop_conditions: [
        "Do not count derivation-source-data records as proof_grade_ref fields.",
        "Do not count candidate parity delta records as proof-grade fold_layer_parity_record fields.",
        "Do not set higher_fold_separator_layer_certificate, accepted_fold_layer_row, row_consumed, preledger_pass, updates_live_ledger, or branch_chart_authorized from this classifier.",
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
      "Priority-only. This classifier reduces the child-field blocker to counted proof_grade_ref and proof-grade parity-delta obligations while keeping every ledger authorization lock closed.",
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
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function childObligationTable(counts) {
  return Object.entries(counts)
    .map(
      ([name, count]) =>
        `| \`${name}\` | ${count.source_data_complete} | ${count.proof_grade_ref_present} | ${count.proof_grade_ref_missing} |`,
    )
    .join("\n");
}

function separatorTable(profiles) {
  return profiles
    .map(
      (profile) =>
        `| \`${profile.separator_event}\` | \`${profile.fold_interval}\` | ${profile.row_count} | ${profile.derivation_source_data_complete} | ${profile.candidate_parity_delta_record_present} | ${profile.higher_fold_separator_layer_certificate_present} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.derivation_source_data_complete} | ${row.candidate_parity_delta_record_present} | ${row.child_proof_grade_ref_obligations_complete} | ${row.proof_grade_parity_delta_fields_complete} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, classifier) {
  const report = `# Higher-Fold Layer Alpha/Exit/Parity Child-Field Source-Data Proof-Grade Ref Obligation Classifier

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier imports the complete derivation-source-data packet and counts
the remaining proof-grade obligations without promoting any field. It records
${classifier.summary.rows_with_derivation_source_data_complete} / ${classifier.summary.fold_layer_rows}
rows with complete derivation source data, then counts
${classifier.summary.child_proof_grade_ref_obligations_total} missing
child-field proof_grade_ref obligations and
${classifier.summary.proof_grade_parity_delta_field_obligations_total} missing
proof-grade parity delta field obligations.

The source-side parity packet remains present:
${classifier.summary.candidate_parity_delta_records} / ${classifier.summary.separator_profiles}
separator candidate parity delta records and
${classifier.summary.row_candidate_parity_delta_associations} / ${classifier.summary.fold_layer_rows}
row-level candidate parity delta associations. The proof-grade parity delta
rows remain
${classifier.summary.rows_with_complete_proof_grade_parity_delta_fields} / ${classifier.summary.fold_layer_rows}.

The sharpened blockers are:

- source data not proof grade:
  \`${classifier.summary.first_source_data_not_proof_grade_blocker}\`;
- candidate parity delta not proof grade:
  \`${classifier.summary.candidate_parity_delta_blocker}\`;
- proof-grade parity delta fields:
  \`${classifier.summary.proof_grade_parity_delta_blocker}\`;
- accepted atlas ref:
  \`${classifier.summary.atlas_ref_blocker}\`;
- impulse/direct-quadrature source packet:
  \`${classifier.summary.source_packet_acceptance_blocker}\`;
- parent-complement consumption ref:
  \`${classifier.summary.parent_complement_consumption_ref_blocker}\`;
- separator certificate:
  \`${classifier.summary.first_separator_certificate_blocker}\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Child Proof-Grade Ref Obligations

| Field | Source data complete rows | Proof-grade refs present | Proof-grade refs missing |
| --- | ---: | ---: | ---: |
${childObligationTable(classifier.summary.child_field_obligation_counts)}

## Proof-Grade Parity Delta Obligations

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.proof_grade_parity_delta_field_obligation_counts)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.row_lock_field_presence_counts_after_obligation_classifier)}

## Separator Obligation Profiles

| Separator | Fold interval | Rows | Source data complete | Candidate parity delta | Separator certificate |
| --- | --- | ---: | --- | --- | --- |
${separatorTable(classifier.separator_obligation_profiles)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Row Obligation Profiles

| Row | Separator | Fold interval | Source data complete | Candidate parity delta | Child proof refs complete | Proof-grade parity delta complete | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(classifier.row_obligation_profiles)}

## Certificate-Side Handoff

Sharpened blocker:
${classifier.next_certificate_handoff.sharpened_blocker}

Mechanical child-field targets:

${classifier.next_certificate_handoff.mechanical_child_field_targets.map((item) => `- ${item}.`).join("\n")}

Parallel blocker: ${classifier.next_certificate_handoff.parallel_blocker}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is priority-only. It proves no \`alpha_floor\`, \`exit_floor\`,
\`fold_layer_parity_record\`, \`higher_fold_separator_layer_certificate\`,
accepted fold-layer row, row consumption, live-ledger update, or branch-chart
authorization.
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
    sourceData: args.sourceData,
    sourceRefManifest: args.sourceRefManifest,
    derivationAttempt: args.derivationAttempt,
    childDiagnostic: args.childDiagnostic,
    rootTube: args.rootTube,
    proofFieldDependency: args.proofFieldDependency,
    separatorCertificate: args.separatorCertificate,
  };
  const inputs = {
    sourceData: readJson(paths.sourceData),
    sourceRefManifest: readJson(paths.sourceRefManifest),
    derivationAttempt: readJson(paths.derivationAttempt),
    childDiagnostic: readJson(paths.childDiagnostic),
    rootTube: readJson(paths.rootTube),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    separatorCertificate: readJson(paths.separatorCertificate),
  };
  const classifier = buildClassifier(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, classifier, args.pretty);
  writeReport(outReport, classifier);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

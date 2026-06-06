#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_OBLIGATION_CLASSIFIER = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_source_data_proof_grade_ref_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SOURCE_DATA = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_DERIVATION_ATTEMPT = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_separator_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_alpha_exit_parity_child_field_proof_grade_derivation_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_alpha_exit_parity_child_field_proof_grade_derivation_application_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const OBLIGATION_CLASSIFIER_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_data_proof_grade_ref_obligation_classifier_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";
const SOURCE_DATA_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";
const DERIVATION_ATTEMPT_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt_fail_closed_candidate_child_sources_present_derivation_refs_and_delta_fields_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const SEPARATOR_CERTIFICATE_STATUS =
  "higher_fold_layer_separator_certificate_attempt_fail_closed_candidate_source_complete_diagnostic_impulse_constants_rejected_no_accepted_atlas_ref_no_row_consumption";
const STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_proof_grade_derivation_application_attempt_fail_closed_source_data_complete_proof_grade_derivations_absent_no_row_consumption";

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
    obligationClassifier: DEFAULT_OBLIGATION_CLASSIFIER,
    sourceData: DEFAULT_SOURCE_DATA,
    derivationAttempt: DEFAULT_DERIVATION_ATTEMPT,
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
    } else if (arg === "--obligation-classifier") {
      args.obligationClassifier = argv[++index];
    } else if (arg === "--source-data") {
      args.sourceData = argv[++index];
    } else if (arg === "--derivation-attempt") {
      args.derivationAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-alpha-exit-parity-child-field-proof-grade-derivation-application-attempt.mjs [options]

Options:
  --obligation-classifier PATH  Source-data proof-grade ref obligation classifier. Defaults to ${DEFAULT_OBLIGATION_CLASSIFIER}.
  --source-data PATH            Child-field derivation source-data proof attempt. Defaults to ${DEFAULT_SOURCE_DATA}.
  --derivation-attempt PATH     Child-field derivation attempt. Defaults to ${DEFAULT_DERIVATION_ATTEMPT}.
  --proof-field-dependency PATH Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --separator-certificate PATH  Separator certificate attempt. Defaults to ${DEFAULT_SEPARATOR_CERTIFICATE}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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
  assertPacketId(inputs.obligationClassifier, "obligationClassifier");
  assertPacketId(inputs.sourceData, "sourceData");
  assertPacketId(inputs.derivationAttempt, "derivationAttempt");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertPacketId(inputs.separatorCertificate, "separatorCertificate");
  assertFailClosed(inputs.obligationClassifier, "obligationClassifier");
  assertFailClosed(inputs.sourceData, "sourceData");
  assertFailClosed(inputs.derivationAttempt, "derivationAttempt");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.separatorCertificate, "separatorCertificate");

  const expectedStatuses = [
    [inputs.obligationClassifier.status, OBLIGATION_CLASSIFIER_STATUS, "obligationClassifier"],
    [inputs.sourceData.status, SOURCE_DATA_STATUS, "sourceData"],
    [inputs.derivationAttempt.status, DERIVATION_ATTEMPT_STATUS, "derivationAttempt"],
    [inputs.proofFieldDependency.status, PROOF_FIELD_DEPENDENCY_STATUS, "proofFieldDependency"],
    [inputs.separatorCertificate.status, SEPARATOR_CERTIFICATE_STATUS, "separatorCertificate"],
  ];
  for (const [actual, expected, name] of expectedStatuses) {
    if (actual !== expected) {
      throw new Error(`${name} is not at the expected fail-closed status.`);
    }
  }
  if (inputs.sourceData.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in source-data proof attempt.");
  }
  if (inputs.obligationClassifier.summary?.rows_with_derivation_source_data_complete !== 112) {
    throw new Error("Expected complete derivation source data for all 112 obligation rows.");
  }
  if (inputs.obligationClassifier.summary?.child_proof_grade_ref_obligations_total !== 336) {
    throw new Error("Expected 336 child proof_grade_ref obligations before application.");
  }
  if (inputs.obligationClassifier.summary?.rows_with_complete_proof_grade_parity_delta_fields !== 0) {
    throw new Error("Obligation classifier already reports proof-grade parity delta rows.");
  }
  if (inputs.separatorCertificate.summary?.rows_with_higher_fold_separator_layer_certificate !== 0) {
    throw new Error("Separator certificate attempt already reports separator-layer certificates.");
  }
}

function derivationApplication(field, sourceDataRecord, dependency) {
  const proofGradeRef = dependency.proof_grade_ref ?? null;
  const derivationPresent = dependency.proof_grade_present === true && proofGradeRef != null;
  return {
    field,
    source_data_complete: sourceDataRecord.source_data_record_present === true,
    source_ref: sourceDataRecord.source_ref,
    candidate_source_anchor_present: dependency.candidate_source_anchor_present === true,
    proof_grade_derivation_present: derivationPresent,
    proof_grade_derivation_ref: proofGradeRef,
    application_authorized_by_existing_derivation_ref: derivationPresent,
    constructed_proof_grade_ref_present: derivationPresent,
    constructed_proof_grade_ref: derivationPresent ? proofGradeRef : null,
    accepted: derivationPresent,
    first_missing_dependency: derivationPresent ? null : dependency.first_missing_dependency,
    derivation_application_blocker: derivationPresent ? null : dependency.first_missing_dependency,
    source_data_not_proof_grade_blocker: derivationPresent ? null : SOURCE_DATA_NOT_PROOF_GRADE_BLOCKER,
  };
}

function parityDeltaApplications(paritySourceData, parityApplication) {
  return Object.fromEntries(
    PARITY_DELTA_FIELDS.map((field) => {
      const proofGradeFieldPresent =
        parityApplication.constructed_proof_grade_ref_present === true &&
        paritySourceData.candidate_parity_delta_record?.proof_grade_delta_fields_present === true &&
        paritySourceData.candidate_parity_delta_record?.[field] != null;
      return [
        field,
        {
          candidate_field_present: paritySourceData.candidate_parity_delta_record?.[field] != null,
          proof_grade_field_present: proofGradeFieldPresent,
          constructed_proof_grade_field: proofGradeFieldPresent
            ? paritySourceData.candidate_parity_delta_record[field]
            : null,
          first_missing_dependency: proofGradeFieldPresent ? null : PROOF_GRADE_PARITY_DELTA_BLOCKER,
          candidate_not_proof_grade_blocker: proofGradeFieldPresent ? null : CANDIDATE_PARITY_DELTA_BLOCKER,
        },
      ];
    }),
  );
}

function buildSeparatorAttempts(inputs) {
  const dependencyBySeparator = bySeparator(inputs.proofFieldDependency.separator_dependency_profiles, "proof dependency");
  return [...inputs.sourceData.separator_derivation_source_data_packets]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((packet) => {
      const dependency = requireSeparator(dependencyBySeparator, packet.separator_event, "proof dependency");
      const paritySourceData = packet.fold_layer_parity_record_derivation_source_data;
      const childApplications = {
        alpha_floor: derivationApplication(
          "alpha_floor",
          packet.alpha_floor_derivation_source_data,
          dependency.proof_field_dependencies.alpha_floor,
        ),
        exit_floor: derivationApplication(
          "exit_floor",
          packet.exit_floor_derivation_source_data,
          dependency.proof_field_dependencies.exit_floor,
        ),
        fold_layer_parity_record: derivationApplication(
          "fold_layer_parity_record",
          paritySourceData,
          dependency.proof_field_dependencies.fold_layer_parity_record,
        ),
      };
      const parityDeltaFieldApplications = parityDeltaApplications(
        paritySourceData,
        childApplications.fold_layer_parity_record,
      );
      return {
        separator_event: packet.separator_event,
        fold_interval: packet.fold_interval,
        atlas_candidate_id: packet.atlas_candidate_id,
        row_count: packet.row_count,
        row_ids: packet.row_ids,
        derivation_source_data_complete: packet.derivation_source_data_complete === true,
        child_proof_grade_derivation_application_attempts: childApplications,
        child_proof_grade_refs_constructed: Object.fromEntries(
          CHILD_FIELDS.map((field) => [field, childApplications[field].constructed_proof_grade_ref_present]),
        ),
        candidate_parity_delta_record_present: paritySourceData.candidate_delta_fields_present === true,
        proof_grade_parity_delta_field_applications: parityDeltaFieldApplications,
        proof_grade_parity_delta_fields_complete: PARITY_DELTA_FIELDS.every(
          (field) => parityDeltaFieldApplications[field].proof_grade_field_present === true,
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

function buildRowAttempts(inputs, separatorAttempts) {
  const bySeparatorAttempt = new Map(separatorAttempts.map((attempt) => [attempt.separator_event, attempt]));
  return [...inputs.sourceData.row_derivation_source_data_packets]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const separatorAttempt = bySeparatorAttempt.get(row.separator_event);
      if (!separatorAttempt) {
        throw new Error(`Missing separator derivation application attempt for ${row.row_id}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        derivation_source_data_complete: row.derivation_source_data_complete === true,
        child_proof_grade_derivation_application_attempts:
          separatorAttempt.child_proof_grade_derivation_application_attempts,
        proof_grade_child_fields_present_after_derivation_application_attempt:
          separatorAttempt.child_proof_grade_refs_constructed,
        child_proof_grade_refs_complete_after_derivation_application_attempt: CHILD_FIELDS.every(
          (field) => separatorAttempt.child_proof_grade_refs_constructed[field] === true,
        ),
        candidate_parity_delta_record_present: row.candidate_fold_layer_parity_record_delta_fields_present === true,
        proof_grade_parity_delta_field_applications:
          separatorAttempt.proof_grade_parity_delta_field_applications,
        proof_grade_parity_delta_fields_complete:
          separatorAttempt.proof_grade_parity_delta_fields_complete,
        row_lock_fields_present_after_derivation_application_attempt: {
          ...separatorAttempt.child_proof_grade_refs_constructed,
          higher_fold_separator_layer_certificate: false,
          accepted_fold_layer_row: false,
          row_consumed: false,
        },
        source_data_not_proof_grade_blocker: SOURCE_DATA_NOT_PROOF_GRADE_BLOCKER,
        candidate_parity_delta_blocker: CANDIDATE_PARITY_DELTA_BLOCKER,
        proof_grade_parity_delta_blocker: PROOF_GRADE_PARITY_DELTA_BLOCKER,
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

function fieldApplicationCounts(rows, field) {
  const sourceDataComplete = countTrue(
    rows,
    (row) => row.child_proof_grade_derivation_application_attempts[field].source_data_complete,
  );
  const derivationPresent = countTrue(
    rows,
    (row) => row.child_proof_grade_derivation_application_attempts[field].proof_grade_derivation_present,
  );
  const refsConstructed = countTrue(
    rows,
    (row) => row.child_proof_grade_derivation_application_attempts[field].constructed_proof_grade_ref_present,
  );
  return {
    source_data_complete: sourceDataComplete,
    proof_grade_derivation_present: derivationPresent,
    proof_grade_ref_constructed: refsConstructed,
    application_blocked: rows.length - refsConstructed,
  };
}

function buildApplicationAttempt(paths, inputs) {
  validateInputs(inputs);
  const separatorAttempts = buildSeparatorAttempts(inputs);
  const rowAttempts = buildRowAttempts(inputs, separatorAttempts);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowAttempts, (row) => row.separator_event));

  const summary = {
    separator_proof_grade_derivation_application_attempts: separatorAttempts.length,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_derivation_source_data_complete: countTrue(rowAttempts, (row) => row.derivation_source_data_complete),
    child_field_derivation_application_counts: Object.fromEntries(
      CHILD_FIELDS.map((field) => [field, fieldApplicationCounts(rowAttempts, field)]),
    ),
    rows_with_alpha_floor_proof_grade_derivation: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_derivation_application_attempts.alpha_floor.proof_grade_derivation_present,
    ),
    rows_with_exit_floor_proof_grade_derivation: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_derivation_application_attempts.exit_floor.proof_grade_derivation_present,
    ),
    rows_with_fold_layer_parity_record_proof_grade_derivation: countTrue(
      rowAttempts,
      (row) =>
        row.child_proof_grade_derivation_application_attempts.fold_layer_parity_record
          .proof_grade_derivation_present,
    ),
    rows_with_alpha_floor_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.proof_grade_child_fields_present_after_derivation_application_attempt.alpha_floor,
    ),
    rows_with_exit_floor_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.proof_grade_child_fields_present_after_derivation_application_attempt.exit_floor,
    ),
    rows_with_fold_layer_parity_record_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.proof_grade_child_fields_present_after_derivation_application_attempt.fold_layer_parity_record,
    ),
    rows_with_all_child_proof_grade_derivation_refs_constructed: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_refs_complete_after_derivation_application_attempt,
    ),
    candidate_parity_delta_records: countTrue(
      separatorAttempts,
      (attempt) => attempt.candidate_parity_delta_record_present,
    ),
    row_candidate_parity_delta_associations: countTrue(
      rowAttempts,
      (row) => row.candidate_parity_delta_record_present,
    ),
    proof_grade_parity_delta_field_presence_counts: presenceCounts(
      rowAttempts,
      PARITY_DELTA_FIELDS,
      (row, field) => row.proof_grade_parity_delta_field_applications[field].proof_grade_field_present,
    ),
    rows_with_complete_proof_grade_fold_layer_parity_record_delta_fields: countTrue(
      rowAttempts,
      (row) => row.proof_grade_parity_delta_fields_complete,
    ),
    proof_grade_child_field_presence_counts_after_derivation_application_attempt: presenceCounts(
      rowAttempts,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_child_fields_present_after_derivation_application_attempt[field],
    ),
    row_lock_field_presence_counts_after_derivation_application_attempt: presenceCounts(
      rowAttempts,
      LOCK_FIELDS,
      (row, field) => row.row_lock_fields_present_after_derivation_application_attempt[field],
    ),
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_derivation_application_blocker: "proof_grade_alpha_floor_derivation_absent",
    source_data_not_proof_grade_blocker: SOURCE_DATA_NOT_PROOF_GRADE_BLOCKER,
    candidate_parity_delta_blocker: CANDIDATE_PARITY_DELTA_BLOCKER,
    proof_grade_parity_delta_blocker: PROOF_GRADE_PARITY_DELTA_BLOCKER,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };

  return {
    schema: "breather-higher-fold-layer-alpha-exit-parity-child-field-proof-grade-derivation-application-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only proof attempt at the child-field proof-grade derivation application boundary; applies no proof rule and constructs no child proof_grade_ref unless an imported proof-field dependency already supplies a proof-grade derivation ref",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_alpha_exit_parity_child_field_source_data_proof_grade_ref_obligation_classifier:
        artifactRecord(paths.obligationClassifier),
      higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt:
        artifactRecord(paths.sourceData),
      higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt: artifactRecord(paths.derivationAttempt),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      higher_fold_layer_separator_certificate_attempt: artifactRecord(paths.separatorCertificate),
    },
    proof_attempt_rule:
      "A complete child-field source-data record is application-ready only when the matching proof-field dependency already has proof_grade_present=true and a non-null proof_grade_ref. Candidate source refs and candidate fold_layer_parity_record delta fields are never promoted by this attempt. This attempt does not create or accept a proof rule, primitive acceptance rule, separator certificate, row consumption, preledger pass, live-ledger update, or branch-chart authorization.",
    separator_derivation_application_attempts: separatorAttempts,
    row_derivation_application_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The packet has complete derivation source data for all 112 rows, but direct proof-grade derivation application constructs 0 alpha_floor refs, 0 exit_floor refs, 0 fold_layer_parity_record refs, and 0 proof-grade parity-delta rows because no imported child proof-grade derivation refs exist.",
      remains_blocked: [
        "proof-grade alpha_floor derivation refs are absent",
        "proof-grade exit_floor derivation refs are absent",
        "proof-grade fold_layer_parity_record derivation refs are absent",
        "proof-grade fold_layer_parity_record delta fields are absent",
        "accepted higher_fold_layer_atlas_ref remains absent",
        "same-packet impulse/direct-quadrature acceptance remains absent",
        "parent_complement_consumption_ref remains absent",
        "higher_fold_separator_layer_certificate remains absent",
      ],
      mechanical_continuation:
        "Continue mechanically only by producing proof-grade child-field derivation refs or a proof-grade parity-record packet from existing interval sources. Any route that changes candidate source refs into proof_grade_ref fields without an existing derivation ref is a proof-rule or primitive-acceptance decision and remains out of scope for this artifact.",
      fail_closed_stop_conditions: [
        "Do not treat source_ref handles as proof_grade_ref fields.",
        "Do not treat candidate parity delta records as proof-grade parity delta fields.",
        "Do not set higher_fold_separator_layer_certificate, accepted_fold_layer_row, row_consumed, preledger_pass, updates_live_ledger, or branch_chart_authorized from this attempt.",
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
      "Priority-only. This attempt closes the direct application boundary against the current packet by proving that no child proof_grade_ref or proof-grade parity-delta field can be constructed from the imported proof-field dependencies.",
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

function childApplicationTable(counts) {
  return Object.entries(counts)
    .map(
      ([name, count]) =>
        `| \`${name}\` | ${count.source_data_complete} | ${count.proof_grade_derivation_present} | ${count.proof_grade_ref_constructed} | ${count.application_blocked} |`,
    )
    .join("\n");
}

function separatorTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.separator_event}\` | \`${attempt.fold_interval}\` | ${attempt.row_count} | ${attempt.derivation_source_data_complete} | ${attempt.child_proof_grade_refs_constructed.alpha_floor} | ${attempt.child_proof_grade_refs_constructed.exit_floor} | ${attempt.child_proof_grade_refs_constructed.fold_layer_parity_record} | ${attempt.proof_grade_parity_delta_fields_complete} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.derivation_source_data_complete} | ${row.child_proof_grade_refs_complete_after_derivation_application_attempt} | ${row.proof_grade_parity_delta_fields_complete} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Alpha/Exit/Parity Child-Field Proof-Grade Derivation Application Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This proof attempt imports the source-data obligation classifier and applies a
strict proof-grade derivation-ref test: a child field can receive a
\`proof_grade_ref\` only when the imported proof-field dependency already
contains \`proof_grade_present: true\` and a non-null \`proof_grade_ref\`.

The attempt covers
${attempt.summary.separator_proof_grade_derivation_application_attempts}
separator profiles and ${attempt.summary.fold_layer_rows} row associations.
All ${attempt.summary.rows_with_derivation_source_data_complete} row
associations have complete derivation source data, but the application
constructs:

- ${attempt.summary.rows_with_alpha_floor_proof_grade_ref_constructed}
  \`alpha_floor\` proof-grade refs;
- ${attempt.summary.rows_with_exit_floor_proof_grade_ref_constructed}
  \`exit_floor\` proof-grade refs;
- ${attempt.summary.rows_with_fold_layer_parity_record_proof_grade_ref_constructed}
  \`fold_layer_parity_record\` proof-grade refs;
- ${attempt.summary.rows_with_complete_proof_grade_fold_layer_parity_record_delta_fields}
  proof-grade \`fold_layer_parity_record\` parity-delta rows.

The direct application blocker is therefore not missing source data. It is the
absence of imported proof-grade child derivation refs and proof-grade parity
delta fields.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Child Proof-Grade Derivation Application Counts

| Field | Source data complete rows | Proof-grade derivations present | Proof-grade refs constructed | Application blocked |
| --- | ---: | ---: | ---: | ---: |
${childApplicationTable(attempt.summary.child_field_derivation_application_counts)}

## Proof-Grade Parity Delta Fields

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_parity_delta_field_presence_counts)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_lock_field_presence_counts_after_derivation_application_attempt)}

## Separator Derivation Application Attempts

| Separator | Fold interval | Rows | Source data complete | Alpha ref constructed | Exit ref constructed | Parity ref constructed | Proof-grade parity delta complete |
| --- | --- | ---: | --- | --- | --- | --- | --- |
${separatorTable(attempt.separator_derivation_application_attempts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Derivation Application Attempts

| Row | Separator | Fold interval | Source data complete | Child proof refs complete | Proof-grade parity delta complete | Row consumed |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_derivation_application_attempts)}

## Certificate-Side Handoff

Sharpened blocker:
${attempt.next_certificate_handoff.sharpened_blocker}

Remaining blockers:

${attempt.next_certificate_handoff.remains_blocked.map((item) => `- ${item}.`).join("\n")}

Mechanical continuation:
${attempt.next_certificate_handoff.mechanical_continuation}

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

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
    obligationClassifier: args.obligationClassifier,
    sourceData: args.sourceData,
    derivationAttempt: args.derivationAttempt,
    proofFieldDependency: args.proofFieldDependency,
    separatorCertificate: args.separatorCertificate,
  };
  const inputs = {
    obligationClassifier: readJson(paths.obligationClassifier),
    sourceData: readJson(paths.sourceData),
    derivationAttempt: readJson(paths.derivationAttempt),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    separatorCertificate: readJson(paths.separatorCertificate),
  };
  const attempt = buildApplicationAttempt(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeReport(outReport, attempt);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

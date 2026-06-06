#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DERIVATION_APPLICATION = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_proof_grade_derivation_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SOURCE_DATA = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CHILD_DIAGNOSTIC = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_separator_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const DERIVATION_APPLICATION_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_proof_grade_derivation_application_attempt_fail_closed_source_data_complete_proof_grade_derivations_absent_no_row_consumption";
const SOURCE_DATA_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";
const CHILD_DIAGNOSTIC_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic_fail_closed_candidate_child_sources_present_proof_grade_child_derivations_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const SEPARATOR_CERTIFICATE_STATUS =
  "higher_fold_layer_separator_certificate_attempt_fail_closed_candidate_source_complete_diagnostic_impulse_constants_rejected_no_accepted_atlas_ref_no_row_consumption";
const STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt_fail_closed_source_certificates_present_derivation_bridges_absent_no_row_consumption";

const CHILD_FIELDS = ["alpha_floor", "exit_floor", "fold_layer_parity_record"];
const LOCK_FIELDS = [
  "alpha_floor",
  "exit_floor",
  "fold_layer_parity_record",
  "higher_fold_separator_layer_certificate",
  "accepted_fold_layer_row",
  "row_consumed",
];
const PARITY_DELTA_FIELDS = ["delta_root_count", "delta_signed_degree", "local_even_jump", "parity_status"];

const ALPHA_BRIDGE_BLOCKER = "alpha_floor_source_certificate_to_child_field_derivation_bridge_absent";
const EXIT_SOURCE_CERTIFICATE_BLOCKER = "exit_floor_proof_grade_source_certificate_absent";
const EXIT_BRIDGE_BLOCKER = "exit_floor_source_certificate_to_child_field_derivation_bridge_absent";
const PARITY_BRIDGE_BLOCKER = "fold_layer_parity_record_source_certificate_to_child_field_derivation_bridge_absent";
const PROOF_GRADE_PARITY_DELTA_BLOCKER = "proof_grade_fold_layer_parity_record_delta_fields_absent";
const CANDIDATE_PARITY_DELTA_BLOCKER = "candidate_parity_delta_record_not_proof_grade_ref";
const SOURCE_REF_NOT_PROOF_GRADE_BLOCKER = "child_field_source_ref_handle_not_proof_grade_ref";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

function parseArgs(argv) {
  const args = {
    derivationApplication: DEFAULT_DERIVATION_APPLICATION,
    sourceData: DEFAULT_SOURCE_DATA,
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
    } else if (arg === "--derivation-application") {
      args.derivationApplication = argv[++index];
    } else if (arg === "--source-data") {
      args.sourceData = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-alpha-exit-parity-child-field-source-certificate-to-proof-grade-derivation-bridge-attempt.mjs [options]

Options:
  --derivation-application PATH  Child-field proof-grade derivation application attempt. Defaults to ${DEFAULT_DERIVATION_APPLICATION}.
  --source-data PATH             Child-field derivation source-data proof attempt. Defaults to ${DEFAULT_SOURCE_DATA}.
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

function presenceCounts(rows, fields, getter) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => getter(row, field));
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function falseFieldMap(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function bySeparator(array, name, key = "separator_event") {
  const map = new Map();
  for (const entry of array ?? []) {
    const separator = entry[key];
    if (map.has(separator)) {
      throw new Error(`Duplicate ${name} separator: ${separator}`);
    }
    map.set(separator, entry);
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
  assertPacketId(inputs.derivationApplication, "derivationApplication");
  assertPacketId(inputs.sourceData, "sourceData");
  assertPacketId(inputs.childDiagnostic, "childDiagnostic");
  assertPacketId(inputs.rootTube, "rootTube");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertPacketId(inputs.separatorCertificate, "separatorCertificate");
  assertFailClosed(inputs.derivationApplication, "derivationApplication");
  assertFailClosed(inputs.sourceData, "sourceData");
  assertFailClosed(inputs.childDiagnostic, "childDiagnostic");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.separatorCertificate, "separatorCertificate");

  const expectedStatuses = [
    [inputs.derivationApplication.status, DERIVATION_APPLICATION_STATUS, "derivationApplication"],
    [inputs.sourceData.status, SOURCE_DATA_STATUS, "sourceData"],
    [inputs.childDiagnostic.status, CHILD_DIAGNOSTIC_STATUS, "childDiagnostic"],
    [inputs.proofFieldDependency.status, PROOF_FIELD_DEPENDENCY_STATUS, "proofFieldDependency"],
    [inputs.separatorCertificate.status, SEPARATOR_CERTIFICATE_STATUS, "separatorCertificate"],
  ];
  for (const [actual, expected, name] of expectedStatuses) {
    if (actual !== expected) {
      throw new Error(`${name} is not at the expected fail-closed status.`);
    }
  }
  if (inputs.rootTube.status !== "outward_rational_interval_12_root_certificate_passed") {
    throw new Error("Root-tube source is not at the expected passed topology-certificate status.");
  }
  if (inputs.rootTube.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube source does not certify one root for all separator tubes.");
  }
  if (inputs.rootTube.summary?.all_complements_certified_no_extra_root !== true) {
    throw new Error("Root-tube source does not certify no extra root in complements.");
  }
  if (inputs.derivationApplication.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in derivation application attempt.");
  }
  if (inputs.derivationApplication.summary?.rows_with_all_child_proof_grade_derivation_refs_constructed !== 0) {
    throw new Error("Derivation application attempt already constructs child proof_grade_ref fields.");
  }
}

function buildSeparatorAttempts(inputs) {
  const sourceBySeparator = bySeparator(
    inputs.sourceData.separator_derivation_source_data_packets,
    "source data",
  );
  const diagnosticBySeparator = bySeparator(
    inputs.childDiagnostic.separator_child_witness_profiles,
    "child diagnostic",
  );
  const dependencyBySeparator = bySeparator(
    inputs.proofFieldDependency.separator_dependency_profiles,
    "proof-field dependency",
  );
  const applicationBySeparator = bySeparator(
    inputs.derivationApplication.separator_derivation_application_attempts,
    "derivation application",
  );
  const rootTubeBySeparator = bySeparator(inputs.rootTube.root_tubes, "root tube", "contact_id");

  return [...inputs.sourceData.separator_derivation_source_data_packets]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((packet) => {
      const separator = packet.separator_event;
      const diagnostic = requireSeparator(diagnosticBySeparator, separator, "child diagnostic");
      const dependency = requireSeparator(dependencyBySeparator, separator, "proof-field dependency");
      const application = requireSeparator(applicationBySeparator, separator, "derivation application");
      const rootTube = requireSeparator(rootTubeBySeparator, separator, "root tube");
      const sourceData = requireSeparator(sourceBySeparator, separator, "source data");
      const alphaSourceCertificatePresent =
        rootTube.interval_certified_one_root === true &&
        rootTube.derivative_floor_q != null &&
        inputs.rootTube.proof_grade_ready_for_preledger_rerun === true;
      const exitCandidateSourcePresent =
        diagnostic.candidate_exit_floor_source?.positive_source_width === true &&
        sourceData.exit_floor_derivation_source_data?.source_data_record_present === true;
      const paritySourceCertificatePresent =
        rootTube.interval_certified_one_root === true &&
        inputs.rootTube.summary?.all_complements_certified_no_extra_root === true &&
        rootTube.endpoint_sign_change_interval === true &&
        rootTube.root_count_bound_q?.[0] === 1 &&
        rootTube.root_count_bound_q?.[1] === 1 &&
        inputs.rootTube.proof_grade_ready_for_preledger_rerun === true;
      const candidateParityDeltaPresent =
        sourceData.fold_layer_parity_record_derivation_source_data?.candidate_delta_fields_present === true;

      return {
        separator_event: separator,
        fold_interval: packet.fold_interval,
        atlas_candidate_id: packet.atlas_candidate_id,
        row_count: packet.row_count,
        row_ids: packet.row_ids,
        derivation_source_data_complete: packet.derivation_source_data_complete === true,
        source_certificate_classes: {
          alpha_floor: {
            source_ref: sourceData.alpha_floor_derivation_source_data.source_ref,
            source_artifact: "fresh_v10_higher_fold_root_tube_interval_certificate",
            source_certificate_present: alphaSourceCertificatePresent,
            source_certificate_class: alphaSourceCertificatePresent
              ? "proof_grade_ready_root_tube_derivative_floor_source"
              : "root_tube_derivative_floor_source_absent",
            candidate_source_anchor_present:
              dependency.proof_field_dependencies.alpha_floor.candidate_source_anchor_present === true,
            source_to_child_field_derivation_bridge_present: false,
            proof_grade_child_derivation_ref_present: false,
            constructed_proof_grade_ref_present:
              application.child_proof_grade_refs_constructed.alpha_floor === true,
            first_missing_dependency: ALPHA_BRIDGE_BLOCKER,
          },
          exit_floor: {
            source_ref: sourceData.exit_floor_derivation_source_data.source_ref,
            source_artifact: "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic",
            candidate_interval_width_source_present: exitCandidateSourcePresent,
            proof_grade_source_certificate_present: false,
            source_certificate_class: exitCandidateSourcePresent
              ? "candidate_same_packet_exit_width_source_only"
              : "exit_width_source_absent",
            candidate_source_anchor_present:
              dependency.proof_field_dependencies.exit_floor.candidate_source_anchor_present === true,
            source_to_child_field_derivation_bridge_present: false,
            proof_grade_child_derivation_ref_present: false,
            constructed_proof_grade_ref_present:
              application.child_proof_grade_refs_constructed.exit_floor === true,
            first_source_certificate_blocker: EXIT_SOURCE_CERTIFICATE_BLOCKER,
            first_missing_dependency: EXIT_BRIDGE_BLOCKER,
          },
          fold_layer_parity_record: {
            source_ref: sourceData.fold_layer_parity_record_derivation_source_data.source_ref,
            source_artifact: "fresh_v10_higher_fold_root_tube_interval_certificate",
            source_certificate_present: paritySourceCertificatePresent,
            source_certificate_class: paritySourceCertificatePresent
              ? "proof_grade_ready_root_tube_one_root_complement_topology_source"
              : "root_tube_topology_source_absent",
            candidate_parity_delta_record_present: candidateParityDeltaPresent,
            proof_grade_parity_delta_fields_present: false,
            candidate_source_anchor_present:
              dependency.proof_field_dependencies.fold_layer_parity_record.candidate_source_anchor_present === true,
            source_to_child_field_derivation_bridge_present: false,
            proof_grade_child_derivation_ref_present: false,
            constructed_proof_grade_ref_present:
              application.child_proof_grade_refs_constructed.fold_layer_parity_record === true,
            first_missing_dependency: PARITY_BRIDGE_BLOCKER,
            proof_grade_parity_delta_blocker: PROOF_GRADE_PARITY_DELTA_BLOCKER,
            candidate_parity_delta_blocker: CANDIDATE_PARITY_DELTA_BLOCKER,
          },
        },
        proof_grade_child_fields_present_after_bridge_attempt: falseFieldMap(CHILD_FIELDS),
        row_lock_fields_present_after_bridge_attempt: falseFieldMap(LOCK_FIELDS),
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
      const attempt = bySeparatorAttempt.get(row.separator_event);
      if (!attempt) {
        throw new Error(`Missing separator bridge attempt for ${row.row_id}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        derivation_source_data_complete: row.derivation_source_data_complete === true,
        source_certificate_classes: attempt.source_certificate_classes,
        child_derivation_bridges_present: falseFieldMap(CHILD_FIELDS),
        proof_grade_child_fields_present_after_bridge_attempt: falseFieldMap(CHILD_FIELDS),
        row_lock_fields_present_after_bridge_attempt: falseFieldMap(LOCK_FIELDS),
        source_ref_not_proof_grade_blocker: SOURCE_REF_NOT_PROOF_GRADE_BLOCKER,
        alpha_bridge_blocker: ALPHA_BRIDGE_BLOCKER,
        exit_source_certificate_blocker: EXIT_SOURCE_CERTIFICATE_BLOCKER,
        exit_bridge_blocker: EXIT_BRIDGE_BLOCKER,
        parity_bridge_blocker: PARITY_BRIDGE_BLOCKER,
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

function bridgeCounts(rows, field) {
  const sourceKey = field === "exit_floor" ? "candidate_interval_width_source_present" : "source_certificate_present";
  return {
    source_ready_rows: countTrue(rows, (row) => row.source_certificate_classes[field][sourceKey] === true),
    source_to_child_field_derivation_bridge_present: countTrue(
      rows,
      (row) => row.source_certificate_classes[field].source_to_child_field_derivation_bridge_present,
    ),
    proof_grade_child_derivation_ref_present: countTrue(
      rows,
      (row) => row.source_certificate_classes[field].proof_grade_child_derivation_ref_present,
    ),
    proof_grade_ref_constructed: countTrue(
      rows,
      (row) => row.source_certificate_classes[field].constructed_proof_grade_ref_present,
    ),
  };
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const separatorAttempts = buildSeparatorAttempts(inputs);
  const rowAttempts = buildRowAttempts(inputs, separatorAttempts);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowAttempts, (row) => row.separator_event));
  const summary = {
    separator_source_certificate_bridge_attempts: separatorAttempts.length,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_derivation_source_data_complete: countTrue(rowAttempts, (row) => row.derivation_source_data_complete),
    root_tube_topology_certificate_profiles: countTrue(
      separatorAttempts,
      (attempt) =>
        attempt.source_certificate_classes.alpha_floor.source_certificate_present &&
        attempt.source_certificate_classes.fold_layer_parity_record.source_certificate_present,
    ),
    rows_with_alpha_floor_root_tube_source_certificate: countTrue(
      rowAttempts,
      (row) => row.source_certificate_classes.alpha_floor.source_certificate_present,
    ),
    rows_with_exit_floor_candidate_interval_width_source: countTrue(
      rowAttempts,
      (row) => row.source_certificate_classes.exit_floor.candidate_interval_width_source_present,
    ),
    rows_with_exit_floor_proof_grade_source_certificate: countTrue(
      rowAttempts,
      (row) => row.source_certificate_classes.exit_floor.proof_grade_source_certificate_present,
    ),
    rows_with_fold_layer_parity_record_root_tube_source_certificate: countTrue(
      rowAttempts,
      (row) => row.source_certificate_classes.fold_layer_parity_record.source_certificate_present,
    ),
    rows_with_candidate_fold_layer_parity_record_delta_fields: countTrue(
      rowAttempts,
      (row) => row.source_certificate_classes.fold_layer_parity_record.candidate_parity_delta_record_present,
    ),
    rows_with_proof_grade_fold_layer_parity_record_delta_fields: countTrue(
      rowAttempts,
      (row) => row.source_certificate_classes.fold_layer_parity_record.proof_grade_parity_delta_fields_present,
    ),
    child_field_source_certificate_bridge_counts: Object.fromEntries(
      CHILD_FIELDS.map((field) => [field, bridgeCounts(rowAttempts, field)]),
    ),
    proof_grade_child_field_presence_counts_after_bridge_attempt: presenceCounts(
      rowAttempts,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_child_fields_present_after_bridge_attempt[field],
    ),
    row_lock_field_presence_counts_after_bridge_attempt: presenceCounts(
      rowAttempts,
      LOCK_FIELDS,
      (row, field) => row.row_lock_fields_present_after_bridge_attempt[field],
    ),
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    alpha_bridge_blocker: ALPHA_BRIDGE_BLOCKER,
    exit_source_certificate_blocker: EXIT_SOURCE_CERTIFICATE_BLOCKER,
    exit_bridge_blocker: EXIT_BRIDGE_BLOCKER,
    parity_bridge_blocker: PARITY_BRIDGE_BLOCKER,
    proof_grade_parity_delta_blocker: PROOF_GRADE_PARITY_DELTA_BLOCKER,
    source_ref_not_proof_grade_blocker: SOURCE_REF_NOT_PROOF_GRADE_BLOCKER,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };

  return {
    schema:
      "breather-higher-fold-layer-alpha-exit-parity-child-field-source-certificate-to-proof-grade-derivation-bridge-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only bridge attempt that separates available source certificates from absent source-certificate-to-child-field derivation bridges; constructs no child proof_grade_ref, row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_alpha_exit_parity_child_field_proof_grade_derivation_application_attempt:
        artifactRecord(paths.derivationApplication),
      higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt:
        artifactRecord(paths.sourceData),
      higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic: artifactRecord(paths.childDiagnostic),
      fresh_v10_higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTube),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      higher_fold_layer_separator_certificate_attempt: artifactRecord(paths.separatorCertificate),
    },
    bridge_attempt_rule:
      "A proof-grade-ready source certificate is not a child-field proof_grade_ref. This attempt classifies root-tube topology certificates and candidate interval-width sources, then requires an explicit source-certificate-to-child-field derivation bridge before any alpha_floor, exit_floor, or fold_layer_parity_record proof_grade_ref can be constructed.",
    separator_source_certificate_bridge_attempts: separatorAttempts,
    row_source_certificate_bridge_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "Alpha and fold_layer_parity_record have root-tube source certificates available for all 112 row associations, and exit_floor has candidate interval-width source data for all 112 row associations, but 0 source-certificate-to-child-field derivation bridges and 0 proof-grade child derivation refs are present.",
      remains_blocked: [
        ALPHA_BRIDGE_BLOCKER,
        EXIT_SOURCE_CERTIFICATE_BLOCKER,
        EXIT_BRIDGE_BLOCKER,
        PARITY_BRIDGE_BLOCKER,
        PROOF_GRADE_PARITY_DELTA_BLOCKER,
        ATLAS_REF_BLOCKER,
        SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        PARENT_CONSUMPTION_BLOCKER,
        SEPARATOR_CERTIFICATE_BLOCKER,
      ],
      mechanical_continuation:
        "Continue mechanically only by locating or deriving an explicit bridge theorem/definition-source packet that maps the existing source certificates into child-field proof_grade_ref obligations. If the next step declares that root-tube source certificates themselves are child-field proof_grade_ref fields, it is a proof-rule or primitive-acceptance decision.",
      fail_closed_stop_conditions: [
        "Do not count proof-grade-ready root-tube topology as alpha_floor or fold_layer_parity_record without a bridge derivation.",
        "Do not count candidate exit-width source data as exit_floor without a proof-grade source certificate and bridge derivation.",
        "Do not count candidate parity delta records as proof-grade parity delta fields.",
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
      "Priority-only. This bridge attempt narrows the child-field blocker from missing source evidence to missing source-certificate-to-child-field derivation bridges, while preserving every ledger lock.",
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

function bridgeCountTable(counts) {
  return Object.entries(counts)
    .map(
      ([name, count]) =>
        `| \`${name}\` | ${count.source_ready_rows} | ${count.source_to_child_field_derivation_bridge_present} | ${count.proof_grade_child_derivation_ref_present} | ${count.proof_grade_ref_constructed} |`,
    )
    .join("\n");
}

function separatorTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.separator_event}\` | \`${attempt.fold_interval}\` | ${attempt.row_count} | ${attempt.source_certificate_classes.alpha_floor.source_certificate_present} | ${attempt.source_certificate_classes.exit_floor.candidate_interval_width_source_present} | ${attempt.source_certificate_classes.exit_floor.proof_grade_source_certificate_present} | ${attempt.source_certificate_classes.fold_layer_parity_record.source_certificate_present} | ${attempt.source_certificate_classes.fold_layer_parity_record.proof_grade_parity_delta_fields_present} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.derivation_source_data_complete} | ${row.child_derivation_bridges_present.alpha_floor} | ${row.child_derivation_bridges_present.exit_floor} | ${row.child_derivation_bridges_present.fold_layer_parity_record} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Alpha/Exit/Parity Child-Field Source-Certificate To Proof-Grade Derivation Bridge Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This bridge attempt distinguishes source certificates from child-field
\`proof_grade_ref\` derivations. The root-tube interval certificate is available
as proof-grade-ready topology/root-count source data, but this attempt does not
rename it as an \`alpha_floor\` or \`fold_layer_parity_record\` field. The
\`exit_floor\` source is still interval-width source data only.

The attempt covers ${attempt.summary.separator_source_certificate_bridge_attempts}
separator profiles and ${attempt.summary.fold_layer_rows} row associations:

- ${attempt.summary.rows_with_alpha_floor_root_tube_source_certificate}
  row associations have an alpha-floor root-tube derivative-floor source
  certificate;
- ${attempt.summary.rows_with_exit_floor_candidate_interval_width_source}
  row associations have candidate exit-width source data;
- ${attempt.summary.rows_with_exit_floor_proof_grade_source_certificate}
  row associations have proof-grade exit-width source certificates;
- ${attempt.summary.rows_with_fold_layer_parity_record_root_tube_source_certificate}
  row associations have a root-tube one-root/complement source certificate for
  parity;
- ${attempt.summary.rows_with_proof_grade_fold_layer_parity_record_delta_fields}
  row associations have proof-grade parity delta fields.

It finds 0 source-certificate-to-child-field derivation bridges and constructs
0 child \`proof_grade_ref\` fields.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Bridge Counts

| Field | Source-ready rows | Bridge rows | Proof-grade derivation refs | Proof-grade refs constructed |
| --- | ---: | ---: | ---: | ---: |
${bridgeCountTable(attempt.summary.child_field_source_certificate_bridge_counts)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_lock_field_presence_counts_after_bridge_attempt)}

## Separator Bridge Attempts

| Separator | Fold interval | Rows | Alpha source certificate | Exit candidate source | Exit proof-grade source | Parity source certificate | Proof-grade parity delta |
| --- | --- | ---: | --- | --- | --- | --- | --- |
${separatorTable(attempt.separator_source_certificate_bridge_attempts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Bridge Attempts

| Row | Separator | Fold interval | Source data complete | Alpha bridge | Exit bridge | Parity bridge | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_source_certificate_bridge_attempts)}

## Certificate-Side Handoff

Sharpened blocker:
${attempt.next_certificate_handoff.sharpened_blocker}

Remaining blockers:

${attempt.next_certificate_handoff.remains_blocked.map((item) => `- \`${item}\`.`).join("\n")}

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
    derivationApplication: args.derivationApplication,
    sourceData: args.sourceData,
    childDiagnostic: args.childDiagnostic,
    rootTube: args.rootTube,
    proofFieldDependency: args.proofFieldDependency,
    separatorCertificate: args.separatorCertificate,
  };
  const inputs = {
    derivationApplication: readJson(paths.derivationApplication),
    sourceData: readJson(paths.sourceData),
    childDiagnostic: readJson(paths.childDiagnostic),
    rootTube: readJson(paths.rootTube),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    separatorCertificate: readJson(paths.separatorCertificate),
  };
  const attempt = buildAttempt(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeReport(outReport, attempt);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

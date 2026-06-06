#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CHILD_DIAGNOSTIC = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SOURCE_DATA = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PARITY_DERIVATION = `${CERT_DIR}/higher_fold_layer_fold_layer_parity_record_root_tube_topology_proof_grade_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_BRIDGE_ATTEMPT = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_exit_floor_interval_width_source_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_exit_floor_interval_width_source_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const CHILD_DIAGNOSTIC_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic_fail_closed_candidate_child_sources_present_proof_grade_child_derivations_absent_no_row_consumption";
const SOURCE_DATA_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";
const PARITY_DERIVATION_STATUS =
  "higher_fold_layer_fold_layer_parity_record_root_tube_topology_proof_grade_derivation_attempt_fail_closed_alpha_and_parity_refs_constructed_exit_blocked_no_row_consumption";
const BRIDGE_ATTEMPT_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt_fail_closed_source_certificates_present_derivation_bridges_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_exit_floor_interval_width_source_certificate_attempt_fail_closed_exit_source_certificates_constructed_exit_refs_absent_no_row_consumption";

const CHILD_FIELDS = ["alpha_floor", "exit_floor", "fold_layer_parity_record"];
const LOCK_FIELDS = [
  "alpha_floor",
  "exit_floor",
  "fold_layer_parity_record",
  "higher_fold_separator_layer_certificate",
  "accepted_fold_layer_row",
  "row_consumed",
];

const EXIT_SOURCE_CERTIFICATE_RULE = "min_source_rectangle_width_interval_certificate";
const EXIT_SOURCE_WIDTH_Q = { numerator: "1", denominator: "125" };
const EXIT_DERIVATION_BLOCKER = "exit_floor_source_certificate_to_child_field_derivation_bridge_absent";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

function parseArgs(argv) {
  const args = {
    childDiagnostic: DEFAULT_CHILD_DIAGNOSTIC,
    sourceData: DEFAULT_SOURCE_DATA,
    parityDerivation: DEFAULT_PARITY_DERIVATION,
    bridgeAttempt: DEFAULT_BRIDGE_ATTEMPT,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--child-diagnostic") {
      args.childDiagnostic = argv[++index];
    } else if (arg === "--source-data") {
      args.sourceData = argv[++index];
    } else if (arg === "--parity-derivation") {
      args.parityDerivation = argv[++index];
    } else if (arg === "--bridge-attempt") {
      args.bridgeAttempt = argv[++index];
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-exit-floor-interval-width-source-certificate-attempt.mjs [options]

Options:
  --child-diagnostic PATH        Child-field interval diagnostic. Defaults to ${DEFAULT_CHILD_DIAGNOSTIC}.
  --source-data PATH             Child-field derivation source-data proof attempt. Defaults to ${DEFAULT_SOURCE_DATA}.
  --parity-derivation PATH       Parity-record proof-grade derivation attempt. Defaults to ${DEFAULT_PARITY_DERIVATION}.
  --bridge-attempt PATH          Source-certificate bridge attempt. Defaults to ${DEFAULT_BRIDGE_ATTEMPT}.
  --proof-field-dependency PATH  Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
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

function qPositive(q) {
  if (q?.numerator == null || q?.denominator == null) {
    return false;
  }
  return BigInt(q.numerator) > 0n && BigInt(q.denominator) > 0n;
}

function qEqual(left, right) {
  return (
    left?.numerator != null &&
    left?.denominator != null &&
    right?.numerator != null &&
    right?.denominator != null &&
    BigInt(left.numerator) === BigInt(right.numerator) &&
    BigInt(left.denominator) === BigInt(right.denominator)
  );
}

function qGreaterOrEqual(left, right) {
  if (
    left?.numerator == null ||
    left?.denominator == null ||
    right?.numerator == null ||
    right?.denominator == null
  ) {
    return false;
  }
  const leftNumerator = BigInt(left.numerator);
  const leftDenominator = BigInt(left.denominator);
  const rightNumerator = BigInt(right.numerator);
  const rightDenominator = BigInt(right.denominator);
  if (leftDenominator <= 0n || rightDenominator <= 0n) {
    return false;
  }
  return leftNumerator * rightDenominator >= rightNumerator * leftDenominator;
}

function exitSourceCertificateRef(separator) {
  return `proof_source_certificate_ref:${PACKET_ID}:${separator}:exit_floor:${EXIT_SOURCE_CERTIFICATE_RULE}:v0`;
}

function validateInputs(inputs) {
  assertPacketId(inputs.childDiagnostic, "childDiagnostic");
  assertPacketId(inputs.sourceData, "sourceData");
  assertPacketId(inputs.parityDerivation, "parityDerivation");
  assertPacketId(inputs.bridgeAttempt, "bridgeAttempt");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.childDiagnostic, "childDiagnostic");
  assertFailClosed(inputs.sourceData, "sourceData");
  assertFailClosed(inputs.parityDerivation, "parityDerivation");
  assertFailClosed(inputs.bridgeAttempt, "bridgeAttempt");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");

  const expectedStatuses = [
    [inputs.childDiagnostic.status, CHILD_DIAGNOSTIC_STATUS, "childDiagnostic"],
    [inputs.sourceData.status, SOURCE_DATA_STATUS, "sourceData"],
    [inputs.parityDerivation.status, PARITY_DERIVATION_STATUS, "parityDerivation"],
    [inputs.bridgeAttempt.status, BRIDGE_ATTEMPT_STATUS, "bridgeAttempt"],
    [inputs.proofFieldDependency.status, PROOF_FIELD_DEPENDENCY_STATUS, "proofFieldDependency"],
  ];
  for (const [actual, expected, name] of expectedStatuses) {
    if (actual !== expected) {
      throw new Error(`${name} is not at the expected status.`);
    }
  }
  if (inputs.parityDerivation.summary?.rows_with_alpha_floor_proof_grade_ref_constructed !== 112) {
    throw new Error("Parity derivation input has not inherited all alpha_floor refs.");
  }
  if (inputs.parityDerivation.summary?.rows_with_fold_layer_parity_record_proof_grade_ref_constructed !== 112) {
    throw new Error("Parity derivation input has not constructed all parity refs.");
  }
  if (inputs.parityDerivation.summary?.rows_with_exit_floor_proof_grade_ref_constructed !== 0) {
    throw new Error("Parity derivation input unexpectedly constructs exit_floor refs.");
  }
}

function exitFacts(diagnostic, sourceData, dependency, bridgeAttempt) {
  const source = sourceData.exit_floor_derivation_source_data;
  const candidate = diagnostic.candidate_exit_floor_source;
  const facts = {
    candidate_exit_width_source_present: candidate != null,
    positive_source_width: candidate?.positive_source_width === true,
    diagnostic_marks_exit_floor_not_proof_grade: candidate?.proof_grade_exit_floor_present === false,
    min_source_rectangle_width_positive: qPositive(candidate?.min_source_rectangle_width_q),
    min_source_rectangle_width_exact_expected: qEqual(candidate?.min_source_rectangle_width_q, EXIT_SOURCE_WIDTH_Q),
    layer_theta_width_matches_min: qEqual(candidate?.layer_theta_width_q, candidate?.min_source_rectangle_width_q),
    input_screen_theta_width_matches_min: qEqual(
      candidate?.input_screen_theta_width_q,
      candidate?.min_source_rectangle_width_q,
    ),
    mesh_preledger_theta_width_matches_min: qEqual(
      candidate?.mesh_preledger_theta_width_q,
      candidate?.min_source_rectangle_width_q,
    ),
    layer_t_width_positive: qPositive(candidate?.layer_t_width_q),
    input_screen_t_width_positive: qPositive(candidate?.input_screen_t_width_q),
    mesh_preledger_t_width_positive: qPositive(candidate?.mesh_preledger_t_width_q),
    input_screen_t_width_matches_layer: qEqual(candidate?.input_screen_t_width_q, candidate?.layer_t_width_q),
    mesh_preledger_t_width_matches_layer: qEqual(candidate?.mesh_preledger_t_width_q, candidate?.layer_t_width_q),
    layer_t_width_ge_min_source_width: qGreaterOrEqual(
      candidate?.layer_t_width_q,
      candidate?.min_source_rectangle_width_q,
    ),
    input_screen_t_width_ge_min_source_width: qGreaterOrEqual(
      candidate?.input_screen_t_width_q,
      candidate?.min_source_rectangle_width_q,
    ),
    mesh_preledger_t_width_ge_min_source_width: qGreaterOrEqual(
      candidate?.mesh_preledger_t_width_q,
      candidate?.min_source_rectangle_width_q,
    ),
    source_data_record_present: source?.source_data_record_present === true,
    source_ref_handle_materialized: source?.source_ref_handle_materialized === true,
    source_data_proof_grade_ref_absent: source?.proof_grade_ref_present === false && source?.proof_grade_ref === null,
    source_data_artifact_matches_candidate: source?.source_artifact === "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic",
    source_ref_is_not_reused_as_source_certificate: source?.source_ref !== exitSourceCertificateRef(diagnostic.separator_event),
    source_value_matches_candidate_width: qEqual(source?.min_source_rectangle_width_q, candidate?.min_source_rectangle_width_q),
    source_value_matches_expected_width: qEqual(source?.min_source_rectangle_width_q, EXIT_SOURCE_WIDTH_Q),
    candidate_source_fields_include_layer_geometry:
      candidate?.source_fields?.includes("layer_geometry_interval_source") === true,
    candidate_source_fields_include_input_screen:
      candidate?.source_fields?.includes("input_screen_fold_interval_source") === true,
    candidate_source_fields_include_mesh: candidate?.source_fields?.includes("mesh_fold_interval_source") === true,
    source_fields_include_layer_geometry: source?.source_fields?.includes("layer_geometry_interval_source") === true,
    source_fields_include_input_screen: source?.source_fields?.includes("input_screen_fold_interval_source") === true,
    source_fields_include_mesh: source?.source_fields?.includes("mesh_fold_interval_source") === true,
    dependency_candidate_anchor_present:
      dependency.proof_field_dependencies.exit_floor.candidate_source_anchor_present === true,
    prior_bridge_marks_proof_grade_source_absent:
      bridgeAttempt.source_certificate_classes.exit_floor.proof_grade_source_certificate_present === false,
    prior_bridge_has_no_exit_derivation_bridge:
      bridgeAttempt.source_certificate_classes.exit_floor.source_to_child_field_derivation_bridge_present === false,
    prior_bridge_has_no_exit_proof_ref:
      bridgeAttempt.source_certificate_classes.exit_floor.constructed_proof_grade_ref_present === false,
  };
  const passed = Object.values(facts).every((value) => value === true);
  return { facts, passed };
}

function buildSeparatorAttempts(inputs) {
  const diagnosticBySeparator = bySeparator(
    inputs.childDiagnostic.separator_child_witness_profiles,
    "child diagnostic",
  );
  const sourceBySeparator = bySeparator(
    inputs.sourceData.separator_derivation_source_data_packets,
    "source data",
  );
  const parityBySeparator = bySeparator(
    inputs.parityDerivation.separator_fold_layer_parity_record_derivation_attempts,
    "parity derivation",
  );
  const bridgeBySeparator = bySeparator(
    inputs.bridgeAttempt.separator_source_certificate_bridge_attempts,
    "source-certificate bridge",
  );
  const dependencyBySeparator = bySeparator(
    inputs.proofFieldDependency.separator_dependency_profiles,
    "proof-field dependency",
  );

  return [...inputs.sourceData.separator_derivation_source_data_packets]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((packet) => {
      const separator = packet.separator_event;
      const diagnostic = requireSeparator(diagnosticBySeparator, separator, "child diagnostic");
      const sourceData = requireSeparator(sourceBySeparator, separator, "source data");
      const parityAttempt = requireSeparator(parityBySeparator, separator, "parity derivation");
      const bridgeAttempt = requireSeparator(bridgeBySeparator, separator, "source-certificate bridge");
      const dependency = requireSeparator(dependencyBySeparator, separator, "proof-field dependency");
      const { facts, passed } = exitFacts(diagnostic, sourceData, dependency, bridgeAttempt);
      const candidate = diagnostic.candidate_exit_floor_source;
      return {
        separator_event: separator,
        fold_interval: packet.fold_interval,
        atlas_candidate_id: packet.atlas_candidate_id,
        row_count: packet.row_count,
        row_ids: packet.row_ids,
        derivation_source_data_complete: packet.derivation_source_data_complete === true,
        inherited_alpha_floor_proof_grade_ref: parityAttempt.inherited_alpha_floor_proof_grade_ref,
        inherited_fold_layer_parity_record_proof_grade_ref:
          parityAttempt.fold_layer_parity_record_proof_grade_ref,
        exit_floor_interval_width_source: {
          source_ref: sourceData.exit_floor_derivation_source_data.source_ref,
          source_artifact: sourceData.exit_floor_derivation_source_data.source_artifact,
          source_fields: sourceData.exit_floor_derivation_source_data.source_fields,
          min_source_rectangle_width_q: candidate.min_source_rectangle_width_q,
          layer_theta_width_q: candidate.layer_theta_width_q,
          input_screen_theta_width_q: candidate.input_screen_theta_width_q,
          mesh_preledger_theta_width_q: candidate.mesh_preledger_theta_width_q,
        },
        exit_floor_source_certificate_facts: facts,
        exit_floor_proof_grade_source_certificate_present: passed,
        exit_floor_proof_grade_source_certificate_ref: passed ? exitSourceCertificateRef(separator) : null,
        exit_floor_source_ref_is_source_certificate_promotion: passed
          ? exitSourceCertificateRef(separator) === sourceData.exit_floor_derivation_source_data.source_ref
          : false,
        exit_floor_proof_grade_ref_constructed: false,
        proof_grade_child_fields_present_after_exit_source_certificate: {
          alpha_floor: parityAttempt.alpha_floor_proof_grade_ref_constructed === true,
          exit_floor: false,
          fold_layer_parity_record: parityAttempt.fold_layer_parity_record_proof_grade_ref_constructed === true,
        },
        row_lock_fields_present_after_exit_source_certificate: {
          alpha_floor: parityAttempt.alpha_floor_proof_grade_ref_constructed === true,
          exit_floor: false,
          fold_layer_parity_record: parityAttempt.fold_layer_parity_record_proof_grade_ref_constructed === true,
          higher_fold_separator_layer_certificate: false,
          accepted_fold_layer_row: false,
          row_consumed: false,
        },
        exit_floor_derivation_blocker: EXIT_DERIVATION_BLOCKER,
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
        throw new Error(`Missing separator exit source certificate for ${row.row_id}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        derivation_source_data_complete: row.derivation_source_data_complete === true,
        inherited_alpha_floor_proof_grade_ref: attempt.inherited_alpha_floor_proof_grade_ref,
        inherited_fold_layer_parity_record_proof_grade_ref:
          attempt.inherited_fold_layer_parity_record_proof_grade_ref,
        exit_floor_source_certificate: {
          source_ref: row.exit_floor_source_ref,
          proof_grade_source_certificate_present:
            attempt.exit_floor_proof_grade_source_certificate_present,
          proof_grade_source_certificate_ref:
            attempt.exit_floor_proof_grade_source_certificate_ref,
          source_ref_reused_as_source_certificate:
            attempt.exit_floor_source_ref_is_source_certificate_promotion,
        },
        child_proof_grade_refs_constructed_after_exit_source_certificate: {
          alpha_floor: true,
          exit_floor: false,
          fold_layer_parity_record: true,
        },
        proof_grade_child_fields_present_after_exit_source_certificate:
          attempt.proof_grade_child_fields_present_after_exit_source_certificate,
        row_lock_fields_present_after_exit_source_certificate:
          attempt.row_lock_fields_present_after_exit_source_certificate,
        exit_floor_derivation_blocker: EXIT_DERIVATION_BLOCKER,
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

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const separatorAttempts = buildSeparatorAttempts(inputs);
  const rowAttempts = buildRowAttempts(inputs, separatorAttempts);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowAttempts, (row) => row.separator_event));
  const summary = {
    separator_exit_floor_source_certificate_attempts: separatorAttempts.length,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_derivation_source_data_complete: countTrue(rowAttempts, (row) => row.derivation_source_data_complete),
    rows_with_alpha_floor_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_refs_constructed_after_exit_source_certificate.alpha_floor,
    ),
    rows_with_fold_layer_parity_record_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_refs_constructed_after_exit_source_certificate.fold_layer_parity_record,
    ),
    rows_with_exit_floor_positive_interval_width_source: countTrue(
      rowAttempts,
      (row) => row.exit_floor_source_certificate.proof_grade_source_certificate_present,
    ),
    rows_with_exit_floor_proof_grade_source_certificate: countTrue(
      rowAttempts,
      (row) => row.exit_floor_source_certificate.proof_grade_source_certificate_present,
    ),
    rows_with_exit_floor_source_ref_reused_as_source_certificate: countTrue(
      rowAttempts,
      (row) => row.exit_floor_source_certificate.source_ref_reused_as_source_certificate,
    ),
    rows_with_exit_floor_proof_grade_ref_constructed: 0,
    rows_with_all_child_proof_grade_derivation_refs_constructed: 0,
    exit_floor_source_certificate_obligations_remaining_after_exit_source_certificate:
      rowAttempts.length -
      countTrue(rowAttempts, (row) => row.exit_floor_source_certificate.proof_grade_source_certificate_present),
    child_proof_grade_ref_obligations_remaining_after_exit_source_certificate: rowAttempts.length,
    proof_grade_child_field_presence_counts_after_exit_source_certificate: presenceCounts(
      rowAttempts,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_child_fields_present_after_exit_source_certificate[field],
    ),
    row_lock_field_presence_counts_after_exit_source_certificate: presenceCounts(
      rowAttempts,
      LOCK_FIELDS,
      (row, field) => row.row_lock_fields_present_after_exit_source_certificate[field],
    ),
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    exit_source_certificate_rule: EXIT_SOURCE_CERTIFICATE_RULE,
    exit_floor_derivation_blocker: EXIT_DERIVATION_BLOCKER,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };
  if (summary.rows_with_exit_floor_proof_grade_source_certificate !== rowAttempts.length) {
    throw new Error("Exit-floor source-certificate attempt did not certify all row associations.");
  }
  if (summary.rows_with_exit_floor_source_ref_reused_as_source_certificate !== 0) {
    throw new Error("Exit-floor source certificate reused a source_ref handle.");
  }
  if (
    summary.rows_with_exit_floor_proof_grade_ref_constructed !== 0 ||
    summary.rows_with_all_child_proof_grade_derivation_refs_constructed !== 0 ||
    summary.row_consumption_count !== 0 ||
    summary.preledger_pass_rows !== 0 ||
    summary.branch_chart_authorized_rows !== 0
  ) {
    throw new Error("Exit-floor source-certificate attempt violated fail-closed row locks.");
  }

  return {
    schema: "breather-higher-fold-layer-exit-floor-interval-width-source-certificate-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only exit_floor interval-width source certificate attempt that constructs proof-grade source certificates from same-packet positive interval-width data; leaves exit_floor proof_grade_ref, separator certificate, row consumption, preledger pass, live-ledger update, and branch-chart authorization locked",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic: artifactRecord(paths.childDiagnostic),
      higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt:
        artifactRecord(paths.sourceData),
      higher_fold_layer_fold_layer_parity_record_root_tube_topology_proof_grade_derivation_attempt:
        artifactRecord(paths.parityDerivation),
      higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt:
        artifactRecord(paths.bridgeAttempt),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
    },
    proof_attempt_rule:
      "For a row associated to separator Sigma_hf_i, construct an exit_floor proof-grade source certificate only when the child-field interval diagnostic gives positive same-packet layer, input-screen, and mesh theta-widths; all three theta-widths equal the min_source_rectangle_width_q; the t-widths are positive; the derivation source-data record names the same exact rational width and source fields; and the constructed proof_source_certificate_ref is not the source_ref handle. This attempt does not construct an exit_floor proof_grade_ref, higher_fold_separator_layer_certificate, row consumption, preledger_pass, live-ledger updates, or branch-chart authorization.",
    separator_exit_floor_source_certificate_attempts: separatorAttempts,
    row_exit_floor_source_certificate_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The exit_floor source-certificate blocker is reduced: 112 / 112 fold-layer row associations now have proof-grade exit_floor interval-width source certificates from same-packet positive source-width data. The route still has 0 exit_floor proof_grade_ref rows, 0 higher_fold_separator_layer_certificate rows, and 0 row consumption.",
      remains_blocked: [
        EXIT_DERIVATION_BLOCKER,
        ATLAS_REF_BLOCKER,
        SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        PARENT_CONSUMPTION_BLOCKER,
        SEPARATOR_CERTIFICATE_BLOCKER,
      ],
      mechanical_continuation:
        "Continue mechanically by deriving exit_floor proof_grade_ref fields from the proof-grade exit source certificates, then assembling the aggregate separator certificate only after accepted atlas-ref, impulse/direct-quadrature, parent-complement consumption, and separator-layer certificate obligations are also discharged.",
      fail_closed_stop_conditions: [
        "Do not treat the exit_floor source_ref handle as the proof-grade source certificate.",
        "Do not treat the proof-grade exit source certificate as an exit_floor proof_grade_ref without a child-field derivation bridge.",
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
      "Priority-only. This artifact constructs only the exit_floor proof-grade source-certificate layer and leaves every preledger and branch-chart lock closed.",
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

function separatorTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.separator_event}\` | \`${attempt.fold_interval}\` | ${attempt.row_count} | ${attempt.exit_floor_source_certificate_facts.positive_source_width} | ${attempt.exit_floor_source_certificate_facts.source_value_matches_candidate_width} | ${attempt.exit_floor_proof_grade_source_certificate_present} | ${attempt.exit_floor_proof_grade_ref_constructed} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.exit_floor_source_certificate.proof_grade_source_certificate_present} | ${row.child_proof_grade_refs_constructed_after_exit_source_certificate.alpha_floor} | ${row.child_proof_grade_refs_constructed_after_exit_source_certificate.exit_floor} | ${row.child_proof_grade_refs_constructed_after_exit_source_certificate.fold_layer_parity_record} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Exit-Floor Interval-Width Source Certificate Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This attempt derives only proof-grade source certificates for \`exit_floor\`
from the same-packet interval-width data. It does not reuse the existing
\`source_ref\` as a source certificate, and it does not construct an
\`exit_floor\` \`proof_grade_ref\`.

The attempt covers ${attempt.summary.separator_exit_floor_source_certificate_attempts}
separator profiles and ${attempt.summary.fold_layer_rows} row associations:

- ${attempt.summary.rows_with_exit_floor_positive_interval_width_source}
  / ${attempt.summary.fold_layer_rows} row associations have positive
  same-packet interval-width source data;
- ${attempt.summary.rows_with_exit_floor_proof_grade_source_certificate}
  / ${attempt.summary.fold_layer_rows} row associations construct proof-grade
  \`exit_floor\` source certificates;
- ${attempt.summary.rows_with_exit_floor_proof_grade_ref_constructed}
  / ${attempt.summary.fold_layer_rows} row associations construct
  \`exit_floor\` \`proof_grade_ref\` fields;
- ${attempt.summary.rows_with_alpha_floor_proof_grade_ref_constructed}
  / ${attempt.summary.fold_layer_rows} row associations retain proof-grade
  \`alpha_floor\` refs;
- ${attempt.summary.rows_with_fold_layer_parity_record_proof_grade_ref_constructed}
  / ${attempt.summary.fold_layer_rows} row associations retain proof-grade
  \`fold_layer_parity_record\` refs.

It still constructs 0 complete child-field rows, 0
\`higher_fold_separator_layer_certificate\` rows, and consumes 0 rows.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Child Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_child_field_presence_counts_after_exit_source_certificate)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_lock_field_presence_counts_after_exit_source_certificate)}

## Separator Exit-Source Certificates

| Separator | Fold interval | Rows | Positive width | Source value match | Source certificate | Exit proof ref |
| --- | --- | ---: | --- | --- | --- | --- |
${separatorTable(attempt.separator_exit_floor_source_certificate_attempts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Exit-Source Certificates

| Row | Separator | Fold interval | Exit source certificate | Alpha proof ref | Exit proof ref | Parity proof ref | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_exit_floor_source_certificate_attempts)}

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

This artifact is priority-only. It proves the \`exit_floor\` source-certificate
layer for the 112 row associations and proves no \`exit_floor\`
\`proof_grade_ref\`, \`higher_fold_separator_layer_certificate\`, accepted
fold-layer row, row consumption, live-ledger update, or branch-chart
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
    childDiagnostic: args.childDiagnostic,
    sourceData: args.sourceData,
    parityDerivation: args.parityDerivation,
    bridgeAttempt: args.bridgeAttempt,
    proofFieldDependency: args.proofFieldDependency,
  };
  const inputs = {
    childDiagnostic: readJson(paths.childDiagnostic),
    sourceData: readJson(paths.sourceData),
    parityDerivation: readJson(paths.parityDerivation),
    bridgeAttempt: readJson(paths.bridgeAttempt),
    proofFieldDependency: readJson(paths.proofFieldDependency),
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

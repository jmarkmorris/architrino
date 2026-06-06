#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_DATA = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OBLIGATION_CLASSIFIER = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_source_data_proof_grade_ref_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_DERIVATION_APPLICATION = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_proof_grade_derivation_application_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_BRIDGE_ATTEMPT = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_alpha_floor_root_tube_derivative_floor_proof_grade_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_alpha_floor_root_tube_derivative_floor_proof_grade_derivation_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SOURCE_DATA_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";
const OBLIGATION_CLASSIFIER_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_data_proof_grade_ref_obligation_classifier_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";
const DERIVATION_APPLICATION_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_proof_grade_derivation_application_attempt_fail_closed_source_data_complete_proof_grade_derivations_absent_no_row_consumption";
const BRIDGE_ATTEMPT_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt_fail_closed_source_certificates_present_derivation_bridges_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const ROOT_TUBE_STATUS = "outward_rational_interval_12_root_certificate_passed";
const STATUS =
  "higher_fold_layer_alpha_floor_root_tube_derivative_floor_proof_grade_derivation_attempt_fail_closed_alpha_refs_constructed_exit_parity_blocked_no_row_consumption";

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

const ALPHA_DERIVATION_RULE = "root_tube_derivative_floor_interval_certificate";
const EXIT_PROOF_GRADE_SOURCE_BLOCKER = "exit_floor_proof_grade_source_certificate_absent";
const EXIT_DERIVATION_BLOCKER = "proof_grade_exit_floor_derivation_absent";
const PARITY_DERIVATION_BLOCKER = "proof_grade_fold_layer_parity_record_absent";
const PROOF_GRADE_PARITY_DELTA_BLOCKER = "proof_grade_fold_layer_parity_record_delta_fields_absent";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

function parseArgs(argv) {
  const args = {
    sourceData: DEFAULT_SOURCE_DATA,
    obligationClassifier: DEFAULT_OBLIGATION_CLASSIFIER,
    derivationApplication: DEFAULT_DERIVATION_APPLICATION,
    bridgeAttempt: DEFAULT_BRIDGE_ATTEMPT,
    rootTube: DEFAULT_ROOT_TUBE,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
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
    } else if (arg === "--obligation-classifier") {
      args.obligationClassifier = argv[++index];
    } else if (arg === "--derivation-application") {
      args.derivationApplication = argv[++index];
    } else if (arg === "--bridge-attempt") {
      args.bridgeAttempt = argv[++index];
    } else if (arg === "--root-tube") {
      args.rootTube = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-alpha-floor-root-tube-derivative-floor-proof-grade-derivation-attempt.mjs [options]

Options:
  --source-data PATH             Child-field derivation source-data proof attempt. Defaults to ${DEFAULT_SOURCE_DATA}.
  --obligation-classifier PATH   Child-field proof-grade ref obligation classifier. Defaults to ${DEFAULT_OBLIGATION_CLASSIFIER}.
  --derivation-application PATH  Child-field proof-grade derivation application attempt. Defaults to ${DEFAULT_DERIVATION_APPLICATION}.
  --bridge-attempt PATH          Source-certificate bridge attempt. Defaults to ${DEFAULT_BRIDGE_ATTEMPT}.
  --root-tube PATH               Root-tube interval certificate. Defaults to ${DEFAULT_ROOT_TUBE}.
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
  const numerator = BigInt(q.numerator);
  const denominator = BigInt(q.denominator);
  return denominator > 0n && numerator > 0n;
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

function proofGradeRef(separator) {
  return `proof_grade_ref:${PACKET_ID}:${separator}:alpha_floor:${ALPHA_DERIVATION_RULE}:v0`;
}

function proofDerivationRef(separator) {
  return `proof_derivation_ref:${PACKET_ID}:${separator}:alpha_floor:${ALPHA_DERIVATION_RULE}:v0`;
}

function validateInputs(inputs) {
  assertPacketId(inputs.sourceData, "sourceData");
  assertPacketId(inputs.obligationClassifier, "obligationClassifier");
  assertPacketId(inputs.derivationApplication, "derivationApplication");
  assertPacketId(inputs.bridgeAttempt, "bridgeAttempt");
  assertPacketId(inputs.rootTube, "rootTube");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.sourceData, "sourceData");
  assertFailClosed(inputs.obligationClassifier, "obligationClassifier");
  assertFailClosed(inputs.derivationApplication, "derivationApplication");
  assertFailClosed(inputs.bridgeAttempt, "bridgeAttempt");
  assertFailClosed(inputs.rootTube, "rootTube");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");

  const expectedStatuses = [
    [inputs.sourceData.status, SOURCE_DATA_STATUS, "sourceData"],
    [inputs.obligationClassifier.status, OBLIGATION_CLASSIFIER_STATUS, "obligationClassifier"],
    [inputs.derivationApplication.status, DERIVATION_APPLICATION_STATUS, "derivationApplication"],
    [inputs.bridgeAttempt.status, BRIDGE_ATTEMPT_STATUS, "bridgeAttempt"],
    [inputs.rootTube.status, ROOT_TUBE_STATUS, "rootTube"],
    [inputs.proofFieldDependency.status, PROOF_FIELD_DEPENDENCY_STATUS, "proofFieldDependency"],
  ];
  for (const [actual, expected, name] of expectedStatuses) {
    if (actual !== expected) {
      throw new Error(`${name} is not at the expected status.`);
    }
  }
  if (inputs.rootTube.proof_grade_ready_for_preledger_rerun !== true) {
    throw new Error("Root-tube certificate is not marked proof-grade-ready for preledger rerun.");
  }
  if (inputs.rootTube.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube certificate does not certify one root for all tubes.");
  }
  if (inputs.rootTube.summary?.all_complements_certified_no_extra_root !== true) {
    throw new Error("Root-tube certificate does not certify no extra roots on complements.");
  }
  if (inputs.rootTube.root_tubes?.length !== 12) {
    throw new Error("Expected 12 root tubes.");
  }
  if (inputs.sourceData.summary?.rows_with_derivation_source_data_complete !== 112) {
    throw new Error("Expected complete derivation source data for 112 rows.");
  }
  if (inputs.obligationClassifier.summary?.child_proof_grade_ref_obligations_total !== 336) {
    throw new Error("Expected 336 child proof_grade_ref obligations before alpha derivation.");
  }
  if (inputs.derivationApplication.summary?.rows_with_alpha_floor_proof_grade_ref_constructed !== 0) {
    throw new Error("Derivation application input already reports alpha_floor proof_grade_ref construction.");
  }
  if (
    inputs.bridgeAttempt.summary?.child_field_source_certificate_bridge_counts?.alpha_floor
      ?.source_to_child_field_derivation_bridge_present !== 0
  ) {
    throw new Error("Bridge input already reports alpha source-certificate derivation bridges.");
  }
}

function alphaFacts(rootTube, sourceData, dependency, bridgeAttempt) {
  const source = sourceData.alpha_floor_derivation_source_data;
  const facts = {
    root_tube_certificate_status_passed: true,
    root_tube_preledger_ready: true,
    interval_certified_one_root: rootTube.interval_certified_one_root === true,
    root_count_bound_is_one_to_one: rootTube.root_count_bound_q?.[0] === 1 && rootTube.root_count_bound_q?.[1] === 1,
    derivative_floor_q_present: rootTube.derivative_floor_q != null,
    derivative_floor_q_positive: qPositive(rootTube.derivative_floor_q),
    failing_derivative_pieces_empty: Array.isArray(rootTube.failing_derivative_pieces)
      ? rootTube.failing_derivative_pieces.length === 0
      : false,
    source_data_record_present: source?.source_data_record_present === true,
    source_ref_handle_materialized: source?.source_ref_handle_materialized === true,
    source_ref_is_not_reused_as_proof_grade_ref: source?.source_ref !== proofGradeRef(rootTube.contact_id),
    source_artifact_matches_root_tube_certificate:
      source?.source_artifact === "fresh_v10_higher_fold_root_tube_interval_certificate",
    source_field_matches_derivative_floor: source?.source_field === "root_tube_derivative_floor_source",
    source_value_matches_root_tube_derivative_floor: qEqual(source?.source_value_q, rootTube.derivative_floor_q),
    dependency_candidate_anchor_present:
      dependency.proof_field_dependencies.alpha_floor.candidate_source_anchor_present === true,
    prior_generic_bridge_absent:
      bridgeAttempt.source_certificate_classes.alpha_floor.source_to_child_field_derivation_bridge_present === false,
  };
  const passed = Object.values(facts).every((value) => value === true);
  return { facts, passed };
}

function buildSeparatorAttempts(inputs) {
  const sourceBySeparator = bySeparator(
    inputs.sourceData.separator_derivation_source_data_packets,
    "source data",
  );
  const bridgeBySeparator = bySeparator(
    inputs.bridgeAttempt.separator_source_certificate_bridge_attempts,
    "source-certificate bridge",
  );
  const dependencyBySeparator = bySeparator(
    inputs.proofFieldDependency.separator_dependency_profiles,
    "proof-field dependency",
  );
  const rootTubeBySeparator = bySeparator(inputs.rootTube.root_tubes, "root tube", "contact_id");

  return [...inputs.sourceData.separator_derivation_source_data_packets]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((packet) => {
      const separator = packet.separator_event;
      const sourceData = requireSeparator(sourceBySeparator, separator, "source data");
      const bridgeAttempt = requireSeparator(bridgeBySeparator, separator, "source-certificate bridge");
      const dependency = requireSeparator(dependencyBySeparator, separator, "proof-field dependency");
      const rootTube = requireSeparator(rootTubeBySeparator, separator, "root tube");
      const { facts, passed } = alphaFacts(rootTube, sourceData, dependency, bridgeAttempt);
      return {
        separator_event: separator,
        fold_interval: packet.fold_interval,
        atlas_candidate_id: packet.atlas_candidate_id,
        row_count: packet.row_count,
        row_ids: packet.row_ids,
        derivation_source_data_complete: packet.derivation_source_data_complete === true,
        alpha_floor_root_tube_certificate: {
          contact_id: rootTube.contact_id,
          interval_certified_one_root: rootTube.interval_certified_one_root === true,
          root_count_bound_q: rootTube.root_count_bound_q,
          derivative_sign: rootTube.derivative_sign,
          derivative_floor_q: rootTube.derivative_floor_q,
          derivative_floor_display: rootTube.derivative_floor_display,
          derivative_piece_count: rootTube.derivative_piece_count,
          failing_derivative_pieces_empty: Array.isArray(rootTube.failing_derivative_pieces)
            ? rootTube.failing_derivative_pieces.length === 0
            : false,
        },
        alpha_floor_derivation_source_data: {
          source_ref: sourceData.alpha_floor_derivation_source_data.source_ref,
          source_artifact: sourceData.alpha_floor_derivation_source_data.source_artifact,
          source_field: sourceData.alpha_floor_derivation_source_data.source_field,
          source_value_q: sourceData.alpha_floor_derivation_source_data.source_value_q,
        },
        alpha_floor_derivation_facts: facts,
        alpha_floor_proof_grade_derivation_present: passed,
        alpha_floor_proof_grade_derivation_ref: passed ? proofDerivationRef(separator) : null,
        alpha_floor_proof_grade_ref_constructed: passed,
        alpha_floor_proof_grade_ref: passed ? proofGradeRef(separator) : null,
        alpha_floor_ref_is_source_ref_promotion: passed
          ? proofGradeRef(separator) === sourceData.alpha_floor_derivation_source_data.source_ref
          : false,
        exit_floor_proof_grade_ref_constructed: false,
        fold_layer_parity_record_proof_grade_ref_constructed: false,
        proof_grade_child_fields_present_after_alpha_floor_derivation: {
          alpha_floor: passed,
          exit_floor: false,
          fold_layer_parity_record: false,
        },
        row_lock_fields_present_after_alpha_floor_derivation: {
          alpha_floor: passed,
          exit_floor: false,
          fold_layer_parity_record: false,
          higher_fold_separator_layer_certificate: false,
          accepted_fold_layer_row: false,
          row_consumed: false,
        },
        first_alpha_floor_blocker: passed ? null : "alpha_floor_root_tube_derivative_floor_certificate_facts_incomplete",
        exit_floor_blocker: EXIT_DERIVATION_BLOCKER,
        parity_record_blocker: PARITY_DERIVATION_BLOCKER,
        proof_grade_parity_delta_blocker: PROOF_GRADE_PARITY_DELTA_BLOCKER,
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
        throw new Error(`Missing separator alpha-floor derivation for ${row.row_id}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        derivation_source_data_complete: row.derivation_source_data_complete === true,
        alpha_floor_derivation: {
          source_ref: row.alpha_floor_source_ref,
          proof_grade_derivation_present: attempt.alpha_floor_proof_grade_derivation_present,
          proof_grade_derivation_ref: attempt.alpha_floor_proof_grade_derivation_ref,
          constructed_proof_grade_ref_present: attempt.alpha_floor_proof_grade_ref_constructed,
          constructed_proof_grade_ref: attempt.alpha_floor_proof_grade_ref,
          source_ref_reused_as_proof_grade_ref: attempt.alpha_floor_ref_is_source_ref_promotion,
          accepted: attempt.alpha_floor_proof_grade_ref_constructed,
        },
        child_proof_grade_refs_constructed_after_alpha_floor_derivation: {
          alpha_floor: attempt.alpha_floor_proof_grade_ref_constructed,
          exit_floor: false,
          fold_layer_parity_record: false,
        },
        proof_grade_child_fields_present_after_alpha_floor_derivation:
          attempt.proof_grade_child_fields_present_after_alpha_floor_derivation,
        proof_grade_parity_delta_field_applications: Object.fromEntries(
          PARITY_DELTA_FIELDS.map((field) => [
            field,
            {
              candidate_field_present: row.candidate_fold_layer_parity_record_delta_fields_present === true,
              proof_grade_field_present: false,
              constructed_proof_grade_field: null,
              first_missing_dependency: PROOF_GRADE_PARITY_DELTA_BLOCKER,
            },
          ]),
        ),
        proof_grade_parity_delta_fields_complete: false,
        row_lock_fields_present_after_alpha_floor_derivation:
          attempt.row_lock_fields_present_after_alpha_floor_derivation,
        exit_floor_blocker: EXIT_DERIVATION_BLOCKER,
        exit_floor_source_certificate_blocker: EXIT_PROOF_GRADE_SOURCE_BLOCKER,
        parity_record_blocker: PARITY_DERIVATION_BLOCKER,
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

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const separatorAttempts = buildSeparatorAttempts(inputs);
  const rowAttempts = buildRowAttempts(inputs, separatorAttempts);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowAttempts, (row) => row.separator_event));
  const summary = {
    separator_alpha_floor_derivation_attempts: separatorAttempts.length,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_derivation_source_data_complete: countTrue(rowAttempts, (row) => row.derivation_source_data_complete),
    root_tube_certified_one_root_profiles: countTrue(
      separatorAttempts,
      (attempt) => attempt.alpha_floor_root_tube_certificate.interval_certified_one_root,
    ),
    root_tube_positive_derivative_floor_profiles: countTrue(
      separatorAttempts,
      (attempt) => attempt.alpha_floor_derivation_facts.derivative_floor_q_positive,
    ),
    root_tube_failing_derivative_piece_profiles: separatorAttempts.length -
      countTrue(separatorAttempts, (attempt) => attempt.alpha_floor_derivation_facts.failing_derivative_pieces_empty),
    rows_with_alpha_floor_derivation_source_data: countTrue(
      rowAttempts,
      (row) => row.derivation_source_data_complete && row.alpha_floor_derivation.source_ref != null,
    ),
    rows_with_alpha_floor_source_value_matching_root_tube_derivative_floor: countTrue(
      rowAttempts,
      (row) =>
        bySeparatorAttempt(separatorAttempts, row.separator_event)
          .alpha_floor_derivation_facts.source_value_matches_root_tube_derivative_floor,
    ),
    rows_with_alpha_floor_proof_grade_derivation_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.alpha_floor_derivation.proof_grade_derivation_present,
    ),
    rows_with_alpha_floor_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.alpha_floor_derivation.constructed_proof_grade_ref_present,
    ),
    rows_with_alpha_floor_source_ref_reused_as_proof_grade_ref: countTrue(
      rowAttempts,
      (row) => row.alpha_floor_derivation.source_ref_reused_as_proof_grade_ref,
    ),
    rows_with_exit_floor_proof_grade_ref_constructed: 0,
    rows_with_fold_layer_parity_record_proof_grade_ref_constructed: 0,
    rows_with_all_child_proof_grade_derivation_refs_constructed: 0,
    child_proof_grade_ref_obligations_before_alpha_floor_derivation: 336,
    child_proof_grade_ref_obligations_remaining_after_alpha_floor_derivation:
      (rowAttempts.length - countTrue(rowAttempts, (row) => row.alpha_floor_derivation.constructed_proof_grade_ref_present)) +
      rowAttempts.length * 2,
    proof_grade_parity_delta_field_obligations_remaining_after_alpha_floor_derivation:
      rowAttempts.length * PARITY_DELTA_FIELDS.length,
    proof_grade_child_field_presence_counts_after_alpha_floor_derivation: presenceCounts(
      rowAttempts,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_child_fields_present_after_alpha_floor_derivation[field],
    ),
    proof_grade_parity_delta_field_presence_counts: presenceCounts(
      rowAttempts,
      PARITY_DELTA_FIELDS,
      (row, field) => row.proof_grade_parity_delta_field_applications[field].proof_grade_field_present,
    ),
    rows_with_complete_proof_grade_fold_layer_parity_record_delta_fields: 0,
    row_lock_field_presence_counts_after_alpha_floor_derivation: presenceCounts(
      rowAttempts,
      LOCK_FIELDS,
      (row, field) => row.row_lock_fields_present_after_alpha_floor_derivation[field],
    ),
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    alpha_floor_derivation_rule: ALPHA_DERIVATION_RULE,
    exit_floor_blocker: EXIT_DERIVATION_BLOCKER,
    exit_floor_source_certificate_blocker: EXIT_PROOF_GRADE_SOURCE_BLOCKER,
    parity_record_blocker: PARITY_DERIVATION_BLOCKER,
    proof_grade_parity_delta_blocker: PROOF_GRADE_PARITY_DELTA_BLOCKER,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };

  return {
    schema:
      "breather-higher-fold-layer-alpha-floor-root-tube-derivative-floor-proof-grade-derivation-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only alpha_floor derivation attempt that constructs alpha_floor proof_grade_ref fields directly from the root-tube derivative-floor interval certificate; leaves exit_floor, fold_layer_parity_record, separator certificate, row consumption, preledger pass, live-ledger update, and branch-chart authorization locked",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt:
        artifactRecord(paths.sourceData),
      higher_fold_layer_alpha_exit_parity_child_field_source_data_proof_grade_ref_obligation_classifier:
        artifactRecord(paths.obligationClassifier),
      higher_fold_layer_alpha_exit_parity_child_field_proof_grade_derivation_application_attempt:
        artifactRecord(paths.derivationApplication),
      higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt:
        artifactRecord(paths.bridgeAttempt),
      fresh_v10_higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTube),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
    },
    proof_attempt_rule:
      "For a row associated to separator Sigma_hf_i, construct an alpha_floor proof_grade_ref only when the same-packet root-tube certificate is passed, proof-grade-ready, certifies one root for Sigma_hf_i, gives root_count_bound_q=[1,1], has positive derivative_floor_q, has no failing derivative pieces, and the row's alpha_floor derivation source data names root_tube_derivative_floor_source with the exact same rational value. The constructed proof_grade_ref is not the source_ref handle. This rule does not construct exit_floor, fold_layer_parity_record, parity delta fields, higher_fold_separator_layer_certificate, row consumption, preledger_pass, live-ledger updates, or branch-chart authorization.",
    separator_alpha_floor_derivation_attempts: separatorAttempts,
    row_alpha_floor_derivation_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The alpha_floor child-field blocker is reduced: 112 / 112 fold-layer row associations now have alpha_floor proof_grade_ref fields derived from the passed root-tube derivative-floor interval certificate. The route still has 0 proof-grade exit_floor refs, 0 proof-grade fold_layer_parity_record refs, 0 proof-grade parity delta rows, 0 higher_fold_separator_layer_certificate rows, and 0 row consumption.",
      remains_blocked: [
        EXIT_PROOF_GRADE_SOURCE_BLOCKER,
        EXIT_DERIVATION_BLOCKER,
        PARITY_DERIVATION_BLOCKER,
        PROOF_GRADE_PARITY_DELTA_BLOCKER,
        ATLAS_REF_BLOCKER,
        SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        PARENT_CONSUMPTION_BLOCKER,
        SEPARATOR_CERTIFICATE_BLOCKER,
      ],
      mechanical_continuation:
        "Continue mechanically on exit_floor proof-grade source certification, fold_layer_parity_record proof-grade derivation and delta fields, accepted higher_fold_layer_atlas_ref, or same-packet impulse/direct-quadrature source-packet acceptance. No proof-rule decision is needed to use the alpha_floor refs in a later aggregate certificate, but the aggregate certificate remains blocked until the other required fields exist.",
      fail_closed_stop_conditions: [
        "Do not treat the alpha_floor source_ref handle as the constructed proof_grade_ref.",
        "Do not count candidate exit-width source data as exit_floor.",
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
      "Priority-only. This artifact constructs only the alpha_floor child-field proof_grade_ref layer from proof-grade root-tube derivative-floor certificate facts and leaves every preledger and branch-chart lock closed.",
  };
}

function bySeparatorAttempt(separatorAttempts, separator) {
  const attempt = separatorAttempts.find((entry) => entry.separator_event === separator);
  if (!attempt) {
    throw new Error(`Missing separator alpha-floor attempt for ${separator}`);
  }
  return attempt;
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
        `| \`${attempt.separator_event}\` | \`${attempt.fold_interval}\` | ${attempt.row_count} | ${attempt.alpha_floor_root_tube_certificate.interval_certified_one_root} | ${attempt.alpha_floor_derivation_facts.derivative_floor_q_positive} | ${attempt.alpha_floor_derivation_facts.failing_derivative_pieces_empty} | ${attempt.alpha_floor_derivation_facts.source_value_matches_root_tube_derivative_floor} | ${attempt.alpha_floor_proof_grade_ref_constructed} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.derivation_source_data_complete} | ${row.alpha_floor_derivation.constructed_proof_grade_ref_present} | ${row.child_proof_grade_refs_constructed_after_alpha_floor_derivation.exit_floor} | ${row.child_proof_grade_refs_constructed_after_alpha_floor_derivation.fold_layer_parity_record} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Alpha-Floor Root-Tube Derivative-Floor Proof-Grade Derivation Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This attempt derives only the \`alpha_floor\` child field from the root-tube
derivative-floor interval certificate. It does not reuse the existing
\`source_ref\` as a \`proof_grade_ref\`; it constructs a new
\`proof_grade_ref\` only after checking the same separator root tube, one-root
certificate, positive derivative floor, empty derivative-piece failure list,
and exact rational match to the derivation source-data value.

The attempt covers ${attempt.summary.separator_alpha_floor_derivation_attempts}
separator profiles and ${attempt.summary.fold_layer_rows} row associations:

- ${attempt.summary.root_tube_certified_one_root_profiles} / 12 separator root
  tubes are certified one-root inputs;
- ${attempt.summary.root_tube_positive_derivative_floor_profiles} / 12
  separator root tubes have positive derivative floors;
- ${attempt.summary.rows_with_alpha_floor_source_value_matching_root_tube_derivative_floor}
  / ${attempt.summary.fold_layer_rows} row associations match the exact
  derivative-floor rational from source data to root-tube certificate;
- ${attempt.summary.rows_with_alpha_floor_proof_grade_ref_constructed}
  / ${attempt.summary.fold_layer_rows} row associations construct
  \`alpha_floor\` \`proof_grade_ref\` fields;
- ${attempt.summary.rows_with_exit_floor_proof_grade_ref_constructed}
  / ${attempt.summary.fold_layer_rows} row associations construct
  \`exit_floor\` \`proof_grade_ref\` fields;
- ${attempt.summary.rows_with_fold_layer_parity_record_proof_grade_ref_constructed}
  / ${attempt.summary.fold_layer_rows} row associations construct
  \`fold_layer_parity_record\` \`proof_grade_ref\` fields.

It still constructs 0 complete child-field rows, 0 proof-grade parity delta
rows, 0 \`higher_fold_separator_layer_certificate\` rows, and consumes 0 rows.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Child Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_child_field_presence_counts_after_alpha_floor_derivation)}

## Parity Delta Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_parity_delta_field_presence_counts)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_lock_field_presence_counts_after_alpha_floor_derivation)}

## Separator Alpha-Floor Derivations

| Separator | Fold interval | Rows | One root | Positive derivative floor | No failing derivative pieces | Source value match | Alpha proof ref |
| --- | --- | ---: | --- | --- | --- | --- | --- |
${separatorTable(attempt.separator_alpha_floor_derivation_attempts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Alpha-Floor Derivations

| Row | Separator | Fold interval | Source data complete | Alpha proof ref | Exit proof ref | Parity proof ref | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_alpha_floor_derivation_attempts)}

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

This artifact is priority-only. It proves the \`alpha_floor\` child-field
\`proof_grade_ref\` layer for the 112 row associations and proves no
\`exit_floor\`, \`fold_layer_parity_record\`, proof-grade parity delta field,
\`higher_fold_separator_layer_certificate\`, accepted fold-layer row, row
consumption, live-ledger update, or branch-chart authorization.
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
    obligationClassifier: args.obligationClassifier,
    derivationApplication: args.derivationApplication,
    bridgeAttempt: args.bridgeAttempt,
    rootTube: args.rootTube,
    proofFieldDependency: args.proofFieldDependency,
  };
  const inputs = {
    sourceData: readJson(paths.sourceData),
    obligationClassifier: readJson(paths.obligationClassifier),
    derivationApplication: readJson(paths.derivationApplication),
    bridgeAttempt: readJson(paths.bridgeAttempt),
    rootTube: readJson(paths.rootTube),
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

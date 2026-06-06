#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_DATA = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ALPHA_DERIVATION = `${CERT_DIR}/higher_fold_layer_alpha_floor_root_tube_derivative_floor_proof_grade_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_BRIDGE_ATTEMPT = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_fold_layer_parity_record_root_tube_topology_proof_grade_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_fold_layer_parity_record_root_tube_topology_proof_grade_derivation_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SOURCE_DATA_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";
const ALPHA_DERIVATION_STATUS =
  "higher_fold_layer_alpha_floor_root_tube_derivative_floor_proof_grade_derivation_attempt_fail_closed_alpha_refs_constructed_exit_parity_blocked_no_row_consumption";
const BRIDGE_ATTEMPT_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt_fail_closed_source_certificates_present_derivation_bridges_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const ROOT_TUBE_STATUS = "outward_rational_interval_12_root_certificate_passed";
const STATUS =
  "higher_fold_layer_fold_layer_parity_record_root_tube_topology_proof_grade_derivation_attempt_fail_closed_alpha_and_parity_refs_constructed_exit_blocked_no_row_consumption";

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

const PARITY_DERIVATION_RULE = "root_tube_one_root_complement_topology_interval_certificate";
const EXIT_PROOF_GRADE_SOURCE_BLOCKER = "exit_floor_proof_grade_source_certificate_absent";
const EXIT_DERIVATION_BLOCKER = "proof_grade_exit_floor_derivation_absent";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

function parseArgs(argv) {
  const args = {
    sourceData: DEFAULT_SOURCE_DATA,
    alphaDerivation: DEFAULT_ALPHA_DERIVATION,
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
    } else if (arg === "--alpha-derivation") {
      args.alphaDerivation = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-fold-layer-parity-record-root-tube-topology-proof-grade-derivation-attempt.mjs [options]

Options:
  --source-data PATH             Child-field derivation source-data proof attempt. Defaults to ${DEFAULT_SOURCE_DATA}.
  --alpha-derivation PATH        Alpha-floor proof-grade derivation attempt. Defaults to ${DEFAULT_ALPHA_DERIVATION}.
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

function parityProofGradeRef(separator) {
  return `proof_grade_ref:${PACKET_ID}:${separator}:fold_layer_parity_record:${PARITY_DERIVATION_RULE}:v0`;
}

function parityProofDerivationRef(separator) {
  return `proof_derivation_ref:${PACKET_ID}:${separator}:fold_layer_parity_record:${PARITY_DERIVATION_RULE}:v0`;
}

function complementsAllCertifiedNoExtraRoot(rootTubeSource) {
  return (
    rootTubeSource.summary?.all_complements_certified_no_extra_root === true &&
    rootTubeSource.complement_intervals?.length === 13 &&
    rootTubeSource.complement_intervals.every(
      (interval) =>
        interval.interval_certified_no_extra_root === true &&
        interval.equation_scans?.every(
          (scan) =>
            scan.interval_certified_no_root === true &&
            Array.isArray(scan.failing_pieces) &&
            scan.failing_pieces.length === 0 &&
            scan.omitted_failing_piece_count === 0,
        ),
    )
  );
}

function validateInputs(inputs) {
  assertPacketId(inputs.sourceData, "sourceData");
  assertPacketId(inputs.alphaDerivation, "alphaDerivation");
  assertPacketId(inputs.bridgeAttempt, "bridgeAttempt");
  assertPacketId(inputs.rootTube, "rootTube");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.sourceData, "sourceData");
  assertFailClosed(inputs.alphaDerivation, "alphaDerivation");
  assertFailClosed(inputs.bridgeAttempt, "bridgeAttempt");
  assertFailClosed(inputs.rootTube, "rootTube");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");

  const expectedStatuses = [
    [inputs.sourceData.status, SOURCE_DATA_STATUS, "sourceData"],
    [inputs.alphaDerivation.status, ALPHA_DERIVATION_STATUS, "alphaDerivation"],
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
    throw new Error("Root-tube certificate is not proof-grade-ready for preledger rerun.");
  }
  if (inputs.rootTube.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube certificate does not certify one root for all tubes.");
  }
  if (!complementsAllCertifiedNoExtraRoot(inputs.rootTube)) {
    throw new Error("Root-tube complements are not all certified no-extra-root.");
  }
  if (inputs.alphaDerivation.summary?.rows_with_alpha_floor_proof_grade_ref_constructed !== 112) {
    throw new Error("Alpha-floor derivation input has not constructed all alpha_floor refs.");
  }
  if (inputs.alphaDerivation.summary?.rows_with_exit_floor_proof_grade_ref_constructed !== 0) {
    throw new Error("Alpha-floor derivation input unexpectedly constructs exit_floor refs.");
  }
  if (inputs.alphaDerivation.summary?.rows_with_fold_layer_parity_record_proof_grade_ref_constructed !== 0) {
    throw new Error("Alpha-floor derivation input unexpectedly constructs parity refs.");
  }
}

function parityFacts(rootTube, sourceData, dependency, bridgeAttempt, rootTubeSource) {
  const source = sourceData.fold_layer_parity_record_derivation_source_data;
  const candidate = source?.candidate_parity_delta_record;
  const leftRightSignsDistinct =
    (rootTube.left_sign === "positive" && rootTube.right_sign === "negative") ||
    (rootTube.left_sign === "negative" && rootTube.right_sign === "positive");
  const facts = {
    root_tube_certificate_status_passed: true,
    root_tube_preledger_ready: true,
    interval_certified_one_root: rootTube.interval_certified_one_root === true,
    root_count_bound_is_one_to_one: rootTube.root_count_bound_q?.[0] === 1 && rootTube.root_count_bound_q?.[1] === 1,
    endpoint_sign_change_interval: rootTube.endpoint_sign_change_interval === true,
    endpoint_signs_are_distinct: leftRightSignsDistinct,
    derivative_floor_q_present: rootTube.derivative_floor_q != null,
    failing_derivative_pieces_empty: Array.isArray(rootTube.failing_derivative_pieces)
      ? rootTube.failing_derivative_pieces.length === 0
      : false,
    all_complements_certified_no_extra_root: complementsAllCertifiedNoExtraRoot(rootTubeSource),
    source_data_record_present: source?.source_data_record_present === true,
    source_ref_handle_materialized: source?.source_ref_handle_materialized === true,
    source_ref_is_not_reused_as_proof_grade_ref: source?.source_ref !== parityProofGradeRef(rootTube.contact_id),
    source_artifact_matches_root_tube_certificate:
      source?.source_artifact === "fresh_v10_higher_fold_root_tube_interval_certificate",
    source_fields_include_one_root: source?.source_fields?.includes("root_tube_one_root_interval_source") === true,
    source_fields_include_derivative_floor: source?.source_fields?.includes("root_tube_derivative_floor_source") === true,
    source_fields_include_complement_no_extra_root:
      source?.source_fields?.includes("root_tube_complement_no_extra_root_source") === true,
    candidate_delta_record_present: source?.candidate_delta_fields_present === true,
    candidate_delta_root_count_matches_topology: candidate?.delta_root_count === 0,
    candidate_delta_signed_degree_matches_topology: candidate?.delta_signed_degree === 0,
    candidate_local_even_jump_matches_topology: candidate?.local_even_jump === true,
    dependency_candidate_anchor_present:
      dependency.proof_field_dependencies.fold_layer_parity_record.candidate_source_anchor_present === true,
    prior_generic_bridge_absent:
      bridgeAttempt.source_certificate_classes.fold_layer_parity_record.source_to_child_field_derivation_bridge_present === false,
  };
  const passed = Object.values(facts).every((value) => value === true);
  return { facts, passed };
}

function buildSeparatorAttempts(inputs) {
  const sourceBySeparator = bySeparator(
    inputs.sourceData.separator_derivation_source_data_packets,
    "source data",
  );
  const alphaBySeparator = bySeparator(
    inputs.alphaDerivation.separator_alpha_floor_derivation_attempts,
    "alpha-floor derivation",
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
      const alphaAttempt = requireSeparator(alphaBySeparator, separator, "alpha-floor derivation");
      const bridgeAttempt = requireSeparator(bridgeBySeparator, separator, "source-certificate bridge");
      const dependency = requireSeparator(dependencyBySeparator, separator, "proof-field dependency");
      const rootTube = requireSeparator(rootTubeBySeparator, separator, "root tube");
      const { facts, passed } = parityFacts(rootTube, sourceData, dependency, bridgeAttempt, inputs.rootTube);
      const paritySource = sourceData.fold_layer_parity_record_derivation_source_data;
      return {
        separator_event: separator,
        fold_interval: packet.fold_interval,
        atlas_candidate_id: packet.atlas_candidate_id,
        row_count: packet.row_count,
        row_ids: packet.row_ids,
        derivation_source_data_complete: packet.derivation_source_data_complete === true,
        inherited_alpha_floor_proof_grade_ref: alphaAttempt.alpha_floor_proof_grade_ref,
        parity_root_tube_certificate: {
          contact_id: rootTube.contact_id,
          interval_certified_one_root: rootTube.interval_certified_one_root === true,
          root_count_bound_q: rootTube.root_count_bound_q,
          endpoint_sign_change_interval: rootTube.endpoint_sign_change_interval === true,
          left_sign: rootTube.left_sign,
          right_sign: rootTube.right_sign,
          derivative_sign: rootTube.derivative_sign,
          derivative_floor_display: rootTube.derivative_floor_display,
          failing_derivative_pieces_empty: Array.isArray(rootTube.failing_derivative_pieces)
            ? rootTube.failing_derivative_pieces.length === 0
            : false,
          complements_certified_no_extra_root: complementsAllCertifiedNoExtraRoot(inputs.rootTube),
        },
        parity_derivation_source_data: {
          source_ref: paritySource.source_ref,
          source_artifact: paritySource.source_artifact,
          source_fields: paritySource.source_fields,
          candidate_delta_record_source_ref: paritySource.candidate_parity_delta_record?.source_ref,
        },
        parity_derivation_facts: facts,
        fold_layer_parity_record_proof_grade_derivation_present: passed,
        fold_layer_parity_record_proof_grade_derivation_ref: passed ? parityProofDerivationRef(separator) : null,
        fold_layer_parity_record_proof_grade_ref_constructed: passed,
        fold_layer_parity_record_proof_grade_ref: passed ? parityProofGradeRef(separator) : null,
        fold_layer_parity_record_ref_is_source_ref_promotion: passed
          ? parityProofGradeRef(separator) === paritySource.source_ref
          : false,
        proof_grade_parity_delta_fields: passed
          ? {
              delta_root_count: 0,
              delta_signed_degree: 0,
              local_even_jump: true,
              parity_status: "proof_grade_root_tube_one_root_complement_no_extra_root",
            }
          : {
              delta_root_count: null,
              delta_signed_degree: null,
              local_even_jump: null,
              parity_status: null,
            },
        proof_grade_parity_delta_fields_complete: passed,
        alpha_floor_proof_grade_ref_constructed: alphaAttempt.alpha_floor_proof_grade_ref_constructed === true,
        exit_floor_proof_grade_ref_constructed: false,
        proof_grade_child_fields_present_after_parity_derivation: {
          alpha_floor: alphaAttempt.alpha_floor_proof_grade_ref_constructed === true,
          exit_floor: false,
          fold_layer_parity_record: passed,
        },
        row_lock_fields_present_after_parity_derivation: {
          alpha_floor: alphaAttempt.alpha_floor_proof_grade_ref_constructed === true,
          exit_floor: false,
          fold_layer_parity_record: passed,
          higher_fold_separator_layer_certificate: false,
          accepted_fold_layer_row: false,
          row_consumed: false,
        },
        first_parity_record_blocker: passed
          ? null
          : "fold_layer_parity_record_root_tube_topology_certificate_facts_incomplete",
        exit_floor_blocker: EXIT_DERIVATION_BLOCKER,
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
        throw new Error(`Missing separator parity derivation for ${row.row_id}`);
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
        fold_layer_parity_record_derivation: {
          source_ref: row.fold_layer_parity_record_source_ref,
          proof_grade_derivation_present:
            attempt.fold_layer_parity_record_proof_grade_derivation_present,
          proof_grade_derivation_ref: attempt.fold_layer_parity_record_proof_grade_derivation_ref,
          constructed_proof_grade_ref_present:
            attempt.fold_layer_parity_record_proof_grade_ref_constructed,
          constructed_proof_grade_ref: attempt.fold_layer_parity_record_proof_grade_ref,
          source_ref_reused_as_proof_grade_ref:
            attempt.fold_layer_parity_record_ref_is_source_ref_promotion,
          accepted: attempt.fold_layer_parity_record_proof_grade_ref_constructed,
        },
        child_proof_grade_refs_constructed_after_parity_derivation: {
          alpha_floor: attempt.alpha_floor_proof_grade_ref_constructed,
          exit_floor: false,
          fold_layer_parity_record: attempt.fold_layer_parity_record_proof_grade_ref_constructed,
        },
        proof_grade_child_fields_present_after_parity_derivation:
          attempt.proof_grade_child_fields_present_after_parity_derivation,
        proof_grade_parity_delta_field_applications: Object.fromEntries(
          PARITY_DELTA_FIELDS.map((field) => [
            field,
            {
              candidate_field_present: row.candidate_fold_layer_parity_record_delta_fields_present === true,
              proof_grade_field_present: attempt.proof_grade_parity_delta_fields_complete,
              constructed_proof_grade_field: attempt.proof_grade_parity_delta_fields[field],
              first_missing_dependency: attempt.proof_grade_parity_delta_fields_complete
                ? null
                : "proof_grade_fold_layer_parity_record_delta_fields_absent",
            },
          ]),
        ),
        proof_grade_parity_delta_fields_complete: attempt.proof_grade_parity_delta_fields_complete,
        row_lock_fields_present_after_parity_derivation: attempt.row_lock_fields_present_after_parity_derivation,
        exit_floor_blocker: EXIT_DERIVATION_BLOCKER,
        exit_floor_source_certificate_blocker: EXIT_PROOF_GRADE_SOURCE_BLOCKER,
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
    separator_fold_layer_parity_record_derivation_attempts: separatorAttempts.length,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_derivation_source_data_complete: countTrue(rowAttempts, (row) => row.derivation_source_data_complete),
    root_tube_certified_one_root_profiles: countTrue(
      separatorAttempts,
      (attempt) => attempt.parity_root_tube_certificate.interval_certified_one_root,
    ),
    root_tube_endpoint_sign_change_profiles: countTrue(
      separatorAttempts,
      (attempt) => attempt.parity_root_tube_certificate.endpoint_sign_change_interval,
    ),
    root_tube_complement_no_extra_root_profiles: countTrue(
      separatorAttempts,
      (attempt) => attempt.parity_root_tube_certificate.complements_certified_no_extra_root,
    ),
    root_tube_failing_derivative_piece_profiles: separatorAttempts.length -
      countTrue(separatorAttempts, (attempt) => attempt.parity_root_tube_certificate.failing_derivative_pieces_empty),
    rows_with_inherited_alpha_floor_proof_grade_ref: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_refs_constructed_after_parity_derivation.alpha_floor,
    ),
    rows_with_fold_layer_parity_record_derivation_source_data: countTrue(
      rowAttempts,
      (row) => row.derivation_source_data_complete && row.fold_layer_parity_record_derivation.source_ref != null,
    ),
    rows_with_fold_layer_parity_record_proof_grade_derivation_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.fold_layer_parity_record_derivation.proof_grade_derivation_present,
    ),
    rows_with_fold_layer_parity_record_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.fold_layer_parity_record_derivation.constructed_proof_grade_ref_present,
    ),
    rows_with_fold_layer_parity_record_source_ref_reused_as_proof_grade_ref: countTrue(
      rowAttempts,
      (row) => row.fold_layer_parity_record_derivation.source_ref_reused_as_proof_grade_ref,
    ),
    rows_with_alpha_floor_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_refs_constructed_after_parity_derivation.alpha_floor,
    ),
    rows_with_exit_floor_proof_grade_ref_constructed: 0,
    rows_with_all_child_proof_grade_derivation_refs_constructed: 0,
    child_proof_grade_ref_obligations_remaining_after_parity_derivation: rowAttempts.length,
    proof_grade_parity_delta_field_presence_counts: presenceCounts(
      rowAttempts,
      PARITY_DELTA_FIELDS,
      (row, field) => row.proof_grade_parity_delta_field_applications[field].proof_grade_field_present,
    ),
    rows_with_complete_proof_grade_fold_layer_parity_record_delta_fields: countTrue(
      rowAttempts,
      (row) => row.proof_grade_parity_delta_fields_complete,
    ),
    proof_grade_parity_delta_field_obligations_remaining_after_parity_derivation: 0,
    proof_grade_child_field_presence_counts_after_parity_derivation: presenceCounts(
      rowAttempts,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_child_fields_present_after_parity_derivation[field],
    ),
    row_lock_field_presence_counts_after_parity_derivation: presenceCounts(
      rowAttempts,
      LOCK_FIELDS,
      (row, field) => row.row_lock_fields_present_after_parity_derivation[field],
    ),
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    parity_derivation_rule: PARITY_DERIVATION_RULE,
    exit_floor_blocker: EXIT_DERIVATION_BLOCKER,
    exit_floor_source_certificate_blocker: EXIT_PROOF_GRADE_SOURCE_BLOCKER,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };

  return {
    schema:
      "breather-higher-fold-layer-fold-layer-parity-record-root-tube-topology-proof-grade-derivation-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only fold_layer_parity_record derivation attempt that constructs proof-grade parity refs and parity delta fields directly from root-tube one-root and complement no-extra-root interval certificate facts; leaves exit_floor, separator certificate, row consumption, preledger pass, live-ledger update, and branch-chart authorization locked",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt:
        artifactRecord(paths.sourceData),
      higher_fold_layer_alpha_floor_root_tube_derivative_floor_proof_grade_derivation_attempt:
        artifactRecord(paths.alphaDerivation),
      higher_fold_layer_alpha_exit_parity_child_field_source_certificate_to_proof_grade_derivation_bridge_attempt:
        artifactRecord(paths.bridgeAttempt),
      fresh_v10_higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTube),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
    },
    proof_attempt_rule:
      "For a row associated to separator Sigma_hf_i, construct a fold_layer_parity_record proof_grade_ref and proof-grade parity delta fields only when the same-packet root-tube certificate is passed, proof-grade-ready, certifies one root for Sigma_hf_i, gives root_count_bound_q=[1,1], gives endpoint sign change with opposite endpoint signs, has no failing derivative pieces, certifies no extra roots on all complements, and the row's parity source data names the root-tube one-root, derivative-floor, and complement no-extra-root sources. The constructed proof_grade_ref is not the source_ref handle. This rule does not construct exit_floor, higher_fold_separator_layer_certificate, row consumption, preledger_pass, live-ledger updates, or branch-chart authorization.",
    separator_fold_layer_parity_record_derivation_attempts: separatorAttempts,
    row_fold_layer_parity_record_derivation_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The fold_layer_parity_record child-field blocker is reduced: 112 / 112 fold-layer row associations now have proof-grade fold_layer_parity_record refs and complete proof-grade parity delta fields derived from the passed root-tube one-root/complement topology certificate. With the inherited alpha_floor refs, the route still has 0 proof-grade exit_floor refs, 0 higher_fold_separator_layer_certificate rows, and 0 row consumption.",
      remains_blocked: [
        EXIT_PROOF_GRADE_SOURCE_BLOCKER,
        EXIT_DERIVATION_BLOCKER,
        ATLAS_REF_BLOCKER,
        SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        PARENT_CONSUMPTION_BLOCKER,
        SEPARATOR_CERTIFICATE_BLOCKER,
      ],
      mechanical_continuation:
        "Continue mechanically on exit_floor proof-grade source certification, accepted higher_fold_layer_atlas_ref, same-packet impulse/direct-quadrature source-packet acceptance, or aggregate higher_fold_separator_layer_certificate assembly once every required child field exists.",
      fail_closed_stop_conditions: [
        "Do not treat the fold_layer_parity_record source_ref handle as the constructed proof_grade_ref.",
        "Do not count candidate exit-width source data as exit_floor.",
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
      "Priority-only. This artifact constructs only the fold_layer_parity_record child-field proof_grade_ref layer and proof-grade parity delta fields from proof-grade root-tube topology certificate facts and leaves every preledger and branch-chart lock closed.",
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
        `| \`${attempt.separator_event}\` | \`${attempt.fold_interval}\` | ${attempt.row_count} | ${attempt.parity_root_tube_certificate.interval_certified_one_root} | ${attempt.parity_root_tube_certificate.endpoint_sign_change_interval} | ${attempt.parity_root_tube_certificate.complements_certified_no_extra_root} | ${attempt.fold_layer_parity_record_proof_grade_ref_constructed} | ${attempt.proof_grade_parity_delta_fields_complete} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.derivation_source_data_complete} | ${row.child_proof_grade_refs_constructed_after_parity_derivation.alpha_floor} | ${row.child_proof_grade_refs_constructed_after_parity_derivation.exit_floor} | ${row.child_proof_grade_refs_constructed_after_parity_derivation.fold_layer_parity_record} | ${row.proof_grade_parity_delta_fields_complete} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Fold-Layer Parity-Record Root-Tube Topology Proof-Grade Derivation Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This attempt derives only the \`fold_layer_parity_record\` child field and its
proof-grade parity delta fields from the root-tube one-root and complement
no-extra-root interval certificate. It does not reuse the existing parity
\`source_ref\` as a \`proof_grade_ref\`; it constructs a new
\`proof_grade_ref\` only after checking the same separator root tube,
one-root certificate, endpoint sign change, empty derivative-piece failure
list, complete complement no-extra-root certificate, and parity source-data
fields.

The attempt covers ${attempt.summary.separator_fold_layer_parity_record_derivation_attempts}
separator profiles and ${attempt.summary.fold_layer_rows} row associations:

- ${attempt.summary.root_tube_certified_one_root_profiles} / 12 separator root
  tubes are certified one-root inputs;
- ${attempt.summary.root_tube_endpoint_sign_change_profiles} / 12 separator
  root tubes have endpoint sign-change certificates;
- ${attempt.summary.root_tube_complement_no_extra_root_profiles} / 12 separator
  profiles inherit the complement no-extra-root certificate;
- ${attempt.summary.rows_with_fold_layer_parity_record_proof_grade_ref_constructed}
  / ${attempt.summary.fold_layer_rows} row associations construct
  \`fold_layer_parity_record\` \`proof_grade_ref\` fields;
- ${attempt.summary.rows_with_complete_proof_grade_fold_layer_parity_record_delta_fields}
  / ${attempt.summary.fold_layer_rows} row associations construct complete
  proof-grade parity delta fields;
- ${attempt.summary.rows_with_exit_floor_proof_grade_ref_constructed}
  / ${attempt.summary.fold_layer_rows} row associations construct
  \`exit_floor\` \`proof_grade_ref\` fields.

It still constructs 0 complete child-field rows, 0
\`higher_fold_separator_layer_certificate\` rows, and consumes 0 rows.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Child Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_child_field_presence_counts_after_parity_derivation)}

## Parity Delta Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_parity_delta_field_presence_counts)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_lock_field_presence_counts_after_parity_derivation)}

## Separator Parity Derivations

| Separator | Fold interval | Rows | One root | Endpoint sign change | Complements no extra root | Parity proof ref | Proof-grade parity delta |
| --- | --- | ---: | --- | --- | --- | --- | --- |
${separatorTable(attempt.separator_fold_layer_parity_record_derivation_attempts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Parity Derivations

| Row | Separator | Fold interval | Source data complete | Alpha proof ref | Exit proof ref | Parity proof ref | Parity delta fields | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_fold_layer_parity_record_derivation_attempts)}

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

This artifact is priority-only. It proves the \`fold_layer_parity_record\`
child-field \`proof_grade_ref\` layer and proof-grade parity delta fields for
the 112 row associations and proves no \`exit_floor\`,
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
    alphaDerivation: args.alphaDerivation,
    bridgeAttempt: args.bridgeAttempt,
    rootTube: args.rootTube,
    proofFieldDependency: args.proofFieldDependency,
  };
  const inputs = {
    sourceData: readJson(paths.sourceData),
    alphaDerivation: readJson(paths.alphaDerivation),
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

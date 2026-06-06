#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_EXIT_SOURCE_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_exit_floor_interval_width_source_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PARITY_DERIVATION = `${CERT_DIR}/higher_fold_layer_fold_layer_parity_record_root_tube_topology_proof_grade_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_exit_floor_interval_width_proof_grade_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_exit_floor_interval_width_proof_grade_derivation_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const EXIT_SOURCE_CERTIFICATE_STATUS =
  "higher_fold_layer_exit_floor_interval_width_source_certificate_attempt_fail_closed_exit_source_certificates_constructed_exit_refs_absent_no_row_consumption";
const PARITY_DERIVATION_STATUS =
  "higher_fold_layer_fold_layer_parity_record_root_tube_topology_proof_grade_derivation_attempt_fail_closed_alpha_and_parity_refs_constructed_exit_blocked_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_exit_floor_interval_width_proof_grade_derivation_attempt_fail_closed_all_child_refs_constructed_separator_blocked_no_row_consumption";

const CHILD_FIELDS = ["alpha_floor", "exit_floor", "fold_layer_parity_record"];
const LOCK_FIELDS = [
  "alpha_floor",
  "exit_floor",
  "fold_layer_parity_record",
  "higher_fold_separator_layer_certificate",
  "accepted_fold_layer_row",
  "row_consumed",
];

const EXIT_DERIVATION_RULE = "min_source_rectangle_width_interval_certificate_to_exit_floor_child_field_derivation";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

function parseArgs(argv) {
  const args = {
    exitSourceCertificate: DEFAULT_EXIT_SOURCE_CERTIFICATE,
    parityDerivation: DEFAULT_PARITY_DERIVATION,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--exit-source-certificate") {
      args.exitSourceCertificate = argv[++index];
    } else if (arg === "--parity-derivation") {
      args.parityDerivation = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-exit-floor-interval-width-proof-grade-derivation-attempt.mjs [options]

Options:
  --exit-source-certificate PATH  Exit-floor interval-width source-certificate attempt. Defaults to ${DEFAULT_EXIT_SOURCE_CERTIFICATE}.
  --parity-derivation PATH        Parity-record proof-grade derivation attempt. Defaults to ${DEFAULT_PARITY_DERIVATION}.
  --proof-field-dependency PATH   Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
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

function proofGradeRef(separator) {
  return `proof_grade_ref:${PACKET_ID}:${separator}:exit_floor:${EXIT_DERIVATION_RULE}:v0`;
}

function proofDerivationRef(separator) {
  return `proof_derivation_ref:${PACKET_ID}:${separator}:exit_floor:${EXIT_DERIVATION_RULE}:v0`;
}

function validateInputs(inputs) {
  assertPacketId(inputs.exitSourceCertificate, "exitSourceCertificate");
  assertPacketId(inputs.parityDerivation, "parityDerivation");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.exitSourceCertificate, "exitSourceCertificate");
  assertFailClosed(inputs.parityDerivation, "parityDerivation");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");

  const expectedStatuses = [
    [inputs.exitSourceCertificate.status, EXIT_SOURCE_CERTIFICATE_STATUS, "exitSourceCertificate"],
    [inputs.parityDerivation.status, PARITY_DERIVATION_STATUS, "parityDerivation"],
    [inputs.proofFieldDependency.status, PROOF_FIELD_DEPENDENCY_STATUS, "proofFieldDependency"],
  ];
  for (const [actual, expected, name] of expectedStatuses) {
    if (actual !== expected) {
      throw new Error(`${name} is not at the expected status.`);
    }
  }
  if (inputs.exitSourceCertificate.summary?.rows_with_exit_floor_proof_grade_source_certificate !== 112) {
    throw new Error("Exit source-certificate input has not constructed all exit source certificates.");
  }
  if (inputs.exitSourceCertificate.summary?.rows_with_exit_floor_proof_grade_ref_constructed !== 0) {
    throw new Error("Exit source-certificate input unexpectedly constructs exit_floor refs.");
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

function exitFacts(sourceCertificate, parityAttempt, dependency) {
  const factValues = Object.values(sourceCertificate.exit_floor_source_certificate_facts ?? {});
  const facts = {
    exit_source_certificate_present:
      sourceCertificate.exit_floor_proof_grade_source_certificate_present === true,
    source_certificate_ref_present:
      typeof sourceCertificate.exit_floor_proof_grade_source_certificate_ref === "string" &&
      sourceCertificate.exit_floor_proof_grade_source_certificate_ref.startsWith(
        `proof_source_certificate_ref:${PACKET_ID}:${sourceCertificate.separator_event}:exit_floor:`,
      ),
    all_exit_source_certificate_facts_true:
      factValues.length > 0 && factValues.every((value) => value === true),
    source_ref_not_reused_as_source_certificate:
      sourceCertificate.exit_floor_source_ref_is_source_certificate_promotion === false,
    source_certificate_ref_is_not_proof_grade_ref:
      sourceCertificate.exit_floor_proof_grade_source_certificate_ref !== proofGradeRef(sourceCertificate.separator_event),
    prior_exit_floor_proof_ref_absent:
      sourceCertificate.exit_floor_proof_grade_ref_constructed === false,
    inherited_alpha_floor_ref_present:
      parityAttempt.alpha_floor_proof_grade_ref_constructed === true &&
      typeof sourceCertificate.inherited_alpha_floor_proof_grade_ref === "string",
    inherited_parity_record_ref_present:
      parityAttempt.fold_layer_parity_record_proof_grade_ref_constructed === true &&
      typeof sourceCertificate.inherited_fold_layer_parity_record_proof_grade_ref === "string",
    dependency_candidate_anchor_present:
      dependency.proof_field_dependencies.exit_floor.candidate_source_anchor_present === true,
  };
  const passed = Object.values(facts).every((value) => value === true);
  return { facts, passed };
}

function buildSeparatorAttempts(inputs) {
  const exitBySeparator = bySeparator(
    inputs.exitSourceCertificate.separator_exit_floor_source_certificate_attempts,
    "exit source certificate",
  );
  const parityBySeparator = bySeparator(
    inputs.parityDerivation.separator_fold_layer_parity_record_derivation_attempts,
    "parity derivation",
  );
  const dependencyBySeparator = bySeparator(
    inputs.proofFieldDependency.separator_dependency_profiles,
    "proof-field dependency",
  );

  return [...inputs.exitSourceCertificate.separator_exit_floor_source_certificate_attempts]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((packet) => {
      const separator = packet.separator_event;
      const sourceCertificate = requireSeparator(exitBySeparator, separator, "exit source certificate");
      const parityAttempt = requireSeparator(parityBySeparator, separator, "parity derivation");
      const dependency = requireSeparator(dependencyBySeparator, separator, "proof-field dependency");
      const { facts, passed } = exitFacts(sourceCertificate, parityAttempt, dependency);
      return {
        separator_event: separator,
        fold_interval: packet.fold_interval,
        atlas_candidate_id: packet.atlas_candidate_id,
        row_count: packet.row_count,
        row_ids: packet.row_ids,
        derivation_source_data_complete: packet.derivation_source_data_complete === true,
        inherited_alpha_floor_proof_grade_ref: sourceCertificate.inherited_alpha_floor_proof_grade_ref,
        inherited_fold_layer_parity_record_proof_grade_ref:
          sourceCertificate.inherited_fold_layer_parity_record_proof_grade_ref,
        exit_floor_interval_width_source_certificate: {
          source_ref: sourceCertificate.exit_floor_interval_width_source.source_ref,
          proof_grade_source_certificate_ref:
            sourceCertificate.exit_floor_proof_grade_source_certificate_ref,
          min_source_rectangle_width_q:
            sourceCertificate.exit_floor_interval_width_source.min_source_rectangle_width_q,
          layer_theta_width_q: sourceCertificate.exit_floor_interval_width_source.layer_theta_width_q,
          input_screen_theta_width_q:
            sourceCertificate.exit_floor_interval_width_source.input_screen_theta_width_q,
          mesh_preledger_theta_width_q:
            sourceCertificate.exit_floor_interval_width_source.mesh_preledger_theta_width_q,
        },
        exit_floor_derivation_facts: facts,
        exit_floor_proof_grade_derivation_present: passed,
        exit_floor_proof_grade_derivation_ref: passed ? proofDerivationRef(separator) : null,
        exit_floor_proof_grade_ref_constructed: passed,
        exit_floor_proof_grade_ref: passed ? proofGradeRef(separator) : null,
        exit_floor_source_certificate_ref_is_proof_grade_ref_promotion: passed
          ? sourceCertificate.exit_floor_proof_grade_source_certificate_ref === proofGradeRef(separator)
          : false,
        alpha_floor_proof_grade_ref_constructed:
          parityAttempt.alpha_floor_proof_grade_ref_constructed === true,
        fold_layer_parity_record_proof_grade_ref_constructed:
          parityAttempt.fold_layer_parity_record_proof_grade_ref_constructed === true,
        proof_grade_child_fields_present_after_exit_floor_derivation: {
          alpha_floor: parityAttempt.alpha_floor_proof_grade_ref_constructed === true,
          exit_floor: passed,
          fold_layer_parity_record:
            parityAttempt.fold_layer_parity_record_proof_grade_ref_constructed === true,
        },
        row_lock_fields_present_after_exit_floor_derivation: {
          alpha_floor: parityAttempt.alpha_floor_proof_grade_ref_constructed === true,
          exit_floor: passed,
          fold_layer_parity_record:
            parityAttempt.fold_layer_parity_record_proof_grade_ref_constructed === true,
          higher_fold_separator_layer_certificate: false,
          accepted_fold_layer_row: false,
          row_consumed: false,
        },
        first_exit_floor_blocker: passed
          ? null
          : "exit_floor_interval_width_source_certificate_derivation_facts_incomplete",
        atlas_ref_blocker: ATLAS_REF_BLOCKER,
        source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
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
  return [...inputs.exitSourceCertificate.row_exit_floor_source_certificate_attempts]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const attempt = bySeparatorAttempt.get(row.separator_event);
      if (!attempt) {
        throw new Error(`Missing separator exit-floor derivation for ${row.row_id}`);
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
        exit_floor_derivation: {
          source_ref: row.exit_floor_source_certificate.source_ref,
          proof_grade_source_certificate_present:
            row.exit_floor_source_certificate.proof_grade_source_certificate_present,
          proof_grade_source_certificate_ref:
            row.exit_floor_source_certificate.proof_grade_source_certificate_ref,
          proof_grade_derivation_present: attempt.exit_floor_proof_grade_derivation_present,
          proof_grade_derivation_ref: attempt.exit_floor_proof_grade_derivation_ref,
          constructed_proof_grade_ref_present: attempt.exit_floor_proof_grade_ref_constructed,
          constructed_proof_grade_ref: attempt.exit_floor_proof_grade_ref,
          source_certificate_ref_reused_as_proof_grade_ref:
            attempt.exit_floor_source_certificate_ref_is_proof_grade_ref_promotion,
          accepted: attempt.exit_floor_proof_grade_ref_constructed,
        },
        child_proof_grade_refs_constructed_after_exit_floor_derivation: {
          alpha_floor: attempt.alpha_floor_proof_grade_ref_constructed,
          exit_floor: attempt.exit_floor_proof_grade_ref_constructed,
          fold_layer_parity_record: attempt.fold_layer_parity_record_proof_grade_ref_constructed,
        },
        proof_grade_child_fields_present_after_exit_floor_derivation:
          attempt.proof_grade_child_fields_present_after_exit_floor_derivation,
        row_lock_fields_present_after_exit_floor_derivation:
          attempt.row_lock_fields_present_after_exit_floor_derivation,
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
    separator_exit_floor_derivation_attempts: separatorAttempts.length,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_derivation_source_data_complete: countTrue(rowAttempts, (row) => row.derivation_source_data_complete),
    rows_with_inherited_alpha_floor_proof_grade_ref: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_refs_constructed_after_exit_floor_derivation.alpha_floor,
    ),
    rows_with_inherited_fold_layer_parity_record_proof_grade_ref: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_refs_constructed_after_exit_floor_derivation.fold_layer_parity_record,
    ),
    rows_with_exit_floor_proof_grade_source_certificate: countTrue(
      rowAttempts,
      (row) => row.exit_floor_derivation.proof_grade_source_certificate_present,
    ),
    rows_with_exit_floor_proof_grade_derivation_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.exit_floor_derivation.proof_grade_derivation_present,
    ),
    rows_with_exit_floor_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.exit_floor_derivation.constructed_proof_grade_ref_present,
    ),
    rows_with_exit_floor_source_certificate_ref_reused_as_proof_grade_ref: countTrue(
      rowAttempts,
      (row) => row.exit_floor_derivation.source_certificate_ref_reused_as_proof_grade_ref,
    ),
    rows_with_alpha_floor_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_refs_constructed_after_exit_floor_derivation.alpha_floor,
    ),
    rows_with_fold_layer_parity_record_proof_grade_ref_constructed: countTrue(
      rowAttempts,
      (row) => row.child_proof_grade_refs_constructed_after_exit_floor_derivation.fold_layer_parity_record,
    ),
    rows_with_all_child_proof_grade_derivation_refs_constructed: countTrue(
      rowAttempts,
      (row) =>
        row.child_proof_grade_refs_constructed_after_exit_floor_derivation.alpha_floor &&
        row.child_proof_grade_refs_constructed_after_exit_floor_derivation.exit_floor &&
        row.child_proof_grade_refs_constructed_after_exit_floor_derivation.fold_layer_parity_record,
    ),
    child_proof_grade_ref_obligations_remaining_after_exit_floor_derivation: 0,
    proof_grade_child_field_presence_counts_after_exit_floor_derivation: presenceCounts(
      rowAttempts,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_child_fields_present_after_exit_floor_derivation[field],
    ),
    row_lock_field_presence_counts_after_exit_floor_derivation: presenceCounts(
      rowAttempts,
      LOCK_FIELDS,
      (row, field) => row.row_lock_fields_present_after_exit_floor_derivation[field],
    ),
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    exit_floor_derivation_rule: EXIT_DERIVATION_RULE,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };
  if (summary.rows_with_exit_floor_proof_grade_ref_constructed !== rowAttempts.length) {
    throw new Error("Exit-floor proof-grade derivation did not construct all exit_floor refs.");
  }
  if (summary.rows_with_exit_floor_source_certificate_ref_reused_as_proof_grade_ref !== 0) {
    throw new Error("Exit-floor proof-grade derivation reused a source-certificate ref.");
  }
  if (
    summary.row_consumption_count !== 0 ||
    summary.preledger_pass_rows !== 0 ||
    summary.branch_chart_authorized_rows !== 0 ||
    summary.rows_with_higher_fold_separator_layer_certificate !== 0
  ) {
    throw new Error("Exit-floor proof-grade derivation violated fail-closed row locks.");
  }

  return {
    schema: "breather-higher-fold-layer-exit-floor-interval-width-proof-grade-derivation-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only exit_floor derivation attempt that constructs exit_floor proof_grade_ref fields directly from proof-grade interval-width source certificates; leaves separator certificate, accepted atlas-ref, impulse/direct-quadrature bound, parent-complement consumption, row consumption, preledger pass, live-ledger update, and branch-chart authorization locked",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_exit_floor_interval_width_source_certificate_attempt:
        artifactRecord(paths.exitSourceCertificate),
      higher_fold_layer_fold_layer_parity_record_root_tube_topology_proof_grade_derivation_attempt:
        artifactRecord(paths.parityDerivation),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
    },
    proof_attempt_rule:
      "For a row associated to separator Sigma_hf_i, construct an exit_floor proof_grade_ref only when the proof-grade exit_floor interval-width source certificate is present, every source-certificate fact is true, the source-certificate ref is distinct from the constructed proof_grade_ref, inherited alpha_floor and fold_layer_parity_record proof_grade_ref fields are present, and the proof-field dependency classifier still records the exit_floor candidate anchor. This attempt does not construct higher_fold_separator_layer_certificate, accepted higher_fold_layer_atlas_ref, same_packet_fold_impulse_or_direct_quadrature_bound, parent_complement_consumption_ref, accepted_fold_layer_row, row consumption, preledger_pass, live-ledger updates, or branch-chart authorization.",
    separator_exit_floor_derivation_attempts: separatorAttempts,
    row_exit_floor_derivation_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The exit_floor child-field blocker is reduced: 112 / 112 fold-layer row associations now have exit_floor proof_grade_ref fields derived from proof-grade interval-width source certificates. With inherited alpha_floor and fold_layer_parity_record refs, 112 / 112 row associations now have all three child-field proof_grade_ref fields, but 0 higher_fold_separator_layer_certificate rows and 0 row consumption.",
      remains_blocked: [
        ATLAS_REF_BLOCKER,
        SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        PARENT_CONSUMPTION_BLOCKER,
        SEPARATOR_CERTIFICATE_BLOCKER,
      ],
      mechanical_continuation:
        "Continue mechanically on accepted higher_fold_layer_atlas_ref, same-packet impulse/direct-quadrature source-packet acceptance, parent_complement_consumption_ref, and aggregate higher_fold_separator_layer_certificate assembly. No fold-layer row may be consumed until the aggregate separator certificate exists and the preledger row rule accepts it.",
      fail_closed_stop_conditions: [
        "Do not treat the exit_floor proof-grade source-certificate ref as the constructed proof_grade_ref.",
        "Do not treat complete child-field proof_grade_ref coverage as a higher_fold_separator_layer_certificate.",
        "Do not set accepted_fold_layer_row, row_consumed, preledger_pass, updates_live_ledger, or branch_chart_authorized from this attempt.",
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
      "Priority-only. This artifact constructs only the exit_floor child-field proof_grade_ref layer from proof-grade interval-width source-certificate facts and leaves every preledger and branch-chart lock closed.",
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
        `| \`${attempt.separator_event}\` | \`${attempt.fold_interval}\` | ${attempt.row_count} | ${attempt.exit_floor_proof_grade_derivation_present} | ${attempt.exit_floor_proof_grade_ref_constructed} | ${attempt.exit_floor_source_certificate_ref_is_proof_grade_ref_promotion} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.child_proof_grade_refs_constructed_after_exit_floor_derivation.alpha_floor} | ${row.child_proof_grade_refs_constructed_after_exit_floor_derivation.exit_floor} | ${row.child_proof_grade_refs_constructed_after_exit_floor_derivation.fold_layer_parity_record} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Exit-Floor Interval-Width Proof-Grade Derivation Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This attempt derives \`exit_floor\` \`proof_grade_ref\` fields from the
proof-grade interval-width source certificates. It does not reuse the
\`proof_source_certificate_ref\` as the \`proof_grade_ref\`, and it does not
construct a \`higher_fold_separator_layer_certificate\`.

The attempt covers ${attempt.summary.separator_exit_floor_derivation_attempts}
separator profiles and ${attempt.summary.fold_layer_rows} row associations:

- ${attempt.summary.rows_with_exit_floor_proof_grade_source_certificate}
  / ${attempt.summary.fold_layer_rows} row associations have proof-grade
  \`exit_floor\` source certificates;
- ${attempt.summary.rows_with_exit_floor_proof_grade_ref_constructed}
  / ${attempt.summary.fold_layer_rows} row associations construct
  \`exit_floor\` \`proof_grade_ref\` fields;
- ${attempt.summary.rows_with_all_child_proof_grade_derivation_refs_constructed}
  / ${attempt.summary.fold_layer_rows} row associations now carry all three
  child-field \`proof_grade_ref\` fields;
- ${attempt.summary.rows_with_higher_fold_separator_layer_certificate}
  / ${attempt.summary.fold_layer_rows} row associations construct
  \`higher_fold_separator_layer_certificate\` fields.

It still consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Child Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_child_field_presence_counts_after_exit_floor_derivation)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_lock_field_presence_counts_after_exit_floor_derivation)}

## Separator Exit-Floor Derivations

| Separator | Fold interval | Rows | Derivation ref | Exit proof ref | Source-certificate ref reused |
| --- | --- | ---: | --- | --- | --- |
${separatorTable(attempt.separator_exit_floor_derivation_attempts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Exit-Floor Derivations

| Row | Separator | Fold interval | Alpha proof ref | Exit proof ref | Parity proof ref | Row consumed |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_exit_floor_derivation_attempts)}

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

This artifact is priority-only. It proves the \`exit_floor\` child-field
\`proof_grade_ref\` layer for the 112 row associations and proves no
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
    exitSourceCertificate: args.exitSourceCertificate,
    parityDerivation: args.parityDerivation,
    proofFieldDependency: args.proofFieldDependency,
  };
  const inputs = {
    exitSourceCertificate: readJson(paths.exitSourceCertificate),
    parityDerivation: readJson(paths.parityDerivation),
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

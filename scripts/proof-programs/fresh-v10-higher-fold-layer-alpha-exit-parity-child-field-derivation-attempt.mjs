#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CHILD_DIAGNOSTIC = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_ATTEMPT = `${CERT_DIR}/higher_fold_layer_separator_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_STALE_FOLD_LAYER_ATLAS = `${CERT_DIR}/fold_layer_atlas.json`;
const DEFAULT_STALE_FOLD_IMPULSE_CONSTANTS = `${CERT_DIR}/fold_impulse_constants.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const CHILD_DIAGNOSTIC_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic_fail_closed_candidate_child_sources_present_proof_grade_child_derivations_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const SEPARATOR_ATTEMPT_STATUS =
  "higher_fold_layer_separator_certificate_attempt_fail_closed_candidate_source_complete_diagnostic_impulse_constants_rejected_no_accepted_atlas_ref_no_row_consumption";
const STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt_fail_closed_candidate_child_sources_present_derivation_refs_and_delta_fields_absent_no_row_consumption";

const ALPHA_BLOCKER = "alpha_floor_proof_grade_ref_null";
const EXIT_BLOCKER = "exit_floor_proof_grade_ref_null";
const PARITY_REF_BLOCKER = "fold_layer_parity_record_proof_grade_ref_null";
const PARITY_DELTA_BLOCKER = "fresh_fold_layer_parity_record_delta_fields_absent";
const STALE_PARITY_BLOCKER = "stale_static_parity_packet_not_fresh_higher_fold";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

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

function parseArgs(argv) {
  const args = {
    childDiagnostic: DEFAULT_CHILD_DIAGNOSTIC,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    separatorAttempt: DEFAULT_SEPARATOR_ATTEMPT,
    staleFoldLayerAtlas: DEFAULT_STALE_FOLD_LAYER_ATLAS,
    staleFoldImpulseConstants: DEFAULT_STALE_FOLD_IMPULSE_CONSTANTS,
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
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
    } else if (arg === "--separator-attempt") {
      args.separatorAttempt = argv[++index];
    } else if (arg === "--stale-fold-layer-atlas") {
      args.staleFoldLayerAtlas = argv[++index];
    } else if (arg === "--stale-fold-impulse-constants") {
      args.staleFoldImpulseConstants = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-alpha-exit-parity-child-field-derivation-attempt.mjs [options]

Options:
  --child-diagnostic PATH          Alpha/exit/parity child-field interval diagnostic. Defaults to ${DEFAULT_CHILD_DIAGNOSTIC}.
  --proof-field-dependency PATH    Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --separator-attempt PATH         Separator certificate attempt. Defaults to ${DEFAULT_SEPARATOR_ATTEMPT}.
  --stale-fold-layer-atlas PATH    Historical static fold-layer atlas. Defaults to ${DEFAULT_STALE_FOLD_LAYER_ATLAS}.
  --stale-fold-impulse-constants PATH Historical diagnostic fold impulse constants. Defaults to ${DEFAULT_STALE_FOLD_IMPULSE_CONSTANTS}.
  --out-dir PATH                   Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                         Pretty-print JSON artifact.
  --help                           Show this help.`);
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

function hasOwn(object, field) {
  return Object.prototype.hasOwnProperty.call(object ?? {}, field);
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

function validateInputs(inputs) {
  assertPacketId(inputs.childDiagnostic, "childDiagnostic");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertPacketId(inputs.separatorAttempt, "separatorAttempt");
  assertFailClosed(inputs.childDiagnostic, "childDiagnostic");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.separatorAttempt, "separatorAttempt");

  if (inputs.childDiagnostic.status !== CHILD_DIAGNOSTIC_STATUS) {
    throw new Error("Child-field interval diagnostic is not at the expected fail-closed status.");
  }
  if (inputs.proofFieldDependency.status !== PROOF_FIELD_DEPENDENCY_STATUS) {
    throw new Error("Proof-field dependency classifier is not at the expected fail-closed status.");
  }
  if (inputs.separatorAttempt.status !== SEPARATOR_ATTEMPT_STATUS) {
    throw new Error("Separator certificate attempt is not at the expected fail-closed status.");
  }
  if (inputs.childDiagnostic.summary?.separator_child_witness_profiles !== 12) {
    throw new Error("Expected 12 separator child witness profiles.");
  }
  if (inputs.childDiagnostic.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows.");
  }
  if (inputs.childDiagnostic.summary?.separators_with_candidate_child_witness_sources_complete !== 12) {
    throw new Error("Expected candidate child witness sources for all 12 separators.");
  }
  if (inputs.childDiagnostic.summary?.rows_with_candidate_child_witness_sources_complete !== 112) {
    throw new Error("Expected candidate child witness sources for all 112 rows.");
  }
  for (const field of CHILD_FIELDS) {
    const dependencyCount = inputs.proofFieldDependency.summary?.proof_field_dependency_counts?.[field];
    if (dependencyCount?.candidate_source_anchor_present !== 12) {
      throw new Error(`Expected candidate source anchors for ${field} on all 12 separators.`);
    }
    if (dependencyCount?.proof_grade_present !== 0) {
      throw new Error(`Unexpected proof-grade ${field} in dependency classifier.`);
    }
  }
  if (inputs.separatorAttempt.summary?.rows_with_proof_grade_alpha_floor !== 0) {
    throw new Error("Separator attempt already contains proof-grade alpha_floor rows.");
  }
  if (inputs.separatorAttempt.summary?.rows_with_proof_grade_exit_floor !== 0) {
    throw new Error("Separator attempt already contains proof-grade exit_floor rows.");
  }
  if (inputs.separatorAttempt.summary?.rows_with_proof_grade_fold_layer_parity_record !== 0) {
    throw new Error("Separator attempt already contains proof-grade fold_layer_parity_record rows.");
  }
}

function staleSourceAudit(staleFoldLayerAtlas, staleFoldImpulseConstants) {
  return {
    fold_layer_atlas: {
      packet_id: staleFoldLayerAtlas.packet_id ?? null,
      status: staleFoldLayerAtlas.status ?? null,
      packet_matches_higher_fold: staleFoldLayerAtlas.packet_id === PACKET_ID,
      parity_fields_present: Array.isArray(staleFoldLayerAtlas.fold_layers)
        ? staleFoldLayerAtlas.fold_layers.filter((layer) => PARITY_DELTA_FIELDS.every((field) => hasOwn(layer.parity, field))).length
        : 0,
      rejected_for_current_derivation: staleFoldLayerAtlas.packet_id !== PACKET_ID,
      first_rejection_reason: staleFoldLayerAtlas.packet_id === PACKET_ID ? null : STALE_PARITY_BLOCKER,
    },
    fold_impulse_constants: {
      packet_id: staleFoldImpulseConstants.packet_id ?? null,
      status: staleFoldImpulseConstants.status ?? null,
      packet_matches_higher_fold: staleFoldImpulseConstants.packet_id === PACKET_ID,
      separator_keys: Object.keys(staleFoldImpulseConstants.separators ?? {}).sort(),
      parity_fields_present: Object.values(staleFoldImpulseConstants.separators ?? {}).filter((separator) =>
        hasOwn(separator.parity, "delta_root_count") && hasOwn(separator.parity, "delta_signed_degree"),
      ).length,
      rejected_for_current_derivation: staleFoldImpulseConstants.packet_id !== PACKET_ID,
      first_rejection_reason: staleFoldImpulseConstants.packet_id === PACKET_ID ? null : STALE_PARITY_BLOCKER,
    },
  };
}

function buildSeparatorAttempts(inputs) {
  const dependencyBySeparator = new Map(
    inputs.proofFieldDependency.separator_dependency_profiles.map((profile) => [profile.separator_event, profile]),
  );

  return [...inputs.childDiagnostic.separator_child_witness_profiles]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((witness) => {
      const dependency = dependencyBySeparator.get(witness.separator_event);
      if (!dependency) {
        throw new Error(`Missing proof-field dependency profile for ${witness.separator_event}`);
      }
      const alphaDependency = dependency.proof_field_dependencies.alpha_floor;
      const exitDependency = dependency.proof_field_dependencies.exit_floor;
      const parityDependency = dependency.proof_field_dependencies.fold_layer_parity_record;
      const paritySource = witness.candidate_parity_source;
      const freshParityDeltaFieldPresence = Object.fromEntries(
        PARITY_DELTA_FIELDS.map((field) => [field, hasOwn(paritySource, field)]),
      );

      return {
        separator_event: witness.separator_event,
        fold_interval: witness.fold_interval,
        atlas_candidate_id: witness.atlas_candidate_id,
        row_count: witness.row_count,
        row_ids: witness.row_ids,
        candidate_child_witness_sources_complete: witness.candidate_child_witness_sources_complete === true,
        alpha_floor_derivation_attempt: {
          candidate_source_positive: witness.candidate_alpha_floor_source.positive === true,
          candidate_source_field: witness.candidate_alpha_floor_source.source_field,
          candidate_derivative_floor_q: witness.candidate_alpha_floor_source.derivative_floor_q,
          dependency_candidate_source_anchor_present: alphaDependency.candidate_source_anchor_present === true,
          dependency_proof_grade_present: alphaDependency.proof_grade_present === true,
          dependency_proof_grade_ref: alphaDependency.proof_grade_ref ?? null,
          accepted: false,
          first_missing_dependency: ALPHA_BLOCKER,
        },
        exit_floor_derivation_attempt: {
          candidate_source_width_positive: witness.candidate_exit_floor_source.positive_source_width === true,
          candidate_source_fields: witness.candidate_exit_floor_source.source_fields,
          min_source_rectangle_width_q: witness.candidate_exit_floor_source.min_source_rectangle_width_q,
          dependency_candidate_source_anchor_present: exitDependency.candidate_source_anchor_present === true,
          dependency_proof_grade_present: exitDependency.proof_grade_present === true,
          dependency_proof_grade_ref: exitDependency.proof_grade_ref ?? null,
          accepted: false,
          first_missing_dependency: EXIT_BLOCKER,
        },
        fold_layer_parity_record_derivation_attempt: {
          candidate_parity_source_complete: paritySource.source_complete === true,
          dependency_candidate_source_anchor_present: parityDependency.candidate_source_anchor_present === true,
          dependency_proof_grade_present: parityDependency.proof_grade_present === true,
          dependency_proof_grade_ref: parityDependency.proof_grade_ref ?? null,
          fresh_delta_field_presence: freshParityDeltaFieldPresence,
          fresh_delta_fields_present: PARITY_DELTA_FIELDS.every((field) => freshParityDeltaFieldPresence[field] === true),
          accepted: false,
          first_missing_dependency: PARITY_REF_BLOCKER,
          delta_field_blocker: PARITY_DELTA_BLOCKER,
        },
        proof_grade_child_fields_present_after_derivation_attempt: falseFieldMap(CHILD_FIELDS),
        higher_fold_separator_layer_certificate_present: false,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowAttempts(inputs, separatorAttempts) {
  const separatorById = new Map(separatorAttempts.map((attempt) => [attempt.separator_event, attempt]));
  return [...inputs.childDiagnostic.row_child_witness_profiles]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const separatorAttempt = separatorById.get(row.separator_event);
      if (!separatorAttempt) {
        throw new Error(`Missing separator derivation attempt for ${row.row_id}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        candidate_child_witness_sources_complete: row.candidate_child_witness_sources_complete === true,
        alpha_floor_derivation_ref_present: false,
        exit_floor_derivation_ref_present: false,
        fold_layer_parity_record_derivation_ref_present: false,
        fresh_fold_layer_parity_record_delta_fields_present:
          separatorAttempt.fold_layer_parity_record_derivation_attempt.fresh_delta_fields_present,
        proof_grade_fields_present_after_derivation_attempt: falseFieldMap(LOCK_FIELDS),
        first_alpha_floor_derivation_blocker: ALPHA_BLOCKER,
        first_exit_floor_derivation_blocker: EXIT_BLOCKER,
        first_parity_record_derivation_blocker: PARITY_REF_BLOCKER,
        parity_record_delta_blocker: PARITY_DELTA_BLOCKER,
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
  const staleAudit = staleSourceAudit(inputs.staleFoldLayerAtlas, inputs.staleFoldImpulseConstants);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowAttempts, (row) => row.separator_event));

  const summary = {
    separator_derivation_attempts: separatorAttempts.length,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_candidate_child_witness_sources_complete: countTrue(
      separatorAttempts,
      (attempt) => attempt.candidate_child_witness_sources_complete,
    ),
    rows_with_candidate_child_witness_sources_complete: countTrue(
      rowAttempts,
      (row) => row.candidate_child_witness_sources_complete,
    ),
    separators_with_alpha_floor_derivation_ref: countTrue(
      separatorAttempts,
      (attempt) => attempt.alpha_floor_derivation_attempt.dependency_proof_grade_ref !== null,
    ),
    rows_with_alpha_floor_derivation_ref: countTrue(rowAttempts, (row) => row.alpha_floor_derivation_ref_present),
    separators_with_exit_floor_derivation_ref: countTrue(
      separatorAttempts,
      (attempt) => attempt.exit_floor_derivation_attempt.dependency_proof_grade_ref !== null,
    ),
    rows_with_exit_floor_derivation_ref: countTrue(rowAttempts, (row) => row.exit_floor_derivation_ref_present),
    separators_with_fold_layer_parity_record_derivation_ref: countTrue(
      separatorAttempts,
      (attempt) => attempt.fold_layer_parity_record_derivation_attempt.dependency_proof_grade_ref !== null,
    ),
    rows_with_fold_layer_parity_record_derivation_ref: countTrue(
      rowAttempts,
      (row) => row.fold_layer_parity_record_derivation_ref_present,
    ),
    fresh_parity_delta_field_presence_counts: presenceCounts(
      separatorAttempts,
      PARITY_DELTA_FIELDS,
      (attempt, field) => attempt.fold_layer_parity_record_derivation_attempt.fresh_delta_field_presence[field],
    ),
    separators_with_complete_fresh_fold_layer_parity_record_delta_fields: countTrue(
      separatorAttempts,
      (attempt) => attempt.fold_layer_parity_record_derivation_attempt.fresh_delta_fields_present,
    ),
    rows_with_complete_fresh_fold_layer_parity_record_delta_fields: countTrue(
      rowAttempts,
      (row) => row.fresh_fold_layer_parity_record_delta_fields_present,
    ),
    proof_grade_child_field_presence_counts_after_derivation_attempt: presenceCounts(
      rowAttempts,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_fields_present_after_derivation_attempt[field],
    ),
    row_lock_field_presence_counts: presenceCounts(
      rowAttempts,
      LOCK_FIELDS,
      (row, field) => row.proof_grade_fields_present_after_derivation_attempt[field],
    ),
    stale_static_parity_sources_rejected:
      staleAudit.fold_layer_atlas.rejected_for_current_derivation &&
      staleAudit.fold_impulse_constants.rejected_for_current_derivation,
    first_alpha_floor_derivation_blocker: ALPHA_BLOCKER,
    first_exit_floor_derivation_blocker: EXIT_BLOCKER,
    first_parity_record_derivation_blocker: PARITY_REF_BLOCKER,
    parity_record_delta_blocker: PARITY_DELTA_BLOCKER,
    stale_parity_source_blocker: STALE_PARITY_BLOCKER,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    min_candidate_alpha_floor_source_q: inputs.childDiagnostic.summary.min_candidate_alpha_floor_source_q,
    min_candidate_exit_source_rectangle_width_q: inputs.childDiagnostic.summary.min_candidate_exit_source_rectangle_width_q,
  };

  return {
    schema: "breather-higher-fold-layer-alpha-exit-parity-child-field-derivation-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only child-field derivation attempt for the 12 higher-fold separator-layer profiles; confirms complete candidate alpha/exit/parity sources while proving the fresh packet lacks alpha_floor and exit_floor proof-grade refs plus explicit fold_layer_parity_record delta fields, with no row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic: artifactRecord(paths.childDiagnostic),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      higher_fold_layer_separator_certificate_attempt: artifactRecord(paths.separatorAttempt),
      stale_fold_layer_atlas: artifactRecord(paths.staleFoldLayerAtlas),
      stale_fold_impulse_constants: artifactRecord(paths.staleFoldImpulseConstants),
    },
    attempt_rule:
      "Candidate positive derivative floors, positive source rectangle widths, and root-tube one-root evidence are necessary source evidence only. This attempt accepts alpha_floor or exit_floor only with a non-null proof_grade_ref in the fresh higher-fold proof-field dependency entry, and accepts fold_layer_parity_record only with a non-null proof_grade_ref plus explicit fresh delta_root_count, delta_signed_degree, local_even_jump, and parity_status fields. Historical seed-packet fold-layer atlas or diagnostic constants are rejected for this fresh higher-fold derivation.",
    stale_source_audit: staleAudit,
    separator_derivation_attempts: separatorAttempts,
    row_derivation_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      mechanical_child_field_targets: [
        "supply a fresh alpha_floor proof_grade_ref binding the positive root_tube_derivative_floor_source to a proof-grade row field",
        "supply a fresh exit_floor proof_grade_ref binding the positive same-packet source-rectangle width to a proof-grade row field",
        "construct a fresh fold_layer_parity_record proof_grade_ref with explicit delta_root_count, delta_signed_degree, local_even_jump, and parity_status fields",
      ],
      parallel_blocker:
        "the accepted atlas-ref, impulse/direct-quadrature, and parent-complement child fields remain separately absent, with impulse/direct-quadrature blocked by the fixed-parameter separator-aggregate acceptance rule",
      final_certificate_target:
        "same-packet interval-certified higher_fold_separator_layer_certificate carrying accepted higher_fold_layer_atlas_ref, alpha_floor, exit_floor, same_packet_fold_impulse_or_direct_quadrature_bound, fold_layer_parity_record, and parent_complement_consumption_ref for Sigma_hf_01 through Sigma_hf_12",
      continuation_class:
        "mechanical only on constructing explicit fresh proof_grade_ref and parity delta records; not mechanical through source-packet acceptance without a proof-rule or accepted constants artifact",
      fail_closed_stop_conditions: [
        "Do not count candidate derivative floors as proof-grade alpha_floor without a fresh proof_grade_ref.",
        "Do not count positive source rectangle widths as proof-grade exit_floor without a fresh proof_grade_ref.",
        "Do not count root-tube one-root evidence or stale static parity data as fold_layer_parity_record without fresh delta fields.",
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
      "Priority-only. This artifact sharpens the child-field derivation side of the fold-layer blocker by proving the missing fresh proof_grade_ref and parity delta fields, while rejecting stale seed-packet parity evidence.",
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
    .map((attempt) => {
      const alpha = attempt.alpha_floor_derivation_attempt;
      const exit = attempt.exit_floor_derivation_attempt;
      const parity = attempt.fold_layer_parity_record_derivation_attempt;
      return `| \`${attempt.separator_event}\` | \`${attempt.fold_interval}\` | ${attempt.row_count} | ${alpha.candidate_source_positive} | ${alpha.dependency_proof_grade_ref !== null} | ${exit.candidate_source_width_positive} | ${exit.dependency_proof_grade_ref !== null} | ${parity.candidate_parity_source_complete} | ${parity.fresh_delta_fields_present} | ${parity.dependency_proof_grade_ref !== null} |`;
    })
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.candidate_child_witness_sources_complete} | ${row.alpha_floor_derivation_ref_present} | ${row.exit_floor_derivation_ref_present} | ${row.fold_layer_parity_record_derivation_ref_present} | ${row.fresh_fold_layer_parity_record_delta_fields_present} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function staleSourceTable(audit) {
  return [
    `| \`fold_layer_atlas\` | \`${audit.fold_layer_atlas.packet_id}\` | \`${audit.fold_layer_atlas.status}\` | ${audit.fold_layer_atlas.packet_matches_higher_fold} | ${audit.fold_layer_atlas.parity_fields_present} | ${audit.fold_layer_atlas.rejected_for_current_derivation} | \`${audit.fold_layer_atlas.first_rejection_reason}\` |`,
    `| \`fold_impulse_constants\` | \`${audit.fold_impulse_constants.packet_id}\` | \`${audit.fold_impulse_constants.status}\` | ${audit.fold_impulse_constants.packet_matches_higher_fold} | ${audit.fold_impulse_constants.parity_fields_present} | ${audit.fold_impulse_constants.rejected_for_current_derivation} | \`${audit.fold_impulse_constants.first_rejection_reason}\` |`,
  ].join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Alpha/Exit/Parity Child-Field Derivation Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This attempt starts from the child-field interval diagnostic and asks whether
the available candidate sources can be promoted to proof-grade child fields by
existing fresh derivation refs and parity delta records. The source side is
complete: ${attempt.summary.separators_with_candidate_child_witness_sources_complete} / ${attempt.summary.separator_derivation_attempts}
separator profiles and ${attempt.summary.rows_with_candidate_child_witness_sources_complete} / ${attempt.summary.fold_layer_rows}
fold-layer rows still carry candidate \`alpha_floor\`, \`exit_floor\`, and
\`fold_layer_parity_record\` sources.

The minimum candidate alpha source remains
\`${attempt.summary.min_candidate_alpha_floor_source_q.display}\`. The minimum
exit-source rectangle width remains
\`${attempt.summary.min_candidate_exit_source_rectangle_width_q.display}\`.

The blocker is now sharpened to explicit missing fresh fields:

- alpha child field: \`${attempt.summary.first_alpha_floor_derivation_blocker}\`;
- exit child field: \`${attempt.summary.first_exit_floor_derivation_blocker}\`;
- parity child field: \`${attempt.summary.first_parity_record_derivation_blocker}\`;
- parity delta record: \`${attempt.summary.parity_record_delta_blocker}\`;
- stale parity rejection: \`${attempt.summary.stale_parity_source_blocker}\`;
- accepted atlas ref:
  \`${attempt.summary.atlas_ref_blocker}\`;
- impulse/direct-quadrature source packet:
  \`${attempt.summary.source_packet_acceptance_blocker}\`;
- parent-complement consumption ref:
  \`${attempt.summary.parent_complement_consumption_ref_blocker}\`;
- separator certificate:
  \`${attempt.summary.first_separator_certificate_blocker}\`.

This artifact accepts none of those fields. It records 0 / ${attempt.summary.fold_layer_rows}
rows with proof-grade \`alpha_floor\`, proof-grade \`exit_floor\`, proof-grade
\`fold_layer_parity_record\`, \`higher_fold_separator_layer_certificate\`, row
consumption, \`preledger_pass\`, live-ledger update, or branch-chart
authorization.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Stale Source Audit

| Source | Packet | Status | Packet matches fresh higher-fold | Parity fields present | Rejected | First rejection reason |
| --- | --- | --- | --- | ---: | --- | --- |
${staleSourceTable(attempt.stale_source_audit)}

## Separator Derivation Attempts

| Separator | Fold interval | Rows | Alpha source positive | Alpha proof_grade_ref | Exit source positive | Exit proof_grade_ref | Parity source complete | Fresh parity delta fields | Parity proof_grade_ref |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
${separatorTable(attempt.separator_derivation_attempts)}

## Fresh Parity Delta Field Presence

| Field | Present separators | Missing separators |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.fresh_parity_delta_field_presence_counts)}

## Proof-Grade Child Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_child_field_presence_counts_after_derivation_attempt)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_lock_field_presence_counts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Derivation Attempts

| Row | Separator | Fold interval | Candidate witnesses complete | Alpha proof_grade_ref | Exit proof_grade_ref | Parity proof_grade_ref | Fresh parity delta fields | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_derivation_attempts)}

## Certificate-Side Handoff

Mechanical child-field targets:

${attempt.next_certificate_handoff.mechanical_child_field_targets.map((item) => `- ${item}.`).join("\n")}

Parallel blocker: ${attempt.next_certificate_handoff.parallel_blocker}.

Final certificate target:
\`${attempt.next_certificate_handoff.final_certificate_target}\`.

Continuation class: ${attempt.next_certificate_handoff.continuation_class}.

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
    childDiagnostic: args.childDiagnostic,
    proofFieldDependency: args.proofFieldDependency,
    separatorAttempt: args.separatorAttempt,
    staleFoldLayerAtlas: args.staleFoldLayerAtlas,
    staleFoldImpulseConstants: args.staleFoldImpulseConstants,
  };
  const inputs = {
    childDiagnostic: readJson(paths.childDiagnostic),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    separatorAttempt: readJson(paths.separatorAttempt),
    staleFoldLayerAtlas: readJson(paths.staleFoldLayerAtlas),
    staleFoldImpulseConstants: readJson(paths.staleFoldImpulseConstants),
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

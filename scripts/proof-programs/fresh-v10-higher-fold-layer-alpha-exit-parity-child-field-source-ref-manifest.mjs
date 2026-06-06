#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DERIVATION_ATTEMPT = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CHILD_DIAGNOSTIC = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_alpha_exit_parity_child_field_source_ref_manifest.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_alpha_exit_parity_child_field_source_ref_manifest_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const DERIVATION_ATTEMPT_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt_fail_closed_candidate_child_sources_present_derivation_refs_and_delta_fields_absent_no_row_consumption";
const CHILD_DIAGNOSTIC_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic_fail_closed_candidate_child_sources_present_proof_grade_child_derivations_absent_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_ref_manifest_fail_closed_candidate_source_refs_and_parity_delta_candidates_materialized_proof_grade_refs_absent_no_row_consumption";

const SOURCE_REF_PROMOTION_BLOCKER = "child_field_source_ref_handle_not_proof_grade_ref";
const PARITY_DELTA_BLOCKER = "candidate_parity_delta_record_not_proof_grade_ref";
const PROOF_GRADE_PARITY_DELTA_BLOCKER = "proof_grade_fold_layer_parity_record_delta_fields_absent";
const CANDIDATE_PARITY_STATUS = "candidate_root_tube_one_root_complement_no_extra_root";
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
    derivationAttempt: DEFAULT_DERIVATION_ATTEMPT,
    childDiagnostic: DEFAULT_CHILD_DIAGNOSTIC,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    rootTube: DEFAULT_ROOT_TUBE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--derivation-attempt") {
      args.derivationAttempt = argv[++index];
    } else if (arg === "--child-diagnostic") {
      args.childDiagnostic = argv[++index];
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
    } else if (arg === "--root-tube") {
      args.rootTube = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-alpha-exit-parity-child-field-source-ref-manifest.mjs [options]

Options:
  --derivation-attempt PATH    Alpha/exit/parity child-field derivation attempt. Defaults to ${DEFAULT_DERIVATION_ATTEMPT}.
  --child-diagnostic PATH      Alpha/exit/parity child-field interval diagnostic. Defaults to ${DEFAULT_CHILD_DIAGNOSTIC}.
  --proof-field-dependency PATH Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --root-tube PATH             Higher-fold root-tube interval certificate. Defaults to ${DEFAULT_ROOT_TUBE}.
  --out-dir PATH               Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                     Pretty-print JSON artifact.
  --help                       Show this help.`);
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

function sourceRef(separator, field, sourceKind) {
  return `source_ref:${PACKET_ID}:${separator}:${field}:${sourceKind}`;
}

function validateInputs(inputs) {
  assertPacketId(inputs.derivationAttempt, "derivationAttempt");
  assertPacketId(inputs.childDiagnostic, "childDiagnostic");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertPacketId(inputs.rootTube, "rootTube");
  assertFailClosed(inputs.derivationAttempt, "derivationAttempt");
  assertFailClosed(inputs.childDiagnostic, "childDiagnostic");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");

  if (inputs.derivationAttempt.status !== DERIVATION_ATTEMPT_STATUS) {
    throw new Error("Derivation attempt is not at the expected fail-closed status.");
  }
  if (inputs.childDiagnostic.status !== CHILD_DIAGNOSTIC_STATUS) {
    throw new Error("Child-field interval diagnostic is not at the expected fail-closed status.");
  }
  if (inputs.proofFieldDependency.status !== PROOF_FIELD_DEPENDENCY_STATUS) {
    throw new Error("Proof-field dependency classifier is not at the expected fail-closed status.");
  }
  if (inputs.rootTube.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube interval source is not certified as one root per separator.");
  }
  if (inputs.rootTube.summary?.all_complements_certified_no_extra_root !== true) {
    throw new Error("Root-tube complement source is not certified as no extra root.");
  }
  if (inputs.derivationAttempt.summary?.separator_derivation_attempts !== 12) {
    throw new Error("Expected 12 separator derivation attempts.");
  }
  if (inputs.derivationAttempt.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in derivation attempt.");
  }
  if (inputs.derivationAttempt.summary?.rows_with_candidate_child_witness_sources_complete !== 112) {
    throw new Error("Expected complete candidate child witness sources for all rows.");
  }
  if (inputs.derivationAttempt.summary?.rows_with_alpha_floor_derivation_ref !== 0) {
    throw new Error("Derivation attempt already has alpha_floor proof refs.");
  }
  if (inputs.derivationAttempt.summary?.rows_with_exit_floor_derivation_ref !== 0) {
    throw new Error("Derivation attempt already has exit_floor proof refs.");
  }
  if (inputs.derivationAttempt.summary?.rows_with_fold_layer_parity_record_derivation_ref !== 0) {
    throw new Error("Derivation attempt already has fold_layer_parity_record proof refs.");
  }
}

function buildSeparatorManifests(inputs) {
  const witnessBySeparator = bySeparator(inputs.childDiagnostic.separator_child_witness_profiles, "child witness");
  const dependencyBySeparator = bySeparator(inputs.proofFieldDependency.separator_dependency_profiles, "proof dependency");
  const rootTubeBySeparator = new Map(inputs.rootTube.root_tubes.map((tube) => [tube.contact_id, tube]));

  return [...inputs.derivationAttempt.separator_derivation_attempts]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((attempt) => {
      const witness = requireSeparator(witnessBySeparator, attempt.separator_event, "child witness");
      const dependency = requireSeparator(dependencyBySeparator, attempt.separator_event, "proof dependency");
      const rootTube = rootTubeBySeparator.get(attempt.separator_event);
      if (!rootTube) {
        throw new Error(`Missing root tube for ${attempt.separator_event}`);
      }

      const alphaDependency = dependency.proof_field_dependencies.alpha_floor;
      const exitDependency = dependency.proof_field_dependencies.exit_floor;
      const parityDependency = dependency.proof_field_dependencies.fold_layer_parity_record;
      const alphaRef = sourceRef(attempt.separator_event, "alpha_floor", "root_tube_derivative_floor_source");
      const exitRef = sourceRef(attempt.separator_event, "exit_floor", "min_source_rectangle_width");
      const parityRef = sourceRef(attempt.separator_event, "fold_layer_parity_record", "root_tube_one_root_and_complement_source");
      const parityDeltaRef = sourceRef(
        attempt.separator_event,
        "fold_layer_parity_record",
        "candidate_delta_record_from_root_tube_one_root_and_complement_source",
      );

      return {
        separator_event: attempt.separator_event,
        fold_interval: attempt.fold_interval,
        atlas_candidate_id: attempt.atlas_candidate_id,
        row_count: attempt.row_count,
        row_ids: attempt.row_ids,
        candidate_child_witness_sources_complete: attempt.candidate_child_witness_sources_complete === true,
        alpha_floor_source_ref_handle: {
          source_ref: alphaRef,
          source_field: "root_tube_derivative_floor_source",
          source_artifact: "fresh_v10_higher_fold_root_tube_interval_certificate",
          value_q: witness.candidate_alpha_floor_source.derivative_floor_q,
          candidate_source_positive: witness.candidate_alpha_floor_source.positive === true,
          dependency_candidate_source_anchor_present: alphaDependency.candidate_source_anchor_present === true,
          source_ref_handle_materialized: true,
          proof_grade_ref_present: false,
          proof_grade_ref: null,
          first_missing_dependency: SOURCE_REF_PROMOTION_BLOCKER,
        },
        exit_floor_source_ref_handle: {
          source_ref: exitRef,
          source_fields: witness.candidate_exit_floor_source.source_fields,
          source_artifact: "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic",
          min_source_rectangle_width_q: witness.candidate_exit_floor_source.min_source_rectangle_width_q,
          candidate_source_width_positive: witness.candidate_exit_floor_source.positive_source_width === true,
          dependency_candidate_source_anchor_present: exitDependency.candidate_source_anchor_present === true,
          source_ref_handle_materialized: true,
          proof_grade_ref_present: false,
          proof_grade_ref: null,
          first_missing_dependency: SOURCE_REF_PROMOTION_BLOCKER,
        },
        fold_layer_parity_record_source_ref_handle: {
          source_ref: parityRef,
          source_fields: [
            "root_tube_one_root_interval_source",
            "root_tube_derivative_floor_source",
            "root_tube_complement_no_extra_root_source",
          ],
          source_artifact: "fresh_v10_higher_fold_root_tube_interval_certificate",
          endpoint_sign_change_interval: rootTube.endpoint_sign_change_interval === true,
          left_sign: rootTube.left_sign,
          right_sign: rootTube.right_sign,
          derivative_sign: rootTube.derivative_sign,
          root_count_bound_q: rootTube.root_count_bound_q,
          complements_certified_no_extra_root: inputs.rootTube.summary?.all_complements_certified_no_extra_root === true,
          candidate_parity_source_complete: witness.candidate_parity_source.source_complete === true,
          dependency_candidate_source_anchor_present: parityDependency.candidate_source_anchor_present === true,
          source_ref_handle_materialized: true,
          proof_grade_ref_present: false,
          proof_grade_ref: null,
          candidate_parity_delta_record: {
            source_ref: parityDeltaRef,
            source_artifact: "fresh_v10_higher_fold_root_tube_interval_certificate",
            source_fields: [
              "root_tube_one_root_interval_source",
              "root_tube_derivative_floor_source",
              "root_tube_complement_no_extra_root_source",
            ],
            delta_root_count: 0,
            delta_signed_degree: 0,
            local_even_jump: true,
            parity_status: CANDIDATE_PARITY_STATUS,
            candidate_delta_fields_present: true,
            proof_grade_delta_fields_present: false,
            first_missing_dependency: PROOF_GRADE_PARITY_DELTA_BLOCKER,
          },
          first_missing_dependency: SOURCE_REF_PROMOTION_BLOCKER,
          delta_field_blocker: PARITY_DELTA_BLOCKER,
        },
        proof_grade_child_fields_present_after_source_ref_manifest: falseFieldMap(CHILD_FIELDS),
        higher_fold_separator_layer_certificate_present: false,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowManifests(inputs, separatorManifests) {
  const manifestBySeparator = new Map(separatorManifests.map((manifest) => [manifest.separator_event, manifest]));
  return [...inputs.derivationAttempt.row_derivation_attempts]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const manifest = manifestBySeparator.get(row.separator_event);
      if (!manifest) {
        throw new Error(`Missing separator source-ref manifest for ${row.row_id}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        candidate_child_witness_sources_complete: row.candidate_child_witness_sources_complete === true,
        alpha_floor_source_ref: manifest.alpha_floor_source_ref_handle.source_ref,
        exit_floor_source_ref: manifest.exit_floor_source_ref_handle.source_ref,
        fold_layer_parity_record_source_ref: manifest.fold_layer_parity_record_source_ref_handle.source_ref,
        child_field_source_refs_materialized: true,
        alpha_floor_proof_grade_ref_present: false,
        exit_floor_proof_grade_ref_present: false,
        fold_layer_parity_record_proof_grade_ref_present: false,
        candidate_fold_layer_parity_record_delta_fields_present:
          manifest.fold_layer_parity_record_source_ref_handle.candidate_parity_delta_record.candidate_delta_fields_present,
        proof_grade_fold_layer_parity_record_delta_fields_present: false,
        proof_grade_fields_present_after_source_ref_manifest: falseFieldMap(LOCK_FIELDS),
        source_ref_promotion_blocker: SOURCE_REF_PROMOTION_BLOCKER,
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

function buildManifest(paths, inputs) {
  validateInputs(inputs);
  const separatorManifests = buildSeparatorManifests(inputs);
  const rowManifests = buildRowManifests(inputs, separatorManifests);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowManifests, (row) => row.separator_event));

  const summary = {
    separator_source_ref_manifests: separatorManifests.length,
    fold_layer_rows: rowManifests.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_candidate_child_witness_sources_complete: countTrue(
      separatorManifests,
      (manifest) => manifest.candidate_child_witness_sources_complete,
    ),
    rows_with_candidate_child_witness_sources_complete: countTrue(
      rowManifests,
      (row) => row.candidate_child_witness_sources_complete,
    ),
    separators_with_alpha_floor_source_ref_handle: countTrue(
      separatorManifests,
      (manifest) => manifest.alpha_floor_source_ref_handle.source_ref_handle_materialized,
    ),
    rows_with_alpha_floor_source_ref_handle: countTrue(rowManifests, (row) => Boolean(row.alpha_floor_source_ref)),
    separators_with_exit_floor_source_ref_handle: countTrue(
      separatorManifests,
      (manifest) => manifest.exit_floor_source_ref_handle.source_ref_handle_materialized,
    ),
    rows_with_exit_floor_source_ref_handle: countTrue(rowManifests, (row) => Boolean(row.exit_floor_source_ref)),
    separators_with_fold_layer_parity_record_source_ref_handle: countTrue(
      separatorManifests,
      (manifest) => manifest.fold_layer_parity_record_source_ref_handle.source_ref_handle_materialized,
    ),
    rows_with_fold_layer_parity_record_source_ref_handle: countTrue(
      rowManifests,
      (row) => Boolean(row.fold_layer_parity_record_source_ref),
    ),
    rows_with_all_child_field_source_refs_materialized: countTrue(
      rowManifests,
      (row) => row.child_field_source_refs_materialized,
    ),
    separators_with_alpha_floor_proof_grade_ref: 0,
    rows_with_alpha_floor_proof_grade_ref: 0,
    separators_with_exit_floor_proof_grade_ref: 0,
    rows_with_exit_floor_proof_grade_ref: 0,
    separators_with_fold_layer_parity_record_proof_grade_ref: 0,
    rows_with_fold_layer_parity_record_proof_grade_ref: 0,
    candidate_parity_delta_field_presence_counts: presenceCounts(
      separatorManifests,
      PARITY_DELTA_FIELDS,
      (manifest, field) => manifest.fold_layer_parity_record_source_ref_handle.candidate_parity_delta_record[field] != null,
    ),
    separators_with_complete_candidate_fold_layer_parity_record_delta_fields: countTrue(
      separatorManifests,
      (manifest) =>
        manifest.fold_layer_parity_record_source_ref_handle.candidate_parity_delta_record.candidate_delta_fields_present,
    ),
    rows_with_complete_candidate_fold_layer_parity_record_delta_fields: countTrue(
      rowManifests,
      (row) => row.candidate_fold_layer_parity_record_delta_fields_present,
    ),
    proof_grade_parity_delta_field_presence_counts: presenceCounts(
      rowManifests,
      PARITY_DELTA_FIELDS,
      (row) => row.proof_grade_fold_layer_parity_record_delta_fields_present,
    ),
    separators_with_complete_proof_grade_fold_layer_parity_record_delta_fields: 0,
    rows_with_complete_proof_grade_fold_layer_parity_record_delta_fields: 0,
    proof_grade_child_field_presence_counts_after_source_ref_manifest: presenceCounts(
      rowManifests,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_fields_present_after_source_ref_manifest[field],
    ),
    row_lock_field_presence_counts: presenceCounts(
      rowManifests,
      LOCK_FIELDS,
      (row, field) => row.proof_grade_fields_present_after_source_ref_manifest[field],
    ),
    first_source_ref_promotion_blocker: SOURCE_REF_PROMOTION_BLOCKER,
    parity_record_delta_blocker: PARITY_DELTA_BLOCKER,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    min_candidate_alpha_floor_source_q: inputs.derivationAttempt.summary.min_candidate_alpha_floor_source_q,
    min_candidate_exit_source_rectangle_width_q: inputs.derivationAttempt.summary.min_candidate_exit_source_rectangle_width_q,
  };

  return {
    schema: "breather-higher-fold-layer-alpha-exit-parity-child-field-source-ref-manifest-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only child-field source-ref manifest for the 12 higher-fold separator-layer profiles; materializes deterministic candidate source handles for alpha_floor, exit_floor, fold_layer_parity_record, and candidate parity delta records while proving they remain source refs, not proof_grade_ref fields, with no row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt: artifactRecord(paths.derivationAttempt),
      higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic: artifactRecord(paths.childDiagnostic),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      fresh_v10_higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTube),
    },
    manifest_rule:
      "A source_ref handle records the exact fresh source evidence location for a child field. Candidate parity delta records built from root-tube one-root and complement no-extra-root sources are source-side candidate fields only; they are not proof_grade_ref fields, do not supply a proof-grade fold_layer_parity_record, and do not authorize row consumption. Promotion from source_ref handles and candidate parity delta records to proof_grade_ref fields remains a separate proof-grade derivation burden.",
    separator_source_ref_manifests: separatorManifests,
    row_source_ref_manifests: rowManifests,
    summary,
    next_certificate_handoff: {
      mechanical_child_field_targets: [
        "promote alpha_floor_source_ref handles to fresh alpha_floor proof_grade_ref fields only with a proof-grade derivation",
        "promote exit_floor_source_ref handles to fresh exit_floor proof_grade_ref fields only with a proof-grade derivation",
        "promote fold_layer_parity_record_source_ref handles and candidate parity delta records only with a proof-grade fold_layer_parity_record derivation",
      ],
      parallel_blocker:
        "accepted atlas-ref, impulse/direct-quadrature, and parent-complement child fields remain separately absent, with impulse/direct-quadrature blocked by the fixed-parameter separator-aggregate acceptance rule",
      final_certificate_target:
        "same-packet interval-certified higher_fold_separator_layer_certificate carrying accepted higher_fold_layer_atlas_ref, alpha_floor, exit_floor, same_packet_fold_impulse_or_direct_quadrature_bound, fold_layer_parity_record, and parent_complement_consumption_ref for Sigma_hf_01 through Sigma_hf_12",
      continuation_class:
        "mechanical as a source-handle handoff; proof_grade_ref promotion needs a proof-grade derivation package and remains fail-closed here",
      fail_closed_stop_conditions: [
        "Do not count source_ref handles as proof_grade_ref fields.",
        "Do not count candidate parity delta records as proof-grade fold_layer_parity_record fields.",
        "Do not set higher_fold_separator_layer_certificate, accepted_fold_layer_row, row_consumed, preledger_pass, updates_live_ledger, or branch_chart_authorized from this manifest.",
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
      "Priority-only. This manifest reduces the child-field blocker to source_ref-handle and candidate parity-delta promotion while keeping every proof-grade and ledger authorization lock closed.",
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

function separatorTable(manifests) {
  return manifests
    .map(
      (manifest) =>
        `| \`${manifest.separator_event}\` | \`${manifest.fold_interval}\` | ${manifest.row_count} | \`${manifest.alpha_floor_source_ref_handle.source_ref}\` | \`${manifest.exit_floor_source_ref_handle.source_ref}\` | \`${manifest.fold_layer_parity_record_source_ref_handle.source_ref}\` | ${manifest.alpha_floor_source_ref_handle.proof_grade_ref_present} | ${manifest.exit_floor_source_ref_handle.proof_grade_ref_present} | ${manifest.fold_layer_parity_record_source_ref_handle.proof_grade_ref_present} | ${manifest.fold_layer_parity_record_source_ref_handle.candidate_parity_delta_record.candidate_delta_fields_present} | ${manifest.fold_layer_parity_record_source_ref_handle.candidate_parity_delta_record.proof_grade_delta_fields_present} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.child_field_source_refs_materialized} | ${row.alpha_floor_proof_grade_ref_present} | ${row.exit_floor_proof_grade_ref_present} | ${row.fold_layer_parity_record_proof_grade_ref_present} | ${row.candidate_fold_layer_parity_record_delta_fields_present} | ${row.proof_grade_fold_layer_parity_record_delta_fields_present} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, manifest) {
  const report = `# Higher-Fold Layer Alpha/Exit/Parity Child-Field Source-Ref Manifest

Packet: \`${PACKET_ID}\`

Status: \`${manifest.status}\`

Claim level: ${manifest.claim_level}

## Blocker Sharpened

This manifest starts from the fail-closed child-field derivation attempt and
materializes deterministic source_ref handles for the available child-field
evidence and candidate parity-delta records. It records
${manifest.summary.separators_with_alpha_floor_source_ref_handle} / ${manifest.summary.separator_source_ref_manifests}
separator alpha handles,
${manifest.summary.separators_with_exit_floor_source_ref_handle} / ${manifest.summary.separator_source_ref_manifests}
separator exit handles, and
${manifest.summary.separators_with_fold_layer_parity_record_source_ref_handle} / ${manifest.summary.separator_source_ref_manifests}
separator parity-source handles. The row projection covers
${manifest.summary.rows_with_all_child_field_source_refs_materialized} / ${manifest.summary.fold_layer_rows}
fold-layer rows.
It also records
${manifest.summary.separators_with_complete_candidate_fold_layer_parity_record_delta_fields} / ${manifest.summary.separator_source_ref_manifests}
separator candidate parity delta records and
${manifest.summary.rows_with_complete_candidate_fold_layer_parity_record_delta_fields} / ${manifest.summary.fold_layer_rows}
row-level candidate parity delta associations.

The minimum candidate alpha source remains
\`${manifest.summary.min_candidate_alpha_floor_source_q.display}\`. The minimum
exit-source rectangle width remains
\`${manifest.summary.min_candidate_exit_source_rectangle_width_q.display}\`.

The blocker is now sharpened to a source-handle promotion boundary:

- source-ref promotion: \`${manifest.summary.first_source_ref_promotion_blocker}\`;
- parity delta promotion: \`${manifest.summary.parity_record_delta_blocker}\`;
- accepted atlas ref:
  \`${manifest.summary.atlas_ref_blocker}\`;
- impulse/direct-quadrature source packet:
  \`${manifest.summary.source_packet_acceptance_blocker}\`;
- parent-complement consumption ref:
  \`${manifest.summary.parent_complement_consumption_ref_blocker}\`;
- separator certificate:
  \`${manifest.summary.first_separator_certificate_blocker}\`.

This artifact accepts none of those fields. It records 0 / ${manifest.summary.fold_layer_rows}
rows with proof-grade \`alpha_floor\`, proof-grade \`exit_floor\`, proof-grade
\`fold_layer_parity_record\`, \`higher_fold_separator_layer_certificate\`, row
consumption, \`preledger_pass\`, live-ledger update, or branch-chart
authorization.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(manifest.source_artifacts)}

## Separator Source-Ref Manifests

| Separator | Fold interval | Rows | Alpha source_ref | Exit source_ref | Parity source_ref | Alpha proof_grade_ref | Exit proof_grade_ref | Parity proof_grade_ref | Candidate parity delta fields | Proof-grade parity delta fields |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
${separatorTable(manifest.separator_source_ref_manifests)}

## Candidate Parity Delta Field Presence

| Field | Present separators | Missing separators |
| --- | ---: | ---: |
${fieldPresenceTable(manifest.summary.candidate_parity_delta_field_presence_counts)}

## Proof-Grade Parity Delta Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(manifest.summary.proof_grade_parity_delta_field_presence_counts)}

## Proof-Grade Child Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(manifest.summary.proof_grade_child_field_presence_counts_after_source_ref_manifest)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(manifest.summary.row_lock_field_presence_counts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(manifest.summary.rows_by_separator_count)}

## Row Source-Ref Manifests

| Row | Separator | Fold interval | Source refs materialized | Alpha proof_grade_ref | Exit proof_grade_ref | Parity proof_grade_ref | Candidate parity delta fields | Proof-grade parity delta fields | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(manifest.row_source_ref_manifests)}

## Certificate-Side Handoff

Mechanical child-field targets:

${manifest.next_certificate_handoff.mechanical_child_field_targets.map((item) => `- ${item}.`).join("\n")}

Parallel blocker: ${manifest.next_certificate_handoff.parallel_blocker}.

Final certificate target:
\`${manifest.next_certificate_handoff.final_certificate_target}\`.

Continuation class: ${manifest.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${manifest.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

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
    derivationAttempt: args.derivationAttempt,
    childDiagnostic: args.childDiagnostic,
    proofFieldDependency: args.proofFieldDependency,
    rootTube: args.rootTube,
  };
  const inputs = {
    derivationAttempt: readJson(paths.derivationAttempt),
    childDiagnostic: readJson(paths.childDiagnostic),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    rootTube: readJson(paths.rootTube),
  };
  const manifest = buildManifest(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, manifest, args.pretty);
  writeReport(outReport, manifest);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

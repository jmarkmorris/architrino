#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_REF_MANIFEST = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_source_ref_manifest.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_DERIVATION_ATTEMPT = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CHILD_DIAGNOSTIC = `${CERT_DIR}/higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SOURCE_REF_MANIFEST_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_source_ref_manifest_fail_closed_candidate_source_refs_and_parity_delta_candidates_materialized_proof_grade_refs_absent_no_row_consumption";
const DERIVATION_ATTEMPT_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt_fail_closed_candidate_child_sources_present_derivation_refs_and_delta_fields_absent_no_row_consumption";
const CHILD_DIAGNOSTIC_STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic_fail_closed_candidate_child_sources_present_proof_grade_child_derivations_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_derivation_source_data_proof_attempt_fail_closed_source_data_complete_proof_grade_refs_absent_no_row_consumption";

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

const SOURCE_REF_BLOCKER = "child_field_source_ref_handle_not_proof_grade_ref";
const PARITY_DELTA_BLOCKER = "candidate_parity_delta_record_not_proof_grade_ref";
const ALPHA_REF_BLOCKER = "alpha_floor_proof_grade_ref_null";
const EXIT_REF_BLOCKER = "exit_floor_proof_grade_ref_null";
const PARITY_REF_BLOCKER = "fold_layer_parity_record_proof_grade_ref_null";
const PROOF_GRADE_PARITY_DELTA_BLOCKER = "proof_grade_fold_layer_parity_record_delta_fields_absent";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

function parseArgs(argv) {
  const args = {
    sourceRefManifest: DEFAULT_SOURCE_REF_MANIFEST,
    derivationAttempt: DEFAULT_DERIVATION_ATTEMPT,
    childDiagnostic: DEFAULT_CHILD_DIAGNOSTIC,
    rootTube: DEFAULT_ROOT_TUBE,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source-ref-manifest") {
      args.sourceRefManifest = argv[++index];
    } else if (arg === "--derivation-attempt") {
      args.derivationAttempt = argv[++index];
    } else if (arg === "--child-diagnostic") {
      args.childDiagnostic = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-alpha-exit-parity-child-field-derivation-source-data-proof-attempt.mjs [options]

Options:
  --source-ref-manifest PATH    Child-field source-ref manifest. Defaults to ${DEFAULT_SOURCE_REF_MANIFEST}.
  --derivation-attempt PATH     Child-field derivation attempt. Defaults to ${DEFAULT_DERIVATION_ATTEMPT}.
  --child-diagnostic PATH       Child-field interval diagnostic. Defaults to ${DEFAULT_CHILD_DIAGNOSTIC}.
  --root-tube PATH              Root-tube interval certificate. Defaults to ${DEFAULT_ROOT_TUBE}.
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

function validateInputs(inputs) {
  assertPacketId(inputs.sourceRefManifest, "sourceRefManifest");
  assertPacketId(inputs.derivationAttempt, "derivationAttempt");
  assertPacketId(inputs.childDiagnostic, "childDiagnostic");
  assertPacketId(inputs.rootTube, "rootTube");
  assertFailClosed(inputs.sourceRefManifest, "sourceRefManifest");
  assertFailClosed(inputs.derivationAttempt, "derivationAttempt");
  assertFailClosed(inputs.childDiagnostic, "childDiagnostic");

  if (inputs.sourceRefManifest.status !== SOURCE_REF_MANIFEST_STATUS) {
    throw new Error("Source-ref manifest is not at the expected fail-closed status.");
  }
  if (inputs.derivationAttempt.status !== DERIVATION_ATTEMPT_STATUS) {
    throw new Error("Derivation attempt is not at the expected fail-closed status.");
  }
  if (inputs.childDiagnostic.status !== CHILD_DIAGNOSTIC_STATUS) {
    throw new Error("Child-field interval diagnostic is not at the expected fail-closed status.");
  }
  if (inputs.rootTube.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube interval source is not certified as one root per separator.");
  }
  if (inputs.rootTube.summary?.all_complements_certified_no_extra_root !== true) {
    throw new Error("Root-tube complement source is not certified as no extra root.");
  }
  if (inputs.sourceRefManifest.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in source-ref manifest.");
  }
  if (inputs.sourceRefManifest.summary?.rows_with_all_child_field_source_refs_materialized !== 112) {
    throw new Error("Expected materialized child-field source refs for all 112 rows.");
  }
  if (inputs.sourceRefManifest.summary?.rows_with_complete_candidate_fold_layer_parity_record_delta_fields !== 112) {
    throw new Error("Expected candidate parity delta records for all 112 rows.");
  }
  if (inputs.sourceRefManifest.summary?.rows_with_alpha_floor_proof_grade_ref !== 0) {
    throw new Error("Source-ref manifest already reports proof-grade alpha_floor refs.");
  }
  if (inputs.sourceRefManifest.summary?.rows_with_exit_floor_proof_grade_ref !== 0) {
    throw new Error("Source-ref manifest already reports proof-grade exit_floor refs.");
  }
  if (inputs.sourceRefManifest.summary?.rows_with_fold_layer_parity_record_proof_grade_ref !== 0) {
    throw new Error("Source-ref manifest already reports proof-grade fold_layer_parity_record refs.");
  }
  if (inputs.sourceRefManifest.summary?.rows_with_complete_proof_grade_fold_layer_parity_record_delta_fields !== 0) {
    throw new Error("Source-ref manifest already reports proof-grade parity delta fields.");
  }
}

function buildSeparatorPackets(sourceRefManifest) {
  return [...sourceRefManifest.separator_source_ref_manifests]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((manifest) => {
      const parityDelta = manifest.fold_layer_parity_record_source_ref_handle.candidate_parity_delta_record;
      return {
        separator_event: manifest.separator_event,
        fold_interval: manifest.fold_interval,
        atlas_candidate_id: manifest.atlas_candidate_id,
        row_count: manifest.row_count,
        row_ids: manifest.row_ids,
        alpha_floor_derivation_source_data: {
          source_ref: manifest.alpha_floor_source_ref_handle.source_ref,
          source_artifact: manifest.alpha_floor_source_ref_handle.source_artifact,
          source_field: manifest.alpha_floor_source_ref_handle.source_field,
          source_value_q: manifest.alpha_floor_source_ref_handle.value_q,
          source_data_record_present: true,
          source_ref_handle_materialized: manifest.alpha_floor_source_ref_handle.source_ref_handle_materialized === true,
          proof_grade_ref_present: false,
          proof_grade_ref: null,
          first_missing_dependency: ALPHA_REF_BLOCKER,
        },
        exit_floor_derivation_source_data: {
          source_ref: manifest.exit_floor_source_ref_handle.source_ref,
          source_artifact: manifest.exit_floor_source_ref_handle.source_artifact,
          source_fields: manifest.exit_floor_source_ref_handle.source_fields,
          min_source_rectangle_width_q: manifest.exit_floor_source_ref_handle.min_source_rectangle_width_q,
          source_data_record_present: true,
          source_ref_handle_materialized: manifest.exit_floor_source_ref_handle.source_ref_handle_materialized === true,
          proof_grade_ref_present: false,
          proof_grade_ref: null,
          first_missing_dependency: EXIT_REF_BLOCKER,
        },
        fold_layer_parity_record_derivation_source_data: {
          source_ref: manifest.fold_layer_parity_record_source_ref_handle.source_ref,
          source_artifact: manifest.fold_layer_parity_record_source_ref_handle.source_artifact,
          source_fields: manifest.fold_layer_parity_record_source_ref_handle.source_fields,
          endpoint_sign_change_interval: manifest.fold_layer_parity_record_source_ref_handle.endpoint_sign_change_interval,
          left_sign: manifest.fold_layer_parity_record_source_ref_handle.left_sign,
          right_sign: manifest.fold_layer_parity_record_source_ref_handle.right_sign,
          derivative_sign: manifest.fold_layer_parity_record_source_ref_handle.derivative_sign,
          root_count_bound_q: manifest.fold_layer_parity_record_source_ref_handle.root_count_bound_q,
          complements_certified_no_extra_root:
            manifest.fold_layer_parity_record_source_ref_handle.complements_certified_no_extra_root,
          candidate_parity_delta_record: parityDelta,
          source_data_record_present: true,
          source_ref_handle_materialized:
            manifest.fold_layer_parity_record_source_ref_handle.source_ref_handle_materialized === true,
          candidate_delta_fields_present: parityDelta.candidate_delta_fields_present === true,
          proof_grade_ref_present: false,
          proof_grade_ref: null,
          proof_grade_delta_fields_present: false,
          first_missing_dependency: PARITY_REF_BLOCKER,
          delta_field_blocker: PARITY_DELTA_BLOCKER,
        },
        derivation_source_data_complete: true,
        proof_grade_child_fields_present_after_source_data_attempt: falseFieldMap(CHILD_FIELDS),
        higher_fold_separator_layer_certificate_present: false,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowPackets(sourceRefManifest, separatorPackets) {
  const bySeparator = new Map(separatorPackets.map((packet) => [packet.separator_event, packet]));
  return [...sourceRefManifest.row_source_ref_manifests]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const packet = bySeparator.get(row.separator_event);
      if (!packet) {
        throw new Error(`Missing separator source-data packet for ${row.row_id}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        alpha_floor_source_ref: row.alpha_floor_source_ref,
        exit_floor_source_ref: row.exit_floor_source_ref,
        fold_layer_parity_record_source_ref: row.fold_layer_parity_record_source_ref,
        alpha_floor_derivation_source_data_present: packet.alpha_floor_derivation_source_data.source_data_record_present,
        exit_floor_derivation_source_data_present: packet.exit_floor_derivation_source_data.source_data_record_present,
        fold_layer_parity_record_derivation_source_data_present:
          packet.fold_layer_parity_record_derivation_source_data.source_data_record_present,
        derivation_source_data_complete: true,
        alpha_floor_proof_grade_ref_present: false,
        exit_floor_proof_grade_ref_present: false,
        fold_layer_parity_record_proof_grade_ref_present: false,
        candidate_fold_layer_parity_record_delta_fields_present:
          row.candidate_fold_layer_parity_record_delta_fields_present === true,
        proof_grade_fold_layer_parity_record_delta_fields_present: false,
        proof_grade_child_fields_present_after_source_data_attempt: falseFieldMap(CHILD_FIELDS),
        row_lock_fields_present_after_source_data_attempt: falseFieldMap(LOCK_FIELDS),
        source_ref_promotion_blocker: SOURCE_REF_BLOCKER,
        parity_record_delta_blocker: PARITY_DELTA_BLOCKER,
        alpha_floor_ref_blocker: ALPHA_REF_BLOCKER,
        exit_floor_ref_blocker: EXIT_REF_BLOCKER,
        parity_record_ref_blocker: PARITY_REF_BLOCKER,
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
  const separatorPackets = buildSeparatorPackets(inputs.sourceRefManifest);
  const rowPackets = buildRowPackets(inputs.sourceRefManifest, separatorPackets);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowPackets, (row) => row.separator_event));

  const summary = {
    separator_derivation_source_data_packets: separatorPackets.length,
    fold_layer_rows: rowPackets.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_derivation_source_data_complete: countTrue(
      separatorPackets,
      (packet) => packet.derivation_source_data_complete,
    ),
    rows_with_derivation_source_data_complete: countTrue(rowPackets, (row) => row.derivation_source_data_complete),
    rows_with_alpha_floor_source_ref: countTrue(rowPackets, (row) => Boolean(row.alpha_floor_source_ref)),
    rows_with_exit_floor_source_ref: countTrue(rowPackets, (row) => Boolean(row.exit_floor_source_ref)),
    rows_with_fold_layer_parity_record_source_ref: countTrue(
      rowPackets,
      (row) => Boolean(row.fold_layer_parity_record_source_ref),
    ),
    rows_with_alpha_floor_derivation_source_data: countTrue(
      rowPackets,
      (row) => row.alpha_floor_derivation_source_data_present,
    ),
    rows_with_exit_floor_derivation_source_data: countTrue(
      rowPackets,
      (row) => row.exit_floor_derivation_source_data_present,
    ),
    rows_with_fold_layer_parity_record_derivation_source_data: countTrue(
      rowPackets,
      (row) => row.fold_layer_parity_record_derivation_source_data_present,
    ),
    candidate_parity_delta_field_presence_counts: presenceCounts(
      separatorPackets,
      PARITY_DELTA_FIELDS,
      (packet, field) => packet.fold_layer_parity_record_derivation_source_data.candidate_parity_delta_record[field] != null,
    ),
    separators_with_complete_candidate_fold_layer_parity_record_delta_fields: countTrue(
      separatorPackets,
      (packet) => packet.fold_layer_parity_record_derivation_source_data.candidate_delta_fields_present,
    ),
    rows_with_complete_candidate_fold_layer_parity_record_delta_fields: countTrue(
      rowPackets,
      (row) => row.candidate_fold_layer_parity_record_delta_fields_present,
    ),
    rows_with_alpha_floor_proof_grade_ref: 0,
    rows_with_exit_floor_proof_grade_ref: 0,
    rows_with_fold_layer_parity_record_proof_grade_ref: 0,
    rows_with_complete_proof_grade_fold_layer_parity_record_delta_fields: 0,
    proof_grade_child_field_presence_counts_after_source_data_attempt: presenceCounts(
      rowPackets,
      CHILD_FIELDS,
      (row, field) => row.proof_grade_child_fields_present_after_source_data_attempt[field],
    ),
    proof_grade_parity_delta_field_presence_counts: presenceCounts(
      rowPackets,
      PARITY_DELTA_FIELDS,
      (row) => row.proof_grade_fold_layer_parity_record_delta_fields_present,
    ),
    row_lock_field_presence_counts_after_source_data_attempt: presenceCounts(
      rowPackets,
      LOCK_FIELDS,
      (row, field) => row.row_lock_fields_present_after_source_data_attempt[field],
    ),
    first_source_ref_promotion_blocker: SOURCE_REF_BLOCKER,
    parity_record_delta_blocker: PARITY_DELTA_BLOCKER,
    alpha_floor_ref_blocker: ALPHA_REF_BLOCKER,
    exit_floor_ref_blocker: EXIT_REF_BLOCKER,
    parity_record_ref_blocker: PARITY_REF_BLOCKER,
    proof_grade_parity_delta_blocker: PROOF_GRADE_PARITY_DELTA_BLOCKER,
    atlas_ref_blocker: ATLAS_REF_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    min_candidate_alpha_floor_source_q: inputs.sourceRefManifest.summary.min_candidate_alpha_floor_source_q,
    min_candidate_exit_source_rectangle_width_q: inputs.sourceRefManifest.summary.min_candidate_exit_source_rectangle_width_q,
  };

  return {
    schema: "breather-higher-fold-layer-alpha-exit-parity-child-field-derivation-source-data-proof-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only derivation-source-data proof attempt for the 12 higher-fold separator-layer profiles; packages complete source data for alpha_floor, exit_floor, fold_layer_parity_record, and candidate parity delta records while proving all proof_grade_ref and ledger authorization fields remain absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_alpha_exit_parity_child_field_source_ref_manifest: artifactRecord(paths.sourceRefManifest),
      higher_fold_layer_alpha_exit_parity_child_field_derivation_attempt: artifactRecord(paths.derivationAttempt),
      higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic: artifactRecord(paths.childDiagnostic),
      fresh_v10_higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTube),
    },
    proof_attempt_rule:
      "A derivation-source-data record is complete when the fresh source_ref handle and source fields for a child field are present. Complete derivation-source-data records are not proof_grade_ref fields. Candidate parity delta records remain candidate records unless a proof-grade fold_layer_parity_record derivation supplies proof-grade parity delta fields.",
    separator_derivation_source_data_packets: separatorPackets,
    row_derivation_source_data_packets: rowPackets,
    summary,
    next_certificate_handoff: {
      sharpened_blocker:
        "The source-data layer is complete for all 112 rows, but 0 rows have proof-grade alpha_floor, exit_floor, fold_layer_parity_record, or proof-grade parity delta fields.",
      mechanical_child_field_targets: [
        "construct proof-grade alpha_floor refs from the alpha_floor derivation-source-data records",
        "construct proof-grade exit_floor refs from the exit_floor derivation-source-data records",
        "construct proof-grade fold_layer_parity_record refs and proof-grade parity delta fields from the parity derivation-source-data records",
      ],
      parallel_blocker:
        "accepted atlas-ref, impulse/direct-quadrature, parent-complement consumption, and separator-certificate fields remain separately absent",
      fail_closed_stop_conditions: [
        "Do not count derivation-source-data records as proof_grade_ref fields.",
        "Do not count candidate parity delta records as proof-grade fold_layer_parity_record fields.",
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
      "Priority-only. This attempt reduces the child-field blocker from source-ref handles to complete derivation-source-data records while keeping every proof-grade and ledger authorization lock closed.",
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

function separatorTable(packets) {
  return packets
    .map(
      (packet) =>
        `| \`${packet.separator_event}\` | \`${packet.fold_interval}\` | ${packet.row_count} | ${packet.alpha_floor_derivation_source_data.source_data_record_present} | ${packet.exit_floor_derivation_source_data.source_data_record_present} | ${packet.fold_layer_parity_record_derivation_source_data.source_data_record_present} | ${packet.fold_layer_parity_record_derivation_source_data.candidate_delta_fields_present} | ${packet.alpha_floor_derivation_source_data.proof_grade_ref_present} | ${packet.exit_floor_derivation_source_data.proof_grade_ref_present} | ${packet.fold_layer_parity_record_derivation_source_data.proof_grade_ref_present} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.derivation_source_data_complete} | ${row.candidate_fold_layer_parity_record_delta_fields_present} | ${row.alpha_floor_proof_grade_ref_present} | ${row.exit_floor_proof_grade_ref_present} | ${row.fold_layer_parity_record_proof_grade_ref_present} | ${row.proof_grade_fold_layer_parity_record_delta_fields_present} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Alpha/Exit/Parity Child-Field Derivation Source-Data Proof Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This proof attempt imports the source-ref manifest and packages the existing
fresh source_ref handles into derivation-source-data records. It records
${attempt.summary.separators_with_derivation_source_data_complete} / ${attempt.summary.separator_derivation_source_data_packets}
separator source-data packets and
${attempt.summary.rows_with_derivation_source_data_complete} / ${attempt.summary.fold_layer_rows}
row source-data packets with complete \`alpha_floor\`, \`exit_floor\`, and
\`fold_layer_parity_record\` source data.

The attempt also records
${attempt.summary.separators_with_complete_candidate_fold_layer_parity_record_delta_fields} / ${attempt.summary.separator_derivation_source_data_packets}
separator candidate parity delta records and
${attempt.summary.rows_with_complete_candidate_fold_layer_parity_record_delta_fields} / ${attempt.summary.fold_layer_rows}
row-level candidate parity delta associations.

It proves 0 / ${attempt.summary.fold_layer_rows} proof-grade \`alpha_floor\`
refs, 0 / ${attempt.summary.fold_layer_rows} proof-grade \`exit_floor\` refs,
0 / ${attempt.summary.fold_layer_rows} proof-grade
\`fold_layer_parity_record\` refs, and 0 / ${attempt.summary.fold_layer_rows}
proof-grade parity delta fields. Derivation-source-data records are source-side
records only.

The sharpened blockers are:

- source-ref promotion: \`${attempt.summary.first_source_ref_promotion_blocker}\`;
- parity delta promotion: \`${attempt.summary.parity_record_delta_blocker}\`;
- alpha ref: \`${attempt.summary.alpha_floor_ref_blocker}\`;
- exit ref: \`${attempt.summary.exit_floor_ref_blocker}\`;
- parity ref: \`${attempt.summary.parity_record_ref_blocker}\`;
- proof-grade parity delta fields:
  \`${attempt.summary.proof_grade_parity_delta_blocker}\`;
- accepted atlas ref: \`${attempt.summary.atlas_ref_blocker}\`;
- impulse/direct-quadrature source packet:
  \`${attempt.summary.source_packet_acceptance_blocker}\`;
- parent-complement consumption ref:
  \`${attempt.summary.parent_complement_consumption_ref_blocker}\`;
- separator certificate:
  \`${attempt.summary.first_separator_certificate_blocker}\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Candidate Parity Delta Field Presence

| Field | Present separators | Missing separators |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.candidate_parity_delta_field_presence_counts)}

## Proof-Grade Parity Delta Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_parity_delta_field_presence_counts)}

## Proof-Grade Child Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.proof_grade_child_field_presence_counts_after_source_data_attempt)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_lock_field_presence_counts_after_source_data_attempt)}

## Separator Source-Data Packets

| Separator | Fold interval | Rows | Alpha source data | Exit source data | Parity source data | Candidate parity delta | Alpha proof_grade_ref | Exit proof_grade_ref | Parity proof_grade_ref |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
${separatorTable(attempt.separator_derivation_source_data_packets)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Source-Data Packets

| Row | Separator | Fold interval | Source data complete | Candidate parity delta | Alpha proof_grade_ref | Exit proof_grade_ref | Parity proof_grade_ref | Proof-grade parity delta | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_derivation_source_data_packets)}

## Certificate-Side Handoff

Sharpened blocker:
${attempt.next_certificate_handoff.sharpened_blocker}

Mechanical child-field targets:

${attempt.next_certificate_handoff.mechanical_child_field_targets.map((item) => `- ${item}.`).join("\n")}

Parallel blocker: ${attempt.next_certificate_handoff.parallel_blocker}.

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
    sourceRefManifest: args.sourceRefManifest,
    derivationAttempt: args.derivationAttempt,
    childDiagnostic: args.childDiagnostic,
    rootTube: args.rootTube,
  };
  const inputs = {
    sourceRefManifest: readJson(paths.sourceRefManifest),
    derivationAttempt: readJson(paths.derivationAttempt),
    childDiagnostic: readJson(paths.childDiagnostic),
    rootTube: readJson(paths.rootTube),
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

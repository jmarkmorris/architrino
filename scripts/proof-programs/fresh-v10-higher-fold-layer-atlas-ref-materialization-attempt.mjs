#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_READINESS = `${CERT_DIR}/higher_fold_layer_same_packet_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_PHI_CYC = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_ROOT_TUBE_INTERVAL = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_BACKEND = `${CERT_DIR}/preledger_interval_backend_certificate.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_atlas_ref_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_atlas_ref_materialization_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const FOLD_LAYER_FAILURE = "trig_range_overlap_touches_fold_layer_candidate";
const CANDIDATE_ATLAS_FIELD = "candidate_higher_fold_layer_atlas_ref";
const ACCEPTED_ATLAS_FIELD = "higher_fold_layer_atlas_ref";
const ACCEPTANCE_FIELDS = [
  ACCEPTED_ATLAS_FIELD,
  "alpha_floor",
  "exit_floor",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "fold_layer_parity_record",
  "parent_complement_consumption_ref",
];

function parseArgs(argv) {
  const args = {
    ledger: DEFAULT_LEDGER,
    readiness: DEFAULT_READINESS,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
    phiCyc: DEFAULT_PHI_CYC,
    mesh: DEFAULT_MESH,
    inputScreen: DEFAULT_INPUT_SCREEN,
    rootTubeInterval: DEFAULT_ROOT_TUBE_INTERVAL,
    backend: DEFAULT_BACKEND,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--ledger") {
      args.ledger = argv[++index];
    } else if (arg === "--readiness") {
      args.readiness = argv[++index];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++index];
    } else if (arg === "--phi-cyc") {
      args.phiCyc = argv[++index];
    } else if (arg === "--mesh") {
      args.mesh = argv[++index];
    } else if (arg === "--input-screen") {
      args.inputScreen = argv[++index];
    } else if (arg === "--root-tube-interval") {
      args.rootTubeInterval = argv[++index];
    } else if (arg === "--backend") {
      args.backend = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-atlas-ref-materialization-attempt.mjs [options]

Options:
  --ledger PATH              Higher-fold proof-interval v6 ledger. Defaults to ${DEFAULT_LEDGER}.
  --readiness PATH           Same-packet field readiness classifier. Defaults to ${DEFAULT_READINESS}.
  --fold-layer-burden PATH   Fold-layer burden atlas. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --phi-cyc PATH             Same-packet phi_cyc artifact. Defaults to ${DEFAULT_PHI_CYC}.
  --mesh PATH                Same-packet mesh artifact. Defaults to ${DEFAULT_MESH}.
  --input-screen PATH        Same-packet input screen. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --root-tube-interval PATH  Root-tube interval certificate. Defaults to ${DEFAULT_ROOT_TUBE_INTERVAL}.
  --backend PATH             Proof-interval backend certificate. Defaults to ${DEFAULT_BACKEND}.
  --out-dir PATH             Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                   Pretty-print JSON artifact.
  --help                     Show this help.`);
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

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function foldIntervalSortKey(intervalId) {
  const match = String(intervalId).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
}

function sortedObjectByKey(object, compareFn = undefined) {
  return Object.fromEntries(Object.entries(object).sort(([left], [right]) => compareFn?.(left, right) ?? left.localeCompare(right)));
}

function groupBy(rows, getter) {
  return rows.reduce((groups, row) => {
    const key = getter(row);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(row);
    return groups;
  }, {});
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function mapBy(array, getter, name) {
  const map = new Map();
  for (const entry of array ?? []) {
    const key = getter(entry);
    if (key == null) {
      continue;
    }
    if (map.has(key)) {
      throw new Error(`Duplicate ${name} key: ${key}`);
    }
    map.set(key, entry);
  }
  return map;
}

function requireMapEntry(map, key, name) {
  if (!map.has(key)) {
    throw new Error(`Missing ${name}: ${key}`);
  }
  return map.get(key);
}

function acceptedFieldsAfterCandidateClassification() {
  return Object.fromEntries(ACCEPTANCE_FIELDS.map((field) => [field, false]));
}

function finiteRangeRadius(range) {
  if (!Array.isArray(range) || range.length !== 2) {
    return null;
  }
  const lo = Number(range[0]);
  const hi = Number(range[1]);
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) {
    return null;
  }
  return Number(((hi - lo) / 2).toPrecision(15));
}

function buildSourceMaps(inputs) {
  return {
    ledgerIntervals: mapBy(inputs.ledger.intervals, (interval) => interval.interval_id, "ledger interval"),
    inputIntervals: mapBy(inputs.inputScreen.intervals, (interval) => interval.interval_id, "input-screen interval"),
    meshIntervals: mapBy(inputs.mesh.preledger_intervals, (interval) => interval.interval_id, "mesh preledger interval"),
    meshSubblocks: mapBy(inputs.mesh.subblocks, (subblock) => subblock.id, "mesh subblock"),
    phiContacts: mapBy(inputs.phiCyc.higher_fold_itinerary?.contacts, (contact) => contact.id, "phi_cyc contact"),
    rootTubes: mapBy(inputs.rootTubeInterval.root_tubes, (rootTube) => rootTube.contact_id, "root tube"),
    burdenRows: mapBy(inputs.foldLayerBurden.rows, (row) => row.row_id, "fold-layer burden row"),
  };
}

function validateInputs(inputs) {
  assertPacketId(inputs.ledger, "ledger");
  assertPacketId(inputs.readiness, "readiness");
  assertPacketId(inputs.foldLayerBurden, "foldLayerBurden");
  assertPacketId(inputs.phiCyc, "phiCyc");
  assertPacketId(inputs.mesh, "mesh");
  assertPacketId(inputs.inputScreen, "inputScreen");
  assertPacketId(inputs.rootTubeInterval, "rootTubeInterval");
  assertPacketId(inputs.backend, "backend");
  if (inputs.ledger.branch_chart_authorized !== false) {
    throw new Error("Refusing to materialize atlas refs from a branch-authorized ledger.");
  }
  if (inputs.readiness.branch_chart_authorized !== false) {
    throw new Error("Refusing to materialize atlas refs from a branch-authorized readiness classifier.");
  }
  if (inputs.rootTubeInterval.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube interval source is not certified as one root per separator.");
  }
}

function buildSeparatorEntries(rows, sourceMaps) {
  const rowsBySeparator = groupBy(rows, (row) => row.separator_event);
  return Object.entries(rowsBySeparator)
    .sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right))
    .map(([separatorEvent, separatorRows]) => {
      const foldIntervals = [...new Set(separatorRows.map((row) => row.fold_interval))];
      if (foldIntervals.length !== 1) {
        throw new Error(`Separator ${separatorEvent} maps to multiple fold intervals: ${foldIntervals.join(", ")}`);
      }
      const foldInterval = foldIntervals[0];
      const ledgerInterval = requireMapEntry(sourceMaps.ledgerIntervals, foldInterval, "ledger fold interval");
      const inputInterval = requireMapEntry(sourceMaps.inputIntervals, foldInterval, "input-screen fold interval");
      const meshInterval = requireMapEntry(sourceMaps.meshIntervals, foldInterval, "mesh preledger fold interval");
      const meshSubblock = requireMapEntry(sourceMaps.meshSubblocks, foldInterval, "mesh fold subblock");
      const phiContact = requireMapEntry(sourceMaps.phiContacts, separatorEvent, "phi_cyc contact");
      const rootTube = requireMapEntry(sourceMaps.rootTubes, separatorEvent, "root tube");
      if (
        ledgerInterval.separator_event !== separatorEvent ||
        inputInterval.separator_event !== separatorEvent ||
        meshInterval.separator_event !== separatorEvent
      ) {
        throw new Error(`Separator mismatch for ${foldInterval}: ${separatorEvent}`);
      }
      if (rootTube.interval_certified_one_root !== true) {
        throw new Error(`Root tube is not certified as one root: ${separatorEvent}`);
      }
      const rowIds = separatorRows.map((row) => row.row_id).sort();
      return {
        atlas_candidate_id: `${CANDIDATE_ATLAS_FIELD}:${separatorEvent}:${foldInterval}`,
        separator_event: separatorEvent,
        fold_interval: foldInterval,
        fold_interval_order: Number(ledgerInterval.order),
        velocity_class: ledgerInterval.velocity_class,
        theta_center: phiContact.theta,
        t_center: phiContact.t,
        theta_range: ledgerInterval.theta_range,
        t_range: ledgerInterval.t_range,
        layer_radius_theta: finiteRangeRadius(ledgerInterval.theta_range),
        layer_radius_t: finiteRangeRadius(ledgerInterval.t_range),
        velocity_contact: phiContact.velocity_contact,
        contact_x: phiContact.x,
        contact_xdot: phiContact.xdot,
        ledger_theta_range: ledgerInterval.theta_range,
        ledger_t_range: ledgerInterval.t_range,
        input_screen_theta_range: inputInterval.theta_range,
        input_screen_t_range: inputInterval.t_range,
        mesh_preledger_theta_range: meshInterval.theta_range,
        mesh_preledger_t_range: meshInterval.t_range,
        mesh_subblock_ref: meshSubblock.id,
        mesh_subblock_type: meshSubblock.type,
        mesh_subblock_theta_range: meshSubblock.theta_range,
        mesh_subblock_t_range: meshSubblock.t_range ?? null,
        root_tube_ref: rootTube.contact_id,
        root_tube_equation: rootTube.equation,
        root_tube_theta_interval_display: rootTube.theta_interval_q?.display ?? null,
        root_tube_t_interval_display: rootTube.t_interval_q?.display ?? null,
        root_tube_derivative_floor_display: rootTube.derivative_floor_display,
        root_tube_interval_certified_one_root: rootTube.interval_certified_one_root,
        row_count: separatorRows.length,
        row_ids: rowIds,
        candidate_higher_fold_layer_atlas_ref_present: true,
        accepted_higher_fold_layer_atlas_ref: false,
        proof_grade_acceptance_fields_present: Object.fromEntries(
          ACCEPTANCE_FIELDS.map((field) => [field, false]),
        ),
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowMaterialization(rows, separatorEntries, burdenRows) {
  const entryBySeparator = new Map(separatorEntries.map((entry) => [entry.separator_event, entry]));
  return rows.map((row) => {
    const burdenRow = requireMapEntry(burdenRows, row.row_id, "fold-layer burden row");
    const entry = requireMapEntry(entryBySeparator, row.separator_event, "separator atlas entry");
    if (burdenRow.failure_code !== FOLD_LAYER_FAILURE || row.failure_code !== FOLD_LAYER_FAILURE) {
      throw new Error(`Unexpected fold-layer failure code for ${row.row_id}`);
    }
    const fieldsAfterCandidateClassification = acceptedFieldsAfterCandidateClassification();
    return {
      row_id: row.row_id,
      ledger: row.ledger,
      status: row.status,
      failure_code: row.failure_code,
      separator_event: row.separator_event,
      fold_interval: row.fold_interval,
      receiver_interval: row.receiver_interval,
      source_interval: row.source_interval,
      receiver_type: row.receiver_type,
      source_type: row.source_type,
      candidate_higher_fold_layer_atlas_ref: entry.atlas_candidate_id,
      candidate_higher_fold_layer_atlas_ref_present: true,
      accepted_higher_fold_layer_atlas_ref: false,
      accepted_same_packet_fields_present_after_candidate_classification: fieldsAfterCandidateClassification,
      remaining_missing_same_packet_fields: ACCEPTANCE_FIELDS,
      first_missing_same_packet_field_after_candidate_classification: ACCEPTED_ATLAS_FIELD,
      row_acceptance_ready: false,
      accepted_fold_layer_row: false,
      row_consumed: false,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
    };
  });
}

function buildMaterialization(paths, inputs) {
  validateInputs(inputs);
  const sourceMaps = buildSourceMaps(inputs);
  const rows = [...(inputs.readiness.higher_fold_layer_rows ?? [])].sort((left, right) =>
    rowSortKey(left).localeCompare(rowSortKey(right)),
  );
  if (rows.length !== 112) {
    throw new Error(`Expected 112 higher-fold fold-layer rows, found ${rows.length}.`);
  }
  if (inputs.readiness.summary?.rows_missing_higher_fold_layer_atlas_ref !== rows.length) {
    throw new Error("Readiness classifier no longer has every fold-layer row missing the atlas-ref field.");
  }
  if (inputs.foldLayerBurden.summary?.fold_layer_rows !== rows.length) {
    throw new Error(`Fold-layer burden count mismatch: ${inputs.foldLayerBurden.summary?.fold_layer_rows} vs ${rows.length}.`);
  }

  const separatorEntries = buildSeparatorEntries(rows, sourceMaps);
  if (separatorEntries.length !== 12) {
    throw new Error(`Expected 12 separator atlas entries, found ${separatorEntries.length}.`);
  }
  const rowMaterialization = buildRowMaterialization(rows, separatorEntries, sourceMaps.burdenRows);
  const rowsBySeparatorCount = sortedObjectByKey(countBy(rowMaterialization, (row) => row.separator_event), (left, right) => {
    return separatorSortKey(left) - separatorSortKey(right);
  });
  const rowsByFoldIntervalCount = sortedObjectByKey(countBy(rowMaterialization, (row) => row.fold_interval), (left, right) => {
    return foldIntervalSortKey(left) - foldIntervalSortKey(right);
  });
  const acceptedFieldsAfter = Object.fromEntries(
    ACCEPTANCE_FIELDS.map((field) => [
      field,
      {
        present: countTrue(
          rowMaterialization,
          (row) => row.accepted_same_packet_fields_present_after_candidate_classification[field],
        ),
        missing:
          rowMaterialization.length -
          countTrue(
            rowMaterialization,
            (row) => row.accepted_same_packet_fields_present_after_candidate_classification[field],
          ),
      },
    ]),
  );

  const summary = {
    separator_atlas_source_candidates: separatorEntries.length,
    fold_layer_rows: rowMaterialization.length,
    split_required_fold_layer_rows: rowMaterialization.filter((row) => row.status === "split_required").length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_by_fold_interval_count: rowsByFoldIntervalCount,
    rows_with_candidate_higher_fold_layer_atlas_ref: countTrue(
      rowMaterialization,
      (row) => row.candidate_higher_fold_layer_atlas_ref_present,
    ),
    rows_with_accepted_higher_fold_layer_atlas_ref: 0,
    accepted_same_packet_field_presence_counts_after_candidate_classification: acceptedFieldsAfter,
    accepted_same_packet_fields_complete_rows_after_candidate_classification: 0,
    rows_missing_accepted_higher_fold_layer_atlas_ref: rowMaterialization.length,
    rows_missing_alpha_floor: rowMaterialization.length,
    rows_missing_exit_floor: rowMaterialization.length,
    rows_missing_same_packet_fold_impulse_or_direct_quadrature_bound: rowMaterialization.length,
    rows_missing_fold_layer_parity_record: rowMaterialization.length,
    rows_missing_parent_complement_consumption_ref: rowMaterialization.length,
    first_missing_same_packet_field_counts_after_candidate_classification: {
      higher_fold_layer_atlas_ref: rowMaterialization.length,
    },
    matching_phi_contacts: separatorEntries.length,
    matching_mesh_fold_intervals: separatorEntries.length,
    matching_input_screen_fold_intervals: separatorEntries.length,
    root_tube_refs_certified_one_root: countTrue(
      separatorEntries,
      (entry) => entry.root_tube_interval_certified_one_root,
    ),
    root_complements_certified_no_extra_root:
      inputs.rootTubeInterval.summary?.all_complements_certified_no_extra_root === true
        ? inputs.rootTubeInterval.summary?.complement_interval_count ?? null
        : 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    branch_chart_authorized_rows: 0,
    preledger_pass_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-atlas-ref-source-candidate-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status:
      "higher_fold_layer_atlas_ref_source_candidate_classifier_fail_closed_candidate_refs_only_no_alpha_exit_parity_impulse_or_consumption_no_row_consumption",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only same-packet candidate atlas-ref source classifier for the 112 higher-fold fold-layer rows; no accepted higher_fold_layer_atlas_ref, alpha floor, exit floor, parity record, fold impulse/direct quadrature bound, parent-complement consumption ref, row consumption, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_proof_interval_v6_ledger: artifactRecord(paths.ledger),
      higher_fold_layer_same_packet_field_readiness_classifier: artifactRecord(paths.readiness),
      fold_layer_burden_atlas: artifactRecord(paths.foldLayerBurden),
      phi_cyc: artifactRecord(paths.phiCyc),
      mesh: artifactRecord(paths.mesh),
      causal_preledger_input_screen: artifactRecord(paths.inputScreen),
      higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTubeInterval),
      proof_interval_backend_certificate: artifactRecord(paths.backend),
    },
    materialization_rule:
      "A separator atlas source candidate is materialized only as a same-packet pointer tying one Sigma_hf separator to its phi_cyc contact, fold interval, root-tube interval certificate, ledger interval, input-screen interval, mesh preledger interval, and mesh subblock. It does not supply an accepted higher_fold_layer_atlas_ref, alpha_floor, exit_floor, same_packet_fold_impulse_or_direct_quadrature_bound, fold_layer_parity_record, or parent_complement_consumption_ref.",
    no_promotion_rule:
      "Candidate atlas refs are source-side classifiers only. This artifact does not promote candidate_higher_fold_layer_atlas_ref into accepted higher_fold_layer_atlas_ref.",
    readiness_delta: {
      candidate_higher_fold_layer_atlas_ref: {
        before_present_rows: 0,
        after_present_rows: summary.rows_with_candidate_higher_fold_layer_atlas_ref,
      },
      accepted_higher_fold_layer_atlas_ref: {
        before_present_rows: inputs.readiness.summary?.same_packet_field_presence_counts?.higher_fold_layer_atlas_ref?.present ?? null,
        after_present_rows: 0,
      },
      alpha_floor: {
        before_present_rows: inputs.readiness.summary?.same_packet_field_presence_counts?.alpha_floor?.present ?? null,
        after_present_rows: 0,
      },
      exit_floor: {
        before_present_rows: inputs.readiness.summary?.same_packet_field_presence_counts?.exit_floor?.present ?? null,
        after_present_rows: 0,
      },
      same_packet_fold_impulse_or_direct_quadrature_bound: {
        before_present_rows:
          inputs.readiness.summary?.same_packet_field_presence_counts
            ?.same_packet_fold_impulse_or_direct_quadrature_bound?.present ?? null,
        after_present_rows: 0,
      },
      fold_layer_parity_record: {
        before_present_rows:
          inputs.readiness.summary?.same_packet_field_presence_counts?.fold_layer_parity_record?.present ?? null,
        after_present_rows: 0,
      },
      parent_complement_consumption_ref: {
        before_present_rows:
          inputs.readiness.summary?.same_packet_field_presence_counts?.parent_complement_consumption_ref?.present ?? null,
        after_present_rows: 0,
      },
    },
    atlas_source_candidates: separatorEntries,
    row_candidate_classification: rowMaterialization,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "accepted higher_fold_layer_atlas_ref / alpha_floor / exit_floor / fold_layer_parity_record / same_packet_fold_impulse_or_direct_quadrature_bound / parent_complement_consumption_ref above candidate_higher_fold_layer_atlas_ref source records",
      continuation_class:
        "mechanical separator-layer certificate until an accepted-field proof obligation is reached; continue by proving that the candidate atlas source records satisfy accepted higher_fold_layer_atlas_ref, then prove alpha and exit floors, parity records, fold impulse/direct quadrature bounds, and parent-complement consumption refs for Sigma_hf_01 through Sigma_hf_12",
      fail_closed_stop_conditions: [
        "Do not consume fold-layer rows from a candidate atlas source ref alone.",
        "Do not treat candidate_higher_fold_layer_atlas_ref as accepted higher_fold_layer_atlas_ref.",
        "Do not count a root-tube interval certificate as an alpha floor, exit floor, parity record, fold impulse bound, direct quadrature bound, or parent-complement consumption ref.",
        "Do not set preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this candidate classifier.",
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
      "Priority-only. This artifact materializes same-packet candidate atlas source refs for the fold-layer row family, but it proves no accepted higher_fold_layer_atlas_ref, row-acceptance floors, parity, impulse/direct quadrature bounds, parent-complement consumption, row consumption, live-ledger update, or branch-chart authorization.",
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

function fieldTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(entries) {
  return entries
    .map(
      (entry) =>
        `| \`${entry.atlas_candidate_id}\` | \`${entry.separator_event}\` | \`${entry.fold_interval}\` | ${entry.fold_interval_order} | ${entry.theta_center} | ${entry.t_center} | ${entry.layer_radius_theta} | ${entry.layer_radius_t} | \`${entry.velocity_contact}\` | \`${entry.root_tube_equation}\` | ${entry.root_tube_interval_certified_one_root} | ${entry.row_count} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | \`${row.candidate_higher_fold_layer_atlas_ref}\` | ${row.accepted_higher_fold_layer_atlas_ref} | \`${row.first_missing_same_packet_field_after_candidate_classification}\` | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, materialization) {
  const report = `# Higher-Fold Layer Atlas-Ref Source Candidate Classifier

Packet: \`${PACKET_ID}\`

Status: \`${materialization.status}\`

Claim level: ${materialization.claim_level}

## Blocker Sharpened

This attempt materializes one same-packet candidate atlas source ref for each of
the 12 higher-fold separator layers and assigns those candidate refs to the 112
proof-interval v6 fold-layer rows.

The result is fail-closed. It produces 112 / 112 candidate
\`candidate_higher_fold_layer_atlas_ref\` row associations, but leaves 0 / 112
rows with accepted \`higher_fold_layer_atlas_ref\`, \`alpha_floor\`,
\`exit_floor\`,
\`same_packet_fold_impulse_or_direct_quadrature_bound\`,
\`fold_layer_parity_record\`, or \`parent_complement_consumption_ref\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(materialization.source_artifacts)}

## Atlas Source Candidates

| Candidate atlas ref | Separator | Fold interval | Order | Theta center | Time center | Theta radius | Time radius | Velocity contact | Root-tube equation | One root | Rows |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | ---: |
${separatorTable(materialization.atlas_source_candidates)}

## Accepted Field Presence After Candidate Classification

| Same-packet field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(materialization.summary.accepted_same_packet_field_presence_counts_after_candidate_classification)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(materialization.summary.rows_by_separator_count)}

## Row Candidate Classification

| Row | Separator | Fold interval | Receiver | Source | Candidate atlas ref | Accepted atlas ref | First remaining missing field | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(materialization.row_candidate_classification)}

## Certificate-Side Handoff

Next artifact target: \`${materialization.next_certificate_handoff.artifact_target}\`.

Continuation class: ${materialization.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${materialization.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is a priority-only atlas-ref source candidate classifier. It
proves no accepted \`higher_fold_layer_atlas_ref\`, alpha floor, exit floor,
parity record, fold impulse/direct quadrature bound, parent-complement
consumption ref, row consumption, live-ledger update, or branch-chart
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
    ledger: args.ledger,
    readiness: args.readiness,
    foldLayerBurden: args.foldLayerBurden,
    phiCyc: args.phiCyc,
    mesh: args.mesh,
    inputScreen: args.inputScreen,
    rootTubeInterval: args.rootTubeInterval,
    backend: args.backend,
  };
  const inputs = {
    ledger: readJson(paths.ledger),
    readiness: readJson(paths.readiness),
    foldLayerBurden: readJson(paths.foldLayerBurden),
    phiCyc: readJson(paths.phiCyc),
    mesh: readJson(paths.mesh),
    inputScreen: readJson(paths.inputScreen),
    rootTubeInterval: readJson(paths.rootTubeInterval),
    backend: readJson(paths.backend),
  };
  const materialization = buildMaterialization(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, materialization, args.pretty);
  writeReport(outReport, materialization);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

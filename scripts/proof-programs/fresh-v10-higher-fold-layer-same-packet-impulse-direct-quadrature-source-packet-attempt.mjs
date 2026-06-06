#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_PROOF_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SOURCE_READINESS = `${CERT_DIR}/higher_fold_layer_separator_source_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.lambda0305.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_DIAGNOSTIC_FOLD_IMPULSE_CONSTANTS = `${CERT_DIR}/fold_impulse_constants.json`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_interval_constants_contract.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_impulse_direct_quadrature_source_packet_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_impulse_direct_quadrature_source_packet_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const STATUS =
  "higher_fold_layer_same_packet_impulse_direct_quadrature_source_packet_attempt_fail_closed_full_rectangle_interval_sources_present_integrand_quadrature_enclosures_absent_no_row_consumption";
const SOURCE_PACKET_FIELD = "same_packet_fold_impulse_or_direct_quadrature_bound";
const FIRST_PRIOR_BLOCKER = "same_packet_fold_impulse_or_direct_quadrature_bound_source_packet_absent";
const FIRST_ROUTE_BLOCKER = "mollifier_or_direct_quadrature_route_declaration_absent";
const FIRST_ACCEPTANCE_BLOCKER = "row_projection_source_slice_coverage_certificate_absent";
const FIRST_NUMERICAL_ENCLOSURE_BLOCKER = "dual_mollified_row_integrand_interval_enclosure_absent";

function parseArgs(argv) {
  const args = {
    proofDependency: DEFAULT_PROOF_DEPENDENCY,
    sourceReadiness: DEFAULT_SOURCE_READINESS,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
    inputScreen: DEFAULT_INPUT_SCREEN,
    mesh: DEFAULT_MESH,
    diagnosticFoldImpulseConstants: DEFAULT_DIAGNOSTIC_FOLD_IMPULSE_CONSTANTS,
    contract: DEFAULT_CONTRACT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--proof-dependency") {
      args.proofDependency = argv[++index];
    } else if (arg === "--source-readiness") {
      args.sourceReadiness = argv[++index];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++index];
    } else if (arg === "--input-screen") {
      args.inputScreen = argv[++index];
    } else if (arg === "--mesh") {
      args.mesh = argv[++index];
    } else if (arg === "--diagnostic-fold-impulse-constants") {
      args.diagnosticFoldImpulseConstants = argv[++index];
    } else if (arg === "--contract") {
      args.contract = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-impulse-direct-quadrature-source-packet-attempt.mjs [options]

Options:
  --proof-dependency PATH                 Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_DEPENDENCY}.
  --source-readiness PATH                 Separator source-field readiness classifier. Defaults to ${DEFAULT_SOURCE_READINESS}.
  --fold-layer-burden PATH                Fold-layer burden atlas. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --input-screen PATH                     Causal preledger input screen. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --mesh PATH                             Same-packet mesh. Defaults to ${DEFAULT_MESH}.
  --diagnostic-fold-impulse-constants PATH Diagnostic fold impulse constants. Defaults to ${DEFAULT_DIAGNOSTIC_FOLD_IMPULSE_CONSTANTS}.
  --contract PATH                         Fold interval constants contract. Defaults to ${DEFAULT_CONTRACT}.
  --out-dir PATH                          Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                Pretty-print JSON artifact.
  --help                                  Show this help.`);
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

function validateFailClosedArtifact(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false || source.branch_chart_authorized !== false) {
    throw new Error(`Refusing ${name}: fail-closed authorization lock drifted.`);
  }
}

function validateNoLedgerUpdateArtifact(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`Refusing ${name}: preledger/live-ledger lock drifted.`);
  }
  if ("branch_chart_authorized" in source && source.branch_chart_authorized !== false) {
    throw new Error(`Refusing ${name}: branch-chart lock drifted.`);
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

function fieldPresenceCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => row[field] === true);
      return [
        field,
        {
          present,
          missing: rows.length - present,
        },
      ];
    }),
  );
}

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function decimalWidth(range) {
  if (!Array.isArray(range) || range.length !== 2) {
    return null;
  }
  const lo = Number(range[0]);
  const hi = Number(range[1]);
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) {
    return null;
  }
  return hi - lo;
}

function decimalDisplay(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(17)).toString();
}

function sum(rows, getter) {
  return rows.reduce((total, row) => total + (Number(getter(row)) || 0), 0);
}

function max(rows, getter) {
  return rows.reduce((current, row) => {
    const value = Number(getter(row));
    return Number.isFinite(value) ? Math.max(current, value) : current;
  }, 0);
}

function intervalIndex(inputScreen) {
  return new Map(inputScreen.intervals.map((interval) => [interval.interval_id, interval]));
}

function subblockIndex(mesh) {
  return new Map(mesh.subblocks.map((subblock) => [subblock.id, subblock]));
}

function validateInputs(inputs) {
  assertPacketId(inputs.proofDependency, "proofDependency");
  assertPacketId(inputs.sourceReadiness, "sourceReadiness");
  assertPacketId(inputs.foldLayerBurden, "foldLayerBurden");
  assertPacketId(inputs.inputScreen, "inputScreen");
  assertPacketId(inputs.mesh, "mesh");

  validateFailClosedArtifact(inputs.proofDependency, "proofDependency");
  validateFailClosedArtifact(inputs.sourceReadiness, "sourceReadiness");
  validateFailClosedArtifact(inputs.foldLayerBurden, "foldLayerBurden");
  validateFailClosedArtifact(inputs.inputScreen, "inputScreen");
  validateNoLedgerUpdateArtifact(inputs.mesh, "mesh");

  if (inputs.proofDependency.summary?.first_same_packet_source_packet_blocker !== FIRST_PRIOR_BLOCKER) {
    throw new Error("Proof-field dependency classifier no longer points to the expected source-packet blocker.");
  }
  if (
    inputs.proofDependency.summary?.proof_field_dependency_counts?.[SOURCE_PACKET_FIELD]?.same_packet_source_packet_present !== 0
  ) {
    throw new Error("Proof-field dependency classifier already reports a same-packet impulse/direct-quadrature source packet.");
  }
  if (inputs.sourceReadiness.summary?.separator_profiles_with_candidate_interval_source_complete !== 12) {
    throw new Error("Expected 12 complete candidate interval source profiles.");
  }
  if (inputs.sourceReadiness.summary?.rows_with_candidate_interval_source_complete !== 112) {
    throw new Error("Expected 112 rows with candidate interval source completeness.");
  }
  if (inputs.foldLayerBurden.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer burden rows.");
  }
  if (inputs.inputScreen.summary?.accepted_rows !== 0 || inputs.inputScreen.summary?.branch_chart_authorized !== false) {
    throw new Error("Input screen unexpectedly reports accepted rows or branch-chart authorization.");
  }
  if (inputs.diagnosticFoldImpulseConstants.packet_id === PACKET_ID) {
    throw new Error("Diagnostic fold impulse constants unexpectedly match the higher-fold packet.");
  }
}

function buildRowAttempt(row, indexes) {
  const receiverInterval = indexes.intervals.get(row.receiver_interval);
  const sourceInterval = indexes.intervals.get(row.source_interval);
  const foldSubblock = indexes.subblocks.get(row.fold_interval);
  const receiverTWidth = decimalWidth(receiverInterval?.t_range);
  const sourceTWidth = decimalWidth(sourceInterval?.t_range);
  const receiverThetaWidth = decimalWidth(row.receiver_theta_range);
  const sourceThetaWidth = decimalWidth(row.source_theta_range);
  const foldThetaWidth = decimalWidth(row.fold_theta_range);
  const foldTWidth = decimalWidth(row.fold_time_range);
  const fullRectangleIntervalSourcesPresent =
    Array.isArray(row.receiver_theta_range) &&
    Array.isArray(row.source_theta_range) &&
    Array.isArray(row.fold_theta_range) &&
    Array.isArray(row.fold_time_range) &&
    Array.isArray(receiverInterval?.t_range) &&
    Array.isArray(sourceInterval?.t_range) &&
    foldSubblock?.separator_event === row.separator_event;

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
    candidate_row_projection: "full_input_screen_receiver_interval",
    candidate_source_slice: "full_input_screen_source_interval_for_all_receiver_t",
    same_packet_identity_refs_present: true,
    row_family_complete: true,
    receiver_theta_range: row.receiver_theta_range,
    source_theta_range: row.source_theta_range,
    receiver_t_range: receiverInterval?.t_range ?? null,
    source_t_range: sourceInterval?.t_range ?? null,
    fold_theta_range: row.fold_theta_range,
    fold_t_range: row.fold_time_range,
    receiver_theta_width_decimal: decimalDisplay(receiverThetaWidth),
    source_theta_width_decimal: decimalDisplay(sourceThetaWidth),
    receiver_t_width_decimal: decimalDisplay(receiverTWidth),
    source_t_width_decimal: decimalDisplay(sourceTWidth),
    fold_theta_width_decimal: decimalDisplay(foldThetaWidth),
    fold_t_width_decimal: decimalDisplay(foldTWidth),
    full_rectangle_interval_sources_present: fullRectangleIntervalSourcesPresent,
    row_projection_source_slice_candidate_present: fullRectangleIntervalSourcesPresent,
    mollifier_route_declared: false,
    direct_quadrature_route_declared: false,
    M_delta_interval_certified: false,
    Gamma_g_coupling_certified: false,
    row_tube_projection_E_B_present: false,
    source_slice_S_B_t_present: false,
    L_r_B_present: false,
    L_s_B_present: false,
    accepted_row_projection_source_slice_coverage_certificate: false,
    dual_mollified_row_integrand_interval_enclosure: false,
    direct_quadrature_interval_enclosure: false,
    mollifier_norm_interval_certificate: false,
    row_acceleration_enclosure: false,
    row_acceleration_enclosure_A_B_present: false,
    row_impulse_enclosure: false,
    direct_quadrature_I_fold_B_present: false,
    same_packet_fold_impulse_or_direct_quadrature_bound_present: false,
    first_missing_source_packet_field: FIRST_ROUTE_BLOCKER,
    first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
}

function separatorProfiles(sourceReadiness, rowAttempts) {
  const rowsBySeparator = new Map();
  for (const row of rowAttempts) {
    if (!rowsBySeparator.has(row.separator_event)) {
      rowsBySeparator.set(row.separator_event, []);
    }
    rowsBySeparator.get(row.separator_event).push(row);
  }

  return [...sourceReadiness.separator_source_field_profiles]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((profile) => {
      const rows = rowsBySeparator.get(profile.separator_event) ?? [];
      const fullRectangleRows = countTrue(rows, (row) => row.full_rectangle_interval_sources_present);
      const rowProjectionRows = countTrue(rows, (row) => row.row_projection_source_slice_candidate_present);
      return {
        separator_event: profile.separator_event,
        fold_interval: profile.fold_interval,
        atlas_candidate_id: profile.atlas_candidate_id,
        row_count: rows.length,
        row_ids: rows.map((row) => row.row_id),
        root_tube_ref: profile.root_tube_ref,
        root_tube_interval_certified_one_root: profile.root_tube_interval_certified_one_root === true,
        root_tube_derivative_floor_display: profile.root_tube_derivative_floor_display,
        candidate_interval_source_complete: profile.candidate_interval_source_complete === true,
        full_rectangle_interval_source_rows: fullRectangleRows,
        row_projection_source_slice_candidate_rows: rowProjectionRows,
        same_packet_identity_refs_present: true,
        row_family_complete: rows.length === profile.row_count && rows.length > 0,
        root_complement_no_extra_root_packet_source: true,
        mollifier_route_declared: false,
        direct_quadrature_route_declared: false,
        M_delta_interval_certified: false,
        Gamma_g_coupling_certified: false,
        receiver_t_width_sum_decimal: decimalDisplay(sum(rows, (row) => row.receiver_t_width_decimal)),
        source_t_width_sum_decimal: decimalDisplay(sum(rows, (row) => row.source_t_width_decimal)),
        max_receiver_t_width_decimal: decimalDisplay(max(rows, (row) => row.receiver_t_width_decimal)),
        max_source_t_width_decimal: decimalDisplay(max(rows, (row) => row.source_t_width_decimal)),
        accepted_row_projection_source_slice_coverage_certificates: 0,
        dual_mollified_row_integrand_interval_enclosures: 0,
        direct_quadrature_interval_enclosures: 0,
        row_impulse_enclosures: 0,
        separator_aggregate_C_Sigma_present: false,
        separator_aggregate_A_Sigma_eta_epsilon_c_present: false,
        separator_aggregate_I_fold_eta_epsilon_c_Sigma_present: false,
        separator_impulse_aggregate_enclosure: false,
        same_packet_fold_impulse_or_direct_quadrature_bound_source_packet: false,
        first_missing_source_packet_field: FIRST_ROUTE_BLOCKER,
        first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
        first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const indexes = {
    intervals: intervalIndex(inputs.inputScreen),
    subblocks: subblockIndex(inputs.mesh),
  };
  const rowAttempts = [...inputs.foldLayerBurden.rows]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => buildRowAttempt(row, indexes));
  const separatorAttempts = separatorProfiles(inputs.sourceReadiness, rowAttempts);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowAttempts, (row) => row.separator_event));
  const separatorChecklistFields = [
    "same_packet_identity_refs_present",
    "row_family_complete",
    "root_tube_interval_certified_one_root",
    "root_complement_no_extra_root_packet_source",
    "mollifier_route_declared",
    "direct_quadrature_route_declared",
    "M_delta_interval_certified",
    "Gamma_g_coupling_certified",
    "separator_aggregate_C_Sigma_present",
    "separator_aggregate_A_Sigma_eta_epsilon_c_present",
    "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
    "same_packet_fold_impulse_or_direct_quadrature_bound_source_packet",
  ];
  const rowChecklistFields = [
    "same_packet_identity_refs_present",
    "row_family_complete",
    "full_rectangle_interval_sources_present",
    "row_projection_source_slice_candidate_present",
    "mollifier_route_declared",
    "direct_quadrature_route_declared",
    "M_delta_interval_certified",
    "Gamma_g_coupling_certified",
    "row_tube_projection_E_B_present",
    "source_slice_S_B_t_present",
    "L_r_B_present",
    "L_s_B_present",
    "accepted_row_projection_source_slice_coverage_certificate",
    "row_acceleration_enclosure_A_B_present",
    "dual_mollified_row_integrand_interval_enclosure",
    "direct_quadrature_I_fold_B_present",
    "direct_quadrature_interval_enclosure",
    "row_impulse_enclosure",
  ];

  const summary = {
    separator_source_packet_attempts: separatorAttempts.length,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_full_rectangle_interval_sources: countTrue(rowAttempts, (row) => row.full_rectangle_interval_sources_present),
    rows_with_row_projection_source_slice_candidates: countTrue(
      rowAttempts,
      (row) => row.row_projection_source_slice_candidate_present,
    ),
    rows_with_accepted_row_projection_source_slice_coverage_certificate: 0,
    rows_with_dual_mollified_row_integrand_interval_enclosure: 0,
    rows_with_direct_quadrature_interval_enclosure: 0,
    rows_with_mollifier_norm_interval_certificate: 0,
    rows_with_row_acceleration_enclosure: 0,
    rows_with_row_impulse_enclosure: 0,
    separators_with_full_rectangle_interval_sources: countTrue(
      separatorAttempts,
      (separator) => separator.full_rectangle_interval_source_rows === separator.row_count,
    ),
    separators_with_row_projection_source_slice_candidates: countTrue(
      separatorAttempts,
      (separator) => separator.row_projection_source_slice_candidate_rows === separator.row_count,
    ),
    separators_with_separator_impulse_aggregate_enclosure: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    diagnostic_fold_impulse_constants_packet_id: inputs.diagnosticFoldImpulseConstants.packet_id ?? null,
    diagnostic_fold_impulse_constants_status: inputs.diagnosticFoldImpulseConstants.status ?? null,
    diagnostic_fold_impulse_constants_reusable: false,
    first_prior_blocker: FIRST_PRIOR_BLOCKER,
    first_interval_source_handoff: "full_input_screen_row_rectangle_sources_present_for_112_rows",
    first_missing_source_packet_field: FIRST_ROUTE_BLOCKER,
    first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    separator_source_packet_field_presence_counts: fieldPresenceCounts(separatorAttempts, separatorChecklistFields),
    row_source_packet_field_presence_counts: fieldPresenceCounts(rowAttempts, rowChecklistFields),
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-same-packet-impulse-direct-quadrature-source-packet-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only same-packet impulse/direct-quadrature source-packet attempt; assembles full input-screen row-rectangle interval sources for the 112 higher-fold fold-layer rows while proving no accepted row projection/source-slice coverage certificate, no dual-mollified row integrand enclosure, no direct quadrature enclosure, no row impulse enclosure, no source-packet acceptance, no row consumption, no preledger pass, no live-ledger update, and no branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofDependency),
      higher_fold_layer_separator_source_field_readiness_classifier: artifactRecord(paths.sourceReadiness),
      fold_layer_burden_atlas: artifactRecord(paths.foldLayerBurden),
      causal_preledger_input_screen: artifactRecord(paths.inputScreen),
      same_packet_mesh: artifactRecord(paths.mesh),
      diagnostic_fold_impulse_constants: artifactRecord(paths.diagnosticFoldImpulseConstants),
      fold_interval_constants_contract: artifactRecord(paths.contract),
    },
    packet_attempt_rule:
      "A same-packet impulse/direct-quadrature source packet must bind every row to same-packet interval geometry and then supply accepted row projection/source-slice coverage, a dual-mollified row integrand interval enclosure or interval-certified mollifier-norm route, row impulse enclosures, and separator aggregate enclosures. This attempt supplies only the first interval-source layer and remains fail-closed.",
    separator_source_packet_attempts: separatorAttempts,
    row_source_packet_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      first_reduced_blocker: FIRST_ACCEPTANCE_BLOCKER,
      first_missing_source_packet_field: FIRST_ROUTE_BLOCKER,
      first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
      mechanical_continuation:
        "declare and certify either the mollifier route or direct-quadrature route, then construct an accepted row_projection_source_slice_coverage_certificate and dual_mollified_row_integrand_interval_enclosure for each of the 112 higher-fold fold-layer rows, then aggregate them by Sigma_hf_01 through Sigma_hf_12",
      final_certificate_target:
        "same_packet_fold_impulse_or_direct_quadrature_bound source packet feeding the higher_fold_separator_layer_certificate for Sigma_hf_01 through Sigma_hf_12",
      decision_boundary:
        "if the dual-mollified row law, mollifier norm, or direct-quadrature convention cannot be stated from same-packet interval sources, the lane reaches a proof-rule or primitive-acceptance decision before source-packet acceptance or row consumption",
      fail_closed_stop_conditions: [
        "Do not treat full input-screen row rectangles as accepted row projection/source-slice coverage certificates.",
        "Do not treat absent integrand or quadrature enclosures as finite row impulse enclosures.",
        "Do not reuse wrong-packet diagnostic fold impulse constants.",
        "Do not set same_packet_fold_impulse_or_direct_quadrature_bound, higher_fold_separator_layer_certificate, preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this attempt.",
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
      "Priority-only. This attempt reduces the source-packet blocker from absent packet to present same-packet full-rectangle interval sources plus missing coverage and integrand/quadrature enclosures.",
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

function presenceTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(profiles) {
  return profiles
    .map(
      (profile) =>
        `| \`${profile.separator_event}\` | \`${profile.fold_interval}\` | ${profile.row_count} | ${profile.full_rectangle_interval_source_rows} | ${profile.row_projection_source_slice_candidate_rows} | ${profile.accepted_row_projection_source_slice_coverage_certificates} | ${profile.dual_mollified_row_integrand_interval_enclosures} | ${profile.direct_quadrature_interval_enclosures} | ${profile.row_impulse_enclosures} | \`${profile.first_acceptance_blocker}\` | \`${profile.first_numerical_enclosure_blocker}\` |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Same-Packet Impulse/Direct-Quadrature Source-Packet Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

The previous dependency classifier stopped at
\`${attempt.summary.first_prior_blocker}\`. This source-packet attempt reduces
that blocker to a concrete interval handoff: ${attempt.summary.rows_with_full_rectangle_interval_sources} /
${attempt.summary.fold_layer_rows} fold-layer rows and
${attempt.summary.separators_with_full_rectangle_interval_sources} /
${attempt.summary.separator_source_packet_attempts} separator layers have
same-packet full input-screen row-rectangle interval sources.

The packet still fails closed. The first acceptance blocker is
\`${attempt.summary.first_acceptance_blocker}\`; the first numerical enclosure
blocker is \`${attempt.summary.first_numerical_enclosure_blocker}\`. It records
0 accepted row projection/source-slice coverage certificates, 0 dual-mollified
row integrand interval enclosures, 0 direct quadrature enclosures, 0 row impulse
enclosures, and 0 accepted
\`${SOURCE_PACKET_FIELD}\` source packets.

The diagnostic fold impulse constants remain non-reusable:
\`packet_id=${attempt.summary.diagnostic_fold_impulse_constants_packet_id}\`,
\`status=${attempt.summary.diagnostic_fold_impulse_constants_status}\`.

The first source-packet checklist field still absent is
\`${attempt.summary.first_missing_source_packet_field}\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Separator Source-Packet Attempts

| Separator | Fold interval | Rows | Full rectangle sources | Projection/source-slice candidates | Accepted coverage certs | Integrand enclosures | Direct quadrature enclosures | Row impulse enclosures | First acceptance blocker | First numerical blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
${separatorTable(attempt.separator_source_packet_attempts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Source-Packet Field Checklist

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.separator_source_packet_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.row_source_packet_field_presence_counts)}

## Summary

| Field | Count |
| --- | ---: |
| Separator source-packet attempts | ${attempt.summary.separator_source_packet_attempts} |
| Fold-layer rows | ${attempt.summary.fold_layer_rows} |
| Rows with full rectangle interval sources | ${attempt.summary.rows_with_full_rectangle_interval_sources} |
| Rows with row projection/source-slice candidates | ${attempt.summary.rows_with_row_projection_source_slice_candidates} |
| Rows with accepted projection/source-slice coverage certificate | ${attempt.summary.rows_with_accepted_row_projection_source_slice_coverage_certificate} |
| Rows with dual-mollified row integrand interval enclosure | ${attempt.summary.rows_with_dual_mollified_row_integrand_interval_enclosure} |
| Rows with direct quadrature interval enclosure | ${attempt.summary.rows_with_direct_quadrature_interval_enclosure} |
| Rows with mollifier-norm interval certificate | ${attempt.summary.rows_with_mollifier_norm_interval_certificate} |
| Rows with row acceleration enclosure | ${attempt.summary.rows_with_row_acceleration_enclosure} |
| Rows with row impulse enclosure | ${attempt.summary.rows_with_row_impulse_enclosure} |
| Accepted source packets | ${attempt.summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets} |
| Accepted fold-layer rows | ${attempt.summary.accepted_fold_layer_rows} |
| Row consumption count | ${attempt.summary.row_consumption_count} |
| Preledger pass rows | ${attempt.summary.preledger_pass_rows} |
| Branch-chart authorized rows | ${attempt.summary.branch_chart_authorized_rows} |

## Certificate-Side Handoff

First reduced blocker:
\`${attempt.next_certificate_handoff.first_reduced_blocker}\`.

First missing source-packet checklist field:
\`${attempt.next_certificate_handoff.first_missing_source_packet_field}\`.

First numerical enclosure blocker:
\`${attempt.next_certificate_handoff.first_numerical_enclosure_blocker}\`.

Mechanical continuation: ${attempt.next_certificate_handoff.mechanical_continuation}.

Final certificate target: ${attempt.next_certificate_handoff.final_certificate_target}.

Decision boundary: ${attempt.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is priority-only source-packet scaffolding. It proves no accepted
\`${SOURCE_PACKET_FIELD}\`, no \`higher_fold_separator_layer_certificate\`, no
row consumption, no live-ledger update, and no branch-chart authorization.
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
    proofDependency: args.proofDependency,
    sourceReadiness: args.sourceReadiness,
    foldLayerBurden: args.foldLayerBurden,
    inputScreen: args.inputScreen,
    mesh: args.mesh,
    diagnosticFoldImpulseConstants: args.diagnosticFoldImpulseConstants,
    contract: args.contract,
  };
  const inputs = {
    proofDependency: readJson(paths.proofDependency),
    sourceReadiness: readJson(paths.sourceReadiness),
    foldLayerBurden: readJson(paths.foldLayerBurden),
    inputScreen: readJson(paths.inputScreen),
    mesh: readJson(paths.mesh),
    diagnosticFoldImpulseConstants: readJson(paths.diagnosticFoldImpulseConstants),
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

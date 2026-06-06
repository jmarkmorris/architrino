#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROW_FAMILY = `${CERT_DIR}/preledger_row_family_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_BOUNDARY_OPENING = `${CERT_DIR}/one_leaf_boundary_opening_interval_certificate_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ACTIVE_ENDPOINT_ENCLOSURE = `${CERT_DIR}/one_leaf_active_endpoint_interval_enclosure_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ENDPOINT_BOX = `${CERT_DIR}/one_leaf_active_endpoint_interval_box_no_switch_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RESIDUAL_SOURCE_DATA = `${CERT_DIR}/one_leaf_active_endpoint_residual_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RESIDUAL_DATA = `${CERT_DIR}/one_leaf_active_endpoint_residual_data_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PROOF_DATA = `${CERT_DIR}/one_leaf_active_endpoint_interval_enclosure_proof_data_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_SOURCE_LAYER = `${CERT_DIR}/one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_proof_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `one_leaf_proof_data_readiness_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SCREEN_ORDER = [
  "candidate_lambda_interval_declared",
  "candidate_lambda_interval_nonempty",
  "sampled_active_endpoint_stability_present",
  "sampled_endpoint_values_present",
  "sampled_lambda_derivative_sample_present",
  "constant_theta_endpoint_box_candidate_present",
  "sampled_opening_above_probe_threshold_present",
  "active_endpoint_interval_enclosure_proof_data_target_declared",
];

const INTERVAL_CERTIFICATE_ORDER = [
  "source_endpoint_interval_box_constructed",
  "receiver_endpoint_interval_box_constructed",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "source_endpoint_residual_interval_bound_constructed",
  "receiver_endpoint_residual_interval_bound_constructed",
  "source_endpoint_derivative_isolation_certified",
  "receiver_endpoint_derivative_isolation_certified",
  "source_endpoint_unique_on_interval_certified",
  "receiver_endpoint_unique_on_interval_certified",
  "active_endpoint_pair_constant_on_interval_certified",
  "source_endpoint_switch_exclusion_certified",
  "receiver_endpoint_switch_exclusion_certified",
  "endpoint_switch_exclusion_certified",
  "active_endpoint_gap_margin_positive_on_interval",
  "interval_active_endpoint_enclosure_present",
  "interval_defect_derivative_bound_present",
  "strict_combined_boundary_opening_gt_threshold",
  "interval_boundary_opening_positive_certified",
  "source_monotonicity_preserved_on_interval",
  "receiver_monotonicity_preserved_on_interval",
  "memory_margins_certified_on_interval",
  "endpoint_ownership_no_double_counting_certified",
  "simple_root_branch_reuse_exclusion_certified",
  "non_owned_complement_closed",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

const SOURCE_LAYER_ORDER = [
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "source_endpoint_residual_formula_present",
  "receiver_endpoint_residual_formula_present",
  "source_endpoint_domain_chart_present",
  "receiver_endpoint_domain_chart_present",
  "source_endpoint_evaluation_rule_present",
  "receiver_endpoint_evaluation_rule_present",
  "source_endpoint_motion_rule_present",
  "receiver_endpoint_motion_rule_present",
  "source_residual_derivative_formula_present",
  "receiver_residual_derivative_formula_present",
  "source_residual_outward_rounding_rule_present",
  "receiver_residual_outward_rounding_rule_present",
];

const RESIDUAL_SOURCE_DATA_ORDER = [
  "source_endpoint_residual_formula_present",
  "receiver_endpoint_residual_formula_present",
  "source_endpoint_domain_chart_present",
  "receiver_endpoint_domain_chart_present",
  "source_endpoint_evaluation_rule_present",
  "receiver_endpoint_evaluation_rule_present",
  "source_endpoint_motion_rule_present",
  "receiver_endpoint_motion_rule_present",
  "source_residual_derivative_formula_present",
  "receiver_residual_derivative_formula_present",
  "source_residual_outward_rounding_rule_present",
  "receiver_residual_outward_rounding_rule_present",
  "competing_endpoint_inventory_present",
  "competing_endpoint_exclusion_rule_present",
  "endpoint_gap_function_present",
  "endpoint_gap_margin_bound_present",
  "interval_box_radius_rule_present",
];

const RESIDUAL_DATA_ORDER = [
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_boundary_binding_pair_constructed",
  "same_packet_history_update_formula_present",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "endpoint_residual_interval_bound_constructed",
  "endpoint_derivative_isolation_certified",
  "endpoint_uniqueness_certified",
  "competing_endpoint_exclusion_certified",
  "endpoint_gap_interval_bound_constructed",
  "interval_active_endpoint_enclosure_present",
];

function parseArgs(argv) {
  const args = {
    rowFamily: DEFAULT_ROW_FAMILY,
    boundaryOpening: DEFAULT_BOUNDARY_OPENING,
    activeEndpointEnclosure: DEFAULT_ACTIVE_ENDPOINT_ENCLOSURE,
    endpointBox: DEFAULT_ENDPOINT_BOX,
    residualSourceData: DEFAULT_RESIDUAL_SOURCE_DATA,
    residualData: DEFAULT_RESIDUAL_DATA,
    proofData: DEFAULT_PROOF_DATA,
    sourceLayer: DEFAULT_SOURCE_LAYER,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--row-family") {
      args.rowFamily = argv[++index];
    } else if (arg === "--boundary-opening") {
      args.boundaryOpening = argv[++index];
    } else if (arg === "--active-endpoint-enclosure") {
      args.activeEndpointEnclosure = argv[++index];
    } else if (arg === "--endpoint-box") {
      args.endpointBox = argv[++index];
    } else if (arg === "--residual-source-data") {
      args.residualSourceData = argv[++index];
    } else if (arg === "--residual-data") {
      args.residualData = argv[++index];
    } else if (arg === "--proof-data") {
      args.proofData = argv[++index];
    } else if (arg === "--source-layer") {
      args.sourceLayer = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-proof-data-readiness-classifier.mjs [options]

Options:
  --row-family PATH                  Row-family classifier. Defaults to ${DEFAULT_ROW_FAMILY}.
  --boundary-opening PATH            Boundary-opening interval certificate attempt. Defaults to ${DEFAULT_BOUNDARY_OPENING}.
  --active-endpoint-enclosure PATH   Active-endpoint interval enclosure attempt. Defaults to ${DEFAULT_ACTIVE_ENDPOINT_ENCLOSURE}.
  --endpoint-box PATH                Endpoint interval-box no-switch construction attempt. Defaults to ${DEFAULT_ENDPOINT_BOX}.
  --residual-source-data PATH        Residual source-data audit. Defaults to ${DEFAULT_RESIDUAL_SOURCE_DATA}.
  --residual-data PATH               Residual data construction attempt. Defaults to ${DEFAULT_RESIDUAL_DATA}.
  --proof-data PATH                  Active-endpoint interval enclosure proof-data attempt. Defaults to ${DEFAULT_PROOF_DATA}.
  --source-layer PATH                Residual function on box source-layer attempt. Defaults to ${DEFAULT_SOURCE_LAYER}.
  --out-dir PATH                     Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                           Pretty-print JSON artifact.
  --help                             Show this help.`);
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

function getRegularFamily(rowFamily) {
  const family = (rowFamily.row_families ?? []).find(
    (entry) => entry.family_id === "regular_source_cover_parent_complement",
  );
  if (!family) {
    throw new Error("Missing regular_source_cover_parent_complement family.");
  }
  return family;
}

function rowById(rows, rowId, label) {
  const row = rows.find((entry) => entry.row_id === rowId);
  if (!row) {
    throw new Error(`Missing ${label} row ${rowId}.`);
  }
  return row;
}

function firstMissing(fields, order) {
  return order.find((field) => fields?.[field] !== true) ?? null;
}

function missingFields(fields, order) {
  return order.filter((field) => fields?.[field] !== true);
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function bothTrue(fields, left, right) {
  return fields?.[left] === true && fields?.[right] === true;
}

function stageForRow(row) {
  const interval = row.interval_certificate_fields_present ?? {};
  const screen = row.screen_fields_present ?? {};
  if (row.ready_flags?.interval_active_endpoint_enclosure_present === true) {
    return "active_endpoint_interval_enclosure_proof_data_ready";
  }
  if (
    row.ready_flags?.proof_data_target_declared === true &&
    interval.source_endpoint_interval_box_constructed !== true
  ) {
    return "target_declared_endpoint_interval_box_absent";
  }
  if (screen.sampled_active_endpoint_stability_present === true) {
    return "sampled_endpoint_data_present_proof_data_absent";
  }
  return "screen_data_incomplete";
}

function buildRowReadiness(inputs, rowId) {
  const rowFamilySummary = (inputs.regularFamily.one_leaf_direct_path_screen?.row_screen_summaries ?? []).find(
    (entry) => entry.row_id === rowId,
  );
  const boundary = rowById(inputs.boundary.row_interval_certificate_attempts ?? [], rowId, "boundary-opening");
  const enclosure = rowById(
    inputs.enclosure.row_active_endpoint_interval_enclosure_attempts ?? [],
    rowId,
    "active-endpoint enclosure",
  );
  const endpointBox = rowById(
    inputs.endpointBox.row_endpoint_interval_box_no_switch_attempts ?? [],
    rowId,
    "endpoint-box",
  );
  const residualSource = rowById(
    inputs.residualSource.row_active_endpoint_residual_source_data_audits ?? [],
    rowId,
    "residual source-data",
  );
  const residualData = rowById(
    inputs.residualData.row_active_endpoint_residual_data_construction_attempts ?? [],
    rowId,
    "residual data",
  );
  const proofData = rowById(
    inputs.proofData.row_active_endpoint_interval_enclosure_proof_data_construction_attempts ?? [],
    rowId,
    "proof data",
  );
  const sourceLayer = rowById(
    inputs.sourceLayer.row_active_endpoint_residual_function_on_box_source_layer_attempts ?? [],
    rowId,
    "source layer",
  );
  const proofFields = proofData.required_fields_present ?? {};
  const sourceLayerFields = sourceLayer.required_fields_present ?? {};
  const sourceDataFields = residualSource.required_fields_present ?? {};
  const residualDataFields = residualData.required_fields_present ?? {};
  const screenFields = SCREEN_ORDER.reduce((fields, key) => {
    fields[key] = proofFields[key] === true;
    return fields;
  }, {});
  const intervalFields = INTERVAL_CERTIFICATE_ORDER.reduce((fields, key) => {
    fields[key] = proofFields[key] === true;
    return fields;
  }, {});

  return {
    row_id: rowId,
    cover_id: proofData.cover_id,
    ledger: proofData.ledger,
    source_interval: proofData.source_interval,
    receiver_interval: proofData.receiver_interval,
    failed_side: proofData.failed_side,
    boundary_side: proofData.boundary_side,
    candidate_lambda_interval: proofData.candidate_lambda_interval,
    sampled_boundary_opening_margin_vs_probe_threshold_decimal:
      rowFamilySummary?.combined_boundary_opening_margin_vs_probe_threshold_decimal ??
      proofData.sampled_boundary_values?.combined_boundary_opening_margin_vs_probe_threshold_decimal ??
      null,
    screen_fields_present: screenFields,
    interval_certificate_fields_present: intervalFields,
    source_layer_first_missing_field: firstMissing(sourceLayerFields, SOURCE_LAYER_ORDER),
    residual_source_data_first_missing_field: firstMissing(sourceDataFields, RESIDUAL_SOURCE_DATA_ORDER),
    residual_data_first_missing_field: firstMissing(residualDataFields, RESIDUAL_DATA_ORDER),
    interval_certificate_first_missing_field: firstMissing(proofFields, INTERVAL_CERTIFICATE_ORDER),
    missing_interval_certificate_fields: missingFields(proofFields, INTERVAL_CERTIFICATE_ORDER),
    missing_source_layer_fields: missingFields(sourceLayerFields, SOURCE_LAYER_ORDER),
    row_stage: null,
    ready_flags: {
      screen_positive: proofFields.sampled_opening_above_probe_threshold_present === true,
      proof_data_target_declared: proofFields.active_endpoint_interval_enclosure_proof_data_target_declared === true,
      endpoint_boundary_binding_pair_constructed: proofFields.combined_boundary_binding_pair_constructed === true,
      endpoint_interval_box_pair_constructed: bothTrue(
        proofFields,
        "source_endpoint_interval_box_constructed",
        "receiver_endpoint_interval_box_constructed",
      ),
      endpoint_residual_function_pair_constructed: bothTrue(
        proofFields,
        "source_endpoint_residual_function_on_box_constructed",
        "receiver_endpoint_residual_function_on_box_constructed",
      ),
      endpoint_residual_interval_bound_pair_constructed: bothTrue(
        proofFields,
        "source_endpoint_residual_interval_bound_constructed",
        "receiver_endpoint_residual_interval_bound_constructed",
      ),
      endpoint_no_switch_certified: proofFields.endpoint_switch_exclusion_certified === true,
      interval_active_endpoint_enclosure_present: proofFields.interval_active_endpoint_enclosure_present === true,
      boundary_opening_interval_certified: proofFields.interval_boundary_opening_positive_certified === true,
      monotonicity_memory_ownership_complement_closed:
        proofFields.source_monotonicity_preserved_on_interval === true &&
        proofFields.receiver_monotonicity_preserved_on_interval === true &&
        proofFields.memory_margins_certified_on_interval === true &&
        proofFields.endpoint_ownership_no_double_counting_certified === true &&
        proofFields.simple_root_branch_reuse_exclusion_certified === true &&
        proofFields.non_owned_complement_closed === true,
      proof_interval_replay_present: proofFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
      preledger_pass: proofFields.preledger_pass === true,
      row_consumed: proofFields.row_consumed === true,
      branch_chart_authorized: proofFields.branch_chart_authorized === true,
    },
    source_artifact_status: {
      boundary_opening_interval_certificate_constructed: boundary.interval_certificate_constructed === true,
      active_endpoint_interval_enclosure_constructed:
        enclosure.interval_active_endpoint_enclosure_constructed === true,
      proof_grade_endpoint_box_no_switch_constructed:
        endpointBox.proof_grade_endpoint_box_no_switch_constructed === true,
      residual_source_data_ready: residualSource.residual_source_data_ready === true,
      residual_data_construction_ready: residualData.residual_data_construction_ready === true,
      active_endpoint_interval_enclosure_proof_data_ready:
        proofData.active_endpoint_interval_enclosure_proof_data_ready === true,
      residual_function_on_box_source_layer_ready:
        sourceLayer.residual_function_on_box_source_layer_ready === true,
    },
    obstruction: proofData.obstruction,
  };
}

function withStages(rows) {
  return rows.map((row) => ({
    ...row,
    row_stage: stageForRow(row),
  }));
}

function buildSummary(regularFamily, rows, proofData) {
  return {
    regular_source_cover_parent_complement_rows: regularFamily.row_count,
    one_leaf_screened_rows: rows.length,
    unscreened_regular_rows: regularFamily.one_leaf_direct_path_screen?.unscreened_regular_rows ?? null,
    sampled_positive_one_leaf_rows: countTrue(rows, (row) => row.ready_flags.screen_positive),
    proof_data_target_declared_rows: countTrue(rows, (row) => row.ready_flags.proof_data_target_declared),
    endpoint_boundary_binding_pair_rows: countTrue(
      rows,
      (row) => row.ready_flags.endpoint_boundary_binding_pair_constructed,
    ),
    endpoint_interval_box_pair_rows: countTrue(rows, (row) => row.ready_flags.endpoint_interval_box_pair_constructed),
    endpoint_residual_function_pair_rows: countTrue(
      rows,
      (row) => row.ready_flags.endpoint_residual_function_pair_constructed,
    ),
    endpoint_residual_interval_bound_pair_rows: countTrue(
      rows,
      (row) => row.ready_flags.endpoint_residual_interval_bound_pair_constructed,
    ),
    endpoint_no_switch_certified_rows: countTrue(rows, (row) => row.ready_flags.endpoint_no_switch_certified),
    interval_active_endpoint_enclosure_rows: countTrue(
      rows,
      (row) => row.ready_flags.interval_active_endpoint_enclosure_present,
    ),
    boundary_opening_interval_certified_rows: countTrue(
      rows,
      (row) => row.ready_flags.boundary_opening_interval_certified,
    ),
    monotonicity_memory_ownership_complement_closed_rows: countTrue(
      rows,
      (row) => row.ready_flags.monotonicity_memory_ownership_complement_closed,
    ),
    proof_interval_replay_rows: countTrue(rows, (row) => row.ready_flags.proof_interval_replay_present),
    preledger_pass_rows: countTrue(rows, (row) => row.ready_flags.preledger_pass),
    row_consumption_count: countTrue(rows, (row) => row.ready_flags.row_consumed),
    branch_chart_authorized_rows: countTrue(rows, (row) => row.ready_flags.branch_chart_authorized),
    first_interval_blocker_counts: rows.reduce((counts, row) => {
      const key = row.interval_certificate_first_missing_field ?? "none";
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {}),
    first_source_layer_blocker_counts: rows.reduce((counts, row) => {
      const key = row.source_layer_first_missing_field ?? "none";
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {}),
    imported_proof_data_summary: proofData.summary ?? null,
  };
}

function buildClassifier(paths, sources) {
  const regularFamily = getRegularFamily(sources.rowFamily);
  const screenedRows = regularFamily.one_leaf_direct_path_screen?.screened_rows ?? [];
  if (screenedRows.length === 0) {
    throw new Error("No screened one-leaf rows in regular source-cover family.");
  }
  const rowInputs = {
    regularFamily,
    boundary: sources.boundaryOpening,
    enclosure: sources.activeEndpointEnclosure,
    endpointBox: sources.endpointBox,
    residualSource: sources.residualSourceData,
    residualData: sources.residualData,
    proofData: sources.proofData,
    sourceLayer: sources.sourceLayer,
  };
  const rows = withStages(screenedRows.map((rowId) => buildRowReadiness(rowInputs, rowId)));
  const preledgerPassRows = countTrue(rows, (row) => row.ready_flags.preledger_pass);
  const rowConsumptionCount = countTrue(rows, (row) => row.ready_flags.row_consumed);
  const branchChartAuthorizedRows = countTrue(rows, (row) => row.ready_flags.branch_chart_authorized);

  return {
    schema: "breather-higher-fold-one-leaf-proof-data-readiness-classifier-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: "one_leaf_proof_data_readiness_classifier_fail_closed_proof_data_absent_no_row_consumption",
    claim_level:
      "priority-only row-level proof-data readiness classifier for the three regular source-cover one-leaf screened rows; no row consumption",
    no_promotion_rule: true,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    updates_live_ledger: false,
    preledger_pass: preledgerPassRows === rows.length && rows.length > 0,
    branch_chart_authorized: branchChartAuthorizedRows === rows.length && rows.length > 0,
    source_artifacts: {
      row_family_classifier: artifactRecord(paths.rowFamily),
      boundary_opening_interval_certificate_attempt: artifactRecord(paths.boundaryOpening),
      active_endpoint_interval_enclosure_attempt: artifactRecord(paths.activeEndpointEnclosure),
      endpoint_interval_box_no_switch_construction_attempt: artifactRecord(paths.endpointBox),
      residual_source_data_audit: artifactRecord(paths.residualSourceData),
      residual_data_construction_attempt: artifactRecord(paths.residualData),
      active_endpoint_interval_enclosure_proof_data_construction_attempt: artifactRecord(paths.proofData),
      residual_function_on_box_source_layer_attempt: artifactRecord(paths.sourceLayer),
    },
    route_selection: {
      selected_family: "regular_source_cover_parent_complement",
      selected_rows: screenedRows,
      unscreened_regular_rows: regularFamily.one_leaf_direct_path_screen?.unscreened_regular_rows ?? null,
      reason:
        "The row-family classifier identifies the regular source-cover one-leaf route as the next non-rule-blocked certificate-side target, with three sampled-positive screened rows and no proof-grade rows.",
    },
    readiness_orders: {
      screen_order: SCREEN_ORDER,
      interval_certificate_order: INTERVAL_CERTIFICATE_ORDER,
      source_layer_order: SOURCE_LAYER_ORDER,
      residual_source_data_order: RESIDUAL_SOURCE_DATA_ORDER,
      residual_data_order: RESIDUAL_DATA_ORDER,
    },
    row_readiness_classifications: rows,
    summary: buildSummary(regularFamily, rows, sources.proofData),
    next_certificate_handoff: {
      artifact_target: "one_leaf_endpoint_box_residual_function_pair_certificate",
      continuation_class: "mechanical certificate-side handoff until endpoint interval boxes and source-layer residual functions are either constructed or shown unavailable from existing same-packet sources",
      minimum_next_objects: [
        "source and receiver endpoint interval boxes on the candidate lambda interval",
        "source and receiver endpoint residual functions on those boxes",
        "outward-rounded source and receiver residual interval bounds",
        "source and receiver derivative isolation plus endpoint uniqueness certificates",
        "endpoint switch-exclusion and positive endpoint-gap margin certificates",
      ],
      source_layer_dependency:
        "The first source-layer missing field on all three screened rows is source_endpoint_boundary_binding_constructed, followed by receiver_endpoint_boundary_binding_constructed and the combined binding/evaluation/motion data needed to define residual functions on boxes.",
      fail_closed_stop_conditions: [
        "Do not set preledger_pass before interval active-endpoint enclosure, boundary-opening positivity, monotonicity, memory, ownership/no-double-counting, branch-reuse exclusion, and non-owned complement closure are certified.",
        "Do not consume rows or authorize a branch chart before a proof-interval v1-v6 replay for the candidate change passes.",
        "If endpoint boundary binding construction requires a new proof-rule or primitive-acceptance decision, stop and keep this route as a certificate-side handoff.",
      ],
    },
    authorization_lock: {
      preledger_pass_rows: preledgerPassRows,
      row_consumption_count: rowConsumptionCount,
      branch_chart_authorized_rows: branchChartAuthorizedRows,
      preledger_pass_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This classifier sharpens the live preledger blocker into an interval proof-data readiness handoff for the three screened regular source-cover one-leaf rows. It proves no row and authorizes no live-ledger update.",
  };
}

function sourceStatusTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present ? "true" : "false"} | \`${artifact.sha256 ?? "missing"}\` |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.sampled_boundary_opening_margin_vs_probe_threshold_decimal} | \`${row.interval_certificate_first_missing_field}\` | \`${row.source_layer_first_missing_field}\` | ${row.ready_flags.preledger_pass ? "true" : "false"} | ${row.ready_flags.row_consumed ? "true" : "false"} |`,
    )
    .join("\n");
}

function summaryTable(summary) {
  const rows = [
    ["Regular source-cover parent-complement rows", summary.regular_source_cover_parent_complement_rows],
    ["One-leaf screened rows", summary.one_leaf_screened_rows],
    ["Unscreened regular rows", summary.unscreened_regular_rows],
    ["Sampled-positive one-leaf rows", summary.sampled_positive_one_leaf_rows],
    ["Proof-data target declared rows", summary.proof_data_target_declared_rows],
    ["Endpoint boundary binding pair rows", summary.endpoint_boundary_binding_pair_rows],
    ["Endpoint interval box pair rows", summary.endpoint_interval_box_pair_rows],
    ["Endpoint residual function pair rows", summary.endpoint_residual_function_pair_rows],
    ["Endpoint residual interval bound pair rows", summary.endpoint_residual_interval_bound_pair_rows],
    ["Endpoint no-switch certified rows", summary.endpoint_no_switch_certified_rows],
    ["Interval active-endpoint enclosure rows", summary.interval_active_endpoint_enclosure_rows],
    ["Boundary-opening interval certified rows", summary.boundary_opening_interval_certified_rows],
    ["Monotonicity/memory/ownership/complement closed rows", summary.monotonicity_memory_ownership_complement_closed_rows],
    ["Proof-interval replay rows", summary.proof_interval_replay_rows],
    ["preledger_pass rows", summary.preledger_pass_rows],
    ["Row consumption count", summary.row_consumption_count],
    ["Branch-chart authorized rows", summary.branch_chart_authorized_rows],
  ];
  return rows.map(([label, value]) => `| ${label} | ${value} |`).join("\n");
}

function writeReport(filePath, classifier) {
  const handoff = classifier.next_certificate_handoff;
  const report = `# One-Leaf Proof-Data Readiness Classifier

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This artifact reduces the regular source-cover one-leaf preledger blocker to a
row-level proof-data readiness table. The three sampled-positive screened rows
all declare a nonempty candidate lambda interval and an active-endpoint
interval-enclosure proof-data target, but none has a proof-grade endpoint
interval box pair, residual function pair, residual interval bound pair,
no-switch certificate, interval active-endpoint enclosure, boundary-opening
interval certificate, preledger pass, row consumption, or branch-chart
authorization.

The first interval-certificate blocker on all three rows is
\`source_endpoint_interval_box_constructed\`. The first source-layer dependency
blocker on all three rows is
\`source_endpoint_boundary_binding_constructed\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceStatusTable(classifier.source_artifacts)}

## Counts

| Measure | Value |
| --- | ---: |
${summaryTable(classifier.summary)}

## Row Readiness

| Row | Failed side | Sampled margin vs probe threshold | First interval blocker | First source-layer blocker | preledger_pass | Row consumed |
| --- | --- | ---: | --- | --- | --- | --- |
${rowTable(classifier.row_readiness_classifications)}

## Certificate-Side Handoff

Next artifact target: \`${handoff.artifact_target}\`.

Continuation class: ${handoff.continuation_class}.

Minimum next objects:

${handoff.minimum_next_objects.map((item) => `- ${item}`).join("\n")}

Source-layer dependency: ${handoff.source_layer_dependency}

Fail-closed stop conditions:

${handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`branch_chart_authorized\`: false
- row consumption authorized: false

This artifact is a priority-only classifier and handoff. It proves no preledger
row and does not authorize branch-chart use.
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
    rowFamily: args.rowFamily,
    boundaryOpening: args.boundaryOpening,
    activeEndpointEnclosure: args.activeEndpointEnclosure,
    endpointBox: args.endpointBox,
    residualSourceData: args.residualSourceData,
    residualData: args.residualData,
    proofData: args.proofData,
    sourceLayer: args.sourceLayer,
  };
  const sources = Object.fromEntries(
    Object.entries(paths).map(([name, filePath]) => [name, readJson(filePath)]),
  );
  Object.entries(sources).forEach(([name, source]) => assertPacketId(source, name));
  const classifier = buildClassifier(paths, sources);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, classifier, args.pretty);
  writeReport(outReport, classifier);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

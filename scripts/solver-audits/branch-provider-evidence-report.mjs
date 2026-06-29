#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCHEMA = "branch_provider_evidence_report/v0";
const CONTRACT_SCHEMA = "branch_provider_evidence_contract/v0";
const MANIFEST_SCHEMA = "branch_provider_evidence_candidates/v0";
const CONSTRUCTION_ATTEMPT_SCHEMA =
  "same_domain_branch_provider_object_construction_attempt/v0";
const SOURCE_CONTRACT_READOUT_SCHEMA =
  "branch_provider_candidate_source_contract_readout/v0";
const SOURCE_PROVENANCE_REFINEMENT_SCHEMA =
  "branch_provider_candidate_source_provenance_refinement/v0";
const SOURCE_PROVENANCE_EMITTER_TARGET_SCHEMA =
  "branch_provider_candidate_source_provenance_emitter_target/v0";
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_READOUT_SCHEMA =
  "branch_provider_candidate_source_map_provider_object_branch_interval_readout/v0";
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_TARGET_SCHEMA =
  "branch_provider_candidate_source_map_provider_object_branch_interval_target/v0";
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_SOURCE_FIELD_AUDIT_SCHEMA =
  "branch_provider_candidate_source_map_provider_object_branch_interval_source_field_availability_audit/v0";
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_AVAILABILITY_SCHEMA =
  "branch_provider_candidate_source_map_provider_object_branch_split_map_availability/v0";
const PRODUCER_SIDE_SAME_DOMAIN_BRANCH_ROW_EVIDENCE_TARGET_SCHEMA =
  "branch_provider_candidate_producer_side_same_domain_branch_row_evidence_target/v0";
const H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_TARGET_SCHEMA =
  "h39-source-map-provider-object-branch-split-map-producer-target/v0";
const H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_TARGET_ROW_SCHEMA =
  "h39-source-map-provider-object-branch-split-map-producer-target-row/v0";
const H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_TARGET_SCHEMA =
  "h39-producer-side-provider-object-branch-row-target/v0";
const H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_TARGET_ROW_SCHEMA =
  "h39-producer-side-provider-object-branch-row-target-row/v0";
const H39_RECEIVER_NORMAL_RETAINED_RECORD_PREIMAGE_FIXTURE_SCHEMA =
  "h39-receiver-normal-retained-record-preimage-fixture/v0";
const H39_RECEIVER_NORMAL_RETAINED_RECORD_PREIMAGE_ROW_SCHEMA =
  "h39-receiver-normal-retained-record-preimage-row/v0";

const ACCEPTED_SOURCE_STATUS = "accepted_non_fixture_source";
const SOURCE_MAP_PROVIDER_OBJECT_SOURCE_CELL_IDS = Object.freeze([
  "speed.0.first-y",
  "speed.1.first-y",
  "speed.2.first-y",
  "speed.3.first-y",
  "speed.4.first-y",
]);
const SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_H_INDEXES = Object.freeze([37, 36, 35]);
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_LABELS = Object.freeze(["-", "+"]);
const SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS = Object.freeze(
  SOURCE_MAP_PROVIDER_OBJECT_SOURCE_CELL_IDS.flatMap((terminalGraphCellId) =>
    SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_H_INDEXES.map((terminalHIndex) =>
      Object.freeze({
        terminal_row_id: `${terminalGraphCellId}:h${terminalHIndex}`,
        terminal_graph_cell_id: terminalGraphCellId,
        terminal_h_index: terminalHIndex,
        source_y_order: 44,
        required_xi_derivative_order: 4,
      })
    )
  )
);
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS = Object.freeze(
  SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.flatMap((terminalRow) =>
    SOURCE_MAP_PROVIDER_OBJECT_BRANCH_LABELS.map((branch) =>
      Object.freeze({
        branch_row_id: `${terminalRow.terminal_row_id}:P_${branch}`,
        terminal_row_id: terminalRow.terminal_row_id,
        terminal_graph_cell_id: terminalRow.terminal_graph_cell_id,
        terminal_h_index: terminalRow.terminal_h_index,
        branch,
        provider_object_branch_target: branch === "-" ? "P_-" : "P_+",
      })
    )
  )
);
const SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS = Object.freeze([
  "same-domain-branch-bearing-P_b-map",
  "branch_projection_or_alpha_map",
  "pushforward_operator_ref",
  "normalization_identity_ref",
]);
const SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_INTERVAL_PAYLOADS = Object.freeze([
  "source_map_provider_branch_intervals",
  "provider_object_branch_intervals",
]);
const SOURCE_MAP_PROVIDER_OBJECT_REJECTED_CANDIDATE_SOURCE_KINDS = Object.freeze([
  "lambda-terminal-witness-branch-interval",
  "aggregate-P-only-provider-row",
  "variable-owned-alpha-candidate",
  "row-local-expression-branch-feed",
]);
const SOURCE_MAP_PROVIDER_OBJECT_SAME_RECORD_BINDING_FIELDS = Object.freeze([
  "same_domain_record_ref",
  "terminal_graph_cell_id",
  "terminal_h_index",
  "branch",
  "source_y_order",
  "required_xi_derivative_order",
  "source_map_provider_branch_intervals.source_map_provider_object_branch_interval",
  "provider_object_branch_intervals.provider_object_branch_interval",
  "same-domain-branch-bearing-P_b-map",
  "branch_projection_or_alpha_map",
  "pushforward_operator_ref",
  "normalization_identity_ref",
]);
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD =
  "provider_object_branch_antisymmetric_equation_available_terminal_row_count";
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_EVIDENCE_OBJECT =
  "same-domain provider-object branch antisymmetric equation A_P=P_- - P_+ or explicit expression-level P_- / P_+ branch rows on all 15 terminal rows";
const SOURCE_MAP_PROVIDER_OBJECT_AGGREGATE_ERASURE_NEGATIVE_CONTROL_REF =
  "aggregate-P-provider-probe-born-aggregate-only";
const H39_RETAINED_RECORD_PREIMAGE_REQUIRED_FIELDS = Object.freeze([
  "accepted_provider_object_branch_row_ref",
  "retained_causal_root_record_ref",
  "branch_family_checksum",
  "receiver_normal_fields",
  "receiver_normal_derivative_fields",
  "geometry_derivative_fields",
]);
const H39_RETAINED_RECORD_PREIMAGE_REJECTED_SOURCE_KINDS = Object.freeze([
  "aggregate-P-only-provider-row",
  "lambda-terminal-witness-branch-interval",
  "variable-owned-alpha-candidate",
  "row-local-expression-branch-feed",
  "term-pushforward-candidate-row",
  "primitive-vector-replay",
  "hybrid-prefix-cauchy-diagnostic",
  "coefficient-series-source-map-residual-provider-candidate",
  "source-map-residual-provider-candidate",
  "provider-fit-diagnostic",
  "signed-radius-target",
  "fourth-jet-or-Taylor-derivative-row",
]);
const H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_REQUIRED_FIELDS =
  Object.freeze([
    "same_domain_record_ref",
    "terminal_row_id",
    "branch_label",
    "producer_object_formula",
    "source_map_provider_branch_intervals",
    "provider_object_branch_intervals",
    "same-domain-branch-bearing-P_b-map",
    "branch_projection_or_alpha_map",
    "pushforward_operator_ref",
    "normalization_identity_ref",
  ]);
const H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_REQUIRED_FIELDS =
  Object.freeze([
    "source_map_provider_object_branch_split_map_available_terminal_row_count",
    "provider_object_branch_antisymmetric_equation_available_terminal_row_count",
    "explicit_provider_object_branch_row_count",
    "source_map_provider_branch_intervals",
    "provider_object_branch_intervals",
    "same-domain-branch-bearing-P_b-map",
    "branch_projection_coefficients_or_alpha_map",
    "pushforward_operator_ref",
    "normalization_identity_ref",
    "aggregate_erasure_negative_control_ref",
  ]);

const COMMON_REQUIRED_FIELDS = [
  {
    path: "provider_source_status",
    requirement: "Provider row is a non-fixture accepted source record, not a toy, fixture, replay-only row, proxy diagnostic, or status shell.",
    failureCode: "accepted_non_fixture_source_missing",
    acceptedValues: [ACCEPTED_SOURCE_STATUS],
  },
  {
    path: "same_domain_record_ref",
    requirement: "Stable source record proving that the provider fields are carried on one same-domain record.",
    failureCode: "same_domain_record_ref_missing",
  },
  {
    path: "branch_certificate_ref",
    requirement: "Retained branch certificate reference for the provider row.",
    failureCode: "branch_certificate_ref_missing",
  },
  {
    path: "active_root_or_live_ledger_identity",
    requirement: "Active-root ledger or bounded-speed live-ledger identity for the same provider row.",
    failureCode: "active_root_or_live_ledger_identity_missing",
  },
  {
    path: "branch_local_projection_or_normalization_identity",
    requirement: "Branch-local projection, source-map, quotient, or normalization identity carried by the same provider row.",
    failureCode: "branch_local_projection_or_normalization_identity_missing",
  },
];

const CONSUMERS = [
  {
    id: "rank2_field_speed_action_self_hit_scan",
    rank: 2,
    workstream: "simulations",
    target: "accepted_transition_source",
    requiredFields: [
      ...COMMON_REQUIRED_FIELDS,
      {
        path: "conservation_pullback_hash",
        requirement: "Conservation-pullback hash on the same action-increment provider row.",
        failureCode: "conservation_pullback_hash_missing",
      },
    ],
    authorizationKey: "rank2_accepted_transition_source_ready",
  },
  {
    id: "rank4_pressure_row_branch_intake",
    rank: 4,
    workstream: "braid-mass-response-map",
    target: "retained_pressure_row_branch_intake",
    requiredFields: COMMON_REQUIRED_FIELDS,
    authorizationKey: "rank4_pressure_row_provider_ready",
  },
  {
    id: "rank5_bounded_speed_normal_reconstruction",
    rank: 5,
    workstream: "braid-retained-branch-closure",
    target: "bounded_speed_live_ledger",
    requiredFields: COMMON_REQUIRED_FIELDS,
    authorizationKey: "rank5_bounded_speed_live_ledger_ready",
  },
  {
    id: "rank6_moving_retained_branch_certificate",
    rank: 6,
    workstream: "braid-nested-shell-causal-closure",
    target: "moving_retained_branch_certificate",
    requiredFields: COMMON_REQUIRED_FIELDS,
    authorizationKey: "rank6_moving_branch_provider_ready",
  },
];

const CONSUMER_CONSTRUCTION_ATTEMPT_CANDIDATE_IDS = new Set([
  "h39-aggregate-p-provider-preaggregation-construction-attempt",
]);

const PROVIDER_OBJECT_CONSTRUCTION_FIELDS = [
  {
    path: "provider_source_status",
    requirement:
      "Provider source status remains non-accepted until one non-fixture same-domain source record is accepted.",
    failureCode: "accepted_non_fixture_source_missing",
    acceptedValues: [ACCEPTED_SOURCE_STATUS],
  },
  {
    path: "same_domain_record_ref",
    requirement:
      "Stable same-domain record that carries all provider-object fields before aggregate P is formed.",
    failureCode: "same_domain_record_ref_missing",
  },
  {
    path: "branch_certificate_ref",
    requirement: "Retained branch certificate reference for the same provider row.",
    failureCode: "branch_certificate_ref_missing",
  },
  {
    path: "active_root_or_live_ledger_identity",
    requirement:
      "Active-root ledger or bounded-speed live-ledger identity bound to the same provider row.",
    failureCode: "active_root_or_live_ledger_identity_missing",
  },
  {
    path: "branch_local_projection_or_normalization_identity",
    requirement:
      "Branch-local projection, source-map, quotient, or normalization identity on the same provider row.",
    failureCode: "branch_local_projection_or_normalization_identity_missing",
  },
  {
    path: "branch_rows_ref",
    requirement:
      "Explicit branch rows such as P_- / P_+ or P_b before any aggregate P erases branch identity.",
    failureCode: "branch_rows_ref_missing",
  },
  {
    path: "branch_labels",
    requirement: "Branch labels for the explicit branch rows.",
    failureCode: "branch_labels_missing",
  },
  {
    path: "branch_weights_or_intervals",
    requirement: "Branch weights or intervals for the explicit branch rows.",
    failureCode: "branch_weights_or_intervals_missing",
  },
  {
    path: "projection_map_ref",
    requirement: "Projection-map reference for the same-domain branch-bearing row.",
    failureCode: "projection_map_ref_missing",
  },
  {
    path: "pushforward_operator_ref",
    requirement: "Pushforward operator reference for the same-domain row.",
    failureCode: "pushforward_operator_ref_missing",
  },
  {
    path: "normalization_identity_ref",
    requirement: "Normalization identity reference before aggregate P is consumed.",
    failureCode: "normalization_identity_ref_missing",
  },
  {
    path: "source_term_refs_upstream_of_aggregate_p",
    requirement: "Source-term references upstream of aggregate P.",
    failureCode: "source_term_refs_upstream_of_aggregate_p_missing",
  },
  {
    path: "aggregate_erasure_negative_control_ref",
    requirement:
      "Negative control showing aggregate-only P is rejected when branch identity is erased.",
    failureCode: "aggregate_erasure_negative_control_ref_missing",
  },
  {
    path: "conservation_pullback_hash",
    requirement:
      "Conservation-pullback hash when the provider is consumed as rank 2 accepted_transition_source evidence.",
    failureCode: "conservation_pullback_hash_missing",
    rank2Only: true,
  },
];

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    validate: null,
    pretty: false,
    printContract: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      args.input = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--print-contract") {
      args.printContract = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/solver-audits/branch-provider-evidence-report.mjs [options]

Options:
  --input PATH       Candidate provider manifest JSON.
  --validate PATH    Validate an emitted branch-provider evidence report.
  --print-contract   Print required provider fields by top-six consumer.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This is a fail-closed priority-side provider audit. It records whether current
solver, geometry-export, branch, pressure, or normal-candidate rows already
carry the same-domain branch-bearing provider object needed by top-six ranks.
It does not run downstream scans, populate structural-integrity residuals, or
authorize retained-branch closure by itself.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getPath(value, pathExpression) {
  return pathExpression.split(".").reduce((cursor, key) => cursor?.[key], value);
}

function present(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length > 0;
  }
  return true;
}

function acceptedValue(value, acceptedValues) {
  if (!acceptedValues) {
    return present(value);
  }
  return acceptedValues.includes(value);
}

function unique(values) {
  return [...new Set(values)];
}

function fieldContractEntry({ path: fieldPath, requirement, failureCode, acceptedValues, rank2Only }) {
  return {
    path: fieldPath,
    requirement,
    failure_code: failureCode,
    accepted_values: acceptedValues ?? null,
    rank2_only: rank2Only === true,
  };
}

function sameStringSet(left, right) {
  return (
    Array.isArray(left)
    && left.length === right.length
    && right.every((value) => left.includes(value))
  );
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function sourceMapProviderObjectTerminalRowIds() {
  return SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.map(
    (row) => row.terminal_row_id
  );
}

function sourceMapProviderObjectBranchRowIds() {
  return SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.map((row) => row.branch_row_id);
}

function sourceMapProviderObjectTerminalRowsForIds(rowIds) {
  if (!Array.isArray(rowIds)) {
    return null;
  }
  const idSet = new Set(rowIds);
  return SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.filter((row) =>
    idSet.has(row.terminal_row_id)
  );
}

function sourceMapProviderObjectBranchRowsForIds(rowIds) {
  if (!Array.isArray(rowIds)) {
    return null;
  }
  const idSet = new Set(rowIds);
  return SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.filter((row) =>
    idSet.has(row.branch_row_id)
  );
}

function sourceMapProviderObjectBranchRowIdsForTerminalRowIds(terminalRowIds) {
  if (!Array.isArray(terminalRowIds)) {
    return null;
  }
  const terminalRowIdSet = new Set(terminalRowIds);
  return SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.filter((row) =>
    terminalRowIdSet.has(row.terminal_row_id)
  ).map((row) => row.branch_row_id);
}

function finiteNonnegativeNumber(value) {
  return Number.isFinite(Number(value)) && Number(value) >= 0;
}

function sourceFieldBoolean(readout, fieldPaths) {
  const entries = fieldPaths.map((fieldPath) => ({
    field: fieldPath,
    value: getPath(readout, fieldPath),
  }));
  const emitted = entries.find((entry) => typeof entry.value === "boolean");
  return {
    fields: fieldPaths,
    emitted_by_provider_readout: Boolean(emitted),
    present: emitted?.value === true,
    complete: emitted?.value === true,
  };
}

function sourceMapProviderObjectDiagnosticSources(
  readout,
  sourceProvenanceRefinement = {}
) {
  return [
    {
      surface: "source-map-provider-object-branch-interval-readout",
      object: readout,
    },
    {
      surface:
        "terminal-expression-level-source-map-provider-object-branch-producer",
      object:
        readout?.terminal_expression_level_source_map_provider_object_branch_producer ??
        sourceProvenanceRefinement
          ?.terminal_expression_level_source_map_provider_object_branch_producer,
    },
    {
      surface:
        "terminal-expression-level-source-map-provider-object-branch-split-map-underdetermination",
      object:
        readout
          ?.terminal_expression_level_source_map_provider_object_branch_split_map_underdetermination ??
        sourceProvenanceRefinement
          ?.terminal_expression_level_source_map_provider_object_branch_split_map_underdetermination,
    },
    {
      surface:
        "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor",
      object:
        readout
          ?.terminal_expression_level_source_map_provider_object_branch_antisymmetric_equation_extractor ??
        sourceProvenanceRefinement
          ?.terminal_expression_level_source_map_provider_object_branch_antisymmetric_equation_extractor,
    },
    {
      surface: "terminal-row-provider-object-replay",
      object:
        readout?.terminal_row_provider_object_replay ??
        sourceProvenanceRefinement?.terminal_row_provider_object_replay,
    },
    {
      surface:
        "terminal-source-covariance-provider-object-branch-residual-extractor",
      object:
        readout
          ?.terminal_source_covariance_provider_object_branch_residual_extractor ??
        sourceProvenanceRefinement
          ?.terminal_source_covariance_provider_object_branch_residual_extractor,
    },
    {
      surface: "source-provenance-refinement",
      object: sourceProvenanceRefinement,
    },
  ].filter((source) => isObject(source.object));
}

function sourceFieldCountFromSources(sources, fieldPaths, expectedCount) {
  const entries = sources.flatMap((source) =>
    fieldPaths.map((fieldPath) => ({
      surface: source.surface,
      field: fieldPath,
      value: getPath(source.object, fieldPath),
    }))
  );
  const emitted = entries.find((entry) => finiteNonnegativeNumber(entry.value));
  const observedCount = emitted ? Number(emitted.value) : 0;
  return {
    fields: fieldPaths,
    emitted_by_provider_readout: Boolean(emitted),
    emitted_surface: emitted?.surface ?? null,
    emitted_field: emitted?.field ?? null,
    observed_count: observedCount,
    required_count: expectedCount,
    present: observedCount > 0,
    complete: observedCount === expectedCount,
  };
}

function sourceFieldNumberFromSources(sources, fieldPaths) {
  const entries = sources.flatMap((source) =>
    fieldPaths.map((fieldPath) => ({
      surface: source.surface,
      field: fieldPath,
      value: getPath(source.object, fieldPath),
    }))
  );
  const emitted = entries.find((entry) => finiteNonnegativeNumber(entry.value));
  return {
    fields: fieldPaths,
    emitted_by_provider_readout: Boolean(emitted),
    emitted_surface: emitted?.surface ?? null,
    emitted_field: emitted?.field ?? null,
    observed_value: emitted ? Number(emitted.value) : null,
  };
}

function sourceFieldStringArrayFromSources(sources, fieldPaths) {
  const entries = sources.flatMap((source) =>
    fieldPaths.map((fieldPath) => ({
      surface: source.surface,
      field: fieldPath,
      value: getPath(source.object, fieldPath),
    }))
  );
  const emitted = entries.find((entry) => Array.isArray(entry.value));
  return {
    fields: fieldPaths,
    emitted_by_provider_readout: Boolean(emitted),
    emitted_surface: emitted?.surface ?? null,
    emitted_field: emitted?.field ?? null,
    row_ids: emitted
      ? unique(
          emitted.value.filter(
            (value) => typeof value === "string" && value.trim() !== ""
          )
        )
      : null,
  };
}

function requiredRowIdSubset(requiredIds, rowIds) {
  if (!Array.isArray(rowIds)) {
    return null;
  }
  const requiredIdSet = new Set(requiredIds);
  return unique(rowIds).filter((rowId) => requiredIdSet.has(rowId));
}

function deriveAvailableRequiredRowIds(requiredIds, rowIdReadout, observedCount) {
  const emittedRowIds = requiredRowIdSubset(requiredIds, rowIdReadout.row_ids);
  if (emittedRowIds !== null) {
    return emittedRowIds;
  }
  if (observedCount === 0) {
    return [];
  }
  return null;
}

function deriveMissingRequiredRowIds(
  requiredIds,
  missingRowIdReadout,
  availableRowIds,
  observedCount
) {
  const emittedMissingRowIds = requiredRowIdSubset(
    requiredIds,
    missingRowIdReadout.row_ids
  );
  if (emittedMissingRowIds !== null) {
    return emittedMissingRowIds;
  }
  if (Array.isArray(availableRowIds)) {
    const availableRowIdSet = new Set(availableRowIds);
    return requiredIds.filter((rowId) => !availableRowIdSet.has(rowId));
  }
  if (observedCount === 0) {
    return requiredIds;
  }
  return null;
}

function buildSourceMapProviderObjectBranchSplitMapAvailability(
  readout,
  sourceProvenanceRefinement = {}
) {
  const sources = sourceMapProviderObjectDiagnosticSources(
    readout,
    sourceProvenanceRefinement
  );
  const branchSplitMap = sourceFieldCountFromSources(
    sources,
    ["source_map_provider_object_branch_split_map_available_terminal_row_count"],
    SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length
  );
  const branchIntervals = sourceFieldCountFromSources(
    sources,
    ["source_map_provider_object_branch_interval_available_branch_row_count"],
    SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length
  );
  const antisymmetricEquation = sourceFieldCountFromSources(
    sources,
    [
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD,
      "terminal_expression_level_source_map_provider_object_branch_antisymmetric_equation_extractor.provider_object_branch_antisymmetric_equation_available_terminal_row_count",
    ],
    SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length
  );
  const explicitBranchRows = sourceFieldCountFromSources(
    sources,
    ["explicit_provider_object_branch_row_count"],
    SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length
  );
  const branchAttributedSourceTerms = sourceFieldCountFromSources(
    sources,
    ["source_term_provider_branch_attributed_term_row_count"],
    45
  );
  const antisymmetricAvailableTerminalRowIdsReadout =
    sourceFieldStringArrayFromSources(sources, [
      "provider_object_branch_antisymmetric_equation_available_terminal_row_ids",
      "terminal_expression_level_source_map_provider_object_branch_antisymmetric_equation_extractor.provider_object_branch_antisymmetric_equation_available_terminal_row_ids",
    ]);
  const antisymmetricMissingTerminalRowIdsReadout =
    sourceFieldStringArrayFromSources(sources, [
      "provider_object_branch_antisymmetric_equation_missing_terminal_row_ids",
      "terminal_expression_level_source_map_provider_object_branch_antisymmetric_equation_extractor.provider_object_branch_antisymmetric_equation_missing_terminal_row_ids",
    ]);
  const antisymmetricAvailableBranchRowIdsReadout =
    sourceFieldStringArrayFromSources(sources, [
      "provider_object_branch_antisymmetric_equation_available_branch_row_ids",
      "terminal_expression_level_source_map_provider_object_branch_antisymmetric_equation_extractor.provider_object_branch_antisymmetric_equation_available_branch_row_ids",
      "explicit_provider_object_branch_row_ids",
    ]);
  const antisymmetricMissingBranchRowIdsReadout =
    sourceFieldStringArrayFromSources(sources, [
      "provider_object_branch_antisymmetric_equation_missing_branch_row_ids",
      "terminal_expression_level_source_map_provider_object_branch_antisymmetric_equation_extractor.provider_object_branch_antisymmetric_equation_missing_branch_row_ids",
    ]);
  const requiredTerminalRowIds = sourceMapProviderObjectTerminalRowIds();
  const requiredBranchRowIds = sourceMapProviderObjectBranchRowIds();
  const availableAntisymmetricTerminalRowIds = deriveAvailableRequiredRowIds(
    requiredTerminalRowIds,
    antisymmetricAvailableTerminalRowIdsReadout,
    antisymmetricEquation.observed_count
  );
  const missingAntisymmetricTerminalRowIds = deriveMissingRequiredRowIds(
    requiredTerminalRowIds,
    antisymmetricMissingTerminalRowIdsReadout,
    availableAntisymmetricTerminalRowIds,
    antisymmetricEquation.observed_count
  );
  const availableAntisymmetricBranchRowIds = deriveAvailableRequiredRowIds(
    requiredBranchRowIds,
    antisymmetricAvailableBranchRowIdsReadout,
    explicitBranchRows.observed_count
  );
  const missingAntisymmetricBranchRowIds =
    deriveMissingRequiredRowIds(
      requiredBranchRowIds,
      antisymmetricMissingBranchRowIdsReadout,
      availableAntisymmetricBranchRowIds,
      explicitBranchRows.observed_count
    ) ??
    sourceMapProviderObjectBranchRowIdsForTerminalRowIds(
      missingAntisymmetricTerminalRowIds
    );
  const branchSplitFreeDimension = sourceFieldNumberFromSources(sources, [
    "provider_object_branch_split_free_dimension",
    "terminal_expression_level_source_map_provider_object_branch_split_map_underdetermination.provider_object_branch_split_free_dimension",
  ]);
  const branchUnknownRows = sourceFieldNumberFromSources(sources, [
    "provider_object_branch_unknown_row_count",
  ]);
  const aggregateEquationCount = sourceFieldNumberFromSources(sources, [
    "aggregate_provider_object_equation_count",
  ]);
  const sourceFieldEmitted = branchSplitMap.emitted_by_provider_readout;
  const branchSplitMapComplete = branchSplitMap.complete;
  return {
    schema: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_AVAILABILITY_SCHEMA,
    status: !sourceFieldEmitted
      ? "source-map-provider-object-branch-split-map-source-field-not-emitted"
      : branchSplitMapComplete
        ? "source-map-provider-object-branch-split-map-present-review-required"
        : "source-map-provider-object-branch-split-map-unavailable",
    required_terminal_row_count: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
    required_branch_row_count: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
    required_terminal_row_ids: requiredTerminalRowIds,
    required_branch_row_ids: requiredBranchRowIds,
    source_field:
      "source_map_provider_object_branch_split_map_available_terminal_row_count",
    source_field_emitted_by_provider_readout: sourceFieldEmitted,
    observed_available_terminal_row_count: branchSplitMap.observed_count,
    branch_split_map_populated: branchSplitMapComplete,
    branch_split_map_count_readout: branchSplitMap,
    branch_interval_count_readout: branchIntervals,
    branch_split_underdetermination_readout: {
      provider_object_branch_unknown_row_count: branchUnknownRows.observed_value,
      aggregate_provider_object_equation_count:
        aggregateEquationCount.observed_value,
      provider_object_branch_split_free_dimension:
        branchSplitFreeDimension.observed_value,
      provider_object_branch_split_free_dimension_emitted:
        branchSplitFreeDimension.emitted_by_provider_readout,
    },
    branch_antisymmetric_equation_readout: {
      source_field:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD,
      fields: antisymmetricEquation.fields,
      emitted_surface: antisymmetricEquation.emitted_surface,
      emitted_field: antisymmetricEquation.emitted_field,
      available_terminal_row_count: antisymmetricEquation.observed_count,
      required_terminal_row_count: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      missing_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length -
        antisymmetricEquation.observed_count,
      required_terminal_row_ids: requiredTerminalRowIds,
      required_branch_row_ids: requiredBranchRowIds,
      available_terminal_row_id_readout:
        antisymmetricAvailableTerminalRowIdsReadout,
      missing_terminal_row_id_readout:
        antisymmetricMissingTerminalRowIdsReadout,
      available_branch_row_id_readout:
        antisymmetricAvailableBranchRowIdsReadout,
      missing_branch_row_id_readout: antisymmetricMissingBranchRowIdsReadout,
      available_terminal_row_ids: availableAntisymmetricTerminalRowIds,
      missing_terminal_row_ids: missingAntisymmetricTerminalRowIds,
      missing_terminal_rows: sourceMapProviderObjectTerminalRowsForIds(
        missingAntisymmetricTerminalRowIds
      ),
      available_branch_row_ids: availableAntisymmetricBranchRowIds,
      missing_branch_row_ids: missingAntisymmetricBranchRowIds,
      missing_branch_rows: sourceMapProviderObjectBranchRowsForIds(
        missingAntisymmetricBranchRowIds
      ),
      missing_branch_row_count: Array.isArray(missingAntisymmetricBranchRowIds)
        ? missingAntisymmetricBranchRowIds.length
        : null,
      exact_missing_terminal_rows_known: Array.isArray(
        missingAntisymmetricTerminalRowIds
      ),
      exact_missing_branch_rows_known: Array.isArray(
        missingAntisymmetricBranchRowIds
      ),
      emitted_by_provider_readout:
        antisymmetricEquation.emitted_by_provider_readout,
      all_required_terminal_rows_available: antisymmetricEquation.complete,
      all_required_terminal_rows_missing:
        antisymmetricEquation.emitted_by_provider_readout &&
        antisymmetricEquation.observed_count === 0,
      complete: antisymmetricEquation.complete,
    },
    explicit_provider_object_branch_row_readout: explicitBranchRows,
    branch_attributed_source_term_readout: branchAttributedSourceTerms,
    first_missing_source_field: branchSplitMapComplete
      ? SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD
      : "source_map_provider_object_branch_split_map_available_terminal_row_count",
    next_missing_source_field_after_branch_split_map_count:
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD,
    next_missing_source_surface_after_branch_split_map_count:
      "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor",
    smallest_next_evidence_object:
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_EVIDENCE_OBJECT,
    provider_object_branch_intervals_present: false,
    provider_ready_authorized_by_this_availability: false,
    downstream_consumer_authorization: false,
  };
}

function buildSourceMapProviderObjectBranchIntervalSourceFieldAudit(
  readout,
  sourceProvenanceRefinement = {}
) {
  const requiredTerminalRowCount = SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length;
  const requiredBranchRowCount = SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length;
  const sources = sourceMapProviderObjectDiagnosticSources(
    readout,
    sourceProvenanceRefinement
  );
  const branchSplitMap = sourceFieldCountFromSources(
    sources,
    ["source_map_provider_object_branch_split_map_available_terminal_row_count"],
    requiredTerminalRowCount
  );
  const antisymmetricEquation = sourceFieldCountFromSources(
    sources,
    [
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD,
      "terminal_expression_level_source_map_provider_object_branch_antisymmetric_equation_extractor.provider_object_branch_antisymmetric_equation_available_terminal_row_count",
    ],
    requiredTerminalRowCount
  );
  const candidateIntervals = sourceFieldCountFromSources(
    sources,
    [
      "source_map_provider_object_branch_interval_candidate_available_count",
      "source_map_provider_object_branch_interval_available_branch_row_count",
    ],
    requiredBranchRowCount
  );
  const admissibleIntervals = sourceFieldCountFromSources(
    sources,
    ["source_map_provider_object_branch_interval_admissible_available_count"],
    requiredBranchRowCount
  );
  const actualIntervals = sourceFieldCountFromSources(
    sources,
    [
      "actual_provider_object_branch_intervals_available_count",
      "accepted_provider_object_branch_interval_count",
      "provider_object_branch_intervals_available_from_actual_provider_count",
    ],
    requiredBranchRowCount
  );
  const sourceMapProviderBranchIntervals = sourceFieldBoolean(readout, [
    "source_map_provider_branch_intervals_available",
    "all_source_map_provider_branch_intervals_available",
  ]);
  const providerObjectBranchIntervals = sourceFieldBoolean(readout, [
    "provider_object_branch_intervals_present",
    "all_source_map_provider_object_branch_intervals_available",
  ]);
  const missingIdentityKinds = new Set(
    Array.isArray(readout.missing_identity_kinds)
      ? readout.missing_identity_kinds
      : SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS
  );
  const identityFamilies = SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS.map(
    (identityKind) => ({
      identity_kind: identityKind,
      present: !missingIdentityKinds.has(identityKind),
      complete: !missingIdentityKinds.has(identityKind),
    })
  );
  const sourceFields = [
    {
      key: "branch_split_map",
      field: "source_map_provider_object_branch_split_map_available_terminal_row_count",
      ...branchSplitMap,
      role:
        "Expression-level branch split map required before aggregate P can become P_- / P_+ provider-object rows.",
    },
    {
      key: "branch_antisymmetric_equation",
      field: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD,
      ...antisymmetricEquation,
      role:
        "Producer-side A_P=P_- - P_+ terminal-row equation count; zero keeps the provider-object branch split unavailable.",
    },
    {
      key: "candidate_intervals",
      field: "source_map_provider_object_branch_interval_candidate_available_count",
      ...candidateIntervals,
      role:
        "Candidate P_- / P_+ interval rows; not sufficient unless admissible and same-record bound.",
    },
    {
      key: "admissible_intervals",
      field: "source_map_provider_object_branch_interval_admissible_available_count",
      ...admissibleIntervals,
      role:
        "Admissible P_- / P_+ interval rows accepted as source-map provider-object intervals.",
    },
    {
      key: "actual_intervals",
      field: "actual_source_map_provider_object_branch_interval",
      ...actualIntervals,
      role:
        "Actual provider-object branch intervals available from an accepted source row.",
    },
    {
      key: "source_map_provider_branch_intervals_payload",
      field: "source_map_provider_branch_intervals",
      ...sourceMapProviderBranchIntervals,
      role:
        "Required interval payload carrying source-map provider branch intervals.",
    },
    {
      key: "provider_object_branch_intervals_payload",
      field: "provider_object_branch_intervals",
      ...providerObjectBranchIntervals,
      role:
        "Required interval payload carrying provider-object branch intervals.",
    },
  ];
  const firstMissingSourceField =
    sourceFields.find((field) => field.complete !== true)?.field ?? null;
  const firstMissingIdentityFamily =
    identityFamilies.find((identity) => identity.complete !== true)
      ?.identity_kind ?? null;
  return {
    schema:
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_SOURCE_FIELD_AUDIT_SCHEMA,
    status:
      firstMissingSourceField || firstMissingIdentityFamily
        ? "source-map-provider-object-branch-interval-source-fields-incomplete"
        : "source-map-provider-object-branch-interval-source-fields-present-review-required",
    required_terminal_row_count: requiredTerminalRowCount,
    required_branch_row_count: requiredBranchRowCount,
    inspected_h39_diagnostic_field_refs: [
      {
        surface:
          "terminal-expression-level-source-map-provider-object-branch-producer",
        fields: [
          "aggregate_source_map_provider_object_interval_available_terminal_row_count",
          "source_map_provider_object_branch_split_map_available_terminal_row_count",
          "source_map_provider_object_branch_interval_available_branch_row_count",
        ],
        provider_authorizing_surface: false,
        note:
          "Aggregate provider-object intervals are comparison context; provider readiness needs branch split map plus P_- / P_+ interval payloads.",
      },
      {
        surface:
          "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor",
        fields: [
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD,
        ],
        provider_authorizing_surface: false,
        note:
          "The A_P=P_- - P_+ extractor can prove the producer-side equation count is absent without authorizing provider readiness.",
      },
      {
        surface:
          "terminal-expression-level-source-map-provider-object-branch-split-map-underdetermination",
        fields: [
          "provider_object_branch_unknown_row_count",
          "aggregate_provider_object_equation_count",
          "provider_object_branch_split_free_dimension",
        ],
        provider_authorizing_surface: false,
        note:
          "Underdetermination rows explain why aggregate P does not determine P_- / P_+ provider-object rows.",
      },
      {
        surface: "terminal-row-provider-object-replay",
        fields: [
          "source_map_provider_branch_intervals_available_count",
          "source_map_provider_object_branch_interval_candidate_available_count",
          "source_map_provider_object_branch_interval_admissible_available_count",
          "actual_source_map_provider_object_branch_interval",
        ],
        provider_authorizing_surface: false,
        note:
          "Replay rows can inspect candidates, but only admissible actual branch intervals can feed provider-object readiness.",
      },
      {
        surface:
          "terminal-source-covariance-provider-object-branch-residual-extractor",
        fields: [
          "provider_object_branch_residual_interval_available_branch_row_count",
          "source_map_provider_object_branch_interval_candidate_available_count",
          "source_map_provider_object_branch_interval_admissible_available_count",
        ],
        provider_authorizing_surface: false,
        note:
          "Residual extraction remains downstream of actual P_- / P_+ provider-object branch intervals.",
      },
    ],
    source_fields: sourceFields,
    identity_families: identityFamilies,
    first_missing_source_field: firstMissingSourceField,
    first_missing_identity_family: firstMissingIdentityFamily,
    first_missing_provider_field:
      firstMissingSourceField ?? firstMissingIdentityFamily,
    provider_ready_authorized_by_this_audit: false,
    downstream_consumer_authorization: false,
  };
}

function buildProducerSideSameDomainBranchRowEvidenceTarget(
  branchSplitMapAvailability,
  sourceFieldAvailabilityAudit
) {
  const branchAntisymmetricEquationReadout =
    branchSplitMapAvailability?.branch_antisymmetric_equation_readout ?? {};
  const explicitBranchRowReadout =
    branchSplitMapAvailability?.explicit_provider_object_branch_row_readout ?? {};
  const branchAttributedSourceTermReadout =
    branchSplitMapAvailability?.branch_attributed_source_term_readout ?? {};
  const missingTerminalRowIds = Array.isArray(
    branchAntisymmetricEquationReadout.missing_terminal_row_ids
  )
    ? branchAntisymmetricEquationReadout.missing_terminal_row_ids
    : sourceMapProviderObjectTerminalRowIds();
  const missingBranchRowIds = Array.isArray(
    branchAntisymmetricEquationReadout.missing_branch_row_ids
  )
    ? branchAntisymmetricEquationReadout.missing_branch_row_ids
    : sourceMapProviderObjectBranchRowIds();
  const availableTerminalRowCount = Number(
    branchAntisymmetricEquationReadout.available_terminal_row_count ?? 0
  );
  const missingTerminalRowCount = Number(
    branchAntisymmetricEquationReadout.missing_terminal_row_count ??
      missingTerminalRowIds.length
  );
  const branchSplitMapCountReadout =
    branchSplitMapAvailability?.branch_split_map_count_readout ?? {};
  return {
    schema: PRODUCER_SIDE_SAME_DOMAIN_BRANCH_ROW_EVIDENCE_TARGET_SCHEMA,
    artifact_id:
      "h39-producer-side-same-domain-branch-row-evidence-target",
    claim_level: "priority-only target, not provider acceptance",
    status:
      availableTerminalRowCount === SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length &&
      missingTerminalRowCount === 0 &&
      missingBranchRowIds.length === 0
        ? "producer-side-same-domain-branch-row-evidence-present-review-required"
        : "producer-side-same-domain-branch-row-evidence-missing",
    target_kind:
      "same-domain-expression-level-source-map-provider-object-branch-row-evidence",
    missing_producer_object_kind:
      "same-domain-expression-level-provider-object-branch-antisymmetric-equation-or-explicit-branch-rows",
    required_producer_object:
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_EVIDENCE_OBJECT,
    producer_object_formula: "A_P=P_- - P_+; u_P=A_P/2",
    producer_source_surface:
      "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor",
    producer_source_field:
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD,
    required_terminal_row_count: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
    required_branch_row_count: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
    required_terminal_rows: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS,
    required_terminal_row_ids: sourceMapProviderObjectTerminalRowIds(),
    required_branch_rows: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS,
    required_branch_row_ids: sourceMapProviderObjectBranchRowIds(),
    current_available_terminal_row_count: availableTerminalRowCount,
    current_missing_terminal_row_count: missingTerminalRowCount,
    current_missing_terminal_row_ids: missingTerminalRowIds,
    current_missing_terminal_rows:
      sourceMapProviderObjectTerminalRowsForIds(missingTerminalRowIds),
    current_available_branch_row_ids:
      branchAntisymmetricEquationReadout.available_branch_row_ids ?? null,
    current_missing_branch_row_ids: missingBranchRowIds,
    current_missing_branch_rows:
      sourceMapProviderObjectBranchRowsForIds(missingBranchRowIds),
    current_missing_branch_row_count: missingBranchRowIds.length,
    exact_missing_terminal_rows_known: Array.isArray(
      branchAntisymmetricEquationReadout.missing_terminal_row_ids
    ),
    exact_missing_branch_rows_known: Array.isArray(
      branchAntisymmetricEquationReadout.missing_branch_row_ids
    ),
    current_source_counts: {
      source_map_provider_object_branch_split_map_available_terminal_row_count:
        branchSplitMapCountReadout.observed_count ?? 0,
      provider_object_branch_antisymmetric_equation_available_terminal_row_count:
        availableTerminalRowCount,
      explicit_provider_object_branch_row_count:
        explicitBranchRowReadout.observed_count ?? 0,
      source_term_provider_branch_attributed_term_row_count:
        branchAttributedSourceTermReadout.observed_count ?? 0,
    },
    same_domain_identity_fields:
      SOURCE_MAP_PROVIDER_OBJECT_SAME_RECORD_BINDING_FIELDS,
    required_identity_kinds:
      SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS,
    required_interval_payloads:
      SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_INTERVAL_PAYLOADS,
    first_missing_provider_field:
      sourceFieldAvailabilityAudit?.first_missing_provider_field ?? null,
    negative_control: {
      ref: SOURCE_MAP_PROVIDER_OBJECT_AGGREGATE_ERASURE_NEGATIVE_CONTROL_REF,
      condition:
        "Reject any row that has only aggregate P, lambda terminal witness intervals, branch-attributed source terms, or row-local branch feeds without same-record P_- / P_+ provider-object rows, both interval payloads, the P_b map, branch projection or alpha map, pushforward operator reference, and normalization identity.",
      rejected_candidate_source_kinds:
        SOURCE_MAP_PROVIDER_OBJECT_REJECTED_CANDIDATE_SOURCE_KINDS,
      aggregate_p_only_rejected: true,
      lambda_terminal_witness_only_rejected: true,
      branch_attributed_source_terms_without_provider_object_rejected: true,
      row_local_expression_branch_feed_rejected: true,
      provider_ready_authorized_by_negative_control: false,
    },
    provider_ready_authorized_by_this_target: false,
    downstream_consumer_authorization: false,
  };
}

function evaluateH39SourceMapProviderObjectBranchSplitMapProducerTargetRow(row) {
  const splitMapAvailableTerminalRowCount = Number(
    row.source_map_provider_object_branch_split_map_available_terminal_row_count ??
      0
  );
  const antisymmetricEquationAvailableTerminalRowCount = Number(
    row.provider_object_branch_antisymmetric_equation_available_terminal_row_count ??
      0
  );
  const explicitBranchRowCount = Number(
    row.explicit_provider_object_branch_row_count ?? 0
  );
  const splitMapTerminalRowsPresent =
    splitMapAvailableTerminalRowCount ===
    SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length;
  const antisymmetricEquationTerminalRowsPresent =
    antisymmetricEquationAvailableTerminalRowCount ===
    SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length;
  const explicitBranchRowsPresent =
    explicitBranchRowCount === SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length;
  const intervalPayloadsPresent =
    row.source_map_provider_branch_intervals_present === true &&
    row.provider_object_branch_intervals_present === true;
  const identityPayloadsPresent =
    row.same_domain_branch_bearing_p_b_map_present === true &&
    row.branch_projection_coefficients_or_alpha_map_present === true &&
    row.pushforward_operator_ref_present === true &&
    row.normalization_identity_ref_present === true;
  const aggregateErasureNegativeControlPresent =
    row.aggregate_erasure_negative_control_ref_present === true;
  const firstMissingProducerField = !splitMapTerminalRowsPresent
    ? "source_map_provider_object_branch_split_map_available_terminal_row_count"
    : !antisymmetricEquationTerminalRowsPresent
      ? SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD
      : !explicitBranchRowsPresent
        ? "explicit_provider_object_branch_row_count"
        : !intervalPayloadsPresent
          ? "source_map_provider_branch_intervals"
          : !identityPayloadsPresent
            ? "same-domain-branch-bearing-P_b-map"
            : !aggregateErasureNegativeControlPresent
              ? "aggregate_erasure_negative_control_ref"
              : null;
  const status = !splitMapTerminalRowsPresent
    ? "h39-source-map-provider-object-branch-split-map-source-field-missing"
    : !antisymmetricEquationTerminalRowsPresent || !explicitBranchRowsPresent
      ? "h39-source-map-provider-object-branch-row-payloads-missing"
      : !intervalPayloadsPresent
        ? "h39-source-map-provider-object-branch-interval-payloads-missing"
        : !identityPayloadsPresent
          ? "h39-source-map-provider-object-branch-identity-payloads-missing"
          : !aggregateErasureNegativeControlPresent
            ? "h39-source-map-provider-object-aggregate-erasure-negative-control-missing"
            : "h39-source-map-provider-object-branch-split-map-producer-review-required";
  const expectedStatus = row.expected_status ?? status;

  return {
    schema:
      H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_TARGET_ROW_SCHEMA,
    row_id: row.row_id,
    setup: row.setup,
    status,
    expected_status: expectedStatus,
    status_matches_expected: status === expectedStatus,
    first_missing_producer_field: firstMissingProducerField,
    required_terminal_row_count: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
    required_branch_row_count: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
    source_map_provider_object_branch_split_map_available_terminal_row_count:
      splitMapAvailableTerminalRowCount,
    provider_object_branch_antisymmetric_equation_available_terminal_row_count:
      antisymmetricEquationAvailableTerminalRowCount,
    explicit_provider_object_branch_row_count: explicitBranchRowCount,
    split_map_terminal_rows_present: splitMapTerminalRowsPresent,
    antisymmetric_equation_terminal_rows_present:
      antisymmetricEquationTerminalRowsPresent,
    explicit_branch_rows_present: explicitBranchRowsPresent,
    interval_payloads_present: intervalPayloadsPresent,
    identity_payloads_present: identityPayloadsPresent,
    aggregate_erasure_negative_control_present:
      aggregateErasureNegativeControlPresent,
    missing_terminal_row_ids: row.missing_terminal_row_ids ?? [],
    missing_branch_row_ids: row.missing_branch_row_ids ?? [],
    required_producer_fields:
      H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_REQUIRED_FIELDS,
    provider_ready_authorized_by_this_row: false,
    downstream_consumer_authorization: false,
    producer_side_branch_row_authorized_by_this_row: false,
  };
}

function buildH39SourceMapProviderObjectBranchSplitMapProducerTarget(
  branchSplitMapAvailability,
  producerSideBranchRowEvidenceTarget
) {
  const requiredTerminalRowIds =
    producerSideBranchRowEvidenceTarget?.required_terminal_row_ids ??
    sourceMapProviderObjectTerminalRowIds();
  const requiredBranchRowIds =
    producerSideBranchRowEvidenceTarget?.required_branch_row_ids ??
    sourceMapProviderObjectBranchRowIds();
  const currentSplitMapCount =
    branchSplitMapAvailability?.observed_available_terminal_row_count ?? 0;
  const currentAntisymmetricEquationCount =
    producerSideBranchRowEvidenceTarget?.current_available_terminal_row_count ??
    0;
  const currentExplicitBranchRowCount =
    producerSideBranchRowEvidenceTarget?.current_source_counts
      ?.explicit_provider_object_branch_row_count ?? 0;
  const currentMissingTerminalRowIds =
    producerSideBranchRowEvidenceTarget?.current_missing_terminal_row_ids ??
    requiredTerminalRowIds;
  const currentMissingBranchRowIds =
    producerSideBranchRowEvidenceTarget?.current_missing_branch_row_ids ??
    requiredBranchRowIds;
  const targetRows = [
    {
      row_id: "current_h39_split_map_source_field_absent",
      setup:
        "The split-map producer source field is not emitted, while the A_P extractor reports no available terminal rows and no explicit P_- / P_+ branch rows.",
      source_map_provider_object_branch_split_map_available_terminal_row_count:
        currentSplitMapCount,
      provider_object_branch_antisymmetric_equation_available_terminal_row_count:
        currentAntisymmetricEquationCount,
      explicit_provider_object_branch_row_count: currentExplicitBranchRowCount,
      missing_terminal_row_ids: currentMissingTerminalRowIds,
      missing_branch_row_ids: currentMissingBranchRowIds,
      expected_status:
        "h39-source-map-provider-object-branch-split-map-source-field-missing",
    },
    {
      row_id: "split_map_count_without_branch_rows",
      setup:
        "The split-map source field reaches all terminal rows, but the producer has no A_P terminal rows and no explicit branch rows.",
      source_map_provider_object_branch_split_map_available_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      expected_status:
        "h39-source-map-provider-object-branch-row-payloads-missing",
    },
    {
      row_id: "branch_rows_without_interval_payloads",
      setup:
        "The split-map source field, A_P terminal rows, and explicit P_- / P_+ branch rows are present, but both interval payloads are missing.",
      source_map_provider_object_branch_split_map_available_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      provider_object_branch_antisymmetric_equation_available_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
      expected_status:
        "h39-source-map-provider-object-branch-interval-payloads-missing",
    },
    {
      row_id: "interval_payloads_without_identity_payloads",
      setup:
        "The branch rows and both interval payloads are present, but the P_b map, projection coefficients or alpha map, pushforward operator, and normalization identity are missing.",
      source_map_provider_object_branch_split_map_available_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      provider_object_branch_antisymmetric_equation_available_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
      source_map_provider_branch_intervals_present: true,
      provider_object_branch_intervals_present: true,
      expected_status:
        "h39-source-map-provider-object-branch-identity-payloads-missing",
    },
    {
      row_id: "identity_payloads_without_aggregate_erasure_negative_control",
      setup:
        "The branch rows, interval payloads, and identity payloads are present, but the aggregate-erasure negative control is absent.",
      source_map_provider_object_branch_split_map_available_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      provider_object_branch_antisymmetric_equation_available_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
      source_map_provider_branch_intervals_present: true,
      provider_object_branch_intervals_present: true,
      same_domain_branch_bearing_p_b_map_present: true,
      branch_projection_coefficients_or_alpha_map_present: true,
      pushforward_operator_ref_present: true,
      normalization_identity_ref_present: true,
      expected_status:
        "h39-source-map-provider-object-aggregate-erasure-negative-control-missing",
    },
    {
      row_id: "split_map_producer_review_candidate",
      setup:
        "All producer source fields, branch rows, interval payloads, identity payloads, and the aggregate-erasure negative control are present.",
      source_map_provider_object_branch_split_map_available_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      provider_object_branch_antisymmetric_equation_available_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
      source_map_provider_branch_intervals_present: true,
      provider_object_branch_intervals_present: true,
      same_domain_branch_bearing_p_b_map_present: true,
      branch_projection_coefficients_or_alpha_map_present: true,
      pushforward_operator_ref_present: true,
      normalization_identity_ref_present: true,
      aggregate_erasure_negative_control_ref_present: true,
      expected_status:
        "h39-source-map-provider-object-branch-split-map-producer-review-required",
    },
  ].map(evaluateH39SourceMapProviderObjectBranchSplitMapProducerTargetRow);

  return {
    schema:
      H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_TARGET_SCHEMA,
    artifact_id:
      "h39-source-map-provider-object-branch-split-map-producer-target",
    claim_level: "priority-only executable target, not provider acceptance",
    status: targetRows.every(
      (row) =>
        row.status_matches_expected === true &&
        row.provider_ready_authorized_by_this_row === false &&
        row.downstream_consumer_authorization === false &&
        row.producer_side_branch_row_authorized_by_this_row === false
    )
      ? "h39-source-map-provider-object-branch-split-map-producer-target-fail-closed"
      : "h39-source-map-provider-object-branch-split-map-producer-target-review-required",
    target_row_schema:
      H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_TARGET_ROW_SCHEMA,
    required_terminal_row_count: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
    required_branch_row_count: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
    required_terminal_row_ids: requiredTerminalRowIds,
    required_branch_row_ids: requiredBranchRowIds,
    required_producer_fields:
      H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_REQUIRED_FIELDS,
    aggregate_erasure_negative_control_ref:
      SOURCE_MAP_PROVIDER_OBJECT_AGGREGATE_ERASURE_NEGATIVE_CONTROL_REF,
    row_count: targetRows.length,
    target_rows: targetRows,
    negative_control: {
      ref: SOURCE_MAP_PROVIDER_OBJECT_AGGREGATE_ERASURE_NEGATIVE_CONTROL_REF,
      aggregate_p_only_rejected: true,
      lambda_terminal_witness_only_rejected: true,
      row_local_expression_branch_feed_rejected: true,
      source_map_residual_provider_only_rejected: true,
      provider_ready_authorized_by_negative_control: false,
    },
    provider_ready_authorized_by_this_target: false,
    downstream_consumer_authorization: false,
    producer_side_branch_row_authorized_by_this_target: false,
  };
}

function h39SourceMapProviderObjectBranchSplitMapProducerTargetValidationErrors(
  target,
  label
) {
  if (!isObject(target)) {
    return [`${label} must include h39 source-map provider-object branch split-map producer target`];
  }
  const errors = [];
  const expectedRows = new Map([
    [
      "current_h39_split_map_source_field_absent",
      "h39-source-map-provider-object-branch-split-map-source-field-missing",
    ],
    [
      "split_map_count_without_branch_rows",
      "h39-source-map-provider-object-branch-row-payloads-missing",
    ],
    [
      "branch_rows_without_interval_payloads",
      "h39-source-map-provider-object-branch-interval-payloads-missing",
    ],
    [
      "interval_payloads_without_identity_payloads",
      "h39-source-map-provider-object-branch-identity-payloads-missing",
    ],
    [
      "identity_payloads_without_aggregate_erasure_negative_control",
      "h39-source-map-provider-object-aggregate-erasure-negative-control-missing",
    ],
    [
      "split_map_producer_review_candidate",
      "h39-source-map-provider-object-branch-split-map-producer-review-required",
    ],
  ]);
  const rows = Array.isArray(target.target_rows) ? target.target_rows : [];
  const rowsById = new Map(rows.map((row) => [row.row_id, row]));
  if (
    target.schema !==
      H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_TARGET_SCHEMA ||
    target.claim_level !==
      "priority-only executable target, not provider acceptance" ||
    target.status !==
      "h39-source-map-provider-object-branch-split-map-producer-target-fail-closed" ||
    target.target_row_schema !==
      H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_TARGET_ROW_SCHEMA ||
    target.required_terminal_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length ||
    target.required_branch_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length ||
    !sameStringSet(
      target.required_terminal_row_ids,
      sourceMapProviderObjectTerminalRowIds()
    ) ||
    !sameStringSet(
      target.required_branch_row_ids,
      sourceMapProviderObjectBranchRowIds()
    ) ||
    !sameStringSet(
      target.required_producer_fields,
      H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_REQUIRED_FIELDS
    ) ||
    target.aggregate_erasure_negative_control_ref !==
      SOURCE_MAP_PROVIDER_OBJECT_AGGREGATE_ERASURE_NEGATIVE_CONTROL_REF ||
    target.row_count !== expectedRows.size ||
    rows.length !== expectedRows.size ||
    target.provider_ready_authorized_by_this_target !== false ||
    target.downstream_consumer_authorization !== false ||
    target.producer_side_branch_row_authorized_by_this_target !== false
  ) {
    errors.push(`${label} h39 split-map producer target is invalid`);
  }
  for (const [rowId, expectedStatus] of expectedRows) {
    const row = rowsById.get(rowId);
    if (
      !isObject(row) ||
      row.schema !==
        H39_SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_PRODUCER_TARGET_ROW_SCHEMA ||
      row.status !== expectedStatus ||
      row.expected_status !== expectedStatus ||
      row.status_matches_expected !== true ||
      row.provider_ready_authorized_by_this_row !== false ||
      row.downstream_consumer_authorization !== false ||
      row.producer_side_branch_row_authorized_by_this_row !== false
    ) {
      errors.push(`${label} h39 split-map producer target row ${rowId} is invalid`);
      break;
    }
  }
  const currentAbsence = rowsById.get(
    "current_h39_split_map_source_field_absent"
  );
  const splitMapOnly = rowsById.get("split_map_count_without_branch_rows");
  const branchRowsNoIntervals = rowsById.get(
    "branch_rows_without_interval_payloads"
  );
  const intervalsNoIdentities = rowsById.get(
    "interval_payloads_without_identity_payloads"
  );
  const identitiesNoNegativeControl = rowsById.get(
    "identity_payloads_without_aggregate_erasure_negative_control"
  );
  const reviewCandidate = rowsById.get("split_map_producer_review_candidate");
  if (
    currentAbsence
      ?.source_map_provider_object_branch_split_map_available_terminal_row_count !==
      0 ||
    currentAbsence
      ?.provider_object_branch_antisymmetric_equation_available_terminal_row_count !==
      0 ||
    currentAbsence?.explicit_provider_object_branch_row_count !== 0 ||
    currentAbsence?.first_missing_producer_field !==
      "source_map_provider_object_branch_split_map_available_terminal_row_count"
  ) {
    errors.push(`${label} current split-map source-field absence row is invalid`);
  }
  if (
    splitMapOnly?.split_map_terminal_rows_present !== true ||
    splitMapOnly?.antisymmetric_equation_terminal_rows_present !== false ||
    splitMapOnly?.explicit_branch_rows_present !== false ||
    splitMapOnly?.first_missing_producer_field !==
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD
  ) {
    errors.push(`${label} split-map-only row must still require branch rows`);
  }
  if (
    branchRowsNoIntervals?.split_map_terminal_rows_present !== true ||
    branchRowsNoIntervals?.antisymmetric_equation_terminal_rows_present !==
      true ||
    branchRowsNoIntervals?.explicit_branch_rows_present !== true ||
    branchRowsNoIntervals?.interval_payloads_present !== false ||
    branchRowsNoIntervals?.first_missing_producer_field !==
      "source_map_provider_branch_intervals"
  ) {
    errors.push(`${label} branch-row producer row must still require interval payloads`);
  }
  if (
    intervalsNoIdentities?.interval_payloads_present !== true ||
    intervalsNoIdentities?.identity_payloads_present !== false ||
    intervalsNoIdentities?.first_missing_producer_field !==
      "same-domain-branch-bearing-P_b-map"
  ) {
    errors.push(`${label} interval-bearing split-map row must still require identity payloads`);
  }
  if (
    identitiesNoNegativeControl?.identity_payloads_present !== true ||
    identitiesNoNegativeControl?.aggregate_erasure_negative_control_present !==
      false ||
    identitiesNoNegativeControl?.first_missing_producer_field !==
      "aggregate_erasure_negative_control_ref"
  ) {
    errors.push(`${label} identity-bearing split-map row must still require aggregate-erasure negative control`);
  }
  if (
    reviewCandidate?.split_map_terminal_rows_present !== true ||
    reviewCandidate?.antisymmetric_equation_terminal_rows_present !== true ||
    reviewCandidate?.explicit_branch_rows_present !== true ||
    reviewCandidate?.interval_payloads_present !== true ||
    reviewCandidate?.identity_payloads_present !== true ||
    reviewCandidate?.aggregate_erasure_negative_control_present !== true ||
    reviewCandidate?.provider_ready_authorized_by_this_row !== false ||
    reviewCandidate?.producer_side_branch_row_authorized_by_this_row !== false
  ) {
    errors.push(`${label} split-map producer review candidate must remain non-authorizing`);
  }
  if (
    target.negative_control?.ref !==
      SOURCE_MAP_PROVIDER_OBJECT_AGGREGATE_ERASURE_NEGATIVE_CONTROL_REF ||
    target.negative_control?.aggregate_p_only_rejected !== true ||
    target.negative_control?.lambda_terminal_witness_only_rejected !== true ||
    target.negative_control?.row_local_expression_branch_feed_rejected !== true ||
    target.negative_control?.source_map_residual_provider_only_rejected !==
      true ||
    target.negative_control?.provider_ready_authorized_by_negative_control !==
      false
  ) {
    errors.push(`${label} h39 split-map producer target negative control is invalid`);
  }
  return errors;
}

function evaluateH39ProducerSideProviderObjectBranchRowTargetRow(row) {
  const availableTerminalRowCount = Number(
    row.available_provider_object_terminal_row_count ?? 0
  );
  const explicitBranchRowCount = Number(
    row.explicit_provider_object_branch_row_count ?? 0
  );
  const allTerminalRowsPresent =
    availableTerminalRowCount === SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length;
  const allBranchRowsPresent =
    explicitBranchRowCount === SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length;
  const intervalPayloadsPresent =
    row.source_map_provider_branch_intervals_present === true &&
    row.provider_object_branch_intervals_present === true;
  const identityPayloadsPresent =
    row.same_domain_branch_bearing_p_b_map_present === true &&
    row.branch_projection_or_alpha_map_present === true &&
    row.pushforward_operator_ref_present === true &&
    row.normalization_identity_ref_present === true;
  const sameRecordBindingVerified = row.same_record_binding_verified === true;
  const firstMissingProducerField =
    !allTerminalRowsPresent || !allBranchRowsPresent
      ? SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD
      : !intervalPayloadsPresent
        ? "source_map_provider_branch_intervals"
        : !identityPayloadsPresent
          ? "same-domain-branch-bearing-P_b-map"
          : !sameRecordBindingVerified
            ? "same_record_binding_fields"
            : null;
  const status =
    !allTerminalRowsPresent || !allBranchRowsPresent
      ? "h39-producer-side-provider-object-branch-rows-missing"
      : !intervalPayloadsPresent
        ? "h39-producer-side-provider-object-branch-interval-payloads-missing"
        : !identityPayloadsPresent
          ? "h39-producer-side-provider-object-branch-identity-payloads-missing"
          : !sameRecordBindingVerified
            ? "h39-producer-side-provider-object-branch-same-record-binding-missing"
            : "h39-producer-side-provider-object-branch-row-review-required";
  const expectedStatus = row.expected_status ?? status;

  return {
    schema: H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_TARGET_ROW_SCHEMA,
    row_id: row.row_id,
    setup: row.setup,
    status,
    expected_status: expectedStatus,
    status_matches_expected: status === expectedStatus,
    first_missing_producer_field: firstMissingProducerField,
    producer_object_formula: "A_P=P_- - P_+; u_P=A_P/2",
    required_terminal_row_count: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
    required_branch_row_count: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
    available_provider_object_terminal_row_count: availableTerminalRowCount,
    explicit_provider_object_branch_row_count: explicitBranchRowCount,
    missing_terminal_row_ids: row.missing_terminal_row_ids ?? [],
    missing_branch_row_ids: row.missing_branch_row_ids ?? [],
    all_terminal_rows_present: allTerminalRowsPresent,
    all_branch_rows_present: allBranchRowsPresent,
    interval_payloads_present: intervalPayloadsPresent,
    identity_payloads_present: identityPayloadsPresent,
    same_record_binding_verified: sameRecordBindingVerified,
    required_producer_fields:
      H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_REQUIRED_FIELDS,
    accepted_provider_object_branch_row_ref:
      status === "h39-producer-side-provider-object-branch-row-review-required"
        ? row.accepted_provider_object_branch_row_ref ?? null
        : null,
    provider_ready_authorized_by_this_row: false,
    downstream_consumer_authorization: false,
    retained_record_preimage_authorized_by_this_row: false,
  };
}

function buildH39ProducerSideProviderObjectBranchRowTarget(
  producerSideBranchRowEvidenceTarget,
  sourceFieldAvailabilityAudit
) {
  const requiredTerminalRowIds =
    producerSideBranchRowEvidenceTarget?.required_terminal_row_ids ??
    sourceMapProviderObjectTerminalRowIds();
  const requiredBranchRowIds =
    producerSideBranchRowEvidenceTarget?.required_branch_row_ids ??
    sourceMapProviderObjectBranchRowIds();
  const currentAvailableTerminalRowCount =
    producerSideBranchRowEvidenceTarget?.current_available_terminal_row_count ??
    0;
  const currentExplicitBranchRowCount =
    producerSideBranchRowEvidenceTarget?.current_source_counts
      ?.explicit_provider_object_branch_row_count ?? 0;
  const currentMissingTerminalRowIds =
    producerSideBranchRowEvidenceTarget?.current_missing_terminal_row_ids ??
    requiredTerminalRowIds;
  const currentMissingBranchRowIds =
    producerSideBranchRowEvidenceTarget?.current_missing_branch_row_ids ??
    requiredBranchRowIds;
  const partialMissingTerminalRowIds = requiredTerminalRowIds.slice(-1);
  const partialMissingBranchRowIds = requiredBranchRowIds.slice(-2);
  const targetRows = [
    {
      row_id: "current_h39_producer_absence",
      setup:
        "The emitted producer-side extractor reports no available A_P terminal rows and no explicit P_- / P_+ provider-object branch rows.",
      available_provider_object_terminal_row_count:
        currentAvailableTerminalRowCount,
      explicit_provider_object_branch_row_count: currentExplicitBranchRowCount,
      missing_terminal_row_ids: currentMissingTerminalRowIds,
      missing_branch_row_ids: currentMissingBranchRowIds,
      expected_status:
        "h39-producer-side-provider-object-branch-rows-missing",
    },
    {
      row_id: "partial_producer_side_branch_rows",
      setup:
        "The producer-side extractor reports 14 available A_P terminal rows and 28 explicit branch rows, leaving one terminal row and its two branch rows missing.",
      available_provider_object_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length - 1,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length - 2,
      missing_terminal_row_ids: partialMissingTerminalRowIds,
      missing_branch_row_ids: partialMissingBranchRowIds,
      expected_status:
        "h39-producer-side-provider-object-branch-rows-missing",
    },
    {
      row_id: "complete_branch_rows_missing_interval_payloads",
      setup:
        "All terminal A_P rows and explicit P_- / P_+ branch rows are available, but the two interval payloads are absent.",
      available_provider_object_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
      expected_status:
        "h39-producer-side-provider-object-branch-interval-payloads-missing",
    },
    {
      row_id: "complete_branch_rows_missing_identity_payloads",
      setup:
        "All terminal and branch rows have both interval payloads, but the P_b map, projection or alpha map, pushforward operator, or normalization identity is absent.",
      available_provider_object_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
      source_map_provider_branch_intervals_present: true,
      provider_object_branch_intervals_present: true,
      expected_status:
        "h39-producer-side-provider-object-branch-identity-payloads-missing",
    },
    {
      row_id: "producer_side_branch_row_review_candidate",
      setup:
        "The producer-side packet has all A_P terminal rows, all explicit P_- / P_+ branch rows, both interval payloads, all identity payloads, and same-record binding fields.",
      available_provider_object_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
      source_map_provider_branch_intervals_present: true,
      provider_object_branch_intervals_present: true,
      same_domain_branch_bearing_p_b_map_present: true,
      branch_projection_or_alpha_map_present: true,
      pushforward_operator_ref_present: true,
      normalization_identity_ref_present: true,
      same_record_binding_verified: true,
      accepted_provider_object_branch_row_ref:
        "h39-producer-side-provider-object-branch-rows:review-candidate",
      expected_status:
        "h39-producer-side-provider-object-branch-row-review-required",
    },
  ].map(evaluateH39ProducerSideProviderObjectBranchRowTargetRow);

  return {
    schema: H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_TARGET_SCHEMA,
    artifact_id: "h39-producer-side-provider-object-branch-row-target",
    claim_level: "priority-only executable target, not provider acceptance",
    status: targetRows.every(
      (row) =>
        row.status_matches_expected === true &&
        row.provider_ready_authorized_by_this_row === false &&
        row.downstream_consumer_authorization === false &&
        row.retained_record_preimage_authorized_by_this_row === false
    )
      ? "h39-producer-side-provider-object-branch-row-target-fail-closed"
      : "h39-producer-side-provider-object-branch-row-target-review-required",
    target_row_schema:
      H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_TARGET_ROW_SCHEMA,
    required_terminal_row_count: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
    required_branch_row_count: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
    required_terminal_row_ids: requiredTerminalRowIds,
    required_branch_row_ids: requiredBranchRowIds,
    required_producer_fields:
      H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_REQUIRED_FIELDS,
    same_domain_identity_fields:
      SOURCE_MAP_PROVIDER_OBJECT_SAME_RECORD_BINDING_FIELDS,
    required_identity_kinds:
      SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS,
    required_interval_payloads:
      SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_INTERVAL_PAYLOADS,
    source_field_blocker:
      sourceFieldAvailabilityAudit?.first_missing_provider_field ?? null,
    row_count: targetRows.length,
    target_rows: targetRows,
    negative_control: {
      ref: SOURCE_MAP_PROVIDER_OBJECT_AGGREGATE_ERASURE_NEGATIVE_CONTROL_REF,
      aggregate_p_only_rejected: true,
      lambda_terminal_witness_only_rejected: true,
      row_local_expression_branch_feed_rejected: true,
      source_map_residual_provider_only_rejected: true,
      provider_ready_authorized_by_negative_control: false,
    },
    provider_ready_authorized_by_this_target: false,
    downstream_consumer_authorization: false,
    retained_record_preimage_authorized_by_this_target: false,
  };
}

function h39ProducerSideProviderObjectBranchRowTargetValidationErrors(
  target,
  label
) {
  if (!isObject(target)) {
    return [`${label} must include h39 producer-side provider-object branch-row target`];
  }
  const errors = [];
  const expectedRows = new Map([
    [
      "current_h39_producer_absence",
      "h39-producer-side-provider-object-branch-rows-missing",
    ],
    [
      "partial_producer_side_branch_rows",
      "h39-producer-side-provider-object-branch-rows-missing",
    ],
    [
      "complete_branch_rows_missing_interval_payloads",
      "h39-producer-side-provider-object-branch-interval-payloads-missing",
    ],
    [
      "complete_branch_rows_missing_identity_payloads",
      "h39-producer-side-provider-object-branch-identity-payloads-missing",
    ],
    [
      "producer_side_branch_row_review_candidate",
      "h39-producer-side-provider-object-branch-row-review-required",
    ],
  ]);
  const rows = Array.isArray(target.target_rows) ? target.target_rows : [];
  const rowsById = new Map(rows.map((row) => [row.row_id, row]));
  if (
    target.schema !== H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_TARGET_SCHEMA ||
    target.claim_level !== "priority-only executable target, not provider acceptance" ||
    target.status !==
      "h39-producer-side-provider-object-branch-row-target-fail-closed" ||
    target.target_row_schema !==
      H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_TARGET_ROW_SCHEMA ||
    target.required_terminal_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length ||
    target.required_branch_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length ||
    !sameStringSet(
      target.required_terminal_row_ids,
      sourceMapProviderObjectTerminalRowIds()
    ) ||
    !sameStringSet(
      target.required_branch_row_ids,
      sourceMapProviderObjectBranchRowIds()
    ) ||
    !sameStringSet(
      target.required_producer_fields,
      H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_REQUIRED_FIELDS
    ) ||
    !sameStringSet(
      target.same_domain_identity_fields,
      SOURCE_MAP_PROVIDER_OBJECT_SAME_RECORD_BINDING_FIELDS
    ) ||
    !sameStringSet(
      target.required_identity_kinds,
      SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS
    ) ||
    !sameStringSet(
      target.required_interval_payloads,
      SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_INTERVAL_PAYLOADS
    ) ||
    target.row_count !== expectedRows.size ||
    rows.length !== expectedRows.size ||
    target.provider_ready_authorized_by_this_target !== false ||
    target.downstream_consumer_authorization !== false ||
    target.retained_record_preimage_authorized_by_this_target !== false
  ) {
    errors.push(`${label} h39 producer-side branch-row target is invalid`);
  }
  for (const [rowId, expectedStatus] of expectedRows) {
    const row = rowsById.get(rowId);
    if (
      !isObject(row) ||
      row.schema !==
        H39_PRODUCER_SIDE_PROVIDER_OBJECT_BRANCH_ROW_TARGET_ROW_SCHEMA ||
      row.status !== expectedStatus ||
      row.expected_status !== expectedStatus ||
      row.status_matches_expected !== true ||
      row.provider_ready_authorized_by_this_row !== false ||
      row.downstream_consumer_authorization !== false ||
      row.retained_record_preimage_authorized_by_this_row !== false
    ) {
      errors.push(`${label} h39 producer-side target row ${rowId} is invalid`);
      break;
    }
  }
  const currentAbsence = rowsById.get("current_h39_producer_absence");
  const partialRows = rowsById.get("partial_producer_side_branch_rows");
  const missingIntervals = rowsById.get(
    "complete_branch_rows_missing_interval_payloads"
  );
  const missingIdentities = rowsById.get(
    "complete_branch_rows_missing_identity_payloads"
  );
  const reviewCandidate = rowsById.get(
    "producer_side_branch_row_review_candidate"
  );
  if (
    currentAbsence?.available_provider_object_terminal_row_count !== 0 ||
    currentAbsence?.explicit_provider_object_branch_row_count !== 0 ||
    currentAbsence?.first_missing_producer_field !==
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD ||
    currentAbsence?.missing_terminal_row_ids?.length !==
      SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length ||
    currentAbsence?.missing_branch_row_ids?.length !==
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length
  ) {
    errors.push(`${label} current producer absence row must keep all rows missing`);
  }
  if (
    partialRows?.available_provider_object_terminal_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length - 1 ||
    partialRows?.explicit_provider_object_branch_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length - 2 ||
    partialRows?.missing_terminal_row_ids?.length !== 1 ||
    partialRows?.missing_branch_row_ids?.length !== 2
  ) {
    errors.push(`${label} partial producer-side row must stay fail-closed`);
  }
  if (
    missingIntervals?.all_terminal_rows_present !== true ||
    missingIntervals?.all_branch_rows_present !== true ||
    missingIntervals?.interval_payloads_present !== false ||
    missingIntervals?.first_missing_producer_field !==
      "source_map_provider_branch_intervals"
  ) {
    errors.push(`${label} complete producer rows must still require interval payloads`);
  }
  if (
    missingIdentities?.interval_payloads_present !== true ||
    missingIdentities?.identity_payloads_present !== false ||
    missingIdentities?.first_missing_producer_field !==
      "same-domain-branch-bearing-P_b-map"
  ) {
    errors.push(`${label} interval-bearing producer rows must still require identity payloads`);
  }
  if (
    reviewCandidate?.all_terminal_rows_present !== true ||
    reviewCandidate?.all_branch_rows_present !== true ||
    reviewCandidate?.interval_payloads_present !== true ||
    reviewCandidate?.identity_payloads_present !== true ||
    reviewCandidate?.same_record_binding_verified !== true ||
    reviewCandidate?.accepted_provider_object_branch_row_ref !==
      "h39-producer-side-provider-object-branch-rows:review-candidate" ||
    reviewCandidate?.provider_ready_authorized_by_this_row !== false ||
    reviewCandidate?.retained_record_preimage_authorized_by_this_row !== false
  ) {
    errors.push(`${label} producer-side review candidate must remain non-authorizing`);
  }
  if (
    target.negative_control?.ref !==
      SOURCE_MAP_PROVIDER_OBJECT_AGGREGATE_ERASURE_NEGATIVE_CONTROL_REF ||
    target.negative_control?.aggregate_p_only_rejected !== true ||
    target.negative_control?.lambda_terminal_witness_only_rejected !== true ||
    target.negative_control?.row_local_expression_branch_feed_rejected !== true ||
    target.negative_control?.source_map_residual_provider_only_rejected !==
      true ||
    target.negative_control?.provider_ready_authorized_by_negative_control !==
      false
  ) {
    errors.push(`${label} h39 producer-side target negative control is invalid`);
  }
  return errors;
}

function evaluateH39ReceiverNormalRetainedRecordPreimageFixtureRow(row) {
  const acceptedProviderObjectBranchRowPresent =
    row.provider_object_branch_row_complete === true &&
    present(row.accepted_provider_object_branch_row_ref);
  const retainedCausalRootRecordBound =
    row.retained_causal_root_record_bound === true &&
    present(row.retained_causal_root_record_ref);
  const branchFamilyChecksumBound =
    row.branch_family_checksum_bound === true &&
    present(row.branch_family_checksum);
  const receiverNormalFieldsPresent =
    row.receiver_normal_fields_bound === true &&
    present(row.receiver_normal_fields);
  const receiverNormalDerivativeFieldsPresent =
    row.receiver_normal_derivative_fields_bound === true &&
    present(row.receiver_normal_derivative_fields) &&
    row.receiver_normal_derivative_reconstruction_verified === true;
  const geometryDerivativeFieldsPresent =
    row.geometry_derivative_fields_bound === true &&
    present(row.geometry_derivative_fields);
  const sameRecordIdentityVerified =
    row.same_source_artifact_hash_and_retained_box === true;
  const rejectedSourceKind = row.rejected_provider_candidate_kind ?? null;
  const firstMissingPreimageField =
    !acceptedProviderObjectBranchRowPresent
      ? "accepted_provider_object_branch_row_ref"
      : !retainedCausalRootRecordBound
        ? "retained_causal_root_record_ref"
        : !branchFamilyChecksumBound
          ? "branch_family_checksum"
          : !receiverNormalFieldsPresent
            ? "receiver_normal_fields"
            : !receiverNormalDerivativeFieldsPresent
              ? "receiver_normal_derivative_fields"
              : !geometryDerivativeFieldsPresent
                ? "geometry_derivative_fields"
                : !sameRecordIdentityVerified
                  ? "same_source_artifact_hash_and_retained_box"
                  : null;
  const status = rejectedSourceKind
    ? rejectedSourceKind ===
      "coefficient-series-source-map-residual-provider-candidate"
      ? "h39-coefficient-series-provider-candidate-not-retained-record-preimage"
      : "h39-provider-candidate-consumed-as-retained-record"
    : !acceptedProviderObjectBranchRowPresent
      ? "h39-provider-object-branch-row-missing"
      : !retainedCausalRootRecordBound
        ? "h39-provider-object-retained-record-unbound"
        : !branchFamilyChecksumBound
          ? "h39-retained-branch-family-checksum-missing"
          : !receiverNormalFieldsPresent
            ? "h39-receiver-normal-fields-missing"
            : !receiverNormalDerivativeFieldsPresent ||
                !geometryDerivativeFieldsPresent
              ? "h39-receiver-normal-derivative-fields-missing"
              : !sameRecordIdentityVerified
                ? "h39-provider-object-retained-record-unbound"
                : "h39-receiver-normal-retained-record-preimage-review-required";
  const expectedStatus = row.expected_status ?? status;

  return {
    schema: H39_RECEIVER_NORMAL_RETAINED_RECORD_PREIMAGE_ROW_SCHEMA,
    row_id: row.row_id,
    setup: row.setup,
    status,
    expected_status: expectedStatus,
    status_matches_expected: status === expectedStatus,
    first_missing_preimage_field: firstMissingPreimageField,
    provider_row_source_kind: row.provider_row_source_kind ?? null,
    rejected_provider_candidate_kind: rejectedSourceKind,
    available_provider_object_terminal_row_count:
      row.available_provider_object_terminal_row_count ?? null,
    explicit_provider_object_branch_row_count:
      row.explicit_provider_object_branch_row_count ?? null,
    accepted_provider_object_branch_interval_count:
      row.accepted_provider_object_branch_interval_count ?? null,
    missing_terminal_row_ids: row.missing_terminal_row_ids ?? [],
    missing_branch_row_ids: row.missing_branch_row_ids ?? [],
    accepted_provider_object_branch_row_present:
      acceptedProviderObjectBranchRowPresent,
    retained_causal_root_record_bound: retainedCausalRootRecordBound,
    branch_family_checksum_bound: branchFamilyChecksumBound,
    receiver_normal_fields_present: receiverNormalFieldsPresent,
    receiver_normal_derivative_fields_present:
      receiverNormalDerivativeFieldsPresent,
    receiver_normal_derivative_reconstruction_verified:
      row.receiver_normal_derivative_reconstruction_verified === true,
    geometry_derivative_fields_present: geometryDerivativeFieldsPresent,
    same_record_identity_verified: sameRecordIdentityVerified,
    required_preimage_fields: H39_RETAINED_RECORD_PREIMAGE_REQUIRED_FIELDS,
    provider_ready_authorized_by_this_row: false,
    downstream_consumer_authorization: false,
    retained_branch_claim_authorized_by_this_row: false,
  };
}

function buildH39ReceiverNormalRetainedRecordPreimageFixture(
  readout,
  producerSideBranchRowEvidenceTarget
) {
  const requiredTerminalRowIds =
    producerSideBranchRowEvidenceTarget?.required_terminal_row_ids ??
    sourceMapProviderObjectTerminalRowIds();
  const requiredBranchRowIds =
    producerSideBranchRowEvidenceTarget?.required_branch_row_ids ??
    sourceMapProviderObjectBranchRowIds();
  const partialMissingTerminalRowIds = requiredTerminalRowIds.slice(-1);
  const partialMissingBranchRowIds = requiredBranchRowIds.slice(-2);
  const currentAvailableTerminalRowCount =
    producerSideBranchRowEvidenceTarget?.current_available_terminal_row_count ??
    0;
  const currentExplicitBranchRowCount =
    producerSideBranchRowEvidenceTarget?.current_source_counts
      ?.explicit_provider_object_branch_row_count ?? 0;
  const fixtureRows = [
    {
      row_id: "current_h39_absence",
      setup:
        "Current H39 target has no accepted provider-object branch row and no retained causal-root force/action record.",
      available_provider_object_terminal_row_count:
        currentAvailableTerminalRowCount,
      explicit_provider_object_branch_row_count:
        currentExplicitBranchRowCount,
      accepted_provider_object_branch_interval_count:
        readout?.accepted_provider_object_branch_interval_count ?? 0,
      missing_terminal_row_ids:
        producerSideBranchRowEvidenceTarget?.current_missing_terminal_row_ids ??
        requiredTerminalRowIds,
      missing_branch_row_ids:
        producerSideBranchRowEvidenceTarget?.current_missing_branch_row_ids ??
        requiredBranchRowIds,
      expected_status: "h39-provider-object-branch-row-missing",
    },
    {
      row_id: "source_map_residual_provider_only",
      setup:
        "Source-map residual provider checks are present, but the row is not an accepted provider-object branch row and is not retained-record bound.",
      provider_row_source_kind:
        "directed-rounded-same-domain-h38-source-map-residual-provider",
      rejected_provider_candidate_kind:
        "coefficient-series-source-map-residual-provider-candidate",
      expected_status:
        "h39-coefficient-series-provider-candidate-not-retained-record-preimage",
    },
    {
      row_id: "partial_provider_object_branch_row",
      setup:
        "Producer-side extractor is partially populated but still misses one terminal row and its two P_- / P_+ branch rows.",
      available_provider_object_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length - 1,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length - 2,
      missing_terminal_row_ids: partialMissingTerminalRowIds,
      missing_branch_row_ids: partialMissingBranchRowIds,
      expected_status: "h39-provider-object-branch-row-missing",
    },
    {
      row_id: "accepted_provider_object_unbound",
      setup:
        "All required P_- / P_+ provider-object rows are accepted, but no retained causal-root force/action record consumes them.",
      accepted_provider_object_branch_row_ref:
        "h39-provider-object-branch-rows:all-15-terminal-rows:all-30-branches",
      provider_object_branch_row_complete: true,
      available_provider_object_terminal_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
      explicit_provider_object_branch_row_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
      accepted_provider_object_branch_interval_count:
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
      expected_status: "h39-provider-object-retained-record-unbound",
    },
    {
      row_id: "retained_record_missing_receiver_normal_derivative",
      setup:
        "Accepted provider-object rows are retained-record bound with D_s, D_t, fixed signs, and W^rec, but derivative rows are absent.",
      accepted_provider_object_branch_row_ref:
        "h39-provider-object-branch-rows:all-15-terminal-rows:all-30-branches",
      provider_object_branch_row_complete: true,
      retained_causal_root_record_ref: "retained-causal-root:h39-fixture",
      retained_causal_root_record_bound: true,
      branch_family_checksum: "branch-family-checksum:h39-fixture",
      branch_family_checksum_bound: true,
      receiver_normal_fields: "D_s,D_t,fixed-signs,W_rec",
      receiver_normal_fields_bound: true,
      expected_status: "h39-receiver-normal-derivative-fields-missing",
    },
    {
      row_id: "fourth_jet_taylor_derivative_only",
      setup:
        "Fourth-jet or Taylor derivative rows are present as diagnostics only; they are not receiver-normal retained-record derivative evidence.",
      rejected_provider_candidate_kind:
        "fourth-jet-or-Taylor-derivative-row",
      receiver_normal_derivative_fields:
        "fourth-jet-or-Taylor-derivative-diagnostic",
      receiver_normal_derivative_fields_bound: false,
      expected_status: "h39-provider-candidate-consumed-as-retained-record",
    },
    {
      row_id: "preimage_review_candidate",
      setup:
        "Accepted provider-object rows, the retained causal-root record, branch checksum, receiver-normal fields, derivative reconstruction, geometry derivatives, source hash, and retained box are all same-record bound.",
      accepted_provider_object_branch_row_ref:
        "h39-provider-object-branch-rows:all-15-terminal-rows:all-30-branches",
      provider_object_branch_row_complete: true,
      retained_causal_root_record_ref: "retained-causal-root:h39-fixture",
      retained_causal_root_record_bound: true,
      branch_family_checksum: "branch-family-checksum:h39-fixture",
      branch_family_checksum_bound: true,
      receiver_normal_fields: "D_s,D_t,fixed-signs,W_rec",
      receiver_normal_fields_bound: true,
      receiver_normal_derivative_fields: "D_vD_s,D_vD_t,D_vW_rec",
      receiver_normal_derivative_fields_bound: true,
      receiver_normal_derivative_reconstruction_verified: true,
      geometry_derivative_fields: "D_vr_a,D_vrhat_a",
      geometry_derivative_fields_bound: true,
      same_source_artifact_hash_and_retained_box: true,
      expected_status:
        "h39-receiver-normal-retained-record-preimage-review-required",
    },
  ].map(evaluateH39ReceiverNormalRetainedRecordPreimageFixtureRow);

  return {
    schema: H39_RECEIVER_NORMAL_RETAINED_RECORD_PREIMAGE_FIXTURE_SCHEMA,
    artifact_id: "h39-receiver-normal-retained-record-preimage-fixture",
    claim_level: "priority-only executable fixture, not provider acceptance",
    status: fixtureRows.every(
      (row) =>
        row.status_matches_expected === true &&
        row.provider_ready_authorized_by_this_row === false &&
        row.downstream_consumer_authorization === false &&
        row.retained_branch_claim_authorized_by_this_row === false
    )
      ? "h39-receiver-normal-retained-record-preimage-fixture-fail-closed"
      : "h39-receiver-normal-retained-record-preimage-fixture-review-required",
    target_row_schema: H39_RECEIVER_NORMAL_RETAINED_RECORD_PREIMAGE_ROW_SCHEMA,
    receiver_normal_artifact_ref:
      "receiver-normal-retained-branch-family-first-derivative/v0",
    required_preimage_fields: H39_RETAINED_RECORD_PREIMAGE_REQUIRED_FIELDS,
    required_terminal_row_count: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length,
    required_branch_row_count: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length,
    required_terminal_row_ids: requiredTerminalRowIds,
    required_branch_row_ids: requiredBranchRowIds,
    row_count: fixtureRows.length,
    fixture_rows: fixtureRows,
    negative_control: {
      rejected_provider_candidate_kinds:
        H39_RETAINED_RECORD_PREIMAGE_REJECTED_SOURCE_KINDS,
      aggregate_p_only_rejected: true,
      lambda_terminal_witness_only_rejected: true,
      source_map_residual_provider_only_rejected: true,
      fourth_jet_or_taylor_rows_rejected_as_receiver_normal_derivative_evidence:
        true,
      provider_ready_authorized_by_negative_control: false,
    },
    provider_ready_authorized_by_this_fixture: false,
    downstream_consumer_authorization: false,
    retained_branch_claim_authorized_by_this_fixture: false,
  };
}

function h39ReceiverNormalRetainedRecordPreimageFixtureValidationErrors(
  fixture,
  label
) {
  if (!isObject(fixture)) {
    return [`${label} must include h39 receiver-normal retained-record preimage fixture`];
  }
  const errors = [];
  const expectedRows = new Map([
    ["current_h39_absence", "h39-provider-object-branch-row-missing"],
    [
      "source_map_residual_provider_only",
      "h39-coefficient-series-provider-candidate-not-retained-record-preimage",
    ],
    ["partial_provider_object_branch_row", "h39-provider-object-branch-row-missing"],
    ["accepted_provider_object_unbound", "h39-provider-object-retained-record-unbound"],
    [
      "retained_record_missing_receiver_normal_derivative",
      "h39-receiver-normal-derivative-fields-missing",
    ],
    [
      "fourth_jet_taylor_derivative_only",
      "h39-provider-candidate-consumed-as-retained-record",
    ],
    [
      "preimage_review_candidate",
      "h39-receiver-normal-retained-record-preimage-review-required",
    ],
  ]);
  const rows = Array.isArray(fixture.fixture_rows) ? fixture.fixture_rows : [];
  const rowsById = new Map(rows.map((row) => [row.row_id, row]));
  if (
    fixture.schema !==
      H39_RECEIVER_NORMAL_RETAINED_RECORD_PREIMAGE_FIXTURE_SCHEMA ||
    fixture.claim_level !==
      "priority-only executable fixture, not provider acceptance" ||
    fixture.status !==
      "h39-receiver-normal-retained-record-preimage-fixture-fail-closed" ||
    fixture.target_row_schema !==
      H39_RECEIVER_NORMAL_RETAINED_RECORD_PREIMAGE_ROW_SCHEMA ||
    fixture.receiver_normal_artifact_ref !==
      "receiver-normal-retained-branch-family-first-derivative/v0" ||
    !sameStringSet(
      fixture.required_preimage_fields,
      H39_RETAINED_RECORD_PREIMAGE_REQUIRED_FIELDS
    ) ||
    fixture.required_terminal_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length ||
    fixture.required_branch_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length ||
    !sameStringSet(
      fixture.required_terminal_row_ids,
      sourceMapProviderObjectTerminalRowIds()
    ) ||
    !sameStringSet(
      fixture.required_branch_row_ids,
      sourceMapProviderObjectBranchRowIds()
    ) ||
    fixture.row_count !== expectedRows.size ||
    rows.length !== expectedRows.size ||
    fixture.provider_ready_authorized_by_this_fixture !== false ||
    fixture.downstream_consumer_authorization !== false ||
    fixture.retained_branch_claim_authorized_by_this_fixture !== false
  ) {
    errors.push(`${label} h39 receiver-normal retained-record preimage fixture is invalid`);
  }
  for (const [rowId, expectedStatus] of expectedRows) {
    const row = rowsById.get(rowId);
    if (
      !isObject(row) ||
      row.schema !== H39_RECEIVER_NORMAL_RETAINED_RECORD_PREIMAGE_ROW_SCHEMA ||
      row.status !== expectedStatus ||
      row.expected_status !== expectedStatus ||
      row.status_matches_expected !== true ||
      row.provider_ready_authorized_by_this_row !== false ||
      row.downstream_consumer_authorization !== false ||
      row.retained_branch_claim_authorized_by_this_row !== false
    ) {
      errors.push(`${label} h39 preimage fixture row ${rowId} is invalid`);
      break;
    }
  }
  const currentAbsence = rowsById.get("current_h39_absence");
  const partialRow = rowsById.get("partial_provider_object_branch_row");
  const acceptedUnbound = rowsById.get("accepted_provider_object_unbound");
  const derivativeMissing = rowsById.get(
    "retained_record_missing_receiver_normal_derivative"
  );
  const fourthJetTaylor = rowsById.get("fourth_jet_taylor_derivative_only");
  const reviewCandidate = rowsById.get("preimage_review_candidate");
  if (
    currentAbsence?.first_missing_preimage_field !==
      "accepted_provider_object_branch_row_ref" ||
    currentAbsence?.accepted_provider_object_branch_row_present !== false ||
    currentAbsence?.retained_causal_root_record_bound !== false ||
    !Array.isArray(currentAbsence?.missing_branch_row_ids) ||
    currentAbsence.missing_branch_row_ids.length !==
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length
  ) {
    errors.push(`${label} current_h39_absence row must keep branch rows missing`);
  }
  if (
    partialRow?.available_provider_object_terminal_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS.length - 1 ||
    partialRow?.explicit_provider_object_branch_row_count !==
      SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS.length - 2 ||
    partialRow?.missing_terminal_row_ids?.length !== 1 ||
    partialRow?.missing_branch_row_ids?.length !== 2 ||
    partialRow?.first_missing_preimage_field !==
      "accepted_provider_object_branch_row_ref"
  ) {
    errors.push(`${label} partial provider-object branch row must stay fail-closed`);
  }
  if (
    acceptedUnbound?.accepted_provider_object_branch_row_present !== true ||
    acceptedUnbound?.retained_causal_root_record_bound !== false ||
    acceptedUnbound?.first_missing_preimage_field !==
      "retained_causal_root_record_ref"
  ) {
    errors.push(`${label} accepted provider-object row must still require retained record binding`);
  }
  if (
    derivativeMissing?.receiver_normal_fields_present !== true ||
    derivativeMissing?.receiver_normal_derivative_fields_present !== false ||
    derivativeMissing?.first_missing_preimage_field !==
      "receiver_normal_derivative_fields"
  ) {
    errors.push(`${label} retained-record fixture must reject missing receiver-normal derivatives`);
  }
  if (
    fourthJetTaylor?.rejected_provider_candidate_kind !==
      "fourth-jet-or-Taylor-derivative-row" ||
    fourthJetTaylor?.receiver_normal_derivative_fields_present !== false ||
    fourthJetTaylor?.status !== "h39-provider-candidate-consumed-as-retained-record"
  ) {
    errors.push(`${label} fourth-jet/Taylor row must remain a rejected derivative source`);
  }
  if (
    reviewCandidate?.accepted_provider_object_branch_row_present !== true ||
    reviewCandidate?.retained_causal_root_record_bound !== true ||
    reviewCandidate?.branch_family_checksum_bound !== true ||
    reviewCandidate?.receiver_normal_fields_present !== true ||
    reviewCandidate?.receiver_normal_derivative_fields_present !== true ||
    reviewCandidate?.geometry_derivative_fields_present !== true ||
    reviewCandidate?.same_record_identity_verified !== true ||
    reviewCandidate?.first_missing_preimage_field !== null
  ) {
    errors.push(`${label} preimage review candidate must be complete but non-authorizing`);
  }
  if (
    !sameStringSet(
      fixture.negative_control?.rejected_provider_candidate_kinds,
      H39_RETAINED_RECORD_PREIMAGE_REJECTED_SOURCE_KINDS
    ) ||
    fixture.negative_control?.aggregate_p_only_rejected !== true ||
    fixture.negative_control?.lambda_terminal_witness_only_rejected !== true ||
    fixture.negative_control?.source_map_residual_provider_only_rejected !==
      true ||
    fixture.negative_control
      ?.fourth_jet_or_taylor_rows_rejected_as_receiver_normal_derivative_evidence !==
      true ||
    fixture.negative_control?.provider_ready_authorized_by_negative_control !==
      false
  ) {
    errors.push(`${label} h39 preimage fixture negative control is invalid`);
  }
  return errors;
}

function enrichSourceMapProviderObjectBranchIntervalReadout(
  readout,
  sourceProvenanceRefinement = {}
) {
  if (!isObject(readout)) {
    return readout;
  }
  const positiveEvidenceTarget = isObject(readout.positive_evidence_target)
    ? readout.positive_evidence_target
    : {};
  const branchSplitMapAvailability =
    buildSourceMapProviderObjectBranchSplitMapAvailability(
      readout,
      sourceProvenanceRefinement
    );
  const sourceFieldAvailabilityAudit =
    buildSourceMapProviderObjectBranchIntervalSourceFieldAudit(
      readout,
      sourceProvenanceRefinement
    );
  const producerSideBranchRowEvidenceTarget =
    buildProducerSideSameDomainBranchRowEvidenceTarget(
      branchSplitMapAvailability,
      sourceFieldAvailabilityAudit
    );
  const h39SourceMapProviderObjectBranchSplitMapProducerTarget =
    buildH39SourceMapProviderObjectBranchSplitMapProducerTarget(
      branchSplitMapAvailability,
      producerSideBranchRowEvidenceTarget
    );
  const h39ProducerSideProviderObjectBranchRowTarget =
    buildH39ProducerSideProviderObjectBranchRowTarget(
      producerSideBranchRowEvidenceTarget,
      sourceFieldAvailabilityAudit
    );
  return {
    ...readout,
    required_terminal_rows: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS,
    required_terminal_row_ids: sourceMapProviderObjectTerminalRowIds(),
    required_branch_rows: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS,
    required_branch_row_ids: sourceMapProviderObjectBranchRowIds(),
    interval_class_distinction: {
      lambda_terminal_witness_branch_intervals: {
        status: "available-comparison-witness-only",
        admissible_as_provider_object_branch_interval: false,
        reason:
          "Lambda terminal witness intervals compare source-covariance width; they do not carry the same-domain source-map/provider-object branch identity.",
      },
      source_map_provider_branch_intervals: {
        status: "missing-provider-object-payload",
        admissible_as_provider_object_branch_interval: false,
        required_payload: "source_map_provider_branch_intervals",
      },
      provider_object_branch_intervals: {
        status: "missing-provider-object-payload",
        admissible_as_provider_object_branch_interval: false,
        required_payload: "provider_object_branch_intervals",
      },
    },
    same_record_binding_fields:
      SOURCE_MAP_PROVIDER_OBJECT_SAME_RECORD_BINDING_FIELDS,
    source_map_provider_object_branch_split_map_availability:
      branchSplitMapAvailability,
    source_field_availability_audit: sourceFieldAvailabilityAudit,
    producer_side_same_domain_branch_row_evidence_target:
      producerSideBranchRowEvidenceTarget,
    h39_source_map_provider_object_branch_split_map_producer_target:
      h39SourceMapProviderObjectBranchSplitMapProducerTarget,
    h39_producer_side_provider_object_branch_row_target:
      h39ProducerSideProviderObjectBranchRowTarget,
    h39_receiver_normal_retained_record_preimage_fixture:
      buildH39ReceiverNormalRetainedRecordPreimageFixture(
        readout,
        producerSideBranchRowEvidenceTarget
      ),
    positive_evidence_target: {
      ...positiveEvidenceTarget,
      required_terminal_rows: SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS,
      required_terminal_row_ids: sourceMapProviderObjectTerminalRowIds(),
      required_branch_rows: SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS,
      required_branch_row_ids: sourceMapProviderObjectBranchRowIds(),
      required_same_record_binding_fields:
        SOURCE_MAP_PROVIDER_OBJECT_SAME_RECORD_BINDING_FIELDS,
      lambda_terminal_witness_branch_intervals_are_provider_object_intervals:
        false,
    },
  };
}

function enrichSourceContractReadout(readout) {
  if (!isObject(readout)) {
    return null;
  }
  const refinement = isObject(readout.source_provenance_refinement)
    ? readout.source_provenance_refinement
    : null;
  if (!refinement) {
    return readout;
  }
  return {
    ...readout,
    source_provenance_refinement: {
      ...refinement,
      source_map_provider_object_branch_interval_readout:
        enrichSourceMapProviderObjectBranchIntervalReadout(
          refinement.source_map_provider_object_branch_interval_readout,
          refinement
        ),
    },
  };
}

function sourceContractReadoutValidationErrors(readout, label) {
  if (readout === null || readout === undefined) {
    return [];
  }
  const errors = [];
  const expectedSharedSourceCellIds = [
    "speed.0.first-y",
    "speed.1.first-y",
    "speed.2.first-y",
    "speed.3.first-y",
    "speed.4.first-y",
  ];
  const expectedBlockerKinds = [
    "source_term_provider_directed_source_certification_open",
    "source_term_provider_term_width_realization_open",
  ];
  const expectedLatestBoundary =
    "terminal-source-covariance-lambda-provider-object-replay-audit-provider-branch-intervals-open";
  const expectedCurrentBlocker =
    "same-domain-source-map-provider-object-branch-intervals-needed";
  const expectedCurrentMissingObject =
    "source-map-provider-object-branch-intervals";
  const expectedNextEvidenceObject =
    "same-domain source-map provider-object branch intervals on every terminal row";
  if (!isObject(readout)) {
    return [`${label} must be an object when present`];
  }
  if (readout.schema !== SOURCE_CONTRACT_READOUT_SCHEMA) {
    errors.push(`${label} schema must be ${SOURCE_CONTRACT_READOUT_SCHEMA}`);
  }
  if (
    readout.status !==
    "candidate-boundary-replay-verified-source-term-provider-certification-open"
  ) {
    errors.push(`${label} status must keep source-term provider certification open`);
  }
  if (
    readout.source_contract_boundary_verified !== true ||
    readout.source_contract_boundary_row_count !== 5 ||
    readout.source_contract_boundary_check_count !== 17 ||
    !sameStringSet(readout.shared_source_cell_ids, expectedSharedSourceCellIds) ||
    readout.provider_row_source_kind !==
      "directed-rounded-same-domain-h38-source-map-residual-provider" ||
    readout.source_term_provider_probe_same_domain_contract_ready !== true ||
    readout.source_term_provider_probe_same_radius_contract_ready !== true ||
    readout.terminal_row_enclosure_boundary_replay_verified !== true
  ) {
    errors.push(`${label} must verify the H39 source-contract boundary replay`);
  }
  if (
    readout.directed_rounded_shared_domain_provider_certified !== false ||
    readout.source_term_provider_probe_rows_certify_directed_rounded_source !==
      false ||
    readout.source_term_provider_probe_term_width_realization_closed !== false ||
    !sameStringSet(
      readout.open_provider_certification_blocker_kinds,
      expectedBlockerKinds
    ) ||
    readout.provider_ready_authorized_by_this_readout !== false
  ) {
    errors.push(`${label} must keep provider certification and readiness false`);
  }
  const refinement = readout.source_provenance_refinement;
  if (!isObject(refinement)) {
    errors.push(`${label} must include source_provenance_refinement`);
  } else {
    const emitterTarget = refinement.source_provenance_emitter_target;
    const sourceMapProviderObjectReadout =
      refinement.source_map_provider_object_branch_interval_readout;
    if (
      refinement.schema !== SOURCE_PROVENANCE_REFINEMENT_SCHEMA ||
      refinement.status !==
        "candidate-source-covariance-lambda-provider-object-replay-branch-intervals-open" ||
      refinement.term_width_reduced_to_signed_radius_source_provenance !== true ||
      refinement.term_width_is_primary_blocker !== false ||
      refinement.directed_rounded_source_provenance_still_open !== true ||
      refinement.source_provenance_certificate_fields_present !== false ||
      refinement.source_provenance_emitter_materialized !== false ||
      refinement.signed_radius_subinterval_emitter_primitive_materialized !==
        true ||
      refinement.source_term_producer_image_fields_projected !== true ||
      refinement.lambda_terminal_witness_branch_intervals_available !== true ||
      refinement.source_map_provider_branch_intervals_available !== false ||
      refinement.provider_object_branch_intervals_present !== false ||
      refinement.source_term_provider_probe_rows_certify_directed_rounded_source !==
        false ||
      refinement.source_term_provider_probe_term_width_realization_closed !==
        false ||
      refinement.latest_candidate_boundary !== expectedLatestBoundary ||
      refinement.current_blocker_classification !== expectedCurrentBlocker ||
      refinement.current_primary_missing_object_kind !==
        expectedCurrentMissingObject ||
      refinement.next_evidence_object !== expectedNextEvidenceObject ||
      refinement.provider_ready_authorized_by_this_refinement !== false
    ) {
      errors.push(`${label} source_provenance_refinement must stay fail-closed`);
    }
    if (
      !isObject(emitterTarget) ||
      emitterTarget.schema !== SOURCE_PROVENANCE_EMITTER_TARGET_SCHEMA ||
      emitterTarget.status !==
        "candidate-signed-radius-subinterval-emitter-primitive-materialized-source-provenance-open" ||
      emitterTarget.signed_radius_subinterval_emitter_primitive_verified !==
        true ||
      emitterTarget.signed_radius_subinterval_emitter_primitive_materialized !==
        true ||
      emitterTarget.source_provenance_emitter_materialized !== false ||
      emitterTarget.source_provenance_emitter_certified_directed_rounded !==
        false ||
      emitterTarget.source_term_producer_image_provenance_fields_present !==
        false ||
      emitterTarget.source_term_producer_image_provenance_fields_still_missing !==
        true ||
      !sameStringSet(emitterTarget.source_cell_ids, expectedSharedSourceCellIds) ||
      emitterTarget.provider_ready_authorized_by_this_target !== false ||
      emitterTarget.downstream_consumer_authorization !== false
    ) {
      errors.push(`${label} source_provenance_emitter_target must stay fail-closed`);
    }
    if (
      !isObject(sourceMapProviderObjectReadout) ||
      sourceMapProviderObjectReadout.schema !==
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_READOUT_SCHEMA ||
      sourceMapProviderObjectReadout.status !==
        "candidate-source-map-provider-object-branch-intervals-open" ||
      sourceMapProviderObjectReadout.terminal_row_count !== 15 ||
      sourceMapProviderObjectReadout.branch_row_count !== 30 ||
      sourceMapProviderObjectReadout
        .lambda_terminal_witness_branch_intervals_available !== true ||
      sourceMapProviderObjectReadout
        .source_map_provider_branch_intervals_available !== false ||
      sourceMapProviderObjectReadout
        .provider_object_branch_intervals_present !== false ||
      sourceMapProviderObjectReadout
        .accepted_provider_object_branch_interval_count !== 0 ||
      !sameStringSet(
        sourceMapProviderObjectReadout.rejected_candidate_source_kinds,
        SOURCE_MAP_PROVIDER_OBJECT_REJECTED_CANDIDATE_SOURCE_KINDS
      ) ||
      !sameStringSet(
        sourceMapProviderObjectReadout.missing_identity_kinds,
        SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS
      ) ||
      !sameJson(
        sourceMapProviderObjectReadout.required_terminal_rows,
        SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS
      ) ||
      !sameStringSet(
        sourceMapProviderObjectReadout.required_terminal_row_ids,
        sourceMapProviderObjectTerminalRowIds()
      ) ||
      !sameJson(
        sourceMapProviderObjectReadout.required_branch_rows,
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS
      ) ||
      !sameStringSet(
        sourceMapProviderObjectReadout.required_branch_row_ids,
        sourceMapProviderObjectBranchRowIds()
      ) ||
      !sameStringSet(
        sourceMapProviderObjectReadout.same_record_binding_fields,
        SOURCE_MAP_PROVIDER_OBJECT_SAME_RECORD_BINDING_FIELDS
      ) ||
      sourceMapProviderObjectReadout.interval_class_distinction
        ?.lambda_terminal_witness_branch_intervals
        ?.admissible_as_provider_object_branch_interval !== false ||
      sourceMapProviderObjectReadout.interval_class_distinction
        ?.source_map_provider_branch_intervals
        ?.required_payload !== "source_map_provider_branch_intervals" ||
      sourceMapProviderObjectReadout.interval_class_distinction
        ?.provider_object_branch_intervals
        ?.required_payload !== "provider_object_branch_intervals" ||
      sourceMapProviderObjectReadout.interval_class_distinction
        ?.source_map_provider_branch_intervals
        ?.admissible_as_provider_object_branch_interval !== false ||
      sourceMapProviderObjectReadout.interval_class_distinction
        ?.provider_object_branch_intervals
        ?.admissible_as_provider_object_branch_interval !== false ||
      sourceMapProviderObjectReadout.interval_class_distinction
        ?.lambda_terminal_witness_branch_intervals
        ?.status !== "available-comparison-witness-only" ||
      sourceMapProviderObjectReadout.interval_class_distinction
        ?.source_map_provider_branch_intervals
        ?.status !== "missing-provider-object-payload" ||
      sourceMapProviderObjectReadout.interval_class_distinction
        ?.provider_object_branch_intervals
        ?.status !== "missing-provider-object-payload" ||
      sourceMapProviderObjectReadout.positive_evidence_target
        ?.lambda_terminal_witness_branch_intervals_are_provider_object_intervals !==
        false ||
      sourceMapProviderObjectReadout.provider_ready_authorized_by_this_readout !==
        false ||
      sourceMapProviderObjectReadout.downstream_consumer_authorization !== false
    ) {
      errors.push(
        `${label} source_map_provider_object_branch_interval_readout must stay fail-closed`
      );
    } else {
      const branchSplitMapAvailability =
        sourceMapProviderObjectReadout
          .source_map_provider_object_branch_split_map_availability;
      const sourceFieldAvailabilityAudit =
        sourceMapProviderObjectReadout.source_field_availability_audit;
      const producerSideBranchRowEvidenceTarget =
        sourceMapProviderObjectReadout
          .producer_side_same_domain_branch_row_evidence_target;
      const h39SourceMapProviderObjectBranchSplitMapProducerTarget =
        sourceMapProviderObjectReadout
          .h39_source_map_provider_object_branch_split_map_producer_target;
      const h39ProducerSideProviderObjectBranchRowTarget =
        sourceMapProviderObjectReadout
          .h39_producer_side_provider_object_branch_row_target;
      const retainedRecordPreimageFixture =
        sourceMapProviderObjectReadout
          .h39_receiver_normal_retained_record_preimage_fixture;
      const positiveEvidenceTarget =
        sourceMapProviderObjectReadout.positive_evidence_target;
      const sourceFields = sourceFieldAvailabilityAudit?.source_fields ?? [];
      const identityFamilies =
        sourceFieldAvailabilityAudit?.identity_families ?? [];
      if (
        !isObject(branchSplitMapAvailability) ||
        branchSplitMapAvailability.schema !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_AVAILABILITY_SCHEMA ||
        branchSplitMapAvailability.status !==
          "source-map-provider-object-branch-split-map-source-field-not-emitted" ||
        branchSplitMapAvailability.required_terminal_row_count !== 15 ||
        branchSplitMapAvailability.required_branch_row_count !== 30 ||
        !sameStringSet(
          branchSplitMapAvailability.required_terminal_row_ids,
          sourceMapProviderObjectTerminalRowIds()
        ) ||
        !sameStringSet(
          branchSplitMapAvailability.required_branch_row_ids,
          sourceMapProviderObjectBranchRowIds()
        ) ||
        branchSplitMapAvailability.source_field !==
          "source_map_provider_object_branch_split_map_available_terminal_row_count" ||
        branchSplitMapAvailability.source_field_emitted_by_provider_readout !==
          false ||
        branchSplitMapAvailability.observed_available_terminal_row_count !== 0 ||
        branchSplitMapAvailability.branch_split_map_populated !== false ||
        branchSplitMapAvailability.branch_split_map_count_readout
          ?.observed_count !== 0 ||
        branchSplitMapAvailability.branch_split_map_count_readout
          ?.emitted_by_provider_readout !== false ||
        branchSplitMapAvailability.branch_interval_count_readout
          ?.observed_count !== 0 ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.source_field !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.available_terminal_row_count !== 0 ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.required_terminal_row_count !== 15 ||
        !sameStringSet(
          branchSplitMapAvailability.branch_antisymmetric_equation_readout
            ?.required_terminal_row_ids,
          sourceMapProviderObjectTerminalRowIds()
        ) ||
        !sameStringSet(
          branchSplitMapAvailability.branch_antisymmetric_equation_readout
            ?.required_branch_row_ids,
          sourceMapProviderObjectBranchRowIds()
        ) ||
        !sameStringSet(
          branchSplitMapAvailability.branch_antisymmetric_equation_readout
            ?.available_terminal_row_ids,
          []
        ) ||
        !sameStringSet(
          branchSplitMapAvailability.branch_antisymmetric_equation_readout
            ?.missing_terminal_row_ids,
          sourceMapProviderObjectTerminalRowIds()
        ) ||
        !sameJson(
          branchSplitMapAvailability.branch_antisymmetric_equation_readout
            ?.missing_terminal_rows,
          SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS
        ) ||
        !sameStringSet(
          branchSplitMapAvailability.branch_antisymmetric_equation_readout
            ?.available_branch_row_ids,
          []
        ) ||
        !sameStringSet(
          branchSplitMapAvailability.branch_antisymmetric_equation_readout
            ?.missing_branch_row_ids,
          sourceMapProviderObjectBranchRowIds()
        ) ||
        !sameJson(
          branchSplitMapAvailability.branch_antisymmetric_equation_readout
            ?.missing_branch_rows,
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS
        ) ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.missing_branch_row_count !== 30 ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.exact_missing_terminal_rows_known !== true ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.exact_missing_branch_rows_known !== true ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.missing_terminal_row_count !== 15 ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.emitted_by_provider_readout !== true ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.emitted_surface !==
          "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor" ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.emitted_field !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.all_required_terminal_rows_available !== false ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.all_required_terminal_rows_missing !== true ||
        branchSplitMapAvailability.branch_antisymmetric_equation_readout
          ?.complete !== false ||
        branchSplitMapAvailability.explicit_provider_object_branch_row_readout
          ?.observed_count !== 0 ||
        branchSplitMapAvailability.branch_attributed_source_term_readout
          ?.observed_count !== 0 ||
        branchSplitMapAvailability.first_missing_source_field !==
          "source_map_provider_object_branch_split_map_available_terminal_row_count" ||
        branchSplitMapAvailability
          .next_missing_source_field_after_branch_split_map_count !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD ||
        branchSplitMapAvailability
          .next_missing_source_surface_after_branch_split_map_count !==
          "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor" ||
        branchSplitMapAvailability.smallest_next_evidence_object !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_EVIDENCE_OBJECT ||
        branchSplitMapAvailability.provider_object_branch_intervals_present !==
          false ||
        branchSplitMapAvailability
          .provider_ready_authorized_by_this_availability !== false ||
        branchSplitMapAvailability.downstream_consumer_authorization !== false
      ) {
        errors.push(
          `${label} source_map_provider_object_branch_split_map_availability must stay non-authorizing`
        );
      }
      if (
        !isObject(sourceFieldAvailabilityAudit) ||
        sourceFieldAvailabilityAudit.schema !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_SOURCE_FIELD_AUDIT_SCHEMA ||
        sourceFieldAvailabilityAudit.status !==
          "source-map-provider-object-branch-interval-source-fields-incomplete" ||
        sourceFieldAvailabilityAudit.required_terminal_row_count !== 15 ||
        sourceFieldAvailabilityAudit.required_branch_row_count !== 30 ||
        !Array.isArray(
          sourceFieldAvailabilityAudit.inspected_h39_diagnostic_field_refs
        ) ||
        sourceFieldAvailabilityAudit.inspected_h39_diagnostic_field_refs.length !==
          5 ||
        !Array.isArray(sourceFields) ||
        sourceFields.length !== 7 ||
        sourceFieldAvailabilityAudit.first_missing_source_field !==
          "source_map_provider_object_branch_split_map_available_terminal_row_count" ||
        sourceFieldAvailabilityAudit.first_missing_identity_family !==
          "same-domain-branch-bearing-P_b-map" ||
        sourceFieldAvailabilityAudit.first_missing_provider_field !==
          "source_map_provider_object_branch_split_map_available_terminal_row_count" ||
        !Array.isArray(identityFamilies) ||
        identityFamilies.length !==
          SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS.length ||
        !sameStringSet(
          identityFamilies.map((identity) => identity.identity_kind),
          SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS
        ) ||
        identityFamilies.some((identity) => identity.complete !== false) ||
        sourceFields.some((field) => field.complete === true) ||
        sourceFieldAvailabilityAudit.provider_ready_authorized_by_this_audit !==
          false ||
        sourceFieldAvailabilityAudit.downstream_consumer_authorization !== false
      ) {
        errors.push(
          `${label} source_map_provider_object_branch_interval_readout source_field_availability_audit must stay fail-closed`
        );
      }
      if (
        !isObject(producerSideBranchRowEvidenceTarget) ||
        producerSideBranchRowEvidenceTarget.schema !==
          PRODUCER_SIDE_SAME_DOMAIN_BRANCH_ROW_EVIDENCE_TARGET_SCHEMA ||
        producerSideBranchRowEvidenceTarget.claim_level !==
          "priority-only target, not provider acceptance" ||
        producerSideBranchRowEvidenceTarget.status !==
          "producer-side-same-domain-branch-row-evidence-missing" ||
        producerSideBranchRowEvidenceTarget.target_kind !==
          "same-domain-expression-level-source-map-provider-object-branch-row-evidence" ||
        producerSideBranchRowEvidenceTarget.missing_producer_object_kind !==
          "same-domain-expression-level-provider-object-branch-antisymmetric-equation-or-explicit-branch-rows" ||
        producerSideBranchRowEvidenceTarget.required_producer_object !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_EVIDENCE_OBJECT ||
        producerSideBranchRowEvidenceTarget.producer_object_formula !==
          "A_P=P_- - P_+; u_P=A_P/2" ||
        producerSideBranchRowEvidenceTarget.producer_source_surface !==
          "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor" ||
        producerSideBranchRowEvidenceTarget.producer_source_field !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_SPLIT_MAP_NEXT_SOURCE_FIELD ||
        producerSideBranchRowEvidenceTarget.required_terminal_row_count !== 15 ||
        producerSideBranchRowEvidenceTarget.required_branch_row_count !== 30 ||
        !sameJson(
          producerSideBranchRowEvidenceTarget.required_terminal_rows,
          SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS
        ) ||
        !sameStringSet(
          producerSideBranchRowEvidenceTarget.required_terminal_row_ids,
          sourceMapProviderObjectTerminalRowIds()
        ) ||
        !sameJson(
          producerSideBranchRowEvidenceTarget.required_branch_rows,
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS
        ) ||
        !sameStringSet(
          producerSideBranchRowEvidenceTarget.required_branch_row_ids,
          sourceMapProviderObjectBranchRowIds()
        ) ||
        producerSideBranchRowEvidenceTarget.current_available_terminal_row_count !==
          0 ||
        producerSideBranchRowEvidenceTarget.current_missing_terminal_row_count !==
          15 ||
        !sameStringSet(
          producerSideBranchRowEvidenceTarget.current_missing_terminal_row_ids,
          sourceMapProviderObjectTerminalRowIds()
        ) ||
        !sameJson(
          producerSideBranchRowEvidenceTarget.current_missing_terminal_rows,
          SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS
        ) ||
        !sameStringSet(
          producerSideBranchRowEvidenceTarget.current_missing_branch_row_ids,
          sourceMapProviderObjectBranchRowIds()
        ) ||
        !sameJson(
          producerSideBranchRowEvidenceTarget.current_missing_branch_rows,
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS
        ) ||
        producerSideBranchRowEvidenceTarget.current_missing_branch_row_count !==
          30 ||
        producerSideBranchRowEvidenceTarget.exact_missing_terminal_rows_known !==
          true ||
        producerSideBranchRowEvidenceTarget.exact_missing_branch_rows_known !==
          true ||
        producerSideBranchRowEvidenceTarget.current_source_counts
          ?.provider_object_branch_antisymmetric_equation_available_terminal_row_count !==
          0 ||
        producerSideBranchRowEvidenceTarget.current_source_counts
          ?.explicit_provider_object_branch_row_count !== 0 ||
        producerSideBranchRowEvidenceTarget.current_source_counts
          ?.source_term_provider_branch_attributed_term_row_count !== 0 ||
        !sameStringSet(
          producerSideBranchRowEvidenceTarget.same_domain_identity_fields,
          SOURCE_MAP_PROVIDER_OBJECT_SAME_RECORD_BINDING_FIELDS
        ) ||
        !sameStringSet(
          producerSideBranchRowEvidenceTarget.required_identity_kinds,
          SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS
        ) ||
        !sameStringSet(
          producerSideBranchRowEvidenceTarget.required_interval_payloads,
          SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_INTERVAL_PAYLOADS
        ) ||
        producerSideBranchRowEvidenceTarget.first_missing_provider_field !==
          "source_map_provider_object_branch_split_map_available_terminal_row_count" ||
        producerSideBranchRowEvidenceTarget.negative_control?.ref !==
          SOURCE_MAP_PROVIDER_OBJECT_AGGREGATE_ERASURE_NEGATIVE_CONTROL_REF ||
        !sameStringSet(
          producerSideBranchRowEvidenceTarget.negative_control
            ?.rejected_candidate_source_kinds,
          SOURCE_MAP_PROVIDER_OBJECT_REJECTED_CANDIDATE_SOURCE_KINDS
        ) ||
        producerSideBranchRowEvidenceTarget.negative_control
          ?.aggregate_p_only_rejected !== true ||
        producerSideBranchRowEvidenceTarget.negative_control
          ?.lambda_terminal_witness_only_rejected !== true ||
        producerSideBranchRowEvidenceTarget.negative_control
          ?.provider_ready_authorized_by_negative_control !== false ||
        producerSideBranchRowEvidenceTarget
          .provider_ready_authorized_by_this_target !== false ||
        producerSideBranchRowEvidenceTarget.downstream_consumer_authorization !==
          false
      ) {
        errors.push(
          `${label} source_map_provider_object_branch_interval_readout producer-side same-domain branch-row evidence target must stay fail-closed`
        );
      }
      const splitMapProducerTargetErrors =
        h39SourceMapProviderObjectBranchSplitMapProducerTargetValidationErrors(
          h39SourceMapProviderObjectBranchSplitMapProducerTarget,
          `${label} source_map_provider_object_branch_interval_readout`
        );
      if (splitMapProducerTargetErrors.length > 0) {
        errors.push(...splitMapProducerTargetErrors);
      }
      const producerSideProviderObjectBranchRowTargetErrors =
        h39ProducerSideProviderObjectBranchRowTargetValidationErrors(
          h39ProducerSideProviderObjectBranchRowTarget,
          `${label} source_map_provider_object_branch_interval_readout`
        );
      if (producerSideProviderObjectBranchRowTargetErrors.length > 0) {
        errors.push(...producerSideProviderObjectBranchRowTargetErrors);
      }
      const retainedRecordPreimageFixtureErrors =
        h39ReceiverNormalRetainedRecordPreimageFixtureValidationErrors(
          retainedRecordPreimageFixture,
          `${label} source_map_provider_object_branch_interval_readout`
        );
      if (retainedRecordPreimageFixtureErrors.length > 0) {
        errors.push(...retainedRecordPreimageFixtureErrors);
      }
      if (
        !isObject(positiveEvidenceTarget) ||
        positiveEvidenceTarget.schema !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_TARGET_SCHEMA ||
        positiveEvidenceTarget.claim_level !==
          "priority-only target, not provider acceptance" ||
        positiveEvidenceTarget.required_terminal_row_count !== 15 ||
        positiveEvidenceTarget.required_branch_row_count !== 30 ||
        !sameStringSet(
          positiveEvidenceTarget.required_identity_kinds,
          SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_IDENTITY_KINDS
        ) ||
        !sameStringSet(
          positiveEvidenceTarget.required_interval_payloads,
          SOURCE_MAP_PROVIDER_OBJECT_REQUIRED_INTERVAL_PAYLOADS
        ) ||
        !sameJson(
          positiveEvidenceTarget.required_terminal_rows,
          SOURCE_MAP_PROVIDER_OBJECT_TERMINAL_ROWS
        ) ||
        !sameStringSet(
          positiveEvidenceTarget.required_terminal_row_ids,
          sourceMapProviderObjectTerminalRowIds()
        ) ||
        !sameJson(
          positiveEvidenceTarget.required_branch_rows,
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_ROWS
        ) ||
        !sameStringSet(
          positiveEvidenceTarget.required_branch_row_ids,
          sourceMapProviderObjectBranchRowIds()
        ) ||
        !sameStringSet(
          positiveEvidenceTarget.required_same_record_binding_fields,
          SOURCE_MAP_PROVIDER_OBJECT_SAME_RECORD_BINDING_FIELDS
        ) ||
        positiveEvidenceTarget
          .accepted_provider_object_branch_interval_count_required !== 30 ||
        positiveEvidenceTarget.same_record_binding_required !== true ||
        positiveEvidenceTarget.provider_ready_authorized_by_this_target !==
          false ||
        positiveEvidenceTarget.downstream_consumer_authorization !== false
      ) {
        errors.push(
          `${label} source_map_provider_object_branch_interval_readout positive_evidence_target must stay target-only`
        );
      }
    }
  }
  return errors;
}

function contract() {
  return {
    schema: CONTRACT_SCHEMA,
    purpose:
      "Minimum same-domain branch-bearing provider fields before top-six consumers may treat a candidate row as provider-ready.",
    accepted_source_status: ACCEPTED_SOURCE_STATUS,
    common_required_fields: COMMON_REQUIRED_FIELDS.map(fieldContractEntry),
    consumers: CONSUMERS.map((consumer) => ({
      id: consumer.id,
      rank: consumer.rank,
      workstream: consumer.workstream,
      target: consumer.target,
      required_fields: consumer.requiredFields.map(fieldContractEntry),
    })),
    provider_object_construction_attempt: {
      schema: CONSTRUCTION_ATTEMPT_SCHEMA,
      claim_level: "priority-only construction attempt, not provider acceptance",
      target:
        "same-domain branch-bearing provider object before aggregate P is consumed",
      required_fields: PROVIDER_OBJECT_CONSTRUCTION_FIELDS.map(fieldContractEntry),
    },
    authorization_boundary: {
      provider_ready_is_not_downstream_closure: true,
      construction_attempt_authorizes_provider_ready: false,
      candidate_h_recovery_authorized_by_this_report: false,
      pressure_coefficient_authorized_by_this_report: false,
      structural_integrity_residual_vector_authorized_by_this_report: false,
      retained_branch_claim_authorized_by_this_report: false,
    },
  };
}

function evaluateField(candidate, field) {
  const value = getPath(candidate, field.path);
  const pass = acceptedValue(value, field.acceptedValues);
  return {
    path: field.path,
    requirement: field.requirement,
    present: present(value),
    pass,
    value: present(value) && typeof value !== "object" ? value : null,
    failure_code: pass ? null : field.failureCode,
  };
}

function candidateAppliesToConsumer(candidate, consumer) {
  return Array.isArray(candidate.feeds) && candidate.feeds.includes(consumer.id);
}

function evaluateCandidateForConsumer(candidate, consumer) {
  const fieldResults = consumer.requiredFields.map((field) => evaluateField(candidate, field));
  const failedFields = fieldResults.filter((field) => !field.pass);
  const providerReady = failedFields.length === 0;
  return {
    consumer_id: consumer.id,
    rank: consumer.rank,
    workstream: consumer.workstream,
    target: consumer.target,
    provider_ready: providerReady,
    first_failure: providerReady ? null : failedFields[0].failure_code,
    missing_or_rejected_fields: failedFields.map((field) => field.path),
    field_results: fieldResults,
  };
}

function evaluateCandidate(candidate) {
  const consumerResults = CONSUMERS.filter((consumer) => candidateAppliesToConsumer(candidate, consumer)).map((consumer) =>
    evaluateCandidateForConsumer(candidate, consumer)
  );
  const providerReadyConsumers = consumerResults.filter((consumer) => consumer.provider_ready);
  const firstFailure = consumerResults.find((consumer) => !consumer.provider_ready)?.first_failure ?? null;
  return {
    id: candidate.id ?? null,
    source_ref: candidate.source_ref ?? null,
    provider_source_status: candidate.provider_source_status ?? null,
    claim_scope: candidate.claim_scope ?? "priority-only-provider-candidate",
    feeds: Array.isArray(candidate.feeds) ? candidate.feeds : [],
    provider_ready_for_consumers: providerReadyConsumers.map((consumer) => consumer.consumer_id),
    first_failure: providerReadyConsumers.length > 0 ? null : firstFailure ?? "no_consumer_declared",
    consumer_results: consumerResults,
  };
}

function constructionFieldsForCandidate(candidate) {
  const feedsRank2 = Array.isArray(candidate.feeds)
    && candidate.feeds.includes("rank2_field_speed_action_self_hit_scan");
  return PROVIDER_OBJECT_CONSTRUCTION_FIELDS.filter(
    (field) => field.rank2Only !== true || feedsRank2
  );
}

function evaluateConstructionAttemptCandidate(candidate) {
  const fieldResults = constructionFieldsForCandidate(candidate).map((field) =>
    evaluateField(candidate, field)
  );
  const failedFields = fieldResults.filter((field) => !field.pass);
  const providerObjectFieldsReady = failedFields.length === 0;
  const branchMaterializationFields = [
    "branch_rows_ref",
    "branch_labels",
    "branch_weights_or_intervals",
    "projection_map_ref",
    "pushforward_operator_ref",
    "normalization_identity_ref",
    "source_term_refs_upstream_of_aggregate_p",
    "aggregate_erasure_negative_control_ref",
  ];
  const branchMaterializationReady = branchMaterializationFields.every((fieldPath) =>
    fieldResults.find((field) => field.path === fieldPath)?.pass === true
  );

  return {
    candidate_id: candidate.id ?? null,
    feeds: Array.isArray(candidate.feeds) ? candidate.feeds : [],
    provider_source_status: candidate.provider_source_status ?? null,
    provider_object_fields_ready: providerObjectFieldsReady,
    branch_materialization_ready: branchMaterializationReady,
    first_failure: providerObjectFieldsReady ? null : failedFields[0]?.failure_code ?? "provider_candidate_absent",
    missing_or_rejected_fields: failedFields.map((field) => field.path),
    source_contract_readout: enrichSourceContractReadout(
      candidate.source_contract_readout
    ),
    field_results: fieldResults,
  };
}

function consumerSpecificMissingFields(candidate, consumer) {
  const commonFieldPaths = new Set(COMMON_REQUIRED_FIELDS.map((field) => field.path));
  return consumer.requiredFields
    .filter((field) => !commonFieldPaths.has(field.path))
    .filter((field) => !evaluateField(candidate, field).pass)
    .map((field) => field.path);
}

function constructionMissingFields(candidateAttempt) {
  const rank2OnlyFieldPaths = new Set(
    PROVIDER_OBJECT_CONSTRUCTION_FIELDS
      .filter((field) => field.rank2Only === true)
      .map((field) => field.path)
  );
  return candidateAttempt.missing_or_rejected_fields.filter(
    (fieldPath) => !rank2OnlyFieldPaths.has(fieldPath)
  );
}

function buildConsumerConstructionAttemptReadouts(
  manifestCandidatesById,
  candidateAttemptsById
) {
  return [...CONSUMER_CONSTRUCTION_ATTEMPT_CANDIDATE_IDS]
    .flatMap((candidateId) => {
      const candidate = manifestCandidatesById.get(candidateId);
      const attempt = candidateAttemptsById.get(candidateId);
      if (!candidate || !attempt) {
        return [];
      }
      return CONSUMERS.filter((consumer) => candidateAppliesToConsumer(candidate, consumer))
        .map((consumer) => ({
          candidate_id: candidateId,
          consumer_id: consumer.id,
          rank: consumer.rank,
          target: consumer.target,
          provider_source_status: candidate.provider_source_status ?? null,
          same_domain_record_ref: candidate.same_domain_record_ref ?? null,
          source_term_refs_upstream_of_aggregate_p:
            candidate.source_term_refs_upstream_of_aggregate_p ?? null,
          aggregate_erasure_negative_control_ref:
            candidate.aggregate_erasure_negative_control_ref ?? null,
          source_contract_readout: enrichSourceContractReadout(
            candidate.source_contract_readout
          ),
          construction_attempt_ready: attempt.provider_object_fields_ready,
          provider_ready_authorized_by_this_attempt: false,
          downstream_consumer_authorization: false,
          first_failure:
            evaluateCandidateForConsumer(candidate, consumer).first_failure,
          missing_construction_fields: constructionMissingFields(attempt),
          consumer_specific_missing_fields: consumerSpecificMissingFields(
            candidate,
            consumer
          ),
        }));
    });
}

function buildConstructionAttempt(manifest) {
  const candidateAttempts = manifest.candidates.map(evaluateConstructionAttemptCandidate);
  const candidateAttemptsById = new Map(
    candidateAttempts.map((candidate) => [candidate.candidate_id, candidate])
  );
  const manifestCandidatesById = new Map(
    manifest.candidates.map((candidate) => [candidate.id ?? null, candidate])
  );
  const readyCandidateIds = candidateAttempts
    .filter((candidate) => candidate.provider_object_fields_ready)
    .map((candidate) => candidate.candidate_id)
    .filter(Boolean);
  const missingFieldUnion = unique(
    candidateAttempts.flatMap((candidate) => candidate.missing_or_rejected_fields)
  );
  const firstFailure =
    readyCandidateIds.length > 0
      ? null
      : candidateAttempts.find((candidate) => candidate.first_failure)?.first_failure
        ?? "provider_candidate_absent";

  return {
    schema: CONSTRUCTION_ATTEMPT_SCHEMA,
    claim_level: "priority-only construction attempt, not provider acceptance",
    source_ref: manifest.source_ref ?? null,
    target:
      "same-domain branch-bearing provider object before aggregate P is consumed",
    status:
      readyCandidateIds.length > 0
        ? "same_domain_branch_provider_object_fields_populated_review_required"
        : "same_domain_branch_provider_object_construction_blocked",
    first_failure: firstFailure,
    accepted_source_status_required: ACCEPTED_SOURCE_STATUS,
    required_fields: PROVIDER_OBJECT_CONSTRUCTION_FIELDS.map(fieldContractEntry),
    summary: {
      candidate_count: candidateAttempts.length,
      ready_candidate_count: readyCandidateIds.length,
      ready_candidate_ids: readyCandidateIds,
      missing_or_rejected_field_union: missingFieldUnion,
    },
    candidate_attempts: candidateAttempts,
    consumer_construction_attempt_readouts: buildConsumerConstructionAttemptReadouts(
      manifestCandidatesById,
      candidateAttemptsById
    ),
    authorization: {
      provider_ready_authorized_by_this_attempt: false,
      downstream_consumer_authorization: false,
      candidate_h_recovery: false,
      pressure_coefficient: false,
      structural_integrity_residual_vector: false,
      retained_branch_claim: false,
    },
  };
}

export function buildReport(manifest, options = {}) {
  if (!isObject(manifest)) {
    throw new Error("Branch-provider evidence manifest must be a JSON object.");
  }
  if (!Array.isArray(manifest.candidates)) {
    throw new Error("Branch-provider evidence manifest must include candidates array.");
  }

  const candidateResults = manifest.candidates.map(evaluateCandidate);
  const consumerResults = CONSUMERS.map((consumer) => {
    const applicable = candidateResults
      .flatMap((candidate) =>
        candidate.consumer_results.map((result) => ({
          ...result,
          candidate_id: candidate.id,
        }))
      )
      .filter((result) => result.consumer_id === consumer.id);
    const accepted = applicable.filter((result) => result.provider_ready);
    const firstFailure =
      accepted.length > 0
        ? null
        : applicable.find((result) => result.first_failure)?.first_failure ?? "provider_candidate_absent";
    return {
      consumer_id: consumer.id,
      rank: consumer.rank,
      workstream: consumer.workstream,
      target: consumer.target,
      provider_ready: accepted.length > 0,
      accepted_candidate_ids: accepted.map((result) => result.candidate_id),
      candidate_count: applicable.length,
      first_failure: firstFailure,
      missing_or_rejected_fields: unique(
        applicable.flatMap((result) => result.missing_or_rejected_fields)
      ),
    };
  });
  const providerReadyConsumerCount = consumerResults.filter((consumer) => consumer.provider_ready).length;
  const acceptedCandidateIds = unique(
    consumerResults.flatMap((consumer) => consumer.accepted_candidate_ids)
  );

  const authorization = Object.fromEntries(
    CONSUMERS.map((consumer) => [
      consumer.authorizationKey,
      consumerResults.find((result) => result.consumer_id === consumer.id)?.provider_ready === true,
    ])
  );

  return {
    schema: SCHEMA,
    source_ref: options.sourceRef ?? manifest.source_ref ?? null,
    manifest_schema: manifest.schema ?? null,
    report_id: manifest.report_id ?? "branch-provider-evidence-current-candidates",
    promotion_status: "priority-only",
    provider_object_construction_attempt: buildConstructionAttempt(manifest),
    provider_verdict:
      providerReadyConsumerCount > 0
        ? "provider_ready_for_one_or_more_consumers"
        : "same_domain_branch_provider_missing",
    first_failure:
      providerReadyConsumerCount > 0
        ? null
        : consumerResults.find((consumer) => consumer.first_failure)?.first_failure ?? "provider_candidate_absent",
    summary: {
      candidate_count: candidateResults.length,
      consumer_count: consumerResults.length,
      provider_ready_consumer_count: providerReadyConsumerCount,
      accepted_candidate_ids: acceptedCandidateIds,
    },
    consumer_results: consumerResults,
    candidate_results: candidateResults,
    authorization: {
      ...authorization,
      candidate_h_recovery: false,
      pressure_coefficient: false,
      structural_integrity_residual_vector: false,
      retained_branch_claim: false,
    },
    not_authorized: [
      "does not run field_speed_action_self_hit_scan/v0",
      "does not populate pressure-response coefficients",
      "does not populate moving_retained_branch_certificate/v0",
      "does not certify bounded-speed branch retention",
      "does not authorize a retained branch claim",
    ],
  };
}

export function validationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["report must be an object"];
  }
  if (report.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (report.promotion_status !== "priority-only") {
    errors.push("promotion_status must remain priority-only");
  }
  if (!["same_domain_branch_provider_missing", "provider_ready_for_one_or_more_consumers"].includes(report.provider_verdict)) {
    errors.push("provider_verdict is invalid");
  }
  if (report.provider_verdict === "same_domain_branch_provider_missing" && typeof report.first_failure !== "string") {
    errors.push("missing-provider reports must carry first_failure");
  }
  if (report.provider_verdict === "provider_ready_for_one_or_more_consumers" && report.first_failure !== null) {
    errors.push("provider-ready reports must not carry first_failure");
  }
  if (!Array.isArray(report.consumer_results)) {
    errors.push("consumer_results must be an array");
  }
  if (!Array.isArray(report.candidate_results)) {
    errors.push("candidate_results must be an array");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  if (!isObject(report.provider_object_construction_attempt)) {
    errors.push("provider_object_construction_attempt must be an object");
  } else {
    const attempt = report.provider_object_construction_attempt;
    if (attempt.schema !== CONSTRUCTION_ATTEMPT_SCHEMA) {
      errors.push(`provider_object_construction_attempt schema must be ${CONSTRUCTION_ATTEMPT_SCHEMA}`);
    }
    if (attempt.claim_level !== "priority-only construction attempt, not provider acceptance") {
      errors.push("provider_object_construction_attempt claim_level must remain priority-only");
    }
    if (![
      "same_domain_branch_provider_object_construction_blocked",
      "same_domain_branch_provider_object_fields_populated_review_required",
    ].includes(attempt.status)) {
      errors.push("provider_object_construction_attempt status is invalid");
    }
    if (attempt.authorization?.provider_ready_authorized_by_this_attempt !== false) {
      errors.push("provider_object_construction_attempt must not authorize provider readiness");
    }
    if (attempt.authorization?.downstream_consumer_authorization !== false) {
      errors.push("provider_object_construction_attempt must not authorize downstream consumers");
    }
    if (!Array.isArray(attempt.consumer_construction_attempt_readouts)) {
      errors.push("provider_object_construction_attempt consumer readouts must be an array");
    } else {
      for (const readout of attempt.consumer_construction_attempt_readouts) {
        if (readout?.provider_ready_authorized_by_this_attempt !== false) {
          errors.push("consumer construction-attempt readouts must not authorize provider readiness");
          break;
        }
        if (readout?.downstream_consumer_authorization !== false) {
          errors.push("consumer construction-attempt readouts must not authorize downstream consumers");
          break;
        }
        const readoutErrors = sourceContractReadoutValidationErrors(
          readout?.source_contract_readout,
          "consumer construction-attempt source-contract readout"
        );
        if (readoutErrors.length > 0) {
          errors.push(...readoutErrors);
          break;
        }
      }
    }
    if (Array.isArray(attempt.candidate_attempts)) {
      for (const candidateAttempt of attempt.candidate_attempts) {
        const readoutErrors = sourceContractReadoutValidationErrors(
          candidateAttempt?.source_contract_readout,
          "construction-attempt candidate source-contract readout"
        );
        if (readoutErrors.length > 0) {
          errors.push(...readoutErrors);
          break;
        }
      }
    }
  }
  for (const key of [
    "candidate_h_recovery",
    "pressure_coefficient",
    "structural_integrity_residual_vector",
    "retained_branch_claim",
  ]) {
    if (report.authorization?.[key] !== false) {
      errors.push(`${key} must remain false`);
    }
  }
  if (isObject(report.summary)) {
    const readyCount = report.consumer_results?.filter?.((consumer) => consumer.provider_ready === true).length;
    if (Number.isFinite(readyCount) && report.summary.provider_ready_consumer_count !== readyCount) {
      errors.push("summary provider_ready_consumer_count must match consumer_results");
    }
  }
  return errors;
}

function validateReport(filePath) {
  const report = readJson(filePath);
  const errors = validationErrors(report);
  return {
    valid: errors.length === 0,
    errors,
    schema: report.schema ?? null,
    provider_verdict: report.provider_verdict ?? null,
    first_failure: report.first_failure ?? null,
  };
}

function emitJson(value, args) {
  const json = JSON.stringify(value, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.printContract) {
    emitJson(contract(), args);
    return;
  }
  if (args.validate) {
    emitJson(validateReport(args.validate), args);
    return;
  }
  if (!args.input) {
    throw new Error("--input is required unless --validate or --print-contract is used.");
  }
  const manifest = readJson(args.input);
  if (manifest.schema && manifest.schema !== MANIFEST_SCHEMA) {
    throw new Error(`manifest schema must be ${MANIFEST_SCHEMA}`);
  }
  const report = buildReport(manifest, { sourceRef: args.input });
  const errors = validationErrors(report);
  if (errors.length > 0) {
    report.validation_errors = errors;
  }
  emitJson(report, args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { ACCEPTED_SOURCE_STATUS, COMMON_REQUIRED_FIELDS, CONSUMERS, contract, validateReport };

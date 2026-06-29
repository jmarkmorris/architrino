#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction,
  validateOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction,
} from "./octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.mjs";
import {
  buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication,
  validateOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication,
} from "./octahedral-fold-aware-cross-binary-source-atlas-interval-implication.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_INTERVAL_CLOSURE_REDUCTION_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-finite-interval-closure-reduction/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_finite_interval_closure_reduction";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_TOPOLOGY_SAMPLES_PER_CELL = 48;
const DEFAULT_DERIVATIVE_SAMPLES_PER_CELL = 8;
const DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT = 64;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT = 384;
const DEFAULT_TARGET_MARGIN_FACTOR = 0.5;
const DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT = 4;
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function unique(values) {
  return [...new Set(values)];
}

function minimumNumber(...values) {
  return formatSmallNumber(Math.min(...values.map(Number)));
}

function buildPointSignRowsFromImplication(intervalImplication) {
  return unique(
    intervalImplication.regular_subcell_implication_rows.flatMap(
      (row) => row.required_point_rows
    )
  ).map((targetId) => ({
    target_id: targetId,
    source: "source-atlas-interval-implication",
    status: "finite-point-sign-row-imported",
  }));
}

function canonicalBridgeEndpointTarget(row) {
  const witnessId = row.witness_row_id;
  if (witnessId === "I2.d1") {
    return "I2.d1.forcing";
  }
  if (witnessId === "I2.f1.left") {
    return "I2.f1.left.forcing";
  }
  if (witnessId === "I2.f1.right") {
    return "I2.f1.right.forcing";
  }
  return `${witnessId}.forcing`;
}

function buildBridgeEndpointSeparationRows({ pointRows, bridgeReduction }) {
  const existingPointIds = new Set(pointRows.map((row) => row.target_id));
  return bridgeReduction.bridge_endpoint_enclosure_target_rows.map((row) => {
    const canonicalTargetId = canonicalBridgeEndpointTarget(row);
    const overlapsPointSignLabel = existingPointIds.has(canonicalTargetId);
    return {
      bridge_target_id: row.target_id,
      canonical_target_id: canonicalTargetId,
      bridge_predicate_id: row.bridge_predicate_id,
      witness_row_id: row.witness_row_id,
      expected_sign: row.expected_sign,
      sampled_sign_margin: row.sampled_sign_margin,
      target_enclosure_radius: row.target_enclosure_radius,
      overlaps_existing_point_sign_label: overlapsPointSignLabel,
      counted_as_separate_bridge_endpoint_row: true,
      status: "bridge-endpoint-row-kept-separate-until-interval-object-equivalence",
    };
  });
}

function buildBridgeDerivativeDedupRows({ regularRows, bridgeReduction }) {
  const existingRegularIds = new Set(
    regularRows.flatMap((row) => row.existing_target_rows)
  );
  return bridgeReduction.bridge_derivative_target_rows.map((row) => ({
    bridge_target_id: row.target_id,
    canonical_target_id: row.source_target_id,
    expected_sign: row.expected_sign,
    target_enclosure_radius: row.target_enclosure_radius,
    duplicate_of_existing_regular_subcell_sign: existingRegularIds.has(
      row.source_target_id
    ),
    status: existingRegularIds.has(row.source_target_id)
      ? "bridge-derivative-row-reuses-existing-regular-subcell-sign"
      : "bridge-derivative-row-adds-finite-regular-subcell-sign",
  }));
}

function buildFiniteRowCensus({
  intervalImplication,
  pointRows,
  bridgeEndpointRows,
  bridgeDerivativeRows,
  bridgeReduction,
}) {
  const summary = intervalImplication.existing_predicate_summary;
  const bridgeEndpointLabelOverlapCount = bridgeEndpointRows.filter(
    (row) => row.overlaps_existing_point_sign_label
  ).length;
  const bridgeDerivativeOverlapCount = bridgeDerivativeRows.filter(
    (row) => row.duplicate_of_existing_regular_subcell_sign
  ).length;
  const finiteIntervalRowFamilyCount =
    summary.point_sign_predicate_count +
    bridgeEndpointRows.length +
    summary.zero_isolation_predicate_count +
    summary.regular_subcell_predicate_count +
    summary.fold_collar_target_count +
    summary.theta_order_predicate_count +
    summary.value_budget_predicate_count;
  const baseRadius = Number(summary.first_outward_rounded_radius_target);
  const bridgeRadius = Number(
    bridgeReduction.interval_bridge_reduction_summary
      .weakest_inherited_target_radius_budget
  );
  return {
    source_point_sign_target_count: summary.point_sign_predicate_count,
    bridge_endpoint_target_count: bridgeEndpointRows.length,
    bridge_endpoint_label_overlap_count: bridgeEndpointLabelOverlapCount,
    bridge_endpoint_rows_counted_separately: bridgeEndpointRows.length,
    bridge_derivative_target_count: bridgeDerivativeRows.length,
    bridge_derivative_overlap_count: bridgeDerivativeOverlapCount,
    zero_isolation_target_count: summary.zero_isolation_predicate_count,
    regular_subcell_sign_target_count: summary.regular_subcell_predicate_count,
    fold_collar_target_count: summary.fold_collar_target_count,
    theta_order_target_count: summary.theta_order_predicate_count,
    value_budget_target_count: summary.value_budget_predicate_count,
    finite_interval_row_family_count: finiteIntervalRowFamilyCount,
    source_atlas_bottleneck_row_id: summary.current_bottleneck_predicate,
    source_atlas_first_outward_radius: summary.first_outward_rounded_radius_target,
    weakest_bridge_predicate_id:
      bridgeReduction.interval_bridge_reduction_summary
        .weakest_bridge_predicate_id,
    weakest_bridge_radius:
      bridgeReduction.interval_bridge_reduction_summary
        .weakest_inherited_target_radius_budget,
    global_finite_row_radius_bottleneck: minimumNumber(baseRadius, bridgeRadius),
    global_finite_row_radius_bottleneck_source:
      baseRadius <= bridgeRadius
        ? summary.current_bottleneck_predicate
        : bridgeReduction.interval_bridge_reduction_summary
            .weakest_bridge_predicate_id,
    status: "finite-interval-row-census-composed",
  };
}

function buildFiniteClosureReductionTheorem() {
  return {
    theorem_id: "finite-source-atlas-interval-closure-reduction",
    theorem_scope: "representative receiver 1+ cross-binary quarter profile",
    statement:
      "On one shared source atlas, the finite row set consisting of point signs, bridge endpoint signs, zero-isolation rows, regular-subcell sign rows, fold-collar G,D rows, theta-order rows, and the candidate-value budget implies the source-atlas interval critical-exhaustion theorem and the six-candidate value-order conclusion.",
    proof_steps: [
      "Import the source-atlas interval implication theorem, which reduces critical exhaustion to regular-subcell signs, fold-collar G,D signs, bridge predicates, theta order, and candidate-value quadrature.",
      "Import the interval bridge-predicate reduction theorem, which replaces the three primitive bridge predicates by five endpoint forcing rows and two I2 derivative-sign rows.",
      "Identify the two I2 derivative bridge rows with existing regular-subcell derivative targets.",
      "Keep all five bridge endpoint rows as separate bridge obligations unless a future interval certificate proves they are the same interval objects as similarly named point-sign rows.",
      "Substitute the composed bridge rows into the source-atlas implication theorem.",
      "Conclude that actual outward-rounded enclosures for the finite row census would certify critical exhaustion and candidate ordering, while this packet itself remains a reduction theorem rather than an enclosure certificate.",
    ],
    proof_status: "conditional-finite-interval-closure-reduction-stated",
  };
}

function buildPromotionDecision() {
  return {
    promotion_status: "priority-only",
    classification: "defer with blocker",
    blocker:
      "The finite closure theorem is mathematically reader-facing, but it should not be promoted until the finite row families have actual outward-rounded interval enclosures or a retained branch certificate consumes them.",
    intended_corpus_destination:
      "content/markdown/aaa/noether-braid/nested-shell-braid-dynamics.md",
  };
}

export function buildOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const scanSamplesPerCell = Number.parseInt(
    options.scanSamplesPerCell ?? DEFAULT_SCAN_SAMPLES_PER_CELL,
    10
  );
  const topologySamplesPerCell = Number.parseInt(
    options.topologySamplesPerCell ?? DEFAULT_TOPOLOGY_SAMPLES_PER_CELL,
    10
  );
  const derivativeSamplesPerCell = Number.parseInt(
    options.derivativeSamplesPerCell ?? DEFAULT_DERIVATIVE_SAMPLES_PER_CELL,
    10
  );
  const sourceAtlasSampleCount = Number.parseInt(
    options.sourceAtlasSampleCount ?? DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    10
  );
  const sourceQuadraturePanelsPerSegment = Number.parseInt(
    options.sourceQuadraturePanelsPerSegment ??
      DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const valueQuadraturePanelsPerSegment = Number.parseInt(
    options.valueQuadraturePanelsPerSegment ??
      DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const targetMarginFactor = Number(
    options.targetMarginFactor ?? DEFAULT_TARGET_MARGIN_FACTOR
  );
  const derivativeTailSampleCount = Number.parseInt(
    options.derivativeTailSampleCount ?? DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(scanSamplesPerCell) || scanSamplesPerCell < 16) {
    throw new Error("scanSamplesPerCell must be an integer >= 16");
  }
  if (!Number.isInteger(topologySamplesPerCell) || topologySamplesPerCell < 16) {
    throw new Error("topologySamplesPerCell must be an integer >= 16");
  }
  if (
    !Number.isInteger(derivativeSamplesPerCell) ||
    derivativeSamplesPerCell < 4
  ) {
    throw new Error("derivativeSamplesPerCell must be an integer >= 4");
  }
  if (!Number.isInteger(sourceAtlasSampleCount) || sourceAtlasSampleCount < 16) {
    throw new Error("sourceAtlasSampleCount must be an integer >= 16");
  }
  if (
    !Number.isInteger(sourceQuadraturePanelsPerSegment) ||
    sourceQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("sourceQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (
    !Number.isInteger(valueQuadraturePanelsPerSegment) ||
    valueQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("valueQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (
    !Number.isFinite(targetMarginFactor) ||
    targetMarginFactor <= 0 ||
    targetMarginFactor > 1
  ) {
    throw new Error("targetMarginFactor must satisfy 0 < targetMarginFactor <= 1");
  }
  if (
    !Number.isInteger(derivativeTailSampleCount) ||
    derivativeTailSampleCount < 1
  ) {
    throw new Error("derivativeTailSampleCount must be an integer >= 1");
  }

  const intervalImplication =
    buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceAtlasSampleCount,
      sourceQuadraturePanelsPerSegment,
      valueQuadraturePanelsPerSegment,
      targetMarginFactor,
      derivativeTailSampleCount,
    });
  const implicationErrors =
    validateOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication(
      intervalImplication
    );
  const bridgeReduction =
    buildOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceAtlasSampleCount,
      sourceQuadraturePanelsPerSegment,
      valueQuadraturePanelsPerSegment,
      targetMarginFactor,
      derivativeTailSampleCount,
    });
  const bridgeReductionErrors =
    validateOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction(
      bridgeReduction
    );
  const pointRows = buildPointSignRowsFromImplication(intervalImplication);
  const bridgeEndpointRows = buildBridgeEndpointSeparationRows({
    pointRows,
    bridgeReduction,
  });
  const bridgeDerivativeRows = buildBridgeDerivativeDedupRows({
    regularRows: intervalImplication.regular_subcell_implication_rows,
    bridgeReduction,
  });
  const finiteRowCensus = buildFiniteRowCensus({
    intervalImplication,
    pointRows,
    bridgeEndpointRows,
    bridgeDerivativeRows,
    bridgeReduction,
  });
  const stated =
    implicationErrors.length === 0 &&
    bridgeReductionErrors.length === 0 &&
    finiteRowCensus.finite_interval_row_family_count === 33 &&
    finiteRowCensus.global_finite_row_radius_bottleneck_source ===
      "I1.forcing-bracket";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_INTERVAL_CLOSURE_REDUCTION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-source-atlas-interval-implication.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.md",
    source_interval_implication_check: {
      schema: intervalImplication.schema,
      valid: implicationErrors.length === 0,
      errors: implicationErrors,
      theory_status: intervalImplication.result.theory_status,
      retained_branch: intervalImplication.result.retained_branch,
      certifies_conditional_interval_implication_theorem:
        intervalImplication.artifact_claim
          .certifies_conditional_interval_implication_theorem === true,
      certifies_interval_critical_exhaustion:
        intervalImplication.artifact_claim.certifies_interval_critical_exhaustion ===
        true,
    },
    source_interval_bridge_reduction_check: {
      schema: bridgeReduction.schema,
      valid: bridgeReductionErrors.length === 0,
      errors: bridgeReductionErrors,
      theory_status: bridgeReduction.result.theory_status,
      retained_branch: bridgeReduction.result.retained_branch,
      certifies_interval_bridge_predicate_reduction_theorem:
        bridgeReduction.artifact_claim
          .certifies_interval_bridge_predicate_reduction_theorem === true,
      certifies_interval_bridge_predicates:
        bridgeReduction.artifact_claim.certifies_interval_bridge_predicates ===
        true,
    },
    finite_interval_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_estimate:
        intervalImplication.interval_implication_parameters.speed_ratio_estimate,
      speed_ratio_enclosure:
        intervalImplication.interval_implication_parameters.speed_ratio_enclosure,
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      topology_samples_per_cell: topologySamplesPerCell,
      derivative_samples_per_cell: derivativeSamplesPerCell,
      source_atlas_sample_count: sourceAtlasSampleCount,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      value_quadrature_panels_per_segment: valueQuadraturePanelsPerSegment,
      target_margin_factor: formatSmallNumber(targetMarginFactor),
      derivative_tail_sample_count: derivativeTailSampleCount,
    },
    finite_interval_closure_reduction_theorem:
      buildFiniteClosureReductionTheorem(),
    imported_point_sign_rows: pointRows,
    bridge_endpoint_separation_rows: bridgeEndpointRows,
    bridge_derivative_deduplication_rows: bridgeDerivativeRows,
    finite_interval_row_census: finiteRowCensus,
    finite_candidate_set: ["0", "u1", "theta_3-", "u2", "theta_2+", "Q"],
    finite_closure_boundary: {
      eliminates_bridge_predicates_as_primitive_assumptions: stated,
      certifies_finite_interval_closure_reduction_theorem: stated,
      certifies_interval_bridge_predicates: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      open_quantities: [
        "actual outward-rounded enclosures for the thirty-three finite row families",
        "shared source-atlas interval arithmetic for regular-subcell rows",
        "square-coordinate interval arithmetic for fold-collar G,D rows",
        "candidate-value interval quadrature below the full-order budget",
      ],
      status:
        "finite-interval-closure-reduction-stated-actual-enclosures-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_finite_interval_closure_reduction_theorem: stated,
      eliminates_bridge_predicates_as_primitive_assumptions: stated,
      emits_finite_interval_row_census: stated,
      identifies_global_finite_row_bottleneck: stated,
      certifies_interval_bridge_predicates: false,
      certifies_interval_sign_topology: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "finite interval closure reduction theorem with finite row census; actual interval enclosures and retained branch status remain open",
    },
    promotion_decision: buildPromotionDecision(),
    result: {
      theory_status: stated
        ? "source-atlas-aware-finite-interval-closure-reduction-stated"
        : "source-atlas-aware-finite-interval-closure-reduction-open",
      first_successor_row:
        "source-atlas-aware-outward-rounded-finite-row-enclosures-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The source-atlas closure proof is now reduced to thirty-three finite row families. The bridge predicates are no longer primitive assumptions, and the global finite-row radius bottleneck remains I1.forcing-bracket.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_INTERVAL_CLOSURE_REDUCTION_SCHEMA,
    "schema must match finite interval closure reduction schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match finite interval closure reduction packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_interval_implication_check?.valid === true &&
      artifact?.source_interval_implication_check
        ?.certifies_conditional_interval_implication_theorem === true &&
      artifact?.source_interval_implication_check
        ?.certifies_interval_critical_exhaustion === false,
    "source interval implication must validate without interval critical exhaustion",
    errors
  );
  assertField(
    artifact?.source_interval_bridge_reduction_check?.valid === true &&
      artifact?.source_interval_bridge_reduction_check
        ?.certifies_interval_bridge_predicate_reduction_theorem === true &&
      artifact?.source_interval_bridge_reduction_check
        ?.certifies_interval_bridge_predicates === false,
    "source bridge reduction must validate without interval bridge predicate claims",
    errors
  );
  assertField(
    artifact?.finite_interval_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "finite interval closure reduction must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.finite_interval_parameters?.speed_band === undefined &&
      artifact?.finite_interval_parameters?.speed_window === undefined &&
      artifact?.finite_interval_parameters?.speed_min === undefined &&
      artifact?.finite_interval_parameters?.speed_max === undefined,
    "finite interval parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.finite_interval_closure_reduction_theorem?.proof_status ===
      "conditional-finite-interval-closure-reduction-stated" &&
      artifact?.finite_interval_closure_reduction_theorem?.proof_steps?.length ===
        6,
    "finite interval closure reduction theorem must state the six proof steps",
    errors
  );
  assertField(
    Array.isArray(artifact?.imported_point_sign_rows) &&
      artifact.imported_point_sign_rows.length === 13,
    "artifact must import thirteen existing point sign rows",
    errors
  );
  assertField(
    Array.isArray(artifact?.bridge_endpoint_separation_rows) &&
      artifact.bridge_endpoint_separation_rows.length === 5 &&
      artifact.bridge_endpoint_separation_rows.every(
        (row) => row.counted_as_separate_bridge_endpoint_row === true
      ) &&
      artifact.bridge_endpoint_separation_rows.filter(
        (row) => row.overlaps_existing_point_sign_label
      ).length === 3,
    "artifact must keep five bridge endpoint rows separate while identifying three label overlaps",
    errors
  );
  assertField(
    Array.isArray(artifact?.bridge_derivative_deduplication_rows) &&
      artifact.bridge_derivative_deduplication_rows.length === 2 &&
      artifact.bridge_derivative_deduplication_rows.every(
        (row) => row.duplicate_of_existing_regular_subcell_sign
      ),
    "artifact must identify both bridge derivative rows as existing regular-subcell rows",
    errors
  );
  assertField(
    artifact?.finite_interval_row_census?.source_point_sign_target_count === 13 &&
      artifact?.finite_interval_row_census
        ?.bridge_endpoint_rows_counted_separately === 5 &&
      artifact?.finite_interval_row_census?.finite_interval_row_family_count ===
        33 &&
      artifact?.finite_interval_row_census
        ?.global_finite_row_radius_bottleneck_source ===
        "I1.forcing-bracket",
    "finite row census must reduce to thirty-three row families with I1 forcing-bracket bottleneck",
    errors
  );
  assertField(
    artifact?.finite_candidate_set?.join("|") ===
      "0|u1|theta_3-|u2|theta_2+|Q",
    "finite candidate set must match the source-atlas implication theorem",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_finite_interval_closure_reduction_theorem === true &&
      artifact?.artifact_claim
        ?.eliminates_bridge_predicates_as_primitive_assumptions === true &&
      artifact?.artifact_claim?.emits_finite_interval_row_census ===
        true &&
      artifact?.artifact_claim?.certifies_interval_bridge_predicates === false &&
      artifact?.artifact_claim?.certifies_interval_sign_topology === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must state only the finite reduction theorem and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-finite-interval-closure-reduction-stated" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must be finite closure reduction stated and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.mjs [options]",
    "",
    "Options:",
    "  --topology-samples-per-cell <n>    Regular-cell forcing topology samples per cell (default: 48)",
    "  --derivative-samples-per-cell <n>  Source derivative atlas samples per cell (default: 8)",
    "  --derivative-tail-samples <n>      Fold-collar derivative tail samples (default: 4)",
    "  --scan-subdivisions <n>            Primitive critical scan samples per cell (default: 96)",
    "  --source-atlas-samples <n>         Source fold atlas samples (default: 64)",
    "  --source-quadrature-panels <n>     Source critical-value quadrature panels per segment (default: 96)",
    "  --value-quadrature-panels <n>      Candidate-value quadrature panels per segment (default: 384)",
    "  --target-margin-factor <x>         Target radius factor applied to sampled budgets (default: 0.5)",
    "  --subdivisions <n>                 Root search subdivisions (default: 5000)",
    "  --out <path>                       Write artifact JSON to path instead of stdout",
    "  --validate <path>                  Validate an existing artifact JSON file",
    "  --schema                           Print the artifact schema identifier",
    "  --pretty                           Pretty-print JSON output",
    "  --help                             Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    topologySamplesPerCell: DEFAULT_TOPOLOGY_SAMPLES_PER_CELL,
    derivativeSamplesPerCell: DEFAULT_DERIVATIVE_SAMPLES_PER_CELL,
    derivativeTailSampleCount: DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT,
    scanSamplesPerCell: DEFAULT_SCAN_SAMPLES_PER_CELL,
    sourceAtlasSampleCount: DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    sourceQuadraturePanelsPerSegment: DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    valueQuadraturePanelsPerSegment: DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT,
    targetMarginFactor: DEFAULT_TARGET_MARGIN_FACTOR,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[(index += 1)];
    } else if (arg === "--validate") {
      args.validate = argv[(index += 1)];
    } else if (arg === "--topology-samples-per-cell") {
      args.topologySamplesPerCell = argv[(index += 1)];
    } else if (arg === "--derivative-samples-per-cell") {
      args.derivativeSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--derivative-tail-samples") {
      args.derivativeTailSampleCount = argv[(index += 1)];
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--source-atlas-samples") {
      args.sourceAtlasSampleCount = argv[(index += 1)];
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--value-quadrature-panels") {
      args.valueQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--target-margin-factor") {
      args.targetMarginFactor = argv[(index += 1)];
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = argv[(index += 1)];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  if (args.schema) {
    console.log(
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_INTERVAL_CLOSURE_REDUCTION_SCHEMA
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction(
        artifact
      );
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      process.exitCode = 1;
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction(args);
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

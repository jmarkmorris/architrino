#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate,
  validateOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate,
} from "./octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction,
  validateOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction,
} from "./octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas,
} from "./octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_INTERVAL_IMPLICATION_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-source-atlas-interval-implication/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_source_atlas_interval_implication";
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
  "none; uses the certified positive speed-ratio zero enclosure only";

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function targetRowsById(rows) {
  return Object.fromEntries(rows.map((row) => [row.target_id, row]));
}

function buildExistingPredicateSummary(targetAtlas) {
  return {
    point_sign_predicate_count:
      targetAtlas.point_sign_enclosure_target_rows.length,
    zero_isolation_predicate_count: targetAtlas.zero_isolation_target_rows.length,
    regular_subcell_predicate_count:
      targetAtlas.regular_subcell_sign_target_rows.length,
    fold_collar_target_count:
      targetAtlas.fold_collar_sign_transport_target_rows.length,
    theta_order_predicate_count: targetAtlas.theta_order_target_rows.length,
    value_budget_predicate_count: targetAtlas.value_budget_import_rows.length,
    current_bottleneck_predicate:
      targetAtlas.target_budget_summary.global_sampled_closure_bottleneck_row_id,
    current_bottleneck_margin:
      targetAtlas.target_budget_summary.global_sampled_closure_bottleneck,
    first_outward_rounded_radius_target:
      targetAtlas.target_budget_summary.first_outward_rounded_radius_target,
  };
}

function buildSourceAtlasFormulaScope(sourceReduction) {
  return {
    formula_status:
      sourceReduction.source_atlas_aware_formula_reduction.status,
    quarter_forcing_formula:
      sourceReduction.source_atlas_aware_formula_reduction
        .quarter_forcing_formula,
    root_equation:
      sourceReduction.source_atlas_aware_formula_reduction.root_equation,
    jacobian_identity:
      sourceReduction.source_atlas_aware_formula_reduction.jacobian_identity,
    interval_targets:
      sourceReduction.source_atlas_aware_formula_reduction.interval_targets,
    unified_quarter_cells:
      sourceReduction.quarter_cell_partition.unified_quarter_cells.map((cell) => ({
        cell_id: cell.cell_id,
        theta_interval: cell.theta_interval,
        root_count_total: cell.root_count_total,
        cell_status: cell.cell_status,
      })),
    fold_ordering: sourceReduction.quarter_cell_partition.fold_ordering,
  };
}

function buildRegularSubcellImplicationRows(targetAtlas) {
  const rows = targetRowsById(targetAtlas.regular_subcell_sign_target_rows);
  return [
    {
      implication_id: "I1.unique-forcing-zero",
      existing_target_rows: ["I1.derivative-negative.full-cell"],
      required_point_rows: [
        "I1.f1.left.forcing",
        "I1.f1.right.forcing",
        "I1.f1.derivative",
      ],
      theorem_step:
        "If f'_cross<0 on the I1 regular subcell and f_cross has a signed positive-to-negative bracket, then I1 contains exactly one regular zero of f_cross and hence one regular primitive-critical point.",
      sampled_margin: rows["I1.derivative-negative.full-cell"]?.sampled_margin,
      status: "conditional-regular-subcell-implication-stated",
    },
    {
      implication_id: "I2.unique-forcing-zero-after-positive-bridge",
      existing_target_rows: [
        "I2.derivative-positive.before-turn",
        "I2.derivative-negative.after-turn",
      ],
      required_point_rows: [
        "I2.d1.left.derivative",
        "I2.d1.right.derivative",
        "I2.d1.forcing",
        "I2.f1.left.forcing",
        "I2.f1.right.forcing",
        "I2.f1.derivative",
      ],
      theorem_step:
        "If the I2 entry side and turn bridge keep f_cross positive until the decreasing post-turn segment, and the later forcing bracket is signed positive-to-negative with f'_cross<0 after the turn, then I2 contains exactly one regular zero of f_cross.",
      sampled_margin: rows["I2.derivative-negative.after-turn"]?.sampled_margin,
      status: "conditional-regular-subcell-implication-stated",
    },
    {
      implication_id: "I3.hidden-zero-exclusion",
      existing_target_rows: [
        "I3.derivative-positive.full-cell",
        "I3.forcing-negative.full-cell",
      ],
      required_point_rows: [
        "I3.left-scan.forcing",
        "I3.right-scan.forcing",
        "I3.left-scan.derivative",
        "I3.right-scan.derivative",
      ],
      theorem_step:
        "If f_cross<0 on I3 while f'_cross>0 on the regular subcell, then I3 contributes no regular primitive-critical point.",
      sampled_margin: rows["I3.forcing-negative.full-cell"]?.sampled_margin,
      status: "conditional-regular-subcell-implication-stated",
    },
  ];
}

function buildFoldCollarImplicationRows(certificate) {
  return certificate.singular_collar_rows.map((row) => ({
    implication_id: `${row.fold_candidate_id}.${row.side}-G-D-sign-transport`,
    certificate_id: row.certificate_id,
    theta_fold: row.theta_fold,
    theta_substitution: row.theta_substitution,
    G_definition: "G(y)=2y f_cross(theta_f+tau*y^2)",
    D_definition: "D(y)=tau*(y*G_y-G)",
    forcing_identity: "f_cross=G/(2y)",
    derivative_identity: "f'_theta=D/(4y^3)",
    G_expected_sign: row.square_limit_sign,
    D_expected_sign: row.transport_derivative_numerator_sign_for_small_y,
    transported_forcing_sign: row.forcing_sign_for_small_y,
    transported_derivative_sign: row.derivative_sign_for_small_y,
    sampled_G_margin: row.minimum_sample_square_weighted_sign_margin,
    sampled_D_tail_status: row.derivative_tail_sign_status,
    status: "conditional-fold-collar-implication-stated",
  }));
}

function buildBridgePredicateRows() {
  return [
    {
      bridge_predicate_id: "theta_3plus.regular-entry-positive",
      location: "regular side immediately after theta_3-",
      needed_sign: "f_cross>0",
      why_needed:
        "I2 uniqueness needs positivity at the left entry side before the turn bridge; a point crest value alone does not exclude an early hidden zero.",
      acceptable_interval_proofs: [
        "direct regular-side forcing enclosure on a short compact interval after theta_3-",
        "source-atlas root-count enclosure plus positive lower bound for f_cross at the I2 entry face",
      ],
      status: "bridge-predicate-open",
    },
    {
      bridge_predicate_id: "I2.turn-bridge-forcing-positive",
      location: "I2 derivative-turn bracket and adjacent bridge to I2.f1.left",
      needed_sign: "f_cross>0",
      why_needed:
        "The derivative-turn bracket gives the change from increasing to decreasing, but critical exhaustion needs f_cross to stay positive until the unique later forcing bracket.",
      acceptable_interval_proofs: [
        "forcing lower-bound enclosure over the turn bridge",
        "monotonic transport from the positive entry side to the signed I2.f1.left witness",
      ],
      status: "bridge-predicate-open",
    },
    {
      bridge_predicate_id: "theta_2minus.regular-exit-negative",
      location: "regular side immediately before theta_2+",
      needed_sign: "f_cross<0",
      why_needed:
        "I2 exit and I3 entry must agree with the negative side before the right fold collar; this prevents a hidden zero between the I2 forcing bracket and the fold endpoint.",
      acceptable_interval_proofs: [
        "direct regular-side forcing enclosure on a short compact interval before theta_2+",
        "post-turn derivative-negative enclosure transporting the signed I2.f1.right witness to the fold entry face",
      ],
      status: "bridge-predicate-open",
    },
  ];
}

function buildIntervalImplicationTheorem() {
  return {
    theorem_id: "source-atlas-interval-critical-exhaustion-implication",
    theorem_scope: "representative receiver 1+ cross-binary quarter profile",
    statement:
      "On one shared source atlas, the regular-subcell sign predicates, the fold-collar G,D sign predicates, the bridge positivity/negativity predicates, theta-order enclosures, and candidate-value quadrature enclosures imply interval critical exhaustion and the finite candidate set {0,u1,theta_3-,u2,theta_2+,Q}.",
    proof_steps: [
      "Use A'_cross=f_cross and A''_cross=f'_cross on compact regular subcells.",
      "Use I1 monotonicity and the signed I1 forcing bracket to prove one regular critical point in I1.",
      "Use I2 entry positivity, turn-bridge positivity, post-turn monotonicity, and the signed I2 forcing bracket to prove one regular critical point in I2.",
      "Use I3 negative forcing to exclude regular critical points in I3.",
      "Use fold-collar G,D sign transport to replace singular theta-derivative assumptions at theta_3- and theta_2+.",
      "Add the quarter endpoints and the two fold endpoint limits as boundary candidates.",
      "Apply candidate-value quadrature enclosures below the imported value budget to certify C_cross, m_Q, and M_Q ordering.",
    ],
    proof_status: "conditional-interval-implication-theorem-stated",
  };
}

function buildPromotionDecision() {
  return {
    promotion_status: "priority-only",
    classification: "defer with blocker",
    blocker:
      "The implication theorem is reader-facing mathematics, but the bridge predicates and outward-rounded interval enclosures are not yet certified.",
    intended_corpus_destination:
      "content/markdown/aaa/noether-braid/nested-shell-braid-dynamics.md",
  };
}

export function buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication(
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

  const targetAtlas =
    buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceAtlasSampleCount,
      sourceQuadraturePanelsPerSegment,
      valueQuadraturePanelsPerSegment,
      targetMarginFactor,
    });
  const targetErrors =
    validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas(
      targetAtlas
    );
  const sourceReduction =
    buildOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction({
      rootSubdivisions,
    });
  const sourceReductionErrors =
    validateOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction(
      sourceReduction
    );
  const foldCollarCertificate =
    buildOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate({
      rootSubdivisions,
      scanSamplesPerCell,
      sourceAtlasSampleCount,
      sourceQuadraturePanelsPerSegment,
      derivativeTailSampleCount,
    });
  const foldCollarErrors =
    validateOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate(
      foldCollarCertificate
    );
  const predecessorValid =
    targetErrors.length === 0 &&
    sourceReductionErrors.length === 0 &&
    foldCollarErrors.length === 0;
  const bridgePredicateRows = buildBridgePredicateRows();

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_INTERVAL_IMPLICATION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-source-atlas-interval-implication.md",
    source_atlas_quarter_cell_reduction_check: {
      schema: sourceReduction.schema,
      valid: sourceReductionErrors.length === 0,
      errors: sourceReductionErrors,
      theory_status: sourceReduction.result.theory_status,
      retained_branch: sourceReduction.result.retained_branch,
      certifies_source_atlas_aware_quarter_profile_formula_reduction:
        sourceReduction.artifact_claim
          .certifies_source_atlas_aware_quarter_profile_formula_reduction ===
        true,
      certifies_C_m_Q_M_Q_interval_enclosure:
        sourceReduction.artifact_claim
          .certifies_C_m_Q_M_Q_interval_enclosure === true,
    },
    source_interval_target_atlas_check: {
      schema: targetAtlas.schema,
      valid: targetErrors.length === 0,
      errors: targetErrors,
      theory_status: targetAtlas.result.theory_status,
      retained_branch: targetAtlas.result.retained_branch,
      certifies_interval_sign_topology:
        targetAtlas.artifact_claim.certifies_interval_sign_topology === true,
    },
    source_fold_collar_certificate_check: {
      schema: foldCollarCertificate.schema,
      valid: foldCollarErrors.length === 0,
      errors: foldCollarErrors,
      theory_status: foldCollarCertificate.result.theory_status,
      retained_branch: foldCollarCertificate.result.retained_branch,
      certifies_sampled_G_and_D_signs:
        foldCollarCertificate.artifact_claim
          .certifies_sampled_singular_collar_transport_D_signs === true,
      certifies_interval_fold_collar_enclosure:
        foldCollarCertificate.artifact_claim
          .certifies_interval_fold_collar_enclosure === true,
    },
    interval_implication_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_estimate:
        targetAtlas.enclosure_target_parameters.speed_ratio_estimate,
      speed_ratio_enclosure:
        targetAtlas.enclosure_target_parameters.speed_ratio_enclosure,
      target_margin_factor: formatSmallNumber(targetMarginFactor),
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      topology_samples_per_cell: topologySamplesPerCell,
      derivative_samples_per_cell: derivativeSamplesPerCell,
      source_atlas_sample_count: sourceAtlasSampleCount,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      value_quadrature_panels_per_segment: valueQuadraturePanelsPerSegment,
    },
    source_atlas_formula_scope: buildSourceAtlasFormulaScope(sourceReduction),
    existing_predicate_summary: buildExistingPredicateSummary(targetAtlas),
    source_atlas_interval_implication_theorem:
      buildIntervalImplicationTheorem(),
    regular_subcell_implication_rows:
      buildRegularSubcellImplicationRows(targetAtlas),
    fold_collar_G_D_implication_rows:
      buildFoldCollarImplicationRows(foldCollarCertificate),
    bridge_predicate_rows: bridgePredicateRows,
    candidate_value_implication: {
      imported_budget_row: "value.full-order",
      imported_equal_radius_budget:
        targetAtlas.value_budget_import_rows[0]?.target_value_radius,
      implication:
        "After interval critical exhaustion reduces the quarter profile to the six candidate values, candidate-value intervals below the imported full-order budget preserve the sampled ordering and therefore certify C_cross, m_Q, and M_Q.",
      status: "conditional-candidate-value-implication-stated",
    },
    interval_profile_boundary: {
      certifies_conditional_interval_implication_theorem: predecessorValid,
      identifies_missing_bridge_predicates:
        bridgePredicateRows.length === 3 && predecessorValid,
      certifies_interval_fold_collar_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      open_quantities: [
        "three bridge predicate enclosures at the I2 entry, I2 turn bridge, and I2 exit",
        "outward-rounded regular-subcell sign enclosures on one shared source atlas",
        "outward-rounded fold-collar G,D enclosures on one shared source atlas",
        "candidate-value interval quadrature below the imported full-order budget",
      ],
      status: "source-atlas-interval-implication-stated-bridge-predicates-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_conditional_interval_implication_theorem: predecessorValid,
      identifies_missing_bridge_predicates:
        bridgePredicateRows.length === 3 && predecessorValid,
      certifies_interval_fold_collar_enclosure: false,
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
        "conditional interval implication theorem plus exact bridge-predicate gap; interval enclosures and retained branch status remain open",
    },
    promotion_decision: buildPromotionDecision(),
    result: {
      theory_status: predecessorValid
        ? "source-atlas-aware-interval-implication-theorem-stated"
        : "source-atlas-aware-interval-implication-open",
      first_successor_row:
        "source-atlas-aware-bridge-predicate-enclosures-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The interval closure path is now a conditional theorem with three explicit bridge predicates; this sharpens the next proof from broad intervalization to a finite source-atlas enclosure problem.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_INTERVAL_IMPLICATION_SCHEMA,
    "schema must match source atlas interval implication schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match source atlas interval implication packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_atlas_quarter_cell_reduction_check?.valid === true &&
      artifact?.source_atlas_quarter_cell_reduction_check
        ?.certifies_source_atlas_aware_quarter_profile_formula_reduction ===
        true &&
      artifact?.source_atlas_quarter_cell_reduction_check
        ?.certifies_C_m_Q_M_Q_interval_enclosure === false,
    "source atlas quarter-cell reduction must validate formula targets without C,m_Q,M_Q interval enclosure",
    errors
  );
  assertField(
    artifact?.source_interval_target_atlas_check?.valid === true &&
      artifact?.source_interval_target_atlas_check
        ?.certifies_interval_sign_topology === false,
    "source interval target atlas must validate without interval sign topology",
    errors
  );
  assertField(
    artifact?.source_fold_collar_certificate_check?.valid === true &&
      artifact?.source_fold_collar_certificate_check
        ?.certifies_sampled_G_and_D_signs === true &&
      artifact?.source_fold_collar_certificate_check
        ?.certifies_interval_fold_collar_enclosure === false,
    "source fold-collar certificate must validate sampled G,D signs without interval collar enclosure",
    errors
  );
  assertField(
    artifact?.interval_implication_parameters?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "source atlas interval implication must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.interval_implication_parameters?.speed_band === undefined &&
      artifact?.interval_implication_parameters?.speed_window === undefined &&
      artifact?.interval_implication_parameters?.speed_min === undefined &&
      artifact?.interval_implication_parameters?.speed_max === undefined,
    "interval implication parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.source_atlas_formula_scope?.formula_status ===
      "source-atlas-aware-quarter-profile-formula-reduction-certified" &&
      artifact?.source_atlas_formula_scope?.quarter_forcing_formula?.includes(
        "f_cross"
      ) &&
      artifact?.source_atlas_formula_scope?.unified_quarter_cells?.length === 3,
    "artifact must import the source-atlas-aware formula scope and three quarter cells",
    errors
  );
  assertField(
    artifact?.existing_predicate_summary?.point_sign_predicate_count === 13 &&
      artifact?.existing_predicate_summary?.regular_subcell_predicate_count ===
        5 &&
      artifact?.existing_predicate_summary?.fold_collar_target_count === 2,
    "existing predicate summary must preserve the current target row counts",
    errors
  );
  assertField(
    artifact?.source_atlas_interval_implication_theorem?.proof_status ===
      "conditional-interval-implication-theorem-stated" &&
      artifact?.source_atlas_interval_implication_theorem?.proof_steps?.length ===
        7,
    "artifact must state the conditional interval implication theorem",
    errors
  );
  assertField(
    Array.isArray(artifact?.regular_subcell_implication_rows) &&
      artifact.regular_subcell_implication_rows.length === 3,
    "artifact must emit three regular-subcell implication rows",
    errors
  );
  assertField(
    Array.isArray(artifact?.fold_collar_G_D_implication_rows) &&
      artifact.fold_collar_G_D_implication_rows.length === 2 &&
      artifact.fold_collar_G_D_implication_rows.every(
        (row) =>
          row.G_expected_sign === "-" &&
          ["-", "+"].includes(row.D_expected_sign)
      ),
    "artifact must emit the two fold-collar G,D implication rows",
    errors
  );
  assertField(
    Array.isArray(artifact?.bridge_predicate_rows) &&
      artifact.bridge_predicate_rows.map((row) => row.bridge_predicate_id).join("|") ===
        "theta_3plus.regular-entry-positive|I2.turn-bridge-forcing-positive|theta_2minus.regular-exit-negative",
    "artifact must identify the three bridge predicates needed for theorem-grade critical exhaustion",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_conditional_interval_implication_theorem === true &&
      artifact?.artifact_claim?.identifies_missing_bridge_predicates === true &&
      artifact?.artifact_claim?.certifies_interval_sign_topology === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must prove only the conditional implication and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.promotion_decision?.classification === "defer with blocker" &&
      artifact?.result?.theory_status ===
        "source-atlas-aware-interval-implication-theorem-stated" &&
      artifact?.result?.retention === "not_retained",
    "result must stage the implication theorem as priority-only and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-source-atlas-interval-implication.mjs [options]",
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_INTERVAL_IMPLICATION_SCHEMA
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication(
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
    buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication(args);
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

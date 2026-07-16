#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas,
  validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas,
} from "./octahedral-fold-aware-cross-binary-fold-square-limit-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas,
} from "./octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_INTERVAL_SIGN_ENCLOSURE_TARGET_ATLAS_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_forcing_interval_sign_enclosure_target_atlas";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_TOPOLOGY_SAMPLES_PER_CELL = 48;
const DEFAULT_DERIVATIVE_SAMPLES_PER_CELL = 8;
const DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT = 64;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT = 384;
const DEFAULT_TARGET_MARGIN_FACTOR = 0.5;
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function signLabel(value) {
  if (value > 0) {
    return "+";
  }
  if (value < 0) {
    return "-";
  }
  return "0";
}

function scaledBudget(value, targetMarginFactor) {
  return formatSmallNumber(Number(value) * targetMarginFactor);
}

function rowById(rows, field, id) {
  const row = rows.find((entry) => entry[field] === id);
  if (!row) {
    throw new Error(`missing row ${id}`);
  }
  return row;
}

function pointTargetRows(marginAtlas, targetMarginFactor) {
  return marginAtlas.signed_value_margin_rows.map((row) => ({
    target_id: row.predicate_id,
    witness_row_id: row.witness_row_id,
    quantity: row.quantity,
    expected_sign: row.expected_sign,
    sampled_value: row.value,
    sampled_sign_margin: row.sign_margin,
    target_enclosure_radius: scaledBudget(
      row.sign_margin,
      targetMarginFactor
    ),
    enclosure_rule:
      "an outward-rounded point enclosure with this radius preserves the sampled sign predicate",
    status: "point-sign-enclosure-target-staged",
  }));
}

function zeroIsolationTargetRows(marginAtlas, targetMarginFactor) {
  const pointRows = Object.fromEntries(
    marginAtlas.signed_value_margin_rows.map((row) => [row.predicate_id, row])
  );
  const thetaRows = Object.fromEntries(
    marginAtlas.theta_separation_rows.map((row) => [row.separation_id, row])
  );
  const coreRows = Object.fromEntries(
    marginAtlas.core_margin_rows.map((row) => [row.margin_row_id, row])
  );
  return [
    {
      target_id: "I1.f1",
      zero_type: "forcing-zero",
      bracket_sign_targets: ["I1.f1.left.forcing", "I1.f1.right.forcing"],
      transversality_target: "I1.f1.derivative",
      theta_separation_target: "I1.f1.bracket-width",
      bracket_margin: coreRows["I1.forcing-bracket"].sampled_margin,
      transversality_margin: pointRows["I1.f1.derivative"].sign_margin,
      theta_gap: thetaRows["I1.f1.bracket-width"].theta_gap,
      target_enclosure_radius: scaledBudget(
        coreRows["I1.forcing-bracket"].sampled_margin,
        targetMarginFactor
      ),
      isolation_rule:
        "a signed forcing bracket plus interval negative derivative on the enclosing regular subcell gives one isolated forcing zero",
      status: "zero-isolation-target-staged",
    },
    {
      target_id: "I2.d1",
      zero_type: "derivative-turn",
      bracket_sign_targets: ["I2.d1.left.derivative", "I2.d1.right.derivative"],
      positivity_target: "I2.d1.forcing",
      theta_separation_target: "I2.d1.bracket-width",
      bracket_margin: coreRows["I2.derivative-turn-bracket"].sampled_margin,
      positivity_margin: pointRows["I2.d1.forcing"].sign_margin,
      theta_gap: thetaRows["I2.d1.bracket-width"].theta_gap,
      target_enclosure_radius: scaledBudget(
        coreRows["I2.derivative-turn-bracket"].sampled_margin,
        targetMarginFactor
      ),
      isolation_rule:
        "a signed derivative bracket plus interval concavity on the turn bracket gives one derivative turn while forcing remains positive",
      status: "zero-isolation-target-staged",
    },
    {
      target_id: "I2.f1",
      zero_type: "forcing-zero",
      bracket_sign_targets: ["I2.f1.left.forcing", "I2.f1.right.forcing"],
      transversality_target: "I2.f1.derivative",
      theta_separation_target: "I2.f1.bracket-width",
      bracket_margin: coreRows["I2.forcing-bracket"].sampled_margin,
      transversality_margin: pointRows["I2.f1.derivative"].sign_margin,
      theta_gap: thetaRows["I2.f1.bracket-width"].theta_gap,
      target_enclosure_radius: scaledBudget(
        coreRows["I2.forcing-bracket"].sampled_margin,
        targetMarginFactor
      ),
      isolation_rule:
        "a signed forcing bracket plus interval negative derivative after the crest gives one isolated forcing zero",
      status: "zero-isolation-target-staged",
    },
  ];
}

function regularSubcellTargetRows(marginAtlas, targetMarginFactor) {
  const gridRows = Object.fromEntries(
    marginAtlas.topology_grid_margin_rows.map((row) => [row.predicate_id, row])
  );
  const coreRows = Object.fromEntries(
    marginAtlas.core_margin_rows.map((row) => [row.margin_row_id, row])
  );
  return [
    {
      target_id: "I1.derivative-negative.full-cell",
      cell_id: "I1",
      quantity: "derivative",
      expected_sign: "-",
      source_budget_row: "I1.grid.derivative-negative",
      sampled_margin: gridRows["I1.grid.derivative-negative"].sign_margin,
      target_enclosure_radius: scaledBudget(
        gridRows["I1.grid.derivative-negative"].sign_margin,
        targetMarginFactor
      ),
      proof_role:
        "monotonicity row for uniqueness of the first forcing zero on the regular part of I1",
      status: "regular-subcell-sign-target-staged",
    },
    {
      target_id: "I2.derivative-positive.before-turn",
      cell_id: "I2",
      quantity: "derivative",
      expected_sign: "+",
      source_budget_row: "I2.derivative-turn-bracket",
      sampled_margin: coreRows["I2.derivative-turn-bracket"].sampled_margin,
      target_enclosure_radius: scaledBudget(
        coreRows["I2.derivative-turn-bracket"].sampled_margin,
        targetMarginFactor
      ),
      proof_role:
        "forcing increases before the derivative turn, preserving positivity before the crest",
      status: "regular-subcell-sign-target-staged",
    },
    {
      target_id: "I2.derivative-negative.after-turn",
      cell_id: "I2",
      quantity: "derivative",
      expected_sign: "-",
      source_budget_row: "I2.derivative-turn-bracket/I2.transversality",
      sampled_margin: formatSmallNumber(
        Math.min(
          Number(coreRows["I2.derivative-turn-bracket"].sampled_margin),
          Number(coreRows["I2.transversality"].sampled_margin)
        )
      ),
      target_enclosure_radius: scaledBudget(
        Math.min(
          Number(coreRows["I2.derivative-turn-bracket"].sampled_margin),
          Number(coreRows["I2.transversality"].sampled_margin)
        ),
        targetMarginFactor
      ),
      proof_role:
        "forcing decreases after the derivative turn, giving one later forcing zero and no post-zero return",
      status: "regular-subcell-sign-target-staged",
    },
    {
      target_id: "I3.derivative-positive.full-cell",
      cell_id: "I3",
      quantity: "derivative",
      expected_sign: "+",
      source_budget_row: "I3.grid.derivative-positive",
      sampled_margin: gridRows["I3.grid.derivative-positive"].sign_margin,
      target_enclosure_radius: scaledBudget(
        gridRows["I3.grid.derivative-positive"].sign_margin,
        targetMarginFactor
      ),
      proof_role:
        "monotonicity row that transports negative right-end forcing across I3",
      status: "regular-subcell-sign-target-staged",
    },
    {
      target_id: "I3.forcing-negative.full-cell",
      cell_id: "I3",
      quantity: "forcing",
      expected_sign: "-",
      source_budget_row: "I3.grid.forcing-negative",
      sampled_margin: gridRows["I3.grid.forcing-negative"].sign_margin,
      target_enclosure_radius: scaledBudget(
        gridRows["I3.grid.forcing-negative"].sign_margin,
        targetMarginFactor
      ),
      proof_role:
        "hidden-zero exclusion row for the third regular cell",
      status: "regular-subcell-sign-target-staged",
    },
  ];
}

function thetaOrderTargetRows(marginAtlas, targetMarginFactor) {
  return marginAtlas.theta_separation_rows.map((row) => ({
    target_id: row.separation_id,
    left_row_id: row.left_row_id,
    right_row_id: row.right_row_id,
    theta_gap: row.theta_gap,
    equal_radius_order_budget: scaledBudget(
      Number(row.theta_gap) / 2,
      targetMarginFactor
    ),
    enclosure_rule:
      "equal-radius theta enclosures below this budget preserve the sampled order relation",
    status: "theta-order-enclosure-target-staged",
  }));
}

function valueBudgetImportRows(marginAtlas, targetMarginFactor) {
  const row = rowById(marginAtlas.core_margin_rows, "margin_row_id", "value.full-order");
  return [
    {
      target_id: "value.full-order",
      source_budget_row: row.margin_row_id,
      sampled_value_budget: row.sampled_margin,
      target_value_radius: scaledBudget(row.sampled_margin, targetMarginFactor),
      enclosure_rule:
        "candidate value intervals below this imported budget preserve the full sampled six-candidate ordering",
      status: "value-budget-import-target-staged",
    },
  ];
}

function foldCollarSignTransportRows(foldSquareAtlas, targetMarginFactor) {
  return foldSquareAtlas.fold_square_limit_rows
    .filter((row) => row.side_kind === "singular-integrable-side")
    .map((row) => {
      const limit = Number(row.analytic_square_limit);
      const derivativeSign =
        row.side === "left" ? signLabel(limit) : signLabel(-limit);
      return {
        target_id: `${row.fold_candidate_id}.${row.side}-fold-collar`,
        fold_candidate_id: row.fold_candidate_id,
        side: row.side,
        theta_substitution: row.theta_substitution,
        analytic_square_limit: row.analytic_square_limit,
        square_limit_sign: signLabel(limit),
        forcing_sign_for_small_y: signLabel(limit),
        derivative_sign_for_small_y: derivativeSign,
        asymptotic_rule:
          row.side === "left"
            ? "if 2y f(theta_f-y^2)->L, then f~L/(2y) and f'_theta~L/(4y^3)"
            : "if 2y f(theta_f+y^2)->L, then f~L/(2y) and f'_theta~-L/(4y^3)",
        target_square_limit_radius: scaledBudget(
          Math.abs(limit),
          targetMarginFactor
        ),
        proof_role:
          row.fold_candidate_id === "fold.3-"
            ? "fold-collar sign transport for the right edge of I1"
            : "fold-collar sign transport for the left edge of I3",
        status: "fold-collar-sign-transport-target-staged",
      };
    });
}

function buildTargetBudgetSummary({
  marginAtlas,
  pointRows,
  zeroRows,
  subcellRows,
  thetaRows,
  valueRows,
  foldRows,
  targetMarginFactor,
}) {
  const bottleneck = Number(
    marginAtlas.margin_summary.global_sampled_closure_bottleneck
  );
  return {
    target_margin_factor: formatSmallNumber(targetMarginFactor),
    global_sampled_closure_bottleneck: formatSmallNumber(bottleneck),
    global_sampled_closure_bottleneck_row_id:
      marginAtlas.margin_summary.global_sampled_closure_bottleneck_row_id,
    first_outward_rounded_radius_target: scaledBudget(
      bottleneck,
      targetMarginFactor
    ),
    minimum_value_ordering_budget:
      marginAtlas.margin_summary.minimum_value_ordering_budget,
    point_sign_target_count: pointRows.length,
    zero_isolation_target_count: zeroRows.length,
    regular_subcell_sign_target_count: subcellRows.length,
    theta_order_target_count: thetaRows.length,
    value_budget_import_count: valueRows.length,
    fold_collar_sign_transport_target_count: foldRows.length,
    target_status: "interval-sign-enclosure-targets-staged",
  };
}

export function buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas(
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

  const marginAtlas =
    buildOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceQuadraturePanelsPerSegment,
      valueQuadraturePanelsPerSegment,
    });
  const marginAtlasErrors =
    validateOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas(
      marginAtlas
    );
  const foldSquareAtlas = buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas({
    rootSubdivisions,
    scanSamplesPerCell,
    sourceAtlasSampleCount,
    sourceQuadraturePanelsPerSegment,
  });
  const foldSquareErrors =
    validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas(foldSquareAtlas);
  const pointRows = pointTargetRows(marginAtlas, targetMarginFactor);
  const zeroRows = zeroIsolationTargetRows(marginAtlas, targetMarginFactor);
  const subcellRows = regularSubcellTargetRows(marginAtlas, targetMarginFactor);
  const thetaRows = thetaOrderTargetRows(marginAtlas, targetMarginFactor);
  const valueRows = valueBudgetImportRows(marginAtlas, targetMarginFactor);
  const foldRows = foldCollarSignTransportRows(
    foldSquareAtlas,
    targetMarginFactor
  );
  const targetBudgetSummary = buildTargetBudgetSummary({
    marginAtlas,
    pointRows,
    zeroRows,
    subcellRows,
    thetaRows,
    valueRows,
    foldRows,
    targetMarginFactor,
  });
  const staged =
    marginAtlasErrors.length === 0 &&
    foldSquareErrors.length === 0 &&
    pointRows.length === 13 &&
    zeroRows.length === 3 &&
    subcellRows.length === 5 &&
    thetaRows.length === 4 &&
    valueRows.length === 1 &&
    foldRows.length === 2;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_INTERVAL_SIGN_ENCLOSURE_TARGET_ATLAS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.md",
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md",
    source_margin_atlas_check: {
      schema: marginAtlas.schema,
      valid: marginAtlasErrors.length === 0,
      errors: marginAtlasErrors,
      theory_status: marginAtlas.result.theory_status,
      retained_branch: marginAtlas.result.retained_branch,
      sampled_margin_atlas_certified:
        marginAtlas.artifact_claim.certifies_sampled_sign_topology_margin_atlas ===
        true,
      certifies_interval_derivative_enclosure:
        marginAtlas.artifact_claim.certifies_interval_derivative_enclosure ===
        true,
      certifies_interval_critical_exhaustion:
        marginAtlas.artifact_claim.certifies_interval_critical_exhaustion ===
        true,
      certifies_interval_quadrature_enclosure:
        marginAtlas.artifact_claim.certifies_interval_quadrature_enclosure ===
        true,
    },
    source_fold_square_limit_atlas_check: {
      schema: foldSquareAtlas.schema,
      valid: foldSquareErrors.length === 0,
      errors: foldSquareErrors,
      theory_status: foldSquareAtlas.result.theory_status,
      retained_branch: foldSquareAtlas.result.retained_branch,
      sampled_fold_square_limit_atlas_certified:
        foldSquareAtlas.artifact_claim.certifies_sampled_fold_square_limit_atlas ===
        true,
      certifies_interval_fold_limit_enclosure:
        foldSquareAtlas.artifact_claim.certifies_interval_fold_limit_enclosure ===
        true,
    },
    enclosure_target_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      derivative_samples_per_cell: derivativeSamplesPerCell,
      topology_samples_per_cell: topologySamplesPerCell,
      source_atlas_sample_count: sourceAtlasSampleCount,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      value_quadrature_panels_per_segment: valueQuadraturePanelsPerSegment,
      target_margin_factor: formatSmallNumber(targetMarginFactor),
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_estimate: marginAtlas.margin_parameters.speed_ratio_estimate,
      speed_ratio_enclosure: marginAtlas.margin_parameters.speed_ratio_enclosure,
    },
    interval_sign_target_rule: {
      point_sign_rule:
        "outward-rounded point enclosures below the staged radius preserve the sampled point sign predicates",
      regular_subcell_rule:
        "on compact regular subcells, interval enclosures for f_cross, f'_cross, and any needed derivative-sign controls upgrade the sampled topology to interval sign topology",
      fold_collar_rule:
        "near singular fold sides, use theta=theta_f +/- y^2 and 2y f_cross(theta_f +/- y^2)->L; then f_cross has sign sign(L), while f'_theta has sign sign(L) on left collars and sign(-L) on right collars",
      hidden_zero_rule:
        "the three zero-isolation brackets become critical-exhaustion inputs only after the regular subcell and fold-collar sign rows are interval-certified on one common source atlas",
      status: "interval-sign-enclosure-target-rule-stated",
    },
    point_sign_enclosure_target_rows: pointRows,
    zero_isolation_target_rows: zeroRows,
    regular_subcell_sign_target_rows: subcellRows,
    fold_collar_sign_transport_target_rows: foldRows,
    theta_order_target_rows: thetaRows,
    value_budget_import_rows: valueRows,
    target_budget_summary: targetBudgetSummary,
    interval_profile_boundary: {
      emits_interval_sign_enclosure_targets: staged,
      certifies_interval_sign_topology: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_fold_limit_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "outward-rounded point enclosures for the thirteen sign targets",
        "regular-subcell interval derivative/sign enclosures",
        "fold-collar square-coordinate interval sign enclosures",
        "shared source-atlas interval proof across all subcells",
      ],
      next_interval_task:
        "replace the staged target rows with outward-rounded interval enclosures, using regular theta charts away from folds and square-coordinate collars at the singular fold sides",
      status: "interval-sign-enclosure-targets-staged",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      emits_interval_sign_enclosure_targets: staged,
      stages_regular_subcell_interval_sign_targets: staged,
      stages_fold_collar_square_coordinate_sign_targets: staged,
      proves_fold_collar_sign_transport_formula: staged,
      certifies_interval_sign_topology: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_fold_limit_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "interval sign-enclosure target atlas with regular-subcell and fold-collar proof routes; interval sign topology and retained branch status remain open",
    },
    result: {
      theory_status: staged
        ? "source-atlas-aware-forcing-interval-sign-enclosure-target-atlas-staged"
        : "source-atlas-aware-forcing-interval-sign-enclosure-target-atlas-open",
      first_successor_row:
        "source-atlas-aware-outward-rounded-interval-sign-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The interval sign route is now geometrically split into compact regular subcells and square-coordinate fold collars. This prevents theta-Lipschitz misuse at fold singularities while preserving the margin-atlas bottleneck as the first radius target.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_INTERVAL_SIGN_ENCLOSURE_TARGET_ATLAS_SCHEMA,
    "schema must match forcing interval sign enclosure target atlas schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match forcing interval sign enclosure target atlas packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_margin_atlas_check?.valid === true &&
      artifact?.source_margin_atlas_check?.sampled_margin_atlas_certified ===
        true &&
      artifact?.source_margin_atlas_check
        ?.certifies_interval_derivative_enclosure === false &&
      artifact?.source_margin_atlas_check
        ?.certifies_interval_critical_exhaustion === false &&
      artifact?.source_margin_atlas_check
        ?.certifies_interval_quadrature_enclosure === false,
    "source margin atlas must validate without interval closure claims",
    errors
  );
  assertField(
    artifact?.source_fold_square_limit_atlas_check?.valid === true &&
      artifact?.source_fold_square_limit_atlas_check
        ?.sampled_fold_square_limit_atlas_certified === true &&
      artifact?.source_fold_square_limit_atlas_check
        ?.certifies_interval_fold_limit_enclosure === false,
    "source fold-square limit atlas must validate without interval fold-limit enclosure",
    errors
  );
  assertField(
    artifact?.enclosure_target_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "forcing interval sign enclosure targets must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.enclosure_target_parameters?.speed_band === undefined &&
      artifact?.enclosure_target_parameters?.speed_window === undefined &&
      artifact?.enclosure_target_parameters?.speed_min === undefined &&
      artifact?.enclosure_target_parameters?.speed_max === undefined,
    "enclosure target parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.interval_sign_target_rule?.status ===
      "interval-sign-enclosure-target-rule-stated" &&
      artifact?.interval_sign_target_rule?.fold_collar_rule?.includes(
        "theta=theta_f +/- y^2"
      ),
    "target atlas must state the regular-subcell and fold-collar interval rule",
    errors
  );
  assertField(
    Array.isArray(artifact?.point_sign_enclosure_target_rows) &&
      artifact.point_sign_enclosure_target_rows.length === 13,
    "target atlas must emit thirteen point sign enclosure targets",
    errors
  );
  assertField(
    Array.isArray(artifact?.zero_isolation_target_rows) &&
      artifact.zero_isolation_target_rows.map((row) => row.target_id).join("|") ===
        "I1.f1|I2.d1|I2.f1",
    "target atlas must emit the three named zero isolation targets",
    errors
  );
  assertField(
    Array.isArray(artifact?.regular_subcell_sign_target_rows) &&
      artifact.regular_subcell_sign_target_rows
        .map((row) => row.target_id)
        .join("|") ===
        "I1.derivative-negative.full-cell|I2.derivative-positive.before-turn|I2.derivative-negative.after-turn|I3.derivative-positive.full-cell|I3.forcing-negative.full-cell",
    "target atlas must emit the five named regular-subcell sign targets",
    errors
  );
  assertField(
    Array.isArray(artifact?.fold_collar_sign_transport_target_rows) &&
      artifact.fold_collar_sign_transport_target_rows.length === 2 &&
      artifact.fold_collar_sign_transport_target_rows.every(
        (row) =>
          row.status === "fold-collar-sign-transport-target-staged" &&
          row.square_limit_sign === "-" &&
          row.forcing_sign_for_small_y === "-"
      ),
    "target atlas must emit two negative square-limit fold-collar sign transport targets",
    errors
  );
  assertField(
    Array.isArray(artifact?.theta_order_target_rows) &&
      artifact.theta_order_target_rows.length === 4,
    "target atlas must emit four theta order targets",
    errors
  );
  assertField(
    Array.isArray(artifact?.value_budget_import_rows) &&
      artifact.value_budget_import_rows.length === 1 &&
      artifact.value_budget_import_rows[0].target_id === "value.full-order",
    "target atlas must import one full-order value budget row",
    errors
  );
  assertField(
    artifact?.target_budget_summary?.global_sampled_closure_bottleneck_row_id ===
      "I1.forcing-bracket" &&
      Number(
        artifact?.target_budget_summary?.first_outward_rounded_radius_target
      ) > 0 &&
      artifact?.target_budget_summary?.target_status ===
        "interval-sign-enclosure-targets-staged",
    "target budget summary must preserve the I1 forcing-bracket bottleneck",
    errors
  );
  assertField(
    artifact?.artifact_claim?.emits_interval_sign_enclosure_targets === true &&
      artifact?.artifact_claim
        ?.stages_fold_collar_square_coordinate_sign_targets === true &&
      artifact?.artifact_claim?.proves_fold_collar_sign_transport_formula ===
        true &&
      artifact?.artifact_claim?.certifies_interval_sign_topology === false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must stage interval targets and leave interval closure claims false",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-forcing-interval-sign-enclosure-target-atlas-staged" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must be staged and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.mjs [options]",
    "",
    "Options:",
    "  --topology-samples-per-cell <n>    Regular-cell forcing topology samples per cell (default: 48)",
    "  --derivative-samples-per-cell <n>  Source derivative atlas samples per cell (default: 8)",
    "  --scan-subdivisions <n>            Primitive critical scan samples per cell (default: 96)",
    "  --source-atlas-samples <n>         Source fold atlas samples (default: 64)",
    "  --source-quadrature-panels <n>     Source critical-value quadrature panels per segment (default: 96)",
    "  --value-quadrature-panels <n>      Candidate-value quadrature panels per segment (default: 384)",
    "  --subdivisions <n>                 Root search subdivisions (default: 5000)",
    "  --target-margin-factor <x>         Target radius factor applied to sampled budgets (default: 0.5)",
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
    scanSamplesPerCell: DEFAULT_SCAN_SAMPLES_PER_CELL,
    sourceAtlasSampleCount: DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    sourceQuadraturePanelsPerSegment: DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    valueQuadraturePanelsPerSegment: DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    targetMarginFactor: DEFAULT_TARGET_MARGIN_FACTOR,
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
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--source-atlas-samples") {
      args.sourceAtlasSampleCount = argv[(index += 1)];
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--value-quadrature-panels") {
      args.valueQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = argv[(index += 1)];
    } else if (arg === "--target-margin-factor") {
      args.targetMarginFactor = argv[(index += 1)];
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_INTERVAL_SIGN_ENCLOSURE_TARGET_ATLAS_SCHEMA
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas(
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
    buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas(
      args
    );
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

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate,
  validateOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate,
} from "./octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas,
} from "./octahedral-fold-aware-cross-binary-forcing-topology-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryFiniteCandidateReduction,
  validateOctahedralFoldAwareCrossBinaryFiniteCandidateReduction,
} from "./octahedral-fold-aware-cross-binary-finite-candidate-reduction.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_TOPOLOGY_MARGIN_ATLAS_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_forcing_sign_topology_margin_atlas";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_TOPOLOGY_SAMPLES_PER_CELL = 48;
const DEFAULT_DERIVATIVE_SAMPLES_PER_CELL = 8;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT = 384;
const CHECK_TOLERANCE = 1e-10;

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

function marginForSign(value, expectedSign) {
  if (expectedSign === "+") {
    return Number(value);
  }
  if (expectedSign === "-") {
    return -Number(value);
  }
  throw new Error("expectedSign must be + or -");
}

function rowById(rows, rowId) {
  const row = rows.find((entry) => entry.row_id === rowId);
  if (!row) {
    throw new Error(`missing signed witness row ${rowId}`);
  }
  return row;
}

function cellById(rows, cellId) {
  const row = rows.find((entry) => entry.cell_id === cellId);
  if (!row) {
    throw new Error(`missing topology cell row ${cellId}`);
  }
  return row;
}

function buildSignedValueMarginRows(signCertificate) {
  const rows = signCertificate.signed_witness_rows;
  const specs = [
    ["I1.f1.left", "forcing", "+", "I1 positive forcing side of first zero"],
    ["I1.f1.right", "forcing", "-", "I1 negative forcing side of first zero"],
    ["I1.f1", "derivative", "-", "I1 regular zero transversality"],
    ["I2.d1.left", "derivative", "+", "I2 positive derivative side of crest"],
    ["I2.d1.right", "derivative", "-", "I2 negative derivative side of crest"],
    ["I2.d1", "forcing", "+", "I2 crest remains above zero"],
    ["I2.f1.left", "forcing", "+", "I2 positive forcing side of second zero"],
    ["I2.f1.right", "forcing", "-", "I2 negative forcing side of second zero"],
    ["I2.f1", "derivative", "-", "I2 regular zero transversality"],
    ["I3.left-scan", "forcing", "-", "I3 left sampled forcing exclusion"],
    ["I3.right-scan", "forcing", "-", "I3 right sampled forcing exclusion"],
    ["I3.left-scan", "derivative", "+", "I3 left sampled derivative sign"],
    ["I3.right-scan", "derivative", "+", "I3 right sampled derivative sign"],
  ];

  return specs.map(([rowId, quantity, expectedSign, predicate]) => {
    const row = rowById(rows, rowId);
    const value = Number(row[quantity]);
    const margin = marginForSign(value, expectedSign);
    return {
      predicate_id: `${rowId}.${quantity}`,
      witness_row_id: rowId,
      quantity,
      expected_sign: expectedSign,
      value: formatSmallNumber(value),
      sign_margin: formatSmallNumber(margin),
      predicate,
      status:
        margin > CHECK_TOLERANCE
          ? "sampled-signed-value-margin-positive"
          : "sampled-signed-value-margin-open",
    };
  });
}

function buildTopologyGridMarginRows(topologyAtlas) {
  const cells = topologyAtlas.regular_cell_topology_rows;
  const i1 = cellById(cells, "I1");
  const i3 = cellById(cells, "I3");
  return [
    {
      predicate_id: "I1.grid.derivative-negative",
      cell_id: "I1",
      quantity: "derivative",
      expected_sign: "-",
      extremal_grid_value: i1.derivative_maximum_on_scan_grid,
      sign_margin: formatSmallNumber(-Number(i1.derivative_maximum_on_scan_grid)),
      predicate:
        "sampled I1 derivative grid remains negative on the topology scan",
      status:
        -Number(i1.derivative_maximum_on_scan_grid) > CHECK_TOLERANCE
          ? "sampled-grid-sign-margin-positive"
          : "sampled-grid-sign-margin-open",
    },
    {
      predicate_id: "I3.grid.forcing-negative",
      cell_id: "I3",
      quantity: "forcing",
      expected_sign: "-",
      extremal_grid_value: i3.forcing_maximum_on_scan_grid,
      sign_margin: formatSmallNumber(-Number(i3.forcing_maximum_on_scan_grid)),
      predicate:
        "sampled I3 forcing grid remains negative on the topology scan",
      status:
        -Number(i3.forcing_maximum_on_scan_grid) > CHECK_TOLERANCE
          ? "sampled-grid-sign-margin-positive"
          : "sampled-grid-sign-margin-open",
    },
    {
      predicate_id: "I3.grid.derivative-positive",
      cell_id: "I3",
      quantity: "derivative",
      expected_sign: "+",
      extremal_grid_value: i3.derivative_minimum_on_scan_grid,
      sign_margin: formatSmallNumber(Number(i3.derivative_minimum_on_scan_grid)),
      predicate:
        "sampled I3 derivative grid remains positive on the topology scan",
      status:
        Number(i3.derivative_minimum_on_scan_grid) > CHECK_TOLERANCE
          ? "sampled-grid-sign-margin-positive"
          : "sampled-grid-sign-margin-open",
    },
  ];
}

function buildThetaSeparationRows(signCertificate) {
  const rows = signCertificate.signed_witness_rows;
  const i1Left = rowById(rows, "I1.f1.left");
  const i1Right = rowById(rows, "I1.f1.right");
  const i2DLeft = rowById(rows, "I2.d1.left");
  const i2D = rowById(rows, "I2.d1");
  const i2DRight = rowById(rows, "I2.d1.right");
  const i2Left = rowById(rows, "I2.f1.left");
  const i2 = rowById(rows, "I2.f1");
  const i2Right = rowById(rows, "I2.f1.right");
  return [
    {
      separation_id: "I1.f1.bracket-width",
      left_row_id: "I1.f1.left",
      right_row_id: "I1.f1.right",
      theta_gap: formatSmallNumber(Number(i1Right.theta) - Number(i1Left.theta)),
      status: "sampled-positive-theta-separation",
    },
    {
      separation_id: "I2.d1.bracket-width",
      left_row_id: "I2.d1.left",
      right_row_id: "I2.d1.right",
      theta_gap: formatSmallNumber(Number(i2DRight.theta) - Number(i2DLeft.theta)),
      status: "sampled-positive-theta-separation",
    },
    {
      separation_id: "I2.f1.bracket-width",
      left_row_id: "I2.f1.left",
      right_row_id: "I2.f1.right",
      theta_gap: formatSmallNumber(Number(i2Right.theta) - Number(i2Left.theta)),
      status: "sampled-positive-theta-separation",
    },
    {
      separation_id: "I2.crest-before-zero",
      left_row_id: "I2.d1",
      right_row_id: "I2.f1",
      theta_gap: formatSmallNumber(Number(i2.theta) - Number(i2D.theta)),
      status:
        Number(i2.theta) > Number(i2D.theta)
          ? "sampled-positive-theta-separation"
          : "sampled-theta-separation-open",
    },
  ];
}

function signedMargin(rows, rowId, quantity, expectedSign) {
  const row = rowById(rows, rowId);
  return marginForSign(Number(row[quantity]), expectedSign);
}

function thetaGap(rows, leftRowId, rightRowId) {
  return Number(rowById(rows, rightRowId).theta) - Number(rowById(rows, leftRowId).theta);
}

function buildCoreMarginRows({ signCertificate, finiteCandidateReduction }) {
  const rows = signCertificate.signed_witness_rows;
  const valueBudget = Number(
    finiteCandidateReduction.interval_closure_budget.equal_radius_full_order_budget
  );
  const i1ForcingBracketMargin = Math.min(
    signedMargin(rows, "I1.f1.left", "forcing", "+"),
    signedMargin(rows, "I1.f1.right", "forcing", "-")
  );
  const i2DerivativeTurnMargin = Math.min(
    signedMargin(rows, "I2.d1.left", "derivative", "+"),
    signedMargin(rows, "I2.d1.right", "derivative", "-")
  );
  const i2ForcingBracketMargin = Math.min(
    signedMargin(rows, "I2.f1.left", "forcing", "+"),
    signedMargin(rows, "I2.f1.right", "forcing", "-")
  );
  const i3ForcingMargin = Math.min(
    signedMargin(rows, "I3.left-scan", "forcing", "-"),
    signedMargin(rows, "I3.right-scan", "forcing", "-")
  );
  const i3DerivativeMargin = Math.min(
    signedMargin(rows, "I3.left-scan", "derivative", "+"),
    signedMargin(rows, "I3.right-scan", "derivative", "+")
  );
  const turnBeforeZeroGap = thetaGap(rows, "I2.d1", "I2.f1");

  return [
    {
      margin_row_id: "I1.forcing-bracket",
      target_predicate: "f_cross(a1)>0>f_cross(b1)",
      sampled_margin: formatSmallNumber(i1ForcingBracketMargin),
      sampled_margin_kind: "signed-forcing-value",
      interval_budget_rule:
        "equal-radius forcing enclosures below this margin preserve the signed bracket",
      status: "sampled-sign-topology-margin-positive",
    },
    {
      margin_row_id: "I1.transversality",
      target_predicate: "f'_cross(u1)<0",
      sampled_margin: formatSmallNumber(
        signedMargin(rows, "I1.f1", "derivative", "-")
      ),
      sampled_margin_kind: "signed-derivative-value",
      interval_budget_rule:
        "a derivative enclosure below this margin preserves negative transversality at u1",
      status: "sampled-sign-topology-margin-positive",
    },
    {
      margin_row_id: "I2.derivative-turn-bracket",
      target_predicate: "f'_cross(c_L)>0>f'_cross(c_R)",
      sampled_margin: formatSmallNumber(i2DerivativeTurnMargin),
      sampled_margin_kind: "signed-derivative-value",
      interval_budget_rule:
        "equal-radius derivative enclosures below this margin preserve the derivative-turn bracket",
      status: "sampled-sign-topology-margin-positive",
    },
    {
      margin_row_id: "I2.crest-positive-forcing",
      target_predicate: "f_cross(u_c)>0",
      sampled_margin: formatSmallNumber(
        signedMargin(rows, "I2.d1", "forcing", "+")
      ),
      sampled_margin_kind: "signed-forcing-value",
      interval_budget_rule:
        "a forcing enclosure below this margin preserves that the crest remains above zero",
      status: "sampled-sign-topology-margin-positive",
    },
    {
      margin_row_id: "I2.forcing-bracket",
      target_predicate: "f_cross(a2)>0>f_cross(b2)",
      sampled_margin: formatSmallNumber(i2ForcingBracketMargin),
      sampled_margin_kind: "signed-forcing-value",
      interval_budget_rule:
        "equal-radius forcing enclosures below this margin preserve the second signed bracket",
      status: "sampled-sign-topology-margin-positive",
    },
    {
      margin_row_id: "I2.transversality",
      target_predicate: "f'_cross(u2)<0",
      sampled_margin: formatSmallNumber(
        signedMargin(rows, "I2.f1", "derivative", "-")
      ),
      sampled_margin_kind: "signed-derivative-value",
      interval_budget_rule:
        "a derivative enclosure below this margin preserves negative transversality at u2",
      status: "sampled-sign-topology-margin-positive",
    },
    {
      margin_row_id: "I3.endpoint-forcing-negative",
      target_predicate: "f_cross(I3 endpoints)<0",
      sampled_margin: formatSmallNumber(i3ForcingMargin),
      sampled_margin_kind: "signed-forcing-value",
      interval_budget_rule:
        "endpoint forcing enclosures below this margin preserve negative endpoint signs on I3",
      status: "sampled-sign-topology-margin-positive",
    },
    {
      margin_row_id: "I3.endpoint-derivative-positive",
      target_predicate: "f'_cross(I3 endpoints)>0",
      sampled_margin: formatSmallNumber(i3DerivativeMargin),
      sampled_margin_kind: "signed-derivative-value",
      interval_budget_rule:
        "endpoint derivative enclosures below this margin preserve positive endpoint signs on I3",
      status: "sampled-sign-topology-margin-positive",
    },
    {
      margin_row_id: "I2.turn-before-zero",
      target_predicate: "u_c<u2",
      sampled_margin: formatSmallNumber(turnBeforeZeroGap),
      equal_radius_order_budget: formatSmallNumber(turnBeforeZeroGap / 2),
      sampled_margin_kind: "theta-order-gap",
      interval_budget_rule:
        "equal-radius theta enclosures below this order budget preserve crest-before-zero order",
      status: "sampled-sign-topology-margin-positive",
    },
    {
      margin_row_id: "value.full-order",
      target_predicate: "six-candidate value order",
      sampled_margin: formatSmallNumber(valueBudget),
      sampled_margin_kind: "imported-equal-radius-value-budget",
      interval_budget_rule:
        "candidate value intervals below this imported budget preserve the full sampled order",
      source_packet:
        "octahedral-fold-aware-cross-binary-finite-candidate-reduction",
      status: "sampled-value-budget-imported",
    },
  ];
}

function minPositive(rows, field) {
  return Math.min(
    ...rows.map((row) => Number(row[field])).filter((value) => value > 0)
  );
}

function buildMarginSummary({
  core_margin_rows,
  signedValueMarginRows,
  topologyGridMarginRows,
  thetaSeparationRows,
}) {
  const forcingRows = signedValueMarginRows.filter(
    (row) => row.quantity === "forcing"
  );
  const derivativeRows = signedValueMarginRows.filter(
    (row) => row.quantity === "derivative"
  );
  const positiveMargins =
    core_margin_rows.every((row) => Number(row.sampled_margin) > CHECK_TOLERANCE) &&
    signedValueMarginRows.every((row) => Number(row.sign_margin) > CHECK_TOLERANCE) &&
    topologyGridMarginRows.every(
      (row) => Number(row.sign_margin) > CHECK_TOLERANCE
    ) &&
    thetaSeparationRows.every((row) => Number(row.theta_gap) > CHECK_TOLERANCE);
  const signRows = core_margin_rows.filter((row) =>
    ["signed-forcing-value", "signed-derivative-value"].includes(
      row.sampled_margin_kind
    )
  );
  const valueRow = core_margin_rows.find(
    (row) => row.margin_row_id === "value.full-order"
  );
  const weakestSignRow = signRows.reduce((best, row) =>
    Number(row.sampled_margin) < Number(best.sampled_margin) ? row : best
  );
  const minimumSignBudget = Number(weakestSignRow.sampled_margin);
  const minimumValueBudget = Number(valueRow.sampled_margin);
  return {
    minimum_sign_preservation_budget: formatSmallNumber(minimumSignBudget),
    minimum_sign_preservation_budget_row_id: weakestSignRow.margin_row_id,
    minimum_value_ordering_budget: formatSmallNumber(minimumValueBudget),
    global_sampled_closure_bottleneck: formatSmallNumber(
      Math.min(minimumSignBudget, minimumValueBudget)
    ),
    global_sampled_closure_bottleneck_row_id:
      minimumSignBudget <= minimumValueBudget
        ? weakestSignRow.margin_row_id
        : valueRow.margin_row_id,
    min_signed_forcing_value_margin: formatSmallNumber(
      minPositive(forcingRows, "sign_margin")
    ),
    min_signed_derivative_value_margin: formatSmallNumber(
      minPositive(derivativeRows, "sign_margin")
    ),
    min_topology_grid_sign_margin: formatSmallNumber(
      minPositive(topologyGridMarginRows, "sign_margin")
    ),
    min_theta_separation_margin: formatSmallNumber(
      minPositive(thetaSeparationRows, "theta_gap")
    ),
    signed_value_margin_row_count: signedValueMarginRows.length,
    topology_grid_margin_row_count: topologyGridMarginRows.length,
    theta_separation_row_count: thetaSeparationRows.length,
    core_margin_row_count: core_margin_rows.length,
    status: positiveMargins
      ? "sampled-sign-topology-margins-positive"
      : "sampled-sign-topology-margins-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas(
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

  const signCertificate =
    buildOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceQuadraturePanelsPerSegment,
    });
  const signCertificateErrors =
    validateOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate(
      signCertificate
    );
  const topologyAtlas = buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas({
    rootSubdivisions,
    scanSamplesPerCell,
    topologySamplesPerCell,
    derivativeSamplesPerCell,
    sourceQuadraturePanelsPerSegment,
  });
  const topologyErrors =
    validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas(topologyAtlas);
  const finiteCandidateReduction =
    buildOctahedralFoldAwareCrossBinaryFiniteCandidateReduction({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceQuadraturePanelsPerSegment,
      valueQuadraturePanelsPerSegment,
    });
  const finiteCandidateErrors =
    validateOctahedralFoldAwareCrossBinaryFiniteCandidateReduction(
      finiteCandidateReduction
    );
  const signedValueMarginRows = buildSignedValueMarginRows(signCertificate);
  const topologyGridMarginRows = buildTopologyGridMarginRows(topologyAtlas);
  const thetaSeparationRows = buildThetaSeparationRows(signCertificate);
  const coreMarginRows = buildCoreMarginRows({
    signCertificate,
    finiteCandidateReduction,
  });
  const marginSummary = buildMarginSummary({
    core_margin_rows: coreMarginRows,
    signedValueMarginRows,
    topologyGridMarginRows,
    thetaSeparationRows,
  });
  const marginAtlasPassed =
    signCertificateErrors.length === 0 &&
    topologyErrors.length === 0 &&
    finiteCandidateErrors.length === 0 &&
    marginSummary.status === "sampled-sign-topology-margins-positive";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_TOPOLOGY_MARGIN_ATLAS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.md",
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.md",
    source_forcing_sign_certificate_check: {
      schema: signCertificate.schema,
      valid: signCertificateErrors.length === 0,
      errors: signCertificateErrors,
      theory_status: signCertificate.result.theory_status,
      retained_branch: signCertificate.result.retained_branch,
      sampled_sign_brackets_certified:
        signCertificate.artifact_claim.certifies_sampled_forcing_sign_brackets ===
        true,
      certifies_interval_critical_exhaustion:
        signCertificate.artifact_claim.certifies_interval_critical_exhaustion ===
        true,
    },
    source_forcing_topology_atlas_check: {
      schema: topologyAtlas.schema,
      valid: topologyErrors.length === 0,
      errors: topologyErrors,
      theory_status: topologyAtlas.result.theory_status,
      retained_branch: topologyAtlas.result.retained_branch,
      sampled_forcing_topology_certified:
        topologyAtlas.artifact_claim.certifies_sampled_regular_cell_forcing_topology ===
        true,
      certifies_interval_derivative_enclosure:
        topologyAtlas.artifact_claim.certifies_interval_derivative_enclosure ===
        true,
    },
    source_finite_candidate_reduction_check: {
      schema: finiteCandidateReduction.schema,
      valid: finiteCandidateErrors.length === 0,
      errors: finiteCandidateErrors,
      theory_status: finiteCandidateReduction.result.theory_status,
      retained_branch: finiteCandidateReduction.result.retained_branch,
      sampled_finite_candidate_reduction_certified:
        finiteCandidateReduction.artifact_claim
          .certifies_conditional_finite_candidate_reduction === true,
      certifies_C_m_Q_M_Q_interval_enclosure:
        finiteCandidateReduction.artifact_claim
          .certifies_C_m_Q_M_Q_interval_enclosure === true,
    },
    margin_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      derivative_samples_per_cell: derivativeSamplesPerCell,
      topology_samples_per_cell: topologySamplesPerCell,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      value_quadrature_panels_per_segment: valueQuadraturePanelsPerSegment,
      speed_constraint:
        "none; uses the certified positive speed-ratio zero enclosure only",
      speed_ratio_estimate:
        signCertificate.certificate_parameters.speed_ratio_estimate,
      speed_ratio_enclosure:
        signCertificate.certificate_parameters.speed_ratio_enclosure,
    },
    candidate_order: finiteCandidateReduction.finite_candidate_set.candidate_ids,
    margin_rule: {
      signed_value_budget:
        "a pointwise sign predicate is stable under any equal-radius value enclosure with radius below its sign margin",
      theta_order_budget:
        "a sampled order relation is stable under any equal-radius theta enclosure with radius below half the emitted theta gap",
      grid_margin_boundary:
        "grid margins are sampled topology budgets, not hidden-zero exclusion or interval derivative enclosure",
      status: "sampled-sign-topology-margin-rule-stated",
    },
    core_margin_rows: coreMarginRows,
    signed_value_margin_rows: signedValueMarginRows,
    topology_grid_margin_rows: topologyGridMarginRows,
    theta_separation_rows: thetaSeparationRows,
    margin_summary: marginSummary,
    interval_profile_boundary: {
      certifies_sampled_sign_topology_margin_budgets: marginAtlasPassed,
      certifies_sampled_value_budget_alignment: marginAtlasPassed,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      open_quantities: [
        "outward-rounded enclosures for f_cross and f'_cross on topology subcells",
        "hidden-zero exclusion between sampled sign witnesses",
        "fold-square interval endpoint enclosures",
      ],
      next_interval_task:
        "construct interval sign enclosures whose radii are below the emitted sign-margin budgets and then consume them in the finite-candidate reduction",
      status: "sign-topology-interval-enclosure-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_forcing_sign_bracket_certificate:
        signCertificate.artifact_claim.certifies_sampled_forcing_sign_brackets ===
        true,
      certifies_sampled_sign_topology_margin_atlas: marginAtlasPassed,
      certifies_sampled_sign_preservation_budgets: marginAtlasPassed,
      certifies_sampled_turn_order_margin: marginAtlasPassed,
      certifies_sampled_value_margin_budget_import: marginAtlasPassed,
      certifies_sampled_sign_topology_margin_rows: marginAtlasPassed,
      certifies_sampled_interval_target_predicates: marginAtlasPassed,
      certifies_sampled_value_budget_alignment: marginAtlasPassed,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_fold_limit_enclosure: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "sampled sign-topology margin budgets for the representative cross-binary quarter profile; interval sign enclosure, hidden-zero exclusion, interval quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: marginAtlasPassed
        ? "sampled-source-atlas-aware-forcing-sign-topology-margin-atlas-certified"
        : "source-atlas-aware-forcing-sign-topology-margin-atlas-open",
      first_successor_row:
        "source-atlas-aware-interval-sign-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The sign-bracket and topology rows now have explicit margin budgets. Any future interval sign enclosure must beat the emitted value, grid, and theta-separation margins before the finite-candidate theorem can be upgraded to interval critical exhaustion.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_TOPOLOGY_MARGIN_ATLAS_SCHEMA,
    "schema must match forcing sign topology margin atlas schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match forcing sign topology margin atlas packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_forcing_sign_certificate_check?.valid === true &&
      artifact?.source_forcing_sign_certificate_check
        ?.sampled_sign_brackets_certified === true &&
      artifact?.source_forcing_sign_certificate_check
        ?.certifies_interval_critical_exhaustion === false,
    "source forcing sign certificate must validate without interval critical exhaustion",
    errors
  );
  assertField(
    artifact?.source_forcing_topology_atlas_check?.valid === true &&
      artifact?.source_forcing_topology_atlas_check
        ?.sampled_forcing_topology_certified === true &&
      artifact?.source_forcing_topology_atlas_check
        ?.certifies_interval_derivative_enclosure === false,
    "source forcing topology atlas must validate without interval derivative enclosure",
    errors
  );
  assertField(
    artifact?.source_finite_candidate_reduction_check?.valid === true &&
      artifact?.source_finite_candidate_reduction_check
        ?.sampled_finite_candidate_reduction_certified === true &&
      artifact?.source_finite_candidate_reduction_check
        ?.certifies_C_m_Q_M_Q_interval_enclosure === false,
    "source finite candidate reduction must validate without interval value enclosures",
    errors
  );
  assertField(
    artifact?.margin_parameters?.speed_constraint ===
      "none; uses the certified positive speed-ratio zero enclosure only",
    "forcing sign topology margin atlas must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.margin_rule?.status === "sampled-sign-topology-margin-rule-stated",
    "forcing sign topology margin atlas must state the margin rule",
    errors
  );
  assertField(
    Array.isArray(artifact?.candidate_order) &&
      artifact.candidate_order.join("|") ===
        "endpoint.0|I1.z1|fold.3-|I2.z1|fold.2+|endpoint.Q",
    "forcing sign topology margin atlas must preserve candidate order",
    errors
  );
  assertField(
    Array.isArray(artifact?.core_margin_rows) &&
      artifact.core_margin_rows.length === 10 &&
      artifact.core_margin_rows.every(
        (row) =>
          Number(row.sampled_margin) > 0 &&
          ["sampled-sign-topology-margin-positive", "sampled-value-budget-imported"].includes(
            row.status
          )
      ),
    "forcing sign topology margin atlas must emit ten positive core margin rows",
    errors
  );
  assertField(
    Array.isArray(artifact?.signed_value_margin_rows) &&
      artifact.signed_value_margin_rows.length === 13 &&
      artifact.signed_value_margin_rows.every(
        (row) => row.status === "sampled-signed-value-margin-positive"
      ),
    "forcing sign topology margin atlas must emit thirteen positive signed value margins",
    errors
  );
  assertField(
    Array.isArray(artifact?.topology_grid_margin_rows) &&
      artifact.topology_grid_margin_rows.length === 3 &&
      artifact.topology_grid_margin_rows.every(
        (row) => row.status === "sampled-grid-sign-margin-positive"
      ),
    "forcing sign topology margin atlas must emit three positive topology grid margins",
    errors
  );
  assertField(
    Array.isArray(artifact?.theta_separation_rows) &&
      artifact.theta_separation_rows.length === 4 &&
      artifact.theta_separation_rows.every(
        (row) => row.status === "sampled-positive-theta-separation"
      ),
    "forcing sign topology margin atlas must emit four positive theta separations",
    errors
  );
  assertField(
    Number(artifact?.margin_summary?.minimum_sign_preservation_budget) > 0 &&
      Number(artifact?.margin_summary?.minimum_value_ordering_budget) > 0 &&
      Number(artifact?.margin_summary?.global_sampled_closure_bottleneck) > 0 &&
      artifact?.margin_summary?.global_sampled_closure_bottleneck_row_id ===
        "I1.forcing-bracket" &&
      Number(artifact?.margin_summary?.min_signed_forcing_value_margin) > 0 &&
      Number(artifact?.margin_summary?.min_signed_derivative_value_margin) > 0 &&
      Number(artifact?.margin_summary?.min_topology_grid_sign_margin) > 0 &&
      Number(artifact?.margin_summary?.min_theta_separation_margin) > 0 &&
      artifact?.margin_summary?.status === "sampled-sign-topology-margins-positive",
    "forcing sign topology margin atlas must derive positive sampled margin budgets",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_sampled_sign_topology_margin_atlas ===
      true &&
      artifact?.artifact_claim?.certifies_sampled_sign_preservation_budgets ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_turn_order_margin === true &&
      artifact?.artifact_claim?.certifies_sampled_value_margin_budget_import ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_sign_topology_margin_rows ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_interval_target_predicates ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_value_budget_alignment ===
        true &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.certifies_C_m_Q_M_Q_interval_enclosure === false &&
      artifact?.artifact_claim?.certifies_cross_binary_coarea_interval_profile ===
        false &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must certify only sampled forcing sign topology margins and leave interval/live-ledger rows open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.retained_branch === false &&
      artifact?.result?.retained_branch === false &&
      artifact?.result?.retention === "not_retained",
    "artifact must not claim retained branch status",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.mjs [options]",
    "",
    "Options:",
    "  --topology-samples-per-cell <n>    Regular-cell forcing topology samples per cell (default: 48)",
    "  --derivative-samples-per-cell <n>  Source derivative atlas samples per cell (default: 8)",
    "  --scan-subdivisions <n>            Primitive critical scan samples per cell (default: 96)",
    "  --source-quadrature-panels <n>     Source critical-value quadrature panels per segment (default: 96)",
    "  --value-quadrature-panels <n>      Candidate-value quadrature panels per segment (default: 384)",
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
    scanSamplesPerCell: DEFAULT_SCAN_SAMPLES_PER_CELL,
    sourceQuadraturePanelsPerSegment: DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    valueQuadraturePanelsPerSegment: DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT,
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
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--value-quadrature-panels") {
      args.valueQuadraturePanelsPerSegment = argv[(index += 1)];
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_TOPOLOGY_MARGIN_ATLAS_SCHEMA
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas(artifact);
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      process.exitCode = 1;
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas(args);
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

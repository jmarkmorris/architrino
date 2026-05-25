#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas,
  validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas,
} from "./octahedral-fold-aware-cross-binary-critical-value-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas,
} from "./octahedral-fold-aware-cross-binary-forcing-topology-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_CANDIDATE_REDUCTION_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-finite-candidate-reduction/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_finite_candidate_reduction";
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

function candidateIds(rows) {
  return rows.map((row) => row.candidate_id);
}

function valueByCandidateId(rows, candidateId) {
  const row = rows.find((entry) => entry.candidate_id === candidateId);
  if (!row) {
    throw new Error(`missing candidate value row ${candidateId}`);
  }
  return Number(row.primitive_value);
}

function buildValueMarginRows(candidateValueRows) {
  const lowToHigh = [...candidateValueRows].sort(
    (left, right) => Number(left.primitive_value) - Number(right.primitive_value)
  );
  return lowToHigh.slice(1).map((right, index) => {
    const left = lowToHigh[index];
    const gap = Number(right.primitive_value) - Number(left.primitive_value);
    return {
      lower_candidate_id: left.candidate_id,
      upper_candidate_id: right.candidate_id,
      lower_value: formatNumber(Number(left.primitive_value)),
      upper_value: formatNumber(Number(right.primitive_value)),
      signed_gap: formatNumber(gap),
      equal_radius_ordering_budget: formatSmallNumber(gap / 2),
    };
  });
}

function buildExtremumMarginBudgets(criticalValueAtlas) {
  const rows = criticalValueAtlas.candidate_value_rows;
  const summary = criticalValueAtlas.critical_value_summary;
  const maximumId = summary.sampled_M_Q_candidate_id;
  const minimumId = summary.sampled_m_Q_candidate_id;
  const maximumValue = valueByCandidateId(rows, maximumId);
  const minimumValue = valueByCandidateId(rows, minimumId);
  const secondMaximumValue = Math.max(
    ...rows
      .filter((row) => row.candidate_id !== maximumId)
      .map((row) => Number(row.primitive_value))
  );
  const secondMinimumValue = Math.min(
    ...rows
      .filter((row) => row.candidate_id !== minimumId)
      .map((row) => Number(row.primitive_value))
  );
  const maximumGap = maximumValue - secondMaximumValue;
  const minimumGap = secondMinimumValue - minimumValue;
  const quarterIntegral = Number(summary.quarter_integral_C_cross);

  return {
    sampled_M_Q_candidate_id: maximumId,
    sampled_M_Q: formatNumber(maximumValue),
    sampled_M_Q_second_value: formatNumber(secondMaximumValue),
    sampled_M_Q_gap_to_second: formatNumber(maximumGap),
    equal_radius_M_Q_certification_budget: formatSmallNumber(maximumGap / 2),
    positive_M_Q_budget: formatSmallNumber(maximumValue),
    sampled_m_Q_candidate_id: minimumId,
    sampled_m_Q: formatNumber(minimumValue),
    sampled_m_Q_second_value: formatNumber(secondMinimumValue),
    sampled_m_Q_gap_to_second: formatNumber(minimumGap),
    equal_radius_m_Q_certification_budget: formatSmallNumber(minimumGap / 2),
    sampled_C_cross: formatNumber(quarterIntegral),
    negative_C_cross_budget: formatSmallNumber(Math.abs(quarterIntegral)),
    status:
      maximumGap > CHECK_TOLERANCE &&
      minimumGap > CHECK_TOLERANCE &&
      maximumValue > CHECK_TOLERANCE &&
      quarterIntegral < -CHECK_TOLERANCE
        ? "sampled-extremum-margin-budgets-positive"
        : "sampled-extremum-margin-budgets-open",
  };
}

function buildReductionRows({ topologyAtlas, criticalValueAtlas }) {
  const topologyCandidateIds = topologyAtlas.topology_candidate_set.candidates.map(
    (candidate) => candidate.candidate_id
  );
  const criticalCandidateIds = candidateIds(criticalValueAtlas.candidate_value_rows);
  const topologyByCell = Object.fromEntries(
    topologyAtlas.regular_cell_topology_rows.map((row) => [row.cell_id, row])
  );
  return [
    {
      reduction_row_id: "I1",
      source_cell: "I1",
      forcing_topology_class: topologyByCell.I1?.topology_class,
      certified_theorem_condition:
        "if f'_cross<0 on I1 and f_cross changes from positive to negative, then I1 contains exactly one primitive critical point",
      sampled_witness:
        topologyByCell.I1?.sampled_forcing_zero_count === 1 &&
        topologyByCell.I1?.sampled_derivative_zero_count === 0 &&
        topologyByCell.I1?.derivative_signs?.unique?.length === 1 &&
        topologyByCell.I1?.derivative_signs?.unique?.[0] === "-",
      emitted_candidate_ids: ["I1.z1"],
    },
    {
      reduction_row_id: "I2",
      source_cell: "I2",
      forcing_topology_class: topologyByCell.I2?.topology_class,
      certified_theorem_condition:
        "if f'_cross has one positive-to-negative turn before the unique positive-to-negative f_cross zero, then I2 contains exactly one primitive critical point",
      sampled_witness:
        topologyByCell.I2?.sampled_forcing_zero_count === 1 &&
        topologyByCell.I2?.sampled_derivative_zero_count === 1 &&
        topologyByCell.I2?.derivative_zero_rows?.[0]?.theta <
          topologyByCell.I2?.forcing_zero_rows?.[0]?.theta,
      emitted_candidate_ids: ["I2.z1"],
    },
    {
      reduction_row_id: "I3",
      source_cell: "I3",
      forcing_topology_class: topologyByCell.I3?.topology_class,
      certified_theorem_condition:
        "if f'_cross>0 on I3 and f_cross remains negative, then I3 emits no primitive critical point",
      sampled_witness:
        topologyByCell.I3?.sampled_forcing_zero_count === 0 &&
        topologyByCell.I3?.sampled_derivative_zero_count === 0 &&
        topologyByCell.I3?.derivative_signs?.unique?.length === 1 &&
        topologyByCell.I3?.derivative_signs?.unique?.[0] === "+" &&
        topologyByCell.I3?.forcing_signs?.unique?.length === 1 &&
        topologyByCell.I3?.forcing_signs?.unique?.[0] === "-",
      emitted_candidate_ids: [],
    },
    {
      reduction_row_id: "folds-and-quarter-endpoints",
      source_cell: "boundary",
      forcing_topology_class: "fold-square-endpoint-boundaries",
      certified_theorem_condition:
        "include 0, Q, and the two source-atlas fold endpoints as primitive boundary candidates because the regular-cell derivative formula does not apply at folds",
      sampled_witness:
        topologyCandidateIds.join("|") === criticalCandidateIds.join("|"),
      emitted_candidate_ids: ["endpoint.0", "fold.3-", "fold.2+", "endpoint.Q"],
    },
  ];
}

function buildFiniteCandidateTheorem({ reductionRows }) {
  const sampledWitness = reductionRows.every((row) => row.sampled_witness === true);
  return {
    theorem_name:
      "conditional fold-aware cross-binary finite-candidate reduction",
    theorem_scope:
      "representative receiver 1+ cross-binary quarter profile on [0,Q]",
    statement:
      "On the source-atlas-aware regular cells, certified derivative-sign topology for f_cross, together with fold-square endpoint inclusion, reduces the primitive extrema of A(u)=int_0^u f_cross(q)dq to exactly {0,u1,theta_3-,u2,theta_2+,Q}.",
    proof_route: [
      "Use A'_cross=f_cross and A''_cross=f'_cross on each regular cell.",
      "Apply the one-dimensional monotonicity theorem on I1 to get one regular critical point.",
      "Apply the one-turn derivative topology on I2 to get one regular critical point after the crest.",
      "Use negative forcing on I3 to exclude regular critical points there.",
      "Add quarter endpoints and fold endpoint limits because ordinary regular-cell differentiation is not valid at folds.",
      "Evaluate only the resulting finite candidate set to determine C_cross, m_Q, and M_Q once interval quadrature enclosures are available.",
    ],
    sampled_witness_status: sampledWitness
      ? "sampled-topology-satisfies-finite-candidate-reduction-hypotheses"
      : "sampled-topology-does-not-satisfy-finite-candidate-reduction-hypotheses",
    theorem_claim_level:
      "conditional theorem target with sampled witness rows; exact interval critical exhaustion remains open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryFiniteCandidateReduction(
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

  const topologyAtlas =
    buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      sourceQuadraturePanelsPerSegment,
      derivativeSamplesPerCell,
      topologySamplesPerCell,
    });
  const topologyErrors =
    validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas(topologyAtlas);
  const criticalValueAtlas =
    buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      quadraturePanelsPerSegment: valueQuadraturePanelsPerSegment,
    });
  const criticalValueErrors =
    validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas(criticalValueAtlas);
  const reductionRows = buildReductionRows({ topologyAtlas, criticalValueAtlas });
  const valueMarginRows = buildValueMarginRows(
    criticalValueAtlas.candidate_value_rows
  );
  const extremumMarginBudgets = buildExtremumMarginBudgets(criticalValueAtlas);
  const finiteCandidateTheorem = buildFiniteCandidateTheorem({ reductionRows });
  const candidateIdsMatch =
    topologyAtlas.topology_candidate_set.candidates
      .map((candidate) => candidate.candidate_id)
      .join("|") ===
    criticalValueAtlas.candidate_value_rows
      .map((candidate) => candidate.candidate_id)
      .join("|");
  const reductionPassed =
    topologyErrors.length === 0 &&
    criticalValueErrors.length === 0 &&
    candidateIdsMatch &&
    reductionRows.every((row) => row.sampled_witness === true) &&
    extremumMarginBudgets.status === "sampled-extremum-margin-budgets-positive";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_CANDIDATE_REDUCTION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-forcing-topology-atlas.md",
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-finite-candidate-reduction.md",
    source_forcing_topology_atlas_check: {
      schema: topologyAtlas.schema,
      valid: topologyErrors.length === 0,
      errors: topologyErrors,
      theory_status: topologyAtlas.result.theory_status,
      retained_branch: topologyAtlas.result.retained_branch,
      sampled_forcing_topology_certified:
        topologyAtlas.artifact_claim.certifies_sampled_regular_cell_forcing_topology ===
        true,
      certifies_interval_critical_exhaustion:
        topologyAtlas.artifact_claim.certifies_interval_critical_exhaustion ===
        true,
    },
    source_critical_value_atlas_check: {
      schema: criticalValueAtlas.schema,
      valid: criticalValueErrors.length === 0,
      errors: criticalValueErrors,
      theory_status: criticalValueAtlas.result.theory_status,
      retained_branch: criticalValueAtlas.result.retained_branch,
      sampled_critical_value_atlas_certified:
        criticalValueAtlas.artifact_claim.certifies_sampled_critical_value_atlas ===
        true,
      certifies_C_m_Q_M_Q_interval_enclosure:
        criticalValueAtlas.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure ===
        true,
    },
    reduction_parameters: {
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
        topologyAtlas.topology_parameters.speed_ratio_estimate,
      speed_ratio_enclosure:
        topologyAtlas.topology_parameters.speed_ratio_enclosure,
    },
    finite_candidate_theorem: finiteCandidateTheorem,
    reduction_rows: reductionRows,
    finite_candidate_set: {
      candidate_ids: candidateIds(criticalValueAtlas.candidate_value_rows),
      candidate_count: criticalValueAtlas.candidate_value_rows.length,
      candidate_ids_match_topology: candidateIdsMatch,
      status: candidateIdsMatch
        ? "sampled-finite-candidate-set-aligned-with-topology"
        : "sampled-finite-candidate-set-alignment-open",
    },
    sampled_value_margin_rows: valueMarginRows,
    extremum_margin_budgets: extremumMarginBudgets,
    interval_closure_budget: {
      certified_extrema_if:
        "interval critical exhaustion proves the finite candidate set, and candidate value interval radii are below the listed equal-radius budgets",
      equal_radius_full_order_budget: formatSmallNumber(
        Math.min(
          ...valueMarginRows.map((row) =>
            Number(row.equal_radius_ordering_budget)
          )
        )
      ),
      equal_radius_M_Q_budget:
        extremumMarginBudgets.equal_radius_M_Q_certification_budget,
      equal_radius_m_Q_budget:
        extremumMarginBudgets.equal_radius_m_Q_certification_budget,
      negative_C_cross_budget: extremumMarginBudgets.negative_C_cross_budget,
      positive_M_Q_budget: extremumMarginBudgets.positive_M_Q_budget,
      status: reductionPassed
        ? "sampled-margin-closure-budgets-derived"
        : "sampled-margin-closure-budgets-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_conditional_finite_candidate_reduction: true,
      certifies_sampled_topology_witness_for_reduction: reductionPassed,
      certifies_sampled_candidate_value_margin_budgets: reductionPassed,
      certifies_sampled_C_m_Q_M_Q_margin_budgets: reductionPassed,
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
        "conditional finite-candidate theorem and sampled value-margin budgets for the representative cross-binary quarter profile; interval critical exhaustion, interval quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: reductionPassed
        ? "sampled-source-atlas-aware-finite-candidate-reduction-certified"
        : "source-atlas-aware-finite-candidate-reduction-open",
      first_successor_row:
        "source-atlas-aware-interval-critical-exhaustion-and-quadrature-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The forcing-topology and critical-value rows now imply a conditional finite-candidate theorem: interval sign topology would reduce A extrema to the six known candidates, and interval quadrature radii below the computed margins would certify C_cross, m_Q, and M_Q. The present packet supplies sampled witnesses and exact margin budgets, not interval closure.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryFiniteCandidateReduction(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_CANDIDATE_REDUCTION_SCHEMA,
    "schema must match finite candidate reduction schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match finite candidate reduction packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_forcing_topology_atlas_check?.valid === true &&
      artifact?.source_forcing_topology_atlas_check
        ?.sampled_forcing_topology_certified === true &&
      artifact?.source_forcing_topology_atlas_check
        ?.certifies_interval_critical_exhaustion === false,
    "source forcing topology atlas must validate without interval critical exhaustion",
    errors
  );
  assertField(
    artifact?.source_critical_value_atlas_check?.valid === true &&
      artifact?.source_critical_value_atlas_check
        ?.sampled_critical_value_atlas_certified === true &&
      artifact?.source_critical_value_atlas_check
        ?.certifies_C_m_Q_M_Q_interval_enclosure === false,
    "source critical value atlas must validate without interval value enclosures",
    errors
  );
  assertField(
    artifact?.reduction_parameters?.speed_constraint ===
      "none; uses the certified positive speed-ratio zero enclosure only",
    "finite candidate reduction must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.finite_candidate_theorem?.sampled_witness_status ===
      "sampled-topology-satisfies-finite-candidate-reduction-hypotheses" &&
      artifact?.finite_candidate_theorem?.theorem_claim_level ===
        "conditional theorem target with sampled witness rows; exact interval critical exhaustion remains open",
    "finite candidate theorem must state conditional claim level and sampled witness status",
    errors
  );
  assertField(
    Array.isArray(artifact?.reduction_rows) &&
      artifact.reduction_rows.length === 4 &&
      artifact.reduction_rows.every((row) => row.sampled_witness === true),
    "finite candidate reduction must emit four sampled witness reduction rows",
    errors
  );
  assertField(
    artifact?.finite_candidate_set?.candidate_count === 6 &&
      artifact?.finite_candidate_set?.candidate_ids_match_topology === true &&
      artifact?.finite_candidate_set?.status ===
        "sampled-finite-candidate-set-aligned-with-topology",
    "finite candidate set must align topology candidates with critical-value candidates",
    errors
  );
  assertField(
    artifact?.extremum_margin_budgets?.sampled_M_Q_candidate_id === "I1.z1" &&
      artifact?.extremum_margin_budgets?.sampled_m_Q_candidate_id ===
        "endpoint.Q" &&
      Number(
        artifact?.extremum_margin_budgets?.sampled_M_Q_gap_to_second
      ) > 0 &&
      Number(
        artifact?.extremum_margin_budgets?.sampled_m_Q_gap_to_second
      ) > 0 &&
      artifact?.extremum_margin_budgets?.status ===
        "sampled-extremum-margin-budgets-positive",
    "finite candidate reduction must derive positive sampled extremum margins",
    errors
  );
  assertField(
    Number(artifact?.interval_closure_budget?.equal_radius_full_order_budget) >
      0 &&
      Number(artifact?.interval_closure_budget?.equal_radius_M_Q_budget) > 0 &&
      Number(artifact?.interval_closure_budget?.equal_radius_m_Q_budget) > 0 &&
      Number(artifact?.interval_closure_budget?.negative_C_cross_budget) > 0 &&
      artifact?.interval_closure_budget?.status ===
        "sampled-margin-closure-budgets-derived",
    "finite candidate reduction must derive positive sampled interval closure budgets",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_conditional_finite_candidate_reduction ===
      true &&
      artifact?.artifact_claim?.certifies_sampled_topology_witness_for_reduction ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_candidate_value_margin_budgets ===
        true &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.certifies_C_m_Q_M_Q_interval_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_cross_binary_coarea_interval_profile ===
        false &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must certify only conditional/sampled reduction rows and leave interval/live-ledger rows open",
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
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-finite-candidate-reduction.mjs [options]",
    "",
    "Options:",
    "  --topology-samples-per-cell <n>       Regular-cell forcing topology samples per cell (default: 48)",
    "  --derivative-samples-per-cell <n>     Source derivative atlas samples per cell (default: 8)",
    "  --scan-subdivisions <n>               Primitive critical scan samples per cell (default: 96)",
    "  --source-quadrature-panels <n>        Source critical-value quadrature panels per segment for topology predecessor (default: 96)",
    "  --value-quadrature-panels <n>         Candidate-value quadrature panels per segment (default: 384)",
    "  --subdivisions <n>                    Root search subdivisions (default: 5000)",
    "  --out <path>                          Write artifact JSON to path instead of stdout",
    "  --validate <path>                     Validate an existing artifact JSON file",
    "  --schema                              Print the artifact schema identifier",
    "  --pretty                              Pretty-print JSON output",
    "  --help                                Print this help text",
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_CANDIDATE_REDUCTION_SCHEMA
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryFiniteCandidateReduction(artifact);
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      process.exitCode = 1;
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryFiniteCandidateReduction(args);
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

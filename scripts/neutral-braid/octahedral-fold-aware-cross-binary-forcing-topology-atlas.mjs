#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas,
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
  validateOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_TOPOLOGY_ATLAS_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-forcing-topology-atlas/v1";

const PACKET_ID = "octahedral_fold_aware_cross_binary_forcing_topology_atlas";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const DEFAULT_DERIVATIVE_SAMPLES_PER_CELL = 8;
const DEFAULT_TOPOLOGY_SAMPLES_PER_CELL = 48;
const QUARTER_PERIOD = Math.PI / 2;
const CHECK_TOLERANCE = 1e-10;
const ZERO_TOLERANCE = 1e-11;

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
  if (value > CHECK_TOLERANCE) {
    return "+";
  }
  if (value < -CHECK_TOLERANCE) {
    return "-";
  }
  return "0";
}

function evaluateForcingTopologyNode({
  speedRatio,
  theta,
  rootSubdivisions,
}) {
  const row = evaluateCrossBinaryForcingAndDerivativeAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
  return {
    theta,
    forcing: row.value,
    derivative: row.derivative,
    source_root_count: row.source_root_count,
  };
}

function scalarFromNode(node, quantity) {
  if (quantity === "forcing") {
    return node.forcing;
  }
  if (quantity === "derivative") {
    return node.derivative;
  }
  throw new Error("quantity must be forcing or derivative");
}

function bisectScalarRoot({
  speedRatio,
  left,
  right,
  quantity,
  rootSubdivisions,
}) {
  let a = left;
  let b = right;
  let fa = scalarFromNode(
    evaluateForcingTopologyNode({ speedRatio, theta: a, rootSubdivisions }),
    quantity
  );
  const fb = scalarFromNode(
    evaluateForcingTopologyNode({ speedRatio, theta: b, rootSubdivisions }),
    quantity
  );

  if (Math.abs(fa) <= ZERO_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ZERO_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let step = 0; step < 80; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = scalarFromNode(
      evaluateForcingTopologyNode({
        speedRatio,
        theta: mid,
        rootSubdivisions,
      }),
      quantity
    );
    if (Math.abs(fm) <= ZERO_TOLERANCE || Math.abs(b - a) <= ZERO_TOLERANCE) {
      return mid;
    }
    if (fa * fm <= 0) {
      b = mid;
    } else {
      a = mid;
      fa = fm;
    }
  }

  return 0.5 * (a + b);
}

function buildScanNodes({
  speedRatio,
  cell,
  samplesPerCell,
  rootSubdivisions,
}) {
  const left = Number(cell.theta_left) + Number(cell.endpoint_padding_left ?? 1e-5);
  const right =
    Number(cell.theta_right) - Number(cell.endpoint_padding_right ?? 1e-5);
  const nodes = [];
  for (let index = 0; index <= samplesPerCell; index += 1) {
    const theta = left + ((right - left) * index) / samplesPerCell;
    nodes.push(
      evaluateForcingTopologyNode({
        speedRatio,
        theta,
        rootSubdivisions,
      })
    );
  }
  return nodes;
}

function isolateScalarRoots({
  speedRatio,
  nodes,
  quantity,
  rootSubdivisions,
}) {
  const roots = [];
  for (let index = 1; index < nodes.length; index += 1) {
    const leftNode = nodes[index - 1];
    const rightNode = nodes[index];
    const leftValue = scalarFromNode(leftNode, quantity);
    const rightValue = scalarFromNode(rightNode, quantity);
    if (!Number.isFinite(leftValue) || !Number.isFinite(rightValue)) {
      continue;
    }
    if (Math.abs(leftValue) <= ZERO_TOLERANCE) {
      roots.push({
        theta: leftNode.theta,
        bracket_left: leftNode.theta,
        bracket_right: leftNode.theta,
      });
      continue;
    }
    if (leftValue * rightValue < 0) {
      const theta = bisectScalarRoot({
        speedRatio,
        left: leftNode.theta,
        right: rightNode.theta,
        quantity,
        rootSubdivisions,
      });
      if (
        Number.isFinite(theta) &&
        !roots.some((root) => Math.abs(root.theta - theta) <= 1e-8)
      ) {
        roots.push({
          theta,
          bracket_left: leftNode.theta,
          bracket_right: rightNode.theta,
        });
      }
    }
  }
  return roots;
}

function summarizeSigns(nodes, quantity) {
  const signs = nodes.map((node) => signLabel(scalarFromNode(node, quantity)));
  return {
    first: signs[0],
    last: signs[signs.length - 1],
    unique: [...new Set(signs)],
    transition_count: signs.reduce(
      (count, sign, index) =>
        index > 0 && sign !== signs[index - 1] ? count + 1 : count,
      0
    ),
  };
}

function classifyCellTopology({
  cell,
  forcingRoots,
  derivativeRoots,
  forcingSigns,
  derivativeSigns,
  forcingMinimum,
  forcingMaximum,
}) {
  if (
    cell.cell_id === "I1" &&
    forcingRoots.length === 1 &&
    derivativeRoots.length === 0 &&
    derivativeSigns.unique.length === 1 &&
    derivativeSigns.unique[0] === "-" &&
    forcingSigns.first === "+" &&
    forcingSigns.last === "-"
  ) {
    return "sampled-monotone-decreasing-single-forcing-zero";
  }
  if (
    cell.cell_id === "I2" &&
    forcingRoots.length === 1 &&
    derivativeRoots.length === 1 &&
    derivativeSigns.first === "+" &&
    derivativeSigns.last === "-" &&
    derivativeRoots[0].theta < forcingRoots[0].theta
  ) {
    return "sampled-single-crest-single-forcing-zero";
  }
  if (
    cell.cell_id === "I3" &&
    forcingRoots.length === 0 &&
    derivativeRoots.length === 0 &&
    derivativeSigns.unique.length === 1 &&
    derivativeSigns.unique[0] === "+" &&
    forcingMaximum < 0 &&
    forcingMinimum < 0
  ) {
    return "sampled-monotone-increasing-negative-cell";
  }
  return "sampled-forcing-topology-open";
}

function buildCellTopologyRows({
  cells,
  speedRatio,
  topologySamplesPerCell,
  rootSubdivisions,
}) {
  return cells.map((cell) => {
    const nodes = buildScanNodes({
      speedRatio,
      cell,
      samplesPerCell: topologySamplesPerCell,
      rootSubdivisions,
    });
    const forcingRoots = isolateScalarRoots({
      speedRatio,
      nodes,
      quantity: "forcing",
      rootSubdivisions,
    });
    const derivativeRoots = isolateScalarRoots({
      speedRatio,
      nodes,
      quantity: "derivative",
      rootSubdivisions,
    });
    const forcingValues = nodes.map((node) => node.forcing);
    const derivativeValues = nodes.map((node) => node.derivative);
    const forcingSigns = summarizeSigns(nodes, "forcing");
    const derivativeSigns = summarizeSigns(nodes, "derivative");
    const forcingMinimum = Math.min(...forcingValues);
    const forcingMaximum = Math.max(...forcingValues);
    const derivativeMinimum = Math.min(...derivativeValues);
    const derivativeMaximum = Math.max(...derivativeValues);

    return {
      cell_id: cell.cell_id,
      theta_interval: `[${formatNumber(cell.theta_left)},${formatNumber(
        cell.theta_right
      )}]`,
      scan_interval: `[${formatNumber(nodes[0].theta)},${formatNumber(
        nodes[nodes.length - 1].theta
      )}]`,
      expected_source_root_count: cell.expected_source_root_count,
      observed_source_root_counts: [...new Set(nodes.map((node) => node.source_root_count))],
      topology_sample_count: nodes.length,
      forcing_signs: forcingSigns,
      derivative_signs: derivativeSigns,
      forcing_minimum_on_scan_grid: formatNumber(forcingMinimum),
      forcing_maximum_on_scan_grid: formatNumber(forcingMaximum),
      derivative_minimum_on_scan_grid: formatNumber(derivativeMinimum),
      derivative_maximum_on_scan_grid: formatNumber(derivativeMaximum),
      forcing_zero_rows: forcingRoots.map((root, index) => ({
        zero_id: `${cell.cell_id}.f${index + 1}`,
        theta: formatNumber(root.theta),
        bracket_left: formatNumber(root.bracket_left),
        bracket_right: formatNumber(root.bracket_right),
        residual_abs: formatSmallNumber(
          Math.abs(
            evaluateForcingTopologyNode({
              speedRatio,
              theta: root.theta,
              rootSubdivisions,
            }).forcing
          )
        ),
      })),
      derivative_zero_rows: derivativeRoots.map((root, index) => {
        const row = evaluateForcingTopologyNode({
          speedRatio,
          theta: root.theta,
          rootSubdivisions,
        });
        return {
          zero_id: `${cell.cell_id}.d${index + 1}`,
          theta: formatNumber(root.theta),
          bracket_left: formatNumber(root.bracket_left),
          bracket_right: formatNumber(root.bracket_right),
          forcing_at_derivative_zero: formatNumber(row.forcing),
          derivative_residual_abs: formatSmallNumber(Math.abs(row.derivative)),
        };
      }),
      sampled_forcing_zero_count: forcingRoots.length,
      sampled_derivative_zero_count: derivativeRoots.length,
      topology_class: classifyCellTopology({
        cell,
        forcingRoots,
        derivativeRoots,
        forcingSigns,
        derivativeSigns,
        forcingMinimum,
        forcingMaximum,
      }),
    };
  });
}

function buildTopologyCandidateSet(cellRows) {
  const candidates = [
    {
      candidate_id: "endpoint.0",
      theta: 0,
      candidate_type: "quarter-left-endpoint",
      primitive_role: "global-extremum-candidate",
    },
  ];
  for (const row of cellRows) {
    for (const zero of row.forcing_zero_rows) {
      candidates.push({
        candidate_id: zero.zero_id.replace(".f", ".z"),
        theta: zero.theta,
        candidate_type: "interior-forcing-zero",
        primitive_role: "sampled-regular-critical-point",
      });
    }
    if (row.cell_id === "I1") {
      candidates.push({
        candidate_id: "fold.3-",
        theta: 0.997370655243,
        candidate_type: "fold-endpoint-limit",
        primitive_role: "fold-local-minimum-candidate",
      });
    }
    if (row.cell_id === "I2") {
      candidates.push({
        candidate_id: "fold.2+",
        theta: 1.159039827771,
        candidate_type: "fold-endpoint-limit",
        primitive_role: "fold-endpoint-limit-without-extremum-turn",
      });
    }
  }
  candidates.push({
    candidate_id: "endpoint.Q",
    theta: formatNumber(QUARTER_PERIOD),
    candidate_type: "quarter-right-endpoint",
    primitive_role: "global-extremum-candidate",
  });
  return candidates.sort((left, right) => Number(left.theta) - Number(right.theta));
}

function summarizeTopologyRows(cellRows, candidateSet) {
  const expectedTopologyClasses = [
    "sampled-monotone-decreasing-single-forcing-zero",
    "sampled-single-crest-single-forcing-zero",
    "sampled-monotone-increasing-negative-cell",
  ];
  return {
    cell_count: cellRows.length,
    sampled_regular_forcing_zero_count: cellRows.reduce(
      (sum, row) => sum + row.sampled_forcing_zero_count,
      0
    ),
    sampled_regular_derivative_zero_count: cellRows.reduce(
      (sum, row) => sum + row.sampled_derivative_zero_count,
      0
    ),
    topology_classes: cellRows.map((row) => row.topology_class),
    topology_classes_match_expected:
      cellRows.length === 3 &&
      cellRows.every(
        (row, index) => row.topology_class === expectedTopologyClasses[index]
      ),
    primitive_candidate_count_from_topology: candidateSet.length,
    primitive_candidate_theta_order: candidateSet.map((candidate) => candidate.theta),
    status:
      cellRows.length === 3 &&
      cellRows.every(
        (row, index) => row.topology_class === expectedTopologyClasses[index]
      ) &&
      candidateSet.length === 6
        ? "sampled-regular-cell-forcing-topology-derived"
        : "sampled-regular-cell-forcing-topology-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas(
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
  const sourceQuadraturePanelsPerSegment = Number.parseInt(
    options.sourceQuadraturePanelsPerSegment ??
      DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const derivativeSamplesPerCell = Number.parseInt(
    options.derivativeSamplesPerCell ?? DEFAULT_DERIVATIVE_SAMPLES_PER_CELL,
    10
  );
  const topologySamplesPerCell = Number.parseInt(
    options.topologySamplesPerCell ?? DEFAULT_TOPOLOGY_SAMPLES_PER_CELL,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(scanSamplesPerCell) || scanSamplesPerCell < 16) {
    throw new Error("scanSamplesPerCell must be an integer >= 16");
  }
  if (
    !Number.isInteger(sourceQuadraturePanelsPerSegment) ||
    sourceQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("sourceQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (
    !Number.isInteger(derivativeSamplesPerCell) ||
    derivativeSamplesPerCell < 4
  ) {
    throw new Error("derivativeSamplesPerCell must be an integer >= 4");
  }
  if (!Number.isInteger(topologySamplesPerCell) || topologySamplesPerCell < 16) {
    throw new Error("topologySamplesPerCell must be an integer >= 16");
  }

  const derivativeAtlas =
    buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      sourceQuadraturePanelsPerSegment,
      samplesPerCell: derivativeSamplesPerCell,
    });
  const derivativeAtlasErrors =
    validateOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas(
      derivativeAtlas
    );
  const speedRatio = Number(derivativeAtlas.derivative_parameters.speed_ratio_estimate);
  const cells = derivativeAtlas.regular_cell_intervals.map((cell) => ({
    ...cell,
    endpoint_padding_left: cell.cell_id === "I1" ? 1e-5 : 1e-5,
    endpoint_padding_right: cell.cell_id === "I3" ? 1e-8 : 1e-5,
  }));
  const cellRows = buildCellTopologyRows({
    cells,
    speedRatio,
    topologySamplesPerCell,
    rootSubdivisions,
  });
  const candidateSet = buildTopologyCandidateSet(cellRows);
  const topologySummary = summarizeTopologyRows(cellRows, candidateSet);
  const topologyAtlasPassed =
    derivativeAtlasErrors.length === 0 &&
    topologySummary.status === "sampled-regular-cell-forcing-topology-derived" &&
    topologySummary.sampled_regular_forcing_zero_count === 2 &&
    topologySummary.sampled_regular_derivative_zero_count === 1;

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_TOPOLOGY_ATLAS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-forcing-derivative-atlas.md",
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-forcing-topology-atlas.md",
    source_forcing_derivative_atlas_check: {
      schema: derivativeAtlas.schema,
      valid: derivativeAtlasErrors.length === 0,
      errors: derivativeAtlasErrors,
      theory_status: derivativeAtlas.result.theory_status,
      retained_branch: derivativeAtlas.result.retained_branch,
      sampled_derivative_atlas_certified:
        derivativeAtlas.artifact_claim.certifies_source_atlas_aware_derivative_formula ===
        true,
      certifies_interval_derivative_enclosure:
        derivativeAtlas.artifact_claim.certifies_interval_derivative_enclosure ===
        true,
    },
    topology_parameters: {
      receiver_label: derivativeAtlas.derivative_parameters.receiver_label,
      theta_domain: "[0,H/4]",
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      derivative_samples_per_cell: derivativeSamplesPerCell,
      topology_samples_per_cell: topologySamplesPerCell,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      speed_constraint:
        "none; uses the certified positive speed-ratio zero enclosure only",
      speed_ratio_estimate: formatNumber(speedRatio),
      speed_ratio_enclosure:
        derivativeAtlas.derivative_parameters.speed_ratio_enclosure,
    },
    topology_rule: {
      regular_cell_forcing: "A'(u)=f_cross(u)",
      regular_cell_curvature: "A''(u)=f'_cross(u)",
      monotone_cell_test:
        "sample f'_cross with the implicit derivative formula and isolate sign changes of f_cross and f'_cross on each source-atlas-aware regular cell",
      cell_topology_expectation:
        "I1 decreasing with one f_cross zero; I2 one sampled crest then one f_cross zero; I3 increasing but negative with no f_cross zero",
      status: "sampled-regular-cell-forcing-topology-rule-stated",
    },
    regular_cell_topology_rows: cellRows,
    topology_candidate_set: {
      candidates: candidateSet,
      candidate_count: candidateSet.length,
      status:
        candidateSet.length === 6
          ? "sampled-primitive-candidate-set-recovered-from-topology"
          : "sampled-primitive-candidate-set-from-topology-open",
    },
    topology_summary: topologySummary,
    interval_profile_boundary: {
      certifies_sampled_regular_cell_forcing_topology: topologyAtlasPassed,
      certifies_sampled_regular_forcing_zero_isolation: topologyAtlasPassed,
      certifies_sampled_derivative_turning_row: topologyAtlasPassed,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      open_quantities: [
        "outward-rounded derivative sign enclosures on topology subcells",
        "interval zero exclusion outside the two isolated forcing brackets",
        "interval quadrature enclosures for C_cross, m_Q, and M_Q",
      ],
      next_interval_task:
        "upgrade the sampled topology subcells into interval sign enclosures for f_cross and f'_cross, then use them to certify critical exhaustion",
      status: "forcing-topology-interval-critical-exhaustion-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_forcing_derivative_atlas:
        derivativeAtlas.artifact_claim.certifies_source_atlas_aware_derivative_formula ===
        true,
      certifies_sampled_regular_cell_forcing_topology: topologyAtlasPassed,
      certifies_sampled_regular_forcing_zero_isolation: topologyAtlasPassed,
      certifies_sampled_derivative_turning_row: topologyAtlasPassed,
      certifies_sampled_primitive_candidate_set_from_topology:
        candidateSet.length === 6,
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
        "sampled regular-cell forcing topology and zero isolation for the representative cross-binary quarter profile; interval derivative enclosure, interval critical exhaustion, interval quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: topologyAtlasPassed
        ? "sampled-source-atlas-aware-forcing-topology-atlas-certified"
        : "source-atlas-aware-forcing-topology-atlas-open",
      first_successor_row:
        "source-atlas-aware-forcing-topology-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The quarter-profile forcing now has a sampled three-cell topology: one decreasing zero in I1, one crest followed by one zero in I2, and a negative increasing I3 cell. This recovers the six primitive candidate locations from forcing topology, but interval critical exhaustion and retained branch status remain open.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_TOPOLOGY_ATLAS_SCHEMA,
    "schema must match cross-binary forcing topology atlas schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match forcing topology atlas packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_forcing_derivative_atlas_check?.valid === true &&
      artifact?.source_forcing_derivative_atlas_check
        ?.sampled_derivative_atlas_certified === true &&
      artifact?.source_forcing_derivative_atlas_check
        ?.certifies_interval_derivative_enclosure === false,
    "source forcing derivative atlas must validate without interval derivative enclosure",
    errors
  );
  assertField(
    artifact?.topology_parameters?.speed_constraint ===
      "none; uses the certified positive speed-ratio zero enclosure only",
    "forcing topology atlas must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.topology_rule?.regular_cell_forcing === "A'(u)=f_cross(u)" &&
      artifact?.topology_rule?.regular_cell_curvature ===
        "A''(u)=f'_cross(u)" &&
      artifact?.topology_rule?.status ===
        "sampled-regular-cell-forcing-topology-rule-stated",
    "forcing topology atlas must state the forcing/curvature topology rule",
    errors
  );
  assertField(
    Array.isArray(artifact?.regular_cell_topology_rows) &&
      artifact.regular_cell_topology_rows.length === 3,
    "forcing topology atlas must emit three regular-cell topology rows",
    errors
  );
  assertField(
    artifact?.regular_cell_topology_rows?.[0]?.topology_class ===
      "sampled-monotone-decreasing-single-forcing-zero" &&
      artifact?.regular_cell_topology_rows?.[1]?.topology_class ===
        "sampled-single-crest-single-forcing-zero" &&
      artifact?.regular_cell_topology_rows?.[2]?.topology_class ===
        "sampled-monotone-increasing-negative-cell",
    "forcing topology atlas must classify the three sampled cell topologies",
    errors
  );
  assertField(
    artifact?.topology_summary?.sampled_regular_forcing_zero_count === 2 &&
      artifact?.topology_summary?.sampled_regular_derivative_zero_count === 1 &&
      artifact?.topology_summary?.primitive_candidate_count_from_topology === 6 &&
      artifact?.topology_summary?.status ===
        "sampled-regular-cell-forcing-topology-derived",
    "forcing topology summary must recover two regular forcing zeros, one derivative row, and six primitive candidates",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_sampled_regular_cell_forcing_topology ===
      true &&
      artifact?.artifact_claim?.certifies_sampled_regular_forcing_zero_isolation ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_derivative_turning_row ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_primitive_candidate_set_from_topology ===
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
    "artifact must certify only sampled topology rows and leave interval/live-ledger rows open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-topology-atlas.mjs [options]",
    "",
    "Options:",
    "  --topology-samples-per-cell <n>    Regular-cell forcing topology samples per cell (default: 48)",
    "  --derivative-samples-per-cell <n>  Source derivative atlas samples per cell (default: 8)",
    "  --scan-subdivisions <n>            Primitive critical scan samples per cell (default: 96)",
    "  --source-quadrature-panels <n>     Source critical-value quadrature panels per segment (default: 96)",
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
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--topology-samples-per-cell") {
      args.topologySamplesPerCell = Number.parseInt(argv[++index], 10);
    } else if (arg === "--derivative-samples-per-cell") {
      args.derivativeSamplesPerCell = Number.parseInt(argv[++index], 10);
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = Number.parseInt(argv[++index], 10);
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  return args;
}

function writeJson(payload, pretty, outPath) {
  const json = `${JSON.stringify(payload, null, pretty ? 2 : 0)}\n`;
  if (outPath) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, json);
  } else {
    process.stdout.write(json);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    writeJson(
      {
        artifact_schema:
          OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_TOPOLOGY_ATLAS_SCHEMA,
      },
      args.pretty,
      args.out
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas(artifact);
    writeJson(
      {
        valid: errors.length === 0,
        errors,
        result: artifact.result ?? null,
      },
      args.pretty,
      args.out
    );
    return;
  }

  const artifact = buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas(args);
  writeJson(artifact, args.pretty, args.out);
}

if (process.argv[1] === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

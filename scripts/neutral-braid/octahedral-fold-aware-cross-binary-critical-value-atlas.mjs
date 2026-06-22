#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas,
  evaluateCrossBinaryQuarterForcingAtTheta,
  validateOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas,
} from "./octahedral-fold-aware-cross-binary-primitive-critical-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_CRITICAL_VALUE_ATLAS_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-critical-value-atlas/v1";

const PACKET_ID = "octahedral_fold_aware_cross_binary_critical_value_atlas";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_QUADRATURE_PANELS_PER_SEGMENT = 384;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const RECEIVER_LABEL = "1+";
const QUARTER_PERIOD = Math.PI / 2;
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

function isFoldEndpointCandidate(candidate) {
  return candidate?.candidate_type === "fold-endpoint-limit";
}

function transformedMidpointNode({ left, right, coordinate, leftFold, rightFold }) {
  const length = right - left;
  if (leftFold && rightFold) {
    const phase = Math.PI * coordinate;
    return {
      theta: left + length * (0.5 - 0.5 * Math.cos(phase)),
      jacobian: 0.5 * Math.PI * length * Math.sin(phase),
      transform: "two-fold-sine-midpoint",
    };
  }
  if (leftFold) {
    return {
      theta: left + length * coordinate * coordinate,
      jacobian: 2 * length * coordinate,
      transform: "left-fold-square-midpoint",
    };
  }
  if (rightFold) {
    const distance = 1 - coordinate;
    return {
      theta: right - length * distance * distance,
      jacobian: 2 * length * distance,
      transform: "right-fold-square-midpoint",
    };
  }
  return {
    theta: left + length * coordinate,
    jacobian: length,
    transform: "regular-midpoint",
  };
}

function evaluateForcing({ speedRatio, theta, rootSubdivisions }) {
  return evaluateCrossBinaryQuarterForcingAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
}

export function evaluateCrossBinaryPrimitiveSegmentIntegral({
  speedRatio,
  leftTheta,
  rightTheta,
  leftFold = false,
  rightFold = false,
  quadraturePanelsPerSegment = DEFAULT_QUADRATURE_PANELS_PER_SEGMENT,
  rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS,
}) {
  const panels = Number.parseInt(quadraturePanelsPerSegment, 10);
  if (!Number.isInteger(panels) || panels < 32) {
    throw new Error("quadraturePanelsPerSegment must be an integer >= 32");
  }
  const left = Number(leftTheta);
  const right = Number(rightTheta);
  if (!(Number.isFinite(left) && Number.isFinite(right) && left < right)) {
    throw new Error("leftTheta and rightTheta must be finite with leftTheta < rightTheta");
  }

  let integral = 0;
  let forcingMinimum = Infinity;
  let forcingMaximum = -Infinity;
  let transform = null;
  for (let index = 0; index < panels; index += 1) {
    const coordinate = (index + 0.5) / panels;
    const node = transformedMidpointNode({
      left,
      right,
      coordinate,
      leftFold,
      rightFold,
    });
    transform = node.transform;
    const forcing = evaluateForcing({
      speedRatio,
      theta: node.theta,
      rootSubdivisions,
    });
    integral += (forcing * node.jacobian) / panels;
    forcingMinimum = Math.min(forcingMinimum, forcing);
    forcingMaximum = Math.max(forcingMaximum, forcing);
  }

  return {
    integral,
    forcingMinimum,
    forcingMaximum,
    transform,
  };
}

function buildSegmentRows({
  candidates,
  speedRatio,
  quadraturePanelsPerSegment,
  rootSubdivisions,
}) {
  const rows = [];
  let primitiveValue = 0;

  for (let index = 1; index < candidates.length; index += 1) {
    const leftCandidate = candidates[index - 1];
    const rightCandidate = candidates[index];
    const leftTheta = Number(leftCandidate.theta);
    const rightTheta = Number(rightCandidate.theta);
    const leftFold = isFoldEndpointCandidate(leftCandidate);
    const rightFold = isFoldEndpointCandidate(rightCandidate);
    const segment = evaluateCrossBinaryPrimitiveSegmentIntegral({
      speedRatio,
      leftTheta,
      rightTheta,
      leftFold,
      rightFold,
      quadraturePanelsPerSegment,
      rootSubdivisions,
    });
    primitiveValue += segment.integral;
    rows.push({
      segment_id: `S${index}`,
      left_candidate_id: leftCandidate.candidate_id,
      right_candidate_id: rightCandidate.candidate_id,
      theta_left: formatNumber(leftTheta),
      theta_right: formatNumber(rightTheta),
      left_candidate_type: leftCandidate.candidate_type,
      right_candidate_type: rightCandidate.candidate_type,
      left_fold_endpoint_limit: leftFold,
      right_fold_endpoint_limit: rightFold,
      quadrature_transform: segment.transform,
      quadrature_panels: quadraturePanelsPerSegment,
      integral_increment: formatNumber(segment.integral),
      cumulative_primitive_value: formatNumber(primitiveValue),
      sampled_forcing_minimum: formatNumber(segment.forcingMinimum),
      sampled_forcing_maximum: formatNumber(segment.forcingMaximum),
    });
  }

  return rows;
}

function classifyValueRole({ row, minimumTheta, maximumTheta, quarterEndpoint }) {
  if (Math.abs(Number(row.theta) - maximumTheta) <= 1e-9) {
    return "sampled-M_Q-candidate";
  }
  if (Math.abs(Number(row.theta) - minimumTheta) <= 1e-9) {
    return "sampled-m_Q-candidate";
  }
  if (Math.abs(Number(row.theta)) <= 1e-12) {
    return "quarter-left-endpoint-value";
  }
  if (Math.abs(Number(row.theta) - quarterEndpoint) <= 1e-9) {
    return "quarter-right-endpoint-value";
  }
  if (row.candidate_type === "fold-endpoint-limit") {
    return "fold-endpoint-limit-value";
  }
  return "regular-critical-value";
}

export function buildCrossBinaryPrimitiveCandidateValueRows({
  candidates,
  segmentRows,
}) {
  const rows = [
    {
      candidate_id: candidates[0].candidate_id,
      theta: candidates[0].theta,
      candidate_type: candidates[0].candidate_type,
      primitive_role: candidates[0].primitive_role,
      primitive_value: 0,
    },
  ];

  for (let index = 1; index < candidates.length; index += 1) {
    rows.push({
      candidate_id: candidates[index].candidate_id,
      theta: candidates[index].theta,
      candidate_type: candidates[index].candidate_type,
      primitive_role: candidates[index].primitive_role,
      primitive_value: segmentRows[index - 1].cumulative_primitive_value,
    });
  }

  const minimumRow = rows.reduce((best, row) =>
    Number(row.primitive_value) < Number(best.primitive_value) ? row : best
  );
  const maximumRow = rows.reduce((best, row) =>
    Number(row.primitive_value) > Number(best.primitive_value) ? row : best
  );
  return rows.map((row) => ({
    ...row,
    value_role: classifyValueRole({
      row,
      minimumTheta: Number(minimumRow.theta),
      maximumTheta: Number(maximumRow.theta),
      quarterEndpoint: QUARTER_PERIOD,
    }),
  }));
}

function buildCriticalValueSummary({ candidateValueRows }) {
  const minimumRow = candidateValueRows.reduce((best, row) =>
    Number(row.primitive_value) < Number(best.primitive_value) ? row : best
  );
  const maximumRow = candidateValueRows.reduce((best, row) =>
    Number(row.primitive_value) > Number(best.primitive_value) ? row : best
  );
  const endpointRow = candidateValueRows[candidateValueRows.length - 1];
  const quarterIntegral = Number(endpointRow.primitive_value);
  const sampledMinimum = Number(minimumRow.primitive_value);
  const sampledMaximum = Number(maximumRow.primitive_value);
  const centeredAverage = quarterIntegral / 2;
  const centeredExcursionRadius = Math.max(
    sampledMaximum - centeredAverage,
    centeredAverage - sampledMinimum
  );

  return {
    quarter_integral_C_cross: formatNumber(quarterIntegral),
    sampled_m_Q: formatNumber(sampledMinimum),
    sampled_m_Q_candidate_id: minimumRow.candidate_id,
    sampled_m_Q_theta: minimumRow.theta,
    sampled_M_Q: formatNumber(sampledMaximum),
    sampled_M_Q_candidate_id: maximumRow.candidate_id,
    sampled_M_Q_theta: maximumRow.theta,
    sampled_centered_average: formatNumber(centeredAverage),
    sampled_centered_excursion_radius: formatNumber(centeredExcursionRadius),
    value_order_by_theta: candidateValueRows.map((row) => ({
      candidate_id: row.candidate_id,
      theta: row.theta,
      primitive_value: row.primitive_value,
      value_role: row.value_role,
    })),
    value_order_low_to_high: [...candidateValueRows]
      .sort(
        (left, right) =>
          Number(left.primitive_value) - Number(right.primitive_value)
      )
      .map((row) => ({
        candidate_id: row.candidate_id,
        theta: row.theta,
        primitive_value: row.primitive_value,
      })),
    status: "sampled-critical-value-ordering-derived",
  };
}

export function buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas(
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
  const quadraturePanelsPerSegment = Number.parseInt(
    options.quadraturePanelsPerSegment ??
      DEFAULT_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(scanSamplesPerCell) || scanSamplesPerCell < 16) {
    throw new Error("scanSamplesPerCell must be an integer >= 16");
  }
  if (
    !Number.isInteger(quadraturePanelsPerSegment) ||
    quadraturePanelsPerSegment < 32
  ) {
    throw new Error("quadraturePanelsPerSegment must be an integer >= 32");
  }

  const primitiveAtlas =
    buildOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
    });
  const primitiveAtlasErrors =
    validateOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas(primitiveAtlas);
  const speedRatio = Number(primitiveAtlas.atlas_parameters.speed_ratio_estimate);
  const candidates = primitiveAtlas.primitive_extrema_candidate_set.candidates;
  const segmentRows = buildSegmentRows({
    candidates,
    speedRatio,
    quadraturePanelsPerSegment,
    rootSubdivisions,
  });
  const candidateValueRows = buildCrossBinaryPrimitiveCandidateValueRows({
    candidates,
    segmentRows,
  });
  const summary = buildCriticalValueSummary({ candidateValueRows });
  const criticalValueAtlasPassed =
    primitiveAtlasErrors.length === 0 &&
    candidateValueRows.length === 6 &&
    segmentRows.length === 5 &&
    summary.sampled_M_Q_candidate_id === "I1.z1" &&
    summary.sampled_m_Q_candidate_id === "endpoint.Q" &&
    Number(summary.sampled_M_Q) > 0 &&
    Number(summary.sampled_m_Q) < -0.26 &&
    Number(summary.quarter_integral_C_cross) === Number(summary.sampled_m_Q);

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_CRITICAL_VALUE_ATLAS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-primitive-critical-atlas.md",
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-critical-value-atlas.md",
    source_primitive_critical_atlas_check: {
      schema: primitiveAtlas.schema,
      valid: primitiveAtlasErrors.length === 0,
      errors: primitiveAtlasErrors,
      theory_status: primitiveAtlas.result.theory_status,
      retained_branch: primitiveAtlas.result.retained_branch,
      candidate_count: primitiveAtlas.primitive_extrema_candidate_set.candidate_count,
      candidate_set_status: primitiveAtlas.primitive_extrema_candidate_set.status,
      sampled_primitive_critical_atlas_certified:
        primitiveAtlas.artifact_claim.certifies_sampled_primitive_critical_atlas ===
        true,
    },
    quadrature_parameters: {
      receiver_label: RECEIVER_LABEL,
      theta_domain: "[0,H/4]",
      quadrature_panels_per_segment: quadraturePanelsPerSegment,
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      speed_constraint:
        "none; uses the certified positive speed-ratio zero enclosure only",
      speed_ratio_estimate: formatNumber(speedRatio),
      speed_ratio_enclosure: primitiveAtlas.atlas_parameters.speed_ratio_enclosure,
      quadrature_convention:
        "composite midpoint quadrature in transformed segment coordinates; square endpoint transforms at fold endpoint limits; not an interval quadrature certificate",
    },
    primitive_definition: {
      primitive: "A(u)=int_0^u f_cross(q)dq",
      evaluated_locations:
        "quarter endpoints, sampled regular critical roots, and fold endpoint limits from the primitive critical atlas",
      value_targets: ["C_cross", "m_Q", "M_Q"],
      status: "sampled-critical-values-evaluated-at-candidate-set",
    },
    segment_integral_rows: segmentRows,
    candidate_value_rows: candidateValueRows,
    critical_value_summary: summary,
    interval_profile_boundary: {
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      open_quantities: ["C_cross", "m_Q", "M_Q"],
      next_interval_task:
        "replace the transformed midpoint quadrature rows with interval quadrature and prove no additional critical roots exist on the three regular cells",
      status: "source-atlas-aware-critical-value-interval-proof-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_primitive_critical_atlas:
        primitiveAtlas.artifact_claim.certifies_sampled_primitive_critical_atlas ===
        true,
      certifies_sampled_critical_value_atlas: criticalValueAtlasPassed,
      certifies_sampled_critical_value_quadrature: criticalValueAtlasPassed,
      certifies_sampled_candidate_value_ordering:
        summary.status === "sampled-critical-value-ordering-derived",
      certifies_sampled_candidate_minmax: criticalValueAtlasPassed,
      certifies_sampled_C_m_Q_M_Q_values: criticalValueAtlasPassed,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "sampled critical-value atlas for C_cross, m_Q, and M_Q on the representative cross-binary quarter profile; interval quadrature and critical exhaustion remain open",
    },
    result: {
      theory_status: criticalValueAtlasPassed
        ? "sampled-source-atlas-aware-critical-value-atlas-certified"
        : "source-atlas-aware-critical-value-atlas-open",
      first_successor_row:
        "source-atlas-aware-critical-value-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The quarter-profile primitive extrema search now has sampled values at all six candidate locations. The sampled maximum occurs at the first regular forcing zero and the sampled minimum equals the quarter endpoint value C_cross, but no interval enclosure or retained branch is certified.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_CRITICAL_VALUE_ATLAS_SCHEMA,
    "schema must match cross-binary critical value atlas schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match critical value atlas packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_primitive_critical_atlas_check?.valid === true &&
      artifact?.source_primitive_critical_atlas_check
        ?.sampled_primitive_critical_atlas_certified === true &&
      artifact?.source_primitive_critical_atlas_check?.candidate_count === 6,
    "source primitive critical atlas must validate with six sampled candidates",
    errors
  );
  assertField(
    artifact?.quadrature_parameters?.speed_constraint ===
      "none; uses the certified positive speed-ratio zero enclosure only",
    "critical value atlas must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.quadrature_parameters?.quadrature_convention?.includes(
      "not an interval quadrature certificate"
    ),
    "critical value atlas must label the quadrature as non-interval",
    errors
  );
  assertField(
    Array.isArray(artifact?.segment_integral_rows) &&
      artifact.segment_integral_rows.length === 5,
    "critical value atlas must emit five segment integral rows",
    errors
  );
  assertField(
    Array.isArray(artifact?.candidate_value_rows) &&
      artifact.candidate_value_rows.length === 6,
    "critical value atlas must emit six candidate value rows",
    errors
  );
  assertField(
    artifact?.segment_integral_rows?.some(
      (row) => row.quadrature_transform === "left-fold-square-midpoint"
    ) === true &&
      artifact?.segment_integral_rows?.some(
        (row) => row.quadrature_transform === "right-fold-square-midpoint"
      ) === true,
    "critical value atlas must use fold endpoint transformed quadrature rows",
    errors
  );
  assertField(
    artifact?.critical_value_summary?.sampled_M_Q_candidate_id === "I1.z1" &&
      Number(artifact?.critical_value_summary?.sampled_M_Q) > 0,
    "sampled M_Q must occur at the first regular critical root",
    errors
  );
  assertField(
    artifact?.critical_value_summary?.sampled_m_Q_candidate_id ===
      "endpoint.Q" &&
      Number(artifact?.critical_value_summary?.sampled_m_Q) < -0.26,
    "sampled m_Q must occur at the quarter endpoint",
    errors
  );
  assertField(
    Math.abs(
      Number(artifact?.critical_value_summary?.quarter_integral_C_cross) -
        Number(artifact?.critical_value_summary?.sampled_m_Q)
    ) <= CHECK_TOLERANCE,
    "quarter integral must equal the sampled endpoint minimum",
    errors
  );
  assertField(
    artifact?.interval_profile_boundary?.certifies_C_m_Q_M_Q_interval_enclosure ===
      false &&
      artifact?.interval_profile_boundary?.certifies_interval_critical_exhaustion ===
        false,
    "critical value atlas must leave interval enclosure and critical exhaustion open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_sampled_critical_value_atlas === true &&
      artifact?.artifact_claim?.certifies_sampled_critical_value_quadrature ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_candidate_value_ordering ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_candidate_minmax === true &&
      artifact?.artifact_claim?.certifies_sampled_C_m_Q_M_Q_values === true &&
      artifact?.artifact_claim?.certifies_C_m_Q_M_Q_interval_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_cross_binary_coarea_interval_profile ===
        false &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must certify only sampled critical values and leave interval/live-ledger rows open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-critical-value-atlas.mjs [options]",
    "",
    "Options:",
    "  --panels-per-segment <n>  Quadrature panels per candidate segment (default: 384)",
    "  --quadrature-panels <n>   Alias for --panels-per-segment",
    "  --scan-subdivisions <n>   Primitive critical scan samples per cell (default: 96)",
    "  --subdivisions <n>        Root search subdivisions (default: 5000)",
    "  --out <path>              Write artifact JSON to path instead of stdout",
    "  --validate <path>         Validate an existing artifact JSON file",
    "  --schema                  Print the artifact schema identifier",
    "  --pretty                  Pretty-print JSON output",
    "  --help                    Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    quadraturePanelsPerSegment: DEFAULT_QUADRATURE_PANELS_PER_SEGMENT,
    scanSamplesPerCell: DEFAULT_SCAN_SAMPLES_PER_CELL,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--panels-per-segment" || arg === "--quadrature-panels") {
      args.quadraturePanelsPerSegment = Number.parseInt(argv[++index], 10);
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = Number.parseInt(argv[++index], 10);
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

function printJson(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    process.stdout.write(
      printJson(
        {
          schema:
            "neutral-braid-octahedral-fold-aware-cross-binary-critical-value-atlas-schema/v1",
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_CRITICAL_VALUE_ATLAS_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          result: artifact.result ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas({
    rootSubdivisions: args.rootSubdivisions,
    scanSamplesPerCell: args.scanSamplesPerCell,
    quadraturePanelsPerSegment: args.quadraturePanelsPerSegment,
  });
  const output = printJson(artifact, args.pretty);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

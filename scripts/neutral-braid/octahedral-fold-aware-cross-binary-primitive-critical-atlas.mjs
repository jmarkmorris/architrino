#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluatePointwiseTangentialWitness } from "./octahedral-fold-aware-dynamics-handoff.mjs";
import {
  buildOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction,
  validateOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction,
} from "./octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_PRIMITIVE_CRITICAL_ATLAS_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-primitive-critical-atlas/v1";

const PACKET_ID = "octahedral_fold_aware_cross_binary_primitive_critical_atlas";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const RECEIVER_LABEL = "1+";
const QUARTER_PERIOD = Math.PI / 2;
const ROOT_TOLERANCE = 1e-12;
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

function signLabel(value) {
  if (value > CHECK_TOLERANCE) {
    return "+";
  }
  if (value < -CHECK_TOLERANCE) {
    return "-";
  }
  return "0";
}

function numericThetaRight(cell) {
  return String(cell.theta_interval).includes("H/4")
    ? QUARTER_PERIOD
    : Number(cell.theta_right);
}

function endpointProbePadding(left, right) {
  return Math.min(1e-5, Math.max((right - left) / 1000, 1e-8));
}

function evaluateCrossForcing({ speedRatio, theta, rootSubdivisions }) {
  return evaluatePointwiseTangentialWitness({
    speedRatio,
    theta,
    receiverLabel: RECEIVER_LABEL,
    rootSubdivisions,
  }).cross_tangential_value;
}

export function evaluateCrossBinaryQuarterForcingAtTheta(options) {
  return evaluateCrossForcing(options);
}

function bisectCrossForcingZero({
  speedRatio,
  left,
  right,
  rootSubdivisions,
}) {
  let a = left;
  let b = right;
  let fa = evaluateCrossForcing({ speedRatio, theta: a, rootSubdivisions });
  const fb = evaluateCrossForcing({ speedRatio, theta: b, rootSubdivisions });

  if (Math.abs(fa) <= ROOT_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ROOT_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let step = 0; step < 90; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = evaluateCrossForcing({
      speedRatio,
      theta: mid,
      rootSubdivisions,
    });
    if (Math.abs(fm) <= ROOT_TOLERANCE || Math.abs(b - a) <= ROOT_TOLERANCE) {
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

export function refinePrimitiveCriticalPoint(options) {
  return bisectCrossForcingZero(options);
}

function classifyPrimitiveRole(leftValue, rightValue) {
  const leftSign = signLabel(leftValue);
  const rightSign = signLabel(rightValue);
  if (leftSign === "+" && rightSign === "-") {
    return "local-maximum-candidate";
  }
  if (leftSign === "-" && rightSign === "+") {
    return "local-minimum-candidate";
  }
  return "stationary-candidate-without-certified-turn";
}

function scanCellCriticalRows({
  speedRatio,
  cell,
  scanSamplesPerCell,
  rootSubdivisions,
}) {
  const thetaLeft = Number(cell.theta_left);
  const thetaRight = numericThetaRight(cell);
  const padding = endpointProbePadding(thetaLeft, thetaRight);
  const probeLeft = thetaLeft === 0 ? thetaLeft : thetaLeft + padding;
  const probeRight =
    thetaRight === QUARTER_PERIOD ? thetaRight : thetaRight - padding;
  const rows = [];
  let previousTheta = probeLeft;
  let previousValue = evaluateCrossForcing({
    speedRatio,
    theta: previousTheta,
    rootSubdivisions,
  });
  let forcingMinimum = previousValue;
  let forcingMaximum = previousValue;

  for (let index = 1; index <= scanSamplesPerCell; index += 1) {
    const theta =
      probeLeft + ((probeRight - probeLeft) * index) / scanSamplesPerCell;
    const value = evaluateCrossForcing({
      speedRatio,
      theta,
      rootSubdivisions,
    });
    forcingMinimum = Math.min(forcingMinimum, value);
    forcingMaximum = Math.max(forcingMaximum, value);
    if (
      Number.isFinite(previousValue) &&
      Number.isFinite(value) &&
      previousValue * value < 0
    ) {
      const rootTheta = bisectCrossForcingZero({
        speedRatio,
        left: previousTheta,
        right: theta,
        rootSubdivisions,
      });
      if (
        Number.isFinite(rootTheta) &&
        !rows.some((row) => Math.abs(Number(row.theta) - rootTheta) <= 1e-9)
      ) {
        const leftProbe = rootTheta - padding;
        const rightProbe = rootTheta + padding;
        const leftForcing = evaluateCrossForcing({
          speedRatio,
          theta: leftProbe,
          rootSubdivisions,
        });
        const rightForcing = evaluateCrossForcing({
          speedRatio,
          theta: rightProbe,
          rootSubdivisions,
        });
        rows.push({
          critical_id: `${cell.cell_id}.z${rows.length + 1}`,
          theta: formatNumber(rootTheta),
          residual_abs: formatSmallNumber(
            Math.abs(
              evaluateCrossForcing({
                speedRatio,
                theta: rootTheta,
                rootSubdivisions,
              })
            )
          ),
          left_probe_theta: formatNumber(leftProbe),
          right_probe_theta: formatNumber(rightProbe),
          left_forcing: formatNumber(leftForcing),
          right_forcing: formatNumber(rightForcing),
          sign_transition: `${signLabel(leftForcing)} to ${signLabel(rightForcing)}`,
          primitive_role: classifyPrimitiveRole(leftForcing, rightForcing),
        });
      }
    }
    previousTheta = theta;
    previousValue = value;
  }

  const leftEndpointValue = evaluateCrossForcing({
    speedRatio,
    theta: probeLeft,
    rootSubdivisions,
  });
  const rightEndpointValue = evaluateCrossForcing({
    speedRatio,
    theta: probeRight,
    rootSubdivisions,
  });

  return {
    cell_id: cell.cell_id,
    theta_interval: cell.theta_interval,
    scan_interval: `[${formatNumber(probeLeft)},${formatNumber(probeRight)}]`,
    expected_cross_root_count: cell.expected_cross_root_count,
    left_probe_forcing: formatNumber(leftEndpointValue),
    right_probe_forcing: formatNumber(rightEndpointValue),
    left_probe_sign: signLabel(leftEndpointValue),
    right_probe_sign: signLabel(rightEndpointValue),
    forcing_minimum_on_scan_grid: formatNumber(forcingMinimum),
    forcing_maximum_on_scan_grid: formatNumber(forcingMaximum),
    critical_rows: rows,
    sampled_critical_count: rows.length,
    status: "cell-critical-scan-complete",
  };
}

export function bracketPrimitiveCriticalPoints(options) {
  return scanCellCriticalRows(options);
}

function buildFoldTurnRows({ speedRatio, partition, rootSubdivisions }) {
  const folds = partition.fold_endpoint_rows;
  const cells = partition.unified_quarter_cells;
  return folds.map((fold) => {
    const theta = Number(fold.theta);
    const leftCell = cells.find((cell) => Number(cell.theta_right) === theta);
    const rightCell = cells.find((cell) => Number(cell.theta_left) === theta);
    const padding = endpointProbePadding(
      Number(leftCell?.theta_left ?? theta - 1e-3),
      numericThetaRight(rightCell ?? leftCell)
    );
    const leftProbe = theta - padding;
    const rightProbe = theta + padding;
    const leftForcing = evaluateCrossForcing({
      speedRatio,
      theta: leftProbe,
      rootSubdivisions,
    });
    const rightForcing = evaluateCrossForcing({
      speedRatio,
      theta: rightProbe,
      rootSubdivisions,
    });
    const primitiveRole = classifyPrimitiveRole(leftForcing, rightForcing);
    return {
      source_label: fold.source_label,
      theta: fold.theta,
      transition: fold.transition,
      left_probe_theta: formatNumber(leftProbe),
      right_probe_theta: formatNumber(rightProbe),
      left_forcing: formatNumber(leftForcing),
      right_forcing: formatNumber(rightForcing),
      sign_transition: `${signLabel(leftForcing)} to ${signLabel(rightForcing)}`,
      primitive_role: primitiveRole.includes("local-")
        ? primitiveRole.replace("local-", "fold-local-")
        : "fold-endpoint-limit-without-extremum-turn",
    };
  });
}

function buildPrimitiveCandidateSet({ partition, cellRows, foldRows }) {
  const candidates = [
    {
      candidate_id: "endpoint.0",
      theta: 0,
      candidate_type: "quarter-left-endpoint",
      primitive_role: "global-extremum-candidate",
    },
  ];

  for (const cellRow of cellRows) {
    for (const critical of cellRow.critical_rows) {
      candidates.push({
        candidate_id: critical.critical_id,
        theta: critical.theta,
        candidate_type: "interior-forcing-zero",
        primitive_role: critical.primitive_role,
      });
    }
    const fold = foldRows.find((row) => {
      const right = Number(cellRow.theta_interval.match(/,([0-9.]+)\)/)?.[1]);
      return Number.isFinite(right) && Math.abs(Number(row.theta) - right) <= 1e-9;
    });
    if (fold) {
      candidates.push({
        candidate_id: `fold.${fold.source_label}`,
        theta: fold.theta,
        candidate_type: "fold-endpoint-limit",
        primitive_role: fold.primitive_role,
      });
    }
  }

  candidates.push({
    candidate_id: "endpoint.Q",
    theta: formatNumber(QUARTER_PERIOD),
    candidate_type: "quarter-right-endpoint",
    primitive_role: "global-extremum-candidate",
  });

  return candidates
    .filter(
      (candidate, index, rows) =>
        rows.findIndex(
          (row) => Math.abs(Number(row.theta) - Number(candidate.theta)) <= 1e-9
        ) === index
    )
    .sort((left, right) => Number(left.theta) - Number(right.theta));
}

export function buildPrimitiveExtremumCandidateSet(options) {
  return buildPrimitiveCandidateSet(options);
}

export function buildOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas(
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
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(scanSamplesPerCell) || scanSamplesPerCell < 16) {
    throw new Error("scanSamplesPerCell must be an integer >= 16");
  }

  const reduction =
    buildOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction({
      rootSubdivisions,
    });
  const reductionErrors =
    validateOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction(
      reduction
    );
  const speedRatio = Number(reduction.reduction_parameters.speed_ratio_estimate);
  const partition = reduction.quarter_cell_partition;
  const cellRows = partition.unified_quarter_cells.map((cell) =>
    scanCellCriticalRows({
      speedRatio,
      cell,
      scanSamplesPerCell,
      rootSubdivisions,
    })
  );
  const foldRows = buildFoldTurnRows({
    speedRatio,
    partition,
    rootSubdivisions,
  });
  const candidateSet = buildPrimitiveCandidateSet({
    partition,
    cellRows,
    foldRows,
  });
  const totalInteriorCriticalCount = cellRows.reduce(
    (sum, row) => sum + row.sampled_critical_count,
    0
  );
  const criticalAtlasPassed =
    reductionErrors.length === 0 &&
    JSON.stringify(cellRows.map((row) => row.sampled_critical_count)) ===
      "[1,1,0]" &&
    totalInteriorCriticalCount === 2 &&
    foldRows.some(
      (row) =>
        row.source_label === "3-" &&
        row.primitive_role === "fold-local-minimum-candidate"
    ) &&
    candidateSet.length === 6;

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_PRIMITIVE_CRITICAL_ATLAS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.md",
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-primitive-critical-atlas.md",
    source_quarter_cell_reduction_check: {
      schema: reduction.schema,
      valid: reductionErrors.length === 0,
      errors: reductionErrors,
      theory_status: reduction.result.theory_status,
      retained_branch: reduction.result.retained_branch,
      formula_targets_certified:
        reduction.artifact_claim
          .certifies_source_atlas_aware_quarter_profile_formula_reduction === true,
    },
    atlas_parameters: {
      receiver_label: RECEIVER_LABEL,
      theta_domain: "[0,H/4)",
      scan_samples_per_cell: scanSamplesPerCell,
      root_subdivisions: rootSubdivisions,
      speed_constraint:
        "none; uses the certified positive speed-ratio zero enclosure only",
      speed_ratio_estimate: formatNumber(speedRatio),
      speed_ratio_enclosure: reduction.reduction_parameters.speed_ratio_enclosure,
    },
    primitive_critical_equation: {
      primitive_definition: "A(u)=int_0^u f_cross(q)dq",
      critical_equation: "A'(u)=f_cross(u)=0 on regular open cells",
      fold_endpoint_rule:
        "fold endpoint limits must remain in the finite candidate set because f_cross has projection-singular one-sided behavior there",
      global_candidate_rule:
        "m_Q and M_Q can only occur at quarter endpoints, sampled regular critical roots, or fold endpoint limits before interval exhaustion is certified",
      status: "primitive-critical-candidate-rule-stated",
    },
    cell_critical_rows: cellRows,
    fold_turn_rows: foldRows,
    primitive_extrema_candidate_set: {
      candidates: candidateSet,
      candidate_count: candidateSet.length,
      interior_forcing_zero_count: totalInteriorCriticalCount,
      fold_endpoint_candidate_count: foldRows.length,
      quarter_endpoint_candidate_count: 2,
      theta_order: candidateSet.map((row) => row.theta),
      status: criticalAtlasPassed
        ? "sampled-primitive-critical-candidate-set-derived"
        : "sampled-primitive-critical-candidate-set-open",
    },
    interval_profile_boundary: {
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      open_quantities: ["C_cross", "m_Q", "M_Q"],
      next_interval_task:
        "enclose A values at the six candidate locations and prove no additional critical roots exist on the three regular cells",
      status: "source-atlas-aware-critical-interval-profile-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_source_atlas_quarter_cell_reduction:
        reduction.artifact_claim.certifies_source_atlas_quarter_cell_reduction ===
        true,
      certifies_sampled_primitive_critical_atlas: criticalAtlasPassed,
      certifies_sampled_interior_critical_counts: totalInteriorCriticalCount === 2,
      certifies_fold_endpoint_turn_classification:
        foldRows.length === 2 &&
        foldRows.some(
          (row) =>
            row.source_label === "3-" &&
            row.primitive_role === "fold-local-minimum-candidate"
        ),
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "sampled primitive-critical atlas for the representative cross-binary quarter profile; interval critical exhaustion and C_m_Q_M_Q enclosures remain open",
    },
    result: {
      theory_status: criticalAtlasPassed
        ? "sampled-source-atlas-aware-primitive-critical-atlas-certified"
        : "source-atlas-aware-primitive-critical-atlas-open",
      first_successor_row:
        "source-atlas-aware-critical-value-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The quarter-profile primitive extrema search is reduced to a sampled finite candidate set: quarter endpoints, two regular forcing zeros, and two fold endpoint limits. This narrows but does not certify the interval values of C_cross, m_Q, and M_Q.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_PRIMITIVE_CRITICAL_ATLAS_SCHEMA,
    "schema must match cross-binary primitive critical atlas schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match primitive critical atlas packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_quarter_cell_reduction_check?.valid === true &&
      artifact?.source_quarter_cell_reduction_check?.formula_targets_certified ===
        true,
    "source quarter-cell reduction predecessor must validate with formula targets",
    errors
  );
  assertField(
    artifact?.atlas_parameters?.speed_constraint ===
      "none; uses the certified positive speed-ratio zero enclosure only",
    "primitive critical atlas must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.primitive_critical_equation?.critical_equation ===
      "A'(u)=f_cross(u)=0 on regular open cells",
    "primitive critical equation must identify A'=f_cross=0 on regular cells",
    errors
  );
  assertField(
    JSON.stringify(
      artifact?.cell_critical_rows?.map((row) => row.sampled_critical_count)
    ) === "[1,1,0]",
    "primitive critical atlas must find sampled critical counts [1,1,0]",
    errors
  );
  assertField(
    artifact?.cell_critical_rows?.[0]?.critical_rows?.[0]?.primitive_role ===
      "local-maximum-candidate" &&
      artifact?.cell_critical_rows?.[1]?.critical_rows?.[0]?.primitive_role ===
        "local-maximum-candidate",
    "regular forcing zeros must be classified as local maximum candidates",
    errors
  );
  assertField(
    artifact?.fold_turn_rows?.some(
      (row) =>
        row.source_label === "3-" &&
        row.sign_transition === "- to +" &&
        row.primitive_role === "fold-local-minimum-candidate"
    ) === true,
    "3- fold endpoint must be classified as a sampled fold local minimum candidate",
    errors
  );
  assertField(
    artifact?.primitive_extrema_candidate_set?.candidate_count === 6 &&
      artifact?.primitive_extrema_candidate_set?.interior_forcing_zero_count === 2 &&
      artifact?.primitive_extrema_candidate_set?.fold_endpoint_candidate_count ===
        2 &&
      artifact?.primitive_extrema_candidate_set?.quarter_endpoint_candidate_count ===
        2,
    "primitive extrema candidate set must contain two endpoints, two roots, and two fold limits",
    errors
  );
  assertField(
    artifact?.interval_profile_boundary?.certifies_C_m_Q_M_Q_interval_enclosure ===
      false &&
      artifact?.interval_profile_boundary?.certifies_interval_critical_exhaustion ===
        false,
    "primitive critical atlas must leave interval enclosure and critical exhaustion open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_sampled_primitive_critical_atlas === true &&
      artifact?.artifact_claim?.certifies_C_m_Q_M_Q_interval_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_cross_binary_coarea_interval_profile ===
        false &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must certify only the sampled critical atlas and leave interval/live-ledger rows open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-primitive-critical-atlas.mjs [options]",
    "",
    "Options:",
    "  --samples-per-cell <n> Number of scan samples per quarter cell (default: 96)",
    "  --scan-subdivisions <n> Alias for --samples-per-cell",
    "  --subdivisions <n>     Root search subdivisions (default: 5000)",
    "  --out <path>           Write artifact JSON to path instead of stdout",
    "  --validate <path>      Validate an existing artifact JSON file",
    "  --schema               Print the artifact schema identifier",
    "  --pretty               Pretty-print JSON output",
    "  --help                 Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
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
    if (arg === "--samples-per-cell" || arg === "--scan-subdivisions") {
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
            "neutral-braid-octahedral-fold-aware-cross-binary-primitive-critical-atlas-schema/v1",
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_PRIMITIVE_CRITICAL_ATLAS_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas(artifact);
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

  const artifact = buildOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas({
    rootSubdivisions: args.rootSubdivisions,
    scanSamplesPerCell: args.scanSamplesPerCell,
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

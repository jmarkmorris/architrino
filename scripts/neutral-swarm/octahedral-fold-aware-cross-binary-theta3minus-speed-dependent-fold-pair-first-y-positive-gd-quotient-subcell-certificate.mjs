#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_POSITIVE_GD_QUOTIENT_SUBCELL_CERTIFICATE_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-positive-gd-quotient-subcell-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_positive_gd_quotient_subcell_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const SPEED_CELL_COUNT = 128;
const Y_SUBCELL_COUNT = 16;
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-positive-GD-quotient-subcells-certified";

function firstYSubcellBreaks() {
  return Array.from(
    { length: Y_SUBCELL_COUNT + 1 },
    (_, index) => (FIRST_Y_CELL_UPPER * index) / Y_SUBCELL_COUNT
  ).concat([0.115]);
}

function numericInterval(interval) {
  return interval.map(Number);
}

function coefficientHull(intervals) {
  return root.formatInterval([
    Math.min(...intervals.map(([left]) => left)),
    Math.max(...intervals.map(([, right]) => right)),
  ]);
}

function maxField(rows, fieldName) {
  return Math.max(...rows.map((row) => Number(row[fieldName])));
}

function minField(rows, fieldName) {
  return Math.min(...rows.map((row) => Number(row[fieldName])));
}

function firstYPositiveRows(artifact) {
  return artifact.positive_y_G_quotient_rows.filter((row) => {
    const [left, right] = numericInterval(row.y_interval);
    return left > 0 && right <= FIRST_Y_CELL_UPPER;
  });
}

function firstYZeroRows(artifact) {
  return artifact.first_y_cell_deferred_rows.filter((row) => {
    const [left, right] = numericInterval(row.y_interval);
    return left <= 0 && right <= FIRST_Y_CELL_UPPER / Y_SUBCELL_COUNT;
  });
}

function summarizeRows({ rows, zeroRows }) {
  const allRowsCertified = rows.every(
    (row) => row.quotient_status === "positive-y-GD-quotients-enclosed"
  );
  const allAvoidRawDivision = rows.every(
    (row) => row.raw_y_inverse_division_used === false
  );
  return {
    speed_cell_count: SPEED_CELL_COUNT,
    branch_count: 2,
    first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
    y_subcell_count: Y_SUBCELL_COUNT,
    positive_first_y_subcell_count: Y_SUBCELL_COUNT - 1,
    positive_first_y_row_count: rows.length,
    zero_touching_first_y_row_count: zeroRows.length,
    all_positive_first_y_GD_quotient_subcells_certified: allRowsCertified,
    all_rows_avoid_raw_y_inverse_division: allAvoidRawDivision,
    min_denominator_positive_clearance: root.formatSmallNumber(
      minField(rows, "min_denominator_positive_clearance")
    ),
    min_J_clearance: root.formatSmallNumber(minField(rows, "min_J_clearance")),
    min_F_delta_clearance: root.formatSmallNumber(
      minField(rows, "min_F_delta_clearance")
    ),
    max_abs_Q_G_pair_interval_upper: root.formatSmallNumber(
      maxField(rows, "max_abs_Q_G_pair_interval_upper")
    ),
    max_abs_Q_D_pair_interval_upper: root.formatSmallNumber(
      maxField(rows, "max_abs_Q_D_pair_interval_upper")
    ),
    Q_G_pair_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.Q_G_pair_interval))
    ),
    Q_D_pair_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.Q_D_pair_interval))
    ),
    status:
      allRowsCertified && allAvoidRawDivision
        ? CERTIFIED_STATUS
        : "theta3minus-fold-pair-first-y-positive-GD-quotient-subcells-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate() {
  const hGraphArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate(
      {
        speedCellCount: SPEED_CELL_COUNT,
        yBreaks: firstYSubcellBreaks(),
      }
    );
  const rows = firstYPositiveRows(hGraphArtifact);
  const zeroRows = firstYZeroRows(hGraphArtifact);
  const summary = summarizeRows({ rows, zeroRows });
  const passed = summary.status === CERTIFIED_STATUS;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_POSITIVE_GD_QUOTIENT_SUBCELL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift25-e-root-tail-tube-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-positive-gd-quotient-subcell-certificate.md",
    first_y_positive_gd_quotient_subcell_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: SPEED_CELL_COUNT,
      first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
      y_subcell_count: Y_SUBCELL_COUNT,
      positive_first_y_subcell_count: Y_SUBCELL_COUNT - 1,
      zero_touching_subcell_policy:
        "left open for the continuous post-seed G,D tail certificate; this packet certifies only y>0 first-y subcells",
      quotient_formula:
        "Q_G=(G_-+G_+-L)/y^2 and Q_D=(D_-+D_+-L)/y^2 evaluated only on positive y subcells after correlated L subtraction",
    },
    first_y_positive_gd_quotient_subcell_rows: rows,
    first_y_zero_touching_deferred_rows: zeroRows,
    first_y_positive_gd_quotient_subcell_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-positive-GD-quotient-subcells",
        status: passed ? "directed-rounded-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-zero-touching-GD-tail",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: "blocked-by-zero-touching-continuous-post-seed-GD-tail",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_first_y_positive_GD_quotient_subcells: passed,
      certifies_directed_rounded_first_y_zero_touching_GD_tail: false,
      certifies_directed_rounded_first_y_GD_finite_remainder_bound: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded positive-y subcell certificate for the fold-pair first-y G,D quotients on the certified h-root graph. It removes the positive-y part of the first-y quotient obstruction but keeps the zero-touching continuous post-seed G,D tail, full first-y enclosure, scaled remainder, I1 closure, quadrature, and retained branch status open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-zero-touching-continuous-post-seed-GD-tail-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "All positive subcells inside the first-y cell now have directed-rounded G,D quotient enclosures. The remaining first-y blocker is the zero-touching continuous post-seed G,D tail bound.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate(
  artifact
) {
  const errors = [];
  const summary = artifact?.first_y_positive_gd_quotient_subcell_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_POSITIVE_GD_QUOTIENT_SUBCELL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y positive G/D quotient subcell certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y positive G/D quotient subcell packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.first_y_positive_gd_quotient_subcell_parameters
      ?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "first-y positive G/D quotient subcell certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.first_y_positive_gd_quotient_subcell_parameters?.speed_band ===
      undefined &&
      artifact?.first_y_positive_gd_quotient_subcell_parameters?.speed_window ===
        undefined &&
      artifact?.first_y_positive_gd_quotient_subcell_parameters?.speed_min ===
        undefined &&
      artifact?.first_y_positive_gd_quotient_subcell_parameters?.speed_max ===
        undefined,
    "first-y positive G/D quotient subcell parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.status === CERTIFIED_STATUS &&
      summary?.speed_cell_count === SPEED_CELL_COUNT &&
      summary?.positive_first_y_subcell_count === Y_SUBCELL_COUNT - 1 &&
      summary?.positive_first_y_row_count ===
        SPEED_CELL_COUNT * (Y_SUBCELL_COUNT - 1) &&
      summary?.zero_touching_first_y_row_count === SPEED_CELL_COUNT &&
      summary?.all_positive_first_y_GD_quotient_subcells_certified === true &&
      summary?.all_rows_avoid_raw_y_inverse_division === true &&
      Number(summary?.min_denominator_positive_clearance) > 25 &&
      Number(summary?.min_J_clearance) > 0.79 &&
      Number(summary?.min_F_delta_clearance) > 0 &&
      Number(summary?.max_abs_Q_G_pair_interval_upper) < 9000 &&
      Number(summary?.max_abs_Q_D_pair_interval_upper) < 1.08e8,
    "first-y positive G/D quotient subcells must certify all positive subcells with denominator/J/F_delta control and no raw zero-cell division",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_first_y_positive_GD_quotient_subcells ===
      true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_zero_touching_GD_tail === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_remainder_bound ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_enclosure === false &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must certify only positive first-y G/D quotient subcells and keep zero-touching tail, scaled remainder, I1, and retention open",
    errors
  );
  return errors;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--schema") {
      options.schema = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-positive-gd-quotient-subcell-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>       Write artifact JSON",
    "  --validate <path>  Validate an artifact JSON",
    "  --schema           Print artifact schema metadata",
  ].join("\n");
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 1;
    return;
  }
  if (options.schema) {
    console.log(
      JSON.stringify(
        {
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_POSITIVE_GD_QUOTIENT_SUBCELL_CERTIFICATE_SCHEMA,
          packet_id: PACKET_ID,
          promotion_status: PROMOTION_STATUS,
        },
        null,
        2
      )
    );
    return;
  }
  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate();
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate(
      artifact
    );
  if (errors.length > 0) {
    console.error(JSON.stringify({ valid: false, errors }, null, 2));
    process.exitCode = 1;
    return;
  }
  const output = `${JSON.stringify(artifact, null, 2)}\n`;
  if (options.out) {
    fs.mkdirSync(path.dirname(options.out), { recursive: true });
    fs.writeFileSync(options.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

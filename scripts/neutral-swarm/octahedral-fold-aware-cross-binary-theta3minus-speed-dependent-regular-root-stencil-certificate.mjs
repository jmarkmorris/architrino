#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_STENCIL_CERTIFICATE_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_regular_root_stencil_certificate";
const PROMOTION_STATUS = "priority-only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SPEED_SAMPLES = [
  SPEED_RATIO_ENCLOSURE[0],
  3.02156125,
  3.0215625,
  3.021564740248,
  3.02156625,
  3.0215675,
  3.02156875,
  SPEED_RATIO_ENCLOSURE[1],
];
const DEFAULT_Y_SAMPLES = [
  0.115,
  0.1125,
  0.11,
  0.1075,
  0.105,
  0.1,
  0.095,
  0.09,
  0.08,
  0.07,
  0.06,
  0.05,
  0.04,
  0.03,
  0.02,
  0.015,
  0.012,
  0.01,
  0.007,
  0.005,
  0.003,
  0.002,
  0.0015,
  0.001,
];

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function parseNumberList(value, fallback) {
  if (Array.isArray(value)) {
    return value.map(Number);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter((entry) => Number.isFinite(entry));
  }
  return [...fallback];
}

function validateSpeedSamples(speedSamples) {
  if (
    !Array.isArray(speedSamples) ||
    speedSamples.length < 5 ||
    speedSamples.some(
      (entry) =>
        !Number.isFinite(entry) ||
        entry < SPEED_RATIO_ENCLOSURE[0] ||
        entry > SPEED_RATIO_ENCLOSURE[1]
    )
  ) {
    throw new Error(
      "speedSamples must contain at least five finite values inside the certified speed-ratio enclosure"
    );
  }
  if (
    !speedSamples.some(
      (entry) => Math.abs(entry - SPEED_RATIO_ENCLOSURE[0]) <= 1e-14
    ) ||
    !speedSamples.some(
      (entry) => Math.abs(entry - SPEED_RATIO_ENCLOSURE[1]) <= 1e-14
    )
  ) {
    throw new Error("speedSamples must include both speed enclosure endpoints");
  }
}

function validateYSamples(ySamples) {
  if (
    !Array.isArray(ySamples) ||
    ySamples.length < 8 ||
    ySamples.some((entry) => !Number.isFinite(entry) || entry <= 0)
  ) {
    throw new Error("ySamples must contain at least eight positive finite values");
  }
  for (let index = 1; index < ySamples.length; index += 1) {
    if (ySamples[index] >= ySamples[index - 1]) {
      throw new Error("ySamples must be strictly decreasing");
    }
  }
  if (ySamples[0] < 0.115 || ySamples[ySamples.length - 1] > 0.001) {
    throw new Error("ySamples must include y=0.115 and reach y<=0.001");
  }
}

function flattenRows(packet) {
  return packet.sampled_remainder_budget_rows.flatMap((speedRow) =>
    speedRow.sample_rows.map((row) => ({
      speed_ratio: speedRow.speed_ratio,
      ...row,
    }))
  );
}

function buildRegularRootTargets(packet) {
  const rows = flattenRows(packet);
  const worstRegularRG = rows.reduce((worst, row) =>
    Number(row.abs_R_G_regular) > Number(worst.abs_R_G_regular) ? row : worst
  );
  const worstRegularRD = rows.reduce((worst, row) =>
    Number(row.abs_R_D_regular) > Number(worst.abs_R_D_regular) ? row : worst
  );
  return {
    target_type: "regular-root-directed-rounded-backend-targets",
    moving_fold_chart: "theta=theta_3minus(nu)-y^2",
    regular_root_definition:
      "all source roots except the two roots nearest delta_f(nu) in -s_{+,+}(u+Q)",
    required_interval_rows: [
      "regular source-root tube isolation outside the reserved fold-pair cluster",
      "fixed-sign F_delta intervals on all regular root sheets",
      "complement-slab exclusion outside the regular tubes and reserved fold-pair cluster",
      "ordinary source-contribution interval enclosure for R_G_regular/y",
      "ordinary source-derivative numerator interval enclosure for R_D_regular/y^3",
    ],
    worst_R_G_regular_row: {
      speed_ratio: worstRegularRG.speed_ratio,
      y: worstRegularRG.y,
      R_G_regular: worstRegularRG.R_G_regular,
      abs_R_G_regular: worstRegularRG.abs_R_G_regular,
    },
    worst_R_D_regular_row: {
      speed_ratio: worstRegularRD.speed_ratio,
      y: worstRegularRD.y,
      R_D_regular: worstRegularRD.R_D_regular,
      abs_R_D_regular: worstRegularRD.abs_R_D_regular,
    },
  };
}

function buildSummary({ remainderPacket }) {
  const summary = remainderPacket.sampled_remainder_budget_summary;
  const scaling = summary.collar_scaling_summary.regular_root_scaling_rows;
  const passed =
    summary.status ===
      "sampled-theta3minus-remainder-budget-feasibility-certified" &&
    summary.speed_row_count >= 8 &&
    summary.y_sample_count_per_speed >= 24 &&
    Number(summary.max_combined_budget_ratio) < 0.06 &&
    Number(summary.min_certified_budget_slack) > 0.18 &&
    Number(summary.minimum_pair_to_regular_root_separation_margin) > 1.6 &&
    Number(scaling.max_abs_R_G_regular_over_y) < 0.1 &&
    Number(scaling.max_abs_R_D_regular_over_y3) < 0.75 &&
    summary.reconstruction_stable === true &&
    summary.all_term_root_signatures_preserved === true;
  return {
    strict_speed_row_count: summary.speed_row_count,
    strict_y_sample_count_per_speed: summary.y_sample_count_per_speed,
    strict_total_sample_count: summary.total_remainder_sample_count,
    certified_budget_from_negative_L_upper:
      summary.certified_budget_from_negative_L_upper,
    max_combined_budget_ratio: summary.max_combined_budget_ratio,
    min_certified_budget_slack: summary.min_certified_budget_slack,
    min_pair_to_regular_root_separation:
      summary.minimum_pair_to_regular_root_separation_margin,
    max_abs_R_G_regular: summary.max_abs_R_G_regular,
    max_abs_R_D_regular: summary.max_abs_R_D_regular,
    max_abs_R_G_regular_over_y: scaling.max_abs_R_G_regular_over_y,
    max_abs_R_D_regular_over_y3: scaling.max_abs_R_D_regular_over_y3,
    implied_R_G_regular_bound_at_outer_radius:
      scaling.implied_R_G_regular_bound_at_outer_radius,
    implied_R_D_regular_bound_at_outer_radius:
      scaling.implied_R_D_regular_bound_at_outer_radius,
    reconstruction_stable: summary.reconstruction_stable,
    all_term_root_signatures_preserved:
      summary.all_term_root_signatures_preserved,
    status: passed
      ? "sampled-theta3minus-regular-root-stencil-certified"
      : "sampled-theta3minus-regular-root-stencil-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const speedSamples = parseNumberList(
    options.speedSamples,
    DEFAULT_SPEED_SAMPLES
  );
  const ySamples = parseNumberList(options.ySamples, DEFAULT_Y_SAMPLES);
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  validateSpeedSamples(speedSamples);
  validateYSamples(ySamples);

  const remainderPacket =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan({
      rootSubdivisions,
      speedSamples,
      ySamples,
    });
  const summary = buildSummary({ remainderPacket });
  const passed =
    summary.status === "sampled-theta3minus-regular-root-stencil-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_STENCIL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.md",
    regular_root_stencil_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      speed_samples: speedSamples.map(formatSmallNumber),
      y_samples: ySamples.map(formatSmallNumber),
      root_subdivisions: rootSubdivisions,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      regular_root_scales: {
        R_G_regular: "O(y)",
        R_D_regular: "O(y^3)",
      },
    },
    strict_remainder_budget_summary: summary,
    regular_root_backend_targets: buildRegularRootTargets(remainderPacket),
    closure_burndown: [
      {
        row: "theta3minus.sampled-regular-root-linear-cubic-remainder-scaling",
        status: passed ? "strict-sampled-stencil-certified" : "open",
      },
      {
        row: "theta3minus.regular-root-backend-targets",
        status: passed ? "emitted" : "open",
      },
      {
        row: "theta3minus.regular-root-remainder",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder",
        status: "directed-rounded-open",
      },
      {
        row: "I1.regular-critical-exhaustion",
        status: "blocked-by-theta3minus-remainder",
      },
      {
        row: "representative-cross-binary-retention",
        status: "open",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_strict_sampled_regular_root_remainder_stencil: passed,
      emits_regular_root_interval_backend_targets: passed,
      certifies_directed_rounded_regular_root_remainder: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      claim_level:
        "Strict sampled/stencil regular-root remainder certificate and directed-rounded backend targets. Directed-rounded regular-root remainder, fold-pair remainder, full collar closure, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: passed
        ? "sampled-theta3minus-regular-root-stencil-certified"
        : "theta3minus-regular-root-stencil-open",
      first_successor_row:
        "theta3minus.regular-root-remainder-directed-rounded-required",
      parallel_successor_row:
        "theta3minus.fold-pair-scaled-remainder-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The regular-root remainder has a stricter sampled/stencil envelope and explicit interval-backend target rows, but no directed-rounded regular-root closure is claimed.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_STENCIL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus regular-root stencil certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus regular-root stencil certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.regular_root_stencil_parameters?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "regular-root stencil certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.regular_root_stencil_parameters?.speed_band === undefined &&
      artifact?.regular_root_stencil_parameters?.speed_window === undefined &&
      artifact?.regular_root_stencil_parameters?.speed_min === undefined &&
      artifact?.regular_root_stencil_parameters?.speed_max === undefined,
    "regular-root stencil parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.strict_remainder_budget_summary?.status ===
      "sampled-theta3minus-regular-root-stencil-certified" &&
      Number(
        artifact?.strict_remainder_budget_summary?.strict_speed_row_count
      ) >= 8 &&
      Number(
        artifact?.strict_remainder_budget_summary?.strict_y_sample_count_per_speed
      ) >= 24 &&
      Number(
        artifact?.strict_remainder_budget_summary?.max_abs_R_G_regular_over_y
      ) < 0.1 &&
      Number(
        artifact?.strict_remainder_budget_summary?.max_abs_R_D_regular_over_y3
      ) < 0.75 &&
      Number(
        artifact?.strict_remainder_budget_summary
          ?.min_pair_to_regular_root_separation
      ) > 1.6,
    "regular-root stencil summary must satisfy strict sampled scaling and separation thresholds",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_strict_sampled_regular_root_remainder_stencil === true &&
      artifact?.artifact_claim?.emits_regular_root_interval_backend_targets ===
        true &&
      artifact?.artifact_claim?.certifies_directed_rounded_regular_root_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep directed-rounded remainder, I1 closure, and retention open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "sampled-theta3minus-regular-root-stencil-certified",
    "result must report sampled regular-root stencil certification",
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
    } else if (arg === "--root-subdivisions") {
      options.rootSubdivisions = argv[++index];
    } else if (arg === "--speed-samples") {
      options.speedSamples = argv[++index];
    } else if (arg === "--y-samples") {
      options.ySamples = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                  Write artifact JSON",
    "  --validate <path>             Validate an artifact JSON",
    "  --schema                      Print artifact schema metadata",
    "  --root-subdivisions <count>   Root subdivisions for point evaluator",
    "  --speed-samples <csv>         Speed samples inside [3.02156,3.02157]",
    "  --y-samples <csv>             Strictly decreasing positive y samples",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_STENCIL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate(
      options
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate(
      artifact
    );
  if (errors.length > 0) {
    console.error(JSON.stringify({ valid: false, errors }, null, 2));
    process.exitCode = 1;
    return;
  }

  if (options.out) {
    fs.mkdirSync(path.dirname(options.out), { recursive: true });
    fs.writeFileSync(options.out, `${JSON.stringify(artifact, null, 2)}\n`);
    return;
  }

  console.log(JSON.stringify(artifact, null, 2));
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

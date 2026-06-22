#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";
import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_STENCIL_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_scaled_stencil_certificate";
const PROMOTION_STATUS = "priority-only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const SPEED_RATIO_CENTER = 3.021564740248;
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SPEED_SAMPLES = [
  SPEED_RATIO_ENCLOSURE[0],
  3.0215625,
  SPEED_RATIO_CENTER,
  3.0215675,
  SPEED_RATIO_ENCLOSURE[1],
];
const DEFAULT_Y_SAMPLES = [
  0.115,
  0.11,
  0.105,
  0.1,
  0.09,
  0.08,
  0.07,
  0.06,
  0.05,
  0.04,
  0.03,
  0.02,
  0.015,
  0.01,
  0.007,
  0.005,
  0.003,
  0.002,
  0.001,
];
const FOLD_PAIR_TERM_LABEL = "-s_{+,+}(u+Q)";
const EXPECTED_TERM_ROOT_SIGNATURE = "1,3,1,1";

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
    speedSamples.length < 3 ||
    speedSamples.some(
      (entry) =>
        !Number.isFinite(entry) ||
        entry < SPEED_RATIO_ENCLOSURE[0] ||
        entry > SPEED_RATIO_ENCLOSURE[1]
    )
  ) {
    throw new Error(
      "speedSamples must contain at least three finite values inside the certified speed-ratio enclosure"
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
    ySamples.length < 4 ||
    ySamples.some((entry) => !Number.isFinite(entry) || entry <= 0)
  ) {
    throw new Error("ySamples must contain at least four positive finite values");
  }
  for (let index = 1; index < ySamples.length; index += 1) {
    if (ySamples[index] >= ySamples[index - 1]) {
      throw new Error("ySamples must be strictly decreasing");
    }
  }
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

function sourcePhi(thetaTilde, delta) {
  return 2 * thetaTilde - delta;
}

function sourceRootDeltaDerivative({ speedRatio, kappa, thetaTilde, delta }) {
  const phi = sourcePhi(thetaTilde, delta);
  return (
    (2 * delta) / (speedRatio * speedRatio) -
    Math.cos(phi) +
    kappa * Math.cos(delta)
  );
}

function kernelB({ kappa, thetaTilde, delta }) {
  const phi = sourcePhi(thetaTilde, delta);
  return -0.5 * (Math.cos(phi) + kappa * Math.cos(delta));
}

function gammaCoefficient({ foldRow }) {
  const phiFold = Number(foldRow.phi_fold);
  const beta = Number(foldRow.beta);
  const FDeltaDelta = Number(foldRow.F_delta_delta);
  const FThetaDelta = 2 * Math.sin(phiFold);
  const FDeltaDeltaDelta = Math.cos(phiFold) - Math.cos(Number(foldRow.delta_fold));
  return (FThetaDelta - (FDeltaDeltaDelta * beta * beta) / 6) / FDeltaDelta;
}

function scaledContribution({ speedRatio, term, root, y }) {
  const delta = Number(root.delta);
  const thetaTilde = Number(term.theta_tilde);
  const FDelta = sourceRootDeltaDerivative({
    speedRatio,
    kappa: term.kappa,
    thetaTilde,
    delta,
  });
  const J = FDelta / y;
  const gamma = (4 * term.coefficient * term.sigma * kernelB({
    kappa: term.kappa,
    thetaTilde,
    delta,
  })) / (speedRatio * delta * delta * Math.abs(J));
  return {
    scaled_G_contribution: gamma,
    J,
    F_delta: FDelta,
  };
}

function pairRowsForSample({ foldRow, sample, rootSubdivisions }) {
  const speedRatio = Number(foldRow.speed_ratio);
  const y = Number(sample.y);
  const theta = Number(sample.theta);
  const deltaFold = Number(foldRow.delta_fold);
  const beta = Number(foldRow.beta);
  const gamma = gammaCoefficient({ foldRow });
  const L = Number(foldRow.analytic_square_limit);
  const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
  const term = evaluation.terms.find(
    (candidate) => candidate.term_label === FOLD_PAIR_TERM_LABEL
  );
  if (!term || term.root_rows.length < 3) {
    throw new Error("expected theta3minus fold-pair term with three roots");
  }
  const rankedRoots = term.root_rows
    .map((rootRow, rootIndex) => ({
      root_index: rootIndex,
      ...rootRow,
      delta: Number(rootRow.delta),
      distance_from_delta_fold: Math.abs(Number(rootRow.delta) - deltaFold),
    }))
    .sort(
      (left, right) =>
        left.distance_from_delta_fold - right.distance_from_delta_fold
    );
  const pairRoots = rankedRoots
    .slice(0, 2)
    .sort((left, right) => left.delta - right.delta);
  const regularRoots = rankedRoots.slice(2);
  const pairValue = pairRoots.reduce(
    (sum, root) => sum + term.coefficient * Number(root.contribution),
    0
  );
  const pairDerivative = pairRoots.reduce(
    (sum, root) => sum + term.coefficient * Number(root.contribution_derivative),
    0
  );
  const GPair = 2 * y * pairValue;
  const DPair = 4 * y ** 3 * pairDerivative;
  const scaledContributionRows = pairRoots.map((root, branchIndex) => {
    const branch = branchIndex === 0 ? "-" : "+";
    const p = (root.delta - deltaFold) / y;
    const z =
      branch === "-"
        ? (root.delta - deltaFold + beta * y) / (y * y)
        : (root.delta - deltaFold - beta * y) / (y * y);
    const scaled = scaledContribution({
      speedRatio,
      term,
      root,
      y,
    });
    return {
      branch,
      root_index: root.root_index,
      delta: formatSmallNumber(root.delta),
      p: formatSmallNumber(p),
      beta_signed_residual: formatSmallNumber(
        branch === "-" ? p + beta : p - beta
      ),
      z: formatSmallNumber(z),
      z_minus_gamma: formatSmallNumber(z - gamma),
      F_delta: formatSmallNumber(scaled.F_delta),
      J: formatSmallNumber(scaled.J),
      J_sign: signLabel(scaled.J),
      scaled_G_contribution: formatSmallNumber(
        scaled.scaled_G_contribution
      ),
    };
  });
  const scaledGPair = scaledContributionRows.reduce(
    (sum, row) => sum + Number(row.scaled_G_contribution),
    0
  );
  const nearestRegularRootDistance = Math.min(
    ...regularRoots.map((root) => root.distance_from_delta_fold)
  );
  const farthestPairRootDistance = Math.max(
    ...pairRoots.map((root) => root.distance_from_delta_fold)
  );
  const RGPair = GPair - L;
  const RDPair = DPair - L;
  return {
    speed_ratio: formatSmallNumber(speedRatio),
    y: formatSmallNumber(y),
    theta: formatSmallNumber(theta),
    delta_fold: formatSmallNumber(deltaFold),
    beta: formatSmallNumber(beta),
    gamma: formatSmallNumber(gamma),
    L: formatSmallNumber(L),
    fold_pair_term_label: term.term_label,
    fold_pair_root_indices: pairRoots.map((root) => root.root_index),
    term_root_count_signature: evaluation.terms
      .map((candidate) => candidate.root_count)
      .join(","),
    fold_pair_rows: scaledContributionRows,
    nearest_regular_root_distance_from_delta_fold: formatSmallNumber(
      nearestRegularRootDistance
    ),
    pair_to_regular_root_separation_margin: formatSmallNumber(
      nearestRegularRootDistance - farthestPairRootDistance
    ),
    G_pair_from_unscaled_sources: formatSmallNumber(GPair),
    G_pair_from_scaled_sources: formatSmallNumber(scaledGPair),
    scaled_G_pair_formula_abs_error: formatSmallNumber(
      Math.abs(GPair - scaledGPair)
    ),
    D_pair: formatSmallNumber(DPair),
    R_G_pair: formatSmallNumber(RGPair),
    R_D_pair: formatSmallNumber(RDPair),
    abs_R_G_pair_over_y2: formatSmallNumber(Math.abs(RGPair) / (y * y)),
    abs_R_D_pair_over_y2: formatSmallNumber(Math.abs(RDPair) / (y * y)),
    J_signs_expected: scaledContributionRows
      .map((row) => row.J_sign)
      .join(",") === "+,-",
  };
}

function summarizeRows(rows) {
  const branchRows = rows.flatMap((row) => row.fold_pair_rows);
  const maxAbsZ = Math.max(...branchRows.map((row) => Math.abs(Number(row.z))));
  const maxAbsZMinusGamma = Math.max(
    ...branchRows.map((row) => Math.abs(Number(row.z_minus_gamma)))
  );
  const minAbsJ = Math.min(...branchRows.map((row) => Math.abs(Number(row.J))));
  const minPairToRegularRootSeparation = Math.min(
    ...rows.map((row) => Number(row.pair_to_regular_root_separation_margin))
  );
  const maxAbsPairRGOverY2 = Math.max(
    ...rows.map((row) => Number(row.abs_R_G_pair_over_y2))
  );
  const maxAbsPairRDOverY2 = Math.max(
    ...rows.map((row) => Number(row.abs_R_D_pair_over_y2))
  );
  const maxScaledFormulaError = Math.max(
    ...rows.map((row) => Number(row.scaled_G_pair_formula_abs_error))
  );
  const allTermSignaturesPreserved = rows.every(
    (row) => row.term_root_count_signature === EXPECTED_TERM_ROOT_SIGNATURE
  );
  const allJSignsExpected = rows.every((row) => row.J_signs_expected);
  const passed =
    allTermSignaturesPreserved &&
    allJSignsExpected &&
    maxAbsZ < 3.1 &&
    maxAbsZMinusGamma < 0.4 &&
    minAbsJ > 0.77 &&
    minPairToRegularRootSeparation > 1.7 &&
    maxAbsPairRGOverY2 < 0.18 &&
    maxAbsPairRDOverY2 < 0.71 &&
    maxScaledFormulaError < 1e-9;
  return {
    sample_count: rows.length,
    max_abs_z: formatSmallNumber(maxAbsZ),
    max_abs_z_minus_gamma: formatSmallNumber(maxAbsZMinusGamma),
    min_abs_J: formatSmallNumber(minAbsJ),
    min_pair_to_regular_root_separation: formatSmallNumber(
      minPairToRegularRootSeparation
    ),
    max_abs_R_G_pair_over_y2: formatSmallNumber(maxAbsPairRGOverY2),
    max_abs_R_D_pair_over_y2: formatSmallNumber(maxAbsPairRDOverY2),
    max_scaled_G_pair_formula_abs_error: formatSmallNumber(
      maxScaledFormulaError
    ),
    all_term_root_signatures_preserved: allTermSignaturesPreserved,
    all_J_signs_expected: allJSignsExpected,
    status: passed
      ? "sampled-theta3minus-fold-pair-scaled-stencil-certified"
      : "sampled-theta3minus-fold-pair-scaled-stencil-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate(
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

  const foldLimitArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate();
  const normalFormArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      rootSubdivisions,
      speedSamples,
      ySamples,
    });
  const rows = normalFormArtifact.speed_dependent_fold_normal_form_rows.flatMap(
    (foldRow, speedIndex) =>
      normalFormArtifact.moving_fold_collar_sample_rows[
        speedIndex
      ].sample_rows.map((sample) =>
        pairRowsForSample({ foldRow, sample, rootSubdivisions })
      )
  );
  const summary = summarizeRows(rows);
  const passed =
    summary.status ===
    "sampled-theta3minus-fold-pair-scaled-stencil-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_STENCIL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.md",
    scaled_stencil_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      speed_samples: speedSamples.map(formatSmallNumber),
      y_samples: ySamples.map(formatSmallNumber),
      root_subdivisions: rootSubdivisions,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      scaled_variable: "p=(delta-delta_f)/y",
      fold_pair_term_label: FOLD_PAIR_TERM_LABEL,
      certified_L_interval:
        foldLimitArtifact.normal_form_theorem_progress.certified_L_interval,
    },
    scaled_fold_pair_rows: rows,
    scaled_fold_pair_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-endpoint-bracket",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.negative-fold-limit-L",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.sampled-fold-pair-scaled-roots",
        status: passed ? "sampled-stencil-certified" : "open",
      },
      {
        row: "theta3minus.sampled-fold-pair-quadratic-remainder-quotients",
        status: passed ? "sampled-stencil-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.regular-root-remainder",
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
      certifies_sampled_theta3minus_fold_pair_scaled_stencil: passed,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_directed_rounded_regular_root_remainder: false,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      claim_level:
        "Sampled/stencil scaled fold-pair normal-form certificate for p, z, J, and pair quadratic residual quotients. Directed-rounded fold-pair remainder, regular-root remainder, full collar closure, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: passed
        ? "sampled-theta3minus-fold-pair-scaled-stencil-certified"
        : "theta3minus-fold-pair-scaled-stencil-open",
      first_successor_row:
        "theta3minus.fold-pair-scaled-remainder-directed-rounded-required",
      parallel_successor_row:
        "theta3minus.regular-root-remainder-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The coalescing fold-pair roots are now represented in the scaled p chart with bounded z rows, nonzero scaled J rows, and sampled quadratic R_G,R_D pair quotients; this narrows but does not close the directed-rounded remainder proof.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_STENCIL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair scaled stencil certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair scaled stencil certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.scaled_stencil_parameters?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "scaled stencil certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.scaled_stencil_parameters?.speed_band === undefined &&
      artifact?.scaled_stencil_parameters?.speed_window === undefined &&
      artifact?.scaled_stencil_parameters?.speed_min === undefined &&
      artifact?.scaled_stencil_parameters?.speed_max === undefined,
    "scaled stencil parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.scaled_fold_pair_summary?.status ===
      "sampled-theta3minus-fold-pair-scaled-stencil-certified" &&
      artifact?.scaled_fold_pair_summary?.all_term_root_signatures_preserved ===
        true &&
      artifact?.scaled_fold_pair_summary?.all_J_signs_expected === true &&
      Number(artifact?.scaled_fold_pair_summary?.max_abs_z) < 3.1 &&
      Number(artifact?.scaled_fold_pair_summary?.max_abs_z_minus_gamma) < 0.4 &&
      Number(artifact?.scaled_fold_pair_summary?.min_abs_J) > 0.77 &&
      Number(
        artifact?.scaled_fold_pair_summary
          ?.min_pair_to_regular_root_separation
      ) > 1.7 &&
      Number(artifact?.scaled_fold_pair_summary?.max_abs_R_G_pair_over_y2) <
        0.18 &&
      Number(artifact?.scaled_fold_pair_summary?.max_abs_R_D_pair_over_y2) <
        0.71,
    "scaled fold-pair rows must satisfy bounded z, J, separation, and quadratic quotient thresholds",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_sampled_theta3minus_fold_pair_scaled_stencil === true &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_directed_rounded_regular_root_remainder ===
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
      "sampled-theta3minus-fold-pair-scaled-stencil-certified",
    "result must report sampled fold-pair scaled stencil certification",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.mjs [options]",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_STENCIL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate(
      options
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate(
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

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_NORMAL_FORM_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_normal_form";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const QUARTER_PERIOD = Math.PI / 2;
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const SPEED_RATIO_CENTER = 3.021564740248;
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const CHECK_TOLERANCE = 1e-10;
const EXPECTED_TERM_ROOT_SIGNATURE = "1,3,1,1";
const DEFAULT_SPEED_SAMPLES = [
  SPEED_RATIO_ENCLOSURE[0],
  3.0215625,
  SPEED_RATIO_CENTER,
  3.0215675,
  SPEED_RATIO_ENCLOSURE[1],
];
const DEFAULT_Y_SAMPLES = [
  0.115,
  0.1,
  0.07,
  0.05,
  0.03,
  0.02,
  0.01,
  0.007,
  0.005,
  0.003,
  0.002,
  0.001,
];

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

function foldEndpointEquation(speedRatio, kappa, delta) {
  const cosineComponent =
    (2 * delta) / (speedRatio * speedRatio) + kappa * Math.cos(delta);
  const sineComponent =
    2 -
    (delta * delta) / (speedRatio * speedRatio) -
    kappa * Math.sin(delta);
  return cosineComponent * cosineComponent + sineComponent * sineComponent - 1;
}

function solveFoldDelta(speedRatio, kappa, left, right) {
  let a = left;
  let b = right;
  let fa = foldEndpointEquation(speedRatio, kappa, a);
  if (fa * foldEndpointEquation(speedRatio, kappa, b) > 0) {
    return null;
  }
  for (let step = 0; step < 100; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = foldEndpointEquation(speedRatio, kappa, mid);
    if (Math.abs(fm) <= 1e-14 || Math.abs(b - a) <= 1e-14) {
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

function solveFoldEndpoints(speedRatio, kappa) {
  const roots = [];
  const domainMax = 2 * speedRatio;
  let previousDelta = 1e-9;
  let previousValue = foldEndpointEquation(speedRatio, kappa, previousDelta);

  for (let index = 1; index <= 20000; index += 1) {
    const delta = 1e-9 + ((domainMax - 1e-9) * index) / 20000;
    const value = foldEndpointEquation(speedRatio, kappa, delta);
    if (
      Number.isFinite(previousValue) &&
      Number.isFinite(value) &&
      previousValue * value < 0
    ) {
      const root = solveFoldDelta(speedRatio, kappa, previousDelta, delta);
      if (
        Number.isFinite(root) &&
        !roots.some((candidate) => Math.abs(candidate - root) <= 1e-9)
      ) {
        roots.push(root);
      }
    }
    previousDelta = delta;
    previousValue = value;
  }

  return roots
    .map((delta) => {
      const cosineComponent =
        (2 * delta) / (speedRatio * speedRatio) + kappa * Math.cos(delta);
      const sineComponent =
        2 -
        (delta * delta) / (speedRatio * speedRatio) -
        kappa * Math.sin(delta);
      const phi = Math.atan2(sineComponent, cosineComponent);
      let thetaTilde = 0.5 * (phi + delta);
      while (thetaTilde < 0) {
        thetaTilde += Math.PI;
      }
      while (thetaTilde >= Math.PI) {
        thetaTilde -= Math.PI;
      }
      return {
        kappa,
        theta_tilde: thetaTilde,
        theta: thetaTilde - QUARTER_PERIOD,
        delta,
        phi,
        fold_equation_residual: foldEndpointEquation(speedRatio, kappa, delta),
      };
    })
    .sort((left, right) => left.theta_tilde - right.theta_tilde);
}

function buildTheta3minusFoldNormalForm(speedRatio) {
  const kappaPositiveEndpoints = solveFoldEndpoints(speedRatio, 1);
  const endpoint = kappaPositiveEndpoints.find(
    (row) => row.theta > 0 && row.theta < QUARTER_PERIOD
  );
  if (!endpoint) {
    throw new Error("no theta_3minus kappa=+1 fold endpoint found");
  }
  const kappa = 1;
  const sigma = -1;
  const fTheta = 2 * Math.cos(endpoint.phi);
  const fDeltaDelta =
    2 / (speedRatio * speedRatio) -
    Math.sin(endpoint.phi) -
    kappa * Math.sin(endpoint.delta);
  const kernelB = -0.5 * (Math.cos(endpoint.phi) + kappa * Math.cos(endpoint.delta));
  const alpha = (-2 * fTheta) / fDeltaDelta;
  const beta = Math.sqrt(Math.abs(alpha));
  const foldedSide = alpha < 0 ? "left" : "right";
  const analyticSquareLimit =
    (8 * sigma * kernelB) /
    (speedRatio *
      endpoint.delta *
      endpoint.delta *
      Math.abs(fDeltaDelta) *
      Math.sqrt(Math.abs(alpha)));
  return {
    speed_ratio: formatSmallNumber(speedRatio),
    source_label: "3-",
    kappa,
    force_sign: sigma,
    theta_tilde_shift: "H/4",
    theta_tilde_fold: formatNumber(endpoint.theta_tilde),
    theta_fold: formatNumber(endpoint.theta),
    delta_fold: formatNumber(endpoint.delta),
    phi_fold: formatNumber(endpoint.phi),
    F_theta: formatNumber(fTheta),
    F_delta_delta: formatNumber(fDeltaDelta),
    B_kernel: formatNumber(kernelB),
    alpha: formatNumber(alpha),
    beta: formatNumber(beta),
    folded_side: foldedSide,
    analytic_square_limit: formatSmallNumber(analyticSquareLimit),
    limit_sign: signLabel(analyticSquareLimit),
    F_theta_sign: signLabel(fTheta),
    F_delta_delta_sign: signLabel(fDeltaDelta),
    alpha_sign: signLabel(alpha),
    formula:
      "L_f=8 sigma B_f/(v delta_f^2 |F_delta_delta| sqrt(|alpha_f|)) on the folded side",
    fold_equation_residual: formatSmallNumber(endpoint.fold_equation_residual),
  };
}

function buildMovingCollarSamples({
  foldRows,
  ySamples,
  rootSubdivisions,
}) {
  return foldRows.map((foldRow) => {
    const speedRatio = Number(foldRow.speed_ratio);
    const thetaFold = Number(foldRow.theta_fold);
    const sampleRows = ySamples.map((y) => {
      const theta = thetaFold - y * y;
      const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
        speedRatio,
        theta,
        rootSubdivisions,
      });
      const G = 2 * y * evaluation.value;
      const D = 4 * y ** 3 * evaluation.derivative;
      return {
        y: formatSmallNumber(y),
        theta: formatNumber(theta),
        forcing: formatSmallNumber(evaluation.value),
        derivative: formatSmallNumber(evaluation.derivative),
        G: formatSmallNumber(G),
        D: formatSmallNumber(D),
        G_sign: signLabel(G),
        D_sign: signLabel(D),
        source_root_count: evaluation.source_root_count,
        term_root_count_signature: evaluation.terms
          .map((term) => term.root_count)
          .join(","),
      };
    });
    return {
      speed_ratio: foldRow.speed_ratio,
      theta_fold: foldRow.theta_fold,
      y_sample_count: sampleRows.length,
      minimum_abs_G_sample_margin: formatSmallNumber(
        Math.min(...sampleRows.map((row) => Math.abs(Number(row.G))))
      ),
      minimum_abs_D_sample_margin: formatSmallNumber(
        Math.min(...sampleRows.map((row) => Math.abs(Number(row.D))))
      ),
      maximum_G_sample: formatSmallNumber(
        Math.max(...sampleRows.map((row) => Number(row.G)))
      ),
      maximum_D_sample: formatSmallNumber(
        Math.max(...sampleRows.map((row) => Number(row.D)))
      ),
      all_G_samples_negative: sampleRows.every((row) => row.G_sign === "-"),
      all_D_samples_negative: sampleRows.every((row) => row.D_sign === "-"),
      all_term_root_signatures_preserved: sampleRows.every(
        (row) => row.term_root_count_signature === EXPECTED_TERM_ROOT_SIGNATURE
      ),
      sample_rows: sampleRows,
      status:
        sampleRows.every(
          (row) =>
            row.G_sign === "-" &&
            row.D_sign === "-" &&
            row.term_root_count_signature === EXPECTED_TERM_ROOT_SIGNATURE
        )
          ? "sampled-moving-fold-collar-GD-signs-certified"
          : "sampled-moving-fold-collar-GD-signs-open",
    };
  });
}

function summarizeFoldRows(foldRows) {
  const limits = foldRows.map((row) => Number(row.analytic_square_limit));
  const thetaFolds = foldRows.map((row) => Number(row.theta_fold));
  const deltas = foldRows.map((row) => Number(row.delta_fold));
  const alphas = foldRows.map((row) => Number(row.alpha));
  return {
    speed_sample_count: foldRows.length,
    theta_fold_enclosure_sample_hull: [
      formatSmallNumber(Math.min(...thetaFolds)),
      formatSmallNumber(Math.max(...thetaFolds)),
    ],
    delta_fold_sample_hull: [
      formatSmallNumber(Math.min(...deltas)),
      formatSmallNumber(Math.max(...deltas)),
    ],
    alpha_sample_hull: [
      formatSmallNumber(Math.min(...alphas)),
      formatSmallNumber(Math.max(...alphas)),
    ],
    analytic_square_limit_sample_hull: [
      formatSmallNumber(Math.min(...limits)),
      formatSmallNumber(Math.max(...limits)),
    ],
    minimum_abs_analytic_square_limit_margin: formatSmallNumber(
      Math.min(...limits.map((value) => Math.abs(value)))
    ),
    maximum_speed_endpoint_limit_drift_abs: formatSmallNumber(
      Math.max(...limits) - Math.min(...limits)
    ),
    all_limits_negative: foldRows.every((row) => row.limit_sign === "-"),
    all_fold_sides_left: foldRows.every((row) => row.folded_side === "left"),
    all_alpha_negative: foldRows.every((row) => row.alpha_sign === "-"),
    all_F_theta_negative: foldRows.every((row) => row.F_theta_sign === "-"),
    all_F_delta_delta_negative: foldRows.every(
      (row) => row.F_delta_delta_sign === "-"
    ),
    status:
      foldRows.every(
        (row) =>
          row.limit_sign === "-" &&
          row.folded_side === "left" &&
          row.alpha_sign === "-" &&
          row.F_theta_sign === "-" &&
          row.F_delta_delta_sign === "-"
      )
        ? "sampled-speed-dependent-fold-normal-form-margin-certified"
        : "sampled-speed-dependent-fold-normal-form-margin-open",
  };
}

function summarizeMovingCollarRows(rows) {
  const flatRows = rows.flatMap((row) => row.sample_rows);
  return {
    moving_collar_speed_row_count: rows.length,
    moving_collar_sample_count: flatRows.length,
    minimum_abs_G_sample_margin: formatSmallNumber(
      Math.min(...flatRows.map((row) => Math.abs(Number(row.G))))
    ),
    minimum_abs_D_sample_margin: formatSmallNumber(
      Math.min(...flatRows.map((row) => Math.abs(Number(row.D))))
    ),
    maximum_G_sample: formatSmallNumber(
      Math.max(...flatRows.map((row) => Number(row.G)))
    ),
    maximum_D_sample: formatSmallNumber(
      Math.max(...flatRows.map((row) => Number(row.D)))
    ),
    all_G_samples_negative: flatRows.every((row) => row.G_sign === "-"),
    all_D_samples_negative: flatRows.every((row) => row.D_sign === "-"),
    all_term_root_signatures_preserved: flatRows.every(
      (row) => row.term_root_count_signature === EXPECTED_TERM_ROOT_SIGNATURE
    ),
    status:
      rows.every(
        (row) => row.status === "sampled-moving-fold-collar-GD-signs-certified"
      )
        ? "sampled-moving-fold-collar-GD-signs-certified"
        : "sampled-moving-fold-collar-GD-signs-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm(
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

  const foldRows = speedSamples.map(buildTheta3minusFoldNormalForm);
  const foldSummary = summarizeFoldRows(foldRows);
  const movingCollarRows = buildMovingCollarSamples({
    foldRows,
    ySamples,
    rootSubdivisions,
  });
  const movingCollarSummary = summarizeMovingCollarRows(movingCollarRows);
  const sampledCertificatePassed =
    foldSummary.status ===
      "sampled-speed-dependent-fold-normal-form-margin-certified" &&
    movingCollarSummary.status ===
      "sampled-moving-fold-collar-GD-signs-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_NORMAL_FORM_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-fold-square-limit-atlas.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.md",
    normal_form_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      speed_samples: speedSamples.map(formatSmallNumber),
      y_samples: ySamples.map(formatSmallNumber),
      root_subdivisions: rootSubdivisions,
      expected_term_root_count_signature: EXPECTED_TERM_ROOT_SIGNATURE,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
    },
    speed_dependent_fold_normal_form_rows: foldRows,
    speed_dependent_fold_normal_form_summary: foldSummary,
    moving_fold_collar_sample_rows: movingCollarRows,
    moving_fold_collar_sample_summary: movingCollarSummary,
    normal_form_theorem_target: {
      G_definition: "G(y,nu)=2y f_cross(theta_3minus(nu)-y^2;nu)",
      D_definition: "D(y,nu)=G(y,nu)-y*d_yG(y,nu)",
      derivative_identity:
        "f'_theta(theta_3minus(nu)-y^2;nu)=D(y,nu)/(4y^3)",
      remainder_target:
        "G=L(nu)+R_G and D=L(nu)+R_D with L_+<0 and |R_G|,|R_D|<-L_+",
      theorem_status: "directed-rounded-normal-form-remainder-open",
    },
    interval_profile_boundary: {
      certifies_sampled_speed_dependent_fold_normal_form_margin:
        foldSummary.status ===
        "sampled-speed-dependent-fold-normal-form-margin-certified",
      certifies_sampled_speed_dependent_moving_collar_GD_signs:
        movingCollarSummary.status ===
        "sampled-moving-fold-collar-GD-signs-certified",
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      open_quantity_names: [
        "directed_rounded_speed_dependent_fold_normal_form_remainder",
        "theta_3minus_left_fold_collar_interval_radius",
        "I1_complement_sign_interval_enclosures",
        "I1_regular_critical_exhaustion",
        "interval_quadrature_enclosure",
        "retained_branch_status",
      ],
      status: sampledCertificatePassed
        ? "sampled-moving-fold-normal-form-certified-directed-rounded-remainder-open"
        : "sampled-moving-fold-normal-form-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_speed_dependent_fold_normal_form_margin:
        foldSummary.status ===
        "sampled-speed-dependent-fold-normal-form-margin-certified",
      certifies_sampled_speed_dependent_moving_collar_GD_signs:
        movingCollarSummary.status ===
        "sampled-moving-fold-collar-GD-signs-certified",
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      retained_branch: false,
      claim_level:
        "Sampled speed-dependent theta_3minus fold normal-form margin and moving-collar G,D signs. Directed-rounded normal-form remainders, full fold-collar interval radius, I1 complement sign interval enclosure, critical exhaustion, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: sampledCertificatePassed
        ? "sampled-speed-dependent-theta3minus-fold-normal-form-certified"
        : "sampled-speed-dependent-theta3minus-fold-normal-form-open",
      first_successor_row:
        "theta_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The fold-collar chart now moves with theta_3minus(nu). Sampled speed rows keep L(nu), G(y,nu), and D(y,nu) negative; the remaining theorem-grade burden is the directed-rounded normal-form remainder.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_NORMAL_FORM_SCHEMA,
    "schema must match theta3minus speed-dependent fold normal-form schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus speed-dependent fold normal-form packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.normal_form_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "normal-form packet must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.normal_form_parameters?.speed_band === undefined &&
      artifact?.normal_form_parameters?.speed_window === undefined &&
      artifact?.normal_form_parameters?.speed_min === undefined &&
      artifact?.normal_form_parameters?.speed_max === undefined,
    "normal-form parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.speed_dependent_fold_normal_form_summary?.status ===
      "sampled-speed-dependent-fold-normal-form-margin-certified" &&
      artifact?.speed_dependent_fold_normal_form_summary?.all_limits_negative ===
        true &&
      artifact?.speed_dependent_fold_normal_form_summary?.all_fold_sides_left ===
        true &&
      Number(
        artifact?.speed_dependent_fold_normal_form_summary
          ?.minimum_abs_analytic_square_limit_margin
      ) > 0.19,
    "speed-dependent fold normal-form samples must keep a negative left-fold limit margin",
    errors
  );
  assertField(
    artifact?.moving_fold_collar_sample_summary?.status ===
      "sampled-moving-fold-collar-GD-signs-certified" &&
      artifact?.moving_fold_collar_sample_summary?.all_G_samples_negative ===
        true &&
      artifact?.moving_fold_collar_sample_summary?.all_D_samples_negative ===
        true &&
      artifact?.moving_fold_collar_sample_summary
        ?.all_term_root_signatures_preserved === true &&
      Number(
        artifact?.moving_fold_collar_sample_summary?.minimum_abs_G_sample_margin
      ) > 0.18 &&
      Number(
        artifact?.moving_fold_collar_sample_summary?.minimum_abs_D_sample_margin
      ) > 0.18,
    "moving fold-collar samples must keep G,D negative with preserved root signatures",
    errors
  );
  assertField(
    artifact?.normal_form_theorem_target?.theorem_status ===
      "directed-rounded-normal-form-remainder-open" &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder ===
        false &&
      artifact?.artifact_claim
        ?.certifies_theta_3minus_left_fold_collar_interval_radius === false &&
      artifact?.artifact_claim?.certifies_I1_complement_sign_interval_enclosures ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep remainder, fold-collar interval radius, I1 closure, quadrature, and retention open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "sampled-speed-dependent-theta3minus-fold-normal-form-certified" &&
      artifact?.result?.first_successor_row ===
        "theta_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must advance only to the directed-rounded normal-form remainder successor",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs [options]",
    "",
    "Options:",
    "  --out <path>              Write artifact JSON to path",
    "  --validate <path>         Validate an existing artifact JSON file",
    "  --schema                  Print schema JSON",
    "  --pretty                  Pretty-print JSON",
    "  --subdivisions <n>        Source-root subdivisions (default: 5000)",
    "  --speed-samples <list>    Comma-separated speed samples inside certified enclosure",
    "  --y-samples <list>        Comma-separated positive decreasing y samples",
    "  --help                    Show this help",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    outPath: null,
    validatePath: null,
    printSchema: false,
    pretty: false,
    help: false,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    speedSamples: DEFAULT_SPEED_SAMPLES,
    ySamples: DEFAULT_Y_SAMPLES,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--schema" || arg === "--print-schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--speed-samples") {
      args.speedSamples = argv[++index];
    } else if (arg === "--y-samples") {
      args.ySamples = argv[++index];
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument ${arg}`);
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
  if (args.printSchema) {
    console.log(
      JSON.stringify(
        {
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_NORMAL_FORM_SCHEMA,
        },
        null,
        args.pretty ? 2 : 0
      )
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm(
        artifact
      );
    console.log(
      JSON.stringify(
        {
          valid: errors.length === 0,
          errors,
          result: artifact.result ?? null,
        },
        null,
        args.pretty ? 2 : 0
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      rootSubdivisions: args.rootSubdivisions,
      speedSamples: args.speedSamples,
      ySamples: args.ySamples,
    });
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm(
      artifact
    );
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.outPath) {
    fs.mkdirSync(path.dirname(args.outPath), { recursive: true });
    fs.writeFileSync(args.outPath, `${json}\n`);
  } else {
    console.log(json);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

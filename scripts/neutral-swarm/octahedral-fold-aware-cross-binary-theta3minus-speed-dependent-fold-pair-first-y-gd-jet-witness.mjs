#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_JET_WITNESS_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_jet_witness";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const ORDER = 4;
const SOURCE_COEFFICIENT = -1;

function formatSmallNumber(value) {
  return root.formatSmallNumber(value);
}

function zeros() {
  return Array.from({ length: ORDER + 1 }, () => 0);
}

function constant(value) {
  const series = zeros();
  series[0] = value;
  return series;
}

function variableY() {
  const series = zeros();
  series[1] = 1;
  return series;
}

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(series, factor) {
  return series.map((value) => value * factor);
}

function multiply(left, right) {
  const result = zeros();
  for (let leftIndex = 0; leftIndex <= ORDER; leftIndex += 1) {
    for (
      let rightIndex = 0;
      rightIndex + leftIndex <= ORDER;
      rightIndex += 1
    ) {
      result[leftIndex + rightIndex] += left[leftIndex] * right[rightIndex];
    }
  }
  return result;
}

function power(series, exponent) {
  let result = constant(1);
  for (let index = 0; index < exponent; index += 1) {
    result = multiply(result, series);
  }
  return result;
}

function inverse(series) {
  const result = zeros();
  result[0] = 1 / series[0];
  for (let order = 1; order <= ORDER; order += 1) {
    let convolution = 0;
    for (let index = 1; index <= order; index += 1) {
      convolution += series[index] * result[order - index];
    }
    result[order] = -convolution / series[0];
  }
  return result;
}

function divide(left, right) {
  return multiply(left, inverse(right));
}

function derivative(series) {
  const result = zeros();
  for (let order = 1; order <= ORDER; order += 1) {
    result[order - 1] = order * series[order];
  }
  return result;
}

function sinSeries(series) {
  const center = series[0];
  const nilpotent = [...series];
  nilpotent[0] = 0;
  const n2 = power(nilpotent, 2);
  const n3 = multiply(n2, nilpotent);
  const n4 = multiply(n2, n2);
  const sinN = add(nilpotent, scale(n3, -1 / 6));
  const cosN = add(subtract(constant(1), scale(n2, 1 / 2)), scale(n4, 1 / 24));
  return add(scale(cosN, Math.sin(center)), scale(sinN, Math.cos(center)));
}

function cosSeries(series) {
  const center = series[0];
  const nilpotent = [...series];
  nilpotent[0] = 0;
  const n2 = power(nilpotent, 2);
  const n3 = multiply(n2, nilpotent);
  const n4 = multiply(n2, n2);
  const sinN = add(nilpotent, scale(n3, -1 / 6));
  const cosN = add(subtract(constant(1), scale(n2, 1 / 2)), scale(n4, 1 / 24));
  return subtract(scale(cosN, Math.cos(center)), scale(sinN, Math.sin(center)));
}

function coefficientHull(values) {
  return [
    formatSmallNumber(Math.min(...values)),
    formatSmallNumber(Math.max(...values)),
  ];
}

function gammaCoefficient(row) {
  const phi = Number(row.phi_fold);
  const delta = Number(row.delta_fold);
  const beta = Number(row.beta);
  const fThetaDelta = 2 * Math.sin(phi);
  const fDeltaDeltaDelta = Math.cos(phi) - Math.cos(delta);
  return (
    (fThetaDelta - (fDeltaDeltaDelta * beta * beta) / 6) /
    Number(row.F_delta_delta)
  );
}

function sourceEquationSeries({ row, branchSign, h0 }) {
  const speedRatio = Number(row.speed_ratio);
  const theta = constant(Number(row.theta_tilde_fold));
  theta[2] = -1;
  const beta = Number(row.beta);
  const gamma = gammaCoefficient(row);
  const delta = constant(Number(row.delta_fold));
  delta[1] = branchSign * beta;
  delta[2] = gamma;
  delta[3] = h0;
  const phi = subtract(scale(theta, 2), delta);
  return add(
    add(scale(power(delta, 2), 1 / (speedRatio * speedRatio)), constant(-2)),
    add(sinSeries(phi), sinSeries(delta))
  );
}

function solveH0({ row, branchSign }) {
  const zeroSeries = sourceEquationSeries({ row, branchSign, h0: 0 });
  const oneSeries = sourceEquationSeries({ row, branchSign, h0: 1 });
  const slope = oneSeries[4] - zeroSeries[4];
  return -zeroSeries[4] / slope;
}

function branchGSeries({ row, branchSign, h0 }) {
  const speedRatio = Number(row.speed_ratio);
  const theta = constant(Number(row.theta_tilde_fold));
  theta[2] = -1;
  const beta = Number(row.beta);
  const gamma = gammaCoefficient(row);
  const delta = constant(Number(row.delta_fold));
  delta[1] = branchSign * beta;
  delta[2] = gamma;
  delta[3] = h0;
  const phi = subtract(scale(theta, 2), delta);
  const kernel = scale(add(cosSeries(phi), cosSeries(delta)), -0.5);
  const fDelta = add(
    add(scale(delta, 2 / (speedRatio * speedRatio)), scale(cosSeries(phi), -1)),
    cosSeries(delta)
  );
  const j = zeros();
  for (let order = 0; order < ORDER; order += 1) {
    j[order] = fDelta[order + 1];
  }
  const absJ = scale(j, -branchSign);
  const denominator = scale(multiply(power(delta, 2), absJ), speedRatio);
  return divide(scale(kernel, 4 * SOURCE_COEFFICIENT), denominator);
}

function transformedDSeries(pairGSeries) {
  return subtract(pairGSeries, multiply(variableY(), derivative(pairGSeries)));
}

function rowForSpeedSample({ row, speedIndex }) {
  const branchRows = ["-", "+"].map((branch) => {
    const sign = root.branchSign(branch);
    const h0 = solveH0({ row, branchSign: sign });
    const equationSeries = sourceEquationSeries({ row, branchSign: sign, h0 });
    const gSeries = branchGSeries({ row, branchSign: sign, h0 });
    return {
      branch,
      h0,
      h_tube: root.BRANCH_H_TUBES[branch],
      h0_inside_predecessor_tube:
        h0 >= root.BRANCH_H_TUBES[branch][0] &&
        h0 <= root.BRANCH_H_TUBES[branch][1],
      source_equation_coefficients_y0_to_y4:
        equationSeries.map(formatSmallNumber),
      max_abs_source_equation_coeff_y0_to_y4: formatSmallNumber(
        Math.max(...equationSeries.map((value) => Math.abs(value)))
      ),
      G_branch_coefficients_y0_to_y2: gSeries
        .slice(0, 3)
        .map(formatSmallNumber),
    };
  });
  const branchByName = Object.fromEntries(
    branchRows.map((branchRow) => [branchRow.branch, branchRow])
  );
  const gMinus = branchGSeries({
    row,
    branchSign: -1,
    h0: branchByName["-"].h0,
  });
  const gPlus = branchGSeries({
    row,
    branchSign: 1,
    h0: branchByName["+"].h0,
  });
  const pairG = add(gMinus, gPlus);
  const pairD = transformedDSeries(pairG);
  const limit = Number(row.analytic_square_limit);
  return {
    speed_index: speedIndex,
    speed_ratio: formatSmallNumber(Number(row.speed_ratio)),
    L_sample: formatSmallNumber(limit),
    gamma_sample: formatSmallNumber(gammaCoefficient(row)),
    branch_rows: branchRows.map((branchRow) => ({
      ...branchRow,
      h0: formatSmallNumber(branchRow.h0),
      h_tube: branchRow.h_tube.map(formatSmallNumber),
    })),
    G_pair_coefficients_y0_to_y3: pairG.slice(0, 4).map(formatSmallNumber),
    D_pair_coefficients_y0_to_y3: pairD.slice(0, 4).map(formatSmallNumber),
    P0_minus_L: formatSmallNumber(pairG[0] - limit),
    P1: formatSmallNumber(pairG[1]),
    D0_minus_L: formatSmallNumber(pairD[0] - limit),
    D1: formatSmallNumber(pairD[1]),
    Q_G_first_y_constant_sample: formatSmallNumber(pairG[2]),
    Q_D_first_y_constant_sample: formatSmallNumber(pairD[2]),
    Q_D_plus_Q_G_constant_residual: formatSmallNumber(pairD[2] + pairG[2]),
    cancellation_status:
      Math.abs(pairG[0] - limit) < 1e-10 &&
      Math.abs(pairG[1]) < 1e-10 &&
      Math.abs(pairD[0] - limit) < 1e-10 &&
      Math.abs(pairD[1]) < 1e-10 &&
      Math.abs(pairD[2] + pairG[2]) < 1e-10 &&
      branchRows.every((branchRow) => branchRow.h0_inside_predecessor_tube)
        ? "sampled-first-y-GD-jet-cancellation-certified"
        : "sampled-first-y-GD-jet-cancellation-open",
  };
}

function summarizeRows(rows) {
  const qGValues = rows.map((row) => Number(row.Q_G_first_y_constant_sample));
  const qDValues = rows.map((row) => Number(row.Q_D_first_y_constant_sample));
  const maxAbsP0MinusL = Math.max(
    ...rows.map((row) => Math.abs(Number(row.P0_minus_L)))
  );
  const maxAbsP1 = Math.max(...rows.map((row) => Math.abs(Number(row.P1))));
  const maxAbsD0MinusL = Math.max(
    ...rows.map((row) => Math.abs(Number(row.D0_minus_L)))
  );
  const maxAbsD1 = Math.max(...rows.map((row) => Math.abs(Number(row.D1))));
  const maxAbsQdPlusQg = Math.max(
    ...rows.map((row) => Math.abs(Number(row.Q_D_plus_Q_G_constant_residual)))
  );
  const branchRows = rows.flatMap((row) => row.branch_rows);
  const maxAbsSourceEquationCoeff = Math.max(
    ...branchRows.map((row) =>
      Math.abs(Number(row.max_abs_source_equation_coeff_y0_to_y4))
    )
  );
  const allH0InsideTubes = branchRows.every(
    (row) => row.h0_inside_predecessor_tube
  );
  const passed =
    rows.every(
      (row) =>
        row.cancellation_status ===
        "sampled-first-y-GD-jet-cancellation-certified"
    ) &&
    maxAbsP0MinusL < 1e-10 &&
    maxAbsP1 < 1e-10 &&
    maxAbsD0MinusL < 1e-10 &&
    maxAbsD1 < 1e-10 &&
    maxAbsQdPlusQg < 1e-10 &&
    maxAbsSourceEquationCoeff < 1e-10 &&
    allH0InsideTubes;
  return {
    speed_sample_count: rows.length,
    branch_sample_count: branchRows.length,
    all_h0_inside_predecessor_tubes: allH0InsideTubes,
    max_abs_source_equation_coeff_y0_to_y4: formatSmallNumber(
      maxAbsSourceEquationCoeff
    ),
    max_abs_P0_minus_L: formatSmallNumber(maxAbsP0MinusL),
    max_abs_P1: formatSmallNumber(maxAbsP1),
    max_abs_D0_minus_L: formatSmallNumber(maxAbsD0MinusL),
    max_abs_D1: formatSmallNumber(maxAbsD1),
    max_abs_Q_D_plus_Q_G_constant_residual: formatSmallNumber(maxAbsQdPlusQg),
    Q_G_first_y_constant_sample_hull: coefficientHull(qGValues),
    Q_D_first_y_constant_sample_hull: coefficientHull(qDValues),
    status: passed
      ? "sampled-theta3minus-fold-pair-first-y-GD-jet-cancellation-witness-certified"
      : "sampled-theta3minus-fold-pair-first-y-GD-jet-cancellation-witness-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness(
  options = {}
) {
  const speedBreaks = root.makeSpeedBreaks(
    options.speedCellCount ?? root.DEFAULT_SPEED_CELL_COUNT
  );
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? root.DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  const normalForm =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      speedSamples: speedBreaks,
      ySamples: [0.115, 0.01, 0.001, 0.0005],
      rootSubdivisions,
    });
  const rows = normalForm.speed_dependent_fold_normal_form_rows.map(
    (row, speedIndex) => rowForSpeedSample({ row, speedIndex })
  );
  const summary = summarizeRows(rows);
  const passed =
    summary.status ===
    "sampled-theta3minus-fold-pair-first-y-GD-jet-cancellation-witness-certified";
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_JET_WITNESS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.md",
    witness_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: speedBreaks.length - 1,
      speed_ratio_samples: speedBreaks.map(formatSmallNumber),
      series_order: ORDER,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      h_root_graph_chart:
        "delta_epsilon=delta_f+epsilon*beta*y+gamma*y^2+h0_epsilon*y^3+O(y^4)",
      cancellation_equations: [
        "P(y,nu)=G_-(y,nu)+G_+(y,nu)",
        "P(0,nu)=L(nu)",
        "P'(0,nu)=0",
        "D_pair=P-y*P'",
        "Q_G_first_y=P_2+O(y)",
        "Q_D_first_y=-P_2+O(y)",
      ],
      zero_touching_cell_policy:
        "sampled analytic jet only; no raw y^-2 division and no directed-rounded first-y-cell enclosure claim",
      root_subdivisions_for_fold_rows: rootSubdivisions,
    },
    first_y_jet_rows: rows,
    first_y_jet_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-h-graph-positive-y-GD-quotient",
        status: "directed-rounded-cell-cover-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-jet-cancellation",
        status: passed ? "sampled-analytic-jet-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-constant-coefficient",
        status: "directed-rounded-successor-required",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: "open",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "blocked-by-directed-rounded-first-y-GD-enclosure",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_first_y_GD_jet_cancellation: passed,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover: false,
      certifies_directed_rounded_fold_pair_D_quotient_cell_cover: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Sampled analytic first-y-cell jet witness for the fold-pair G,D cancellation on the h-root graph. It proves the coefficient mechanism at speed cell endpoints and emits the finite constants the directed-rounded first-y enclosure must bound.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-constant-coefficient-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The first-y singularity is now reduced to enclosing a known analytic jet coefficient. The sampled rows verify P(0)=L, P'(0)=0, D_pair=P-yP', and Q_D=-Q_G at the constant quotient level.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_JET_WITNESS_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D jet witness schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D jet witness packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.witness_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "first-y jet witness must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.witness_parameters?.speed_band === undefined &&
      artifact?.witness_parameters?.speed_window === undefined &&
      artifact?.witness_parameters?.speed_min === undefined &&
      artifact?.witness_parameters?.speed_max === undefined,
    "first-y jet parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.first_y_jet_summary?.status ===
      "sampled-theta3minus-fold-pair-first-y-GD-jet-cancellation-witness-certified" &&
      artifact?.first_y_jet_summary?.speed_sample_count === 17 &&
      artifact?.first_y_jet_summary?.branch_sample_count === 34 &&
      artifact?.first_y_jet_summary?.all_h0_inside_predecessor_tubes === true &&
      Number(artifact?.first_y_jet_summary?.max_abs_P0_minus_L) < 1e-10 &&
      Number(artifact?.first_y_jet_summary?.max_abs_P1) < 1e-10 &&
      Number(artifact?.first_y_jet_summary?.max_abs_D0_minus_L) < 1e-10 &&
      Number(artifact?.first_y_jet_summary?.max_abs_D1) < 1e-10 &&
      Number(
        artifact?.first_y_jet_summary
          ?.max_abs_Q_D_plus_Q_G_constant_residual
      ) < 1e-10,
    "first-y jet rows must certify sampled cancellation and h0 tube membership",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_sampled_first_y_GD_jet_cancellation ===
      true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_enclosure === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_D_quotient_cell_cover === false &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep directed-rounded first-y, full quotient, remainder, I1, and retention open",
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
    } else if (arg === "--speed-cell-count") {
      options.speedCellCount = argv[++index];
    } else if (arg === "--root-subdivisions") {
      options.rootSubdivisions = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.mjs [options]",
    "",
    "Options:",
    "  --out <path>                  Write artifact JSON",
    "  --validate <path>             Validate an artifact JSON",
    "  --schema                      Print artifact schema metadata",
    "  --speed-cell-count <count>    Number of speed cells covering [3.02156,3.02157]",
    "  --root-subdivisions <count>   Root subdivisions passed to the normal-form predecessor",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_JET_WITNESS_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness(
      options
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness(
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

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_scaled_sampled_node_interval_certificate";
const PROMOTION_STATUS = "priority-only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const NO_SPEED_WINDOW =
  "none; receiver-normal zero-bracket restart required before this stencil can be active evidence";
const QUARTER_PERIOD = Math.PI / 2;
const KAPPA = 1;
const SIGMA = 1;
const TERM_COEFFICIENT = -1;
const DEFAULT_Z_RADIUS = 0.00001;

const NEXT_FLOAT_BUFFER = new ArrayBuffer(8);
const NEXT_FLOAT_VIEW = new DataView(NEXT_FLOAT_BUFFER);

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function formatInterval(interval) {
  return interval.map(formatSmallNumber);
}

function nextUp(value) {
  if (Number.isNaN(value) || value === Infinity) {
    return value;
  }
  if (value === 0) {
    return Number.MIN_VALUE;
  }
  NEXT_FLOAT_VIEW.setFloat64(0, value, false);
  let bits = NEXT_FLOAT_VIEW.getBigUint64(0, false);
  bits += value > 0 ? 1n : -1n;
  NEXT_FLOAT_VIEW.setBigUint64(0, bits, false);
  return NEXT_FLOAT_VIEW.getFloat64(0, false);
}

function nextDown(value) {
  if (Number.isNaN(value) || value === -Infinity) {
    return value;
  }
  if (value === 0) {
    return -Number.MIN_VALUE;
  }
  NEXT_FLOAT_VIEW.setFloat64(0, value, false);
  let bits = NEXT_FLOAT_VIEW.getBigUint64(0, false);
  bits += value > 0 ? -1n : 1n;
  NEXT_FLOAT_VIEW.setBigUint64(0, bits, false);
  return NEXT_FLOAT_VIEW.getFloat64(0, false);
}

function outwardInterval([left, right]) {
  return [nextDown(left), nextUp(right)];
}

function pointInterval(value) {
  return outwardInterval([value, value]);
}

function scaleInterval([left, right], scale) {
  return scale >= 0
    ? [nextDown(scale * left), nextUp(scale * right)]
    : [nextDown(scale * right), nextUp(scale * left)];
}

function addIntervals(...intervals) {
  let sumLeft = 0;
  let sumRight = 0;
  for (const [left, right] of intervals) {
    sumLeft = nextDown(sumLeft + left);
    sumRight = nextUp(sumRight + right);
  }
  return [sumLeft, sumRight];
}

function subtractIntervals(left, right) {
  return addIntervals(left, scaleInterval(right, -1));
}

function multiplyTwoIntervals([leftA, rightA], [leftB, rightB]) {
  const products = [
    leftA * leftB,
    leftA * rightB,
    rightA * leftB,
    rightA * rightB,
  ];
  return outwardInterval([Math.min(...products), Math.max(...products)]);
}

function multiplyIntervals(firstInterval, ...remainingIntervals) {
  return remainingIntervals.reduce(
    (productInterval, interval) =>
      multiplyTwoIntervals(productInterval, interval),
    firstInterval
  );
}

function reciprocalInterval([left, right]) {
  if (left <= 0 && right >= 0) {
    return [-Infinity, Infinity];
  }
  const reciprocals = [1 / left, 1 / right];
  return outwardInterval([
    Math.min(...reciprocals),
    Math.max(...reciprocals),
  ]);
}

function divideIntervals(numeratorInterval, denominatorInterval) {
  return multiplyIntervals(numeratorInterval, reciprocalInterval(denominatorInterval));
}

function positivePowerInterval(interval, exponent) {
  let product = [1, 1];
  for (let index = 0; index < exponent; index += 1) {
    product = multiplyIntervals(product, interval);
  }
  return product;
}

function intervalSignAndClearance([left, right]) {
  if (left > 0) {
    return { sign: "+", clearance: left };
  }
  if (right < 0) {
    return { sign: "-", clearance: -right };
  }
  return { sign: "mixed", clearance: 0 };
}

function definiteAbsoluteInterval(interval) {
  if (interval[0] > 0) {
    return interval;
  }
  if (interval[1] < 0) {
    return scaleInterval(interval, -1);
  }
  return [0, Math.max(Math.abs(interval[0]), Math.abs(interval[1]))];
}

function containsCriticalPoint({ left, right, offset }) {
  const twoPi = 2 * Math.PI;
  if (right - left >= twoPi) {
    return true;
  }
  const minIndex = Math.ceil((left - offset) / twoPi);
  const maxIndex = Math.floor((right - offset) / twoPi);
  return minIndex <= maxIndex;
}

function sinInterval([left, right]) {
  const twoPi = 2 * Math.PI;
  if (right - left >= twoPi) {
    return [-1, 1];
  }
  let lower = Math.min(Math.sin(left), Math.sin(right));
  let upper = Math.max(Math.sin(left), Math.sin(right));
  if (containsCriticalPoint({ left, right, offset: Math.PI / 2 })) {
    upper = 1;
  }
  if (containsCriticalPoint({ left, right, offset: -Math.PI / 2 })) {
    lower = -1;
  }
  return outwardInterval([lower, upper]);
}

function cosInterval([left, right]) {
  const twoPi = 2 * Math.PI;
  if (right - left >= twoPi) {
    return [-1, 1];
  }
  let lower = Math.min(Math.cos(left), Math.cos(right));
  let upper = Math.max(Math.cos(left), Math.cos(right));
  if (containsCriticalPoint({ left, right, offset: 0 })) {
    upper = 1;
  }
  if (containsCriticalPoint({ left, right, offset: Math.PI })) {
    lower = -1;
  }
  return outwardInterval([lower, upper]);
}

function sourcePhiInterval({ thetaTildeInterval, deltaInterval }) {
  return subtractIntervals(scaleInterval(thetaTildeInterval, 2), deltaInterval);
}

function sourceEquationInterval({ speedRatio, thetaTilde, deltaInterval }) {
  const speedSquared = speedRatio * speedRatio;
  const thetaTildeInterval = pointInterval(thetaTilde);
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return addIntervals(
    scaleInterval(positivePowerInterval(deltaInterval, 2), 1 / speedSquared),
    [-2, -2],
    sinInterval(phiInterval),
    sinInterval(deltaInterval)
  );
}

function sourceEquationPoint({ speedRatio, thetaTilde, delta }) {
  return (
    (delta * delta) / (speedRatio * speedRatio) -
    2 +
    Math.sin(2 * thetaTilde - delta) +
    Math.sin(delta)
  );
}

function refineRootNear({ speedRatio, thetaTilde, deltaGuess, initialWidth }) {
  let width = initialWidth;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const left = deltaGuess - width;
    const right = deltaGuess + width;
    const leftValue = sourceEquationPoint({
      speedRatio,
      thetaTilde,
      delta: left,
    });
    const rightValue = sourceEquationPoint({
      speedRatio,
      thetaTilde,
      delta: right,
    });
    if (leftValue === 0) {
      return left;
    }
    if (rightValue === 0) {
      return right;
    }
    if (Number.isFinite(leftValue) && Number.isFinite(rightValue) && leftValue * rightValue < 0) {
      let a = left;
      let b = right;
      let fa = leftValue;
      for (let step = 0; step < 90; step += 1) {
        const mid = 0.5 * (a + b);
        const fm = sourceEquationPoint({
          speedRatio,
          thetaTilde,
          delta: mid,
        });
        if (Math.abs(fm) <= 1e-15 || Math.abs(b - a) <= 1e-15) {
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
    width *= 2;
  }
  throw new Error("could not refine fold-pair root near sampled delta");
}

function sourceDeltaDerivativeInterval({
  speedRatio,
  thetaTilde,
  deltaInterval,
}) {
  const speedSquared = speedRatio * speedRatio;
  const thetaTildeInterval = pointInterval(thetaTilde);
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return addIntervals(
    scaleInterval(deltaInterval, 2 / speedSquared),
    scaleInterval(cosInterval(phiInterval), -1),
    cosInterval(deltaInterval)
  );
}

function sourceContributionIntervals({
  speedRatio,
  thetaTilde,
  deltaInterval,
  y,
}) {
  const speedInterval = pointInterval(speedRatio);
  const yInterval = pointInterval(y);
  const thetaTildeInterval = pointInterval(thetaTilde);
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  const sinPhi = sinInterval(phiInterval);
  const cosPhi = cosInterval(phiInterval);
  const sinDelta = sinInterval(deltaInterval);
  const cosDelta = cosInterval(deltaInterval);
  const FDelta = sourceDeltaDerivativeInterval({
    speedRatio,
    thetaTilde,
    deltaInterval,
  });
  const FDeltaSign = intervalSignAndClearance(FDelta).sign;
  if (FDeltaSign === "mixed") {
    return {
      F_delta_interval: FDelta,
      J_interval: divideIntervals(FDelta, yInterval),
      G_contribution_interval: [-Infinity, Infinity],
      D_contribution_interval: [-Infinity, Infinity],
      F_delta_sign: "mixed",
    };
  }

  const signFDelta = FDeltaSign === "+" ? 1 : -1;
  const absFDelta = definiteAbsoluteInterval(FDelta);
  const JInterval = divideIntervals(FDelta, yInterval);
  const absJInterval = definiteAbsoluteInterval(JInterval);
  const B = scaleInterval(addIntervals(cosPhi, cosDelta), -0.5);
  const deltaSquared = positivePowerInterval(deltaInterval, 2);
  const GContribution = divideIntervals(
    scaleInterval(B, 4 * TERM_COEFFICIENT * SIGMA),
    multiplyIntervals(speedInterval, deltaSquared, absJInterval)
  );

  const deltaPrime = divideIntervals(scaleInterval(cosPhi, -2), FDelta);
  const BPrime = addIntervals(
    sinPhi,
    scaleInterval(
      multiplyIntervals(subtractIntervals(sinDelta, sinPhi), deltaPrime),
      0.5 * KAPPA
    )
  );
  const FDeltaDelta = addIntervals(
    [2 / (speedRatio * speedRatio), 2 / (speedRatio * speedRatio)],
    scaleInterval(sinPhi, -1),
    scaleInterval(sinDelta, -KAPPA)
  );
  const FDeltaPrime = addIntervals(
    scaleInterval(sinPhi, 2),
    multiplyIntervals(FDeltaDelta, deltaPrime)
  );
  const inverseFactor = reciprocalInterval(
    multiplyIntervals(deltaSquared, absFDelta)
  );
  const inverseFactorPrime = addIntervals(
    divideIntervals(
      scaleInterval(deltaPrime, -2),
      multiplyIntervals(
        positivePowerInterval(deltaInterval, 3),
        absFDelta
      )
    ),
    divideIntervals(
      scaleInterval(FDeltaPrime, -signFDelta),
      multiplyIntervals(
        deltaSquared,
        positivePowerInterval(absFDelta, 2)
      )
    )
  );
  const sourceDerivativeContribution = scaleInterval(
    divideIntervals(
      addIntervals(
        multiplyIntervals(BPrime, inverseFactor),
        multiplyIntervals(B, inverseFactorPrime)
      ),
      speedInterval
    ),
    2 * SIGMA
  );
  const DContribution = scaleInterval(
    sourceDerivativeContribution,
    4 * y ** 3 * TERM_COEFFICIENT
  );

  return {
    F_delta_interval: FDelta,
    J_interval: JInterval,
    G_contribution_interval: GContribution,
    D_contribution_interval: DContribution,
    F_delta_sign: FDeltaSign,
  };
}

function zEndpointSign({
  speedRatio,
  thetaTilde,
  deltaFold,
  beta,
  y,
  branchSign,
  z,
}) {
  const delta = deltaFold + branchSign * beta * y + y * y * z;
  const equation = sourceEquationInterval({
    speedRatio,
    thetaTilde,
    deltaInterval: pointInterval(delta),
  });
  const K = divideIntervals(equation, pointInterval(y ** 3));
  const sign = intervalSignAndClearance(K);
  return {
    z: formatSmallNumber(z),
    delta_interval: formatInterval(pointInterval(delta)),
    F_interval: formatInterval(equation),
    K_interval: formatInterval(K),
    K_sign: sign.sign,
    K_clearance: formatSmallNumber(sign.clearance),
  };
}

function intervalRowForSample({ row, zRadius }) {
  const speedRatio = Number(row.speed_ratio);
  const y = Number(row.y);
  const thetaTilde = Number(row.theta) + QUARTER_PERIOD;
  const deltaFold = Number(row.delta_fold);
  const beta = Number(row.beta);
  const L = Number(row.L);
  const branchRows = row.fold_pair_rows.map((branchRow) => {
    const branchSign = branchRow.branch === "-" ? -1 : 1;
    const rootDelta = refineRootNear({
      speedRatio,
      thetaTilde,
      deltaGuess: Number(branchRow.delta),
      initialWidth: Math.max(y * y * zRadius * 2, 1e-14),
    });
    const centerZ =
      (rootDelta - deltaFold - branchSign * beta * y) / (y * y);
    const zInterval = [centerZ - zRadius, centerZ + zRadius];
    const deltaInterval = addIntervals(
      pointInterval(deltaFold + branchSign * beta * y),
      scaleInterval(zInterval, y * y)
    );
    const endpointRows = [
      zEndpointSign({
        speedRatio,
        thetaTilde,
        deltaFold,
        beta,
        y,
        branchSign,
        z: zInterval[0],
      }),
      zEndpointSign({
        speedRatio,
        thetaTilde,
        deltaFold,
        beta,
        y,
        branchSign,
        z: zInterval[1],
      }),
    ];
    const contribution = sourceContributionIntervals({
      speedRatio,
      thetaTilde,
      deltaInterval,
      y,
    });
    const JSign = intervalSignAndClearance(contribution.J_interval);
    const endpointSigns = endpointRows.map((endpoint) => endpoint.K_sign);
    const bracketCertified =
      endpointSigns.includes("+") && endpointSigns.includes("-");
    return {
      branch: branchRow.branch,
      z_center: formatSmallNumber(centerZ),
      z_interval: formatInterval(zInterval),
      delta_interval: formatInterval(deltaInterval),
      endpoint_rows: endpointRows,
      endpoint_bracket_certified: bracketCertified,
      J_interval: formatInterval(contribution.J_interval),
      J_sign: JSign.sign,
      J_clearance: formatSmallNumber(JSign.clearance),
      G_contribution_interval: formatInterval(
        contribution.G_contribution_interval
      ),
      D_contribution_interval: formatInterval(
        contribution.D_contribution_interval
      ),
    };
  });
  const GPairInterval = addIntervals(
    ...branchRows.map((branch) => branch.G_contribution_interval)
  );
  const DPairInterval = addIntervals(
    ...branchRows.map((branch) => branch.D_contribution_interval)
  );
  const RGPairInterval = subtractIntervals(GPairInterval, pointInterval(L));
  const RDPairInterval = subtractIntervals(DPairInterval, pointInterval(L));
  const ySquared = pointInterval(y * y);
  const RGQuotientInterval = divideIntervals(RGPairInterval, ySquared);
  const RDQuotientInterval = divideIntervals(RDPairInterval, ySquared);
  return {
    speed_ratio: formatSmallNumber(speedRatio),
    y: formatSmallNumber(y),
    theta: formatSmallNumber(Number(row.theta)),
    theta_tilde: formatSmallNumber(thetaTilde),
    delta_fold: formatSmallNumber(deltaFold),
    beta: formatSmallNumber(beta),
    L: formatSmallNumber(L),
    z_radius: formatSmallNumber(zRadius),
    branch_interval_rows: branchRows,
    all_endpoint_brackets_certified: branchRows.every(
      (branch) => branch.endpoint_bracket_certified
    ),
    all_J_signs_certified: branchRows
      .map((branch) => branch.J_sign)
      .join(",") === "+,-",
    G_pair_interval: formatInterval(GPairInterval),
    D_pair_interval: formatInterval(DPairInterval),
    R_G_pair_interval: formatInterval(RGPairInterval),
    R_D_pair_interval: formatInterval(RDPairInterval),
    R_G_pair_over_y2_interval: formatInterval(RGQuotientInterval),
    R_D_pair_over_y2_interval: formatInterval(RDQuotientInterval),
  };
}

function intervalAbsUpper(interval) {
  return Math.max(Math.abs(Number(interval[0])), Math.abs(Number(interval[1])));
}

function summarizeRows(rows) {
  const branchRows = rows.flatMap((row) => row.branch_interval_rows);
  const endpointRows = branchRows.flatMap((branch) => branch.endpoint_rows);
  const allEndpointBracketsCertified = rows.every(
    (row) => row.all_endpoint_brackets_certified
  );
  const allJSignsCertified = rows.every((row) => row.all_J_signs_certified);
  const minEndpointKClearance = Math.min(
    ...endpointRows.map((endpoint) => Number(endpoint.K_clearance))
  );
  const minJClearance = Math.min(
    ...branchRows.map((branch) => Number(branch.J_clearance))
  );
  const maxRGPairOverY2IntervalAbsUpper = Math.max(
    ...rows.map((row) => intervalAbsUpper(row.R_G_pair_over_y2_interval))
  );
  const maxRDPairOverY2IntervalAbsUpper = Math.max(
    ...rows.map((row) => intervalAbsUpper(row.R_D_pair_over_y2_interval))
  );
  const passed =
    allEndpointBracketsCertified &&
    allJSignsCertified &&
    minEndpointKClearance > 1e-6 &&
    minJClearance > 0.77 &&
    maxRGPairOverY2IntervalAbsUpper < 0.2 &&
    maxRDPairOverY2IntervalAbsUpper < 0.9;
  return {
    sample_count: rows.length,
    z_endpoint_count: endpointRows.length,
    all_endpoint_brackets_certified: allEndpointBracketsCertified,
    all_J_signs_certified: allJSignsCertified,
    min_endpoint_K_clearance: formatSmallNumber(minEndpointKClearance),
    min_J_clearance: formatSmallNumber(minJClearance),
    max_abs_R_G_pair_over_y2_interval_upper: formatSmallNumber(
      maxRGPairOverY2IntervalAbsUpper
    ),
    max_abs_R_D_pair_over_y2_interval_upper: formatSmallNumber(
      maxRDPairOverY2IntervalAbsUpper
    ),
    status: passed
      ? "directed-rounded-sampled-node-theta3minus-root-geometry-diagnostic"
      : "directed-rounded-sampled-node-theta3minus-root-geometry-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate(
  options = {}
) {
  const zRadius = Number(options.zRadius ?? DEFAULT_Z_RADIUS);
  if (!Number.isFinite(zRadius) || zRadius <= 0 || zRadius > 0.01) {
    throw new Error("zRadius must be finite, positive, and <= 0.01");
  }
  const predecessor =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate();
  const rows = predecessor.scaled_fold_pair_rows.map((row) =>
    intervalRowForSample({ row, zRadius })
  );
  const diagnosticSummary = summarizeRows(rows);
  const rootGeometryPassed =
    diagnosticSummary.status ===
    "directed-rounded-sampled-node-theta3minus-root-geometry-diagnostic";
  const summary = {
    ...diagnosticSummary,
    status: "receiver-normal-zero-bracket-restart-required",
    eom_evidence_status: "invalidated-by-receiver-normal-master-eom",
  };
  const passed = false;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md",
    interval_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      z_radius: formatSmallNumber(zRadius),
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      sampled_node_scope:
        "directed-rounded arithmetic at the finite speed/y stencil nodes emitted by the predecessor; not a continuous speed/y cell cover",
    },
    sampled_node_interval_rows: rows,
    sampled_node_interval_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.sampled-fold-pair-scaled-stencil",
        status: "receiver-normal-zero-bracket-restart-required",
      },
      {
        row: "theta3minus.sampled-node-fold-pair-z-brackets",
        status: rootGeometryPassed ? "root-geometry-diagnostic" : "open",
      },
      {
        row: "theta3minus.sampled-node-fold-pair-GD-quotient-enclosures",
        status: "invalidated-by-receiver-normal-master-eom",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
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
    ],
    artifact_claim: {
      receiver_normal_eom_evidence_status: "invalidated-by-receiver-normal-master-eom",
      receiver_normal_restart_required: true,
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_sampled_node_fold_pair_z_brackets:
        rootGeometryPassed,
      certifies_directed_rounded_sampled_node_fold_pair_GD_quotient_enclosures:
        false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_directed_rounded_regular_root_remainder: false,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      claim_level:
        "Receiver-normal zero-bracket restart target. Directed-rounded z and J rows remain root-geometry diagnostics only; old G,D quadratic quotient enclosures cannot certify force/action closure.",
    },
    result: {
      theory_status: "receiver-normal-zero-bracket-restart-required",
      first_successor_row: "receiver-normal-zero-bracket-search-required",
      parallel_successor_row:
        "theta3minus.receiver-normal-fold-pair-normal-form-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The receiver-normal Master EOM invalidates the old sampled-node G,D quotient enclosure. Rebuild this lane from same-record D_s, D_t, and Wrec rows before using it as evidence.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair sampled-node interval certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair sampled-node interval certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.interval_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "sampled-node interval certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.interval_parameters?.speed_band === undefined &&
      artifact?.interval_parameters?.speed_window === undefined &&
      artifact?.interval_parameters?.speed_min === undefined &&
      artifact?.interval_parameters?.speed_max === undefined,
    "interval parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.sampled_node_interval_summary?.status ===
      "receiver-normal-zero-bracket-restart-required" &&
      artifact?.sampled_node_interval_summary?.eom_evidence_status ===
        "invalidated-by-receiver-normal-master-eom" &&
      artifact?.sampled_node_interval_summary
        ?.all_endpoint_brackets_certified === true &&
      artifact?.sampled_node_interval_summary?.all_J_signs_certified === true &&
      Number(artifact?.sampled_node_interval_summary?.min_endpoint_K_clearance) >
        1e-6 &&
      Number(artifact?.sampled_node_interval_summary?.min_J_clearance) > 0.77,
    "sampled-node interval rows must keep root geometry diagnostic and mark G/D quotient evidence invalidated",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_sampled_node_fold_pair_z_brackets === true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_sampled_node_fold_pair_GD_quotient_enclosures ===
        false &&
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
    "artifact claim must keep continuous fold-pair remainder, I1 closure, and retention open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "receiver-normal-zero-bracket-restart-required",
    "result must report receiver-normal zero-bracket restart",
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
    } else if (arg === "--z-radius") {
      options.zRadius = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>        Write artifact JSON",
    "  --validate <path>   Validate an artifact JSON",
    "  --schema            Print artifact schema metadata",
    "  --z-radius <value>  Symmetric z interval radius around sampled z roots",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate(
        options
      );
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate(
        artifact
      );
    if (errors.length > 0) {
      console.error(JSON.stringify({ valid: false, errors }, null, 2));
      process.exitCode = 1;
      return;
    }
    const json = JSON.stringify(artifact, null, 2);
    if (options.out) {
      fs.mkdirSync(path.dirname(options.out), { recursive: true });
      fs.writeFileSync(options.out, `${json}\n`);
    } else {
      console.log(json);
    }
  } catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

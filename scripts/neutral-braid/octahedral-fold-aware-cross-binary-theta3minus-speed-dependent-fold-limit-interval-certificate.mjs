#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_LIMIT_INTERVAL_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_limit_interval_certificate";
const PROMOTION_STATUS = "priority-only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const THETA3MINUS_DELTA_BRACKET = [3.29632, 3.29639];
const QUARTER_PERIOD = Math.PI / 2;
const SIGMA = -1;
const KAPPA = 1;

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
    (productInterval, interval) => multiplyTwoIntervals(productInterval, interval),
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

function negateInterval([left, right]) {
  return [-right, -left];
}

function positivePowerInterval(interval, exponent) {
  let product = [1, 1];
  for (let index = 0; index < exponent; index += 1) {
    product = multiplyIntervals(product, interval);
  }
  return product;
}

function definiteAbsoluteInterval(interval) {
  if (interval[0] > 0) {
    return interval;
  }
  if (interval[1] < 0) {
    return negateInterval(interval);
  }
  return [0, Math.max(Math.abs(interval[0]), Math.abs(interval[1]))];
}

function sqrtInterval([left, right]) {
  return outwardInterval([Math.sqrt(Math.max(0, left)), Math.sqrt(right)]);
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

function twoDeltaOverSpeedSquaredInterval({
  deltaInterval,
  speedRatioInterval,
}) {
  return [
    nextDown(
      (2 * deltaInterval[0]) /
        (speedRatioInterval[1] * speedRatioInterval[1])
    ),
    nextUp(
      (2 * deltaInterval[1]) /
        (speedRatioInterval[0] * speedRatioInterval[0])
    ),
  ];
}

function deltaSquaredOverSpeedSquaredInterval({
  deltaInterval,
  speedRatioInterval,
}) {
  return [
    nextDown(
      (deltaInterval[0] * deltaInterval[0]) /
        (speedRatioInterval[1] * speedRatioInterval[1])
    ),
    nextUp(
      (deltaInterval[1] * deltaInterval[1]) /
        (speedRatioInterval[0] * speedRatioInterval[0])
    ),
  ];
}

function twoOverSpeedSquaredInterval(speedRatioInterval) {
  return [
    nextDown(2 / (speedRatioInterval[1] * speedRatioInterval[1])),
    nextUp(2 / (speedRatioInterval[0] * speedRatioInterval[0])),
  ];
}

function foldCosComponentInterval({ speedRatioInterval, deltaInterval }) {
  return addIntervals(
    twoDeltaOverSpeedSquaredInterval({ deltaInterval, speedRatioInterval }),
    cosInterval(deltaInterval)
  );
}

function foldSinComponentInterval({ speedRatioInterval, deltaInterval }) {
  return addIntervals(
    [2, 2],
    scaleInterval(
      deltaSquaredOverSpeedSquaredInterval({ deltaInterval, speedRatioInterval }),
      -1
    ),
    scaleInterval(sinInterval(deltaInterval), -1)
  );
}

function foldEndpointEquationInterval({ speedRatioInterval, deltaInterval }) {
  const cosComponent = foldCosComponentInterval({
    speedRatioInterval,
    deltaInterval,
  });
  const sinComponent = foldSinComponentInterval({
    speedRatioInterval,
    deltaInterval,
  });
  return addIntervals(
    multiplyIntervals(cosComponent, cosComponent),
    multiplyIntervals(sinComponent, sinComponent),
    [-1, -1]
  );
}

function foldEndpointDeltaDerivativeInterval({
  speedRatioInterval,
  deltaInterval,
}) {
  const cosComponent = foldCosComponentInterval({
    speedRatioInterval,
    deltaInterval,
  });
  const sinComponent = foldSinComponentInterval({
    speedRatioInterval,
    deltaInterval,
  });
  return addIntervals(
    multiplyIntervals(
      scaleInterval(cosComponent, 2),
      addIntervals(twoOverSpeedSquaredInterval(speedRatioInterval), scaleInterval(sinInterval(deltaInterval), -1))
    ),
    multiplyIntervals(
      scaleInterval(sinComponent, 2),
      addIntervals(
        scaleInterval(
          twoDeltaOverSpeedSquaredInterval({ deltaInterval, speedRatioInterval }),
          -1
        ),
        scaleInterval(cosInterval(deltaInterval), -1)
      )
    )
  );
}

function atan2CornerHull({ yInterval, xInterval }) {
  const values = [
    Math.atan2(yInterval[0], xInterval[0]),
    Math.atan2(yInterval[0], xInterval[1]),
    Math.atan2(yInterval[1], xInterval[0]),
    Math.atan2(yInterval[1], xInterval[1]),
  ];
  return outwardInterval([Math.min(...values), Math.max(...values)]);
}

function buildFoldConstantIntervals({
  speedRatioInterval,
  deltaInterval,
}) {
  const cosPhiInterval = foldCosComponentInterval({
    speedRatioInterval,
    deltaInterval,
  });
  const sinPhiInterval = foldSinComponentInterval({
    speedRatioInterval,
    deltaInterval,
  });
  const phiInterval = atan2CornerHull({
    yInterval: sinPhiInterval,
    xInterval: cosPhiInterval,
  });
  const thetaTildeInterval = scaleInterval(
    addIntervals(phiInterval, deltaInterval),
    0.5
  );
  const thetaFoldInterval = addIntervals(thetaTildeInterval, [
    -QUARTER_PERIOD,
    -QUARTER_PERIOD,
  ]);
  const FThetaInterval = scaleInterval(cosPhiInterval, 2);
  const FDeltaDeltaInterval = addIntervals(
    twoOverSpeedSquaredInterval(speedRatioInterval),
    scaleInterval(sinPhiInterval, -1),
    scaleInterval(sinInterval(deltaInterval), -KAPPA)
  );
  const kernelBInterval = scaleInterval(
    addIntervals(cosPhiInterval, scaleInterval(cosInterval(deltaInterval), KAPPA)),
    -0.5
  );
  const alphaInterval = divideIntervals(
    scaleInterval(FThetaInterval, -2),
    FDeltaDeltaInterval
  );
  const denominatorInterval = multiplyIntervals(
    speedRatioInterval,
    positivePowerInterval(deltaInterval, 2),
    definiteAbsoluteInterval(FDeltaDeltaInterval),
    sqrtInterval(definiteAbsoluteInterval(alphaInterval))
  );
  const analyticSquareLimitInterval = divideIntervals(
    scaleInterval(kernelBInterval, 8 * SIGMA),
    denominatorInterval
  );
  return {
    cos_phi_interval: cosPhiInterval,
    sin_phi_interval: sinPhiInterval,
    phi_interval: phiInterval,
    theta_tilde_fold_interval: thetaTildeInterval,
    theta_fold_interval: thetaFoldInterval,
    F_theta_interval: FThetaInterval,
    F_delta_delta_interval: FDeltaDeltaInterval,
    B_kernel_interval: kernelBInterval,
    alpha_interval: alphaInterval,
    beta_interval: sqrtInterval(definiteAbsoluteInterval(alphaInterval)),
    analytic_square_limit_interval: analyticSquareLimitInterval,
  };
}

function summarizeIntervalSigns(intervalRows) {
  return Object.fromEntries(
    Object.entries(intervalRows).map(([key, interval]) => [
      key.replace(/_interval$/, "_sign"),
      intervalSignAndClearance(interval).sign,
    ])
  );
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate(
  options = {}
) {
  const speedRatioInterval =
    options.speedRatioInterval ?? SPEED_RATIO_ENCLOSURE;
  const deltaBracket = options.deltaBracket ?? THETA3MINUS_DELTA_BRACKET;

  if (
    !Array.isArray(speedRatioInterval) ||
    speedRatioInterval.length !== 2 ||
    speedRatioInterval[0] !== SPEED_RATIO_ENCLOSURE[0] ||
    speedRatioInterval[1] !== SPEED_RATIO_ENCLOSURE[1]
  ) {
    throw new Error(
      "speedRatioInterval must equal the certified positive speed-ratio enclosure"
    );
  }
  if (
    !Array.isArray(deltaBracket) ||
    deltaBracket.length !== 2 ||
    !Number.isFinite(deltaBracket[0]) ||
    !Number.isFinite(deltaBracket[1]) ||
    deltaBracket[0] >= deltaBracket[1]
  ) {
    throw new Error("deltaBracket must be a finite increasing interval");
  }

  const leftEndpointEquationInterval = foldEndpointEquationInterval({
    speedRatioInterval,
    deltaInterval: [deltaBracket[0], deltaBracket[0]],
  });
  const rightEndpointEquationInterval = foldEndpointEquationInterval({
    speedRatioInterval,
    deltaInterval: [deltaBracket[1], deltaBracket[1]],
  });
  const deltaDerivativeInterval = foldEndpointDeltaDerivativeInterval({
    speedRatioInterval,
    deltaInterval: deltaBracket,
  });
  const leftEndpointSign = intervalSignAndClearance(
    leftEndpointEquationInterval
  );
  const rightEndpointSign = intervalSignAndClearance(
    rightEndpointEquationInterval
  );
  const deltaDerivativeSign = intervalSignAndClearance(deltaDerivativeInterval);
  const foldRootBracketCertified =
    leftEndpointSign.sign === "-" &&
    rightEndpointSign.sign === "+" &&
    deltaDerivativeSign.sign === "+";

  const constantIntervals = buildFoldConstantIntervals({
    speedRatioInterval,
    deltaInterval: deltaBracket,
  });
  const constantSigns = summarizeIntervalSigns({
    F_theta_interval: constantIntervals.F_theta_interval,
    F_delta_delta_interval: constantIntervals.F_delta_delta_interval,
    B_kernel_interval: constantIntervals.B_kernel_interval,
    alpha_interval: constantIntervals.alpha_interval,
    analytic_square_limit_interval:
      constantIntervals.analytic_square_limit_interval,
  });
  const limitSignInfo = intervalSignAndClearance(
    constantIntervals.analytic_square_limit_interval
  );
  const constantSignCertificatePassed =
    constantSigns.F_theta_sign === "-" &&
    constantSigns.F_delta_delta_sign === "-" &&
    constantSigns.B_kernel_sign === "+" &&
    constantSigns.alpha_sign === "-" &&
    constantSigns.analytic_square_limit_sign === "-";
  const foldLimitIntervalCertified =
    foldRootBracketCertified && constantSignCertificatePassed;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_LIMIT_INTERVAL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.md",
    interval_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      kappa: KAPPA,
      force_sign: SIGMA,
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: speedRatioInterval,
      delta_fold_bracket: deltaBracket,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      fold_endpoint_equation:
        "E(nu,delta)=(2delta/nu^2+cos(delta))^2+(2-delta^2/nu^2-sin(delta))^2-1",
    },
    fold_endpoint_bracket_certificate: {
      left_delta: formatSmallNumber(deltaBracket[0]),
      right_delta: formatSmallNumber(deltaBracket[1]),
      left_endpoint_equation_interval: formatInterval(
        leftEndpointEquationInterval
      ),
      right_endpoint_equation_interval: formatInterval(
        rightEndpointEquationInterval
      ),
      E_delta_interval: formatInterval(deltaDerivativeInterval),
      left_endpoint_sign: leftEndpointSign.sign,
      right_endpoint_sign: rightEndpointSign.sign,
      E_delta_sign: deltaDerivativeSign.sign,
      minimum_endpoint_clearance: formatSmallNumber(
        Math.min(leftEndpointSign.clearance, rightEndpointSign.clearance)
      ),
      minimum_E_delta_clearance: formatSmallNumber(
        deltaDerivativeSign.clearance
      ),
      status: foldRootBracketCertified
        ? "directed-rounded-theta3minus-fold-endpoint-bracket-certified"
        : "theta3minus-fold-endpoint-bracket-open",
    },
    fold_constant_interval_certificate: {
      cos_phi_interval: formatInterval(constantIntervals.cos_phi_interval),
      sin_phi_interval: formatInterval(constantIntervals.sin_phi_interval),
      phi_interval: formatInterval(constantIntervals.phi_interval),
      theta_tilde_fold_interval: formatInterval(
        constantIntervals.theta_tilde_fold_interval
      ),
      theta_fold_interval: formatInterval(constantIntervals.theta_fold_interval),
      F_theta_interval: formatInterval(constantIntervals.F_theta_interval),
      F_delta_delta_interval: formatInterval(
        constantIntervals.F_delta_delta_interval
      ),
      B_kernel_interval: formatInterval(constantIntervals.B_kernel_interval),
      alpha_interval: formatInterval(constantIntervals.alpha_interval),
      beta_interval: formatInterval(constantIntervals.beta_interval),
      analytic_square_limit_interval: formatInterval(
        constantIntervals.analytic_square_limit_interval
      ),
      interval_signs: constantSigns,
      minimum_abs_L_clearance: formatSmallNumber(limitSignInfo.clearance),
      status: constantSignCertificatePassed
        ? "directed-rounded-theta3minus-fold-limit-sign-certified"
        : "theta3minus-fold-limit-sign-open",
    },
    normal_form_theorem_progress: {
      L_interval_definition:
        "L(nu)=8 sigma B_f/(nu delta_f^2 |F_delta_delta| sqrt(|alpha|))",
      certified_L_interval:
        formatInterval(constantIntervals.analytic_square_limit_interval),
      certified_L_upper_bound: formatSmallNumber(
        constantIntervals.analytic_square_limit_interval[1]
      ),
      remainder_target:
        "G=L+R_G and D=L+R_D with |R_G|,|R_D|<-sup(L)",
      theorem_status:
        "fold-limit-interval-certified-remainder-bounds-open",
    },
    interval_profile_boundary: {
      certifies_theta3minus_fold_endpoint_bracket: foldRootBracketCertified,
      certifies_directed_rounded_speed_dependent_fold_limit_L_negative:
        constantSignCertificatePassed,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      open_quantity_names: [
        "fold_pair_scaled_remainder_R_G",
        "fold_pair_scaled_remainder_R_D",
        "regular_source_root_remainder_R_G",
        "regular_source_root_remainder_R_D",
        "theta_3minus_left_fold_collar_interval_radius",
        "I1_regular_critical_exhaustion",
        "retained_branch_status",
      ],
      status: foldLimitIntervalCertified
        ? "directed-rounded-fold-limit-interval-certified-remainder-open"
        : "fold-limit-interval-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_theta3minus_fold_endpoint_bracket: foldRootBracketCertified,
      certifies_directed_rounded_speed_dependent_fold_limit_L_negative:
        constantSignCertificatePassed,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded interval certificate for the theta_3minus speed-dependent fold endpoint bracket and negative fold-limit L. Remainder bounds, fold-collar interval radius, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: foldLimitIntervalCertified
        ? "directed-rounded-theta3minus-fold-limit-interval-certified"
        : "theta3minus-fold-limit-interval-open",
      first_successor_row:
        "theta_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The speed-dependent fold root is now bracketed by directed-rounded endpoint signs and monotone E_delta, and the normal-form limit L is interval-certified negative; the remaining theorem-grade burden is the G,D remainder bound.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_LIMIT_INTERVAL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-limit interval certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-limit interval certificate packet",
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
    "fold-limit interval packet must not impose a fixed speed window",
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
    artifact?.fold_endpoint_bracket_certificate?.status ===
      "directed-rounded-theta3minus-fold-endpoint-bracket-certified" &&
      artifact?.fold_endpoint_bracket_certificate?.left_endpoint_sign === "-" &&
      artifact?.fold_endpoint_bracket_certificate?.right_endpoint_sign === "+" &&
      artifact?.fold_endpoint_bracket_certificate?.E_delta_sign === "+" &&
      Number(
        artifact?.fold_endpoint_bracket_certificate?.minimum_endpoint_clearance
      ) > 1e-7 &&
      Number(
        artifact?.fold_endpoint_bracket_certificate?.minimum_E_delta_clearance
      ) > 0.31,
    "fold endpoint bracket must be directed-rounded, monotone, and sign certified",
    errors
  );
  const signs =
    artifact?.fold_constant_interval_certificate?.interval_signs ?? {};
  assertField(
    artifact?.fold_constant_interval_certificate?.status ===
      "directed-rounded-theta3minus-fold-limit-sign-certified" &&
      signs.F_theta_sign === "-" &&
      signs.F_delta_delta_sign === "-" &&
      signs.B_kernel_sign === "+" &&
      signs.alpha_sign === "-" &&
      signs.analytic_square_limit_sign === "-" &&
      Number(
        artifact?.fold_constant_interval_certificate?.minimum_abs_L_clearance
      ) > 0.192,
    "fold constants must certify F_theta,F_delta_delta,alpha,L signs with margin",
    errors
  );
  assertField(
    Number(
      artifact?.normal_form_theorem_progress?.certified_L_upper_bound
    ) < -0.192 &&
      artifact?.normal_form_theorem_progress?.theorem_status ===
        "fold-limit-interval-certified-remainder-bounds-open",
    "normal-form theorem progress must certify L<0 and leave remainders open",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_speed_dependent_fold_limit_L_negative ===
      true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder ===
        false &&
      artifact?.artifact_claim
        ?.certifies_theta_3minus_left_fold_collar_interval_radius === false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must certify only the fold-limit interval and keep closure rows open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "directed-rounded-theta3minus-fold-limit-interval-certified" &&
      artifact?.result?.first_successor_row ===
        "theta_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required",
    "result must report fold-limit interval status and the remainder successor",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.mjs [options]",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_LIMIT_INTERVAL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate();
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate(
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

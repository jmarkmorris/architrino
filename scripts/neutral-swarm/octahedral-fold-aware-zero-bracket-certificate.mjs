#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_MULTIROOT_PERIOD_INTEGRAL_SCHEMA,
  buildOctahedralFoldAwareMultirootPeriodIntegral,
  validateOctahedralFoldAwareMultirootPeriodIntegral,
} from "./octahedral-fold-aware-multiroot-period-integral.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-zero-bracket-certificate/v1";

const PACKET_ID = "octahedral_fold_aware_zero_bracket_certificate";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ZERO_SPEED_RATIO_BRACKET = [3.02156, 3.02157];
const ROOT_TOLERANCE = 1e-14;
const ROOT_ENDPOINT_EPSILON = 1e-12;

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
  if (Math.abs(value) <= 1e-12) {
    return "zero";
  }
  if (value > 0) {
    return "positive";
  }
  if (value < 0) {
    return "negative";
  }
  return "zero";
}

function assertIncreasingPositivePair(pair, name) {
  if (
    !Array.isArray(pair) ||
    pair.length !== 2 ||
    !pair.every((entry) => Number.isFinite(entry) && entry > 0) ||
    !(pair[0] < pair[1])
  ) {
    throw new Error(`${name} must be an increasing positive pair`);
  }
}

function bisectRoot(fn, left, right, tolerance = ROOT_TOLERANCE) {
  let a = left;
  let b = right;
  let fa = fn(a);
  const fb = fn(b);

  if (!Number.isFinite(fa) || !Number.isFinite(fb)) {
    throw new Error("bisection endpoints must be finite");
  }
  if (Math.abs(fa) <= tolerance) {
    return a;
  }
  if (Math.abs(fb) <= tolerance) {
    return b;
  }
  if (fa * fb > 0) {
    throw new Error("bisection interval must bracket a sign change");
  }

  for (let step = 0; step < 160; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = fn(mid);
    if (Math.abs(fm) <= tolerance || Math.abs(b - a) <= tolerance) {
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

function secondaryFoldEquation(x) {
  return x + Math.cos(x) / Math.sin(x);
}

function solveSecondaryFoldX() {
  return bisectRoot(
    secondaryFoldEquation,
    Math.PI / 2 + ROOT_ENDPOINT_EPSILON,
    Math.PI - ROOT_ENDPOINT_EPSILON
  );
}

function positiveSheetEquation(speedRatio, x) {
  return x - speedRatio * Math.cos(x);
}

function negativeSheetEquation(speedRatio, x) {
  return x + speedRatio * Math.cos(x);
}

function contributionFromX(x) {
  const xtan = x * Math.tan(x);
  return (Math.PI * Math.tan(x)) / (2 * x * Math.abs(1 + xtan));
}

function contributionDerivativeFromX(x, q) {
  const tangent = Math.tan(x);
  const secantSquared = 1 / Math.cos(x) ** 2;
  const jacobian = 1 + x * tangent;
  const absJacobian = Math.abs(jacobian);
  const jacobianSign = Math.sign(jacobian);
  const numerator =
    secantSquared * x * absJacobian -
    tangent * (absJacobian + x * jacobianSign * (tangent + x * secantSquared));
  const dPdx = (Math.PI * numerator) / (2 * (x * absJacobian) ** 2);
  const dxdv = (q * Math.cos(x)) / jacobian;
  return {
    contribution_derivative_x: dPdx,
    root_derivative_speed_ratio: dxdv,
    contribution_derivative_speed_ratio: dPdx * dxdv,
  };
}

function solvePartnerSheetRows(speedRatio, secondaryFoldX) {
  const positiveX = bisectRoot(
    (x) => positiveSheetEquation(speedRatio, x),
    ROOT_ENDPOINT_EPSILON,
    Math.PI / 2 - ROOT_ENDPOINT_EPSILON
  );
  const rows = [
    buildPartnerSheetRow(speedRatio, positiveX, 1, "q=+1-positive-cosine-sheet"),
  ];

  if (speedRatio > 1 / Math.sin(secondaryFoldX) && speedRatio < Math.PI) {
    const lowerNegativeX = bisectRoot(
      (x) => negativeSheetEquation(speedRatio, x),
      Math.PI / 2 + ROOT_ENDPOINT_EPSILON,
      secondaryFoldX
    );
    const upperNegativeX = bisectRoot(
      (x) => negativeSheetEquation(speedRatio, x),
      secondaryFoldX,
      speedRatio - ROOT_ENDPOINT_EPSILON
    );
    rows.push(
      buildPartnerSheetRow(speedRatio, lowerNegativeX, -1, "q=-1-lower-negative-cosine-sheet"),
      buildPartnerSheetRow(speedRatio, upperNegativeX, -1, "q=-1-upper-negative-cosine-sheet")
    );
  }

  return rows;
}

function buildPartnerSheetRow(speedRatio, x, q, sheet) {
  const residual =
    q > 0
      ? positiveSheetEquation(speedRatio, x)
      : negativeSheetEquation(speedRatio, x);
  const jacobian = 1 + x * Math.tan(x);
  const contribution = contributionFromX(x);
  const derivatives = contributionDerivativeFromX(x, q);
  return {
    sheet,
    q,
    x,
    phase_delay: 2 * x,
    residual,
    jacobian,
    contribution,
    ...derivatives,
  };
}

function partnerPeriodIntegral(speedRatio, secondaryFoldX) {
  const rows = solvePartnerSheetRows(speedRatio, secondaryFoldX);
  return {
    speed_ratio: speedRatio,
    root_count: rows.length,
    rows,
    period_integral: rows.reduce((sum, row) => sum + row.contribution, 0),
    period_integral_speed_derivative: rows.reduce(
      (sum, row) => sum + row.contribution_derivative_speed_ratio,
      0
    ),
    jacobian_abs_min: rows.reduce(
      (best, row) => Math.min(best, Math.abs(row.jacobian)),
      Infinity
    ),
    residual_abs_max: rows.reduce(
      (best, row) => Math.max(best, Math.abs(row.residual)),
      0
    ),
  };
}

function solveZeroSpeedRatio(bracket, secondaryFoldX) {
  let left = bracket[0];
  let right = bracket[1];
  let leftValue = partnerPeriodIntegral(left, secondaryFoldX).period_integral;
  const rightValue = partnerPeriodIntegral(right, secondaryFoldX).period_integral;

  if (!(leftValue * rightValue < 0)) {
    return {
      speed_ratio: null,
      residual_abs: null,
      row: null,
      status: "zero-speed-ratio-bracket-sign-change-open",
    };
  }

  for (let step = 0; step < 100; step += 1) {
    const mid = 0.5 * (left + right);
    const midValue = partnerPeriodIntegral(mid, secondaryFoldX).period_integral;
    if (Math.abs(midValue) <= ROOT_TOLERANCE || Math.abs(right - left) <= ROOT_TOLERANCE) {
      left = mid;
      right = mid;
      break;
    }
    if (leftValue * midValue <= 0) {
      right = mid;
    } else {
      left = mid;
      leftValue = midValue;
    }
  }

  const speedRatio = 0.5 * (left + right);
  const row = partnerPeriodIntegral(speedRatio, secondaryFoldX);
  return {
    speed_ratio: speedRatio,
    residual_abs: Math.abs(row.period_integral),
    row,
    status: "zero-speed-ratio-bracket-sign-change-certified",
  };
}

function formatSheetRow(row) {
  return {
    sheet: row.sheet,
    q: row.q,
    x: formatNumber(row.x),
    phase_delay: formatNumber(row.phase_delay),
    residual: formatSmallNumber(row.residual),
    jacobian: formatNumber(row.jacobian),
    contribution: formatNumber(row.contribution),
    root_derivative_speed_ratio: formatNumber(row.root_derivative_speed_ratio),
    contribution_derivative_speed_ratio: formatNumber(
      row.contribution_derivative_speed_ratio
    ),
  };
}

function formatIntegralRow(row) {
  return {
    speed_ratio: formatNumber(row.speed_ratio),
    root_count: row.root_count,
    period_integral: formatNumber(row.period_integral),
    period_integral_speed_derivative: formatNumber(row.period_integral_speed_derivative),
    sign: signLabel(row.period_integral),
    jacobian_abs_min: formatNumber(row.jacobian_abs_min),
    residual_abs_max: formatSmallNumber(row.residual_abs_max),
    rows: row.rows.map(formatSheetRow),
  };
}

function parseNumberPair(value) {
  return String(value)
    .split(",")
    .map((entry) => Number(entry.trim()));
}

export function buildOctahedralFoldAwareZeroBracketCertificate(options = {}) {
  const zeroSpeedRatioBracket =
    options.zeroSpeedRatioBracket ?? DEFAULT_ZERO_SPEED_RATIO_BRACKET;
  assertIncreasingPositivePair(zeroSpeedRatioBracket, "zeroSpeedRatioBracket");

  const sourceArtifact = buildOctahedralFoldAwareMultirootPeriodIntegral({
    zeroBracket: [3.02, 3.025],
  });
  const sourceErrors = validateOctahedralFoldAwareMultirootPeriodIntegral(sourceArtifact);
  const secondaryFoldX = solveSecondaryFoldX();
  const secondaryFoldSpeedRatio = 1 / Math.sin(secondaryFoldX);
  const endpointRows = zeroSpeedRatioBracket.map((speedRatio) =>
    partnerPeriodIntegral(speedRatio, secondaryFoldX)
  );
  const leftRow = endpointRows[0];
  const rightRow = endpointRows[1];
  const zero = solveZeroSpeedRatio(zeroSpeedRatioBracket, secondaryFoldX);
  const signChangeCertified =
    leftRow.root_count === 3 &&
    rightRow.root_count === 3 &&
    leftRow.period_integral < 0 &&
    rightRow.period_integral > 0 &&
    zero.status === "zero-speed-ratio-bracket-sign-change-certified";

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_schema: OCTAHEDRAL_FOLD_AWARE_MULTIROOT_PERIOD_INTEGRAL_SCHEMA,
    predecessor_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-multiroot-period-integral.md",
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-zero-bracket-certificate.md",
    scan_parameters: {
      speed_constraint: "none; the bracket is a certified positive speed-ratio zero enclosure",
      zero_speed_ratio_bracket: zeroSpeedRatioBracket.map(formatNumber),
      root_coordinate: "x=delta/2",
      root_tolerance: ROOT_TOLERANCE,
    },
    source_artifact_check: {
      schema: sourceArtifact.schema,
      valid: sourceErrors.length === 0,
      errors: sourceErrors,
      cross_binary_status: sourceArtifact.cross_binary_cancellation.status,
      coarea_status: sourceArtifact.cross_binary_cancellation.coarea_chart.status,
      sampled_zero_status: sourceArtifact.zero_mean_candidate.status,
    },
    root_count_certificate: {
      positive_sheet_equation: "x-v*cos(x)=0, x in (0,pi/2)",
      negative_sheet_equation: "x+v*cos(x)=0, x in (pi/2,v), v<pi",
      secondary_fold_equation: "x+cot(x)=0",
      secondary_fold_x: formatNumber(secondaryFoldX),
      secondary_fold_speed_ratio: formatNumber(secondaryFoldSpeedRatio),
      lower_speed_ratio_margin_above_fold: formatNumber(
        zeroSpeedRatioBracket[0] - secondaryFoldSpeedRatio
      ),
      upper_speed_ratio_margin_below_pi: formatNumber(
        Math.PI - zeroSpeedRatioBracket[1]
      ),
      root_count_status:
        zeroSpeedRatioBracket[0] > secondaryFoldSpeedRatio &&
        zeroSpeedRatioBracket[1] < Math.PI
          ? "exactly-three-partner-roots-through-bracket"
          : "three-root-bracket-open",
    },
    endpoint_sign_certificate: {
      endpoints: endpointRows.map(formatIntegralRow),
      sign_change:
        leftRow.period_integral < 0 && rightRow.period_integral > 0
          ? "negative-to-positive"
          : "sign-change-open",
      endpoint_jacobian_abs_floor: formatNumber(
        Math.min(leftRow.jacobian_abs_min, rightRow.jacobian_abs_min)
      ),
      endpoint_residual_abs_max: formatSmallNumber(
        Math.max(leftRow.residual_abs_max, rightRow.residual_abs_max)
      ),
      status:
        leftRow.period_integral < 0 && rightRow.period_integral > 0
          ? "endpoint-sign-change-certified"
          : "endpoint-sign-change-open",
    },
    zero_existence_certificate: {
      theorem_route:
        "The cross-binary period integral cancels in the phi coarea chart. On this bracket the antipodal-partner sheet has three regular roots, and P_all(v) changes sign, so a fold-aware zero exists by continuity.",
      speed_ratio_enclosure: zeroSpeedRatioBracket.map(formatNumber),
      speed_ratio_estimate: formatNumber(zero.speed_ratio),
      residual_abs: formatSmallNumber(zero.residual_abs),
      row: zero.row ? formatIntegralRow(zero.row) : null,
      status: signChangeCertified
        ? "sign-certified-fold-aware-multiroot-period-integral-zero-bracket"
        : "fold-aware-zero-bracket-certificate-open",
    },
    transversality_certificate: {
      speed_ratio_estimate: formatNumber(zero.speed_ratio),
      period_integral_speed_derivative: zero.row
        ? formatNumber(zero.row.period_integral_speed_derivative)
        : null,
      derivative_sign: zero.row
        ? signLabel(zero.row.period_integral_speed_derivative)
        : null,
      derivative_abs_floor: zero.row
        ? formatNumber(Math.abs(zero.row.period_integral_speed_derivative))
        : null,
      status:
        zero.row && Math.abs(zero.row.period_integral_speed_derivative) > 1
          ? "simple-zero-transversality-certified"
          : "simple-zero-transversality-open",
    },
    clock_scale_gauge_lemma: {
      period_rescaled_scale_law: "M_i^nu(s,h)=(1/h)*C_i(s/h)",
      zero_ray: zero.speed_ratio
        ? "s=v0*h for every positive clock period h"
        : null,
      speed_ratio_estimate: formatNumber(zero.speed_ratio),
      period_clock_free_parameter: "h>0",
      certifies_projective_zero_ray: signChangeCertified,
      certifies_absolute_clock_period: false,
      status: signChangeCertified
        ? "projective-zero-ray-certified-clock-normalization-open"
        : "projective-zero-ray-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_cross_binary_period_cancellation_by_symmetry:
        sourceArtifact.cross_binary_cancellation.status ===
        "symmetry-cancelled-fold-aware-cross-binary-period-integral",
      certifies_partner_three_root_sign_bracket: signChangeCertified,
      certifies_fold_aware_multiroot_zero_bracket: signChangeCertified,
      certifies_simple_zero_transversality:
        zero.row && Math.abs(zero.row.period_integral_speed_derivative) > 1,
      certifies_projective_zero_ray: signChangeCertified,
      certifies_speed_clock_length: false,
      certifies_bounded_speed_live_ledger: false,
      certifies_action_noether_event_rows: false,
      certifies_observer_export: false,
      retained_branch: false,
      claim_level:
        "sign-certified fold-aware multi-root period-integral zero bracket; not retained",
    },
    result: {
      theory_status: signChangeCertified
        ? "sign-certified-fold-aware-multiroot-period-integral-zero-bracket"
        : "fold-aware-zero-bracket-certificate-open",
      first_successor_row: "clock-action-noether-event-export-retention-rows-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The sampled fold-aware zero bracket is upgraded to a sign/regularity certificate on a narrow positive speed-ratio bracket. This certifies a period-integral zero candidate, not a retained branch.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareZeroBracketCertificate(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA,
    "schema must match fold-aware zero bracket certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match fold-aware zero bracket certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.scan_parameters?.speed_constraint ===
      "none; the bracket is a certified positive speed-ratio zero enclosure",
    "artifact must not impose a speed window",
    errors
  );
  assertField(
    artifact?.source_artifact_check?.valid === true,
    "source fold-aware integral artifact must validate",
    errors
  );
  assertField(
    artifact?.root_count_certificate?.root_count_status ===
      "exactly-three-partner-roots-through-bracket",
    "certificate must stay on the three-root partner sheet",
    errors
  );
  assertField(
    artifact?.endpoint_sign_certificate?.sign_change === "negative-to-positive",
    "endpoint signs must bracket a zero",
    errors
  );
  assertField(
    Number(artifact?.endpoint_sign_certificate?.endpoint_jacobian_abs_floor) > 0.5,
    "endpoint regularity floor must stay away from zero",
    errors
  );
  assertField(
    artifact?.zero_existence_certificate?.status ===
      "sign-certified-fold-aware-multiroot-period-integral-zero-bracket",
    "certificate must record the sign-certified zero bracket",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_fold_aware_multiroot_zero_bracket === true,
    "artifact must certify the fold-aware zero bracket",
    errors
  );
  assertField(
    artifact?.transversality_certificate?.status ===
      "simple-zero-transversality-certified",
    "certificate must record the simple-zero transversality row",
    errors
  );
  assertField(
    artifact?.clock_scale_gauge_lemma?.status ===
      "projective-zero-ray-certified-clock-normalization-open",
    "certificate must record the projective zero-ray clock gauge row",
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
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-zero-bracket-certificate.mjs [options]",
    "",
    "Options:",
    "  --zero-speed-ratio-bracket <a,b>  Positive speed-ratio zero enclosure",
    "  --out <path>                      Write artifact JSON to path instead of stdout",
    "  --validate <path>                 Validate an existing artifact JSON file",
    "  --schema                          Print the artifact schema identifier",
    "  --pretty                          Pretty-print JSON output",
    "  --help                            Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    zeroSpeedRatioBracket: DEFAULT_ZERO_SPEED_RATIO_BRACKET,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--zero-speed-ratio-bracket") {
      args.zeroSpeedRatioBracket = parseNumberPair(argv[++index]);
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
          schema: "neutral-swarm-octahedral-fold-aware-zero-bracket-certificate-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA,
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
    const errors = validateOctahedralFoldAwareZeroBracketCertificate(artifact);
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

  const artifact = buildOctahedralFoldAwareZeroBracketCertificate({
    zeroSpeedRatioBracket: args.zeroSpeedRatioBracket,
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

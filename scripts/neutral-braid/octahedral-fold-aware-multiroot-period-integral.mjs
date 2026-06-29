#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  octahedralSiteById,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_MULTIROOT_PERIOD_INTEGRAL_SCHEMA =
  "neutral-braid-octahedral-fold-aware-multiroot-period-integral/v1";

const PACKET_ID = "octahedral_fold_aware_multiroot_period_integral";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_SPEED_RATIOS = [1.7, 1.75, 2, 2.5, 2.95, 3, 3.02, 3.025, 3.5, 4];
const DEFAULT_ZERO_BRACKET = [3.02, 3.025];
const DEFAULT_ROOT_SUBDIVISIONS = 40000;
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_TOLERANCE = 1e-13;
const DUPLICATE_ROOT_TOLERANCE = 1e-9;

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

function cyclicEpsilon(receiverBinary, sourceBinary) {
  if (
    (receiverBinary === 1 && sourceBinary === 2) ||
    (receiverBinary === 2 && sourceBinary === 3) ||
    (receiverBinary === 3 && sourceBinary === 1)
  ) {
    return 1;
  }
  return -1;
}

function crossBinaryClass(pair) {
  const receiver = octahedralSiteById(pair.receiver);
  const source = octahedralSiteById(pair.source);
  const epsilon = cyclicEpsilon(pair.receiver_binary, pair.source_binary);
  const signProduct = receiver.sign * source.sign;
  return {
    receiver: pair.receiver,
    source: pair.source,
    receiver_label: pair.receiver_label,
    source_label: pair.source_label,
    force_sign: pair.force_sign,
    epsilon_ab: epsilon,
    sign_product: signProduct,
    kappa: signProduct * epsilon,
    kappa_label: signProduct * epsilon > 0 ? "+1" : "-1",
    theta_tilde_shift: signProduct > 0 ? 0 : Math.PI / 2,
  };
}

function buildCrossBinaryCancellationRows() {
  const crossRows = orderedOctahedralPairs()
    .filter((pair) => pair.source_relation === "cross-binary")
    .map(crossBinaryClass);
  const rows = [];

  for (const receiver of OCTAHEDRAL_SITES) {
    for (const kappa of [1, -1]) {
      const classRows = crossRows.filter(
        (row) => row.receiver === receiver.id && row.kappa === kappa
      );
      const forceSignSum = classRows.reduce((sum, row) => sum + row.force_sign, 0);
      const shifts = classRows.map((row) => row.theta_tilde_shift).sort((left, right) => left - right);
      rows.push({
        receiver: receiver.id,
        receiver_label: receiver.label,
        kappa,
        kappa_label: kappa > 0 ? "+1" : "-1",
        source_labels: classRows.map((row) => row.source_label),
        force_signs: classRows.map((row) => row.force_sign),
        theta_tilde_shifts: shifts.map(formatNumber),
        force_sign_sum: forceSignSum,
        cancellation_status:
          classRows.length === 2 && forceSignSum === 0
            ? "paired-periodic-cross-binary-cancellation"
            : "cross-binary-cancellation-open",
      });
    }
  }

  return rows;
}

function partnerRootEquation(speedRatio, delta) {
  return 2 * speedRatio * Math.abs(Math.cos(delta / 2)) - delta;
}

function addUniqueRoot(roots, root, domainMax) {
  if (!Number.isFinite(root)) {
    return;
  }
  if (root <= ROOT_DOMAIN_MIN || root > domainMax + DUPLICATE_ROOT_TOLERANCE) {
    return;
  }
  if (!roots.some((candidate) => Math.abs(candidate - root) <= DUPLICATE_ROOT_TOLERANCE)) {
    roots.push(root);
  }
}

function bisectPartnerRoot(speedRatio, left, right) {
  let a = left;
  let b = right;
  let fa = partnerRootEquation(speedRatio, a);
  let fb = partnerRootEquation(speedRatio, b);

  if (Math.abs(fa) <= ROOT_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ROOT_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let step = 0; step < 100; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = partnerRootEquation(speedRatio, mid);
    if (Math.abs(fm) <= ROOT_TOLERANCE || Math.abs(b - a) <= ROOT_TOLERANCE) {
      return mid;
    }
    if (fa * fm <= 0) {
      b = mid;
      fb = fm;
    } else {
      a = mid;
      fa = fm;
    }
  }

  return 0.5 * (a + b);
}

function findPartnerRoots(speedRatio, rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS) {
  const roots = [];
  const domainMax = 2 * speedRatio + 1e-8 * Math.max(1, speedRatio);
  let previousDelta = ROOT_DOMAIN_MIN;
  let previousValue = partnerRootEquation(speedRatio, previousDelta);

  for (let step = 1; step <= rootSubdivisions; step += 1) {
    const delta =
      ROOT_DOMAIN_MIN + ((domainMax - ROOT_DOMAIN_MIN) * step) / rootSubdivisions;
    const value = partnerRootEquation(speedRatio, delta);
    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, delta, domainMax);
    } else if (
      Number.isFinite(previousValue) &&
      Number.isFinite(value) &&
      previousValue * value < 0
    ) {
      addUniqueRoot(roots, bisectPartnerRoot(speedRatio, previousDelta, delta), domainMax);
    }
    previousDelta = delta;
    previousValue = value;
  }

  return roots.sort((left, right) => left - right);
}

function partnerRootContribution(speedRatio, delta) {
  const cosine = Math.cos(delta / 2);
  const q = cosine >= 0 ? 1 : -1;
  const sine = Math.sin(delta / 2);
  const jacobian = 1 + speedRatio * q * sine;
  const receiverNormalNumerator = 1 - speedRatio * q * sine;
  const receiverNormalFactor = receiverNormalNumerator / jacobian;
  const periodIntegral =
    (TAU * speedRatio * q * sine * Math.abs(receiverNormalFactor)) / (delta * delta);
  return {
    phase_delay: delta,
    q,
    jacobian,
    receiver_normal_numerator: receiverNormalNumerator,
    receiver_normal_factor: receiverNormalFactor,
    branch_weight: Math.abs(receiverNormalFactor),
    period_integral: periodIntegral,
  };
}

function partnerPeriodIntegral(speedRatio, rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS) {
  const rows = findPartnerRoots(speedRatio, rootSubdivisions).map((delta) =>
    partnerRootContribution(speedRatio, delta)
  );
  return {
    speed_ratio: speedRatio,
    root_count: rows.length,
    rows,
    period_integral: rows.reduce((sum, row) => sum + row.period_integral, 0),
    jacobian_abs_min:
      rows.length > 0
        ? rows.reduce((best, row) => Math.min(best, Math.abs(row.jacobian)), Infinity)
        : null,
  };
}

function partnerSecondaryFoldEquation(x) {
  return x + Math.cos(x) / Math.sin(x);
}

function solvePartnerSecondaryFold() {
  let left = Math.PI / 2 + 1e-12;
  let right = Math.PI - 1e-12;
  let fLeft = partnerSecondaryFoldEquation(left);

  for (let step = 0; step < 100; step += 1) {
    const mid = 0.5 * (left + right);
    const fMid = partnerSecondaryFoldEquation(mid);
    if (Math.abs(fMid) <= ROOT_TOLERANCE || Math.abs(right - left) <= ROOT_TOLERANCE) {
      left = mid;
      right = mid;
      break;
    }
    if (fLeft * fMid <= 0) {
      right = mid;
    } else {
      left = mid;
      fLeft = fMid;
    }
  }

  const x = 0.5 * (left + right);
  return {
    x,
    phase_delay: 2 * x,
    speed_ratio: 1 / Math.sin(x),
    jacobian: 0,
    status: "secondary-antipodal-partner-fold-onset",
  };
}

function solveZeroBracket(bracket, rootSubdivisions) {
  let left = bracket[0];
  let right = bracket[1];
  let leftValue = partnerPeriodIntegral(left, rootSubdivisions).period_integral;
  const rightValue = partnerPeriodIntegral(right, rootSubdivisions).period_integral;

  if (!(leftValue * rightValue < 0)) {
    return {
      bracket,
      bracket_values: [leftValue, rightValue],
      status: "zero-bracket-not-found",
      speed_ratio: null,
      row: null,
    };
  }

  for (let step = 0; step < 80; step += 1) {
    const mid = 0.5 * (left + right);
    const midValue = partnerPeriodIntegral(mid, rootSubdivisions).period_integral;
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
  const row = partnerPeriodIntegral(speedRatio, rootSubdivisions);
  return {
    bracket,
    bracket_values: [
      partnerPeriodIntegral(bracket[0], rootSubdivisions).period_integral,
      partnerPeriodIntegral(bracket[1], rootSubdivisions).period_integral,
    ],
    status: "zero-bracket-detected",
    speed_ratio: speedRatio,
    row,
  };
}

function formatPartnerRootRow(row) {
  return {
    phase_delay: formatNumber(row.phase_delay),
    q: row.q,
    jacobian: formatNumber(row.jacobian),
    period_integral: formatNumber(row.period_integral),
  };
}

function formatPartnerIntegral(row) {
  return {
    speed_ratio: formatNumber(row.speed_ratio),
    root_count: row.root_count,
    period_integral: formatNumber(row.period_integral),
    jacobian_abs_min: formatNumber(row.jacobian_abs_min),
    rows: row.rows.map(formatPartnerRootRow),
  };
}

function parseSpeedRatios(value) {
  return String(value)
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter(Number.isFinite);
}

export function buildOctahedralFoldAwareMultirootPeriodIntegral(options = {}) {
  const speedRatios = options.speedRatios ?? DEFAULT_SPEED_RATIOS;
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const zeroBracket = options.zeroBracket ?? DEFAULT_ZERO_BRACKET;

  if (!Array.isArray(speedRatios) || speedRatios.length === 0) {
    throw new Error("speedRatios must be a nonempty array");
  }
  if (!speedRatios.every((speedRatio) => Number.isFinite(speedRatio) && speedRatio > 0)) {
    throw new Error("every speed ratio must be positive");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (
    !Array.isArray(zeroBracket) ||
    zeroBracket.length !== 2 ||
    !zeroBracket.every((entry) => Number.isFinite(entry) && entry > 0) ||
    !(zeroBracket[0] < zeroBracket[1])
  ) {
    throw new Error("zeroBracket must be an increasing positive pair");
  }

  const crossRows = buildCrossBinaryCancellationRows();
  const crossCancellationPassed = crossRows.every(
    (row) => row.cancellation_status === "paired-periodic-cross-binary-cancellation"
  );
  const secondaryFold = solvePartnerSecondaryFold();
  const zero = solveZeroBracket(zeroBracket, rootSubdivisions);
  const sampledRows = speedRatios.map((speedRatio) =>
    formatPartnerIntegral(partnerPeriodIntegral(speedRatio, rootSubdivisions))
  );
  const zeroRow = zero.row ? formatPartnerIntegral(zero.row) : null;

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_MULTIROOT_PERIOD_INTEGRAL_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet: "reference/priorities/braid-geometry-export-bridge/octahedral-period-rescaled-fold-chart.md",
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-multiroot-period-integral.md",
    successor_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-zero-bracket-certificate.md",
    scan_parameters: {
      speed_constraint: "none; speed ratios are positive diagnostic points, not an admissibility band",
      speed_ratios: speedRatios.map(formatNumber),
      zero_bracket: zeroBracket.map(formatNumber),
      root_subdivision_count: rootSubdivisions,
    },
    cross_binary_cancellation: {
      statement:
        "For each receiver and each kappa class, the two cross-binary sources occur with opposite force signs and periodic theta-tilde shifts, so the fold-aware period integral cancels over [0,2*pi).",
      coarea_chart: {
        coordinate: "phi=2*theta_tilde-delta",
        reduced_equation:
          "delta^2/v^2+kappa*sin(delta)=2-sin(phi)",
        fold_projection_note:
          "The theta-chart 1/|J| singularity is a projection singularity; in phi coordinates dtheta/dphi contributes the cancelling factor F_delta/(2*A).",
        conditioning_factor: "A_{kappa,v}(delta)=2*delta/v^2+kappa*cos(delta)",
        status: "phi-chart-coarea-formula-derived",
      },
      rows: crossRows.map((row) => ({
        ...row,
        theta_tilde_shifts: row.theta_tilde_shifts,
      })),
      status: crossCancellationPassed
        ? "symmetry-cancelled-fold-aware-cross-binary-period-integral"
        : "cross-binary-cancellation-open",
    },
    partner_multiroot_reduction: {
      root_equation: "2*v*|cos(delta/2)|-delta=0",
      contribution_formula:
        "P_alpha(v)=2*pi*v*q_alpha*sin(delta_alpha/2)*abs((1-v*q_alpha*sin(delta_alpha/2))/(1+v*q_alpha*sin(delta_alpha/2)))/delta_alpha^2",
      q_definition: "q_alpha=sign(cos(delta_alpha/2))",
      period_integral_formula: "P_all(v)=sum_alpha P_alpha(v)",
      secondary_fold: {
        equation: "x+cot(x)=0, x in (pi/2,pi), delta=2*x, v=1/sin(x)",
        x: formatNumber(secondaryFold.x),
        phase_delay: formatNumber(secondaryFold.phase_delay),
        speed_ratio: formatNumber(secondaryFold.speed_ratio),
        jacobian: formatNumber(secondaryFold.jacobian),
        status: secondaryFold.status,
      },
      sampled_rows: sampledRows,
    },
    zero_mean_candidate: {
      bracket: zero.bracket.map(formatNumber),
      bracket_values: zero.bracket_values.map(formatNumber),
      speed_ratio: formatNumber(zero.speed_ratio),
      row: zeroRow,
      residual_abs: zero.row ? formatSmallNumber(Math.abs(zero.row.period_integral)) : null,
      status:
        zero.status === "zero-bracket-detected" && crossCancellationPassed
          ? "sampled-fold-aware-multiroot-period-integral-zero-bracket-detected"
          : "sampled-fold-aware-multiroot-period-integral-zero-bracket-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      proves_cross_binary_period_cancellation_by_symmetry: crossCancellationPassed,
      reduces_fold_aware_period_integral_to_partner_roots: crossCancellationPassed,
      finds_sampled_multiroot_zero_bracket:
        zero.status === "zero-bracket-detected" && crossCancellationPassed,
      certifies_fold_aware_multiroot_period_integral: false,
      certifies_speed_clock_length: false,
      certifies_bounded_speed_live_ledger: false,
      certifies_action_noether_event_rows: false,
      certifies_observer_export: false,
      retained_branch: false,
      claim_level:
        "sampled fold-aware multi-root period-integral receiver-normal scan; not retained",
    },
    result: {
      theory_status:
        zero.status === "zero-bracket-detected" && crossCancellationPassed
          ? "sampled-fold-aware-multiroot-period-integral-zero-bracket-detected"
          : "sampled-fold-aware-multiroot-period-integral-open",
      first_successor_row:
        zero.status === "zero-bracket-detected" && crossCancellationPassed
          ? "sign-zero-bracket-certificate-created-retention-rows-required"
          : "receiver-normal-zero-bracket-search-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        zero.status === "zero-bracket-detected" && crossCancellationPassed
          ? "The fold-aware multi-root period integral reduces to the antipodal-partner all-root sum after cross-binary period cancellation. The sampled receiver-normal zero bracket is still not a clock, action/Noether, event-stability, bounded-speed live ledger, or observer-export row."
          : "The receiver-normal wake factor preserves the cross-binary cancellation row but removes the prior sampled partner-root zero bracket on this scan. The zero-bracket lane must be restarted before any dynamics handoff can use it.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareMultirootPeriodIntegral(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_MULTIROOT_PERIOD_INTEGRAL_SCHEMA,
    "schema must match fold-aware multiroot period integral schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match fold-aware integral packet", errors);
  assertField(artifact?.promotion_status === PROMOTION_STATUS, "promotion status must remain priority-only", errors);
  assertField(
    artifact?.scan_parameters?.speed_constraint ===
      "none; speed ratios are positive diagnostic points, not an admissibility band",
    "artifact must not impose a speed window",
    errors
  );
  assertField(
    artifact?.cross_binary_cancellation?.status ===
      "symmetry-cancelled-fold-aware-cross-binary-period-integral",
    "cross-binary period integral must cancel by symmetry",
    errors
  );
  assertField(
    artifact?.partner_multiroot_reduction?.secondary_fold?.speed_ratio > 2.9,
    "partner secondary fold must occur above v=2.9",
    errors
  );
  assertField(
    artifact?.partner_multiroot_reduction?.secondary_fold?.speed_ratio < 3,
    "partner secondary fold must occur below v=3",
    errors
  );
  assertField(
    [
      "sampled-fold-aware-multiroot-period-integral-zero-bracket-detected",
      "sampled-fold-aware-multiroot-period-integral-zero-bracket-open",
    ].includes(artifact?.zero_mean_candidate?.status),
    "artifact must record whether the sampled receiver-normal zero bracket was detected",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_fold_aware_multiroot_period_integral === false,
    "sampled artifact must not certify the fold-aware integral as an interval theorem",
    errors
  );
  assertField(
    artifact?.artifact_claim?.retained_branch === false && artifact?.result?.retained_branch === false,
    "artifact must not claim retained branch status",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-multiroot-period-integral.mjs [options]",
    "",
    "Options:",
    "  --speed-ratios <csv>     Comma-separated positive v=s/h diagnostic values",
    "  --zero-bracket <a,b>     Positive speed-ratio bracket for partner-root zero",
    "  --subdivisions <n>       Partner-root search subdivisions (default: 40000)",
    "  --out <path>             Write artifact JSON to path instead of stdout",
    "  --validate <path>        Validate an existing artifact JSON file",
    "  --schema                 Print the artifact schema identifier",
    "  --pretty                 Pretty-print JSON output",
    "  --help                   Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    speedRatios: DEFAULT_SPEED_RATIOS,
    zeroBracket: DEFAULT_ZERO_BRACKET,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--speed-ratios") {
      args.speedRatios = parseSpeedRatios(argv[++index]);
    } else if (arg === "--zero-bracket") {
      args.zeroBracket = parseSpeedRatios(argv[++index]);
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
          schema: "neutral-braid-octahedral-fold-aware-multiroot-period-integral-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_MULTIROOT_PERIOD_INTEGRAL_SCHEMA,
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
    const errors = validateOctahedralFoldAwareMultirootPeriodIntegral(artifact);
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

  const artifact = buildOctahedralFoldAwareMultirootPeriodIntegral({
    speedRatios: args.speedRatios,
    zeroBracket: args.zeroBracket,
    rootSubdivisions: args.rootSubdivisions,
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

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_TRACE_AFFINE_ZERO_MEAN_OBSTRUCTION_SCHEMA =
  "neutral-swarm-octahedral-trace-affine-partner-positive-row/v1";

const PACKET_ID = "octahedral_trace_affine_partner_positive_row";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_SCALE_MIN = 0.125;
const DEFAULT_SCALE_MAX = 16;
const DEFAULT_SCALE_COUNT = 9;
const DEFAULT_ROOT_TOLERANCE = 1e-13;
const LINEAR_TRACE_ALPHA = 3.24679501458;
const LINEAR_TRACE_SCALE = 1 + LINEAR_TRACE_ALPHA;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function rootEquation(scale, y) {
  return 2 * scale * Math.cos(y / 2) - y;
}

export function tracePartnerRoot(scale, tolerance = DEFAULT_ROOT_TOLERANCE) {
  if (!Number.isFinite(scale) || scale <= 0) {
    throw new Error("trace scale must be positive");
  }
  let left = 0;
  let right = Math.PI;
  let fLeft = rootEquation(scale, left);
  const fRight = rootEquation(scale, right);
  if (!(fLeft > 0 && fRight < 0)) {
    throw new Error("trace partner root bracket failed");
  }

  for (let step = 0; step < 120; step += 1) {
    const mid = 0.5 * (left + right);
    const fMid = rootEquation(scale, mid);
    if (Math.abs(fMid) <= tolerance || Math.abs(right - left) <= tolerance) {
      return mid;
    }
    if (fLeft * fMid > 0) {
      left = mid;
      fLeft = fMid;
    } else {
      right = mid;
    }
  }
  return 0.5 * (left + right);
}

export function tracePartnerMean(scale, root = tracePartnerRoot(scale)) {
  const jacobian = 1 + scale * Math.sin(root / 2);
  return {
    scale,
    epsilon: scale - 1,
    root,
    jacobian,
    mean: (scale * scale * Math.sin(root)) / (root ** 3 * jacobian),
  };
}

function uniqueSortedScales(scales) {
  return [...new Set(scales.map((scale) => formatNumber(scale)).filter((scale) => scale > 0))].sort(
    (left, right) => left - right
  );
}

function buildScaleGrid(scaleMin, scaleMax, scaleCount) {
  if (scaleCount === 1) {
    return [scaleMin];
  }
  const ratio = scaleMax / scaleMin;
  return Array.from({ length: scaleCount }, (_, index) => {
    const t = index / (scaleCount - 1);
    return scaleMin * ratio ** t;
  });
}

function sampleRow(scale, rootTolerance) {
  const row = tracePartnerMean(scale, tracePartnerRoot(scale, rootTolerance));
  return {
    scale: formatNumber(row.scale),
    epsilon: formatNumber(row.epsilon),
    partner_root_y: formatNumber(row.root),
    jacobian: formatNumber(row.jacobian),
    partner_mean: formatNumber(row.mean),
    partner_period_integral: formatNumber(TAU * row.mean),
    positivity_status: row.mean > 0 && row.root > 0 && row.root < Math.PI ? "positive" : "failed",
  };
}

export function buildOctahedralTraceAffineZeroMeanObstruction(options = {}) {
  const scaleMin = Number(options.scaleMin ?? DEFAULT_SCALE_MIN);
  const scaleMax = Number(options.scaleMax ?? DEFAULT_SCALE_MAX);
  const scaleCount = Number.parseInt(options.scaleCount ?? DEFAULT_SCALE_COUNT, 10);
  const rootTolerance = Number(options.rootTolerance ?? DEFAULT_ROOT_TOLERANCE);
  if (!Number.isFinite(scaleMin) || scaleMin <= 0) {
    throw new Error("scaleMin must be positive");
  }
  if (!Number.isFinite(scaleMax) || scaleMax <= scaleMin) {
    throw new Error("scaleMax must be greater than scaleMin");
  }
  if (!Number.isInteger(scaleCount) || scaleCount < 1) {
    throw new Error("scaleCount must be an integer >= 1");
  }
  if (!Number.isFinite(rootTolerance) || rootTolerance <= 0) {
    throw new Error("rootTolerance must be positive");
  }

  const scales = uniqueSortedScales([...buildScaleGrid(scaleMin, scaleMax, scaleCount), 1, LINEAR_TRACE_SCALE]);
  const samples = scales.map((scale) => sampleRow(scale, rootTolerance));
  const atLinearTraceScale = sampleRow(LINEAR_TRACE_SCALE, rootTolerance);
  const atUnitScale = sampleRow(1, rootTolerance);

  return {
    schema: OCTAHEDRAL_TRACE_AFFINE_ZERO_MEAN_OBSTRUCTION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    source_speed_ode: "scripts/neutral-swarm/octahedral-speed-ode-diagnostic.mjs",
    source_affine_force_mean_derivative:
      "scripts/neutral-swarm/octahedral-affine-force-mean-derivative.mjs",
    priority_packet: "reference/priorities/geometry-bridge/octahedral-trace-affine-zero-mean-obstruction.md",
    deformation: {
      trace_scale: "Y_s=sY, T_s=sT",
      admissible_scale_domain: "s>0",
      causal_root_equation: "G_s(y)=2*s*cos(y/2)-y=0",
      partner_jacobian: "J_s=1+s*sin(y_s/2)",
      partner_mean_formula: "m_partner(s)=s^2*sin(y_s)/(y_s^3*(1+s*sin(y_s/2)))",
    },
    analytic_certificate: {
      root_interval: "(0, pi)",
      root_uniqueness: "G_s(0)>0, G_s(pi)<0, and dG_s/dy=-1-s*sin(y/2)<0 for s>0",
      positivity_reason:
        "for s>0 the unique root has 0<y_s<pi, so sin(y_s)>0 and J_s>0; hence m_partner(s)>0",
      cross_binary_status:
        "partner positivity alone does not decide the full trace-scaled mean because cross-binary roots and weights also move under finite trace scaling",
      same_ledger_caveat:
        "this certificate is only the antipodal partner subrow; the total trace-scaled row must be solved by a full root-ledger diagnostic",
      limit_scale_to_zero: formatNumber(0.25),
      limit_scale_to_infinity: formatNumber(1 / (Math.PI * Math.PI)),
      zero_mean_verdict: "partner-row-positive-total-row-not-decided",
    },
    linear_trace_prediction: {
      alpha_trace: formatNumber(LINEAR_TRACE_ALPHA),
      predicted_zero_scale: formatNumber(LINEAR_TRACE_SCALE),
      source: "octahedral affine force-mean derivative tangent solve",
    },
    unit_scale_check: atUnitScale,
    linear_trace_scale_check: atLinearTraceScale,
    samples,
    result: {
      nonlinear_trace_zero_mean: "not_decided_by_partner_row",
      theory_status: "trace-affine-partner-row-positive-total-row-open",
      first_order_status: "linear-range-pass-requires-total-root-ledger-solve",
      retention: "not_retained",
      retained_branch: false,
      certifies_bounded_speed_live_ledger: false,
      first_failure_status: "total-trace-root-ledger-solve-required",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralTraceAffineZeroMeanObstruction(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_TRACE_AFFINE_ZERO_MEAN_OBSTRUCTION_SCHEMA,
    "schema must match trace affine obstruction schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match trace affine obstruction packet", errors);
  assertField(artifact?.promotion_status === PROMOTION_STATUS, "promotion status must remain priority-only", errors);
  assertField(
    artifact?.analytic_certificate?.zero_mean_verdict ===
      "partner-row-positive-total-row-not-decided",
    "analytic certificate must remain scoped to the partner row",
    errors
  );
  assertField(
    Number(artifact?.unit_scale_check?.partner_period_integral) > 1,
    "unit scale partner period integral must reproduce the positive fixed-speed mean",
    errors
  );
  assertField(
    Number(artifact?.linear_trace_scale_check?.partner_period_integral) > 0,
    "linear trace zero scale must still have positive nonlinear partner-row mean",
    errors
  );
  assertField(
    Array.isArray(artifact?.samples) &&
      artifact.samples.length >= 3 &&
      artifact.samples.every((row) => row.positivity_status === "positive" && Number(row.partner_mean) > 0),
    "all sampled positive trace scales must keep positive partner mean",
    errors
  );
  assertField(artifact?.result?.retention === "not_retained", "artifact must not claim retained branch status", errors);
  assertField(
    artifact?.result?.certifies_bounded_speed_live_ledger === false,
    "artifact must not certify a bounded-speed live ledger",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-trace-affine-zero-mean-obstruction.mjs [options]",
    "",
    "Options:",
    "  --scale-min <s>       Positive minimum trace scale (default: 0.125)",
    "  --scale-max <s>       Positive maximum trace scale (default: 16)",
    "  --scale-count <n>     Log-spaced sample count (default: 9)",
    "  --root-tol <x>        Bisection root tolerance (default: 1e-13)",
    "  --out <path>          Write artifact JSON to path instead of stdout",
    "  --validate <path>     Validate an existing artifact JSON file",
    "  --schema              Print the artifact schema identifier",
    "  --pretty              Pretty-print JSON output",
    "  --help                Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    scaleMin: DEFAULT_SCALE_MIN,
    scaleMax: DEFAULT_SCALE_MAX,
    scaleCount: DEFAULT_SCALE_COUNT,
    rootTolerance: DEFAULT_ROOT_TOLERANCE,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--scale-min") {
      args.scaleMin = Number(argv[++index]);
    } else if (arg === "--scale-max") {
      args.scaleMax = Number(argv[++index]);
    } else if (arg === "--scale-count") {
      args.scaleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--root-tol") {
      args.rootTolerance = Number(argv[++index]);
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
          schema: "neutral-swarm-octahedral-trace-affine-partner-positive-row-schema/v1",
          artifact_schema: OCTAHEDRAL_TRACE_AFFINE_ZERO_MEAN_OBSTRUCTION_SCHEMA,
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
    const errors = validateOctahedralTraceAffineZeroMeanObstruction(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          result: artifact.result ?? null,
          linear_trace_scale_check: artifact.linear_trace_scale_check ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralTraceAffineZeroMeanObstruction({
    scaleMin: args.scaleMin,
    scaleMax: args.scaleMax,
    scaleCount: args.scaleCount,
    rootTolerance: args.rootTolerance,
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

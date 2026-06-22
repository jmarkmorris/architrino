#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildOctahedralPhaseOffsetScan } from "./octahedral-phase-offset-scan.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_PHASE_OFFSET_RETENTION_WITNESS_SCHEMA =
  "neutral-braid-octahedral-phase-offset-retention-witness/v1";

const PACKET_ID = "octahedral_phase_offset_retention_witness";
const PROMOTION_STATUS = "priority-only";
const CLOSURE_STATUS = "closed-rejected:sampled-phase-offset-improvement-implies-retention";
const DEFAULT_GRID = 9;
const DEFAULT_PHASE_SAMPLES = 25;
const DEFAULT_Y_SUBDIVISIONS = 160;
const DEFAULT_TOP = 8;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toFixed(12));
}

function normalizeOptions(options) {
  const grid = Number.parseInt(options.grid ?? DEFAULT_GRID, 10);
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const top = Number.parseInt(options.top ?? DEFAULT_TOP, 10);

  return {
    grid,
    phaseSamples,
    ySubdivisions,
    top,
  };
}

export function buildOctahedralPhaseOffsetRetentionWitness(options = {}) {
  const normalizedOptions = normalizeOptions(options);
  const scan = buildOctahedralPhaseOffsetScan(normalizedOptions);
  const zeroOffset = scan.scan_summary.zero_offset;
  const best = scan.scan_summary.best;
  const improvement =
    zeroOffset && Number.isFinite(zeroOffset.rms_tangential_residual) && Number.isFinite(best?.rms_tangential_residual)
      ? formatNumber(zeroOffset.rms_tangential_residual - best.rms_tangential_residual)
      : null;

  return {
    schema: OCTAHEDRAL_PHASE_OFFSET_RETENTION_WITNESS_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_octahedral_phase_offset_retention_witness.sampled_overread_rejection.v1",
    promotion_status: PROMOTION_STATUS,
    source_artifact_schema: scan.schema,
    artifact_claim: {
      kind: "sampled_phase_offset_retention_overread_rejection",
      overread:
        "sampled rigid phase-offset improvement implies retained fixed-speed closure",
      overread_retained: false,
      retained_branch: false,
      strongest_claim:
        "A sampled rigid phase-offset row may improve RMS over the zero-offset row, but the best sampled row still has nonzero tangential residual and is not retained.",
    },
    options: {
      grid: normalizedOptions.grid,
      samples: normalizedOptions.phaseSamples,
      subdivisions: normalizedOptions.ySubdivisions,
      top: normalizedOptions.top,
    },
    deterministic_scan: {
      zero_offset: zeroOffset,
      best,
      rms_improvement_over_zero_offset: improvement,
      best_rows: scan.scan_summary.best_rows,
    },
    result: {
      closure_status: CLOSURE_STATUS,
      retention: "not_retained",
      retained_branch: false,
      best_row_retention: best?.retention ?? null,
      best_row_max_abs_tangential_residual: best?.max_abs_tangential_residual ?? null,
      source_phase_offset_scan: scan.result?.phase_offset_scan ?? null,
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralPhaseOffsetRetentionWitness(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === OCTAHEDRAL_PHASE_OFFSET_RETENTION_WITNESS_SCHEMA,
    `schema must be ${OCTAHEDRAL_PHASE_OFFSET_RETENTION_WITNESS_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.artifact_claim?.overread_retained === false, "artifact must reject the overread", errors);
  assertField(artifact.artifact_claim?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.closure_status === CLOSURE_STATUS, `closure_status must be ${CLOSURE_STATUS}`, errors);
  assertField(artifact.result?.retention === "not_retained", "result.retention must be not_retained", errors);
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);

  const options = artifact.options ?? {};
  assertField(Number.isInteger(options.grid) && options.grid >= 1, "options.grid must be a positive integer", errors);
  assertField(Number.isInteger(options.samples) && options.samples >= 1, "options.samples must be a positive integer", errors);
  assertField(
    Number.isInteger(options.subdivisions) && options.subdivisions >= 10,
    "options.subdivisions must be an integer >= 10",
    errors
  );
  assertField(Number.isInteger(options.top) && options.top >= 1, "options.top must be a positive integer", errors);

  const scan = artifact.deterministic_scan ?? {};
  assertField(scan.zero_offset && typeof scan.zero_offset === "object", "zero_offset row must be present", errors);
  assertField(scan.best && typeof scan.best === "object", "best row must be present", errors);
  assertField(Number.isFinite(scan.rms_improvement_over_zero_offset), "RMS improvement must be finite", errors);
  assertField(scan.rms_improvement_over_zero_offset >= 0, "RMS improvement must be nonnegative", errors);
  assertField(scan.best?.retention === "not_retained", "best row retention must be not_retained", errors);
  assertField(
    Number.isFinite(scan.best?.max_abs_tangential_residual) && scan.best.max_abs_tangential_residual > 0,
    "best row max_abs_tangential_residual must be finite and positive",
    errors
  );
  assertField(Array.isArray(scan.best_rows), "best_rows must be an array", errors);
  assertField(scan.best_rows?.length > 0, "best_rows must not be empty", errors);
  assertField(
    artifact.result?.best_row_retention === "not_retained",
    "result.best_row_retention must be not_retained",
    errors
  );
  assertField(
    Number.isFinite(artifact.result?.best_row_max_abs_tangential_residual) &&
      artifact.result.best_row_max_abs_tangential_residual > 0,
    "result.best_row_max_abs_tangential_residual must be finite and positive",
    errors
  );

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-phase-offset-retention-witness.mjs [options]",
    "",
    "Options:",
    "  --grid <n>          Phase-offset values per axis for phi2,phi3 (default: 9)",
    "  --samples <n>       Receiver phase samples over [0, 2*pi) (default: 25)",
    "  --subdivisions <n>  Root-search subdivisions over 0 < y <= 2 (default: 160)",
    "  --top <n>           Number of best rows to include (default: 8)",
    "  --out <path>        Write artifact JSON to path instead of stdout",
    "  --validate <path>   Validate an existing artifact JSON file",
    "  --schema            Print the artifact schema identifier",
    "  --pretty            Pretty-print JSON output",
    "  --help              Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    grid: DEFAULT_GRID,
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    top: DEFAULT_TOP,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--grid") {
      args.grid = Number.parseInt(argv[++index], 10);
    } else if (arg === "--samples") {
      args.phaseSamples = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.ySubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--top") {
      args.top = Number.parseInt(argv[++index], 10);
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
          schema: "neutral-braid-octahedral-phase-offset-retention-witness-schema/v1",
          artifact_schema: OCTAHEDRAL_PHASE_OFFSET_RETENTION_WITNESS_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
          closure_status: CLOSURE_STATUS,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateOctahedralPhaseOffsetRetentionWitness(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          options: artifact.options ?? null,
          closure_status: artifact.result?.closure_status ?? null,
          retention: artifact.result?.retention ?? null,
          best: artifact.deterministic_scan?.best ?? null,
          rms_improvement_over_zero_offset:
            artifact.deterministic_scan?.rms_improvement_over_zero_offset ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralPhaseOffsetRetentionWitness({
    grid: args.grid,
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
    top: args.top,
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

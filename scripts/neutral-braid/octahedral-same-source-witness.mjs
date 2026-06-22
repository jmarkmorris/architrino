#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { OCTAHEDRAL_SITES, formatOctahedralNumber } from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_SAME_SOURCE_WITNESS_SCHEMA = "neutral-braid-octahedral-same-source-witness/v1";

const PACKET_ID = "octahedral_same_source_positive_delay_witness";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_SAMPLE_COUNT = 33;
const INTERVALS = [
  { interval_id: "I0_open_near_zero", y_interval: ["0", 0.25], lower_open: true },
  { interval_id: "I1", y_interval: [0.25, 0.5], lower_open: false },
  { interval_id: "I2", y_interval: [0.5, 1], lower_open: false },
  { interval_id: "I3", y_interval: [1, 1.5], lower_open: false },
  { interval_id: "I4", y_interval: [1.5, 2], lower_open: false },
];

export function sameSourceEquation(y) {
  return 2 * Math.abs(Math.sin(y / 2)) - y;
}

function sampleYs(sampleCount) {
  return Array.from({ length: sampleCount }, (_, index) => {
    if (sampleCount === 1) {
      return 2;
    }
    return (2 * (index + 1)) / sampleCount;
  });
}

function intervalCertificate(row) {
  const lower = row.y_interval[0] === "0" ? 0 : row.y_interval[0];
  const upper = row.y_interval[1];
  const maxAttainedAt = row.lower_open ? "open_excluded_y_to_0_plus_boundary" : "lower_endpoint";
  const maxUpperBound = row.lower_open ? 0 : sameSourceEquation(lower);

  return {
    ...row,
    equation: "G_self(y)=2|sin(y/2)|-y",
    substitution: "x=y/2",
    analytic_certificate: "for y>0, x>0 and sin(x)<x, hence 2|sin(y/2)|<y",
    monotonic_certificate: "G_self'(y)=cos(y/2)-1<0 for y in (0,2]",
    max_attained_at: maxAttainedAt,
    max_upper_bound: formatOctahedralNumber(maxUpperBound),
    endpoint_values:
      row.lower_open
        ? {
            y_to_0_plus_limit: 0,
            upper_endpoint_value: formatOctahedralNumber(sameSourceEquation(upper)),
          }
        : {
            lower_endpoint_value: formatOctahedralNumber(sameSourceEquation(lower)),
            upper_endpoint_value: formatOctahedralNumber(sameSourceEquation(upper)),
          },
    equality_in_interval: false,
    status: row.lower_open ? "strictly_negative_for_every_positive_y" : "strictly_negative_with_margin",
  };
}

function sampleCertificate(sampleCount) {
  const samples = sampleYs(sampleCount).map((y) => ({
    y: formatOctahedralNumber(y),
    G_self: formatOctahedralNumber(sameSourceEquation(y)),
    sign: sameSourceEquation(y) < 0 ? "negative" : "nonnegative",
  }));
  const values = samples.map((sample) => sample.G_self);

  return {
    sample_count: sampleCount,
    domain: "(0,2]",
    grid: "y_k=2*k/sample_count for k=1..sample_count",
    all_samples_negative: samples.every((sample) => sample.G_self < 0),
    sample_value_max: formatOctahedralNumber(Math.max(...values)),
    sample_value_min: formatOctahedralNumber(Math.min(...values)),
    samples,
  };
}

function sameSourceSiteStatuses() {
  return OCTAHEDRAL_SITES.map((site) => ({
    site: site.id,
    label: site.label,
    binary: site.binary,
    polarity: site.polarity,
    same_source_equation: "G_self(y)=2|sin(y/2)|-y",
    ordinary_same_source_status: "excluded_positive_delay",
    equality_status: "only_excluded_y_0_limit",
    retention: "not_retained",
  }));
}

export function buildOctahedralSameSourceWitness(options = {}) {
  const sampleCount = Number.parseInt(options.sampleCount ?? DEFAULT_SAMPLE_COUNT, 10);
  if (!Number.isInteger(sampleCount) || sampleCount < 2) {
    throw new Error("sampleCount must be an integer >= 2");
  }

  const interval_certificates = INTERVALS.map(intervalCertificate);
  const sample_certificate = sampleCertificate(sampleCount);

  return {
    schema: OCTAHEDRAL_SAME_SOURCE_WITNESS_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_octahedral_same_source_positive_delay_witness.v1",
    promotion_status: PROMOTION_STATUS,
    source: "scripts/neutral-braid/octahedral-same-source-witness.mjs",
    closure_status: "closed-rejected:ordinary-same-source-positive-delay",
    ordinary_same_source_status: "excluded_positive_delay",
    retention: "not_retained",
    analytic_claim: {
      kind: "ordinary_same_source_positive_delay_exclusion",
      carrier: "rigid fixed-speed circular/octahedral carrier",
      equation: "G_self(y)=2|sin(y/2)|-y",
      delay_domain: "y>0",
      equality_statement: "G_self(y)=0 only at the excluded y=0 limit",
      retained_positive_delay_root: false,
      strongest_claim:
        "Ordinary same-source rows have no retained positive-delay equality for the rigid circular site motion.",
    },
    proof_rows: [
      {
        row: "R_same_source_analytic_strict_inequality",
        status: "passed",
        statement: "for 0<y<=2, 2|sin(y/2)|<y, so G_self(y)<0",
      },
      {
        row: "R_same_source_equality_limit",
        status: "passed",
        equality: "G_self(0)=0",
        retained: false,
        reason: "y=0 is the zero-delay boundary, not a positive-delay root",
      },
      {
        row: "R_same_source_large_delay",
        status: "passed",
        domain: "y>2",
        separation_bound: "same-source circular separation <= 2",
        exclusion: "2-y<0",
      },
    ],
    interval_certificates,
    sample_certificate,
    large_delay_exclusion: {
      domain: "y>2",
      same_source_separation_bound: 2,
      equation_requires_separation: "y",
      residual_upper_bound: "2-y",
      status: "excluded_by_bounded_separation",
    },
    site_statuses: sameSourceSiteStatuses(),
    result: {
      closure_status: "closed-rejected:ordinary-same-source-positive-delay",
      ordinary_same_source_status: "excluded_positive_delay",
      equality: "only_excluded_y_0_limit",
      retained_positive_delay_root: false,
      retention: "not_retained",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralSameSourceWitness(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === OCTAHEDRAL_SAME_SOURCE_WITNESS_SCHEMA,
    `schema must be ${OCTAHEDRAL_SAME_SOURCE_WITNESS_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(
    artifact.ordinary_same_source_status === "excluded_positive_delay",
    "ordinary_same_source_status must be excluded_positive_delay",
    errors
  );
  assertField(
    artifact.closure_status === "closed-rejected:ordinary-same-source-positive-delay",
    "closure_status must be closed-rejected:ordinary-same-source-positive-delay",
    errors
  );
  assertField(artifact.retention === "not_retained", "retention must be not_retained", errors);
  assertField(
    artifact.result?.closure_status === "closed-rejected:ordinary-same-source-positive-delay",
    "result closure_status must be closed-rejected:ordinary-same-source-positive-delay",
    errors
  );
  assertField(
    artifact.result?.ordinary_same_source_status === "excluded_positive_delay",
    "result ordinary_same_source_status must be excluded_positive_delay",
    errors
  );
  assertField(artifact.result?.retention === "not_retained", "result retention must be not_retained", errors);
  assertField(
    artifact.result?.retained_positive_delay_root === false,
    "result must declare retained_positive_delay_root=false",
    errors
  );

  const intervalCertificates = artifact.interval_certificates ?? [];
  assertField(Array.isArray(intervalCertificates) && intervalCertificates.length === 5, "must contain five interval certificates", errors);
  assertField(
    intervalCertificates.every((row) => row.equality_in_interval === false && String(row.status).startsWith("strictly_negative")),
    "all interval certificates must exclude equality",
    errors
  );
  assertField(
    intervalCertificates[0]?.max_upper_bound === 0 && intervalCertificates[0]?.lower_open === true,
    "near-zero interval must record only the excluded y=0 limit as the upper boundary",
    errors
  );

  const sampleCertificate = artifact.sample_certificate ?? {};
  assertField(sampleCertificate.all_samples_negative === true, "all deterministic samples must be negative", errors);
  assertField(sampleCertificate.sample_count >= 2, "sample count must be >= 2", errors);
  assertField(
    Array.isArray(sampleCertificate.samples) &&
      sampleCertificate.samples.length === sampleCertificate.sample_count &&
      sampleCertificate.samples.every((sample) => sample.y > 0 && sample.y <= 2 && sample.G_self < 0),
    "samples must lie in (0,2] with negative G_self values",
    errors
  );

  assertField(
    artifact.large_delay_exclusion?.domain === "y>2" &&
      artifact.large_delay_exclusion?.same_source_separation_bound === 2 &&
      artifact.large_delay_exclusion?.status === "excluded_by_bounded_separation",
    "large-delay row must exclude y>2 by bounded separation",
    errors
  );

  const siteStatuses = artifact.site_statuses ?? [];
  assertField(Array.isArray(siteStatuses) && siteStatuses.length === 6, "must include all six octahedral site statuses", errors);
  assertField(
    siteStatuses.every(
      (row) =>
        row.ordinary_same_source_status === "excluded_positive_delay" &&
        row.retention === "not_retained" &&
        row.equality_status === "only_excluded_y_0_limit"
    ),
    "all site statuses must carry the same same-source exclusion",
    errors
  );

  const serialized = JSON.stringify(artifact);
  assertField(!serialized.includes("controlled self-hit"), "artifact must not claim controlled self-hit policy", errors);
  assertField(!serialized.includes("fold-layer"), "artifact must not claim fold-layer policy", errors);

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-same-source-witness.mjs [options]",
    "",
    "Options:",
    "  --samples <n>      Deterministic sample count over 0 < y <= 2 (default: 33)",
    "  --out <path>       Write artifact JSON to path instead of stdout",
    "  --validate <path>  Validate an existing artifact JSON file",
    "  --schema           Print the artifact schema identifier",
    "  --pretty           Pretty-print JSON output",
    "  --help             Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    sampleCount: DEFAULT_SAMPLE_COUNT,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--samples") {
      args.sampleCount = Number.parseInt(argv[++index], 10);
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
          schema: "neutral-braid-octahedral-same-source-witness-schema/v1",
          artifact_schema: OCTAHEDRAL_SAME_SOURCE_WITNESS_SCHEMA,
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
    const errors = validateOctahedralSameSourceWitness(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          closure_status: artifact.result?.closure_status ?? null,
          ordinary_same_source_status: artifact.result?.ordinary_same_source_status ?? null,
          retention: artifact.result?.retention ?? null,
          sample_count: artifact.sample_certificate?.sample_count ?? null,
          site_status_count: artifact.site_statuses?.length ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralSameSourceWitness({ sampleCount: args.sampleCount });
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

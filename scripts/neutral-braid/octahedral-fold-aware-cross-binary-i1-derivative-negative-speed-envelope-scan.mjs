#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas,
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
  validateOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_DERIVATIVE_NEGATIVE_SPEED_ENVELOPE_SCAN_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_derivative_negative_speed_envelope_scan";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const DEFAULT_DERIVATIVE_ATLAS_SAMPLES_PER_CELL = 8;
const DEFAULT_THETA_SAMPLE_COUNT = 48;
const DEFAULT_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_ENDPOINT_PADDING = 1e-5;
const DEFAULT_MACHINE_PADDING = 1e-9;
const CHECK_TOLERANCE = 1e-10;
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const EXPECTED_SOURCE_ROOT_COUNT = 6;

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function sampleGrid({ left, right, count }) {
  return Array.from({ length: count }, (_, index) =>
    left + ((right - left) * (index + 0.5)) / count
  );
}

function sampleSpeedGrid({ speedRatioEnclosure, speedSampleCount }) {
  const [left, right] = speedRatioEnclosure.map(Number);
  if (speedSampleCount === 1) {
    return [0.5 * (left + right)];
  }
  return Array.from({ length: speedSampleCount }, (_, index) =>
    left + ((right - left) * index) / (speedSampleCount - 1)
  );
}

function rowById(rows, field, id) {
  const row = rows.find((entry) => entry[field] === id);
  if (!row) {
    throw new Error(`missing row ${id}`);
  }
  return row;
}

function buildDerivativeRows({
  thetaSamples,
  speedSamples,
  rootSubdivisions,
}) {
  const rows = [];
  for (const speedRatio of speedSamples) {
    for (const theta of thetaSamples) {
      const evaluated = evaluateCrossBinaryForcingAndDerivativeAtTheta({
        speedRatio,
        theta,
        rootSubdivisions,
      });
      rows.push({
        speed_ratio: formatSmallNumber(speedRatio),
        theta: formatSmallNumber(theta),
        forcing: formatSmallNumber(evaluated.value),
        derivative: formatSmallNumber(evaluated.derivative),
        signed_derivative_margin: formatSmallNumber(-evaluated.derivative),
        source_root_count: evaluated.source_root_count,
        term_root_counts: evaluated.terms.map((term) => ({
          term_label: term.term_label,
          root_count: term.root_count,
        })),
      });
    }
  }
  return rows;
}

function buildScanSummary({ derivativeRows, machinePadding }) {
  const derivativeValues = derivativeRows.map((row) => Number(row.derivative));
  const rawDerivativeMinimum = Math.min(...derivativeValues);
  const rawDerivativeMaximum = Math.max(...derivativeValues);
  const derivativeEnvelopeUpper = rawDerivativeMaximum + machinePadding;
  const signedClearance = -derivativeEnvelopeUpper;
  const weakest = derivativeRows.reduce((best, row) =>
    Number(row.derivative) > Number(best.derivative) ? row : best
  );
  const sourceRootCounts = [
    ...new Set(derivativeRows.map((row) => row.source_root_count)),
  ].sort((left, right) => left - right);
  return {
    scan_row_id: "I1.derivative-negative.full-cell.speed-envelope-scan",
    target_row_id: "I1.derivative-negative.full-cell",
    sampled_point_count: derivativeRows.length,
    source_root_count_expected: EXPECTED_SOURCE_ROOT_COUNT,
    source_root_counts: sourceRootCounts,
    source_root_count_preserved:
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT,
    raw_derivative_minimum: formatSmallNumber(rawDerivativeMinimum),
    raw_derivative_maximum: formatSmallNumber(rawDerivativeMaximum),
    machine_padding: formatSmallNumber(machinePadding),
    derivative_envelope: [
      formatSmallNumber(rawDerivativeMinimum - machinePadding),
      formatSmallNumber(derivativeEnvelopeUpper),
    ],
    signed_derivative_clearance: formatSmallNumber(signedClearance),
    weakest_sample: {
      speed_ratio: weakest.speed_ratio,
      theta: weakest.theta,
      derivative: weakest.derivative,
      signed_derivative_margin: weakest.signed_derivative_margin,
    },
    status:
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT &&
      signedClearance > CHECK_TOLERANCE
        ? "i1-derivative-negative-speed-envelope-scan-certified"
        : "i1-derivative-negative-speed-envelope-scan-open",
  };
}

function buildSpeedSliceRows(derivativeRows) {
  const rowsBySpeed = new Map();
  for (const row of derivativeRows) {
    const key = String(row.speed_ratio);
    if (!rowsBySpeed.has(key)) {
      rowsBySpeed.set(key, []);
    }
    rowsBySpeed.get(key).push(row);
  }
  return [...rowsBySpeed.entries()].map(([speedRatio, rows]) => {
    const derivativeValues = rows.map((row) => Number(row.derivative));
    const rootCounts = [
      ...new Set(rows.map((row) => row.source_root_count)),
    ].sort((left, right) => left - right);
    const weakest = rows.reduce((best, row) =>
      Number(row.derivative) > Number(best.derivative) ? row : best
    );
    const rawDerivativeMaximum = Math.max(...derivativeValues);
    return {
      speed_ratio: Number(speedRatio),
      theta_sample_count: rows.length,
      source_root_counts: rootCounts,
      source_root_count_preserved:
        rootCounts.length === 1 &&
        rootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT,
      raw_derivative_minimum: formatSmallNumber(Math.min(...derivativeValues)),
      raw_derivative_maximum: formatSmallNumber(rawDerivativeMaximum),
      weakest_theta_at_max: weakest.theta,
      signed_derivative_margin_at_max: formatSmallNumber(-rawDerivativeMaximum),
      status:
        rootCounts.length === 1 &&
        rootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT &&
        rawDerivativeMaximum < 0
          ? "speed-slice-derivative-negative-certified"
          : "speed-slice-derivative-negative-open",
    };
  });
}

function buildScanTheorem() {
  return {
    theorem_id: "i1-derivative-negative-speed-envelope-scan",
    theorem_scope: "compact regular I1 source-atlas scan grid",
    statement:
      "On the compact regular I1 scan grid and across the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required, the source-atlas-aware derivative formula evaluates to a strictly negative derivative envelope while preserving six source roots at every sampled point.",
    proof_steps: [
      "Import the source-atlas-aware derivative formula and the three regular-cell source-atlas partition.",
      "Restrict to the compact I1 regular scan interval obtained by padding the fold endpoint away from the singular collar.",
      "Evaluate f'_cross on the midpoint theta grid for every sampled speed in the certified speed-ratio enclosure.",
      "Require six source roots at every sampled point and a machine-expanded derivative envelope with negative upper endpoint.",
      "Conclude a speed-envelope derivative scan certificate for I1; do not conclude full-cell interval derivative enclosure or I1 zero isolation until directed-rounded derivative bounds cover the continuous cell.",
    ],
    proof_status: "sampled-speed-envelope-derivative-scan-certified",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const scanSamplesPerCell = Number.parseInt(
    options.scanSamplesPerCell ?? DEFAULT_SCAN_SAMPLES_PER_CELL,
    10
  );
  const sourceQuadraturePanelsPerSegment = Number.parseInt(
    options.sourceQuadraturePanelsPerSegment ??
      DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const derivativeAtlasSamplesPerCell = Number.parseInt(
    options.derivativeAtlasSamplesPerCell ??
      DEFAULT_DERIVATIVE_ATLAS_SAMPLES_PER_CELL,
    10
  );
  const thetaSampleCount = Number.parseInt(
    options.thetaSampleCount ?? DEFAULT_THETA_SAMPLE_COUNT,
    10
  );
  const speedSampleCount = Number.parseInt(
    options.speedSampleCount ?? DEFAULT_SPEED_SAMPLE_COUNT,
    10
  );
  const endpointPadding = Number(
    options.endpointPadding ?? DEFAULT_ENDPOINT_PADDING
  );
  const machinePadding = Number(
    options.machinePadding ?? DEFAULT_MACHINE_PADDING
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(scanSamplesPerCell) || scanSamplesPerCell < 16) {
    throw new Error("scanSamplesPerCell must be an integer >= 16");
  }
  if (
    !Number.isInteger(sourceQuadraturePanelsPerSegment) ||
    sourceQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("sourceQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (
    !Number.isInteger(derivativeAtlasSamplesPerCell) ||
    derivativeAtlasSamplesPerCell < 4
  ) {
    throw new Error("derivativeAtlasSamplesPerCell must be an integer >= 4");
  }
  if (!Number.isInteger(thetaSampleCount) || thetaSampleCount < 8) {
    throw new Error("thetaSampleCount must be an integer >= 8");
  }
  if (!Number.isInteger(speedSampleCount) || speedSampleCount < 3) {
    throw new Error("speedSampleCount must be an integer >= 3");
  }
  if (!Number.isFinite(endpointPadding) || endpointPadding <= 0) {
    throw new Error("endpointPadding must be positive");
  }
  if (!Number.isFinite(machinePadding) || machinePadding <= 0) {
    throw new Error("machinePadding must be positive");
  }

  const derivativeAtlas =
    buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      sourceQuadraturePanelsPerSegment,
      samplesPerCell: derivativeAtlasSamplesPerCell,
    });
  const derivativeAtlasErrors =
    validateOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas(
      derivativeAtlas
    );
  const i1Cell = rowById(derivativeAtlas.regular_cell_intervals, "cell_id", "I1");
  const scanLeft = Number(i1Cell.theta_left) + endpointPadding;
  const scanRight = Number(i1Cell.theta_right) - endpointPadding;
  if (!(scanLeft < scanRight)) {
    throw new Error("endpointPadding leaves no compact I1 scan interval");
  }
  const thetaSamples = sampleGrid({
    left: scanLeft,
    right: scanRight,
    count: thetaSampleCount,
  });
  const speedSamples = sampleSpeedGrid({
    speedRatioEnclosure: derivativeAtlas.derivative_parameters.speed_ratio_enclosure,
    speedSampleCount,
  });
  const derivativeRows = buildDerivativeRows({
    thetaSamples,
    speedSamples,
    rootSubdivisions,
  });
  const scanSummary = buildScanSummary({
    derivativeRows,
    machinePadding,
  });
  const speedSliceRows = buildSpeedSliceRows(derivativeRows);
  const certified =
    derivativeAtlasErrors.length === 0 &&
    scanSummary.status ===
      "i1-derivative-negative-speed-envelope-scan-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_DERIVATIVE_NEGATIVE_SPEED_ENVELOPE_SCAN_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-forcing-derivative-atlas.md",
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md",
    ],
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.md",
    source_derivative_atlas_check: {
      schema: derivativeAtlas.schema,
      valid: derivativeAtlasErrors.length === 0,
      errors: derivativeAtlasErrors,
      theory_status: derivativeAtlas.result.theory_status,
      retained_branch: derivativeAtlas.result.retained_branch,
      certifies_source_atlas_aware_derivative_formula:
        derivativeAtlas.artifact_claim
          .certifies_source_atlas_aware_derivative_formula === true,
      certifies_interval_derivative_enclosure:
        derivativeAtlas.artifact_claim.certifies_interval_derivative_enclosure ===
        true,
    },
    scan_parameters: {
      receiver_label: "1+",
      target_row_id: "I1.derivative-negative.full-cell",
      theta_domain: "[0,H/4]",
      i1_cell_interval: [
        formatSmallNumber(Number(i1Cell.theta_left)),
        formatSmallNumber(Number(i1Cell.theta_right)),
      ],
      compact_scan_interval: [
        formatSmallNumber(scanLeft),
        formatSmallNumber(scanRight),
      ],
      endpoint_padding: formatSmallNumber(endpointPadding),
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure:
        derivativeAtlas.derivative_parameters.speed_ratio_enclosure,
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      derivative_atlas_samples_per_cell: derivativeAtlasSamplesPerCell,
      theta_sample_count: thetaSampleCount,
      speed_sample_count: speedSampleCount,
      machine_padding: formatSmallNumber(machinePadding),
    },
    i1_derivative_negative_scan_theorem: buildScanTheorem(),
    derivative_scan_summary: scanSummary,
    derivative_speed_slice_rows: speedSliceRows,
    derivative_scan_rows: derivativeRows,
    interval_profile_boundary: {
      certifies_I1_derivative_negative_speed_envelope_scan: certified,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_I1_zero_isolation: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "directed-rounding derivative bounds on the continuous compact I1 interval",
        "fold-end collar compatibility at theta_3-",
        "I1.f1 zero isolation",
        "remaining finite row-family enclosures",
      ],
      status:
        "i1-derivative-negative-speed-envelope-scan-certified-full-interval-derivative-row-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_I1_derivative_negative_speed_envelope_scan: certified,
      certifies_source_root_count_six_on_I1_scan: certified,
      advances_I1_derivative_negative_full_cell: certified,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_I1_zero_isolation: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "I1 derivative negative speed-envelope scan on the compact regular cell; full continuous interval derivative enclosure, zero isolation, critical exhaustion, quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: certified
        ? "source-atlas-aware-i1-derivative-negative-speed-envelope-scan-certified"
        : "source-atlas-aware-i1-derivative-negative-speed-envelope-scan-open",
      first_successor_row:
        "I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The I1 derivative row now has a speed-envelope scan certificate with preserved six-root structure and negative derivative clearance, but full continuous interval derivative enclosure is still open.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_DERIVATIVE_NEGATIVE_SPEED_ENVELOPE_SCAN_SCHEMA,
    "schema must match I1 derivative negative speed envelope scan schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 derivative negative speed envelope scan packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_derivative_atlas_check?.valid === true &&
      artifact?.source_derivative_atlas_check
        ?.certifies_source_atlas_aware_derivative_formula === true &&
      artifact?.source_derivative_atlas_check
        ?.certifies_interval_derivative_enclosure === false,
    "source derivative atlas must validate without interval derivative enclosure",
    errors
  );
  assertField(
    artifact?.scan_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 derivative scan must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.scan_parameters?.speed_band === undefined &&
      artifact?.scan_parameters?.speed_window === undefined &&
      artifact?.scan_parameters?.speed_min === undefined &&
      artifact?.scan_parameters?.speed_max === undefined,
    "scan parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.derivative_scan_summary?.target_row_id ===
      "I1.derivative-negative.full-cell" &&
      artifact?.derivative_scan_summary?.source_root_count_preserved === true &&
      artifact?.derivative_scan_summary?.status ===
        "i1-derivative-negative-speed-envelope-scan-certified" &&
      Number(artifact?.derivative_scan_summary?.signed_derivative_clearance) > 0,
    "I1 derivative scan summary must certify negative derivative clearance with six roots preserved",
    errors
  );
  assertField(
    Array.isArray(artifact?.derivative_scan_rows) &&
      artifact.derivative_scan_rows.length ===
        artifact?.scan_parameters?.theta_sample_count *
          artifact?.scan_parameters?.speed_sample_count &&
      artifact.derivative_scan_rows.every(
        (row) =>
          row.source_root_count === 6 &&
          Number(row.derivative) < 0 &&
          Number(row.signed_derivative_margin) > 0
      ),
    "all derivative scan rows must preserve six roots and negative derivative sign",
    errors
  );
  assertField(
    Array.isArray(artifact?.derivative_speed_slice_rows) &&
      artifact.derivative_speed_slice_rows.length ===
        artifact?.scan_parameters?.speed_sample_count &&
      artifact.derivative_speed_slice_rows.every(
        (row) =>
          row.status === "speed-slice-derivative-negative-certified" &&
          row.source_root_count_preserved === true &&
          row.theta_sample_count ===
            artifact?.scan_parameters?.theta_sample_count &&
          Number(row.raw_derivative_maximum) < 0 &&
          Number(row.signed_derivative_margin_at_max) > 0
      ),
    "all derivative speed slices must preserve six roots and negative derivative sign",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_I1_derivative_negative_speed_envelope_scan === true &&
      artifact?.artifact_claim?.certifies_source_root_count_six_on_I1_scan ===
        true &&
      artifact?.artifact_claim?.advances_I1_derivative_negative_full_cell ===
        true &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim
        ?.certifies_I1_derivative_negative_full_cell_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify only the derivative speed-envelope scan and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-i1-derivative-negative-speed-envelope-scan-certified" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must be I1 derivative speed-envelope scan certified and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>              Source-root search subdivisions (default: 5000)",
    "  --theta-samples <n>             Compact I1 theta midpoint samples (default: 48)",
    "  --speed-samples <n>             Speed samples across certified speed-ratio enclosure (default: 9)",
    "  --endpoint-padding <x>          Padding from regular-cell endpoints (default: 1e-5)",
    "  --machine-padding <x>           Machine envelope padding (default: 1e-9)",
    "  --out <path>                    Write artifact JSON to path instead of stdout",
    "  --validate <path>               Validate an existing artifact JSON file",
    "  --schema                        Print the artifact schema identifier",
    "  --pretty                        Pretty-print JSON output",
    "  --help                          Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    thetaSampleCount: DEFAULT_THETA_SAMPLE_COUNT,
    speedSampleCount: DEFAULT_SPEED_SAMPLE_COUNT,
    endpointPadding: DEFAULT_ENDPOINT_PADDING,
    machinePadding: DEFAULT_MACHINE_PADDING,
    outPath: null,
    validatePath: null,
    printSchema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--theta-samples") {
      args.thetaSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--speed-samples") {
      args.speedSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--endpoint-padding") {
      args.endpointPadding = Number(argv[++index]);
    } else if (arg === "--machine-padding") {
      args.machinePadding = Number(argv[++index]);
    } else if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_DERIVATIVE_NEGATIVE_SPEED_ENVELOPE_SCAN_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan(
        artifact
      );
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
    } else {
      console.log("ok");
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan({
      rootSubdivisions: args.rootSubdivisions,
      thetaSampleCount: args.thetaSampleCount,
      speedSampleCount: args.speedSampleCount,
      endpointPadding: args.endpointPadding,
      machinePadding: args.machinePadding,
    });
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

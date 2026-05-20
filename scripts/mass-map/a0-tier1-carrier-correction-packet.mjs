#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCANNER_SCHEMA = "a0-tier1-carrier-correction-scanner/v1";
const PACKET_SCHEMA = "a0-tier1-carrier-correction-packet/v1";
const PACKET_ROW_SCHEMA = "a0-tier1-carrier-correction-packet-row/v1";
const CANDIDATE_STATUS = "fourier_carrier_correction_candidate";
const RETAINED_MODE_STATUS = "retained_correction_mode";
const LAYERS = ["I", "M", "O"];
const BODY_PLACEMENT = Object.fromEntries(
  LAYERS.flatMap((layer) => [
    [
      `${layer}+`,
      {
        layer,
        polarity: "+",
        displacement_scale: 0.5,
        velocity_scale: 0.5,
        acceleration_scale: 0.5,
      },
    ],
    [
      `${layer}-`,
      {
        layer,
        polarity: "-",
        displacement_scale: -0.5,
        velocity_scale: -0.5,
        acceleration_scale: -0.5,
      },
    ],
  ])
);

function parseArgs(argv) {
  const args = {
    scanner: null,
    rows: "all",
    out: null,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--scanner") {
      args.scanner = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-tier1-carrier-correction-packet.mjs --scanner PATH [options]

Options:
  --scanner PATH   JSON output from a0-tier1-carrier-correction-scanner.mjs.
  --rows VALUE     "all" or a comma-separated row list. Defaults to "all".
  --out PATH       Write JSON output to a file instead of stdout.
  --pretty         Pretty-print JSON.
  --help           Show this help.

This fail-closed emitter converts scanner candidates into Fourier correction
packets for a corrected one-period rerun. It does not modify the one-period
integrator and always marks accepted_history_boundary as false.`);
}

function requireScannerPath(args) {
  if (!args.scanner) {
    throw new Error("Missing required --scanner PATH argument.");
  }
  return path.resolve(args.scanner);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function rowsOf(scanner) {
  return Array.isArray(scanner?.rows) ? scanner.rows : [];
}

function selectRows(scanner, selector) {
  const rows = rowsOf(scanner);
  if (selector === "all") {
    return rows;
  }
  const selected = new Set(
    String(selector)
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter(Number.isInteger)
  );
  if (selected.size === 0) {
    throw new Error(`Unsupported --rows selector: ${selector}`);
  }
  return rows.filter((row) => selected.has(row.row));
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
}

function finiteComplexVector3(value) {
  return Boolean(value) && finiteVector3(value.real) && finiteVector3(value.imag);
}

function topLevelMissingFields(scanner) {
  const missing = [];
  if (scanner?.artifact_schema !== SCANNER_SCHEMA) {
    missing.push(`artifact_schema=${SCANNER_SCHEMA}`);
  }
  if (!Array.isArray(scanner?.rows)) {
    missing.push("rows[]");
  }
  return missing;
}

function candidateMissingFields(row) {
  const missing = [];
  if (!Number.isInteger(row?.row)) {
    missing.push("rows[].row");
  }
  if (row?.status !== CANDIDATE_STATUS) {
    missing.push(`rows[].status=${CANDIDATE_STATUS}`);
  }
  if (!Number.isFinite(row?.period) || row.period <= 0) {
    missing.push("rows[].period");
  }
  if (!row?.tolerances || typeof row.tolerances !== "object") {
    missing.push("rows[].tolerances");
  }
  if (!row?.layer_scans || typeof row.layer_scans !== "object") {
    missing.push("rows[].layer_scans");
    return missing;
  }
  for (const layer of LAYERS) {
    const layerScan = row.layer_scans[layer];
    if (!layerScan || typeof layerScan !== "object") {
      missing.push(`rows[].layer_scans.${layer}`);
      continue;
    }
    if (!Array.isArray(layerScan.modes)) {
      missing.push(`rows[].layer_scans.${layer}.modes[]`);
      continue;
    }
    const retained = layerScan.modes.filter((mode) => mode?.status === RETAINED_MODE_STATUS);
    for (const mode of retained) {
      if (!Number.isInteger(mode.mode) || mode.mode <= 0) {
        missing.push(`rows[].layer_scans.${layer}.modes[].mode`);
      }
      if (!finiteComplexVector3(mode.correction_hat)) {
        missing.push(`rows[].layer_scans.${layer}.modes[mode=${mode.mode ?? "unknown"}].correction_hat`);
      }
    }
  }
  return missing;
}

function correctionModesForLayer(row, layer) {
  return row.layer_scans[layer].modes
    .filter((mode) => mode.status === RETAINED_MODE_STATUS && finiteComplexVector3(mode.correction_hat))
    .map((mode) => ({
      mode: mode.mode,
      status: RETAINED_MODE_STATUS,
      correction_hat: mode.correction_hat,
      forcing_hat: finiteComplexVector3(mode.forcing_hat) ? mode.forcing_hat : null,
      forcing_energy: Number.isFinite(mode.forcing_energy) ? mode.forcing_energy : null,
      correction_amplitude: Number.isFinite(mode.correction_amplitude) ? mode.correction_amplitude : null,
    }))
    .sort((a, b) => a.mode - b.mode);
}

function layerModeCoefficients(row) {
  return Object.fromEntries(
    LAYERS.map((layer) => [
      layer,
      {
        layer,
        period: Number.isFinite(row.layer_scans[layer]?.period) ? row.layer_scans[layer].period : row.period,
        correction_equation:
          "d_l''(t)=Q_l g_l(t); retained Fourier modes use d_hat_l,m=-g_hat_l,m/(2*pi*m/T)^2 for m != 0.",
        modes: correctionModesForLayer(row, layer),
      },
    ])
  );
}

function blockedRow(row, status, failureCode, missingFields = []) {
  return {
    schema: PACKET_ROW_SCHEMA,
    row: Number.isInteger(row?.row) ? row.row : null,
    status,
    failure_code: failureCode,
    source_status: row?.status ?? null,
    source_failure_code: row?.failure_code ?? null,
    missing_fields: missingFields,
    correction_packet: null,
    correction_rerun_required: false,
    accepted_history_boundary: false,
  };
}

function packetRow(row) {
  if (row?.status !== CANDIDATE_STATUS) {
    return blockedRow(row, "blocked_source_row_not_candidate", "source-row-not-candidate");
  }
  const missingFields = candidateMissingFields(row);
  if (missingFields.length > 0) {
    return blockedRow(row, "blocked_scanner_fields_missing", "scanner-fields-missing", missingFields);
  }
  const packet = {
    packet_schema: "a0-tier1-carrier-correction-packet-row-payload/v1",
    row: row.row,
    period: row.period,
    chart_policy: {
      source: "scanner.layer_scans.{I,M,O}.omitted_modes",
      omitted_modes: Object.fromEntries(
        LAYERS.map((layer) => [
          layer,
          Array.isArray(row.layer_scans[layer]?.omitted_modes) ? row.layer_scans[layer].omitted_modes : [],
        ])
      ),
      retained_mode_status: RETAINED_MODE_STATUS,
      chart_modes_are_not_emitted_as_corrections: true,
    },
    tolerances: row.tolerances,
    relation_weight_solution: row.relation_weight_solution ?? null,
    correction_equation: row.correction_equation ?? null,
    fourier_synthesis_convention: {
      schema: "a0-tier1-carrier-correction-fourier-synthesis/v1",
      phase_origin: "scanner-source sample t=0",
      real_signal:
        "d_l(t)=2*sum_{m>0} Re(d_hat_l,m exp(i*2*pi*m*t/T)); d_l''(t)=-2*sum_{m>0} (2*pi*m/T)^2 Re(d_hat_l,m exp(i*2*pi*m*t/T)).",
      coefficient_identity: "d_hat_l,m=-g_hat_l,m/(2*pi*m/T)^2 for m != 0",
    },
    placement_convention: {
      schema: "a0-tier1-layer-relative-antisymmetric-placement/v1",
      center_preserving: true,
      body_updates: BODY_PLACEMENT,
      note:
        "Apply each layer correction antisymmetrically: layer '+' receives +0.5*(d,d_prime,d_double_prime), layer '-' receives -0.5*(d,d_prime,d_double_prime).",
    },
    layer_mode_coefficients: layerModeCoefficients(row),
  };
  return {
    schema: PACKET_ROW_SCHEMA,
    row: row.row,
    status: "correction_packet_ready",
    failure_code: null,
    source_status: row.status,
    source_failure_code: row.failure_code ?? null,
    correction_packet: packet,
    correction_rerun_required: true,
    accepted_history_boundary: false,
  };
}

function statusCounts(rows) {
  const counts = {};
  for (const row of rows) {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
  }
  return counts;
}

function artifactStatus(rows, topMissingFields) {
  if (topMissingFields.length > 0) {
    return "blocked_scanner_fields_missing";
  }
  if (rows.length === 0) {
    return "blocked_no_rows_selected";
  }
  if (rows.some((row) => row.status === "correction_packet_ready")) {
    return "correction_packet_ready";
  }
  return "blocked";
}

function run(scanner, scannerPath, args) {
  const topMissingFields = topLevelMissingFields(scanner);
  const rows =
    topMissingFields.length === 0
      ? selectRows(scanner, args.rows).map(packetRow)
      : [
          blockedRow(
            null,
            "blocked_scanner_fields_missing",
            "scanner-envelope-fields-missing",
            topMissingFields
          ),
        ];
  const readyCount = rows.filter((row) => row.status === "correction_packet_ready").length;
  return {
    artifact_schema: PACKET_SCHEMA,
    metadata: {
      artifact: "a0-tier1-carrier-correction-packet",
      schema_status: "provisional",
      status: artifactStatus(rows, topMissingFields),
      generatedAt: new Date().toISOString(),
      sourceScanner: path.relative(process.cwd(), scannerPath),
      sourceScannerSchema: scanner?.artifact_schema ?? null,
      rowSelector: args.rows,
      note:
        "Fail-closed Fourier correction packet emitter for corrected one-period rerun input candidates only.",
    },
    source_scanner_metadata: scanner?.metadata ?? null,
    selected_row_count: rows.length,
    summary: {
      status_counts: statusCounts(rows),
      packet_ready_row_count: readyCount,
      blocked_row_count: rows.length - readyCount,
    },
    correction_rerun_required: readyCount > 0,
    accepted_history_boundary: false,
    rows,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const scannerPath = requireScannerPath(args);
  const scanner = readJson(scannerPath);
  const output = run(scanner, scannerPath, args);
  const serialized = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${serialized}\n`);
  } else {
    console.log(serialized);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

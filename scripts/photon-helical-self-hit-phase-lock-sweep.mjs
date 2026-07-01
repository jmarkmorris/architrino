#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

import {
  runPhotonSelfHitPhaseLockSweep,
} from "../src/apps/photon/PhotonSelfHitSweepRuntime.js";

function parseNumberList(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((number) => Number.isFinite(number));
}

function parseStringList(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseArgs(argv) {
  const options = {
    writePath: "",
    includeCases: true,
  };
  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--write") {
      options.writePath = argv[++index] ?? "";
    } else if (arg === "--summary-only") {
      options.includeCases = false;
    } else if (arg === "--case-limit") {
      options.caseLimit = Number(argv[++index]);
    } else if (arg === "--preset-ids") {
      options.presetIds = parseStringList(argv[++index]);
    } else if (arg === "--photon-speeds") {
      options.photonSpeedCfValues = parseNumberList(argv[++index]);
    } else if (arg === "--signal-speeds") {
      options.signalSpeedCfValues = parseNumberList(argv[++index]);
    } else if (arg === "--observation-progress") {
      options.observationProgressValues = parseNumberList(argv[++index]);
    } else if (arg === "--history-cycles") {
      options.helicalSelfHitHistoryCycles = Number(argv[++index]);
    } else if (arg === "--scan-subdivisions") {
      options.helicalSelfHitScanSubdivisions = Number(argv[++index]);
    } else if (arg === "--max-roots") {
      options.helicalSelfHitMaxRoots = Number(argv[++index]);
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/photon-helical-self-hit-phase-lock-sweep.mjs [options]",
    "",
    "Options:",
    "  --write PATH              Write JSON sweep evidence to PATH.",
    "  --summary-only            Omit per-case rows from output.",
    "  --case-limit N            Evaluate only the first N generated cases.",
    "  --preset-ids A,B          Limit named Photon presets.",
    "  --photon-speeds A,B       Override c_gamma/c_f sweep values.",
    "  --signal-speeds A,B       Override c_sig/c_f sweep values.",
    "  --observation-progress A  Override middle-cycle phase progress values.",
    "  --history-cycles N        Override helical same-source history cycles.",
    "  --scan-subdivisions N     Override helical same-source scan subdivisions.",
    "  --max-roots N             Override retained roots per source row.",
  ].join("\n");
}

async function main() {
  const options = parseArgs(process.argv);
  if (options.help) {
    console.log(usage());
    return;
  }
  const { writePath, ...sweepOptions } = options;
  const result = await runPhotonSelfHitPhaseLockSweep(sweepOptions);
  const json = `${JSON.stringify(result, null, 2)}\n`;
  if (writePath) {
    fs.mkdirSync(path.dirname(writePath), { recursive: true });
    fs.writeFileSync(writePath, json);
    process.stdout.write(`${JSON.stringify({ writePath, summary: result.summary }, null, 2)}\n`);
    return;
  }
  process.stdout.write(json);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

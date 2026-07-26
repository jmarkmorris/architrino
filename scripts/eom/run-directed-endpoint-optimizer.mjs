#!/usr/bin/env node

import {
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import {
  loadAllCandidateCampaignRegistry,
} from "../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  runDirectedEndpointOptimizer,
  runDirectedEndpointOptimizerContinuation,
} from "../../src/prescribed-path-analysis/DirectedEndpointOptimizer.mjs";

function positiveInteger(value, label) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    throw new TypeError(`${label} must be a positive integer.`);
  }
  return parsed;
}

function positiveNumber(value, label) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new TypeError(`${label} must be a positive finite number.`);
  }
  return parsed;
}

function parseArguments(argv) {
  const values = new Map();
  let help = false;
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (key === "--help") {
      help = true;
      continue;
    }
    if (!key.startsWith("--")) {
      throw new Error(`unexpected argument ${key}.`);
    }
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      throw new Error(`${key} requires a value.`);
    }
    values.set(key, value);
    index += 1;
  }
  const continueFrom = values.has("--continue-from")
    ? path.resolve(values.get("--continue-from"))
    : null;
  return {
    help,
    continueFrom,
    sourceSearch: path.resolve(
      values.get("--source-search") ??
        ".local-data/braid-analysis/endpoint-residual-search/stratified-v1.json",
    ),
    output: path.resolve(
      values.get("--output") ??
        (continueFrom == null
          ? ".local-data/braid-analysis/endpoint-residual-search/directed-v1.json"
          : ".local-data/braid-analysis/endpoint-residual-search/" +
            "directed-continuation-v1.json"),
    ),
    seed:
      values.get("--seed") ??
      (continueFrom == null
        ? "directed-endpoint-optimizer-2026-07-24-v1"
        : "directed-endpoint-optimizer-continuation-2026-07-25-v1"),
    basinCount: positiveInteger(values.get("--basins") ?? 4, "--basins"),
    maximumIterations: positiveInteger(
      values.get("--iterations") ?? (continueFrom == null ? 5 : 24),
      "--iterations",
    ),
    minimumStepScale: positiveNumber(
      values.get("--minimum-step-scale") ??
        (continueFrom == null ? 0.125 : 1 / 32),
      "--minimum-step-scale",
    ),
    heldOutPerStratum: positiveInteger(
      values.get("--held-out-per-stratum") ?? 1,
      "--held-out-per-stratum",
    ),
  };
}

function printHelp() {
  console.log([
    "Usage:",
    "  node scripts/eom/run-directed-endpoint-optimizer.mjs",
    "    [--source-search path]",
    "    [--continue-from directed-result.json]",
    "    [--output path]",
    "    [--seed token]",
    "    [--basins count]",
    "    [--iterations count]",
    "    [--minimum-step-scale number]",
    "    [--held-out-per-stratum count]",
    "",
    "Runs a bounded multi-start coordinate-pattern search from distinct",
    "complete-inventory, independently root-audited endpoint-search seeds.",
    "With --continue-from, resumes every retained final specification from",
    "that canonical result without drawing new seeds. Continuation defaults",
    "to 24 further iterations and a minimum step scale of 1/32.",
    "The primary objective is the refined full-cycle worst per-Architrino",
    "residual; refined RMS breaks ties. Final points and held-out scale,",
    "phase-shape, and coupled perturbations use the dense audit grid.",
    "",
    "The result is prescribed-path search guidance only. It is not global",
    "optimization or branch, stability, retention, taxonomy, return-symmetry,",
    "or physical-realization evidence.",
  ].join("\n"));
}

const options = parseArguments(process.argv.slice(2));
if (options.help) {
  printHelp();
  process.exit(0);
}

const loaded = loadAllCandidateCampaignRegistry();
const onProgress = (progress) => {
  if (progress.stage === "basin-start") {
    process.stderr.write(
      `directed optimizer basin ${progress.basinIndex + 1}/` +
      `${progress.basinCount} ${progress.memberId}\n`,
    );
  } else if (progress.stage === "basin-iteration-complete") {
    process.stderr.write(
      `${progress.basinId} iteration ${progress.iteration}/` +
      `${progress.maximumIterations} ` +
      `${progress.improved ? "improved" : "step-reduced"} ` +
      `step=${progress.stepScale} ` +
      `peak=${progress.objective?.refinedFullCyclePeak ?? "unknown"}\n`,
    );
  } else if (progress.stage === "held-out-case-complete") {
    process.stderr.write(
      `${progress.basinId} held-out ${progress.stratumId} ` +
      `${progress.ordinal + 1} status=${progress.status}\n`,
    );
  }
};
const result = options.continueFrom == null
  ? runDirectedEndpointOptimizer({
    candidates: loaded.candidates,
    baseProtocol: loaded.protocol,
    sourceSearch: JSON.parse(
      readFileSync(options.sourceSearch, "utf8"),
    ),
    seed: options.seed,
    basinCount: options.basinCount,
    maximumIterations: options.maximumIterations,
    minimumStepScale: options.minimumStepScale,
    heldOutPerStratum: options.heldOutPerStratum,
    onProgress,
  })
  : runDirectedEndpointOptimizerContinuation({
    candidates: loaded.candidates,
    baseProtocol: loaded.protocol,
    sourceResult: JSON.parse(
      readFileSync(options.continueFrom, "utf8"),
    ),
    seed: options.seed,
    maximumIterations: options.maximumIterations,
    minimumStepScale: options.minimumStepScale,
    heldOutPerStratum: options.heldOutPerStratum,
    onProgress,
  });

mkdirSync(path.dirname(options.output), { recursive: true });
writeFileSync(options.output, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({
  output: options.output,
  sourceSearch: options.continueFrom == null
    ? options.sourceSearch
    : null,
  continueFrom: options.continueFrom,
  resultHash: result.resultHash,
  measuredWallSeconds: result.measuredWallSeconds,
  summary: result.summary,
}, null, 2));

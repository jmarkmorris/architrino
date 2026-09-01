#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzip } from "node:zlib";
import { promisify } from "node:util";

import {
  evaluateCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger,
  summarizeCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger,
} from "../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const protocolPath = path.join(
  repositoryRoot,
  "src/prescribed-path-analysis/protocols/" +
    "coincident-midpoint-common-frequency-prescribed-structural-root-ledger-protocol.v1.json",
);
const gzipAsync = promisify(gzip);

function parseArguments(argv) {
  const options = { output: null, summary: null, check: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--output") {
      options.output = argv[index + 1];
      index += 1;
    } else if (argument === "--summary") {
      options.summary = argv[index + 1];
      index += 1;
    } else if (argument === "--check") {
      options.check = true;
    } else {
      throw new TypeError(`unknown argument ${argument}.`);
    }
  }
  if (!options.check && (!options.output || !options.summary)) {
    throw new TypeError("run mode requires both --output and --summary.");
  }
  return options;
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(
    path.resolve(repositoryRoot, relativePath),
    "utf8",
  ));
}

async function writeJson(target, value) {
  const absolute = path.resolve(repositoryRoot, target);
  await mkdir(path.dirname(absolute), { recursive: true });
  const serialized = absolute.endsWith(".gz")
    ? JSON.stringify(value)
    : JSON.stringify(value, null, 2);
  const bytes = Buffer.from(`${serialized}\n`);
  await writeFile(
    absolute,
    absolute.endsWith(".gz") ? await gzipAsync(bytes, { level: 9 }) : bytes,
  );
  return absolute;
}

const options = parseArguments(process.argv.slice(2));
const ledgerProtocol = await readJson(
  path.relative(repositoryRoot, protocolPath),
);
const baseProtocol = await readJson(
  ledgerProtocol.sealedInputs.baseProtocol.path,
);
const continuousSummary = await readJson(
  ledgerProtocol.sealedInputs.continuousInventorySummary.path,
);
const rootSheetSummary = await readJson(
  ledgerProtocol.sealedInputs.rootSheetSummary.path,
);
const result = evaluateCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger({
  ledgerProtocol,
  baseProtocol,
  continuousSummary,
  rootSheetSummary,
});
const summary = summarizeCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger(result);
const report = {
  protocolId: ledgerProtocol.protocolId,
  ledgerProtocolHash: result.ledgerProtocolHash,
  resultHash: result.resultHash,
  summaryHash: summary.summaryHash,
  status: result.status,
  resources: result.resources,
  controls: result.controls,
  observations: result.observations,
};

if (options.check) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  const outputPath = await writeJson(options.output, result);
  const summaryPath = await writeJson(options.summary, summary);
  process.stdout.write(`${JSON.stringify({
    outputPath,
    summaryPath,
    ...report,
  }, null, 2)}\n`);
}

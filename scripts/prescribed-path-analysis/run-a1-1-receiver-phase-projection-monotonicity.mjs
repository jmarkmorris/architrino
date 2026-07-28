#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzip } from "node:zlib";
import { promisify } from "node:util";

import {
  evaluateA11ReceiverPhaseProjectionMonotonicity,
  summarizeA11ReceiverPhaseProjectionMonotonicity,
} from "../../src/prescribed-path-analysis/A11ReceiverPhaseProjectionMonotonicityCertifier.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const protocolPath = path.join(
  repositoryRoot,
  "src/prescribed-path-analysis/protocols/" +
    "a1-1-receiver-phase-projection-monotonicity-protocol.v1.json",
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
const projectionProtocol = await readJson(
  path.relative(repositoryRoot, protocolPath),
);
const baseProtocol = await readJson(
  projectionProtocol.sealedInputs.baseProtocol.path,
);
const completeInventorySummary = await readJson(
  projectionProtocol.sealedInputs.completeInventorySummary.path,
);
const structuralLedgerSummary = await readJson(
  projectionProtocol.sealedInputs.structuralLedgerSummary.path,
);
const result = evaluateA11ReceiverPhaseProjectionMonotonicity({
  projectionProtocol,
  baseProtocol,
  completeInventorySummary,
  structuralLedgerSummary,
});
const summary = summarizeA11ReceiverPhaseProjectionMonotonicity(result);
const report = {
  protocolId: projectionProtocol.protocolId,
  projectionProtocolHash: result.projectionProtocolHash,
  resultHash: result.resultHash,
  summaryHash: summary.summaryHash,
  status: result.status,
  continuousConclusion: result.continuousConclusion,
  resources: result.resources,
  controls: result.controls,
  targetChannelResults: result.targetChannelResults,
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

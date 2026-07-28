#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzip } from "node:zlib";
import { promisify } from "node:util";

import {
  evaluateA11OuterRadiusBandExpansion,
  summarizeA11OuterRadiusBandExpansion,
} from "../../src/prescribed-path-analysis/A11OuterRadiusBandExpansionDiagnostic.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const protocolPath =
  "src/prescribed-path-analysis/protocols/" +
  "a1-1-outer-radius-band-expansion-protocol.v1.json";
const defaultSummaryPath =
  "reference/priorities/braid-program/evidence/" +
  "a1-1-outer-radius-band-expansion-summary.v1.json";
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
const expansionProtocol = await readJson(protocolPath);
const baseProtocol = await readJson(
  expansionProtocol.sealedBaseline.baseProtocol.path,
);
const baselineRootSheetProtocol = await readJson(
  expansionProtocol.sealedBaseline.rootSheet.protocolPath,
);
const baselineContinuousSummary = await readJson(
  baselineRootSheetProtocol.sealedRegressionReceipt.path,
);
const baselineRootSheetSummary = await readJson(
  expansionProtocol.sealedBaseline.rootSheet.summaryPath,
);
const baselineStructuralProtocol = await readJson(
  expansionProtocol.sealedBaseline.structuralLedger.protocolPath,
);
const baselineStructuralSummary = await readJson(
  expansionProtocol.sealedBaseline.structuralLedger.summaryPath,
);
const baselineProjectionProtocol = await readJson(
  expansionProtocol.sealedBaseline.projectionMonotonicity.protocolPath,
);
const baselineProjectionSummary = await readJson(
  expansionProtocol.sealedBaseline.projectionMonotonicity.summaryPath,
);

const result = evaluateA11OuterRadiusBandExpansion({
  expansionProtocol,
  baseProtocol,
  baselineRootSheetProtocol,
  baselineContinuousSummary,
  baselineRootSheetSummary,
  baselineStructuralProtocol,
  baselineStructuralSummary,
  baselineProjectionProtocol,
  baselineProjectionSummary,
});
const summary = summarizeA11OuterRadiusBandExpansion(result);

const report = {
  protocolId: expansionProtocol.protocolId,
  expansionProtocolHash: result.expansionProtocolHash,
  resultHash: result.resultHash,
  summaryHash: summary.summaryHash,
  status: result.status,
  stopBoundary: result.stopBoundary,
  controls: result.controls,
};

if (options.check) {
  let durableReplay = {
    path: defaultSummaryPath,
    present: false,
    passed: null,
  };
  try {
    const durable = await readJson(defaultSummaryPath);
    durableReplay = {
      path: defaultSummaryPath,
      present: true,
      expectedSummaryHash: durable.summaryHash,
      observedSummaryHash: summary.summaryHash,
      expectedResultHash: durable.resultHash,
      observedResultHash: result.resultHash,
      passed:
        durable.summaryHash === summary.summaryHash &&
        durable.resultHash === result.resultHash,
    };
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  process.stdout.write(`${JSON.stringify({
    ...report,
    durableReplay,
  }, null, 2)}\n`);
  if (durableReplay.present && !durableReplay.passed) process.exitCode = 1;
} else {
  const outputPath = await writeJson(options.output, result);
  const summaryPath = await writeJson(options.summary, summary);
  process.stdout.write(`${JSON.stringify({
    outputPath,
    summaryPath,
    ...report,
  }, null, 2)}\n`);
}

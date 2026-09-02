#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzip } from "node:zlib";
import { promisify } from "node:util";

import {
  evaluateCoincidentMidpointCommonFrequencyContinuousRootInventory,
  summarizeCoincidentMidpointCommonFrequencyContinuousRootInventory,
} from "../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyContinuousRootIntervalCertifier.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const protocolPath = path.join(
  repositoryRoot,
  "src/prescribed-path-analysis/protocols/" +
    "coincident-midpoint-common-frequency-continuous-ratio-phase-root-inventory-protocol.v1.json",
);
const gzipAsync = promisify(gzip);

function parseArguments(argv) {
  const options = {
    output: null,
    summary: null,
    check: false,
  };
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

async function writeJson(target, value) {
  const absolute = path.resolve(repositoryRoot, target);
  await mkdir(path.dirname(absolute), { recursive: true });
  const serialized = JSON.stringify(value);
  const bytes = Buffer.from(`${serialized}\n`);
  await writeFile(
    absolute,
    absolute.endsWith(".gz") ? await gzipAsync(bytes, { level: 9 }) : bytes,
  );
  return absolute;
}

const options = parseArguments(process.argv.slice(2));
const protocolText = await readFile(protocolPath, "utf8");
const protocol = JSON.parse(protocolText);
const provenancePath = path.resolve(
  repositoryRoot,
  protocol.sourceConfiguration.displaySourceProvenance.path,
);
const provenanceBytes = await readFile(provenancePath);
const provenanceHash = createHash("sha256").update(provenanceBytes).digest("hex");
if (provenanceHash !== protocol.sourceConfiguration.displaySourceProvenance.sha256) {
  throw new Error(
    "coincident-midpoint common-frequency configuration display-source provenance hash changed; review the exact endpoint, " +
      "frame, polarity, and circulation declarations before execution.",
  );
}

const result = evaluateCoincidentMidpointCommonFrequencyContinuousRootInventory({ protocol });
const summary = summarizeCoincidentMidpointCommonFrequencyContinuousRootInventory(result);

if (options.check) {
  process.stdout.write(`${JSON.stringify({
    protocolId: protocol.protocolId,
    protocolHash: result.protocolHash,
    resultHash: result.resultHash,
    summaryHash: summary.summaryHash,
    status: result.status,
    channelCoverage: result.channelCoverage,
    counts: result.counts,
    controls: summary.controls,
  }, null, 2)}\n`);
} else {
  const outputPath = await writeJson(options.output, result);
  const summaryPath = await writeJson(options.summary, summary);
  process.stdout.write(`${JSON.stringify({
    outputPath,
    summaryPath,
    protocolHash: result.protocolHash,
    resultHash: result.resultHash,
    summaryHash: summary.summaryHash,
    status: result.status,
    channelCoverage: result.channelCoverage,
    counts: result.counts,
    controls: summary.controls,
  }, null, 2)}\n`);
}

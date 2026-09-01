#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider,
  sha256Action,
  summarizeCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider,
} from "../../src/action-analysis/CoincidentMidpointCommonFrequencyMinimumDelayedActionProviderDiagnostic.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const protocolPath =
  "src/action-analysis/protocols/" +
  "coincident-midpoint-common-frequency-minimum-delayed-action-provider-protocol.v1.json";
const defaultSummaryPath =
  "reference/priorities/braid-program/evidence/" +
  "coincident-midpoint-common-frequency-minimum-delayed-action-provider-summary.v1.json";

function parseArguments(argv) {
  const options = { check: false, summary: defaultSummaryPath };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--check") {
      options.check = true;
    } else if (argv[index] === "--summary") {
      options.summary = argv[index + 1];
      index += 1;
    } else {
      throw new TypeError(`unknown argument ${argv[index]}.`);
    }
  }
  return options;
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(
    path.resolve(repositoryRoot, relativePath),
    "utf8",
  ));
}

const options = parseArguments(process.argv.slice(2));
const protocol = await readJson(protocolPath);
const sealedCoincidentMidpointCommonFrequencySummary = await readJson(
  protocol.sealedCoincidentMidpointCommonFrequencyControl.summaryPath,
);
const result = evaluateCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider({
  protocol,
  sealedCoincidentMidpointCommonFrequencySummary,
});
const summary = summarizeCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider(result);

if (options.check) {
  const durable = await readJson(options.summary);
  if (sha256Action(durable) !== sha256Action(summary)) {
    throw new Error("durable minimum action provider summary drifted.");
  }
} else {
  const absoluteSummary = path.resolve(repositoryRoot, options.summary);
  await mkdir(path.dirname(absoluteSummary), { recursive: true });
  await writeFile(
    absoluteSummary,
    `${JSON.stringify(summary, null, 2)}\n`,
    "utf8",
  );
}

console.log(JSON.stringify({
  protocolId: protocol.protocolId,
  protocolHash: result.protocolHash,
  resultHash: result.resultHash,
  summaryHash: summary.summaryHash,
  status: result.status,
  actionCandidate: result.actionCandidate,
  rotatingChart: result.rotatingChart,
  localEuler: summary.localEuler,
  futureBoundary: summary.futureBoundary,
  branchAttempt: result.branchAttempt,
  angularMomentumLedger: result.angularMomentumLedger,
  nonClaims: result.nonClaims,
}, null, 2));

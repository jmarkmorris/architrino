#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { gzip } from "node:zlib";

import {
  evaluateCoincidentMidpointCommonFrequencyOuterRadiusBandExpansion,
} from "../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyOuterRadiusBandExpansionDiagnostic.mjs";
import {
  evaluateCoincidentMidpointCommonFrequencyHistoryPolicyExtensionIndependentVerifier,
  summarizeCoincidentMidpointCommonFrequencyHistoryPolicyExtensionIndependentVerifier,
} from "../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyHistoryPolicyExtensionIndependentVerifier.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const protocolPath =
  "src/prescribed-path-analysis/protocols/" +
  "coincident-midpoint-common-frequency-history-policy-extension-independent-verifier-protocol.v1.json";
const defaultSummaryPath =
  "reference/priorities/braid-program/evidence/" +
  "coincident-midpoint-common-frequency-history-policy-extension-independent-verifier-summary.v1.json";
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

async function writeJson(relativePath, value) {
  const absolute = path.resolve(repositoryRoot, relativePath);
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
const protocol = await readJson(protocolPath);
const baseProtocol = await readJson(protocol.baseProtocol.path);
const originalRootProtocol = await readJson(
  protocol.sealedOriginalVerifier.rootSheet.protocolPath,
);
const originalRootSealedSummary = await readJson(
  originalRootProtocol.sealedRegressionReceipt.path,
);
const originalRootSummary = await readJson(
  protocol.sealedOriginalVerifier.rootSheet.summaryPath,
);
const originalProjectionProtocol = await readJson(
  protocol.sealedOriginalVerifier.projection.protocolPath,
);
const subjectProtocol = await readJson(protocol.sealedSubject.protocolPath);
const originalStructuralProtocol = await readJson(
  subjectProtocol.sealedBaseline.structuralLedger.protocolPath,
);
const originalStructuralSummary = await readJson(
  originalProjectionProtocol.sealedInputs.structuralLedgerSummary.path,
);
const originalProjectionSummary = await readJson(
  protocol.sealedOriginalVerifier.projection.summaryPath,
);
const subjectSummary = await readJson(protocol.sealedSubject.summaryPath);
const baselineRootSheetProtocol = originalRootProtocol;
const baselineContinuousSummary = originalRootSealedSummary;
const baselineRootSheetSummary = originalRootSummary;
const baselineStructuralProtocol = originalStructuralProtocol;
const baselineStructuralSummary = originalStructuralSummary;
const baselineProjectionProtocol = originalProjectionProtocol;
const baselineProjectionSummary = originalProjectionSummary;
const previousBoundaryProtocol = await readJson(
  protocol.sealedPreviousBoundary.protocolPath,
);
const previousBoundarySummary = await readJson(
  protocol.sealedPreviousBoundary.summaryPath,
);
const priorExpansionProtocol = await readJson(
  previousBoundaryProtocol.sealedPriorCombinedBox.protocolPath,
);
const priorExpansionSummary = await readJson(
  previousBoundaryProtocol.sealedPriorCombinedBox.summaryPath,
);

const subjectResult = evaluateCoincidentMidpointCommonFrequencyOuterRadiusBandExpansion({
  expansionProtocol: subjectProtocol,
  baseProtocol,
  baselineRootSheetProtocol,
  baselineContinuousSummary,
  baselineRootSheetSummary,
  baselineStructuralProtocol,
  baselineStructuralSummary,
  baselineProjectionProtocol,
  baselineProjectionSummary,
  priorExpansionProtocol,
  priorExpansionSummary,
  previousBoundaryProtocol,
  previousBoundarySummary,
});
const replay = subjectResult.controls.previousBoundaryExactReplay;
const previousBoundaryReplay = {
  protocolHash: replay.observedProtocolHash,
  resultHash: replay.observedResultHash,
  summaryHash: replay.observedSummaryHash,
  status: replay.preservedStatus.code,
  boundaryAlpha3: replay.preservedBoundary.alpha3,
  passed: replay.passed,
};

const result = evaluateCoincidentMidpointCommonFrequencyHistoryPolicyExtensionIndependentVerifier({
  verifierProtocol: protocol,
  baseProtocol,
  originalRootProtocol,
  originalRootSealedSummary,
  originalRootSummary,
  originalProjectionProtocol,
  originalStructuralSummary,
  originalProjectionSummary,
  previousBoundaryReplay,
  subjectProtocol,
  subjectSummary,
});
const summary =
  summarizeCoincidentMidpointCommonFrequencyHistoryPolicyExtensionIndependentVerifier(result);
const report = {
  protocolId: protocol.protocolId,
  verifierProtocolHash: result.verifierProtocolHash,
  resultHash: result.resultHash,
  summaryHash: summary.summaryHash,
  rawLedgerHash: summary.rawLedger.hash,
  status: result.status,
  scope: result.scope,
  controls: result.controls,
  topology: {
    passed: result.topology.passed,
    representativeCount: result.topology.representativeResults.length,
    inversionReuseCount: result.topology.inversionRows.length,
    unresolvedBoxCount: result.topology.unresolved.length,
    resources: result.topology.resources,
  },
  projection: {
    passed: result.projection.passed,
    targetCount: result.projection.targetRows.length,
    controls: result.projection.controls,
  },
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

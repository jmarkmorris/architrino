#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  PROVIDER_SCHEMA,
  providerEvidenceStatusForPath,
} from "./noether-sea-density-compression-provider-evidence.mjs";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const INPUT_SCHEMA =
  "aaa-noether-sea-density-compression-provider-candidates/v1";
const OUTPUT_SCHEMA =
  "aaa-noether-sea-density-compression-provider-intake-report/v1";
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "noether-sea-density-compression-provider-candidates.v1.json",
);

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const inputPath = path.resolve(args.input);
  const manifest = readJson(inputPath);
  const report = buildProviderIntakeReport(manifest, { sourceRef: inputPath });
  writeOutput(report, args);
  if (args.requireAccepted && report.summary.acceptedProviderCount === 0) {
    process.exitCode = 1;
  }
}

export function buildProviderIntakeReport(manifest, { sourceRef = null } = {}) {
  const candidates = Array.isArray(manifest.candidates) ? manifest.candidates : [];
  const candidateResults = candidates.map((candidate, index) =>
    evaluateCandidate(candidate, index),
  );
  const acceptedProviderCandidates = candidateResults.filter(
    (candidate) => candidate.providerReady,
  );
  const acceptedNonFixtureSourceCount = candidateResults.filter(
    (candidate) => candidate.sourceStatus === "accepted_non_fixture_source",
  ).length;
  const missingOrRejectedFieldUnion = [
    ...new Set(candidateResults.flatMap((candidate) => candidate.missingOrRejectedFields)),
  ].sort();
  const firstFailure =
    acceptedProviderCandidates.length > 0
      ? null
      : acceptedNonFixtureSourceCount === 0
        ? "accepted_non_fixture_source_missing"
        : candidateResults.find((candidate) => candidate.firstFailure)?.firstFailure ??
          "provider_object_fields_missing";

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: sourceRef,
      schema: manifest.schema ?? null,
      schemaOk: manifest.schema === INPUT_SCHEMA,
      claimLevel: manifest.claimLevel ?? null,
    },
    providerTarget: {
      schema: PROVIDER_SCHEMA,
      row: "theta_sea_rho_NS",
      supportedRows: ["EQ-06", "EQ-20", "EQ-24", "EQ-32"],
      claimLevel:
        "durable retained-window provider required before theta_sea_rho_NS can replace source-attempt fixtures",
    },
    verdict:
      acceptedProviderCandidates.length > 0
        ? "accepted_theta_sea_rho_NS_provider_found"
        : "theta_sea_rho_NS_provider_missing",
    firstFailure,
    summary: {
      candidateCount: candidateResults.length,
      acceptedNonFixtureSourceCount,
      acceptedProviderCount: acceptedProviderCandidates.length,
      missingOrRejectedFieldUnion,
      scoreDecision: "no_score_increase",
    },
    candidateResults,
    authorization: {
      theta_sea_rho_NS_provider_ready: acceptedProviderCandidates.length > 0,
      downstream_consumer_authorization: acceptedProviderCandidates.length > 0,
    },
  };
}

export function validationErrors(report) {
  const errors = [];
  if (report.schema !== OUTPUT_SCHEMA) {
    errors.push("schema_mismatch");
  }
  if (!Array.isArray(report.candidateResults)) {
    errors.push("candidate_results_missing");
  }
  if (!report.summary || typeof report.summary !== "object") {
    errors.push("summary_missing");
  }
  return errors;
}

function evaluateCandidate(candidate, index) {
  const id = candidate.id ?? `candidate_${index}`;
  const sourcePath = candidate.sourcePath ?? candidate.path ?? null;
  const sourceStatus = providerEvidenceStatusForPath(sourcePath, {
    repoRoot: REPO_ROOT,
  });
  const providerReady = sourceStatus.accepted === true;
  const missingOrRejectedFields = sourceStatus.accepted
    ? []
    : sourceStatus.missingOrRejectedFields?.length > 0
      ? sourceStatus.missingOrRejectedFields
      : [sourceStatus.reason];
  return {
    id,
    sourcePath,
    candidateRole: candidate.role ?? null,
    sourceStatus: sourceStatus.accepted
      ? "accepted_non_fixture_source"
      : sourceStatus.reason,
    providerReady,
    firstFailure: providerReady ? null : sourceStatus.reason,
    missingOrRejectedFields,
    providerStatus: sourceStatus.providerStatus ?? null,
    agreementResidual: sourceStatus.agreementResidual ?? null,
  };
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    summary: false,
    requireAccepted: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      parsed.input = argv[++index];
    } else if (arg === "--out") {
      parsed.out = argv[++index];
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--require-accepted") {
      parsed.requireAccepted = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/spacetime/noether-sea-density-compression-provider-intake.mjs [options]

Options:
  --input PATH          Candidate manifest. Defaults to current theta_sea_rho_NS candidates.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-accepted    Exit nonzero unless an accepted provider is found.
  --help                Show this help.

This report searches for a durable non-priority ${PROVIDER_SCHEMA} object that
can replace theta_sea_rho_NS source-attempt fixtures. Attempts, mocks, probes,
negative controls, tests, priority packets, authored prose, and generic JSON
shells do not authorize downstream consumers.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(report, args) {
  const payload = args.summary
    ? {
        schema: report.schema,
        generatedAt: report.generatedAt,
        input: report.input,
        providerTarget: report.providerTarget,
        verdict: report.verdict,
        firstFailure: report.firstFailure,
        summary: report.summary,
        authorization: report.authorization,
      }
    : report;
  const text = JSON.stringify(payload, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

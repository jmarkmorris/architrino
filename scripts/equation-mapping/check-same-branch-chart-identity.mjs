#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const OUTPUT_SCHEMA = "aaa-equation-map-same-branch-chart-identity-check/v1";
const INPUT_SCHEMA_PREFIX = "aaa-tri-binary-frequency-candidate-solver-report";
const SOURCE_AUDIT_PATH =
  "frequencyTripletSearch.equalFrequencyEnergyRadiusAudit";
const TARGET_ROW = "same_branch_chart_identity";

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printUsage();
  process.exit(0);
}

if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const inputPath = path.resolve(args.input);
const report = readJson(inputPath);
const output = createOutput({ report, inputPath });
writeOutput(args, output);

if (args.requireAccepted && output.summary.status !== "accepted") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
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

function printUsage() {
  console.log(`Usage: node scripts/equation-mapping/check-same-branch-chart-identity.mjs --input PATH [options]

Options:
  --input PATH          Tri-binary solver report JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-accepted    Exit nonzero unless same-branch identity is accepted.
  --help                Show this help.

This checker consumes ${SOURCE_AUDIT_PATH} and reports whether the current
equal-frequency row-set evidence has become an accepted retained
${TARGET_ROW} row. Current proxy evidence never counts as acceptance.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(parsedArgs, output) {
  const payload = parsedArgs.summary ? summarizeOutput(output) : output;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function createOutput({ report, inputPath }) {
  const audit = report.frequencyTripletSearch?.equalFrequencyEnergyRadiusAudit ?? null;
  const scaffold = audit?.retainedRowSetScaffold ?? null;
  const witness = audit?.retainedRowSetIdentityStructuralWitnessAudit ?? null;
  const candidateRows =
    report.frequencyTripletSearch?.candidateSetReview?.rows ?? [];
  const accepted =
    scaffold?.retainedRowSetIdentityPass === true &&
    witness?.retainedRowSetIdentityPass === true;
  const currentProxyPopulated =
    scaffold?.currentProxyEvidencePopulated === true ||
    numberOrZero(scaffold?.currentProxyEvidencePopulatedCount) > 0 ||
    witness?.currentStructuralWitnessPass === true;
  const status = !audit
    ? "blocked_missing_equal_frequency_audit"
    : accepted
      ? "accepted"
      : currentProxyPopulated
        ? "blocked_current_proxy_only"
        : "blocked_missing_current_proxy_evidence";

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: report.schema ?? null,
      schemaOk:
        typeof report.schema === "string" &&
        report.schema.startsWith(INPUT_SCHEMA_PREFIX),
      sourceAuditPath: SOURCE_AUDIT_PATH,
    },
    target: {
      row: TARGET_ROW,
      retainedRowSetId:
        scaffold?.retainedRowSetId ??
        witness?.retainedRowSetId ??
        firstDefined(candidateRows.map((row) => row.retainedRowSetId)) ??
        null,
      claimLevel:
        "acceptance extractor only; current proxy row-set evidence is not score evidence",
    },
    summary: {
      status,
      scoreDecision: "no_score_increase",
      retainedBranchClaim: audit?.retainedBranchClaim === true,
      retainedRowSetIdentityPass: accepted,
      currentProxyEvidencePopulatedCount:
        scaffold?.currentProxyEvidencePopulatedCount ?? null,
      currentProxyEvidenceSourceCount:
        scaffold?.currentProxyEvidenceSourceCount ?? null,
      retainedAcceptancePassCount:
        scaffold?.retainedAcceptancePassCount ?? null,
      structuralWitnessCurrentPass:
        witness?.currentStructuralWitnessPass ?? null,
      structuralWitnessCurrentPopulatedCount:
        witness?.currentStructuralWitnessPopulatedCount ?? null,
      structuralWitnessSourceCount: witness?.sourceCount ?? null,
      structuralWitnessRetainedPass:
        witness?.retainedRowSetIdentityPass ?? null,
      acceptedRetainedIdentityRequirementCount:
        witness?.acceptedRetainedIdentityRequirementCount ?? null,
      retainedIdentityRequirementCount:
        witness?.retainedIdentityRequirementCount ?? null,
      missingRetainedInputs: uniqueStrings([
        ...(scaffold?.blockingRequirementIds ?? []),
        ...(witness?.firstMissingRetainedIdentityInputs ?? []),
      ]),
    },
    scaffold: summarizeScaffold(scaffold),
    structuralWitness: summarizeWitness(witness),
    candidateRows: summarizeCandidateRows(candidateRows),
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    target: output.target,
    summary: output.summary,
  };
}

function summarizeScaffold(scaffold) {
  if (!scaffold) {
    return null;
  }
  return {
    schema: scaffold.schema ?? null,
    status: scaffold.status ?? null,
    claimLevel: scaffold.claimLevel ?? null,
    retainedRowSetId: scaffold.retainedRowSetId ?? null,
    canonicalFamily: scaffold.canonicalFamily ?? null,
    currentProxyEvidenceSources:
      scaffold.currentProxyEvidenceSources?.map((source) => ({
        id: source.id ?? null,
        residualComponent: source.residualComponent ?? null,
        schema: source.schema ?? null,
        status: source.status ?? null,
        currentEvidencePopulated: source.currentEvidencePopulated ?? null,
        retainedAcceptancePass: source.retainedAcceptancePass ?? null,
      })) ?? [],
    requiredRowGroups: scaffold.requiredRowGroups ?? [],
    blockingRequirementIds: scaffold.blockingRequirementIds ?? [],
    retainedRowSetIdentityPass:
      scaffold.retainedRowSetIdentityPass ?? null,
    retainedBranchClaim: scaffold.retainedBranchClaim ?? null,
  };
}

function summarizeWitness(witness) {
  if (!witness) {
    return null;
  }
  return {
    schema: witness.schema ?? null,
    status: witness.status ?? null,
    claimLevel: witness.claimLevel ?? null,
    retainedRowSetId: witness.retainedRowSetId ?? null,
    canonicalFamily: witness.canonicalFamily ?? null,
    sourceCount: witness.sourceCount ?? null,
    rowSetIdentityCandidatePassCount:
      witness.rowSetIdentityCandidatePassCount ?? null,
    currentStructuralWitnessPopulatedCount:
      witness.currentStructuralWitnessPopulatedCount ?? null,
    currentStructuralWitnessPass:
      witness.currentStructuralWitnessPass ?? null,
    acceptedRetainedIdentityRequirementCount:
      witness.acceptedRetainedIdentityRequirementCount ?? null,
    retainedIdentityRequirementCount:
      witness.retainedIdentityRequirementCount ?? null,
    retainedRowSetIdentityPass:
      witness.retainedRowSetIdentityPass ?? null,
    firstMissingRetainedIdentityInputs:
      witness.firstMissingRetainedIdentityInputs ?? [],
  };
}

function summarizeCandidateRows(rows) {
  return rows
    .filter((row) => row && Object.hasOwn(row, "retainedRowSetIdentityPass"))
    .map((row) => ({
      familyId: row.familyId ?? null,
      familyRoleAssignedRelation: row.familyRoleAssignedRelation ?? null,
      retainedRowSetId: row.retainedRowSetId ?? null,
      retainedRowSetIdentityPass:
        row.retainedRowSetIdentityPass ?? null,
      retainedRowSetCurrentProxyEvidencePopulatedCount:
        row.retainedRowSetCurrentProxyEvidencePopulatedCount ?? null,
      retainedRowSetBlockingRequirementIds:
        row.retainedRowSetBlockingRequirementIds ?? [],
      retainedRowSetIdentityStructuralWitnessStatus:
        row.retainedRowSetIdentityStructuralWitnessStatus ?? null,
      retainedRowSetIdentityStructuralWitnessCurrentPass:
        row.retainedRowSetIdentityStructuralWitnessCurrentPass ?? null,
      retainedRowSetIdentityStructuralWitnessRetainedPass:
        row.retainedRowSetIdentityStructuralWitnessRetainedPass ?? null,
      retainedRowSetIdentityStructuralWitnessFirstMissingInputs:
        row.retainedRowSetIdentityStructuralWitnessFirstMissingInputs ?? [],
    }));
}

function firstDefined(values) {
  return values.find((value) => value !== undefined && value !== null);
}

function numberOrZero(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string"))];
}

import fs from "node:fs";
import path from "node:path";

import { buildReactionReviewCandidateFromSolverRequest } from "../src/apps/reaction/ReactionReviewImportRuntime.js";
import { buildAcceptedReactionLibraryCandidateFromSolverArtifacts } from "../src/apps/reaction/ReactionSolvedLibraryRuntime.js";
import { solveReactionSolverRequest } from "../src/apps/reaction/ReactionSolverContractRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function sanitizeToken(value = "", fallback = "reaction_library") {
  return (
    normalizeText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || fallback
  );
}

function printUsage() {
  process.stdout.write(
    [
      "Usage: node scripts/build-reaction-library.mjs [--out-dir <dir>] [--accepted-at <iso>] <solver-request.v1.json> [...]",
      "",
      "Build accepted reaction-flow/v1 library documents from solver-request/v1 inputs",
      "using the full Reaction review -> solve -> library export path.",
    ].join("\n") + "\n"
  );
}

function parseArgs(argv = []) {
  const requestPaths = [];
  let outDir = "";
  let acceptedAt = "";
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      return { help: true };
    }
    if (argument === "--out-dir") {
      outDir = normalizeText(argv[index + 1]);
      index += 1;
      continue;
    }
    if (argument === "--accepted-at") {
      acceptedAt = normalizeText(argv[index + 1]);
      index += 1;
      continue;
    }
    requestPaths.push(argument);
  }
  return { help: false, requestPaths, outDir, acceptedAt };
}

function deriveEntryId(requestPath = "", request = {}) {
  const pathBase = path.basename(requestPath).replace(/\.solver-request\.v1\.json$/i, "");
  return sanitizeToken(
    normalizeText(request?.upstreamContext?.proposalId) ||
      normalizeText(request?.requestId) ||
      pathBase,
    "reaction_library"
  );
}

function deriveTitle(request = {}, entryId = "") {
  return (
    normalizeText(request?.origin?.title) ||
    normalizeText(request?.upstreamContext?.notes?.title) ||
    entryId
      .split("_")
      .filter(Boolean)
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(" ")
  );
}

function writeJson(outputPath, value) {
  fs.writeFileSync(outputPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function buildAcceptedLibraryDocument(requestPath = "", options = {}) {
  const request = JSON.parse(fs.readFileSync(requestPath, "utf8"));
  const reviewCandidate = buildReactionReviewCandidateFromSolverRequest(request);
  const { result } = solveReactionSolverRequest(request);
  const entryId = deriveEntryId(requestPath, request);
  const title = deriveTitle(request, entryId);
  const candidate = buildAcceptedReactionLibraryCandidateFromSolverArtifacts({
    request,
    result,
    reviewCandidate,
    acceptedAt: options.acceptedAt,
    entryId,
    title,
    description: `Accepted PDG-backed solved reaction for ${title}.`,
  });
  return { request, result, candidate, entryId, title };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    process.exit(0);
  }
  if (!args.outDir || args.requestPaths.length === 0) {
    printUsage();
    throw new Error("Missing required --out-dir or solver-request paths.");
  }
  fs.mkdirSync(args.outDir, { recursive: true });
  const summary = {
    schema: "reaction-library-build/v1",
    builtAt: new Date().toISOString(),
    acceptedAt: normalizeText(args.acceptedAt),
    outputDirectory: path.resolve(args.outDir),
    entries: [],
  };
  for (const requestPath of args.requestPaths) {
    const output = buildAcceptedLibraryDocument(requestPath, {
      acceptedAt: args.acceptedAt,
    });
    const outputPath = path.join(args.outDir, `${output.entryId}.v1.json`);
    writeJson(outputPath, output.candidate.document);
    summary.entries.push({
      entryId: output.entryId,
      title: output.title,
      requestPath: path.resolve(requestPath),
      outputPath: path.resolve(outputPath),
      requestId: normalizeText(output.request?.requestId),
      exact: Boolean(output.result?.summary?.exact),
      unresolvedTargetCount: Number(output.result?.summary?.unresolvedTargetCount ?? 0),
    });
  }
  const summaryPath = path.join(args.outDir, "summary.json");
  writeJson(summaryPath, summary);
  process.stdout.write(
    `Built ${summary.entries.length} accepted reaction library document(s) into ${path.resolve(args.outDir)}\n`
  );
} catch (error) {
  process.stderr.write(`${error?.stack || error?.message || String(error)}\n`);
  process.exitCode = 1;
}

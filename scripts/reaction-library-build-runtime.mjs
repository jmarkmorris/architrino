import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { buildReactionReviewCandidateFromSolverRequest } from "../src/apps/reaction/ReactionReviewImportRuntime.js";
import {
  buildReactionSnapshotFromReactionFlowDocument,
} from "../src/apps/reaction/ReactionBuiltInLibraryRuntime.js";
import { buildReactionFlowDocument } from "../src/apps/reaction/ReactionFlowExportRuntime.js";
import { normalizeReactionSnapshotToStrictFiveLane } from "../src/apps/reaction/ReactionFlowMigrationRuntime.js";
import { buildReactionLibraryCandidateFromDocument } from "../src/apps/reaction/ReactionLibraryCandidateRuntime.js";
import { buildReactionLibraryCandidateFromSolverArtifacts } from "../src/apps/reaction/ReactionSolvedLibraryRuntime.js";
import { solveReactionSolverRequest } from "../src/apps/reaction/ReactionSolverContractRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function sanitizeToken(value = "", fallback = "reaction_library") {
  return (
    normalizeText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || fallback
  );
}

function readJson(filePath = "") {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readGitHeadJson(repoRelativePath = "", rootDir = process.cwd()) {
  const text = execFileSync("git", ["show", `HEAD:${repoRelativePath}`], {
    cwd: rootDir,
    encoding: "utf8",
  });
  return JSON.parse(text);
}

function serializeJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function buildContentVersion(value = "") {
  return crypto.createHash("sha1").update(String(value ?? ""), "utf8").digest("hex").slice(0, 12);
}

function toPosixPath(value = "") {
  return normalizeText(value).replaceAll(path.sep, "/");
}

function countErrorDiagnostics(result = {}) {
  return (Array.isArray(result?.diagnostics) ? result.diagnostics : []).filter(
    (diagnostic) => normalizeLowerText(diagnostic?.severity) === "error"
  ).length;
}

function listErrorDiagnosticCodes(result = {}) {
  return [
    ...new Set(
      (Array.isArray(result?.diagnostics) ? result.diagnostics : [])
        .filter((diagnostic) => normalizeLowerText(diagnostic?.severity) === "error")
        .map((diagnostic) => normalizeText(diagnostic?.code))
        .filter(Boolean)
    ),
  ];
}

function getRankingScore(request = {}) {
  const value = Number(request?.upstreamContext?.ranking?.score);
  return Number.isFinite(value) ? value : 0;
}

function getRankingRank(request = {}) {
  const value = Number(request?.upstreamContext?.ranking?.rank);
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : Number.MAX_SAFE_INTEGER;
}

function isLivePdgRequest(request = {}, requestPath = "") {
  return (
    normalizeLowerText(request?.requestId).endsWith(".live-pdg") ||
    normalizeLowerText(requestPath).includes(".live-pdg.")
  );
}

function buildTitleSuffix(request = {}, requestPath = "") {
  return isLivePdgRequest(request, requestPath) ? " (live PDG)" : "";
}

function compareRequestSummaries(left = {}, right = {}) {
  if (Boolean(left?.solveExact) !== Boolean(right?.solveExact)) {
    return left?.solveExact ? -1 : 1;
  }
  const scoreDelta = Number(right?.rankingScore ?? 0) - Number(left?.rankingScore ?? 0);
  if (scoreDelta !== 0) {
    return scoreDelta;
  }
  const rankDelta = Number(left?.rankingRank ?? 0) - Number(right?.rankingRank ?? 0);
  if (rankDelta !== 0) {
    return rankDelta;
  }
  const unresolvedDelta =
    Number(left?.unresolvedTargetCount ?? 0) - Number(right?.unresolvedTargetCount ?? 0);
  if (unresolvedDelta !== 0) {
    return unresolvedDelta;
  }
  const errorDelta = Number(left?.errorCount ?? 0) - Number(right?.errorCount ?? 0);
  if (errorDelta !== 0) {
    return errorDelta;
  }
  return normalizeText(left?.title).localeCompare(normalizeText(right?.title));
}

function compareNonExactRequestSummaries(left = {}, right = {}) {
  const scoreDelta = Number(right?.rankingScore ?? 0) - Number(left?.rankingScore ?? 0);
  if (scoreDelta !== 0) {
    return scoreDelta;
  }
  const rankDelta = Number(left?.rankingRank ?? 0) - Number(right?.rankingRank ?? 0);
  if (rankDelta !== 0) {
    return rankDelta;
  }
  const unresolvedDelta =
    Number(left?.unresolvedTargetCount ?? 0) - Number(right?.unresolvedTargetCount ?? 0);
  if (unresolvedDelta !== 0) {
    return unresolvedDelta;
  }
  const errorDelta = Number(left?.errorCount ?? 0) - Number(right?.errorCount ?? 0);
  if (errorDelta !== 0) {
    return errorDelta;
  }
  return normalizeText(left?.title).localeCompare(normalizeText(right?.title));
}

export const DEFAULT_REACTION_LIBRARY_ACCEPTED_AT = "2026-04-05T12:00:00.000Z";
export const DEFAULT_NON_EXACT_LIBRARY_ENTRY_LIMIT = 5;
export const GENERATED_REACTION_LIBRARY_MANIFEST_PATH =
  "content/generated/reaction-built-in-library/manifest.v1.json";
export const GENERATED_REACTION_LIBRARY_ENTRIES_DIR =
  "content/generated/reaction-built-in-library/entries";
export const GENERATED_REACTION_LIBRARY_REQUEST_DIR =
  "content/contracts/examples/pdg/v1/generated";
export const DEFAULT_REACTION_LIBRARY_DEFAULT_ENTRY_IDS = Object.freeze([
  "muon_decay",
  "free_neutron_beta_decay",
  "charged_pion_to_muon_neutrino",
]);

export function deriveReactionLibraryEntryId(requestPath = "", request = {}) {
  const pathBase = path.basename(requestPath).replace(/\.solver-request\.v1\.json$/i, "");
  return sanitizeToken(
    normalizeText(request?.upstreamContext?.proposalId) ||
      normalizeText(request?.requestId) ||
      pathBase,
    "reaction_library"
  );
}

export function deriveReactionLibraryTitle(request = {}, entryId = "", options = {}) {
  const title =
    normalizeText(request?.origin?.title) ||
    normalizeText(request?.upstreamContext?.notes?.title) ||
    entryId
      .split("_")
      .filter(Boolean)
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(" ");
  return `${title}${buildTitleSuffix(request, options?.requestPath)}`;
}

function deriveReactionLibraryDocumentPath(entryId = "") {
  return toPosixPath(
    path.posix.join(
      GENERATED_REACTION_LIBRARY_ENTRIES_DIR,
      `${sanitizeToken(entryId, "reaction_library")}.reaction-flow.v1.json`
    )
  );
}

function resolveAcceptedAt(outputPath = "", explicitAcceptedAt = "") {
  const normalizedAcceptedAt = normalizeText(explicitAcceptedAt);
  if (normalizedAcceptedAt) {
    return normalizedAcceptedAt;
  }
  if (outputPath && fs.existsSync(outputPath)) {
    try {
      const existing = readJson(outputPath);
      const existingAcceptedAt = normalizeText(existing?.review?.acceptedAt);
      if (existingAcceptedAt) {
        return existingAcceptedAt;
      }
    } catch (_error) {
      // Ignore unreadable legacy output and fall back to the stable default.
    }
  }
  return DEFAULT_REACTION_LIBRARY_ACCEPTED_AT;
}

function discoverGeneratedSolverRequestPaths(rootDir = "", requestDir = GENERATED_REACTION_LIBRARY_REQUEST_DIR) {
  const absoluteRequestDir = path.resolve(rootDir || process.cwd(), normalizeText(requestDir));
  if (!fs.existsSync(absoluteRequestDir)) {
    return [];
  }
  return fs.readdirSync(absoluteRequestDir)
    .filter((entry) => entry.endsWith(".solver-request.v1.json"))
    .sort((left, right) => left.localeCompare(right))
    .map((entry) => toPosixPath(path.posix.join(normalizeText(requestDir), entry)));
}

function buildReactionLibrarySummary(requestPath = "", options = {}) {
  const absoluteRequestPath = path.resolve(options?.rootDir || process.cwd(), normalizeText(requestPath));
  const request = readJson(absoluteRequestPath);
  const { result } = solveReactionSolverRequest(request);
  const entryId = deriveReactionLibraryEntryId(absoluteRequestPath, request);
  const title = deriveReactionLibraryTitle(request, entryId, {
    requestPath: absoluteRequestPath,
  });
  return {
    requestPath: toPosixPath(requestPath),
    absoluteRequestPath,
    request,
    result,
    entryId,
    title,
    solveExact: result?.summary?.exact === true && countErrorDiagnostics(result) === 0,
    unresolvedTargetCount: Number(result?.summary?.unresolvedTargetCount ?? 0),
    errorCount: countErrorDiagnostics(result),
    diagnosticCodes: listErrorDiagnosticCodes(result),
    rankingScore: getRankingScore(request),
    rankingRank: getRankingRank(request),
  };
}

function selectBuiltInReactionLibrarySummaries(requestSummaries = [], options = {}) {
  const nonExactLimit = Math.max(
    0,
    Math.round(Number(options?.nonExactLimit ?? DEFAULT_NON_EXACT_LIBRARY_ENTRY_LIMIT) || 0)
  );
  const exactSummaries = requestSummaries
    .filter((entry) => entry?.solveExact)
    .sort(compareRequestSummaries);
  const nonExactSummaries = requestSummaries
    .filter((entry) => !entry?.solveExact)
    .sort(compareNonExactRequestSummaries)
    .slice(0, nonExactLimit);
  return [...exactSummaries, ...nonExactSummaries];
}

function pickDefaultEntryId(entries = [], preferredEntryIds = DEFAULT_REACTION_LIBRARY_DEFAULT_ENTRY_IDS) {
  const exactEntries = entries.filter((entry) => entry?.solveExact);
  for (const preferredEntryId of preferredEntryIds) {
    const preferred = exactEntries.find((entry) => entry?.id === preferredEntryId);
    if (preferred) {
      return preferred.id;
    }
  }
  if (exactEntries[0]?.id) {
    return exactEntries[0].id;
  }
  return normalizeText(entries[0]?.id);
}

function buildLibraryDescription(title = "", solveExact = false) {
  return solveExact
    ? `Build-generated exact solved reaction for ${title}.`
    : `Build-generated non-exact solve candidate for ${title}.`;
}

function migrateAcceptedReactionFlowDocument(document = {}) {
  const snapshot = normalizeReactionSnapshotToStrictFiveLane(
    buildReactionSnapshotFromReactionFlowDocument(document, {
      allowLegacyLaneSkipping: true,
    })
  );
  return buildReactionFlowDocument({
    reactionId: normalizeText(document?.reactionId),
    title: normalizeText(document?.title),
    review: document?.review ?? { status: "draft" },
    sourceDocumentIds: Array.isArray(document?.provenance?.sourceDocumentIds)
      ? document.provenance.sourceDocumentIds
      : [],
    semanticTags: Array.isArray(document?.hints?.semanticTags)
      ? document.hints.semanticTags
      : [],
    suggestedSceneId: normalizeText(document?.hints?.suggestedSceneId),
    reviewInput: document?.provenance?.reviewInput ?? null,
    snapshot,
  });
}

function normalizeAcceptedFallbackDocument(document = {}) {
  try {
    buildReactionSnapshotFromReactionFlowDocument(document);
    return document;
  } catch (_error) {
    return migrateAcceptedReactionFlowDocument(document);
  }
}

function resolveAcceptedFallbackDocument(displayDocumentPath = "", options = {}) {
  const rootDir = normalizeText(options?.rootDir) || process.cwd();
  const absoluteDocumentPath = path.resolve(rootDir, displayDocumentPath);
  const currentDocument = fs.existsSync(absoluteDocumentPath) ? readJson(absoluteDocumentPath) : null;
  if (normalizeLowerText(currentDocument?.review?.status) === "accepted") {
    return currentDocument;
  }
  try {
    const headDocument = readGitHeadJson(displayDocumentPath, rootDir);
    if (normalizeLowerText(headDocument?.review?.status) === "accepted") {
      return headDocument;
    }
  } catch (_error) {
    // Ignore missing git HEAD copies and keep the freshly built candidate.
  }
  return null;
}

export function buildGeneratedReactionLibraryDocument(requestPath = "", options = {}) {
  const request = readJson(requestPath);
  const reviewCandidate = buildReactionReviewCandidateFromSolverRequest(request);
  const { result } = solveReactionSolverRequest(request);
  const entryId =
    normalizeText(options?.entryId) || deriveReactionLibraryEntryId(requestPath, request);
  const title =
    normalizeText(options?.title) ||
    deriveReactionLibraryTitle(request, entryId, {
      requestPath,
    });
  const displayDocumentPath = deriveReactionLibraryDocumentPath(entryId);
  const solveExact = result?.summary?.exact === true && countErrorDiagnostics(result) === 0;
  let candidate = buildReactionLibraryCandidateFromSolverArtifacts({
    request,
    result,
    reviewCandidate,
    acceptedAt: solveExact ? normalizeText(options?.acceptedAt) : "",
    entryId,
    title,
    reviewStatus: solveExact ? "accepted" : undefined,
    allowIncompleteSnapshot: !solveExact,
    description: buildLibraryDescription(title, solveExact),
  });
  if (normalizeLowerText(candidate?.document?.review?.status) !== "accepted") {
    const acceptedFallbackDocument = resolveAcceptedFallbackDocument(displayDocumentPath, options);
    if (acceptedFallbackDocument) {
      candidate = buildReactionLibraryCandidateFromDocument(
        normalizeAcceptedFallbackDocument(acceptedFallbackDocument),
        {
          entryId,
          description: buildLibraryDescription(title, true),
        }
      );
    }
  }
  return {
    request,
    result,
    candidate,
    document: candidate.document,
    entryId,
    title,
    solveExact: normalizeLowerText(candidate?.document?.review?.status) === "accepted",
  };
}

function buildManifestEntryFromGeneratedDocument(summary = {}, built = {}) {
  const documentPath = deriveReactionLibraryDocumentPath(summary?.entryId);
  const document = built?.document ?? {};
  const text = serializeJson(document);
  const version = buildContentVersion(text);
  const accepted = normalizeLowerText(document?.review?.status) === "accepted";
  return {
    id: normalizeText(summary?.entryId),
    requestId: normalizeText(summary?.request?.requestId),
    title: normalizeText(summary?.title),
    displayTitle: accepted
      ? normalizeText(summary?.title)
      : `${normalizeText(summary?.title)} [non-exact]`,
    description: normalizeText(built?.candidate?.entry?.description),
    documentPath,
    reviewStatus: normalizeText(document?.review?.status) || "draft",
    solveExact: accepted,
    rankingScore: Number(summary?.rankingScore ?? 0),
    rankingRank: Number(summary?.rankingRank ?? 0),
    unresolvedTargetCount: Number(summary?.unresolvedTargetCount ?? 0),
    errorCount: Number(summary?.errorCount ?? 0),
    diagnosticCodes: Array.isArray(summary?.diagnosticCodes) ? [...summary.diagnosticCodes] : [],
    sourceDocumentId: normalizeText(summary?.request?.origin?.sourceDocumentId),
    sourceRequestPath: normalizeText(summary?.requestPath),
    version,
    isDefault: false,
  };
}

function writeTextIfChanged(filePath = "", nextText = "") {
  const currentText = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
  if (currentText === nextText) {
    return false;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, nextText, "utf8");
  return true;
}

function collectGeneratedLibraryPaths(rootDir = "") {
  const absoluteEntriesDir = path.resolve(rootDir, GENERATED_REACTION_LIBRARY_ENTRIES_DIR);
  if (!fs.existsSync(absoluteEntriesDir)) {
    return [];
  }
  return fs.readdirSync(absoluteEntriesDir)
    .filter((entry) => entry.endsWith(".json"))
    .map((entry) => toPosixPath(path.posix.join(GENERATED_REACTION_LIBRARY_ENTRIES_DIR, entry)));
}

export function syncBuiltInReactionLibrary(options = {}) {
  const mode = normalizeLowerText(options?.mode) === "write" ? "write" : "check";
  const rootDir = normalizeText(options?.rootDir) || process.cwd();
  const requestPaths = Array.isArray(options?.requestPaths) && options.requestPaths.length
    ? options.requestPaths.map((entry) => toPosixPath(entry))
    : discoverGeneratedSolverRequestPaths(rootDir, options?.requestDir);
  const buildDocument =
    typeof options?.buildDocument === "function"
      ? options.buildDocument
      : buildGeneratedReactionLibraryDocument;

  const requestSummaries =
    Array.isArray(options?.requestSummaries) && options.requestSummaries.length
      ? options.requestSummaries.map((entry) => ({
          ...entry,
          requestPath: toPosixPath(entry?.requestPath),
          absoluteRequestPath:
            normalizeText(entry?.absoluteRequestPath) ||
            path.resolve(rootDir, normalizeText(entry?.requestPath)),
          entryId: normalizeText(entry?.entryId),
          title: normalizeText(entry?.title),
          solveExact: entry?.solveExact === true,
          unresolvedTargetCount: Number(entry?.unresolvedTargetCount ?? 0),
          errorCount: Number(entry?.errorCount ?? 0),
          rankingScore: Number(entry?.rankingScore ?? 0),
          rankingRank: Number(entry?.rankingRank ?? 0),
          diagnosticCodes: Array.isArray(entry?.diagnosticCodes) ? [...entry.diagnosticCodes] : [],
          request: entry?.request ?? {},
        }))
      : requestPaths.map((requestPath) =>
          buildReactionLibrarySummary(requestPath, {
            rootDir,
          })
        );
  const selectedSummaries = selectBuiltInReactionLibrarySummaries(requestSummaries, options);
  const generationErrors = [];
  const driftPaths = [];
  const changedPaths = [];
  const builtEntries = [];

  for (const summary of selectedSummaries) {
    const displayDocumentPath = deriveReactionLibraryDocumentPath(summary.entryId);
    const absoluteDocumentPath = path.resolve(rootDir, displayDocumentPath);
    const acceptedAt = summary.solveExact ? resolveAcceptedAt(absoluteDocumentPath, options?.acceptedAt) : "";
    try {
      const built = buildDocument(summary.absoluteRequestPath, {
        ...options,
        acceptedAt,
        entryId: summary.entryId,
        title: summary.title,
      });
      builtEntries.push({
        summary,
        built,
      });
    } catch (error) {
      generationErrors.push({
        entryId: summary.entryId,
        requestPath: summary.requestPath,
        outputPath: displayDocumentPath,
        message: normalizeText(error?.message) || String(error),
      });
    }
  }

  const manifestEntries = builtEntries
    .map(({ summary, built }) => buildManifestEntryFromGeneratedDocument(summary, built))
    .sort(compareRequestSummaries);
  const defaultEntryId = pickDefaultEntryId(
    manifestEntries,
    Array.isArray(options?.preferredDefaultEntryIds) && options.preferredDefaultEntryIds.length
      ? options.preferredDefaultEntryIds
      : DEFAULT_REACTION_LIBRARY_DEFAULT_ENTRY_IDS
  );
  const orderedManifestEntries = [
    ...manifestEntries
      .map((entry) => ({
        ...entry,
        isDefault: entry.id === defaultEntryId,
      }))
      .sort((left, right) => {
        if (Boolean(left?.isDefault) !== Boolean(right?.isDefault)) {
          return left?.isDefault ? -1 : 1;
        }
        return compareRequestSummaries(left, right);
      }),
  ];
  const manifest = {
    schema: "reaction-built-in-library-manifest/v1",
    defaultEntryId,
    exactEntryCount: orderedManifestEntries.filter((entry) => entry.solveExact).length,
    nonExactEntryCount: orderedManifestEntries.filter((entry) => !entry.solveExact).length,
    entries: orderedManifestEntries,
  };
  const manifestText = serializeJson(manifest);

  const expectedTextsByPath = new Map();
  builtEntries.forEach(({ summary, built }) => {
    const documentPath = deriveReactionLibraryDocumentPath(summary.entryId);
    expectedTextsByPath.set(documentPath, serializeJson(built.document));
  });
  expectedTextsByPath.set(GENERATED_REACTION_LIBRARY_MANIFEST_PATH, manifestText);

  for (const [displayPath, nextText] of expectedTextsByPath.entries()) {
    const absolutePath = path.resolve(rootDir, displayPath);
    const currentText = fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : null;
    if (mode === "write") {
      if (writeTextIfChanged(absolutePath, nextText)) {
        changedPaths.push(displayPath);
      }
      continue;
    }
    if (currentText !== nextText) {
      driftPaths.push(displayPath);
    }
  }

  const staleGeneratedPaths = collectGeneratedLibraryPaths(rootDir)
    .filter((displayPath) => !expectedTextsByPath.has(displayPath));
  if (mode === "write") {
    for (const staleGeneratedPath of staleGeneratedPaths) {
      fs.rmSync(path.resolve(rootDir, staleGeneratedPath), { force: true });
      changedPaths.push(staleGeneratedPath);
    }
  } else {
    driftPaths.push(...staleGeneratedPaths);
  }

  return {
    mode,
    requestCount: requestSummaries.length,
    entryCount: orderedManifestEntries.length,
    exactEntryCount: manifest.exactEntryCount,
    nonExactEntryCount: manifest.nonExactEntryCount,
    defaultEntryId,
    generationErrors,
    skippedEntries: [],
    driftPaths: [...new Set(driftPaths)].sort((left, right) => left.localeCompare(right)),
    changedPaths: [...new Set(changedPaths)].sort((left, right) => left.localeCompare(right)),
    manifest,
  };
}

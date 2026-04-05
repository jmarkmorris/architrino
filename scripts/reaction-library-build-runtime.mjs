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

function readJson(filePath = "") {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function serializeJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function isNonExactAcceptedLibraryError(error) {
  const message = normalizeText(error?.message) || String(error);
  return /exact solver result/i.test(message);
}

export const DEFAULT_REACTION_LIBRARY_ACCEPTED_AT = "2026-04-05T12:00:00.000Z";

export const BUILT_IN_REACTION_LIBRARY_SYNC_ENTRIES = Object.freeze([
  Object.freeze({
    entryId: "muon_decay",
    requestPath: "content/contracts/examples/pdg/v1/generated/muon_decay.solver-request.v1.json",
    outputPath: "content/contracts/examples/reaction-flow/muon_decay.v1.json",
    title: "Muon decay",
  }),
  Object.freeze({
    entryId: "free_neutron_beta",
    requestPath:
      "content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.solver-request.v1.json",
    outputPath: "content/contracts/examples/reaction-flow/free_neutron_beta.v1.json",
    title: "Free neutron beta decay",
  }),
  Object.freeze({
    entryId: "charged_pion_to_muon_neutrino",
    requestPath:
      "content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.solver-request.v1.json",
    outputPath: "content/contracts/examples/reaction-flow/charged_pion_to_muon_neutrino.v1.json",
    title: "Charged pion to muon neutrino",
  }),
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

export function deriveReactionLibraryTitle(request = {}, entryId = "") {
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

export function buildAcceptedReactionLibraryDocument(requestPath = "", options = {}) {
  const request = readJson(requestPath);
  const reviewCandidate = buildReactionReviewCandidateFromSolverRequest(request);
  const { result } = solveReactionSolverRequest(request);
  const entryId =
    normalizeText(options?.entryId) || deriveReactionLibraryEntryId(requestPath, request);
  const title = normalizeText(options?.title) || deriveReactionLibraryTitle(request, entryId);
  const candidate = buildAcceptedReactionLibraryCandidateFromSolverArtifacts({
    request,
    result,
    reviewCandidate,
    acceptedAt: normalizeText(options?.acceptedAt),
    entryId,
    title,
    description: `Accepted PDG-backed solved reaction for ${title}.`,
  });
  return {
    request,
    result,
    candidate,
    document: candidate.document,
    entryId,
    title,
  };
}

export function syncBuiltInReactionLibrary(options = {}) {
  const mode = normalizeText(options?.mode).toLowerCase() === "write" ? "write" : "check";
  const rootDir = normalizeText(options?.rootDir) || process.cwd();
  const entries = Array.isArray(options?.entries) && options.entries.length
    ? options.entries
    : BUILT_IN_REACTION_LIBRARY_SYNC_ENTRIES;
  const buildDocument =
    typeof options?.buildDocument === "function"
      ? options.buildDocument
      : buildAcceptedReactionLibraryDocument;

  const generationErrors = [];
  const skippedEntries = [];
  const driftPaths = [];
  const changedPaths = [];

  for (const entry of entries) {
    const requestPath = path.resolve(rootDir, normalizeText(entry?.requestPath));
    const outputPath = path.resolve(rootDir, normalizeText(entry?.outputPath));
    const displayOutputPath = normalizeText(entry?.outputPath) || path.relative(rootDir, outputPath);
    const acceptedAt = resolveAcceptedAt(outputPath, options?.acceptedAt);

    let built;
    try {
      built = buildDocument(requestPath, {
        ...options,
        entry,
        acceptedAt,
        entryId: normalizeText(entry?.entryId),
        title: normalizeText(entry?.title),
      });
    } catch (error) {
      const failure = {
        entryId: normalizeText(entry?.entryId),
        requestPath: normalizeText(entry?.requestPath),
        outputPath: displayOutputPath,
        message: normalizeText(error?.message) || String(error),
      };
      if (isNonExactAcceptedLibraryError(error)) {
        skippedEntries.push(failure);
      } else {
        generationErrors.push(failure);
      }
      continue;
    }

    const document = built?.document ?? built?.candidate?.document ?? built;
    const nextText = serializeJson(document);
    const currentText = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : null;
    if (mode === "write") {
      if (currentText !== nextText) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, nextText, "utf8");
        changedPaths.push(displayOutputPath);
      }
      continue;
    }
    if (currentText !== nextText) {
      driftPaths.push(displayOutputPath);
    }
  }

  return {
    mode,
    entryCount: entries.length,
    generationErrors,
    skippedEntries,
    driftPaths,
    changedPaths,
  };
}

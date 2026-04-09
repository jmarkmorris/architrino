import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { buildReactionSnapshotFromReactionFlowDocument } from "../src/apps/reaction/ReactionBuiltInLibraryRuntime.js";
import { buildReactionFlowDocument } from "../src/apps/reaction/ReactionFlowExportRuntime.js";
import { normalizeReactionSnapshotToStrictFiveLane } from "../src/apps/reaction/ReactionFlowMigrationRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function readGitHeadJson(repoRelativePath = "") {
  const text = execFileSync("git", ["show", `HEAD:${repoRelativePath}`], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  return JSON.parse(text);
}

function writeJson(filePath = "", value = null) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function migrateReactionFlowDocument(document = {}) {
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

const paths = process.argv.slice(2).map((entry) => normalizeText(entry)).filter(Boolean);
if (!paths.length) {
  process.stderr.write("Usage: node scripts/migrate-reaction-flow-five-lane.mjs <reaction-flow.json> [...]\n");
  process.exit(1);
}

for (const relativePath of paths) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const migrated = migrateReactionFlowDocument(readGitHeadJson(relativePath));
  writeJson(absolutePath, migrated);
  process.stdout.write(`${relativePath}\n`);
}

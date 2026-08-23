import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Mines already-evolved F6c records against the exact proper-rotation return
// actions. This ranks measurements; it does not supply an independent oracle
// or turn a close residual into a retained or periodic braid.

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const analyzer = path.join(scriptDirectory, "f6c-eom-coordinate-analysis.mjs");
const roots = process.argv.slice(2);
const searchRoots = roots.length > 0 ? roots : [".tmp"];

function findManifests(root, results = []) {
  if (!fs.existsSync(root)) return results;
  const stat = fs.statSync(root);
  if (stat.isFile()) {
    if (path.basename(root) === "run-manifest.json") results.push(root);
    return results;
  }
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const child = path.join(root, entry.name);
    if (entry.isDirectory()) findManifests(child, results);
    else if (entry.isFile() && entry.name === "run-manifest.json") results.push(child);
  }
  return results;
}

const manifests = searchRoots.flatMap((root) => findManifests(root));
const eligible = manifests.flatMap((manifestPath) => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (
    manifest.seedFamily !== "f6c-balanced-tetrahedral-v1"
    || Number(manifest.acceptedEndTime ?? 0) <= 0
    || Number(manifest.framesEmitted ?? 0) <= 8
  ) {
    return [];
  }
  return [{ manifestPath, manifest }];
});

const rows = [];
const analysisFailures = [];
for (const { manifestPath, manifest } of eligible) {
  const outDirectory = path.dirname(manifestPath);
  const child = spawnSync(process.execPath, [analyzer, outDirectory], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (child.status !== 0) {
    analysisFailures.push({
      outDirectory,
      exitStatus: child.status,
      stderr: child.stderr.trim(),
    });
    continue;
  }
  const analysis = JSON.parse(child.stdout);
  const diagnostics = analysis.trajectorySummary.properRotationReturnDiagnostics;
  const directNonzero = diagnostics.directByNearestWinding.filter(
    (entry) => entry.winding.positive !== 0 || entry.winding.negative !== 0,
  );
  rows.push({
    outDirectory,
    runId: manifest.runId,
    status: manifest.status,
    acceptedEndTime: Number(manifest.acceptedEndTime),
    acceptedSteps: manifest.acceptedSteps,
    framesEmitted: manifest.framesEmitted,
    minimumDirectNonzeroWinding: directNonzero.length === 0
      ? null
      : directNonzero.reduce((best, entry) => entry.rms < best.rms ? entry : best),
    minimumReflected: diagnostics.minimumReflected,
    directWindingCellsVisited: diagnostics.directByNearestWinding.map(
      (entry) => entry.winding,
    ),
  });
}

function rankNullable(left, right, selector) {
  const leftValue = selector(left);
  const rightValue = selector(right);
  if (leftValue === null) return rightValue === null ? 0 : 1;
  if (rightValue === null) return -1;
  return leftValue - rightValue;
}

const reflectedRanking = [...rows].sort(
  (left, right) => left.minimumReflected.rms - right.minimumReflected.rms,
);
const directNonzeroRanking = [...rows].sort((left, right) => rankNullable(
  left,
  right,
  (row) => row.minimumDirectNonzeroWinding?.rms ?? null,
));

console.log(JSON.stringify({
  schema: "f6c-return-record-ranking/v1",
  claimGrade: "measured-existing-eom-record-ranking-not-independent-oracle",
  excludedClaims: [
    "periodic-orbit",
    "binding",
    "retention",
    "stability",
    "particle-identity",
    "global-search",
  ],
  searchedManifestCount: manifests.length,
  eligibleEvolvedF6cRecordCount: eligible.length,
  analyzedRecordCount: rows.length,
  analysisFailures,
  directNonzeroRanking,
  reflectedRanking,
}, null, 2));

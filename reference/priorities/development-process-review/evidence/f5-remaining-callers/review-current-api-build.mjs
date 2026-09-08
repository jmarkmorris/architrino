import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
assert.equal(sha(Buffer.from("abc")), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
const requireEqual = (actual, expected) => assert.equal(actual, expected);
assert.throws(() => requireEqual("wrong", "known"));
console.log("Known SHA positive and mismatch rejection passed before build review.");
const root = path.resolve(".local-data/f5-original-input-trees/acceptance-20260908-a");
const relative = ".local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/current-acceptance-a";
const bytes = readFileSync(path.join(root, relative, "toolchain.json"));
const build = JSON.parse(bytes);
assert.equal(build.schema, "braid-program/f5-enclosed-root-build.v1");
assert.equal(build.authority, "recorded-build-identity-pending-independent-review");
const checked = [];
for (const row of [...build.sources, ...build.built, ...build.externalLibraries, build.compiler]) {
  const filename = path.resolve(root, row.path);
  const data = readFileSync(filename);
  requireEqual(sha(data), row.sha256);
  if (row.bytes !== undefined) requireEqual(data.length, row.bytes);
  if (row.realPath) requireEqual(realpathSync(filename), row.realPath);
  checked.push({ path: filename, sha256: sha(data), sizeBytes: data.length });
}
assert.equal(new Set(build.sources.map(r => r.path)).size, build.sources.length);
assert.deepEqual(build.stages.map(s => s.stage), ["configure", "build"]);
const buildDir = path.dirname(path.resolve(root, build.built[0].path));
for (const [name, digest] of [["CMakeCache.txt", build.cmakeCacheSha256], ["compile_commands.json", build.compileCommandsSha256]]) requireEqual(sha(readFileSync(path.join(buildDir, name))), digest);
for (const stage of build.stages) {
  assert.equal(stage.code, 0);
  assert.equal(stage.signal, null);
  assert.equal(stage.processGroupClosed, true);
  for (const flag of ["timedOut", "interrupted", "descendantsAfterClose"]) assert.equal(stage[flag], false);
  const data = readFileSync(path.join(root, relative, `${stage.stage}.log`));
  assert.equal(data.length, stage.logBytes);
  checked.push({ path: path.join(root, relative, `${stage.stage}.log`), sha256: sha(data), sizeBytes: data.length });
}
const newestSourceMs = Math.max(...build.sources.map(r => statSync(path.resolve(root, r.path)).mtimeMs));
assert.ok(build.built.every(r => statSync(path.resolve(root, r.path)).mtimeMs >= newestSourceMs));
const manifest = readFileSync(path.join(root, relative, "history-manifest.json"));
const result = { schema: "development-process-review/f5-current-api-recorded-build-review.v1", controlsPassedBeforeTarget: true,
  toolchain: { path: path.join(root, relative, "toolchain.json"), sha256: sha(bytes), sizeBytes: bytes.length },
  reviewedRecordedBindings: checked, sourceCount: build.sources.length, closedBuildStages: build.stages.length,
  manifest: { sha256: sha(manifest), sizeBytes: manifest.length },
  recordedIdentityChecksPassed: true, completeBeforeAfterExternalToolchainCapture: false,
  boundary: "Current recorded build identity only. External headers, actual compiler behind shim, CMake/linker and before-build external census are not supplied by this receipt. No API proof, root census, scientific acceptance or final process-lifetime acceptance." };
writeFileSync("reference/priorities/development-process-review/evidence/f5-remaining-callers/current-api-recorded-build-review.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ sourceCount: result.sourceCount, closedBuildStages: result.closedBuildStages, toolchain: result.toolchain, manifest: result.manifest }));

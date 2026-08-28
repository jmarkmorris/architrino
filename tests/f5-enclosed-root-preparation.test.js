import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { parsePrepareArgs, prepareF5, runWatched, scopedPath, validateProofReceipt, verifyFrozenReferences } from "../scripts/eom/prepare-f5-enclosed-root.mjs";

test("preparation requires explicit fresh scoped output and build directories", () => {
  assert.throws(() => parsePrepareArgs([]), /required/);
  assert.throws(() => parsePrepareArgs(["--out", "x", "--out", "y"]), /Usage/);
  assert.throws(() => parsePrepareArgs(["--run", "yes"]), /Usage/);
  assert.deepEqual(parsePrepareArgs(["--out", "x", "--build-dir", "y"]), { "--out": "x", "--build-dir": "y" });
  for (const value of ["/tmp/foo", ".tmp/../foo", ".tmp/", ".tmp//foo", ".tmp/./foo", ".tmp/\\foo"]) {
    assert.throws(() => scopedPath(value, ".tmp/"));
  }
  assert(scopedPath(".tmp/f5-test-owned", ".tmp/").endsWith("/.tmp/f5-test-owned"));
});

test("frozen F5 references match the reviewed prerequisite generation", () => {
  const bindings = verifyFrozenReferences();
  assert.equal(bindings.length, 10);
  assert(bindings.every((row) => /^[a-f0-9]{64}$/u.test(row.sha256)));
});

test("supervisor records child output and never overwrites a log", async () => {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-supervisor-"));
  try {
    const logPath = path.join(directory, "child.log");
    const result = await runWatched(process.execPath, ["-e", "process.stdout.write('control\\n')"],
      { logPath, stage: "test-control", limitMs: 2000 });
    assert.equal(result.code, 0); assert.equal(result.timedOut, false);
    assert.equal(readFileSync(logPath, "utf8"), "control\n");
    await assert.rejects(runWatched(process.execPath, ["-e", "process.exit(0)"], { logPath, stage: "test-existing" }), /EEXIST/);
    assert.equal(readFileSync(logPath, "utf8"), "control\n");
  } finally { rmSync(directory, { recursive: true }); }
});

test("outer deadline stops a child that never finishes a synchronous call", async () => {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-deadline-"));
  try {
    const logPath = path.join(directory, "child.log");
    await assert.rejects(runWatched(process.execPath, ["-e", "while(true){}"],
      { logPath, stage: "test-deadline", limitMs: 100, heartbeatMs: 50 }),
    (error) => error.processResult?.timedOut === true && error.processResult?.signal === "SIGTERM");
  } finally { rmSync(directory, { recursive: true }); }
});

test("spawn failure remains a failure and closes the create-exclusive log", async () => {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-spawn-"));
  try {
    const logPath = path.join(directory, "child.log");
    await assert.rejects(runWatched(path.join(directory, "missing"), [], { logPath, stage: "test-missing" }), /ENOENT/);
    assert.equal(readFileSync(logPath, "utf8"), "");
  } finally { rmSync(directory, { recursive: true }); }
});

test("deadline still closes the owned group after its driver exits", async () => {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-descendant-"));
  try {
    const driver = "require('node:child_process').spawn(process.execPath,['-e','while(true){}'],{stdio:['ignore',1,2]});process.exit(0)";
    await assert.rejects(runWatched(process.execPath, ["-e", driver], {
      logPath: path.join(directory, "child.log"), stage: "test-descendant", limitMs: 150,
    }), (error) => error.processResult?.timedOut === true && error.processResult?.code === 0);
  } finally { rmSync(directory, { recursive: true }); }
});

test("ignored-output descendant is killed even after the driver closes", async () => {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-hidden-descendant-"));
  try {
    const descendant = "process.on('SIGTERM',()=>{});setInterval(()=>{},1000);process.send('ready')";
    const driver = `const c=require('node:child_process').spawn(process.execPath,['-e',${JSON.stringify(descendant)}],{stdio:['ignore','ignore','ignore','ipc']});c.on('message',()=>process.exit(0))`;
    await assert.rejects(runWatched(process.execPath, ["-e", driver], {
      logPath: path.join(directory, "child.log"), stage: "test-hidden-descendant", limitMs: 3000, terminationGraceMs: 100,
    }), (error) => error.processResult?.descendantsAfterClose === true && error.processResult?.processGroupClosed === true);
  } finally { rmSync(directory, { recursive: true }); }
});

test("existing build directory is rejected before starting preparation", async () => {
  const build = mkdtempSync(scopedPath(".tmp/f5-existing-build-test-", ".tmp/"));
  try {
    await assert.rejects(prepareF5(["--out", ".local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/never-run-existing-build-control",
      "--build-dir", `.tmp/${path.basename(build)}`]), /build directory already exists/);
  } finally { rmSync(build, { recursive: true }); }
});

test("accepted-looking proof must report the exact executed reference and complete census", () => {
  const frozen = verifyFrozenReferences();
  const proof = { schema: "braid-program/f5-actual-cubic-conformance.v1", accepted: true,
    status: "actual-cubic-conformance-passed", historyManifestSha256: "a".repeat(64), h3EvidenceEligible: false,
    campaignId: "control", runId: "control", resourceContact: false, expectedMemberSegments: 12384,
    processedMemberSegments: 12384, normalizedFieldSpeed: "1", failure: null,
    sourceBindings: frozen.slice(0, 5), instrumentBindings: frozen.slice(5, 8) };
  const check = (value) => validateProofReceipt(value, "a".repeat(64), "control", "control");
  assert.doesNotThrow(() => check(proof)); // Synthetic receipt-binding control, not evidence.
  const wrong = structuredClone(proof); wrong.instrumentBindings[0].sha256 = "b".repeat(64);
  assert.throws(() => check(wrong), /instrumentBindings/);
  const stale = structuredClone(proof); stale.sourceBindings[0].sha256 = "b".repeat(64);
  assert.throws(() => check(stale), /sourceBindings/);
  assert.throws(() => check({ ...proof, processedMemberSegments: 12383 }), /census/);
});

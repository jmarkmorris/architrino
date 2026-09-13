import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  captureValidationState,
  compareValidationStates,
  runValidationAndWriteReceipt,
  verifyValidationReceipt,
  writeValidationReceipt,
} from "../scripts/pr-validation-receipt.mjs";

// Strip repository-scoped Git variables so a fixture never acts on the real checkout when this test runs inside a hook.
const GIT_FIXTURE_ENV = Object.fromEntries(Object.entries(process.env).filter(([name]) => !/^GIT_(DIR|WORK_TREE|INDEX_FILE|PREFIX|COMMON_DIR|OBJECT_DIRECTORY|ALTERNATE_OBJECT_DIRECTORIES|NAMESPACE)$/u.test(name)));
function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8", env: GIT_FIXTURE_ENV }).trim();
}

function createRepository(t) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "architrino-pr-receipt-"));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  git(cwd, "init", "-q");
  git(cwd, "config", "user.name", "Receipt Test");
  git(cwd, "config", "user.email", "receipt-test@example.invalid");
  git(cwd, "config", "core.hooksPath", "/dev/null");
  fs.writeFileSync(
    path.join(cwd, ".gitignore"),
    "/.local-data/pr-validation/\n"
  );
  fs.writeFileSync(path.join(cwd, "tracked.txt"), "base one\n");
  fs.writeFileSync(path.join(cwd, "ambient.txt"), "ambient one\n");
  git(cwd, "add", ".gitignore", "tracked.txt", "ambient.txt");
  git(cwd, "commit", "-q", "-m", "base one");
  const baseOne = git(cwd, "rev-parse", "HEAD");

  fs.writeFileSync(path.join(cwd, "tracked.txt"), "base two\n");
  git(cwd, "add", "tracked.txt");
  git(cwd, "commit", "-q", "-m", "base two");
  const baseTwo = git(cwd, "rev-parse", "HEAD");
  git(cwd, "update-ref", "refs/remotes/origin/main", baseOne);

  fs.writeFileSync(path.join(cwd, "tracked.txt"), "candidate\n");
  git(cwd, "add", "tracked.txt");

  return { cwd, baseOne, baseTwo };
}

test("validation receipt verifies only the exact staged and overlay state", (t) => {
  const { cwd } = createRepository(t);
  const state = captureValidationState({ cwd, baseRef: "origin/main" });
  writeValidationReceipt({ cwd, state });

  assert.equal(
    verifyValidationReceipt({ cwd, baseRef: "origin/main" }).valid,
    true
  );

  fs.writeFileSync(path.join(cwd, "ambient.txt"), "ambient two\n");
  const overlayMismatch = verifyValidationReceipt({
    cwd,
    baseRef: "origin/main",
  });
  assert.equal(overlayMismatch.valid, false);
  assert.equal(overlayMismatch.reason, "state mismatch: worktreeOverlayHash");

  fs.writeFileSync(path.join(cwd, "ambient.txt"), "ambient one\n");
  assert.equal(
    verifyValidationReceipt({ cwd, baseRef: "origin/main" }).valid,
    true
  );

  fs.writeFileSync(path.join(cwd, "new-staged.txt"), "new staged content\n");
  git(cwd, "add", "new-staged.txt");
  const stagedMismatch = verifyValidationReceipt({
    cwd,
    baseRef: "origin/main",
  });
  assert.equal(stagedMismatch.valid, false);
  assert.equal(stagedMismatch.reason, "state mismatch: stagedIndexHash");
});

test("publication validation refuses partially staged files before running checks", (t) => {
  const { cwd } = createRepository(t);
  fs.writeFileSync(path.join(cwd, "tracked.txt"), "different unstaged implementation\n");
  let ran = false;
  assert.throws(() => runValidationAndWriteReceipt({ cwd, runCommands: () => { ran = true; } }), /(?:staged|indexed).*tracked\.txt/);
  assert.equal(ran, false);
  assert.equal(fs.existsSync(path.join(cwd, ".local-data/pr-validation/receipt.v1.json")), false);
});

test("a matching snapshot cannot authorize an untested staged version", (t) => {
  const { cwd } = createRepository(t);
  fs.writeFileSync(path.join(cwd, "tracked.txt"), "different unstaged implementation\n");
  writeValidationReceipt({ cwd, state: captureValidationState({ cwd, baseRef: "origin/main" }) });
  const result = verifyValidationReceipt({ cwd, baseRef: "origin/main" });
  assert.equal(result.valid, false);
  assert.match(result.reason, /(?:staged|indexed)/);
});

test("validation receipt invalidates when the comparison base moves", (t) => {
  const { cwd, baseTwo } = createRepository(t);
  const state = captureValidationState({ cwd, baseRef: "origin/main" });
  writeValidationReceipt({ cwd, state });

  git(cwd, "update-ref", "refs/remotes/origin/main", baseTwo);
  const result = verifyValidationReceipt({ cwd, baseRef: "origin/main" });
  assert.equal(result.valid, false);
  assert.equal(result.reason, "state mismatch: originMainOid");
});

test("validation receipt does not cross branch identity", (t) => {
  const { cwd } = createRepository(t);
  const state = captureValidationState({ cwd, baseRef: "origin/main" });
  writeValidationReceipt({ cwd, state });

  git(cwd, "checkout", "-q", "-b", "codex/other-branch");
  const result = verifyValidationReceipt({ cwd, baseRef: "origin/main" });
  assert.equal(result.valid, false);
  assert.equal(result.reason, "state mismatch: branchName");
});

test("validation receipt rejects schema and contract mismatch", (t) => {
  const { cwd } = createRepository(t);
  const state = captureValidationState({ cwd, baseRef: "origin/main" });
  const receipt = writeValidationReceipt({ cwd, state });
  const receiptPath = path.join(
    cwd,
    ".local-data/pr-validation/receipt.v1.json"
  );

  fs.writeFileSync(
    receiptPath,
    `${JSON.stringify({ ...receipt, schema: "wrong" })}\n`
  );
  assert.equal(
    verifyValidationReceipt({ cwd, baseRef: "origin/main" }).reason,
    "receipt schema mismatch"
  );

  fs.writeFileSync(
    receiptPath,
    `${JSON.stringify({
      ...receipt,
      state: { ...state, validatorContractHash: "wrong" },
    })}\n`
  );
  assert.equal(
    verifyValidationReceipt({ cwd, baseRef: "origin/main" }).reason,
    "state mismatch: validatorContractHash"
  );
});

test("validation runner writes only when repository state stays fixed", (t) => {
  const { cwd } = createRepository(t);
  runValidationAndWriteReceipt({
    cwd,
    baseRef: "origin/main",
    runCommands: () => {},
  });
  assert.equal(
    verifyValidationReceipt({ cwd, baseRef: "origin/main" }).valid,
    true
  );

  assert.throws(
    () =>
      runValidationAndWriteReceipt({
        cwd,
        baseRef: "origin/main",
        runCommands: () => {
          fs.writeFileSync(path.join(cwd, "ambient.txt"), "changed during checks\n");
        },
      }),
    /repository state changed during validation: worktreeOverlayHash/
  );
  assert.equal(
    fs.existsSync(
      path.join(cwd, ".local-data/pr-validation/receipt.v1.json")
    ),
    false
  );
});

test("validation state comparison names the first mismatched field", () => {
  const expected = {
    stagedIndexHash: "one",
    worktreeOverlayHash: "two",
    branchName: "three",
    baseRef: "four",
    originMainOid: "five",
    validatorContractHash: "six",
    nodeVersion: "seven",
    gitVersion: "eight",
    platform: "nine",
    architecture: "ten",
  };
  assert.deepEqual(compareValidationStates(expected, expected), {
    equal: true,
    mismatch: null,
  });
  assert.deepEqual(
    compareValidationStates(expected, {
      ...expected,
      worktreeOverlayHash: "changed",
    }),
    { equal: false, mismatch: "worktreeOverlayHash" }
  );
});

test("report-only B errors stay visible and do not change the required A command policy", async (t) => {
  const { runValidationCommands, VALIDATION_COMMANDS } = await import('../scripts/pr-validation-receipt.mjs');
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'option-b-receipt-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  const invoked = [];
  const results = runValidationCommands({ cwd, spawn: (_node, args) => {
    invoked.push(args[0]);
    return args[0].includes('check-moving-single-root-map') ? { status: 1, error: new Error('known B launch failure') } : { status: 0 };
  } });
  assert.deepEqual(invoked.slice(0, 4), ['scripts/prepare-runtime-assets.mjs', 'scripts/check-foundational-impact.mjs', 'scripts/check-content-integrity.mjs', 'scripts/check-animator-runtime-wiring.mjs']);
  assert.equal(invoked.length, 5);
  assert.equal(results.length, 1); assert.equal(results[0].status, 'error'); assert.match(results[0].error, /known B launch failure/);
  assert.equal(VALIDATION_COMMANDS.filter(c => c.reportOnly).length, 1);
  assert.throws(() => runValidationCommands({ cwd, spawn: () => ({ status: 1 }) }), /Prepare ignored runtime assets failed/);
});

test("publication receipt preserves B error explicitly alongside successful required checks", t => {
  const { cwd } = createRepository(t);
  runValidationAndWriteReceipt({ cwd, runCommands: () => [{ name: 'Option B', status: 'error', exitCode: 1 }] });
  const result = verifyValidationReceipt({ cwd });
  assert.equal(result.valid, true);
  assert.deepEqual(result.receipt.reportOnly, [{ name: 'Option B', status: 'error', exitCode: 1 }]);
});


test("a zero-exit B invocation with no new report cannot reuse an old success", async t => {
  const { runValidationCommands } = await import('../scripts/pr-validation-receipt.mjs');
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'option-b-stale-report-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  fs.mkdirSync(path.join(cwd, '.local-data/option-b-trial'), { recursive: true });
  fs.writeFileSync(path.join(cwd, '.local-data/option-b-trial/report.json'), JSON.stringify({ status: 'pass' }));
  const results = runValidationCommands({ cwd, spawn: () => ({ status: 0 }) });
  assert.equal(results[0].status, 'error'); assert.match(results[0].error, /report unavailable/);
});

function createEqualityRepository(t) {
  const fixture = createRepository(t);
  fs.writeFileSync(path.join(fixture.cwd, "requirement.txt"), "old");
  fs.writeFileSync(path.join(fixture.cwd, "dependency.txt"), "old");
  git(fixture.cwd, "add", "requirement.txt", "dependency.txt");
  git(fixture.cwd, "commit", "-q", "-m", "equal inputs");
  return fixture;
}

// Independent acceptance rule retained from the prevention diagnostic: the
// requirement and dependency must have equal contents. It does not consult the
// receipt implementation or derive an expectation from its fingerprint.
function runEqualityConsumer(cwd) {
  const result = spawnSync(process.execPath, ["--input-type=module", "-e",
    "import fs from 'node:fs'; import assert from 'node:assert/strict'; assert.equal(fs.readFileSync('dependency.txt','utf8'),fs.readFileSync('requirement.txt','utf8'));",
  ], { cwd, env: GIT_FIXTURE_ENV, encoding: "utf8", timeout: 3000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
}

function assertCandidateRejected(cwd, expectedPath, consumer = () => {}) {
  let ran = false;
  assert.throws(() => runValidationAndWriteReceipt({
    cwd,
    runCommands: () => { ran = true; consumer(); },
  }), error => {
    assert.match(error.message, /indexed|index|untracked|staged|candidate/i);
    assert.ok(error.message.includes(expectedPath), error.message);
    return true;
  });
  assert.equal(ran, false, "invalid candidate must reject before validation runs");
  assert.equal(fs.existsSync(path.join(cwd, ".local-data/pr-validation/receipt.v1.json")), false);

  // A hand-written matching state snapshot must not bypass the same predicate
  // during reuse, even though writeValidationReceipt itself is a low-level API.
  writeValidationReceipt({ cwd, state: captureValidationState({ cwd }) });
  const reused = verifyValidationReceipt({ cwd });
  assert.equal(reused.valid, false, "matching fingerprint must not authorize mismatched candidate inputs");
  assert.ok(reused.reason.includes(expectedPath), reused.reason);
}

test("independent equality consumer accepts coherent indexed and working inputs", t => {
  const { cwd } = createEqualityRepository(t);
  assert.equal(git(cwd, "show", ":requirement.txt"), "old");
  assert.equal(git(cwd, "show", ":dependency.txt"), "old");
  runEqualityConsumer(cwd);
  runValidationAndWriteReceipt({ cwd, runCommands: () => runEqualityConsumer(cwd) });
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);
});

test("publication rejects a stable unstaged dependency supporting a staged requirement", t => {
  const { cwd } = createEqualityRepository(t);
  fs.writeFileSync(path.join(cwd, "requirement.txt"), "new");
  git(cwd, "add", "requirement.txt");
  fs.writeFileSync(path.join(cwd, "dependency.txt"), "new");
  runEqualityConsumer(cwd);
  assert.equal(git(cwd, "show", ":requirement.txt"), "new");
  assert.equal(git(cwd, "show", ":dependency.txt"), "old");
  assertCandidateRejected(cwd, "dependency.txt", () => runEqualityConsumer(cwd));
  assert.equal(fs.readFileSync(path.join(cwd, "dependency.txt"), "utf8"), "new");
});

test("publication rejects a dependency supplied only by a non-ignored untracked file", t => {
  const { cwd } = createRepository(t);
  fs.writeFileSync(path.join(cwd, "requirement.txt"), "new");
  git(cwd, "add", "requirement.txt");
  fs.writeFileSync(path.join(cwd, "dependency.txt"), "new");
  runEqualityConsumer(cwd);
  assert.equal(git(cwd, "ls-files", "--", "dependency.txt"), "");
  assertCandidateRejected(cwd, "dependency.txt", () => runEqualityConsumer(cwd));
  assert.equal(fs.readFileSync(path.join(cwd, "dependency.txt"), "utf8"), "new");
});

test("publication rejects non-ignored untracked files without changing their contents", t => {
  const { cwd } = createRepository(t);
  fs.writeFileSync(path.join(cwd, "unfinished.md"), "Unfinished independent work.\n");
  assertCandidateRejected(cwd, "unfinished.md");
  assert.equal(fs.readFileSync(path.join(cwd, "unfinished.md"), "utf8"), "Unfinished independent work.\n");
  assert.equal(git(cwd, "ls-files", "--", "unfinished.md"), "");
});

test("publication rejects an indexed dependency missing from working files", t => {
  const { cwd } = createEqualityRepository(t);
  fs.unlinkSync(path.join(cwd, "dependency.txt"));
  assert.equal(git(cwd, "show", ":dependency.txt"), "old");
  assertCandidateRejected(cwd, "dependency.txt");
  assert.equal(fs.existsSync(path.join(cwd, "dependency.txt")), false);
});

test("publication rejects a staged-deleted ignored dependency still on disk", t => {
  const { cwd } = createEqualityRepository(t);
  fs.appendFileSync(path.join(cwd, ".gitignore"), "/dependency.txt\n");
  git(cwd, "add", ".gitignore");
  git(cwd, "rm", "--cached", "--", "dependency.txt");
  assert.equal(git(cwd, "ls-files", "--others", "--exclude-standard"), "");
  runEqualityConsumer(cwd);
  assertCandidateRejected(cwd, "dependency.txt", () => runEqualityConsumer(cwd));
  assert.equal(fs.readFileSync(path.join(cwd, "dependency.txt"), "utf8"), "old");
});

test("publication rejects an ignored deleted dependency restored after the deletion commit", t => {
  const { cwd } = createEqualityRepository(t);
  git(cwd, "update-ref", "refs/remotes/origin/main", git(cwd, "rev-parse", "HEAD"));
  fs.appendFileSync(path.join(cwd, ".gitignore"), "/dependency.txt\n");
  git(cwd, "add", ".gitignore");
  git(cwd, "rm", "--", "dependency.txt");
  git(cwd, "commit", "-q", "-m", "delete dependency");
  runValidationAndWriteReceipt({ cwd, runCommands: () => {} });
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);

  fs.writeFileSync(path.join(cwd, "dependency.txt"), "old");
  assert.equal(git(cwd, "diff", "--cached", "--name-only"), "");
  assert.equal(git(cwd, "ls-files", "--others", "--exclude-standard"), "");
  assert.equal(verifyValidationReceipt({ cwd }).valid, false);
  assertCandidateRejected(cwd, "dependency.txt");
  assert.equal(fs.readFileSync(path.join(cwd, "dependency.txt"), "utf8"), "old");
});

test("publication accepts an indexed file-to-directory replacement before and after commit", t => {
  const { cwd } = createRepository(t);
  git(cwd, "rm", "--", "ambient.txt");
  fs.mkdirSync(path.join(cwd, "ambient.txt"));
  fs.writeFileSync(path.join(cwd, "ambient.txt/child.txt"), "replacement child\n");
  git(cwd, "add", "ambient.txt/child.txt");
  runValidationAndWriteReceipt({ cwd, runCommands: () => {} });
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);
  git(cwd, "commit", "-q", "-m", "replace file by directory");
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);
});

test("publication accepts an indexed directory-to-file replacement before and after commit", t => {
  const { cwd } = createRepository(t);
  fs.mkdirSync(path.join(cwd, "container"));
  fs.writeFileSync(path.join(cwd, "container/child.txt"), "old child\n");
  git(cwd, "add", "container/child.txt");
  git(cwd, "commit", "-q", "-m", "directory control");
  git(cwd, "update-ref", "refs/remotes/origin/main", git(cwd, "rev-parse", "HEAD"));
  git(cwd, "rm", "--", "container/child.txt");
  fs.writeFileSync(path.join(cwd, "container"), "replacement file\n");
  git(cwd, "add", "container");
  runValidationAndWriteReceipt({ cwd, runCommands: () => {} });
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);
  git(cwd, "commit", "-q", "-m", "replace directory by file");
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);
});

test("publication accepts an indexed directory-to-symlink replacement", { skip: process.platform === "win32" }, t => {
  const { cwd } = createRepository(t);
  for (const name of ["container", "destination"]) {
    fs.mkdirSync(path.join(cwd, name));
    fs.writeFileSync(path.join(cwd, name, "child.txt"), "tracked child\n");
    git(cwd, "add", `${name}/child.txt`);
  }
  git(cwd, "commit", "-q", "-m", "directory and symlink destination control");
  git(cwd, "update-ref", "refs/remotes/origin/main", git(cwd, "rev-parse", "HEAD"));
  git(cwd, "rm", "--", "container/child.txt");
  fs.symlinkSync("destination", path.join(cwd, "container"));
  git(cwd, "add", "container");
  assert.equal(fs.readFileSync(path.join(cwd, "container/child.txt"), "utf8"), "tracked child\n");
  runValidationAndWriteReceipt({ cwd, runCommands: () => {} });
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);
  git(cwd, "commit", "-q", "-m", "replace directory by symlink");
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);
});

test("publication rejects hidden changes made by validation before writing a receipt", t => {
  const { cwd } = createEqualityRepository(t);
  git(cwd, "update-index", "--assume-unchanged", "dependency.txt");
  assert.throws(() => runValidationAndWriteReceipt({ cwd, runCommands: () => {
    fs.writeFileSync(path.join(cwd, "dependency.txt"), "changed by validation");
    assert.equal(git(cwd, "diff", "--name-only", "--", "dependency.txt"), "");
  } }), /indexed.*dependency\.txt/);
  assert.equal(fs.existsSync(path.join(cwd, ".local-data/pr-validation/receipt.v1.json")), false);
});

test("publication removes a written receipt when its final check finds hidden changes", t => {
  const { cwd } = createEqualityRepository(t);
  git(cwd, "update-index", "--skip-worktree", "dependency.txt");
  let captures = 0;
  assert.throws(() => runValidationAndWriteReceipt({ cwd, runCommands: () => {}, captureState: options => {
    captures += 1;
    if (captures === 3) {
      assert.equal(fs.existsSync(path.join(cwd, ".local-data/pr-validation/receipt.v1.json")), true);
      fs.writeFileSync(path.join(cwd, "dependency.txt"), "changed after receipt write");
    }
    return captureValidationState(options);
  } }), /indexed.*dependency\.txt/);
  assert.equal(captures, 3);
  assert.equal(fs.existsSync(path.join(cwd, ".local-data/pr-validation/receipt.v1.json")), false);
});

test("the previous partial-staging contract cannot authorize the stronger receipt", async t => {
  const { RECEIPT_SCHEMA, VALIDATION_COMMANDS } = await import("../scripts/pr-validation-receipt.mjs");
  const { cwd } = createRepository(t);
  const previousContract = crypto.createHash("sha256").update(JSON.stringify({
    schema: RECEIPT_SCHEMA,
    commands: VALIDATION_COMMANDS,
    fingerprint: "staged-index+unstaged-binary-diff+untracked-content+base+toolchain+reject-partially-staged-paths",
  })).digest("hex");
  const state = captureValidationState({ cwd });
  assert.notEqual(previousContract, state.validatorContractHash);
  writeValidationReceipt({ cwd, state: { ...state, validatorContractHash: previousContract } });
  const result = verifyValidationReceipt({ cwd });
  assert.equal(result.valid, false);
  assert.equal(result.reason, "state mismatch: validatorContractHash");
});

test("publication rejects unmerged index entries", t => {
  const { cwd } = createRepository(t);
  const blob = git(cwd, "rev-parse", ":ambient.txt");
  const input = `0 ${"0".repeat(blob.length)}\tambient.txt\n` +
    [1, 2, 3].map(stage => `100644 ${blob} ${stage}\tambient.txt\n`).join("");
  execFileSync("git", ["update-index", "--index-info"], { cwd, env: GIT_FIXTURE_ENV, input });
  assert.match(git(cwd, "ls-files", "--unmerged", "--", "ambient.txt"), / 1\tambient\.txt/);
  assertCandidateRejected(cwd, "ambient.txt");
});

test("publication rejects unsupported gitlink index entries", t => {
  const { cwd, baseTwo } = createRepository(t);
  fs.mkdirSync(path.join(cwd, "gitlink"));
  git(cwd, "update-index", "--add", "--cacheinfo", `160000,${baseTwo},gitlink`);
  assert.match(git(cwd, "ls-files", "--stage", "--", "gitlink"), /^160000 /);
  assertCandidateRejected(cwd, "gitlink");
});

for (const flag of ["--assume-unchanged", "--skip-worktree"]) {
  test(`publication rejects dependency changes hidden by ${flag}`, t => {
    const { cwd } = createEqualityRepository(t);
    git(cwd, "update-index", flag, "dependency.txt");
    fs.writeFileSync(path.join(cwd, "requirement.txt"), "new");
    git(cwd, "add", "requirement.txt");
    fs.writeFileSync(path.join(cwd, "dependency.txt"), "new");
    assert.equal(git(cwd, "diff", "--name-only", "--", "dependency.txt"), "");
    runEqualityConsumer(cwd);
    assertCandidateRejected(cwd, "dependency.txt", () => runEqualityConsumer(cwd));
    assert.equal(fs.readFileSync(path.join(cwd, "dependency.txt"), "utf8"), "new");
  });
}

test("publication compares indexed raw bytes despite a configured clean filter", t => {
  const { cwd } = createRepository(t);
  fs.writeFileSync(path.join(cwd, "dependency.txt"), "old\n");
  fs.writeFileSync(path.join(cwd, ".gitattributes"), "dependency.txt filter=receipt-normalize\n");
  git(cwd, "config", "filter.receipt-normalize.clean", "sed s/new/old/g");
  git(cwd, "add", ".gitattributes", "dependency.txt");
  git(cwd, "commit", "-q", "-m", "raw dependency control");
  fs.writeFileSync(path.join(cwd, "dependency.txt"), "new\n");
  assert.equal(git(cwd, "diff", "--name-only", "--", "dependency.txt"), "");
  assert.equal(git(cwd, "show", ":dependency.txt"), "old");
  assertCandidateRejected(cwd, "dependency.txt");
});

test("publication rejects executable mode drift when Git ignores file modes", { skip: process.platform === "win32" }, t => {
  const { cwd } = createRepository(t);
  git(cwd, "config", "core.fileMode", "false");
  fs.chmodSync(path.join(cwd, "ambient.txt"), 0o755);
  assert.equal(git(cwd, "diff", "--name-only", "--", "ambient.txt"), "");
  assertCandidateRejected(cwd, "ambient.txt");
});

test("publication accepts matching executable and symlink index entries", { skip: process.platform === "win32" }, t => {
  const { cwd } = createRepository(t);
  fs.writeFileSync(path.join(cwd, "runner.sh"), "#!/bin/sh\nexit 0\n");
  fs.chmodSync(path.join(cwd, "runner.sh"), 0o755);
  fs.symlinkSync("ambient.txt", path.join(cwd, "ambient-link"));
  git(cwd, "add", "runner.sh", "ambient-link");
  assert.match(git(cwd, "ls-files", "--stage", "runner.sh"), /^100755 /);
  assert.match(git(cwd, "ls-files", "--stage", "ambient-link"), /^120000 /);
  runValidationAndWriteReceipt({ cwd, runCommands: () => {} });
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);
});

test("publication rejects a regular source replaced by a same-content symlink", { skip: process.platform === "win32" }, t => {
  const { cwd } = createRepository(t);
  fs.writeFileSync(path.join(cwd, "target.txt"), "ambient one\n");
  git(cwd, "add", "target.txt");
  fs.unlinkSync(path.join(cwd, "ambient.txt"));
  fs.symlinkSync("target.txt", path.join(cwd, "ambient.txt"));
  assert.equal(fs.readFileSync(path.join(cwd, "ambient.txt"), "utf8"), "ambient one\n");
  assertCandidateRejected(cwd, "ambient.txt");
  assert.equal(fs.lstatSync(path.join(cwd, "ambient.txt")).isSymbolicLink(), true);
});

test("publication rejects symlink target drift and a staged-deleted dangling symlink", { skip: process.platform === "win32" }, t => {
  const { cwd } = createRepository(t);
  fs.symlinkSync("ambient.txt", path.join(cwd, "dependency-link"));
  git(cwd, "add", "dependency-link");
  git(cwd, "commit", "-q", "-m", "symlink control");
  fs.unlinkSync(path.join(cwd, "dependency-link"));
  fs.symlinkSync("missing-target", path.join(cwd, "dependency-link"));
  assertCandidateRejected(cwd, "dependency-link");

  fs.appendFileSync(path.join(cwd, ".gitignore"), "/dependency-link\n");
  git(cwd, "add", ".gitignore");
  git(cwd, "rm", "--cached", "--", "dependency-link");
  assert.equal(git(cwd, "ls-files", "--others", "--exclude-standard"), "");
  assertCandidateRejected(cwd, "dependency-link");
  assert.equal(fs.lstatSync(path.join(cwd, "dependency-link")).isSymbolicLink(), true);
});

test("publication preserves supported ignored runtime output during validation", t => {
  const { cwd } = createRepository(t);
  const runtimePath = path.join(cwd, ".local-data/pr-validation/fixture-runtime.json");
  runValidationAndWriteReceipt({ cwd, runCommands: () => {
    fs.mkdirSync(path.dirname(runtimePath), { recursive: true });
    fs.writeFileSync(runtimePath, '{"generated":true}\n');
  } });
  assert.equal(verifyValidationReceipt({ cwd }).valid, true);
  assert.equal(fs.readFileSync(runtimePath, "utf8"), '{"generated":true}\n');
});

test("validation children remove all eight inherited repository-scoped Git variables", async t => {
  const { runValidationCommands, VALIDATION_COMMANDS } = await import("../scripts/pr-validation-receipt.mjs");
  const { cwd: sentinel } = createRepository(t);
  const { cwd } = createRepository(t);
  const variables = {
    GIT_DIR: path.join(sentinel, ".git"),
    GIT_WORK_TREE: sentinel,
    GIT_INDEX_FILE: path.join(sentinel, ".git/index"),
    GIT_PREFIX: "sentinel/",
    GIT_COMMON_DIR: path.join(sentinel, ".git"),
    GIT_OBJECT_DIRECTORY: path.join(sentinel, ".git/objects"),
    GIT_ALTERNATE_OBJECT_DIRECTORIES: path.join(sentinel, ".git/objects"),
    GIT_NAMESPACE: "sentinel",
  };
  const previous = new Map(Object.keys(variables).map(name => [name, process.env[name]]));
  const originalConfig = fs.readFileSync(path.join(sentinel, ".git/config"));
  const probe = env => {
    const output = execFileSync("git", ["rev-parse", "--absolute-git-dir"], { cwd, env, encoding: "utf8" });
    assert.equal(fs.realpathSync(output.trim()), fs.realpathSync(path.join(cwd, ".git")));
  };
  probe(GIT_FIXTURE_ENV);
  const calls = [];
  try {
    Object.assign(process.env, variables);
    runValidationCommands({ cwd, spawn: (_node, args, options) => {
      for (const name of Object.keys(variables)) assert.equal(Object.hasOwn(options.env, name), false, name);
      probe(options.env);
      calls.push(args[0]);
      const reporting = VALIDATION_COMMANDS.find(command => command.args[0] === args[0] && command.reportOnly);
      if (reporting) {
        const reportPath = path.join(cwd, reporting.reportPath);
        fs.mkdirSync(path.dirname(reportPath), { recursive: true });
        fs.writeFileSync(reportPath, JSON.stringify({ status: "pass" }));
      }
      return { status: 0 };
    } });
  } finally {
    for (const [name, value] of previous) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
  assert.deepEqual(calls, VALIDATION_COMMANDS.map(command => command.args[0]));
  assert.deepEqual(fs.readFileSync(path.join(sentinel, ".git/config")), originalConfig);
});

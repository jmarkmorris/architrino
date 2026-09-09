import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
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
  git(cwd, "add", ".gitignore", "tracked.txt");
  git(cwd, "commit", "-q", "-m", "base one");
  const baseOne = git(cwd, "rev-parse", "HEAD");

  fs.writeFileSync(path.join(cwd, "tracked.txt"), "base two\n");
  git(cwd, "add", "tracked.txt");
  git(cwd, "commit", "-q", "-m", "base two");
  const baseTwo = git(cwd, "rev-parse", "HEAD");
  git(cwd, "update-ref", "refs/remotes/origin/main", baseOne);

  fs.writeFileSync(path.join(cwd, "tracked.txt"), "candidate\n");
  git(cwd, "add", "tracked.txt");
  fs.writeFileSync(path.join(cwd, "ambient.txt"), "ambient one\n");

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
  assert.throws(() => runValidationAndWriteReceipt({ cwd, runCommands: () => { ran = true; } }), /staged files differ from tested working files: tracked.txt/);
  assert.equal(ran, false);
  assert.equal(fs.existsSync(path.join(cwd, ".local-data/pr-validation/receipt.v1.json")), false);
});

test("a matching snapshot cannot authorize an untested staged version", (t) => {
  const { cwd } = createRepository(t);
  fs.writeFileSync(path.join(cwd, "tracked.txt"), "different unstaged implementation\n");
  writeValidationReceipt({ cwd, state: captureValidationState({ cwd, baseRef: "origin/main" }) });
  const result = verifyValidationReceipt({ cwd, baseRef: "origin/main" });
  assert.equal(result.valid, false);
  assert.match(result.reason, /staged files differ from tested working files/);
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

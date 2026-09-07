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

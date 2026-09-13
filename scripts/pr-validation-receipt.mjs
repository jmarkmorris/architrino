#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mathematicalAcceptanceSelection from './equation-mapping/fixtures/mathematical-acceptance-selection.json' with { type: 'json' };

export const RECEIPT_SCHEMA = "pr-validation-receipt.v1";
export const DEFAULT_RECEIPT_PATH =
  ".local-data/pr-validation/receipt.v1.json";

export const VALIDATION_COMMANDS = [
  {
    name: "Prepare ignored runtime assets",
    args: ["scripts/prepare-runtime-assets.mjs", "--write"],
  },
  {
    name: "Foundational impact",
    args: [
      "scripts/check-foundational-impact.mjs",
      "--base",
      "<base-ref>",
      "--run",
    ],
  },
  {
    name: "Content Integrity",
    args: ["scripts/check-content-integrity.mjs", "--profile=local"],
  },
  {
    name: "Animator runtime wiring",
    args: ["scripts/check-animator-runtime-wiring.mjs"],
  },
  {
    name: "Option B two-chain trial (report-only)",
    args: ["scripts/equation-mapping/check-moving-single-root-map.mjs", "--acceptance-sha256", mathematicalAcceptanceSelection.acceptance.sha256],
    reportOnly: true,
    reportPath: ".local-data/option-b-trial/report.json",
  },
];

function sha256(parts) {
  const hash = crypto.createHash("sha256");
  for (const part of parts) {
    hash.update(part);
  }
  return hash.digest("hex");
}

// Environment for child checks. Git exports GIT_DIR, GIT_WORK_TREE, and
// GIT_INDEX_FILE to hooks; a child that runs `git init` or `git config` in a
// temporary directory would otherwise act on this repository.
const REPO_SCOPED_GIT_VARIABLES = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_PREFIX", "GIT_COMMON_DIR", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_NAMESPACE"];
function childEnvironment(env = process.env) {
  const child = { ...env };
  for (const name of REPO_SCOPED_GIT_VARIABLES) delete child[name];
  return child;
}

function runGit(args, { cwd, encoding = "utf8" }) {
  const result = spawnSync("git", args, {
    cwd,
    encoding,
    maxBuffer: 1024 * 1024 * 256,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    const detail = String(result.stderr ?? result.stdout ?? "").trim();
    throw new Error(`git ${args.join(" ")} failed: ${detail || `exit ${result.status}`}`);
  }
  return result.stdout;
}

function resolveInsideRoot(cwd, relativePath) {
  const root = path.resolve(cwd);
  const resolved = path.resolve(root, relativePath);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    throw new Error(`path escapes repository root: ${relativePath}`);
  }
  return resolved;
}

function hashUntrackedFiles(cwd) {
  const output = runGit(
    ["ls-files", "--others", "--exclude-standard", "-z"],
    { cwd, encoding: "buffer" }
  );
  const paths = output
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .sort();
  const parts = [];

  for (const relativePath of paths) {
    const absolutePath = resolveInsideRoot(cwd, relativePath);
    const stat = fs.lstatSync(absolutePath);
    parts.push(Buffer.from(`${relativePath}\0`));
    if (stat.isSymbolicLink()) {
      parts.push(Buffer.from("symlink\0"));
      parts.push(Buffer.from(fs.readlinkSync(absolutePath)));
    } else if (stat.isFile()) {
      parts.push(Buffer.from("file\0"));
      parts.push(fs.readFileSync(absolutePath));
    } else {
      parts.push(Buffer.from(`other:${stat.mode}\0`));
    }
    parts.push(Buffer.from("\0"));
  }

  return sha256(parts);
}

export function validationContractHash() {
  return sha256([
    JSON.stringify({
      schema: RECEIPT_SCHEMA,
      commands: VALIDATION_COMMANDS,
      fingerprint:
        "staged-index+unstaged-binary-diff+untracked-content+base+toolchain+raw-index-alignment+reject-untracked+absent-head-and-base-deletions.v1",
    }),
  ]);
}

export function captureValidationState({
  cwd = process.cwd(),
  baseRef = "origin/main",
} = {}) {
  const stagedIndex = runGit(["ls-files", "--stage", "-z"], {
    cwd,
    encoding: "buffer",
  });
  const unstagedDiff = runGit(
    ["diff", "--no-ext-diff", "--binary", "--full-index", "--"],
    { cwd, encoding: "buffer" }
  );
  const originMainOid = String(
    runGit(["rev-parse", "--verify", baseRef], { cwd })
  ).trim();
  const branchName = String(
    runGit(["rev-parse", "--abbrev-ref", "HEAD"], { cwd })
  ).trim();
  const gitVersion = String(runGit(["--version"], { cwd })).trim();

  return {
    stagedIndexHash: sha256([stagedIndex]),
    worktreeOverlayHash: sha256([
      unstagedDiff,
      Buffer.from(hashUntrackedFiles(cwd)),
    ]),
    branchName,
    baseRef,
    originMainOid,
    validatorContractHash: validationContractHash(),
    nodeVersion: process.version,
    gitVersion,
    platform: process.platform,
    architecture: process.arch,
  };
}

// Git diff can suppress changes through index flags, stat caching, file-mode
// settings, or clean filters. Compare the bytes actually read by checks with
// Git's indexed blob identity instead of trusting those optimizations.
function indexedFileBlob(absolutePath, mode, objectFormat, buffer) {
  const before = fs.lstatSync(absolutePath, { bigint: true });
  const unchanged = after => ["dev", "ino", "mode", "size", "mtimeNs", "ctimeNs"].every(key => before[key] === after[key]);
  const hash = crypto.createHash(objectFormat);
  if (mode === "120000") {
    if (!before.isSymbolicLink()) throw new Error("expected an indexed symlink");
    const target = fs.readlinkSync(absolutePath, { encoding: "buffer" });
    hash.update(`blob ${target.length}\0`);
    hash.update(target);
  } else {
    if (!before.isFile()) throw new Error("expected an indexed regular file");
    const actualMode = (before.mode & 0o111n) !== 0n ? "100755" : "100644";
    if (actualMode !== mode) throw new Error("executable mode differs from index");
    const fd = fs.openSync(absolutePath, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
    try {
      if (!unchanged(fs.fstatSync(fd, { bigint: true }))) throw new Error("file changed while opening");
      hash.update(`blob ${before.size}\0`);
      let total = 0n;
      for (let count; (count = fs.readSync(fd, buffer, 0, buffer.length, null)) > 0;) {
        total += BigInt(count);
        hash.update(buffer.subarray(0, count));
      }
      if (total !== before.size || !unchanged(fs.fstatSync(fd, { bigint: true }))) throw new Error("file changed while reading");
    } finally {
      fs.closeSync(fd);
    }
  }
  if (!unchanged(fs.lstatSync(absolutePath, { bigint: true }))) throw new Error("file changed while reading");
  return hash.digest("hex");
}

export function assertWorktreeMatchesIndex({ cwd = process.cwd(), baseRef = "origin/main" } = {}) {
  const names = args => String(runGit(args, { cwd })).split("\0").filter(Boolean);
  const untracked = names(["ls-files", "--others", "--exclude-standard", "-z"]);
  if (untracked.length) throw new Error(`non-ignored untracked files are outside the indexed candidate: ${untracked.join(", ")}`);
  const root = fs.realpathSync(cwd);
  const objectFormat = String(runGit(["rev-parse", "--show-object-format"], { cwd })).trim();
  if (!["sha1", "sha256"].includes(objectFormat)) throw new Error(`unsupported index object format: ${objectFormat}`);
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  const indexedPaths = new Set();
  for (const entry of names(["ls-files", "--stage", "-z"])) {
    const parsed = /^([0-7]{6}) ([a-f0-9]+) ([0-3])\t([\s\S]+)$/.exec(entry);
    if (!parsed) throw new Error(`malformed index entry: ${entry}`);
    const [, mode, oid, stage, relativePath] = parsed;
    indexedPaths.add(relativePath);
    try {
      if (stage !== "0") throw new Error("unmerged index entry");
      if (!["100644", "100755", "120000"].includes(mode)) throw new Error(`unsupported index mode ${mode}`);
      const absolutePath = resolveInsideRoot(root, relativePath);
      if (fs.realpathSync(path.dirname(absolutePath)) !== path.dirname(absolutePath)) throw new Error("indexed path has a symlinked parent");
      if (indexedFileBlob(absolutePath, mode, objectFormat, buffer) !== oid) throw new Error("raw working bytes differ from indexed blob");
    } catch (error) {
      throw new Error(`working files differ from indexed candidate at ${relativePath}: ${error.message}`);
    }
  }
  // Ignored copies of removed inputs can still be consumed. Include the base
  // comparison because HEAD has advanced when the pre-push hook reuses a receipt.
  const deleted = new Set(["HEAD", baseRef].flatMap(ref => names(["diff", "--cached", "--no-ext-diff", "--no-renames", "--diff-filter=D", "--name-only", "-z", ref, "--"])));
  for (const relativePath of deleted) {
    // An indexed file or symlink may intentionally replace a former directory.
    // Its bytes/target have already been checked; former children are no longer
    // independent candidate paths (and lstat below could otherwise hit ENOTDIR).
    let ancestor = path.posix.dirname(relativePath);
    while (ancestor !== "." && !indexedPaths.has(ancestor)) ancestor = path.posix.dirname(ancestor);
    if (indexedPaths.has(ancestor)) continue;
    const stat = fs.lstatSync(resolveInsideRoot(root, relativePath), { throwIfNoEntry: false });
    // A staged file-to-directory replacement legitimately retains a directory.
    if (stat?.isDirectory() && [...indexedPaths].some(name => name.startsWith(`${relativePath}/`))) continue;
    if (stat) throw new Error(`deleted indexed candidate path still exists in working files: ${relativePath}`);
  }
}

export function compareValidationStates(expected, actual) {
  const keys = [
    "stagedIndexHash",
    "worktreeOverlayHash",
    "branchName",
    "baseRef",
    "originMainOid",
    "validatorContractHash",
    "nodeVersion",
    "gitVersion",
    "platform",
    "architecture",
  ];
  for (const key of keys) {
    if (expected?.[key] !== actual?.[key]) {
      return { equal: false, mismatch: key };
    }
  }
  return { equal: true, mismatch: null };
}

function resolveReceiptPath(cwd, receiptPath = DEFAULT_RECEIPT_PATH) {
  return resolveInsideRoot(cwd, receiptPath);
}

export function writeValidationReceipt({
  cwd = process.cwd(),
  receiptPath = DEFAULT_RECEIPT_PATH,
  state,
  reportOnly = [],
}) {
  const absolutePath = resolveReceiptPath(cwd, receiptPath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  const temporaryPath = `${absolutePath}.${process.pid}.tmp`;
  const receipt = {
    schema: RECEIPT_SCHEMA,
    createdAt: new Date().toISOString(),
    state,
    reportOnly,
  };
  fs.writeFileSync(temporaryPath, `${JSON.stringify(receipt, null, 2)}\n`);
  fs.renameSync(temporaryPath, absolutePath);
  return receipt;
}

export function removeValidationReceipt({
  cwd = process.cwd(),
  receiptPath = DEFAULT_RECEIPT_PATH,
} = {}) {
  const absolutePath = resolveReceiptPath(cwd, receiptPath);
  fs.rmSync(absolutePath, { force: true });
}

export function verifyValidationReceipt({
  cwd = process.cwd(),
  baseRef = "origin/main",
  receiptPath = DEFAULT_RECEIPT_PATH,
} = {}) {
  const absolutePath = resolveReceiptPath(cwd, receiptPath);
  if (!fs.existsSync(absolutePath)) {
    return { valid: false, reason: "receipt missing" };
  }

  let receipt;
  try {
    receipt = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch {
    return { valid: false, reason: "receipt unreadable" };
  }
  if (receipt?.schema !== RECEIPT_SCHEMA) {
    return { valid: false, reason: "receipt schema mismatch" };
  }

  let current;
  try {
    current = captureValidationState({ cwd, baseRef });
  } catch (error) {
    return {
      valid: false,
      reason: `state capture failed: ${error.message}`,
    };
  }
  const comparison = compareValidationStates(receipt.state, current);
  if (!comparison.equal) {
    return {
      valid: false,
      reason: `state mismatch: ${comparison.mismatch}`,
      receipt,
      current,
    };
  }
  try {
    assertWorktreeMatchesIndex({ cwd, baseRef });
  } catch (error) {
    return { valid: false, reason: error.message, receipt, current };
  }
  return { valid: true, reason: "exact validation state match", receipt, current };
}

function concreteValidationCommands(baseRef) {
  return VALIDATION_COMMANDS.map((command) => ({
    ...command,
    args: command.args.map((arg) => (arg === "<base-ref>" ? baseRef : arg)),
  }));
}

export function runValidationCommands({
  cwd = process.cwd(),
  baseRef = "origin/main",
  spawn = spawnSync,
} = {}) {
  const reportingResults = [];
  for (const command of concreteValidationCommands(baseRef)) {
    console.log(`[pr-validation] running ${command.name}...`);
    let result;
    try {
      // A previous B report must never stand in for an unexecuted invocation.
      if (command.reportOnly) fs.rmSync(resolveInsideRoot(cwd, command.reportPath), { force: true });
      result = spawn(process.execPath, command.args, {
        cwd,
        env: childEnvironment(),
        stdio: "inherit",
      });
    } catch (error) { result = { status: null, error }; }
    if (command.reportOnly) {
      const outcome = { name: command.name, status: "error", exitCode: result.status ?? null, reportPath: command.reportPath };
      try {
        const raw = fs.readFileSync(resolveInsideRoot(cwd, command.reportPath));
        const report = JSON.parse(raw);
        outcome.reportSha256 = sha256([raw]);
        outcome.reportedStatus = report.status;
        if (!result.error && result.status === 0 && ["pass", "review-required"].includes(report.status)) outcome.status = report.status;
      } catch (error) { outcome.error = `report unavailable: ${error.message}`; }
      if (result.error) outcome.error = result.error.message;
      reportingResults.push(outcome);
      console.log(`[pr-validation] REPORT-ONLY ${outcome.status}: ${command.name}; ${command.reportPath}. Existing required checks retain authority.`);
      continue;
    }
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      throw new Error(`${command.name} failed with exit ${result.status ?? 1}`);
    }
  }
  return reportingResults;
}

export function runValidationAndWriteReceipt({
  cwd = process.cwd(),
  baseRef = "origin/main",
  receiptPath = DEFAULT_RECEIPT_PATH,
  captureState = captureValidationState,
  runCommands = runValidationCommands,
} = {}) {
  removeValidationReceipt({ cwd, receiptPath });
  assertWorktreeMatchesIndex({ cwd, baseRef });
  const before = captureState({ cwd, baseRef });
  const reportOnly = runCommands({ cwd, baseRef }) ?? [];
  const after = captureState({ cwd, baseRef });
  const stableDuringChecks = compareValidationStates(before, after);
  if (!stableDuringChecks.equal) {
    throw new Error(
      `repository state changed during validation: ${stableDuringChecks.mismatch}`
    );
  }

  assertWorktreeMatchesIndex({ cwd, baseRef });
  writeValidationReceipt({ cwd, receiptPath, state: after, reportOnly });
  try {
    const finalState = captureState({ cwd, baseRef });
    const stableAfterWrite = compareValidationStates(after, finalState);
    if (!stableAfterWrite.equal) {
      throw new Error(
        `repository state changed while writing receipt: ${stableAfterWrite.mismatch}`
      );
    }
    assertWorktreeMatchesIndex({ cwd, baseRef });
  } catch (error) {
    removeValidationReceipt({ cwd, receiptPath });
    throw error;
  }
  return after;
}

function optionValue(argv, name, fallback) {
  const index = argv.indexOf(name);
  return index >= 0 ? argv[index + 1] ?? fallback : fallback;
}

function runCli() {
  const argv = process.argv.slice(2);
  const command = argv.find((argument) => !argument.startsWith("-")) ?? "verify";
  const baseRef = optionValue(argv, "--base", "origin/main");
  const receiptPath = optionValue(
    argv,
    "--receipt",
    DEFAULT_RECEIPT_PATH
  );
  const options = { cwd: process.cwd(), baseRef, receiptPath };

  if (command === "verify") {
    const result = verifyValidationReceipt(options);
    console.log(`[pr-validation] ${result.valid ? "receipt valid" : "receipt miss"}: ${result.reason}.`);
    process.exitCode = result.valid ? 0 : 1;
    return;
  }
  if (command === "run") {
    try {
      runValidationAndWriteReceipt(options);
      console.log(`[pr-validation] receipt written: ${receiptPath}.`);
    } catch (error) {
      removeValidationReceipt(options);
      console.error(`[pr-validation] validation failed: ${error.message}`);
      process.exitCode = 1;
    }
    return;
  }
  if (command === "state") {
    console.log(JSON.stringify(captureValidationState(options), null, 2));
    return;
  }
  console.error(`Usage: node scripts/pr-validation-receipt.mjs <verify|run|state> [--base <ref>] [--receipt <path>]`);
  process.exitCode = 2;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath && fileURLToPath(import.meta.url) === invokedPath) {
  runCli();
}

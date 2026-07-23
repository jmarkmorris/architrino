#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const RECEIPT_SCHEMA = "pr-validation-receipt.v1";
export const DEFAULT_RECEIPT_PATH =
  ".local-data/pr-validation/receipt.v1.json";

export const VALIDATION_COMMANDS = [
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
    args: ["scripts/check-content-integrity.mjs"],
  },
  {
    name: "Animator runtime wiring",
    args: ["scripts/check-animator-runtime-wiring.mjs"],
  },
];

function sha256(parts) {
  const hash = crypto.createHash("sha256");
  for (const part of parts) {
    hash.update(part);
  }
  return hash.digest("hex");
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
        "staged-index+unstaged-binary-diff+untracked-content+base+toolchain",
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
}) {
  const absolutePath = resolveReceiptPath(cwd, receiptPath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  const temporaryPath = `${absolutePath}.${process.pid}.tmp`;
  const receipt = {
    schema: RECEIPT_SCHEMA,
    createdAt: new Date().toISOString(),
    state,
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
  return { valid: true, reason: "exact validation state match", receipt, current };
}

function concreteValidationCommands(baseRef) {
  return VALIDATION_COMMANDS.map((command) => ({
    name: command.name,
    args: command.args.map((arg) => (arg === "<base-ref>" ? baseRef : arg)),
  }));
}

export function runValidationCommands({
  cwd = process.cwd(),
  baseRef = "origin/main",
} = {}) {
  for (const command of concreteValidationCommands(baseRef)) {
    console.log(`[pr-validation] running ${command.name}...`);
    const result = spawnSync(process.execPath, command.args, {
      cwd,
      env: process.env,
      stdio: "inherit",
    });
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      throw new Error(`${command.name} failed with exit ${result.status ?? 1}`);
    }
  }
}

export function runValidationAndWriteReceipt({
  cwd = process.cwd(),
  baseRef = "origin/main",
  receiptPath = DEFAULT_RECEIPT_PATH,
  captureState = captureValidationState,
  runCommands = runValidationCommands,
} = {}) {
  removeValidationReceipt({ cwd, receiptPath });
  const before = captureState({ cwd, baseRef });
  runCommands({ cwd, baseRef });
  const after = captureState({ cwd, baseRef });
  const stableDuringChecks = compareValidationStates(before, after);
  if (!stableDuringChecks.equal) {
    throw new Error(
      `repository state changed during validation: ${stableDuringChecks.mismatch}`
    );
  }

  writeValidationReceipt({ cwd, receiptPath, state: after });
  const finalState = captureState({ cwd, baseRef });
  const stableAfterWrite = compareValidationStates(after, finalState);
  if (!stableAfterWrite.equal) {
    removeValidationReceipt({ cwd, receiptPath });
    throw new Error(
      `repository state changed while writing receipt: ${stableAfterWrite.mismatch}`
    );
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

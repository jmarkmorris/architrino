#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_POLICY_PATH = "reference/op/owned-compute-launch-policy.v1.json";
const SCHEMA = "architrino.owned-compute-launch-policy.v1";
const DETACHED_PATTERN = /\bdetached\s*:\s*true\b/gu;

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function collectJavaScript(rootDir, relativeDirectory, files = []) {
  const absolute = path.join(rootDir, relativeDirectory);
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const relative = path.posix.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) collectJavaScript(rootDir, relative, files);
    else if (/\.(?:cjs|js|mjs)$/u.test(entry.name)) files.push(relative);
  }
  return files;
}

export function discoverDetachedLaunches(rootDir) {
  const records = [];
  for (const relativePath of [...collectJavaScript(rootDir, "scripts"), ...collectJavaScript(rootDir, "src")].sort()) {
    const source = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
    const occurrences = [...source.matchAll(DETACHED_PATTERN)].length;
    if (occurrences > 0) records.push({ path: relativePath, occurrences });
  }
  return records;
}

export function checkOwnedComputeLaunchPolicy({ rootDir = ROOT, policyPath = DEFAULT_POLICY_PATH, policy: suppliedPolicy = null } = {}) {
  rootDir = path.resolve(rootDir);
  const policy = suppliedPolicy ?? JSON.parse(fs.readFileSync(path.join(rootDir, policyPath), "utf8"));
  requireCondition(policy.schema === SCHEMA, "invalid owned-compute launch policy schema");
  requireCondition(policy.status === "accepted", "owned-compute launch policy is not accepted");
  requireCondition(Array.isArray(policy.allowedDetachedLaunchers), "allowed detached launchers are missing");
  const expected = policy.allowedDetachedLaunchers.map(({ path: relativePath, occurrences, owner }) => {
    requireCondition(typeof relativePath === "string" && relativePath.length > 0 && !path.isAbsolute(relativePath), "detached launcher path must be repository-relative");
    requireCondition(Number.isSafeInteger(occurrences) && occurrences > 0, `${relativePath}: occurrence count must be positive`);
    requireCondition(typeof owner === "string" && owner.length > 0, `${relativePath}: owner is missing`);
    return { path: relativePath, occurrences };
  }).sort((left, right) => left.path.localeCompare(right.path));
  requireCondition(new Set(expected.map((row) => row.path)).size === expected.length, "detached launcher policy contains duplicate paths");
  const actual = discoverDetachedLaunches(rootDir);
  requireCondition(JSON.stringify(actual) === JSON.stringify(expected), `detached process launch inventory changed\nexpected: ${JSON.stringify(expected)}\nactual: ${JSON.stringify(actual)}`);
  requireCondition(expected.some((row) => row.path === policy.canonicalSupervisor), "canonical supervisor is absent from the detached-launch inventory");
  return { schema: SCHEMA, status: "passed", canonicalSupervisor: policy.canonicalSupervisor, launchers: actual };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  requireCondition(args.length === 0 || (args.length === 2 && args[0] === "--policy"), "Usage: check-owned-compute-launch-policy.mjs [--policy <path>]");
  console.log(JSON.stringify(checkOwnedComputeLaunchPolicy({ policyPath: args[1] ?? DEFAULT_POLICY_PATH }), null, 2));
}

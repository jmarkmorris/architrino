#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const DEFAULT_MANIFEST = "scripts/config/foundational-impact-contracts.json";
const DEFAULT_BRANCH_BASE = "origin/main";
const GIT_MAX_BUFFER_BYTES = 128 * 1024 * 1024;
const TEXT_EXTENSIONS = new Set([
  ".c",
  ".cc",
  ".cpp",
  ".css",
  ".h",
  ".hpp",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".mm",
  ".py",
  ".swift",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml",
]);

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

const manifest = readManifest(args.manifest);
validateManifest(manifest);

if (args.listContracts) {
  printContractList(manifest);
  process.exit(0);
}

const changeSet = args.allContracts
  ? allContractsChangeSet(manifest)
  : collectChangeSet(args);
const report = buildImpactReport(manifest, changeSet, args);

if (args.json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  printReport(report, args);
}

if (args.run) {
  const runResult = runImpactedChecks(report);
  if (runResult.failed.length > 0) {
    process.exit(runResult.failed[0].status ?? 1);
  }
}

if (!args.warnOnly && args.strict && report.summary.impactedContracts > 0) {
  process.exit(1);
}

function parseArgs(argv) {
  const options = {
    manifest: DEFAULT_MANIFEST,
    base: null,
    baseProvided: false,
    branchBase: DEFAULT_BRANCH_BASE,
    branchBaseProvided: false,
    staged: false,
    working: false,
    allContracts: false,
    listContracts: false,
    strict: false,
    warnOnly: false,
    run: false,
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--manifest") {
      options.manifest = requireValue(argv, (index += 1), arg);
    } else if (arg.startsWith("--manifest=")) {
      options.manifest = arg.slice("--manifest=".length);
    } else if (arg === "--base") {
      options.base = requireValue(argv, (index += 1), arg);
      options.baseProvided = true;
    } else if (arg.startsWith("--base=")) {
      options.base = arg.slice("--base=".length);
      options.baseProvided = true;
    } else if (arg === "--branch-base") {
      options.branchBase = requireValue(argv, (index += 1), arg);
      options.branchBaseProvided = true;
    } else if (arg.startsWith("--branch-base=")) {
      options.branchBase = arg.slice("--branch-base=".length);
      options.branchBaseProvided = true;
    } else if (arg === "--staged") {
      options.staged = true;
    } else if (arg === "--working") {
      options.working = true;
    } else if (arg === "--all-contracts") {
      options.allContracts = true;
    } else if (arg === "--list-contracts") {
      options.listContracts = true;
    } else if (arg === "--strict") {
      options.strict = true;
    } else if (arg === "--warn-only") {
      options.warnOnly = true;
    } else if (arg === "--run") {
      options.run = true;
    } else if (arg === "--json") {
      options.json = true;
    } else {
      fail(`Unknown argument: ${arg}`);
    }
  }

  if (options.staged && options.working) {
    fail("Use at most one of --staged or --working.");
  }
  if (options.baseProvided && options.branchBaseProvided) {
    fail("Use --base for an exact comparison ref or --branch-base for branch accumulation, not both.");
  }

  return options;
}

function requireValue(argv, index, flag) {
  if (index >= argv.length || argv[index].startsWith("--")) {
    fail(`${flag} requires a value.`);
  }
  return argv[index];
}

function printHelp() {
  console.log(`Usage: node scripts/check-foundational-impact.mjs [options]

Options:
  --branch-base REF   Compare accumulated branch changes against merge-base with REF. Defaults to ${DEFAULT_BRANCH_BASE}.
  --base REF          Compare against an exact ref instead of branch accumulation.
  --staged           Inspect staged changes only.
  --working          Inspect unstaged changes only.
  --all-contracts    Print the full foundational contract dependency map.
  --manifest PATH    Use a custom manifest path. Defaults to ${DEFAULT_MANIFEST}.
  --list-contracts   List contract ids and titles.
  --strict           Exit nonzero when any contract is impacted.
  --warn-only        Always exit zero, even with impacts.
  --run              Execute the deduplicated reevaluation commands for impacted contracts.
  --json             Print machine-readable JSON.
  --help             Show this help.

This checker routes equation, postulate, sign-convention, and normalization
changes to the proof-program, simulation, application, solver, and validation
checks declared in the foundational-impact manifest.`);
}

function readManifest(relativeOrAbsolutePath) {
  const manifestPath = path.resolve(ROOT_DIR, relativeOrAbsolutePath);
  if (!fs.existsSync(manifestPath)) {
    fail(`Manifest not found: ${path.relative(ROOT_DIR, manifestPath)}`);
  }
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    fail(`Could not parse manifest: ${error.message}`);
  }
}

function validateManifest(manifest) {
  if (manifest.schema !== "aaa-foundational-impact-contracts/v1") {
    fail("Manifest schema must be aaa-foundational-impact-contracts/v1.");
  }
  if (!Array.isArray(manifest.contracts) || manifest.contracts.length === 0) {
    fail("Manifest must contain a nonempty contracts array.");
  }

  const ids = new Set();
  for (const [index, contract] of manifest.contracts.entries()) {
    const label = `contracts[${index}]`;
    assertNonemptyString(contract.id, `${label}.id`);
    if (ids.has(contract.id)) {
      fail(`Duplicate contract id: ${contract.id}`);
    }
    ids.add(contract.id);
    assertNonemptyString(contract.title, `${label}.title`);
    assertNonemptyString(contract.severity, `${label}.severity`);
    if (!Object.hasOwn(manifest.severityWeights ?? {}, contract.severity)) {
      fail(`${contract.id} uses unknown severity ${contract.severity}.`);
    }
    if (!Array.isArray(contract.pathTriggers)) {
      fail(`${contract.id}.pathTriggers must be an array.`);
    }
    if (!Array.isArray(contract.textTriggers)) {
      fail(`${contract.id}.textTriggers must be an array.`);
    }
    for (const trigger of contract.textTriggers) {
      if (!["literal", "regex"].includes(trigger.type)) {
        fail(`${contract.id} has unsupported text trigger type: ${trigger.type}`);
      }
      assertNonemptyString(trigger.value, `${contract.id}.textTriggers.value`);
      if (trigger.type === "regex") {
        try {
          new RegExp(trigger.value, "i");
        } catch (error) {
          fail(`${contract.id} has invalid regex ${trigger.value}: ${error.message}`);
        }
      }
    }
  }
}

function assertNonemptyString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${label} must be a nonempty string.`);
  }
}

function collectChangeSet(options) {
  const diffArgs = ["diff", "--unified=0", "--no-ext-diff", "--no-color"];
  let mode = "working";
  if (options.staged) {
    diffArgs.push("--cached");
    mode = "staged";
  } else if (!options.working) {
    const comparison = resolveComparisonBase(options);
    diffArgs.push(comparison.diffRef);
    mode = comparison.mode;
  }
  diffArgs.push("--", ...diffPathspecs(manifest));

  const diff = runGit(diffArgs, "read git diff");
  const status = runGit(["status", "--porcelain=v1", "--untracked-files=all"], "read git status");
  const parsedDiff = parseUnifiedDiff(diff);
  const statusEntries = parseStatus(status);

  for (const entry of statusEntries) {
    if (!options.staged && entry.code === "??") {
      addUntrackedFile(parsedDiff, entry.path);
    }
  }

  const ignoredPaths = ignoredPathMatchers(manifest);
  const files = [...parsedDiff.values()]
    .filter((file) => !ignoredPaths.some((matcher) => matcher(file.path)))
    .sort((left, right) => left.path.localeCompare(right.path));

  return {
    mode,
    files,
  };
}

function resolveComparisonBase(options) {
  if (options.baseProvided) {
    return {
      diffRef: options.base,
      mode: `base:${options.base}`,
    };
  }

  const branchBase = resolveBranchMergeBase(options.branchBase, options.branchBaseProvided);
  return {
    diffRef: branchBase.mergeBase,
    mode: `branch:${branchBase.ref}@${branchBase.mergeBase.slice(0, 12)}`,
  };
}

function resolveBranchMergeBase(preferredRef, strict) {
  const candidates = strict
    ? [preferredRef]
    : uniqueStrings([preferredRef, DEFAULT_BRANCH_BASE, "main", "origin/master", "master"]);

  for (const candidate of candidates) {
    if (!tryGit(["rev-parse", "--verify", `${candidate}^{commit}`])) {
      continue;
    }
    const mergeBase = tryGit(["merge-base", "HEAD", candidate]);
    if (mergeBase) {
      return {
        ref: candidate,
        mergeBase: mergeBase.trim(),
      };
    }
  }

  fail(
    strict
      ? `Could not resolve a merge-base with ${preferredRef}.`
      : `Could not resolve a branch merge-base. Tried: ${candidates.join(", ")}.`,
  );
}

function runGit(gitArgs, action) {
  const result = spawnSync("git", gitArgs, {
    cwd: ROOT_DIR,
    encoding: "utf8",
    maxBuffer: GIT_MAX_BUFFER_BYTES,
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.error) {
    fail(`Could not ${action}: ${result.error.message}`);
  }
  if (result.status !== 0) {
    fail(`Could not ${action}: ${result.stderr.trim() || `git exited ${result.status}`}`);
  }
  return result.stdout;
}

function tryGit(gitArgs) {
  const result = spawnSync("git", gitArgs, {
    cwd: ROOT_DIR,
    encoding: "utf8",
    maxBuffer: GIT_MAX_BUFFER_BYTES,
    stdio: ["ignore", "pipe", "pipe"],
  });
  return result.status === 0 ? result.stdout : null;
}

function parseUnifiedDiff(diffText) {
  const files = new Map();
  let current = null;

  for (const line of diffText.split(/\r?\n/)) {
    if (line.startsWith("diff --git ")) {
      const match = /^diff --git a\/(.+?) b\/(.+)$/.exec(line);
      const filePath = match ? normalizePath(match[2]) : null;
      current = filePath ? ensureFile(files, filePath) : null;
      continue;
    }
    if (!current) {
      continue;
    }
    if (line.startsWith("+++ b/")) {
      current.path = normalizePath(line.slice("+++ b/".length));
      continue;
    }
    if (line.startsWith("+") && !line.startsWith("+++")) {
      current.changedText.push(line.slice(1));
      continue;
    }
    if (line.startsWith("-") && !line.startsWith("---")) {
      current.changedText.push(line.slice(1));
    }
  }

  return files;
}

function ensureFile(files, relativePath) {
  const normalized = normalizePath(relativePath);
  if (!files.has(normalized)) {
    files.set(normalized, {
      path: normalized,
      changedText: [],
      status: "modified",
    });
  }
  return files.get(normalized);
}

function parseStatus(statusText) {
  const entries = [];
  for (const line of statusText.split(/\r?\n/)) {
    if (!line.trim()) {
      continue;
    }
    const code = line.slice(0, 2);
    const rawPath = line.slice(3);
    const renameIndex = rawPath.indexOf(" -> ");
    const relativePath = renameIndex === -1 ? rawPath : rawPath.slice(renameIndex + 4);
    entries.push({
      code,
      path: normalizePath(relativePath),
    });
  }
  return entries;
}

function ignoredPathMatchers(manifest) {
  return (manifest.diffIgnorePaths ?? []).map((trigger) => (filePath) =>
    matchesPathTrigger(filePath, trigger),
  );
}

function diffPathspecs(manifest) {
  const excludes = (manifest.diffIgnorePaths ?? []).map(
    (trigger) => `:(exclude)${normalizePath(trigger)}`,
  );
  return [".", ...excludes];
}

function addUntrackedFile(files, relativePath) {
  const normalized = normalizePath(relativePath);
  const absolutePath = path.join(ROOT_DIR, normalized);
  if (!fs.existsSync(absolutePath)) {
    return;
  }
  const stat = fs.statSync(absolutePath);
  if (!stat.isFile()) {
    return;
  }
  if (!TEXT_EXTENSIONS.has(path.extname(normalized))) {
    ensureFile(files, normalized).status = "untracked";
    return;
  }
  const file = ensureFile(files, normalized);
  file.status = "untracked";
  file.changedText = fs.readFileSync(absolutePath, "utf8").split(/\r?\n/);
}

function allContractsChangeSet(manifest) {
  return {
    mode: "all-contracts",
    files: manifest.contracts.map((contract) => ({
      path: `contract:${contract.id}`,
      changedText: contract.textTriggers.map((trigger) => trigger.value),
      status: "contract-inventory",
      forcedContractId: contract.id,
    })),
  };
}

function buildImpactReport(manifest, changeSet, options) {
  const impacts = [];
  const impactedCheckKeys = new Set();
  const proofCheckKeys = new Set();
  const baselineProofContracts = manifest.contracts.filter((contract) =>
    hasReevaluationGroup(contract, "proofPrograms"),
  );

  for (const contract of manifest.contracts) {
    const match = matchContract(contract, changeSet.files);
    if (!match.impacted) {
      continue;
    }
    const checks = flattenChecks(contract.reevaluation);
    for (const check of checks) {
      impactedCheckKeys.add(`${check.group}\0${check.command}`);
      if (check.group === "proofPrograms") {
        proofCheckKeys.add(check.command);
      }
    }
    impacts.push({
      id: contract.id,
      title: contract.title,
      severity: contract.severity,
      score: manifest.severityWeights[contract.severity],
      rationale: contract.rationale,
      changedFiles: match.changedFiles,
      matches: match.matches,
      consumers: contract.consumers ?? {},
      reevaluation: contract.reevaluation ?? {},
    });
  }

  impacts.sort((left, right) => {
    const scoreDelta = right.score - left.score;
    return scoreDelta !== 0 ? scoreDelta : left.id.localeCompare(right.id);
  });

  const impactScore = impacts.reduce((sum, impact) => sum + impact.score, 0);
  const proofImpactScore = impacts
    .filter((impact) => hasReevaluationGroup({ reevaluation: impact.reevaluation }, "proofPrograms"))
    .reduce((sum, impact) => sum + impact.score, 0);

  return {
    schema: "aaa-foundational-impact-report/v1",
    mode: changeSet.mode,
    manifest: options.manifest,
    changedFiles: changeSet.files.map((file) => file.path),
    summary: {
      totalContracts: manifest.contracts.length,
      impactedContracts: impacts.length,
      impactScore,
      impactedChecks: impactedCheckKeys.size,
      proofProgram: {
        impactScore: proofImpactScore,
        impactedContracts: impacts.filter((impact) =>
          hasReevaluationGroup({ reevaluation: impact.reevaluation }, "proofPrograms"),
        ).length,
        impactedChecks: proofCheckKeys.size,
        coverageContracts: baselineProofContracts.length,
        coverageTotal: manifest.contracts.length,
      },
    },
    impacts,
  };
}

function matchContract(contract, files) {
  const changedFiles = [];
  const matches = [];

  for (const file of files) {
    if (file.forcedContractId) {
      if (file.forcedContractId === contract.id) {
        changedFiles.push(file.path);
        matches.push({
          file: file.path,
          type: "inventory",
          value: contract.id,
        });
      }
      continue;
    }

    const pathMatches = contract.pathTriggers.filter((trigger) => matchesPathTrigger(file.path, trigger));
    for (const trigger of pathMatches) {
      matches.push({
        file: file.path,
        type: "path",
        value: trigger,
      });
    }

    const changedText = file.changedText.join("\n");
    for (const trigger of contract.textTriggers) {
      if (matchesTextTrigger(changedText, trigger)) {
        matches.push({
          file: file.path,
          type: trigger.type,
          value: trigger.value,
        });
      }
    }

    if (pathMatches.length > 0 || matches.some((match) => match.file === file.path)) {
      changedFiles.push(file.path);
    }
  }

  return {
    impacted: matches.length > 0,
    changedFiles: [...new Set(changedFiles)].sort((left, right) => left.localeCompare(right)),
    matches,
  };
}

function matchesPathTrigger(filePath, trigger) {
  const normalizedFile = normalizePath(filePath);
  const normalizedTrigger = normalizePath(trigger);
  if (normalizedTrigger.endsWith("/**")) {
    return normalizedFile.startsWith(normalizedTrigger.slice(0, -3));
  }
  if (normalizedTrigger.includes("*")) {
    const regex = new RegExp(
      `^${escapeRegex(normalizedTrigger)
        .replace(/\\\*\\\*/g, ".*")
        .replace(/\\\*/g, "[^/]*")}$`,
    );
    return regex.test(normalizedFile);
  }
  return normalizedFile === normalizedTrigger;
}

function matchesTextTrigger(text, trigger) {
  if (!text) {
    return false;
  }
  if (trigger.type === "literal") {
    return text.toLowerCase().includes(trigger.value.toLowerCase());
  }
  return new RegExp(trigger.value, "i").test(text);
}

function flattenChecks(reevaluation = {}) {
  const checks = [];
  for (const [group, groupChecks] of Object.entries(reevaluation)) {
    if (!Array.isArray(groupChecks)) {
      continue;
    }
    for (const check of groupChecks) {
      checks.push({
        group,
        command: check.command,
        reason: check.reason,
      });
    }
  }
  return checks;
}

function hasReevaluationGroup(contract, group) {
  return Array.isArray(contract.reevaluation?.[group]) && contract.reevaluation[group].length > 0;
}

function printContractList(manifest) {
  console.log("[foundational-impact] contracts");
  for (const contract of manifest.contracts) {
    console.log(`- ${contract.severity} ${contract.id}: ${contract.title}`);
  }
}

function printReport(report, options) {
  console.log(`[foundational-impact] mode: ${report.mode}`);
  console.log(`[foundational-impact] changed files: ${report.changedFiles.length}`);
  console.log(
    `[foundational-impact] impacted contracts: ${report.summary.impactedContracts}/${report.summary.totalContracts}; impact score: ${report.summary.impactScore}`,
  );
  console.log(
    `[foundational-impact] proof-program score: ${report.summary.proofProgram.impactScore}; impacted proof checks: ${report.summary.proofProgram.impactedChecks}; manifest proof coverage: ${report.summary.proofProgram.coverageContracts}/${report.summary.proofProgram.coverageTotal}`,
  );

  if (report.impacts.length === 0) {
    console.log("[foundational-impact] no foundational contract impacts detected");
    return;
  }

  for (const impact of report.impacts) {
    console.log("");
    console.log(`[${impact.severity}] ${impact.id}: ${impact.title}`);
    console.log(`  score: ${impact.score}`);
    console.log(`  rationale: ${impact.rationale}`);
    console.log(`  changed files: ${impact.changedFiles.join(", ")}`);
    console.log(`  match summary: ${summarizeMatches(impact.matches)}`);
    printConsumers(impact.consumers);
  }

  console.log("");
  console.log("[foundational-impact] reevaluation commands");
  for (const entry of dedupeCommandEntries(report)) {
    console.log(`- ${entry.group}: ${entry.command}`);
    console.log(`  contracts: ${[...entry.contracts].sort().join(", ")}`);
    console.log(`  reason: ${[...entry.reasons].sort().join(" / ")}`);
  }

  if (options.strict && !options.warnOnly) {
    console.log("");
    console.log("[foundational-impact] strict mode would fail until the impact is acknowledged or checks run");
  }
}

function dedupeCommandEntries(report) {
  const commandGroups = new Map();
  for (const impact of report.impacts) {
    for (const check of flattenChecks(impact.reevaluation)) {
      const key = `${check.group}\0${check.command}`;
      if (!commandGroups.has(key)) {
        commandGroups.set(key, {
          group: check.group,
          command: check.command,
          reasons: new Set(),
          contracts: new Set(),
        });
      }
      commandGroups.get(key).reasons.add(check.reason);
      commandGroups.get(key).contracts.add(impact.id);
    }
  }
  return [...commandGroups.values()].sort(compareCommandEntries);
}

function runImpactedChecks(report) {
  const entries = dedupeCommandEntries(report);
  const passed = [];
  const failed = [];

  if (entries.length === 0) {
    console.log("[foundational-impact] no impacted commands to run");
    return { passed, failed };
  }

  console.log("");
  console.log(`[foundational-impact] running ${entries.length} impacted command(s)`);
  for (const [index, entry] of entries.entries()) {
    console.log("");
    console.log(`[foundational-impact] run ${index + 1}/${entries.length} (${entry.group})`);
    console.log(`[foundational-impact] $ ${entry.command}`);
    const result = spawnSync(entry.command, {
      cwd: ROOT_DIR,
      shell: true,
      stdio: "inherit",
    });
    if (result.error) {
      console.error(`[foundational-impact] failed to start: ${result.error.message}`);
      failed.push({ ...entry, status: 1, error: result.error.message });
      break;
    }
    if (result.status !== 0) {
      const detail = result.signal ? `signal ${result.signal}` : `exit ${result.status ?? 1}`;
      console.error(`[foundational-impact] failed: ${entry.command} (${detail})`);
      failed.push({ ...entry, status: result.status ?? 1, signal: result.signal ?? null });
      break;
    }
    passed.push(entry);
  }

  console.log("");
  console.log(
    `[foundational-impact] run summary: ${passed.length} passed, ${failed.length} failed, ${entries.length - passed.length - failed.length} not run`,
  );
  return { passed, failed };
}

function summarizeMatches(matches) {
  const buckets = new Map();
  for (const match of matches) {
    const key = `${match.type}:${match.value}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return [...buckets.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, count]) => `${key}${count > 1 ? ` (${count})` : ""}`)
    .join("; ");
}

function printConsumers(consumers = {}) {
  for (const group of ["proofPrograms", "simulations", "applications", "validation"]) {
    const entries = consumers[group];
    if (!Array.isArray(entries) || entries.length === 0) {
      continue;
    }
    console.log(`  ${group}: ${entries.join(", ")}`);
  }
}

function compareCommandEntries(left, right) {
  const groupOrder = ["validation", "proofPrograms", "simulations", "applications", "solver"];
  const leftIndex = groupOrder.indexOf(left.group);
  const rightIndex = groupOrder.indexOf(right.group);
  const normalizedLeftIndex = leftIndex === -1 ? groupOrder.length : leftIndex;
  const normalizedRightIndex = rightIndex === -1 ? groupOrder.length : rightIndex;
  if (normalizedLeftIndex !== normalizedRightIndex) {
    return normalizedLeftIndex - normalizedRightIndex;
  }
  return left.command.localeCompare(right.command);
}

function normalizePath(value) {
  return String(value).replace(/\\/g, "/").replace(/^\.\//, "");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.trim() !== ""))];
}

function fail(message) {
  console.error(`[foundational-impact] ${message}`);
  process.exit(1);
}

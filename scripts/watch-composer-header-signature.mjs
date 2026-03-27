import { statSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawn } from "node:child_process";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const OUTPUT_PATH = resolve(REPO_ROOT, ".tmp/composer-header-signature.json");
const GENERATE_SCRIPT_PATH = resolve(SCRIPT_DIR, "generate-composer-header-signature.mjs");
const REGEN_DEBOUNCE_MS = 200;
const POLL_INTERVAL_MS = 1000;

let regenTimeoutId = null;
let isClosed = false;
let pollIntervalId = null;
let lastFingerprint = "";

function runGit(args) {
  try {
    return execFileSync("git", args, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch (_error) {
    return "";
  }
}

function listGitFiles(args) {
  return runGit(args)
    .split(/\r?\n/g)
    .map((value) => value.trim())
    .filter(Boolean);
}

function getRepoFingerprint() {
  const trackedFiles = listGitFiles(["ls-files"]);
  const untrackedFiles = listGitFiles(["ls-files", "--others", "--exclude-standard"]);
  const files = [...new Set([...trackedFiles, ...untrackedFiles])]
    .map((relativePath) => resolve(REPO_ROOT, relativePath))
    .filter((absolutePath) => absolutePath !== OUTPUT_PATH);
  let latestMs = 0;
  let latestPath = "";
  files.forEach((absolutePath) => {
    try {
      const candidateMs = Number(statSync(absolutePath).mtimeMs);
      if (!Number.isFinite(candidateMs)) {
        return;
      }
      if (candidateMs > latestMs) {
        latestMs = candidateMs;
        latestPath = absolutePath;
      }
    } catch (_error) {
      // Ignore files that disappeared during the scan.
    }
  });
  return JSON.stringify({
    fileCount: files.length,
    latestMs: Math.round(latestMs),
    latestPath,
  });
}

function runGenerator() {
  return new Promise((resolveRun) => {
    const child = spawn(process.execPath, [GENERATE_SCRIPT_PATH], {
      cwd: REPO_ROOT,
      stdio: "inherit",
    });
    child.on("exit", () => {
      resolveRun();
    });
    child.on("error", () => {
      resolveRun();
    });
  });
}

function scheduleRegeneration() {
  if (isClosed) {
    return;
  }
  if (regenTimeoutId !== null) {
    clearTimeout(regenTimeoutId);
  }
  regenTimeoutId = setTimeout(() => {
    regenTimeoutId = null;
    void runGenerator();
  }, REGEN_DEBOUNCE_MS);
}

async function startPolling() {
  await runGenerator();
  lastFingerprint = getRepoFingerprint();
  pollIntervalId = setInterval(() => {
    if (isClosed) {
      return;
    }
    const nextFingerprint = getRepoFingerprint();
    if (nextFingerprint === lastFingerprint) {
      return;
    }
    lastFingerprint = nextFingerprint;
    scheduleRegeneration();
  }, POLL_INTERVAL_MS);
}

function closeWatcher() {
  if (isClosed) {
    return;
  }
  isClosed = true;
  if (regenTimeoutId !== null) {
    clearTimeout(regenTimeoutId);
    regenTimeoutId = null;
  }
  if (pollIntervalId !== null) {
    clearInterval(pollIntervalId);
    pollIntervalId = null;
  }
}

process.on("SIGINT", () => {
  closeWatcher();
  process.exit(0);
});

process.on("SIGTERM", () => {
  closeWatcher();
  process.exit(0);
});

await startPolling();

process.stdout.write(
  `watching composer header signature in ${REPO_ROOT}${sep}\n`
);

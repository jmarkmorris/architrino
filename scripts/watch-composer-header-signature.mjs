import { watch } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const WATCH_IGNORED_SEGMENTS = new Set([".git", ".tmp"]);
const GENERATE_SCRIPT_PATH = resolve(SCRIPT_DIR, "generate-composer-header-signature.mjs");
const REGEN_DEBOUNCE_MS = 200;

let regenTimeoutId = null;
let isClosed = false;

function shouldIgnore(relativePath) {
  if (typeof relativePath !== "string" || !relativePath) {
    return false;
  }
  return relativePath
    .split(/[\\/]+/)
    .some((segment) => WATCH_IGNORED_SEGMENTS.has(segment));
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

await runGenerator();

const watcher = watch(
  REPO_ROOT,
  {
    recursive: true,
  },
  (_eventType, filename) => {
    const relativePath = typeof filename === "string" ? filename : String(filename ?? "");
    if (shouldIgnore(relativePath)) {
      return;
    }
    scheduleRegeneration();
  }
);

function closeWatcher() {
  if (isClosed) {
    return;
  }
  isClosed = true;
  if (regenTimeoutId !== null) {
    clearTimeout(regenTimeoutId);
    regenTimeoutId = null;
  }
  watcher.close();
}

process.on("SIGINT", () => {
  closeWatcher();
  process.exit(0);
});

process.on("SIGTERM", () => {
  closeWatcher();
  process.exit(0);
});

process.stdout.write(
  `watching composer header signature in ${REPO_ROOT}${sep}\n`
);

import { execFile } from "node:child_process";
import { existsSync, statSync, watch } from "node:fs";
import { dirname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
export const DEFAULT_REPO_ROOT = resolve(SCRIPT_DIR, "../..");
export const DEFAULT_PDG_LIVE_ARTIFACT_REFRESH_SCRIPT_PATH = resolve(
  DEFAULT_REPO_ROOT,
  "scripts/pdg/pdg_refresh_live_artifacts.py"
);
export const DEFAULT_PDG_LIVE_ARTIFACT_WATCH_RELATIVE_PATHS = Object.freeze([
  "scripts/pdg",
  "pdgfeed.py",
  "pdgsolve.py",
  "src/apps/pdgedit",
]);

export function normalizeRepoRelativePath(path = "") {
  return normalize(String(path || ""))
    .replaceAll("\\", "/")
    .replace(/^\.\/+/u, "")
    .replace(/^\/+/u, "");
}

export function isPdgLiveArtifactSourcePath(relativePath = "") {
  const normalizedPath = normalizeRepoRelativePath(relativePath);
  return (
    normalizedPath === "pdgfeed.py" ||
    normalizedPath === "pdgsolve.py" ||
    normalizedPath.startsWith("scripts/pdg/") ||
    normalizedPath.startsWith("src/apps/pdgedit/")
  );
}

export function isPdgLiveArtifactRequestPath(requestUrl = "/") {
  const pathname = new URL(requestUrl, "http://127.0.0.1").pathname;
  return (
    pathname.startsWith("/.tmp/pdgsolve/") ||
    pathname.startsWith("/stats/pdgfeed.") ||
    pathname === "/content/contracts/examples/pdg/v1/generated/supported_reaction_primitive_deltas.v1.csv"
  );
}

function formatRefreshFailure(error, stderr) {
  const message = String(error?.message || error || "PDG live artifact refresh failed").trim();
  const details = String(stderr || "").trim();
  return details ? `${message}\n${details}` : message;
}

function resolvePreferredPythonExecutablePath() {
  const preferredPath = "/Users/markmorris/vibe/.venv/bin/python";
  return existsSync(preferredPath) ? preferredPath : "python3";
}

function buildRefreshEnvironment(baseEnvironment = process.env, pythonExecutablePath = "") {
  const environment = { ...baseEnvironment };
  const normalizedPythonPath = String(pythonExecutablePath || "");
  const venvBinSuffix = "/bin/python";
  if (normalizedPythonPath.endsWith(venvBinSuffix)) {
    environment.VIRTUAL_ENV = normalizedPythonPath.slice(0, -venvBinSuffix.length);
  }
  return environment;
}

export function createPdgLiveArtifactRuntime({
  repoRootPath = DEFAULT_REPO_ROOT,
  refreshScriptPath = DEFAULT_PDG_LIVE_ARTIFACT_REFRESH_SCRIPT_PATH,
  pythonExecutablePath = resolvePreferredPythonExecutablePath(),
  watchRelativePaths = DEFAULT_PDG_LIVE_ARTIFACT_WATCH_RELATIVE_PATHS,
  refreshDebounceMs = 150,
  execFileImpl = execFile,
  watchImpl = watch,
  environment = process.env,
  log = () => {},
} = {}) {
  let closed = false;
  let started = false;
  let dirty = true;
  let queuedRefreshTimer = null;
  let activeRefreshPromise = null;
  const watchers = [];

  function writeLogLine(message) {
    const text = String(message || "").trim();
    if (text) {
      log(text);
    }
  }

  function clearQueuedRefreshTimer() {
    if (queuedRefreshTimer !== null) {
      clearTimeout(queuedRefreshTimer);
      queuedRefreshTimer = null;
    }
  }

  function runRefresh(reason = "manual") {
    if (activeRefreshPromise) {
      return activeRefreshPromise;
    }
    clearQueuedRefreshTimer();
    activeRefreshPromise = new Promise((resolvePromise, rejectPromise) => {
      queueMicrotask(() => {
        execFileImpl(
          pythonExecutablePath,
          [refreshScriptPath],
          {
            cwd: repoRootPath,
            env: buildRefreshEnvironment(environment, pythonExecutablePath),
          },
          (error, stdout, stderr) => {
            activeRefreshPromise = null;
            if (error) {
              dirty = true;
              rejectPromise(new Error(formatRefreshFailure(error, stderr)));
              return;
            }
            dirty = false;
            const summary = String(stdout || "")
              .trim()
              .split(/\r?\n/u)
              .filter(Boolean);
            if (summary.length) {
              writeLogLine(`[pdg] refreshed live artifacts after ${reason}`);
            }
            resolvePromise(summary);
          }
        );
      });
    });
    return activeRefreshPromise;
  }

  function queueRefresh(reason = "change") {
    if (closed || queuedRefreshTimer !== null) {
      return;
    }
    queuedRefreshTimer = setTimeout(() => {
      queuedRefreshTimer = null;
      runRefresh(reason).catch((error) => {
        writeLogLine(`[pdg] ${String(error?.message || error).trim()}`);
      });
    }, refreshDebounceMs);
  }

  function markDirty(reason = "change") {
    dirty = true;
    queueRefresh(reason);
  }

  function handleSourcePathChange(relativePath = "") {
    if (!isPdgLiveArtifactSourcePath(relativePath)) {
      return false;
    }
    markDirty(relativePath);
    return true;
  }

  function handleWatchEvent(watchedRelativePath, filename) {
    const changedRelativePath = filename
      ? normalizeRepoRelativePath(join(watchedRelativePath, String(filename)))
      : normalizeRepoRelativePath(watchedRelativePath);
    if (handleSourcePathChange(changedRelativePath)) {
      return;
    }
    markDirty(changedRelativePath);
  }

  function start() {
    if (started || closed) {
      return;
    }
    started = true;
    watchRelativePaths.forEach((relativePath) => {
      const absolutePath = resolve(repoRootPath, relativePath);
      if (!existsSync(absolutePath)) {
        return;
      }
      const isDirectory = statSync(absolutePath).isDirectory();
      const watcher = watchImpl(
        absolutePath,
        isDirectory ? { recursive: true } : {},
        (_eventType, filename) => {
          handleWatchEvent(relativePath, filename);
        }
      );
      if (typeof watcher?.on === "function") {
        watcher.on("error", (error) => {
          writeLogLine(`[pdg] watcher error: ${String(error?.message || error).trim()}`);
        });
      }
      watchers.push(watcher);
    });
    queueRefresh("startup");
  }

  function ensureFreshForRequest(requestUrl = "/") {
    if (!isPdgLiveArtifactRequestPath(requestUrl)) {
      return Promise.resolve([]);
    }
    if (!dirty) {
      return Promise.resolve([]);
    }
    return runRefresh(`request ${requestUrl}`);
  }

  function close() {
    if (closed) {
      return;
    }
    closed = true;
    clearQueuedRefreshTimer();
    watchers.splice(0).forEach((watcher) => {
      if (typeof watcher?.close === "function") {
        watcher.close();
      }
    });
  }

  return {
    close,
    ensureFreshForRequest,
    handleSourcePathChange,
    isPdgLiveArtifactRequestPath,
    isPdgLiveArtifactSourcePath,
    markDirty,
    start,
  };
}

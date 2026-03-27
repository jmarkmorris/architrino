import { createReadStream, existsSync, statSync } from "node:fs";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "../..");
const WATCHER_PATH = resolve(REPO_ROOT, "scripts/watch-composer-header-signature.mjs");
const PORT = Number.parseInt(process.env.PORT ?? "5173", 10);
const HOST = process.env.HOST ?? "127.0.0.1";

const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
]);

let watcherClosed = false;

function getContentType(filePath) {
  return MIME_TYPES.get(extname(filePath).toLowerCase()) ?? "application/octet-stream";
}

function resolveRequestPath(requestUrl = "/") {
  const url = new URL(requestUrl, `http://${HOST}:${PORT}`);
  const decodedPath = decodeURIComponent(url.pathname);
  const relativePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  let absolutePath = resolve(REPO_ROOT, `.${relativePath}`);
  if (!absolutePath.startsWith(REPO_ROOT)) {
    return null;
  }
  if (existsSync(absolutePath) && statSync(absolutePath).isDirectory()) {
    absolutePath = join(absolutePath, "index.html");
  }
  return absolutePath;
}

function sendNotFound(response) {
  response.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end("Not found");
}

function serveFile(request, response) {
  const filePath = resolveRequestPath(request.url);
  if (!filePath || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    sendNotFound(response);
    return;
  }
  response.writeHead(200, {
    "Content-Type": getContentType(filePath),
    "Cache-Control": filePath.includes(`${join(".tmp", "composer-header-signature.json")}`)
      ? "no-store"
      : "no-cache",
  });
  createReadStream(filePath).pipe(response);
}

const watcher = spawn(process.execPath, [WATCHER_PATH], {
  cwd: REPO_ROOT,
  stdio: "inherit",
});

function closeWatcher() {
  if (watcherClosed) {
    return;
  }
  watcherClosed = true;
  watcher.kill("SIGTERM");
}

const server = createServer((request, response) => {
  try {
    serveFile(request, response);
  } catch (_error) {
    response.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end("Internal server error");
  }
});

server.listen(PORT, HOST, () => {
  process.stdout.write(`local dev server: http://${HOST}:${PORT}/\n`);
});

watcher.on("exit", (code, signal) => {
  if (watcherClosed) {
    return;
  }
  watcherClosed = true;
  process.stderr.write(
    `composer header watcher exited unexpectedly (${signal ?? code ?? "unknown"})\n`
  );
});

function shutdown(exitCode = 0) {
  closeWatcher();
  server.close(() => {
    process.exit(exitCode);
  });
  setTimeout(() => {
    process.exit(exitCode);
  }, 250).unref();
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createDevServerHttpCacheHeaders,
  isFreshDevServerHttpCacheRequest,
} from "./DevServerHttpCache.mjs";
import { createPdgLiveArtifactRuntime } from "./PdgLiveArtifactRuntime.mjs";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "../..");
const PORT = Number.parseInt(process.env.PORT ?? "5173", 10);
const HOST = process.env.HOST ?? "127.0.0.1";

function isEnabledEnvironmentFlag(value = "") {
  return /^(1|true|yes|on)$/iu.test(String(value || "").trim());
}

const pdgLiveArtifactRuntime = isEnabledEnvironmentFlag(process.env.PDG_LIVE_ARTIFACTS)
  ? createPdgLiveArtifactRuntime({
      repoRootPath: REPO_ROOT,
      log(message) {
        process.stdout.write(`${String(message).trim()}\n`);
      },
    })
  : null;

const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".wasm", "application/wasm"],
  [".webp", "image/webp"],
]);

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
  const fileStats = filePath && existsSync(filePath) ? statSync(filePath) : null;
  if (!filePath || !fileStats || fileStats.isDirectory()) {
    sendNotFound(response);
    return;
  }

  const cacheHeaders = createDevServerHttpCacheHeaders(fileStats);
  if (isFreshDevServerHttpCacheRequest(request, cacheHeaders)) {
    response.writeHead(304, {
      "Cache-Control": "no-cache",
      ...cacheHeaders,
    });
    response.end();
    return;
  }

  response.writeHead(200, {
    "Content-Type": getContentType(filePath),
    "Cache-Control": "no-cache",
    ...cacheHeaders,
  });
  createReadStream(filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  try {
    await pdgLiveArtifactRuntime?.ensureFreshForRequest(request.url);
    serveFile(request, response);
  } catch (error) {
    response.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end(String(error?.message || "Internal server error"));
  }
});

server.listen(PORT, HOST, () => {
  process.stdout.write(`local dev server: http://${HOST}:${PORT}/\n`);
  if (!pdgLiveArtifactRuntime) {
    process.stdout.write("[pdg] live artifact refresh disabled; set PDG_LIVE_ARTIFACTS=1 to enable.\n");
  }
});
pdgLiveArtifactRuntime?.start();

function shutdown(exitCode = 0) {
  pdgLiveArtifactRuntime?.close();
  server.close(() => {
    process.exit(exitCode);
  });
  setTimeout(() => {
    process.exit(exitCode);
  }, 250).unref();
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

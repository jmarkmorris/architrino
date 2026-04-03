import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "../..");
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
    "Cache-Control": "no-cache",
  });
  createReadStream(filePath).pipe(response);
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

function shutdown(exitCode = 0) {
  server.close(() => {
    process.exit(exitCode);
  });
  setTimeout(() => {
    process.exit(exitCode);
  }, 250).unref();
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

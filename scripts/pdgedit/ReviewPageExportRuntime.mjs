import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

export const DEFAULT_PDGEDIT_REVIEW_BROWSER_PATH =
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge";
export const DEFAULT_PDGEDIT_REVIEW_PAGE_PATH = "pdgedit-review.html";
export const DEFAULT_PDGEDIT_REVIEW_WIDTH = 1600;
export const DEFAULT_PDGEDIT_REVIEW_HEIGHT = 9000;
export const DEFAULT_PDGEDIT_REVIEW_BUDGET_MS = 12000;
const DEFAULT_PDGEDIT_REVIEW_EXPORT_TIMEOUT_MS = 30000;

function resolvePositiveNumericFlag(rawValue, flagName) {
  const value = Number.parseInt(String(rawValue ?? "").trim(), 10);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${flagName} must be a positive integer.`);
  }
  return value;
}

function resolvePortFlag(rawValue, flagName) {
  const value = Number.parseInt(String(rawValue ?? "").trim(), 10);
  if (!Number.isFinite(value) || value < 0 || value > 65535) {
    throw new Error(`${flagName} must be an integer between 0 and 65535.`);
  }
  return value;
}

function takeOptionalValue(argv, index) {
  const nextValue = argv[index + 1];
  if (nextValue == null || String(nextValue).startsWith("--")) {
    return { value: true, nextIndex: index };
  }
  return { value: nextValue, nextIndex: index + 1 };
}

function takeRequiredValue(argv, index, flagName) {
  const nextValue = argv[index + 1];
  if (nextValue == null || String(nextValue).startsWith("--")) {
    throw new Error(`${flagName} requires a value.`);
  }
  return { value: nextValue, nextIndex: index + 1 };
}

function resolveOutputPath(rawPath, { cwd, outputDirPath, defaultFilename }) {
  if (rawPath === true) {
    return path.resolve(outputDirPath, defaultFilename);
  }
  return path.resolve(cwd, String(rawPath));
}

function normalizePagePath(pagePath) {
  const cleaned = String(pagePath ?? "").trim().replace(/^\/+/, "");
  return cleaned || DEFAULT_PDGEDIT_REVIEW_PAGE_PATH;
}

export function formatPdgeditReviewExportUsage() {
  return [
    "Usage: node scripts/export-pdgedit-review.mjs [options]",
    "",
    "Options:",
    "  --png [path]        Write a PNG screenshot. Defaults to stats/proof-sheet.png when omitted or pathless.",
    "  --pdf [path]        Write a PDF print export. Defaults to stats/proof-sheet.pdf when omitted or pathless.",
    "  --output-dir path   Base directory for default export filenames.",
    "  --page path         Review page path to render. Default: pdgedit-review.html",
    "  --query text        Raw query string appended to the review page URL.",
    "  --browser path      Browser binary path. Default: Microsoft Edge on macOS.",
    "  --host host         Static server host. Default: 127.0.0.1",
    "  --port number       Static server port. Default: 0 (auto-select)",
    "  --width number      Screenshot window width. Default: 1600",
    "  --height number     Screenshot window height. Default: 9000",
    "  --budget-ms number  Browser virtual-time budget. Default: 12000",
    "  --no-png            Skip PNG export.",
    "  --no-pdf            Skip PDF export.",
    "  --help              Show this help text.",
  ].join("\n");
}

export function parsePdgeditReviewExportArgs(argv, options = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd());
  const defaultOutputDirPath = path.resolve(options.outputDirPath ?? path.join(cwd, "stats"));

  const parsed = {
    browserPath: options.browserPath ?? DEFAULT_PDGEDIT_REVIEW_BROWSER_PATH,
    host: options.host ?? "127.0.0.1",
    port: options.port ?? 0,
    width: options.width ?? DEFAULT_PDGEDIT_REVIEW_WIDTH,
    height: options.height ?? DEFAULT_PDGEDIT_REVIEW_HEIGHT,
    virtualTimeBudgetMs: options.virtualTimeBudgetMs ?? DEFAULT_PDGEDIT_REVIEW_BUDGET_MS,
    outputDirPath: defaultOutputDirPath,
    pagePath: DEFAULT_PDGEDIT_REVIEW_PAGE_PATH,
    query: "",
    pngOutputPath: null,
    pdfOutputPath: null,
    help: false,
  };

  let explicitFormatSelection = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = String(argv[index]);
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }
    if (arg === "--png") {
      explicitFormatSelection = true;
      const { value, nextIndex } = takeOptionalValue(argv, index);
      parsed.pngOutputPath = value;
      index = nextIndex;
      continue;
    }
    if (arg === "--pdf") {
      explicitFormatSelection = true;
      const { value, nextIndex } = takeOptionalValue(argv, index);
      parsed.pdfOutputPath = value;
      index = nextIndex;
      continue;
    }
    if (arg === "--no-png") {
      explicitFormatSelection = true;
      parsed.pngOutputPath = null;
      continue;
    }
    if (arg === "--no-pdf") {
      explicitFormatSelection = true;
      parsed.pdfOutputPath = null;
      continue;
    }
    if (arg === "--output-dir") {
      const { value, nextIndex } = takeRequiredValue(argv, index, "--output-dir");
      parsed.outputDirPath = path.resolve(cwd, String(value));
      index = nextIndex;
      continue;
    }
    if (arg === "--page") {
      const { value, nextIndex } = takeRequiredValue(argv, index, "--page");
      parsed.pagePath = normalizePagePath(value);
      index = nextIndex;
      continue;
    }
    if (arg === "--query") {
      const { value, nextIndex } = takeRequiredValue(argv, index, "--query");
      parsed.query = String(value);
      index = nextIndex;
      continue;
    }
    if (arg === "--browser") {
      const { value, nextIndex } = takeRequiredValue(argv, index, "--browser");
      parsed.browserPath = path.resolve(cwd, String(value));
      index = nextIndex;
      continue;
    }
    if (arg === "--host") {
      const { value, nextIndex } = takeRequiredValue(argv, index, "--host");
      parsed.host = String(value).trim() || parsed.host;
      index = nextIndex;
      continue;
    }
    if (arg === "--port") {
      const { value, nextIndex } = takeRequiredValue(argv, index, "--port");
      parsed.port = resolvePortFlag(value, "--port");
      index = nextIndex;
      continue;
    }
    if (arg === "--width") {
      const { value, nextIndex } = takeRequiredValue(argv, index, "--width");
      parsed.width = resolvePositiveNumericFlag(value, "--width");
      index = nextIndex;
      continue;
    }
    if (arg === "--height") {
      const { value, nextIndex } = takeRequiredValue(argv, index, "--height");
      parsed.height = resolvePositiveNumericFlag(value, "--height");
      index = nextIndex;
      continue;
    }
    if (arg === "--budget-ms") {
      const { value, nextIndex } = takeRequiredValue(argv, index, "--budget-ms");
      parsed.virtualTimeBudgetMs = resolvePositiveNumericFlag(value, "--budget-ms");
      index = nextIndex;
      continue;
    }
    throw new Error(`Unknown option: ${arg}`);
  }

  if (!explicitFormatSelection) {
    parsed.pngOutputPath = true;
    parsed.pdfOutputPath = true;
  }

  if (parsed.pngOutputPath != null) {
    parsed.pngOutputPath = resolveOutputPath(parsed.pngOutputPath, {
      cwd,
      outputDirPath: parsed.outputDirPath,
      defaultFilename: "proof-sheet.png",
    });
  }
  if (parsed.pdfOutputPath != null) {
    parsed.pdfOutputPath = resolveOutputPath(parsed.pdfOutputPath, {
      cwd,
      outputDirPath: parsed.outputDirPath,
      defaultFilename: "proof-sheet.pdf",
    });
  }

  if (!parsed.help && parsed.pngOutputPath == null && parsed.pdfOutputPath == null) {
    throw new Error("At least one export target is required. Use --png, --pdf, or omit both for defaults.");
  }

  return parsed;
}

export function createPdgeditReviewExportUrl({ origin, pagePath, query }) {
  const url = new URL(normalizePagePath(pagePath), `${String(origin).replace(/\/+$/, "")}/`);
  if (query) {
    url.search = String(query).startsWith("?") ? String(query) : `?${String(query)}`;
  } else {
    url.searchParams.set("v", `export-${Date.now()}`);
  }
  return url.href;
}

export function getStaticFileContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  switch (extension) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
    case ".mjs":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".ico":
      return "image/x-icon";
    case ".txt":
    case ".md":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function resolveStaticRequestPath(rootDir, requestUrl = "/") {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://127.0.0.1").pathname);
  const relativePath = pathname === "/" ? DEFAULT_PDGEDIT_REVIEW_PAGE_PATH : pathname.replace(/^\/+/, "");
  const resolvedPath = path.resolve(rootDir, relativePath);
  const normalizedRootPath = `${rootDir}${path.sep}`;
  if (resolvedPath !== rootDir && !resolvedPath.startsWith(normalizedRootPath)) {
    throw new Error("Refusing to serve a path outside the repository root.");
  }
  return resolvedPath;
}

export async function startPdgeditReviewStaticServer({
  rootDir = process.cwd(),
  host = "127.0.0.1",
  port = 0,
} = {}) {
  const absoluteRootDir = path.resolve(rootDir);
  const sockets = new Set();
  const server = http.createServer((request, response) => {
    let filePath;
    try {
      filePath = resolveStaticRequestPath(absoluteRootDir, request.url);
    } catch (error) {
      response.writeHead(403, {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      });
      response.end(String(error?.message || error));
      return;
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      response.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      });
      response.end("Not found.");
      return;
    }

    response.writeHead(200, {
      "Content-Type": getStaticFileContentType(filePath),
      "Cache-Control": "no-store",
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    fs.createReadStream(filePath).pipe(response);
  });
  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => {
      sockets.delete(socket);
    });
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, resolve);
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Unable to determine the review export server address.");
  }

  return {
    server,
    origin: `http://${host}:${address.port}`,
    close: () =>
      new Promise((resolve, reject) => {
        server.closeIdleConnections?.();
        sockets.forEach((socket) => socket.destroy());
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      }),
  };
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function waitForStableFile(outputPath, timeoutMs) {
  const startedAt = Date.now();
  let lastSize = -1;
  let stableSince = 0;

  while (Date.now() - startedAt < timeoutMs) {
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 0) {
        if (stats.size === lastSize) {
          if (!stableSince) {
            stableSince = Date.now();
          }
          if (Date.now() - stableSince >= 1000) {
            return;
          }
        } else {
          lastSize = stats.size;
          stableSince = 0;
        }
      }
    }
    await delay(250);
  }

  throw new Error(`Timed out waiting for export output: ${outputPath}`);
}

async function runEdgeCommand(browserPath, args, outputPath) {
  const stderrChunks = [];
  const child = spawn(browserPath, args, {
    stdio: ["ignore", "ignore", "pipe"],
  });

  child.stderr.on("data", (chunk) => {
    if (stderrChunks.length < 200) {
      stderrChunks.push(String(chunk));
    }
  });

  const exitPromise = new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      resolve({ code, signal });
    });
  });

  try {
    await Promise.race([
      waitForStableFile(outputPath, DEFAULT_PDGEDIT_REVIEW_EXPORT_TIMEOUT_MS),
      exitPromise.then(({ code, signal }) => {
        if (code === 0 && fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
          return;
        }
        const detail = stderrChunks.join("").trim();
        throw new Error(
          `Browser export failed${signal ? ` (${signal})` : ""}${detail ? `\n${detail}` : ""}`.trim()
        );
      }),
    ]);
  } catch (error) {
    if (!child.killed) {
      child.kill("SIGKILL");
    }
    throw error;
  }

  if (!child.killed) {
    child.kill("SIGTERM");
  }
  const exitResult = await Promise.race([exitPromise, delay(1500).then(() => null)]);
  if (exitResult == null && !child.killed) {
    child.kill("SIGKILL");
  }
}

export async function exportPdgeditReviewPageWithEdge({
  browserPath = DEFAULT_PDGEDIT_REVIEW_BROWSER_PATH,
  pageUrl,
  pngOutputPath = null,
  pdfOutputPath = null,
  width = DEFAULT_PDGEDIT_REVIEW_WIDTH,
  height = DEFAULT_PDGEDIT_REVIEW_HEIGHT,
  virtualTimeBudgetMs = DEFAULT_PDGEDIT_REVIEW_BUDGET_MS,
  tempDirPath = fs.mkdtempSync(path.join(os.tmpdir(), "pdgedit-review-edge-")),
} = {}) {
  if (!pageUrl) {
    throw new Error("A review page URL is required for export.");
  }
  if (pngOutputPath == null && pdfOutputPath == null) {
    throw new Error("At least one export output path is required.");
  }
  if (!fs.existsSync(browserPath)) {
    throw new Error(`Browser binary not found at ${browserPath}`);
  }

  const commonArgs = [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--run-all-compositor-stages-before-draw",
    `--virtual-time-budget=${virtualTimeBudgetMs}`,
  ];

  try {
    if (pngOutputPath) {
      fs.mkdirSync(path.dirname(pngOutputPath), { recursive: true });
      fs.rmSync(pngOutputPath, { force: true });
      console.log(`Starting browser PNG export for ${pageUrl}`);
      await runEdgeCommand(browserPath, [
        ...commonArgs,
        `--user-data-dir=${path.join(tempDirPath, "profile-png")}`,
        `--window-size=${width},${height}`,
        "--hide-scrollbars",
        `--screenshot=${pngOutputPath}`,
        pageUrl,
      ], pngOutputPath);
      console.log(`Finished browser PNG export for ${pngOutputPath}`);
    }

    if (pdfOutputPath) {
      fs.mkdirSync(path.dirname(pdfOutputPath), { recursive: true });
      fs.rmSync(pdfOutputPath, { force: true });
      console.log(`Starting browser PDF export for ${pageUrl}`);
      await runEdgeCommand(browserPath, [
        ...commonArgs,
        `--user-data-dir=${path.join(tempDirPath, "profile-pdf")}`,
        `--print-to-pdf=${pdfOutputPath}`,
        pageUrl,
      ], pdfOutputPath);
      console.log(`Finished browser PDF export for ${pdfOutputPath}`);
    }
  } finally {
    fs.rmSync(tempDirPath, { recursive: true, force: true });
  }
}

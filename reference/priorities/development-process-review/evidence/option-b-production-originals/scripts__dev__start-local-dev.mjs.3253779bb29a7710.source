import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { freemem, platform, totalmem } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  createDevServerHttpCacheHeaders,
  isFreshDevServerHttpCacheRequest,
} from "./DevServerHttpCache.mjs";
import { createPdgLiveArtifactRuntime } from "./PdgLiveArtifactRuntime.mjs";
import { createBorgLibraryService } from "./BorgLibraryService.mjs";
import { prepareRuntimeAssets } from "../prepare-runtime-assets.mjs";
import { createBorgNativeEomProcessClient } from "../eom/BorgNativeEomProcessClient.mjs";
import {
  createBorgDisplayHostMemoryEnvelope,
} from "../../src/apps/borg/BorgDisplayHostMemoryEnvelope.js";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "../..");
const PORT = Number.parseInt(process.env.PORT ?? "5173", 10);
const HOST = process.env.HOST ?? "127.0.0.1";
const EOM_BORG_SHADOW_ENABLED = !isDisabledEnvironmentFlag(process.env.EOM_BORG_SHADOW);
const EOM_BUILD_DIR = resolve(REPO_ROOT, ".tmp/eom-native-dev");

prepareRuntimeAssets({ rootDir: REPO_ROOT });

function isEnabledEnvironmentFlag(value = "") {
  return /^(1|true|yes|on)$/iu.test(String(value || "").trim());
}

function isDisabledEnvironmentFlag(value = "") {
  return /^(0|false|no|off)$/iu.test(String(value || "").trim());
}

function resolveExecutable(name, fallbackPaths = []) {
  const pathCandidates = String(process.env.PATH || "")
    .split(":")
    .filter(Boolean)
    .map((directory) => resolve(directory, name));
  const executable = [...pathCandidates, ...fallbackPaths].find((candidate) => existsSync(candidate));
  if (!executable) {
    throw new Error(`${name} executable is required but was not found.`);
  }
  return executable;
}

const pdgLiveArtifactRuntime = isEnabledEnvironmentFlag(process.env.PDG_LIVE_ARTIFACTS)
  ? createPdgLiveArtifactRuntime({
      repoRootPath: REPO_ROOT,
      log(message) {
        process.stdout.write(`${String(message).trim()}\n`);
      },
    })
  : null;

let eomBorgClient = EOM_BORG_SHADOW_ENABLED ? createEomBorgClient() : null;
let eomBorgQueue = Promise.resolve();
let displayHostMemoryMeasurement = null;
const DISPLAY_HOST_MEMORY_SAMPLE_INTERVAL_MS = 1000;

function createEomBorgClient() {
  const client = createBorgNativeEomProcessClient({
    binaryPath: prepareEomBorgNativeBinary(),
    timeoutMs: 180000,
    returnDisplayHistoryExtensions: true,
  });
  process.stdout.write(`[eom] Borg EOM protocol agreed: ${client.protocolMagic}.\n`);
  return client;
}

function getEomBorgClient() {
  if (!EOM_BORG_SHADOW_ENABLED) {
    return null;
  }
  eomBorgClient ??= createEomBorgClient();
  return eomBorgClient;
}

const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".m4a", "audio/mp4"],
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

function prepareEomBorgNativeBinary() {
  const cmakeExecutable = resolveExecutable("cmake", [
    "/opt/homebrew/bin/cmake",
    "/usr/local/bin/cmake",
  ]);
  const configure = spawnSync(
    cmakeExecutable,
    ["-S", resolve(REPO_ROOT, "src/eom"), "-B", EOM_BUILD_DIR, "-DCMAKE_BUILD_TYPE=Release"],
    { cwd: REPO_ROOT, encoding: "utf8" },
  );
  if (configure.status !== 0) {
    throw new Error(
      `EOM configure failed: ${configure.error?.message || configure.stderr || configure.stdout || "unknown error"}`,
    );
  }
  const build = spawnSync(
    cmakeExecutable,
    ["--build", EOM_BUILD_DIR, "--target", "eom_borg_shadow_cli", "--parallel", "8"],
    { cwd: REPO_ROOT, encoding: "utf8" },
  );
  if (build.status !== 0) {
    throw new Error(
      `EOM build failed: ${build.error?.message || build.stderr || build.stdout || "unknown error"}`,
    );
  }
  return resolve(EOM_BUILD_DIR, "eom_borg_shadow_cli");
}

function readJsonRequest(request, maximumBytes = 64 * 1024 * 1024) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > maximumBytes) {
        rejectBody(new Error("EOM request exceeds the local service body limit."));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        resolveBody(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (error) {
        rejectBody(new Error(`Invalid EOM request JSON: ${error.message}`));
      }
    });
    request.on("error", rejectBody);
  });
}

async function serveEomBorgShadow(request, response) {
  if (!EOM_BORG_SHADOW_ENABLED ||
      !["POST", "DELETE"].includes(request.method)) {
    sendNotFound(response);
    return;
  }
  if (request.method === "DELETE") {
    const client = eomBorgClient;
    eomBorgClient = null;
    if (client) {
      await client.releaseRun();
    }
    response.writeHead(204, { "Cache-Control": "no-store" });
    response.end();
    return;
  }
  const body = await readJsonRequest(request);
  let client = null;
  let responseCompleted = false;
  response.once("close", () => {
    if (!responseCompleted && client) {
      client.dispose();
      if (eomBorgClient === client) {
        eomBorgClient = null;
      }
    }
  });
  // Acquire the shared worker only when this queued request starts. A stopped
  // browser request may close while its replacement is already waiting; if the
  // replacement captured the old client here, it would inherit a worker that
  // the close handler is about to dispose.
  const execute = () => {
    client = getEomBorgClient();
    const effectiveRequest = createHostAwareBorgRequest(body, client);
    return client.evolveRetainedHistories(effectiveRequest).then((result) => ({
      ...result,
      hostMemoryEnvelope: effectiveRequest.hostMemoryEnvelope ?? null,
    }));
  };
  const resultPromise = eomBorgQueue.then(execute, execute);
  eomBorgQueue = resultPromise.then(
    () => undefined,
    () => undefined,
  );
  const result = await resultPromise;
  response.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  responseCompleted = true;
  response.end(JSON.stringify(result));
}

function createHostAwareBorgRequest(request, client) {
  if (request?.runGrade !== "display") {
    return request;
  }
  const measurement = readDisplayHostMemoryMeasurement(client);
  const hostMemoryEnvelope = createBorgDisplayHostMemoryEnvelope({
    hostTotalMemoryBytes: measurement.hostTotalMemoryBytes,
    hostAvailableMemoryBytes: measurement.hostAvailableMemoryBytes,
    workerResidentBytes: measurement.workerResidentBytes,
    previousMemoryEstimateBytes: client.lastMemoryEstimateBytes,
  });
  if (!hostMemoryEnvelope.admitted) {
    const error = new Error(
      "Display evolution stopped before consuming the host memory reserve.",
    );
    error.code = "display_host_memory_reserve";
    throw error;
  }
  return {
    ...request,
    resourceEnvelope: {
      ...request.resourceEnvelope,
      memoryBudgetBytes: hostMemoryEnvelope.requestMemoryBudgetBytes,
    },
    hostMemoryEnvelope,
  };
}

function readDisplayHostMemoryMeasurement(client) {
  const now = Date.now();
  const workerPid = client.workerPid;
  if (displayHostMemoryMeasurement != null &&
      displayHostMemoryMeasurement.workerPid === workerPid &&
      now - displayHostMemoryMeasurement.sampledAtMs <
        DISPLAY_HOST_MEMORY_SAMPLE_INTERVAL_MS) {
    return displayHostMemoryMeasurement;
  }
  const hostTotalMemoryBytes = totalmem();
  displayHostMemoryMeasurement = {
    sampledAtMs: now,
    workerPid,
    hostTotalMemoryBytes,
    hostAvailableMemoryBytes:
      readHostAvailableMemoryBytes(hostTotalMemoryBytes),
    workerResidentBytes: client.workerResidentBytes,
  };
  return displayHostMemoryMeasurement;
}

function readHostAvailableMemoryBytes(hostTotalMemoryBytes) {
  if (platform() === "darwin") {
    const pressure = spawnSync("/usr/bin/memory_pressure", ["-Q"], {
      encoding: "utf8",
    });
    const percent = String(pressure.stdout ?? "").match(
      /System-wide memory free percentage:\s*(\d+)%/u,
    );
    if (!pressure.error && pressure.status === 0 && percent) {
      return Math.floor(
        hostTotalMemoryBytes * Number(percent[1]) / 100,
      );
    }
  }
  return freemem();
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

const serveBorgLibrary = createBorgLibraryService({ repoRoot: REPO_ROOT });
const server = createServer(async (request, response) => {
  try {
    if (await serveBorgLibrary(request, response)) return;
    if (new URL(request.url, `http://${HOST}:${PORT}`).pathname === "/api/eom/borg-shadow/v0") {
      await serveEomBorgShadow(request, response);
      return;
    }
    await pdgLiveArtifactRuntime?.ensureFreshForRequest(request.url);
    serveFile(request, response);
  } catch (error) {
    const isEomRequest =
      new URL(request.url, `http://${HOST}:${PORT}`).pathname ===
      "/api/eom/borg-shadow/v0";
    response.writeHead(500, {
      "Content-Type": isEomRequest
        ? "application/json; charset=utf-8"
        : "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    });
    const message = String(error?.message || "Internal server error");
    response.end(isEomRequest
      ? JSON.stringify({ error: message, code: error?.code ?? null })
      : message);
  }
});

server.listen(PORT, HOST, () => {
  process.stdout.write(`local dev server: http://${HOST}:${PORT}/\n`);
  if (!pdgLiveArtifactRuntime) {
    process.stdout.write("[pdg] live artifact refresh disabled; set PDG_LIVE_ARTIFACTS=1 to enable.\n");
  }
  process.stdout.write(
    EOM_BORG_SHADOW_ENABLED
      ? "[eom] Borg native shadow endpoint enabled by default; open /borg.html.\n"
      : "[eom] Borg native shadow endpoint disabled; replay a catalog record with ?assemblyId=<id>&modelRevisionSha256=<sha256>.\n",
  );
});
pdgLiveArtifactRuntime?.start();

function shutdown(exitCode = 0) {
  pdgLiveArtifactRuntime?.close();
  eomBorgClient?.dispose?.();
  server.close(() => {
    process.exit(exitCode);
  });
  setTimeout(() => {
    process.exit(exitCode);
  }, 250).unref();
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

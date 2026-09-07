const DEFAULT_FRAME_SAMPLES = 240;
const DEFAULT_SETTLE_MS = 1200;
const ALLOWED_ROUTES = new Set([
  "/feedback.html",
  "/photon.html",
]);

function finiteNumber(value) {
  return Number.isFinite(value) ? value : null;
}

function percentile(sortedValues, fraction) {
  if (sortedValues.length === 0) return null;
  const index = Math.min(sortedValues.length - 1, Math.floor(sortedValues.length * fraction));
  return sortedValues[index];
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function parsePositiveInteger(value, fallback, maximum) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= maximum ? parsed : fallback;
}

function readConfig() {
  const params = new URLSearchParams(location.search);
  const route = params.get("route") ?? "/feedback.html";
  if (!ALLOWED_ROUTES.has(route)) {
    throw new Error(`Unsupported performance-probe route: ${route}`);
  }
  return {
    route,
    frameSamples: parsePositiveInteger(params.get("frames"), DEFAULT_FRAME_SAMPLES, 1200),
    settleMs: parsePositiveInteger(params.get("settleMs"), DEFAULT_SETTLE_MS, 10000),
  };
}

function navigationMeasurement(targetWindow) {
  const navigation = targetWindow.performance.getEntriesByType("navigation")[0];
  if (!navigation) throw new Error("Navigation timing is unavailable.");
  const resources = targetWindow.performance.getEntriesByType("resource");
  return {
    responseEndMs: finiteNumber(navigation.responseEnd),
    domContentLoadedMs: finiteNumber(navigation.domContentLoadedEventEnd),
    loadEventEndMs: finiteNumber(navigation.loadEventEnd),
    navigationTransferBytes: finiteNumber(navigation.transferSize),
    navigationEncodedBytes: finiteNumber(navigation.encodedBodySize),
    navigationDecodedBytes: finiteNumber(navigation.decodedBodySize),
    resourceCount: resources.length,
    resourceTransferBytes: resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
    resourceEncodedBytes: resources.reduce((sum, entry) => sum + (entry.encodedBodySize || 0), 0),
    resourceDecodedBytes: resources.reduce((sum, entry) => sum + (entry.decodedBodySize || 0), 0),
    transferBytes: (navigation.transferSize || 0) + resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
    encodedBytes: (navigation.encodedBodySize || 0) + resources.reduce((sum, entry) => sum + (entry.encodedBodySize || 0), 0),
    decodedBytes: (navigation.decodedBodySize || 0) + resources.reduce((sum, entry) => sum + (entry.decodedBodySize || 0), 0),
    resources: resources.map((entry) => ({
      path: new URL(entry.name).pathname,
      initiatorType: entry.initiatorType,
      durationMs: finiteNumber(entry.duration),
      transferBytes: finiteNumber(entry.transferSize),
      encodedBytes: finiteNumber(entry.encodedBodySize),
      decodedBytes: finiteNumber(entry.decodedBodySize),
    })),
  };
}

async function sampleFrames(targetWindow, sampleCount) {
  const intervals = [];
  let previous = null;
  await new Promise((resolve) => {
    const step = (timestamp) => {
      if (previous !== null) intervals.push(timestamp - previous);
      previous = timestamp;
      if (intervals.length >= sampleCount) {
        resolve();
      } else {
        targetWindow.requestAnimationFrame(step);
      }
    };
    targetWindow.requestAnimationFrame(step);
  });
  const sorted = [...intervals].sort((left, right) => left - right);
  const medianMs = percentile(sorted, 0.5);
  const p95Ms = percentile(sorted, 0.95);
  return {
    samples: intervals.length,
    medianMs,
    p95Ms,
    p99Ms: percentile(sorted, 0.99),
    maximumMs: sorted.at(-1) ?? null,
    medianFps: medianMs ? 1000 / medianMs : null,
    intervalsOver20Ms: intervals.filter((value) => value > 20).length,
    intervalsOver33_34Ms: intervals.filter((value) => value > 33.34).length,
  };
}

function readHeap(targetWindow) {
  const memory = targetWindow.performance.memory;
  if (!memory) return { supported: false };
  return {
    supported: true,
    usedBytes: memory.usedJSHeapSize,
    totalBytes: memory.totalJSHeapSize,
    limitBytes: memory.jsHeapSizeLimit,
  };
}

function readCanvasSurfaces(targetWindow) {
  const canvases = [...targetWindow.document.querySelectorAll("canvas")];
  const surfaces = canvases.map((canvas, index) => {
    const webgl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    const width = webgl?.drawingBufferWidth ?? canvas.width;
    const height = webgl?.drawingBufferHeight ?? canvas.height;
    const colorBytes = width * height * 4;
    const depthStencilBytes = webgl?.getContextAttributes()?.depth ? width * height * 4 : 0;
    return {
      id: canvas.id || `canvas-${index + 1}`,
      kind: webgl ? "webgl" : "two-dimensional",
      width,
      height,
      minimumSurfaceBytes: colorBytes + depthStencilBytes,
    };
  });
  return {
    method: "canvas backing-store lower bound; excludes textures, geometry, driver allocation, compositor copies, and shared GPU-process memory",
    surfaceCount: surfaces.length,
    minimumSurfaceBytes: surfaces.reduce((sum, surface) => sum + surface.minimumSurfaceBytes, 0),
    surfaces,
  };
}

async function readStorage(targetWindow) {
  if (!targetWindow.navigator.storage?.estimate) return { supported: false };
  const estimate = await targetWindow.navigator.storage.estimate();
  return {
    supported: true,
    originUsageBytes: estimate.usage ?? null,
    originQuotaBytes: estimate.quota ?? null,
  };
}

async function measureFeedbackRefresh(targetWindow) {
  const button = targetWindow.document.querySelector("#feedback-refresh");
  const status = targetWindow.document.querySelector("#feedback-status");
  if (!(button instanceof targetWindow.HTMLButtonElement) || !status) {
    throw new Error("Feedback refresh controls are unavailable.");
  }
  const startedAt = targetWindow.performance.now();
  button.click();
  while (targetWindow.performance.now() - startedAt < 10000) {
    // The page's ready wording changed from "Manifest ready" to
    // "Diagnostic details ready" on 2026-09-05; accept either.
    if (/(?:manifest|diagnostic details) ready/iu.test(status.textContent ?? "")) {
      await new Promise((resolve) => targetWindow.requestAnimationFrame(() => resolve()));
      return {
        id: "refresh-public-manifest",
        status: "passed",
        nextPaintMs: targetWindow.performance.now() - startedAt,
      };
    }
    if (/unavailable|failed|error/iu.test(status.textContent ?? "")) {
      throw new Error(`Feedback refresh failed: ${status.textContent}`);
    }
    await sleep(16);
  }
  throw new Error("Feedback refresh did not complete within 10 seconds.");
}

async function measureInteraction(targetWindow, route) {
  if (route === "/feedback.html") return measureFeedbackRefresh(targetWindow);
  return {
    id: "continuous-visual-frame",
    status: "passed",
    nextPaintMs: null,
    note: "The visual profile is represented by continuous frame sampling; the feedback profile owns the explicit input-to-next-paint measurement.",
  };
}

async function waitForFrameLoad(frame, source) {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Timed out loading ${source}`)), 30000);
    frame.addEventListener("load", () => {
      clearTimeout(timeout);
      resolve();
    }, { once: true });
    frame.src = source;
  });
  await sleep(100);
}

async function run() {
  const config = readConfig();
  const frame = document.querySelector("#probe-frame");
  const output = document.querySelector("#probe-result");
  const runToken = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const coldSource = `${config.route}?opsProbe=${encodeURIComponent(runToken)}`;
  await waitForFrameLoad(frame, coldSource);
  await sleep(config.settleMs);
  const coldWindow = frame.contentWindow;
  const cold = navigationMeasurement(coldWindow);
  const coldHeap = readHeap(coldWindow);

  await waitForFrameLoad(frame, coldSource);
  await sleep(config.settleMs);
  const warmWindow = frame.contentWindow;
  const warm = navigationMeasurement(warmWindow);
  const heapBeforeFrames = readHeap(warmWindow);
  const frameTiming = await sampleFrames(warmWindow, config.frameSamples);
  const heapAfterFrames = readHeap(warmWindow);
  const interaction = await measureInteraction(warmWindow, config.route);
  const storage = await readStorage(warmWindow);
  const gpuSurfaceProxy = readCanvasSurfaces(warmWindow);
  const result = {
    schema: "architrino.browser-performance-probe.v1",
    status: "passed",
    route: config.route,
    measuredAtUtc: new Date().toISOString(),
    userAgent: navigator.userAgent,
    viewport: {
      cssWidth: warmWindow.innerWidth,
      cssHeight: warmWindow.innerHeight,
      devicePixelRatio: warmWindow.devicePixelRatio,
    },
    method: {
      origin: location.origin,
      cold: "first route load in a fresh per-profile local origin; route query token prevents a previously stored navigation response from satisfying the request",
      warm: "second identical route load in the same browser profile and origin; HTTP validation behavior is retained",
      frameSampling: `${config.frameSamples} consecutive requestAnimationFrame intervals after warm-load settlement`,
      interaction: "route-specific control activation through the app's own DOM, measured to the next rendered status frame",
    },
    launch: { cold, warm },
    frameTiming,
    interaction,
    heap: {
      coldAfterSettle: coldHeap,
      warmBeforeFrames: heapBeforeFrames,
      warmAfterFrames: heapAfterFrames,
      frameWindowGrowthBytes: heapBeforeFrames.supported && heapAfterFrames.supported
        ? heapAfterFrames.usedBytes - heapBeforeFrames.usedBytes
        : null,
    },
    gpuSurfaceProxy,
    storage,
  };
  output.textContent = JSON.stringify(result, null, 2);
  document.body.classList.add("is-complete");
  document.title = `COMPLETE ${config.route}`;
}

run().catch((error) => {
  const output = document.querySelector("#probe-result");
  output.textContent = JSON.stringify({
    schema: "architrino.browser-performance-probe.v1",
    status: "failed",
    error: error instanceof Error ? error.message : String(error),
  }, null, 2);
  document.body.classList.add("is-complete");
  document.title = "FAILED browser performance probe";
});
